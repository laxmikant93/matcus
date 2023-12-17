import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Storage from "../../../Classes/Storage";
import {
  getStudentCourseDetails,
  getStudentSubjectCourseDetails,
} from "../../../store/actions/studentcourses";
import CourseDetailCover from "../StudentCourse/CourseDetailCover";
import CourseDetailViewList from "../StudentCourse/CourseDetailViewList";
import IconForward from "./icon-forward.svg";
import "../StudentCourse/StudentCourse.scss";
const PreviewCourse = () => {
  const { user, courseDetail, courseDetailSuccess } = useSelector((state) => {
    return {
      user: state.user,
      courseDetail: state.studentcourse.courseDetail.data,
      courseDetailSuccess: state.studentcourse.courseDetail.success,
    };
  });
  const { _id, _state } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const infoDetails = Storage.alive("__previewCourseInfo__")
    ? Storage.getJson("__previewCourseInfo__")
    : "";
  const showMore = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      if (_state === "teacherClassroom") {
        dispatch(
          getStudentSubjectCourseDetails(
            _id,
            infoDetails.subjectId && infoDetails.subjectId
          )
        );
      } else {
        dispatch(getStudentCourseDetails(_id, user._id, "teacher"));
      }
    } else if (user.user_activeRole === process.env.REACT_APP_STUDENT) {
      dispatch(getStudentCourseDetails(_id, user._id, "student"));
    } else {
      if (_state === "adminClassroom") {
        dispatch(
          getStudentSubjectCourseDetails(
            _id,
            infoDetails.classroomId && infoDetails.classroomId
          )
        );
      } else {
        dispatch(getStudentCourseDetails(_id, user._id, "admin"));
      }
    }
  }, [
    _id,
    _state,
    dispatch,
    infoDetails.classroomId,
    infoDetails.subjectId,
    user._id,
    user.user_activeRole,
  ]);

  const backGoBackToEdit = () => {
    if (_state === "adminCourse") {
      history(`/edit-courses/${_id}`);
    } else if (_state === "adminClassroom") {
      history(
        `/edit-admin-course/${_id}/${infoDetails.classroomId && infoDetails.classroomId
        }`
      );
    } else if (_state === "teacherCourse") {
      history(`/dashboard/teacher-edit-course/${_id}`);
    } else if (_state === "teacherClassroom") {
      history(
        `/dashboard/edit-teacherClassroom-course/${_id}/${infoDetails.classroomId && infoDetails.classroomId
        }`
      );
    }
  };
  return (
    <React.Fragment>
      <button
        type="button"
        className="btnText underline purple mt-80 w-500 text-xxs"
        onClick={backGoBackToEdit}
      >
        <i className="animate-r-arrow-icon back-i"></i>
        Go back to Edit Material
      </button>
      {courseDetailSuccess ? (
        <React.Fragment>
          <p className="text-sm w-100 mt-10">{courseDetail.courseTitle}</p>
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
            {/* {!toggle ? (
                
              ) : (
                <button type="button" onClick={showMore}>
                  Show Less
                </button>
              )} */}
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
    </React.Fragment>
  );
};
export default PreviewCourse;
