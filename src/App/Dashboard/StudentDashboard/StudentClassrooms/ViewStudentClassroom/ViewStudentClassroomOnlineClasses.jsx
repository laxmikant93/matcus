/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import InputDatePicker from "../../../../../Common/Form/InputDatePicker";
import SingleSelectDropdown from "../../../../../Common/Form/SingleSelectDropdown";
import CalenderIcon from "../../../../../Common/Icon/CalenderIcon";
import SearchControl from "../../../../../Common/SearchControl";
import { getUpcomingClasses } from "../../../../../store/actions/studentjoinclass";
import {
  getSubjectOnlineClassList,
  searchSortBySubjectOnlineClasssesList,
} from "../../../../../store/actions/viewStudentClassroom";
import UpcomingClassesModal from "../../../../OnlineClasses/UpcomingClassesModal";
import Clock from "../../clocksmall-icon.svg";

const ViewStudentClassroomOnlineClasses = () => {
  const [filterIconToggle, setFilterIconToggle] = useState();
  const dispatch = useDispatch();
  const { _classroomId, _subjectId } = useParams();
  const { user, onlineClassList, onlineClassListSuccess } = useSelector(
    (state) => {
      return {
        user: state.user,
        onlineClassListSuccess:
          state.viewStudentClassroom.subjectOnlineClassList.success,
        onlineClassList: state.viewStudentClassroom.subjectOnlineClassList.data,
      };
    }
  );
  const [startDate, setStartDate] = useState("");
  const [activeToggleName, setActiveToggleName] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  let typing;

  const handleSearch = (e) => {
    e.preventDefault();

    clearTimeout(typing);

    typing = setInterval(() => {
      setSearchTerm(e.target.value);
    }, 400);

    if (!e.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    dispatch(
      searchSortBySubjectOnlineClasssesList(
        user.user_institute,
        user._id,
        _classroomId,
        _subjectId,
        "search",
        searchTerm
      )
    );
  }, [dispatch, user, searchTerm, _classroomId, _subjectId]);
  // useEffect(() => {
  //   dispatch(searchClasses(users._id, InsId, searchTerm));
  // }, [InsId, dispatch, searchTerm, users._id]);

  const selectGroup = [
    "Created On",
    "Recent to Old",
    "Old to Recent",
    "Duration",
    "High to Low",
    "Low to High",
    "Meeting On",
    "Zoom",
    "Google Meet",
  ];
  const selectGroup2 = ["One Time", "Recurring"];

  const filterValues = ["Created On", "Duration", "Meeting On"];
  const SingleSelectHandel = (value) => {
    switch (value) {
      case "ALL": {
        dispatch(
          getSubjectOnlineClassList(user.user_institute, user._id, _subjectId)
        );
        break;
      }
      case "Recent to Old": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "createdOn",
            "rto"
          )
        );
        break;
      }
      case "Old to Recent": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "createdOn",
            "otr"
          )
        );
        break;
      }
      case "High to Low": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "duration",
            "htl"
          )
        );
        break;
      }
      case "Low to High": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "duration",
            "lth"
          )
        );
        break;
      }
      case "Zoom": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "meetingOn",
            "Zoom"
          )
        );
        break;
      }
      case "Google Meet": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "meetingOn",
            "GoogleMeet"
          )
        );
        break;
      }
      default:
        dispatch(
          getSubjectOnlineClassList(user.user_institute, user._id, _subjectId)
        );
    }
  };

  const SingleSelectHandelDates = (value, query) => {
    switch (value) {
      case "All": {
        dispatch(
          getSubjectOnlineClassList(user.user_institute, user._id, _subjectId)
        );
        setActiveToggleName(value);
        break;
      }
      case "today": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "timeStatus",
            "today"
          )
        );
        setActiveToggleName("today");
        break;
      }
      case "tomorrow": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "timeStatus",
            "tomorrow"
          )
        );
        setActiveToggleName("tomorrow");
        break;
      }
      case "thisWeek": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "timeStatus",
            "thisWeek"
          )
        );
        setActiveToggleName("thisWeek");
        break;
      }
      case "thisMonth": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "timeStatus",
            "thisMonth"
          )
        );
        setActiveToggleName("thisMonth");
        break;
      }
      case "CalenderIcon": {
        // dispatch(getFilteredClass(users._id, InsId, query, value));
        setActiveToggleName(value);
        break;
      }
      case "One Time": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "classType",
            2
          )
        );
        break;
      }
      case "Recurring": {
        dispatch(
          searchSortBySubjectOnlineClasssesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "classType",
            8
          )
        );
        // setActiveToggleName("thisMonth");
        break;
      }
      default:
      // dispatch(getFilteredClass(users._id, InsId, query, value));
    }
  };
  const [calenderData, setCalenderData] = useState([]);
  const [isDatesFilled, setIsDatesFilled] = useState(false);
  useEffect(() => {
    if (onlineClassListSuccess && !isDatesFilled) {
      setCalenderData(onlineClassList);
      setIsDatesFilled(true);
    }
  }, []);

  useEffect(() => {
    if (startDate) {
      dispatch(
        searchSortBySubjectOnlineClasssesList(
          user.user_institute,
          user._id,
          _classroomId,
          _subjectId,
          "date",
          moment(startDate).format("ddddDDMMMMYYYY")
        )
      );
    }
  }, [
    _classroomId,
    _subjectId,
    dispatch,
    startDate,
    user._id,
    user.user_institute,
  ]);

  function uniq(onlineClass) {
    let datesArray = [];
    onlineClass.forEach((element) => {
      datesArray.push(element.onlineclasses_data.class_timing);
    });
    return Array.from(new Set(datesArray));
  }

  useEffect(() => {
    dispatch(
      getSubjectOnlineClassList(user.user_institute, user._id, _subjectId)
    );
  }, [_subjectId, dispatch, user._id, user.user_institute]);

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
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-StudneClassRoomWrapper mt-20">
        <div className="PTH-Item">
          <div className="dgray text-sm w-300 mt-10">
            {onlineClassListSuccess && onlineClassListSuccess.length} Classes
          </div>
          {/* {coursename && (
              <p className="sub-heading base text-xxs w-300">
                {coursename.course_data_coursename}
              </p>
            )} */}
        </div>
        <div className="PTH-Item P-Right">
          <button
            className="toggleFilterBtn"
            onClick={() => setFilterIconToggle(!filterIconToggle)}
          >
            <i className="ed-filter"></i>
          </button>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            onChange={handleSearch}
            placeholder="Search Classes"
          />
        </div>

        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectLabelName="Class Type"
            SingleSelectHandel={SingleSelectHandelDates}
            selectGroup={selectGroup2}
            filterValues={[]}
          />
        </div>
      </div>

      {filterIconToggle && (
        <div className=" scroll-top-menu-wrap mt-10">
          <div className="onlineclassteacherdateTabsnew ">
            <button
              className={`button btn-xs base  w-400 ${activeToggleName === "All" ? "button-base" : "btn-o-base"
                }`}
              onClick={() => SingleSelectHandelDates("All")}
            >
              All
            </button>
            <button
              className={`button btn-xs base  w-400 ${activeToggleName === "today" ? "button-base" : "btn-o-base"
                }`}
              onClick={() => SingleSelectHandelDates("today")}
            >
              Today
            </button>
            <button
              className={`button btn-xs base  w-400 ${activeToggleName === "tomorrow"
                ? "button-base"
                : "btn-o-base"
                }`}
              onClick={() => SingleSelectHandelDates("tomorrow")}
            >
              Tormorrow
            </button>
            <button
              className={`button btn-xs base  w-400 ${activeToggleName === "thisWeek"
                ? "button-base"
                : "btn-o-base"
                }`}
              onClick={() => SingleSelectHandelDates("thisWeek")}
            >
              This Week
            </button>
            <button
              className={`button btn-xs base  w-400 ${activeToggleName === "thisMonth"
                ? "button-base"
                : "btn-o-base"
                }`}
              onClick={() => SingleSelectHandelDates("thisMonth")}
            >
              This Month
            </button>
            <div
              className={`DateInputIcon  ${activeToggleName === "CalenderIcon" ? "activeBlack" : "not"
                } `}
            // onClick={() => SingleSelectHandelDates("CalenderIcon")}
            >
              <CalenderIcon />
              <InputDatePicker
                popperPlacement="top-right"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                highlightDates={uniq(calenderData).map((date) => {
                  const d = new Date(date);
                  d.setDate(d.getDate());
                  return d;
                })}
                includedDates={uniq(calenderData).map((date) => {
                  const d = new Date(date);
                  d.setDate(d.getDate());
                  return d;
                })}
                className={`onlineClasscalenderIconFilter`}
              />
            </div>
          </div>
        </div>
      )}

      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3">Class Details</li>
          <li className="col col-3">Class Timing & Duration</li>
          <li className="col col-3">Class On</li>
          <li className="col col-3"></li>
        </ul>

        <div className="gridBody">
          {onlineClassListSuccess ? (
            onlineClassList.length > 0 ? (
              onlineClassList.map((item) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      {item.onlineclasses_data._id && (
                        <React.Fragment>
                          <li className="col col-3" data-column="Class Name">
                            <p className="text-xs">
                              {item.onlineclasses_data.topic}
                            </p>
                            <p className="text-xxs">
                              {item.course_data.coursename} &#62;{" "}
                              {item.classroom_data
                                ? item.classroom_data.classroomname
                                : item.classroom_data.classroomname}
                            </p>
                            <p
                              onClick={() => Showmore(item._id)}
                              className={`btnText BtnCaret  text-xxs w-300 ${ShowMore && singleShowMoreButton === item._id
                                ? "active "
                                : ""
                                }`}
                            >
                              Show More
                            </p>
                          </li>

                          <li
                            className="col col-3"
                            data-column="Class Timing & Duration"
                          >
                            {item.onlineclasses_data.class_type ? (
                              item.onlineclasses_data.class_type === 8 ? (
                                <React.Fragment>
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
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  {moment(
                                    item.onlineclasses_data.class_timing
                                  ).format("Do MMM,YYYY")}
                                  <span className="purple">
                                    &nbsp;{item.onlineclasses_data.duration}Min.
                                  </span>
                                  <p className="">
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
                                  </p>
                                </React.Fragment>
                              )
                            ) : (
                              <React.Fragment>
                                {moment(
                                  item.onlineclasses_data.class_timing
                                ).format("Do MMM,YYYY")}
                                <span className="purple">
                                  &nbsp;{item.onlineclasses_data.duration}Min.
                                </span>
                                <p className="">
                                  &nbsp;
                                  {moment(
                                    item.onlineclasses_data.class_timing
                                  ).format("h:mm A")}{" "}
                                  -{" "}
                                  {moment(item.onlineclasses_data.class_timing)
                                    .add(item.onlineclasses_data.duration, "m")
                                    .format("h:mm A")}
                                </p>
                              </React.Fragment>
                            )}
                          </li>

                          <li className="col col-3" data-column="Meeting On">
                            {item.onlineclasses_data.meetingOn}
                          </li>
                          <li className="col col-3 actionCols">
                            <div className="actionBtn">
                              <React.Fragment>
                                {item.onlineclasses_data.class_type === 2 ? (
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

                            <p>
                              {item.upcomingClasses.length > 0 &&
                                item.upcomingClasses[0]}
                            </p>

                            {/* <p className="text-2xs red mt-8">
                            Next class on {item.upcomingClasses[0]}
                                  </p> */}
                          </li>
                        </React.Fragment>
                      )}
                    </ul>
                    {ShowMore && singleShowMoreButton === item._id && (
                      <React.Fragment>
                        <ul className="topInfo">
                          <li className="col col-12">
                            <p className="text-xxs w-600 base">Class Agenda</p>
                            <p className="base text-xxs">
                              {item.onlineclasses_data.agenda}
                            </p>
                          </li>
                        </ul>
                        <ul className="topInfo">
                          <li className="col col-3">
                            <div>
                              <p className="w-600 base"> Created By</p>
                              <p>{item.onlineclasses_data.createdBy}</p>
                              <p className="text-2xs base">
                                {moment(
                                  item.onlineclasses_data.createdAt
                                ).format("Do MMM. YYYY, h:mm A")}
                              </p>
                            </div>
                          </li>
                          {item.onlineclasses_data.class_type === 8 ? (
                            <React.Fragment>
                              <li className="col col-3">
                                <div>
                                  <p className="w-600 base">Start On</p>
                                  <p>
                                    {" "}
                                    {moment(
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
                );
              })
            ) : (
              <div className="loadingGridData">No records found.</div>
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
export default ViewStudentClassroomOnlineClasses;
