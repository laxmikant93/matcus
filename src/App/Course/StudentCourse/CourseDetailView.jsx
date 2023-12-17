import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import StudentTheme from "../../../Common/Theme/StudentTheme";
import CourseDetailCover from "./CourseDetailCover";
import CourseDetailViewList from "./CourseDetailViewList";
import IconForward from "../icon-forward.svg";
import {
  getStudentCourseDetails,
  getStudentSubjectCourseDetails,
} from "../../../store/actions/studentcourses/index";
import "./StudentCourse.scss";
import { useParams } from "react-router";
const CourseDetailView = () => {
  const { user, courseDetail, courseDetailSuccess } = useSelector((state) => {
    return {
      user: state.user,
      courseDetail: state.studentcourse.courseDetail.data,
      courseDetailSuccess: state.studentcourse.courseDetail.success,
    };
  });
  const { _id, _classroomId, _subject } = useParams();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const showMore = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      if (_subject) {
        dispatch(getStudentSubjectCourseDetails(_id, _subject));
      } else {
        dispatch(getStudentCourseDetails(_id, user._id, "teacher"));
      }
    } else if (user.user_activeRole === process.env.REACT_APP_STUDENT) {
      if (_subject) {
        dispatch(getStudentSubjectCourseDetails(_id, _subject));
      } else {
        dispatch(getStudentCourseDetails(_id, user._id, "student"));
      }
    } else {
      if (_subject) {
        dispatch(getStudentSubjectCourseDetails(_id, _subject));
      } else {
        dispatch(getStudentCourseDetails(_id, user._id, "admin"));
      }
    }
  }, [_id, _subject, dispatch, user._id, user.user_activeRole]);
  return (
    <StudentTheme>
      {user.user_activeRole === process.env.REACT_APP_STUDENT ? (
        _classroomId && _subject ? (
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem
              to="/dashboard/student/course-detail-list"
              title="Classroom"
            />

            <BreadcrumbItem
              to={`/dashboard/student-subjects-list/${_classroomId}`}
              title="Subjects"
            />

            <BreadcrumbItem
              to={`/dashboard/student/${_classroomId}/view-classroom/${_subject}`}
              title="View Subject"
            />
            {courseDetailSuccess && (
              <BreadcrumbItem
                to={`/dashboard/course-detail-classroom-view/${_id}/${_classroomId}/${_subject}`}
                title={courseDetail.courseTitle}
              />
            )}
          </Breadcrumb>
        ) : (
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem
              to="/dashboard/student/course-detail-list"
              title="Study Materials"
            />
            {courseDetailSuccess && (
              <BreadcrumbItem
                to={`/dashboard/course-detail-view/${_id}`}
                title={courseDetail.courseTitle}
              />
            )}
          </Breadcrumb>
        )
      ) : user.user_activeRole === process.env.REACT_APP_TEACHER ? (
        _classroomId && _subject ? (
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem
              to="/dashboard/teacher-classrooms-list"
              title="Classroom"
            />

            <BreadcrumbItem
              to={`/dashboard/teacher/subject-list/${_classroomId}`}
              title="Subjects"
            />

            <BreadcrumbItem
              to={`/dashboard/teacher/${_classroomId}/view-classroom/${_subject}`}
              title="View Subject"
            />

            {courseDetailSuccess && (
              <BreadcrumbItem
                to={`/dashboard/course-detail-classroom-view/${_id}/${_classroomId}/${_subject}`}
                title={courseDetail.courseTitle}
              />
            )}
          </Breadcrumb>
        ) : (
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem
              to="/dashboard/teacher/course-list"
              title="Study Materials"
            />
            {courseDetailSuccess && (
              <BreadcrumbItem
                to={`/dashboard/course-detail-view/${_id}`}
                title={courseDetail.courseTitle}
              />
            )}
          </Breadcrumb>
        )
      ) : (
        ""
      )}

      {courseDetailSuccess ? (
        <React.Fragment>
          <p className="text-sm w-300 mt-10">{courseDetail.courseTitle}</p>
          <div className="subTitleDetail text-md w-300 mt-10">
            {!toggle ? (
              <div className="subTitleDetailLeft">
                <p className="text-xs w-700">
                  {courseDetailSuccess &&
                    courseDetail.classAssigned &&
                    courseDetail.classAssigned.length
                    ? courseDetail.classAssigned[0].classroomName
                    : "Institute Level"}
                  &nbsp;
                  <img
                    src={IconForward}
                    className="IconForwardCustom"
                    alt="Forward"
                  />
                  &nbsp;
                  <span className="text-xs w-500">
                    {courseDetailSuccess &&
                      courseDetail.classAssigned &&
                      courseDetail.classAssigned.length &&
                      courseDetail.classAssigned[0].subject &&
                      courseDetail.classAssigned[0].subject.length
                      ? courseDetail.classAssigned[0].subject.map((item) => {
                        return (
                          <React.Fragment>{item + ","}</React.Fragment>
                        );
                      })
                      : ""}
                  </span>
                </p>
              </div>
            ) : (
              <div className="subTitleDetailLeft">
                {courseDetailSuccess &&
                  courseDetail.classAssigned &&
                  courseDetail.classAssigned.length &&
                  courseDetail.classAssigned.map((item) => {
                    return (
                      <React.Fragment>
                        <p className="text-xs w-700">
                          {item.classroomName}
                          &nbsp;
                          <img
                            src={IconForward}
                            className="IconForwardCustom"
                            alt="Forward"
                          />
                          &nbsp;
                          <span className="text-xs w-500">
                            {item.subject &&
                              item.subject.length &&
                              item.subject.map((SubjectItem) => {
                                return (
                                  <React.Fragment>
                                    {SubjectItem + ","}
                                  </React.Fragment>
                                );
                              })}
                          </span>
                        </p>
                      </React.Fragment>
                    );
                  })}
              </div>
            )}

            <div className="subTitleDetailRight">
              <p className="text-xs w-500">
                <span className="purple">
                  {courseDetailSuccess &&
                    courseDetail.courseTopicInfo &&
                    courseDetail.courseTopicInfo.length}
                </span>
                &nbsp;Topics
              </p>
              <p className="text-xs w-500">
                <span className="purple">
                  {courseDetailSuccess && courseDetail.totalChapters}
                </span>
                &nbsp;Chapters
              </p>
            </div>
          </div>
          <div className="CourseClassroomToggleList">
            {/* {
                !toggle ? (
                  courseDetailSuccess && courseDetail.classAssigned && courseDetail.classAssigned.length > 1 && <button onClick={showMore}>Show More</button>
                ) : <button onClick={showMore}>Show Less</button>
              } */}
            {courseDetailSuccess &&
              courseDetail.classAssigned &&
              courseDetail.classAssigned.length > 1 && (
                <button
                  className={`btnText ${toggle ? "active" : ""}`}
                  type="button"
                  onClick={showMore}
                >
                  Show {!toggle ? "More" : "Less"}
                </button>
              )}
          </div>
          <CourseDetailCover />
          <CourseDetailViewList />
        </React.Fragment>
      ) : (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      )}
    </StudentTheme>
  );
};

export default CourseDetailView;
