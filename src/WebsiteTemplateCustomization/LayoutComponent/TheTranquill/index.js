/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../CommonComponent/Container.styled'
import Banner from '../../SectionComponent/Banner/TheTranquill/banner';
import AboutHero from '../../SectionComponent/AboutUs/TheTranquill/aboutHero';
import TeamHero from '../../SectionComponent/Team/TheTranquill/teamHero';
import MessageDeskHero from '../../SectionComponent/Principle/TheTranquill/MessageDeskHero';
import FacilitiesHero from '../../SectionComponent/Facilities/TheTranquill/facilitiesHero';
import ServiceHero from '../../SectionComponent/Service/TheTranquill/ServiceHero';
import CategoryHero from '../../SectionComponent/Category/TheTranquill/CategoryHero';
import ContactHero from '../../SectionComponent/ContactUs/TheTranquill/contactHero';
import FormContactHero from '../../SectionComponent/ContactUs/TheTranquill/formContactHero';

import { useSelector } from 'react-redux';
import React from 'react';
import { useEffect } from 'react';
import Storage from '../../../Classes/Storage';
import Auth from '../../../Classes/Auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RenderComponents from './RenderComponents';

const TheTranquillBodyWrapper = styled.div`

`;
const TheTranquillHomeWrapper = styled.div`
`;

// const HomeHeroTheTranquill2 = styled.div`
// display: grid;
// grid-template-columns: repeat(2, 1fr);
// gap: 0 50px;
// margin-top: 80px;
// `;


// const HomeHeroTheTranquill3 = styled.div`
// margin-top: 80px;

// `;


// const HomeHeroTheTranquill4 = styled.div`
// margin-top: 80px;
// `;


// const HomeHeroTheTranquill5 = styled.div`
// margin-top: 80px;
// `;

// const HomeHeroTheTranquill6 = styled.div`
// margin-top: 80px; 
// `;

// const HomeHeroTheTranquill7 = styled.div`
// margin-top: 80px; 
// background: rgba(55, 125, 239, 0.05);
// padding: 55px 0;
// `;


const TheTranquillHome = () => {
  const history = useNavigate()
  const { homecomponenthideData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  useEffect(() => {
    if (Storage.alive("__BOOKLOGIN__")) {
      if (Auth.isLogin() || Auth.isSubdomainLogin()) {
        Storage.remove("__BOOKLOGIN__")
        history("/select-appointment-service");
      }
    }
  }, [history])

  return (
    <TheTranquillBodyWrapper>
      <TheTranquillHomeWrapper>
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("BannerImage") ? <Banner /> : ""
        } */}

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
        {/* {
          homecomponenthideData.length > 0 && homecomponenthideData[0].homeSectionHide.includes("Contact") ?
            <React.Fragment> <ContactHero />
              <FormContactHero /></React.Fragment> : ""
        } */}
        {/* <ContactHero />
        <FormContactHero /> */}
      </TheTranquillHomeWrapper>
    </TheTranquillBodyWrapper>
  )
}

export default TheTranquillHome