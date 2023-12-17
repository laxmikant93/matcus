import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Storage from '../../../../../../Classes/Storage';
// import Storage from '../../../../Classes/Storage';
import Breadcrumb from '../../../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from '../../../../../../Common/Theme/GrayAuthTheme';
import CreateCourse from '../../../../../Course/AdminCourse/CreateCourse';

const ViewClassroomCreateTeacherCourse = (props) => {
  const [idToggle, setIdToggle] = useState("")
  const { _id, _classroomId } = useParams()
  const subjectId = Storage.alive('__wz_crse__') ? Storage.getJson('__wz_crse__') : ""
  useEffect(() => {
    if (_id && props && props?.history?.location.state && props?.history?.location.state.savedInfo) {
      setIdToggle("CourseContents")
    }
  }, [_id, props])
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/" title="Classroom" />
        <BreadcrumbItem to={`/dashboard/teacher/subject-list/${_classroomId}`} title="Subjects" />
        {
          window.location.pathname.includes('create-teacherClassroom-course') ?
            <BreadcrumbItem to={`/dashboard/teacher/${_classroomId}/view-classroom/${subjectId}`} title="View Classroom" /> :
            window.location.pathname.includes('edit-teacherClassroom-course') ?
              <BreadcrumbItem to={`/dashboard/teacher/${_classroomId}/view-classroom/${subjectId}`} title="View Classroom" /> : ""
        }

        <BreadcrumbItem to={_id ? `/dashboard/edit-teacherClassroom-course/${_id}/${_classroomId}` : `/dashboard/create-teacherClassroom-course/${_classroomId}`} title="Create New Course" />
        {/* <BreadcrumbItem to={_id ? `/edit-courses/${_id}` : `/create-course`} title="Create New Course" /> */}

      </Breadcrumb>
      <CreateCourse idToggle={idToggle} />
    </React.Fragment>
  )
}
export default ViewClassroomCreateTeacherCourse;