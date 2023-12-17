/* eslint-disable eqeqeq */
import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ClockIcon from "./clocksmall-icon.svg";
import Popup from "../../../../Common/Popup";
import {
  getOnlineClass,
  resetPostOnlineClasses,
  resetEditOnlineClasses,
  getStudentList,
  removeOnlineClass,
  resetZoomVerification,
} from "../../../../store/actions/onlineClasses";
import JoineeList from "./JoineeList";
import ZoomVerificationPopup from "./ZoomVerificationPopup";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import { useNavigate } from "react-router-dom";
import StudentListModal from "./StudentListModal";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
const ClassesList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const closePopup = () => {
    setModalStateAttendess(false);
    setIsClick(false);
  };

  const { onlineClasses, onlineclassSuccess } = useSelector((state) => {
    return {
      onlineClasses: state.onlineClasses.list.data,
      courseAndClassroom: state.onlineClasses.courseAndClassroom,
      onlineclassSuccess: state.onlineClasses.list.success,
      onlineclassLoading: state.onlineClasses.list.loading,
      classroomCreatedByListSuccess:
        state.onlineClasses.assignedClassroom.success,
      classroomCreatedByList: state.onlineClasses.assignedClassroom.data,
      users: state.user,
      courseList: state.classroomassigned.courseList,
      isSuccess: state.zoomapi.success,
      studentsListLoading: state.onlineClasses.studentList.loading,
      studentsListSuccess: state.onlineClasses.studentList.success,
      studentsList: state.onlineClasses.studentList.data,
      singleClassData: state.onlineClasses.singleClass.data,
      singleClasssuccess: state.onlineClasses.singleClass.success,
      createData: state.onlineClasses.create.data,

      // isTokenExpired: state.zoomapi.GoogleMeetData,
    };
  });
  const [modalStateAttendess, setModalStateAttendess] = useState(false);
  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const RemovePopToggleRef = useRef();

  const editClass = (_id) => {
    history(`/dashboard/teacher/edit-online-class/${_id}`);
    // dispatch(getOnlineClass(2543543))
  };
  // const [teacherData, setTeacherData] = useState("");
  const [isClick, setIsClick] = useState(false);
  const manageModalEdit = () => {
    setModalStateAttendess(!modalStateAttendess);
  };
  const removeClass = (id) => {
    dispatch(removeOnlineClass(id));
    setRemovePop(!RemovePop);
  };
  const RemovePopState = (_id) => {
    setDeleteID(_id);
    setRemovePop(!RemovePop);
  };
  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });
  const [classID, setClassID] = useState("");
  const attendessListPopup = (allData) => {
    setClassID(allData._id);
    manageModalEdit();
    // setTeacherData(allData);
    setIsClick(true);
    dispatch(getOnlineClass(allData._id));
  };
  const [ShowMore, setShowMore] = useState(-1);
  const Showmore = (index) => {
    setShowMore(ShowMore == index ? -1 : index);

  };

  useEffect(() => {
    dispatch(resetPostOnlineClasses());
    dispatch(resetEditOnlineClasses());
    dispatch(resetZoomVerification());
  }, [dispatch]);

  const [studentListModal, setStudentListModal] = useState(false);
  const closeModalState = () => {
    setStudentListModal(!studentListModal);
  };
  const handleStudentListModal = (id) => {
    setStudentListModal(!studentListModal);
    dispatch(getStudentList(id));
  };

  const handleStartNow = (item) => {
    window.open(item.teacher_url, "_blank");
  };
  const sortWeekDays = (item) => {
    const list = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return list.filter(each => item && item.length ? item.includes(each) : "")
  }
  return (
    <React.Fragment>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-2">Class Details</li>
          <li className="col col-3">Class Timing & Duration</li>
          <li className="col col-2">Class on</li>
          <li className="col col-2">Attendees</li>
          <li className="col col-3">&nbsp;</li>
        </ul>

        <div className="gridBody">
          {onlineclassSuccess ? (
            onlineClasses.length > 0 ? (
              onlineClasses.map((item) => {
                return (
                  <React.Fragment>
                    <div className="gridRow" key={item._id}>
                      <ul className="topInfo">
                        {item._id && (
                          <React.Fragment>
                            <li className="col col-2" data-head="Class Details">
                              <div className="Deatils">
                                <div className="text-xs w-600 secondary">
                                  {item.topic}
                                </div>
                                <div className="mt-3">
                                  {item.courseInfo &&
                                    item.courseInfo.coursename}
                                  &#62;{" "}
                                  {item.classroomInfo &&
                                    item.classroomInfo.classroomname
                                    ? item.classroomInfo.classroomname
                                    : " "}
                                </div>
                                <div className="mt-3">
                                  <button
                                    onClick={() => Showmore(item._id)}
                                    className={`btnText BtnCaret  text-xxs w-300 ${ShowMore === item._id
                                      ? "active "
                                      : ""
                                      }`}
                                  >
                                    <span>
                                      Show More

                                    </span>
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li
                              className="col col-3"
                              data-head="Class Timing & Duration"
                            >
                              {item.class_type === 8 ? (
                                <React.Fragment>
                                  <div className="text-2xs w-600 base mb-10 inline aling-center">
                                    <img src={ClockIcon} alt="clock" />
                                    &nbsp; &nbsp;{" "}
                                    {item.recurrence_type === 1 ||
                                      item.recurrence_type === "DAILY"
                                      ? `EveryDay`
                                      : (item.recurrence_type === 3 ||
                                        item.recurrence_type === "MONTHLY") &&
                                      `Every ${item.repeat_interval} Month On the ${item.monthly_day}`}
                                    {item.recurrence_type === "WEEKLY" &&
                                      `Weekly ` +
                                      sortWeekDays(item.recurring_days)}
                                  </div>

                                  <div className=" dataonlineclass-timedate">
                                    <span className="text-xxs">
                                      {moment(item.class_timing).format(
                                        "h:mm A"
                                      )}{" "}
                                      -{" "}
                                      {moment(item.class_timing)
                                        .add(item.duration, "m")
                                        .format("h:mm A")}{" "}
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
                                      "h:mm A"
                                    )}{" "}
                                    -{" "}
                                    {moment(item.class_timing)
                                      .add(item.duration, "m")
                                      .format("h:mm A")}
                                  </p>
                                </React.Fragment>
                              )}
                            </li>

                            <li className="col col-2" data-head="Class on">
                              {item.meetingOn}
                            </li>
                            <li className="col col-2" data-head="Attendess">
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
                            <li className="col col-3 actionCols">
                              <div className="actionBtnCustom">
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

                                {
                                  //Remove popup
                                  item._id === deleteID && RemovePop && (
                                    <Popup
                                      show={true}
                                      // RemovePopToggleRef={RemovePopToggleRef}
                                      CancelProp={() =>
                                        setRemovePop(!RemovePop)
                                      }
                                      RemoveProp={() => removeClass(item._id)}
                                    // loading={deleteReviewLoading}
                                    >
                                      <p className="gray text-xxs w-300">
                                        You are about to remove this Class.
                                      </p>
                                      <p className="dgray text-xxs w-400">
                                        Are you sure?
                                      </p>
                                    </Popup>
                                  )
                                }
                              </div>
                              {item.class_type === 8 && (
                                <p className="text-2xs red mt-8">
                                  {item.upcomingClasses.length > 0
                                    ? `Next class on ${item.upcomingClasses[0]}`
                                    : ""}
                                </p>
                              )}
                            </li>
                          </React.Fragment>
                        )}
                      </ul>
                      {ShowMore === item._id && (
                        <React.Fragment>
                          <ul className="topInfo">
                            <li className="col col-3">
                              <div className="Details">
                                <div className="w-600 base">Class Agenda</div>
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
                            {item.class_type === 8 ? (
                              <React.Fragment>
                                <li className="col col-3">
                                  <div className="Details">
                                    <div className="w-600 base">Start On</div>
                                    <div className="mt-3">
                                      {" "}
                                      {moment(item.class_timing).format(
                                        "Do MMM, YYYY"
                                      )}
                                    </div>
                                  </div>
                                </li>
                                <li className="col col-3">
                                  <div className="Details">
                                    <div className="w-600 base">End On</div>
                                    <div className="mt-3">
                                      {moment(item.end_timing).format(
                                        "Do MMM, YYYY"
                                      )}
                                    </div>
                                  </div>
                                </li>
                              </React.Fragment>
                            ) : (
                              ""
                            )}
                          </ul>
                        </React.Fragment>
                      )}
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <NoDataAvailable title="No Records Found." />
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>
      <ZoomVerificationPopup />
      <div className={`modal modalShowing-${modalStateAttendess}`}>
        <JoineeList
          closePopup={closePopup}
          isClick={isClick}
          classId={classID}
        />
      </div>
      <StudentListModal onclose={closeModalState} show={studentListModal} />
    </React.Fragment>
  );
};

export default ClassesList;
