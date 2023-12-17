// import SocialIcons from '../../../../SocialIcons'
import {
  LogoWrapper, LogoText, Logo, LogoTextPrimary, LogoTextSecondary, FooterContentWrapper,
  ContentMenuWrap, MapContainerWrap, MenuListItemButton, MenuList, MenuListItem, MenuListItemLink, ContentHeading, SocialMediaIconListItem,
  MapContainer, SocialMediaSection, SocialMediaIconList, CopyrightSection, CopyrightSectionItem, FooterContentWrapperItem
} from './Footer.styled'
import { Container } from '../../CommonComponent/Container.styled'
// import Link from 'next/link'
// import { Flex } from '../../../../styles/Flex.styled'
import { StyledFooter } from './Footer.styled'
// import img from 'next/image'
import logo from "../../assets/Vespertine/logo.png"
// import footerMenuList from "./footerMenu.json";
// import footerSocialIconListContent from "./footerSocialMedia.js";
// import { useEffect } from "react";
import ImageViewer from './../../../Common/ImageViewer';
import Facebook from "../../assets/SocailMediaIcon/facebook.svg";
import Instagram from "../../assets/SocailMediaIcon/instagram.svg";
import Linkedin from "../../assets/SocailMediaIcon/linkedin.svg";
import Twitter from "../../assets/SocailMediaIcon/twitter.svg";
import Youtube from "../../assets/SocailMediaIcon/youtube.svg";
// import AppLink from '../../../Common/AppLink';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectRouteForPreview } from '../../../store/actions/WebsiteTemplate';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



