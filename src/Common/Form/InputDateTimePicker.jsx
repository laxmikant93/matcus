import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDateTimePicker = forwardRef(({ name, label, id, onSelect, value, onlyDate, onlyTime, minDate, minTime, ...props }, ref) => {

  return (
    <React.Fragment>
      <DatePicker
        name={name}
        id={id}
        selected={value ? new Date(value) : null}
        onChange={(date) => {
          onSelect(date);
        }}
        timeInputLabel="Time:"
        // dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
        minDate={minDate}
        minTime={minTime}
        dateFormat="dd MMM, yyyy h:mm aa"
        autoComplete="off"
        {...props}
      />
      <i className="calendarDates"></i>
      {label && (
        <label className="animLabel" htmlFor={id}>
          {label}
        </label>
      )}
    </React.Fragment>
  );
}
);
export default InputDateTimePicker;
