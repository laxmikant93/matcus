import React, { useState } from "react";

function FormInputWithIcon({ name, id, type, label, className, ...props }) {
  const [passwordVisible, setPasswordVisible] = useState("password");

  return (
    <div className="form-group">
      <input
        type={passwordVisible}
        className={`form-control ${className}`}
        id={id}
        name={name}
        {...props}
      />
      {label && (
        <label className="animLabel" htmlFor={id}>
          {label}
        </label>
      )}
      {passwordVisible === "password" ? (
        <span
          className="passwordEye"
          onClick={() => setPasswordVisible("text")}
        >
          <i className="ed-icon icon-EyeIcon mgray i-s"></i>
        </span>
      ) : (
        <span
          className="passwordEye"
          onClick={() => setPasswordVisible("password")}
        >
          <i className="ed-icon icon-EyeCloseIcon mgray i-s"></i>{" "}
        </span>
      )}
    </div>
  );
}
export default FormInputWithIcon;
