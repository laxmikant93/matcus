import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { OwnerRoute, StudentRoute, TeacherRoute } from '../RoleBasedRoute'
import basicdetailV1 from "../../App/Auth/BasicDeatail"
import InstituteDetailsV1 from "../../App/Auth/InstituteDetails"
import GetWebsiteV1 from "../../App/Auth/GetWebsite"
import WebsiteOverviewV1 from "../../App/Auth/WebsiteOverview"
import PrivateDomainV1 from "../../App/Auth/PrivateDomain"
import StaffList from "../../App/AdminDashboard/Teacher";
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl'
import Auth from '../../Classes/Auth'
import HomeRoute from '../HomeRoute'
// import InstituteWebsite from '../../InstituteWebsite'
import WebsiteRoute from '../../WebsiteTemplateCustomization/WebsiteRoute'
import TemplateRoutes from '../TemplateRoutes'
import error404 from '../../Common/Error404'
import DashboardSetting from '../../App/BuisnessDashboard/DashboardSetting'
import MailSetting from '../../App/BuisnessDashboard/DashboardSetting/BusinessSetting/MailSetting/MailSetting'
import BusinessSetting from '../../App/BuisnessDashboard/DashboardSetting/BusinessSetting/BusinessSetting'
import WebsiteSetting from '../../App/BuisnessDashboard/DashboardSetting/WebsiteSetting/WebsiteSetting'
import PageNotFound from '../../Common/PageNotFound/PageNotFound'
const PreviewCustomAndPreferred = lazy(() =>
  import("../../InstituteWebsite/SkinEdit/PreviewCustomAndPreferred")
);
const AddSocialLinks = lazy(() =>
  import("../../App/AdminDashboard/Website/SocialLinks/AddSocialLinks")
);

const FeePaymentCheckout = lazy(() => import("../../App/FeeManagement/StudentFeeManagement/FeePaymentCheckout"))
const EditInstituteDashboard = lazy(() =>
  import("../../App/InstituteRegistration/ManageInstituteInfo")
);
const CreateAdminOnlineClassBreadCrumb = lazy(() =>
  import(
    "../../App/AdminDashboard/Courses/ViewClassroom/ClassroomOnlineClass/CreateAdminOnlineClassBreadcrumb"
  )
);
const TeacherClassroomCreateOnlineClass = lazy(() =>
  import(
    "../../App/Dashboard/TeacherDashboard/TeacherClassrooms/TeacherClassroomTab/TeacherOnlineClassesTab/TeacherClassroomCreateOnlineClass"
  )
);

const ImageCropper = lazy(() => import("../../Common/Cropper"));
const StudentSubjectList = lazy(() =>
  import(
    "../../App/Dashboard/StudentDashboard/StudentClassrooms/StudentSubjectList/index"
  )
);
const CreateTeacherOnlineClassBreadCrumb = lazy(() =>
  import(
    "../../App/Dashboard/TeacherDashboard/OnlineClasses/CreateTeacherOnlineClassBreadcrumb"
  )
);
const TeacherAttendanceClassroomList = lazy(() =>
  import("../../App/Attendance/TeacherAttendance/TeacherAttendanceClassroomList")
);
const StudentAttendanceClassroomList = lazy(() =>
  import("../../App/Attendance/StudentAttendance/StudentAttendanceClassroomList")
);
const StudentAttendanceView = lazy(() =>
  import("../../App/Attendance/StudentAttendance/StudentAttendanceView")
);
const StudentViewLeaves = lazy(() =>
  import(
    "../../App/Attendance/StudentAttendance/StudentLeaveRequest/StudentLeaveRequestList"
  )
);

const NewLeaveRequest = lazy(() =>
  import(
    "../../App/Attendance/StudentAttendance/StudentLeaveRequest/SendLeaveRequest"
  )
);
const StudentHolidaysCalender = lazy(() =>
  import("../../App/Attendance/HolidayCalendar/StudentHolidayCalender/index")
);

const OnlineClass = lazy(() => import("../../App/OnlineClasses/Index"));

const InviteStudents = lazy(() =>
  import("../../App/AdminDashboard/Student/InviteStudents")
);
const InviteStudentsStatus = lazy(() =>
  import("../../App/AdminDashboard/Student/InviteStudentStatus")
);
const InvitationHistory = lazy(() => import("../../App/InvitationHistory"));
const EditStudent = lazy(() =>
  import("../../App/AdminDashboard/Student/EditStudent/index")
);

const InviteFaculty = lazy(() =>
  import("../../App/AdminDashboard/Teacher/InviteFaculty")
);
const EditFaculty = lazy(() =>
  import("../../App/AdminDashboard/Teacher/EditFaculty")
);
const EditTeacher = lazy(() =>
  import("../../App/AdminDashboard/Teacher/EditTeacher")
);
const InviteFacultyStatus = lazy(() =>
  import("../../App/AdminDashboard/Teacher/InviteFacultyStatus")
);
// const InviteFacultyList = lazy(() =>
//   import("../App/AdminDashboard/Teacher/InviteFacultyList")
// );
const ManageFaculty = lazy(() =>
  import("../../App/AdminDashboard/Website/Faculty/ManageFaculty")
);
const AddFaculty = lazy(() =>
  import("../../App/AdminDashboard/Website/Faculty/AddFaculties")
);
const MetaTags = lazy(() => import("../../App/AdminDashboard/Website/MetaTags"));

const SupportCenter = lazy(() =>
  import("../../App/AdminDashboard/Website/SupportCenter")
);
const EditWebFaculty = lazy(() =>
  import("../../App/AdminDashboard/Website/Faculty/EditWebFaculty")
);


//Blogs
const Blogs = lazy(() => import("../../App/AdminDashboard/InstituteBlogs"));
const BlogList = lazy(() => import("../../App/AdminDashboard/InstituteBlogs/blogListIndex"));
const BlogComments = lazy(() => import("../../App/AdminDashboard/InstituteBlogs/blogComments"));
const BlogCategories = lazy(() => import("../../App/AdminDashboard/InstituteBlogs/blogCategories"));
const AddNewBlog = lazy(() => import("../../App/AdminDashboard/InstituteBlogs/createBlog"));
const PreviewCategory = lazy(() => import("../../App/AdminDashboard/InstituteBlogs/previewCategory"));
const PreviewBlog = lazy(() => import("../../App/AdminDashboard/InstituteBlogs/previewBlog"));
// const WesbitePreviewBlog = lazy(() => import("../InstituteWebsite/Institute_Blogs/PreviewBlog"));
// const WebsiteCategoriesList = lazy(() => import("../InstituteWebsite/Institute_Blogs/CategoriesList"));
// const WebsiteFeatureBlogs = lazy(() => import("../InstituteWebsite/Institute_Blogs/FeatureBlogsList"));
// const AuthorBlogs = lazy(() => import("../InstituteWebsite/Institute_Blogs/AuthorBlogList"));

