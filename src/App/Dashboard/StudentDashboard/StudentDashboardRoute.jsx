import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getStudentUserInfoData } from "../../../store/actions/studentlistuserinfo";
import "./StudentDashboard.scss";

const StudentDashboardRoute = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  const student = useSelector(
    (state) => state.studentlistuserinfo.studentdatainfo.success
  );
  const studentData = useSelector(
    (state) => state.studentlistuserinfo.studentdatainfo.data
  );
  useEffect(() => {
    let limit = 10;
    let skip = 0
    dispatch(
      getStudentUserInfoData(
        users.user_institute,
        process.env.REACT_APP_STUDENT, "student", limit, skip, "LMS"
      )
    );
  }, [dispatch, users]);

  const redirectToSection = () => {
    return student && studentData.length > 0 ? (
      <Navigate to="/invite-student-list" />
    ) : (
      <Navigate to="/invite-students" />
    );
  };

  return (
    <React.Fragment>
      <div style={{ padding: 100 }}>
        {!student ? (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        ) : (
          student && redirectToSection()
        )}
      </div>
    </React.Fragment>
  );
};

export default StudentDashboardRoute;
