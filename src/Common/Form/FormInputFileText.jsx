import React from "react";
function FormInputFileText({ name, type, label, className, ...props }) {


    return (
        <div className="form-group file-input-wrapper">
            {label && <label className="hidden">{label}</label>}
            <input type={type} className={`form-control ${className}`} name={name} {...props} />
            <div className="file-input-overlapText mt-3">
                Change attachment
        </div>
        </div>
    )
}
export default FormInputFileText;

