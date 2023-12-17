import React, { useEffect } from "react";
import AppLink from "../../Common/AppLink";
import { useDispatch, useSelector } from "react-redux";
import Storage from "../../Classes/Storage";
import { readCoursesHeader } from "../../store/actions/courseHeader/index";
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
import Auth from "../../Classes/Auth";
import { useNavigate, useLocation } from "react-router-dom";
const StudentMenuListItem = () => {
  const dispatch = useDispatch();
  const history = useNavigate()
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.user_business_type === "LMS") {
      dispatch(readCoursesHeader(user.user_institute));
    }
    if (Storage.alive("heading")) {
      Storage.getJson("heading");
    }
  }, [dispatch, user]);
  useEffect(() => {
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
    SessionStorage.remove(uid);
    SessionStorage.remove(instiid);
    Storage.remove("__wz_pd_offl__");
    Storage.remove("__wz_pd_adni__");
    SessionStorage.remove("InstituteWebsite");
    Storage.remove("__wz_pd_adni__");
    Storage.remove("registerDetails");
    Storage.remove("__wz_pd_ip__");
    SessionStorage.remove("__wz_pd_ptc__");
    Storage.remove("__wz_pd_ptc__");
  }, [dispatch, user]);
  useEffect(() => {
    if (Auth.isLogin() && window.location.pathname === "/") {
      history('/dashboard')
    }
  }, [history])

  const { pathname } = useLocation()
  return (
    <ul className="menuList">
      <li className={`menuListItem`}>
        {/* <span className="rtBadge text-2xs white">New</span> */}
        <AppLink to="/dashboard/student-classroom-list" className={pathname === "/courses-route" ? "active" : ""} >
          <span className="iconCustom">
            <i className="menuIcon home"></i>
          </span>
          <span className="title">Classroom</span>
        </AppLink>
      </li>
      <li className={`menuListItem`}>
        <AppLink to="/dashboard/student-join-class" className={pathname === "/courses-route" ? "active" : ""} >
          <span className="iconCustom">
            <i className="menuIcon home"></i>
          </span>
          <span className="title">Join Class</span>
        </AppLink>
      </li>
      <li className={`menuListItem`}>
        <AppLink to="/dashboard/student-assignments" className={pathname === "/courses-route" ? "active" : ""} >
          <span className="iconCustom">
            <i className="menuIcon home"></i>
          </span>
          <span className="title">Assignment</span>
        </AppLink>
      </li>
      <li className={`menuListItem`}>
        <AppLink to="/dashboard/student/online-test" className={pathname === "/courses-route" ? "active" : ""} >
          <span className="iconCustom">
            <i className="menuIcon home"></i>
          </span>
          <span className="title">Online Test</span>
        </AppLink>
      </li>
      <li className={`menuListItem`}>
        {/* <span className="rtBadge text-2xs white">New</span> */}
        <AppLink to="/dashboard/student/course-detail-list" className={pathname === "/courses-route" ? "active" : ""} >
          <span className="iconCustom">
            <i className="menuIcon home"></i>
          </span>
          <span className="title">Study Material</span>
        </AppLink>
      </li>
      <li className={`menuListItem`}>
        {/* <span className="rtBadge text-2xs white">New</span> */}
        <AppLink to="/dashboard/attendance-student-classroomlist" className={pathname === "/courses-route" ? "active" : ""} >
          <span className="iconCustom">
            <i className="menuIcon home"></i>
          </span>
          <span className="title">Attendance</span>
        </AppLink>
      </li>
      <li className={`menuListItem`}>
        {/* <span className="rtBadge text-2xs white">New</span> */}
        <AppLink to="/dashboard/student/fee-management" className={pathname === "/courses-route" ? "active" : ""} >
          <span className="iconCustom">
            <i className="menuIcon home"></i>
          </span>
          <span className="title">Fee Management</span>
        </AppLink>
      </li>
    </ul>
  );
};

export default StudentMenuListItem;
