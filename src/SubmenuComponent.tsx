import React, { useState, useEffect, useRef } from "react";
import {
  faArrowDown,
  faArrowUp,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Project {
  id: string;
  url?: string;
  name: string;
  description?: string;
  sublinks?: Project[];
  showSublinks?: boolean;
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
  const hasFetchedLatest = useRef(false); // Add a ref to track if the API call has been made

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

  const handleSublinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    projectId: string
  ) => {
    e.preventDefault();
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, showSublinks: !project.showSublinks }
          : project
      )
    );
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
        setProjects(
          filteredData.map((project: Project) => ({
            ...project,
            showSublinks: false,
          }))
        );
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

    if (title === "latest side projects" && !hasFetchedLatest.current) {
      getLatest();
      hasFetchedLatest.current = true; // Mark as fetched
    } else if (customLinks) {
      setProjects(
        customLinks.map((link) => ({ ...link, showSublinks: false }))
      ); // Initialize showSublinks
      setLoading(false);
    }
  }, [title, customLinks]);

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
                  {project.sublinks && project.sublinks.length > 0 ? (
                    <>
                      <a
                        href="#sublinks"
                        onClick={(e) => handleSublinkClick(e, project.id)}
                      >
                        {project.name}
                        <FontAwesomeIcon
                          icon={project.showSublinks ? faArrowUp : faArrowDown}
                          className="icon"
                        />
                      </a>
                      {project.showSublinks && (
                        <ul className="sublinks">
                          {project.sublinks.map((sublink) => (
                            <li key={sublink.id} className="link-with-icon">
                              <a
                                href={sublink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {sublink.name}
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                  className="icon hidden"
                                />
                              </a>
                              <p className="description">
                                {sublink.description || ""}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
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
                  )}
                  <p className="description">{project.description || ""}</p>
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
