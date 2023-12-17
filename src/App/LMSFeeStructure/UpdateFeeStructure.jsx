import React from "react";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import FeeStructureDetail from "./FeeStructureDetail";
import { useParams } from "react-router";

const UpdateFeeStructure = () => {
  let doUpdate = true;
  const { id } = useParams();

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/fee-management" title="Fee Management" />
        <BreadcrumbItem to={`/update-lms-fee-structure/${id}`} title="Update Structure" />

      </Breadcrumb>
      {doUpdate &&
        <div className="mt-20">
          <p className="text-sm w-500">Edit Fee Structure</p>
        </div>
      }

      <FeeStructureDetail doUpdate={doUpdate} feeStructureId={id} />
    </React.Fragment>
  );
};

export default UpdateFeeStructure;
