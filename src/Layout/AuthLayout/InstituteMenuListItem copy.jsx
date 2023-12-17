import React, { useState } from "react";
import AppLink from "../../Common/AppLink";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCoursesHeader } from "../../store/actions/courseHeader";
import SessionStorage from "../../Classes/SessionStorage";
import InstituteMenus from "./sidebarmenu.json";

import {
  createPrivateDomainNewInstiute,
  instiid,
  PaymentComplete,
  privateDomain,
  privateDomainAddNewIns,
  privateDomainBookNew,
  privateDomainOfflineFlow,
  privateDomainOpt,
  privateDomainProceedToCheckout,
  privateDomainTLDS,
  registerDetails,
  registrationWorkDone,
  totalPriceValue,
  uid,
} from "../../Constant/auth";
import Storage from "../../Classes/Storage";
import { resetTeacherList } from "../../store/actions/studentlistuserinfo";
import Auth from '../../Classes/Auth'
import { useNavigate, useLocation } from "react-router-dom";
import WebsiteMenuListItem from "./WebsiteMenuListItem";
import { DynamicClassroomHeader } from "../../Common/UserElement";
export default function InstituteMenuListItem() {
  const dispatch = useDispatch();
  const { user, courseHeadingINS } = useSelector((state) => {
    return {
      user: state.user,
      courseHeadingINS: state.courseHeader.list,
    };
  });
  const { pathname } = useLocation()
  const history = useNavigate()
  useEffect(() => {
    dispatch(resetTeacherList());
    if (user.user_business_type === "LMS") {
      dispatch(readCoursesHeader(user.user_institute));
    }
    SessionStorage.remove(privateDomainOpt);
    SessionStorage.remove(privateDomain);
    SessionStorage.remove(privateDomainTLDS);
    SessionStorage.remove(createPrivateDomainNewInstiute);
    SessionStorage.remove(registrationWorkDone);
    SessionStorage.remove(registerDetails);
    SessionStorage.remove(totalPriceValue);
    SessionStorage.remove(PaymentComplete);
    SessionStorage.remove(privateDomainOfflineFlow);
    SessionStorage.remove(privateDomainAddNewIns);
    SessionStorage.remove(privateDomainBookNew);
    SessionStorage.remove(privateDomainProceedToCheckout);
    SessionStorage.remove("UserRegistration");
    SessionStorage.remove("RegisterInstitiute");
    SessionStorage.remove("DomainName");
    Storage.remove("__wz_pd_offl__");
    Storage.remove("__wz_pd_adni__");
    SessionStorage.remove("InstituteWebsite");
    SessionStorage.remove(uid);
    SessionStorage.remove(instiid);
    SessionStorage.remove("__wz_pd_ptc__");
    Storage.remove("__wz_pd_ptc__");
    Storage.remove("__wz_pd_adni__");
    Storage.remove("registerDetails");
    Storage.remove("__wz_pd_ip__");
  }, [dispatch, user]);
  useEffect(() => {
    if (Auth.isLogin() && window.location.pathname === "/") {
      history('/dashboard')
    }
  }, [history])

  const [showMenu, setShowMenu] = useState(-1);
  const [showSubMenu, setShowSubMenu] = useState(-1);

  const handleShowMenu = (index) => {
    Storage.setJson('menu', showMenu === index ? -1 : index)
    showMenu === index && setShowSubMenu(-1);
    setShowMenu(showMenu === index ? -1 : index);

  }

  const handleShowSubMenu = (index) => {
    Storage.setJson('menu', showMenu === index ? -1 : index)
    setShowSubMenu(showSubMenu === index ? -1 : index);
  }
  // useEffect(() => {
  //   Storage.setJson('menu', showMenu)
  // }, [showMenu])
  useEffect(() => {
    if (Storage.alive('menu')) {
      setShowMenu(Storage.getJson('menu'))
    }
  }, [pathname])
  return (
    <ul className={`menuList`}>
      {
        InstituteMenus.map((item, key) => {
          return (
            <li className={`menuListItem`}>
              {
                item.subMenuItem && item.subMenuItem.length >= 1
                  ?
                  <button type="button" className={`caret ${showMenu === key + "first" ? "active" : ""}`} onClick={() => handleShowMenu(`${key + "first"}`)}>
                    <span className="iconCustom">
                      <i className={`menuIcon ${item.Icon}`}></i>
                    </span>
                    <span className="title">{item.menuName}</span>
                  </button>
                  :
                  item.menuName === "Templates" && !user.user_institute_isOld ? (
                    <AppLink
                      to={item.menuLink}
                      className={pathname === item.menuLink ? "active" : ""}
                    >
                      <span className="iconCustom">
                        <i className={`menuIcon ${item.Icon}`}></i>
                      </span>
                      <span className="title">{item.menuName}</span>
                    </AppLink>) :
                    item.menuName !== "Templates" && (<AppLink
                      to={item.menuLink}
                      className={pathname === item.menuLink ? "active" : ""}
                    >
                      <span className="iconCustom">
                        <i className={`menuIcon ${item.Icon}`}></i>
                      </span>
                      <span className="title">{item.menuName}</span>
                    </AppLink>)

              }
              {
                showMenu === `${key + "first"}` &&
                <ul className={`subMenuList ${showMenu === key + "first" ? "fade" : ""}`}>
                  {
                    item.subMenuItem && item.subMenuItem.length && item.subMenuItem.map((subMenuItem1, Arraykey) => {
                      return (
                        <li className={`subMenuListItem`}  >
                          {
                            subMenuItem1.subMenuItem && subMenuItem1.subMenuItem.length >= 1
                              ?
                              <button type="button" className={`caret ${Arraykey + "second" === showSubMenu ? "active" : ""}`} onClick={() => handleShowSubMenu(`${Arraykey + "second"}`)}>
                                <span className="title">{subMenuItem1.menuName}</span>
                              </button>
                              :
                              subMenuItem1.menuName === "My Templates" && user.user_institute_isOld ? (
                                "") :
                                subMenuItem1.menuName === "Edit Website" && user.user_institute_isOld === true ? (<AppLink to={subMenuItem1.menuLink} className={pathname === subMenuItem1.menuLink ? "active" : ""}>
                                  <span className="title">{subMenuItem1.menuName}</span>
                                </AppLink>) : (
                                  <>
                                    {
                                      subMenuItem1.menuName === "Edit Website" && user.user_institute_isOld === false ? (
                                        ""
                                      ) : (
                                        <AppLink to={subMenuItem1.menuLink} className={pathname === subMenuItem1.menuLink ? "active" : ""}>
                                          <span className="title">{subMenuItem1.menuName}</span>
                                        </AppLink>
                                      )
                                    }
                                  </>

                                )
                          }
                          {
                            showSubMenu === `${Arraykey + "second"}` &&
                            <ul className={`subMenuList ${showSubMenu === `${Arraykey + "second"}` ? "fade" : ""}`}>
                              {
                                subMenuItem1.subMenuItem && subMenuItem1.subMenuItem.length && subMenuItem1.subMenuItem.map((subMenuItem2, Arraykeys) => {
                                  return (
                                    <>
                                      <li className={`subMenuListItem`}>
                                        {
                                          subMenuItem2.subMenuItem && subMenuItem2.subMenuItem.length >= 1
                                            ?
                                            <button type="button" className={`caret ${pathname === subMenuItem2.menuLink ? "active" : ""}`} onClick={() => handleShowMenu(Arraykeys)}>
                                              <span className="title">{subMenuItem2.menuName}</span>
                                            </button>
                                            :
                                            <>
                                              {
                                                subMenuItem2.menuName === "Home & Menu" && user.user_institute_isOld === false ? ("") : (<AppLink to={subMenuItem2.menuLink} className={pathname === subMenuItem2.menuLink ? "active" : ""}>
                                                  <span className="title">{subMenuItem2.menuName}</span>
                                                </AppLink>

                                                )
                                              }
                                            </>
                                        }
                                      </li>
                                    </>
                                  );
                                })
                              }
                            </ul>
                          }
                        </li>
                      );
                    })
                  }

                </ul>
              }
            </li>
          );
        })
      }

    </ul >
  );
}
