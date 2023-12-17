import React from "react";
import CircularLEftArt from "../../assets/images/img/common-circular-leftart.svg";
import "./Theme.scss";

const CommonArtTheme = ({ children }) => {
  return (
    <>
      <section className="PrimaryDesignFirst">
        <div className="CircularLEftArt">
          <img src={CircularLEftArt} alt="" />
        </div>
      </section>
      <section className="">{children}</section>
    </>
  );
};

export default CommonArtTheme;
