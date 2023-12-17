import React from "react";

const ModalBody = ({ children, className }) => {
  return <div className={`modalbody ${className}`}>{children}</div>;
};

export default ModalBody;
