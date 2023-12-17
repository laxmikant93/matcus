import moment from "moment";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Storage from "../../../../../Classes/Storage";
import NoDataAvailable from "../../../../../Common/NoDataAvailable";
import Popup from "../../../../../Common/Popup";
import { courseID } from "../../../../../Constant/auth";
import { getClassroomAssignedData } from "../../../../../store/actions/classroomassigned";
import {
  classroomCreatedBy,
  getCourseandClassroom,
  getOnlineClass,
  getStudentList,
  resetZoomVerification,
} from "../../../../../store/actions/onlineClasses";
import { deleteClassroomViewItem } from "../../../../../store/actions/classroomdetail";
import JoineeList from "../../../../Dashboard/TeacherDashboard/OnlineClasses/JoineeList";
import StudentListModal from "../../../../Dashboard/TeacherDashboard/OnlineClasses/StudentListModal";
import ZoomVerificationPopup from "../../../../Dashboard/TeacherDashboard/OnlineClasses/ZoomVerificationPopup";
import ClockIcon from "./clocksmall-icon.svg";
const AdminSideList = () => {
  const [courseRouteID, setCourseID] = useState("");

  useEffect(() => {
    setCourseID(Storage.getJson(courseID));
  }, []);
  const dispatch = useDispatch();
  const history = useNavigate();
  const closePopup = () => {
    setModalStateAttendess(false);
    setIsClick(false);
  };
  const { classroomId } = useParams();
  const { onlineClasses, users, onlineclassSuccess, classroomData } =
    useSelector((state) => {
      return {
        onlineClasses: state.classroomDetail.OnlineCLasslist.data,
        courseAndClassroom: state.onlineClasses.courseAndClassroom,
        onlineclassSuccess: state.classroomDetail.OnlineCLasslist.success,
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
        classroomData: state.classroomDetail.classrooomData.data,
        classroomDataSuccess: state.classroomDetail.classrooomData.success,
        classroomDataLoading: state.classroomDetail.classrooomData.loading,
      };
    });
  const [modalStateAttendess, setModalStateAttendess] = useState(false);
  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const InsId = useSelector((state) => state.user.user_institute);
  const RemovePopToggleRef = useRef();

  const editClass = (_id) => {
    history(
      `/edit-admin-onlineClass/${_id}/${courseRouteID}/${classroomId}`
    );
  };
  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };
  const [isClick, setIsClick] = useState(false);
  const manageModalEdit = () => {
    setModalStateAttendess(!modalStateAttendess);
  };
  const removeClass = (id) => {
    dispatch(deleteClassroomViewItem(id, "Online Classes"));
    setRemovePop(false);
  };
  const attendessListPopup = (allData) => {
    manageModalEdit();
    setIsClick(true);
    dispatch(getOnlineClass(allData._id));
  };
  const [ShowMore, setShowMore] = useState("");
  const [singleShowMoreButton, setSingleShowMoreButton] = useState("");
  const Showmore = (id) => {
    setShowMore(!ShowMore);
    setSingleShowMoreButton(id);
  };

  useEffect(() => {
    dispatch(resetZoomVerification());
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      getClassroomAssignedData(users._id, users.user_institute, "teacher")
    );
    dispatch(getCourseandClassroom(InsId));
    dispatch(classroomCreatedBy(users._id, InsId));
  }, [InsId, dispatch, users, classroomData]);

  // eslint-disable-next-line no-unused-vars
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
          <li className="col col-3">Class Details</li>
          <li className="col col-3">Class Timing & Duration</li>
          <li className="col col-2">Class On</li>
          <li className="col col-2">Attendees</li>
          <li className="col col-2">&nbsp;</li>
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
                            <li className="col col-3" data-head="Class Details">
                              <div className="Details">
                                <div className="">{item.topic}</div>
                                <div className="mt-3">
                                  {`${item.courseInfo.coursename}>${item.classroomInfo.classroomname}`}
                                </div>
                                <div className="mt-3">
                                  <button
                                    onClick={() => Showmore(item._id)}
                                    className={`btnText BtnCaret  text-xxs w-300 ${ShowMore &&
                                      singleShowMoreButton === item._id
                                      ? "active "
                                      : ""
                                      }`}
                                  >
                                    <span>Show More</span>
                                  </button>
                                </div>
                              </div>
                            </li>
                            <li
                              className="col col-3"
                              data-head="Class Timing & Duration"
                            >
                              {item.class_type === 8 ? (
                                <div className="Details">
                                  <div className="text-2xs w-600 base mb-10 inline aling-center">
                                    <img src={ClockIcon} alt="clock" />
                                    &nbsp;
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
                                    <span className="primary text-xxs">
                                      {item.duration}Min.
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="Details">
                                  <div className="primary">
                                    {moment(item.class_timing).format(
                                      "Do MMM,YYYY"
                                    )}
                                    &nbsp;{item.duration}Min.
                                  </div>
                                  <div className="mt-3">
                                    {moment(item.class_timing).format("h:mm a")}{" "}
                                    {" - "}
                                    {moment(item.class_timing)
                                      .add(item.duration, "m")
                                      .format("h:mm a")}
                                  </div>
                                </div>
                              )}
                            </li>
                            <li className="col col-2" data-head="Meeting On">
                              {item.meetingOn}
                            </li>
                            <li className="col col-2" data-head="Attendess">
                              <span className="inline text-xxs align-center">
                                {item.meetingOn !== "GoogleMeet" &&
                                  item.Attendees}
                                &nbsp;
                                {item.meetingOn !== "GoogleMeet" && (
                                  <i
                                    className="ed-icon icon-external-link primary i-xxs"
                                    onClick={() => attendessListPopup(item)}
                                  ></i>
                                )}
                              </span>
                            </li>
                            <li className="col col-2 actionCols">
                              <div className="actionBtn">
                                <button
                                  className="btn-square"
                                  onClick={() => handleStartNow(item)}
                                  title="Start Now"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-play"></i>
                                  </span>
                                </button>
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
                                    show={RemovePop}
                                    RemovePopToggleRef={RemovePopToggleRef}
                                    CancelProp={() => setRemovePop(!RemovePop)}
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

                              {item.class_type === 8 && (
                                <div className="text-2xs red mt-8">
                                  Next class on {item.upcomingClasses[0]}
                                </div>
                              )}
                            </li>
                          </React.Fragment>
                        )}
                      </ul>
                      {/* </tr> */}
                      {ShowMore && singleShowMoreButton === item._id && (
                        <React.Fragment>
                          <ul className="topInfo">
                            <li className="col col-12">
                              <p className="text-xxs w-600 base">Class Agenda</p>
                              <p className="base text-xxs">{item.agenda}</p>
                            </li>
                          </ul>
                          <ul className="topInfo">
                            <li className="col col-3">
                              <div>
                                <p className="w-600 base"> Created By</p>
                                <p>{item.createdBy}</p>
                                <p className="text-2xs base">
                                  {moment(item.createdAt).format(
                                    "Do MMM. YYYY, h:mm A"
                                  )}
                                </p>
                              </div>
                            </li>
                            {item.class_type === 8 ? (
                              <React.Fragment>
                                <li className="col col-3">
                                  <div>
                                    <p className="w-600 base">Start On</p>
                                    <p>
                                      {" "}
                                      {moment(item.class_timing).format(
                                        "Do MMM, YYYY"
                                      )}
                                    </p>
                                  </div>
                                </li>
                                <li className="col col-3">
                                  <div>
                                    <p className="w-600 base">End On</p>
                                    <p>
                                      {moment(item.end_timing).format(
                                        "Do MMM, YYYY"
                                      )}
                                    </p>
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
      <div
        className={`modal modalShowing-${modalStateAttendess}`}
      >
        <JoineeList
          closePopup={closePopup}
          isClick={isClick}
        // classId={item._id}
        />
      </div>
      <StudentListModal
        onclose={closeModalState}
        show={studentListModal}
      />
      <ZoomVerificationPopup />
    </React.Fragment>
  );
};

export default AdminSideList;
