import React, { useEffect, useState } from "react";
import { useRef } from "react";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import InputDatePicker from "../../../Common/Form/InputDatePicker";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import "./Recurring.scss";
import SelectInput from "../../../Common/Form/SelectInput";

const Recurring = ({
  classPostInfo,
  handleInput,
  handleSubmit,
  recurringtype,
  handleDate,
  formError,
  setClassPostInfo,
  startDate
}) => {
  // const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const dropdownRef = useRef(null);
  const [isActivepop, setIsActivepop] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  const showHidetooltips = () => {
    setIsActivepop(!isActivepop);
  };
  const daysName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  // const [recurringtype, setRecurrenceType] = useState(recurringtype)
  useEffect(() => {
    if (recurringtype) {
      let classPostData = {
        ...classPostInfo,
        repeat_interval: {
          value: 1,
          isValid: true,
        },
      };
      setClassPostInfo(classPostData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recurringtype]);
  return (
    <React.Fragment>
      <div className="Recurringreapton mb-30">
        <div className="tooltiprecurringClasss" onClick={showHidetooltips}>
          <h2 className="text-sm">&#63;</h2>
        </div>
        {isActivepop ? (
          <div ref={dropdownRef} className="tooltipPopuptextboxwrapper">
            <p className="text-xxs gray "> Your Recurring Classes Scheduling. </p>
          </div>
        ) : (
          ""
        )}

        <div className="timemangerRecurring">
          <div className="formFieldwrap">
            <SelectInput
              id="select_Course"
              className="form-control"
              defaultValue={classPostInfo.recurrence_type.value}
              onChange={handleInput}
              name="recurrenceType"
              label="Type"
            >
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
            </SelectInput>
            <FormError
              show={formError && !classPostInfo.recurrence_type.isValid}
              error={"Repeat Interval is required."}
            />
          </div>
          {recurringtype === "WEEKLY" ? (
            <div className="formFieldwrap">
              <FormInput
                className="RepeatInterarrowup"
                name="repeat_interval"
                type="number"
                label="Repeat Interval"
                value={classPostInfo.repeat_interval.value}
                min="1"
                max="12"
                onChange={handleInput}
              />

              <FormError
                show={formError && !classPostInfo.repeat_interval.isValid}
                error={"Repeat Interval is required."}
              />
            </div>
          ) : recurringtype === "MONTHLY" ? (
            <div className="formFieldwrap">
              <FormInput
                className="RepeatInterarrowup"
                name="repeat_interval"
                type="number"
                label="Repeat Interval"
                value={classPostInfo.repeat_interval.value}
                min="1"
                max="3"
                onChange={handleInput}
              />

              <FormError
                show={formError && !classPostInfo.repeat_interval.isValid}
                error={"Repeat Interval is required."}
              />
            </div>
          ) : recurringtype === "DAILY" ? (
            <div className="formFieldwrap">
              <FormInput
                className="RepeatInterarrowup"
                name="repeat_interval"
                type="number"
                label="Repeat Interval"
                value={classPostInfo.repeat_interval.value}
                min="1"
                max="90"
                onChange={handleInput}
              />

              <FormError
                show={formError && !classPostInfo.repeat_interval.isValid}
                error={"Repeat Interval is required."}
              />
            </div>
          ) : (
            ""
          )}

          <div className="datePickerWrap ">
            <InputDatePicker
              className=""
              label="Class Ends On"
              name="endDate"
              onSelect={(selectedDate) => handleDate(selectedDate, "endDate")}
              value={classPostInfo.endDate.value}
              minDate={startDate}
              id="endDate"
              type="date"
              placeholder="Class Ends On"
            />
            <FormError
              show={formError && !classPostInfo.endDate.isValid}
              error="End Time should not be empty."
            />
          </div>
        </div>

        {recurringtype === "WEEKLY" && (
          <div className="Recurringradio">
            <p className="base text-xs  w-400 mt-20 mb-10">Repeat On </p>

            <div className="weekdayrecurring scroll-top-menu-wrap text-xxs mt-0 ">
              {daysName.map((days, index) => {
                return (
                  <>
                    <input
                      id={index}
                      type="checkbox"
                      name="recurring_days"
                      onChange={handleInput}
                      checked={classPostInfo.recurring_days.value.includes(
                        days
                      )}
                      value={days}
                    />
                    <label htmlFor={index}>{days}</label>
                  </>
                );
              })}
            </div>
            <FormError
              show={formError && !classPostInfo.recurring_days.isValid}
              error="Atleast one day should be selected."
            />
          </div>
        )}

        {recurringtype === "MONTHLY" && (
          <div className="OccuseZoomModelDaysinput mt-20">
            <p className="base text-xs w-400 mt-20 mb-20">Occurs On</p>
            <div className="formFieldwrap">
              <SelectInput
                id="Day"
                className="form-control"
                onChange={handleInput}
                name="monthly_day"
                defaultValue={classPostInfo.monthly_day.value}
                label="Day"
              >
                {dates.map((date) => {
                  return <option value={date}>{date}</option>;
                })}
              </SelectInput>
            </div>
            <p>Of the month</p>
          </div>
        )}
        <div className="questionMarkTooltip"></div>
      </div>
    </React.Fragment>
  );
};
export default Recurring;
