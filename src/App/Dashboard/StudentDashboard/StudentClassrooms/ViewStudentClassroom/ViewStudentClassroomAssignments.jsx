/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
// import CourseClassCheckboxFilter from "../../../../../Common/CourseClassCheckboxFilter";
import SingleSelectDropdown from "../../../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../../../Common/SearchControl";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../../Common/UserElement";
// import { courseID } from "../../../../../Constant/auth";
import {
  getSubjectAssignmentList,
  searchSortBySubjectAssignmentList,
} from "../../../../../store/actions/viewStudentClassroom";

const ViewStudentClassroomAssignments = () => {
  const dispatch = useDispatch();
  const { _classroomId, _subjectId } = useParams();
  const history = useNavigate();

  const { user, assignmentsSuccess, assignment } = useSelector((state) => {
    return {
      user: state.user,
      assignmentsSuccess:
        state.viewStudentClassroom.subjectAssignmentList.success,
      assignment: state.viewStudentClassroom.subjectAssignmentList.data,
    };
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    dispatch(
      searchSortBySubjectAssignmentList(
        user.user_institute,
        user._id,
        _classroomId,
        _subjectId,
        "search",
        searchTerm
      )
    );
  }, [dispatch, user, searchTerm, _classroomId, _subjectId]);
  const openAssignmentView = (value) => {
    history(
      `/dashboard/student-assignment-view-classroom/${value}/${_classroomId}/${_subjectId}`
    );
  };

  const openAssignmentResult = (value) => {
    history(
      `/dashboard/student-assignment-view-result-classroom/${value}/${_classroomId}/${_subjectId}`
    );
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

  const filterValues = ["Created On", "Due Date", "Graded"];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(
          getSubjectAssignmentList(user.user_institute, user._id, _subjectId)
        );
        break;
      }
      case "Recent to Old 1": {
        dispatch(
          searchSortBySubjectAssignmentList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "createdon",
            "rto"
          )
        );
        break;
      }
      case "Old to Recent 1": {
        dispatch(
          searchSortBySubjectAssignmentList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "createdon",
            "otr"
          )
        );
        break;
      }
      case "Recent to Old 2": {
        dispatch(
          searchSortBySubjectAssignmentList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "duedate",
            "rto"
          )
        );
        break;
      }
      case "Old to Recent 2": {
        dispatch(
          searchSortBySubjectAssignmentList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "duedate",
            "otr"
          )
        );
        break;
      }
      case "Graded": {
        dispatch(
          searchSortBySubjectAssignmentList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "status",
            "graded"
          )
        );
        break;
      }
      case "Submited": {
        dispatch(
          searchSortBySubjectAssignmentList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "status",
            "submitted"
          )
        );
        break;
      }
      case "Pending": {
        dispatch(
          searchSortBySubjectAssignmentList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "status",
            "pending"
          )
        );
        break;
      }
      case "Missed": {
        dispatch(
          searchSortBySubjectAssignmentList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "status",
            "missed"
          )
        );
        break;
      }

      default:
        dispatch(
          getSubjectAssignmentList(user.user_institute, user._id, _subjectId)
        );
    }
  };
  useEffect(() => {
    dispatch(
      getSubjectAssignmentList(
        user.user_institute,
        user._id,
        _subjectId,
        _classroomId
      )
    );
  }, [_classroomId, _subjectId, dispatch, user._id, user.user_institute]);
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-StudentViewClassroomAssignment mt-20">
        <div className="PTH-Item">
          <div className="dgray text-sm w-300">Assignments</div>
        </div>
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>
        {/* Don't remove */}

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
          <li className="col col-4">Title</li>
          <li className="col col-4">
            <DynamicCourseHeader />/<DynamicClassroomHeader />
          </li>
          <li className="col col-2">Grade & Remarks</li>
          <li className="col col-2">Creccccccted on</li>
          <li className="col col-2">Due Date</li>

          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {assignmentsSuccess ? (
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
                          <li className="col col-4" data-column="Title">
                            {item.assignmentData_title}
                          </li>
                          <li
                            className="col col-4"
                            data-column={
                              <DynamicCourseHeader /> /
                              <DynamicClassroomHeader />
                            }
                          >
                            <div className="purple w-600">
                              {item.courseData_coursename}
                            </div>
                            <div className="mt-3 text-xxs">
                              {item.classroomData_classroomname}
                            </div>
                          </li>
                          <li
                            className="col col-2"
                            data-column="Grade & Remarks"
                          >
                            <div className="">
                              {item.submittedAssignmentData_grade}
                            </div>
                            <div className="mt-3">
                              {item.submittedAssignmentData_remarks}
                            </div>
                          </li>
                          <li
                            className="col col-2"
                            data-column="Grade & Remarks"
                          >
                            <div className="">
                              {moment(item.assignmentData_createdAt).format(
                                "Do MMMM YYYY h:mm a"
                              )}
                            </div>
                          </li>
                          <li
                            className="col col-2"
                            data-column="Grade & Remarks"
                          >
                            <div className="mt-3">
                              {moment(item.assignmentData_duedate).format(
                                "Do MMMM YYYY h:mm a"
                              )}
                            </div>
                          </li>

                          <li className="col col-2 actionCols">
                            <div className="actionBtn">
                              {item.submittedAssignmentData_status ===
                                "pending" && (
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
                                      openAssignmentResult(item.assignmentData)
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
                <div className="loadingGridData">No records found.</div>
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
  );
};
export default ViewStudentClassroomAssignments;
