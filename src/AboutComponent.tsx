import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const yearsExperience = new Date().getFullYear() - 2016;

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

  return (
    <div>
      <a
        href="#about"
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
        about
        <FontAwesomeIcon
          icon={isVisible ? faArrowUp : faArrowDown}
          className={`icon ${isVisible ? "visible" : "hidden"}`}
        />
      </a>
      {shouldRender && (
        <div className={`about ${isVisible ? "show" : "hide"}`}>
          <div
            className={`app__transition ${isVisible ? "visible" : "hidden"}`}
          >
            <img
              id="about-img"
              className="about__face"
              src="img/face.jpg"
              alt="Tyler Woodfin, Full-stack Software Engineer"
            />
            <h3>
              I'm Tyler Woodfin, a full-stack software engineer in San
              Francisco.
            </h3>
            <p>
              With over {yearsExperience} years in the tech industry, I
              currently lead a 9-person React Native engineering team at
              Apiture. My toolkit includes Angular, Python, React Native, and
              TypeScript, complemented by experience in cloud platforms like AWS
              and OCI.
            </p>
            <p>
              Previously at Oracle, I advanced from Associate Consultant to
              Cloud Engineer, where I led migrations, delivered POCs, and
              developed internal systems, including a skill-mapping website. My
              work often focused on serverless and microservices architectures.
            </p>
            <p>
              Passionate about growth, I constantly explore new technologies and
              methodologies to enhance both my team's and my personal skills.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
