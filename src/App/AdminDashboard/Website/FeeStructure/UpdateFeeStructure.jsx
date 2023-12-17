import React from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import FeeStructureDetail from "./FeeStructureDetail";
import { useParams } from "react-router";

const UpdateFeeStructure = () => {
  let doUpdate = true;
  const { id } = useParams();

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/fee-structure" title="Fee Structure" />
        <BreadcrumbItem
          to={`/update-fee-structure/${id}`}
          title="Update Fee Structure"
        />
      </Breadcrumb>
      <div className="AddTestimonialHead mt-30">
        <p className="text-sm w-500">Edit Fee Structure</p>
      </div>
      <FeeStructureDetail doUpdate={doUpdate} />
    </React.Fragment>
  );
};

export default UpdateFeeStructure;
