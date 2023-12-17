/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';

const TeacherAttendanceListBreadcrumbs = () => {
  const { _classroomId, _subjectId } = useParams()
  const { user, ClassroomDetail, ClassroomDetailSuccess } = useSelector((state) => {
    return {
      user: state.user,
      ClassroomDetail: state.classroomDetail.classrooomData.data,
      ClassroomDetailSuccess: state.classroomDetail.classrooomData.success,
    }
  })
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {
          user.user_activeRole === process.env.REACT_APP_TEACHER ?

            <BreadcrumbItem to="/dashboard/attendance-teacher-classroomSubjectlist" title="Attendance" /> :

            <BreadcrumbItem to="/admin-attendance-classroomSubjectlist" title="Attendance" />
        }
        {
          _subjectId ?
            <BreadcrumbItem to="#" title={`${ClassroomDetailSuccess ? ClassroomDetail.data_courseInfo_coursename : ""}, ${ClassroomDetailSuccess ? ClassroomDetail.data_classroomInfo_classroomname : ""}`} />
            :
            <BreadcrumbItem to="#" title={`${ClassroomDetailSuccess ? ClassroomDetail.coursename : ""}`} />

        }
      </Breadcrumb>
    </React.Fragment>
  )
}
export default TeacherAttendanceListBreadcrumbs