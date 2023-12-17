/* eslint-disable no-unused-vars */
import moment from "moment";
import { element } from "prop-types";
// import { array } from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../../Classes/ValidationFile";
import ClassroomSelect from "../../../../Common/Form/ClassroomSelect";
import CourseSelect from "../../../../Common/Form/CourseSelect";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
// import FormInputWithIcon from "../../../../Common/Form/FormInputWithIcon";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import InputDateTimePicker from "../../../../Common/Form/InputDateTimePicker";
import MinutesSelect from "../../../../Common/Form/MinutesSelect";
import SearchIcon from "../icon-search.svg";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
// import { scheduleClass } from "../../../../store/actions/zoomApi";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../Common/UserElement";
import { getClassroomAssignedData } from "../../../../store/actions/classroomassigned";
import { } from "../../../../store/actions/MultiSelectDropDown";
import {
  classroomCreatedBy,
  editOnlineClasses,
  getCourseandClassroom,
  getOnlineClasses,
  getStudentList,
  postOnlineClasses,
  submitStudentList,
} from "../../../../store/actions/onlineClasses";
import StudentAssignTo from "../../../AdminDashboard/Courses/ViewClassroom/ClassroomOnlineClass/StudentAssignTo";
import RecurringClassesButton from "./RecurringClassesButton";
import SelectInput from "../../../../Common/Form/SelectInput";

