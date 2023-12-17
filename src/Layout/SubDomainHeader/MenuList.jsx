import React from "react";
import { useLocation } from "react-router";
import WebsiteMenu from "../../InstituteWebsite/WebsiteMenu";
import WebsiteMenuItem from "../../InstituteWebsite/WebsiteMenuItem";
import WebsiteGallery from "../../InstituteWebsite/WebsiteGallery";
import WebsiteAnnouncement from "../../InstituteWebsite/WebsiteAnnouncement";
import HomeAbout from "../../InstituteWebsite/HomeAbout";
import WebsiteAbout from "../../InstituteWebsite/WebsiteAbout";
import WebsiteFaculty from "../../InstituteWebsite/WebsiteFaculty";
import Contactus from "../../InstituteWebsite/Contactus";
import Admissions from "../../InstituteWebsite/Admissions";
import FeeStructure from "../../InstituteWebsite/FeeStructure";
import Service from "../../InstituteWebsite/Service";
import Faqs from "../../InstituteWebsite/WebsiteFaq";
import WebsiteVacancy from "../../InstituteWebsite/WebsiteVacancy";
import { DynamicHeaderProvider } from "../../Context/DynamicHeaderContext";
import { useSelector } from "react-redux";
import WebsiteMiscellaneous from "../../InstituteWebsite/WebsiteMiscellaneous";
import WebsiteBookAppointment from "../../InstituteWebsite/WebsiteBookAppointment";
import WebsiteBlogs from "../../InstituteWebsite/Institute_Blogs/index";
import PreviewBlog from "../../InstituteWebsite/Institute_Blogs/PreviewBlog";

const menuItemOptions = {
  "/": {
    titleKey: undefined, // No key availabel for home
    title: "Home",
    component: HomeAbout,
  },
  "/about": {
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
  "/miscellaneous": {
    titleKey: "noticehead", // For dynamic header menu notice option
    title: "Miscellaneous",
    component: WebsiteMiscellaneous,
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
  "/vacancy": {
    titleKey: "vacancyhead", // For dynamic header menu vacancy option
    title: "Vacancy",
    component: WebsiteVacancy,
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
  "/contact": {
    titleKey: "", // // No key availabel for contact menu option
    title: "Contact",
    component: Contactus,
  },
};

const MenuList = () => {
  const { heading } = useSelector((state) => state.institutewebsite);

  const menuLocation = useLocation();

  const { pathname } = menuLocation;

  if (!menuItemOptions.hasOwnProperty(pathname)) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <React.Fragment>
      <DynamicHeaderProvider value={heading}>
        <WebsiteMenu>
          {Object.keys(menuItemOptions).map((optionKey, index) => {
            const optionItem = menuItemOptions[optionKey];
            return (
              <WebsiteMenuItem
                key={`menu_${index}`}
                titlekey={optionItem.titleKey}
                title={optionItem.title}
                link={optionKey}
                id={optionKey}
                eventId={optionKey}
                active={optionKey === pathname}
              />
            );
          })}
        </WebsiteMenu>
      </DynamicHeaderProvider>
    </React.Fragment>
  );
};

export default MenuList;
