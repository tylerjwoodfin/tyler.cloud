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
  sublinksVisible?: boolean;
}

interface SubmenuComponentProps {
  title: string;
  customLinks?: Project[];
  onMenuStateChange?: (isExpanded: boolean) => void;
}

const SubmenuComponent: React.FC<SubmenuComponentProps> = ({
  title,
  customLinks,
  onMenuStateChange,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubmenuContent, setShowSubmenuContent] = useState(false);
  const [visible, setVisible] = useState(false);
  const hasFetchedLatest = useRef(false);

  const handleSubmenuClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (!showSubmenuContent) {
      setShowSubmenuContent(true);
      setVisible(true);
    } else {
      setVisible(false);
      setTimeout(() => setShowSubmenuContent(false), 500); // Match the transition duration
    }
  };

  useEffect(() => {
    onMenuStateChange?.(visible);
  }, [visible, onMenuStateChange]);

  const handleSublinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    projectId: string
  ) => {
    e.preventDefault();
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, sublinksVisible: !project.sublinksVisible }
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
          .slice(0, 5);
        setProjects(
          filteredData.map((project: any) => ({
            id: project.id,
            url: `https://github.com/${project.owner.login}/${project.name}`,
            name: project.name,
            description: project.description,
            sublinksVisible: false,
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
            sublinksVisible: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (title === "latest hobby projects" && !hasFetchedLatest.current) {
      getLatest();
      hasFetchedLatest.current = true;
    } else if (customLinks) {
      setProjects(
        customLinks.map((link) => ({ ...link, sublinksVisible: false }))
      );
      setLoading(false);
    }
  }, [title, customLinks]);

  return (
    <div>
      <a
        href="#submenu"
        role="button"
        tabIndex={0}
        onClick={handleSubmenuClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleSubmenuClick(e);
            e.preventDefault(); // Prevent default scroll behavior when using space
          }
        }}
      >
        {title}
        <FontAwesomeIcon
          icon={visible ? faArrowUp : faArrowDown}
          className={`icon ${visible ? "visible" : "hidden"}`}
        />
      </a>
      <div
        className={`submenu ${
          showSubmenuContent ? (visible ? "show" : "hide") : "hide"
        }`}
      >
        {loading ? (
          <div id="load-spin-latest">Loading...</div>
        ) : (
          <ul>
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                onSublinkClick={handleSublinkClick}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

interface ProjectItemProps {
  project: Project;
  onSublinkClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    projectId: string
  ) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  onSublinkClick,
}) => {
  const hasSublinks = project.sublinks && project.sublinks.length > 0;

  return (
    <li className="link-with-icon">
      {hasSublinks ? (
        <>
          <a href="#sublinks" onClick={(e) => onSublinkClick(e, project.id)}>
            {project.name}
            <FontAwesomeIcon
              icon={project.sublinksVisible ? faArrowUp : faArrowDown}
              className={`icon ${
                project.sublinksVisible ? "visible" : "hidden"
              }`}
            />
          </a>
          <p className="submenu__description">
            {project.description?.toLowerCase() || ""}
          </p>
          <div
            className={`submenu ${project.sublinksVisible ? "show" : "hide"}`}
          >
            <ul>
              {project.sublinks?.map((sublink) => (
                <ProjectItem
                  key={sublink.id}
                  project={sublink}
                  onSublinkClick={onSublinkClick}
                />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.name}
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="icon hidden"
            />
          </a>
          <p className="description">
            {project.description?.toLowerCase() || ""}
          </p>
        </>
      )}
    </li>
  );
};

export default SubmenuComponent;
