import { bool } from "prop-types";
import React, { forwardRef, useEffect, useState } from "react";
import "./CenterPopup.scss";
const CenterPopup = forwardRef(
  ({ children, onclose, className, show, closeButton }, ref) => {
    // useEffect(() => {
    //   const close = (e) => {
    //     if (e.keyCode === 27) {
    //     }
    //   };
    //   window.addEventListener("keydown", close);
    // }, []);
    useEffect(() => {
      if (show) {
        document.body.classList.add('avoidscroll');
      }
      return () => {
        document.body.classList.remove('avoidscroll');
      };
    }, [show]);
    return (
      <React.Fragment>
        <div
          className={`center-popup-wrapper ${show ? "click-v-visible" : "click-v-hidden"
            } ${className}`}
          ref={ref}
        >
          <div className="inner-center-popup-wrapper">
            {closeButton && (
              <span className="closeModal" onClick={() => onclose()}></span>
            )}
            {children}
          </div>
        </div>
      </React.Fragment>
    );
  }
);

CenterPopup.defultProps = {
  show: false,
};
CenterPopup.propTypes = {
  show: bool,
};

export default CenterPopup;
