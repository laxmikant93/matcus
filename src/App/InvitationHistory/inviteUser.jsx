import React from "react";
import AppLink from "../../Common/AppLink";
const inviteUser = ({ studentHistory, teacherHistory }) => {
  return (
    <React.Fragment>
      {studentHistory ? (
        <AppLink
          to="/invite-students"
          className="button button-primary btn-oval btn-sm button-block"
        >
          <i className="ed-icon icon-plus-add white i-xs"></i>Invite
          Student
        </AppLink>
      ) : (
        <React.Fragment>
          {
            teacherHistory ? (
              <AppLink
                to="/invite-faculty"
                className="button button-primary btn-oval btn-sm button-block"
              >
                <i className="ed-icon icon-plus-add white i-xs"></i>Invite
                Teachers
              </AppLink>
            ) : (
              <AppLink
                to=""
                className="button button-primary btn-oval btn-sm button-block"
              >
                <i className="ed-icon icon-plus-add white i-xs"></i>Loading..
              </AppLink>
            )
          }
        </React.Fragment>
      )
      }
    </React.Fragment>
  )
}
export default inviteUser;