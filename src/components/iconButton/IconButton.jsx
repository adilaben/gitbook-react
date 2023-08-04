import React from "react";
import "./iconButton.css";

const IconButton = ({ icon, ariaLabel, handleClick }) => {
  return (
    <button onClick={handleClick} className="icon-btn" aria-label={ariaLabel}>
      <span className="material-symbols-rounded" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
