import React from "react";
import GrayEcllipse from "../../assets/images/img/default-ellipse.svg";
import GrayLeftArt from "../../assets/images/img/default-l-art.svg";
import "./Theme.scss";

const GrayAuthTheme = ({ children }) => {
  return (
    <>
      <section className="PrimaryDesignFirst">
        <div className="primaryEcllipse">
          <img src={GrayEcllipse} alt="" />
        </div>
        <div className="instituteLArt">
          <img src={GrayLeftArt} alt="" />
        </div>
      </section>
      <section className="">{children}</section>
    </>
  );
};

export default GrayAuthTheme;
