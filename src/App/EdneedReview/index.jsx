import React from "react";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import ReviewList from "./ReviewList";
import "./EdneedReview.scss";
const EdneedReview = () => {
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/edneed-review-list" title="Review List" />
      </Breadcrumb>
      <ReviewList />
    </React.Fragment>
  );
};

export default EdneedReview;
