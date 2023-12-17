/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Storage from "../../../../Classes/Storage";
import ValidationFile from "../../../../Classes/ValidationFile";
import ClassroomSelect from "../../../../Common/Form/ClassroomSelect";
import CourseSelect from "../../../../Common/Form/CourseSelect";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import InputDateTimePicker from "../../../../Common/Form/InputDateTimePicker";
import MinutesSelect from "../../../../Common/Form/MinutesSelect";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import TimePicker from "../../../../Common/Form/TimePicker";
import SearchIcon from "../icon-search.svg";
import IconTootltip from "./icon-tooltip.svg";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../Common/UserElement";
import { classes_constant } from "../../../../Constant/classes";
import {
  getStudentList,
  storeGoogleMeetResData,
  storeGoogleMeetResDataForEdit,
  submitStudentList,
} from "../../../../store/actions/onlineClasses";

import {
  createGoogleMeetEvent,
  editGoogleMeetEvent,
  setSuccessFalse,
} from "../../../../store/actions/zoomApi";
import CreateEvent from "../GoogleMeet/CreateEvent";
import MeetLink from "../GoogleMeet/MeetLink";
import RecurringClassesButton from "./RecurringClassesButton";
import StudentAssignTo from "../../../AdminDashboard/Courses/ViewClassroom/ClassroomOnlineClass/StudentAssignTo";
import SelectInput from "../../../../Common/Form/SelectInput";

