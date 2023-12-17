import React from "react";
import logo from "../../assets/images/logo/edneed-logo.svg";

import SiteUnderMaintenanceMain from "../../assets/images/img/SiteUnderMaintenanceMain.svg";
import SiteUnderMaintenanceBottomArt from "../../assets/images/img/SiteUnderMaintenanceBottomArt.svg";
import "./SiteUnderMaintenance.scss";

const SiteUnderMaintenance = () => {
  return (
    <React.Fragment>
      <div className="SiteUnderMaintenanceWrapper">
        <img src={logo} alt="Edneed Logo" />
        <p className="text-md w-600 mt-50">Website is</p>
        <p className="text-2xl underline bsPink w-600">under maintenance</p>
        <p className="text-xs mt-30">
          We are improving our website and will be back
        </p>
        <p className="text-xs mt-3">shortly with new and amazing features.</p>
        <p className="text-xs bsPink mt-50">Thank you for your patience.</p>
        <div className="UnderMaintenanceBannerImage">
          <img src={SiteUnderMaintenanceMain} alt="ArtWork" />
        </div>
        <div className="UnderMaintenanceBottomArt">
          <img src={SiteUnderMaintenanceBottomArt} alt="ArtWork" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SiteUnderMaintenance;
