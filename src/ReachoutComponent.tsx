import React, { useState } from "react";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactForm = ({ onSuccess }: any) => {
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `sendMessage.php?message=${encodeURIComponent(
          message
        )}&contact=${encodeURIComponent(contact)}`
      );
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onSuccess();
        }, 3000); // Hide form after 3 seconds
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {!isSubmitted ? (
        <>
          <div className="form-group">
            <label>
              message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              how can I contact you? (optional)
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="form-input"
              />
            </label>
          </div>
          <button type="submit" className="submit-button">
            send
          </button>
        </>
      ) : (
        <span className="thank-you-message">Thank you for your message.</span>
      )}
    </form>
  );
};

const ReachOutComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const toggleVisibility = () => {
    if (isVisible) {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 500); // Allow time for transition
    } else {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 0);
    }
  };

  const handleSuccess = () => {
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 500); // Allow time for transition
    }, 3000);
  };

  return (
    <div>
      <li className="link-with-icon">
        <a href="#reachout" onClick={toggleVisibility}>
          reach out
          <FontAwesomeIcon
            icon={isVisible ? faArrowUp : faArrowDown}
            className={`icon ${isVisible ? "visible" : "hidden"}`}
          />
        </a>
      </li>
      {shouldRender && (
        <div className={`reachout ${isVisible ? "show" : ""}`}>
          <div
            className={`reachout-section ${isVisible ? "visible" : "hidden"}`}
            style={{ transition: "opacity 500ms ease-in-out" }}
          >
            <ContactForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReachOutComponent;
