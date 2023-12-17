import { React, Component } from "react";
import { connect } from "react-redux";
import DashboardHoc from "../../Hoc/DashboardHoc";
import InstituteRegistration from "../InstituteRegistration";
import { dsh_mainMapStateToProps } from "./DashboardMapDispatch";
import InstituteDashboard from "./InstituteDashboard";
import StudentDashboard from "../../App/Dashboard/StudentDashboard/StudentClassrooms/index";
// import StudentRegistration from "./StudentRegistration";
import TeacherDashboard from "../../App/Dashboard/TeacherDashboard/TeacherClassrooms/TeacherClassroomsList/index";
import EmployeeDashboard from "./EmployeeDashboard";
// import TeacherInvitationValidate from "../Dashboard/TeacherDashboard/TeacherInvitationValidate";
import CheckDomain from "../Admin/Website/CheckDomain";
import Feed from "../Feed";
import SessionStorage from "../../Classes/SessionStorage";
import { privateDomainAddNewIns } from "../../Constant/auth";
import ServicesSelection from "../Auth/ServiceSelection";
import DashboardHome from "./EcommerceDashboard/pages/DashboardHome";
import EdneedFeed from "../Feed";
import ServiceDashboard from "./ServiceDashboard";

class Dashboard extends Component {
  getDefaultHomePage = (user, businessType) => {
    // !user.user_institute && user.user_usertype==="InstituteOwner"
    // if (user.user_usertype === "InstituteOwner") {
    //   SessionStorage.setBool(privateDomainAddNewIns, true);
    //   return <CheckDomain />;
    // } else if (
    //   user.user_usertype === "Other" ||
    //   user.user_usertype === "Teacher" ||
    //   user.user_usertype === "Student"
    // ) {
    //   // !user.user_institute && user.user_usertype==="Other"
    //   return <Feed />;
    // } else {
    //   return <ServicesSelection />;
    // }
    if (businessType === "LMS") {
      return <EdneedFeed />
    }
  };

  getUserOption = (option, user, businessType) => {
    if (businessType !== "null") {
      if (businessType === "LMS") {
        switch (option) {
          case process.env.REACT_APP_PAGE_OWNER:
            return <InstituteDashboard />;

          case process.env.REACT_APP_PAGE_OWNER_NEW:
            return <InstituteRegistration />;

          case process.env.REACT_APP_TEACHER:
            return <TeacherDashboard />;

          case process.env.REACT_APP_EMPLOYEE:
            return <EmployeeDashboard />;

          //   case process.env.REACT_APP_TEACHER_NEW:
          //     return <TeacherInvitationValidate />;

          case process.env.REACT_APP_STUDENT:
            return <StudentDashboard />;

          //   case process.env.REACT_APP_STUDENT_NEW:
          //     return <StudentRegistration />;

          default:
            return <InstituteDashboard />;
        }
      } else if (businessType === "Ecommerce") {
        return <DashboardHome />
      } else if (businessType === "Services") {
        return <ServiceDashboard />
      }
    } else {
      return <ServicesSelection />
    }
  };

  render() {
    return (
      <DashboardHoc>
        {({ userType, user, businessType }) => {
          return this.getUserOption(userType, user, businessType);
        }}
      </DashboardHoc>
    );
  }
}

export default connect(dsh_mainMapStateToProps, null)(Dashboard);
