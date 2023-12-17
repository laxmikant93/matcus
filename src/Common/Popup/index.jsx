import React from "react";
import { bool } from "prop-types";
import "./index.scss";
const Popup = ({
  children,
  CancelProp,
  RemoveProp,
  RemovePopToggleRef,
  show,
  loading,
  className,
  removeButtonLabel,
  cancelButtonLabel
}) => {
  return show ? (
    <div
      className={`Popup RemovePopup active ${className}`}
      ref={RemovePopToggleRef}
    >
      {children}
      <div className="RemovePopBtn">
        <button
          className="button btn-o-silver dgray btn-sm"
          onClick={() => CancelProp()}
        >
          {cancelButtonLabel ? cancelButtonLabel : "Cancel"}
        </button>
        {loading ? (
          <button className="button button-red btn-sm ">{removeButtonLabel ? "Loading..." : "Removing..."}</button>
        ) : (
          <button
            className="button button-red btn-sm"
            onClick={() => RemoveProp()}
          >
            {removeButtonLabel ? removeButtonLabel : 'Remove'}
          </button>
        )}
      </div>
    </div>
  ) : null;
};

Popup.defultProps = {
  show: false,
};
Popup.propTypes = {
  show: bool,
};

export default Popup;
