import React from "react";
import "./Theme.scss";

const CommonArtTheme = ({ children }) => {
  return (
    <>
      <section className="TopDesignCustom">
        <div className="leftTopCustom">
          <span className="bCircle"></span>
          <span className="sCircle"></span>
        </div>
        <div className="rightTopCustom">
          <ul>
            <li>
              <span></span>
            </li>
            <li></li>
            <li>
              <span></span>
            </li>
            <li></li>
            <li>
              <span></span>
            </li>
          </ul>
        </div>
      </section>

      {children}
    </>
  );
};

export default CommonArtTheme;
