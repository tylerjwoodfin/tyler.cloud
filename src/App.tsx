import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const App: React.FC = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!showAbout) {
      setShowAbout(true);
      setTimeout(() => setVisible(true), 10); // Timeout ensures CSS transition for fade-in
    } else {
      setVisible(false); // Start fade-out
      setTimeout(() => setShowAbout(false), 200); // Delay state update to after fade-out
    }
  };

  return (
    <div className="content">
      <h1>Hi, I'm Tyler Woodfin.</h1>
      <ul className="links">
        <li>
          <a href="#about" onClick={handleAboutClick}>
            about
          </a>
        </li>
        {showAbout && (
          <div className={`about-section ${visible ? "" : "hidden"}`}>
            <p>
              I am a passionate software engineer based in San Francisco,
              specializing in automation and exploring innovative ways to
              generate revenue through technology. With a keen interest in
              developing scalable solutions, I continuously strive to push the
              boundaries of what is possible in the tech landscape.
            </p>
          </div>
        )}
        <li>
          <a href="#">latest stuff</a>
        </li>
        <li>
          <a href="#">older stuff</a>
        </li>
        <li className="link-with-icon">
          <a
            href="https://github.com/tylerjwoodfin"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="icon hidden"
            />
          </a>
        </li>
        <li className="link-with-icon">
          <a
            href="https://linkedin.com/tylerjwoodfin"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="icon hidden"
            />
          </a>
        </li>
        <li>
          <a href="#">reach out</a>
        </li>
      </ul>
    </div>
  );
};

export default App;
