import React, { useEffect } from "react";
import GrayAuthTheme from "../../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../../Common/Breadcrumb/BreadcrumbItem";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseClassroomInfo } from "../../../../../store/actions/viewStudentClassroom/index";
// import { DynamicClassroomHeader, DynamicCourseHeader } from "../../../../../Common/UserElement";
import ViewStudentClassroomTabs from "./ViewStudentClassroomTabs";
import "./StudentViewClassroom.scss";
const ViewStudentClassroom = (props) => {
  const { _classroomId, _subjectId } = useParams();

  const dispatch = useDispatch();
  const { user, courseClassroomInfo, courseClassroomInfoSuccess } = useSelector(
    (state) => {
      return {
        user: state.user,
        courseClassroomInfo:
          state.viewStudentClassroom.courseClassroomInfo.data,
        courseClassroomInfoSuccess:
          state.viewStudentClassroom.courseClassroomInfo.success,
      };
    }
  );

  useEffect(() => {
    dispatch(getCourseClassroomInfo(user.user_institute, _subjectId));
  }, [_subjectId, dispatch, user.user_institute]);

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/student-classroom-list"
          title="Classroom"
        />
        <BreadcrumbItem
          to={`/dashboard/student-subjects-list/${_classroomId}`}
          title="Subjects"
        />
        <BreadcrumbItem
          to={`/dashboard/student/${_classroomId}/view-classroom/${_subjectId}`}
          title="View Subject"
        />
      </Breadcrumb>
      {courseClassroomInfoSuccess ? (
        <p className="text-xs mt-20">
          {courseClassroomInfo.courseInfo.coursename},{" "}
          <span className="text-xxs">
            {courseClassroomInfo.classroomInfo.classroomname}
          </span>
        </p>
      ) : (
        <p>Loading...</p>
      )}

      <ViewStudentClassroomTabs props={props} />
    </React.Fragment>
  );
};
export default ViewStudentClassroom;
