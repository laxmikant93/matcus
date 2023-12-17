import React, { useEffect, useState, useRef, useMemo } from "react";
import AppLink from "../../Common/AppLink";
import "./style.scss";
import edneedLogo from "./assets/logo/ed-logo.png";
import edneedLogoHero from "./assets/logo/ed-logo-hero.png";
import SearchControl from '../../Common/SearchControl';
// import NotificationBell from "./assets/icons/notificationBell.svg"
import Storage from "../../Classes/Storage";
import ResetPassword from "../../App/Auth/ResetPassword/ResetPassword";
import { changepasswordPopup } from "../../Constant/auth";
import VerifyContactNumber from "../../App/ContactVerify/LoginMobileVerification";
import { useDispatch, useSelector } from "react-redux";
import useDownTimer from "../../App/Auth/Hooks/useTimer";
import Auth from "../../Classes/Auth";
import AutoLogoutModal from "../../Common/AutoLogout";
import { GetUserDetailPopup } from "../../store/actions/UserDetailPopup";
import UserDetailPopup from "../../App/Admin/AccountSetting/UserDetailPopup";
import HomeHeaderAuth from "../ProfileAuth/HomeHeaderAuth";
import NotificationAuth from "../NotificationAuth";
import MySitesDropdownMenu from "./MySitesDropdownMenu";
import MenuListItem from "./MenuListItem";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import { findPrivateDomain } from "../../store/actions/institutewebsite";
import { useCookies } from 'react-cookie';
import Api from "../../Classes/Api";
const AuthLayout = ({ children }) => {

  const [passwordChange, setPasswordChange] = useState(false);
  const [contactVerify, setContactVerify] = useState(false);
  const [timmerStart, setTimmerStart] = useState(false);
  const [timer, setTimer] = useDownTimer();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const sessionTimeout = useRef(3900);
  const [institute_logo, setInstitute_logo] = useState("")
  // const teacherBulkUploadLoading = useSelector(
  //   (state) => state.inviteteacher.create.loading
  // );
  // const teacherBulkUploadSuccess = useSelector(
  //   (state) => state.inviteteacher.create.success
  // );
  // const studentBulkUploadLoadding = useSelector(
  //   (state) => state.students.create.loading
  // );
  // const studentBulkUploadSuccess = useSelector(
  //   (state) => state.students.create.success
  // );
  const { users, getUserDetailSuccess, getUserDetailData, getUserDetailLoading } = useSelector((state) => {
    return {
      users: state.user,
      getUserDetailSuccess: state.userdetailpopup.GetUserDetail.success,
      getUserDetailData: state.userdetailpopup.GetUserDetail.data,
      getUserDetailLoading: state.userdetailpopup.GetUserDetail.loading,
    }
  })
  const { INSdata } = useSelector((state) => state.institutewebsite);

  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { success, INSDetails, isOld, websiteType } = useSelector((state) => {
    return {
      success: state.websiteTemplate.getTemplate.success,
      isOld: state.websiteTemplate.getTemplate.isOld,
      websiteType: state.websiteTemplate.getTemplate.websiteType,
      INSDetails: state.institute.detail.data
    }
  })
  const [cookies, setCookie, removeCookie] = useCookies(["googtrans"]);
  useEffect(() => {
    if (localStorage.getItem('ResetTimer') === 'true') {
      localStorage.setItem('ResetTimer', 'false');
      resetTimer();
    }
  });

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      if (success && websiteType === "LMS") {
        if (isOld) {
          setInstitute_logo(INSDetails && INSDetails.institute_logo)
        } else {
          setInstitute_logo(instituteData.institute_logo)
        }
      }
    }
    removeCookie('googtrans', { domain: AppLinkUrl.getHost(), path: '/' })

  }, [INSDetails, INSdata, isOld, success, websiteType])
  useEffect(() => {
    if (Auth.isLogin()) {
      if (Storage.alive("__wz_user__details_verify__")) {
        if (Storage.getBool("__wz_user__details_verify__") === false) {
          setShowUserDetailPopUp(true)
        } else {
          setShowUserDetailPopUp(false)
        }
      } else {
        Storage.setBool("__wz_user__details_verify__", false)
      }
    }
  }, []);

  useEffect(() => {
    if (Auth.isLogin()) {
      setInterval(() => {
        sessionTimeout.current = sessionTimeout.current - 1;
        setTimeout(sessionTimeout.current);
        if (sessionTimeout.current === 300) {
          if (!window.location.href.includes('exam') &&
            !window.location.href.includes('admin-create-test') &&
            !window.location.href.includes('admin-edit-test') &&
            !window.location.href.includes('teacher-create-test') &&
            !window.location.href.includes('teacher-edit-test') &&
            !window.location.href.includes('student-online-test')
          ) {
            setShow(true);
          }
        }
        if (sessionTimeout.current === 0) {
          if (!window.location.href.includes('exam') &&
            !window.location.href.includes('admin-create-test') &&
            !window.location.href.includes('admin-edit-test') &&
            !window.location.href.includes('teacher-create-test') &&
            !window.location.href.includes('teacher-edit-test') &&
            !window.location.href.includes('student-online-test')
          ) {
            Auth.logout();
            window.location.reload();
          } else {
            sessionTimeout.current = 3900;
          }
        }
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('ResetTimer') === 'true') {
      localStorage.setItem('ResetTimer', 'false');
      resetTimer();
    }
  });

  // useEffect(() => {
  //   if (Auth.isLogin()) {
  //     setInterval(() => {
  //       sessionTimeout.current = sessionTimeout.current - 1;
  //       setTimeout(sessionTimeout.current);
  //       if (sessionTimeout.current === 300) {
  //         if (!window.location.href.includes('exam')) {
  //           setShow(true);
  //         }
  //       }
  //       if (sessionTimeout.current === 0) {
  //         if (!window.location.href.includes('exam')) {
  //           Auth.logout();
  //           window.location.reload();
  //         } else {
  //           sessionTimeout.current = 2400;
  //         }
  //       }
  //     }, 1000);
  //   }
  // }, []);

  useEffect(() => {
    if (Storage.alive(changepasswordPopup)) {
      setPasswordChange(true);
    } else {
      setPasswordChange(false);
    }

    document.addEventListener("storage", (evt) => {
      // Logout user from all open tabs
      if (evt.key === changepasswordPopup && evt.newValue === null) {
        setPasswordChange(false);
      } else {
        // setPasswordChange(false)
      }
    });
  }, []);

  useEffect(() => {
    if (users.token) {
      if (!users.user_contact_verify) {
        if (
          Storage.getBool("__wz_cont_verf__") === "false" ||
          !Storage.alive("__wz_cont_verf__")
        ) {
          Storage.setBool("__wz_cont_verf__", false);
        }
      }
    }
  }, [users.token, users.user_contact_verify]);
  // useEffect(() => {
  //   if()
  //   Storage.setBool("__wz_user__details_verify__", false)
  // }, [])
  useEffect(() => {
    if (
      Storage.alive("__wz_cont_verf__") &&
      Storage.getBool("__wz_cont_verf__") === "false"
    ) {
      if (!timmerStart) {
        setTimmerStart(true);
        setTimer(120);
      }
    }
  }, [setTimer, timmerStart]);

  if (
    timer === "1s" &&
    !contactVerify &&
    Storage.getBool("__wz_cont_verf__") === "false"
  ) {
    setContactVerify(true);
  }
  const ContactVerifySkip = () => {
    Storage.setBool("__wz_cont_verf__", true);
    setContactVerify(false);
  };

  let data = document.location.href.includes("dashboard/student/exam-instruction")

  useEffect(() => {
    if (data) {
      Storage.setBool("__wz_cont_verf__", true);
      setContactVerify(false);
    }
  }, [data])

  const resetTimer = () => {
    sessionTimeout.current = 3900;
    setShow(false);
  }

  const LogoutModal = useMemo(() => <AutoLogoutModal show={show} closeModal={() => setShow(false)} reset={() => resetTimer()} />, [show]);

  const [showUserDetailPopUp, setShowUserDetailPopUp] = useState(false);


  useEffect(() => {

    if (getUserDetailLoading === false && getUserDetailSuccess === true && getUserDetailData && (Storage.getBool("__wz_user__details_verify__") === "false" || Storage.getBool("__wz_user__details_verify__") === false)) {
      if (
        (getUserDetailData.gender &&
          getUserDetailData.father_name &&
          getUserDetailData.mother_name &&
          getUserDetailData.permanent_address &&
          getUserDetailData.user_country &&
          getUserDetailData.user_city &&
          getUserDetailData.user_state &&
          getUserDetailData.user_zipcode)) {
        setShowUserDetailPopUp(false)
        Storage.setBool("__wz_user__details_verify__", true)
      } else {
        setShowUserDetailPopUp(true)
        Storage.setBool("__wz_user__details_verify__", false)
      }
    }
  }, [getUserDetailLoading, getUserDetailSuccess, getUserDetailData])

  useEffect(() => {
    if (Auth.isLogin() && users.user_business_type === "LMS") {
      dispatch(GetUserDetailPopup(users._id, users.user_business_type));
    }
  }, [dispatch, users._id, users.user_business_type]);


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

  const conditionRender = () => {
    if (users.user_business_type && users.user_business_type !== "null") {
      return true
    } else {
      return false
    }
  }
  return (
    <React.Fragment>
      {
        conditionRender() ?
          <div className="edneedDashbaordFrame_300522">
            <header>
              <div className="header-item-inner">
                <div className="headerItem-left">
                  <React.Fragment>


                    <div className="sidebar-header">

                      {windowSize.width <= 992 ?
                        <React.Fragment>
                          <div className={'auth-hamburger'} onClick={handleToggle}>
                            {toggle ?
                              <React.Fragment>
                                <span className={'hamLine'}></span>
                                <span className={'hamLine'}></span>
                                <span className={'hamLine'}></span>
                                <span className={'hamLine'}></span>
                              </React.Fragment>
                              :
                              <span className="hamLineCross">&#10539;</span>
                            }
                            <p className={'hamLineName'}>Menu</p>
                          </div>
                        
                          {
                            AppLinkUrl.privateDomain()? "":
                            <AppLink to="/" className="sidebarLogoCustom">
                            <img src={edneedLogoHero} className="edneedLogoHero" alt="Edneed Logo" />
                          </AppLink>
                          }
                         
                          {AppLinkUrl.privateDomain() &&
                            <>
                              {
                                institute_logo && institute_logo ? (
                                  <a href="/" className="sidebarLogoCustom">
                                    <img src={`${toggle ? institute_logo : institute_logo}`} className="edneedLogoHero" alt="Logo" />
                                  </a>
                                ) : (
                                  ""
                                )
                              }
                            </>

                          }
                          {/* <div className={`menu-list-item-mobile ${hamburger ? "active" : ""}`}>
                            <div className={'closeHambuger'} onClick={manageHamburger}></div>
                            <MenuListItem />
                          </div> */}
                        </React.Fragment>
                        :
                        <React.Fragment>
                          {
                            AppLinkUrl.privateDomain()?"":
                            <AppLink to="/" className="sidebarLogoCustom">
                            <img src={AppLinkUrl.privateDomain() ? edneedLogoHero : edneedLogo} className={AppLinkUrl.privateDomain() ? "edneedLogoHero" : "edneedLogo"} alt="Edneed Logo" />
                          </AppLink>
                          }
                          {AppLinkUrl.privateDomain() &&
                            <>
                              {
                                institute_logo && institute_logo ? (
                                  <a href="/" className="sidebarLogoCustom">
                                    <img src={`${toggle ? institute_logo : institute_logo}`} className="edneedLogoHero" alt="Logo" />
                                  </a>
                                ) : (
                                  ""
                                )
                              }
                            </>

                          }
                          <button type="button" className={`toggle ${toggle === false ? "active" : ""}`} onClick={handleToggle}></button>
                        </React.Fragment>
                      }
                    </div>

                  </React.Fragment>
                </div>

                <div className="headerItem-right">
                  {windowSize.width >= 992 &&
                    <React.Fragment>
                      {/* {!toggle && <button type="button" className={`toggle ${toggle === false ? "active" : ""}`} onClick={handleToggle}></button>} */}
                      <ul className="headerHelpMenu">
                        <li>
                          <MySitesDropdownMenu />
                        </li>
                        {/* <li className="divider"></li> */}
                        {/* <li>
                              <button type="button">Help Videos</button>
                            </li> */}
                      </ul>
                    </React.Fragment>
                  }

                  {windowSize.width >= 992 && <div className="headerSearchBar">
                    {/* <SearchControl
                        placeholder="Search..."
                      /> */}
                  </div>}
                  <div className="NotificationBellSection">
                    <NotificationAuth business={users.user_business_type} />
                  </div>
                  <HomeHeaderAuth />
                </div>
              </div>
            </header>
            <div className={`edneedDashbaordInner ${toggle === false ? "active" : ""}`}>

              <div className={`edneedSidebar ${(toggle === false) ? "active" : ""}`}>
                <React.Fragment>

                  {/* <AppLink to="/" className="sidebarLogoCustom">
                  <img src={`${toggle ? edneedLogo : edneedLogoHero}`} className={toggle ? "edneedLogo" : "edneedLogoHero"} alt="Edneed Logo" />
                </AppLink> */}
                  <MenuListItem />
                  <div className="sidebar-footer">
                    {users.user_business_type === "LMS" &&
                      <ul className="menuList">
                        {/* <li className="menuListItem">
                          <AppLink
                            to="/community"
                            target="_blank"
                          >
                            <span className="iconCustom">
                              <i className="menuIcon icon-community"></i>
                            </span>
                            <span className="title">Discover Edneed Community</span>
                          </AppLink>
                        </li> */}
                        {
                          // users.user_institute === "636fcf21a96e827c3a067e06" ? "" :
                          //   <li className="menuListItem">
                          //     <AppLink
                          //       to="edneed-review-list"
                          //     >
                          //       <span className="iconCustom">
                          //         <i className="menuIcon icon-Review"></i>
                          //       </span>
                          //       <span className="title">Write Your Review</span>
                          //     </AppLink>
                          //   </li>
                        }
                      </ul>}
                  </div>
                  {/* <ul className={`footerMenu`}>
                  <li>
                    <AppLink
                      to="/community"
                      className={`foot_item`}
                      target="_blank"
                    >
                      <span className="iconCustom">
                        <i className="icon-community"></i>
                      </span>
                      <span className="title">Discover Edneed Community</span>
                    </AppLink>
                  </li>
                  <li>
                    <AppLink
                      to="edneed-review-list"
                      className={`foot_item`}
                    >
                      <span className="iconCustom">
                        <i className="icon-Review"></i>
                      </span>
                      <span className="title">Write Your Review</span>
                    </AppLink>
                  </li>
                </ul> */}
                </React.Fragment>

              </div>
              <div className="edneedDashbaordInner-children">
                <div className="edneedDashbaordInner-children-inner">
                  {children}
                </div>
              </div>
            </div>
          </div>
          : children
      }
      {LogoutModal}

      {/* {
        contactVerify && users.user_activeRole !== process.env.REACT_APP_PAGE_OWNER ? (
          <VerifyContactNumber
            modalState={true}
            ContactVerifySkip={() => ContactVerifySkip()}
          />
        ) : (
          <p></p>
        )
      }
      {showUserDetailPopUp === true && <UserDetailPopup />} */}
    </React.Fragment >
  )
}
export default AuthLayout