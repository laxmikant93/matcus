import React, { useState, useEffect } from "react";
import CommonError from "../../Common/CommonError";
import SuccessMessagePopup from "../../Common/SuccessMessagePopup";
// import Auth from "../../Classes/Auth";
import HomeHeaderAuth from "../Header/HomeHeaderAuth";
// import FreeDemoButton from "../Header/FreeDemoButton";
// import WatchVideoButton from "../Header/WatchVideoButton";
import HeadLogo from "./HeadLogo";
import MenuList from "./MenuList";
import "./SubDomainHeader.scss";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import { useLocation } from "react-router-dom";

const SubDomainHeader = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const pathname = window.location.pathname;
  const location = useLocation();

  return (
    !pathname.includes("/dashboard/student-online-test/") &&
    !pathname.includes("/student/exam-instruction/") && (
      <React.Fragment>
        {
          AppLinkUrl.privateDomain() && location.pathname.includes("/auth/login") ? "" :
            (
              <React.Fragment>
                <header className="sd-header-theme">
                  <div className="headerWrap">
                    <div className="edHeaderSDWrapper">
                      <div
                        className={`edHeaderSDCustom ${windowSize.width <= 700 ? "edHeadMobSD" : ""
                          }`}
                      >
                        <div className="sd-logo-theme-1">
                          <HeadLogo />
                        </div>
                        <HomeHeaderAuth />
                      </div>
                      {
                        (((AppLinkUrl.subdomain() && AppLinkUrl.subdomain() !== "www")) ||
                          AppLinkUrl.privateDomain()) && ['/', '/overview', '/aboutus', '/blogs', '/miscellaneous', '/service_List', '/book_Appointment', '/faculty', '/announcements', '/admission', '/feestructure', '/gallery', '/contactus', '/vacancy', '/services', '/faqs'].includes(window.location.pathname) ?
                          <MenuList /> : ""
                      }
                    </div>
                  </div>
                </header>
              </React.Fragment>
            )
        }
        <CommonError />
        <SuccessMessagePopup />
      </React.Fragment>
    )
  );
};

export default SubDomainHeader;
