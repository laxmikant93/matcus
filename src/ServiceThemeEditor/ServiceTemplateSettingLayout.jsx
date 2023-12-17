import React, { useEffect, useState, useRef, useMemo } from "react";
import AppLink from "../Common/AppLink";
import "./TemplateSettingLayout.scss";
import edneedLogo from "./ed-logo.png";
import edneedLogoHero from "./ed-logo-hero.png";
// import NotificationBell from "./assets/icons/notificationBell.svg"
import Storage from "../Classes/Storage";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../Classes/Auth";
import AutoLogoutModal from "../Common/AutoLogout";
import { GetUserDetailPopup } from "../store/actions/UserDetailPopup";
import HomeHeaderAuth from "../Layout/ProfileAuth/HomeHeaderAuth";
import NotificationAuth from "../Layout/NotificationAuth";
import Main from "./Main";

const ServiceTemplateSettingLayout = ({ children }) => {

  const [show, setShow] = useState(false);

  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle)
  }


  // const [hamburger, setHamburger] = useState(false);
  // const manageHamburger = () => {
  //   setHamburger(!hamburger)
  // }
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  // const handleClick = () => {
  //   setHamburger(false)
  // }
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

  const [hamburger, setHamburger] = useState(false);
  const manageHamburger = () => {
    setHamburger(!hamburger)
  }

  return (
    <React.Fragment>
      <div className="template-setting-dashboard-layout">
        <header className="template-setting-head">
          <div className="header-item-inner">
            <div className="headerItem-left">
              <React.Fragment>
                <div className="sidebar-header">

                  {windowSize.width <= 992 ?
                    <React.Fragment>
                      <div className={'auth-hamburger'} onClick={handleToggle}>
                        <span className={'hamLine'}></span>
                        <span className={'hamLine'}></span>
                        <span className={'hamLine'}></span>
                        <span className={'hamLine'}></span>
                        <p className={'hamLineName'}>Menu</p>
                      </div>
                      <AppLink to="/" className="sidebarLogoCustom">
                        <img src={edneedLogoHero} className="edneedLogoHero" alt="Edneed Logo" />
                      </AppLink>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <AppLink to="/" className="sidebarLogoCustom">
                        <img src={edneedLogo} className="edneedLogo" alt="Edneed Logo" />
                      </AppLink>
                      <button type="button" className={`toggle ${toggle === false ? "active" : ""}`} onClick={handleToggle}></button>
                    </React.Fragment>
                  }
                </div>

              </React.Fragment>
            </div>

            <div className="headerItem-right">
              <HomeHeaderAuth />
            </div>
          </div>
        </header>
        <div className={`websiteSettingDashbaordInner ${toggle === false ? "active" : ""}`}>

          <div className={`edneedSidebar ${(toggle === false) ? "active" : ""}`}>
            <React.Fragment>
              {children}
            </React.Fragment>
          </div>
          <div className="websiteSettingDashbaordInner-children">
            <div className="websiteSettingDashbaordInner-children-inner">
              <Main />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}
export default ServiceTemplateSettingLayout