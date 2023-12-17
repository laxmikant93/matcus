/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import FilterSearch from "./FilterSearch";
import { useDispatch, useSelector } from "react-redux";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
import {
  getClassroomViewList,
  deleteClassroomViewItem,
  OnlineClassesAssignToUpdate,
  SortOnlineTestClassroom,
  getAssignmentTeacherClassroom,
  MultiSelectOnlineTestClassroomFilter,
} from "../../../../store/actions/classroomdetail";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../../Constant/constants";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import FormInput from "../../../../Common/Form/FormInput";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormInputWithIcon from "../../../../Common/Form/FormInputWithIcon";
import {
  scheduleClass,
  setSuccessFalse,
  hideZoomPopup,
  createGoogleMeetEvent,
} from "../../../../store/actions/zoomApi";
import JoineeList from "../../../Dashboard/TeacherDashboard/JoineeList";
import MeetLink from "../../../Dashboard/TeacherDashboard/GoogleMeet/MeetLink";
import InputDateTimePicker from "../../../../Common/Form/InputDateTimePicker";
import Modal from "../../../../Common/Modal";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import MinutesSelect from "../../../../Common/Form/MinutesSelect";
import FormError from "../../../../Common/Form/FormError";
import CreateEvent from "../../../Dashboard/TeacherDashboard/GoogleMeet/CreateEvent";
import { classes_constant } from "../../../../Constant/classes";
import GoogleMeetLogo from "./logo-googlemeet.svg";
import ZoomLogo from "./logo-zoom.svg";
import Storage from "../../../../Classes/Storage";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../../store/actions/MultiSelectDropDown";
import MultiSelectDropDownCommon from "../../../../Common/Form/MultiSelectDropDownCommon";

