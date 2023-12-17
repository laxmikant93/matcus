import { string } from "prop-types";
import { bool } from "prop-types";
import React from "react";

const RoleItem = ({ active, role, icon, title, className, onSelect }) => {
  return (
    <div
      className={`RoleItem ${active ? "active" : ""}`}
      onClick={() => onSelect(role)}
    >
      <i className={`ed-icon i-65 ${icon}`}></i>
      <p className={`text-xxs ${className}`}>{title}</p>
    </div>
  );
};

RoleItem.defaultProps = {
  active: false,
  role: undefined,
  icon: undefined,
  title: undefined,
  onSelect: () => { },
};

RoleItem.propTypes = {
  active: bool,
  role: string,
  icon: string,
  title: string,
  onSelect: () => { },
};

export default RoleItem;
