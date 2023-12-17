/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Breadcrumb from "../../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../../Common/Breadcrumb/BreadcrumbItem";
// import GrayAuthTheme from "../../../../../Common/Theme/GrayAuthTheme";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../../Common/UserElement";
import TeacherAssignmentTab from "./TeacherAssignmentTab";
import TeacherOnlineTestTab from "./TeacherOnlineTestTab"
import TeacherCoursesTab from "./TeacherCoursesTab";
import TeacherOnlineClassesTab from "./TeacherOnlineClassesTab";
import TeacherViewStudentsTab from "./TeacherViewStudentsTab";
import "./TeacherViewClassroom.scss";
// import { ClassroomIDFetch } from "../../../../../store/actions/classroomdetail";
import TeacherTheme from "../../../../../Common/Theme/TeacherTheme";
import Storage from "../../../../../Classes/Storage";
import ViewClassroomTeachersTab from "./TeacherViewAllTeachers";
import { ClassroomIDFetch } from "../../../../../store/actions/classroomdetail";
const TeacherClassroomTab = (props) => {
  const { classroomId, subjectId } = useParams();
  const [toggle, setToggle] = useState(props?.history?.location?.state && props?.history?.location?.state?.teacherCourseToggle ? "Courses" : "OnlineClasses");
  const dispatch = useDispatch()
  const { ClassroomDetail, ClassroomDetailSuccess } = useSelector((state) => {
    return {
      ClassroomDetail: state.classroomDetail.classrooomData.data,
      ClassroomDetailSuccess: state.classroomDetail.classrooomData.success,
    };
  });
  useEffect(() => {
    Storage.setJson("__wz_crse__", subjectId);
  }, [subjectId]);
  useEffect(() => {
    dispatch(ClassroomIDFetch(subjectId));
  }, [subjectId, dispatch]);

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/teacher-classrooms-list"
          title={DynamicCourseHeader()}
        />
        <BreadcrumbItem
          to={`/dashboard/teacher/subject-list/${classroomId}`}
          title={DynamicClassroomHeader()}
        />
        <BreadcrumbItem
          to={`/dashboard/teacher/${classroomId}/view-classroom/${subjectId}`}
          title={`View ` + DynamicClassroomHeader()}
        />
      </Breadcrumb>
      {ClassroomDetailSuccess ? (
        <p className="text-sm mt-20">
          {ClassroomDetail.data_courseInfo_coursename},{" "}
          <span className="text-xs">
            {ClassroomDetail.data_classroomInfo_classroomname}
          </span>
        </p>
      ) : (
        <p>Loading...</p>
      )}
      <div className="ViewClassroomTabBar">
        <div className="ViewClassroomTabBarCst scroll-nav-tab-wrapper">
          <ul className="ViewClassroomTabList scroll-nav-tab">
            <li
              className={toggle === "OnlineClasses" ? "active" : ""}
              onClick={() => setToggle("OnlineClasses")}
            >
              Online Classes
            </li>
            <li
              className={toggle === "Assignments" ? "active" : ""}
              onClick={() => setToggle("Assignments")}
            >
              Assignments
            </li>
            {/* <li
                  className={toggle === "OnlineTest" ? "active" : ""}
                  onClick={() => setToggle("OnlineTest")}
                >
                  Online Test
                </li> */}
            <li
              className={toggle === "Students" ? "active" : ""}
              onClick={() => setToggle("Students")}
            >
              Students
            </li>
            <li
              className={toggle === "Teachers" ? "active" : ""}
              onClick={() => setToggle("Teachers")}
            >
              Teachers
            </li>
            <li
              className={toggle === "Courses" ? "active" : ""}
              onClick={() => setToggle("Courses")}
            >
              Study Material
            </li>
          </ul>
        </div>
      </div>
      <div className="ProfileTabListContent">
        {toggle === "OnlineClasses" ? (
          <TeacherOnlineClassesTab />
        ) : toggle === "Assignments" ? (
          <TeacherAssignmentTab />
        )
          // :
          //  toggle === "OnlineTest" ? (
          //   <TeacherOnlineTestTab />
          // ) 
          : toggle === "Students" ? (
            <TeacherViewStudentsTab />
          ) : toggle === "Teachers" ? (
            <ViewClassroomTeachersTab />
          ) : toggle === "Courses" ? (
            <TeacherCoursesTab />
          ) : (
            <TeacherOnlineClassesTab />
          )}
      </div>
    </React.Fragment>
  );
};
export default TeacherClassroomTab;
