import React from "react";
function FormInputFile({
  name,
  placeholder,
  label,
  fileOvelapClass,
  FileUploadIcon,
  className,
  ...props
}) {
  return (
    <div className="form-group file-input-wrapper">
      {label && <label className="hidden">{label}</label>}
      <input
        type="file"
        className={`form-control ${className}`}
        name={name}
        {...props}
      />
      <div className={`file-input-overlap ${fileOvelapClass}`}>
        <i
          className={`ed-icon mgray i-xs ${
            FileUploadIcon ? FileUploadIcon : "icon-file-upload"
          }`}
        ></i>
        {placeholder}
      </div>
    </div>
  );
}
export default FormInputFile;
