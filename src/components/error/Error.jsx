import React from "react";
import "./error.css";

const Error = ({ text }) => {
  return (
    <section className="error" data-error="">
      <p className="title-1">Oops! :(</p>
      <p className="text">{text}</p>
    </section>
  );
};

const ErrorContent = ({ text }) => {
  return (
    <div className="error-content">
      <p className="title-1">Oops! :(</p>
      <p className="text">{text}</p>
    </div>
  );
};

export { Error, ErrorContent };
