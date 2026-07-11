import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SubmenuComponent from "./SubmenuComponent";
import AboutSection from "./AboutComponent";
import ReachoutComponent from "./ReachoutComponent";

const HomePage: React.FC = () => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const handleMenuStateChange = useCallback(
    (isExpanded: boolean, menuId: string) => {
      setExpandedMenus((prev) => {
        const alreadyExpanded = prev.has(menuId);
        if (isExpanded === alreadyExpanded) {
          return prev;
        }
        const next = new Set(prev);
        if (isExpanded) {
          next.add(menuId);
        } else {
          next.delete(menuId);
        }
        return next;
      });
    },
    []
  );

  const onAboutMenuStateChange = useCallback(
    (isExpanded: boolean) => handleMenuStateChange(isExpanded, "about"),
    [handleMenuStateChange]
  );

  const onProjectsMenuStateChange = useCallback(
    (isExpanded: boolean) => handleMenuStateChange(isExpanded, "projects"),
    [handleMenuStateChange]
  );

  const onReachoutMenuStateChange = useCallback(
    (isExpanded: boolean) => handleMenuStateChange(isExpanded, "reachout"),
    [handleMenuStateChange]
  );

  const isAnyMenuExpanded = expandedMenus.size > 0;

  return (
    <div className="app">
      <div className={`blob ${isAnyMenuExpanded ? "hidden" : ""}`}></div>
      <h1>Hi, I'm Tyler Woodfin.</h1>
      <ul className="app__links">
        <li className="link-with-icon">
          <AboutSection onMenuStateChange={onAboutMenuStateChange} />
        </li>
        <li className="link-with-icon">
          <SubmenuComponent
            title="latest hobby projects"
            onMenuStateChange={onProjectsMenuStateChange}
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
          <a
            href="https://medium.com/@tyler.cloud"
            target="_blank"
            rel="noopener noreferrer"
          >
            medium
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="icon hidden"
            />
          </a>
        </li>
        <li className="link-with-icon">
          <ReachoutComponent onMenuStateChange={onReachoutMenuStateChange} />
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
