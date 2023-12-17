import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Storage from '../../../../Classes/Storage';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from '../../../../Common/Theme/GrayAuthTheme';
import CreateCourse from '../../../Course/AdminCourse/CreateCourse';

const ViewClassroomCreateCourse = (props) => {
  const [idToggle, setIdToggle] = useState("")
  const { _id, _classroomId } = useParams()

  const courseId = Storage.alive('__wz_crse__') ? Storage.getJson('__wz_crse__') : ""
  // useEffect(() => {
  //   if (_id && props && props.history.location.state && props.history.location.state.savedInfo) {
  //     setIdToggle("CourseContents")
  //   }
  // }, [_id, props])
  return (
    <React.Fragment>
       <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/school-admin-course" title="Classroom" />
          <BreadcrumbItem to={`/edit-course/${courseId}`} title="Edit Classroom" />
          {
            window.location.pathname.includes('create-admin-course') ?
              <BreadcrumbItem to={`/view-classroom/${_classroomId}`} title="View Classroom" /> :
              window.location.pathname.includes('edit-admin-course') ?
                <BreadcrumbItem to={`/view-classroom/${_classroomId}`} title="View Classroom" /> : ""
          }

          <BreadcrumbItem to={_id ? `/edit-admin-course/${_id}/${_classroomId}` : `/create-admin-course/${_classroomId}`} title="Create New Course" />
        </Breadcrumb>
        <CreateCourse idToggle={idToggle} />
    </React.Fragment>
  )
}
export default ViewClassroomCreateCourse;