import React from "react";
import GrayEcllipse from "../../assets/images/img/default-ellipse.svg";
import CommunityLeftArt from "../../assets/images/img/CommunityLeftArt.svg";

import "./Theme.scss";

const CommunityTheme = ({ children }) => {
  return (
    <>
      <section className="PrimaryDesignFirst">
        <div className="primaryEcllipse">
          <img src={GrayEcllipse} alt="" />
        </div>
        <div className="instituteLArt">
          <img src={CommunityLeftArt} alt="" />
        </div>
      </section>
      <section className="">{children}</section>
    </>
  );
};

export default CommunityTheme;
