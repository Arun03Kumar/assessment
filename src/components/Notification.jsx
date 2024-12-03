import React, { useState, useEffect } from "react";
import "./css/Notification.css";

const Notification = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isVisible && (
        <div className="not-cont">
          <span className="not-close" onClick={() => setIsVisible(false)}>
            &#x2716;
          </span>
          <p>
            Drag and Drop functionality is also working but it has some bugs as
            due to time constraints I didn't handled corner case.
          </p>
          <p>
            ex. when any column is empty we can not drop the card, but for
            Status page we can do it by dropping the card onto the heading of
            empty column
          </p>
          <p>on refresh or on component update dragged cards reset</p>
        </div>
      )}
    </>
  );
};

export default Notification;
