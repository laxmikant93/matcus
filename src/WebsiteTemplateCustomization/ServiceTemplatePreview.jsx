import SectionBody from '../WebsiteTemplateCustomization/SectionImports/SectionBody'
import AboutPages from '../WebsiteTemplateCustomization/PageImports/AboutUs'
import TeamPages from '../WebsiteTemplateCustomization/PageImports/Team'
// import AdmissionPages from '../WebsiteTemplateCustomization/PageImports/Admission'
// import FeeStructurePages from '../WebsiteTemplateCustomization/PageImports/FeeStructure'
// import FacilityPages from '../WebsiteTemplateCustomization/PageImports/Facility'
import ServicePageDetails from "../WebsiteTemplateCustomization/PageImports/Service"
import AnnouncementsPages from '../WebsiteTemplateCustomization/PageImports/Announcements'
import VacancyPages from '../WebsiteTemplateCustomization/PageImports/Vacancy'
import FaqsPages from '../WebsiteTemplateCustomization/PageImports/Faqs'
import ContactPages from '../WebsiteTemplateCustomization/PageImports/Contact'
import GalleryPages from '../WebsiteTemplateCustomization/PageImports/Gallery'
import FacilitiesPage from "../WebsiteTemplateCustomization/PageImports/Facility"
import TestimonialPage from '../WebsiteTemplateCustomization/PageImports/testimonial'
import CategoryPage from "../WebsiteTemplateCustomization/PageImports/Category"
import CollectionPage from "../WebsiteTemplateCustomization/SectionComponent/Collection/TheTranquill/Collection"
import CollectionListPage from "../WebsiteTemplateCustomization/SectionComponent/Collection/TheTranquill/CollectionListPage"
import ServicesPage from '../WebsiteTemplateCustomization/PageImports/Service'
import SectionHeader from './SectionImports/SectionHeader';
import SectionFooter from './SectionImports/SectionFooter';
import NoticeBoardPage from '../WebsiteTemplateCustomization/PageImports/NoticeBoard'
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
import { getGalleryAlbum } from '../store/actions/serviceWebsiteTemplate'
import { useDispatch, useSelector } from 'react-redux'
import ScrollToTop from '../Common/ScrollPageTop'
import SuccessMessagePopup from '../Common/SuccessMessagePopup'
import { ThemeProvider } from 'styled-components'
import Headroom from 'react-headroom'
import ComponentLoader from '../Common/Loader/ComponentLoader'
import { getWebsiteDomainTemplate, selectRouteForPreview } from '../store/actions/serviceWebsiteTemplate';
import AppLinkUrl from '../Common/AppLink/AppLinkUrl'
import WebsiteServiceList from '../InstituteWebsite/WebsiteServiceList'
import WebsiteBookAppointment from '../InstituteWebsite/WebsiteBookAppointment'
import useTheme from '../ServiceThemeEditor/useTheme'
// import ServicesGlobalStyle from './CommonComponent/ServicesGlobalStyle/servicesglobal.styled'
import ServicesGlobalTypoStyle from './CommonComponent/ServicesGlobalStyle'
// import { useDispatch } from 'react-redux'

