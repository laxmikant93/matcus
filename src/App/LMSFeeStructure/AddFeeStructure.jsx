import React from "react";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import FeeStructureDetail from "./FeeStructureDetail";
import "./FeeStructure.scss";
const AddFeeStructure = () => {
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/fee-management" title="Fee Management" />
        <BreadcrumbItem to="/add-lms-fee-structure" title="Add Fee Structure" />
      </Breadcrumb>
      <FeeStructureDetail />
    </React.Fragment>
  );
};

export default AddFeeStructure;
