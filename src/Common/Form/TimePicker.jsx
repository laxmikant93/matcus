import React, { forwardRef } from 'react';
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";


const InputTimePicker = forwardRef(({ name, label, id, onSelect, value, onlyDate, onlyTime, minDate, minTime, ...props }, ref) => {

  return (
    <React.Fragment>
      <TimePicker
        name={name}
        id={id}
        selected={value}
        onChange={date => {
          onSelect(date)
        }}
        timeFormat="h:mm aa"
        minTime={minTime}
        {...props}
      />
      {label && <label className="animLabel" htmlFor={id}>{label}</label>}
    </React.Fragment>
  )
});
export default InputTimePicker;