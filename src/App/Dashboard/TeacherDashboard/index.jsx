/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import TeacherTheme from "../../../Common/Theme/TeacherTheme";
import AppLink from "../../../Common/AppLink";
import {
  Fullname,
  UserInstitute,
  UserInstituteAddress,
} from "../../../Common/UserElement";
import { useDispatch, useSelector } from "react-redux";
import { readCoursesHeader } from "../../../store/actions/courseHeader";
import Storage from "../../../Classes/Storage";
import SessionStorage from "../../../Classes/SessionStorage";
import "./TeacherDashboard.scss";
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
import Auth from "../../../Classes/Auth";
import { useNavigate } from "react-router-dom";
const TeacherDashboard = () => {
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
    <React.Fragment>
      <div className="user-db-wrapper">
        <div className="user-db-head">
          <h1 className="text-md w-500 capitalize">
            <Fullname />
          </h1>
          <p className="text-xs w-300">Teacher</p>
          <h2 className="text-xs w-500 secondary mt-20">
            <UserInstitute />
          </h2>
          <p className="text-xs w-300 mt-3">
            <UserInstituteAddress />
          </p>
          <AppLink
            to={`/profile/${user.user_username}`}
            className="button btn-o-secondary btn-sm secondary mt-20 w-500"
          >
            Manage Personal Profile
            <i className="animate-r-arrow-icon"></i>
          </AppLink>
        </div>
        <ul className="db-items teacher">
          {user.user_role_access && user.user_role_access.length > 0 ? (
            <>
              {
                user.user_role_access.map((item) => {
                  return (
                    <>
                      {item === "manage_classroom" &&
                        <li>
                          <AppLink to="/dashboard/teacher-classrooms-list">
                            <i className="teacher-classroomIcon"></i>
                            <span>Classroom</span>
                          </AppLink>
                        </li>
                      }
                      {item === "manage_online_class" &&
                        <li>
                          <AppLink to="/dashboard/teacher-online-class">
                            <i className="teacher-OnlineClass"></i>
                            <span>Online Class</span>
                          </AppLink>
                        </li>
                      }
                      {item === "manage_assignment" &&
                        <li>
                          <AppLink to="/dashboard/teacher-assignments">
                            <i className="teacher-Assignment"></i>
                            <span>Assignment</span>
                          </AppLink>
                        </li>
                      }
                      {item === "manage_online_test" &&
                        <li>
                          <AppLink to="/dashboard/teacher-online-test">
                            <i className="teacher-Onlinetest"></i>
                            <span>Online Test</span>
                          </AppLink>
                        </li>
                      }
                      {item === "manage_study_material" &&
                        <li>
                          <AppLink to="/dashboard/teacher/course-list">
                            <i className="teacher-Studymaterial"></i>
                            <span>Study Material</span>
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
                        <li>
                          <AppLink to="/dashboard/attendance-teacher-classroomSubjectlist">
                            <i className="teacher-Attendance"></i>
                            <span>Attendance</span>
                          </AppLink>
                        </li>
                      }
                      {item === "manage_visitor_management" &&
                        <li>

                          {/* <span className="rtBadge text-2xs white">New</span> */}
                          <AppLink to="/teacher-visitor-management">
                            <i className="teacher-Visitormanagement"></i>
                            <span>Visitor Management</span>
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
        {
        //   <div className="db-navigation-button">
        //   {/* <AppLink
        //     to="/community"
        //     className="button btn-sm btn-o-secondary secondary"
        //   >
        //     Discover Edneed Community <i className="animate-r-arrow-icon"></i>
        //   </AppLink> */}
        //   <AppLink
        //     to="/edneed-review"
        //     className="button btn-sm btn-o-secondary secondary mt-8"
        //   >
        //     Write your Review <i className="animate-r-arrow-icon"></i>
        //   </AppLink>

        // </div>
        }
      </div>
    </React.Fragment>
  );
};
export default TeacherDashboard;
