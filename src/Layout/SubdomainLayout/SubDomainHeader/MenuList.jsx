import React from "react";
import { useLocation } from "react-router";
import WebsiteMenu from "../../../InstituteWebsite/WebsiteMenu";
import WebsiteMenuItem from "../../../InstituteWebsite/WebsiteMenuItem";
import WebsiteGallery from "../../../InstituteWebsite/WebsiteGallery";
import WebsiteAnnouncement from "../../../InstituteWebsite/WebsiteAnnouncement";
import HomeAbout from "../../../InstituteWebsite/HomeAbout";
import WebsiteAbout from "../../../InstituteWebsite/WebsiteAbout";
import WebsiteFaculty from "../../../InstituteWebsite/WebsiteFaculty";
import Contactus from "../../../InstituteWebsite/Contactus";
import Admissions from "../../../InstituteWebsite/Admissions";
import FeeStructure from "../../../InstituteWebsite/FeeStructure";
import Service from "../../../InstituteWebsite/Service";
import Faqs from "../../../InstituteWebsite/WebsiteFaq";
import WebsiteVacancy from "../../../InstituteWebsite/WebsiteVacancy";
import { DynamicHeaderProvider } from "../../../Context/DynamicHeaderContext";
import { useSelector } from "react-redux";
import WebsiteMiscellaneous from "../../../InstituteWebsite/WebsiteMiscellaneous";
import WebsiteBookAppointment from "../../../InstituteWebsite/WebsiteBookAppointment";


const MenuList = () => {
  const { heading } = useSelector((state) => state.institutewebsite);
  const { data, success } = useSelector((state) => state.institutewebsite.menuList)
  const menuLocation = useLocation();

  const { pathname } = menuLocation;

  // if (menuItemOptions.find((item) => item.path !== pathname)) {
  //   return <React.Fragment></React.Fragment>;
  // }
  return (
    <React.Fragment>
      <DynamicHeaderProvider value={heading}>
        <WebsiteMenu>
          {success && data?.dynamic_header && data.dynamic_header.length && data.dynamic_header.filter((item) => item.titleKey !== "testimonialhead").map((optionKey, index) => {
            return (
              <WebsiteMenuItem
                key={`menu_${index}`}
                titlekey={optionKey.titleKey}
                title={optionKey.title}
                link={optionKey.path}
                id={index}
                eventId={optionKey.path}
                active={optionKey.path === pathname}
              />

            );
          })}
        </WebsiteMenu>
      </DynamicHeaderProvider>
    </React.Fragment>
  );
};

export default MenuList;
