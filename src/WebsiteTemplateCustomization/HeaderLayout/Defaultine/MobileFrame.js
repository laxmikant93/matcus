import { StyledHeader, Nav, Logo, NavAuth, NavbarTogglerIcon, LogoWrapper, HamburgerIcon, Buttonsignup, NavMenuWrapper, StyledHeaderTop, LogoTextSecondary, NavMenuCustom, LogoTextPrimary } from './HeaderMobile.styled'
import { Container } from '../../CommonComponent/Container.styled'
// import { Flex } from '../../../../styles/Flex.styled'
// import { Button } from '../../../../styles/Button.styled'
import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg"
// import Image from 'next/image'
// import Link from 'next/link'
// import nextIcon from '../../assets/Vespertine/menu-next-icon.svg';
// import prevIcon from '../../assets/Vespertine/menu-prev-icon.svg';
// import headerMenuList from "./headerMenu.json";
// import AppLink from '../../../Common/AppLink';
// import { NavLink } from 'react-router-dom';
import ImageViewer from './../../../Common/ImageViewer';
import HeaderMenuList from '../Vespertine/HeaderMenuList';
import { useSelector } from 'react-redux';
import Auth from '../../../Classes/Auth';
import UserHeaderMenu from '../../../Layout/ProfileAuth/UserHeaderMenu';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
// import IntersectionObserverWrap from "../../../Common/OverflowMenu/intersection-observer-wrapper";

export default function MobileFrame({ preview }) {
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
 

  const [activeMenu, setActiveMenu] = useState(false);

  const manageMenuItem = () => {
    setActiveMenu(!activeMenu); 
  };

  function getLastWord(sentence) {
    var matches = sentence ? sentence.match(/\b(\w)/g) : "";
    var acronym = matches ? matches.join('') : "";
    return acronym;
  }
  const handleLogin = () => {
    if (AppLinkUrl.baseUrl().includes("getmelight")) {
      window.location.href = "https://getmelight.com/auth/login"
    } else if (AppLinkUrl.baseUrl().includes("my_app")) {
      window.location.href = "http://my_app.com:3000/auth/login"
    } else if (AppLinkUrl.baseUrl().includes("unicated")) {
      window.location.href = "https://unicated.com/auth/login"
    } else if (AppLinkUrl.baseUrl().includes("edneed")) {
      window.location.href = "https://edneed.com/auth/login"
    } else {
      window.open(`${AppLinkUrl.baseUrl()}auth/login`)
    }

  }
  return (
    <StyledHeader>
      <Container>
        
        <Nav>
<HamburgerIcon type="button" onClick={manageMenuItem}>
<NavbarTogglerIcon />
<NavbarTogglerIcon />
<NavbarTogglerIcon />
<NavbarTogglerIcon />
</HamburgerIcon>
          <LogoWrapper to="/">
            <Logo>
            <ImageViewer object={instituteData.institute_logo} defaultImage={logo} />
              {/* <img src={instituteData.institute_logo ? instituteData.institute_logo : logo} alt='' /> */}
            </Logo>
          </LogoWrapper>   
          <NavAuth>
            {!preview && (Auth.isLogin()) ? (
              <div className="rgtTopHeader">
                <UserHeaderMenu />
              </div>
            ) : (
              <React.Fragment>
                {
                  preview ?
                    <React.Fragment>
                      {/* <ButtonLogin type="button" >Login</ButtonLogin> */}
                      <Buttonsignup type="button" >Login</Buttonsignup>
                    </React.Fragment> : <React.Fragment>
                      {/* <ButtonLogin type="button" onClick={handleLogin}>Login</ButtonLogin> */}
                      <Buttonsignup type="button" onClick={handleLogin}>Login</Buttonsignup>
                    </React.Fragment>
                }
              </React.Fragment>

            )}
          </NavAuth>
        </Nav>
<NavMenuWrapper className={activeMenu ? "show" : "hide"}>
  <NavMenuCustom>
  <HeaderMenuList preview={preview} />
  </NavMenuCustom>
       
</NavMenuWrapper>
      </Container>
    </StyledHeader>
  )
}