const MeetModal = ({ closeModal, editClassesData, isEditable }) => {
  // const [isSchduleViaGoogle, setIsSchduleViaGoogle] = useState(false);
  const [isAuthTokenForMeetAvailable, setIsAuthTokenForMeetAvailable] =
    useState(false);

  useEffect(() => {
    // let isSelectedMeet = localStorage.getItem("isChooseMeet");
    let meetAuthToken = localStorage.getItem(classes_constant.meettoken);
    let isTokenValid = meetAuthToken ? true : false;

    // setIsSchduleViaGoogle(isSelectedMeet);
    setIsAuthTokenForMeetAvailable(isTokenValid);
  }, []);

  const dispatch = useDispatch();

  const {
    users,
    isSuccess,
    meetEventData,
    meetEventDataForEdit,
    isEditSuccess,
    studentList,
    selectedStudent,
  } = useSelector((state) => {
    return {
      users: state.user,
      isSuccess: state.zoomapi.googleMeetData.success,
      isEditSuccess: state.zoomapi.googleMeetEditData.success,
      meetEventData: state.zoomapi.googleMeetData.eventData,
      meetEventDataForEdit: state.zoomapi.googleMeetEditData.eventData,
      studentList: state.onlineClasses.studentList.data,
      selectedStudent: state.onlineClasses.selectedStudent,
    };
  });

  const isTokenExpired = useSelector(
    (state) => state.zoomapi.googleMeetData.isTokenExpire
  );

  // __ed_gmt__
  useEffect(() => {
    isTokenExpired && localStorage.removeItem("__ed_gmt__");
    if (isTokenExpired) {
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  }, [isTokenExpired]);

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
    class_start_timing: {
      value: "",
      isValid: "",
    },
    duration: {
      value: "",
      isValid: "",
    },
    hours: {
      value: 0,
      isValid: "",
    },
    minutes: {
      value: 0,
      isValid: "",
    },
    videoSummary: {
      value: "",
      isValid: "",
    },
    description: {
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
        class_start_timing: {
          value: editClassesData.class_timing,
          isValid: editClassesData.class_timing ? true : false,
        },
        duration: {
          value: editClassesData.duration,
          isValid: editClassesData.duration ? true : false,
        },
        hours: {
          value: Math.floor(+editClassesData.duration / 60),
          isValid: Math.floor(+editClassesData.duration / 60) ? true : false,
        },
        minutes: {
          value: +editClassesData.duration % 60,
          isValid: +editClassesData.duration % 60 ? true : false,
        },
        videoSummary: {
          value: editClassesData.topic,
          isValid: editClassesData.topic ? true : false,
        },
        description: {
          value: editClassesData.agenda,
          isValid: editClassesData.agenda ? true : false,
        },
      });
  }, [isEditable, editClassesData]);

  const [recurringClassObject, setRecurringClassObject] = useState({
    recurrence_type: {
      value: "DAILY",
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
  const [showGoogleSubmitError, setShowGoogleSubmitError] = useState(false);
  const [isOneTimeClassActive, setIsOneTimeClassActive] = useState(true);
  const [videoId, setVideoId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlStarteDatePicker = (datetime) => {
    // start time handler
    let onlineclassInfoData = {
      ...onlineclassInfo,
      class_start_timing: {
        value: moment(datetime).format(),
        isValid: ValidationFile.compareCurrentDateTime(datetime),
      },
      // validation: isFormValid(),
      validation: isMeetResoursesValid(),
    };
    setOnlineClassInfo(onlineclassInfoData);
  };

  const convertHrsIntoMinutes = () => {
    // convert hourse into toatal minutes
    let hours = parseInt(onlineclassInfo.hours.value);
    let hoursIntoMinutes = hours * 60;
    let minutes = onlineclassInfo.minutes.value
      ? parseInt(onlineclassInfo.minutes.value)
      : 0;
    return minutes + hoursIntoMinutes;
  };

  // recurring class  ---------------------

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
    if (inputValue === "MONTHLY") {
      getDateInMonth(32);
    } else if (inputValue === "WEEKLY") {
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

  const weekdaysName = [
    //for mapping into UI
    { weekname: "SUN", weekCode: "SU" },
    { weekname: "MON", weekCode: "MO" },
    { weekname: "TUE", weekCode: "TU" },
    { weekname: "WED", weekCode: "WE" },
    { weekname: "THU", weekCode: "TH" },
    { weekname: "FRI", weekCode: "FR" },
    { weekname: "SAT", weekCode: "SA" },
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
        value: getSelectedName,
        isValid: getSelectedName.length > 0 ? true : false,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // const [selectedWeek, setSelectedWeek] = useState();
  const [editedWeek, setEditedWeek] = useState({
    SU: false,
    MO: false,
    TU: false,
    WE: false,
    TH: false,
    FR: false,
    SA: false,
  });

  const handleEditWeek = (selectedWeek = []) => {
    //handling week for edited data
    const reformedIntoObject = selectedWeek.reduce(
      (acc, currentKey) => ({ ...acc, [currentKey]: true }),
      {}
    );
    const updatedMode = Object.assign({}, editedWeek, reformedIntoObject);
    // setSelectedWeek(updatedMode);
    setEditedWeek(updatedMode);
  };

  useEffect(() => {
    // updating this based on videoId bcz it will re-render after data successfully fetched and set into the state
    recurringClassObject.recurrence_weekly_days.value &&
      handleEditWeek(recurringClassObject.recurrence_weekly_days.value);
  }, [videoId]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const dynamicWarningText = () => {
    if (recurringClassObject.recurrence_type.value === "DAILY") {
      return "Max 90 Days";
    } else if (recurringClassObject.recurrence_type.value === "WEEKLY") {
      return "Max 12 Week";
    } else if (recurringClassObject.recurrence_type.value === "MONTHLY") {
      return "Max 3 Month";
    }
  };

  function getDay(ip) {
    let arr = [];
    let Day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let j = 0; j < ip.length; j++) {
      const t = Day.indexOf(Day.find((i) => i.includes(ip[j].trim())));
      arr.push(Day[t]);
    }
    return arr.toString();
  }

  let start = moment(onlineclassInfo.class_start_timing.value, "YYYY-MM-DD");
  let end = moment(
    recurringClassObject.recurrence_end_date.value,
    "YYYY-MM-DD"
  );

  const dynamicScheuleTex = () => {
    if (recurringClassObject.recurrence_type.value === "DAILY") {
      return `EveryDay Untill ${moment(
        recurringClassObject.recurrence_end_date.value
      ).format("ll")}, ${Math.abs(
        moment.duration(start.diff(end)).asDays()
      )} Occurrences.`;
    } else if (recurringClassObject.recurrence_type.value === "WEEKLY") {
      return `Every week on ${getDay(
        recurringClassObject.recurrence_weekly_days.value
      )} Untill ${moment(recurringClassObject.recurrence_end_date.value).format(
        "ll"
      )}, ${Math.round(moment.duration(start.diff(end)).asWeeks()) * -1
        } Occurrences.`;
    } else if (recurringClassObject.recurrence_type.value === "MONTHLY") {
      return `Every ${recurringClassObject.recurrence_repeat_interval.value === "1"
        ? "Month"
        : recurringClassObject.recurrence_repeat_interval.value + "Month"
        } on the ${recurringClassObject.recurrence_monthly_day.value
        } of the month, Until ${moment(
          recurringClassObject.recurrence_end_date.value
        ).format("ll")}, ${Math.round(
          moment(new Date(end)).diff(new Date(start), "months", true) /
          recurringClassObject.recurrence_repeat_interval.value
        )} Occurrences.`;
    }
  };

  const [date, setDate] = useState([]);

  useEffect(() => {
    if (recurringClassObject.recurrence_type.value === "MONTHLY") {
      getDateInMonth(32);
    } else if (recurringClassObject.recurrence_type.value === "WEEKLY") {
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

  const checkValidationOfIntervalAndType = () => {
    if (recurringClassObject.recurrence_type.value === "WEEKLY") {
      return recurringClassObject.recurrence_weekly_days.isValid;
    } else if (recurringClassObject.recurrence_type.value === "DAILY") {
      return recurringClassObject.recurrence_repeat_interval.isValid;
    } else if (recurringClassObject.recurrence_type.value === "MONTHLY") {
      return recurringClassObject.recurrence_repeat_interval.isValid;
    }
  };

  const isRecurringClassValid = () => {
    return recurringClassObject.recurrence_end_date.isValid &&
      checkValidationOfIntervalAndType()
      ? true
      : false;
  };

  if (isSuccess) {
    // after scheduling class
    // setOnlineClassInfo(emptyOnlineClassInfo);
    setShowSubmitError(false);
    dispatch(setSuccessFalse());
    dispatch(storeGoogleMeetResData(meetEventData));
    setVideoId("");
    closeModal();
  }

  if (isEditSuccess) {
    // after edited scheduled class
    dispatch(setSuccessFalse());
    dispatch(storeGoogleMeetResDataForEdit(meetEventDataForEdit));
    setVideoId("");
    closeModal();
  }

  useEffect(() => {
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isSuccess, isEditSuccess]);

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value === "not selected" ? 0 : e.target.value;
    let onlineclassInfoData = {
      ...onlineclassInfo,
      [inputName]: {
        value: inputValue === "not selected" ? 0 : inputValue,
        isValid: validationConfirm(inputName, inputValue),
      },

      validation: isMeetResoursesValid(),
    };
    setOnlineClassInfo(onlineclassInfoData);
  };

  const isMeetResoursesValid = () => {
    return onlineclassInfo.course.isValid &&
      onlineclassInfo.classroom.isValid &&
      onlineclassInfo.class_start_timing.isValid &&
      onlineclassInfo.videoSummary.isValid &&
      onlineclassInfo.description.isValid
      ? true
      : false;
  };

  const validationConfirm = (key, value) => {
    switch (key) {
      case "course":
      case "classroom":
      case "class_timing":
      case "class_start_timing":
      case "hours":
      case "minutes":
      case "videoSummary":
      case "description":
        return ValidationFile.validEmpty(value);
      default:
        return false;
    }
  };

  const hoursAndMinutesIsValid = () => {
    return onlineclassInfo.hours.isValid || onlineclassInfo.minutes.isValid
      ? false
      : true;
  };

  const authData = localStorage.getItem(classes_constant.meettoken);
  const token = authData ? Storage.getJson(classes_constant.meettoken) : "";

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

  const meetResourse = {
    // payload for network calling
    data: {
      course: onlineclassInfo.course.value,
      classroom: onlineclassInfo.classroom.value,
      start: onlineclassInfo.class_start_timing.value,
      end: isOneTimeClassActive
        ? moment(onlineclassInfo.class_start_timing.value)
          .add(convertHrsIntoMinutes(), "m")
          .format()
        : recurringClassObject.recurrence_end_date.value,
      duration: convertHrsIntoMinutes(),
      institute: users.user_institute,
      owner: users._id,
      token: token,
      summary: onlineclassInfo.videoSummary.value,
      description: onlineclassInfo.description.value,
      meetingOn: "GoogleMeet",
      class_type: isOneTimeClassActive ? 2 : 8,
      recurrenceObj: {
        type: recurringClassObject.recurrence_type.value,
        repeat_interval: +recurringClassObject.recurrence_repeat_interval.value,
        weekly_days: recurringClassObject.recurrence_weekly_days.value,
        monthly_day: recurringClassObject.recurrence_monthly_day.value,
        end_date_time: recurringClassObject.recurrence_end_date.value,
      },
      assignedClasses: selectedStudent,
    },
    eventId: videoId,
  };

  const scheduleMeetClassSubmit = () => {
    // used for scheduling
    setShowSubmitError(true);
    setShowGoogleSubmitError(true);

    if (isOneTimeClassActive) {
      if (
        isMeetResoursesValid() &&
        (onlineclassInfo.hours.isValid || onlineclassInfo.minutes.isValid)
      ) {
        dispatch(createGoogleMeetEvent(meetResourse));
        // dispatch(submitStudentList(selectedStudent));
        setIsLoading(true);
      }
    } else {
      if (
        isMeetResoursesValid() &&
        (onlineclassInfo.hours.isValid || onlineclassInfo.minutes.isValid) &&
        isRecurringClassValid()
      ) {
        dispatch(createGoogleMeetEvent(meetResourse));
        // dispatch(submitStudentList(selectedStudent));
        setIsLoading(true);
      }
    }
  };

  const scheduleMeetClassSubmitForEdit = () => {
    // used for scheduled edit
    setShowSubmitError(true);
    setShowGoogleSubmitError(true);

    if (isOneTimeClassActive) {
      if (
        isMeetResoursesValid() &&
        (onlineclassInfo.hours.isValid || onlineclassInfo.minutes.isValid)
      ) {
        dispatch(editGoogleMeetEvent(meetResourse));
        setIsLoading(true);
      }
    } else {
      if (
        isMeetResoursesValid() &&
        (onlineclassInfo.hours.isValid || onlineclassInfo.minutes.isValid) &&
        isRecurringClassValid()
      ) {
        dispatch(editGoogleMeetEvent(meetResourse));
        setIsLoading(true);
      }
    }
  };

  const numberInputOnWheelPreventChange = (e) => {
    // used to prevention of modifying value of number field on scrolling.
    e.target.blur();
    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  const findDayNameForGoogeMeet = (arrayString) => {
    // used to modify week name string into existing array's form
    let googleMeetWeekDays = [
      {
        sortName: "SU",
        expectedResult: "SUN",
      },
      {
        sortName: "MO",
        expectedResult: "MON",
      },
      {
        sortName: "TU",
        expectedResult: "TUE",
      },
      {
        sortName: "WE",
        expectedResult: "WED",
      },
      {
        sortName: "TH",
        expectedResult: "THU",
      },
      {
        sortName: "FR",
        expectedResult: "FRI",
      },
      {
        sortName: "SA",
        expectedResult: "SAT",
      },
    ];

    let convertStringIntoArray = arrayString.split(",");

    let dayArray = googleMeetWeekDays.filter((dayName, index) => {
      return convertStringIntoArray.some(
        (sortDaysName) => sortDaysName === dayName.sortName && dayName.sortName
      );
    });

    let newArr = [];

    dayArray.map((data) => {
      return newArr.push(data.sortName);
    });
    return newArr;
  };

  useEffect(() => {
    //for updating state when click on edit.
    isEditable &&
      editClassesData.class_type !== 2 &&
      setRecurringClassObject({
        recurrence_type: {
          value: editClassesData.recurrence_type,
          isValid: editClassesData.recurrence_type ? true : false,
        },
        recurrence_repeat_interval: {
          value: editClassesData.repeat_interval,
          isValid: editClassesData.repeat_interval ? true : false,
        },
        recurrence_weekly_days: {
          value: findDayNameForGoogeMeet(editClassesData.weekly_days),
          isValid: editClassesData.weekly_days ? true : false,
        },
        recurrence_monthly_day: {
          // value: editClassesData.monthly_day,
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

  // const selectStudent = (studentData) => {
  //   const studentName = [
  //     {
  //       student_user_id: studentData._id,
  //       student_institute_id: studentData.institute,
  //       student_classroom_id: studentData.classroom,
  //       student_course_id: studentData.course,
  //     },
  //   ];

  //   setSelectedStudent(selectedStudent.concat(studentName));
  // };

  return (
    <div>
      <ModalBody className={"teachonlineclasspopcutomeheight"}>
        {isAuthTokenForMeetAvailable ? (
          /* true ? ( */
          <div className="TeacherScheduleClassModal mt-20">
            {/* Recurring Class Modal */}

            <div className="formFieldwrap">

              <CourseSelect
                className={
                  !onlineclassInfo.course.isValid && showGoogleSubmitError
                    ? "errorInput"
                    : ""
                }
                key="courseSelect"
                name="course"
                value={onlineclassInfo.course.value}
                onEvent={handleInput}
                disabled={isEditable ? true : false}
                autoevent={true}
                label="Select Classroom"
              />
              <FormError
                show={
                  !onlineclassInfo.course.isValid && showGoogleSubmitError
                }
                error={DynamicCourseHeader() + " required."}
              />
            </div>

            <div className="formFieldwrap">
              <ClassroomSelect
                className={
                  !onlineclassInfo.classroom.isValid && showGoogleSubmitError
                    ? "errorInput"
                    : ""
                }
                key="classroomSelect"
                name="classroom"
                value={onlineclassInfo.classroom.value}
                onEvent={handleInput}
                id="selectCourse"
                inputProps={{ required: true }}
                disabled={isEditable ? true : false}
                label="Select Course"
              />

              <FormError
                show={
                  !onlineclassInfo.classroom.isValid && showGoogleSubmitError
                }
                error={DynamicClassroomHeader() + " required."}
              />
            </div>

            <div className="datePickerWrap">
              <InputDateTimePicker
                popperPlacement="top-start"
                className={
                  !onlineclassInfo.class_start_timing.isValid &&
                    showGoogleSubmitError
                    ? "errorInput"
                    : ""
                }
                label="Class Start On"
                name="class_start_timing"
                onSelect={(selectedDate) => handlStarteDatePicker(selectedDate)}
                value={onlineclassInfo.class_start_timing.value}
                id="class_timing"
                type="datetime-local"
                placeholder="Class Start On"
                minDate={new Date()}
              />
              <FormError
                show={
                  !onlineclassInfo.class_start_timing.isValid &&
                  showGoogleSubmitError
                }
                error="Start-Time should be in future."
              />
            </div>

            <div className="SelectHoursAndMin">
              <div className="formFieldwrap">
                <MinutesSelect
                  start={1}
                  end={2}
                  step={0}
                  name={"hours"}
                  // defaultSelect={"0 Hours"}
                  defaultSelect={onlineclassInfo.hours.value + " Hrs"}
                  text={"Hrs"}
                  onEvent={handleInput}
                  className={
                    !onlineclassInfo.hours.isValid &&
                      showGoogleSubmitError &&
                      !onlineclassInfo.minutes.isValid &&
                      showGoogleSubmitError
                      ? "errorInput"
                      : ""
                  }
                  label="Duration"
                />
                <FormError
                  show={hoursAndMinutesIsValid() && showGoogleSubmitError}
                  error="Hours required."
                />
              </div>

              <div className="formFieldwrap">
                <MinutesSelect
                  start={5}
                  end={60}
                  step={4}
                  name={"minutes"}
                  onEvent={handleInput}
                  className={
                    !onlineclassInfo.hours.isValid &&
                      showGoogleSubmitError &&
                      !onlineclassInfo.minutes.isValid &&
                      showGoogleSubmitError
                      ? "errorInput"
                      : ""
                  }
                  defaultSelect={onlineclassInfo.minutes.value + " Min"}
                  inputProps={{ required: true }}
                  label="Select Minutes"
                />

                <FormError
                  show={hoursAndMinutesIsValid() && showGoogleSubmitError}
                  error="Minutes required."
                />
                {/* </div> */}
              </div>
            </div>

            <StudentAssignTo
              studentList={studentList}
              handleSearchStudents={searchStudents}
              selectedStudent={selectedStudent}
              // handleSelectStudent={selectStudent}
              isValid={onlineclassInfo.classroom.isValid}
              isSearchStudent={isSearchStudent}
              searchWords={searchWords}
            />



            <h1 className="text-xs base w-500 mb-10">Choose Class Type</h1>
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
                    {recurringClassObject.recurrence_type.value === "DAILY" ? (
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
                          // defaultValue="1"
                          value={
                            recurringClassObject.recurrence_repeat_interval
                              .value
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
                    ) : recurringClassObject.recurrence_type.value ===
                      "WEEKLY" ? (
                      <div className="formFieldwrap">
                        <SelectInput
                          id="select_Course"
                          className="form-control"
                          onChange={handleRecurrenceType}
                          name="recurrence_repeat_interval"
                          value={recurringClassObject.recurrence_repeat_interval.value.toString()}
                          label="Repeat Interval"
                        >
                          {date.map((individualDate) => {
                            return (
                              <option
                                key={individualDate}
                                value={individualDate}
                              >
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
                          value={recurringClassObject.recurrence_repeat_interval.value.toString()}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </SelectInput>
                        <label className="animLabel" htmlFor="select_Course">
                          Repeat Interval
                        </label>
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
                      <option value="DAILY">Daily</option>
                      <option value="WEEKLY">Weekly</option>
                      <option value="MONTHLY">Monthly</option>
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
                      minDate={new Date()}
                      onSelect={(selectedDate) => endDatePicker(selectedDate)}
                      value={recurringClassObject.recurrence_end_date.value}
                      disabled={
                        onlineclassInfo.class_start_timing.value ? false : true
                      }
                    />
                    <FormError
                      className={"absolute-b-30"}
                      show={
                        !recurringClassObject.recurrence_end_date.isValid &&
                        showSubmitError &&
                        !isOneTimeClassActive
                      }
                      error="End Time should not be empty."
                    />
                    <FormError
                      show={!onlineclassInfo.class_start_timing.isValid}
                      error="Please Select Class Start Time ."
                    />
                  </div>
                  <div className="tooltip-cst reucrringtooltipmainwrapper">
                    <i className="question-circle-icon">
                      <img
                        src={IconTootltip}
                        alt="Tooltip Icon"
                        style={{ width: "20px" }}
                      />
                    </i>
                    <div className="tooltip-content-cst positioninofrecurring">
                      <p>Your Recurring Classes Schedule</p>
                    </div>
                  </div>
                </div>
                <p className="secondary text-xxs w-400 mt-20 mb-10">
                  {dynamicWarningText()}
                </p>
                {recurringClassObject.recurrence_type.value === "WEEKLY" && (
                  <React.Fragment>
                    <p className="base text-xs w-400 mb-10">Repeat On</p>
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
                          !recurringClassObject.recurrence_weekly_days
                            .isValid &&
                          showSubmitError &&
                          !isOneTimeClassActive
                        }
                        error="Please select weekdays."
                      />
                    </div>
                  </React.Fragment>
                )}
                {recurringClassObject.recurrence_type.value === "MONTHLY" && (
                  <React.Fragment>
                    <div className="OccuseZoomModelDaysinput">
                      <p className="base text-xs w-400 mt-20 mb-20">
                        Occurs On
                      </p>
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
                              <React.Fragment key={individualDate}>
                                <option value={individualDate}>
                                  {individualDate}
                                </option>
                              </React.Fragment>
                            );
                          })}
                        </SelectInput>
                      </div>
                      <p>Of the month</p>
                    </div>
                  </React.Fragment>
                )}
                <p className="red mt-25 ">
                  {/* Every week on Mon, Wed, Fri Untill 40th Dec, 2021, 23
                      Occurrences. */}
                  {recurringClassObject.recurrence_end_date.value &&
                    onlineclassInfo.class_start_timing.value &&
                    dynamicScheuleTex()}
                </p>
              </div>
            )}



            <div className="formFieldwrap AssignTofullWidth">
              <FormInput
                className={
                  !onlineclassInfo.videoSummary.isValid && showGoogleSubmitError
                    ? "errorInput"
                    : ""
                }
                name="videoSummary"
                onChange={handleInput}
                value={onlineclassInfo.videoSummary.value}
                type="text"
                label="Class Topic"
                placeholder="Class Topic"
                autoComplete="off"
              />
              <FormError
                show={
                  !onlineclassInfo.videoSummary.isValid && showGoogleSubmitError
                }
                error="Summary required."
              />
            </div>
            <div className="formFieldwrap AssignTofullWidth">
              <FormInput
                className={
                  !onlineclassInfo.description.isValid && showGoogleSubmitError
                    ? "errorInput"
                    : ""
                }
                name="description"
                type="text"
                onChange={handleInput}
                value={onlineclassInfo.description.value}
                label="Class Agenda/Purpose"
                placeholder="Class Agenda/Purpose"
                autoComplete="off"
              />
              <FormError
                show={
                  !onlineclassInfo.description.isValid && showGoogleSubmitError
                }
                error="Description required."
              />
            </div>
          </div>
        ) : (
          <div className="row mt-20">
            <div className="col-xs-12 text-center">
              <h3 className="dgray text-xxs w-400">
                To Schedule online classes via Google Meet You need to
                authenticate yourself by google account.
              </h3>
              <p className="mt-15 gray">
                Don't worry, we don't store your password.
              </p>
            </div>
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <div className="row">
          <div className="col-xs-12">
            {!isLoading ? (
              isAuthTokenForMeetAvailable ? (
                <CreateEvent
                  scheduleMeetClassSubmit={scheduleMeetClassSubmit}
                  scheduleMeetClassSubmitForEdit={
                    scheduleMeetClassSubmitForEdit
                  }
                  formData={meetResourse}
                  loading={isLoading}
                  isEditable={isEditable}
                // isSuccess={isSuccess}
                />
              ) : (
                <MeetLink ViewClassroom={false} />
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

export default MeetModal;
