import { bool } from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import AppLinkUrl from "./AppLinkUrl";

const AppLink = (props) => {
  let isSubdomain = false;
  let { to, createsubdomain, extendUrl } = props;
  isSubdomain = createsubdomain ? createsubdomain : isSubdomain;
  return (
    <React.Fragment>
      {isSubdomain ? (
        <a href={AppLinkUrl.createSubdomain(to, extendUrl)} {...props}>
          {props.hasOwnProperty("children") ? props.children : props.title}
        </a>
      ) : AppLinkUrl.subdomain() ? (
        <a href={AppLinkUrl.mainBaseUrl(to)} {...props}>
          {props.hasOwnProperty("children") ? props.children : props.title}
        </a>
      ) : (
        <NavLink exact={true} to={props.to} {...props}>
          {props.hasOwnProperty("children") ? props.children : props.title}
        </NavLink>
      )}
    </React.Fragment>
  );
};

// AppLink.defaultProps = {
//     createsubdomain: false,
// }

AppLink.propTypes = {
  createsubdomain: bool,
};

export default AppLink;
