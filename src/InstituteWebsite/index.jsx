/* eslint-disable no-unused-vars */
import React from "react";
import InstituteWebsiteTheme from "../Common/Theme/InstituteWebsiteTheme";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";
import WebsiteGallery from "./WebsiteGallery";
import WebsiteAnnouncement from "./WebsiteAnnouncement";
import {
  INSWEB_MAP_STATE_TO_PROPS,
  INSWEB_MAP_DISPATCH_TO_PROPS,
} from "./InstituteWebMasDispatch";
import { connect } from "react-redux";
import InstituteWebsiteHero from "./InstituteWebsiteHero";
import HomeAbout from "./HomeAbout";
import WebsiteAbout from "./WebsiteAbout";
import WebsiteFaculty from "./WebsiteFaculty";
import NotFound from "../ErrorPage/NotFound";
import Contactus from "./Contactus";
import Admissions from "./Admissions";
import FeeStructure from "./FeeStructure";
import InstituteLoader from "../Common/Loader/ComponentLoader";
import Service from "./Service";
import Faqs from "./WebsiteFaq";
import TestimonialSlider from "./TestimonialSlider";
import WebsiteVacancy from "./WebsiteVacancy";
import { DynamicHeaderProvider } from "../Context/DynamicHeaderContext";
import SocialConnect from "./SocialConnect";
import { ThemeProvider } from "styled-components";
import { GlobalStyleInstitute } from "./theme";
//import '../../public/sw';
import "./InstituteWebsite.scss";
import WebsiteMiscellaneous from "./WebsiteMiscellaneous";
import WebsiteBookAppointment from "./WebsiteBookAppointment";
import ServiceList from "./WebsiteServiceList";
import WebsiteServiceList from "./WebsiteServiceList";
import WebsiteBlogs from "./Institute_Blogs/index";
import PreviewBlog from "./Institute_Blogs/PreviewBlog";
//const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
//const swUrl = '../../public/sw';

const menuItemOptions = {
  "/": {
    titleKey: undefined, // No key availabel for home
    title: "Home",
    component: HomeAbout,
  },
  "/aboutus": {
    titleKey: undefined, // No key availabel for about menu option
    title: "About",
    component: WebsiteAbout,
  },
  "/faculty": {
    titleKey: "facultyhead", // For dynamic header menu faculty option
    title: "Faculty",
    component: WebsiteFaculty,
  },
  "/admission": {
    titleKey: "admissionhead", // For dynamic header menu admission option
    title: "Admissions",
    component: Admissions,
  },
  "/feestructure": {
    titleKey: "feehead", // For dynamic header menu feestructure option
    title: "Fee Structure",
    component: FeeStructure,
  },
  "/services": {
    titleKey: "servicehead", // For dynamic header menu services option
    title: "Services",
    component: Service,
  },
  "/announcements": {
    titleKey: "announcementhead", // For dynamic header menu announcements option
    title: "Announcement",
    component: WebsiteAnnouncement,
  },
  "/gallery": {
    titleKey: "galleryhead", // For dynamic header menu gallery option
    title: "Gallery",
    component: WebsiteGallery,
  },
  "/faqs": {
    titleKey: "faqhead", // For dynamic header menu faqs option
    title: "FAQs",
    component: Faqs,
  },
  "/miscellaneous": {
    titleKey: "noticehead", // For dynamic header menu notice option
    title: " Miscellaneous",
    component: WebsiteMiscellaneous,
  },
  "/vacancy": {
    titleKey: "vacancyhead", // For dynamic header menu vacancy option
    title: "Vacancy",
    component: WebsiteVacancy,
  },
  "/service_List": {
    titleKey: "",
    title: "ServiceList",
    component: WebsiteServiceList,
  },
  "/book_Appointment": {
    titleKey: "", // For dynamic header menu vacancy option
    title: "BookAppointment",
    component: WebsiteBookAppointment,
  },
  "/blogs": {
    titleKey: "", // For dynamic header menu vacancy option
    title: "Blogs",
    component: WebsiteBlogs,
  },
  "/contactus": {
    titleKey: "", //  No key availabel for contact menu option
    title: "Contact",
    component: Contactus,
  },
};

