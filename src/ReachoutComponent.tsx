import React, { useState, useEffect } from "react";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";

const ContactForm = ({ onSuccess }: any) => {
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, contact }),
      });
  
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(onSuccess, 1500);
      } else {
        const errorText = await response.text();
        console.error("Server error:", errorText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };  

  return (
    <form id="reach-out" onSubmit={handleSubmit}>
      {!isSubmitted ? (
        <>
          <div className="form-group">
            <label>
              How can I help you?
              <textarea
                id="input-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              How can I contact you? (optional)
              <input
                type="text"
                id="input-contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="form-input"
              />
            </label>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={!message || message.length < 4}
          >
            send
          </button>
        </>
      ) : (
        <span className="thank-you-message">Thank you for your message.</span>
      )}
    </form>
  );
};

interface ReachOutComponentProps {
  onMenuStateChange?: (isExpanded: boolean) => void;
}

const ReachOutComponent: React.FC<ReachOutComponentProps> = ({ onMenuStateChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleSuccess = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  useEffect(() => {
    onMenuStateChange?.(isVisible);
  }, [isVisible, onMenuStateChange]);

  return (
    <div>
      <a href="#reachout" onClick={toggleVisibility}>
        reach out
        <FontAwesomeIcon
          icon={isVisible ? faArrowUp : faArrowDown}
          className={`icon ${isVisible ? "visible" : "hidden"}`}
        />
      </a>
      <div className={`reachout ${isVisible ? "visible" : "hidden"}`}>
        <ContactForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default ReachOutComponent;
