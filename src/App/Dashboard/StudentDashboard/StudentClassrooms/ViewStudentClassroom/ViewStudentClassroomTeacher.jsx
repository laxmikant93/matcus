/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SingleSelectDropdown from "../../../../../Common/Form/SingleSelectDropdown";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../../Common/UserElement";
import {
  getSubjectTeacherList,
  searchSortBySubjectTeacherList,
} from "../../../../../store/actions/viewStudentClassroom";
import { DATETIME_FORMAT_AP } from "../../../../../Constant/constants";
import SearchControl from "../../../../../Common/SearchControl";
import DummyProfile from "../../DummyProfile.png";
const ViewStudentClassroomTeacher = () => {
  const dispatch = useDispatch();
  const { _classroomId, _subjectId } = useParams();
  const history = useNavigate();
  const { user, teacherSuccess, teacherList } = useSelector((state) => {
    return {
      user: state.user,
      teacherSuccess: state.viewStudentClassroom.subjectTeacherList.success,
      teacherList: state.viewStudentClassroom.subjectTeacherList.data,
    };
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  // useEffect(() => {
  //   dispatch(searchSortBySubjectTeacherList(user.user_institute, user._id, _classroomId, _subjectId, "search", searchTerm))

  // }, [dispatch, user, searchTerm, _classroomId, _subjectId]);

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
  ];

  const filterValues = ["Created On", "Due Date"];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(
          getSubjectTeacherList(
            user.user_institute,
            user._id,
            _subjectId,
            _classroomId
          )
        );
        break;
      }
      case "Recent to Old 1": {
        dispatch(
          searchSortBySubjectTeacherList(
            user.user_institute,
            _subjectId,
            "createdon",
            "rto",
            _classroomId
          )
        );
        break;
      }
      case "Old to Recent 1": {
        dispatch(
          searchSortBySubjectTeacherList(
            user.user_institute,
            _subjectId,
            "createdon",
            "otr",
            _classroomId
          )
        );
        break;
      }
      case "Recent to Old 2": {
        dispatch(
          searchSortBySubjectTeacherList(
            user.user_institute,
            _subjectId,
            "duedate",
            "rto",
            _classroomId
          )
        );
        break;
      }
      case "Old to Recent 2": {
        dispatch(
          searchSortBySubjectTeacherList(
            user.user_institute,
            _subjectId,
            "duedate",
            "otr",
            _classroomId
          )
        );
        break;
      }
      case "Graded": {
        dispatch(
          searchSortBySubjectTeacherList(
            user.user_institute,
            _subjectId,
            "status",
            "graded",
            _classroomId
          )
        );
        break;
      }
      case "Submited": {
        dispatch(
          searchSortBySubjectTeacherList(
            user.user_institute,
            _subjectId,
            "status",
            "submitted",
            _classroomId
          )
        );
        break;
      }
      case "Pending": {
        dispatch(
          searchSortBySubjectTeacherList(
            user.user_institute,
            _subjectId,
            "status",
            "pending",
            _classroomId
          )
        );
        break;
      }

      default:
        dispatch(
          getSubjectTeacherList(
            user.user_institute,
            user._id,
            _subjectId,
            _classroomId
          )
        );
    }
  };

  useEffect(() => {
    dispatch(
      getSubjectTeacherList(
        user.user_institute,
        user._id,
        _subjectId,
        _classroomId
      )
    );
  }, [_classroomId, _subjectId, dispatch, user._id, user.user_institute]);
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-StudentSideTeacherViewClassroom mt-20">
        <div className="PTH-Item">
          <div className="dgray text-sm w-300">Teachers</div>
        </div>
        {/* <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div> */}
        {/* Don't remove */}

        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            onChange={handleChange}
            placeholder="Search Teacher."
          />
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-6">Name & Email</li>
          <li className="col col-3">Contact</li>
          <li className="col col-3">Last Sign in</li>
        </ul>
        <div className="gridBody">
          {teacherSuccess ? (
            <>
              {teacherList.length ? (
                teacherList
                  .filter((item) => {
                    if (searchTerm === "") {
                      return item;
                    } else if (
                      item.user_fullname
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.user_email
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
                          <li className="col col-6" data-head="Name & Email">
                            <div className="userDetails">
                              <div className="profileCircle">
                                <a
                                  href={`/profile/${item.user.username}`}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      item.user.profile_picture ===
                                        undefined ||
                                        item.user.profile_picture ===
                                        null ||
                                        item.user.profile_picture === ""
                                        ? DummyProfile
                                        : item.user.profile_picture
                                    }
                                    alt="user profile"
                                  />
                                </a>
                              </div>
                              <div className="profileDetails">
                                <a
                                  className="profile-name"
                                  href={`/profile/${item.user.username}`}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {item.user.fullname}
                                </a>
                                <div className="profile-email">
                                  {item.user.email}
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="col col-3" data-head="Contact">
                            {item.user.contact}
                          </li>
                          <li className="col col-3" data-head="Last Sign in">
                            {item.user.password_change &&
                              item.user.lastLoginDate ? (
                              <React.Fragment>
                                {" "}
                                {moment(item.user.lastLoginDate).format(
                                  DATETIME_FORMAT_AP
                                )}
                              </React.Fragment>
                            ) : (
                              "Not Logged"
                            )}
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
export default ViewStudentClassroomTeacher;
