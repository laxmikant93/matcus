// import SocialIcons from '../../../../SocialIcons'
import {
  LogoWrapper, LogoText, Logo, LogoTextPrimary, LogoTextSecondary, FooterContentWrapper,
  ContentMenuWrap, MapContainerWrap, MenuListItemButton, FooterBottomHero, MenuList, MenuListItem, MenuListItemLink, ContentHeading, MenuListItemHead, SocialMediaIconListItem,
  MapContainer, SocialMediaSection, SocialMediaIconList, CopyrightSection, CopyrightSectionItem, FooterContentWrapperItem
} from './Footer.styled'
import { Container } from '../../CommonComponent/Container.styled'
// import Link from 'next/link'
// import { Flex } from '../../../../styles/Flex.styled'
import { StyledFooter } from './Footer.styled'
// import img from 'next/image'
import logo from "../../assets/TheTranquill/logo.png";
import footerMenuList from "./footerMenu.json";
// import footerSocialIconListContent from "./footerSocialMedia.js";
import { useEffect } from "react";
import Facebook from "../../assets/TheTranquill/facebook.svg";
import Instagram from "../../assets/TheTranquill/instagram.svg";
import Linkedin from "../../assets/TheTranquill/linkedin.svg";
import Youtube from "../../assets/TheTranquill/youtube.svg";
import Twitter from "../../assets/TheTranquill/twitter.svg";
import youtube from "../../assets/TheTranquill/youtube.svg";
import twitter from "../../assets/TheTranquill/twitter.svg";

import AppLink from '../../../Common/AppLink';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectRouteForPreview } from '../../../store/actions/WebsiteTemplate';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../../../Classes/Auth';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import { getMainBusiCollectionName, getShowOnHeaderCollections } from '../../../store/actions/bookAppointment';
import { useNavigate } from 'react-router-dom';
import HeaderMenuList from '../../HeaderLayout/TheTranquill/HeaderMenuList';



