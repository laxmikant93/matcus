import React, { useEffect, useState } from 'react';
import CreateCourse from '../AdminCourse/CreateCourse/index'
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { useParams,useLocation } from 'react-router';
const CreateCourseTeacher = (props) => {
  const [idToggle, setIdToggle] = useState("")
  const { _id } = useParams()
  const location=useLocation()
  useEffect(() => {
    if (_id  && location?.state && location?.state?.savedInfo) {
      setIdToggle("CourseContents")
    }
  }, [_id,location])
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/dashboard/teacher/course-list" title="Material" />
        <BreadcrumbItem to={_id ? `/dashboard/teacher-edit-course/${_id}` : `/dashboard/teacher-create-course`} title="Create Material" />
      </Breadcrumb>

      <CreateCourse idToggle={idToggle} />
    </React.Fragment>
  )
}
export default CreateCourseTeacher;