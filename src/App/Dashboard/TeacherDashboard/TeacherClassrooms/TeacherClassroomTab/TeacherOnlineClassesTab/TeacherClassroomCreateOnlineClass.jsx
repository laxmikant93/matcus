import React from 'react';
import GrayAuthTheme from "../../../../../../Common/Theme/GrayAuthTheme";
import { useParams } from "react-router-dom"
import Breadcrumb from '../../../../../../Common/Breadcrumb/index';
import BreadcrumbItem from '../../../../../../Common/Breadcrumb/BreadcrumbItem'
import OnlineClass from '../../../../../OnlineClasses/ClassesCreate/OnlineClass';
const TeacherClassroomCreateOnlineClass = () => {
  const { _id, _classroomId, _subjectId } = useParams()
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/teacher-classrooms-list"
          title="Classroom"
        />
        <BreadcrumbItem to={`/dashboard/teacher/subject-list/${_classroomId}`} title="Subject" />
        <BreadcrumbItem
          to={`/dashboard/teacher/${_classroomId}/view-classroom/${_subjectId}`}
          title="View Subject"
        />
        <BreadcrumbItem
          to={_id ? `/dashboard/teacher/edit-subject-onlineclass/${_id}/${_classroomId}/${_subjectId}` : `/dashboard/teacher/create-subject-onlineclass/${_classroomId}/${_subjectId}`}
          title={_id ? "Edit Online Class" : "Create Online Class"}
        />
      </Breadcrumb>
      <OnlineClass />
    </React.Fragment>
  )
}
export default TeacherClassroomCreateOnlineClass