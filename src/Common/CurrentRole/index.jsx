import { bool } from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

const CurrentRole = ({ showTitle }) => {
  const userdetail = useSelector((state) => state.user);

  const getRoleText = () => {
    switch (userdetail.user_activeRole) {
      case process.env.REACT_APP_TEACHER:
        return "Teacher";
      case process.env.REACT_APP_STUDENT:
        return "Student";
      case process.env.REACT_APP_PAGE_OWNER:
        return "Institute Admin";
      case process.env.REACT_APP_EMPLOYEE:
        return "Employee";
      default:
        return "Not Assigned";
    }
  };

  return (
    <div className="current-user-role">
      {showTitle && <p className="text-xxs w-300 gray">Current user role</p>}

      <p className="roleName">{getRoleText()}</p>
    </div>
  );
};

CurrentRole.defaultProps = {
  showTitle: true,
};

CurrentRole.propTypes = {
  showTitle: bool,
};

export default CurrentRole;
