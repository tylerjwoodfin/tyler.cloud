import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const BG_GRADIENT =
  "linear-gradient(145deg, #1a1c24 0%, #12161f 48%, #0b1522 100%)";

/** Interactive constellation particle background for the homepage. */
const ConstellationBackground: React.FC = () => {
  const [init, setInit] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (!cancelled) setInit(true);
    });

    return () => {
      cancelled = true;
      setInit(false);
    };
  }, [reduceMotion]);

  const particlesOptions = useMemo(
    (): ISourceOptions => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      background: {
        image: BG_GRADIENT,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 160,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: ["#5a6b7c", "#4a5a6a", "#6a7d8f"],
        },
        links: {
          color: "#5a6b7c",
          distance: 150,
          enable: true,
          opacity: 0.28,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.7,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.85,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (reduceMotion) {
    return <div className="constellation-fallback" aria-hidden="true" />;
  }

  if (!init) {
    return <div className="constellation-fallback" aria-hidden="true" />;
  }

  return <Particles id="tyler-cloud-constellation" options={particlesOptions} />;
};

export default ConstellationBackground;
