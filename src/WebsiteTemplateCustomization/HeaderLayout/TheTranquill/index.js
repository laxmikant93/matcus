import { StyledHeader, Nav, Logo, NavAuth, LogoText, LogoWrapper, ButtonLogin, ButtonSignup, BookAppoinmentButton, NavMenuWrapperContainer, NavMenuWrapper, NavContactWrap, ItemInnerContent, NavContactWrapItem, NavMenuCustom, LogoTextPrimary } from './Header.styled'
import { Container } from '../../CommonComponent/Container.styled'
import { useState, useRef, useEffect } from "react";
import logo from "../../assets/TheTranquill/logo.png";
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import React from 'react';
import UserHeaderMenu from '../../../Layout/ProfileAuth/UserHeaderMenu';
import Auth from '../../../Classes/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import HeaderMenuList from './HeaderMenuList';
import { selectRouteForPreview, setParamId } from '../../../store/actions/serviceWebsiteTemplate';
import HomeHeaderAuth from '../../../Layout/ProfileAuth/HomeHeaderAuth';
import Storage from '../../../Classes/Storage';
import BookingFrom from './BookingFrom';
import { getDisableButtonData, getShowOnHeaderCollections } from '../../../store/actions/bookAppointment';

export default function TranquillHeader({ preview }) {
  
  const { dynamicHeaderData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  // const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  // const { route, previewData } = useSelector((state) => state.serviceTemplate.getTemplate)
  const { success, contact_support } = useSelector((state) => state.websiteTemplate.getTemplate)

  const { insID, businesstype, getDisableDataData } = useSelector((state) => {
    return {
      insID: state.user.user_institute,
      businesstype: state.user.user_business_type,
      getDisableDataData: state.bookAppointment.getDisableData.data,
    }
  })

  const history = useNavigate()
  const { pathname } = useLocation()
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
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
  const dispatch = useDispatch()
  const handleClick = (item) => {
    if (!preview) {
      if (Auth.isLogin() && AppLinkUrl.privateDomain() || Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) {
        history(item)
      }
      else {
        Storage.setBool("__BOOKLOGIN__", true);
        history('/customer-login');
      }
    }
    // dispatch(setParamId(1))
  }
  const handleLogin = () => {
    history('/customer-login')

  }
  const handleSignUp = () => {
    history('/customer-signup')
  }


  useEffect(() => {
    dispatch(getDisableButtonData(instituteData._id, "Services"))
  }, [])

  const [getbookingForm, setGetBookingForm] = useState(false)
  const [getwhatApp, setGetWhatApp] = useState(false)
  const [getbookService, setGetBookService] = useState("")
  const [bookingButtonDisable, setBookingButtonDisable] = useState(false)
  const [hideBookingButton,setHideBookingButton]=useState(false)

  const [bookingForm, setBookingForm] = useState(false)
  const [whatApp, setWhatApp] = useState(false)
  const [bookService, setBookService] = useState(false)

  // "/select-appointment-service")

  useEffect(() => {
    setGetBookService(getDisableDataData?.booking_for_service)
    setGetBookingForm(getDisableDataData?.booking_form)
    setGetWhatApp(getDisableDataData?.booking_form_whatsapp)
    setBookingButtonDisable(getDisableDataData?.booking_status)
  }, [contact_support, getDisableDataData?.booking_for_service, getDisableDataData?.booking_form, getDisableDataData?.booking_form_whatsapp, getDisableDataData?.booking_status])

  const handleBooking = () => {

    // console.log("booking")

    if (getbookingForm === true) {

      setBookingForm(true)

    } else if (getwhatApp === true) {
      // window.location.href = `https://api.whatsapp.com/send?phone=${contact_support ? contact_support : '9891884781'}&text=Hi, There!`
      window.open(`https://api.whatsapp.com/send?phone=${contact_support ? contact_support : '9891884781'}&text=Hi, There!`)
    } else {
      history("/select-appointment-service")
    }



  }

  return (
    <StyledHeader>
      <Container>
        <Nav>
          <LogoWrapper href='/'>
            <Logo>
              <img src={instituteData.business_logo ? instituteData.business_logo : logo} alt='' />
            </Logo>
            {
              instituteData.showBusinessName ?
                windowSize.width <= 768 ? "" :
                  <LogoText>
                    <LogoTextPrimary title={instituteData.business_name ? instituteData.business_name : "The Tranquill"}>
                      {instituteData.business_name ? instituteData.business_name : "The Tranquill"}
                    </LogoTextPrimary>
                  </LogoText> : ""
            }
          </LogoWrapper>
          {windowSize.width >= 768 &&
            <NavContactWrap>
              <NavContactWrapItem>
                <i className="phone-icon"></i>
                <ItemInnerContent>
                  <h6>Call</h6>
                  <p>{instituteData.business_phone ? instituteData.business_phone : "+91 9819127217"}</p>
                </ItemInnerContent>
              </NavContactWrapItem>
              {/* <NavContactWrapItem>
              <i className="email-icon"></i>
              <ItemInnerContent>
                <h6>Email</h6>
                <p>{instituteData.business_email ? instituteData.business_email : "info@jeewanhopital1.in"}</p>
              </ItemInnerContent>
            </NavContactWrapItem> */}
              <NavContactWrapItem>
                <i className="address-icon"></i>
                <ItemInnerContent>
                  <h6>Location</h6>
                  <p title="title">{instituteData.business_address ? instituteData.business_address : "Budh Vihar"},{instituteData.business_address_line2 && instituteData.business_address_line2}&nbsp;{instituteData.business_address_line3 && instituteData.business_address_line3}{instituteData.business_city ? instituteData.business_city : "New Delhi"},&nbsp;{instituteData.business_country ? instituteData.business_country : "India"},&nbsp;{instituteData.business_zipcode ? instituteData.business_zipcode : "110086"}</p>
                </ItemInnerContent>
              </NavContactWrapItem>
            </NavContactWrap>
          }
          <NavAuth>
            {!preview && ((Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) || (Auth.isLogin() && AppLinkUrl.privateDomain())) ? (
              <div className="rgtTopHeader">
                <HomeHeaderAuth />
              </div>
            ) : (
              <React.Fragment>
                {
                  preview ?
                    <React.Fragment>
                      <ButtonLogin type="button">Login</ButtonLogin>
                      {/* <ButtonLogin type="button" >Sign Up</ButtonLogin> */}
                    </React.Fragment> : <React.Fragment>
                      <ButtonLogin type="button" onClick={handleLogin}>Login</ButtonLogin>
                      {/* <ButtonLogin type="button" onClick={handleSignUp}>Sign Up</ButtonLogin> */}
                    </React.Fragment>
                }
              </React.Fragment>

            )}
          </NavAuth>
        </Nav>

      </Container>

     { dynamicHeaderData && 
              dynamicHeaderData.dynamic_header 
              && dynamicHeaderData.dynamic_header.length > 0 && 
              dynamicHeaderData.dynamic_header.filter((item) => item.showOnHeader === true).length===0&&getDisableDataData.booking_status===false?"":
     <React.Fragment>
      {
        pathname !== "/customer-signup" && pathname !== "/customer-login" &&
        <NavMenuWrapper>
          <Container>
            <NavMenuWrapperContainer className={!bookingButtonDisable ? "Active" : ""}>
              <NavMenuCustom>
              {/* {dynamicHeaderData && 
              dynamicHeaderData.dynamic_header 
              && dynamicHeaderData.dynamic_header.length > 0 && 
              dynamicHeaderData.dynamic_header.filter((item) => item.showOnHeader === true).length>0?
                <React.Fragment> */}
                {scrollX !== 0 && (
                  <button
                    className="menuPrevClass"
                    onClick={() => slide(-50)}
                  >
                    {/* <img src={prevIcon} alt='' /> */}
                  </button>
                )}
                <ul ref={scrl} onScroll={scrollCheck}>
                  <HeaderMenuList preview={preview} showOn={"showOnHeader"} />
                  {/* <li><button>Home</button></li>
                  <li><button>About us</button></li>
                  <li><button>Empanelment</button></li>
                  <li><button>Doctors</button></li>
                  <li><button>Facilities</button></li>
                  <li><button>Categories</button></li>
                  <li><button>Services</button></li>
                  <li><button>Center of Excellence</button></li> */}
                  {/* <HeaderMenuList preview={preview} /> */}
                </ul>
                {!scrolEnd && (
                  <button
                    className="menuNextClass"
                    onClick={() => slide(+50)}
                  >
                    {/* <img src={nextIcon} alt='' /> */}
                  </button>
                )}
                {/* </React.Fragment>:""} */}
              </NavMenuCustom>
              {/* {windowSize.width >= 768 &&
                <BookAppoinmentButton onClick={() => handleClick("/select-appointment-service")} type="button">
                  BOOK APPOINTMENT
                </BookAppoinmentButton>
              } */}
              {
                getDisableDataData.booking_status===false?"":
              bookingButtonDisable ?
                windowSize.width >= 768 &&
                <BookAppoinmentButton onClick={handleBooking} type="button">
                  BOOK APPOINTMENT
                </BookAppoinmentButton> : ""
              }
              {
                bookingForm ? (
                  <BookingFrom setBookingForm={setBookingForm} />
                ) : ""
              }

            </NavMenuWrapperContainer>
          </Container>
        </NavMenuWrapper>
      }
      </React.Fragment>}
    </StyledHeader>
  )
}
