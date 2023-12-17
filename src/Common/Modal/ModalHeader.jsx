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
    <div className={`modalHead ${className}`}>
      {title && <h3 className={`text-sm w-300 ${TitleClass}`}>{title}</h3>}
      {subtitle && <p className={SubTitleClass}>{subtitle}</p>}
      {children}
      {closeButton && (
        <span className="closeModal text-xxs gray" onClick={() => onclose()}>
          X Close
        </span>
      )}
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
