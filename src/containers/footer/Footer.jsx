import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer container">
      <p className="copyright">
        © 2023{" "}
        <a href="https://www.adilaben.com/" className="text-primary">
          adilaben
        </a>
      </p>
    </footer>
  );
};

export default Footer;
