import SectionBody from '../WebsiteTemplateCustomization/SectionImports/SectionBody'
import AboutPages from '../WebsiteTemplateCustomization/PageImports/AboutUs'
import TeamPages from '../WebsiteTemplateCustomization/PageImports/Team'
import AdmissionPages from '../WebsiteTemplateCustomization/PageImports/Admission'
import FeeStructurePages from '../WebsiteTemplateCustomization/PageImports/FeeStructure'
import FacilityPages from '../WebsiteTemplateCustomization/PageImports/Facility'
import AnnouncementsPages from '../WebsiteTemplateCustomization/PageImports/Announcements'
import VacancyPages from '../WebsiteTemplateCustomization/PageImports/Vacancy'
import FaqsPages from '../WebsiteTemplateCustomization/PageImports/Faqs'
import ContactPages from '../WebsiteTemplateCustomization/PageImports/Contact'
import GalleryPages from '../WebsiteTemplateCustomization/PageImports/Gallery'
import NoticeBoardPage from '../WebsiteTemplateCustomization/PageImports/NoticeBoard'
import TestimonialPage from '../WebsiteTemplateCustomization/PageImports/testimonial'
import CategoryPage from './PageImports/Category'
import ServicesPage from '../WebsiteTemplateCustomization/PageImports/Service'
import ServicesPageDetails from '../WebsiteTemplateCustomization/PageImports/Service'
import ProfilePageDetails from '../WebsiteTemplateCustomization/PageImports/Profile'
import MiscellaneousPage from './PageImports/Miscellaneous'
// import FeeStructurePages from './PageImports/FeeStructure'
// import FacilityPages from './PageImports/Facility'
// import AnnouncementsPages from './PageImports/Announcements'
// import VacancyPages from './PageImports/Vacancy'
// import FaqsPages from './PageImports/Faqs'
// import ContactPages from './PageImports/Contact'
// import GalleryPages from './PageImports/Gallery'
import GalleryListPages from '../WebsiteTemplateCustomization/PageImports/GalleryList'
import React from 'react';
import { useEffect } from 'react'
import { getGalleryAlbum, selectRouteForPreview } from '../store/actions/serviceWebsiteTemplate'
import { useDispatch, useSelector } from 'react-redux'
// import ScrollToTop from '../Common/ScrollToTop'
const WebsiteTemplateCustomization = () => {
  const { theme, themeSuccess, themeStatus, websiteType } = useSelector((state) => {
    return {
      theme: state.websiteTemplate.getTemplate.data,
      themeSuccess: state.websiteTemplate.getTemplate.success,
      themeStatus: state.websiteTemplate.getTemplate.status,
      websiteType: state.websiteTemplate.getTemplate.websiteType
    }
  })

  const menuItemOptions = {
    "/": {
      titleKey: undefined, // No key availabel for home
      title: "Home",
      component: SectionBody["TheTranquill_Body"],
    },
    "/aboutus": {
      titleKey: undefined, // No key availabel for about menu option
      title: "About",
      component: AboutPages["TheTranquill_AboutUsPage"],
    },
    "/faculty": {
      titleKey: "teamhead", // For dynamic header menu faculty option
      title: "Team",
      component: TeamPages["TheTranquill_TeamPage"],
    },

    "/facilities": {
      titleKey: "facilitieshead", // For dynamic header menu faculty option
      title: "Facilities",
      component: FacilityPages["TheTranquill_FacilityPage"],
    },
    "/admission": {
      titleKey: "admissionhead", // For dynamic header menu faculty option
      title: "Admission",
      component: AdmissionPages["Vespertine_AdmissionPage"],
    },
    "/feestructure": {
      titleKey: "feestructurehead", // For dynamic header menu faculty option
      title: "Fee Structure",
      component: FeeStructurePages["Vespertine_FeeStructurePage"],
    },
    "/announcements": {
      titleKey: "Announcementshead", // For dynamic header menu faculty option
      title: "Announcements",
      component: AnnouncementsPages["TheTranquill_AnnouncementsPage"],
    },
    "/vacancy": {
      titleKey: "Vacancyshead", // For dynamic header menu faculty option
      title: "Vacancy",
      component: VacancyPages["TheTranquill_VacancyPage"],
    },
    "/faqs": {
      titleKey: "Faqshead", // For dynamic header menu faculty option
      title: "Faqs",
      component: FaqsPages["TheTranquill_FaqsPage"],
    },
    "/contactus": {
      titleKey: "Contacthead", // For dynamic header menu faculty option
      title: "Contact",
      component: ContactPages["TheTranquill_ContactPage"],
    },
    "/gallery": {
      titleKey: "Galleryhead", // For dynamic header menu faculty option
      title: "Gallery",
      component: GalleryPages["TheTranquill_GalleryPage"],
    },
    "/gallery-list": {
      titleKey: "Galleryhead list", // For dynamic header menu faculty option
      title: "Gallery List",
      component: GalleryListPages["TheTranquill_GalleryListPage"],
    },
    "/center-of-excellence": {
      titleKey: "coehead", // For dynamic header menu faculty option
      title: "Center Of Excellence",
      component: NoticeBoardPage["TheTranquill_NoticeBoardPageCOE"],
    },
    "/testimonials": {
      titleKey: "TestimonialPage Head list", // For dynamic header menu faculty option
      title: "TestimonialPage List",
      component: TestimonialPage["TheTranquill_TestimonialPage"],
    },
    "/categories": {
      titleKey: "CategoryPage Head list", // For dynamic header menu faculty option
      title: "CategoryPage List",
      component: CategoryPage["TheTranquill_CategoryPage"],
    },
    "/service": {
      titleKey: "ServicesPage Head list", // For dynamic header menu faculty option
      title: "ServicesPage List",
      component: ServicesPage["TheTranquill_ServicePage"],
    },
    "/service-detail": {
      titleKey: "ServicesPageDetails Head list", // For dynamic header menu faculty option
      title: "ServicesPageDetails List",
      component: ServicesPageDetails["TheTranquill_ServicePageDetails"],
    },
    "/profile-detail": {
      titleKey: "ProfileDetail Head list", // For dynamic header menu faculty option
      title: "ProfileDetails List",
      component: ProfilePageDetails["TheTranquill_ProfilePageDetails"],
    },
    "/miscellaneous": {
      titleKey: "ProfileDetail Head list", // For dynamic header menu faculty option
      title: "ProfileDetails List",
      component: MiscellaneousPage["TheTranquill_MiscellaneousPage"],
    },
    // "/admission": {
    //   titleKey: "admissionhead", // For dynamic header menu admission option
    //   title: "Admissions",
    //   component: Admissions,
    // },
    // "/feestructure": {
    //   titleKey: "feehead", // For dynamic header menu feestructure option
    //   title: "Fee Structure",
    //   component: FeeStructure,
    // },
    // "/services": {
    //   titleKey: "servicehead", // For dynamic header menu services option
    //   title: "Services",
    //   component: Service,
    // },
    // "/announcements": {
    //   titleKey: "announcementhead", // For dynamic header menu announcements option
    //   title: "Announcement",
    //   component: WebsiteAnnouncement,
    // },
    // "/gallery": {
    //   titleKey: "galleryhead", // For dynamic header menu gallery option
    //   title: "Gallery",
    //   component: WebsiteGallery,
    // },
    // "/faqs": {
    //   titleKey: "faqhead", // For dynamic header menu faqs option
    //   title: "FAQs",
    //   component: Faqs,
    // },
    // "/miscellaneous": {
    //   titleKey: "noticehead", // For dynamic header menu notice option
    //   title: " Miscellaneous",
    //   component: WebsiteMiscellaneous,
    // },
    // "/vacancy": {
    //   titleKey: "vacancyhead", // For dynamic header menu vacancy option
    //   title: "Vacancy",
    //   component: WebsiteVacancy,
    // },
    // "/book_Appointment": {
    //   titleKey: "", // For dynamic header menu vacancy option
    //   title: "BookAppointment",
    //   component: WebsiteBookAppointment,
    // },
    // "/contactus": {
    //   titleKey: "", //  No key availabel for contact menu option
    //   title: "Contact",
    //   component: Contactus,
    // },
  };

  // *** EDNEED SUBDOMAIN & PRIVATE DOMAIN PWA DYNAMIC manifest.json GENERATION CODE STARTS HERE *** // 


  // let short_name = theme.instituteData.institute_name;
  // let institute_intro_description = theme.instituteData.institute_about;
  // let institute_name = theme.instituteData.institute_name;
  // let iconURL = theme.instituteData.institute_logo;
  // const origin = window.location.origin;
  // let institute_is_pwa = theme.instituteData.institute_is_pwa;

  // let myDynamicManifest = {
  //   short_name: short_name,
  //   description: institute_intro_description,
  //   name: institute_name,
  //   icons: [{ src: iconURL, sizes: "512x512", type: "image/png", purpose: "any maskable" }],
  //   start_url: origin,
  //   display: "standalone",
  //   theme_color: "#121212",
  //   background_color: "#ffffff",
  //   orientation: "portrait",
  //   scope: "."
  // };

  // if (institute_is_pwa == true) {
  //   const stringManifest = JSON.stringify(myDynamicManifest);
  //   const blob = new Blob([stringManifest], { type: 'application/json' });
  //   const manifestURL = URL.createObjectURL(blob);


  //   // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC manifest.json CODE TO index.html STARTS HERE **//
  //   document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);
  //   // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC manifest.json CODE TO index.html ENDS HERE **//

  //   // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC APPLE TOUCH ICON CODE TO index.html STARTS HERE **//
  //   document.querySelector('#apple-touch-icon-placeholder').setAttribute('href', iconURL);
  //   // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC APPLE TOUCH ICON CODE TO index.html ENDS HERE **//
  // }

  // *** EDNEED SUBDOMAIN & PRIVATE DOMAIN PWA DYNAMIC manifest.json GENERATION CODE ENDS HERE *** //



  const dispatch = useDispatch()
  const BodyToRender = SectionBody["TheTranquill_Body"]
  // const AboutUs = AboutPages["Vespertine_AboutUsPage"]
  const selectedRoute = () => {
    const pathname = window.location.pathname
    const menuItem = menuItemOptions[pathname];
    let MenuComponent;
    if (menuItem) {
      MenuComponent = menuItem.component;
    }
    if (pathname === "/" || !menuItem) {
      return (
        <React.Fragment><BodyToRender /></React.Fragment>
      );
    } else {
      return <MenuComponent />;
    }
  };
  useEffect(() => {
    dispatch(selectRouteForPreview("/", false))
  }, [dispatch])
  useEffect(() => {
    if (themeSuccess && theme.instituteData._id) {
      dispatch(getGalleryAlbum(theme.instituteData._id, websiteType))
    }
  }, [dispatch, theme.instituteData._id, themeSuccess, websiteType])
  // useEffect(() => {
  //   if (AppLinkUrl.privateDomain()) {
  //     dispatch(getWebsiteDomainTemplate("domain", AppLinkUrl.getHost()))
  //   } else {
  //     dispatch(getWebsiteDomainTemplate("subdomain", AppLinkUrl.subdomain()))
  //   }
  // }, [dispatch])
  return (
    <React.Fragment >

      {selectedRoute()}


    </React.Fragment >
  )
}

export default WebsiteTemplateCustomization