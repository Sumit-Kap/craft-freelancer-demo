import React from "react";

const Loader = () => {
  return (
    <div
      data-testId="loader"
      className="flex justify-center items-center h-screen w-screen"
    >
      <div className="w-40 h-40 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