const Dashboard = lazy(() => import("../../App/Dashboard"));

//pages
const InviteStudentList = lazy(() =>
  import("../../App/AdminDashboard/Student/InviteStudentList")
);
const Gallery = lazy(() =>
  import("../../App/AdminDashboard/Website/Gallery/Gallery")
);
const EditGallery = lazy(() =>
  import("../../App/AdminDashboard/Website/Gallery/EditGallery")
);

const AccountSetting = lazy(() => import("../../App/Admin/AccountSetting"));

const SchoolAdminCourse = lazy(() =>
  import("../../App/AdminDashboard/Courses/Course")
);
const ViewClassroom = lazy(() =>
  import("../../App/AdminDashboard/Courses/ViewClassroom")
);
const ViewClassroomAssignment = lazy(() =>
  import("../../App/AdminDashboard/Courses/ViewClassroom/ViewAssignment")
);
const EditCourse = lazy(() =>
  import("../../App/AdminDashboard/Courses/EditCourse")
);

const AssignTeacherMultipleClassroom = lazy(() =>
  import("../../App/AdminDashboard/Courses/AssignTeacherMultipleClassroom")
);
const UpdateStudentMultipleCourses = lazy(() =>
  import("../../App/AdminDashboard/Courses/UpdateStudentMultipleCourses")
);
const CourseEditStudentList = lazy(() =>
  import("../../App/AdminDashboard/Courses/CourseEditStudentList")
);

const CoursesRoute = lazy(() =>
  import("../../App/AdminDashboard/Courses/CoursesRoute")
);
const CourseHeaderModal = lazy(() =>
  import("../../App/AdminDashboard/Courses/CourseHeaderModal")
);
const WebsiteManage = lazy(() =>
  import("../../App/AdminDashboard/Website/WebsiteManage")
);
const AnnouncementList = lazy(() =>
  import("../../App/AdminDashboard/Website/Announcements/AnnouncementList")
);
const StudentJoinClass = lazy(() =>
  import("../../App/Dashboard/StudentDashboard/StudentJoinClass")
);
const ViewStudentClassroom = lazy(() =>
  import(
    "../../App/Dashboard/StudentDashboard/StudentClassrooms/ViewStudentClassroom/index"
  )
);
const StudentClassrooms = lazy(() =>
  import("../../App/Dashboard/StudentDashboard/StudentClassrooms/index")
);
const StudentDashboardRoute = lazy(() =>
  import("../../App/Dashboard/StudentDashboard/StudentDashboardRoute")
);
const TeacherDashboardRoute = lazy(() =>
  import("../../App/Dashboard/TeacherDashboard/TeacherDashboardRoute")
);
const FacultyRoute = lazy(() =>
  import("../../App/AdminDashboard/Website/Faculty/FacultyRoute")
);

// const CheckPaymentRoute = lazy(() =>
//   import("../App/AdminDashboard/Website/FeeStructure/CheckPaymentRoute")
// );
const InstituteWebsiteDashboardRoute = lazy(() =>
  import("../../App/Dashboard/InstituteDashboard/InstituteWebsiteDashboardRoute")
);
const InstituteInfoManage = lazy(() =>
  import("../../App/AdminDashboard/Website/EditOverwiew/InstituteInfoManage")
);
const TeacherOnlineClass = lazy(() =>
  import("../../App/Dashboard/TeacherDashboard/OnlineClasses/index")
);
const TeacherAssignments = lazy(() =>
  import("../../App/Dashboard/TeacherDashboard/TeacherAssignments")
);
const TeacherAssignmentView = lazy(() =>
  import("../../App/Dashboard/TeacherDashboard/TeacherAssignmentView")
);

const TeacherExamReview = lazy(() =>
  import("../../App/OnlineExam/TeacherExamReview")
);
const TeacherSubmissionList = lazy(() =>
  import("../../App/OnlineExam/TeacherSubmissionList")
);
const OnlineExamList = lazy(() => import("../../App/OnlineExam/OnlineExamList"));
const OnlineExam = lazy(() => import("../../App/OnlineExam/CreateQuestions"));
const EditQuestionPaper = lazy(() => import("../../App/OnlineExam/EditQuestions"));
const OnlineExamStudent = lazy(() => import("../../App/OnlineExamStudent"));
const StudentExamRoute = lazy(() =>
  import("../../App/OnlineExamStudent/StudentExamRoute")
);
const ExamInstruction = lazy(() =>
  import("../../App/OnlineExamStudent/ExamInstruction")
);
const OnlineExamStudentList = lazy(() =>
  import("../../App/OnlineExamStudent/OnlineExamStudentList/OnlineExamList")
);
const StudentCourseDetailList = lazy(() =>
  import("../../App/Course/StudentCourse/index")
);
const StudentFeeListing = lazy(() =>
  import("../../App/FeeManagement/StudentFeeManagement")
);
const StudentFeeListingDetails = lazy(() =>
  import("../../App/FeeManagement/StudentFeeManagement/StudentFeeListingDetails")
);
const StudentFeeConfirmation = lazy(() =>
  import("../../App/FeeManagement/StudentFeeManagement/StudentFeeConfirmation")
);
const StudentInvoicePrint = lazy(() =>
  import("../../App/Dashboard/StudentDashboard/StudentInvoicePrint")
);
const CourseDetailView = lazy(() =>
  import("../../App/Course/StudentCourse/CourseDetailView")
);
const TeacherCourseDetailList = lazy(() =>
  import("../../App/Course/TeacherCourse/index")
);
const OnlineExamResult = lazy(() =>
  import("../../App/OnlineExamStudent/OnlineExamResult")
);

const MeetToken = lazy(() =>
  import("../../App/Dashboard/TeacherDashboard/GoogleMeet/MeetToken")
);

const StudentAssignments = lazy(() =>
  import("../../App/Dashboard/StudentDashboard/StudentAssignments")
);

