import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SubmenuComponent from "./SubmenuComponent";
import AboutSection from "./AboutComponent";
import ConsultingComponent from "./ConsultingComponent";
import ReachoutComponent from "./ReachoutComponent";

const App: React.FC = () => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const handleMenuStateChange = (isExpanded: boolean, menuId: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (isExpanded) {
        newSet.add(menuId);
      } else {
        newSet.delete(menuId);
      }
      return newSet;
    });
  };

  const isAnyMenuExpanded = expandedMenus.size > 0;

  return (
    <div className="app">
      <div className={`blob ${isAnyMenuExpanded ? 'hidden' : ''}`}></div>
      <h1>Hi, I'm Tyler Woodfin.</h1>
      <ul className="app__links">
        <li className="link-with-icon">
          <AboutSection onMenuStateChange={(isExpanded) => handleMenuStateChange(isExpanded, 'about')} />
        </li>
        <li className="link-with-icon">
          <ConsultingComponent onMenuStateChange={(isExpanded) => handleMenuStateChange(isExpanded, 'consulting')} />
        </li>
        <li className="link-with-icon">
          <SubmenuComponent 
            title="latest hobby projects" 
            onMenuStateChange={(isExpanded) => handleMenuStateChange(isExpanded, 'projects')} 
          />
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
          <ReachoutComponent onMenuStateChange={(isExpanded) => handleMenuStateChange(isExpanded, 'reachout')} />
        </li>
      </ul>
    </div>
  );
};

export default App;
