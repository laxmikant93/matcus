import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppLink from "../../../Common/AppLink";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import SearchControl from "../../../Common/SearchControl";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { DynamicCourseHeader } from "../../../Common/UserElement";
import { getAllClassroomSubjects } from "../../../store/actions/admincourse";
import Card from "../../../Common/Card";
import CardBody from "../../../Common/Card/CardBody";
import CardHeader from "../../../Common/Card/CardHeader";
import "../Attendance.scss";
import { getTeacherLeaveRequestList } from "../../../store/actions/TeacherAttendance";
import NoDataAvailable from "../../../Common/NoDataAvailable";
const TeacherAttendanceClassroomList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    user,
    classroomSubjectsList,
    classroomSubjectSuccess,
    requestList,
    requestListSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      classroomSubjectsList: state.admincourse.getAllClassroomSubjects.data,
      classroomSubjectSuccess:
        state.admincourse.getAllClassroomSubjects.success,
      requestList: state.teacherAttendance.teacherLeaveRequestList.data,
      requestListSuccess:
        state.teacherAttendance.teacherLeaveRequestList.success,
    };
  });
  const [showSubject, hideSubject] = useState(-1);
  function showHideSubjects(index) {
    if (showSubject !== index) {
      dispatch(
        getTeacherLeaveRequestList(user.user_institute, index, new Date())
      );
    }
    hideSubject(showSubject === index ? -1 : index);
  }
  useEffect(() => {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      dispatch(
        getAllClassroomSubjects(user.user_institute, user._id, "attendance")
      );
    } else {
      dispatch(getAllClassroomSubjects(user.user_institute));
    }
  }, [dispatch, user._id, user.user_activeRole, user.user_institute]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const [classroomLength, setClassroomLength] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  useEffect(() => {
    if (searchTerm) {
      setSearchFind(true);
      let arr = [];
      for (let i = 0; i < classroomSubjectsList.length; i++) {
        if (
          classroomSubjectsList[i].coursename
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          arr.push(classroomSubjectsList[i]);
        }
      }
      setClassroomLength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [classroomSubjectsList, searchTerm]);

  const handleHoliday = (value) => {
    if (value === "teacher") {
      history("/dashboard/holiday-calendar");
    } else {
      history("/admin-holiday-calender-list");
    }
  };
  const handleAttendance = (value, _id) => {
    if (value === "teacher") {
      history(`/dashboard/teacher-attendance-list/${_id}`);
    } else {
      history(`/admin-attendance-list/${_id}`);
    }
  };
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {user.user_activeRole === process.env.REACT_APP_TEACHER ? (
          <BreadcrumbItem
            to="/dashboard/attendance-teacher-classroomSubjectlist"
            title="Attendance"
          />
        ) : (
          <BreadcrumbItem
            to="/admin-attendance-classroomSubjectlist"
            title="Attendance"
          />
        )}
      </Breadcrumb>
      <div className="teacherAttendance-wrapper">
        <div className="PageTopHead PTH-T-Attendance-ClassroomList mt-10">
          {classroomSubjectSuccess ? (
            searchFind ? (
              <div className="PTH-Item">
                <h1 className="text-sm w-400">Attendance</h1>
                {classroomSubjectsList > 1 ? (
                  <>
                    <h5 className="text-xxs w-5000">
                      <span className="purple">{classroomLength}</span>
                      &nbsp; {DynamicCourseHeader()}
                    </h5>
                  </>
                ) : (
                  <>
                    <h5 className="text-xxs w-500">
                      <span className="purple">{classroomLength}</span>
                      &nbsp;{DynamicCourseHeader()}
                    </h5>
                  </>
                )}
              </div>
            ) : (
              <div className="PTH-Item">
                <h1 className="text-sm w-400">Attendance</h1>
                {classroomSubjectsList.length > 1 ? (
                  <>
                    <h5 className="text-xxs w-500">
                      <span className="base">
                        {classroomSubjectsList.length}
                      </span>
                      &nbsp; {DynamicCourseHeader()}
                    </h5>
                  </>
                ) : (
                  <>
                    <h5 className="text-xxs w-500">
                      <span className="base">
                        {classroomSubjectsList.length}
                      </span>
                      &nbsp;{DynamicCourseHeader()}
                    </h5>
                  </>
                )}
              </div>
            )
          ) : (
            <div className="PTH-Item">
              <h1 className="text-sm w-400">Attendance</h1>
              <h5 className="text-xxs w-500">&nbsp;{DynamicCourseHeader()}</h5>
            </div>
          )}
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={handleChange}
              placeholder={DynamicCourseHeader() + " Search"}
            />
          </div>
          <div className="PTH-Item P-Right">
            {user.user_activeRole === process.env.REACT_APP_TEACHER ? (
              <button
                type="button"
                onClick={() => handleHoliday("teacher")}
                className="button btn-sm button-base"
              >
                Holidays calendar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleHoliday("admin")}
                className="button btn-sm button-base"
              >
                Holidays calendar
              </button>
            )}
          </div>
          <div className="PTH-Item">
            <p className="text-sm w-600">List of {DynamicCourseHeader()}</p>
          </div>
        </div>
        <div className="T-Attendance-ClassroomList-Wrap">
          {classroomSubjectSuccess ? (
            <>
              {classroomSubjectsList.length ? (
                classroomSubjectsList
                  // eslint-disable-next-line array-callback-return
                  .filter((classrooms) => {
                    if (searchTerm === "") {
                      return classrooms;
                    } else if (
                      classrooms.coursename
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return classrooms;
                    }
                  })
                  // eslint-disable-next-line array-callback-return
                  .map((item) => {
                    return (
                      <>
                        <Card key={item._id}>
                          <CardHeader>
                            <p
                              className={`HeaderCnt text-xs w-500 ${showSubject === item._id ? "active" : ""
                                }`}
                              onClick={() => showHideSubjects(item._id)}
                            >
                              {item.coursename}
                              <span className="text-xxs w-400">
                                &nbsp; &nbsp;{item.classroomData.length}{" "}
                                Subjects
                              </span>
                            </p>
                          </CardHeader>

                          {showSubject === item._id && (
                            <CardBody>
                              <div className="CardBodyItem-GrpButton">
                                {user.user_activeRole ===
                                  process.env.REACT_APP_TEACHER ? (
                                  item.classTeacher ? (
                                    <React.Fragment>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAttendance("teacher", item._id)
                                        }
                                        className="button btn-sm button-base"
                                      >
                                        View All Attendance
                                      </button>
                                      <AppLink
                                        to={`/dashboard/leave-request-list/${item._id}`}
                                        className="LeaveRequestButton"
                                      >
                                        Leave Requests
                                        <span className="LRBtnNumber">
                                          {requestListSuccess
                                            ? requestList.length
                                            : "..."}
                                        </span>
                                      </AppLink>
                                    </React.Fragment>
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  <React.Fragment>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAttendance("admin", item._id)
                                      }
                                      className="button btn-sm button-base"
                                    >
                                      View All Attendance
                                    </button>
                                    <AppLink
                                      to={`/admin-leave-request-list/${item._id}`}
                                      className="LeaveRequestButton"
                                    >
                                      Leave Request
                                      <span className="LRBtnNumber">
                                        {requestListSuccess
                                          ? requestList.length
                                          : "..."}
                                      </span>
                                    </AppLink>
                                  </React.Fragment>
                                )}
                              </div>
                              <div className="CardBodyItem-Wrap">
                                {item.classroomData.length > 0
                                  ? item.classroomData.map((subjectItem) => {
                                    return (
                                      <div
                                        className="CardBodyItem"
                                        key={subjectItem._id}
                                      >
                                        <p className="base text-xs w-300">
                                          {subjectItem.classroomname}
                                        </p>

                                        <div className="SubjectListBoxAction mt-10">
                                          {
                                            user.user_activeRole ===
                                              process.env.REACT_APP_TEACHER ? (
                                              <AppLink
                                                // to={`/dashboard/teacher/${id}/view-classroom/${item.classroom}`}
                                                to={`/dashboard/teacher-attendance-list/${item._id}/${subjectItem._id}`}
                                                className="btnText underline primary text-xxs"
                                              >
                                                View Attendance
                                                <i className="RightCaret"></i>
                                              </AppLink>
                                            ) : (
                                              <AppLink
                                                // to={`/dashboard/teacher/${id}/view-classroom/${item.classroom}`}
                                                to={`/attendance-admin-list/${item._id}/${subjectItem._id}`}
                                                className="btnText underline primary text-xxs"
                                              >
                                                View Attendance
                                                <i className="RightCaret"></i>
                                              </AppLink>
                                            )
                                          }
                                        </div>
                                      </div>
                                    );
                                  })
                                  : "No Subjects Found"}
                              </div>
                            </CardBody >
                          )}
                        </Card >
                      </>
                    );
                  })
              ) : (
                <NoDataAvailable title="No records found." />
              )}
            </>
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
          {
            classroomSubjectSuccess &&
              searchFind &&
              classroomSubjectsList.length > 0 &&
              classroomLength === 0 ? (
              <div className="loadingGridData">No records found.</div>
            ) : (
              ""
            )
          }
        </div>
      </div>
    </React.Fragment>
  );
};
export default TeacherAttendanceClassroomList;
