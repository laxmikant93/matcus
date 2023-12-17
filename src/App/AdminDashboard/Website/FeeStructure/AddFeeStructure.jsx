import React from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import FeeStructureDetail from "./FeeStructureDetail";
const AddFeeStructure = () => {
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/fee-structure" title="Fee Structure" />
        <BreadcrumbItem to="/add-fee-structure" title="Add Fee Structure" />
      </Breadcrumb>
      <div className="AddTestimonialHead mt-30">
        <p className="text-sm w-500">Add Fee Structure</p>
      </div>
      <FeeStructureDetail />
    </React.Fragment>
  );
};

export default AddFeeStructure;
