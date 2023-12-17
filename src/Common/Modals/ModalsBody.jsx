import React from "react";

const ModalBody = ({ children, className }) => {
  return <div className={`ModalsBody ${className}`}>{children}</div>;
};

export default ModalBody;
