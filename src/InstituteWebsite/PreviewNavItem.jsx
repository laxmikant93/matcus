import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ImageViewer from "../Common/ImageViewer";

const PreviewNavItem = ({ subdomainLogo, title }) => {
  const { heading } = useSelector((state) => state.institutewebsite);

  const bottemNavRef = useRef();
  const handleScroll = (direction) => {
    direction === "left"
      ? (bottemNavRef.current.scrollLeft -= 150)
      : (bottemNavRef.current.scrollLeft += 150);
  };
  return (
    <header className="sd-header-theme">
      <div className="sidePrevCenter">
        <div className="edHeaderSDWrapper">
          <div className="edHeaderSDCustom">
            <div className="sd-logo-theme-1">
              <React.Fragment>
                {subdomainLogo ? (
                  <div className="subdomainlogoWrap">
                    <NavLink to="#">
                      <ImageViewer src={subdomainLogo} alt="sudomain-logo" />
                      <span className="text-sm w-500">{title}</span>
                    </NavLink>
                  </div>
                ) : (
                  <div className="subdomainlogoWrap">{title}</div>
                )}
              </React.Fragment>
            </div>
          </div>
          <div className="subdomainTopNav">
            <div className="nav-tab-menu-scroll">
              <span
                className="bottomNavArrowLeft"
                onClick={() => handleScroll("left")}
              >
                <i className="arrowcustom left"></i>
              </span>

              <div className="scroll-top-menu-wrap" ref={bottemNavRef}>
                <ul className="sd-menuItem">
                  <>
                    <li className="text-xs">{heading && "Home"}</li>
                    <li className="text-xs">{heading && "About"}</li>
                    <li className="text-xs">
                      {" "}
                      {heading.facultyhead
                        ? heading.facultyhead
                        : "Faculty"}{" "}
                    </li>
                    <li className="text-xs">
                      {heading.admissionhead
                        ? heading.admissionhead
                        : "Admission"}
                    </li>
                    <li className="text-xs">
                      {heading.feehead ? heading.feehead : "Fee"}
                    </li>
                    <li className="text-xs">
                      {heading.servicehead ? heading.servicehead : "Service"}
                    </li>
                    <li className="text-xs">
                      {heading.announcementhead
                        ? heading.announcementhead
                        : "Announcement"}
                    </li>
                    <li className="text-xs">
                      {heading.galleryhead ? heading.galleryhead : "Gallery"}
                    </li>
                    <li className="text-xs">
                      {heading.faqhead ? heading.faqhead : "Faq"}
                    </li>
                    <li className="text-xs">
                      {heading.vacancyhead ? heading.vacancyhead : "Vacancy"}
                    </li>
                    <li className="text-xs">Contact</li>
                  </>
                </ul>
              </div>
              <span
                className="bottomNavArrowRight"
                onClick={() => handleScroll("right")}
              >
                <i className="arrowcustom right"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PreviewNavItem;
