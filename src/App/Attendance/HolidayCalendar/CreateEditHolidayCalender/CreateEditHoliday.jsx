import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import MultipleClassroomsLevel from "./MultipleClassroomsLevel";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import { useDispatch } from "react-redux";
import {
  createHolidayDetails,
  editHolidayDetails,
  getSingleHoliday,
  resetCreateHoliday,
} from "../../../../store/actions/holidayCalender";
import moment from "moment";
const CreateEditHoliday = ({ _id, month, closeEditModal }) => {
  const dispatch = useDispatch();
  const {
    user,
    postHolidaySuccess,
    postHolidayLoading,
    editHolidayLoading,
    holidayDetails,
    holidayDetailsLoading,
    holidayDetailsSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      postHolidaySuccess: state.holidayCalendar.postHoliday.success,
      postHolidayLoading: state.holidayCalendar.postHoliday.loading,
      editHolidayLoading: state.holidayCalendar.editHoliday.loading,
      holidayDetails: state.holidayCalendar.getSingleHoliday.data,
      holidayDetailsSuccess: state.holidayCalendar.getSingleHoliday.success,
      holidayDetailsLoading: state.holidayCalendar.getSingleHoliday.loading,
    };
  });
  const [holidayTitle, setHolidayTitle] = useState("");
  const [holidayTitleError, setHolidayTitleError] = useState("");
  const [holidayLevel, setHolidayLevel] = useState("institute");
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);
  const [shortIntro, setShortIntro] = useState("");
  const [startFrom, setStartFrom] = useState("");
  const [endsOn, setEndsOn] = useState("");
  const [holidayType, setHolidayType] = useState("holiday");
  const [endsOnError, setEndsOnError] = useState("");
  const [startFromError, setStartFromError] = useState("");
  const history = useNavigate();
  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "holidayTitle":
        setHolidayTitle(inputValue);
        setHolidayTitleError(ValidationFile.isEmpty(inputValue));
        break;
      case "shortIntro":
        setShortIntro(inputValue);
        break;
      default:
        return false;
    }
  };
  const handleHolidayLevel = (level) => {
    setHolidayLevel(level);
  };
  const handleMultipleClassrooms = (value) => {
    setSelectedClassrooms(value);
  };
  const handleDate = (selectedDate, value) => {
    if (value === "startDate") {
      setStartFrom(selectedDate);
      setStartFromError(ValidationFile.isEmpty(selectedDate));
    } else {
      let endDate = moment(selectedDate).format();
      let endDateValid = new Date(endDate);
      setEndsOn(selectedDate);
      setEndsOnError(ValidationFile.isEmpty(selectedDate));
      setEndsOnError(endDateValid < startFrom);
    }
  };
  const handleHolidayType = (e) => {
    let type = e.target.name;
    setHolidayType(type);
  };
  const postEditData = () => {
    return {
      holidayTitle: holidayTitle,
      holidayLevel: holidayLevel,
      classroomId: selectedClassrooms,
      shortIntro: shortIntro,
      startFrom: startFrom,
      endOn: endsOn,
      holidayType: holidayType,
      institute: user.user_institute,
      owner: user._id,
    };
  };
  const handleSubmit = () => {
    if (ValidationFile.isEmpty(holidayTitle)) {
      setHolidayTitleError(true);
    }
    if (ValidationFile.isEmpty(startFrom)) {
      setStartFromError(true);
    }
    if (ValidationFile.isEmpty(endsOn) || endsOn < startFrom) {
      setEndsOnError(true);
    }
    if (
      !ValidationFile.isEmpty(holidayTitle) &&
      !ValidationFile.isEmpty(startFrom) &&
      !endsOnError
    ) {
      if (_id) {
        dispatch(editHolidayDetails(_id, postEditData(), month));
      } else {
        dispatch(createHolidayDetails(postEditData()));
      }
    }
  };
  const handleCancel = () => {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      history("/dashboard/holiday-calendar");
    } else {
      if (_id) {
        closeEditModal();
      } else {
        history("/admin-holiday-calender-list");
      }
    }
  };
  if (postHolidaySuccess) {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      history("/dashboard/holiday-calendar");
    } else {
      history("/admin-holiday-calender-list");
    }
  }
  const [isFilled, setFilled] = useState(false);
  if (_id && holidayDetailsSuccess && holidayDetails && !isFilled) {
    setFilled(true);
    setHolidayTitle(holidayDetails.holidayTitle);
    setHolidayLevel(holidayDetails.holidayLevel);
    setSelectedClassrooms(holidayDetails.classroomId);
    setShortIntro(holidayDetails.shortIntro);
    setStartFrom(holidayDetails.startFrom);
    setEndsOn(holidayDetails.endOn);
    setHolidayType(holidayDetails.holidayType);
  }
  useEffect(() => {
    if (_id) {
      dispatch(getSingleHoliday(_id));
    }
  }, [_id, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(resetCreateHoliday());
    };
  }, [dispatch]);
  return (
    <React.Fragment>
      <div className="HolidayCalender-Modal-Head mt-20">
        <p className="HeadNameCst text-sm w-500">
          {_id ? "Edit" : "Add"} Holiday
        </p>
        <div className="scroll-nav-tab-wrapper">
          <ul className="HolidayCalender-List-labeling">
            <li className="text-2xs w-500">H&nbsp;-&nbsp;Holiday</li>
            <li className="text-2xs w-500">V&nbsp;-&nbsp;Vacation</li>
            <li className="text-2xs w-500">A&nbsp;-&nbsp;Additional</li>
            <li className="text-2xs w-500">S&nbsp;-&nbsp;Statutory</li>
            <li className="text-2xs w-500">G&nbsp;-&nbsp;Gazetted</li>
          </ul>
        </div>
      </div>
      {_id && holidayDetailsLoading ? (
        <div className="loadingGridData">Loading...</div>
      ) : (
        <div className="add-new-holiday-Wrap mt-30">
          <div className="formFieldwrap">
            <FormInput
              type="text"
              onChange={handleInput}
              onKeyUp={handleInput}
              label="Holiday Title*"
              name="holidayTitle"
              value={holidayTitle}
              placeholder="Holiday Title"
            />
            <FormError
              show={holidayTitleError}
              error="Holiday Title is required."
            />
          </div>

          <div className="chooseHolidayLevel">
            <p className="text-xs w-600">Choose holiday level at</p>
            <div className="input-custom-type inline mt-10">
              <label className={holidayLevel === "institute" ? "active" : ""}>
                <input
                  value={holidayLevel}
                  onChange={() => handleHolidayLevel("institute")}
                  checked={holidayLevel === "institute"}
                  type="radio"
                  name="institute"
                />
                Whole Institute
              </label>
              <label className={holidayLevel === "classroom" ? "active" : ""}>
                <input
                  type="radio"
                  value={holidayLevel}
                  onChange={() => handleHolidayLevel("classroom")}
                  checked={holidayLevel === "classroom"}
                />
                Classrooms
              </label>
            </div>
            {holidayLevel === "classroom" && (
              <MultipleClassroomsLevel
                onSelectedValue={handleMultipleClassrooms}
                _id={_id}
              />
            )}
          </div>
          <div className="formFieldwrap mt-30">
            <FormTextArea
              type="phone"
              label="Short Introduction"
              placeholder="Short Introduction"
              maxlength="500"
              name="shortIntro"
              onChange={handleInput}
              value={shortIntro}
              onKeyUp={handleInput}
              TextareaBtmTxt="500"
            />
          </div>
          <div className="holidayScheduleCalender">
            <div className="datePickerWrap">
              <InputDatePicker
                label="Holiday start from"
                placeholder="Holiday start from"
                onSelect={(selectedDate) =>
                  handleDate(selectedDate, "startDate")
                }
                value={startFrom}
              />

              <FormError
                show={startFromError}
                error="Start Date is required."
              />
            </div>
            <div className="datePickerWrap">
              <InputDatePicker
                label="Holiday Ends On"
                placeholder="Holiday Ends On"
                onSelect={(selectedDate) => handleDate(selectedDate, "endDate")}
                value={endsOn}
              />
              <FormError
                show={endsOnError && !endsOn}
                error="Ends Date is required."
              />
              <FormError
                show={
                  endsOnError &&
                  (endsOn !== undefined || endsOn !== null || endsOn !== "")
                }
                error="Ends Date should be more than start date."
              />
            </div>
          </div>
          <div className="choose-Holiday-type mt-10">
            <p className="text-xs w-600">Choose holiday type</p>
            <div className="input-custom-type inline mt-10  scroll-top-menu-wrap">
              <label className="small">
                <input
                  value={holidayType}
                  checked={holidayType === "holiday"}
                  type="radio"
                  name="holiday"
                  onChange={handleHolidayType}
                />
                Holiday
              </label>
              <label className="small">
                <input
                  value={holidayType}
                  checked={holidayType === "vacation"}
                  type="radio"
                  name="vacation"
                  onChange={handleHolidayType}
                />
                Vacation
              </label>
              <label className="small">
                <input
                  value={holidayType}
                  checked={holidayType === "additional"}
                  type="radio"
                  name="additional"
                  onChange={handleHolidayType}
                />
                Additional
              </label>
              <label className="small">
                <input
                  value={holidayType}
                  checked={holidayType === "statutory"}
                  type="radio"
                  name="statutory"
                  onChange={handleHolidayType}
                />
                Statutory
              </label>
              <label className="small">
                <input
                  value={holidayType}
                  checked={holidayType === "gazetted"}
                  type="radio"
                  name="gazetted"
                  onChange={handleHolidayType}
                />
                Gazetted
              </label>
            </div>
          </div>
          <div className="holiday-action-cst mt-30 mb-30">
            {postHolidayLoading || editHolidayLoading ? (
              <button type="button" className="button btn-md button-theme">
                {_id ? "Editing..." : "Creating..."}
              </button>
            ) : (
              <button
                type="button"
                className="button btn-md button-theme"
                onClick={handleSubmit}
              >
                {_id ? "Update" : "Save"} Holiday&nbsp;&#62;
              </button>
            )}

            <button
              className="button btn-o-silver primary btn-md"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default CreateEditHoliday;
