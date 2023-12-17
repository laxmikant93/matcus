import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getEmployeeList } from "../../../store/actions/employee";
import { getFacultyUserInfoData } from "../../../store/actions/studentlistuserinfo";
const TeacherDashboardRoute = () => {
  const dispatch = useDispatch();

  const { users, faculty, facultySuccess, employeeList, employeeListSuccess } = useSelector((state) => {
    return {
      users: state.user,
      facultySuccess: state.studentlistuserinfo.list.success,
      faculty: state.studentlistuserinfo.list.data,
      employeeList: state.employee.list.data,
      employeeListSuccess: state.employee.list.success
    };
  });

  useEffect(() => {
    dispatch(
      getFacultyUserInfoData(
        users.user_institute,
        process.env.REACT_APP_TEACHER, "teacher", 10, 0
      )
    );
  }, [dispatch, users]);
  useEffect(() => {
    dispatch(getEmployeeList(users.user_institute, "employee"))
  }, [dispatch, users.user_institute])

  const redirectToSection = () => {
    return facultySuccess && employeeListSuccess && (faculty.length > 0 || employeeList.length > 0) ? (
      <Navigate to="/invite-faculty-list" />
    ) : (
      <Navigate to="/invite-faculty" />
    );
  };

  return (
    <React.Fragment>
      <div style={{ padding: 100 }}>
        {!facultySuccess || !employeeListSuccess ? (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        ) : (
          facultySuccess && employeeListSuccess && redirectToSection()
        )}
      </div>
    </React.Fragment>
  );
};
export default TeacherDashboardRoute;