export default function Footer({ preview }) {
  const { dynamicHeaderData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const [activeIndex, setActiveIndex] = useState(false);
  const dispatch = useDispatch()
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data);


  const { insID, user, businesstype, ownerID, getDisableDataData, getMainBusiCollection, getShowOnHeaderCollection } = useSelector((state) => {
    return {
      user: state.user,
      insID: state.user.user_institute,
      ownerID: state.user._id,
      businesstype: state.user.user_business_type,
      getDisableDataData: state.bookAppointment.getDisableData.data,
      getShowOnHeaderCollection: state.bookAppointment.getShowOnHeaderCollection.data,
      getMainBusiCollection: state.bookAppointment.getMainBusiCollection.data,

    }
  })

  useEffect(() => {
    // dispatch(getShowOnHeaderCollections(insID, ownerID, businesstype))
  }, [])

  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
  };

  // const footerSocialIconListContent = [
  //   {
  //     "socialIconSrc": Facebook,
  //     "socialIconLink": instituteData ? instituteData.facebook_url : "https://www.facebook.com/",
  //     "socialTitleName": "Facebook"
  //   },
  //   {
  //     "socialIconSrc": Instagram,
  //     "socialIconLink": instituteData ? instituteData.instagram_url : "https://www.instagram.com/",
  //     "socialTitleName": "Instagram"
  //   },
  //   {
  //     "socialIconSrc": Linkedin,
  //     "socialIconLink": instituteData ? instituteData.linkedin_url : "https://www.linkedin.com/",
  //     "socialTitleName": "Linkedin"
  //   },
  //   {
  //     "socialIconSrc": Twitter,
  //     "socialIconLink": instituteData ? instituteData.twitter_url : "https://twitter.com/",
  //     "socialTitleName": "Twitter"
  //   },
  //   {
  //     "socialIconSrc": Youtube,
  //     "socialIconLink": instituteData ? instituteData.youtube_url : "https://www.youtube.com/",
  //     "socialTitleName": "Youtube"
  //   }
  // ]
  const handleSelectPage = (item) => {

    dispatch(selectRouteForPreview(item, true))
  };

  useEffect(() => {
    Array.from(document.getElementsByTagName("iframe")).forEach((iframe) => {
      iframe.contentWindow.addEventListener(
        "load",
        () => {
          const doc = iframe.contentWindow.document;
          iframe.height = doc.body.scrollHeight;
        },
        true
      );
      iframe.contentWindow.addEventListener(
        "resize",
        () => {
          iframe.height = iframe.contentWindow.document.body.scrollHeight + 40;
        },
        true
      );
    });
  }, []);



  const [Sitemap, setSitemap] = useState(false);
  const { getbusinessInfoData, businessInfoData } = useSelector((state) => {
    return {
      getbusinessInfoData: state.businessInfo.ecomWebsite.data,
      businessInfoData: state.serviceTemplate.getTemplate.data,
    };
  })
  useEffect(() => {
    if (businessInfoData && businessInfoData.instituteData._id === "6361159da991310c73b6b97e") {
      setSitemap(!Sitemap)
    }

  }, []);
  const history = useNavigate()

  const handleCollectionRoute = (id) => {
    if (id) {
      history(`/collection/${id}`);
    }
  };


  // useEffect(() => {
  //   dispatch(getShowOnHeaderCollections(insID, ownerID, businesstype))
  // }, [])
  // const [headerData, setHeaderData] = useState("")

  // useEffect(() => {
  //   let categoryServices = getShowOnHeaderCollection && getShowOnHeaderCollection.filter((item, key) => item?.show_on_footer === true);
  //   setHeaderData(categoryServices)
  // }, [getShowOnHeaderCollection])

  // useEffect(() => {
  //   dispatch(getMainBusiCollectionName(user.user_business_type, insID, ownerID))
  // }, [dispatch, insID, ownerID, user.user_business_type]);


  // console.log(getMainBusiCollection?.data?.showOnFooter)
  return (
    <StyledFooter>
      <Container>

        <FooterContentWrapper>
          <FooterContentWrapperItem>
            <LogoWrapper href="/">
              <Logo>
                <img
                  src={instituteData.business_logo ? instituteData.business_logo : logo}
                  alt=""
                />
              </Logo>
              {instituteData.showBusinessName ? <LogoText>
                <LogoTextPrimary>
                  {instituteData.business_name ? instituteData.business_name : "The Tranquill Health Care Center"}

                </LogoTextPrimary>
              </LogoText> : ''}
            </LogoWrapper>

            <LogoTextSecondary>

              {instituteData.business_address ? instituteData.business_address : "Budh Vihar"},{instituteData.business_address_line2 && instituteData.business_address_line2}&nbsp;{instituteData.business_address_line3 && instituteData.business_address_line3}{instituteData.business_city ? instituteData.business_city : "New Delhi"},&nbsp;{instituteData.business_country ? instituteData.business_country : "India"},&nbsp;{instituteData.business_zipcode ? instituteData.business_zipcode : "110086"}
            </LogoTextSecondary>
          </FooterContentWrapperItem>
          <FooterContentWrapperItem>
            <ContentMenuWrap>
              {
                preview ?
                  <MenuList>
                    <MenuListItemHead>
                      Links
                    </MenuListItemHead>
                    <MenuListItem>
                      <MenuListItemLink onClick={() => handleSelectPage("/select-appointment-service")}>
                        Appointment
                      </MenuListItemLink>
                    </MenuListItem>
                    <MenuListItem>
                      <MenuListItemLink onClick={() => handleSelectPage("/faculty")}>
                        Doctors
                      </MenuListItemLink>
                    </MenuListItem>
                    <MenuListItem>
                      <MenuListItemLink onClick={() => handleSelectPage("/service")}>
                        Services
                      </MenuListItemLink>
                    </MenuListItem>
                    <MenuListItem>
                      <MenuListItemLink onClick={() => handleSelectPage("/aboutus")}>
                        About Us
                      </MenuListItemLink>
                    </MenuListItem>
                    {Sitemap && <MenuListItem>
                      <MenuListItemLink href="/jeewan-hospital-1-sitemap.xml">
                        Sitemap
                      </MenuListItemLink>
                    </MenuListItem>}
                    {/* <MenuListItem>
                      <MenuListItemLink onClick={() => handleSelectPage("/policy/terms-of-service")}>
                        {privacypolicydata && privacypolicydata?.terms_of_service.length && privacypolicydata?.terms_of_service[0]?.show_on_footer ? privacypolicydata?.terms_of_service[0]?.title : ""}
                      </MenuListItemLink>
                    </MenuListItem>
                    <MenuListItem>
                      <MenuListItemLink onClick={() => handleSelectPage("/policy/privacy-policy")}>
                        {privacypolicydata && privacypolicydata?.privacy_policy.length && privacypolicydata?.privacy_policy[0]?.show_on_footer ? privacypolicydata?.privacy_policy[0]?.title : ""}
                      </MenuListItemLink>
                    </MenuListItem>
                    {privacypolicydata && privacypolicydata?.custom_policy.length ? privacypolicydata?.custom_policy.map((item, key) => {
                      return (
                        <MenuListItem key={key}>
                          <MenuListItemLink to={`/policy/custom-policy/${item._id}`}>
                            {item?.show_on_footer ? item.title : ""}
                          </MenuListItemLink>
                        </MenuListItem>
                      );
                    }) : ""
                    } */}
                  </MenuList>
                  :
                  <MenuList>
                    <MenuListItemHead>
                      Links
                    </MenuListItemHead>
                    {(Auth.isLogin() && AppLinkUrl.privateDomain() || Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) ?
                      <MenuListItem>
                        <NavLink to="/select-appointment-service">
                          Appointment
                        </NavLink>
                      </MenuListItem>
                      : ""}
                    <MenuListItem>
                    <HeaderMenuList preview={false} showOn={"showOnFooter"}/>
                    </MenuListItem>
                    {/* <MenuListItem>
                      <NavLink to="/service">
                        Services
                      </NavLink>
                    </MenuListItem>
                    <MenuListItem>
                      <NavLink to="/aboutus">
                        About Us
                      </NavLink>
                    </MenuListItem> */}
                    {Sitemap && <MenuListItem>
                      <MenuListItemLink href="/jeewan-hospital-1-sitemap.xml">
                        Sitemap
                      </MenuListItemLink>
                    </MenuListItem>}
                    {/* {getMainBusiCollection?.data?.showOnFooter === true   ?
                    headerData.length ? headerData.map((data, keyindex) => {
                      return (
                    <MenuListItem>
                      <li onClick={() => handleCollectionRoute(data.urlSlug)} >

                        {data?.name}
                      </li>
                    </MenuListItem>
                    )
                    }) : ""
                    : ""
} */}
                    {Sitemap && <MenuListItem>
                      <MenuListItemLink href="/jeewan-hospital-1-sitemap.xml">
                        Sitemap
                      </MenuListItemLink>
                    </MenuListItem>}
                    {/* <MenuListItem>
                      <NavLink to="/policy/terms-of-service">
                        {privacypolicydata && privacypolicydata?.terms_of_service.length && privacypolicydata?.terms_of_service[0]?.show_on_footer ? privacypolicydata?.terms_of_service[0]?.title : ""}
                      </NavLink>
                    </MenuListItem>
                    <MenuListItem>
                      <NavLink to="/policy/privacy-policy">
                        {privacypolicydata && privacypolicydata?.privacy_policy.length && privacypolicydata?.privacy_policy[0]?.show_on_footer ? privacypolicydata?.privacy_policy[0]?.title : ""}
                      </NavLink>
                    </MenuListItem>
                    {privacypolicydata && privacypolicydata?.custom_policy.length ? privacypolicydata?.custom_policy.map((item, key) => {
                      return (
                        <MenuListItem key={key}>
                          <NavLink to={`/policy/custom-policy/${item._id}`}>
                            {item?.show_on_footer ? item.title : ""}
                          </NavLink>
                        </MenuListItem>
                      );
                    }) : ""
                    } */}
                  </MenuList>}
              {/* {console.log(instituteData?.location_url)} */}
              {instituteData?.showUserSideMap === true && instituteData?.location_url ?
                <MenuList>
                  <MenuListItem>
                    <MenuListItemHead>
                      Our Location
                    </MenuListItemHead>
                  </MenuListItem>
                  {/* <> */}

                  <MenuListItem>
                    <MapContainerWrap>
                      <MapContainer>
                        {/* <div className=""> */}
                        <iframe title="map" src={instituteData?.location_url} referrerpolicy="no-referrer-when-downgrade"></iframe>
                        {/* </div> */}
                      </MapContainer>
                    </MapContainerWrap>

                  </MenuListItem>

                </MenuList>
                :
                ""
              }


            </ContentMenuWrap>
          </FooterContentWrapperItem>


        </FooterContentWrapper>
        <FooterBottomHero>
          <CopyrightSection>
            <CopyrightSectionItem>© 2023 {instituteData.business_name ? instituteData.business_name : ""}. All Rights Reserved by <a href="https://webneed.io/">Webneed.io</a></CopyrightSectionItem>
          </CopyrightSection>
          <SocialMediaSection>
            <SocialMediaIconList>
              {instituteData.youtube_url && <SocialMediaIconListItem title="">
                <a href={instituteData.youtube_url} target='_blank' rel="noreferrer">

                  <img src={youtube} alt="hi" width="100%" height="100%" />

                </a >
              </SocialMediaIconListItem >}
              {
                instituteData.twitter_url && <SocialMediaIconListItem title="">
                  <a href={instituteData.twitter_url} target='_blank' rel="noreferrer">

                    <img src={twitter} alt="hi" width="100%" height="100%" />

                  </a>
                </SocialMediaIconListItem>}

              {
                instituteData.linkedin_url && <SocialMediaIconListItem title="">
                  <a href={instituteData.linkedin_url} target='_blank' rel="noreferrer">

                    <img src={Linkedin} alt="hi" width="100%" height="100%" />

                  </a>
                </SocialMediaIconListItem>
              }


              {
                instituteData.facebook_url && <SocialMediaIconListItem title="">
                  <a href={instituteData.facebook_url} target='_blank' rel="noreferrer">

                    <img src={Facebook} alt="hi" width="100%" height="100%" />

                  </a>
                </SocialMediaIconListItem>
              }
              {
                instituteData.instagram_url && <SocialMediaIconListItem title="">
                  <a href={instituteData.instagram_url} target='_blank' rel="noreferrer">
                    <img src={Instagram} alt="hi" width="100%" height="100%" />
                  </a>
                </SocialMediaIconListItem>
              }
            </SocialMediaIconList >
          </SocialMediaSection >
        </FooterBottomHero >
      </Container >
    </StyledFooter >
  )
}
