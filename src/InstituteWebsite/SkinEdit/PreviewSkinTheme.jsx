// import React from "react";
// import InstituteWebsiteTheme from "../../Common/Theme/InstituteWebsiteTheme";
// // import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
// // import { UserSubdomain } from "../../Common/UserElement/index";
// import WebsiteGallery from "../WebsiteGallery";
// import WebsiteAnnouncement from "../WebsiteAnnouncement";
// import { ColorSkinIcon } from "../../Common/Images";
// import {
//   INSWEB_MAP_STATE_TO_PROPS,
//   INSWEB_MAP_DISPATCH_TO_PROPS,
// } from "../InstituteWebMasDispatch";
// import { connect } from "react-redux";
// import InstituteWebsiteHero from "../InstituteWebsiteHeroPreview";
// import HomeAbout from "../HomeAbout";
// import WebsiteAbout from "../WebsiteAbout";
// import WebsiteFaculty from "../WebsiteFaculty";
// import NotFound from "../../ErrorPage/NotFound";
// import Contactus from "../Contactus";
// import Admissions from "../Admissions";
// import FeeStructure from "../FeeStructure";
// import InstituteLoader from "../../Common/Loader/ComponentLoader";
// import Service from "../Service";
// import Faqs from "../WebsiteFaq";
// import TestimonialSlider from "../TestimonialSlider";
// import WebsiteVacancy from "../WebsiteVacancy";
// import { DynamicHeaderProvider } from "../../Context/DynamicHeaderContext";
// import SocialConnect from "../SocialConnect";
// import { GlobalStyleInstitute } from "../themepreview";
// import { ThemeProvider } from "styled-components";
// import SubDomainHeader from "../../Layout/SubDomainHeader";
// import AppLink from "../../Common/AppLink";
// // import { INSWEB_MAP_DISPATCH_TO_PROPS } from "../InstituteWebMasDispatch";

// const menuItemOptions = {
//   "/preview-skintheme/": {
//     titleKey: undefined, // No key availabel for home
//     title: "Home",
//     component: HomeAbout,
//   },
//   "/preview-skintheme/about": {
//     titleKey: undefined, // No key availabel for about menu option
//     title: "About",
//     component: WebsiteAbout,
//   },
//   "/preview-skintheme/faculty": {
//     titleKey: "facultyhead", // For dynamic header menu faculty option
//     title: "Faculty",
//     component: WebsiteFaculty,
//   },
//   "/preview-skintheme/admission": {
//     titleKey: "admissionhead", // For dynamic header menu admission option
//     title: "Admissions",
//     component: Admissions,
//   },
//   "/preview-skintheme/feestructure": {
//     titleKey: "feehead", // For dynamic header menu feestructure option
//     title: "Fee Structure",
//     component: FeeStructure,
//   },
//   "/preview-skintheme/services": {
//     titleKey: "servicehead", // For dynamic header menu services option
//     title: "Services",
//     component: Service,
//   },
//   "/preview-skintheme/announcements": {
//     titleKey: "announcementhead", // For dynamic header menu announcements option
//     title: "Announcement",
//     component: WebsiteAnnouncement,
//   },
//   "/preview-skintheme/gallery": {
//     titleKey: "galleryhead", // For dynamic header menu gallery option
//     title: "Gallery",
//     component: WebsiteGallery,
//   },
//   "/preview-skintheme/faqs": {
//     titleKey: "faqhead", // For dynamic header menu faqs option
//     title: "FAQs",
//     component: Faqs,
//   },
//   "/preview-skintheme/vacancy": {
//     titleKey: "vacancyhead", // For dynamic header menu vacancy option
//     title: "Vacancy",
//     component: WebsiteVacancy,
//   },
//   "/preview-skintheme/contact": {
//     titleKey: "", // No key availabel for contact menu option
//     title: "Contact",
//     component: Contactus,
//   },
// };

