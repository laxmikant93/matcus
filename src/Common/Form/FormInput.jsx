import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

const FormInput = forwardRef(
  ({ name, id, type, label, className, defaultValue, val, value, labelPosition, ...props }, ref) => {
    const { user } = useSelector((state) => {
      return {
        user: state.user,
      };
    });
    return (
      <React.Fragment>
        <div className="form-group">
          {labelPosition === "top" ? (
            <label className="animLabelTop" htmlFor={id}>
              {label}
            </label>
          ) : ""}
          {
            defaultValue ?
              <input
                type={type}
                className={`form-control ${user.user_activeRole === process.env.REACT_APP_TEACHER
                  ? "teacher"
                  : user.user_activeRole === process.env.REACT_APP_STUDENT
                    ? "student"
                    : "admin"
                  } ${className}`}
                id={id}
                ref={ref}
                name={name}
                defaultValue={defaultValue}
                placeholder=" "
                {...props}
              /> :
              <input
                type={type}
                className={`form-control ${user.user_activeRole === process.env.REACT_APP_TEACHER
                  ? "teacher"
                  : user.user_activeRole === process.env.REACT_APP_STUDENT
                    ? "student"
                    : "admin"
                  } ${className}`}
                id={id}
                ref={ref}
                name={name}
                value={value}
                defaultValue={defaultValue}
                placeholder=" "
                {...props}
              />}
          {labelPosition !== "top" ? (
            <label className="animLabel" htmlFor={id}>
              {label}
            </label>
          ) : ""}

        </div>
      </React.Fragment>
    );
  }
);
export default FormInput;
