import React, { useEffect } from "react";
import StudentTheme from "../../../Common/Theme/StudentTheme";
import AppLink from "../../../Common/AppLink";
import {
  Fullname,
  UserInstitute,
  UserInstituteAddress,
} from "../../../Common/UserElement";
import { useDispatch, useSelector } from "react-redux";
import Storage from "../../../Classes/Storage";
import { readCoursesHeader } from "../../../store/actions/courseHeader/index";
import SessionStorage from "../../../Classes/SessionStorage";
// import IconAssignment from "./icon-assignment.svg";
// import IconClassroom from "./icon-classroom.svg";
// import IconCourse from "./icon-courses.svg";
// import IconOnlinetest from "./icon-onlinetest.svg";
// import IconJoinclass from "./icon-joinclass.svg";
// import IconFeeManagement from "./icon-fee-management.svg";
// import IconAttendance from "./icon-attendance.svg";
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
} from "../../../Constant/auth";
import "./StudentDashboard.scss";
import Auth from "../../../Classes/Auth";
import { useNavigate } from "react-router-dom";
const StudentDashboard = () => {
  const dispatch = useDispatch();
  const history = useNavigate()
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(readCoursesHeader(user.user_institute));
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
  return (
    <StudentTheme>
      <div className="user-db-wrapper">
        <div className="user-db-head">
          <h1 className="text-md w-500 capitalize">
            <Fullname />
          </h1>
          <p className="text-xs w-300">Student</p>
          <h2 className="text-xs w-500 purple mt-20">
            <UserInstitute />
          </h2>
          <p className="text-xs w-300 mt-3">
            <UserInstituteAddress />
          </p>
          <AppLink
            to={`/profile/${user.user_username}`}
            className="button btn-o-purple btn-sm purple mt-20 w-500"
          >
            Manage Personal Profile
            <i className="animate-r-arrow-icon"></i>
          </AppLink>
        </div>
        <ul className="db-items student">
          <li>
            {/* <span className="rtBadge text-2xs white">New</span> */}
            <AppLink to="/dashboard/student-classroom-list">
              <i className="student-Classroom"></i>
              {/* <img src={IconClassroom} alt="Classroom" /> */}
              <span>Classroom</span>
            </AppLink>
          </li>
          <li>
            <AppLink to="/dashboard/student-join-class">
              <i className="student-Joinclass"></i>
              {/* <img src={IconJoinclass} alt="Join Class" /> */}
              <span>Join Class</span>
            </AppLink>
          </li>
          <li>
            <AppLink to="/dashboard/student-assignments">
              <i className="student-Assignment"></i>
              {/* <img src={IconAssignment} alt="Assignment" /> */}
              <span>Assignment</span>
            </AppLink>
          </li>
          <li>
            <AppLink to="/dashboard/student/online-test">
              <i className="student-Onlinetest"></i>
              {/* <img src={IconOnlinetest} alt="Online Test" /> */}
              <span>Online Test</span>
            </AppLink>
          </li>
          <li>
            {/* <span className="rtBadge text-2xs white">New</span> */}
            <AppLink to="/dashboard/student/course-detail-list">
              <i className="student-Studymaterial"></i>
              {/* <img src={IconCourse} alt="Study Material" /> */}
              <span>Study Material</span>
            </AppLink>
          </li>
          <li>
            {/* <span className="rtBadge text-2xs white">New</span> */}
            <AppLink to="/dashboard/attendance-student-classroomlist">
              <i className="student-Attendance"></i>
              {/* <img src={IconAttendance} alt="Dashboard Website" /> */}
              <span>Attendance</span>
            </AppLink>
          </li>
          <li>
            {/* <span className="rtBadge text-2xs white">New</span> */}
            <AppLink to="/dashboard/student/fee-management">
              <i className="student-Feemanagement"></i>
              {/* <img src={IconFeeManagement} alt="Fee Management" /> */}
              <span>Fee Management</span>
            </AppLink>
          </li>
        </ul>
        <div className="db-navigation-button">
          {/* <AppLink
            to="/community"
            className="button btn-sm btn-o-purple purple"
          >
            Discover Edneed Community <i className="animate-r-arrow-icon"></i>
          </AppLink> 
          <AppLink
            to="/edneed-review"
            className="button btn-sm btn-o-purple purple mt-8"
          >
            Write your Review <i className="animate-r-arrow-icon"></i>
          </AppLink> */}
        </div>
      </div>
    </StudentTheme>
  );
};

export default StudentDashboard;
