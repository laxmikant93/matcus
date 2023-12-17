/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import AppLink from "../../Common/AppLink";
import SingleSelectDropdown from "../../Common/Form/SingleSelectDropdown";
// import MultipleGroupSelectDropdown from "../../Common/Form/MultipleGroupSelectDropdown";
// import { SearchIcon } from "../../Common/Icon";
import UseOutsideClick from "../../Common/UseOutsideClick";
// import ModalBody from "../../Common/Modal/ModalBody";
// import Modal from "../../Common/Modal";
// import ModalHeader from "../../Common/Modal/ModalHeader";
import Popup from "../../Common/Popup";
import BreadCrumbsHistory from "./breadCrumbs";
import InviteUser from "./inviteUser";
import SearchBar from "./searchBar";
import List from "./list";
import {
  getInvitationsHistoryList,
  deleteInvitationHistory,
  ResendInvitationHistory,
  ResetInvitationHistory,
  SortByInvitationHistory,
  MutlitdropDownInvitationHistory,
  MultiSelectStudentInvitationFilter,
} from "../../store/actions/invitationhistory";
import { AllEntrySelected } from "../../store/actions/MultiSelectDropDown";
import { getAllCoursesForStudentFilter } from "../../store/actions/studentlistuserinfo";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../Constant/constants";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../Common/UserElement";
import CourseClassCheckboxFilter from "../../Common/CourseClassCheckboxFilter";
import MultiSelectDropDownCommon from "../../Common/Form/MultiSelectDropDownCommon";
import "./InvitationHistory.scss";
import NoDataAvailable from "../../Common/NoDataAvailable";
const InvitationHistory = () => {
  const dispatch = useDispatch();
  const locationVal = window.location.href;

  const [RemovePop, setRemovePop] = useState(false);
  const [teacherHistory, setTeacherHistory] = useState(false);
  const [studentHistory, setStudentHistory] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const {
    users,
    invitationHistoryList,
    invitationHistoryListSuccess,
    invitationHistoryDeleteLoading,
    CourseListData,
    CourseListDataSuccess,
    // multiSelectDropdownData,
  } = useSelector((state) => {
    return {
      users: state.user,
      invitationHistoryList: state.invitationhistory.list.data,
      invitationHistoryListSuccess: state.invitationhistory.list.success,
      invitationHistoryDeleteLoading: state.invitationhistory.delete.loading,
      CourseListData: state.studentlistuserinfo.studentFilterCourses.data,
      CourseListDataSuccess:
        state.studentlistuserinfo.studentFilterCourses.success,
      // multiSelectDropdownData: state.multiselectdropdown.selectedData.data
    };
  });

  const selectGroup = [
    "Invited",
    "Recent to Old",
    "Old to Recent",
    "Invitation Type",
    "Bulk",
    "Manual",
  ];
  // const CourseData = [

  // ];
  // if (CourseListDataSuccess && !courseDataFilter) {
  //   for (let i = 0; i < CourseListData.length; i++) {

  //   }
  //   setCourseDataFilter(true)
  // }

  const filterValues = ["Invited", "Invitation Type"];

  useEffect(() => {
    return () => {
      dispatch(ResetInvitationHistory());
    };
  }, [dispatch]);

  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });

  useEffect(() => {
    if (locationVal.includes("/invite-faculty-history")) {
      setTeacherHistory(true);
    } else {
      setStudentHistory(true);
    }
  }, [locationVal]);

  const DeleteInvitation = (_id) => {
    dispatch(deleteInvitationHistory(_id));
  };

  const ResendInvitaion = (_id) => {
    dispatch(ResendInvitationHistory(_id));
  };

  useEffect(() => {
    if (locationVal.includes("/invite-faculty-history")) {
      dispatch(
        getInvitationsHistoryList(
          users.user_institute,
          process.env.REACT_APP_TEACHER,
          "teacherList"
        )
      );
    } else {
      dispatch(
        getInvitationsHistoryList(
          users.user_institute,
          process.env.REACT_APP_STUDENT,
          "studentList"
        )
      );
    }
  }, [dispatch, locationVal, users.user_institute]);

  useEffect(() => {
    if (studentHistory) {
      dispatch(getAllCoursesForStudentFilter(users.user_institute));
    }
  }, [dispatch, studentHistory, users.user_institute]);

  useEffect(() => {
    if (invitationHistoryDeleteLoading) {
      setDeleteLoading(true);
    } else {
      setDeleteLoading(false);
    }
  }, [invitationHistoryDeleteLoading]);

  const SingleSelectHandel = (item) => {
    let message = item;
    switch (message) {
      case "All":
        if (locationVal.includes("/invite-faculty-history")) {
          dispatch(
            getInvitationsHistoryList(
              users.user_institute,
              process.env.REACT_APP_TEACHER,
              "teacherList"
            )
          );
        } else {
          dispatch(
            getInvitationsHistoryList(
              users.user_institute,
              process.env.REACT_APP_STUDENT,
              "studentList"
            )
          );
        }

        break;

      case "Recent to Old":
        if (locationVal.includes("/invite-faculty-history")) {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_TEACHER,
              "teacherList",
              "status",
              "rto"
            )
          );
        } else {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_STUDENT,
              "studentList",
              "status",
              "rto"
            )
          );
        }

        break;

      case "Old to Recent":
        if (locationVal.includes("/invite-faculty-history")) {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_TEACHER,
              "teacherList",
              "status",
              "otr"
            )
          );
        } else {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_STUDENT,
              "studentList",
              "status",
              "otr"
            )
          );
        }

        break;

      case "Bulk":
        if (locationVal.includes("/invite-faculty-history")) {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_TEACHER,
              "teacherList",
              "type",
              "bulk"
            )
          );
        } else {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_STUDENT,
              "studentList",
              "type",
              "bulk"
            )
          );
        }

        break;

      case "Manual":
        if (locationVal.includes("/invite-faculty-history")) {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_TEACHER,
              "teacherList",
              "type",
              "manual"
            )
          );
        } else {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_STUDENT,
              "studentList",
              "type",
              "manual"
            )
          );
        }

        break;

      case "Invited Pending":
        if (locationVal.includes("/invite-faculty-history")) {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_TEACHER,
              "teacherList",
              "invite",
              true
            )
          );
        } else {
          dispatch(
            SortByInvitationHistory(
              users.user_institute,
              process.env.REACT_APP_STUDENT,
              "studentList",
              "invite",
              true
            )
          );
        }

        break;

      default:
        if (locationVal.includes("/invite-faculty-history")) {
          dispatch(
            getInvitationsHistoryList(
              users.user_institute,
              process.env.REACT_APP_TEACHER,
              "teacherList"
            )
          );
        } else {
          dispatch(
            getInvitationsHistoryList(
              users.user_institute,
              process.env.REACT_APP_STUDENT,
              "studentList"
            )
          );
        }
    }
  };

  const MultiSelectDropDown = (selectedData) => {
    dispatch(
      MutlitdropDownInvitationHistory(
        users.user_institute,
        process.env.REACT_APP_TEACHER,
        selectedData.courseList,
        selectedData.classRoomList
      )
    );
  };

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  if (CourseListDataSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < CourseListData.length; i++) {
      value.push(CourseListData[i]._id);
    }
    value.push("All");
    dispatch(AllEntrySelected(value));
  }

  const OnSelectedValue = (val) => {
    dispatch(
      MultiSelectStudentInvitationFilter(
        users.user_institute,
        process.env.REACT_APP_STUDENT,
        val
      )
    );
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <BreadCrumbsHistory
          studentHistory={studentHistory}
          teacherHistory={teacherHistory}
        />
        <div className="PageTopHead PTH-InvitationHistory mt-20">
          <div className="PTH-Item">
            <p className="text-sm w-300">Invitation History</p>
          </div>
          <div className="PTH-Item">
            <SingleSelectDropdown
              selectGroup={selectGroup}
              filterValues={filterValues}
              SingleSelectHandel={(item) => SingleSelectHandel(item)}
            />
          </div>

          <div className="PTH-Item">
            {teacherHistory ? (
              <CourseClassCheckboxFilter
                onSelect={(selectedData) => {
                  MultiSelectDropDown(selectedData);
                }}
              />
            ) : (
              <MultiSelectDropDownCommon
                selectGroup={CourseListData}
                CourseSwitch={true}
                OnSelectedValue={OnSelectedValue}
                toShow={"coursename"}
                name={DynamicCourseHeader()}
              />
            )}
          </div>

          <div className="PTH-Item P-Right">
            <SearchBar
              studentHistory={studentHistory}
              teacherHistory={teacherHistory}
            />
          </div>
          <div className="PTH-Item">
            <InviteUser
              studentHistory={studentHistory}
              teacherHistory={teacherHistory}
            />
          </div>
        </div>
        <div className="gridListTable">
          <List
            studentHistory={studentHistory}
            teacherHistory={teacherHistory}
          />
          <div className="gridBody">
            {invitationHistoryListSuccess ? (
              invitationHistoryList.length > 0 ? (
                invitationHistoryList.map((item) => {
                  return (
                    <div className="gridRow" key={item._id}>
                      <ul className="topInfo">
                        <li className="col col-3" data-head="Name & Contact">
                          <div className="text-xs primary w-500">
                            <a
                              href={`/profile/${item.user_username}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.user_fullname}
                            </a>
                          </div>
                          <div className="mt-3">
                            {item.user_email}
                          </div>
                          <div className="mt-3">
                            {item.user_contact}
                          </div>
                        </li>
                        <li
                          className="col col-2"
                          data-head={
                            DynamicCourseHeader() +
                            " & " +
                            DynamicClassroomHeader()
                          }
                        >
                          {studentHistory ? (
                            <React.Fragment>
                              {item.courseData_coursename}
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              {item.courseData_coursename &&
                                item.classroomData_classroomname ? (
                                <React.Fragment>
                                  <p>{item.courseData_coursename}</p>
                                  <p> {item.classroomData_classroomname}</p>
                                </React.Fragment>
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          )}
                        </li>
                        <li className="col col-3" data-head="Invited on">
                          {moment(item.invited).format(DATETIME_FORMAT_AP)}
                        </li>
                        <li className="col col-2" data-head="Type & Status">
                          <div className="primary capitalize">
                            {item.type}
                          </div>
                          <div className="mt-3">
                            {item.user_password_change
                              ? "Logged"
                              : "Not Logged"}
                          </div>
                        </li>
                        <li className="col col-2 actionCols" data-head="">
                          {item.user_password_change ? (
                            ""
                          ) : (
                            <React.Fragment>
                              <div className="actionBtn">
                                {/* <button
                                    className="btn-square"
                                    title="Resend"
                                    onClick={() => ResendInvitaion(item._id)}
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-next"></i>
                                    </span>
                                  </button> */}
                                <button
                                  className="btn-square"
                                  title="Remove"
                                  onClick={() => RemovePopState(item._id)}
                                >
                                  <span className="cssIcon">
                                    <i className="ed-trash"></i>
                                  </span>
                                </button>
                              </div>
                              {item._id === deleteID && RemovePop && (
                                <Popup
                                  show={RemovePop}
                                  RemovePopToggleRef={RemovePopToggleRef}
                                  CancelProp={() => setRemovePop(!RemovePop)}
                                  RemoveProp={() =>
                                    DeleteInvitation(item._id)
                                  }
                                  loading={deleteLoading}
                                >
                                  <p className="gray text-xxs w-300">
                                    You are about to delete invitation.
                                  </p>
                                  <p className="dgray text-xxs w-400">
                                    Are you sure?
                                  </p>
                                </Popup>
                              )}
                            </React.Fragment>
                          )}
                        </li>
                      </ul>
                    </div>
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
        <div className="TableBottomBtn justify-start mt-20">
          {teacherHistory ? (
            <AppLink
              className="button btn-o-primary primary btn-sm"
              to="/invite-faculty-list"
            >
              <i className="animate-r-arrow-icon back-i"></i>
              Back to Teachers
            </AppLink>
          ) : (
            <AppLink
              className="button btn-o-primary primary btn-sm"
              to="/invite-student-list"
            >
              <i className="animate-r-arrow-icon back-i"></i>
              Back to Students
            </AppLink>
          )}
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
export default InvitationHistory;