const ZoomModal = ({ closeModal, editClassesData, isEditable }) => {
  // const [ScheduleClassModal, SetScheduleClassModal] = useState(false);

  const InsId = useSelector((state) => state.user.user_institute);
  const dispatch = useDispatch();

  const { users, isSuccess, studentList, selectedStudent } = useSelector(
    (state) => {
      return {
        users: state.user,
        isSuccess: state.onlineClasses.create.success,
        studentList: state.onlineClasses.studentList.data,
        selectedStudent: state.onlineClasses.selectedStudent,
        // isSuccess: state.zoomapi.success,
      };
    }
  );

  useEffect(() => {
    dispatch(
      getClassroomAssignedData(users._id, users.user_institute, "teacher")
    );
    dispatch(getOnlineClasses(users._id, InsId));
    dispatch(getCourseandClassroom(InsId));
    dispatch(classroomCreatedBy(users._id, InsId));
  }, [InsId, dispatch, users]);

  const emptyOnlineClassInfo = {
    course: {
      value: "",
      isValid: "",
    },
    classroom: {
      value: "",
      isValid: "",
    },
    class_timing: {
      value: "",
      isValid: "",
    },
    class_end_timing: {
      value: "",
      isValid: "",
    },
    duration: {
      value: "",
      isValid: "",
    },
    videoTopic: {
      value: "",
      isValid: "",
    },
    agenda: {
      value: "",
      isValid: "",
    },
  };

  useEffect(() => {
    isEditable &&
      setOnlineClassInfo({
        course: {
          value: editClassesData.course,
          isValid: editClassesData.course ? true : false,
        },
        classroom: {
          value: editClassesData.classroom,
          isValid: editClassesData.classroom ? true : false,
        },
        class_timing: {
          value: editClassesData.class_timing,
          isValid: editClassesData.class_timing ? true : false,
        },
        videoTopic: {
          value: editClassesData.topic,
          isValid: editClassesData.topic ? true : false,
        },
        agenda: {
          value: editClassesData.agenda,
          isValid: editClassesData.agenda ? true : false,
        },
        duration: {
          value: editClassesData.duration,
          isValid: editClassesData.duration ? true : false,
        },
      });
  }, [isEditable, editClassesData]);

  const [recurringClassObject, setRecurringClassObject] = useState({
    recurrence_type: {
      value: "1",
      isValid: true,
    },
    recurrence_repeat_interval: {
      value: "1",
      isValid: true,
    },
    recurrence_weekly_days: {
      value: [],
      isValid: false,
    },
    recurrence_monthly_day: {
      value: "1",
      isValid: true,
    },
    recurrence_end_date: {
      value: "",
      isValid: false,
    },
  });

  const [onlineclassInfo, setOnlineClassInfo] = useState(emptyOnlineClassInfo);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [videoId, setVideoId] = useState("");

  const handleDatePicker = (datetime) => {
    let onlineclassInfoData = {
      ...onlineclassInfo,
      class_timing: {
        value: datetime,
        isValid: ValidationFile.compareCurrentDateTime(datetime),
      },
      validation: isFormValid(),
    };

    setOnlineClassInfo(onlineclassInfoData);
  };

  const [isOneTimeClassActive, setIsOneTimeClassActive] = useState(true);

  const handleRecurrenceType = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    let recurringClassObj = {
      ...recurringClassObject,
      [inputName]: {
        value: inputValue,
        isValid: true,
      },
    };
    setRecurringClassObject(recurringClassObj);

    if (inputValue === "3") {
      getDateInMonth(32);
    } else if (inputValue === "2") {
      getDateInMonth(13);
    }
  };

  const handleIntervalForDays = (e) => {
    let inputValue = e.target.value;

    setRecurringClassObject({
      ...recurringClassObject,
      recurrence_repeat_interval: {
        value: inputValue,
        isValid: inputValue > 0 && inputValue < 91 ? true : false,
      },
    });
  };

  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  const weekdaysName = [
    { weekname: "SUN", weekCode: 1 },
    { weekname: "MON", weekCode: 2 },
    { weekname: "TUE", weekCode: 3 },
    { weekname: "WED", weekCode: 4 },
    { weekname: "THU", weekCode: 5 },
    { weekname: "FRI", weekCode: 6 },
    { weekname: "SAT", weekCode: 7 },
  ];

  const handleTypeOfClass = () => {
    setIsOneTimeClassActive(!isOneTimeClassActive);
  };

  const [data, setdata] = useState({});

  const recurringWeekDays = (e) => {
    let inputName = e.target.name;
    let isChecked = e.target.checked;

    let singleCodeObj = {
      ...data,
      [inputName]: isChecked,
    };
    setdata(singleCodeObj);
  };

  useEffect(() => {
    const asArray = Object.entries(data);
    const filteredCode = asArray.filter(([key, value]) => value !== false);
    let convertObj = Object.fromEntries(filteredCode);
    let getSelectedName = Object.keys(convertObj);
    setRecurringClassObject({
      ...recurringClassObject,
      recurrence_weekly_days: {
        // value: getSelectedName.join(","),
        value: getSelectedName,
        isValid: getSelectedName.length > 0 ? true : false,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const findDayNameForZoom = (arrayString) => {
    return JSON.parse("[" + arrayString + "]");
  };

  const [editedWeek, setEditedWeek] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const handleEditWeek = (selectedWeek = []) => {
    //handling week for edited data
    let converStringIntoArr = JSON.parse("[" + selectedWeek + "]");
    const reformedIntoObject = converStringIntoArr.reduce(
      (acc, currentKey) => ({ ...acc, [currentKey]: true }),
      {}
    );
    const updatedMode = Object.assign({}, editedWeek, reformedIntoObject);
    setEditedWeek(updatedMode);
  };

  useEffect(() => {
    handleEditWeek(recurringClassObject.recurrence_weekly_days.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const handleWeekDaysForEdit = (e) => {
    let name = e.target.name;
    let isChecked = e.target.checked;

    let singleCodeObj = {
      [name]: isChecked,
    };

    setEditedWeek({ ...editedWeek, ...singleCodeObj });

    let merged = Object.assign({}, editedWeek, singleCodeObj);

    const asArray = Object.entries(merged);
    const filteredCode = asArray.filter(([key, value]) => value !== false);
    let convertObj = Object.fromEntries(filteredCode);
    let getSelectedName = Object.keys(convertObj);
    // setSelectedWeek(getSelectedName);

    setRecurringClassObject({
      ...recurringClassObject,
      recurrence_weekly_days: {
        value: getSelectedName,
        isValid: getSelectedName.length > 0 ? true : false,
      },
    });
  };

  function getDay(ip) {
    // [1,2,3]
    let arr = [];
    let Day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    ip.map((day) => {
      return arr.push(Day[day - 1]);
    });

    // for (let j = 0; j < ip.length; j++) {
    //   const t = Day.indexOf(Day.find((i) => i.includes(ip[j].trim())));
    //   arr.push(Day[t]);
    // }
    return arr.toString();
  }

  let start = moment(onlineclassInfo.class_timing.value, "YYYY-MM-DD");
  let end = moment(
    recurringClassObject.recurrence_end_date.value,
    "YYYY-MM-DD"
  );

  const dynamicScheuleTex = () => {
    if (recurringClassObject.recurrence_type.value === "1") {
      return `EveryDay Untill ${moment(
        recurringClassObject.recurrence_end_date.value
      ).format("ll")}, ${Math.abs(
        moment.duration(start.diff(end)).asDays()
      )} Occurrences.`;
    } else if (recurringClassObject.recurrence_type.value === "2") {
      return `Every week on ${getDay(
        recurringClassObject.recurrence_weekly_days.value
      )} Untill ${moment(recurringClassObject.recurrence_end_date.value).format(
        "ll"
      )}, ${Math.round(moment.duration(start.diff(end)).asWeeks()) * -1
        } Occurrences.`;
    } else if (recurringClassObject.recurrence_type.value === "3") {
      return `Every ${recurringClassObject.recurrence_repeat_interval.value === "1"
        ? "Month"
        : recurringClassObject.recurrence_repeat_interval.value + " Month"
        } on the ${recurringClassObject.recurrence_monthly_day.value
        } of the month, Until ${moment(
          recurringClassObject.recurrence_end_date.value
        ).format("ll")}, ${Math.round(
          moment(new Date(end)).diff(new Date(start), "months", true) /
          recurringClassObject.recurrence_repeat_interval.value
        )} Occurrences.`;
    }
  };

  const dynamicWarningText = () => {
    if (recurringClassObject.recurrence_type.value === "1") {
      return "Max 90 Days";
    } else if (recurringClassObject.recurrence_type.value === "2") {
      return "Max 12 Week";
    } else if (recurringClassObject.recurrence_type.value === "3") {
      return "Max 3 Month";
    }
  };

  // const [recurrenceDateInMonth, setRecurrenceDateInMonth] = useState(1);
  const [date, setDate] = useState([]);

  useEffect(() => {
    if (recurringClassObject.recurrence_type.value === "3") {
      getDateInMonth(32);
    } else if (recurringClassObject.recurrence_type.value === "2") {
      getDateInMonth(13);
    }
  }, [recurringClassObject.recurrence_type.value]);

  function getDateInMonth(endValue) {
    const date = [];
    for (let startDate = 1; startDate < endValue; startDate++) {
      date.push(startDate);
    }
    setDate(date);
  }

  const endDatePicker = (datetime) => {
    let onlineclassInfoData = {
      ...recurringClassObject,
      recurrence_end_date: {
        value: datetime,
        isValid: ValidationFile.compareCurrentDateTime(datetime),
      },
      validation: isRecurringClassValid(),
    };

    setRecurringClassObject(onlineclassInfoData);
  };

  // this state used for selected student list from assign to student.
  // const [selectedStudent, setSelectedStudent] = useState([]);

  // const formatingStudentListData = () => {
  //   const studentsListData = [];
  //   studentList.map((element) => {
  //     const stdData = {
  //       student_user_id: element._id,
  //       student_institute_id: element.institute,
  //       student_classroom_id: element.classroom,
  //       student_course_id: element.course,
  //     };
  //     return studentsListData.push(stdData);
  //   });
  //   return studentsListData;
  // };

  const getFormData = () => {
    return {
      course: onlineclassInfo.course.value,
      classroom: onlineclassInfo.classroom.value,
      course_coursename: onlineclassInfo.course.value,
      classroom_classroomname: onlineclassInfo.classroom.value,
      class_timing: onlineclassInfo.class_timing.value,
      // end_timing: convertHrsIntoMinutes(),
      duration: onlineclassInfo.duration.value,
      institute: users.user_institute,
      owner: users._id,
      topic: onlineclassInfo.videoTopic.value,
      agenda: onlineclassInfo.agenda.value,
      meetingPassword: 1234,
      class_type: isOneTimeClassActive ? 2 : 8,
      recurrence: {
        type: +recurringClassObject.recurrence_type.value,
        repeat_interval: +recurringClassObject.recurrence_repeat_interval.value,
        weekly_days:
          recurringClassObject.recurrence_weekly_days.value.join(","),
        monthly_day: recurringClassObject.recurrence_monthly_day.value,
        end_date_time: recurringClassObject.recurrence_end_date.value
          ? recurringClassObject.recurrence_end_date.value
          : moment(onlineclassInfo.class_timing.value)
            .add(onlineclassInfo.duration.value, "m")
            .format(),
      },
      assignedClasses: selectedStudent,
      videoMeetingId: videoId,
    };
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setShowSubmitError(true);
    // convertHrsIntoMinutes();

    if (isOneTimeClassActive) {
      // if onetime class active

      if (isFormValid()) {
        dispatch(postOnlineClasses(getFormData()));
        setIsLoading(true);
      }
    } else {
      // if recurring class active then check validation
      if (isFormValid() && isRecurringClassValid()) {
        dispatch(postOnlineClasses(getFormData()));
        setIsLoading(true);
      }
    }
  };

  const [classId, setClassId] = useState();

  const submitMeetForEdit = () => {
    setShowSubmitError(true);
    // convertHrsIntoMinutes();

    if (isOneTimeClassActive) {
      // if onetime class active
      if (isFormValid()) {
        dispatch(editOnlineClasses(classId, getFormData()));
        setIsLoading(true);
      }
    } else {
      // if recurring class active
      if (isFormValid() && isRecurringClassValid()) {
        dispatch(editOnlineClasses(classId, getFormData()));
        setIsLoading(true);
      }
    }
  };

  useEffect(() => {
    setIsLoading(false);
    // isSuccess && SetScheduleClassModal(!ScheduleClassModal);
    isSuccess && closeModal();
  }, [dispatch, isSuccess, closeModal]);

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value === "not selected" ? 0 : e.target.value;
    let onlineclassInfoData = {
      ...onlineclassInfo,
      [inputName]: {
        value: inputValue === "not selected" ? 0 : inputValue,
        isValid: validationConfirm(inputName, inputValue),
      },

      validation: isFormValid(),
    };
    setOnlineClassInfo(onlineclassInfoData);
  };

  const isFormValid = () => {
    return onlineclassInfo.course.isValid &&
      onlineclassInfo.classroom.isValid &&
      onlineclassInfo.class_timing.isValid &&
      onlineclassInfo.agenda.isValid &&
      onlineclassInfo.videoTopic.isValid &&
      onlineclassInfo.duration.isValid
      ? true
      : false;
  };

  const checkValidationOfIntervalAndType = () => {
    if (recurringClassObject.recurrence_type.value === "2") {
      return recurringClassObject.recurrence_weekly_days.isValid;
    } else if (recurringClassObject.recurrence_type.value === "1") {
      return recurringClassObject.recurrence_repeat_interval.isValid;
    } else if (recurringClassObject.recurrence_type.value === "3") {
      return recurringClassObject.recurrence_repeat_interval.isValid;
    }
  };

  const isRecurringClassValid = () => {
    return recurringClassObject.recurrence_end_date.isValid &&
      checkValidationOfIntervalAndType()
      ? true
      : false;
  };

  const validationConfirm = (key, value) => {
    switch (key) {
      case "course":
      case "classroom":
      case "class_timing":
      case "duration":
      case "agenda":
      case "videoTopic":
        return ValidationFile.validEmpty(value);
      default:
        return false;
    }
  };

  useEffect(() => {
    //for updating recurrence state when click on edit.
    isEditable &&
      editClassesData.class_type !== 2 &&
      setRecurringClassObject({
        recurrence_type: {
          value: editClassesData.recurrence_type.toString(),
          isValid: editClassesData.recurrence_type.toString() ? true : false,
        },
        recurrence_repeat_interval: {
          value: editClassesData.repeat_interval.toString(),
          isValid: editClassesData.repeat_interval ? true : false,
        },
        recurrence_weekly_days: {
          value: findDayNameForZoom(editClassesData.repeated_days),
          // value: editClassesData.repeated_days,
          isValid:
            findDayNameForZoom(editClassesData.repeated_days).length > 0
              ? true
              : false,
        },
        recurrence_monthly_day: {
          value: editClassesData.monthly_day,
          isValid: editClassesData.monthly_day ? true : false,
        },
        recurrence_end_date: {
          value: editClassesData.end_timing,
          isValid: editClassesData.end_timing ? true : false,
        },
      });
    isEditable &&
      setIsOneTimeClassActive(editClassesData.class_type === 2 ? true : false);
    isEditable && setVideoId(editClassesData.video_meeting_id);
    isEditable && setClassId(editClassesData._id);
  }, [isEditable, editClassesData]);

  const instituteId = users.user_institute;
  const classroomId = onlineclassInfo.classroom.value;
  const courseId = onlineclassInfo.course.value;

  const [isSearchStudent, setIsSearchStudent] = useState(false);

  // const getStudentforClassroom = () => {
  //   if (onlineclassInfo.course.isValid && onlineclassInfo.classroom.isValid) {
  //     dispatch(getStudentList(courseId, classroomId, instituteId));
  //     setIsSearchStudent(true);
  //   }
  // };

  useEffect(() => {
    if (onlineclassInfo.course.isValid && onlineclassInfo.classroom.isValid) {
      dispatch(getStudentList(courseId, classroomId, instituteId));
      setIsSearchStudent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineclassInfo.classroom.value]);

  const [searchWords, setSearchWords] = useState("");

  const searchStudents = (e) => {
    setSearchWords(e.target.value);
  };

  return (
    <div>
      <ModalBody className={"teachonlineclasspopcutomeheight"}>
        <div className="TeacherScheduleClassModal mt-20">
          <div className="formFieldwrap">
            <CourseSelect
              className={
                !onlineclassInfo.course.isValid && showSubmitError
                  ? "errorInput"
                  : ""
              }
              key="courseSelect"
              name="course"
              value={onlineclassInfo.course.value}
              onEvent={handleInput}
              autoevent={true}
              disabled={isEditable ? true : false}
              label="Course"
            />
            <FormError
              show={!onlineclassInfo.course.isValid && showSubmitError}
              error={DynamicCourseHeader() + " required."}
            />
          </div>

          <div className="formFieldwrap">
            <ClassroomSelect
              className={
                !onlineclassInfo.classroom.isValid && showSubmitError
                  ? "errorInput"
                  : ""
              }
              key="classroomSelect"
              name="classroom"
              value={onlineclassInfo.classroom.value}
              onEvent={handleInput}
              disabled={isEditable ? true : false}
              // onClick={getStudentforClassroom}
              label="Classroom"
            />
            <FormError
              show={!onlineclassInfo.classroom.isValid && showSubmitError}
              error={DynamicClassroomHeader() + " required."}
            />
          </div>

          <div className="datePickerWrap">
            <InputDateTimePicker
              className={
                !onlineclassInfo.class_timing.isValid && showSubmitError
                  ? "errorInput"
                  : ""
              }
              label="Class Start Date & Time"
              name="class_timing"
              onSelect={(selectedDate) => handleDatePicker(selectedDate)}
              value={onlineclassInfo.class_timing.value}
              id="class_timing"
              type="datetime-local"
              placeholder="Class Start Date & Time"
              minDate={new Date()}
            // dateFormat="Do MMM. YYYY, h:mm A"
            />
            <FormError
              show={!onlineclassInfo.class_timing.isValid && showSubmitError}
              error="Class-Time should be in future."
            />
          </div>

          {/* <div> */}
          <div className="formFieldwrap">
            <MinutesSelect
              start={5}
              end={40}
              step={4}
              name={"duration"}
              defaultSelect={
                isEditable ? onlineclassInfo.duration.value : "Select Minutes"
              }
              onEvent={handleInput}
              className={
                !onlineclassInfo.duration.isValid && showSubmitError
                  ? "errorInput"
                  : ""
              }
              label="Duration"
            />
            <FormError
              show={!onlineclassInfo.duration.isValid && showSubmitError}
              error="Minutes required."
            />
          </div>
          {/* </div> */}

          <StudentAssignTo
            studentList={studentList}
            handleSearchStudents={searchStudents}
            selectedStudent={selectedStudent}
            // handleSelectStudent={selectStudent}
            isValid={onlineclassInfo.classroom.isValid}
            isSearchStudent={isSearchStudent}
            searchWords={searchWords}
          />



          {/* Recurring Class Modal */}
          <RecurringClassesButton
            handleTypeOfClass={handleTypeOfClass}
            isOneTimeClassActive={isOneTimeClassActive}
            getDateInMonth={getDateInMonth}
            isEditable={isEditable}
          />

          {!isOneTimeClassActive && (
            <div className="formFieldwrap Recurringreapton mb-30">
              <div className="timemangerRecurring">
                <div className="repeatcountminmax">
                  {recurringClassObject.recurrence_type.value === "1" ? (
                    <React.Fragment>
                      <FormInput
                        className={
                          !recurringClassObject.recurrence_repeat_interval
                            .isValid &&
                            showSubmitError &&
                            !isOneTimeClassActive
                            ? "errorInput"
                            : ""
                        }
                        name="repeatCount"
                        type="number"
                        label="Repeat Interval"
                        value={
                          recurringClassObject.recurrence_repeat_interval.value
                        }
                        min="1"
                        max="90"
                        onChange={handleIntervalForDays}
                        onWheel={numberInputOnWheelPreventChange}
                      />
                      <FormError
                        show={
                          !recurringClassObject.recurrence_repeat_interval
                            .isValid &&
                          showSubmitError &&
                          !isOneTimeClassActive
                        }
                        error="Interval should be between 1 and 90 days."
                      />
                    </React.Fragment>
                  ) : recurringClassObject.recurrence_type.value === "2" ? (
                    <div className="formFieldwrap">
                      <SelectInput
                        id="select_Course"
                        className="form-control"
                        onChange={handleRecurrenceType}
                        name="recurrence_repeat_interval"
                        value={
                          recurringClassObject.recurrence_repeat_interval.value
                        }
                        label="Repeat Interval"
                      >
                        {date.map((individualDate) => {
                          return (
                            <option key={individualDate} value={individualDate}>
                              {individualDate}
                            </option>
                          );
                        })}
                      </SelectInput>
                    </div>
                  ) : (
                    <div className="formFieldwrap">
                      <SelectInput
                        id="select_Course"
                        className="form-control"
                        onChange={handleRecurrenceType}
                        name="recurrence_repeat_interval"
                        value={
                          recurringClassObject.recurrence_repeat_interval.value
                        }
                        label="Repeat Interval"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </SelectInput>
                    </div>
                  )}
                </div>

                <div className="formFieldwrap">
                  <SelectInput
                    id="select_Course"
                    className="form-control"
                    value={recurringClassObject.recurrence_type.value}
                    onChange={handleRecurrenceType}
                    name="recurrence_type"
                    label="Type"
                  >
                    <option value="1">Daily</option>
                    <option value="2">Weekly</option>
                    <option value="3">Monthly</option>
                  </SelectInput>
                </div>

                <div className="datePickerWrap ">
                  <InputDatePicker
                    className={
                      !recurringClassObject.recurrence_end_date.isValid &&
                        showSubmitError &&
                        !isOneTimeClassActive
                        ? "errorInput"
                        : ""
                    }
                    label="Ends On"
                    name="ends-on"
                    id="ends-on"
                    type="datetime-local"
                    minDate={onlineclassInfo.class_timing.value}
                    onSelect={(selectedDate) => endDatePicker(selectedDate)}
                    value={recurringClassObject.recurrence_end_date.value}
                    disabled={onlineclassInfo.class_timing.value ? false : true}
                    dateFormat="dd MMM, yyyy"
                  />
                  <FormError
                    show={
                      !recurringClassObject.recurrence_end_date.isValid &&
                      showSubmitError &&
                      !isOneTimeClassActive
                    }
                    error="End Time should not be empty."
                  />
                  <FormError
                    show={!onlineclassInfo.class_timing.isValid}
                    error="Please Select Class Start Time First."
                  />
                </div>
              </div>
              <p className="secondary text-xxs w-400 mt-20 mb-10">
                {dynamicWarningText()}
              </p>
              {recurringClassObject.recurrence_type.value === "2" && (
                <React.Fragment>
                  <p className="base text-xs w-400 mb-10">Occurs On</p>
                  <div className="weekdayerrormassage">
                    <div className="weekdayrecurring scroll-top-menu-wrap text-xxs">
                      {weekdaysName.map((weekdays, index) => {
                        return (
                          <React.Fragment key={weekdays.weekCode}>
                            <input
                              id={index}
                              type="checkbox"
                              name={weekdays.weekCode}
                              onChange={
                                isEditable
                                  ? handleWeekDaysForEdit
                                  : recurringWeekDays
                              }
                              defaultChecked={
                                recurringClassObject.recurrence_weekly_days.value.find(
                                  (item) => item === weekdays.weekCode
                                )
                                  ? true
                                  : false
                              }
                            />
                            <label htmlFor={index}>{weekdays.weekname}</label>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <FormError
                      show={
                        !recurringClassObject.recurrence_weekly_days.isValid &&
                        showSubmitError &&
                        !isOneTimeClassActive
                      }
                      error="Please select weekdays."
                    />
                  </div>
                </React.Fragment>
              )}
              {recurringClassObject.recurrence_type.value === "3" && (
                <React.Fragment>
                  <div className="OccuseZoomModelDaysinput">
                    <p className="base text-xs w-400 mt-20 mb-20">Occurs On</p>
                    <div className="formFieldwrap">
                      <SelectInput
                        id="Day"
                        className="form-control"
                        onChange={handleRecurrenceType}
                        name="recurrence_monthly_day"
                        label="Day"
                      >
                        {date.map((individualDate) => {
                          return (
                            <option value={individualDate}>
                              {individualDate}
                            </option>
                          );
                        })}
                      </SelectInput>
                    </div>
                    <p>Of the month</p>
                  </div>
                </React.Fragment>
              )}
              <p>
                {recurringClassObject.recurrence_end_date.value &&
                  onlineclassInfo.class_timing.value &&
                  dynamicScheuleTex()}
              </p>
            </div>
          )}

          <div className="formFieldwrap">
            <FormInput
              className={
                !onlineclassInfo.videoTopic.isValid && showSubmitError
                  ? "errorInput"
                  : ""
              }
              name="videoTopic"
              onChange={handleInput}
              value={onlineclassInfo.videoTopic.value}
              type="text"
              label="Topic"
              placeholder="Enter Video Topic"
              autoComplete="off"
            />
            <FormError
              show={!onlineclassInfo.videoTopic.isValid && showSubmitError}
              error="Topic required."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              className={
                !onlineclassInfo.agenda.isValid && showSubmitError
                  ? "errorInput"
                  : ""
              }
              name="agenda"
              type="text"
              onChange={handleInput}
              label="Agenda"
              placeholder="Enter video agenda/purpose"
              value={onlineclassInfo.agenda.value}
              autoComplete="off"
            />
            <FormError
              show={!onlineclassInfo.agenda.isValid && showSubmitError}
              error="Agenda required."
            />
          </div>
          {/* <div className="formFieldwrap">
            <FormInputWithIcon
              className={
                !onlineclassInfo.meetingPassword.isValid && showSubmitError
                  ? "errorInput"
                  : ""
              }
              name="meetingPassword"
              type="password"
              onChange={handleInput}
              label="meeting password"
              placeholder="Enter meeting password"
            />
            <FormError
              show={!onlineclassInfo.meetingPassword.isValid && showSubmitError}
              error="Password required."
            />
          </div> */}
        </div>
      </ModalBody >

      <ModalFooter>
        <div className="row">
          <div className="col-xs-12">
            {!isLoading ? (
              !isEditable ? (
                <button
                  className="button btn-md button-theme"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  Schedule Now!
                </button>
              ) : (
                <button
                  className="button btn-md button-theme"
                  onClick={() => {
                    submitMeetForEdit();
                  }}
                >
                  Update Class
                </button>
              )
            ) : (
              <button className="button btn-md button-theme">Loading...</button>
            )}
          </div>
        </div>
      </ModalFooter>
    </div>
  );
};

export default ZoomModal;
