import React, { useState } from "react";
import ViewClassroomTeachers from "./ViewClassroomTeachers";
import ViewClassroomAssignments from "./ViewClassroomAssignments";
import ViewClassroomOnlineClasses from "./ViewClassroomOnlineClasses";
import ViewClassroomOnlineTest from "./ViewClassroomOnlineTest";
import ViewClassroomStudents from "./ViewClassroomStudents";
import ViewClassroomCourses from "./ViewClassroomCourses";
import { useLocation } from "react-router-dom";

const EdneedVideoTabs = (props) => {
  const {location} = useLocation()
  const [toggle, setToggle] = useState(
    props?.props?.history?.location?.state &&
      props?.props?.history?.location?.state?.adminToggle
      ? "OnlineTest"
      : props?.props?.history?.location?.state &&
        props?.props?.history?.location?.state?.adminCourseToggle
        ? "Courses"
        : "OnlineClasses"
  );


  return (
    <React.Fragment>
      <div className="ViewClassroomTabBar mt-5">
        <div className="adminViewClassroomTabBarCst scroll-nav-tab-wrapper">
          <ul className="adminViewClassroomTabList scroll-nav-tab">
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
            <li
              className={toggle === "OnlineTest" ? "active" : ""}
              onClick={() => setToggle("OnlineTest")}
            >
              Online Tests
            </li>
            <li
              className={toggle === "Teachers" ? "active" : ""}
              onClick={() => setToggle("Teachers")}
            >
              Teachers
            </li>
            <li
              className={toggle === "Students" ? "active" : ""}
              onClick={() => setToggle("Students")}
            >
              Students
            </li>
            <li
              className={toggle === "Courses" ? "active" : ""}
              onClick={() => setToggle("Courses")}
            >
              Study Materials
            </li>
          </ul>
        </div>
      </div>
      <>
        {toggle === "OnlineClasses" ? (
          <ViewClassroomOnlineClasses />
        ) : toggle === "Assignments" ? (
          <ViewClassroomAssignments />
        ) : toggle === "OnlineTest" ? (
          <ViewClassroomOnlineTest />
        ) : toggle === "Teachers" ? (
          <ViewClassroomTeachers />
        ) : toggle === "Students" ? (
          <ViewClassroomStudents />
        ) : toggle === "Courses" ? (
          <ViewClassroomCourses />
        ) : (
          <ViewClassroomOnlineClasses />
        )}
      </>
    </React.Fragment>
  );
};

export default EdneedVideoTabs;
