import React, { useEffect, useState } from 'react';
import CreateCourse from './index'
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import { useParams,useLocation } from 'react-router';
const CreateNewCourse = (props) => {
  const [idToggle, setIdToggle] = useState("")
  const location=useLocation()
  const { _id } = useParams()
  console.log(location,"jooj")
  useEffect(() => {
    if (_id  && location?.state &&location?.state?.savedInfo) {
      setIdToggle("CourseContents")
    }
  }, [_id, location])
  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/course" title="Study Materials" />
          <BreadcrumbItem to={_id ? `/edit-courses/${_id}` : `/create-course`} title="Create New Material" />
        </Breadcrumb>

        <CreateCourse idToggle={idToggle} />

      </React.Fragment>
    </React.Fragment>
  )
}
export default CreateNewCourse;