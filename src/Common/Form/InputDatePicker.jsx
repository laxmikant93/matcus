import moment from "moment";
import { array } from "prop-types";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const InputDatePicker = forwardRef(
  (
    { name, label, placeholder, id, onSelect, value, maxDate, className, includedDates, ...props },
    ref
  ) => {
    const { user } = useSelector((state) => {
      return {
        user: state.user,
      };
    });
    const [focusLabel, setFocusLabel] = useState(false)

    return (
      <React.Fragment>
        <div className="form-group">
          <DatePicker
            className={`form-control ${user.user_activeRole === process.env.REACT_APP_TEACHER
              ? "teacher"
              : user.user_activeRole === process.env.REACT_APP_STUDENT
                ? "student"
                : "admin"
              } ${className}`}
            name={name}
            onBlur={() => setFocusLabel(false)}
            id={id}
            onFocus={() => setFocusLabel(true)}
            selected={value ? new Date(value) : null}
            onChange={(date) => {
              onSelect(date);
            }}
            maxDate={maxDate}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            autoComplete="off"
            placeholderText={placeholder}
            includeDates={includedDates}

            // popperPlacement="top-end"
            // popperModifiers={{
            //   offset: {
            //     enabled: true,
            //     offset: "5px, 10px",
            //   },
            //   preventOverflow: {
            //     enabled: true,
            //     escapeWithReference: false,
            //     boundariesElement: "viewport",
            //   },
            // }}
            {...props}
          />
          <i className="calendarDates"></i>
          <label className={`animLabel ${(label && value) || (focusLabel) ? "show" : "hide"}`} htmlFor={id}>
            {label}
          </label>
        </div>
      </React.Fragment>
    );
  }
);
export default InputDatePicker;

function foo(array) {
  return Object.entries(
    array.reduce((obj, item, index) => {
      if (typeof item === "string") {
        obj[(obj[index] = item.toUpperCase())] = index;
      }

      return obj;
    }, {})
  );
}

const bar = foo(["a", "b", "c"]);
