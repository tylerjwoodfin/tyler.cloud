import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const yearsExperience = new Date().getFullYear() - 2016;

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
            <img
              id="about-img"
              className="face"
              src="img/face.jpg"
              alt="Tyler Woodfin, Full-stack Software Engineer"
            />
            <h3>
              I'm Tyler Woodfin, a full-stack software engineer based in San
              Francisco.
            </h3>
            <p>
              With over {yearsExperience} years in the tech industry, I
              currently lead a React Native engineering team at Apiture. My
              technical toolkit includes Angular, Python, and React Native, all
              paired with TypeScript.
            </p>
            <p>
              Previously at Oracle, I advanced from Associate Consultant to
              Cloud Engineer, where I handled client-facing demos, led
              migrations, and developed plenty of dashboards and internal
              websites.
            </p>
            <p>
              I am committed to personal and professional growth, continually
              exploring new technologies and methodologies to enhance my skills.
              Check out my work below!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
