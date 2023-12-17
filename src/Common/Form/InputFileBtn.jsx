import React from "react";
function InputFileBtn({ name, placeholder, label, className, ...props }) {
  return (
    <div className="form-group file-input-wrapper">
      <input type="file" {...props} />
      <div className={`button file-input-btn mt-3 ${className}`}>
        {placeholder}
      </div>
    </div>
  );
}
export default InputFileBtn;
