import React, { useRef } from "react";

const SearchBox = ({ isExpanded, setSearchUsername, handleSearch }) => {
  const inputRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    const username = inputRef.current.value.trim();
    if (!username) {
      return;
    }

    setSearchUsername(username);
    handleSearch();
    inputRef.current.value = "";
  };

  return (
    <div className="search-box" id="searchBox">
      <span
        className="material-symbols-rounded leading-icon"
        aria-hidden="true"
      >
        search
      </span>
      <input
        type="search"
        name="search"
        aria-label="Search github"
        placeholder="Search username*"
        className={`search-field label-1 ${isExpanded ? "expanded" : ""}`}
        data-search-field
        ref={inputRef}
        onKeyDown={handleKeyPress}
        autoFocus
      />
      <button
        className="search-btn"
        aria-label="Search submit"
        data-search-submit
        onClick={handleButtonClick}
      >
        <span className="material-symbols-rounded" aria-hidden="true">
          search
        </span>
        <span className="label-1">Search</span>
      </button>
    </div>
  );
};

export default SearchBox;
