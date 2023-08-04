import React, { useState, useEffect } from "react";
import "./header.css";
import { SearchBox } from "../../components";

const Header = ({ setSearchUsername, handleSearch }) => {
  const [theme, setTheme] = useState(
    sessionStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollState, setScrollState] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollState(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <a href="#main" className="skip-to-content">
        Skip to Content
      </a>
      <header
        className={`header ${isExpanded ? "search-active" : ""} ${
          scrollState ? "active" : ""
        }`}
        data-header
      >
        <div className="container">
          <a href="/" className="logo">
            <span className="text-primary">Git</span>Book
          </a>
          <div className="header-search">
            <button
              aria-controls="searchBox"
              aria-label="Toggle search"
              data-search-toggler
              className={`search-toggler icon-btn ${
                isExpanded ? "search-active" : ""
              }`}
              aria-expanded={isExpanded}
              onClick={handleSearchToggle}
            >
              <span
                className="material-symbols-rounded search-icon"
                aria-hidden="true"
              >
                search
              </span>
              <span
                className="material-symbols-rounded close-icon"
                aria-hidden="true"
              >
                arrow_back
              </span>
            </button>
            <SearchBox
              setSearchUsername={setSearchUsername}
              handleSearch={handleSearch}
              isExpanded={isExpanded}
            />
          </div>
          <button
            className={`icon-btn theme-btn ${
              theme === "dark" ? "dark" : "light"
            }`}
            aria-pressed={theme === "dark"}
            aria-label="Toggle dark and light theme"
            data-theme-btn
            onClick={handleThemeChange}
          >
            <span
              className={`material-symbols-rounded sun-icon ${
                theme === "dark" ? "hidden" : ""
              }`}
              aria-hidden="true"
            >
              light_mode
            </span>
            <span
              className={`material-symbols-rounded moon-icon ${
                theme === "light" ? "hidden" : ""
              }`}
              aria-hidden="true"
            >
              dark_mode
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
