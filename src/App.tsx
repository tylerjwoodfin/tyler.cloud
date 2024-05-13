import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import LatestSection from "./LatestSection";
import AboutSection from "./AboutSection";

const App: React.FC = () => {
  return (
    <div className="content">
      <h1>Hi, I'm Tyler Woodfin.</h1>
      <ul className="links">
        <AboutSection></AboutSection>
        <LatestSection></LatestSection>
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
