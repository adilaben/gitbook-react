import React from "react";

const useRepeat = (component, repeatCount) => {
  const components = Array.from({ length: repeatCount }, (_, index) =>
    React.createElement(component, { key: index })
  );
  return () => <>{components}</>;
};

export default useRepeat;