const StudentAssignmentView = lazy(() =>
  import("../../App/Dashboard/StudentDashboard/StudentAssignmentView")
);
const StudentAssignmentViewResult = lazy(() =>
  import("../../App/Dashboard/StudentDashboard/StudentAssignmentsViewResult")
);
const EmailResetPassword = lazy(() =>
  import("../../App/Auth/ResetPassword/ResetPassword")
);
const NoticeBoard = lazy(() =>
  import("../../App/AdminDashboard/Website/NoticeBoard/NoticeBoardList")
);
const NoticeBoardPopUp = lazy(() =>
  import("../../App/AdminDashboard/Website/NoticeBoard/NoticeBoardPopUp")
)

//contact_list
const ContactList = lazy(() =>
  import("../../App/AdminDashboard/Website/ContactUs/index")
);

//MenuHeader
const MenuHeader = lazy(() =>
  import("../../App/AdminDashboard/Website/MenuHeader/MenuHeader")
);



//InstituteWebsite
const Error404 = lazy(() => import("../../Common/Error404"));
const AccessDenied = lazy(() => import("../../ErrorPage/AccessDenied"));


const FeeManagement = lazy(() => import("../../App/FeeManagement/AdminFeeManagment"));

/***Guard Management */
const VisitorManagement = lazy(() => import("../../App/AdminDashboard/Visitors"));
const AddVisitors = lazy(() => import("../../App/AdminDashboard/Visitors/AddVisitor"));
const PrintVisitorDetail = lazy(() => import("../../App/AdminDashboard/Visitors/PrintVisitorDetails"));
// Book Appointment
const BookAppointment = lazy(() => import("../../App/AdminDashboard/BookAppointment"));

// Book Appointment User Side
const BookAppointmentUserSide = lazy(() => import("../../App/AdminDashboard/BookAppointmentUserside/Index"));
const BookAppointmentMyBooking = lazy(() => import("../../App/AdminDashboard/BookAppointmentUserside/MyBooking"));
const BookAppointmentMyProfile = lazy(() => import("../../App/AdminDashboard/BookAppointmentUserside/MyProfilePage"));

const PaymentCancelError = lazy(() => import("../../App/FeeManagement/StudentFeeManagement/PaymentCancelError"));
const ViewFeeListing = lazy(() => import("../../App/FeeManagement/AdminFeeManagment/ViewFeeList"));
const CollectFee = lazy(() => import("../../App/FeeManagement/AdminFeeManagment/CollectFeeSubComponent/CollectFee"));
const PreviewPaidFee = lazy(() => import("../../App/FeeManagement/AdminFeeManagment/ViewFeeList/PreviewPaidFee"));
//**Notification Routing***/
const Notification = lazy(() => import("../../App/Notifications/Index"));

/***Review Routing***/
const EdneedReviewList = lazy(() => import("../../App/EdneedReview"));
const EdneedReview = lazy(() => import("../../App/EdneedReview/Review"));

/***Close Review Routing***/
/***Course***/
const Course = lazy(() => import("../../App/Course/AdminCourse/index"));
const CreateCourseBreadcrumb = lazy(() =>
  import("../../App/Course/AdminCourse/CreateCourse/CreateCourseBreadcrumb")
);
const ViewClassroomCreateCourse = lazy(() =>
  import(
    "../../App/AdminDashboard/Courses/ViewClassroom/ViewClassroomCreateCourse"
  )
);
const CreateCourseTeacher = lazy(() =>
  import("../../App/Course/TeacherCourse/CreateCourseTeacher")
);
const PreviewCourse = lazy(() => import("../../App/Course/PreviewCourse"));

/***Close Course***/
/***Report Card***/
const TeacherReportCard = lazy(() =>
  import("../../App/ReportCard/TeacherReportCard")
);
const TeacherCreateTerms = lazy(() =>
  import("../../App/ReportCard/TeacherReportCard/Terms")
);
const TeacherCreateGrades = lazy(() =>
  import("../../App/ReportCard/TeacherReportCard/Grades")
);
const ViewGrades = lazy(() =>
  import("../../App/ReportCard/TeacherReportCard/Grades/ViewGrades")
);
const TeacherResultView = lazy(() =>
  import("../../App/ReportCard/TeacherReportCard/ResultView")
);
const TeacherReportCardView = lazy(() =>
  import("../../App/ReportCard/TeacherReportCard/ReportCardView")
);
const PrintReportCard = lazy(() => import("../../App/ReportCard/PrintReportCard"));
const StudentReportCardList = lazy(() =>
  import("../../App/ReportCard/StudentReportCard/ReportCardList")
);
/***Close Report Card***/
/***Attandance***/
const TeacherAttendanceList = lazy(() =>
  import("../../App/Attendance/TeacherAttendance/TeacherAttendanceList")
);
const LeaveRequestList = lazy(() =>
  import(
    "../../App/Attendance/TeacherAttendance/TeacherLeaveRequest/LeaveRequestsList"
  )
);
const TeacherHolidayCalender = lazy(() =>
  import("../../App/Attendance/HolidayCalendar/TeacherHolidayCalender/index")
);
const CreateEditHoildayCalender = lazy(() =>
  import("../../App/Attendance/HolidayCalendar/CreateEditHolidayCalender")
);

/***Close Attandance***/

// **** Domain Registration Ends***//
// Testimonial
const TestimonialList = lazy(() =>
  import("../../App/AdminDashboard/Website/TestimonialList")
);
const AddTestimonial = lazy(() =>
  import("../../App/AdminDashboard/Website/TestimonialList/AddTestimonial")
);
//Close Testimonial
// faqs
const ManageFaqs = lazy(() =>
  import("../../App/AdminDashboard/Website/ManageFaqs")
);
const AddFaqs = lazy(() =>
  import("../../App/AdminDashboard/Website/ManageFaqs/AddFaqs")
);
//Close faqs
// vacancy
const Vacancy = lazy(() => import("../../App/AdminDashboard/Website/Vacancy"));
const PostJob = lazy(() =>
  import("../../App/AdminDashboard/Website/Vacancy/PostJob")
);
const JobDetail = lazy(() =>
  import("../../App/AdminDashboard/Website/Vacancy/JobDetail")
);
const JobApplicantDetail = lazy(() =>
  import("../../App/AdminDashboard/Website/Vacancy/JobDetail/JobApplicantList")
);
//Close vacancy
// admission
const Admission = lazy(() => import("../../App/AdminDashboard/Website/Admission"));
const AddAdmission = lazy(() =>
  import("../../App/AdminDashboard/Website/Admission/AddAdmission")
);
const AdmissionDetail = lazy(() =>
  import("../../App/AdminDashboard/Website/Admission/AdmissionDetail")
);

const AdmissionApplicantDetail = lazy(() =>
  import(
    "../../App/AdminDashboard/Website/Admission/AdmissionDetail/AdmissionApplicantList"
  )
);