const ViewClassroomOnlineClasses = () => {
  const ToggleValue = "Online Classes";
  const { classroomId } = useParams();
  const RemovePopToggleRef = useRef();
  const dispatch = useDispatch();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });
  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setOnlineClassId(_id);
    setIsActive(isActive);
  };

  const onClickBtnRemove = (_id) => {
    dispatch(deleteClassroomViewItem(_id, ToggleValue));
    setOnlineClassId("");
    setIsActive(false);
  };

  const closePopup = () => {
    setModalStateAttendess(false);
    setIsClick(false);
  };

  const [RemovePop, setRemovePop] = useState(false);

  const {
    users,
    ViewClassroomList,
    ViewClassroomListSuccess,
    ViewClassroomDeleteLoading,
    ClassroomDetail,
    ClassroomDetailSuccess,
    TeacherListData,
    TeacherListDataSuccess,
    isSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      ViewClassroomList: state.classroomDetail.list.data,
      ClassroomDetail: state.classroomDetail.classrooomData.data,
      ClassroomDetailSuccess: state.classroomDetail.classrooomData.success,
      ViewClassroomListSuccess: state.classroomDetail.list.success,
      ViewClassroomDeleteLoading: state.classroomDetail.delete.loading,
      TeacherListData: state.classroomDetail.TeacherDataList.data,
      TeacherListDataSuccess: state.classroomDetail.TeacherDataList.success,
      isSuccess: state.zoomapi.success,
    };
  });
  useEffect(() => {
    dispatch(
      getClassroomViewList(users.user_institute, classroomId, ToggleValue)
    );
    dispatch(getAssignmentTeacherClassroom(users.user_institute, classroomId));
  }, [classroomId, dispatch, users._id, users.user_institute]);

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
  const [openPopup, setOpenPopup] = useState(false);
  const [storedPopup, setStoredPopup] = useState(false);
  const [isSchduleViaGoogle, setIsSchduleViaGoogle] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isAuthTokenForMeetAvailable, setIsAuthTokenForMeetAvailable] =
    useState(false);

  const fillUpdateData = () => {
    let onlineClassInfoData = {
      ...onlineclassInfo,
      course: {
        value: ClassroomDetail.data_courseInfo,
        isValid: ValidationFile.validEmpty(ClassroomDetail.data_courseInfo),
      },
      classroom: {
        value: ClassroomDetail.data_classroomInfo,
        isValid: ValidationFile.validEmpty(ClassroomDetail.data_classroomInfo),
      },
    };
    setOnlineClassInfo(onlineClassInfoData);
  };

  useEffect(() => {
    let keepPopUpOpen = localStorage.getItem("openPopUp");
    let isSelectedMeet = localStorage.getItem("isChooseMeet");
    let meetAuthToken = localStorage.getItem(classes_constant.meettoken);
    let isTokenValid = meetAuthToken ? true : false;
    Storage.setBool("SwitchOnlineClasses", true);
    setStoredPopup(keepPopUpOpen);
    setIsSchduleViaGoogle(isSelectedMeet);
    setIsAuthTokenForMeetAvailable(isTokenValid);
  }, []);

  if (!isFilled && ClassroomDetailSuccess) {
    setIsFilled(true);
    fillUpdateData();
  }

  const [isLoading, setIsLoading] = useState(false);

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

  const popUpToggle = () => {
    SetScheduleClassModal(!ScheduleClassModal);
    localStorage.setItem("openPopUp", true);
    setOpenPopup(true);
    setStoredPopup(false);
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
      course: ClassroomDetail.data_courseInfo,
      classroom: ClassroomDetail.data_classroomInfo,
      class_timing: onlineclassInfo.class_timing.value,
      duration: convertHrsIntoMinutes(),
      institute: users.user_institute,
      owner: users._id,
      topic: onlineclassInfo.videoTopic.value,
      agenda: onlineclassInfo.agenda.value,
      meetingPassword: onlineclassInfo.meetingPassword.value,
    };
  };

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
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
    return onlineclassInfo.class_timing.isValid &&
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

  const closeModalState = () => {
    localStorage.removeItem("openPopUp", false);
    setOpenPopup(false);
    setStoredPopup(false);

    setTimeout(() => {
      setOnlineClassInfo(emptyOnlineClassInfo);
      setShowSubmitError(false);
      setShowGoogleSubmitError(false);
    }, 100);

    SetScheduleClassModal(!ScheduleClassModal);
  };

  const scheduleviaZoom = () => {
    setIsSchduleViaGoogle(false);
    localStorage.setItem("isChooseMeet", false);
  };

  const scheduleviaGoogle = () => {
    setIsSchduleViaGoogle(true);
    localStorage.setItem("isChooseMeet", true);
  };

  const scheduleMeetClassSubmit = () => {
    setShowGoogleSubmitError(true);

    if (
      isMeetResoursesValid() &&
      (onlineclassInfo.hours.isValid || onlineclassInfo.minutes.isValid)
    ) {
      dispatch(createGoogleMeetEvent(meetResourse));
      setIsLoading(true);
      localStorage.removeItem("openPopUp", false);
      setOpenPopup(false);
      setStoredPopup(false);

      setTimeout(() => {
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, ToggleValue)
        );
      }, 800);
      setTimeout(() => {
        setShowSubmitError(false);
        setShowGoogleSubmitError(false);
        setOnlineClassInfo(emptyOnlineClassInfo);
      }, 600);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    isSuccess && SetScheduleClassModal(!ScheduleClassModal);
    dispatch(setSuccessFalse());
  }, [ScheduleClassModal, dispatch, isSuccess]);

  const onSubmit = () => {
    setShowSubmitError(true);
    convertHrsIntoMinutes();
    if (
      isFormValid() &&
      (onlineclassInfo.hours.isValid || onlineclassInfo.minutes.isValid)
    ) {
      dispatch(scheduleClass(getFormData()));
      setIsLoading(true);

      setTimeout(() => {
        localStorage.removeItem("openPopUp", false);
        setOpenPopup(false);
        setStoredPopup(false);
      }, 500);
      setTimeout(() => {
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, ToggleValue)
        );
      }, 500);
      setTimeout(() => {
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, ToggleValue)
        );
      }, 1000);
      setTimeout(() => {
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, ToggleValue)
        );
      }, 1400);

      setTimeout(() => {
        setOnlineClassInfo(emptyOnlineClassInfo);
        setShowSubmitError(false);
      }, 600);
    }
  };

  const authData = localStorage.getItem(classes_constant.meettoken);
  const token = authData ? Storage.getJson(classes_constant.meettoken) : "";

  const meetResourse = {
    data: {
      course: onlineclassInfo.course.value,
      classroom: onlineclassInfo.classroom.value,
      start: onlineclassInfo.class_start_timing.value,
      end: moment(onlineclassInfo.class_start_timing.value)
        .add(convertHrsIntoMinutes(), "m")
        .format(),
      duration: convertHrsIntoMinutes(),
      institute: users.user_institute,
      owner: users._id,
      token: token,
      summary: onlineclassInfo.videoSummary.value,
      description: onlineclassInfo.description.value,
      meetingOn: isSchduleViaGoogle ? "GoogleMeet" : "Zoom",
    },
  };

  const selectGroup = [
    "Class Timing",
    "Recent to Old",
    "Old to Recent",
    "Meeting Duration",
    "High to low",
    "Low to High",
    "Meeting On",
    "Zoom",
    "Google Meet",
  ];

  const filterValues = ["Class Timing", "Meeting Duration", "Meeting On"];

  const SingleSelectHandel = (item) => {
    let message = item;
    switch (message) {
      case "All":
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, ToggleValue)
        );

        break;

      case "Recent to Old":
        dispatch(
          SortOnlineTestClassroom(
            users.user_institute,
            classroomId,
            "class_timing",
            "rto"
          )
        );

        break;

      case "Old to Recent":
        dispatch(
          SortOnlineTestClassroom(
            users.user_institute,
            classroomId,
            "class_timing",
            "otr"
          )
        );

        break;
      case "High to low":
        dispatch(
          SortOnlineTestClassroom(
            users.user_institute,
            classroomId,
            "duration",
            "htl"
          )
        );

        break;

      case "Low to High":
        dispatch(
          SortOnlineTestClassroom(
            users.user_institute,
            classroomId,
            "duration",
            "lth"
          )
        );

        break;
      case "Zoom":
        dispatch(
          SortOnlineTestClassroom(
            users.user_institute,
            classroomId,
            "meetingon",
            "Zoom"
          )
        );

        break;

      case "Google Meet":
        dispatch(
          SortOnlineTestClassroom(
            users.user_institute,
            classroomId,
            "meetingon",
            "GoogleMeet"
          )
        );

        break;

      default:
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, ToggleValue)
        );
    }
  };

  const handelAssignToUpdate = (e, _id) => {
    let AssighntoValue = e.target.value;
    let data = "";
    dispatch(
      OnlineClassesAssignToUpdate({ data }, AssighntoValue, _id._id, users._id)
    );
  };


  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  if (TeacherListDataSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < TeacherListData.length; i++) {
      value.push(TeacherListData[i].user);
    }
    value.push("All");
    if (ToggleValue === "Online Classes") {
      dispatch(AllEntrySelected(value));
      dispatch(AllEntrySelectedSwitch(value));
    }
  }
  const OnSelectedValueAssignTo = (val) => {
    dispatch(
      MultiSelectOnlineTestClassroomFilter(
        users.user_institute,
        classroomId,
        "assignTo",
        val
      )
    );
  };
  const OnSelectedValueCreatedBy = (val) => {
    dispatch(
      MultiSelectOnlineTestClassroomFilter(
        users.user_institute,
        classroomId,
        "createdBy",
        val
      )
    );
  };

  return (
    <React.Fragment>
      <div className="PageTopHead PTH-ViewClassroomOnlineClass mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            selectGroup={selectGroup}
            filterValues={filterValues}
            SingleSelectHandel={(item) => SingleSelectHandel(item)}
          />
        </div>
        <div className="PTH-Item">
          {
            <MultiSelectDropDownCommon
              selectGroup={TeacherListData}
              OnSelectedValue={OnSelectedValueAssignTo}
              name={"Assign To"}
              SwitchSelectData={true}
            />
          }
        </div>
        <div className="PTH-Item">
          {
            <MultiSelectDropDownCommon
              selectGroup={TeacherListData}
              OnSelectedValue={OnSelectedValueCreatedBy}
              name={"Created By"}
              SwitchSelectData={false}
            />
          }
        </div>
        <div className="PTH-Item P-Right">
          <FilterSearch ToggleValue={ToggleValue} />
        </div>
        <div className="PTH-Item P-Right">
          <button
            className="button button-primary btn-oval btn-sm button-block"
            onClick={popUpToggle}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Schedule Live Class
          </button>
        </div>
      </div>

      <div className="gridTable mt-20">
        <table>
          <thead>
            <tr>
              <th width="20%">Class & Topic Name</th>
              <th width="15%">Created By</th>
              <th width="10%">Assign To</th>
              <th width="20%">Class Timing & Duration</th>
              <th width="15%">Meeting on</th>
              <th width="10%">Attendees</th>
              <th width="10%"></th>
            </tr>
          </thead>
          <tbody>
            {ViewClassroomListSuccess && ToggleValue === "Online Classes" ? (
              ViewClassroomList.length > 0 ? (
                ViewClassroomList.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td data-column="Class & Topic Name">
                        <p className="text-xs primary">{item.topic}</p>
                        <p className="mt-3">{item.agenda}</p>
                      </td>

                      <td data-column="Create By">{item.createdBy}</td>
                      <td data-column="Assign To">
                        <div className="selectTextType">
                          <select
                            onChange={(e) => handelAssignToUpdate(e, item)}
                            value={item.assignTo}
                          >
                            <option value={item.assignTo} hidden>
                              {item.assignTo}
                            </option>
                            {TeacherListDataSuccess ? (
                              TeacherListData.length > 0 ? (
                                TeacherListData.map((item_) => {
                                  return (
                                    <React.Fragment>
                                      <option
                                        key={item_._id}
                                        value={item_.user}
                                      >
                                        {item_.user_fullname}
                                      </option>
                                    </React.Fragment>
                                  );
                                })
                              ) : (
                                <p>No Record Found</p>
                              )
                            ) : (
                              <p>Loading</p>
                            )}
                          </select>
                        </div>
                      </td>
                      <td data-column="Class Timing & Duration">
                        {moment(item.class_timing).format(DATETIME_FORMAT_AP)}
                        <p className="text-xxs primary mt-3">
                          {item.duration} Min
                        </p>
                      </td>
                      <td data-column="Meeting on">{item.meetingOn}</td>
                      <td data-column="Attendess">
                        {item.meetingOn === "GoogleMeet" ? (
                          ""
                        ) : (
                          <span className="inline text-xxs">
                            {item.Attendees}&nbsp;
                            <i
                              className="ed-icon icon-external-link primary i-xxs"
                              onClick={() => attendessListPopup(item)}
                            ></i>
                          </span>
                        )}
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
                                    onClickBtnDropDownRemove(item._id, false)
                                  }
                                >
                                  Cancel
                                </button>
                                {ViewClassroomDeleteLoading ? (
                                  <button className="button button-red btn-sm">
                                    Removing...
                                  </button>
                                ) : (
                                  <button
                                    className="button button-red btn-sm"
                                    onClick={() => onClickBtnRemove(item._id)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="loadingGridData">No Records</div>
              )
            ) : (
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            )}
          </tbody>
        </table>

        <Modal ModalSize="modal-m" show={openPopup || storedPopup}>
          <ModalHeader
            closeButton={true}
            onclose={closeModalState}
          />
          <ModalBody>
            <div className="ChooseLiveClassVia">
              <p className="text-xxs w-600">Choose class via</p>
              <div className="LiveClassOptSelect mt-8">
                <button
                  className={`button btn-md ${isSchduleViaGoogle ? "btn-o-silver" : "btn-o-primary"
                    }`}
                  onClick={scheduleviaZoom}
                >
                  <img src={ZoomLogo} alt="Zoom" />
                </button>
                <button
                  className={`button btn-md ${isSchduleViaGoogle ? "btn-o-primary" : "btn-o-silver"
                    }`}
                  onClick={scheduleviaGoogle}
                >
                  <img src={GoogleMeetLogo} alt="Google Meet" />
                </button>
              </div>
            </div>
            {isSchduleViaGoogle ? (
              isAuthTokenForMeetAvailable ? (
                // true ? (
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
                  <div className="SelectHoursAndMin">

                    <div className="formFieldwrap">
                      {/* <div
                        className={`cstmSelectWrap ${!onlineclassInfo.hours.isValid &&
                          showGoogleSubmitError &&
                          !onlineclassInfo.minutes.isValid &&
                          showGoogleSubmitError
                          ? "errorInput"
                          : ""
                          }`}
                      > */}
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
                          hoursAndMinutesIsValid() && showGoogleSubmitError
                        }
                        error="Hours required."
                      />
                      {/* </div> */}
                    </div>

                    <div className="formFieldwrap">
                      {/* <div
                        className={`cstmSelectWrap ${!onlineclassInfo.hours.isValid &&
                          showGoogleSubmitError &&
                          !onlineclassInfo.minutes.isValid &&
                          showGoogleSubmitError
                          ? "errorInput"
                          : ""
                          }`}
                      > */}
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
                          hoursAndMinutesIsValid() && showGoogleSubmitError
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
                      To Schedule online classes via Google Meet You need to
                      authenticate yourself by google account.
                    </h3>
                    <p className="mt-15 gray">
                      Don't worry, we don't store your password.
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="TeacherScheduleClassModal mt-20">
                <div className="SelectHoursAndMin">
                  <div className="formFieldwrap">
                    {/* <div
                      className={`cstmSelectWrap ${!onlineclassInfo.hours.isValid &&
                        showSubmitError &&
                        !onlineclassInfo.minutes.isValid &&
                        showSubmitError
                        ? "errorInput"
                        : ""
                        }`}
                    > */}
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
                          showSubmitError &&
                          !onlineclassInfo.minutes.isValid &&
                          showSubmitError
                          ? "errorInput"
                          : ""
                      }
                      label="Select Minutes"
                    />
                    <FormError
                      show={hoursAndMinutesIsValid() && showSubmitError}
                      error="Hours required."
                    />
                    {/* </div> */}
                  </div>
                  <div className="formFieldwrap">
                    {/* <div
                      className={`cstmSelectWrap ${!onlineclassInfo.hours.isValid &&
                        showSubmitError &&
                        !onlineclassInfo.minutes.isValid &&
                        showSubmitError
                        ? "errorInput"
                        : ""
                        }`}
                    > */}
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
                          showSubmitError &&
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
                    {/* </div> */}
                  </div>
                </div>

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
                  />
                  <FormError
                    show={
                      !onlineclassInfo.videoTopic.isValid && showSubmitError
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
                    placeholder="enter video agenda/purpose"
                  />
                  <FormError
                    show={!onlineclassInfo.agenda.isValid && showSubmitError}
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
                    placeholder="enter meeting password"
                  />
                  <FormError
                    show={
                      !onlineclassInfo.meetingPassword.isValid &&
                      showSubmitError
                    }
                    error="Password required."
                  />
                </div>
                <div className="datePickerWrap">
                  <InputDateTimePicker
                    className={
                      !onlineclassInfo.class_timing.isValid && showSubmitError
                        ? "errorInput"
                        : ""
                    }
                    label="class_timing"
                    name="class_timing"
                    onSelect={(selectedDate) => handleDatePicker(selectedDate)}
                    value={onlineclassInfo.class_timing.value}
                    id="class_timing"
                    type="datetime-local"
                    placeholder="Class Timing"
                    minDate={new Date()}
                  />
                  <FormError
                    show={
                      !onlineclassInfo.class_timing.isValid && showSubmitError
                    }
                    error="Class-Time should be in future."
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
                      // true ? (
                      <CreateEvent
                        scheduleMeetClassSubmit={scheduleMeetClassSubmit}
                        formData={meetResourse}
                        loading={isLoading}
                      />
                    ) : (
                      <MeetLink ViewClassroom={true} id={classroomId} />
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
                  <button className="button btn-md button-theme">Loading...</button>
                )}
              </div>
            </div>
          </ModalFooter>
        </Modal>
        <ZoomVerificationPopup />
        <div className={`modal modalShowing-${modalStateAttendess}`}>
        </div>
      </div>
    </React.Fragment >
  );
};

export default ViewClassroomOnlineClasses;
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
