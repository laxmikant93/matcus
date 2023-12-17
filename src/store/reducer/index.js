import { combineReducers } from "redux";
import user from "./user";
import commonerror from "./commonerror";
import chooseoption from "./chooseoption";
import instituteregistration from "./instituteregistration";
import studentregistration from "./studentregistration";
import students from "./students";
import inviteteacher from "./inviteteacher";
import faculty from "./faculty";
import gallery from "./gallery";
import validateteacher from "./validateteacher";
import countries from "./countries";
import userinfo from "./userinfo";
import galleryupload from "./galleryupload";
import instituteinfo from "./instituteinfo";
import validatestudent from "./validatestudent";
import announcement from "./announcement";
import classroom from "./classroom";
import editteacherlist from "./editteacherlist";
import editstudentlist from "./editstudentlist";
import courses from "./courses";
import institute from "./institutes";
import checkdomain from "./checkdomain";
import announcementwebsitesection from "./announcementwebsitesection";
import gallerywebsitesection from "./gallerywebsitesection";
import websiteui from "./websiteui";
import likewebsitesection from "./likewebsitesection";
import websitefaculty from "./websitefaculty";
import successmessagepopup from "./successmessagepopup";
import manageinstituteinfo from "./manageinstituteinfo";
import assignment from "./assignment";
import classroomassigned from "./classroomassigned";
import community from "./community";
import changePassword from "./chnagePassword";
import studentacceptance from "./studentacceptance";
import studentlistuserinfo from "./studentlistuserinfo";
import teacheracceptance from "./teacheracceptance";
import instituteblogs from "./instituteblogs"
import institutewebsite from "./institutewebsite";
import instituteannouncement from "./instituteannouncement";
import institutegallery from "./institutegallery";
import instituteuserbyrole from "./instituteuserbyrole";
import studentassigment from "./studentAssignment";
import gallerypopup from "./gallerypopup";
import studentjoinclass from "./studentjoinclass";
import onlineClasses from "./onlineClasses";
import zoomapi from "./zoomapi.js";
import teacherselect from "./teacherselect";
import onlineexam from "./onlineexam";
import institutelisting from "./institutelisting";
import studentonlineexam from "./studentonlineexam";
import examsubmission from "./examsubmission";
import reseller from "./reseller";
import onlineexamstudent from "./onlineexamstudent";
import manageFaculty from "./manageFaculty";
import contactUs from "./contactus";
import userRole from "./userRole";
import edneedfeed from "./edneedfeed";
import sectionTitle from "./sectionTitle";
import registerInstitute from "./RegisterInstitute";
import institutefaculty from "./institutefaculty";
import faq from "./faq";
import vacancy from "./vacancy";
import admission from "./admission";
import services from "./services";
import testimonial from "./testimonial";
import feeStructure from "./feeStructure";
import paymentmode from "./paymentmode";
import verifycontact from "./verifycontact";
import courseHeader from "./courseHeader";
import invitationhistory from "./invitationhistory";
import demoRequest from "./demoRequest";
import edneedYoutube from "./edneedYoutube";
import classroomDetail from "./classroomDetail";
import multiselectdropdown from "./multiselectdropdown";
import publicProfile from "./publicProfile";
import whatsAppSupport from "./whatsAppSupport";
import privatedomain from "./privatedomain";
import studentClassroom from "./studentClassroom";
import viewStudentClassroom from "./viewStudentClassroom";
import teacherclassroomlist from "./teacherclassroomlist";
import teachersubjectlist from "./teachersubjectlist";
import admincourse from "./admincourse";
import studentcourse from "./studentcourse";
import teachercourse from "./teachercourse";
import allnotifications from "./allnotifications";
import shownotificationpopup from "./shownotificationpopup";
import institutetheme from "./institutetheme";
import fonts from "./googlefonts";
import feeManagement from "./feeManagement";
import feeManagementStudent from "./feeManagementStudent";
import teacherAttendance from "./teacherAttendance";
import studentAttendance from "./studentAttendance";
import reportCard from "./reportcard";
import holidayCalendar from "./holidayCalendar";
import studentHolidays from "./studentHolidays";
import lmsfeeStructure from "./lmsfeeStructure";
// import homepageVideoPopup from "./homepageVideoPopup"
import userdetailpopup from "./UserDetailPopup";
import homepageVideoPopup from "./homepageVideoPopup";
import noticeboard from "./noticeboard";
import visitorManagement from "./visitorManagement";
import bookAppointment from "./bookAppointment";
import accesscontrol from "./accesscontrol";
import employee from "./employee";
import EdPartner from "./EdPartner";
import ecommerceCurrency from "./ecommerceCurrency"
import { productListReducer } from "./ecommerce/product";
import { collectionListReducer } from "./ecommerce/collection";
import { userListReducer } from "./ecommerce/user";
import { categoryListReducer } from "./ecommerce/category";
import { ecomAuthReducer } from "./ecommerce/auth";
import { orderCartListReducer } from "./ecommerce/cartOrder";
import menuHeader from "./menuHeader";
import websiteTemplate from "./websiteTemplate";
import businessInfo from "./businessInfo";
import bookAppointmentUserside from "./bookAppointmentUserside";
import subdomainuser from "./subdomainuser";
import serviceTemplate from "./serviceTemplate";
import businessnotification from "./businessnotification";
import ecommercePolicy from "./ecommercePolicy";
import ecomAdmin from "./ecomAdmin";
import catergoryFilter from "./catergoryFilter";
import ecomAdminInventory from "./ecomAdminInventory";
import collectionFilter from "./collectionFilter";
import shipping from "./shipping";
import currencyList from "./ecommerce/currency";
import ecomReviews from "./ecomReviews";
import { guestDataReducer } from "./ecommerce/guestdata";
import dynamicdropdown from "./dynamicdropdown";


