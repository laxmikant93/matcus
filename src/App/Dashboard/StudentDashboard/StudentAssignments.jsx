/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";

import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";

import { SearchIcon } from "../../../Common/Icon";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentAssignmentInfoData,
  clearAssigmentView,
  restSingleAssignment,
  getStudentAssignmentInfoDataRESET,
  courseAndClassroomFilter,
  sortByRecentToOld1Assignment,
  sortByOldToRecent1Assignment,
  sortByRecentToOld2Assignment,
  sortByOldToRecent2Assignment,
  sortByGradedAssignment,
  sortBySubmitedAssignment,
  sortByPendingAssignment,
  sortByMissedAssignment,
} from "../../../store/actions/studentAssignment";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
// import MultipleGroupSelectDropdown from "../../../Common/Form/MultipleGroupSelectDropdown";
import CourseClassCheckboxFilter from "../../../Common/CourseClassCheckboxFilter";
import "./StudentDashboard.scss";
import SearchControl from "../../../Common/SearchControl";
import NoDataAvailable from "../../../Common/NoDataAvailable";
export default function StudentAssignments() {
  const dispatch = useDispatch();
  const history = useNavigate();
  let date = new Date().toISOString();
  const { users, assignment, assignmentSuccess } = useSelector((state) => {
    return {
      users: state.user,
      assignment: state.studentassigment.info.data,
      assignmentSuccess: state.studentassigment.info.success,
      studenInfoData: state.studentassigment.studentinfo.data,
      userRole: state.userRole.data.data,
    };
  });

  useEffect(() => {
    dispatch(getStudentAssignmentInfoData(users._id, users.user_institute));
    //dispatch(ClearGetSingleAssignmentInfoData())
    dispatch(clearAssigmentView());
    dispatch(restSingleAssignment());
  }, [dispatch, users]);

  useEffect(() => {
    return () => {
      dispatch(getStudentAssignmentInfoDataRESET());
    };
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const openAssignmentView = (value) => {
    history(`/dashboard/student-assignment-view/${value}`);
  };

  const openAssignmentResult = (value) => {
    history(`/dashboard/student-assignment-view-result/${value}`);
  };

  const selectGroup = [
    "Created On",
    "Recent to Old 1",
    "Old to Recent 1",
    "Due Date",
    "Recent to Old 2",
    "Old to Recent 2",
    "Graded",
    "Submited",
    "Pending",
    "Missed",
  ];

  const filterValues = ["Created On", "Due Date"];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(getStudentAssignmentInfoData(users._id, users.user_institute));
        break;
      }
      case "Recent to Old 1": {
        dispatch(sortByRecentToOld1Assignment(users._id, users.user_institute));
        break;
      }
      case "Old to Recent 1": {
        dispatch(sortByOldToRecent1Assignment(users._id, users.user_institute));
        break;
      }
      case "Recent to Old 2": {
        dispatch(sortByRecentToOld2Assignment(users._id, users.user_institute));
        break;
      }
      case "Old to Recent 2": {
        dispatch(sortByOldToRecent2Assignment(users._id, users.user_institute));
        break;
      }
      case "Graded": {
        dispatch(sortByGradedAssignment(users._id, users.user_institute));
        break;
      }
      case "Submited": {
        dispatch(sortBySubmitedAssignment(users._id, users.user_institute));
        break;
      }
      case "Pending": {
        dispatch(sortByPendingAssignment(users._id, users.user_institute));
        break;
      }
      case "Missed": {
        dispatch(
          sortByMissedAssignment(users._id, users.user_institute, "missed")
        );
        break;
      }

      default:
        dispatch(getStudentAssignmentInfoData(users._id, users.user_institute));
    }
  };

  const filterCourseAndClassroom = (selectedData) => {
    // selectedData.courseList.length !== 0 &&
    //   selectedData.classRoomList.length !== 0 &&
    dispatch(
      courseAndClassroomFilter(
        users._id,
        users.user_institute,
        selectedData.courseList,
        selectedData.classRoomList
      )
    );
  };

  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/student-assignments"
            title="Assignment "
          />
        </Breadcrumb>

        <div className="PageTopHead PTH-StudentAssignment mt-20">
          <div className="PTH-Item">
            <p className="text-sm w-300">
              {assignment.length ? assignment.length : "0"}&nbsp;Assignments
            </p>
          </div>
          <div className="PTH-Item">
            <SingleSelectDropdown
              SingleSelectHandel={SingleSelectHandel}
              selectGroup={selectGroup}
              filterValues={filterValues}
            />
          </div>
          {/* Don't remove */}
          <div className="PTH-Item">
            <CourseClassCheckboxFilter onSelect={filterCourseAndClassroom} />
          </div>
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={handleChange}
              placeholder="Search Assignment."
            />
          </div>
        </div>
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-2">Title</li>
            <li className="col col-3">
              <DynamicCourseHeader />/<DynamicClassroomHeader />
            </li>
            <li className="col col-2">Grade & Remarks</li>
            <li className="col col-3">Created & Due Date</li>
            {/* <li className="col col-2">Due Date</li> */}
            <li className="col col-2">&nbsp;</li>
          </ul>
          <div className="gridBody">
            {assignmentSuccess ? (
              <>
                {assignment.length ? (
                  assignment
                    .filter((item) => {
                      if (searchTerm === "") {
                        return item;
                      } else if (
                        item.assignmentData_title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    .map((item) => {
                      return (
                        <div className="gridRow" key={item._id}>
                          <ul className="topInfo">
                            <li className="col col-2" data-head="Title">
                              {item.assignmentData_title}
                            </li>
                            <li className="col col-3" data-head="Classroom">
                              {item.courseData_coursename}
                              <br></br>
                              {item.classroomData_classroomname}
                            </li>
                            <li
                              className="col col-2"
                              data-head="Grade & Remarks"
                            >
                              <p className="gray">
                                {item.submittedAssignmentData_grade}
                              </p>
                              <p className="gray">
                                {item.submittedAssignmentData_remarks}
                              </p>
                            </li>
                            <li className="col col-3" data-head="Created & Due Date">
                              {/* <p className="gray">On or before</p> */}
                              <p className="gray">
                                {moment(item.assignmentData_createdAt).format(
                                  "Do MMMM YYYY h:mm a"
                                )}
                              </p>
                              <p className="gray">On or before</p>
                              <p className="gray">
                                {" "}
                                {moment(item.assignmentData_duedate).format(
                                  "Do MMMM YYYY h:mm a"
                                )}
                              </p>
                            </li>
                            {/* <li className="col col-2" data-head="Due Date">
                                <p className="gray">On or before</p>
                                <p className="gray">
                                  {" "}
                                  {moment(item.assignmentData_duedate).format(
                                    "Do MMMM YYYY h:mm a"
                                  )}
                                </p>
                              </li> */}

                            <li className="col col-2 actionCols">
                              <div className="actionBtn">
                                {item.submittedAssignmentData_status ===
                                  "pending" &&
                                  item.assignmentData_duedate > date ? (
                                  <button
                                    className="btn-square"
                                    title="View"
                                    onClick={() =>
                                      openAssignmentView(item.assignmentData)
                                    }
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-eye"></i>
                                    </span>
                                  </button>
                                ) : (
                                  item.submittedAssignmentData_status ===
                                  "pending" &&
                                  item.assignmentData_duedate < date && (
                                    <button
                                      className="btn-square"
                                      title="Missed"
                                      disabled="disabled"
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-alert"></i>
                                      </span>
                                    </button>
                                  )
                                )}

                                {item.submittedAssignmentData_status ===
                                  "submitted" && (
                                    <button
                                      className="btn-square"
                                      title="Submitted"
                                      onClick={() =>
                                        openAssignmentView(item.assignmentData)
                                      }
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-check"></i>
                                      </span>
                                    </button>
                                  )}
                                {item.submittedAssignmentData_status ===
                                  "graded" && (
                                    <button
                                      className="btn-square"
                                      title="View Result"
                                      onClick={() =>
                                        openAssignmentResult(
                                          item.assignmentData
                                        )
                                      }
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-eye"></i>
                                      </span>
                                    </button>
                                  )}
                              </div>
                            </li>
                          </ul>
                        </div>
                      );
                    })
                ) : (
                  <NoDataAvailable title="No Records Found." />
                )}
              </>
            ) : (
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    </>
  );
}
