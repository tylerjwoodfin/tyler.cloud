import {
  faArrowDown,
  faArrowUp,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

const LatestSection: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLatest, setShowLatest] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleLatestClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!showLatest) {
      setShowLatest(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      setTimeout(() => setShowLatest(false), 200);
    }
  };

  useEffect(() => {
    const getLatest = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/tylerjwoodfin/repos"
        );
        const data = await response.json();
        const sortedData = data.sort(
          (a: any, b: any) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        );
        const filteredData = sortedData
          .filter((item: any) => item.name !== "tyler.cloud")
          .slice(0, 7);
        console.log("Filtered data", filteredData);
        setProjects(filteredData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([{ key: "Couldn't fetch from Github." }]);
      } finally {
        setLoading(false);
      }
    };
    getLatest();
  }, []);

  return (
    <div>
      <li className="link-with-icon">
        <a href="#latest" onClick={handleLatestClick}>
          latest side projects
          <FontAwesomeIcon
            icon={visible ? faArrowUp : faArrowDown}
            className={`icon ${visible ? "visible" : "hidden"}`}
          />
        </a>
      </li>
      {showLatest && (
        <div className={`latest ${visible ? "show" : ""}`}>
          {loading ? (
            <div id="load-spin-latest">Loading...</div>
          ) : (
            <ul>
              {projects.map((project) => (
                <li key={project.id} className="link-with-icon">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="icon hidden"
                    />
                  </a>
                  <p className="description">
                    {project.description?.toLowerCase() ||
                      "(no description yet)"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LatestSection;