// class InstituteWebsite extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       isDataLoaded: false,
//     };
//   }
//   selectedRoute = (route) => {
//     // const paramsId = this.props.location.pathname.split("/").pop();
//     window.scroll({
//       top: 0,
//       behavior: "smooth",
//     });
//     // const routes = route.split("/");
//     const menuItem = menuItemOptions[route];
//     const { data } = this.props.instituteinfo;
//     // Selected Menu Option
//     let MenuComponent;
//     if (menuItem) {
//       MenuComponent = menuItem.component;
//     }

//     if (route === "/preview-skintheme" || !menuItem) {
//       return (
//         <React.Fragment>
//           <InstituteWebsiteHero />
//           <SocialConnect />
//           {menuItem && <MenuComponent instituteid={data._id} />}
//           <WebsiteFaculty ShowFacultyLimit={4} instituteid={data._id} />
//           <Admissions ShowAdmissionLimit={3} instituteid={data._id} />
//           <FeeStructure ShowFSLimit={3} instituteid={data._id} />
//           <Service ShowServicesLimit={3} instituteid={data._id} />
//           <WebsiteAnnouncement instituteid={data._id} />
//           <WebsiteGallery instituteid={data._id} />
//           <div className="FT-HomeWrapper">
//             <div className="sectionCntrWrap">
//               <div className="subDomainsec2Col">
//                 <div className="HomeFaq">
//                   <Faqs ShowFaqLimit={5} instituteid={data._id} />
//                 </div>
//                 <div className="HomeTestimonial">
//                   <TestimonialSlider instituteid={data._id} />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="isdhome-contact">
//             <Contactus instituteid={data._id} />
//           </div>
//         </React.Fragment>
//       );
//     }
//     // Other options
//     return <MenuComponent instituteid={data._id} />;
//   };

//   startLoading = () => {
//     // this.props.loadinstitute(this.props.institutesubdomain);
//   };

//   componentDidUpdate() {
//     const id = this.props.location.pathname.split("/").pop();
//     const { institutetheme } = this.props;
//     const { activedTheme } = institutetheme;
//     const { activeTheme } = activedTheme;
//     // const themeid = this.props.themeId;

//     activeTheme && this.props.loadDefaultTheme();

//     activeTheme && this.props.activateTheme(this.props.user);

//     if (this.props.institutetheme.activeTheme === "default") {
//       this.props.loadthemepreview(id);
//       // this.props.loadinstitute(this.props.institutesubdomain);
//     } else if (this.props.institutetheme.activeTheme === "custom") {
//       // this.props.loadCustomThemePreview(this.props.user, id);
//     }
//   }

//   shouldComponentUpdate() {
//     const { institutetheme } = this.props;
//     const { activedTheme, previewTheme } = institutetheme;
//     const { activeTheme } = activedTheme;

//     if (activeTheme && previewTheme._id) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   componentDidCatch(error, errorInfo) {
//   }

//   componentDidMount() {
//     this.startLoading();
//   }

//   render() {
//     const { loading, notfound, reload, heading, } =
//       this.props.instituteinfo;

//     const pathname = window.location.pathname.split("/");

//     return (
//       <ThemeProvider theme={this.props.institutetheme}>
//         <SubDomainHeader />
//         <AppLink to="/skin-theme">
//           <div className="colorSwitchpannel">
//             <img src={ColorSkinIcon} alt="" />
//             <p className="text-xxs base">
//               Color
//               <br /> Skin
//             </p>
//           </div>
//         </AppLink>
//         <GlobalStyleInstitute />

//         <InstituteWebsiteTheme>
//           {loading ? (
//             <InstituteLoader />
//           ) : notfound ? (
//             <NotFound showlogo={false} />
//           ) : reload ? (
//             <button onClick={this.startLoading}>Reload</button>
//           ) : (
//             <React.Fragment>
//               <DynamicHeaderProvider value={heading}>
//                 {this.selectedRoute(pathname[1])}
//               </DynamicHeaderProvider>
//             </React.Fragment>
//           )}
//         </InstituteWebsiteTheme>
//       </ThemeProvider>
//     );
//   }
// }

// export default connect(
//   INSWEB_MAP_STATE_TO_PROPS,
//   INSWEB_MAP_DISPATCH_TO_PROPS
// )(InstituteWebsite);
