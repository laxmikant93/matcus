import { StyledHeader, Nav, Logo, NavAuth, LogoText, LogoWrapper, ButtonLogin, ButtonLoginAppLink, ButtonSignup, NavMenuWrapper, StyledHeaderTop, LogoTextSecondary, NavMenuCustom, LogoTextPrimary } from './Header.styled'
import { Container } from '../../CommonComponent/Container.styled'
// import { Flex } from '../../../../styles/Flex.styled'
// import { Button } from '../../../../styles/Button.styled'
import { useState, useRef, useEffect } from "react";
import logo from "../../assets/Vespertine/logo.png"
// import Image from 'next/image'
// import Link from 'next/link'
// import nextIcon from '../../assets/Vespertine/menu-next-icon.svg';
// import prevIcon from '../../assets/Vespertine/menu-prev-icon.svg';
// import headerMenuList from "./headerMenu.json";
// import AppLink from '../../../Common/AppLink';
// import { NavLink } from 'react-router-dom';
import HeaderMenuList from './HeaderMenuList';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ImageViewer from './../../../Common/ImageViewer';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import React from 'react';
import UserHeaderMenu from '../../../Layout/ProfileAuth/UserHeaderMenu';
import Auth from '../../../Classes/Auth';
// import { NavMenuWrapperContainer } from '../TheTranquill/Header.styled';

export default function VespertineHeader({ preview }) {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const { dynamicHeaderData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [scrolEnd, setscrolEnd] = useState(false);
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //Anim
  // const anim = (e) => {
  //   gsap.from(e.target, { scale: 1 });
  //   gsap.to(e.target, { scale: 1.5 });
  // };
  // const anim2 = (e) => {
  //   gsap.from(e.target, { scale: 1.5 });
  //   gsap.to(e.target, { scale: 1 });
  // };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };



  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const handleSignUp = () => {
    if (AppLinkUrl.baseUrl().includes("getmelight")) {
      window.location.href = "https://getmelight.com/auth/create-account"
    } else if (AppLinkUrl.baseUrl().includes("my_app")) {
      window.location.href = "http://my_app.com:3000/auth/create-account"
    } else if (AppLinkUrl.baseUrl().includes("unicated")) {
      window.location.href = "https://unicated.com/auth/create-account"
    } else if (AppLinkUrl.baseUrl().includes("edneed")) {
      window.location.href = "https://edneed.com/auth/create-account"
    } else {
      window.location.href = `${AppLinkUrl.baseUrl()}auth/create-account`
    }
  }
  return (
    <StyledHeader>
      <Container>
        <Nav>
          <LogoWrapper href="/">
            <Logo>
            <ImageViewer object={instituteData.institute_logo} defaultImage={logo} />
              {/* <img src={instituteData.institute_logo ? instituteData.institute_logo : logo} alt='' /> */}
              
            </Logo>
            {instituteData.showBusinessName ? windowSize.width <= 768 ? "" : <LogoText>
              <LogoTextPrimary title={instituteData.institute_name}>
                {instituteData.institute_name}
                {/* {windowSize.width <= 768 ? <>{windowSize.width >= 425 && getLastWord(instituteData.institute_name)}</> : instituteData.institute_name} */}
              </LogoTextPrimary>
              {/* <LogoTextSecondary>
                {instituteData.institute_name}
              </LogoTextSecondary> */}
            </LogoText> : ""}
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
                      <ButtonLogin type="button" >Login</ButtonLogin>
                      {/* {windowSize.width >= 576 && <ButtonSignup type="button" >Sign up</ButtonSignup>} */}
                    </React.Fragment> : <React.Fragment>
                      {
                        AppLinkUrl.privateDomain() ?
                          <NavLink className="ButtonLoginAppLink" to={`/auth/login`}>Login</NavLink> :
                          <ButtonLogin type="button" onClick={handleLogin}>Login</ButtonLogin>
                      }
                      {/* {windowSize.width >= 576 && <ButtonSignup type="button" onClick={handleSignUp}>Sign up</ButtonSignup>} */}
                    </React.Fragment>
                }
              </React.Fragment>

            )}
          </NavAuth>

        </Nav>

      </Container>

      <NavMenuWrapper>
      {dynamicHeaderData && 
              dynamicHeaderData.dynamic_header 
              && dynamicHeaderData.dynamic_header.length > 0 && 
              dynamicHeaderData.dynamic_header.filter((item) => item.showOnHeader === true).length>0?
        <Container style={{position:"relative"}}>
            <HeaderMenuList preview={preview} />
        </Container>
       :""}
      </NavMenuWrapper>
    </StyledHeader>
  )
}
