/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './home.scss';
import Auth from '../../Classes/Auth'


import scrollToTopIcon from "./scroll-top.png"
import WhatsappChat from "./WhatsappChat"

import ReactGA from "react-ga";

const ScrollToTop = () => {
  const [scrollY, setScrollY] = useState(0);
  const pathname = window.location.pathname;

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


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const scrollTopIcon = () => {
    ReactGA.event({
      category: "Home_Scroll",
      action: "scroll",
      label: "Home_Scroll_Top",
    })
  }

  return (
    <div style={{ position: "fixed", top: 0, zIndex: 99 }}>
      <div className={'scrolltotop_wrapper'}>
        <div className={'scrolltotop_cst'}>
          <WhatsappChat />
          {scrollY > 100 && (!Auth.isLogin() || pathname === "/dashboard" || pathname === "/")
            ?
            <button type="button" className={`${'custom_scrolltotop_button'}`} onClick={scrollToTop}>
              <img src={scrollToTopIcon} alt="scrollToTopIcon" />
            </button>
            :
            ""}
        </div>
      </div>
    </div>
  );
};

export default ScrollToTop;
