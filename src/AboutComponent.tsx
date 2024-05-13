import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const toggleVisibility = () => {
    if (isVisible) {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 0);
    } else {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 0);
    }
  };

  return (
    <div>
      <li className="link-with-icon">
        <a href="#about" onClick={toggleVisibility}>
          about
          <FontAwesomeIcon
            icon={isVisible ? faArrowUp : faArrowDown}
            className={`icon ${isVisible ? "visible" : "hidden"}`}
          />
        </a>
      </li>
      {shouldRender && (
        <div className={`about ${isVisible ? "show" : ""}`}>
          <div
            className={`about-section ${isVisible ? "visible" : "hidden"}`}
            style={{ transition: "opacity 500ms ease-in-out" }}
          >
            <img id="about-img" className="face" src="img/face.jpg" />
            <h3>I'm a full-stack software engineer in San Francisco.</h3>
            <p>
              I've progressed quickly in my career at Apiture, where I lead a
              React Native engineering team. I spend quite a bit of time with
              Angular, Python, and React Native (always with TypeScript!). I'm
              always trying to find something else to learn.
            </p>
            <p>
              Previously, at Oracle, I transitioned from Associate Consultant to
              Cloud Engineer, taking on client-facing demos and managing
              significant projects, like developing websites and tracking
              systems for nonprofits.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
