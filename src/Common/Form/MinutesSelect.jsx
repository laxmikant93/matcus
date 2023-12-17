import { bool, func, number, string } from "prop-types";
import React, { useState } from "react";

function MinutesSelect({
  start,
  end,
  text,
  step,
  onSelected,
  onEvent,
  name,
  defaultSelect,
  disabled,
  isHide = false,
  selected, id, type, value, label, children, className, ...props
}) {
  const handleMinuteSelect = (e) => {
    onSelected(e.target.value);
    onEvent(e);
  };

  const MinuteOptions = () => {
    let options = [];

    for (let index = start; index <= end; index++) {
      let step1 = start;
      step1 = index + step;
      options.push({
        text: `${index} ${text}`,
        value: index,
      });

      index = step1;
    }

    return options;
  };
  const [focusLabel, setFocusLabel] = useState(false)

  return (
    // <select
    //   name={name ? name : "minuteselect"}
    //   onChange={handleMinuteSelect}
    //   disabled={disabled}
    //   value={selected}

    // >
    //   {!isHide && <option value="">{defaultSelect}</option>}
    //   {MinuteOptions().map((option, index) => {
    //     return (
    //       <option key={index} selected={option.value === selected} value={option.value} >
    //         {option.text}
    //       </option>
    //     );
    //   })}

    // </select>
    <div className="cstmSelectWrap">
      <div className={`form-group ${(focusLabel || value) && "caretup"}`}>
        <select
          className={`select-control ${className}`}
          onBlur={() => setFocusLabel(false)}
          id={id}
          onFocus={() => setFocusLabel(true)}
          {...props}
          name={name ? name : "minuteselect"}
          onChange={handleMinuteSelect}
          disabled={disabled}
          value={selected}
        >
          {!isHide && <option value="">{defaultSelect}</option>}
          {MinuteOptions().map((option, index) => {
            return (
              <option key={index} selected={option.value === selected} value={option.value} >
                {option.text}
              </option>
            );
          })}
        </select>
        <label className={`animLabel ${(label && value) || (focusLabel) ? "show" : "hide"}`} htmlFor={id}>
          {label}
        </label>
        {/* {((label && value) || (focusLabel)) && (
              <label className={`animLabel`} htmlFor={id}>
                {label}
              </label>
            )} */}
      </div>
    </div>
  );
}

MinutesSelect.defaultProps = {
  start: 0,
  end: 59,
  text: "Min",
  step: 4,
  onSelected: () => { },
  onEvent: () => { },
  disabled: false,
};

MinutesSelect.propTypes = {
  start: number.isRequired,
  end: number.isRequired,
  text: string.isRequired,
  step: number.isRequired,
  onSelected: func,
  onEvent: func,
  disabled: bool,
};

export default MinutesSelect;