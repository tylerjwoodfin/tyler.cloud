import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

interface ConsultingComponentProps {
  onMenuStateChange?: (isExpanded: boolean) => void;
}

const ConsultingComponent: React.FC<ConsultingComponentProps> = ({ onMenuStateChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const toggleVisibility = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (isVisible) {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 500); // Match the transition duration
    } else {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 0);
    }
  };

  useEffect(() => {
    onMenuStateChange?.(isVisible);
  }, [isVisible, onMenuStateChange]);

  return (
    <div>
      <a
        href="#consulting"
        role="button"
        tabIndex={0}
        onClick={toggleVisibility}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleVisibility(e);
            e.preventDefault(); // Prevent default scroll behavior when using space
          }
        }}
      >
        consulting
        <FontAwesomeIcon
          icon={isVisible ? faArrowUp : faArrowDown}
          className={`icon ${isVisible ? "visible" : "hidden"}`}
        />
      </a>
      {shouldRender && (
        <div className={`consulting ${isVisible ? "show" : "hide"}`}>
          <div
            className={`app__transition ${isVisible ? "visible" : "hidden"}`}
          >
            <h3>Technical Consulting Services</h3>
            <p>
              I offer specialized consulting services drawing from my experience 
              leading engineering teams and delivering enterprise solutions. My 
              expertise spans mobile development, technical leadership, and 
              full-stack web development.
            </p>
            
            <h4>Areas of Expertise</h4>
            <ul>
              <li><strong>Full-Stack Development:</strong> React, Python, TypeScript, and modern web technologies</li>
              <li><strong>Technical Leadership:</strong> Engineering team management, process improvement, and technical mentorship</li>
              <li><strong>Mobile Development:</strong> React Native strategy, team scaling, and performance optimization</li>
              <li><strong>DevOps & Infrastructure:</strong> CI/CD pipelines, containerization, and cloud-native solutions</li>
            </ul>

            <h4>Consulting Approach</h4>
            <p>
              I focus on practical, scalable solutions that fit your business 
              objectives. Whether you need architectural guidance, team scaling 
              strategies, or hands-on technical implementation, I provide 
              practical solutions backed by years of real-world experience.
            </p>

            <div className="consulting__footer">
            <p>
              Available for select consulting engagements. Let's discuss how 
              I can help accelerate your technical initiatives. Please reach out below.
            </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultingComponent;