///// TEACHER CLASSROOM

const TeacherClassroomList = lazy(() =>
  import(
    "../../App/Dashboard/TeacherDashboard/TeacherClassrooms/TeacherClassroomsList/index"
  )
);
const TeacherClassroomsSubjectView = lazy(() =>
  import(
    "../../App/Dashboard/TeacherDashboard/TeacherClassrooms/TeacherSubjectList/SubjectList"
  )
);
const TeacherViewClassroom = lazy(() =>
  import(
    "../../App/Dashboard/TeacherDashboard/TeacherClassrooms/TeacherClassroomTab/index"
  )
);

const CategoryCreateUpdate = lazy(() => import("../../App/AdminDashboard/BookAppointment/CategoryCreateUpdate"));
const BookingList = lazy(() => import("../../App/AdminDashboard/BookAppointment/BookingList"));
const BookingSetting = lazy(() => import("../../App/AdminDashboard/BookAppointment/BookingSetting"))
const ViewClassroomCreateTeacherCourse = lazy(() =>
  import(
    "../../App/Dashboard/TeacherDashboard/TeacherClassrooms/TeacherClassroomTab/TeacherCoursesTab/ViewClassroomCreateTeacherCourse"
  )
);

//Close admission
// Fee structure
const FeeStructure = lazy(() =>
  import("../../App/AdminDashboard/Website/FeeStructure")
);
const feeConfirmation = lazy(() =>
  import("../../App/FeeManagement/StudentFeeManagement/StudentFeeConfirmation")
)
const AddFeeStructure = lazy(() =>
  import("../../App/AdminDashboard/Website/FeeStructure/AddFeeStructure")
);
const LmsFeeStructure = lazy(() =>
  import("../../App/LMSFeeStructure")
);
const AddLmsFeeStructure = lazy(() =>
  import("../../App/LMSFeeStructure/AddFeeStructure")
);
const UpdateFeeStructure = lazy(() =>
  import("../../App/AdminDashboard/Website/FeeStructure/UpdateFeeStructure")
);
// const LmsUpdateFeeStructure = lazy(() => {
//   import('../App/LMSFeeStructure/UpdateFeeStructure')
// })'
const UpdateLmsFeeStructure = lazy(() => import("../../App/LMSFeeStructure/UpdateFeeStructure"));
const CloneAndEditLmsFeeStructure = lazy(() => import("../../App/LMSFeeStructure/EditAndCloneFeeStructure"))

//Close fee structure
// Services
const Services = lazy(() => import("../../App/AdminDashboard/Website/Services"));
const AddServices = lazy(() =>
  import("../../App/AdminDashboard/Website/Services/AddServices")
);
//Close Services

// payment mode
const PaymentMode = lazy(() =>
  import("../../App/AdminDashboard/Website/PaymentMode")
);
const AddedModeDetails = lazy(() =>
  import("../../App/AdminDashboard/Website/PaymentMode/AddedModeDetails")
);
//Close payment mode

// Site Under Maintenance

/***Skin Theme***/
const SkinTheme = lazy(() => import("../../InstituteWebsite/SkinTheme"));
const SkinEdit = lazy(() => import("../../InstituteWebsite/SkinEdit"));

/***Close Skin Theme***/

const VespertineTheme = lazy(() =>
  import("../../WebsiteTemplateCustomization")
);
const AccessControl = lazy(() =>
  import("../../App/AdminDashboard/AccessControl")
);
const ServiceThemeEditor = lazy(() =>
  import("../../ServiceThemeEditor/ThemeSidebar")
);
//visitor-management-----
const Visitor = lazy(() =>
  import("../../App/AdminDashboard/VisitorManagement/index")
);
const CenterOfExcellance = lazy(() =>
  import("../../App/AdminDashboard/Website/CenterOfExcellance")
);
/////////

