import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  readCoursesHeader,
  resetCourseHeader,
} from "../../../store/actions/courseHeader";
import { Navigate } from "react-router-dom";
function CourseRoute() {
  const dispatch = useDispatch();

  const { users, courseHeader, courseHeaderSuccess } = useSelector((state) => {
    return {
      users: state.user,
      courseHeaderSuccess: state.courseHeader.list.success,
      courseHeader: state.courseHeader.list.data,
    };
  });

  useEffect(() => {
    dispatch(readCoursesHeader(users.user_institute));
  }, [dispatch, users]);

  const redirectToSection = () => {
    return courseHeaderSuccess && courseHeader ? (
      <Navigate to="/school-admin-course" />
    ) : (
      <Navigate to="/add-course-header" />
    );
  };
  useEffect(() => {
    return () => {
      dispatch(resetCourseHeader());
    };
  }, [dispatch]);
  return (
    <React.Fragment>
      <div style={{ padding: 100 }}>
        {!courseHeaderSuccess ? (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        ) : (
          courseHeaderSuccess && redirectToSection()
        )}
      </div>
    </React.Fragment>
  );
}
export default CourseRoute;
