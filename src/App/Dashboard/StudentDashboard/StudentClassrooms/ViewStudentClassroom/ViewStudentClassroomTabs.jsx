/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ViewStudentClassroomAssignments from "./ViewStudentClassroomAssignments";
import ViewStudentClassroomOnlineClasses from "./ViewStudentClassroomOnlineClasses";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ViewStudentClassroomCourses from "./ViewStudentClassroomCourses";
import ViewStudentClassroomTeacher from "./ViewStudentClassroomTeacher";
// import OnlineTestTab from "./OnlineTestTab"
import "./StudentViewClassroom.scss"
// import StudentAssignmentView from "../../StudentAssignmentView";

const ViewStudentClassroomTabs = ({ props }) => {
  const [toggle, setToggle] = useState(props && props.history && props?.history?.location && props?.history?.location.state ? "Assignments" : "OnlineClasses");
  const dispatch = useDispatch();
  const { classroomId } = useParams();

  useEffect(() => {
    // dispatch(ClassroomIDFetch(classroomId))
  }, [classroomId, dispatch]);

  return (
    <React.Fragment>
      <div className="StudentHeroTabBar">
        <div className="StudentHeroTabBarCst scroll-nav-tab-wrapper">
          <ul className="StudentHeroTabList scroll-nav-tab">
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
              className={toggle === "Teachers" ? "active" : ""}
              onClick={() => setToggle("Teachers")}
            >
              Teachers
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
      <div className="ProfileTabListContent">
        {toggle === "OnlineClasses" ? (
          // <ViewClassroomOnlineClasses />
          <ViewStudentClassroomOnlineClasses />
        ) : toggle === "Assignments" ? (
          <ViewStudentClassroomAssignments />
        )
          //  : toggle === "OnlineTest" ? (
          //   <OnlineTestTab />
          // )
          : toggle === "Courses" ? (
            // <ViewClassroomTeachers />
            <ViewStudentClassroomCourses />
          ) : toggle === "Teachers" ? (
            <ViewStudentClassroomTeacher />
          ) : (
            ""
          )}
      </div>
    </React.Fragment>
  );
};

export default ViewStudentClassroomTabs;
