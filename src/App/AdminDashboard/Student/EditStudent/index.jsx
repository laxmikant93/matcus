import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import { DynamicCourseHeader } from "../../../../Common/UserElement";
import {
  clearStudentEdit,
  getStudentUserInfoDataId,
} from "../../../../store/actions/studentlistuserinfo";
import EditStduentCourse from "./EditStudentCourse";
import PersonalDetails from "./PersonalDetails";
import "./MultipleCourse.scss";

const EditStudent = () => {
  const { _id } = useParams();
  const { users } = useSelector((state) => {
    return {
      users: state.user,
    };
  });
  const studentDetails = useSelector(
    (state) => state.studentlistuserinfo.dataid
  );
  const [toggleState, setToggleState] = useState(false);
  const handlePersonalDetails = () => {
    setToggleState(false);
  };
  const handleCourse = () => {
    setToggleState(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentUserInfoDataId(_id, users.user_institute));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearStudentEdit());
    };
  }, [dispatch]);
  return (
    <React.Fragment>
      <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/invite-student-list" title=" Student List" />
          <BreadcrumbItem to={`/edit-student/${_id}`} title="Edit Student" />
        </Breadcrumb>

        <div className="student_list_heading_row">
          <div>
            <h1 className="student_name_heading w-200">
              {studentDetails.data.StudentData_fullname}
            </h1>
            <p className="sub-heading primary text-xxs w-500 mb-20">
              {studentDetails.data.StudentData_email}
            </p>
          </div>

          <div>
            {" "}
            <h3 className="admission_number_students w-300 text-right text-xxs">
              {" "}
              Admission Number
            </h3>
            <p className=" admission_number_show w-300 text-right text-xs">
              {studentDetails.data.StudentData_admission_no}
            </p>
          </div>
        </div>
        <div className="studentmaintogglebtn">
          <button
            className={
              !toggleState
                ? "button button-primary btn-sm"
                : "button btn-sm btn-o-primary primary"
            }
            onClick={handlePersonalDetails}
          >
            Personal Details
          </button>
          <button
            className={
              toggleState
                ? "button button-primary btn-sm  w-115"
                : "button btn-sm btn-o-primary primary"
            }
            onClick={handleCourse}
          >
            <DynamicCourseHeader />{" "}
          </button>
        </div>
        {studentDetails.success ? (
          toggleState ? (
            <EditStduentCourse userType="Student" />
          ) : (
            <PersonalDetails />
          )
        ) : (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        )}
    </React.Fragment>
  );
};
export default EditStudent;
