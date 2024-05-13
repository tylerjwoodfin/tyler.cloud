import React, { useState, useEffect } from "react";
import {
  faArrowDown,
  faArrowUp,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Project {
  id: string;
  url: string;
  name: string;
  description?: string;
}

interface SubmenuComponentProps {
  title: string;
  customLinks?: Project[];
}

const SubmenuComponent: React.FC<SubmenuComponentProps> = ({
  title,
  customLinks,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
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
    if (!customLinks) {
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
          setProjects(filteredData);
        } catch (error) {
          console.error("Failed to fetch projects:", error);
          setProjects([
            {
              id: "error",
              url: "#",
              name: "Couldn't fetch from Github.",
              description: "",
            },
          ]);
        } finally {
          setLoading(false);
        }
      };
      getLatest();
    } else {
      setProjects(customLinks);
      setLoading(false);
    }
  }, [customLinks]);

  return (
    <div>
      <li className="link-with-icon">
        <a href="#latest" onClick={handleLatestClick}>
          {title}
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
                    href={project.url}
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

export default SubmenuComponent;
