import React, { useEffect, useRef, useState } from "react";
import "./App.css";

interface ComplexIterationVisualizationProps {
  initialMaxIterations?: number;
  initialResolution?: number;
  initialBoundedColor?: string;
  initialUnboundedColor?: string;
}

const ComplexIterationVisualization: React.FC<
  ComplexIterationVisualizationProps
> = ({
  initialMaxIterations = 100,
  initialResolution = 500,
  initialBoundedColor = "#00FFFF",
  initialUnboundedColor = "#000033",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maxIterations, setMaxIterations] =
    useState<number>(initialMaxIterations);
  const [resolution, setResolution] = useState<number>(initialResolution);
  const [boundedColor, setBoundedColor] = useState<string>(initialBoundedColor);
  const [unboundedColor, setUnboundedColor] = useState<string>(
    initialUnboundedColor
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<string>("(-2,-2) to (2,2)");

  // Default view parameters
  const defaultView = {
    xMin: -2,
    xMax: 2,
    yMin: -2,
    yMax: 2,
  };

  // Current view parameters
  const [viewParams, setViewParams] = useState({
    xMin: defaultView.xMin,
    xMax: defaultView.xMax,
    yMin: defaultView.yMin,
    yMax: defaultView.yMax,
  });

  // Drawing state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dragEnd, setDragEnd] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Helper function to convert hex color to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  // Convert a pixel position to a complex number
  const pixelToComplex = (
    x: number,
    y: number,
    canvas: HTMLCanvasElement
  ): { real: number; imag: number } => {
    const { xMin, xMax, yMin, yMax } = viewParams;
    const real = xMin + (xMax - xMin) * (x / canvas.width);
    const imag = yMin + (yMax - yMin) * (y / canvas.height);
    return { real, imag };
  };

  // Check if a sequence will remain bounded
  const checkBounded = (
    cReal: number,
    cImag: number,
    maxIter: number
  ): { bounded: boolean; iterations: number } => {
    let zReal = 0;
    let zImag = 0;

    for (let i = 0; i < maxIter; i++) {
      // Calculate z^2
      const zRealSquared = zReal * zReal;
      const zImagSquared = zImag * zImag;

      // If |z|^2 > 4, the sequence will diverge
      if (zRealSquared + zImagSquared > 4) {
        return { bounded: false, iterations: i };
      }

      // Calculate next z: z = z^2 + c
      const zRealTemp = zRealSquared - zImagSquared + cReal;
      zImag = 2 * zReal * zImag + cImag;
      zReal = zRealTemp;
    }

    return { bounded: true, iterations: maxIter };
  };

  // Update coordinates display
  const updateCoordinatesDisplay = () => {
    const { xMin, xMax, yMin, yMax } = viewParams;
    setCoordinates(
      `(${xMin.toFixed(2)},${yMin.toFixed(2)}) to (${xMax.toFixed(
        2
      )},${yMax.toFixed(2)})`
    );
  };

  // Render the visualization
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsLoading(true);

    // Resize canvas
    canvas.width = resolution;
    canvas.height = resolution;
    canvas.style.width = `${resolution}px`;
    canvas.style.height = `${resolution}px`;

    // Create an image data object
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    // Convert colors to RGB
    const boundedRGB = hexToRgb(boundedColor);
    const unboundedRGB = hexToRgb(unboundedColor);

    // Process in chunks to prevent UI freezing
    const chunkSize = 10000; // Process 10000 pixels at a time
    let pixel = 0;

    const processChunk = () => {
      const end = Math.min(pixel + chunkSize, canvas.width * canvas.height);

      for (; pixel < end; pixel++) {
        const x = pixel % canvas.width;
        const y = Math.floor(pixel / canvas.width);

        const c = pixelToComplex(x, y, canvas);
        const result = checkBounded(c.real, c.imag, maxIterations);

        const dataIndex = pixel * 4;

        if (result.bounded) {
          // Bounded points use bounded color
          data[dataIndex] = boundedRGB.r;
          data[dataIndex + 1] = boundedRGB.g;
          data[dataIndex + 2] = boundedRGB.b;
        } else {
          // Unbounded points use unbounded color
          data[dataIndex] = unboundedRGB.r;
          data[dataIndex + 1] = unboundedRGB.g;
          data[dataIndex + 2] = unboundedRGB.b;
        }
        data[dataIndex + 3] = 255; // Alpha channel
      }

      if (pixel < canvas.width * canvas.height) {
        // Still more to process
        ctx.putImageData(imageData, 0, 0);
        setTimeout(processChunk, 0);
      } else {
        // Done processing
        ctx.putImageData(imageData, 0, 0);
        setIsLoading(false);
        updateCoordinatesDisplay();
      }
    };

    // Start processing
    setTimeout(processChunk, 0);
  };

  // Handle mouse events for zooming
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDragging(true);
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setDragStart({ x: startX, y: startY });
    setDragEnd({ x: startX, y: startY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    setDragEnd({ x: endX, y: endY });

    // Draw selection rectangle
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create a temporary canvas for drawing
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");

    if (!tempCtx) return;

    tempCtx.drawImage(canvas, 0, 0);
    tempCtx.strokeStyle = "white";
    tempCtx.lineWidth = 2;
    tempCtx.strokeRect(
      Math.min(dragStart.x, endX),
      Math.min(dragStart.y, endY),
      Math.abs(endX - dragStart.x),
      Math.abs(endY - dragStart.y)
    );

    ctx.drawImage(tempCanvas, 0, 0);
  };

  const handleMouseUp = () => {
    if (!isDragging || !canvasRef.current) return;
    setIsDragging(false);

    const canvas = canvasRef.current;
    const { x: startX, y: startY } = dragStart;
    const { x: endX, y: endY } = dragEnd;

    if (Math.abs(endX - startX) < 10 || Math.abs(endY - startY) < 10) {
      // Too small selection, ignore
      return;
    }

    // Calculate new boundaries
    const startComplex = pixelToComplex(
      Math.min(startX, endX),
      Math.min(startY, endY),
      canvas
    );
    const endComplex = pixelToComplex(
      Math.max(startX, endX),
      Math.max(startY, endY),
      canvas
    );

    setViewParams({
      xMin: startComplex.real,
      xMax: endComplex.real,
      yMin: startComplex.imag,
      yMax: endComplex.imag,
    });
  };

  // Zoom in button handler
  const handleZoomIn = () => {
    const { xMin, xMax, yMin, yMax } = viewParams;

    // Zoom in by a factor of 2
    const centerX = (xMin + xMax) / 2;
    const centerY = (yMin + yMax) / 2;
    const rangeX = (xMax - xMin) / 2;
    const rangeY = (yMax - yMin) / 2;

    setViewParams({
      xMin: centerX - rangeX / 2,
      xMax: centerX + rangeX / 2,
      yMin: centerY - rangeY / 2,
      yMax: centerY + rangeY / 2,
    });
  };

  // Zoom out button handler
  const handleZoomOut = () => {
    const { xMin, xMax, yMin, yMax } = viewParams;

    // Zoom out by a factor of 2
    const centerX = (xMin + xMax) / 2;
    const centerY = (yMin + yMax) / 2;
    const rangeX = (xMax - xMin) * 2;
    const rangeY = (yMax - yMin) * 2;

    setViewParams({
      xMin: centerX - rangeX / 2,
      xMax: centerX + rangeX / 2,
      yMin: centerY - rangeY / 2,
      yMax: centerY + rangeY / 2,
    });
  };

  // Reset view button handler
  const handleResetView = () => {
    setViewParams({ ...defaultView });
  };

  // Effect to render when dependencies change
  useEffect(() => {
    render();
  }, [resolution, maxIterations, boundedColor, unboundedColor, viewParams]);

  return (
    <div className="complex-iteration-container">
      <h1>
        Frontend Visualization Challenge: z<sub>n+1</sub> = z<sub>n</sub>
        <sup>2</sup> + c
      </h1>

      <div className="controls">
        <div className="parameter">
          <label htmlFor="max-iterations">Max Iterations:</label>
          <input
            type="number"
            id="max-iterations"
            min="10"
            max="1000"
            value={maxIterations}
            onChange={(e) => setMaxIterations(parseInt(e.target.value))}
          />
        </div>

        <div className="parameter">
          <label htmlFor="resolution">Resolution:</label>
          <select
            id="resolution"
            value={resolution}
            onChange={(e) => setResolution(parseInt(e.target.value))}
          >
            <option value="100">100×100</option>
            <option value="200">200×200</option>
            <option value="300">300×300</option>
            <option value="400">400×400</option>
            <option value="500">500×500</option>
            <option value="600">600×600</option>
            <option value="800">800×800</option>
          </select>
        </div>

        <div className="color-scheme">
          <label htmlFor="bounded-color">Bounded Color:</label>
          <input
            type="color"
            id="bounded-color"
            value={boundedColor}
            onChange={(e) => setBoundedColor(e.target.value)}
          />

          <label htmlFor="unbounded-color">Unbounded Color:</label>
          <input
            type="color"
            id="unbounded-color"
            value={unboundedColor}
            onChange={(e) => setUnboundedColor(e.target.value)}
          />
        </div>

        <button onClick={render}>Render</button>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        {isLoading && <div className="loading">Calculating...</div>}
        <div className="zoom-controls">
          <div className="zoom-btn" onClick={handleZoomOut}>
            −
          </div>
          <div className="zoom-btn" onClick={handleZoomIn}>
            +
          </div>
        </div>
        <div className="reset-btn" onClick={handleResetView}>
          Reset
        </div>
        <div className="coordinates">{coordinates}</div>
      </div>
    </div>
  );
};

export default ComplexIterationVisualization;
