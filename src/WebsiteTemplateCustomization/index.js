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
import PrivacyPages from '../WebsiteTemplateCustomization/PageImports/PrivacyPolicy'
// import FeeStructurePages from './PageImports/FeeStructure'
// import FacilityPages from './PageImports/Facility'
// import AnnouncementsPages from './PageImports/Announcements'
// import VacancyPages from './PageImports/Vacancy'
// import FaqsPages from './PageImports/Faqs'
// import ContactPages from './PageImports/Contact'
// import GalleryPages from './PageImports/Gallery'
import GalleryListPages from './PageImports/GalleryList'
import React from 'react';
import { useEffect } from 'react'
import { getGalleryAlbum, selectRouteForPreview } from '../store/actions/WebsiteTemplate'
import { useDispatch, useSelector } from 'react-redux'
import ScrollToTop from '../Common/ScrollPageTop'
import MiscellaneousPage from './SectionComponent/Miscellaneous/TheTranquill/MiscellaneousPage'
import MiscellaneousPageComponents from './PageImports/Miscellaneous'
// import { getWebsiteDomainTemplate, selectRouteForPreview } from '../store/actions/WebsiteTemplate'
// import { useDispatch } from 'react-redux'
// let theme = {
//   bodyComponent: "Vespertine_Body",
// }
// const menuItemOptions = {
//   "/": {
//     titleKey: undefined, // No key availabel for home
//     title: "Home",
//     component: SectionBody[theme.bodyComponent],
//   },
//   "/aboutus": {
//     titleKey: undefined, // No key availabel for about menu option
//     title: "About",
//     component: AboutPages["Vespertine_AboutUsPage"],
//   },
//   "/faculty": {
//     titleKey: "teamhead", // For dynamic header menu faculty option
//     title: "Team",
//     component: TeamPages["Vespertine_TeamPage"],
//   },

