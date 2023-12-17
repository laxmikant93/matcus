import React, { useState, useEffect, useRef } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
// import { SearchIcon } from "../../../Common/Icon";
import { useDispatch, useSelector } from "react-redux";
import { ListHead, ListHeadItem } from "./ListHead";
import refreshIcon from "./icon-refresh.svg";
import {
  getOnlineExamList,
  searchBySOE,
  filterByCoursesSOE,
  // getAssignTo,
} from "../../../store/actions/studentonlineexam";
import moment from "moment";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import { useNavigate } from "react-router-dom";
import CourseClassCheckboxFilter from "../../../Common/CourseClassCheckboxFilter";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  getAssignToFillter,
  // patchExamAnswer,
  postStudentExam,
} from "../../../store/actions/onlineexamstudent";
import "./OnlineExamStudentList.scss";
// import MultiSelectDropDownCommon from "../../../Common/Form/MultiSelectDropDownCommon";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import SearchControl from "../../../Common/SearchControl";
import // AllEntrySelected,
  // AllEntrySelectedSwitch,
  "../../../store/actions/MultiSelectDropDown";

export default function OnlineExamList() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { onlineExamReadList, onlineStudentExamList, users } = useSelector(
    (state) => {
      return {
        users: state.user,
        onlineExamReadList: state.studentonlineexam.list.data,
        onlineStudentExamList: state.studentonlineexam.list,
        TeacherListData: state.onlineexamstudent.assignTo.data,
      };
    }
  );

  useEffect(() => {
    dispatch(getOnlineExamList(users.user_institute, users._id));
    dispatch(getAssignToFillter(users._id, users.user_institute));
  }, [dispatch, users]);

  useEffect(() => {
    setInterval(() => {
      if (onlineStudentExamList.success) {
        onlineExamReadList.forEach((item) => {
          if (
            !item.submittedInfo &&
            moment(item.quizon).format("MMMM Do YYYY, h:mm a") ===
            moment(new Date()).format("MMMM Do YYYY, h:mm a")
          ) {
            dispatch(getOnlineExamList(users.user_institute, users._id));
          }
        });
      }
    }, 40000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineStudentExamList.success]);

  // search
  let typing;
  const handleChange = (event) => {
    event.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 400);

    if (!event.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(
        searchBySOE(users._id, users.user_institute, "search", searchTerm)
      );
    } else {
      dispatch(getOnlineExamList(users.user_institute, users._id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // sort By
  const selectGroup = [
    "Starts On",
    "Recent to Old 1",
    "Old to Recent 1",

    "No. Of Questions",
    "High to Low 1",
    "Low to High 1",

    "Obtained Marks",
    "High to Low 2",
    "Low to High 2",

    "Timings",
    "High to Low 3",
    "Low to High 3",

    "State",
    "Scheduled",
    "Start Now",
    "Submitted",
    "Missed",
    "View Result",
    "Cancelled",
  ];
  const filterValues = [
    "Starts On",
    "No. Of Questions",
    "Obtained Marks",
    "Timings",
    "State",
  ];
  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL":
        dispatch(
          getOnlineExamList(
            users.user_institute,
            users._id
            // courseIDSingle.course
          )
        );
        break;
      case "Recent to Old 1":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "quizon",
            "rto"
          )
        );
        break;
      case "Old to Recent 1":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "quizon",
            "otr"
          )
        );
        break;
      case "High to Low 1":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "question",
            "htl"
          )
        );
        break;
      case "Low to High 1":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "question",
            "lth"
          )
        );
        break;
      case "High to Low 2":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "marksObtained",
            "htl"
          )
        );
        break;
      case "Low to High 2":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "marksObtained",
            "lth"
          )
        );
        break;
      case "High to Low 3":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "estimatedtime",
            "htl"
          )
        );
        break;
      case "Low to High 3":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "estimatedtime",
            "lth"
          )
        );
        break;
      case "Scheduled":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "status",
            "scheduled"
          )
        );
        break;
      case "Start Now":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "status",
            "isStarted"
          )
        );
        break;
      case "Submitted":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "status",
            "isSubmitted"
          )
        );
        break;
      case "Missed":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "status",
            "missed"
          )
        );
        break;
      case "View Result":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "status",
            "isTestChecked"
          )
        );
        break;
      case "Cancelled":
        dispatch(
          searchBySOE(
            users._id,
            users.user_institute,
            // courseIDSingle.course,
            "status",
            "cancelled"
          )
        );
        break;
      default:
      // dispatch(
      //   getOnlineExamList(
      //     users.user_institute,
      //     users._id,
      //     courseIDSingle.course
      //   )
      // );
    }
  };
  const getFilterList = (selectedData) => {
    if (
      selectedData.classRoomList.length === 0 &&
      selectedData.courseList.length === 0
    ) {
      // dispatch(getOnlineExamList(users.user_institute, users._id, courseIDSingle.course));
    } else if (selectedData.length === 0) {
    } else {
      dispatch(
        filterByCoursesSOE(
          users._id,
          users.user_institute,
          selectedData.courseList,
          selectedData.classRoomList
        )
      );
    }
  };

  const handleStartNow = (_id) => {
    dispatch(
      postStudentExam({
        student: users._id,
        examId: _id,
      })
    );
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
    history(`/dashboard/student-online-test/${_id}`);
  };

  const handleResume = (_id) => {
    // dispatch(patchExamAnswer);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
    history(`/dashboard/student-online-test/${_id}`, { isResumed: true });
  };

  // Refresh
  const handleReload = () => {
    dispatch(getOnlineExamList(users.user_institute, users._id));
  };
  // Expand
  const [onlineShow, setOnlineShow] = useState("");
  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false);

  const handleClick = (_id) => {
    setOnlineShow(_id);
    SetToggleSectionTitle(!ToggleSectionTitle);
  };
  // First
  const dropdownRef = useRef(null);
  const [show, setShow] = useState("");
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClickBtn = (_id) => {
    setShow(_id);
    setIsActive(!isActive);
  };
  // Second
  const dropdownRef2 = useRef(null);
  const [show2, setShow2] = useState("");
  const [isActive2, setIsActive2] = useDetectOutsideClick(dropdownRef2, false);
  const onClickBtn2 = (_id) => {
    setShow2(_id);
    setIsActive2(!isActive2);
  };
  const handleResult = (item) => {
    history(`/dashboard/student/${item}/view-result/${users._id}`, {
      student: "student",
    });
  };

  // const OnSelectedValueAssigntTo = (val) => {
  //   dispatch(getAssignTo(users._id, users.user_institute, val));
  // };

  // const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  // if (onlineStudentExamList.success && !selectedTeacherFilled) {
  //   setSelectedTeacherFilled(true);
  //   let value = [];
  //   for (let i = 0; i < TeacherListData.length; i++) {
  //     value.push(TeacherListData[i].user);
  //   }
  //   dispatch(AllEntrySelected(value));
  //   dispatch(AllEntrySelectedSwitch(value));
  // }
  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/student/online-test"
            title="Online Tests"
          />
        </Breadcrumb>
        <p className="text-sm w-300 mt-20">
          <span className="purple">
            {onlineExamReadList && onlineExamReadList
              ? onlineExamReadList.length
              : ""}
          </span>
          &nbsp;
          {onlineExamReadList &&
            onlineExamReadList &&
            onlineExamReadList.length > 1
            ? "Online Tests"
            : "Online Test"}
        </p>
        <div className="PageTopHead PTH-StudentOnlineTestList mt-20">
          <div className="PTH-Item">
            <SingleSelectDropdown
              SingleSelectHandel={SingleSelectHandel}
              selectGroup={selectGroup}
              filterValues={filterValues}
            />
          </div>
          <div className="PTH-Item">
            {" "}
            <CourseClassCheckboxFilter
              onSelect={(selectedData) => getFilterList(selectedData)}
            />
          </div>

          <div className="PTH-Item">
            <button onClick={handleReload} className="refreshBtn" title="Refresh">
              <img src={refreshIcon} alt="" width="18px" />
            </button>
          </div>
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={handleChange}
              onKeyUp={handleChange}
              placeholder="Search online tests"
            />
          </div>
        </div>
        <div className="gridListTable StudentOnlineExamList">
          <ListHead>
            <ListHeadItem title="Title" className={`col col-2`} />
            <ListHeadItem title="Questions & Marks" className={`col col-2`} />
            <ListHeadItem title="Accessibility" className={`col col-2`} />
            <ListHeadItem title="Obtained Marks" className={`col col-2`} />
            <ListHeadItem title="Start On" className={`col col-2`} />
            <ListHeadItem title="" className={`col col-2`} />
          </ListHead>
          <div class="gridBody">
            {onlineStudentExamList.success && onlineExamReadList ? (
              onlineExamReadList.length > 0 ? (
                onlineExamReadList.map((item) => {
                  return (
                    <React.Fragment>
                      <div className="gridRow" key={item._id}>
                        <ul className="topInfo">
                          <li className="col col-2" data-head="Quiz Title">
                            <div className="Details">
                              <div className="text-xs purple w-600">
                                {item.title}
                              </div>
                              <div className="mt-3">
                                {item.courseInfo
                                  ? item.courseInfo.coursename
                                  : ""}
                              </div>
                              <div className="mt-3">
                                {item.classroomInfo
                                  ? item.classroomInfo.classroomname
                                  : ""}
                              </div>
                              <button
                                className={`btnText BtnCaret text-xxs w-300 ${ToggleSectionTitle &&
                                  item._id === onlineShow
                                  ? `active`
                                  : ``
                                  }`}
                                onClick={() => handleClick(item._id, false)}
                              >
                                {ToggleSectionTitle && item._id === onlineShow
                                  ? `Show Less`
                                  : `Show More`}
                              </button>
                            </div>
                          </li>
                          <li
                            className="col col-2"
                            data-head="Questions & Marks"
                          >
                            <div className="Details">
                              <div>
                                {item.question.length}
                                {item.question.length > 1
                                  ? " Questions"
                                  : " Question"}
                              </div>
                              <div className="mt-3">
                                {item.totalmarks}{" "}
                                {item.totalmarks > 1 ? " Marks" : "Mark"}
                              </div>
                              <div className="mt-3">
                                {item.estimatedtime}{" "}
                                {item.estimatedtime > 1 ? " mins" : " min"}
                              </div>
                            </div>
                          </li>
                          <li className="col col-2" data-head="Accessibility">
                            <div className="terminateInfoIcon">
                              {item.accessibilityMode}
                              &nbsp;
                              <button
                                type="button"
                                className="closeModal text-xs gray"
                                style={{
                                  border: "none",
                                  color: "purple",
                                  background: "transparent",
                                }}
                                onClick={() => onClickBtn(item._id)}
                              >
                                <div className="onlneexamstudenInfoPopup">
                                  {" "}
                                  &#8505;
                                </div>
                              </button>
                              {item._id === show && (
                                <div
                                  ref={dropdownRef}
                                  className={`popup removePopup terminatedPopuponline ${isActive ? "active" : "inactive"
                                    }`}
                                >
                                  <span
                                    className="closeModal closepopupbutton text-xxs gray"
                                    onClick={() => onClickBtn()}
                                  >
                                    X Close
                                  </span>
                                  {item.accessibilityMode ===
                                    "No Restrictions" ? (
                                    <div>
                                      <p className="w-500 text-xs purple">
                                        No Restrictions:
                                      </p>
                                      <p className="w-500 text-xs ">
                                        You are allowed to minimize your
                                        window freely during exams.
                                      </p>
                                    </div>
                                  ) : item.accessibilityMode ===
                                    "Moderate" ? (
                                    <div>
                                      <p className="w-500 text-xs purple">
                                        Moderate Restrictions:
                                      </p>
                                      <p className="w-500 text-xs ">
                                        You are allowed to minimize/switch the
                                        tab up to 5 times post which exam will
                                        be terminated. Your teacher will be
                                        alerted each time you minimize/switch.
                                      </p>
                                    </div>
                                  ) : (
                                    item.accessibilityMode === "Strict" && (
                                      <div>
                                        <p className="w-500 text-xs purple">
                                          Strict Restrictions:
                                        </p>
                                        <p className="w-500 text-xs">
                                          Your exam will be Terminated if you
                                          attempt to switch/minimize the
                                          window.
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          </li>
                          <li
                            className="col col-2"
                            data-head="Obtained Marks"
                          >
                            {item.submittedInfo &&
                              item.submittedInfo.isTestChecked &&
                              !item.isQuestionSubjective &&
                              item.submittedInfo.marksObtained &&
                              item.submittedInfo.marksObtained < 8999
                              ? item.submittedInfo.marksObtained
                              : item.submittedInfo &&
                                item.submittedInfo.isTestChecked &&
                                item.submittedInfo.isFinalCheck &&
                                item.isQuestionSubjective &&
                                item.submittedInfo.marksObtained &&
                                item.submittedInfo.marksObtained < 8999
                                ? item.submittedInfo.marksObtained
                                : "0"}

                            {/* {item.submittedInfo &&
                              item.submittedInfo.marksObtained < 8999
                              ? item.submittedInfo.marksObtained
                              : "--"} */}
                          </li>
                          <li className="col col-2" data-head="Starts on">
                            <p className="w-500">
                              {moment(item.quizon).format("Do MMM YYYY")}
                            </p>
                            <p> {moment(item.quizon).format("h:mm a")}</p>
                          </li>
                          <li className="col col-2 actionCols">
                            <div className="actionBtn">
                              {item.isCancelled ? (
                                <button
                                  disabled="disabled"
                                  className="btn-square"
                                  title="Cancelled"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-cancel"></i>
                                  </span>
                                </button>
                              ) : moment(item.quizon).format() >
                                moment(new Date()).format() &&
                                !item.isCancelled ? (
                                <button
                                  className="btn-square"
                                  disabled="disabled"
                                  title="Schedule"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-time"></i>
                                  </span>
                                </button>
                              ) : moment(item.quizon)
                                .add(item.estimatedtime, "m")
                                .format() < moment(new Date()).format() &&
                                !item.submittedInfo &&
                                !item.isCancelled ? (
                                <button
                                  className="btn-square"
                                  disabled="disabled"
                                  title="Missed"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-alert"></i>
                                  </span>
                                </button>
                              ) : (moment(item.quizon)
                                .add(item.estimatedtime, "m")
                                .format() < moment(new Date()).format() &&
                                item.submittedInfo &&
                                item.submittedInfo.isTestChecked &&
                                item.submittedInfo.isFinalCheck &&
                                item.isQuestionSubjective) ||
                                (item.submittedInfo &&
                                  item.submittedInfo.isSubmitted &&
                                  item.submittedInfo.isTestChecked &&
                                  item.submittedInfo.isFinalCheck &&
                                  item.isQuestionSubjective) ? (
                                <button
                                  type="button"
                                  className="btn-square"
                                  onClick={() =>
                                    handleResult(item._id, users._id)
                                  }
                                  disabled={
                                    moment(item.quizon)
                                      .add(item.estimatedtime, "m")
                                      .format() >
                                    moment(new Date()).format() && true
                                  }
                                  title="View Result"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-eye"></i>
                                  </span>
                                </button>
                              ) : (moment(item.quizon)
                                .add(item.estimatedtime, "m")
                                .format() < moment(new Date()).format() &&
                                item.submittedInfo &&
                                item.submittedInfo.isTestChecked &&
                                !item.isQuestionSubjective) ||
                                (item.submittedInfo &&
                                  item.submittedInfo.isSubmitted &&
                                  item.submittedInfo.isTestChecked &&
                                  !item.isQuestionSubjective) ? (
                                <button
                                  type="button"
                                  className="btn-square"
                                  onClick={() =>
                                    handleResult(item._id, users._id)
                                  }
                                  disabled={
                                    moment(item.quizon)
                                      .add(item.estimatedtime, "m")
                                      .format() >
                                    moment(new Date()).format() && true
                                  }
                                  title="View Result"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-eye"></i>
                                  </span>
                                </button>
                              ) : // : item.submittedInfo && item.submittedInfo.isSubmitted && item.submittedInfo.isTestChecked ? (
                                //   <AppLink
                                //     className="button btn-o-purple purple btn-xs"
                                //     to={`/dashboard/student/${item._id}/view-result/${users._id}`}
                                //   >
                                //     View Result
                                //   </AppLink>
                                // )
                                !item.submittedInfo &&
                                  moment(item.quizon)
                                    .add(item.estimatedtime, "m")
                                    .format() > moment(new Date()).format() ? (
                                  <button
                                    className="btn-square"
                                    onClick={() => handleStartNow(item._id)}
                                    title="Start Now"
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-next"></i>
                                    </span >
                                  </button >
                                ) : !item.submittedInfo &&
                                  moment(item.quizon).format() ===
                                  moment(new Date()).format() ? (
                                  <button
                                    className="btn-square"
                                    onClick={() => handleStartNow(item._id)}
                                    title="Start Now"
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-eye"></i>
                                    </span>
                                  </button>
                                ) : moment(item.quizon)
                                  .add(item.estimatedtime, "m")
                                  .format() < moment(new Date()).format() &&
                                  item.isStarted &&
                                  item.submittedInfo &&
                                  !item.isTestChecked &&
                                  !item.submittedInfo.isSubmitted ? (
                                  <div>
                                    <button
                                      className="btn-square"
                                      disabled="disabled"
                                      title="Submitted"
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-check"></i>
                                      </span>
                                    </button>
                                    <p className="w-500">
                                      {moment(
                                        item.submittedInfo &&
                                        item.submittedInfo.submittedOn
                                      ).format("Do MMM YYYY")}
                                    </p>
                                    <p>
                                      {" "}
                                      {moment(
                                        item.submittedInfo &&
                                        item.submittedInfo.submittedOn
                                      ).format("h:mm a")}
                                    </p>
                                  </div>
                                ) : item.submittedInfo &&
                                  item.submittedInfo.isSubmitted &&
                                  !item.isTestChecked ? (
                                  <div>
                                    <button
                                      className="btn-square"
                                      disabled="disabled"
                                      title="Submited"
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-check"></i>
                                      </span>
                                    </button>
                                    <p className="w-500 text-center mt-3">
                                      {moment(
                                        item.submittedInfo &&
                                        item.submittedInfo.submittedOn
                                      ).format("Do MMM YYYY h:mm a")}
                                    </p>
                                    {/*<p>
                                      
                                      {moment(
                                        item.submittedInfo &&
                                          item.submittedInfo.submittedOn
                                      ).format("")}
                                      </p> */}
                                  </div>
                                ) : item.submittedInfo &&
                                  item.isStarted &&
                                  !item.submittedInfo.isSubmitted &&
                                  moment(item.quizon)
                                    .add(item.estimatedtime, "m")
                                    .format() > moment(new Date()).format() ? (
                                  <div>
                                    <button
                                      className="btn-square"
                                      title="Resume"
                                      onClick={() => handleResume(item._id)}
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-Resume"></i>
                                      </span>
                                    </button>
                                    <div className="mt-5 red">Paused</div>
                                  </div>
                                ) : (
                                  ""
                                )
                              }
                            </div>
                          </li >

                          {
                            item._id === show2 && (
                              <div
                                ref={dropdownRef2}
                                className={`popup removePopup ${isActive2 ? "active" : "inactive"
                                  }`}
                              >
                                <span
                                  className="closeModal text-xxs gray"
                                  onClick={() => onClickBtn2()}
                                >
                                  X Close
                                </span>
                                <div>
                                  <p className="w-500 text-xs ">
                                    {item.submittedInfo &&
                                      item.submittedInfo.isRequestAccepted
                                      ? "Grace Time Allowed."
                                      : "Grace Time Rejected."}
                                  </p>
                                  <p className="mt-5 secondary">
                                    {item.submittedInfo &&
                                      item.submittedInfo.isRequestAccepted
                                      ? `${item.submittedInfo.extendedTime} Mins. extended`
                                      : `Sorry, your grace time request is rejected - ${item.submittedInfo &&
                                      item.submittedInfo.rejectDiscription
                                      }`}
                                  </p>
                                  <p className="w-500 text-xs">
                                    Request Message
                                  </p>
                                  <p className="w-500 text-xs">
                                    {item.submittedInfo &&
                                      item.submittedInfo.graceDiscription}
                                  </p>
                                </div>
                              </div>
                            )
                          }
                        </ul >

                        {
                          item._id === onlineShow && ToggleSectionTitle && (
                            <ul className="topInfo">
                              <li className="col col-3">
                                <div>
                                  <p className="w-500 purple">
                                    Allowed grace Time
                                  </p>
                                  <p className="gray">
                                    {item.graceTime ? "Yes" : "No"}
                                  </p>
                                  {item.submittedInfo &&
                                    item.submittedInfo.isRequestAccepted ? (
                                    <div>
                                      <p className="mt-5 purple">Allowed</p>
                                      <button
                                        type="button"
                                        className="closeModal text-xxs gray"
                                        style={{
                                          border: "none",
                                          color: "purple",
                                        }}
                                        onClick={() => onClickBtn2(item._id)}
                                      >
                                        @
                                      </button>
                                    </div>
                                  ) : (
                                    item.submittedInfo &&
                                    item.submittedInfo.isRequestRejected && (
                                      <div>
                                        <p className="mt-5 red">Rejected</p>
                                        <button
                                          type="button"
                                          className="closeModal text-xxs gray"
                                          style={{
                                            border: "none",
                                            color: "purple",
                                          }}
                                          onClick={() => onClickBtn2(item._id)}
                                        >
                                          @
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </li>
                              <li className="col col-3">
                                <div>
                                  <p className="w-500 purple">Conducted By</p>
                                  <p className="gray">{item.createdBy}</p>
                                </div>
                              </li>
                              <li className="col col-3">
                                <div>
                                  <p className="w-500 purple">Checked By</p>
                                  {(item.submittedInfo &&
                                    item.submittedInfo.isTestChecked &&
                                    !item.isQuestionSubjective) ||
                                    (item.submittedInfo &&
                                      item.submittedInfo.isSubmitted &&
                                      item.submittedInfo.isTestChecked &&
                                      !item.isQuestionSubjective) ? (
                                    <div>
                                      <p>Auto Checked</p>
                                      {moment(item.updatedAt).format(
                                        "Do MMM YYYY, h:mm a"
                                      )}
                                    </div>
                                  ) : (item.submittedInfo &&
                                    item.submittedInfo.isTestChecked &&
                                    item.submittedInfo.isFinalCheck &&
                                    item.isQuestionSubjective) ||
                                    (item.submittedInfo &&
                                      item.submittedInfo.isSubmitted &&
                                      item.submittedInfo.isTestChecked &&
                                      item.submittedInfo.isFinalCheck &&
                                      item.isQuestionSubjective) ? (
                                    <div>
                                      <p>{item.checkedBy}</p>
                                      {moment(item.updatedAt).format(
                                        "Do MMM YYYY, h:mm a"
                                      )}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </li>
                            </ul>
                          )
                        }
                      </div>
                    </React.Fragment >
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
      </React.Fragment>
    </React.Fragment>
  );
}