const ServiceTemplatePreview = () => {

  const { pathname, user, themeSuccess, themeDetails, editorSuccess, themeStatus, paramsId, websiteType } = useSelector((state) => {
    return {
      user: state.user,
      pathname: state.serviceTemplate.route,
      themeDetails: state.serviceTemplate.getTemplate.data,
      themeSuccess: state.serviceTemplate.getTemplate.success,
      themeStatus: state.serviceTemplate.getTemplate.status,
      paramsId: state.serviceTemplate.paramsId,
      websiteType: state.serviceTemplate.getTemplate.websiteType,
      editorSuccess: state.serviceTemplate.getTemplate.editorSuccess,
    }
  })
  const [theme]=useTheme()
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
    "/service": {
      titleKey: undefined, // No key availabel for services
      title: "Services",
      component: ServicesPage["TheTranquill_ServicePage"],
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
    "/facilities": {
      titleKey: "Facilityhead", // For dynamic header menu faculty option
      title: "Facility",
      component: FacilitiesPage["TheTranquill_FacilityPage"],
    },
    "/faqs": {
      titleKey: "Faqshead", // For dynamic header menu faculty option
      title: "Faqs",
      component: FaqsPages["TheTranquill_FaqsPage"],
    },
    "/testimonials": {
      titleKey: "Testimonialshead", // For dynamic header menu faculty option
      title: "Testimonials",
      component: TestimonialPage["TheTranquill_TestimonialPage"],
    },
    "/contactus": {
      titleKey: "Contacthead", // For dynamic header menu faculty option
      title: "Contact",
      component: ContactPages["TheTranquill_ContactPage"],
    },
    "/categories": {
      titleKey: undefined, // No key availabel for categories
      title: "Contact",
      component: CategoryPage["TheTranquill_CategoryPage"],
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
      titleKey: "NoticeBoardPageCOE Head list", // For dynamic header menu faculty option
      title: "NoticeBoardPageCOE List",
      component: NoticeBoardPage["TheTranquill_NoticeBoardPageCOE"],
    },
    [`/book-appointment/${paramsId}`]: {
      titleKey: "appointmenthead", // For dynamic header menu faculty option
      title: "Book an Appointment",
      component: WebsiteBookAppointment,
    },
    [`/service-detail/${paramsId}`]: {
      titleKey: "appointmenthead", // For dynamic header menu faculty option
      title: "Service Detail",
      component: ServicePageDetails["TheTranquill_ServicePageDetails"],
    },
    "/select-appointment-service": {
      titleKey: "servicelsthead", // For dynamic header menu faculty option
      title: "servicelist",
      component: WebsiteServiceList,
    },
    [`/category-services/${paramsId}`]: {
      titleKey: "appointmenthead", // For dynamic header menu faculty option
      title: "Service Detail",
      component: ServicesPage["TheTranquill_ServicePage"],
    },
    [`/collections`]: {
      titleKey: "appointmenthead", // For dynamic header menu faculty option
      title: "Service Detail",
      component: CollectionPage,
    },
    [`/collection/${paramsId}`]: {
      titleKey: "appointmenthead", // For dynamic header menu faculty option
      title: "Service Detail",
      component: CollectionListPage,
    },
    // "/admission": {
    //   titleKey: "admissionhead", // For dynamic header menu admission option
    //   title: "Admissions",
    //   component: Admissions,
    // },  CollectionPage

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

  const HeaderToRender = SectionHeader["TheTranquill_Header"];
  const FooterToRender = SectionFooter["TheTranquill_Footer"];

  const dispatch = useDispatch()
  const BodyToRender = SectionBody["TheTranquill_Body"]
  // const AboutUs = AboutPages["Vespertine_AboutUsPage"]
  const selectedRoute = () => {
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
    if (themeSuccess && editorSuccess && themeDetails.instituteData && themeDetails.instituteData._id) {
      dispatch(getGalleryAlbum(themeDetails.instituteData._id, user.user_business_type))
    }
  }, [dispatch, editorSuccess, themeDetails.instituteData, themeSuccess, user.user_business_type])

  useEffect(() => {
    // dispatch(getWebsiteDomainTemplate("subdomain", user.user_institute_institute_subdomain))
  }, [dispatch, user.user_institute_institute_subdomain])

  return (
    <React.Fragment >
      <SuccessMessagePopup />
      {themeSuccess ?

        <ThemeProvider theme={theme}>
      <ServicesGlobalTypoStyle/>    
          <Headroom style={{
            WebkitTransition: 'all .5s ease-in-out',
            MozTransition: 'all .5s ease-in-out',
            OTransition: 'all .5s ease-in-out',
            transition: 'all .5s ease-in-out'
          }}>
            <HeaderToRender preview={true} />
          </Headroom>
          {selectedRoute()}
          <FooterToRender preview={true} />
        </ThemeProvider> : <ComponentLoader />}

      <ScrollToTop />
    </React.Fragment >
  )
}

export default ServiceTemplatePreview