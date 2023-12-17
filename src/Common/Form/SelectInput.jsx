import React, { forwardRef, useState } from "react";
import { useSelector } from "react-redux";

const SelectInput = forwardRef(
  ({ name, id, type, value, label, children, className, ...props }, ref) => {
    // const { user } = useSelector((state) => {
    //   return {
    //     user: state.user,
    //   };
    // });
    const [focusLabel, setFocusLabel] = useState(false)
    return (
      <React.Fragment>
        <div className="cstmSelectWrap">
          <div className={`form-group ${(focusLabel || value) ? "caretup" : ""}`}>
            <select
              className={`select-control ${className ? className : ""}`}
              value={value}
              name={name}
              onBlur={() => setFocusLabel(false)}
              id={id}
              onFocus={() => setFocusLabel(true)}
              {...props}
            >
              {children}
            </select>
            {label && <label className={`animLabel ${(label && value) || (focusLabel) ? "show" : "hide"}`} htmlFor={id}>
              {label}
            </label>}
            {/* {((label && value) || (focusLabel)) && (
              <label className={`animLabel`} htmlFor={id}>
                {label}
              </label>
            )} */}
          </div>
        </div>
      </React.Fragment >
    );
  }
);
export default SelectInput;
