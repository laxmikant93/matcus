import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import { getClassroomAssignedData } from '../../../store/actions/classroomassigned';
import { classroomCreatedBy, getCourseandClassroom, getOnlineClasses } from '../../../store/actions/onlineClasses';
import ZoomVerificationPopup from '../../AdminDashboard/Courses/ViewClassroom/ClassroomOnlineClass/ZoomVerificationPopup';

const ClassList = () => {
  const dispatch = useDispatch()

  // Slector state
  const { onlineClasses, users, onlineclassSuccess } = useSelector((state) => {
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

  useEffect(() => {
    dispatch(
      getClassroomAssignedData(users._id, users.user_institute, "teacher")
    );
    dispatch(getOnlineClasses(users._id, users.user_institute));
    dispatch(getCourseandClassroom(users.user_institute));
    dispatch(classroomCreatedBy(users._id, users.user_institute));
  }, [dispatch, users]);
  return (
    <React.Fragment>
      <div className="gridTable mt-20">
        <table>
          <thead>
            <tr>
              <th width="35%">Class Details</th>
              <th width="30%">Class Timing & Duration</th>
              <th width="15%">Class On</th>
              <th width="10%">Attendees</th>
              <th width="10%"></th>
            </tr>
          </thead>
          <tbody>
            {onlineclassSuccess && onlineClasses.length > 0 ? (
              onlineClasses.map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    <tr
                      rowSpan="2"
                      className={`recurringclasseslasttd ${"" && "singleShowMoreButton" === item._id
                        ? "border-0"
                        : "border-1"
                        }`}
                    >
                      {item._id && (
                        <React.Fragment>
                          <td data-column="Class Name">
                            <p className="text-xs">{item.topic}</p>
                            <p className="text-xxs">
                              {" "}
                              {item.classroomInfo_classroomname
                                ? item.classroomInfo_classroomname
                                : item.classroomname}{" "}
                              &#62; {item.courseInfo_coursename}

                            </p>
                            <p
                              // onClick={() => Showmore(item._id)}
                              className="secondary mt-20 underline showMoreBtngreen"
                            >
                              <span
                                className={` ${"ShowMore" && "singleShowMoreButton" === item._id
                                  ? "active "
                                  : ""
                                  }`}
                              >
                                Show More
                              </span>
                            </p>
                          </td>

                          <td data-column="Class Timing & Duration">
                            {item.class_type === 8 ? (
                              <React.Fragment>
                                <div className="text-2xs w-600 base mb-10 inline aling-center">
                                  {/* <img src={ClockIcon} alt="clock" /> */}
                                  &nbsp;
                                  {/* &nbsp;{" "} */}
                                  {item.recurrence_type === 1 ||
                                    item.recurrence_type === "DAILY"
                                    ? `EveryDay`
                                    : (item.recurrence_type === 3 ||
                                      item.recurrence_type === "MONTHLY") &&
                                    `Every ${item.repeat_interval} Month On the ${item.monthly_day}`}
                                  {/* {item.recurrence_type === "WEEKLY" &&
                                    item.weekly_days
                                    ? findDayNameForGoogeMeet(
                                      item.weekly_days,
                                      item.repeat_interval
                                    )
                                    : null}
                                  {item.recurrence_type === 2 &&
                                    item.repeated_days &&
                                    findDayNameForZoom(
                                      item.repeated_days,
                                      item.repeat_interval
                                    )} */}
                                </div>

                                <div className=" dataonlineclass-timedate">

                                  <span className="text-xxs">
                                    {moment(item.class_timing).format("h:mm a")} -{" "}
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
                                  )} -{" "}
                                  {moment(item.class_timing)
                                    .add(item.duration, "m")
                                    .format("h:mm a")}
                                </p>
                              </React.Fragment>
                            )}
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
                                // onClick={() => attendessListPopup(item)}
                                ></i>
                              )}
                            </span>
                          </td>
                          <td>
                            <div className="actionBtnCustom">
                              <div className="onlineclasslistbtngroup">
                                {moment(item.class_timing)
                                  .add(item.duration, "m")
                                  .format() >= moment(new Date()).format() &&
                                  item.class_type !== 2 ? (
                                  <a
                                    rel="noopener noreferrer"
                                    target="blank"
                                    href={item.teacher_url}
                                    className=" button button-secondary text-xxs btn-xs button-block startbtnonlineclass"
                                  >
                                    Start Now
                                  </a>
                                ) : (
                                  <button
                                    disabled={true}
                                    className=" button btn-o-red  red text-xxs btn-xs button-block startbtnonlineclass"
                                  >
                                    Start Now
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className=" button btn-o-silver button-block btn-xs gray text-xxs"
                                // onClick={() =>
                                //   handleEditOnlineClasses(
                                //     item.meetingOn,
                                //     item
                                //   )
                                // }
                                >
                                  Edit
                                </button>
                                <button
                                  // onClick={() =>
                                  //   onClickBtnDropDownRemove(item._id, true)
                                  // }
                                  className="button btn-o-silver button-block btn-xs gray text-xxs"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            <p className="text-2xs red mt-8">
                              Next class on 12 Nov. 2021 8:30 am
                            </p>
                          </td>
                        </React.Fragment>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })
            ) : onlineclassSuccess && onlineClasses.length === 0 ? (
              <tr>
                <td colSpan="5">
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
      <ZoomVerificationPopup />
    </React.Fragment>
  )
}

export default ClassList
