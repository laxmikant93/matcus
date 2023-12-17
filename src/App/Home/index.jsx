/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import './home.scss';
import HomeSubscribeInput from './HomeSubscribeInput';
import heroHome from "./HomeIcons/hero_home.webp"
import adminRoleIcon from "./HomeIcons/institute_role.svg"
import teacherRoleIcon from "./HomeIcons/teacher_role.svg"
import PrivateTutorIcon from "./HomeIcons/private_tutors.svg"
import studentRoleIcon from "./HomeIcons/students_role.svg"
import AppLink from '../../Common/AppLink';
import EdneedProducts from './EdneedProducts';
import EdneedWebsiteBuilder from './EdneedWebsiteBuilder';
import EdneedLMS from './EdneedLMS';
import EdneedCommunity from './EdneedCommunity';
import EdneedPackage from './EdneedPackage';
import EdneedSubscribe from './EdneedSubscribe';
import EdneedReviewSlider from './EdneedReviewSlider';
import videoLoader from "./HomeIcons/loader.gif";
import { useNavigate } from "react-router-dom";

import { openHomepageVideoPopup, closeHomepageVideoPopup } from "../../store/actions/homePage"
import { useDispatch, useSelector } from "react-redux";

import ScrollToTop from './ScrollToTop';

import useScrollTracker from '../../Common/GoogleAnalytics/useScrollTracker';
import ReactGA from "react-ga";
// import { useSelector } from 'react-redux';
import HowItWorksVideo from './HowItWorksVideo';
import Modals from '../../Common/Modals';
import ModalsHeader from '../../Common/Modals/ModalsHeader';
import ModalsBody from '../../Common/Modals/ModalsBody';
import ModalsFooter from '../../Common/Modals/ModalsFooter';
import Dialog from '../../Common/Dialog';
import DialogBody from '../../Common/Dialog/DialogBody';