export default function Footer({ preview }) {
  const { dynamicHeaderData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [activeIndex, setActiveIndex] = useState(false);
  const dispatch = useDispatch()
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  // const { privacypolicydata } = useSelector((state) => {
  //   return {
  //     privacypolicydata: state.websiteTemplate.getTemplate.policy_info,
  //   }
  // })

  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
  };
  const { pathname } = useLocation()
  const footerSocialIconListContent = [
    {
      "socialIconSrc": Facebook,
      "socialIconLink": instituteData ? instituteData.facebook_url : "",
      "socialTitleName": "Facebook"
    },
    {
      "socialIconSrc": Instagram,
      "socialIconLink": instituteData ? instituteData.instagram_url : "",
      "socialTitleName": "Instagram"
    },
    {
      "socialIconSrc": Linkedin,
      "socialIconLink": instituteData ? instituteData.linkedin_url : "",
      "socialTitleName": "Linkedin"
    },
    {
      "socialIconSrc": Twitter,
      "socialIconLink": instituteData ? instituteData.twitter_url : "",
      "socialTitleName": "Twitter"
    },
    {
      "socialIconSrc": Youtube,
      "socialIconLink": instituteData ? instituteData.youtube_url : "",
      "socialTitleName": "Youtube"
    }
  ]
  const handleSelectPage = (item) => {
    dispatch(selectRouteForPreview(item, true))
  }


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
  return (
    <StyledFooter>
      <Container>
        <LogoWrapper to="">
          <Logo>
          <ImageViewer object={instituteData.institute_logo} defaultImage={logo} />
            {/* <img
              src={instituteData.institute_logo ? instituteData.institute_logo : logo}
              alt=""
            /> */}
          </Logo>
          <LogoText>
            <LogoTextPrimary>{instituteData.institute_name}</LogoTextPrimary>
            <LogoTextSecondary>
              {(instituteData.institute_address || instituteData.institute_address_line2 || instituteData.institute_address_line3 ||
                instituteData.institute_zipcode || instituteData.institute_country || instituteData.institute_city) ?
                <>
                  {instituteData.institute_address ? `${instituteData.institute_address},` : ""}&nbsp;{instituteData.institute_address_line2 && instituteData.institute_address_line2}&nbsp;{instituteData.institute_address_line3 && instituteData.institute_address_line3}&nbsp;{instituteData.institute_city ? `${instituteData.institute_city},` : ""}&nbsp;{instituteData.institute_state ? `${instituteData.institute_state},` : ""}&nbsp;{instituteData.institute_country ? `${instituteData.institute_country},` : ""}&nbsp;{instituteData.institute_zipcode ? instituteData.institute_zipcode : ""}
                </>
                :
                ""
              }
            </LogoTextSecondary>
            {/* <LogoTextSecondary>{instituteData.institute_country}</LogoTextSecondary> */}
          </LogoText>
        </LogoWrapper>
        <FooterContentWrapper>
          <FooterContentWrapperItem>
            <ContentMenuWrap>
              <MenuList>
                {/* {footerMenuList.map((footerMenuList, index) => {
                  return (
                    <MenuListItem key={index} >
                      <MenuListItemLink to={footerMenuList.menuLink}>
                        {footerMenuList.menuName}
                      </MenuListItemLink>
                    </MenuListItem>
                  );
                })} */}

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

                {instituteData._id === "62e0bded569df55ac343a893" ? <React.Fragment>
                  {preview ?
                    <MenuListItem onClick={() => handleOnClick(15)} className={activeIndex === 15 ? "activeMenu" : ""}>
                      {/* <AppLink to="/aboutus" className={activeIndex === true ? "activeMenu" : ""}> */}
                      <MenuListItemButton onClick={() => handleSelectPage('/privacypolicy')} className={activeIndex === 15 ? "activeMenu" : ""} type="button">
                        Privacy Policy
                      </MenuListItemButton>

                      {/* </AppLink> */}
                    </MenuListItem> :

                    <MenuListItem>
                      {/* <AppLink to="/aboutus" className={activeIndex === true ? "activeMenu" : ""}> */}
                      <MenuListItemLink className={pathname === "/privacypolicy" ? "activeMenu" : ""}>
                        <NavLink style={{ 'color': "white" }} to="/privacypolicy" >
                          Privacy Policy
                        </NavLink>
                      </MenuListItemLink>
                      {/* </AppLink> */}
                    </MenuListItem>
                  }
                </React.Fragment> : ""}
                {/* <React.Fragment>
                  {preview ?
                    <>
                      <MenuListItem className={pathname === '/policy/terms-of-service' ? "activeMenu" : ""} >
                        <MenuListItemButton onClick={() => handleSelectPage("/policy/terms-of-service")} className={pathname === '/policy/terms-of-service' ? "activeMenu" : ""} type="button">
                          {privacypolicydata && privacypolicydata?.terms_of_service[0]?.show_on_footer ? privacypolicydata?.terms_of_service[0]?.title : ""}
                        </MenuListItemButton>
                      </MenuListItem>
                      <MenuListItem className={pathname === '/policy/privacy-policy' ? "activeMenu" : ""} >
                        <MenuListItemButton onClick={() => handleSelectPage("/policy/privacy-policy")} className={pathname === '/policy/privacy-policy' ? "activeMenu" : ""} type="button">
                          {privacypolicydata && privacypolicydata?.privacy_policy[0]?.show_on_footer ? privacypolicydata?.privacy_policy[0]?.title : ""}
                        </MenuListItemButton>
                      </MenuListItem>
                      {privacypolicydata && privacypolicydata?.custom_policy.length ? privacypolicydata?.custom_policy.map((item, key) => {
                        return (
                          <MenuListItem className={pathname === `/policy/custom-policy/${item._id}` ? "activeMenu" : ""} key={key} >
                            <MenuListItemButton onClick={() => handleSelectPage(`/policy/custom-policy/${item._id}`)} className={pathname === `/policy/custom-policy/${item._id}` ? "activeMenu" : ""} type="button">
                              {item?.show_on_footer ? item.title : ""}
                            </MenuListItemButton>
                          </MenuListItem>
                        );
                      }) : ""
                      }
                    </>
                    :
                    <>
                      <MenuListItem>
                        <MenuListItemLink className={pathname === '/policy/terms-of-service' ? "activeMenu" : ""} >
                          <NavLink style={{ 'color': "white" }} to="/policy/terms-of-service"  >
                            {privacypolicydata && privacypolicydata?.terms_of_service[0]?.show_on_footer ? privacypolicydata?.terms_of_service[0]?.title : ""}
                          </NavLink>
                        </MenuListItemLink>
                      </MenuListItem>
                      <MenuListItem>
                        <MenuListItemLink className={pathname === '/policy/privacy-policy' ? "activeMenu" : ""} >
                          <NavLink style={{ 'color': "white" }} to="/policy/privacy-policy"  >
                            {privacypolicydata && privacypolicydata?.privacy_policy[0]?.show_on_footer ? privacypolicydata?.privacy_policy[0]?.title : ""}
                          </NavLink>
                        </MenuListItemLink>
                      </MenuListItem>
                      {privacypolicydata && privacypolicydata?.custom_policy.length ? privacypolicydata?.custom_policy.map((item, key) => {
                        return (
                          <MenuListItem>
                            <MenuListItemLink className={pathname === `/policy/custom-policy/${item._id}` ? "activeMenu" : ""} key={key} >
                              <NavLink style={{ 'color': "white" }} to={`/policy/custom-policy/${item._id}`} target="_blank" >
                                {item?.show_on_footer ? item.title : ""}
                              </NavLink>
                            </MenuListItemLink>
                          </MenuListItem>
                        );
                      }) : ""
                      }
                    </>
                  }
                </React.Fragment> */}

              </MenuList>

            </ContentMenuWrap>
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
                        {/* <ImageViewer object={footerSocialIconListContent.socialIconSrc}  width="100%" height="100%" /> */}
                          <img src={footerSocialIconListContent.socialIconSrc} alt={footerSocialIconListContent.socialTitleName} width="100%" height="100%" />
                        </a>
                      </SocialMediaIconListItem>
                    )
                  );
                })}
              </SocialMediaIconList>
              <CopyrightSection>
                <CopyrightSectionItem> © {instituteData.institute_name}, All Right Reserved.</CopyrightSectionItem>
                {
                  instituteData._id==="636fcf21a96e827c3a067e06"?"":
                  <CopyrightSectionItem>© Build with Edneed</CopyrightSectionItem>
                }
              </CopyrightSection>
            </SocialMediaSection>
          </FooterContentWrapperItem>
          <FooterContentWrapperItem>
            <MapContainerWrap>
              <MapContainer>
                <>
                  {instituteData.location_url ?
                    <div className="sun-editor-output"
                      dangerouslySetInnerHTML={{
                        __html:
                          instituteData.location_url
                      }}
                    >
                    </div>
                    :
                    // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1121329808684!2d77.37013491549513!3d28.626401191108382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce563f95b5bd1%3A0x4d091c1f9b830f7b!2sEdneed%20-Best%20Education%20Management%20System%20in%202022%7C%20Get%20a%20free%20demo%20now!5e0!3m2!1sen!2sin!4v1653122622503!5m2!1sen!2sin" width="100%" height="263px" ></iframe>}
                    ""
                  }
                </>
              </MapContainer>
            </MapContainerWrap>
          </FooterContentWrapperItem>


        </FooterContentWrapper>
      </Container>
    </StyledFooter >
  )
}
