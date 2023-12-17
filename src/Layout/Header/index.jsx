import React, { useState, useEffect } from "react";
import HeadLogo from "../Header/HeadLogo";
import { useDispatch, useSelector } from "react-redux";
import HomeHeaderAuth from "./HomeHeaderAuth";
import MenuList from "./MenuList";
import FreeDemoButton from "./FreeDemoButton";
import WatchVideoButton from "./WatchVideoButton";
import Auth from "../../Classes/Auth";
import SearchPanel from "../Header/SearchPanel";
import "./edHeader.scss";
import AppLink from "../../Common/AppLink";
// import WhatsappChat from "../WhatsappChat";
const Header = () => {
  const teacherBulkUploadLoading = useSelector(
    (state) => state.inviteteacher.create.loading
  );
  const teacherBulkUploadSuccess = useSelector(
    (state) => state.inviteteacher.create.success
  );
  const studentBulkUploadLoadding = useSelector(
    (state) => state.students.create.loading
  );
  const studentBulkUploadSuccess = useSelector(
    (state) => state.students.create.success
  );
  const openNavDesktop = () => {
    document.getElementById("edMenuSideNav").style.width = "30vw";
    // document.getElementById("edwapp").style.marginLeft = "20vw";
  };
  const openNavMobile = () => {
    document.getElementById("edMenuSideNav").style.width = "100vw";
    // document.getElementById("edwapp").style.marginLeft = "100vw";
  };

  const closeNav = () => {
    document.getElementById("edMenuSideNav").style.width = "0";
    document.getElementById("edwapp").style.marginLeft = "0";
  };

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
  const [SearchPanelToggle] = useState(false);
  return (
    <React.Fragment>
      <header className="header">
        <div className="edHeaderWrapper">
          <div
            className={`edHeaderCustom ${windowSize.width <= 700 ? "edHeadMob" : ""
              }`}
          >
            <div
              className="edHeaderHamburger"
              onClick={
                windowSize.width >= 800 ? openNavDesktop : openNavMobile
              }
            >
              <span className="hamLine"></span>
              <span className="hamLine"></span>
              <span className="hamLine"></span>
              <p className="hamLineName">menu</p>
              <span className="hamLine"></span>
            </div>
            {windowSize.width >= 700 &&
              (Auth.isLogin() ? (
                <WatchVideoButton
                // ButtonName="Video Tutorials"
                // className="button button-base btn-sm"
                />
              ) : (
                <FreeDemoButton
                // ButtonName="FREE Demo"
                // className="button button-base btn-sm"
                />
              ))}
            {/* <button
                className="button btn-sm btn-o-base base NavSearchBtn"
                onClick={() => SetSearchPanelToggle(!SearchPanelToggle)}
              >
                <i className="ed-icon base icon-search i-xs"></i>Search
              </button> */}
            {/* {SearchPanel && <SearchPanel />} */}
            <HeadLogo />
            <HomeHeaderAuth />
          </div>
        </div>
        <div id="edMenuSideNav" className="edSidenav">
          <span className="closebtn" onClick={closeNav}></span>
          <div className="HeadMenuList">
            <MenuList />
          </div>
          <p className="text-xxs w-400 white text-center mt-30">
            We are social <span className="w-600">@EdneedTech</span>
          </p>
          <ul className="edSidenavSocial">
            <li
              onClick={(e) => {
                e.preventDefault();
                window.open("https://www.facebook.com/EdneedTech", "_blank");
              }}
              rel="noopener noreferrer"
            >
              <i className="ed-icon icon-fb white i-xs"></i>
            </li>

            <li
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://www.linkedin.com/company/edneedtech/",
                  "_blank"
                );
              }}
              rel="noopener noreferrer"
            >
              <i className="ed-icon icon-linkedin white i-xs"></i>
            </li>
            <li
              onClick={(e) => {
                e.preventDefault();
                window.open("https://www.instagram.com/edneedtech/", "_blank");
              }}
              rel="noopener noreferrer"
            >
              <i className="ed-icon icon-instagram white i-xs"></i>
            </li>
            <li
              onClick={(e) => {
                e.preventDefault();
                window.open("https://twitter.com/EdneedTech", "_blank");
              }}
              rel="noopener noreferrer"
            >
              <i className="ed-icon icon-twitter white i-xs"></i>
            </li>
          </ul>
        </div>
        {/* <WhatsappChat /> */}
      </header>
      {SearchPanelToggle && <SearchPanel />}

      {Auth.isLogin() && (teacherBulkUploadLoading || studentBulkUploadLoadding) && (
        <React.Fragment>
          <div className="header-notification-bar">


            {/*START CODE IF FILE IS UPLOADING*/}
            <div className="hnb-wrapper">
              <span className="loader-spinner-circle"></span>
              <p className="text-2xs">
                Bulk invite {" "}
                <span className="w-700"></span> file is
                loading in progress.
              </p>
            </div>

            {/*END CODE IF FILE IS UPLOADING*/}
            {/*START CODE IF FILE SUCCESSFULLY UPLOADED*/}

            {/*END CODE IF FILE SUCCESSFULLY UPLOADED*/}
          </div>
        </React.Fragment>
      )}

      {Auth.isLogin() && (teacherBulkUploadSuccess || studentBulkUploadSuccess) && (
        <div className="header-notification-bar">
          <div className="hnb-wrapper">
            <p className="text-2xs">
              Bulk invite {" "}
              <span className="w-700"></span> file has been
              successfully uploaded.
            </p>
            {studentBulkUploadSuccess ? (
              <AppLink to="/invite-students-status" className="button btn-xs btn-o-secondary text-2xs w-500 secondary">
                View Status
              </AppLink>
            ) : (
              <AppLink to="/invite-faculty-status" className="button btn-xs btn-o-secondary text-2xs w-500 secondary">
                View Status
              </AppLink>
            )

            }

          </div>
        </div>
      )
      }

    </React.Fragment >
  );
};

export default Header;