const Home = () => {
  const dispatch = useDispatch();
  const { user, videoPopupState } = useSelector((state) => {
    return {
      user: state.user,
      videoPopupState: state.homepageVideoPopup.isOpen
    }
  })
  const [videopop, setVideopop] = useState()
  const manageVideopop = () => {
    // setVideopop(true)
    dispatch(openHomepageVideoPopup());
    document.body.classList.add('videoPopBody');
  }


  const history = useNavigate();
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    window.mobileCheck = function () {
      let check = false;
      (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
      setIsMobile(check);

      return check;
    };
  }, [])

  const IAScroll = secRef => {

    document.dispatchEvent(new Event("IA_Selection"))
    // sessionStorage.setItem("__hd_mnu__", Math.random())
  }
  const TScroll = secRef => {

    document.dispatchEvent(new Event("T_Selection"))
    // sessionStorage.setItem("__hd_mnu__", Math.random())
  }
  const SScroll = secRef => {

    document.dispatchEvent(new Event("S_Selection"))
    // sessionStorage.setItem("__hd_mnu__", Math.random())
  }
  const handleClickIA = () => {
    IAScroll()

    ReactGA.event({
      category: "First_Fold",
      action: "click",
      label: "Home_Institute_Admin",
    })
  }
  const handleClickT = () => {
    TScroll()

    ReactGA.event({
      category: "First_Fold",
      action: "click",
      label: "Home_Teachers",
    })
  }
  const handleClickTuter = () => {
    TScroll()

    ReactGA.event({
      category: "First_Fold",
      action: "click",
      label: "Home_Tuter",
    })
  }
  const handleClickS = () => {
    SScroll()

    ReactGA.event({
      category: "First_Fold",
      action: "click",
      label: "Home_Student",
    })
  }

  useScrollTracker([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ({ scrollY }) => {
    ReactGA.event({
      category: "scrollY",
      action: scrollY,
      label: "scroll-depth",
      value: scrollY
    });
  })

  // ** CODE FOR EDNEED manifest.json STARTS HERE **//
  const origin = window.location.origin;
  let manifest = {
    short_name: "Edneed - Endless & beyond",
    description: "Edneed is a professional networking website for educators and learners.",
    name: "Edneed - Endless & beyond",
    icons: [
      {
        src: origin + "/app-icon/edneed-app-icon.ico",
        sizes: "64x64",
        type: "image/x-icon"
      },
      {
        src: origin + "/app-icon/edneed-app-icon-72x72.png",
        sizes: "72x72",
        type: "image/x-icon"
      },
      {
        src: origin + "/app-icon/edneed-app-icon-96x96.png",
        sizes: "96x96",
        type: "image/x-icon"
      },
      {
        src: origin + "/app-icon/edneed-app-icon-128x128.png",
        sizes: "128x128",
        type: "image/x-icon"
      },
      {
        src: origin + "/app-icon/edneed-app-icon-144x144.png",
        sizes: "144x144",
        type: "image/x-icon",
        purpose: "any"
      },
      {
        src: origin + "/app-icon/edneed-app-icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: origin + "/app-icon/edneed-app-icon-384x384.png",
        type: "image/png",
        sizes: "384x384"
      },
      {
        src: origin + "/app-icon/edneed-app-icon-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable"
      }
    ],
    start_url: origin + '/',
    display: "standalone",
    theme_color: "#121212",
    background_color: "#ffffff",
    orientation: "portrait",
    scope: "."
  };

  const appleTouchIcon = origin + "/app-icon/edneed-app-icon-192x192.png";
  const stringManifest = JSON.stringify(manifest);
  const blob = new Blob([stringManifest], { type: 'application/json' });
  const manifestURL = URL.createObjectURL(blob);
  document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);
  document.querySelector('#apple-touch-icon-placeholder').setAttribute('href', appleTouchIcon);

  // ** CODE FOR EDNEED manifest.json ENDS HERE **//

  const videoPopModal = useRef(null)

  return (
    <React.Fragment>
      <div className={`edContainer`} >
        <div className={'home_hero_sec'} >
          <div className={'home_hero_details'}>
            <h1 className={'home_hero_h1'}><span>Digitize</span> your Institute within <span> 2 minutes</span></h1>
            <h2 className={'home_hero_h2'}>Edneed is an end-to-end solution for all your educational institution&apos;s needs. Build an attractive website using our intuitive website builder. Manage all activities of your school through our <span>Learning Management System (LMS). </span>
              Digitize your institute today. </h2>
            {/* <div className={'home_hero_subscribe'}>
              <HomeSubscribeInput />
            </div> */}
            <div className={'home_hero_ed_support'}>
              {
                isMobile ? (
                  <div className={'home_hero_expert_support'}>
                    <a href="tel:+91 83682 14889" className={`button btn-o-primary btn-sm primary ${'expert_support_btn'}`}>Talk with an expert</a>
                  </div>

                ) :
                  <div className={'home_hero_expert_support'}>
                    <AppLink to='/contact' className={`button btn-o-primary btn-sm primary ${'expert_support_btn'}`}>Talk with an expert</AppLink>
                  </div>
              }


              <HowItWorksVideo ref={videoPopModal} />
              <div className={'home_hero_howwework_support'} onClick={() => videoPopModal.current.open()}>
                <div className={'anim_Half_circle_hwwb'}>
                  <div className={'anim_Half_circle'}></div>
                  <span className="caret"></span>
                </div>
                How Edneed works
              </div>

            </div>
          </div>
          <div className={'home_hero_art'}>
            <img className="img-fluid" src={heroHome} alt="Home Hero" />

          </div>
          <div className={'home_hero_role'}>
            <h3 className="mb-20 mt-18">Edneed is for :</h3>
            <ul className={'home_hero_role_list'}>
              <li onClick={handleClickIA}>
                <div className={'home_hero_role_Icon'}>
                  <img className="img-fluid" src={adminRoleIcon} alt="Home Hero" />
                </div>
                <div className={'home_hero_role_list_detail'}>
                  <p className={'home_hero_role_list_detail_h'}>Institute Admin</p>
                  <p className={'home_hero_role_list_detail_d'}>Manage all activities of your institute online.</p>
                </div>
              </li>
              <li onClick={handleClickT}>
                <div className={'home_hero_role_Icon'}>
                  <img className="img-fluid" src={teacherRoleIcon} alt="Home Hero" />
                </div>
                <div className={'home_hero_role_list_detail'}>
                  <p className={'home_hero_role_list_detail_h'}>Teachers</p>
                  <p className={'home_hero_role_list_detail_d'}>Conduct all classroom activities.</p>
                </div>
              </li>
              <li onClick={handleClickTuter}>
                <div className={'home_hero_role_Icon'}>
                  <img className="img-fluid" src={PrivateTutorIcon} alt="Home Hero" />
                </div>
                <div className={'home_hero_role_list_detail'}>
                  <p className={'home_hero_role_list_detail_h'}>Private Tutors</p>
                  <p className={'home_hero_role_list_detail_d'}>Launch your online tuition class within 2 minutes</p>
                </div>
              </li>
              <li onClick={handleClickS}>
                <div className={'home_hero_role_Icon'}>
                  <img className="img-fluid" src={studentRoleIcon} alt="Home Hero" />
                </div>
                <div className={'home_hero_role_list_detail'}>
                  <p className={'home_hero_role_list_detail_h'}>Students</p>
                  <p className={'home_hero_role_list_detail_d'}>Attend online classes, complete tests & assignments.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <EdneedProducts />
      </div>
      <EdneedWebsiteBuilder />
      <div className={`fullEdContainer`}>
        <EdneedLMS />
      </div>
      <EdneedReviewSlider />
      <EdneedCommunity />
      <div className={`edContainer`}>
        <EdneedPackage />
      </div>
      {/* <EdneedSubscribe /> */}


    </React.Fragment>
  )
}

export default Home