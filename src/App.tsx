import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SubmenuComponent from "./SubmenuComponent";
import AboutSection from "./AboutComponent";
import ReachoutComponent from "./ReachoutComponent";

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
          <SubmenuComponent title="older stuff" customLinks={olderStuffLinks} />
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
        <li className="link-with-icon">
          <ReachoutComponent />
        </li>
      </ul>
    </div>
  );
};

const olderStuffLinks = [
  {
    id: "1",
    url: "/rundino",
    name: "run, dino",
    description: "an addictive and hilarious web-based dodging game",
    sublinks: [],
  },
  {
    id: "2",
    name: "my website from middle school",
    description: "built in 6th grade; proceed at your own risk.",
    sublinks: [
      {
        id: "2a",
        url: "/tpn/original1.htm",
        name: "my first attempt",
        description: "fall 2006",
      },
      {
        id: "2b",
        url: "/tpn/MyNewPageTyler.htm",
        name: "my second attempt",
        description: "spring 2007",
      },
      {
        id: "2c",
        url: "/tpn/tpnindex.htm",
        name: "web design in microsoft word?",
        description: "summer 2007",
      },
    ],
  },
];

export default App;
