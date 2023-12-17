import React from "react";

const ModalFooter = ({ children, className }) => {
  return <div className={`modalFooter ${className}`}>{children}</div>;
};

export default ModalFooter;
