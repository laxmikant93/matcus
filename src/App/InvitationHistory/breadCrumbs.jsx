import React from "react";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
const breadCrumbs = ({ studentHistory, teacherHistory }) => {

  return (
    <React.Fragment>
      {
        studentHistory ? (
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem to="/invite-student-list" title="Student" />
            <BreadcrumbItem
              to="/invite-students-history"
              title="Invitation History"
            />
          </Breadcrumb >

        ) : (
          <React.Fragment>
            {teacherHistory ? (
              <Breadcrumb>
                <BreadcrumbItem to="/" title="Dashboard" />
                <BreadcrumbItem to="/invite-faculty-list" title="Teacher" />
                <BreadcrumbItem
                  to="/invite-faculty-history"
                  title="Invitation History"
                />
              </Breadcrumb>
            )
              : (<p>Loading...</p>)
            }

          </React.Fragment>
        )

      }
    </React.Fragment>
  )
}
export default breadCrumbs;