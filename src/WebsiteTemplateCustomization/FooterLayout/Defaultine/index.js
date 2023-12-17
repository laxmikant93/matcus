// import SocialIcons from '../../../../SocialIcons'
import {
  LogoWrapper, LogoText, Logo, LogoTextPrimary, LogoTextSecondary, FooterContentGrid,
  ContentMenuWrap, FooterNavLink, MapContainerWrap, MenuList, MenuListItem, MenuListItemButton, MenuListItemLink, ContentHeading, SocialMediaIconListItem,
  MapContainer, SocialMediaSection, SocialMediaIconList, CopyrightSection, CopyrightSectionItem, FooterContentGridLeft, FooterContentGridRight
} from './Footer.styled'
import { Container } from '../../CommonComponent/Container.styled'
// import Link from 'next/link'
// import { Flex } from '../../../../styles/Flex.styled'
import { StyledFooter } from './Footer.styled'
// import img from 'next/image'
// import logo from "../../assets/Vespertine/logo.png"
// import { useEffect } from "react";
import Facebook from "../../assets/SocailMediaIcon/facebook.svg";
import Instagram from "../../assets/SocailMediaIcon/instagram.svg";
import Linkedin from "../../assets/SocailMediaIcon/linkedin.svg";
import Twitter from "../../assets/SocailMediaIcon/twitter.svg";
import Youtube from "../../assets/SocailMediaIcon/youtube.svg";
// import AppLink from '../../../Common/AppLink';
import ImageViewer from './../../../Common/ImageViewer';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useState } from 'react';
import { selectRouteForPreview } from '../../../store/actions/WebsiteTemplate';
import { NavLink } from 'react-router-dom';



