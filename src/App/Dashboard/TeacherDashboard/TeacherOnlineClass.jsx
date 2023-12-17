/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import FormInput from "../../../Common/Form/FormInput";
import ValidationFile from "../../../Classes/ValidationFile";
import { useDispatch, useSelector } from "react-redux";
import CourseSelect from "../../../Common/Form/CourseSelect";
import ClassroomSelect from "../../../Common/Form/ClassroomSelect";
import { getClassroomAssignedData } from "../../../store/actions/classroomassigned";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import {
  getOnlineClasses,
  deleteOnlineClasses,
  searchClasses,
  sortByRecentToOld,
  sortByOldToRecent,
  DurationHighToLow,
  DurationLowToHigh,
  sortByZoom,
  sortByMeet,
  sortByAttendeesHighToLow,
  sortByAttendeesLowToHigh,
  getCourseandClassroom,
  filterCreatedBy,
  // setFilteredTeachers,
  // setSelectedOnlineCourse,
  // setSelectedOnlineClassroom,
  courseAndClassroomFilter,
  classroomCreatedBy,
} from "../../../store/actions/onlineClasses";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import {
  scheduleClass,
  setSuccessFalse,
  hideZoomPopup,
  createGoogleMeetEvent,
} from "../../../store/actions/zoomApi";
import InputDateTimePicker from "../../../Common/Form/InputDateTimePicker";
import Modal from "../../../Common/Modal";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import { SearchIcon } from "../../../Common/Icon";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../Constant/constants";
import MinutesSelect from "../../../Common/Form/MinutesSelect";
import FormError from "../../../Common/Form/FormError";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
// import JoineeList from "./JoineeList";
import MeetLink from "./GoogleMeet/MeetLink";
import { classes_constant } from "../../../Constant/classes";
import CreateEvent from "./GoogleMeet/CreateEvent";
import Storage from "../../../Classes/Storage";
import GoogleMeetLogo from "./logo-googlemeet.svg";
import ZoomLogo from "./logo-zoom.svg";
import CourseClassCheckboxFilter from "../../../Common/CourseClassCheckboxFilter";
import { changeClassroomAssignedDataResets } from "../../../store/actions/classroomassigned";
import MultipleSelectDropDownCommon from "../../../Common/Form/MultiSelectDropDownCommon";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../store/actions/MultiSelectDropDown";
import SearchControl from "../../../Common/SearchControl";
import "./TeacherDashboard.scss";
import JoineeList from "./OnlineClasses/JoineeList";
export default function TeacherOnlineClass() {
  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const InsId = useSelector((state) => state.user.user_institute);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setOnlineClassId(_id);
    setIsActive(isActive);
  };

  const onClickBtnRemove = (_id) => {
    dispatch(deleteOnlineClasses(_id));
    setOnlineClassId("");
    setIsActive(false);
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [storedPopup, setStoredPopup] = useState(false);
  const [isSchduleViaGoogle, setIsSchduleViaGoogle] = useState(false);
  const [isAuthTokenForMeetAvailable, setIsAuthTokenForMeetAvailable] =
    useState(false);

  useEffect(() => {
    let keepPopUpOpen = localStorage.getItem("openPopUp");
    let isSelectedMeet = localStorage.getItem("isChooseMeet");
    let meetAuthToken = localStorage.getItem(classes_constant.meettoken);
    let isTokenValid = meetAuthToken ? true : false;

    setStoredPopup(keepPopUpOpen);
    setIsSchduleViaGoogle(isSelectedMeet);
    setIsAuthTokenForMeetAvailable(isTokenValid);
  }, []);

  const popUpToggle = () => {
    SetScheduleClassModal(!ScheduleClassModal);
    localStorage.setItem("openPopUp", true);
    setOpenPopup(true);
    setStoredPopup(false);
  };

  const closeModalState = () => {
    localStorage.removeItem("openPopUp", false);
    setOpenPopup(false);
    setStoredPopup(false);
    setIsSchduleViaGoogle(false);
    localStorage.removeItem("isChooseMeet");

    setTimeout(() => {
      setOnlineClassInfo(emptyOnlineClassInfo);
      setShowSubmitError(false);
      setShowGoogleSubmitError(false);
      dispatch(changeClassroomAssignedDataResets());
    }, 100);

    SetScheduleClassModal(!ScheduleClassModal);
  };
  const dispatch = useDispatch();

  const {
    onlineClasses,
    // courseAndClassroom,
    users,
    onlineclassSuccess,
    isSuccess,
    classroomCreatedByList,
    classroomCreatedByListSuccess,
    // isTokenExpired,
  } = useSelector((state) => {
    return {
      onlineClasses: state.onlineClasses.list.data,
      courseAndClassroom: state.onlineClasses.courseAndClassroom,
      onlineclassSuccess: state.onlineClasses.list.success,
      classroomCreatedByListSuccess:
        state.onlineClasses.assignedClassroom.success,
      classroomCreatedByList: state.onlineClasses.assignedClassroom.data,
      users: state.user,
      courseList: state.classroomassigned.courseList,
      isSuccess: state.zoomapi.success,
      // isTokenExpired: state.zoomapi.GoogleMeetData,
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
    class_start_timing: {
      value: "",
      isValid: "",
    },
    // class_end_timing: {
    //   value: "",
    //   isValid: "",
    // },
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
    videoTopic: {
      value: "",
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
    agenda: {
      value: "",
      isValid: "",
    },
    meetingPassword: {
      value: "",
      isValid: "",
    },
  };

  const [onlineclassInfo, setOnlineClassInfo] = useState(emptyOnlineClassInfo);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [showGoogleSubmitError, setShowGoogleSubmitError] = useState(false);
  const [onlineclassId, setOnlineClassId] = useState("");

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

  const handlStarteDatePicker = (datetime) => {
    let onlineclassInfoData = {
      ...onlineclassInfo,
      class_start_timing: {
        value: moment(datetime).format(),
        isValid: ValidationFile.compareCurrentDateTime(datetime),
      },
      validation: isFormValid(),
    };
    setOnlineClassInfo(onlineclassInfoData);
  };

  const convertHrsIntoMinutes = () => {
    let hours = parseInt(onlineclassInfo.hours.value);
    let hoursIntoMinutes = hours * 60;
    let minutes = onlineclassInfo.minutes.value
      ? parseInt(onlineclassInfo.minutes.value)
      : 0;
    return minutes + hoursIntoMinutes;
  };

  const getFormData = () => {
    return {
      course: onlineclassInfo.course.value,
      classroom: onlineclassInfo.classroom.value,
      course_coursename: onlineclassInfo.course.value,
      classroom_classroomname: onlineclassInfo.classroom.value,
      class_timing: onlineclassInfo.class_timing.value,
      duration: convertHrsIntoMinutes(),
      institute: users.user_institute,
      owner: users._id,
      topic: onlineclassInfo.videoTopic.value,
      agenda: onlineclassInfo.agenda.value,
      meetingPassword: onlineclassInfo.meetingPassword.value,
    };
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setShowSubmitError(true);
    convertHrsIntoMinutes();
    // setShowGoogleSubmitError(false);

    if (
      isFormValid() &&
      (onlineclassInfo.hours.isValid || onlineclassInfo.minutes.isValid)
    ) {
      dispatch(scheduleClass(getFormData()));
      setIsLoading(true);
    }
  };

  if (isSuccess) {
    setTimeout(() => {
      // SetScheduleClassModal(!ScheduleClassModal);
      localStorage.removeItem("openPopUp", false);
      // setOpenPopup(false);
      setStoredPopup(false);
      // setStoredPopup(false);
    }, 500);
    setTimeout(() => {
      dispatch(getOnlineClasses(users._id, InsId));
    }, 300);
    setTimeout(() => {
      dispatch(getOnlineClasses(users._id, InsId));
      setOpenPopup(false);
    }, 500);

    setTimeout(() => {
      setOnlineClassInfo(emptyOnlineClassInfo);
      setShowSubmitError(false);
      dispatch(changeClassroomAssignedDataResets());
      // setShowGoogleSubmitError(false);
    }, 600);
  }

  useEffect(() => {
    setIsLoading(false);
    isSuccess && SetScheduleClassModal(!ScheduleClassModal);
    dispatch(setSuccessFalse());
  }, [ScheduleClassModal, dispatch, isSuccess]);

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
      onlineclassInfo.meetingPassword.isValid
      ? true
      : false;
  };

  const isMeetResoursesValid = () => {
    return onlineclassInfo.course.isValid &&
      onlineclassInfo.classroom.isValid &&
      onlineclassInfo.class_start_timing.isValid &&
      // onlineclassInfo.duration.isValid &&
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
      case "agenda":
      case "videoSummary":
      case "videoTopic":
      case "description":
      case "meetingPassword":
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

  // const handleChange = (event) => {
  //   event.preventDefault();

  //   setTimeout(() => {
  //     setSearchTerm(event.target.value);
  //   }, 400);

  //   const inputText = event.target.value;
  //   setSearchTerm(inputText);
  // };

  const [searchTerm, setSearchTerm] = useState("");
  let typing;

  const handleSearch = (e) => {
    e.preventDefault();

    clearTimeout(typing);

    typing = setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 300);

    if (!e.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    dispatch(searchClasses(users._id, InsId, searchTerm));
  }, [dispatch, users._id, InsId, searchTerm]);

  const [modalStateAttendess, setModalStateAttendess] = useState(false);
  const manageModalEdit = () => {
    setModalStateAttendess(!modalStateAttendess);
  };

  const [teacherData, setTeacherData] = useState("");
  const [isClick, setIsClick] = useState(false);

  const attendessListPopup = (allData) => {
    manageModalEdit();
    setTeacherData(allData);
    setIsClick(true);
    // SetScheduleClassModal(false);
  };

  const closePopup = () => {
    setModalStateAttendess(false);
    setIsClick(false);
  };

  // props that is being pass into the SingleDropdown
  const selectGroup = [
    "Created On",
    "Recent to Old",
    "Old to Recent",
    "Duration",
    "High to Low 1",
    "Low to High 1",
    "Meeting On",
    "Zoom",
    "Google Meet",
    "Attendees",
    "High to Low 2",
    "Low to High 2",
  ];

  const filterValues = ["Created On", "Duration", "Meeting On", "Attendees"];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(getOnlineClasses(users._id, InsId));
        break;
      }
      case "Recent to Old": {
        dispatch(sortByRecentToOld(users._id, InsId));
        break;
      }
      case "Old to Recent": {
        dispatch(sortByOldToRecent(users._id, InsId));
        break;
      }
      case "High to Low 1": {
        dispatch(DurationHighToLow(users._id, InsId));
        break;
      }
      case "Low to High 1": {
        dispatch(DurationLowToHigh(users._id, InsId));
        break;
      }
      case "Zoom": {
        dispatch(sortByZoom(users._id, InsId));
        break;
      }
      case "Google Meet": {
        dispatch(sortByMeet(users._id, InsId));
        break;
      }
      case "High to Low 2": {
        dispatch(sortByAttendeesHighToLow(users._id, InsId));
        break;
      }
      case "Low to High 2": {
        dispatch(sortByAttendeesLowToHigh(users._id, InsId));
        break;
      }
      default:
        dispatch(getOnlineClasses(users._id, InsId));
    }
  };

  const scheduleviaZoom = () => {
    setIsSchduleViaGoogle(false);
    localStorage.removeItem("isChooseMeet");
  };

  const scheduleviaGoogle = () => {
    setIsSchduleViaGoogle(true);
    localStorage.setItem("isChooseMeet", true);
  };

  const authData = localStorage.getItem(classes_constant.meettoken);
  const token = authData ? Storage.getJson(classes_constant.meettoken) : "";
  // const [eventDetail, createEvent] = useMeetCreate(token);

  const meetResourse = {
    data: {
      course: onlineclassInfo.course.value,
      classroom: onlineclassInfo.classroom.value,
      start: onlineclassInfo.class_start_timing.value,
      end: moment(onlineclassInfo.class_start_timing.value)
        .add(convertHrsIntoMinutes(), "m")
        .format(),
      // duration: onlineclassInfo.duration.value,
      duration: convertHrsIntoMinutes(),
      institute: users.user_institute,
      owner: users._id,
      token: token,
      summary: onlineclassInfo.videoSummary.value,
      description: onlineclassInfo.description.value,
      meetingOn: isSchduleViaGoogle ? "GoogleMeet" : "Zoom",
    },
  };

  const scheduleMeetClassSubmit = () => {
    setShowGoogleSubmitError(true);

    if (
      isMeetResoursesValid() &&
      (onlineclassInfo.hours.isValid || onlineclassInfo.minutes.isValid)
    ) {
      dispatch(createGoogleMeetEvent(meetResourse));
      setIsLoading(true);

      setTimeout(() => {
        localStorage.removeItem("openPopUp", false);
        setOpenPopup(false);
        setStoredPopup(false);
      }, 500);

      setTimeout(() => {
        dispatch(getOnlineClasses(users._id, InsId));
      }, 300);
      setTimeout(() => {
        dispatch(getOnlineClasses(users._id, InsId));
      }, 500);

      setTimeout(() => {
        setOnlineClassInfo(emptyOnlineClassInfo);
        setShowGoogleSubmitError(false);
        dispatch(changeClassroomAssignedDataResets());
      }, 600);
    }
  };

  const filterCourseAndClassroom = (selectedData) => {
    selectedData.courseList.length !== 0 &&
      selectedData.classRoomList.length !== 0 &&
      dispatch(
        courseAndClassroomFilter(
          users._id,
          InsId,
          selectedData.courseList,
          selectedData.classRoomList
        )
      );
  };

  // ------------------------ Created By for ONlinCLass

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);
  const ToggleValue = "Online Classes";

  if (classroomCreatedByListSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < classroomCreatedByList.length; i++) {
      value.push(classroomCreatedByList[i]._id);
    }
    value.push("All");
    if (ToggleValue === "Online Classes") {
      dispatch(AllEntrySelected(value));
      dispatch(AllEntrySelectedSwitch(value));
    }
  }

  const OnSelectedValueCreatedBy = (val) => {
    dispatch(filterCreatedBy(users._id, InsId, val));
  };

  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/teacher-online-class"
            title="Online Class"
          />
        </Breadcrumb>
        <div className="PageTopHead PTH-TeacherOnlineClass1 mt-20">
          <div className="PTH-Item">
            {" "}
            <p className="text-sm w-300">
              {onlineclassSuccess && onlineClasses.length} Online Classes
            </p>
          </div>
          <div className="PTH-Item">
            <button
              className="button button-secondary btn-oval btn-sm button-block"
              onClick={popUpToggle}
            >
              <i className="ed-icon icon-plus-add white i-xs"></i>Schedule
              Class
            </button>
            {/* <Modal ModalSize="modal-m" show={ScheduleClassModal}> */}
            <Modal ModalSize="modal-m" show={openPopup || storedPopup}>
              <ModalHeader
                // title="Schedule live class"
                closeButton={true}
                onclose={closeModalState}
              />
              <ModalBody>
                <div className="ChooseLiveClassVia">
                  <p className="text-xxs w-600">Choose class via</p>
                  <div className="LiveClassOptSelect mt-5">
                    <button
                      className={`button btn-md ${isSchduleViaGoogle
                        ? "btn-o-silver"
                        : "btn-o-primary"
                        }`}
                      onClick={scheduleviaZoom}
                    >
                      <img src={ZoomLogo} alt="Zoom" />
                    </button>
                    <button
                      className={`button btn-md ${isSchduleViaGoogle
                        ? "btn-o-primary"
                        : "btn-o-silver"
                        }`}
                      onClick={scheduleviaGoogle}
                    >
                      <img src={GoogleMeetLogo} alt="Google Meet" />
                    </button>
                  </div>
                </div>
                {isSchduleViaGoogle ? (
                  isAuthTokenForMeetAvailable ? (
                    /* true ? ( */
                    <div className="TeacherScheduleClassModal mt-20">
                      <div className="datePickerWrap">
                        <InputDateTimePicker
                          className={
                            !onlineclassInfo.class_start_timing.isValid &&
                              showGoogleSubmitError
                              ? "errorInput"
                              : ""
                          }
                          label="Class Start Timing"
                          name="class_start_timing"
                          onSelect={(selectedDate) =>
                            handlStarteDatePicker(selectedDate)
                          }
                          value={onlineclassInfo.class_start_timing.value}
                          id="class_timing"
                          type="datetime-local"
                          placeholder="Class Start Timing"
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
                      <div className="formFieldwrap">

                        <CourseSelect
                          className={
                            !onlineclassInfo.course.isValid &&
                              showGoogleSubmitError
                              ? "errorInput"
                              : ""
                          }
                          key="courseSelect"
                          name="course"
                          value={onlineclassInfo.course.value}
                          // onSelect={(value) => onSelect(value, "course")}
                          onEvent={handleInput}
                        />
                        <FormError
                          show={
                            !onlineclassInfo.course.isValid &&
                            showGoogleSubmitError
                          }
                          error={DynamicCourseHeader() + " required."}
                        />
                      </div>

                      <div className="formFieldwrap">
                        <ClassroomSelect
                          className={
                            !onlineclassInfo.classroom.isValid &&
                              showGoogleSubmitError
                              ? "errorInput"
                              : ""
                          }
                          key="classroomSelect"
                          name="classroom"
                          value={onlineclassInfo.classroom.value}
                          // onSelect={(value) =>onSelect(value, "classroom")}
                          onEvent={handleInput}
                        />
                        <FormError
                          show={
                            !onlineclassInfo.classroom.isValid &&
                            showGoogleSubmitError
                          }
                          error={DynamicClassroomHeader() + " required."}
                        />
                      </div>
                      <div className="SelectHoursAndMin">


                        <div className="formFieldwrap">

                          <MinutesSelect
                            start={1}
                            end={2}
                            step={0}
                            name={"hours"}
                            defaultSelect={"0 Hours"}
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
                            label="Select Minutes"
                          />
                          <FormError
                            show={
                              hoursAndMinutesIsValid() &&
                              showGoogleSubmitError
                            }
                            error="Hours required."
                          />
                          {/* </div> */}
                        </div>

                        <div className="formFieldwrap">

                          <MinutesSelect
                            start={5}
                            end={60}
                            step={4}
                            name={"minutes"}
                            defaultSelect={
                              onlineclassInfo.hours.value === "3"
                                ? "00 Minutes"
                                : "00 Minutes"
                            }
                            onEvent={handleInput}
                            className={
                              !onlineclassInfo.hours.isValid &&
                                showGoogleSubmitError &&
                                !onlineclassInfo.minutes.isValid &&
                                showGoogleSubmitError
                                ? "errorInput"
                                : ""
                            }
                            label="Select Minutes"
                          />
                          <FormError
                            show={
                              hoursAndMinutesIsValid() &&
                              showGoogleSubmitError
                            }
                            error="Minutes required."
                          />
                          {/* </div> */}
                        </div>
                      </div>

                      <div className="formFieldwrap">
                        <FormInput
                          className={
                            !onlineclassInfo.videoSummary.isValid &&
                              showGoogleSubmitError
                              ? "errorInput"
                              : ""
                          }
                          name="videoSummary"
                          onChange={handleInput}
                          value={onlineclassInfo.videoSummary.value}
                          type="text"
                          label="Summary"
                          placeholder="Enter Video Summary"
                        />
                        <FormError
                          show={
                            !onlineclassInfo.videoSummary.isValid &&
                            showGoogleSubmitError
                          }
                          error="Summary required."
                        />
                      </div>
                      <div className="formFieldwrap">
                        <FormInput
                          className={
                            !onlineclassInfo.description.isValid &&
                              showGoogleSubmitError
                              ? "errorInput"
                              : ""
                          }
                          name="description"
                          type="text"
                          onChange={handleInput}
                          label="Description"
                          autoComplete={false}
                          placeholder="Enter Video Description"
                        />
                        <FormError
                          show={
                            !onlineclassInfo.description.isValid &&
                            showGoogleSubmitError
                          }
                          error="Description required."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="row mt-20">
                      <div className="col-xs-12 text-center">
                        <h3 className="dgray text-xxs w-400">
                          To Schedule online classes via Google Meet You need
                          to authenticate yourself by google account.
                        </h3>
                        <p className="mt-15 gray">
                          Don't worry, we don't store your password.
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="TeacherScheduleClassModal mt-20">
                    <div className="datePickerWrap">
                      <InputDateTimePicker
                        className={
                          !onlineclassInfo.class_timing.isValid &&
                            showSubmitError
                            ? "errorInput"
                            : ""
                        }
                        label="class_timing"
                        name="class_timing"
                        onSelect={(selectedDate) =>
                          handleDatePicker(selectedDate)
                        }
                        value={onlineclassInfo.class_timing.value}
                        id="class_timing"
                        type="datetime-local"
                        placeholder="Class Timing"
                        minDate={new Date()}
                      />
                      <FormError
                        show={
                          !onlineclassInfo.class_timing.isValid &&
                          showSubmitError
                        }
                        error="Class-Time should be in future."
                      />
                    </div>
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
                        // onSelect={(value) => onSelect(value, "course")}
                        onEvent={handleInput}
                      />
                      <FormError
                        show={
                          !onlineclassInfo.course.isValid && showSubmitError
                        }
                        error={DynamicCourseHeader() + " required."}
                      />
                    </div>

                    <div className="formFieldwrap">
                      <ClassroomSelect
                        className={
                          !onlineclassInfo.classroom.isValid &&
                            showSubmitError
                            ? "errorInput"
                            : ""
                        }
                        key="classroomSelect"
                        name="classroom"
                        value={onlineclassInfo.classroom.value}
                        // onSelect={(value) =>onSelect(value, "classroom")}
                        onEvent={handleInput}
                      />
                      <FormError
                        show={
                          !onlineclassInfo.classroom.isValid &&
                          showSubmitError
                        }
                        error={DynamicClassroomHeader() + " required."}
                      />
                    </div>

                    <div>

                      <div className="formFieldwrap">

                        <MinutesSelect
                          start={5}
                          end={40}
                          step={4}
                          name={"minutes"}
                          defaultSelect={"Select Minutes"}
                          onEvent={handleInput}
                          className={
                            !onlineclassInfo.minutes.isValid &&
                              showSubmitError
                              ? "errorInput"
                              : ""
                          }
                          label="Select Minutes"
                        />
                        <FormError
                          show={hoursAndMinutesIsValid() && showSubmitError}
                          error="Minutes required."
                        />
                      </div>
                    </div>

                    <div className="formFieldwrap">
                      <FormInput
                        className={
                          !onlineclassInfo.videoTopic.isValid &&
                            showSubmitError
                            ? "errorInput"
                            : ""
                        }
                        name="videoTopic"
                        onChange={handleInput}
                        value={onlineclassInfo.videoTopic.value}
                        type="text"
                        label="Topic"
                        placeholder="Enter Video Topic"
                      />
                      <FormError
                        show={
                          !onlineclassInfo.videoTopic.isValid &&
                          showSubmitError
                        }
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
                      />
                      <FormError
                        show={
                          !onlineclassInfo.agenda.isValid && showSubmitError
                        }
                        error="Agenda required."
                      />
                    </div>
                    <div className="formFieldwrap">
                      <FormInputWithIcon
                        className={
                          !onlineclassInfo.meetingPassword.isValid &&
                            showSubmitError
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
                        show={
                          !onlineclassInfo.meetingPassword.isValid &&
                          showSubmitError
                        }
                        error="Password required."
                      />
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <div className="row">
                  <div className="col-xs-12">
                    {!isLoading ? (
                      isSchduleViaGoogle ? (
                        isAuthTokenForMeetAvailable ? (
                          /* true ? ( */
                          <CreateEvent
                            scheduleMeetClassSubmit={scheduleMeetClassSubmit}
                            formData={meetResourse}
                            loading={isLoading}
                          />
                        ) : (
                          <MeetLink ViewClassroom={false} />
                        )
                      ) : (
                        <button
                          className="button btn-md button-theme"
                          onClick={() => {
                            // scheduleMeeting();
                            onSubmit();
                          }}
                        >
                          Schedule Now!
                        </button>
                      )
                    ) : (
                      <button className="button btn-md button-theme">
                        Loading...
                      </button>
                    )}
                  </div>
                </div>
              </ModalFooter>
            </Modal>
          </div>
        </div>
        <div className="PageTopHead PTH-TeacherOnlineClass2 mt-20">
          <div className="PTH-Item">
            <SingleSelectDropdown
              SingleSelectHandel={SingleSelectHandel}
              selectGroup={selectGroup}
              filterValues={filterValues}
            />
          </div>

          {/* Don't remove */}
          <div className="PTH-Item">
            <CourseClassCheckboxFilter
              onSelect={(selectedData) => {
                filterCourseAndClassroom(selectedData);
              }}
            />
          </div>
          <div className="PTH-Item">
            <MultipleSelectDropDownCommon
              selectGroup={
                classroomCreatedByList ? classroomCreatedByList : []
              }
              OnSelectedValue={OnSelectedValueCreatedBy}
              name={"Created By"}
              SwitchSelectData={false}
            />
          </div>
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={handleSearch}
              placeholder="Search Online Classes"
            />
          </div>
        </div>
        <div className="gridTable mt-20">
          <table>
            <thead>
              <tr>
                <th width="20%">Class Name</th>
                <th width="22%">Created & Assigned By</th>
                <th width="27%">Class Timing & Duration</th>
                <th width="15%">Meeting On</th>
                <th width="10%">Attendees</th>
                <th width="10%"></th>
              </tr>
            </thead>
            <tbody>
              {onlineclassSuccess && onlineClasses.length > 0 ? (
                onlineClasses.map((item) => {
                  return (
                    <tr key={item._id}>
                      {item._id && (
                        <React.Fragment>
                          <td data-column="Class Name">
                            {item.classroomInfo_classroomname}
                          </td>

                          <td data-column="Created & Assigned By">
                            {item.createdBy}{" "}
                            {item.createdBy !== item.assignBy && "-"}{" "}
                            <span>
                              {item.createdBy === item.assignBy
                                ? ""
                                : item.assignBy}
                            </span>
                          </td>
                          <td data-column="Class Timing & Duration">
                            {moment(item.class_timing).format(
                              DATETIME_FORMAT_AP
                            )}
                            <span className="secondary">
                              &nbsp;{item.duration}Min.
                            </span>
                          </td>
                          <td data-column="Meeting On">{item.meetingOn}</td>
                          <td data-column="Attendess">
                            <span className="inline text-xxs">
                              {item.meetingOn !== "GoogleMeet" &&
                                item.Attendees}
                              &nbsp;
                              {item.meetingOn !== "GoogleMeet" && (
                                <i
                                  className="ed-icon icon-external-link secondary i-xxs"
                                  onClick={() => attendessListPopup(item)}
                                ></i>
                              )}
                            </span>
                          </td>
                          <td>
                            <div className="actionBtnCustom">
                              <div className="groupBtn">
                                {moment(item.class_timing)
                                  .add(item.duration, "m")
                                  .format() >= moment(new Date()).format() ? (
                                  <a
                                    rel="noopener noreferrer"
                                    target="blank"
                                    href={item.teacher_url}
                                  >
                                    Start Now
                                  </a>
                                ) : (
                                  <button disabled={true}>Start Now</button>
                                )}
                                <button
                                  onClick={() =>
                                    onClickBtnDropDownRemove(item._id, true)
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                              {item._id === onlineclassId && (
                                <div
                                  ref={dropdownRef}
                                  className={`popup removePopup ${isActive ? "active" : "inactive"
                                    }`}
                                >
                                  <p className="heading text-xxs">
                                    You are about to remove this Online Class.
                                  </p>
                                  <p className="sub-heading red text-xxs">
                                    Are you sure?
                                  </p>
                                  <div className="removePopBtn">
                                    <button
                                      className="button btn-o-silver dgray btn-sm"
                                      onClick={() =>
                                        onClickBtnDropDownRemove(
                                          item._id,
                                          false
                                        )
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="button button-red btn-sm"
                                      onClick={() => {
                                        onClickBtnRemove(item._id);
                                        onClickBtnDropDownRemove(
                                          item._id,
                                          false
                                        );
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <div className={`modal modalShowing-${modalStateAttendess}`}>
                            <JoineeList
                              closePopup={closePopup}
                              isClick={isClick}
                              classId={item._id}
                            />
                          </div>
                        </React.Fragment>
                      )}
                    </tr>
                  );
                })
              ) : onlineclassSuccess && onlineClasses.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <NoDataAvailable title="No Records Found." />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <div className="loadingGridData"> Loading...</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </React.Fragment>
      <ZoomVerificationPopup />

    </>
  );
}

export const ZoomVerificationPopup = () => {
  const zoomApiState = useSelector((state) => state.zoomapi);

  const dispatch = useDispatch();

  return (
    <div
      className={`modal modalShowing-${zoomApiState.data?.zoomInfoAvailable === false
        }`}
    >
      <div className="modalwrapper">
        <div className="modalbody">
          <div className="row mt-20">
            <div className="col-xs-12 text-center">
              <h3 className="dgray text-xxs w-400">
                To enable online classes kindly approve the request sent by Zoom
                on your registered email and then try again after a few minutes.
              </h3>
              <p className="mt-15 gray">
                Don't worry, this is only a one time process.
              </p>
            </div>
          </div>
        </div>
        <div className="modalFooter">
          <div className="row">
            <div className="col-xs-12">
              <button
                to=""
                className="button btn-md button-theme"
                onClick={() => dispatch(hideZoomPopup())}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
