import React from "react";

const TabBtn = ({
  tab,
  index,
  tabRefs,
  handleTabKeyDown,
  handleTabClick,
  activeTabIndex,
}) => {
  return (
    <button
      className={`tab-btn ${activeTabIndex === index ? "active" : ""}`}
      role="tab"
      aria-labelledby="Tab button"
      tabIndex={activeTabIndex === index ? "0" : "-1"}
      onClick={() => handleTabClick(index)}
      onKeyDown={(e) => handleTabKeyDown(e, index)}
      ref={(element) => (tabRefs.current[index] = element)}
    >
      {tab.label}
    </button>
  );
};

export default TabBtn;
