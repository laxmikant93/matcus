/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForkRef } from "rooks";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import ModalBody from "../../../Common/Modal/ModalBody";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import { getClassroomAssignedData } from "../../../store/actions/classroomassigned";
import {
  classroomCreatedBy,
  deleteOnlineClasses,
  getCourseandClassroom,
  getOnlineClass,
  getOnlineClasses,
  getStudentList,
  removeOnlineClass,
  resetEditOnlineClasses,
  resetPostOnlineClasses,
} from "../../../store/actions/onlineClasses";
import {
  getJoinClass,
  getUpcomingClasses,
  postAttendedTime,
} from "../../../store/actions/studentjoinclass";
import UpcomingClassesModal from "../../OnlineClasses/UpcomingClassesModal";
import ZoomVerificationPopup from "../TeacherDashboard/OnlineClasses/ZoomVerificationPopup";
import ClockIcon from "./clocksmall-icon.svg";

const StudentSideList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const {
    onlineClasses,
    users,
    onlineclassSuccess,
    singleClassData,
    studentJoinClassSuccess,
    studentJoinClassData,
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
      studentsListLoading: state.onlineClasses.studentList.loading,
      studentsListSuccess: state.onlineClasses.studentList.success,
      studentsList: state.onlineClasses.studentList.data,
      singleClassData: state.onlineClasses.singleClass.data,
      singleClasssuccess: state.onlineClasses.singleClass.success,
      studentJoinClassSuccess: state.studentjoinclass.list.success,
      studentJoinClassData: state.studentjoinclass.list.data,
      // isTokenExpired: state.zoomapi.GoogleMeetData,
    };
  });
  const dropdownRef = useForkRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [onlineclassId, setOnlineClassId] = useState("");
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setOnlineClassId(_id);
    setIsActive(isActive);
  };

  const [upcomingClassModal, setUpcomingClassModal] = useState(false);
  const closeModalState = () => {
    setUpcomingClassModal(!upcomingClassModal);
  };

  const handleUpcomingClasses = (item) => {
    setUpcomingClassModal(!upcomingClassModal);
    dispatch(getUpcomingClasses(item));
  };
  const [ShowMore, setShowMore] = useState();
  const [singleShowMoreButton, setSingleShowMoreButton] = useState();
  const Showmore = (id) => {
    setShowMore(!ShowMore);
    setSingleShowMoreButton(id);
  };
  const onClickBtnRemove = (_id) => {
    dispatch(deleteOnlineClasses(_id));
    setOnlineClassId("");
    setIsActive(false);
  };
  const findDayNameForZoom = (arrayIndex, repeatInterval) => {
    let daysName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    let convertStringIntoArray = JSON.parse("[" + arrayIndex + "]");

    let dayNameasArray = daysName.filter((dayName, index) => {
      return convertStringIntoArray.some((j) => index + 1 === j);
    });
    const staticText = `Every ${repeatInterval === 1 ? "Week" : `${repeatInterval + " Weeks"}`
      } On ${dayNameasArray.join()}`;
    return staticText;
  };
  const attendedTime = () => {
    return {
      joinTime: moment().format("LLLL"),
    };
  };
  const handleStartNow = (item) => {
    // dispatch(postAttendedTime(users._id, item._id, attendedTime()))
    window.open(item.onlineclasses_data.join_url, "_blank");
  };
  const handleOngoing = (item) => {
    window.open(item.onlineclasses_data.join_url, "_blank");
  };
  return (
    <React.Fragment>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3">Class Details</li>
          <li className="col col-3">Class Timing & Duration</li>
          <li className="col col-3">Class On</li>
          <li className="col col-3">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {studentJoinClassSuccess ? (
            studentJoinClassData.length > 0 ? (
              studentJoinClassData.map((item) => {
                return (
                  <React.Fragment>
                    <div className="gridRow" key={item._id}>
                      <ul className="topInfo">
                        {/*<tr
                  rowSpan="2"
                  className={`recurringclasseslasttd ${ShowMore && singleShowMoreButton === item._id
                    ? "border-0"
                    : "border-1"
                    }`}
                  > */}
                        <React.Fragment>
                          <li className="col col-3" data-head="Class Details">
                            <div className="Details">
                              <div className="text-xs w-600 purple">
                                {item.onlineclasses_data.topic}
                              </div>
                              <div className="mt-3">
                                {item.course_data.coursename} &#62;{" "}
                                {item.classroom_data
                                  ? item.classroom_data.classroomname
                                  : item.classroom_data.classroomname}
                              </div>
                              <button
                                type="button"
                                onClick={() => Showmore(item._id)}
                                className={`btnText BtnCaret  text-xxs w-300 ${ShowMore && singleShowMoreButton === item._id
                                  ? "active "
                                  : ""
                                  }`}
                              >
                                Show More
                              </button>
                            </div>
                          </li>

                          <li
                            className="col col-3"
                            data-head="Class Timing & Duration"
                          >
                            {item.onlineclasses_data.class_type ? (
                              item.onlineclasses_data.class_type === 8 ? (
                                <div className="Details">
                                  <div className="text-2xs w-600 base mb-10 inline aling-center">
                                    {/* <img src={Clock} alt="clock" /> */}
                                    &nbsp;
                                    {/* &nbsp;{" "} */}
                                    {item.onlineclasses_data &&
                                      item.onlineclasses_data.recurrence_type &&
                                      item.onlineclasses_data.recurrence_type ===
                                      "DAILY"
                                      ? `EveryDay`
                                      : ((item.onlineclasses_data &&
                                        item.onlineclasses_data
                                          .recurrence_type &&
                                        item.onlineclasses_data
                                          .recurrence_type === 3) ||
                                        (item.onlineclasses_data &&
                                          item.onlineclasses_data
                                            .recurrence_type &&
                                          item.onlineclasses_data
                                            .recurrence_type ===
                                          "MONTHLY")) &&
                                      `Every ${item.onlineclasses_data &&
                                      item.onlineclasses_data
                                        .repeat_interval &&
                                      item.onlineclasses_data
                                        .repeat_interval
                                      } Month On the ${item.onlineclasses_data &&
                                      item.onlineclasses_data.monthly_day &&
                                      item.onlineclasses_data.monthly_day
                                      }`}
                                    {item.onlineclasses_data &&
                                      item.onlineclasses_data.recurrence_type &&
                                      item.onlineclasses_data
                                        .recurrence_type === "WEEKLY" &&
                                      `Weekly ` + item.onlineclasses_data &&
                                      item.onlineclasses_data.recurring_days &&
                                      item.onlineclasses_data.recurring_days
                                        .length &&
                                      item.onlineclasses_data.recurring_days.map(
                                        (day) => {
                                          return `${day} `;
                                        }
                                      )}
                                    {/* {item.onlineclasses_data && item.onlineclasses_data.recurrence_type && item.onlineclasses_data.recurrence_type === 2 &&
                                      item.onlineclasses_data.repeated_days &&
                                      findDayNameForZoom(
                                        item.onlineclasses_data.repeated_days,
                                        item.onlineclasses_data.repeat_interval
                                      )} */}
                                  </div>

                                  <div className=" dataonlineclass-timedate">
                                    <span className="text-xxs">
                                      {moment(
                                        item.onlineclasses_data.class_timing
                                      ).format("h:mm A")}{" "}
                                      -{" "}
                                      {moment(
                                        item.onlineclasses_data.class_timing
                                      )
                                        .add(
                                          item.onlineclasses_data.duration,
                                          "m"
                                        )
                                        .format("h:mm A")}{" "}
                                    </span>
                                    <span className="purple text-xxs">
                                      {item.onlineclasses_data.duration}Min.
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <React.Fragment>
                                  <div className="Details">
                                    <div className="purple">
                                      {moment(
                                        item.onlineclasses_data.class_timing
                                      ).format("Do MMM,YYYY")}{" "}
                                      &nbsp;{item.onlineclasses_data.duration}
                                      Min.
                                    </div>
                                    <div className="mt-3">
                                      {moment(
                                        item.onlineclasses_data.class_timing
                                      ).format("h:mm A")}{" "}
                                      -{" "}
                                      {moment(
                                        item.onlineclasses_data.class_timing
                                      )
                                        .add(
                                          item.onlineclasses_data.duration,
                                          "m"
                                        )
                                        .format("h:mm A")}
                                    </div>
                                  </div>
                                </React.Fragment>
                              )
                            ) : (
                              <React.Fragment>
                                <div className="Details">
                                  <div className="purple">
                                    {moment(
                                      item.onlineclasses_data.class_timing
                                    ).format("Do MMM,YYYY")}
                                    &nbsp;{item.onlineclasses_data.duration}Min.
                                  </div>
                                  <div className="mt-3">
                                    &nbsp;
                                    {moment(
                                      item.onlineclasses_data.class_timing
                                    ).format("h:mm A")}{" "}
                                    -{" "}
                                    {moment(
                                      item.onlineclasses_data.class_timing
                                    )
                                      .add(
                                        item.onlineclasses_data.duration,
                                        "m"
                                      )
                                      .format("h:mm A")}
                                  </div>
                                </div>
                              </React.Fragment>
                            )}
                          </li>

                          <li className="col col-3" data-head="Meeting On">
                            {item.onlineclasses_data &&
                              item.onlineclasses_data.meetingOn}
                          </li>
                          <li className="col col-3 actionCols">
                            <div className="actionBtn">
                              <React.Fragment>
                                {item.onlineclasses_data &&
                                  item.onlineclasses_data.class_type === 2 ? (
                                  <React.Fragment>
                                    <button
                                      className="btn-square"
                                      onClick={() => handleStartNow(item)}
                                      title="Join Now"
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-join"></i>
                                      </span>
                                    </button>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    {/* moment(item.onlineclasses_data.class_timing)
                                              .add(item.onlineclasses_data.duration, "m")
                                              .format() > moment(new Date()).format() ? ( */}
                                    <button
                                      className="btn-square"
                                      onClick={() => handleStartNow(item)}
                                      title="Join Now"
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-join"></i>
                                      </span>
                                    </button>
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                              {item.onlineclasses_data.class_type === 8 && (
                                <React.Fragment>
                                  <button
                                    className="btn-square"
                                    title="Upcoming Classes"
                                    onClick={() => handleUpcomingClasses(item)}
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-time"></i>
                                    </span>
                                  </button>
                                </React.Fragment>
                              )}
                            </div>

                            <p className="red text-2xs mt-3">
                              {item.upcomingClasses.length > 0 &&
                                item.upcomingClasses[0]}
                            </p>
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
                                  <button
                                    className="button button-red btn-sm"
                                    onClick={() => {
                                      onClickBtnRemove(item._id);
                                      onClickBtnDropDownRemove(item._id, false);
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )}
                            {/* <p className="text-2xs red mt-8">
                              Next class on {item.upcomingClasses[0]}
                                    </p> */}
                          </li>
                        </React.Fragment>
                      </ul>
                      {ShowMore && singleShowMoreButton === item._id && (
                        <React.Fragment>
                          <ul className="topInfo">
                            <li className="col col-3">
                              <div className="Details">
                                <div className="">Class Agenda</div>
                                <div className="mt-3">
                                  {item.onlineclasses_data &&
                                    item.onlineclasses_data.agenda}
                                </div>
                              </div>
                            </li>

                            <li className="col col-3">
                              <div className="Details">
                                <div className=""> Created By</div>
                                <div className="mt-3">
                                  {item.onlineclasses_data.createdBy}
                                </div>
                                <div className="mt-3">
                                  {moment(
                                    item.onlineclasses_data &&
                                    item.onlineclasses_data.createdAt
                                  ).format("Do MMM. YYYY, h:mm A")}
                                </div>
                              </div>
                            </li>
                            {item.onlineclasses_data &&
                              item.onlineclasses_data.class_type === 8 ? (
                              <React.Fragment>
                                <li className="col col-3">
                                  <div className="Details">
                                    <p className="">Start On</p>
                                    <p>
                                      {" "}
                                      {moment(
                                        item.onlineclasses_data &&
                                        item.onlineclasses_data.class_timing
                                      ).format("Do MMM, YYYY")}
                                    </p>
                                  </div>
                                </li>
                                <li className="col col-3">
                                  <div>
                                    <p className="w-600 base">End On</p>
                                    <p>
                                      {moment(
                                        item.onlineclasses_data &&
                                        item.onlineclasses_data.end_timing
                                      ).format("Do MMM, YYYY")}
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
      {upcomingClassModal && (
        <UpcomingClassesModal
          onclose={closeModalState}
          show={upcomingClassModal}
        />
      )}
    </React.Fragment>
  );
};

export default StudentSideList;
