import React, { useEffect, Suspense } from "react";
import InstituteWebsiteTheme from "../../Common/Theme/InstituteWebsiteTheme";
import WebsiteGallery from "../WebsiteGallery";
import WebsiteAnnouncement from "../WebsiteAnnouncement";
// import { ColorSkinIcon } from "../../Common/Images";
import { useDispatch, useSelector } from "react-redux";
import InstituteWebsiteHeroPreview from "../InstituteWebsiteHeroPreview";
import HomeAbout from "../HomeAbout";
import WebsiteAbout from "../WebsiteAbout";
import WebsiteFaculty from "../WebsiteFaculty";
import NotFound from "../../ErrorPage/NotFound";
import Contactus from "../Contactus";
import Admissions from "../Admissions";
import FeeStructure from "../FeeStructure";
import InstituteLoader from "../../Common/Loader/ComponentLoader";
import Service from "../Service";
import Faqs from "../WebsiteFaq";
import TestimonialSlider from "../TestimonialSlider";
import WebsiteVacancy from "../WebsiteVacancy";
import { DynamicHeaderProvider } from "../../Context/DynamicHeaderContext";
import SocialConnect from "../SocialConnect";
import { GlobalStyleInstitute } from "../themepreview";
import { ThemeProvider } from "styled-components";
// import AppLink from "../../Common/AppLink";
import { getSingleThemeOnPreview } from "../../store/actions/institutetheme";
import { findSubdomain } from "../../store/actions/institutewebsite";
import { useParams } from "react-router-dom";
import PreviewNavItem from "../PreviewNavItem";

const menuItemOptions = {
  "/preview-skintheme/": {
    titleKey: undefined, // No key availabel for home
    title: "Home",
    component: HomeAbout,
  },
  "/preview-skintheme/about": {
    titleKey: undefined, // No key availabel for about menu option
    title: "About",
    component: WebsiteAbout,
  },
  "/preview-skintheme/faculty": {
    titleKey: "facultyhead", // For dynamic header menu faculty option
    title: "Faculty",
    component: WebsiteFaculty,
  },
  "/preview-skintheme/admission": {
    titleKey: "admissionhead", // For dynamic header menu admission option
    title: "Admissions",
    component: Admissions,
  },
  "/preview-skintheme/feestructure": {
    titleKey: "feehead", // For dynamic header menu feestructure option
    title: "Fee Structure",
    component: FeeStructure,
  },
  "/preview-skintheme/services": {
    titleKey: "servicehead", // For dynamic header menu services option
    title: "Services",
    component: Service,
  },
  "/preview-skintheme/announcements": {
    titleKey: "announcementhead", // For dynamic header menu announcements option
    title: "Announcement",
    component: WebsiteAnnouncement,
  },
  "/preview-skintheme/gallery": {
    titleKey: "galleryhead", // For dynamic header menu gallery option
    title: "Gallery",
    component: WebsiteGallery,
  },
  "/preview-skintheme/faqs": {
    titleKey: "faqhead", // For dynamic header menu faqs option
    title: "FAQs",
    component: Faqs,
  },
  "/preview-skintheme/vacancy": {
    titleKey: "vacancyhead", // For dynamic header menu vacancy option
    title: "Vacancy",
    component: WebsiteVacancy,
  },
  "/preview-skintheme/contact": {
    titleKey: "", // No key availabel for contact menu option
    title: "Contact",
    component: Contactus,
  },
};

const PreviewCustomAndPreferred = () => {
  const dispatch = useDispatch();

  const { instituteinfo, user, institutetheme } = useSelector((state) => {
    return {
      instituteinfo: state.institutewebsite,
      user: state.user,
      institutetheme: state.institutetheme,
      instituteSubdomain: state.user.user_institute_institute_subdomain,
      themeID: state.institutewebsite.themeId,
    };
  });

  const { loading, notfound, reload, heading } = instituteinfo;
  const pathname = window.location.pathname;
  const { themeid, skinType } = useParams();

  useEffect(() => {
    dispatch(findSubdomain(user.user_institute_institute_subdomain));
    dispatch(getSingleThemeOnPreview(themeid, skinType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let themeData =
    institutetheme.previewTheme !== undefined && institutetheme.previewTheme;

  const selectedRoute = (route) => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    const menuItem = menuItemOptions[route];
    const { data } = instituteinfo;
    let MenuComponent;
    if (menuItem) {
      MenuComponent = menuItem.component;
    }

    if (route === "/preview-skintheme" || !menuItem) {
      return (
        <React.Fragment>
          <SocialConnect />
          {menuItem && <MenuComponent instituteid={data._id} />}
          <HomeAbout disabledButton={true} instituteid={data._id} />
          <WebsiteFaculty
            disabledButton={true}
            ShowFacultyLimit={4}
            instituteid={data._id}
          />
          <Admissions
            disabledButton={true}
            ShowAdmissionLimit={3}
            instituteid={data._id}
          />
          <FeeStructure
            disabledButton={true}
            ShowFSLimit={3}
            instituteid={data._id}
          />
          <Service
            disabledButton={true}
            ShowServicesLimit={3}
            instituteid={data._id}
          />
          <WebsiteAnnouncement disabledButton={true} instituteid={data._id} />
          <WebsiteGallery disabledButton={true} instituteid={data._id} />
          <div className="FT-HomeWrapper">
            <div className="sectionCntrWrap">
              <div className="subDomainsec2Col">
                <div className="HomeFaq">
                  <Faqs
                    disabledButton={true}
                    ShowFaqLimit={5}
                    instituteid={data._id}
                  />
                </div>
                <div className="HomeTestimonial">
                  <TestimonialSlider instituteid={data._id} />
                </div>
              </div>
            </div>
          </div>
          <div className="isdhome-contact">
            <Contactus disabledButton={true} instituteid={data._id} />
          </div>
        </React.Fragment>
      );
    }
    // Other options
    return <MenuComponent instituteid={data._id} />;
  };

  return (
    <ThemeProvider theme={institutetheme && institutetheme}>
      {/* <SubDomainHeader /> */}
      <PreviewNavItem subdomainLogo={instituteinfo.data.institute_logo} />
      <InstituteWebsiteHeroPreview />

      <GlobalStyleInstitute />
      <Suspense fallback={<div>Loading..</div>}>
        <InstituteWebsiteTheme>
          {loading && themeData ? (
            <InstituteLoader />
          ) : notfound ? (
            <NotFound showlogo={false} />
          ) : reload ? (
            <button onClick={this.startLoading}>Reload</button>
          ) : (
            <React.Fragment>
              <DynamicHeaderProvider value={heading}>
                {selectedRoute(pathname)}
              </DynamicHeaderProvider>
            </React.Fragment>
          )}
          {/* <SubDomainHeader /> */}
        </InstituteWebsiteTheme>
      </Suspense>
    </ThemeProvider>
  );
};

export default PreviewCustomAndPreferred;
