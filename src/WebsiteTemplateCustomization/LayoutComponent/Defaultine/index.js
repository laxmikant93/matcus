/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
// import { Container } from '../../CommonComponent/Container.styled'
// import Banner from '../../SectionComponent/Banner/Defaultine/banner';
// import AboutHero from '../../SectionComponent/AboutUs/Defaultine/aboutHero';
// import NoticeBoardHero from '../../SectionComponent/NoticeBoard/Defaultine/noticeBoardHero';
// import MessageDeskHero from '../../SectionComponent/Principle/Defaultine/MessageDeskHero';
// import TeamHero from '../../SectionComponent/Team/Defaultine/teamHero';
// import FacilitiesHero from '../../SectionComponent/Facilities/Defaultine/facilitiesHero';
// import GalleryHero from '../../SectionComponent/Gallery/Defaultine/galleryHero';
// import AdmissionHero from '../../SectionComponent/Admission/Defaultine/admissionHero';
// import AnnouncementHero from '../../SectionComponent/Announcement/Defaultine/announcementHero';
// import FeeStructureHero from '../../SectionComponent/FeeStructure/Defaultine/feeStructureHero';
// import FaqsHero from '../../SectionComponent/Faqs/Defaultine/faqHero';
// import VacancyHero from '../../SectionComponent/Vacancy/Defaultine/vacancyHero';
// import ContactHero from '../../SectionComponent/ContactUs/Defaultine/contactHero';
// import MiscellaneousHero from '../../SectionComponent/Miscellaneous/Defaultine/MiscellaneousHero';
// import TestimonialHero from '../../SectionComponent/Testimonial/Defaultine/testimonialHero';
import { useSelector } from 'react-redux';
import React from 'react';
import RenderComponents from './RenderComponents';

const VespertineBodyWrapper = styled.div`

`;
const VespertineHomeWrapper = styled.div`
`;




const VespertineHome = () => {
  const { homecomponenthideData } = useSelector((state) => state.websiteTemplate.getTemplate.data)


  return (
    <VespertineBodyWrapper>
      <VespertineHomeWrapper>
        {homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHideData?.length>0 && homecomponenthideData[0].homeSectionHideData.map((item, key) => {
          return (
              item.show === true && React.createElement(RenderComponents[item.field])


            // <h1>{item}</h1>
          )

        })
        }


        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("BannerImage") ? <Banner /> : ""
        } */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Miscellaneous") ? <NoticeBoardHero /> : ""
        } */}
        {/* <Container> */}
        {/* <HomeHerovespertine2> */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Aboutus") ?
            <AboutHero /> : ""
        } */}
        {/* </HomeHerovespertine2> */}
        {/* <HomeHerovespertine3> */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("PrincipalWelcome") ?
            <MessageDeskHero /> : ""
        } */}
        {/* </HomeHerovespertine3> */}
        {/* <HomeHerovespertine4> */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Faculty") ?
            <TeamHero /> : ""
        } */}
        {/* </HomeHerovespertine4> */}
        {/* <HomeHerovespertine5> */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Services") ?
            <FacilitiesHero /> : ""
        } */}
        {/* </HomeHerovespertine5> */}
        {/* <HomeHerovespertine6> */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Gallery") ?
            <GalleryHero /> : ""
        } */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Admission") ?
            <AdmissionHero /> : ""
        } */}

        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Announcements") ?
            <AnnouncementHero /> : ""
        } */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Feestructure") ?
            <FeeStructureHero /> : ""
        } */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Vacancy") ?
            <VacancyHero /> : ""
        } */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("FAQs") ?
            <FaqsHero /> : ""
        } */}
        {/* <MiscellaneousHero /> */}
        {/* <TestimonialHero /> */}
        {/* </HomeHerovespertine6> */}
        {/* </Container> */}
        {/* <HomeHerovespertine7> */}
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Contact") ?
            <ContactHero /> : ""
        } */}
        {/* </HomeHerovespertine7> */}
      </VespertineHomeWrapper>
    </VespertineBodyWrapper>
  )
}

export default VespertineHome