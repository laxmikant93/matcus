import React, { useEffect } from 'react';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme';
import EditStudentCourse from '../Student/EditStudent/EditStudentCourse'
import { useParams } from "react-router-dom";
import { DynamicCourseHeader } from '../../../Common/UserElement';
import { useDispatch, useSelector } from 'react-redux';
import { clearStudentEdit, getStudentUserInfoDataId } from '../../../store/actions/studentlistuserinfo';
const UpdateStudentMultipleCourses = () => {
  const { _id } = useParams()
  const { users } = useSelector((state) => {
    return {
      users: state.user
    }
  })
  const studentDetails = useSelector((state) => state.studentlistuserinfo.dataid);
  const { _courseId } = useParams()
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
          <BreadcrumbItem to="/school-admin-course" title={DynamicCourseHeader()} />
          <BreadcrumbItem
            to={`/edit-course/${_courseId}`}
            title={`Edit ${DynamicCourseHeader()}`}
          />
        </Breadcrumb>
        <div className="student_list_heading_row">
          <div>
            <h1 className="student_name_heading w-200">
              {studentDetails.data.StudentData_fullname}
            </h1>
            <p className="sub-heading primary text-xxs w-500 ">
              {studentDetails.data.StudentData_email}
            </p>
          </div>

          <div> <h3 className="admission_number_students w-300 text-right text-xxs"> Admission Number</h3>
            <p className=" admission_number_show w-300 text-right text-xs">{studentDetails.data.StudentData_admission_no}</p></div>

        </div>
        <EditStudentCourse userType="Student" />
    </React.Fragment>
  )
}
export default UpdateStudentMultipleCourses;