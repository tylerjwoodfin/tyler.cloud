import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SubmenuComponent from "./SubmenuComponent";
import AboutSection from "./AboutComponent";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="blob"></div>
      <h1>Hi, I'm Tyler Woodfin.</h1>
      <ul className="app__links">
        <li className="link-with-icon">
          <AboutSection />
        </li>
        <li className="link-with-icon">
          <SubmenuComponent title="latest side projects" />
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
            href="https://linkedin.com/in/tylerjwoodfin"
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
      </ul>
    </div>
  );
};

export default App;
