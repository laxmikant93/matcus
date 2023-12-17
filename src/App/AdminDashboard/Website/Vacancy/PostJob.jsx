import React from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import PostJobDetail from "./PostJobDetail";
const PostJob = () => {
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/vacancy-list" title="Vacancy" />
        <BreadcrumbItem to="/post-job" title="Post Job" />
      </Breadcrumb>
      <div className="PageTopHead mt-30">
        <div className="PTH-Item">
          <p className="text-sm">Post Job</p>
        </div>
      </div>
      <PostJobDetail />
    </React.Fragment>
  );
};

export default PostJob;
