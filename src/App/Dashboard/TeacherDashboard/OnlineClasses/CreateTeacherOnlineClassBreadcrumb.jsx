import React from 'react';
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import { useParams } from 'react-router-dom'
import Breadcrumb from "../../../../Common/Breadcrumb/index";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem"
import OnlineClass from '../../../OnlineClasses/ClassesCreate/OnlineClass';
const CreateTeacherOnlineClassBreadCrumb = () => {
  const { _id } = useParams()
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/teacher-online-class"
          title="Online Classes"
        />
        <BreadcrumbItem
          to={_id ? `/dashboard/teacher/edit-online-class/${_id}` : `/dashboard/teacher/create-online-class`}
          title={_id ? "Edit Online Class" : "Create Online Class"}
        />
      </Breadcrumb>
      <OnlineClass />
    </React.Fragment>
  )
}
export default CreateTeacherOnlineClassBreadCrumb