export default combineReducers({
  user,
  subdomainuser,
  accesscontrol,
  admincourse,
  admission,
  allnotifications,
  announcement,
  announcementwebsitesection,
  assignment,
  catergoryFilter,
  changePassword,
  checkdomain,
  chooseoption,
  classroom,
  classroomDetail,
  classroomassigned,
  commonerror,
  community,
  contactUs,
  countries,
  courseHeader,
  courses,
  demoRequest,
  ecomAdmin,
  ecommerceCurrency,
  ecomReviews,
  employee,
  editstudentlist,
  editteacherlist,
  edneedYoutube,
  edneedfeed,
  examsubmission,
  faculty,
  faq,
  feeManagement,
  feeManagementStudent,
  feeStructure,
  fonts,
  gallery,
  gallerypopup,
  galleryupload,
  gallerywebsitesection,
  holidayCalendar,
  institute,
  instituteannouncement,
  instituteblogs,
  institutefaculty,
  institutegallery,
  instituteinfo,
  institutelisting,
  instituteregistration,
  institutetheme,
  instituteuserbyrole,
  institutewebsite,
  invitationhistory,
  inviteteacher,
  ecomAdminInventory,
  likewebsitesection,
  lmsfeeStructure,
  manageFaculty,
  menuHeader,
  manageinstituteinfo,
  multiselectdropdown,
  noticeboard,
  onlineClasses,
  onlineexam,
  onlineexamstudent,
  paymentmode,
  privatedomain,
  publicProfile,
  registerInstitute,
  reportCard,
  reseller,
  sectionTitle,
  services,
  shownotificationpopup,
  studentAttendance,
  studentClassroom,
  studentHolidays,
  studentacceptance,
  studentassigment,
  studentcourse,
  studentjoinclass,
  studentlistuserinfo,
  studentonlineexam,
  studentregistration,
  students,
  successmessagepopup,
  teacherAttendance,
  teacheracceptance,
  teacherclassroomlist,
  teachercourse,
  teacherselect,
  teachersubjectlist,
  testimonial,
  userdetailpopup,
  userRole,
  userinfo,
  vacancy,
  validatestudent,
  validateteacher,
  verifycontact,
  viewStudentClassroom,
  websitefaculty,
  websiteui,
  whatsAppSupport,
  zoomapi,
  homepageVideoPopup,
  visitorManagement,
  bookAppointment,
  EdPartner,
  websiteTemplate,
  productList: productListReducer,
  collectionList: collectionListReducer,
  orderCartList: orderCartListReducer,
  userList: userListReducer,
  categoryList: categoryListReducer,
  ecomAuth: ecomAuthReducer,
  businessInfo,
  bookAppointmentUserside,
  serviceTemplate,
  ecommercePolicy,
  businessnotification,
  collectionFilter,
  shipping,
  currencyList,
  guestDataReducer,
  dynamicdropdown
});