class InstituteWebsite extends React.Component {
  selectedRoute = (route) => {
    // window.scroll({
    //   top: 0,
    //   behavior: "smooth",
    // });
    const menuItem = menuItemOptions[route];
    const { data } = this.props.instituteinfo;
    const menuList = this.props.instituteinfo.menuList.data;

    // 404 URL
    // if (!menuItem) {
    //   return <NotFound showlogo={false} />;
    // }

    // *** EDNEED PWA DYNAMIC manifest.json GENERATION CODE STARTS HERE *** // 

    const origin = window.location.origin;
    //let origin = data.origin;
    let domainname = data.domain;

    let institute_name = data.institute_name;
    let institute_is_pwa = data.institute_is_pwa;
    let iconURL = data.institute_logo;
    let institute_intro_description = data.institute_intro_description;


    let myDynamicManifest = {
      short_name: institute_name,
      description: institute_intro_description,
      name: institute_name,
      icons: [{ src: iconURL, sizes: "512x512", type: "image/png", purpose: "any maskable" }],
      start_url: origin,
      display: "standalone",
      theme_color: "#121212",
      background_color: "#ffffff",
      orientation: "portrait",
      scope: "."
    };
    if (data.institute_is_pwa == true) {
      const stringManifest = JSON.stringify(myDynamicManifest);
      const blob = new Blob([stringManifest], { type: 'application/json' });
      const manifestURL = URL.createObjectURL(blob);


      // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC manifest.json CODE TO index.html STARTS HERE **//
      document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);
      // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC manifest.json CODE TO index.html ENDS HERE **//

      // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC APPLE TOUCH ICON CODE TO index.html STARTS HERE **//
      document.querySelector('#apple-touch-icon-placeholder').setAttribute('href', iconURL);
      // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC APPLE TOUCH ICON CODE TO index.html ENDS HERE **//
    }

    // *** EDNEED PWA DYNAMIC manifest.json GENERATION CODE ENDS HERE *** // 


    // Selected Menu Option
    let MenuComponent;
    if (menuItem) {
      MenuComponent = menuItem.component;
    }

    // Overview Option
    if (route === "/" || !menuItem) {
      return (
        <React.Fragment>
          <InstituteWebsiteHero />
          <SocialConnect />
          {menuItem && <MenuComponent instituteid={data._id} />}
          {
            menuList?.dynamic_header && menuList.dynamic_header.length && menuList.dynamic_header.map((item) => {
              return (
                <React.Fragment>
                  {item.path === "/faculty" && <WebsiteFaculty ShowFacultyLimit={4} instituteid={data._id} homePage={true} />}
                  {item.path === "/admission" && <Admissions ShowAdmissionLimit={3} instituteid={data._id} homePage={true} />}
                  {item.path === "/feestructure" && <FeeStructure ShowFSLimit={3} instituteid={data._id} homePage={true} />}
                  {item.path === "/services" && <Service ShowServicesLimit={3} instituteid={data._id} homePage={true} />}
                  {item.path === "/announcement" && <WebsiteAnnouncement instituteid={data._id} announcementLimit={3} homePage={true} />}
                  {item.path === "/miscellaneous" && <WebsiteMiscellaneous instituteid={data._id} ShowMiscellaneousLimit={3} homePage={true} />}
                  {item.path === "/gallery" && <WebsiteGallery instituteid={data._id} galleryLimit={4} homePage={true} />}
                  {item.path === "/vacancy" && <WebsiteVacancy instituteid={data._id} ShowVacancyLimit={4} homePage={true} />}
                  <div className="FT-HomeWrapper">
                    <div className="sectionCntrWrap">
                      <div className="subDomainsec2Col">
                        <div className="HomeFaq">
                          {item.path === "/faqs" && <Faqs ShowFaqLimit={5} instituteid={data._id} homePage={true} />}
                        </div>
                        <div className="HomeTestimonial">
                          {item.path === "/testimonial" && <TestimonialSlider instituteid={data._id} homePage={true} />}
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="isdhome-contact">
                    {item.path === "/contactus" && <Contactus instituteid={data._id} />}
                  </div>
                </React.Fragment>

              )
            })
          }

        </React.Fragment>
      );
    }
    // swInstitutes();
    // Other options
    return <MenuComponent instituteid={data._id} />;
  };

  startLoading = () => {
    if (AppLinkUrl.privateDomain()) {
      this.props.loadprivatedomain(AppLinkUrl.getHost());
      this.props.privateDomainActivateTheme(AppLinkUrl.getHost())
      this.props.privateDomainMenuHeader(AppLinkUrl.getHost())
    } else {
      this.props.loadinstitute(AppLinkUrl.subdomain());
      this.props.subDomainActivateTheme(AppLinkUrl.subdomain())
      this.props.subDomainMenuHeader(AppLinkUrl.subdomain())
    }
  };

  componentDidMount() {
    this.startLoading();
  }

  componentDidCatch(error, errorInfo) { }

  render() {
    const { loading, notfound, reload, heading } = this.props.instituteinfo;
    const { websiteThemeLoading } = this.props.institutetheme;
    const pathname = window.location.pathname;
    return (
      <ThemeProvider theme={this.props.institutetheme}>
        <GlobalStyleInstitute />
        <InstituteWebsiteTheme>
          {loading || websiteThemeLoading ? (
            <InstituteLoader />
          ) : notfound ? (
            <NotFound showlogo={false} />
          ) : reload ? (
            <button onClick={this.startLoading}>Reload</button>
          ) : (
            <React.Fragment>
              <DynamicHeaderProvider value={heading}>
                {this.selectedRoute(pathname)}
              </DynamicHeaderProvider>
            </React.Fragment>
          )}
        </InstituteWebsiteTheme>
      </ThemeProvider>
    );
  }
}

export default connect(
  INSWEB_MAP_STATE_TO_PROPS,
  INSWEB_MAP_DISPATCH_TO_PROPS
)(InstituteWebsite);