//   "/admission": {
//     titleKey: "admissionhead", // For dynamic header menu faculty option
//     title: "Admission",
//     component: AdmissionPage["Vespertine_AdmissionPage"],
//   },
//   "/feestructure": {
//     titleKey: "feestructurehead", // For dynamic header menu faculty option
//     title: "Fee Structure",
//     component: FeeStructurePages["Vespertine_FeeStructurePage"],
//   },
//   "/facility": {
//     titleKey: "Facilityhead", // For dynamic header menu faculty option
//     title: "Facility",
//     component: FacilityPages["Vespertine_FacilityPage"],
//   },
//   "/announcements": {
//     titleKey: "Announcementshead", // For dynamic header menu faculty option
//     title: "Announcements",
//     component: AnnouncementsPages["Vespertine_AnnouncementsPage"],
//   },
//   "/vacancy": {
//     titleKey: "Vacancyshead", // For dynamic header menu faculty option
//     title: "Vacancy",
//     component: VacancyPages["Vespertine_VacancyPage"],
//   },
//   "/faqs": {
//     titleKey: "Faqshead", // For dynamic header menu faculty option
//     title: "Faqs",
//     component: FaqsPages["Vespertine_FaqsPage"],
//   },
//   "/contactus": {
//     titleKey: "Contacthead", // For dynamic header menu faculty option
//     title: "Contact",
//     component: ContactPages["Vespertine_ContactPage"],
//   },
//   "/gallery": {
//     titleKey: "Galleryhead", // For dynamic header menu faculty option
//     title: "Gallery",
//     component: GalleryPages["Vespertine_GalleryPage"],
//   },
//   "/gallery-list": {
//     titleKey: "GalleryListhead", // For dynamic header menu faculty option
//     title: "GalleryList",
//     component: GalleryListPages["Vespertine_GalleryListPage"],
//   },
//   // "/admission": {
//   //   titleKey: "admissionhead", // For dynamic header menu admission option
//   //   title: "Admissions",
//   //   component: Admissions,
//   // },
//   // "/feestructure": {
//   //   titleKey: "feehead", // For dynamic header menu feestructure option
//   //   title: "Fee Structure",
//   //   component: FeeStructure,
//   // },
//   // "/services": {
//   //   titleKey: "servicehead", // For dynamic header menu services option
//   //   title: "Services",
//   //   component: Service,
//   // },
//   // "/announcements": {
//   //   titleKey: "announcementhead", // For dynamic header menu announcements option
//   //   title: "Announcement",
//   //   component: WebsiteAnnouncement,
//   // },
//   // "/gallery": {
//   //   titleKey: "galleryhead", // For dynamic header menu gallery option
//   //   title: "Gallery",
//   //   component: WebsiteGallery,
//   // },
//   // "/faqs": {
//   //   titleKey: "faqhead", // For dynamic header menu faqs option
//   //   title: "FAQs",
//   //   component: Faqs,
//   // },
//   // "/miscellaneous": {
//   //   titleKey: "noticehead", // For dynamic header menu notice option
//   //   title: " Miscellaneous",
//   //   component: WebsiteMiscellaneous,
//   // },
//   // "/vacancy": {
//   //   titleKey: "vacancyhead", // For dynamic header menu vacancy option
//   //   title: "Vacancy",
//   //   component: WebsiteVacancy,
//   // },
//   // "/book_Appointment": {
//   //   titleKey: "", // For dynamic header menu vacancy option
//   //   title: "BookAppointment",
//   //   component: WebsiteBookAppointment,
//   // },
//   // "/contactus": {
//   //   titleKey: "", //  No key availabel for contact menu option
//   //   title: "Contact",
//   //   component: Contactus,
//   // },
// };
const WebsiteTemplateCustomization = () => {
  const { theme, themeSuccess, themeStatus, businessInfoSuccess,
    businessInfoData } = useSelector((state) => {
      return {
        theme: state.websiteTemplate.getTemplate.data,
        themeSuccess: state.websiteTemplate.getTemplate.success,
        themeStatus: state.websiteTemplate.getTemplate.status,
        businessInfoSuccess: state.businessInfo.ecomWebsite.success,
        businessInfoData: state.businessInfo.ecomWebsite.data,
        // themeLoading: state.websiteTemplate.getTemplate.loading,
        // themeGlobal: state.websiteTemplate.getTemplate.data.themeGlobal,
      }
    })

  const menuItemOptions = {
    "/": {
      titleKey: undefined, // No key availabel for home
      title: "Home",
      component: SectionBody[themeSuccess ? theme.themeGlobal.component : "Vespertine_Body"],
    },
    "/aboutus": {
      titleKey: undefined, // No key availabel for about menu option
      title: "About",
      component: AboutPages[themeSuccess ? theme.AboutUs.AboutUsPage.component : "Vespertine_AboutUsPage"],
    },
    "/faculty": {
      titleKey: "teamhead", // For dynamic header menu faculty option
      title: "Team",
      component: TeamPages[themeSuccess ? theme.Team.TeamPage.component : "Vespertine_TeamPage"],
    },

    "/admission": {
      titleKey: "admissionhead", // For dynamic header menu faculty option
      title: "Admission",
      component: AdmissionPages[themeSuccess ? theme.Admission.AdmissionPage.component : "Vespertine_AdmissionPage"],
    },
    "/feestructure": {
      titleKey: "feestructurehead", // For dynamic header menu faculty option
      title: "Fee Structure",
      component: FeeStructurePages[themeSuccess ? theme.FeeStructure.FeeStructurePage.component : "Vespertine_FeeStructurePage"],
    },
    "/services": {
      titleKey: "Facilityhead", // For dynamic header menu faculty option
      title: "Facility",
      component: FacilityPages[themeSuccess ? theme.Facility.FacilityPage.component : "Vespertine_FacilityPage"],
    },
    "/announcements": {
      titleKey: "Announcementshead", // For dynamic header menu faculty option
      title: "Announcements",
      component: AnnouncementsPages[themeSuccess ? theme.Announcement.AnnouncementPage.component : "Vespertine_AnnouncementsPage"],
    },
    "/vacancy": {
      titleKey: "Vacancyshead", // For dynamic header menu faculty option
      title: "Vacancy",
      component: VacancyPages[themeSuccess ? theme.Vacancy.VacancyPage.component : "Vespertine_VacancyPage"],
    },
    "/faqs": {
      titleKey: "Faqshead", // For dynamic header menu faculty option
      title: "Faqs",
      component: FaqsPages[themeSuccess ? theme.Faqs.FaqsPage.component : "Vespertine_FaqsPage"],
    },
    "/contactus": {
      titleKey: "Contacthead", // For dynamic header menu faculty option
      title: "Contact",
      component: ContactPages[themeSuccess ? theme.Contact.ContactPage.component : "Vespertine_ContactPage"],
    },
    "/gallery": {
      titleKey: "Galleryhead", // For dynamic header menu faculty option
      title: "Gallery",
      component: GalleryPages[themeSuccess ? theme.Gallery.GalleryPage.component : "Vespertine_GalleryPage"],
    },
    "/privacypolicy": {
      titleKey: undefined, // No key availabel for privacy option
      title: "Privacy Policy",
      component: PrivacyPages[themeSuccess ? theme.themeGlobal.component === "Vespertine_Body" ? "Vespertine_PrivacyPolicyPage" : "Defaultine_PrivacyPolicyPage" : "Vespertine_PrivacyPolicyPage"],
    },
    "/miscellaneous":{
      titleKey: "noticehead", // No key availabel for privacy option
      title: "Miscellanous",
      component: MiscellaneousPageComponents[themeSuccess ? theme.themeGlobal.component === "Vespertine_Body" ? "Vaspertine_MiscellaneousPage" : "Vaspertine_MiscellaneousPage" : "Vaspertine_MiscellaneousPage"],
  
    }
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
  let short_name = ""
  let institute_intro_description = "";
  let institute_name = "";
  let iconURL = "";
  const origin = window.location.origin;
  let institute_is_pwa = "";
  if (businessInfoSuccess) {
    short_name = businessInfoData.institute_name;
    institute_intro_description = businessInfoData.institute_about;
    institute_name = businessInfoData.institute_name;
    iconURL = businessInfoData.institute_logo;
    institute_is_pwa = businessInfoData.institute_is_pwa;
  } else {
    short_name = theme.instituteData.institute_name;
    institute_intro_description = theme.instituteData.institute_about;
    institute_name = theme.instituteData.institute_name;
    iconURL = theme.instituteData.institute_logo;
    institute_is_pwa = theme.instituteData.institute_is_pwa;
  }


  let myDynamicManifest = {
    short_name: short_name,
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
  //console.log('Manifest Json: ', myDynamicManifest);
  if (institute_is_pwa == true) {
    // console.log('PWA Enabled: ', theme.instituteData.institute_is_pwa);
    //console.log('PWA for Institute Enabled: ', institute_is_pwa);
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(blob);
    //console.log(manifestURL);

    // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC manifest.json CODE TO index.html STARTS HERE **//
    document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);
    // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC manifest.json CODE TO index.html ENDS HERE **//

    // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC APPLE TOUCH ICON CODE TO index.html STARTS HERE **//
    document.querySelector('#apple-touch-icon-placeholder').setAttribute('href', iconURL);
    // ** LINKING EDNEED SUBDOMAIN & PRIVATE DOMAIN DYNAMIC APPLE TOUCH ICON CODE TO index.html ENDS HERE **//
  }

  // *** EDNEED SUBDOMAIN & PRIVATE DOMAIN PWA DYNAMIC manifest.json GENERATION CODE ENDS HERE *** //


  const dispatch = useDispatch()
  const BodyToRender = SectionBody[themeSuccess ? theme.themeGlobal.component : "Vespertine_Body"]
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
    if (themeSuccess) {
      dispatch(getGalleryAlbum(themeSuccess && theme.instituteData._id))
    }
  }, [dispatch, theme, themeSuccess])
  // useEffect(() => {
  //   if (AppLinkUrl.privateDomain()) {
  //     dispatch(getWebsiteDomainTemplate("domain", AppLinkUrl.getHost()))
  //   } else {
  //     dispatch(getWebsiteDomainTemplate("subdomain", AppLinkUrl.subdomain()))
  //   }
  // }, [dispatch])
  return (
    <React.Fragment >
      {
        themeSuccess ?
          // eslint-disable-next-line eqeqeq
          themeStatus == 201 ?
            selectedRoute()
            : ""
          : ""
      }
      <ScrollToTop />
    </React.Fragment >
  )
}

export default WebsiteTemplateCustomization