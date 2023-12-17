import React from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import ServicesDetail from "./ServicesDetail";
import "./Services.scss";
const AddServices = () => {
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/services-list" title="Services" />
        <BreadcrumbItem to="/add-services" title="Add Services" />
      </Breadcrumb>
      <div className="AddTestimonialHead mt-30">
        <p className="text-sm w-500">Add Services</p>
        <p className="text-xxs">You can add up to 5 services at one time.</p>
      </div>
      <ServicesDetail />
    </React.Fragment>
  );
};

export default AddServices;
