import React, { useEffect, useRef, useState } from "react";
import "./tab.css";
import { ErrorContent, FollowerCard, RepositoryCard } from "../../components";
import TabBtn from "./TabBtn";
import TabPanel from "./TabPanel";

const TabNavigation = ({
  activeTabIndex,
  setActiveTabIndex,
  userData: { repositories, forkedRepos, followers, following },
  isLoading,
  setUsername,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const tabRefs = useRef([]);

  const tabConfig = [
    {
      id: "tab-1",
      label: "Repositories",
      message: "public repositories",
      type: "repo",
    },
    {
      id: "tab-2",
      label: "Forked",
      message: "forked repositories",
      type: "repo",
    },
    { id: "tab-3", label: "Followers", message: "follower", type: "user" },
    { id: "tab-4", label: "Following", message: "following", type: "user" },
  ];

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  const handleTabKeyDown = (e, currentIndex) => {
    setIsFocused(true);
    if (e.key === "ArrowRight" && currentIndex < tabConfig.length - 1) {
      setActiveTabIndex(currentIndex + 1);
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
      setActiveTabIndex(currentIndex - 1);
    }
  };

  const renderTabContent = (tabId) => {
    const tab = tabConfig.find((tab) => tab.id === tabId);
    if (!tab) return <ErrorContent text={`Doesn't have any content yet.`} />;

    const { type, message } = tab;
    const tabData =
      type === "repo"
        ? tabId === "tab-1"
          ? repositories
          : forkedRepos
        : tabId === "tab-3"
        ? followers
        : following;

    return type === "repo" ? (
      <RepositoryCard data={tabData} message={message} isLoading={isLoading} />
    ) : (
      <FollowerCard
        data={tabData}
        message={message}
        isLoading={isLoading}
        setUsername={setUsername}
        setActiveTabIndex={setActiveTabIndex}
      />
    );
  };

  useEffect(() => {
    if (isFocused) {
      tabRefs.current[activeTabIndex].focus();
    }
  }, [activeTabIndex, isFocused]);

  return (
    <section className="tab-container">
      <div className="tab-list" aria-labelledby="Tab navigation" role="tablist">
        {tabConfig.map((tab, index) => (
          <TabBtn
            key={tab.id}
            tab={tab}
            index={index}
            tabRefs={tabRefs}
            handleTabClick={handleTabClick}
            activeTabIndex={activeTabIndex}
            handleTabKeyDown={handleTabKeyDown}
          />
        ))}
      </div>

      <TabPanel
        id={tabConfig[activeTabIndex].id}
        label={tabConfig[activeTabIndex].label}
      >
        {renderTabContent(tabConfig[activeTabIndex].id)}
      </TabPanel>
    </section>
  );
};

export default TabNavigation;
