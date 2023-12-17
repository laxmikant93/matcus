import React from "react";

const DialogBody = ({ children, bodyClass }) => {
  return <div className={`DialogBody ${bodyClass}`}>{children}</div>;
};

export default DialogBody;
