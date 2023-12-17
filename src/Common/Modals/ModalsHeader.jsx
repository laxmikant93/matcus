import { bool, string } from "prop-types";
import React from "react";

const ModalHeader = ({
  title,
  subtitle,
  children,
  className,
  closeButton,
  onclose,
  TitleClass,
  SubTitleClass,
}) => {
  window.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
      onclose();
    }
  });
  return (
    <div className={`ModalsHead ${className}`}>
      {title && <h2 className={TitleClass}>{title}</h2>}
      {subtitle && <h3 className={SubTitleClass}>{subtitle}</h3>}
      {children}
    </div>
  );
};

ModalHeader.defaultProps = {
  title: undefined,
  subtitle: undefined,
  closeButton: false,
};

ModalHeader.propTypes = {
  title: string,
  subtitle: string,
  closeButton: bool,
};

export default ModalHeader;
