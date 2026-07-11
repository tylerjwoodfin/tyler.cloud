import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import HomePage from "./HomePage";

/** Edge `_redirects` handles production; this covers local/dev and client navigations. */
const RedirectPointingShowdown: React.FC = () => {
  const { sessionId } = useParams<{ sessionId?: string }>();
  useEffect(() => {
    const dest = sessionId
      ? `https://pointy.website/${sessionId}`
      : "https://pointy.website/";
    window.location.replace(dest);
  }, [sessionId]);
  return (
    <p style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      Pointing Showdown has moved to{" "}
      <a href="https://pointy.website/">pointy.website</a>…
    </p>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pointing-showdown" element={<RedirectPointingShowdown />} />
        <Route path="/pointing-showdown/:sessionId" element={<RedirectPointingShowdown />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
