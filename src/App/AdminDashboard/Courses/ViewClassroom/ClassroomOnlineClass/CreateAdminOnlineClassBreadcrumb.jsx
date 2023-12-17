import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../../../Common/Theme/GrayAuthTheme";
import OnlineClass from "../../../../OnlineClasses/ClassesCreate/OnlineClass";

const CreateAdminOnlineClassBreadCrumb = () => {
  const { _id } = useParams()
  const { _classroomId, _subjectId } = useParams()

  return (
    <React.Fragment>
       <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/school-admin-course"
            title="Classroom"
          />
          <BreadcrumbItem to={`/edit-course/${_classroomId}`} title="Edit Classroom" />
          <BreadcrumbItem
            to={`/view-classroom/${_subjectId}`}
            title="Subject"
          />
          <BreadcrumbItem
            to={_id ? `/edit-admin-onlineClass/${_id}/${_classroomId}/${_subjectId}` : `/create-admin-onlineClass/${_classroomId}/${_subjectId}`}
            title={_id ? "Edit Online Class" : "Create Online Class"}
          />
        </Breadcrumb>
      {/* </div> */}
      <OnlineClass />

    </React.Fragment>
  )
}
export default CreateAdminOnlineClassBreadCrumb;