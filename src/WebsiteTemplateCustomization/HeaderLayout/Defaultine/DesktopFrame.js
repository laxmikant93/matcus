import { StyledHeader, Nav, Logo, NavAuth, LogoText, LogoWrapper, ButtonLogin, Buttonsignup, NavMenuWrapper, StyledHeaderTop, LogoTextSecondary, NavMenuCustom, LogoTextPrimary } from './Header.styled'
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
import HeaderMenuList from '../Vespertine/HeaderMenuList';
import { useSelector } from 'react-redux';
import Auth from '../../../Classes/Auth';
import UserHeaderMenu from '../../../Layout/ProfileAuth/UserHeaderMenu';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import ImageViewer from './../../../Common/ImageViewer';
// import IntersectionObserverWrap from "../../../Common/OverflowMenu/intersection-observer-wrapper";

export default function DesktopFrame({ preview }) {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { dynamicHeaderData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
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

  const [activeIndex, setActiveIndex] = useState(false);

  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
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

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    // just trigger this so that the initial state 
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledHeader className={scrollY > 100 ? "sticky" : ""}>
      <Container>
        <Nav>
          <LogoWrapper href="/">
            <Logo className={scrollY > 100 ? "sticky" : ""}>
            <ImageViewer object={instituteData.institute_logo} defaultImage={logo} />
              {/* <img src={instituteData.institute_logo ? instituteData.institute_logo : logo} alt='' /> */}
            </Logo>
            {instituteData.showBusinessName ? windowSize.width <= 768 ? "" :
              <LogoText>
                <LogoTextPrimary title={instituteData.institute_name}>
                  {instituteData.institute_name}
                </LogoTextPrimary>
                <LogoTextSecondary>
                  {/* {windowSize.width <= 768 ? <>{getLastWord(instituteData.institute_name)}</> : instituteData.institute_name} */}
                </LogoTextSecondary>
              </LogoText> : ""}
          </LogoWrapper>

          <NavMenuWrapper>
            {dynamicHeaderData &&
              dynamicHeaderData.dynamic_header
              && dynamicHeaderData.dynamic_header.length > 0 &&
              dynamicHeaderData.dynamic_header.filter((item) => item.showOnHeader === true).length > 0 ?
              <Container>
                <NavMenuCustom>

                  <HeaderMenuList preview={preview} />

                </NavMenuCustom>
              </Container>
              : ""}
          </NavMenuWrapper>
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
      </Container>
    </StyledHeader>
  )
}
