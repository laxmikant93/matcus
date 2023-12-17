/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AppLink from "../../Common/AppLink";
import { useDispatch, useSelector } from "react-redux";
import { readCoursesHeader } from "../../store/actions/courseHeader";
import Storage from "../../Classes/Storage";
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
import { useNavigate } from "react-router-dom";
const TeacherMenuListItem = () => {
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
    Storage.remove("__wz_pd_offl__");
    Storage.remove("__wz_pd_adni__");
    SessionStorage.remove("InstituteWebsite");
    SessionStorage.remove(uid);
    SessionStorage.remove(instiid);
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
    <ul className="menuList">
      {user.user_role_access && user.user_role_access.length > 0 ? (
        <>
          {
            user.user_role_access.map((item) => {
              return (
                <>
                  {item === "manage_classroom" &&
                    <li className={`menuListItem`}>
                      <AppLink to="/dashboard/teacher-classrooms-list">
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Classroom</span>
                      </AppLink>
                    </li>
                  }
                  {item === "manage_online_class" &&
                    <li className={`menuListItem`}>
                      <AppLink to="/dashboard/teacher-online-class">
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Online Class</span>
                      </AppLink>
                    </li>
                  }
                  {item === "manage_assignment" &&
                    <li className={`menuListItem`}>
                      <AppLink to="/dashboard/teacher-assignments">
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Assignment</span>
                      </AppLink>
                    </li>
                  }
                  {item === "manage_online_test" &&
                    <li className={`menuListItem`}>
                      <AppLink to="/dashboard/teacher-online-test">
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Online Test</span>
                      </AppLink>
                    </li>
                  }
                  {item === "manage_study_material" &&
                    <li className={`menuListItem`}>
                      <AppLink to="/dashboard/teacher/course-list">
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Study Material</span>
                      </AppLink>
                    </li>
                  }
                  {/* <li>
                          <AppLink to="/dashboard/teacher-report-card">
                            <img src={IconReportCard} alt="Teacher Report Card" />
                            <span>Report Card</span>
                          </AppLink>
                        </li> */}
                  {item === "manage_attendance" &&
                    <li className={`menuListItem`}>
                      <AppLink to="/dashboard/attendance-teacher-classroomSubjectlist">
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Attendance</span>
                      </AppLink>
                    </li>
                  }
                  {item === "manage_visitor_management" &&
                    <li className={`menuListItem`}>

                      {/* <span className="rtBadge text-2xs white">New</span> */}
                      <AppLink to="/teacher-visitor-management">
                        <span className="iconCustom">
                          <i className="menuIcon home"></i>
                        </span>
                        <span className="title">Visitor Management</span>
                      </AppLink>
                    </li>
                  }
                </>
              )
            })
          }
        </>
      ) : ("")
      }
    </ul>
  );
};
export default TeacherMenuListItem;
