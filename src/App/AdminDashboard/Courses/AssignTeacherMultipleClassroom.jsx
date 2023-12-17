import React, { useEffect } from 'react';
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import { DynamicCourseHeader } from '../../../Common/UserElement';
import { useParams } from 'react-router';
import EditStduentCourse from '../Student/EditStudent/EditStudentCourse';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentUserInfoDataIdFaculty } from '../../../store/actions/studentlistuserinfo';
const AssignTeacherMultipleClassroom = () => {
  const { _courseId } = useParams()
  const { _id } = useParams()
  const dispatch = useDispatch()
  const { facultyData, facultySuccess } = useSelector((state) => {
    return {
      facultyData: state.studentlistuserinfo.dataid.data,
      facultySuccess: state.studentlistuserinfo.dataid.success
    }
  })
  useEffect(() => {
    dispatch(getStudentUserInfoDataIdFaculty(_id));
  }, [_id, dispatch])
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
        <div className="PageTopHead PTH-EditFaculty mt-20">
          <div className="PTH-Item">
            <p className="heading dgray text-sm w-300">{facultySuccess ? facultyData.fullname : "Loading..."}</p>
            <p className="sub-heading primary">{facultySuccess ? facultyData.email : "Loading..."}</p>
          </div>
        </div>
        <EditStduentCourse userType="Teacher" />
    </React.Fragment>
  )
}
export default AssignTeacherMultipleClassroom