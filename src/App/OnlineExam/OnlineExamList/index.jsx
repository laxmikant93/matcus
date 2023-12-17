import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import AppLink from "../../../Common/AppLink";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import refresh from "../TeacherSubmissionList/icon-refresh.svg";
import "./onlineExamList.scss";

import {
  getOnlineExamList,
  deleteOnlineExam,
  notifyOnlineExam,
  searchTeacherList,
  getDataByCoursesClassroomsForExamList,
  cancelOnlineExam,
  filterOnlineCreatedBy,
} from "../../../store/actions/onlineexam";
import moment from "moment";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import CourseClassCheckboxFilter from "../../../Common/CourseClassCheckboxFilter";
import FormTextArea from "../../../Common/Form/FormTextArea";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import MultipleSelectDropDownCommon from "../../../Common/Form/MultiSelectDropDownCommon";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../store/actions/MultiSelectDropDown";
import { assignmentCreatedBy } from "../../../store/actions/assignment";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import SearchControl from "../../../Common/SearchControl";

const OnlineExamList = (props) => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);
  const history = useNavigate();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef1, false);
  const [isActiveNotify, setIsActiveNotify] = useDetectOutsideClick(
    dropdownRef2,
    false
  );
  const [isActiveCancel, setIsActiveCancel] = useDetectOutsideClick(
    dropdownRef3,
    false
  );
  const [onlineTestDeleteId, setOnlineTestDeleteId] = useState("");
  const [onlineTestNotifyId, setOnlineTestNotifyId] = useState("");
  const [onlineTestCancelId, setOnlineTestCancelId] = useState("");

  const {
    onlineExamReadList,
    onlineExamList,
    users,
    assignmentCreatedByListSuccess,
    assignmentCreatedByList,
  } = useSelector((state) => {
    return {
      assignmentCreatedByListSuccess:
        state.assignment.assignedAssignment.success,
      assignmentCreatedByList: state.assignment.assignedAssignment.data,
      onlineExamTeacherListSuccess: state.onlineexam.onlineCreated.success,
      onlineExamTeacherFilter: state.onlineexam.onlineCreated.data,
      onlineExamReadList: state.onlineexam.list.data,
      onlineExamList: state.onlineexam.list,
      users: state.user,
    };
  });

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        searchTeacherList(users._id, users.user_institute, "search", searchTerm)
      );
    } else {
      dispatch(getOnlineExamList(users._id, users.user_institute));
    }
  }, [dispatch, users, searchTerm]);

  useEffect(() => {
    dispatch(getOnlineExamList(users._id, users.user_institute));
    // dispatch(onlineCreatedBy(users._id, users.user_institute));
    dispatch(assignmentCreatedBy(users._id, users.user_institute));
  }, [dispatch, users]);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setOnlineTestDeleteId(_id);
    setIsActive(isActive);
  };

  const onClickBtnDropDownCancel = (_id, isActiveCancel) => {
    setTimeout(() => {
      setCancellFormData("");
      setError(false);
    }, 300);
    setOnlineTestCancelId(_id);
    setIsActiveCancel(isActiveCancel);
  };

  const onClickBtnDropDownNotify = (item, isActiveNotify) => {
    setOnlineTestNotifyId(item._id);
    setIsActiveNotify(isActiveNotify);
  };

  const selectGroup = [
    "Timings",
    "Recent to Old",
    "Old to Recent",
    "No. of Questions",
    "High to Low 1",
    "Low to High 1",
    "Marks",
    "High to Low 2",
    "Low to High 2",
    "Status",
    "View Submission",
    "Notified",
    "Saved",
    "Expired",
  ];

  const filterValues = ["Status", "Timings", "No. of Questions", "Marks"];
  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL":
        dispatch(getOnlineExamList(users._id, users.user_institute));
        break;
      case "View Submission":
        dispatch(
          searchTeacherList(
            users._id,
            users.user_institute,
            "status",
            "viewSubmissions"
          )
        );
        break;
      case "Notified":
        dispatch(
          searchTeacherList(
            users._id,
            users.user_institute,
            "status",
            "Notified"
          )
        );
        break;
      case "Expired":
        dispatch(
          searchTeacherList(
            users._id,
            users.user_institute,
            "status",
            "expired"
          )
        );
        break;
      case "Saved":
        dispatch(
          searchTeacherList(
            users._id,
            users.user_institute,
            "status",
            "notNotify"
          )
        );
        break;
      case "Recent to Old":
        dispatch(
          searchTeacherList(users._id, users.user_institute, "quizon", "rto")
        );
        break;
      case "Old to Recent":
        dispatch(
          searchTeacherList(users._id, users.user_institute, "quizon", "otr")
        );
        break;
      case "High to Low 1":
        dispatch(
          searchTeacherList(users._id, users.user_institute, "question", "htl")
        );
        break;
      case "Low to High 1":
        dispatch(
          searchTeacherList(users._id, users.user_institute, "question", "lth")
        );
        break;
      case "High to Low 2":
        dispatch(
          searchTeacherList(
            users._id,
            users.user_institute,
            "totalmarks",
            "htl"
          )
        );
        break;
      case "Low to High 2":
        dispatch(
          searchTeacherList(
            users._id,
            users.user_institute,
            "totalmarks",
            "lth"
          )
        );
        break;
      default:
        dispatch(getOnlineExamList(users._id, users.user_institute));
    }
  };

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
  const getFilterList = (selectedData) => {
    if (
      selectedData.classRoomList.length === 0 &&
      selectedData.courseList.length === 0
    ) {
      dispatch(getOnlineExamList(users._id, users.user_institute));
    } else if (selectedData.length === 0) {
      dispatch(getOnlineExamList(users._id, users.user_institute));
    } else {
      dispatch(
        getDataByCoursesClassroomsForExamList(
          users._id,
          users.user_institute,
          selectedData.courseList,
          selectedData.classRoomList
        )
      );
    }
  };
  const deleteOnlineTest = (_id) => {
    dispatch(deleteOnlineExam(_id));
  };
  const notifyOnlineTest = (item) => {
    dispatch(notifyOnlineExam(item._id, notifyData(item)));
    setIsActiveNotify(false);
  };
  const notifyData = (item) => {
    return {
      institute: users.user_institute,
      title: item.title,
      course: item.course,
      classroom: item.classroom,
      quizon: item.quizon,
      estimatedtime: item.estimatedtime,
      owner: users._id,
    };
  };
  const cancelData = (item) => {
    return {
      institute: users.user_institute,
      title: item.title,
      course: item.course,
      classroom: item.classroom,
      quizon: item.quizon,
      estimatedtime: item.estimatedtime,
      owner: users._id,
      cancelledReason: cancellFormData,
    };
  };
  const [error, setError] = useState(false);
  const [cancelFormError, setCancelFormError] = useState(false);
  const [cancellFormData, setCancellFormData] = useState("");

  const handleInput = (e) => {
    let inputValue = e.target.value;
    setCancellFormData(inputValue);
    setCancelFormError(ValidationFile.isEmpty(inputValue));
  };

  const CancelOnlineTest = (item) => {
    setError(true);
    setCancelFormError(true);
    if (ValidationFile.isEmpty(cancellFormData)) {
      setCancelFormError(true);
    }
    if (!ValidationFile.isEmpty(cancellFormData)) {
      dispatch(cancelOnlineExam(item._id, cancelData(item)));
      setIsActiveCancel(false);
    }
  };

  // Expand
  const [onlineShow, setOnlineShow] = useState("");
  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false);

  const handleClick = (_id) => {
    setOnlineShow(_id);
    SetToggleSectionTitle(!ToggleSectionTitle);
  };

  // Refresh
  const handleReload = () => {
    dispatch(getOnlineExamList(users._id, users.user_institute));
  };

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);
  const ToggleValue = "Online Test";

  if (assignmentCreatedByListSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < assignmentCreatedByList.length; i++) {
      value.push(assignmentCreatedByList[i]._id);
    }
    value.push("All");
    if (ToggleValue === "Online Test") {
      dispatch(AllEntrySelected(value));
      dispatch(AllEntrySelectedSwitch(value));
    }
  }

  //  Created by
  const OnSelectedValueCreatedBy = (val) => {
    dispatch(filterOnlineCreatedBy(users._id, users.user_institute, val));
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/teacher-online-test"
          title="Online Test"
        />
      </Breadcrumb>
      <div className="PageTopHead PTH-CreateOnlineExamList-1 mt-20">
        <div className="PTH-Item">
          <p className="text-sm w-300">
            <span className="secondary">
              {onlineExamList.success ? onlineExamReadList.length : ""}&nbsp;
            </span>
            {onlineExamList.success && onlineExamReadList.length > 1
              ? "Online Tests"
              : "Online Test"}
          </p>
        </div>
        <div className="PTH-Item P-Right">
          <AppLink
            className="button button-secondary btn-oval btn-sm button-block"
            to={{
              pathname: `/dashboard/teacher-create-test`,
              state: { create: "create" },
            }}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i> Create Online
            Test
          </AppLink>
        </div>
      </div>
      <div className="PageTopHead PTH-CreateOnlineExamList-2 mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>
        <div className="PTH-Item">
          <CourseClassCheckboxFilter
            onSelect={(selectedData) => getFilterList(selectedData)}
          />
        </div>
        <div className="PTH-Item">
          {
            <MultipleSelectDropDownCommon
              selectGroup={
                assignmentCreatedByList ? assignmentCreatedByList : []
              }
              OnSelectedValue={OnSelectedValueCreatedBy}
              name={"Created By"}
              SwitchSelectData={false}
            />
          }
        </div>
        <div className="PTH-Item">
          <button onClick={handleReload} className="refreshBtn" title="Refresh">
            <img src={refresh} alt="" width="18px" />
          </button>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            onChange={handleChange}
            onKeyUp={handleChange}
            id="search"
            name="search"
            placeholder="Search online test"
          />
        </div>
      </div>

      <div className="gridListTable TeacherExamList">
        <ul className="gridHeader">
          <li className="col col-3">Title</li>
          <li className="col col-3">Questions & Marks</li>
          <li className="col col-2">Accessibility</li>
          <li className="col col-2">Timings</li>
          <li className="col col-2">&nbsp;</li>
        </ul>

        <div className="gridBody">
          {onlineExamList.success ? (
            onlineExamReadList.length ? (
              onlineExamReadList.map((item) => {
                return (
                  <React.Fragment>
                    <div className="gridRow" key={item._id}>
                      <ul className="topInfo">
                        <li className="col col-3" data-head="Title">
                          <div className="Details">
                            <div className="text-xs primary w-600">
                              {item.title}
                            </div>
                            <div className="mt-3">
                              {!item.courseInfo
                                ? ""
                                : item.courseInfo.coursename}
                            </div>
                            <div className="mt-2">
                              {!item.classroomInfo
                                ? ""
                                : item.classroomInfo.classroomname}
                            </div>
                            <button
                              className={`btnText BtnCaret   text-xxs w-300 
                              ${ToggleSectionTitle && item._id === onlineShow
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
                          className="col col-3"
                          data-head="Question & Marks"
                        >
                          <p>
                            {" "}
                            {item.question && item.question.length}{" "}
                            {item.question && item.question.length > 1
                              ? "Questions"
                              : "Question"}
                          </p>
                          <p>
                            {" "}
                            {item.totalmarks}{" "}
                            {item.totalmarks > 1 ? "Marks" : "Mark"}{" "}
                          </p>
                        </li>
                        <li className="col col-2" data-head="Accessibility">
                          <p>{item.accessibilityMode}</p>
                        </li>
                        <li className="col col-2" data-head="Timings">
                          {" "}
                          <p className="w-500">
                            {moment(item.quizon).format("Do MMM YYYY")}{" "}
                            <span className="secondary">
                              {item.estimatedtime} Min
                            </span>
                          </p>
                          <p className="w-500">
                            {moment(item.quizon).format("h:mm a")} -{" "}
                            {moment(item.quizon)
                              .add(item.estimatedtime, "m")
                              .format("h:mm a")}
                          </p>
                        </li>

                        <li className="col col-3 actionCols">
                          {/*<div className="actionBtnCustom">*/}
                          <div className="actionBtn ">
                            {item.isNotified &&
                              moment(item.quizon)
                                .add(item.estimatedtime, "m")
                                .format() < moment(new Date()).format() ? (
                              <AppLink
                                className="btn-square"
                                title="View Submissions"
                                to={{
                                  pathname: `/dashboard/teacher/online-exam/submission/${item._id}`,
                                  state: { submission: "submission" },
                                }}
                              >
                                <span className="cssIcon">
                                  <i className="ed-eye"></i>
                                </span>
                              </AppLink>
                            ) : (
                              (moment(item.quizon)
                                .add(item.estimatedtime, "m")
                                .format() < moment(new Date()).format() ||
                                moment(item.quizon).format() >
                                moment(new Date()).format() ||
                                (moment(item.quizon).format() <
                                  moment(new Date()).format() &&
                                  moment(item.quizon)
                                    .add(item.estimatedtime, "m")
                                    .format() > moment(new Date()).format() &&
                                  item.isExpired)) && (
                                <div className="maineonlinegroupbtn">
                                  <div className="groupBtn onlineGroupbtncutome">
                                    {item.isNotified ? (
                                      <button
                                        className="btn-square"
                                        title="Notify"
                                      >
                                        <span className="cssIcon">
                                          <i className="ed-notify"></i>
                                        </span>
                                      </button>
                                    ) : moment(item.quizon)
                                      .subtract("5", "m")
                                      .format() <
                                      moment(new Date()).format() ? (
                                      <button
                                        className="btn-square"
                                        title="Expired"
                                      >
                                        <span className="cssIcon">
                                          <i className="ed-alert"></i>
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          onClickBtnDropDownNotify(item, true)
                                        }
                                        disabled={
                                          item.question.length > 0
                                            ? false
                                            : true
                                        }
                                        className="btn-square"
                                        title="Notify"
                                      >
                                        <span className="cssIcon">
                                          <i className="ed-notify"></i>
                                        </span>
                                      </button>
                                    )}
                                    <button
                                      className="btn-square"
                                      title="Edit"
                                      onClick={() => {
                                        history(
                                          `/dashboard/teacher-edit-test/${item._id}`,
                                          { edit: "edit" }
                                        );
                                      }}
                                      disabled={
                                        item.isNotified &&
                                        moment(item.quizon)
                                          .subtract("10", "m")
                                          .format() <
                                        moment(new Date()).format() &&
                                        true
                                      }
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-pen"></i>
                                      </span>
                                    </button>
                                    {item.isNotified ? (
                                      <button
                                        className="btn-square"
                                        title="Cancel"
                                        onClick={() =>
                                          onClickBtnDropDownCancel(
                                            item._id,
                                            true
                                          )
                                        }
                                      >
                                        <span className="cssIcon">
                                          <i className="ed-cancel"></i>
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        className="btn-square"
                                        title="Delete"
                                        onClick={() =>
                                          onClickBtnDropDownRemove(
                                            item._id,
                                            true
                                          )
                                        }
                                      >
                                        <span className="cssIcon">
                                          <i className="ed-trash"></i>
                                        </span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                            {moment(item.quizon)
                              .add(item.estimatedtime, "m")
                              .format() < moment(new Date()).format() &&
                              !(
                                moment(item.quizon).format() ===
                                moment(new Date()).format()
                              ) ? (
                              <button
                                className="btn-square"
                                title="Clone & Edit"
                                onClick={() => {
                                  history(
                                    `/dashboard/teacher-edit-test/${item._id}`,
                                    { clone: "clone" }
                                  );
                                }}
                              >
                                <span className="cssIcon">
                                  <i className="ed-editclone"></i>
                                </span>
                              </button>
                            ) : moment(item.quizon).format() >
                              moment(new Date()).format() ? (
                              <button
                                className="btn-square"
                                title="Clone & Edit"
                                onClick={() => {
                                  history(
                                    `/dashboard/teacher-edit-test/${item._id}`,
                                    { clone: "clone" }
                                  );
                                }}
                              >
                                <span className="cssIcon">
                                  <i className="ed-editclone"></i>
                                </span>
                              </button>
                            ) : moment(item.quizon).format() ===
                              moment(new Date()).format() &&
                              item.isExpired ? (
                              <button
                                className="btn-square"
                                title="Clone & Edit"
                                onClick={() => {
                                  history(
                                    `/dashboard/teacher-edit-test/${item._id}`,
                                    { clone: "clone" }
                                  );
                                }}
                              >
                                <span className="cssIcon">
                                  <i className="ed-editclone"></i>
                                </span>
                              </button>
                            ) : (
                              moment(item.quizon).format() <
                              moment(new Date()).format() &&
                              moment(item.quizon)
                                .add(item.estimatedtime, "m")
                                .format() > moment(new Date()).format() &&
                              item.isExpired && (
                                <button
                                  className="btn-square"
                                  title="Clone & Edit"
                                  onClick={() => {
                                    history(
                                      `/dashboard/teacher-edit-test/${item._id}`,
                                      { clone: "clone" }
                                    );
                                  }}
                                >
                                  <span className="cssIcon">
                                    <i className="ed-editclone"></i>
                                  </span>
                                </button>
                              )
                            )}
                            {moment(item.quizon).format() ===
                              moment(new Date()).format() &&
                              !item.isExpired ? (
                              <div>
                                <button
                                  className="btn-square"
                                  disabled="true"
                                  title="Ongoing"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-setting"></i>
                                  </span>
                                </button>
                                <AppLink
                                  className="btn-square"
                                  to={{
                                    pathname: `/dashboard/teacher/online-exam/submission/${item._id}`,
                                    state: { teacherView: "teacherView" },
                                  }}
                                  title="View Attendees"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-eye"></i>
                                  </span>
                                </AppLink>
                              </div>
                            ) : (
                              moment(item.quizon).format() <
                              moment(new Date()).format() &&
                              moment(item.quizon)
                                .add(item.estimatedtime, "m")
                                .format() > moment(new Date()).format() &&
                              !item.isExpired && (
                                <div>
                                  <button
                                    className="btn-square"
                                    disabled="true"
                                    title="Ongoing"
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-setting"></i>
                                    </span>
                                  </button>
                                  <AppLink
                                    className="btn-square"
                                    to={{
                                      pathname: `/dashboard/teacher/online-exam/submission/${item._id}`,
                                      state: { attendees: "attendees" },
                                    }}
                                    title=" View Attendees"
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-eye"></i>
                                    </span>
                                  </AppLink>
                                </div>
                              )
                            )}

                            {item._id === onlineTestDeleteId && (
                              <div
                                ref={dropdownRef1}
                                className={`popup removePopup ${isActive ? "active" : "inactive"
                                  }`}
                              >
                                <p className="heading text-xxs">
                                  You are about to remove this online test.
                                </p>
                                <p className="sub-heading red text-xxs w-500">
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
                                      deleteOnlineTest(item._id);
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
                            {item._id === onlineTestNotifyId && (
                              <div
                                ref={dropdownRef2}
                                className={`popup removePopup ${isActiveNotify ? "active" : "inactive"
                                  }`}
                              >
                                <p className="heading text-xxs">
                                  All the students will be notified.
                                </p>
                                <p className="sub-heading secondary text-xxs w-500">
                                  Are you sure?
                                </p>
                                <div className="removePopBtn">
                                  <button
                                    className="button btn-o-silver dgray btn-sm"
                                    onClick={() =>
                                      onClickBtnDropDownNotify(
                                        item._id,
                                        false
                                      )
                                    }
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="button btn-o-silver dgray btn-sm"
                                    onClick={() => notifyOnlineTest(item)}
                                  >
                                    Yes, Notify
                                  </button>
                                </div>
                              </div>
                            )}
                            {item._id === onlineTestCancelId && (
                              <div
                                ref={dropdownRef3}
                                className={`cancelExamPopup popup removePopup ${isActiveCancel ? "active" : "inactive"
                                  }`}
                              >
                                <p className="text-xxs">
                                  This test has been already notified to
                                  students. If you want to cancel it will be
                                  re-notify.
                                </p>
                                <p className="red text-xxs w-500">
                                  Are you sure?
                                </p>
                                <div className="formFieldwrap mt-5">
                                  <FormTextArea
                                    onChange={handleInput}
                                    onKeyUp={handleInput}
                                    value={cancellFormData}
                                  />
                                  <FormError
                                    show={error && cancelFormError}
                                    error="Reason cannot be empty."
                                  />
                                </div>
                                <div className="removePopBtn pt-0 mt-0">
                                  <button
                                    className="button btn-o-silver dgray btn-sm"
                                    onClick={() =>
                                      onClickBtnDropDownCancel(
                                        item._id,
                                        false
                                      )
                                    }
                                  >
                                    No
                                  </button>
                                  <button
                                    className="button button-red btn-sm"
                                    onClick={() => CancelOnlineTest(item)}
                                  >
                                    Yes, Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          {
                            <p className="red">
                              {item.reminderTest && item.isNotified && moment(new Date()).format() >= moment(item.quizon).subtract(item.reminderTest, "m").format()
                                ? `Re-Notified at ${moment(item.quizon).subtract(item.reminderTest, "m").format("DD-MM-YYYY hh:mm A")}`
                                : ""}
                            </p>
                          }
                        </li>
                      </ul>

                      {item._id === onlineShow && ToggleSectionTitle && (
                        <React.Fragment>
                          <ul className="topInfo">
                            <li className="col col-4">
                              <div>
                                <p className="w-500 secondary  text-xxs">
                                  Allowed Grace Minute
                                </p>
                                <h4 className="base text-xxs">
                                  {item.graceTime ? "Yes" : "No"}
                                </h4>
                              </div>
                            </li>

                            <li className="col col-4">
                              <div>
                                <p className="w-500 secondary text-xxs">
                                  No. Of Students
                                </p>
                                <h4 className="base text-xxs">
                                  {item.noOfStudent}
                                </h4>
                              </div>
                            </li>
                            <li className="col col-4">
                              <div>
                                <p className="w-500  secondary text-xxs">
                                  Assigned By
                                </p>
                                <p className="gray">
                                  {item.assignBy ? item.assignBy : "-"}
                                </p>
                              </div>
                            </li>
                          </ul>
                          <ul className="topInfo">
                            {/*<div>
                                  <p className="w-500 text-xxs">
                                    Allowed Resume Test
                                  </p>
                                  <h4 className="base text-xxs">
                                    {item.resumeTest ? "Yes" : "No"}
                                  </h4>
                                </div>*/}

                            <li className="col col-4">
                              <div>
                                <p className="w-500 secondary text-xxs">
                                  Created By
                                </p>
                                <h4 className="base text-xxs">
                                  {item.createdBy}
                                </h4>
                                <p className="text-xxs">
                                  {moment(item.createdAt).format(
                                    "Do MMM YYYY h:mm a"
                                  )}
                                </p>
                              </div>
                            </li>
                            <li className="col col-4">
                              <div>
                                <p className="w-400 secondary text-xxs">
                                  Last Edited By
                                </p>
                                <h4 className="base w-600 text-xxs">
                                  {!item.updatedBy
                                    ? item.createdBy
                                    : item.updatedBy}
                                </h4>
                                <p className="gray text-xxs">
                                  {moment(item.updatedAt).format(
                                    "Do MMM YYYY h:mm a"
                                  )}
                                </p>
                              </div>
                            </li>
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
    </React.Fragment>
  );
};

export default OnlineExamList;
