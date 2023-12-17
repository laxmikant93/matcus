import React from "react";
import { Route } from "react-router-dom";
import AccessDenied from "../ErrorPage/AccessDenied";
import { UserActiveRole, UserRoleAccess } from "../Common/UserElement";

export const TeacherRoute = props => {
  return (UserActiveRole() === process.env.REACT_APP_TEACHER || UserActiveRole() === process.env.REACT_APP_EMPLOYEE) && UserRoleAccess().includes(props.access) ? (
    <Route {...props} />
  ) : (
    <Route  {...props} component={AccessDenied} />
  )
};

export const StudentRoute = props => {
  return UserActiveRole() === process.env.REACT_APP_STUDENT ? (
    <Route {...props} />
  ) : (
    <Route {...props} component={AccessDenied} />
  )
};

export const OwnerRoute = props => {
  return <Route {...props} />
  // ) : (
  //   <Route {...props} component={AccessDenied} />
  // )
};

// export const MiddlewareRoute = props => {
//   return UserRoleAccess().includes(props.access) ? (
//     <Route {...props} />
//   ) : (
//     <Route {...props} component={AccessDenied} />
//   )
// }