const ProtectedRoutes = () => {

  function AuthenticatedRoutes({ children }) {
    if (AppLinkUrl.privateDomain()) {

      return Auth.isLogin() ? children : <TemplateRoutes />;
    } else {

      return Auth.isLogin() ? children : <HomeRoute />;
    }
    //return Auth.isLogin() ? Auth.user().user_password_change? children:<EmailResetPassword />: <Home />  ;
  }
  return (
    <Routes>
      {/* <AuthenticatedRoutes> */}

     
          <Route path="/dashboard" element={<Dashboard/>} exact />
          <Route path="/basicdetailV1" element={<basicdetailV1/>}></Route>
          <Route path="/institutedetailsV1" element={<InstituteDetailsV1/>}></Route>
          <Route path="/getwebsiteV1" element={<GetWebsiteV1/>}></Route>
          <Route path="/websiteoverviewV1" element={<WebsiteOverviewV1/>}></Route>
          <Route path="/privatedomainV1" element={<PrivateDomainV1/>}></Route>

          <Route
            path="/edneed-review-list"
            element={<EdneedReviewList/>}
          />
          <Route path="/edneed-review" element={<EdneedReview/>} />
          <Route
            path="/edneed-update-review/:_id"
            element={<EdneedReview/>}
          />
          <Route
            path="/manage-institute"
            element={<EditInstituteDashboard/>}
            access={"manage_website"}
          />
          <Route
            path="/service-theme-sidebar/:_id"
            element={<ServiceThemeEditor/>}
          />
          <Route
            path="/manage-basic-info"
            element={<EditInstituteDashboard/>}
            access={"manage_website"}
          />
          <Route
            path="/testimonial-list"
            element={<TestimonialList/>}
            access={"manage_website"}
          />
          <Route
            path="/add-testimonial"
            element={<AddTestimonial/>}
            access={"manage_website"}
          />
          <Route path="/fee-structure" element={<FeeStructure/>} access={"manage_website"} />
          <Route path="/LMS/fee-structure" element={<LmsFeeStructure/>} access={"manage_fee_management"} />

          <Route
            path="/add-fee-structure"
            element={<AddFeeStructure/>}
            access={"manage_website"}
          />
          <Route
            path="/add-lms-fee-structure"
            element={<AddLmsFeeStructure/>}
            access={"manage_fee_management"}
          />
          <Route
            path="/admin-support-center"
            element={<SupportCenter/>}
            access={"manage_website"}
          />
          {/* <Route
                    path="/update-fee-structure/:id/:prev"
                    element={UpdateFeeStructure}
                  /> */}
          <Route
            path="/update-fee-structure/:id"
            element={<UpdateFeeStructure/>}
            access={"manage_website"}
          />
          <Route
            path="/update-lms-fee-structure/:id"
            element={<UpdateLmsFeeStructure/>}
            access={"manage_fee_management"}
          />
          <Route
            path="/clone-edit-lms-fee-structure/:id"
            element={<CloneAndEditLmsFeeStructure/>}
            access={"manage_fee_management"}
          />
          <Route path="/seo-metatag" element={<MetaTags/>} access={"manage_website"} />

          <Route path="/manage-faculty" element={<ManageFaculty/>} access={"manage_website"} />
          <Route path="/admission-list" element={<Admission/>} access={"manage_website"} />
          <Route path="/post-job" element={<PostJob/>} access={"manage_website"} />
          <Route path="/job-detail/:id" element={<JobDetail/>} access={"manage_website"} />
          <Route
            path="/job-applicant-detail/:id"
            element={<JobApplicantDetail/>}
            access={"manage_website"}
          />
          <Route path="/manage-faqs" element={<ManageFaqs/>} access={"manage_website"} />
          <Route path="/add-faqs" element={<AddFaqs/>} access={"manage_website"} />
          <Route path="/vacancy-list" element={<Vacancy/>} access={"manage_website"} />
          <Route path="/add-admission" element={<AddAdmission/>} access={"manage_website"} />
          <Route
            path="/admission-detail/:id"
            element={<AdmissionDetail/>}
            access={"manage_website"}
          />
          <Route
            path="/admission-applicant-detail/:id"
            element={<AdmissionApplicantDetail/>}
            access={"manage_website"}
          />
          <Route path="/gallery-list" element={<Gallery/>}
            access={"manage_website"} />
          <Route path="/edit-gallery/:_id" element={<EditGallery/>}
            access={"manage_website"} />
          <Route path="/website-manage" element={<WebsiteManage/>} access={"manage_website"} />
          <Route
            path="/add-social-links"
            element={<AddSocialLinks/>}
            access={"manage_website"}
          />
          <Route
            path="/institute-info-manage"
            element={<InstituteInfoManage/>}
            access={"manage_website"}
          />
          <Route
            path="/announcement-list"
            element={<AnnouncementList/>}
            access={"manage_website"}
          />
          <Route path="/skin-theme" element={<SkinTheme/>} access={"manage_website"} />
          <Route path="/skin-edit/:id" element={<SkinEdit/>} access={"manage_website"} />
          <Route path="/create-skin" element={<SkinEdit/>} access={"manage_website"} />
          <Route
            path="/preview-skintheme/:skinType/:themeid"
            element={<PreviewCustomAndPreferred/>}
            access={"manage_website"}
          />
          <Route path="/services-list" element={<Services/>} access={"manage_website"} />
          <Route path="/coe" element={<CenterOfExcellance/>} access={"manage_website"} />
          <Route path="/add-Services" element={<AddServices/>} access={"manage_website"} />
          <Route path="/payment-mode" element={<PaymentMode/>} access={"manage_website"} />
          <Route
            path="/payment-mode-details"
            element={<AddedModeDetails/>}
            access={"manage_website"}
          />
          {/* <Route
                        path="/createClass"
                        element={OnlineClass}
                      />
                      <Route
                        path="/editClass/:_id"
                        element={OnlineClass}
                      /> */}
          <Route
            path="/admin-create-class"
            element={<OnlineClass/>}
            access={"manage_online_class"}
          />
          <Route path="/admin-edit-class" element={<OnlineClass/>}
            access={"manage_online_class"} />
          <Route path="/editClass/:_id" element={<OnlineClass/>}
            access={"manage_online_class"} />
          <Route
            path="/invite-students"
            element={<InviteStudents/>}
            access={"manage_student"}
          />
          <Route
            path="/invite-students-status"
            element={<InviteStudentsStatus/>}
            access={"manage_student"}
          />
          <Route
            path="/invite-students-history"
            element={<InvitationHistory/>}
            access={"manage_student"}
          />
          <Route
            path="/invite-faculty-history"
            element={<InvitationHistory/>}
            access={"manage_teacher"}
          />

          <Route path="/fee-management" element={<FeeManagement/>} access={"manage_fee_management"} />

          {/* guard-management// */}


          <Route path="/visitor-management-list" element={<VisitorManagement/>} access={"manage_guard_management"} />
          <Route path="/add-visitors" element={<AddVisitors/>} access={"manage_guard_management"} />
          <Route path="/edit-visitor/:_id" element={<AddVisitors/>} access={"manage_guard_management"} />
          <Route path="/view-visitor-detail/:_id/:state" element={<PrintVisitorDetail/>} access={"manage_guard_management"} />
          <Route path="/print-visitor-detail/:_id/:state" element={<PrintVisitorDetail/>} access={"manage_guard_management"} />

          {/* admin/teacher visitor-management// */}
          <Route path="/visitor-management" element={<Visitor/>} access={"manage_visitor_management"} />

          <Route path="/fee-management" element={<FeeManagement/>}
            access={"manage_fee_management"} />
          <Route
            path="/edit-student/:_id"
            element={<EditStudent/>}
            access={"manage_student"}
          />
          {/* book appointment */}
          {/* <Route path="/book-appointment-list" element={BookAppointment} access={"manage_website"} />
          <Route path="/booking-list" element={BookingList} access={"manage_website"} />
          <Route path="/booking-setting" element={BookingSetting} access={"manage_website"} />
          <Route path="/category-create" element={CategoryCreateUpdate} access={"manage_website"} />
          <Route path="/category-update/:state/:id" element={CategoryCreateUpdate} access={"manage_website"} />
          {/* Book Appointment User Side */}
          <Route path="/book-appointment-UserSide" element={<BookAppointmentUserSide/>} access={"manage_website"} />
          <Route path="/My_Booking" element={<BookAppointmentMyBooking/>} access={"manage_website"} />
          <Route path="/My_Profile" element={<BookAppointmentMyProfile/>} access={"manage_website"} />
          <Route
            path="/invite-faculty-list"
            element={<StaffList/>}
            access={"manage_teacher"}
          />
          <Route path="/add-faculty" element={<AddFaculty/>} access={"manage_website"} />
          <Route
            path="/edit-web-faculty/:_id"
            element={<EditWebFaculty/>}
            access={"manage_website"}
          />
          <Route
            path="/invite-student-list"
            element={<InviteStudentList/>}
            access={"manage_student"}
          />
          <Route path="/invite-faculty" element={<InviteFaculty/>}
            access={"manage_teacher"} />
          <Route
            path="/edit-faculty/:_id"
            element={<EditFaculty/>}
            access={"manage_teacher"}
          />
          <Route
            path="/edit-teacher/:_id"
            element={<EditTeacher/>}
            access={"manage_teacher"}
          />
          <Route
            path="/invite-faculty-status"
            element={<InviteFacultyStatus/>}
            access={"manage_teacher"}
          />
          <Route
            path="/admin-attendance-classroomSubjectlist"
            element={<TeacherAttendanceClassroomList/>}
            access={"manage_attendance"}
          />
          <Route
            path="/admin-attendance-list/:_classroomId"
            element={<TeacherAttendanceList/>}
            access={"manage_attendance"}
          />
          <Route
            path="/attendance-admin-list/:_classroomId/:_subjectId"
            element={<TeacherAttendanceList/>}
            access={"manage_attendance"}
          />
          <Route
            path="/admin-leave-request-list/:_classroomId"
            element={<LeaveRequestList/>}
            access={"manage_attendance"}
          />
          <Route
            path="/admin-add-holiday-calendar"
            element={<CreateEditHoildayCalender/>}
            access={"manage_attendance"}
          />
          <Route
            path="/admin-holiday-calender-list"
            element={<TeacherHolidayCalender/>}
            access={"manage_attendance"}
          />
          <Route
            path="/miscellaneous-list"
            element={<NoticeBoard/>}
            access={"manage_website"}
          />
          <Route
            path="/contact-list"
            element={<ContactList/>}
            access={"manage_website"}
          />
          <Route
            path="/menu-header-list"
            element={<MenuHeader/>}
            access={"manage_website"}
          />
          {/* pages */}
          <Route
            path="/add-miscellaneous"
            element={<NoticeBoardPopUp/>}
            access={"manage_website"}
          />
          <Route
            path="/update-miscellaneous/:id"
            element={<NoticeBoardPopUp/>}
            access={"manage_website"}
          />
          <Route
            path="/student-dashboard-route"
            element={<StudentDashboardRoute/>}
          />
          <Route
            path="/settings"
            element={<DashboardSetting/>}
          />
          <Route
            path="/WebsiteSetting"
            element={<WebsiteSetting/>}
          />
          <Route
            path="/BusinessSetting"
            element={<BusinessSetting/>}
          />
          <Route
            path="/mail-setting"
            element={<MailSetting/>}
          />
          <Route
            path="/teacher-dashboard-route"
            element={<TeacherDashboardRoute/>}
          />
          <Route path="/faculty-route" element={<FacultyRoute/>} />
          {/* <Route
                      poth="/check-payment-route"
                      element={CheckPaymentRoute}
                    /> */}

          {/* <Route
                    path="/check-payment-route"
                    element={CheckPaymentRoute}
                  /> */}
          <Route
            path="/institute-website-route"
            element={<InstituteWebsiteDashboardRoute/>}
          />

          {/* <Route path="/profile" element={SchoolAdminProfile} /> */}
          {/* <Route path="/account-setting" element={AccountSetting} /> */}
          {/* <Route
                      path="/account-setting"
                      element={SchoolAdminProfile}
                    /> */}
          {/* <Route
                      path="/school-admin-setting"
                      element={SchoolAdminSetting}
                    /> */}

          <Route
            path="/school-admin-course"
            element={<SchoolAdminCourse/>}
            access={"manage_classroom"}
          />
          {/* ADMIN ONLINE TEST */}
          <Route path="/admin-create-test" element={<OnlineExam/>}
          
            access={"manage_classroom"}
          />
           <Route path="/admin-create-test/:classroomId" element={<OnlineExam/>}
          
            access={"manage_classroom"}
          />
          <Route
            path="/admin-edit-test/:_id"
            element={<EditQuestionPaper/>}
            access={"manage_classroom"}
          />
          <Route
            path="/admin/submission/:_id"
            element={<TeacherSubmissionList/>}
            access={"manage_classroom"}
          />
          {/* blogs  */}
          <Route path="/blogs" element={<Blogs/>} access={"manage_website"} />
          <Route path="/blog-list" element={<BlogList/>} access={"manage_website"} />
          <Route path="/blog-comments" element={<BlogComments/>} access={"manage_website"} />
          <Route path="/blog-categories" element={<BlogCategories/>} access={"manage_website"} />
          <Route path="/add-new-blog" element={<AddNewBlog/>} access={"manage_website"} />
          <Route path="/preview-category/:id" element={<PreviewCategory/>} access={"manage_website"} />
          <Route path="/preview-blog/:id/:state" element={<PreviewBlog/>} access={"manage_website"} />
          <Route path="/edit-blog/:id" element={<AddNewBlog/>} access={"manage_website"} />
          {/* <Route path="/website-blog-categories" element={WebsiteCategoriesList} access={"manage_website"} />
          <Route path="/website-blogs-by-category/:id" element={CategoryWiseBlogList} access={"manage_website"} />
          <Route path="/website-feature-blogs" element={WebsiteFeatureBlogs} access={"manage_website"} />
          <Route path="/author-blog-list/:id" element={AuthorBlogs} access={"manage_website"} /> */}

          <Route
            path="/submission/:_id"
            element={<TeacherSubmissionList/>}

          />
          <Route
            path="/student/:_examId/view-result/:_studentId"
            element={<OnlineExamResult/>}
            access={"manage_online_test"}
          />
          {/* ADMIN ONLINE TEST */}
          <Route
            path="/teacher/classroom/create-test"
            element={<OnlineExam/>}
          />
          <Route
            path="/teacher/classroom/edit-test/:_id"
            element={<EditQuestionPaper/>}
          />
          <Route
            path="/teacher/classrrom/submission/:_id"
            element={<TeacherSubmissionList/>}
          />
          <Route
            path="/student/:_examId/view-result/:_studentId"
            element={<OnlineExamResult/>}
          />
          <Route
            path="/view-assignment/:assignmentId"
            element={<ViewClassroomAssignment/>}
          />
          <Route
            path="/view-classroom/:classroomId"
            element={<ViewClassroom/>}
          />

          <Route path="/courses-route" element={<CoursesRoute/>} />
          <Route
            path="/add-course-header"
            element={<CourseHeaderModal/>}
          />
          <Route path="/edit-course/:id" element={<EditCourse/>} />

          <Route
            path="/assign-teacher-multiple-classroom/:_id/course/:_courseId"
            element={<AssignTeacherMultipleClassroom/>}
            access={"manage_teacher"}
          />
          <Route
            path="/update-multiple-courses/:_id/course/:_courseId"
            element={<UpdateStudentMultipleCourses/>}
            access={"manage_student"}
          />
          {/* <Route
                      path="/update-multiple-courses/:_id/course/:_courseId"
                      element={UpdateStudentMultipleCourses}
                    /> */}
          <Route
            path="/course-edit-student-list"
            element={<CourseEditStudentList/>}
            access={"manage_study_material"}
          />
          {/* Study Material start */}
          <Route path="/course" element={<Course/>} access={"manage_study_material"} />
          <Route
            path="/create-course"
            element={<CreateCourseBreadcrumb/>}
            access={"manage_study_material"}
          />
          <Route
            path="/edit-courses/:_id"
            element={<CreateCourseBreadcrumb/>}
            access={"manage_study_material"}
          />
          <Route
            path="/create-admin-course/:_classroomId"
            element={<ViewClassroomCreateCourse/>}
            access={"manage_study_material"}
          />
          <Route
            path="/create-admin-onlineClass/:_classroomId/:_subjectId"
            element={<CreateAdminOnlineClassBreadCrumb/>}
            access={"manage_study_material"}
          />
          <Route
            path="/edit-admin-onlineClass/:_id/:_classroomId/:_subjectId"
            element={<CreateAdminOnlineClassBreadCrumb/>}
            access={"manage_study_material"}
          />
          <Route
            path="/edit-admin-course/:_id/:_classroomId"
            element={<ViewClassroomCreateCourse/>}
            access={"manage_study_material"}
          />

          <Route path="/view-fee-listing/:ClassRoomId" element={<ViewFeeListing/>} access={"manage_fee_management"} />

          <Route path="/collect-fee/:id/:classroomId" element={<CollectFee/>} access={"manage_fee_management"} />

          <Route path="/preview-paid-fee/:id" element={<PreviewPaidFee/>} access={"manage_fee_management"} />
          <Route path="/access-control" element={<AccessControl/>} access={"manage_access_control"} />
          {/* Study Material Ends */}
          <Route
            path="/email-reset-password"
            element={<EmailResetPassword/>}
          />
          {/* <Route path="/reseller" element={Reseller} /> */}
          <Route path="/access-denied" element={<AccessDenied/>} />
          <Route path="/image-cropping" element={<ImageCropper/>} />
          <Route path="/notification" element={<Notification/>} />

          {/* Student Teacher Routes Start */}
          <Route
            path="/dashboard/teacher-online-class/meetcallback"
            element={<MeetToken/>}
            access={"manage_online_class"}
          />
          <Route
            path="/dashboard/teacher-online-class"
            element={<TeacherOnlineClass/>}
            access={"manage_online_class"}
          />
          <Route
            path="/dashboard/teacher-assignments"
            element={<TeacherAssignments/>}
            access={"manage_assignment"}
          />
          <Route
            path="/dashboard/teacher-assignment-view/:_assignmentId"
            element={<TeacherAssignmentView/>}
            access={"manage_assignment"}
          />
          <Route
            path="/dashboard/teacher-online-test"
            element={<OnlineExamList/>}
            access={"manage_online_test"}
          />

          {/* <Route
                        path="/dashboard/teacher-online-test-view"
                        element={TeacherOnlineTestView}
                      /> */}

          <Route
            path="/dashboard/teacher-create-test"
            element={<OnlineExam/>}
            access={"manage_online_test"}
          />
          <Route
            path="/dashboard/teacher-edit-test/:_id"
            element={<EditQuestionPaper/>}
            access={"manage_online_test"}
          />
          <Route
            path="/dashboard/teacher/online-exam/submission/:_id"
            element={<TeacherSubmissionList/>}
            access={"manage_online_test"}
          />
          {/* Study Material Start */}
          <Route
            path="/dashboard/teacher/course-list"
            element={<TeacherCourseDetailList/>}
            access={"manage_study_material"}
          />
          <Route
            path="/dashboard/teacher-create-course"
            element={<CreateCourseTeacher/>}
            access={"manage_study_material"}
          />
          <Route
            path="/dashboard/teacher-edit-course/:_id"
            element={<CreateCourseTeacher/>}
            access={"manage_study_material"}
          />
          <Route
            path="/dashboard/create-teacherClassroom-course/:_classroomId"
            element={<ViewClassroomCreateTeacherCourse/>}
            access={"manage_classroom"}
          />
          <Route
            path="/dashboard/edit-teacherClassroom-course/:_id/:_classroomId"
            element={<ViewClassroomCreateTeacherCourse/>}
            access={"manage_study_material"}
          />
          <Route
            path="/dashboard/course-detail-view/:_id"
            element={<CourseDetailView/>}
            access={"manage_study_material"}
          />
          <Route
            path="/dashboard/course-detail-classroom-view/:_id/:_classroomId/:_subject"
            element={<CourseDetailView/>}
            access={"manage_study_material"}
          />
          <Route
            path="/dashboard/preview-course/:_id/state/:_state"
            element={<PreviewCourse/>}
            access={"manage_study_material"}
          />
          <Route
            path="/dashboard/student/course-detail-list"
            element={<StudentCourseDetailList/>}
            access={"manage_study_material"}
          />
          {/* Study Material Ends */}
          <Route
            path="/dashboard/teacher/online-exam/:_examId/submission/:_studentId"
            element={<TeacherExamReview/>}
            access={"manage_online_test"}
          />
          <Route
            path="/dashboard/attendance-teacher-classroomSubjectlist"
            element={<TeacherAttendanceClassroomList/>}
            access={"manage_attendance"}
          />
          <Route path="/teacher-visitor-management" element={<Visitor/>} access={"manage_visitor_management"} />
          <Route
            path="/dashboard/teacher-classrooms-list"
            element={<TeacherClassroomList/>}
            access={"manage_classroom"}
          />
          <Route
            path="/dashboard/teacher/subject-list/:id"
            element={<TeacherClassroomsSubjectView/>}
            access={"manage_classroom"}
          />
          <Route
            path="/dashboard/teacher/:classroomId/view-classroom/:subjectId"
            element={<TeacherViewClassroom/>}
            access={"manage_classroom"}
          />
          <Route
            path="/dashboard/student-assignments"
            element={<StudentAssignments/>}
            access={"manage_assignment"}
          />
          <Route
            path="/dashboard/student-join-class"
            element={<StudentJoinClass/>}
            access={"manage_online_class"}
          />
          <Route
            path="/dashboard/student-assignment-view/:_assignmentId"
            element={<StudentAssignmentView/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student-assignment-view-result/:_assignmentId"
            element={<StudentAssignmentViewResult/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student-assignment-view-classroom/:_assignmentId/:_classroomId/:_subjectId"
            element={<StudentAssignmentView/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student-assignment-view-result-classroom/:_assignmentId/:_classroomId/:_subjectId"
            element={<StudentAssignmentViewResult/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student/online-test"
            element={<OnlineExamStudentList/>}
            access={"manage_online_test"}
          />
          <Route
            path="/payment-checkout/:id"
            element={<FeePaymentCheckout/>}
            access={"manage_fee_management"}
          />
          <Route
            path="/dashboard/student-online-test/:_id"
            element={<OnlineExamStudent/>}
            access={"manage_online_test"}
          />
          <Route
            path="/dashboard/student/exam-route/:_id"
            element={<StudentExamRoute/>}
            access={"manage_online_test"}
          />
          <Route
            path="/dashboard/student/exam-instruction/:_id"
            element={<ExamInstruction/>}
            access={"manage_online_test"}
          />
          <Route
            path="/dashboard/student/:_examId/view-result/:_studentId"
            element={<OnlineExamResult/>}
            access={"manage_online_test"}
          />
          <Route
            path="/dashboard/student-classroom-list"
            element={<StudentClassrooms/>}
            access={"manage_classroom"}
          />
          <Route
            path="/dashboard/attendance-student-classroomlist"
            element={<StudentAttendanceClassroomList/>}
            access={"manage_attendance"}
          />
          <Route
            path={`/dashboard/student-subjects-attendance/:_classroomId`}
            element={<StudentAttendanceView/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student-view-leaves/:_classroomId"
            element={<StudentViewLeaves/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student-new-leave-request/:_classroomId"
            element={<NewLeaveRequest/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student-edit-leave-request/:_id/:_classroomId"
            element={<NewLeaveRequest/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student-subjects-list/:_id"
            element={<StudentSubjectList/>}
            access={"manage_classroom"}
          />
          <Route
            path="/dashboard/student/:_classroomId/view-classroom/:_subjectId"
            element={<ViewStudentClassroom/>}
            access={"manage_classroom"}
          />
          <Route
            path="/dashboard/student/student-fee-listing-details/:id"
            element={<StudentFeeListingDetails/>}
            access={"manage_fee_management"}
          />
          <Route
            path="/dashboard/student/student-fee-confirmation:id"
            element={<feeConfirmation/>}
            access={"manage_fee_management"}
          />
          <Route
            path="/dashboard/student/payment-error"
            element={<PaymentCancelError/>}
            access={"manage_fee_management"}
          />
          <Route
            path="/dashboard/student/student-fee-confirmation"
            element={<StudentFeeConfirmation/>}
            access={"manage_fee_management"}
          />

          <Route
            path="/dashboard/student/student-invoice-print/:receiptId"
            element={<StudentInvoicePrint/>}
            access={"manage_fee_management"}
          />
          <Route
            path="/dashboard/student/fee-management"
            element={<StudentFeeListing/>}
            access={"manage_fee_management"}
          />
          <Route
            path="/dashboard/teacher/create-online-class"
            element={<CreateTeacherOnlineClassBreadCrumb/>}
            access={"manage_online_class"}
          />
          <Route
            path="/dashboard/teacher/edit-online-class/:_id"
            element={<CreateTeacherOnlineClassBreadCrumb/>}
            access={"manage_online_class"}
          />

          <Route
            path="/dashboard/teacher/create-subject-onlineclass/:_classroomId/:_subjectId"
            element={<TeacherClassroomCreateOnlineClass/>}
            access={"manage_classroom"}
          />
          <Route
            path="/dashboard/teacher/edit-subject-onlineclass/:_id/:_classroomId/:_subjectId"
            element={<TeacherClassroomCreateOnlineClass/>}
            access={"manage_classroom"}
          />
          {/* Report Card */}
          <Route
            path="/dashboard/teacher-report-card"
            element={<TeacherReportCard/>}
            access={"manage_report_card"}
          />
          <Route
            path="/dashboard/student-report-card-List"
            element={<StudentReportCardList/>}
            access={"manage_report_card"}
          />
          <Route
            // path="/dashboard/add-grade"
            // element={AddReportCardGard}
            path="/dashboard/teacher-create-terms"
            element={<TeacherCreateTerms/>}
            access={"manage_report_card"}
          />
          <Route
            path="/dashboard/teacher-create-grades"
            element={<TeacherCreateGrades/>}
            access={"manage_report_card"}
          />
          <Route path="/dashboard/view-grades" element={<ViewGrades/>}
            access={"manage_report_card"} />
          <Route
            path="/dashboard/teacher-result-view"
            element={<TeacherResultView/>}
            access={"manage_report_card"}
          />
          <Route
            path="/dashboard/teacher-report-card-view/:reportCardId"
            element={<TeacherReportCardView/>}
            access={"manage_report_card"}
          />
          <Route
            path="/dashboard/print-report-card"
            element={<PrintReportCard/>}
            access={"manage_report_card"}
          />
          {/* Close Report Card */}
          {/* Attendance */}
          <Route
            path="/dashboard/teacher-attendance-list/:_classroomId/:_subjectId"
            element={<TeacherAttendanceList/>}
            access={"manage_attendance"}
          />

          <Route
            path="/dashboard/teacher-attendance-list/:_classroomId"
            element={<TeacherAttendanceList/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/leave-request-list/:_classroomId"
            element={<LeaveRequestList/>}

          />
          <Route
            path="/dashboard/holiday-calendar"
            element={<TeacherHolidayCalender/>}
          />
          <Route
            path="/dashboard/add-holiday-calendar"
            element={<CreateEditHoildayCalender/>}
          />
          <Route
            path="/dashboard/student-holiday-calender"
            element={<StudentHolidaysCalender/>}
            access={"manage_attendance"}
          />
          <Route
            path={`/dashboard/student-subjects-attendance/:_classroomId`}
            element={<StudentAttendanceView/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student-view-leaves/:_classroomId"
            element={<StudentViewLeaves/>}
            access={"manage_attendance"}
          />
          <Route
            path="/dashboard/student-new-leave-request/:_classroomId"
            element={<NewLeaveRequest/>}
            access={"manage_attendance"}
          />


          {/* <Route path="*" element={Error404} /> */}
          {/* Close Attendance */}
          {/* Student Teacher Routes Ends */}
          {/* <Route path="*" element={Error404} /> */}
        
      {/* </AuthenticatedRoutes> */}

          <Route path="/*" element={<TemplateRoutes />}/>
    
          <Route path="*" element={<PageNotFound/>} />
    </Routes>
  )
}
export default ProtectedRoutes