import React, { forwardRef } from "react";

const CheckboxInput = forwardRef(
  ({ name, id, type, label, className, LabelClass, ...props }, ref) => {
    return (
      <label className={LabelClass}>
        <input
          type="checkbox"
          className={className}
          id={id}
          ref={ref}
          name={name}
          {...props}
        />
        <span>{label}</span>
      </label>
      // <div className="form-group CheckInput">
      //   <input
      //     type={type}
      //     className={className}
      //     id={id}
      //     ref={ref}
      //     name={name}
      //     {...props}
      //   />
      //   {label && (
      //     <label className={LabelClass} htmlFor={id}>
      //       {label}
      //     </label>
      //   )}
      // </div>
    );
  }
);
export default CheckboxInput;
