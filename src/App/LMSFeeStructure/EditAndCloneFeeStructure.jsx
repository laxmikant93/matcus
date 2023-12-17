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
        <BreadcrumbItem to={`/clone-edit-lms-fee-structure/${id}`} title="Clone & Edit Fee Structure" />

      </Breadcrumb>
      {doUpdate &&
        <div className="mt-20">
          <p className="text-sm w-500">Clone & Edit Fee Structure</p>
        </div>
      }

      <FeeStructureDetail CloneAndEdit="clone" feeStructureId={id} />
    </React.Fragment>
  );
};

export default UpdateFeeStructure;
