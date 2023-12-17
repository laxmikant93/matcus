/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import InstituteTheme from "../../../Common/Theme/InstituteTheme";
import AppLink from "../../../Common/AppLink";
import {
  UserInstitute,
  Fullname,
  UserInstituteAddress,
} from "../../../Common/UserElement";
import IconClassroom from "../InstituteDashboard/icon-classroom.svg";
import IconCourse from "../InstituteDashboard/icon-course.svg";
import IconFeeManagement from "../InstituteDashboard/icon-fee-management.svg";
import IconStudent from "../InstituteDashboard/icon-student.svg";
import IconTeacher from "../InstituteDashboard/icon-teacher.svg";
import IconWebsite from "../InstituteDashboard/icon-website.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCoursesHeader } from "../../../store/actions/courseHeader";
import SessionStorage from "../../../Classes/SessionStorage";
import ImageBlur from "../InstituteDashboard/imageBlur.png";
// import TemplateSelect from './Components/TemplateChoose';

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
// import Storage from "../../../Classes/Storage";
import "../InstituteDashboard/InstituteDashboard.scss";
import "../InstituteDashboard/InstituDash.scss";
import IconCalender from "../InstituteDashboard/icon-calender.svg";
import { resetTeacherList } from "../../../store/actions/studentlistuserinfo";
import Auth from '../../../Classes/Auth'
import { useNavigate } from "react-router-dom";
import TemplateChoose from "../InstituteDashboard/Components/TemplateChoose";
import { getInstituteWebsiteData } from "../../../store/actions/instituteinfo";
import { getInstituteCountDetails, getInstituteDetail } from "../../../store/actions/institutes";
import { getDomainDetails, getUserDetails } from "../../../store/actions/privateDomain";
import ProceedToBookStrip from "../InstituteDashboard/ProceedToBookStrip";
import { useState } from "react";
const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const history = useNavigate()
  const { user, instituteData, instituteDataSuccess, userDetails,
    userDetailSuccess,
    userDetailLoading, instituteDetailCountSuccess, instituteDetailData, postedDomainDetailsData, postedDomainDetailsSuccess, instituteDetailDataTemplate } = useSelector((state) => {
      return {
        user: state.user,
        courseHeadingINS: state.courseHeader.list,
        instituteData: state.institute.detail.data,
        instituteDataSuccess: state.institute.detail.success,
        instituteDetailCountSuccess: state.institute.instituteDetailCount.success,
        instituteDetailData: state.institute.instituteDetailCount.data,
        instituteDetailDataTemplate: state.institute.instituteDetailCount.data.template,
        postedDomainDetailsData: state.privatedomain.domainDetailsGet.data,
        postedDomainDetailsSuccess: state.privatedomain.domainDetailsGet.success,
        userDetails: state.privatedomain.getUserDetails.data,
        userDetailSuccess: state.privatedomain.getUserDetails.success,
        userDetailLoading: state.privatedomain.getUserDetails.loading,
      };
    });

  useEffect(() => {
    dispatch(getInstituteCountDetails(user.user_institute, user._id, user.user_business_type))
  }, [dispatch, user._id, user.user_business_type, user.user_institute])
  useEffect(() => {
    dispatch(getInstituteDetail(user.user_institute))
  }, [dispatch, user.user_institute])
  useEffect(() => {
    dispatch(getDomainDetails(user._id, user.user_institute, user.user_business_type))
  }, [dispatch, user._id, user.user_business_type, user.user_institute])
  // useEffect(() => {
  //   dispatch(resetTeacherList());
  //   dispatch(readCoursesHeader(user.user_institute));
  //   SessionStorage.remove(privateDomainOpt);
  //   SessionStorage.remove(privateDomain);
  //   SessionStorage.remove(privateDomainTLDS);
  //   SessionStorage.remove(createPrivateDomainNewInstiute);
  //   SessionStorage.remove(registrationWorkDone);
  //   SessionStorage.remove(registerDetails);
  //   SessionStorage.remove(totalPriceValue);
  //   SessionStorage.remove(PaymentComplete);
  //   SessionStorage.remove(privateDomainOfflineFlow);
  //   SessionStorage.remove(privateDomainAddNewIns);
  //   SessionStorage.remove(privateDomainBookNew);
  //   SessionStorage.remove(privateDomainProceedToCheckout);
  //   SessionStorage.remove("UserRegistration");
  //   SessionStorage.remove("RegisterInstitiute");
  //   SessionStorage.remove("DomainName");
  //   Storage.remove("__wz_pd_offl__");
  //   Storage.remove("__wz_pd_adni__");
  //   SessionStorage.remove("InstituteWebsite");
  //   SessionStorage.remove(uid);
  //   SessionStorage.remove(instiid);
  //   SessionStorage.remove("__wz_pd_ptc__");
  //   Storage.remove("__wz_pd_ptc__");
  //   Storage.remove("__wz_pd_adni__");
  //   Storage.remove("registerDetails");
  //   Storage.remove("__wz_pd_ip__");
  // }, [dispatch, user]);
  useEffect(() => {
    if (Auth.isLogin() && window.location.pathname === "/") {
      history('/dashboard')
    }
  }, [history])

  const templateData = {
    themeName: "vaspertine",
    websiteUrl: "edneed.com"
  }

  // Institute data info
  const info = [
    {
      id: 1,
      text1: "No. of Students",
      icon: "student-icon",
      count: instituteDetailCountSuccess && instituteDetailData.student,
      text2: "Manage Students",
      url: "/student-dashboard-route"
    },
    {
      id: 2,
      text1: "No. of Teachers",
      icon: "teacher-icon",
      count: instituteDetailCountSuccess && instituteDetailData.teacher,
      text2: "Manage Teachers",
      url: "/teacher-dashboard-route"
    },
    {
      id: 3,
      text1: "No. of Classrooms",
      icon: "classroom-icon",
      count: instituteDetailCountSuccess && instituteDetailData.course,
      text2: "Manage Classrooms",
      url: "/courses-route"
    },
    // {
    //   id: 4,
    //   text1: "Fees Collected ",
    //   icon: "fee-icon",
    //   count: 1600,
    //   text2: "Manage Fees",
    //   url: "/fee-management"
    // },
    {
      id: 5,
      text1: "Customer Inquiries",
      icon: "inqueryBig-icon",
      count: instituteDetailCountSuccess && instituteDetailData.customer,
      text2: "Manage Inquiries",
      url: "/contact-list"
    },
  ]
  const BookPrivateDomain = () => {
    history("/check-domain");
  };
  const ProceedToBook = () => {
    
    history(`/myCart/${postedDomainDetailsData.domain}`);
  };
  const openSubDomain = () => {
    window.open(
      `https://${instituteData.domain}`
    );
  };

  const hireanexpert = () => {
    history("/contact")
  }

  // useEffect(() => {
  //   if (instituteDetailCountSuccess && instituteDetailData && instituteDetailData.template) {
 
  //     setDefaulttemplateData(instituteDetailData.template.data)
  //   }
  // }, [instituteDetailCountSuccess, instituteDetailData, instituteDetailData.template])


  const teacherBulkUploadSuccess = useSelector(
    (state) => state.inviteteacher.create.success
  );
  const studentBulkUploadSuccess = useSelector(
    (state) => state.students.create.success
  );
  return (
    <React.Fragment>
      <div className="instituteDashboard-container">
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
        <div className="deshwelcome-wrapper">
          <div>
            <h1 className=" text-md base w-600">Welcome, <span>{user.user_fullname}</span></h1>
            <p className="text-xs base w-400">Personalize your website here</p>
          </div>
          <div className="SupportRequest-wrapper">
            <p>Have an existing domain?</p>
            <button className="button btn-o-primary btn-sm">Send Support Request</button>
          </div>
        </div>

        {instituteDataSuccess && instituteData.domain ? (
          <div className="instituteDashboard-edit">

          </div>
        ) : instituteDataSuccess && !instituteData.domain && postedDomainDetailsSuccess && postedDomainDetailsData === null ? (
          <ProceedToBookStrip title="Buy Domain right now !" btnName="Buy Domain" handleClick={BookPrivateDomain} />
        ) : postedDomainDetailsSuccess && postedDomainDetailsData !== null && (
          <ProceedToBookStrip title="1 Domain is in your Cart. Check Out Now!" btnName="Proceed to Book" handleClick={ProceedToBook} />

        )}



        {/* {instituteDataSuccess && !instituteData.domain && postedDomainDetailsSuccess && postedDomainDetailsData === null ? (
          <ProceedToBookStrip title="Buy Domain right now !" btnName="Buy Domain" handleClick={BookPrivateDomain} />
        ) : postedDomainDetailsSuccess && postedDomainDetailsData !== null && (
          <ProceedToBookStrip title="1 Domain is in your Cart. Check Out Now!" btnName="Proceed to Book" handleClick={ProceedToBook} />
        )} */}

        <div className="instituteDashboard-middle-section">
          <TemplateChoose defaultTemp={instituteDetailDataTemplate} domain={instituteData.domain} instituteDetailCountSuccess={instituteDetailCountSuccess} />
          <div className="instituteDashboard-middle-right">
            <h1 className="text-s w-400 primary">Manage Profile</h1>
            <p className="text-xxs w-400 base mt-8">Update your Institute Information. Manage your profile here.</p>
            <AppLink className="button button-primary btn-s mt-15" to={`/profile/${user.user_username}`}>Manage Profile</AppLink>
            <hr className="mt-15 mb-15" />
            <div className="instituteDashboard-inquery-wrap">
              <div className="instituteDashboard-icon-wrap">
                <div className="icon-circle">
                  <i className="icons icon-large inquery-icon"></i>
                </div>
                <div>
                  <h2 className="text-s w-500 gray">Customer Inquiries</h2>
                </div>

              </div>
              <div className="instituteDashboard-number-wrap">
                {instituteDetailCountSuccess &&
                  <p className="text-sm w-600">{instituteDetailData.customer}</p>
                }
              </div>
            </div>
            <p className="text-xxs w-300 mt-15">Stuck somewhere? Get help from our expert website designers to
              get you out of your problems.</p>
            <button className="button btn-o-primary btn-s mt-20" onClick={hireanexpert}>Hire an expert</button>
          </div>
        </div>
        <div className="instituteDashboard-card-container">
          {
            info.map((option) => {
              return (
                <div className="instituteDashboard-card ">
                  <p className="text-xs w-500 capitalize">{option.text1}</p>
                  <div className="instituteDashboard-card-icon-div">
                    <i className={`${option.icon} icons icon-Extra-large`}></i>
                    <p className="text-sm w-500">{option.count}</p>
                  </div>
                  <hr className="mt-15 mb-15" />
                  <AppLink to={option.url}>
                    <div className="instituteDashboard-card-fee-div">

                      <p className="text-xxs w-500 primary capitalize cursor">{option.text2}</p>
                      <div className="arrow-div">
                        <span className="right-expend">&#x203A;</span>
                        {/* <i className="ed-icon i-xxxs primary icon-faqs"></i> */}
                      </div>
                    </div>
                  </AppLink>
                </div>
              )
            })
          }
        </div>
      </div>
    </React.Fragment>
    // <React.Fragment>
    //   <div className="user-db-wrapper">
    //     <div className="user-db-head">
    //       <h1 className="text-md w-500 capitalize">
    //         <Fullname />
    //       </h1>
    //       <p className="text-xs w-300">Institute Admin</p>
    //       <h2 className="text-xs w-500 primary mt-20">
    //         <UserInstitute />
    //       </h2>
    //       <p className="text-xs w-300 mt-3">
    //         <UserInstituteAddress />
    //       </p>
    //       <AppLink
    //         to="/manage-institute"
    //         className="button btn-o-primary btn-sm mt-10"
    //       >
    //         Manage Institute Profile
    //         <i className="animate-r-arrow-icon"></i>
    //       </AppLink>
    //     </div>
    //     {/* <div className="db-notification-bar">
    //         <div className="notification-wrapper alert">
    //           <h4 className="red">Payment KYC is pending.</h4>
    //           <p className="text-2xs w-500">
    //             Please activate your KYC to receive payments.
    //           </p>
    //           <AppLink
    //             to="/dashboard/kyc-verification"
    //             target="_blank"
    //             className="button btn-sm btn-o-red red"
    //           >
    //             Proceed Now!
    //           </AppLink>
    //         </div> */}
    //     {/* start code for pending approval */}
    //     {/* start code for pending approval 
    //         <div className="notification-wrapper greenPending">
    //           <p className="text-xxs w-500 secondary">
    //             Payment KYC is under approval.
    //           </p>
    //         </div>
    //         */}
    //     {/* end code for pending approval */}
    //     {/* </div> */}
    //     <ul className="db-items sadmin">

    //       {user.user_role_access && user.user_role_access.length > 0 ? (
    //         <>
    //           {
    //             user.user_role_access.map((item, key) => {
    //               return (
    //                 <React.Fragment key={key}>
    //                   {
    //                     item === "manage_website" &&
    //                     <li>
    //                       <AppLink
    //                         to="/website-manage"
    //                         className="dgray text-xxs w-400"
    //                       >
    //                         <i className="admin-websiteIcon"></i>
    //                         <span>Website</span>
    //                       </AppLink>
    //                     </li>
    //                   }
    //                   {item === "manage_classroom" &&
    //                     <li>
    //                       <AppLink to="/courses-route" className="text-xxs w-400">
    //                         <i className="admin-classroomIcon"></i>
    //                         <span>
    //                           {courseHeadingINS.success ?
    //                             courseHeadingINS.data ?
    //                               courseHeadingINS.data.coursehead
    //                               : "Classroom" : ""}
    //                         </span>
    //                       </AppLink>
    //                     </li>
    //                   }
    //                   {item === "manage_teacher" &&
    //                     <li>
    //                       <AppLink to="/teacher-dashboard-route" className="text-xxs w-400">
    //                         <i className="admin-teacherIcon"></i>
    //                         <span>Staff</span>
    //                       </AppLink>
    //                     </li>
    //                   }
    //                   {item === "manage_student" &&
    //                     <li>
    //                       <AppLink to="/student-dashboard-route" className="text-xxs w-400">
    //                         <i className="admin-studentIcon"></i>
    //                         <span>Students</span>
    //                       </AppLink>
    //                     </li>
    //                   }
    //                   {item === "manage_study_material" &&
    //                     <li>
    //                       <AppLink to="/course" className="text-xxs w-400">
    //                         <i className="admin-studymaterialIcon"></i>
    //                         <span>Study Material</span>
    //                       </AppLink>
    //                     </li>
    //                   }
    //                   {item === "manage_attendance" &&
    //                     <li>
    //                       {/* <span className="rtBadge text-2xs white">New</span> */}
    //                       <AppLink to="/admin-attendance-classroomSubjectlist">
    //                         <i className="admin-CalenderIcon"></i>
    //                         <span>Attendance</span>
    //                       </AppLink>
    //                     </li>
    //                   }
    //                   {item === "manage_fee_management" &&
    //                     <li>
    //                       {/* <span className="rtBadge text-2xs white">New</span> */}
    //                       <AppLink to="/fee-management" className="text-xxs w-400">
    //                         <i className="admin-feemanagementIcon"></i>
    //                         <span>Fee management</span>
    //                       </AppLink>
    //                     </li>
    //                   }
    //                   {item === "manage_guard_management" &&
    //                     <li>
    //                       {/* <span className="rtBadge text-2xs white">New</span> */}
    //                       <AppLink to="/visitor-management-list" className="text-xxs w-400">
    //                         <i className="admin-guardManagementIcon"></i>
    //                         <span>Guard management</span>
    //                       </AppLink>
    //                     </li>
    //                   }
    //                   {item === "manage_visitor_management" &&
    //                     <li>
    //                       <AppLink to="/visitor-management" className="text-xxs w-400">
    //                         <i className="admin-visitorManagementIcon"></i>
    //                         {/* <img src={IconVisitorManagement} alt="Visitor Management" /> */}
    //                         <span>Visitor Management</span>
    //                       </AppLink>
    //                     </li>
    //                   }


    //                   {item === "manage_access_control" &&

    //                     <li>
    //                       <AppLink to="/access-control" className="text-xxs w-400">
    //                         <i className="admin-accessControlIcon"></i>
    //                         <span>Access Control</span>
    //                       </AppLink>
    //                     </li>
    //                   }  </React.Fragment>
    //               )
    //             })
    //           }
    //         </>
    //       ) : ("")
    //       }
    //       {/* <li>
    //           <AppLink to="/check-category" className="text-xxs w-400">
    //             <i className="admin-bookAppoinmentIcon"></i>
    //             <span>Book Appointment</span>
    //           </AppLink>
    //         </li> */}
    //     </ul>
    //     <div className="db-navigation-button">
    //       <AppLink
    //         to="/community"
    //         className="button btn-sm btn-o-primary primary"
    //       >
    //         Discover Edneed Community <i className="animate-r-arrow-icon"></i>
    //       </AppLink>
    //       <AppLink
    //         to="/edneed-review"
    //         className="button btn-sm btn-o-primary primary mt-8"
    //       >
    //         Write your Review <i className="animate-r-arrow-icon"></i>
    //       </AppLink>
    //     </div>
    //   </div>
    // </React.Fragment>
  );
}
export default EmployeeDashboard