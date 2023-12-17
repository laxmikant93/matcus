/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseOutsideClick from "../../../../../../Common/UseOutsideClick";
import {
  getClassroomViewList,
  deleteClassroomViewItem,
  getAssignmentTeacherClassroom,
  SearchClassroomViewItem,
} from "../../../../../../store/actions/classroomdetail";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import ValidationFile from "../../../../../../Classes/ValidationFile";
import {
  setSuccessFalse,
  hideZoomPopup,
} from "../../../../../../store/actions/zoomApi";
import JoineeList from "../../../OnlineClasses/JoineeList";
import { classes_constant } from "../../../../../../Constant/classes";
import Storage from "../../../../../../Classes/Storage";
import ClockIcon from "./clocksmall-icon.svg";
import ToggleFilterClassroom from "./ToogleFilterClassroom";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../../../../store/actions/MultiSelectDropDown";
import { getStudentList } from "../../../../../../store/actions/onlineClasses";
import StudentListModal from "../../../OnlineClasses/StudentListModal";
import Popup from "../../../../../../Common/Popup";
import SearchControl from "../../../../../../Common/SearchControl";
import EmailAddPopUp from "../../../../../Auth/EmailAddPopUp/EmailAddPopUp";
const TeacherOnlineClassesTab = () => {
  const ToggleValue = "Online Classes";

  const { classroomId, subjectId } = useParams();
  const RemovePopToggleRef = useRef();
  const dispatch = useDispatch();
  const history = useNavigate();
  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });
  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);
  const closePopup = () => {
    setModalStateAttendess(false);
    setIsClick(false);
  };

  const [RemovePop, setRemovePop] = useState(false);
  const removeClass = (id) => {
    dispatch(deleteClassroomViewItem(id, "Online Classes"));
    setRemovePop(false);
  };
  const {
    users,
    ViewClassroomList,
    ViewClassroomListSuccess,
    ClassroomDetail,
    ClassroomDetailSuccess,
    TeacherListData,
    TeacherListDataSuccess,
    isSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      ViewClassroomList: state.classroomDetail.OnlineCLasslist.data,
      ClassroomDetail: state.classroomDetail.classrooomData.data,
      ClassroomDetailSuccess: state.classroomDetail.classrooomData.success,
      ViewClassroomListSuccess: state.classroomDetail.OnlineCLasslist.success,
      ViewClassroomListLoading: state.classroomDetail.OnlineCLasslist.loading,
      ViewClassroomDeleteLoading: state.classroomDetail.delete.loading,
      // ViewClassroomDeleteSuccess: state.classroomDetail.delete.success,
      TeacherListData: state.classroomDetail.TeacherDataList.data,
      TeacherListDataSuccess: state.classroomDetail.TeacherDataList.success,
      isSuccess: state.zoomapi.success,
      studentsListLoading: state.onlineClasses.studentList.loading,
      studentsListSuccess: state.onlineClasses.studentList.success,
      studentsList: state.onlineClasses.studentList.data,
      singleClassData: state.onlineClasses.singleClass.data,
      singleClasssuccess: state.onlineClasses.singleClass.success,
    };
  });

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

  // const [isLoading, setIsLoading] = useState(false);

  const [modalStateAttendess, setModalStateAttendess] = useState(false);
  const manageModalEdit = () => {
    setModalStateAttendess(!modalStateAttendess);
  };
  // const [teacherData, setTeacherData] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [classID, setClassID] = useState(false);

  const attendessListPopup = (allData) => {
    manageModalEdit();
    // setTeacherData(allData);
    setIsClick(true);
    // SetScheduleClassModal(false);
    setClassID(allData._id);
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

  useEffect(() => {
    // setIsLoading(false);
    isSuccess && SetScheduleClassModal(!ScheduleClassModal);
    dispatch(setSuccessFalse());
  }, [ScheduleClassModal, dispatch, isSuccess]);
  const [toggle, setToggle] = useState(false);

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  if (TeacherListDataSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < TeacherListData.length; i++) {
      value.push(TeacherListData[i].user._id);
    }
    value.push("All");
    if (ToggleValue === "Online Classes") {
      dispatch(AllEntrySelected(value));
      dispatch(AllEntrySelectedSwitch(value));
    }
  }

  const editClass = (_id) => {
    history(
      `/dashboard/teacher/edit-subject-onlineclass/${_id}/${classroomId}/${subjectId}`
    );
    // dispatch(getOnlineClass(2543543))
  };
  const [deleteID, setDeleteID] = useState("");

  const RemovePopState = (_id) => {
    setDeleteID(_id);
    setRemovePop(!RemovePop);
  };
  const [studentListModal, setStudentListModal] = useState(false);

  const handleStudentListModal = (id) => {
    setStudentListModal(!studentListModal);
    dispatch(getStudentList(id));
  };
  const [ShowMore, setShowMore] = useState();
  const [singleShowMoreButton, setSingleShowMoreButton] = useState();
  const Showmore = (id) => {
    setShowMore(!ShowMore);
    setSingleShowMoreButton(id);
  };
  const findDayNameForZoom = (arrayIndex, repeatInterval) => {
    let daysName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    let convertStringIntoArray = JSON.parse("[" + arrayIndex + "]");

    let dayNameasArray = daysName.filter((dayName, index) => {
      return convertStringIntoArray.some((j) => index + 1 === j);
    });
    // return dayNameasArray.join();
    const staticText = `Every ${repeatInterval === 1 ? "Week" : `${repeatInterval + " Weeks"}`
      } On ${dayNameasArray.join()}`;
    return staticText;
  };
  const handleStartNow = (item) => {
    window.open(item.teacher_url, "_blank");
  };

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
    if (searchTerm) {
      dispatch(
        SearchClassroomViewItem(
          users.user_institute,
          ToggleValue,
          subjectId,
          searchTerm,
          users._id
        )
      );
    } else {
      dispatch(
        getClassroomViewList(
          users.user_institute,
          subjectId,
          ToggleValue,
          users._id
        )
      );
    }
  }, [dispatch, searchTerm, subjectId, users._id, users.user_institute]);

  const [openAddEmailPopUp, setOpenAddEmailPopUp] = useState(false);

  const handleSubmit = () => {
    if (users.user_email) {
      history(
        `/dashboard/teacher/create-subject-onlineclass/${classroomId}/${subjectId}`
      );
    } else {
      setOpenAddEmailPopUp(true);
    }
  };

  const closePopUp = () => {
    setOpenAddEmailPopUp(!openAddEmailPopUp);
  };
  const sortWeekDays = (item) => {
    const list = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return list.filter(each => item && item.length ? item.includes(each) : "")
  };
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-TeacherRoleOnlineClass mt-20">
        <div className="PTH-Item">
          <div className="text-sm w-300">
            <span className="secondary">
              {ViewClassroomListSuccess && ViewClassroomList.length}
            </span>
            &nbsp;Online Classes
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            placeholder="Search Online Classes"
            onChange={handleSearch}
          />
        </div>

        <div className="PTH-Item P-Right">
          <button
            className="toggleFilterBtn"
            onClick={() => setToggle(!toggle)}
            title="Filter"
          >
            <i className="ed-filter"></i>
          </button>
        </div>

        <div className="PTH-Item P-Right">
          <button
            className="button button-secondary btn-oval btn-sm"
            onClick={handleSubmit}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>Schedule Class
          </button>
        </div>
      </div>
      {toggle && <ToggleFilterClassroom />}
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3">Class & Topic Name</li>
          <li className="col col-3">Timing & Duration</li>
          <li className="col col-2">Medium</li>
          <li className="col col-2">Attendees</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {ViewClassroomListSuccess && ToggleValue === "Online Classes" ? (
            ViewClassroomList.length > 0 ? (
              ViewClassroomList.map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    <div
                      rowSpan="2"
                      className={`gridRow ${ShowMore && singleShowMoreButton === item._id
                        ? "border-0"
                        : "border-1"
                        }`}
                    >
                      <ul className="topInfo">
                        {item._id && (
                          <React.Fragment>
                            <li
                              className="col col-3"
                              data-head="Class & Topic Name"
                            >
                              <div className="Details">
                                <div className="text-xs secondary w-600">
                                  {item.topic}
                                </div>
                                <div className="mt-3">
                                  {" "}
                                  {item.courseInfo &&
                                    item.courseInfo.coursename}
                                  &#62;{" "}
                                  {item.classroomInfo.classroomname
                                    ? item.classroomInfo.classroomname
                                    : " "}
                                </div>
                                <button
                                  onClick={() => Showmore(item._id)}
                                  className={`btnText BtnCaret text-xxs w-300 ${ShowMore &&
                                    singleShowMoreButton === item._id
                                    ? "active "
                                    : ""
                                    }`}
                                >
                                  Show&nbsp;
                                  {ShowMore && singleShowMoreButton === item._id
                                    ? "More"
                                    : "Less"}
                                </button>
                              </div>
                            </li>
                            <li
                              className="col col-3"
                              data-head="Timing & Duration"
                            >
                              {item.class_type === 8 ? (
                                <React.Fragment>
                                  <div className="text-2xs w-600 base mb-10 inline aling-center">
                                    <img src={ClockIcon} alt="clock" />
                                    &nbsp;
                                    {/* &nbsp;{" "} */}
                                    {item.recurrence_type === 1 ||
                                      item.recurrence_type === "DAILY"
                                      ? `EveryDay`
                                      : (item.recurrence_type === 3 ||
                                        item.recurrence_type === "MONTHLY") &&
                                      `Every ${item.repeat_interval} Month On the ${item.monthly_day}`}
                                    {item.recurrence_type === "WEEKLY" &&
                                      `Weekly ` +
                                      sortWeekDays(item.recurring_days)
                                    }

                                  </div>

                                  <div className=" dataonlineclass-timedate">
                                    <span className="text-xxs">
                                      {moment(item.class_timing).format(
                                        "h:mm a"
                                      )}{" "}
                                      -{" "}
                                      {moment(item.class_timing)
                                        .add(item.duration, "m")
                                        .format("h:mm a")}{" "}
                                    </span>
                                    <span className="secondary text-xxs">
                                      {item.duration}Min.
                                    </span>
                                  </div>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  {moment(item.class_timing).format(
                                    "Do MMM,YYYY"
                                  )}
                                  <span className="secondary">
                                    &nbsp;{item.duration}Min.
                                  </span>
                                  <p className="">
                                    &nbsp;
                                    {moment(item.class_timing).format(
                                      "h:mm a"
                                    )}{" "}
                                    -{" "}
                                    {moment(item.class_timing)
                                      .add(item.duration, "m")
                                      .format("h:mm a")}
                                  </p>
                                </React.Fragment>
                              )}
                            </li>
                            <li className="col col-2" data-head="Medium">
                              {item.meetingOn}
                            </li>
                            <li className="col col-2" data-head="Attendees">
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
                            </li>
                            <li className="col col-2 actionCols">
                              <div className="actionBtn">
                                <React.Fragment>
                                  {item.class_type === 2 ? (
                                    <React.Fragment>
                                      <button
                                        className="btn-square"
                                        onClick={() => handleStartNow(item)}
                                        title="Start Now"
                                      >
                                        <span className="cssIcon">
                                          <i className="ed-play"></i>
                                        </span>
                                      </button>
                                    </React.Fragment>
                                  ) : (
                                    <button
                                      className="btn-square"
                                      onClick={() => handleStartNow(item)}
                                      title="Start Now"
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-play"></i>
                                      </span>
                                    </button>
                                  )}
                                </React.Fragment>
                                <button
                                  type="button"
                                  className="btn-square"
                                  onClick={() => editClass(item._id)}
                                  title="Edit"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-pen"></i>
                                  </span>
                                </button>
                                <button
                                  onClick={() => RemovePopState(item._id)}
                                  className="btn-square"
                                  title="Remove"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-trash"></i>
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleStudentListModal(item._id)
                                  }
                                  className="btn-square"
                                  title="Student List"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-user-list"></i>
                                  </span>
                                </button>
                              </div>

                              <StudentListModal
                                onclose={closeModalState}
                                show={studentListModal}
                              />
                              {
                                //Remove popup
                                item._id === deleteID && RemovePop && (
                                  <Popup
                                    show={true}
                                    // RemovePopToggleRef={RemovePopToggleRef}
                                    CancelProp={() => setRemovePop(!RemovePop)}
                                    RemoveProp={() => removeClass(item._id)}
                                  // loading={deleteReviewLoading}
                                  >
                                    <p className="gray text-xxs w-300">
                                      You are about to remove this class.
                                    </p>
                                    <p className="dgray text-xxs w-400">
                                      Are you sure?
                                    </p>
                                  </Popup>
                                )
                              }
                              {item.class_type === 8 && (
                                <React.Fragment>
                                  {item.upcomingClasses.length > 0 ? (
                                    <p className="text-2xs red mt-8">
                                      Next class on&nbsp;
                                      {item.upcomingClasses[0]}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </React.Fragment>
                              )}
                            </li>
                          </React.Fragment>
                        )}
                      </ul>
                    </div>
                    {ShowMore && singleShowMoreButton === item._id && (
                      <ul className="topInfo">
                        <li className="col col-2">
                          <div className="Details">
                            <div className="base w-600">Class Agenda</div>
                            <div className="mt-3">{item.agenda}</div>
                          </div>
                        </li>
                        <li className="col col-3">
                          <div className="Details">
                            <div className="w-600 base"> Created By</div>
                            <div className="mt-3">{item.createdBy}</div>
                            <div className="mt-3">
                              {moment(item.createdAt).format(
                                "Do MMM. YYYY, h:mm A"
                              )}
                            </div>
                          </div>
                        </li>
                        <li className="col col-3">
                          <div className="Details">
                            <div className="w-600 base">{item.topic}</div>
                            <div className="mt-3">
                              {`${item.classroomInfo.classroomname} >  ${item.courseInfo.coursename}`}
                            </div>
                          </div>
                        </li>
                        <li className="col col-2">
                          <div className="Details">
                            <div className="w-600 base">Start On</div>
                            <div className="mt-3">
                              {moment(item.class_timing).format("Do MMM, YYYY")}
                            </div>
                          </div>
                        </li>
                        <li className="col col-2">
                          {item.class_type === 8 ? (
                            <React.Fragment>
                              <div className="Details">
                                <div className="w-600 base">End On</div>
                                <div className="mt-3">
                                  {moment(item.end_timing).format(
                                    "Do MMM, YYYY"
                                  )}
                                </div>
                              </div>
                            </React.Fragment>
                          ) : (
                            <></>
                          )}
                        </li>
                      </ul>
                    )}
                  </React.Fragment>
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
        </div>
        <ZoomVerificationPopup />
      </div>
      <div className={`modal modalShowing-${modalStateAttendess}`}>
        <JoineeList
          closePopup={closePopup}
          isClick={isClick}
          classId={classID}
        />
      </div>
      {openAddEmailPopUp && (
        <EmailAddPopUp
          showPopUp={openAddEmailPopUp}
          closePopUp={() => closePopUp()}
        />
      )}
    </React.Fragment>
  );
};

export default TeacherOnlineClassesTab;

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