export default function Footer({ preview }) {
  const [activeIndex, setActiveIndex] = useState(false);
  const dispatch = useDispatch()

  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { dynamicHeaderData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  // const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  const footerSocialIconListContent = [
    {
      "socialIconSrc": Facebook,
      "socialIconLink": instituteData ? instituteData.facebook_url : "https://www.facebook.com/",
      "socialTitleName": "Facebook"
    },
    {
      "socialIconSrc": Instagram,
      "socialIconLink": instituteData ? instituteData.instagram_url : "https://www.instagram.com/",
      "socialTitleName": "Instagram"
    },
    {
      "socialIconSrc": Linkedin,
      "socialIconLink": instituteData ? instituteData.linkedin_url : "https://www.linkedin.com/",
      "socialTitleName": "Linkedin"
    },
    {
      "socialIconSrc": Twitter,
      "socialIconLink": instituteData ? instituteData.twitter_url : "https://twitter.com/",
      "socialTitleName": "Twitter"
    },
    {
      "socialIconSrc": Youtube,
      "socialIconLink": instituteData ? instituteData.youtube_url : "https://www.youtube.com/",
      "socialTitleName": "Youtube"
    }
  ]

  // useEffect(() => {
  //   Array.from(document.getElementsByTagName("iframe")).forEach((iframe) => {
  //     iframe.contentWindow.addEventListener(
  //       "load",
  //       () => {
  //         const doc = iframe.contentWindow.document;
  //         iframe.height = doc.body.scrollHeight;
  //       },
  //       true
  //     );
  //     iframe.contentWindow.addEventListener(
  //       "resize",
  //       () => {
  //         iframe.height = iframe.contentWindow.document.body.scrollHeight + 40;
  //       },
  //       true
  //     );
  //   });
  // }, []);

  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
  };
  const handleSelectPage = (item) => {
    dispatch(selectRouteForPreview(item, true))
  }
  return (
    <StyledFooter>
      <Container>
        <FooterNavLink>
          {dynamicHeaderData && dynamicHeaderData.dynamic_header && dynamicHeaderData.dynamic_header.length > 0 &&
            dynamicHeaderData.dynamic_header.filter((item) => item.showOnFooter === true)
              .map((headerMenuList, index) => {
                return (
                  <React.Fragment>
                    {preview ?
                      <MenuListItem key={index} onClick={() => handleOnClick(index)} className={activeIndex === index ? "activeMenu" : ""}>
                        {/* <AppLink to="/aboutus" className={activeIndex === true ? "activeMenu" : ""}> */}
                        <MenuListItemButton onClick={() => handleSelectPage(headerMenuList.path)} className={activeIndex === index ? "activeMenu" : ""} type="button">
                          {(subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title}
                        </MenuListItemButton>

                        {/* </AppLink> */}
                      </MenuListItem> :

                      <MenuListItem key={index}>
                        {/* <AppLink to="/aboutus" className={activeIndex === true ? "activeMenu" : ""}> */}
                        <MenuListItemLink onClick={() => handleOnClick(index)} className={activeIndex === index ? "activeMenu" : ""}>
                          <NavLink style={{ 'color': "white" }} to={headerMenuList.path} >
                            {(subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title}
                          </NavLink>
                        </MenuListItemLink>
                        {/* </AppLink> */}
                      </MenuListItem>
                    }

                  </React.Fragment>

                );
              })}
        </FooterNavLink>
        <FooterContentGrid>
          <FooterContentGridLeft>
            <ul>
              <li>
                <ContentHeading>{instituteData.institute_name}</ContentHeading>
              </li>
              <li>
                {(instituteData.institute_address || instituteData.institute_address_line2 || instituteData.institute_address_line3) ?
                  <span>
                    {instituteData.institute_address ? `${instituteData.institute_address},` : ""}&nbsp;
                    {instituteData.institute_address_line2 ? `${instituteData.institute_address_line2},` : ""}&nbsp;
                    {instituteData.institute_address_line3 ? instituteData.institute_address_line3 : ""}
                  </span>
                  : ""
                }
                {(instituteData.institute_city || instituteData.institute_state) ?
                  <span>
                    {instituteData.institute_city ? `${instituteData.institute_city},` : ""}&nbsp;
                    {instituteData.institute_state ? instituteData.institute_state : ""},
                  </span>
                  : ""
                }
                {(instituteData.institute_country || instituteData.institute_zipcode) ?
                  <span>
                    {instituteData.institute_country ? instituteData.institute_country : ""}&nbsp;-&nbsp;
                    {instituteData.institute_zipcode ? instituteData.institute_zipcode : ""}
                  </span>
                  : ""
                }

              </li>
            </ul>


            <SocialMediaSection>
              {
                footerSocialIconListContent.filter((item) => item.socialIconLink !== "").length > 0 ? (
                  <ContentHeading>
                    Follow us on
                  </ContentHeading>
                ) : ""
              }
              <SocialMediaIconList>
                {footerSocialIconListContent.map((footerSocialIconListContent, index) => {
                  return (
                    footerSocialIconListContent.socialIconLink === "" ? "" : (
                      <SocialMediaIconListItem key={index} title={footerSocialIconListContent.socialTitleName}>
                        <a href={footerSocialIconListContent.socialIconLink} target='_blank' rel="noreferrer">
                          <ImageViewer object={footerSocialIconListContent.socialIconSrc}  width="100%" height="100%" />
                          {/* <img src={footerSocialIconListContent.socialIconSrc} alt={footerSocialIconListContent.socialTitleName} width="100%" height="100%" /> */}
                        </a>
                      </SocialMediaIconListItem>
                    )
                  );
                })}
              </SocialMediaIconList>
              <CopyrightSection>
                <CopyrightSectionItem> © {instituteData.institute_name}, All Right Reserved.</CopyrightSectionItem>
                {
                  instituteData._id==="636fcf21a96e827c3a067e06"?"": <CopyrightSectionItem>© Build with Edneed</CopyrightSectionItem>}
              </CopyrightSection>
            </SocialMediaSection>
          </FooterContentGridLeft>
          <FooterContentGridRight>
            {instituteData?.showUserSideMap === true && instituteData?.location_url ?
              <MapContainerWrap>
                <ContentHeading>
                  OUR LOCATION
                </ContentHeading>
                <MapContainer>
                  <iframe title="map" src={instituteData?.location_url} referrerpolicy="no-referrer-when-downgrade"></iframe>

                </MapContainer>
              </MapContainerWrap>
              :
              ""
            }
          </FooterContentGridRight>


        </FooterContentGrid>
      </Container>
    </StyledFooter>
  )
}
