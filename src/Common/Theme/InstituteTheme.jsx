import React from "react";
import InstituteEcllipse from "../../assets/images/img/institute-ecllipse.svg";
import InstituteLeftArt from "../../assets/images/img/institute-l-art.svg";
import "./Theme.scss";
const InstituteTheme = ({ children }) => {
  return (
    <>
      <section className="PrimaryDesignFirst">
        <div className="primaryEcllipse">
          <img src={InstituteEcllipse} alt="" />
        </div>
        <div className="instituteLArt">
          <img src={InstituteLeftArt} alt="" />
        </div>
      </section>
      <section className="">{children}</section>
    </>
  );
};

export default InstituteTheme;
