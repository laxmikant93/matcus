/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
// import Banner from '../../SectionComponent/Banner/Vespertine/banner';
// import AboutHero from '../../SectionComponent/AboutUs/Vespertine/aboutHero';
import NoticeBoardHero from '../../SectionComponent/NoticeBoard/Vespertine/noticeBoardHero';
// import PrincipalDeskHero from '../../SectionComponent/Principle/Vespertine/principalDeskHero';
// import TeacherAlbumHero from '../../SectionComponent/Team/Vespertine/teacherAlbumHero';
// import FacilitiesHero from '../../SectionComponent/Facilities/Vespertine/facilitiesHero';
// import SneakPeakHero from '../../SectionComponent/Gallery/Vespertine/sneakPeakHero';
// import AdmissionHero from '../../SectionComponent/Admission/Vespertine/admissionHero';
// import FeeStructureHero from '../../SectionComponent/FeeStructure/Vespertine/feeStructureHero';
// import FaqsHero from '../../SectionComponent/Faqs/Vespertine/faqHero';
// import VacancyHero from '../../SectionComponent/Vacancy/Vespertine/vacancyHero';
// import ContactHero from '../../SectionComponent/ContactUs/Vespertine/contactHero';
import { useSelector } from 'react-redux';
import React from 'react';
import RenderComponents from './RenderComponents';

// import MiscellaneousHero from '../../SectionComponent/Miscellaneous/Vespertine/MiscellaneousHero';
// import AnnouncementsHero from '../../SectionComponent/Announcement/Vespertine/announcementsHero';
const VespertineBodyWrapper = styled.div`

`;
const VespertineHomeWrapper = styled.div`
`;

// const HomeHerovespertine2 = styled.div`
// display: grid;
// grid-template-columns: repeat(2, 1fr);
// gap: 0 50px;
// margin-top: 80px;
// `;


// const HomeHerovespertine3 = styled.div`
// margin-top: 80px;

// `;


// const HomeHerovespertine4 = styled.div`
// margin-top: 80px;
// `;


// const HomeHerovespertine5 = styled.div`
// margin-top: 80px;
// `;

// const HomeHerovespertine6 = styled.div`
// margin-top: 80px; 
// `;

// const HomeHerovespertine7 = styled.div`
// margin-top: 80px; 
// background: rgba(55, 125, 239, 0.05);
// padding: 55px 0;
// `;


const VespertineHome = () => {
  const { homecomponenthideData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { announcementData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
 
  return (
    <VespertineBodyWrapper>
      <VespertineHomeWrapper>
      
  {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHideData.length && homecomponenthideData[0].homeSectionHideData.map((item, key) => {
            return (
              <React.Fragment>
                {item.show === true && React.createElement(RenderComponents[item.field])}
              </React.Fragment>

              // <h1>{item}</h1>
            )
          })
        }
         {/* <MiscellaneousHero/>
         <AnnouncementsHero/> */}
        {/* </HomeHerovespertine7> */}
        {
          announcementData.length && announcementData.filter((item) => item.markAsFeature === true).length>0? <NoticeBoardHero/>:""
        }
       
      </VespertineHomeWrapper>
    </VespertineBodyWrapper>
  )
}

export default VespertineHome