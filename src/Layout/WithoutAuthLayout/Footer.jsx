/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import './footer.scss';
import edLogo from "./ed-logo.png";
import facebookIcon from "./socialIcons/facebook.svg";
import youtubeIcon from "./socialIcons/youtube.svg";
import twitterIcon from "./socialIcons/twitter.svg";
import linkedinIocn from "./socialIcons/linkedin.svg";
import instagramIcon from "./socialIcons/instagram.svg";
import playstoreIcon from "./socialIcons/playstore.svg";
import footerMenuList from "./footerMenu.json";
import { Fragment } from 'react';
import AppLink from '../../Common/AppLink';
import LmsAdminVideo from "../../App/Home/VideoLms/dashboardVideo.mp4";
import { useNavigate, useLocation } from "react-router-dom";
import videoLoader from '../../App/Home/HomeIcons/loader.gif'
import HowItWorksVideo from '../../App/Home/HowItWorksVideo';
import { openHomepageVideoPopup, closeHomepageVideoPopup } from "../../store/actions/homePage"
import { useDispatch, useSelector } from "react-redux";
import CallSvg from './call.svg';
import locationSvg from './location.svg';
import maailSvg from './mail.svg';
import ReactGA from "react-ga"

const termsMenu = [
  {
    "menuName": "Terms",
    "menuLink": "/terms-of-service"
  }, {
    "menuName": "Privacy",
    "menuLink": "/privacy-policy"
  }, {
    "menuName": "Cookies",
    "menuLink": "/cookie-policy"
  }, {
    "menuName": "Sitemap",
    "menuLink": "/sitemap.xml"
  }
]
const Footer = () => {

  // const [videopop, setVideopop] = useState(false)
  // const location = useLocation()
  // const dispatch = useDispatch();
  // const { videoPopupState } = useSelector((state) => {
  //   return {
  //     videoPopupState: state.homepageVideoPopup.isOpen
  //   }
  // })
  // const manageVideopopfooter = () => {
  //   // setVideopop(true)
  //   dispatch(openHomepageVideoPopup());
  //   document.body.classList.add('videoPopBody');
  //   ReactGA.event({
  //     category: "Footer",
  //     action: "click",
  //     label: "Home_Footer_Tutorial",
  //   })
  // }
  // const manageCloseVideopop = () => {
  //   setVideopop(!videopop)
  //   document.body.classList.remove('videoPopBody');

  // }


  // const manageCloseVideopopfooter = () => {
  //   setVideopopfooter(!videopopfooter)
  //   document.body.classList.remove('videoPopBody');
  //   history('/')
  //   alert("footer")
  // }
  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape") {
  //     manageCloseVideopopfooter()
  //   }
  // });
  // const [locationKeys, setLocationKeys] = useState([]);
  // const history = useNavigate();

  // useEffect(() => {
  //   return history.listen((location) => {
  //     if (history.action === "PUSH") {
  //       setLocationKeys([location.key]);
  //     }

  //     if (history.action === "POP") {
  //       if (locationKeys[1] === location.key) {
  //         setLocationKeys(([_, ...keys]) => keys);
  //         alert("1")
  //         // Handle forward event
  //         manageCloseVideopopfooter()
  //       } else {
  //         setLocationKeys((keys) => [location.key, ...keys]);
  //         alert("qssd12")
  //         // Handle back event
  //         manageCloseVideopopfooter();
  //         history('/')
  //       }
  //     }
  //   });
  // }, [locationKeys]);
  // document.dispatchEvent(new Event("DM_Selection"))
  // sessionStorage.setItem("__hd_mnu__", Math.random())
  // }


  // const LmsScroll = secRef => {

  //   document.dispatchEvent(new Event("LMS_Selection"))
  //   // sessionStorage.setItem("__hd_mnu__", Math.random())
  // }
  // const WBScroll = secRef => {

  //   document.dispatchEvent(new Event("WB_Selection"))
  //   // sessionStorage.setItem("__hd_mnu__", Math.random())
  // }
  // const DMScroll = secRef => {

  //   document.dispatchEvent(new Event("DM_Selection"))
  //   // sessionStorage.setItem("__hd_mnu__", Math.random())
  // }


  // const scrollClickLms = () => {
  //   LmsScroll()
  // }
  // const scrollClickWB = () => {
  //   WBScroll()
  // }
  // const scrollClickDM = () => {
  //   DMScroll()
  // }

  // const history = useNavigate();
  // const pathname = window.location.pathname;

  // const manageRouteScroll = () => {
  //   history(`/`);
  // };
  const location = useLocation()
  const pathname = window.location.pathname;
  const fbClick = () => {
    ReactGA.event({
      category: "Social",
      action: "click",
      label: "Home_Footer_Facebook",
    })
  }

  const linkedInClick = () => {
    ReactGA.event({
      category: "Social",
      action: "click",
      label: "Home_Footer_LinkedIN",
    })
  }
  const twitterClick = () => {
    ReactGA.event({
      category: "Social",
      action: "click",
      label: "Home_Footer_Twitter",
    })
  }
  const youtubeClick = () => {
    ReactGA.event({
      category: "Social",
      action: "click",
      label: "Home_Footer_YouTube",
    })
  }
  const instagramClick = () => {
    ReactGA.event({
      category: "Social",
      action: "click",
      label: "Home_Footer_Instagram",
    })
  }
  const playStoreClcik = () => {
    ReactGA.event({
      category: "Social",
      action: "click",
      label: "Home_Footer_GooglePlayStore",
    })
  }

  const logoClick = () => {
    ReactGA.event({
      category: "Footer",
      action: "click",
      label: "Home_Footer_Logo",
    })
  }

  const clickFooter = (data) => {
    ReactGA.event({
      category: "Footer",
      action: "click",
      label: `Home_Footer_${data}`,
    })
  }

  const clickTerms = (data) => {
    ReactGA.event({
      category: "Footer",
      action: "click",
      label: `Home_Footer_${data}`,
    })
  }

  const videoPopModal = useRef(null)
  return (
    <React.Fragment>
      {
        location.pathname.includes("/auth/login") || location.pathname.includes("/auth/create-account") || location.pathname.includes("/auth/resetpassword") || location.pathname.includes("/auth/forgot-password") || location.pathname.includes("/auth/login-with-otpv1") || location.pathname.includes("/auth/email-login/") || location.pathname.includes("/auth/signup-otp-verifyv1/") ? "" :
          <div className={`bg-white ${'ed_Footer'}`}>
            <div className={`edContainer`}>
              <div className={'ed_footer_logo'}>
                <AppLink to="/" onClick={() => logoClick()}><img className="img-fluid" src={edLogo} alt="Edneed Logo" onClick={() => logoClick()} /></AppLink>
              </div>
              <div className={'ed_footer_content_grid'}>
                <div className={'ed_footer_grid_item'}>
                  <p className={'ed_footer_about'}>Edneed Learning Management System is designed to
                    help institutions operate more efficiently. It is loaded
                    with features for institutes to ensure flawless academic
                    and administrative activities. Edneed is a one-stop digital
                    solution for your institution.</p>
                </div>

                {Object.keys(footerMenuList).map((footerMenuOption, key) => {
                  return (
                    <div key={key} className={'ed_footer_grid_item'}>
                      <ul className={'ed_footer_grid_list'}>
                        {
                          footerMenuList[footerMenuOption].map((index, Arraykey) => {
                            return (
                              <React.Fragment key={Arraykey}>
                                {index.sectionRef !== "hewRef" ?
                                  (<li className={'ed_footer_grid_list_item'}>
                                    <React.Fragment>
                                      {
                                        (index.menuName === "Company" || index.menuName === "Products" || index.menuName === "Resources")
                                          ?
                                          <span className={index.menuHeadCls}>{index.menuName}</span>
                                          :
                                          (index.menuName === "Blog" || index.menuName === "Support" || index.menuName === "Annual Report(2020-2021)")
                                            ?
                                            <a href={index.menuLink} target="_blank" rel="noreferrer" >
                                              {index.menuName}
                                            </a>
                                            :
                                            <AppLink to={index.menuLink} onClick={() => clickFooter(index.menuName)}>
                                              {index.menuName}
                                            </AppLink>
                                      }
                                    </React.Fragment>
                                  </li>
                                  ) : <React.Fragment>
                                    <li className={'ed_footer_grid_list_item'} onClick={() => videoPopModal.current.open()}>
                                      {<span className="howEdWorksBtn">
                                        {index.menuName}
                                      </span>}
                                    </li>
                                    <HowItWorksVideo ref={videoPopModal} />
                                  </React.Fragment>
                                }
                              </React.Fragment>
                            );

                          })
                        }
                        {/* {footerMenuList.company.map()} */}
                      </ul>
                    </div>
                  );
                })}
                <div>
                 
                    <p className='conatct-us-edneed'>Contact</p>
                    <div className='conatct-edneedWrapper'> 
                      <div className='conatct-leftSide'>
                      <i className='icon-call-edneed'></i>
                     </div>
                     <div className='conatct-RightSide'>
                      <p className='number-text'>+91-8368214889</p>
                     </div>
                    </div>
                    <div className='conatct-edneedWrapper'> 
                      <div className='conatct-leftSide'>
                      <i className='icon-call-edneed'></i>
                     </div>
                     <div className='conatct-RightSide'>
                      <p className='number-text'>  support@edneed.com</p>
                     </div>
                    </div>
                    <div className='conatct-edneedWrapper'> 
                      <div className='conatct-leftSide'>
                      <i className='icon-call-edneed'></i>
                     </div>
                     <div className='conatct-RightSide'>
                      <p className='number-text mt-10'>
                        <b>India : </b>
                        203, Tower C, Ithum Towers, Sector 62, Noida, Uttar Pradesh 201309
                      </p>
                      <p className='number-text mt-10'>
                        <b>USA : </b>
                        9009 North Plaza, Unit 141 Austin Texas 78753
                      </p>
                     </div>
                    </div>
                  
                </div>
              </div>
              <div className={'ed_platform_express'}>
                <div className={'ed_social_express'}>
                  <p className={'ed_social_express_head'}>Follow us on</p>
                  <ul className={'ed_social_express_list'}>
                    <li className={'ed_social_express_list_item'}>
                      <a href="https://www.facebook.com/EdneedTech" rel="noreferrer" target="_blank" onClick={fbClick}><img src={facebookIcon} alt="Facebook Logo" /></a>
                    </li>
                    <li className={'ed_social_express_list_item'}>
                      <a href="https://www.linkedin.com/company/edneedtech/mycompany/" rel="noreferrer" target="_blank" onClick={linkedInClick}><img src={linkedinIocn} alt="Linkedin Logo" /></a>
                    </li>
                    <li className={'ed_social_express_list_item'}>
                      <a href="https://twitter.com/EdneedTech" rel="noreferrer" target="_blank" onClick={twitterClick}><img src={twitterIcon} alt="Twitter Logo" /></a>
                    </li>
                    <li className={'ed_social_express_list_item'}>
                      <a href="https://www.youtube.com/channel/UCRssYrcViC6e0E93VgmuNLg/featured" rel="noreferrer" target="_blank" onClick={youtubeClick} ><img src={youtubeIcon} alt="Youtube Logo" /></a>
                    </li>
                    <li className={'ed_social_express_list_item'}>
                      <a href="https://www.instagram.com/edneedtech/" rel="noreferrer" target="_blank" onClick={instagramClick}><img src={instagramIcon} alt="Instagram Logo" /></a>
                    </li>
                  </ul>
                </div>
   {/*              <div className={'ed_apps_express'}>
                  <a href="https://play.google.com/store/apps/details?id=com.edneed.twa&hl=en_IN&gl=US" rel="noreferrer" target="_blank">
                    <div className="ed_apps_express_icon">
                      <img className="img-fluid" src={playstoreIcon} alt="Play store Logo" onClick={() => playStoreClcik()} />
                    </div>
                    <span>Download Now!</span>
                  </a>
                </div> */}
              </div>
              <div className={'ed_footer_bottom'}>
                <ul className={'ed_terms_list'}>
                  {termsMenu.map((termsMenu, key) => {
                    return (
                      <li key={key} className={'ed_terms_List_item'}>
                        <AppLink to={termsMenu.menuLink} target="_blank" onClick={() => clickTerms(termsMenu.menuName)}>{termsMenu.menuName}</AppLink>
                      </li>
                    );
                  })}
                </ul>
                <div className={'ed_copyright_bottom'}>
                  <span> © {new Date().getFullYear()} Edneed. All Rights Reserved.</span>
                </div>
              </div>
            </div>
          </div>
      }

    </React.Fragment>
  )
}

export default Footer