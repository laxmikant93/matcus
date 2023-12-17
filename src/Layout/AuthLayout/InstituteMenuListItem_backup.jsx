import React, { useState } from "react";
import AppLink from "../../Common/AppLink";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCoursesHeader } from "../../store/actions/courseHeader";
import SessionStorage from "../../Classes/SessionStorage";

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
  const handleShowMenu = (index) => {
    Storage.setJson('menu', showMenu === index ? -1 : index)
    setShowMenu(showMenu === index ? -1 : index);
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

      {user.user_role_access && user.user_role_access.length > 0 ? (
        <>
          {
            user.user_role_access.map((item, key) => {
              return (
                <React.Fragment key={key}>
                  {
                    item === "manage_website" &&
                    <React.Fragment>
                      <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                        <AppLink
                          to="#"
                          className={key === showMenu ? "active" : ""}
                        >
                          <span className="iconCustom">
                            <i className="menuIcon home"></i>
                          </span>
                          <span className="title">Website</span>
                        </AppLink>
                        {
                          showMenu === key &&
                          <WebsiteMenuListItem />}
                      </li>

                    </React.Fragment>
                  }
                  {item === "manage_classroom" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/courses-route" className={pathname === "/courses-route" ? "active" : ""} >
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">
                          {courseHeadingINS.success ?
                            courseHeadingINS.data ?
                              courseHeadingINS.data.coursehead
                              : "Classroom" : ""}
                        </span>
                      </AppLink>
                    </li>
                  }
                  {item === "manage_teacher" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/teacher-dashboard-route" className={pathname === "/teacher-dashboard-route" ? "active" : ""} >
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Staff</span>
                      </AppLink>
                    </li>
                  }
                  {item === "manage_student" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/student-dashboard-route" className={pathname === "/student-dashboard-route" ? "active" : ""}>
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Students</span>
                      </AppLink>
                    </li>
                  }
                  {
                    item === "manage_study_material" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/course" className={pathname === "/course" ? "active" : ""}>
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Study Material</span>
                      </AppLink>
                    </li >
                  }
                  {
                    item === "manage_attendance" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/admin-attendance-classroomSubjectlist" className={pathname === "/admin-attendance-classroomSubjectlist" ? "active" : ""}>
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Attendance</span>
                      </AppLink>
                    </li >
                  }
                  {
                    item === "manage_fee_management" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/fee-management" className={pathname === "/fee-management" ? "active" : ""}>
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Fee management</span>
                      </AppLink>
                    </li >
                  }
                  {
                    item === "manage_guard_management" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/visitor-management-list" className={pathname === "/visitor-management-list" ? "active" : ""}>
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Guard management</span>
                      </AppLink>
                    </li >
                  }
                  {
                    item === "manage_visitor_management" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/visitor-management" className={pathname === "/visitor-management" ? "active" : ""}>
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Visitor Management</span>
                      </AppLink>
                    </li >
                  }

                  {
                    item === "manage_access_control" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/access-control" className={pathname === "/access-control" ? "active" : ""}>
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Access Control</span>
                      </AppLink>
                    </li>
                  }
                  {
                    item === "manage_access_control" &&
                    <li className={`menuListItem`} onClick={() => handleShowMenu(key)}>
                      <AppLink to="/blog-list" className={pathname === "/blog-list" ? "active" : ""}>
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Blogs</span>
                      </AppLink>
                    </li>
                  }
                </React.Fragment >
              )
            })
          }
        </>
      ) : ("")
      }
    </ul >
  );
}
