import React from 'react';
import './header.scss';
import edLogo from "./ed-logo.png";
import { useEffect, useState } from 'react';
import { Fragment } from "react";
import headerMenuList from "./headerMenu.json";
import AppLink from '../../Common/AppLink';
// import UserDetailPopup from '../../App/Admin/AccountSetting/UserDetailPopup';
import ReactGA from 'react-ga';
import CommonError from '../../Common/CommonError';
import SuccessMessagePopup from '../../Common/SuccessMessagePopup';
import NotificationPopup from '../../Common/NotificationPopup';
import { useLocation } from "react-router-dom";
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl';

const Header = () => {



  const [hamburger, setHamburger] = useState(false);
  const manageHamburger = () => {
    setHamburger(!hamburger)
  }
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  const handleClick = () => {
    setHamburger(false)
  }
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

  if (AppLinkUrl.privateDomain()) {

  } else {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }



  const [activeIndex, setActiveIndex] = React.useState(false);

  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
    if (windowSize.width <= 1240) {
      manageHamburger()
    }
  };
  const location = useLocation()

  const logoClick = () => {
    if (AppLinkUrl.privateDomain()) { } else {
      ReactGA.event({
        category: "Header",
        action: "click",
        label: "Home_Header_Logo",
      })
    }

  }

  const HeaderClick = (data) => {
    if (AppLinkUrl.privateDomain()) { } else {
      ReactGA.event({
        category: "Header",
        action: "click",
        label: `Home_Header_${data}`,
      })
    }
  }

  return (
    <React.Fragment>
      {
        window.location.pathname.includes("/auth/login") || window.location.pathname.includes("/auth/create-account") || window.location.pathname.includes("/auth/resetpassword") || window.location.pathname.includes("/auth/forgot-password") || window.location.pathname.includes("/auth/login-with-otpv1") || window.location.pathname.includes("/auth/email-login/") || window.location.pathname.includes("/auth/signup-otp-verifyv1/") ? "" :
          <div className={`bg-white ${'ed_Header'}`}>
            <div className={`edContainer`}>
              <div className={'ed_header_wrapper'}>
                <div className={'header_hero_logo'}>
                  <AppLink to="/" onClick={() => logoClick()} ><img className="img-fluid" src={edLogo} alt="Edneed Logo" onClick={() => logoClick()} /></AppLink>
                </div>
                <div className={'header_hero_collapse'}>
                  {
                    windowSize.width <= 1240 &&
                    <div className="ed_mob_hambuger">
                      {(location.pathname !== "/auth/login") ?
                        <div onClick={handleClick}>
                          <AppLink to="/auth/login" className="button btn-sm base btn-o-gray">
                            Login
                          </AppLink>
                        </div>
                        :
                        <div onClick={handleClick}>
                          <AppLink to="/auth/create-account" className="button btn-sm button-primary">Create Account</AppLink>
                        </div>
                      }


                      <div className={'edHeaderHamburger'} onClick={manageHamburger}>
                        <span className={'hamLine'}></span>
                        <span className={'hamLine'}></span>
                        <span className={'hamLine'}></span>
                        <p className={'hamLineName'}>Menu</p>
                      </div>
                    </div>
                  }
                  <div className={`${'hero_collapse_content'} ${hamburger ? `${'hero_collapse_content_mob'}` : ""}`}>
                    <Fragment>
                      {(windowSize.width >= 1240) || hamburger ? <Fragment> <ul className={'hero_menu_List'}>
                        {headerMenuList.map((headerMenuList, index) => {
                          return (
                            <li key={index} className={'hero_menu_List_item'} onClick={() => handleOnClick(index)}>
                              <AppLink to={headerMenuList.menuLink} className={activeIndex === true ? "activeMenu" : ""} onClick={() => HeaderClick(headerMenuList.menuName)}>
                                {headerMenuList.menuName}
                              </AppLink>
                            </li>
                          );
                        })}
                      </ul>
                        <ul className={'header_signup_login'}>
                          <li onClick={handleClick}>
                            <AppLink to="/auth/login" className="button btn-sm base btn-o-gray">
                              Login
                            </AppLink>
                          </li>
                          <li onClick={handleClick}>
                            <AppLink to="/auth/create-account" className="button btn-sm button-primary">Create Account</AppLink>
                          </li>
                        </ul></Fragment> :
                        ""
                      }
                    </Fragment>
                    {hamburger && <div className={'closeHambuger'} onClick={manageHamburger}></div>}
                    <CommonError />
                    <SuccessMessagePopup />
                    <NotificationPopup />
                  </div>
                </div>
              </div>
            </div>
          </div>
      }

    </React.Fragment>

  )
}
export default Header