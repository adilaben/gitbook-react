import React from "react";

const TabPanel = ({ id, label, children }) => {
  return (
    <div
      className="tab-panel"
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={id}
      tabIndex="0"
      data-tab-panel
    >
      <h2 className="sr-only">{label}</h2>
      {children}
    </div>
  );
};

export default TabPanel;
