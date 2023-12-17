import { bool } from "prop-types";
import React, { forwardRef, useEffect, useState } from "react";
import "./modal.scss";

const Modal = forwardRef(({ children, ModalSize, className, show }, ref) => {
  const [modalState, setModalState] = useState(false);
  const closeModalState = () => {
    setModalState(!modalState);
  };
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
      }
    };
    window.addEventListener("keydown", close);
  }, []);
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
        className={`modal ${show ? "modalShowing-true" : "modalShowing-false"
          } ${className}`}
        ref={ref}
      >
        <div className={`modalwrapper ${ModalSize}`}>{children}</div>
      </div>
    </React.Fragment>
  );
});

Modal.defultProps = {
  show: false,
};
Modal.propTypes = {
  show: bool,
};

export default Modal;
