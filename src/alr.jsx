import React, { useState, useEffect } from "react";

function Alert(props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`alert ${props.type} ${visible ? "show" : "hide"}`}>
      <span className="close" onClick={() => setVisible(false)}>
        &times;
      </span>
      {props.message}
    </div>
  );
}

export default Alert;
