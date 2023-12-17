import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getFaculty } from "../../../../store/actions/manageFaculty";
const FacultyRoute = () => {
  const dispatch = useDispatch();

  const { users, facultyList, facultySuccess, businesstype } = useSelector((state) => {
    return {
      users: state.user,
      facultySuccess: state.manageFaculty.facultyList.success,
      facultyList: state.manageFaculty.facultyList.data,
      businesstype: state.user.user_business_type,
    };
  });

  useEffect(() => {
    dispatch(getFaculty(users.user_institute, businesstype));
  }, [dispatch, users]);

  const redirectToSection = () => {
    return facultySuccess && facultyList && facultyList.length > 0 ? (
      <Navigate to="/manage-faculty" />
    ) : (
      <Navigate to="/add-faculty" />
    );
  };

  return (
    <React.Fragment>
      <div style={{ padding: 100 }}>
        {!facultySuccess ? (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        ) : (
          facultySuccess && redirectToSection()
        )}
      </div>
    </React.Fragment>
  );
};

export default FacultyRoute;
