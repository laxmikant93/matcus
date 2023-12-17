import React from "react";
// import InstituteWebsiteLLeftArt from "../../assets/images/img/InstituteWebsiteLLeftArt.svg";
import InstituteWebsiteLRightArt from "../../assets/images/img/InstituteWebsiteLRightArt.svg";
import "./Theme.scss";

const PrimaryAuthTheme = ({ children }) => {
  return (
    <>
      <section className="PrimaryDesignFirst">
        <div className="website-left-art">
          {/* <img src={InstituteWebsiteLLeftArt} alt="" /> */}
          <div className="pngiconwrapper">
            <div className="circle_previewleftpngimag"></div>
            <div className="blackCrickePreview">
              <div className="roater_pngposition">
                <span className="previewiconlineone"></span>
                <span className="previewiconlineone mt-5"></span>
                <span className="previewiconlineone mt-5"></span>
                <span className="previewiconlineone mt-5"></span>
                <span className="previewiconlineone mt-5"></span>
              </div>
            </div>
            <div className="small_circle_blackpreview"></div>
            <div className="verysmall_circle_blackpreview"></div>
          </div>
        </div>
        {/* <div className="website-right-art">
          <img src={InstituteWebsiteLRightArt} alt="" />
        </div> */}
      </section>

      <section className="AdminContentSection">{children}</section>
    </>
  );
};

export default PrimaryAuthTheme;
