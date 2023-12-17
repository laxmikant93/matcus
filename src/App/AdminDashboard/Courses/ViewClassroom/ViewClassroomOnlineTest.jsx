/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import MultiSelectDropDownCommon from "../../../../Common/Form/MultiSelectDropDownCommon";
import FilterSearch from "./FilterSearch";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
import {
  getClassroomViewList,
  SortOnlineTest,
  OnlineTestAssignToUpdate,
  MultiSelectOnlineTestFilter,
  getAssignmentTeacherClassroom,
  notifyAdminExam,
  deleteAdminExam,
  cancelAdminExam,
} from "../../../../store/actions/classroomdetail";
import { useParams } from "react-router-dom";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../../store/actions/MultiSelectDropDown";
import moment from "moment";
import FormError from "../../../../Common/Form/FormError";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import AppLink from "../../../../Common/AppLink";
import { useNavigate } from "react-router";
// New
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import ValidationFile from "../../../../Classes/ValidationFile";
import refresh from "./icon-refresh.svg";
import NoDataAvailable from "../../../../Common/NoDataAvailable";

const ViewClassroomOnlineTest = () => {
  const { classroomId } = useParams();
  const dispatch = useDispatch();
  const ToggleValue = "Online Test";
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });

  const [RemovePop, setRemovePop] = useState(false);
  const [multipleDropDownUserData, setMultipleDropDownUserData] = useState([]);
  const {
    users,
    ViewClassroomList,
    ViewClassroomListSuccess,
    TeacherListData,
    TeacherListDataSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      ViewClassroomList: state.classroomDetail.OnlineTestlist.data,
      ViewClassroomListSuccess: state.classroomDetail.OnlineTestlist.success,
      ViewClassroomListLoading: state.classroomDetail.OnlineTestlist.loading,
      TeacherListData: state.classroomDetail.TeacherDataList.data,
      TeacherListDataSuccess: state.classroomDetail.TeacherDataList.success,
      ViewClassroomDeleteLoading: state.classroomDetail.delete.loading,
      ViewClassroomDeleteSuccess: state.classroomDetail.delete.success,
    };
  });

  useEffect(() => {
    dispatch(
      getClassroomViewList(users.user_institute, classroomId, ToggleValue)
    );
    dispatch(getAssignmentTeacherClassroom(users.user_institute, classroomId));
  }, [classroomId, dispatch, users._id, users.user_institute]);

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

  const SingleSelectHandel = (item) => {
    let message = item;
    switch (message) {
      case "All":
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, ToggleValue)
        );

        break;
      case "View Submission":
        dispatch(
          SortOnlineTest(
            users.user_institute,
            classroomId,
            "status",
            "viewSubmissions"
          )
        );
        break;
      case "Notified":
        dispatch(
          SortOnlineTest(
            users.user_institute,
            classroomId,
            "status",
            "Notified"
          )
        );
        break;
      case "Expired":
        dispatch(
          SortOnlineTest(users.user_institute, classroomId, "status", "expired")
        );
        break;
      case "Saved":
        dispatch(
          SortOnlineTest(
            users.user_institute,
            classroomId,
            "status",
            "notNotify"
          )
        );
        break;
      case "Recent to Old":
        dispatch(
          SortOnlineTest(users.user_institute, classroomId, "quizon", "rto")
        );
        break;
      case "Old to Recent":
        dispatch(
          SortOnlineTest(users.user_institute, classroomId, "quizon", "otr")
        );
        break;
      case "High to Low 1":
        dispatch(
          SortOnlineTest(users.user_institute, classroomId, "question", "htl")
        );
        break;
      case "Low to High 1":
        dispatch(
          SortOnlineTest(users.user_institute, classroomId, "question", "lth")
        );
        break;
      case "High to Low 2":
        dispatch(
          SortOnlineTest(users.user_institute, classroomId, "totalmarks", "htl")
        );
        break;
      case "Low to High 2":
        dispatch(
          SortOnlineTest(users.user_institute, classroomId, "totalmarks", "lth")
        );
        break;
      default:
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, ToggleValue)
        );
    }
  };

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  if (ViewClassroomListSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < TeacherListData.length; i++) {
      value.push(TeacherListData[i].user._id);
    }
    value.push("All");
    if (ToggleValue === "Online Test") {
      dispatch(AllEntrySelected(value));
      dispatch(AllEntrySelectedSwitch(value));
    }
  }

  const OnSelectedValueAssigntTo = (val) => {
    dispatch(
      MultiSelectOnlineTestFilter(
        users.user_institute,
        classroomId,
        "assignToId",
        val
      )
    );
  };

  const OnSelectedValueCreatedBy = (val) => {
    dispatch(
      MultiSelectOnlineTestFilter(
        users.user_institute,
        classroomId,
        "createdById",
        val
      )
    );
  };

  const handelAssignToUpdate = (e, _id) => {
    let assignToId = e.target.value;
    dispatch(OnlineTestAssignToUpdate(_id._id, { assignToId }));
  };

  // New Code
  const history = useNavigate();
  const [error, setError] = useState(false);
  const [cancelFormError, setCancelFormError] = useState(false);
  const [cancellFormData, setCancellFormData] = useState("");

  const [onlineTestDeleteId, setOnlineTestDeleteId] = useState("");
  const [onlineTestNotifyId, setOnlineTestNotifyId] = useState("");
  const [onlineTestCancelId, setOnlineTestCancelId] = useState("");
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef1, false);
  const [isActiveNotify, setIsActiveNotify] = useDetectOutsideClick(
    dropdownRef2,
    false
  );
  const [isActiveCancel, setIsActiveCancel] = useDetectOutsideClick(
    dropdownRef3,
    false
  );

  const onClickBtnDropDownNotify = (item, isActiveNotify) => {
    setOnlineTestNotifyId(item._id);
    setIsActiveNotify(isActiveNotify);
  };
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
  const deleteOnlineTest = (_id) => {
    dispatch(deleteAdminExam(_id));
  };
  const notifyOnlineTest = (item) => {
    dispatch(notifyAdminExam(item._id, notifyData(item)));
    setIsActiveNotify(false);
  };

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
      dispatch(cancelAdminExam(item._id, cancelData(item)));
      setIsActiveCancel(false);
    }
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
  const [onlineShow, setOnlineShow] = useState("");
  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false);

  const handleClick = (_id) => {
    setOnlineShow(_id);
    SetToggleSectionTitle(!ToggleSectionTitle);
  };

  // Refresh
  const handleReload = () => {
    dispatch(
      getClassroomViewList(users.user_institute, classroomId, ToggleValue)
    );
  };

  useEffect(() => {
    if (TeacherListData && TeacherListData.length) {
      TeacherListData.map((item) => item.user && multipleDropDownUserData.push(item.user));
    }
  }, [TeacherListData, users._id])
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-ViewClassroomOnlineTest mt-20">
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
              selectGroup={multipleDropDownUserData}
              OnSelectedValue={OnSelectedValueAssigntTo}
              name={"Assign To"}
              SwitchSelectData={false}
            />
          }
        </div>
        <div className="PTH-Item">
          {
            <MultiSelectDropDownCommon
              selectGroup={multipleDropDownUserData}
              OnSelectedValue={OnSelectedValueCreatedBy}
              name={"Created By"}
              SwitchSelectData={false}
            />
          }
        </div>
        <div className="PTH-Item">
          <button onClick={handleReload} title="Refresh" className="refreshBtn">
            <img src={refresh} alt="" width="18px" />
          </button>
        </div>
        <div className="PTH-Item P-Right">
          <FilterSearch ToggleValue={ToggleValue} />
        </div>
        <div className="PTH-Item P-Right">
          <AppLink
            className="button button-primary btn-oval btn-sm button-block"
            to={{
              pathname: `/admin-create-test/${classroomId}`,
              state: { admin: "admin" },
            }}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i> Create Online
            Test
          </AppLink>
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-2">Title</li>
          <li className="col col-2">Assign To</li>
          <li className="col col-2">Questions & Marks</li>
          <li className="col col-2">Accessibility</li>
          <li className="col col-2">Timings</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {ViewClassroomListSuccess && ToggleValue === "Online Test" ? (
            ViewClassroomList.length > 0 ? (
              ViewClassroomList.map((item) => {
                return (
                  <React.Fragment>
                    <div className="gridRow" key={item._id}>
                      <ul className="topInfo">
                        <li className="col col-2" data-head="Title">
                          <div className="Details">
                            <div className="text-xs primary w-600">
                              {item.title}
                            </div>
                            <div className="mt-3">
                              {!item.courseInfo
                                ? ""
                                : item.courseInfo.coursename}
                            </div>
                            <div className="mt-3">
                              {!item.classroomInfo
                                ? ""
                                : item.classroomInfo.classroomname}
                            </div>
                            <button
                              className={`btnText BtnCaret  text-xxs w-300 ${ToggleSectionTitle && item._id === onlineShow
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
                        <li className="col col-2" data-head="Assign To">
                          <div className="selectTextType">
                            <select
                              onChange={(e) => handelAssignToUpdate(e, item)}
                            >
                              <option value={item.assignToId} hidden>
                                {item.assignTo}
                              </option>
                              {TeacherListDataSuccess ? (
                                TeacherListData.length > 0 ? (
                                  TeacherListData.map((item) => {
                                    return (
                                      <React.Fragment>
                                        <option
                                          key={item._id}
                                          value={item.user._id}
                                        >
                                          {item.user.fullname}
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
                        </li>
                        <li className="col col-2" data-head="Question & Marks">
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
                            <span className="primary">
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
                        <li className="col col-2 actionCols">
                          <div className="actionBtn">
                            {item.isNotified &&
                              moment(item.quizon)
                                .add(item.estimatedtime, "m")
                                .format() < moment(new Date()).format() ? (
                              <AppLink
                                className="btn-square"
                                title="View Submissions"
                                to={{
                                  pathname: `/admin/submission/${item._id}`,
                                  state: { admin: "admin" },
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
                                        title="Notified"
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
                                        className="btn-square"
                                        title="Notify"
                                        onClick={() =>
                                          onClickBtnDropDownNotify(item, true)
                                        }
                                        disabled={
                                          item.question.length > 0
                                            ? false
                                            : true
                                        }
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
                                          `/admin-edit-test/${item._id}/${classroomId}`,
                                          { adminEdit: "adminEdit" }
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
                                  history(`/admin-edit-test/${item._id}`, {
                                    adminClone: "adminClone",
                                  });
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
                                  history(`/admin-edit-test/${item._id}`, {
                                    adminClone: "adminClone",
                                  });
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
                                  history(`/admin-edit-test/${item._id}`, {
                                    adminClone: "adminClone",
                                  });
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
                                      `/admin-edit-test/${item._id}`,
                                      {
                                        adminClone: "adminClone",
                                      }
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
                              moment(new Date()).format() && !item.isExpired ? (
                              <div>
                                <button
                                  className="btn-square"
                                  title="Ongoing"
                                  disabled="true"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-setting"></i>
                                  </span>
                                </button>
                                <AppLink
                                  className="btn-square"
                                  title="View Attendees"
                                  to={{
                                    pathname: `/admin/submission/${item._id}`,
                                    state: { adminView: "adminView" },
                                  }}
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
                                    title="Ongoing"
                                    disabled="true"
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-setting"></i>
                                    </span>
                                  </button>
                                  <AppLink
                                    className="btn-square"
                                    title="View Attendees"
                                    to={{
                                      pathname: `/admin/submission/${item._id}`,
                                      state: { adminView: "adminView" },
                                    }}
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-eye"></i>
                                    </span>
                                  </AppLink>
                                </div>
                              )
                            )}
                          </div>
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
                                    onClickBtnDropDownRemove(item._id, false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="button button-red btn-sm"
                                  onClick={() => {
                                    deleteOnlineTest(item._id);
                                    onClickBtnDropDownRemove(item._id, false);
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
                              <p className="sub-heading primary text-xxs w-500">
                                Are you sure?
                              </p>
                              <div className="removePopBtn">
                                <button
                                  className="button btn-o-silver dgray btn-sm"
                                  onClick={() =>
                                    onClickBtnDropDownNotify(item._id, false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="button button-primary btn-sm"
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
                                This test has been already notified to students.
                                If you want to cancel it will be re-notify.
                              </p>
                              <p className="red text-xxs w-500">Are you sure?</p>
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
                                    onClickBtnDropDownCancel(item._id, false)
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
                          {
                            <p className="red">
                              {item.reminderTest && item.isNotified && moment(new Date()).format() <= moment(item.quizon).subtract(item.reminderTest, "m").format("DD-MM-YYYY hh:mm A")
                                ? `Re - Notified at ${moment(item.quizon).subtract(item.reminderTest, "m").format("DD-MM-YYYY hh:mm A")
                                }`
                                : ""}
                            </p>
                          }
                        </li>
                      </ul>
                      {item._id === onlineShow && ToggleSectionTitle && (
                        <ul className="topInfo">
                          <li className="col col-3">
                            <div>
                              <p className="w-500 primary text-xxs">
                                Allowed Grace Time
                              </p>
                              <p className="base text-xxs mt-3">
                                {item.graceTime ? "Yes" : "No"}
                              </p>
                            </div>
                            <div className="mt-5">
                              <p className="w-500 primary text-xxs">
                                Allowed Resume Time
                              </p>
                              <p className="base text-xxs mt-3">
                                {item.resumeTest ? "Yes" : "No"}
                              </p>
                            </div>
                          </li>
                          <li className="col col-3">
                            <div>
                              <p className="w-500 primary text-xxs">
                                No. of Students
                              </p>
                              <p className="base text-xxs mt-3">
                                {item.noOfStudent}
                              </p>
                            </div>
                            <div className="mt-5">
                              <p className="w-500 primary text-xxs">
                                Assigned By
                              </p>
                              <p className="base text-xxs mt-3">
                                {item.assignBy ? item.assignBy : "-"}
                              </p>
                            </div>
                          </li>
                          <li className="col col-3">
                            <p className="w-500 primary text-xxs">Created By</p>
                            <p className="base text-xxs mt-3">
                              {item.createdBy}
                            </p>
                            <p className="base text-xxs mt-3">
                              {moment(item.createdAt).format(
                                "Do MMM YYYY h:mm a"
                              )}
                            </p>
                          </li>
                          <li className="col col-3">
                            <p className="w-500 primary text-xxs">
                              Last Edited By
                            </p>
                            <p className="base text-xxs mt-3">
                              {!item.updatedBy
                                ? item.createdBy
                                : item.updatedBy}
                            </p>
                            <p className="base text-xxs mt-3">
                              {moment(item.examLastUpdate).format(
                                "Do MMM YYYY h:mm a"
                              )}
                            </p>
                          </li>
                        </ul>
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

export default ViewClassroomOnlineTest;
