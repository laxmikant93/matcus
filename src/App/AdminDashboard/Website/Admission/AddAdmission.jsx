import React from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import AddAdmissionDetail from "./AddAdmissionDetail";
const AddAdmission = () => {
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/admission-list" title="Admission" />
        <BreadcrumbItem to="/add-admission" title="Add Admission" />
      </Breadcrumb>
      <div className="PageTopHead PTH-AdminAddAdmission mt-30">
        <div className="PTH-Item">
          <p className="text-sm capitalize">Create new admission</p>
        </div>
      </div>
      <AddAdmissionDetail />
    </React.Fragment>
  );
};
export default AddAdmission;
