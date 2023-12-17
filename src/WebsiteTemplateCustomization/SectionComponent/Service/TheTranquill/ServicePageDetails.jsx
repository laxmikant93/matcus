/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import React, { useState } from 'react';
import { Container } from '../../../CommonComponent/Container.styled'
import ServiceCover1 from "./facilities-1.jpg";
import ArrowIcon from "./arrow-left.svg";
import NoRecordFile from "./Icon-NoRecordFile.svg";
import Team1 from "./Team1.jpg";
import Team2 from "./Team2.jpg";
import Team3 from "./Team3.jpg";
import Team4 from "./Team4.jpg";
import { useEffect } from 'react';
import { getAllServiceOfCategory, getAllServiceOfSingleCategory, getSingleService, SingleCategorieData } from '../../../../store/actions/serviceWebsiteTemplate';
import { useParams } from 'react-router-dom';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import Auth from '../../../../Classes/Auth';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";


const ServicePageDetailsSection = styled.div`
margin: 72px 0;
`;
const ServicePageDetailsHead = styled.div`
position:relative;
h2{
  font-weight: ${({ theme }) => theme.ServicePageDetails.h2.FontWeight};
  font-size: ${({ theme }) => theme.ServicePageDetails.h2.FontSize};
  line-height: ${({ theme }) => theme.ServicePageDetails.h2.LineHeight};
  font-style: ${({ theme }) => theme.ServicePageDetails.h2.FontStyle};
  font-family: ${({ theme }) => theme.ServicePageDetails.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.ServicePageDetails.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.ServicePageDetails.h2.Alignment};
  color: ${({ theme }) => theme.ServicePageDetails.h2.Color};
  }
  p{
    ${'' /* font-weight: ${({ theme }) => theme.ServicePageDetails.p.FontWeight};
    font-size: ${({ theme }) => theme.ServicePageDetails.p.FontSize};
    line-height: ${({ theme }) => theme.ServicePageDetails.p.LineHeight}; */}
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    { /* text-transform:capitalize; */}
    font-style: ${({ theme }) => theme.ServicePageDetails.p.FontStyle};
    font-family: ${({ theme }) => theme.ServicePageDetails.p.FontFamily};
    letter-spacing: ${({ theme }) => theme.ServicePageDetails.p.LetterSpacing};
    color: ${({ theme }) => theme.ServicePageDetails.p.Color};
    text-align:center;
    position: relative;
    display: block;
    text-transform:capitalize;
    margin-top:47px;
    padding: 0 58px;
    @media screen and (max-width: 768px) {
      padding: 0;
}
    }


`;
const BackToCategory = styled.button`
  position:absolute;
  top:0;
  left:0;
  border:none;
  background:transparent;
  display:flex;
  align-items:center;
  gap:15px;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  color: ${({ theme }) => theme.ServicePageDetails.h2.Color};
`
const BackIcon = styled.span`
  width: 48px;
  height: 48px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: #F2F7FF;
  border-radius:10rem;
  img{
    width: 32px;
    height: 32px;
    @media screen and (max-width: 768px) {
    width: 25px;
  height: 25px;
  }
  }
  @media screen and (max-width: 768px) {
    width: 38px;
    height: 38px;
  }
`

const BackText = styled.span`
  @media screen and (max-width: 768px) {
      display: none;
  }
`
const ServicePageDetailsGrid = styled.div`
display: grid;
grid-template-columns: 250px 1fr;
align-items: flex-start;
gap:36px;
margin-top: 64px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;

const ServiceNoFound = styled.div`
  margin-top:50px;
  display:flex;
  justify-content:center;
  flex-direction:column;
  text-align:center;
  height:100%;
  width:100%;
  gap:32px;
  h2{
    font-weight: 700;
    font-size: 36px;
    line-height: 49px;
    text-align: center;
    color: ${({ theme }) => theme.ServicePageDetails.h2.Color};
  }
  img{
    height:82px;
    width:82px;
    display:block;
    margin:auto;
  }
`
const BackToHomeButtonWrap = styled.div`
  display:block;
  margin:auto;
`

const BackToHomeButton = styled.button`
  background: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.Background};
  border-radius:4px;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;
  display:flex;
  align-items:center;
  gap:14px;
  padding:10px 26px;
  border: none;
`
const LeftArrowIcon = styled.i`
    display: block;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 100;
    transform: rotate(180deg);
`
const ServicePageDetailsMenuTabWrap = styled.div`
height: auto;
max-height: 90vh;
overflow: hidden;
overflow-y: auto;
scrollbar-width: thin;
position: sticky;
top: 0;
border: 1px solid #006f9c;
border-radius: 5px;
background: #FCFEFE;
@media screen and (max-width: 768px) {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  border: none;
  padding-bottom:  8px;
  border-radius: 0;
}
/* width */
::-webkit-scrollbar {
  padding-right:10px;
  width: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #006f9c; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #f48631; 
}
`;
const ServicePageDetailsMenuTab = styled.ul`
display: flex;
flex-direction: column;
justify-content: space-between;
@media screen and (max-width: 768px) {
  flex-direction: row;
  align-items: center;
}
`;

const ServicePageDetailsMenuTabItem = styled.li`
text-align: center;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
@media screen and (max-width: 768px) {
  overflow: unset;
  border-radius: 0;
}
&:first-child{
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
}
&:last-child{
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
}

`;
const ServicePageDetailsMenuButton = styled.button`
font-weight: ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.FontWeight};
font-size: ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.FontSize};
line-height: ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.LineHeight};
color: ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.Color};
background: transparent;
padding: ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.PaddingY} ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.PaddingX};
cursor: pointer;
border: none;
outlinbe: none;
width: 100%;  
@media screen and (max-width: 768px) {
  white-space: nowrap;
  padding: 6px 16px;
}
&.active{
  background: ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.Active.Background};
  color: ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.Active.Color};
}
&:hover{
  background: ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.Hover.Background};
  color: ${({ theme }) => theme.ServicePageDetails.ServicePageDetailsMenuButton.Hover.Color};
}
`;

const ServicePageDetailsMenuTabContent = styled.div`
`;
const ServicePageDetailsItem = styled.figure`
display: grid;
grid-template-columns: 1fr auto;
align-items: flex-start;
gap: 36px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const ServicePageDetailsCoverSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const ServicePageDetailsImage = styled.div`
width: 100%;
height: 100%;
min-width: 250px;
max-width: 324px;
min-height: 166px;
max-height: 231px;
margin-bottom: 48px;
@media screen and (max-width: 768px) {
  width: 100%;
height: 100%;
}
img{
width: 100%;
height: 100%;
min-width: 100%;
max-width: 100%;
min-height: 100%;
max-height: 100%;
// object-fit: cover;
display:block;
}
`;
const ServicePageDetailsDescription = styled.figcaption`
width: 100%;
height: auto;
h4{
font-weight: ${({ theme }) => theme.ServicePageDetails.h4.FontWeight};
font-size: ${({ theme }) => theme.ServicePageDetails.h4.FontSize};
line-height: ${({ theme }) => theme.ServicePageDetails.h4.LineHeight};
font-style: ${({ theme }) => theme.ServicePageDetails.h4.FontStyle};
font-family: ${({ theme }) => theme.ServicePageDetails.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.ServicePageDetails.h4.LetterSpacing};
color: ${({ theme }) => theme.ServicePageDetails.h4.Color};
margin-bottom: 16px;
position: relative;
}
p{

font-weight: ${({ theme }) => theme.ServicePageDetails.p.FontWeight};
font-size: ${({ theme }) => theme.ServicePageDetails.p.FontSize};
line-height: ${({ theme }) => theme.ServicePageDetails.p.LineHeight};
font-style: ${({ theme }) => theme.ServicePageDetails.p.FontStyle};
font-family: ${({ theme }) => theme.ServicePageDetails.p.FontFamily};
letter-spacing: ${({ theme }) => theme.ServicePageDetails.p.LetterSpacing};
color: ${({ theme }) => theme.ServicePageDetails.p.Color};
margin-bottom: 24px;
}
`;

const SectionHeroBorderBottom = styled.div`
display: grid;
grid-template-columns: 25% 50% 25%;
align-items:center;
height: 8px;
`;
const SectionHeroBorderBottomL = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.ServicePageDetails.SectionHeroBorderBottomL.Background} 
`;
const SectionHeroBorderBottomM = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.ServicePageDetails.SectionHeroBorderBottomM.Background} 
`;
const SectionHeroBorderBottomR = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.ServicePageDetails.SectionHeroBorderBottomR.Background} 
`;
const BookingButton = styled.button`
font-weight: ${({ theme }) => theme.ServicePageDetails.BookingButton.FontWeight};
font-size: ${({ theme }) => theme.ServicePageDetails.BookingButton.FontSize};
line-height: ${({ theme }) => theme.ServicePageDetails.BookingButton.LineHeight};
background: ${({ theme }) => theme.ServicePageDetails.BookingButton.Background};
border: 1px solid ${({ theme }) => theme.ServicePageDetails.BookingButton.BorderColor};
border-radius: ${({ theme }) => theme.ServicePageDetails.BookingButton.BorderRadius};
color: ${({ theme }) => theme.ServicePageDetails.BookingButton.Color};
padding: ${({ theme }) => theme.ServicePageDetails.BookingButton.PaddingY} ${({ theme }) => theme.ServicePageDetails.BookingButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.ServicePageDetails.BookingButton.Hover.Background};
color: ${({ theme }) => theme.ServicePageDetails.BookingButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.ServicePageDetails.BookingButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
`;

const ServicePageDetailsItemHero = styled.div`
h1{
  color: ${({ theme }) => theme.ServicePageDetails.h6.Color};
  }
  h6{
  font-weight: ${({ theme }) => theme.ServicePageDetails.h6.FontWeight};
  font-size: ${({ theme }) => theme.ServicePageDetails.h6.FontSize};
  line-height: ${({ theme }) => theme.ServicePageDetails.h6.LineHeight};
  font-style: ${({ theme }) => theme.ServicePageDetails.h6.FontStyle};
  font-family: ${({ theme }) => theme.ServicePageDetails.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.ServicePageDetails.h6.LetterSpacing};
  text-align: ${({ theme }) => theme.ServicePageDetails.h6.Alignment};
  text-transform: ${({ theme }) => theme.ServicePageDetails.h6.TextTransform};
  color: ${({ theme }) => theme.ServicePageDetails.h6.Color};
  }
`;

const TeamAlbumHomeList = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 24px;
margin-top: 24px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
}

`;
const TeamAlbumHomeCard = styled.div`
position: relative;
cursor: pointer;
img{
width: 100%;
height: 284px;
object-fit: cover;
border-radius: 5px 5px 0px 0px;
position: relative;
display: block;
}

`;
const TeamAlbumHomeCardOverlay = styled.div`
background: ${({ theme }) => theme.ServicePageDetails.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.Background};
width: 100%;
padding: ${({ theme }) => theme.ServicePageDetails.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingY} ${({ theme }) => theme.ServicePageDetails.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingX};
text-align: center;
h4{

font-weight: ${({ theme }) => theme.ServicePageDetails.h4.FontWeight};
font-size: ${({ theme }) => theme.ServicePageDetails.h4.FontSize};
line-height: ${({ theme }) => theme.ServicePageDetails.h4.LineHeight};
font-style: ${({ theme }) => theme.ServicePageDetails.h4.FontStyle};
font-family: ${({ theme }) => theme.ServicePageDetails.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.ServicePageDetails.h4.LetterSpacing};
color: ${({ theme }) => theme.ServicePageDetails.h4.Color};
position: relative;
margin-bottom: ${({ theme }) => theme.ServicePageDetails.h4.MarginBottom};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
&::after{
width: 70%;
height: ${({ theme }) => theme.ServicePageDetails.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Height};
background-color: ${({ theme }) => theme.ServicePageDetails.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Background};
bottom: ${({ theme }) => theme.ServicePageDetails.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Bottom};
}
}
h5{

font-weight: ${({ theme }) => theme.ServicePageDetails.h5.FontWeight};
font-size: ${({ theme }) => theme.ServicePageDetails.h5.FontSize};
line-height: ${({ theme }) => theme.ServicePageDetails.h5.LineHeight};
font-style: ${({ theme }) => theme.ServicePageDetails.h5.FontStyle};
font-family: ${({ theme }) => theme.ServicePageDetails.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.ServicePageDetails.h5.LetterSpacing};
color: ${({ theme }) => theme.ServicePageDetails.h5.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;

const ViewProfileButtonSection = styled.div`
margin-top: 8px;
`;

const ViewProfileButton = styled.a`
font-weight: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.FontWeight};
font-size: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.FontSize};
line-height: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.LineHeight};
background: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.Background};
border: 1px solid ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.BorderColor};
border-radius: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.BorderRadius};
color: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.Color};
padding: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.PaddingY} ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.PaddingX};
cursor: pointer;
text-align: center;
display: block;
&:hover{
background: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.Hover.Background};
color: ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.ServicePageDetails.ViewProfileButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const BookAppointmentButton = styled.a`
margin-top:24px;
cursor: pointer;
text-align: center;
display: block;
background-color:transparent;
border:none;
color: ${({ theme }) => theme.ServicePageDetails.h4.Color};
font-weight: 700;
font-size: 16px;
line-height: 22px;
`

const ServicePageDetails = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { _id } = useParams();
  const [serviceId, setServiceId] = useState("")
  const [SingleCategorydata, setSingleCategorydata] = useState("")
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  // const  data  = useSelector((state) => state.serviceTemplate.getTemplate.data.bookAppointService)
  
  const [servicesData, setServicesData] = useState([])
  const [serviceArray,setServiceArray]=useState([])
  const { preview, SingleCategoryData,serviceDetails, SingleCategorySuccess, SingleCategoryLoading, SingleOfCategoryData, SingleOfCategorySuccess } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview,
      SingleOfCategoryData: state.serviceTemplate.SingleOfCategory.data,
      SingleOfCategoryLoading: state.serviceTemplate.SingleOfCategory.loading,
      SingleOfCategorySuccess: state.serviceTemplate.SingleOfCategory.success,
      SingleCategoryData: state.serviceTemplate.SingleCategoryDetails.data,
      SingleCategoryLoading: state.serviceTemplate.SingleCategoryDetails.loading,
      SingleCategorySuccess: state.serviceTemplate.SingleCategoryDetails.success,
    
      serviceDetails: state.serviceTemplate.serviceDetail.data,
      serviceDetailSuccess: state.serviceTemplate.serviceDetail.success,
    }
  })

  const { pathname } = useLocation()
  // useEffect(() => {
  //   if (_id && !pathname.includes("/category-services")) {
  //     setServiceId(_id)
  //   } 
  // }, [_id, pathname])

  useEffect(() => {
    if (pathname.includes('/category-services')) {
      dispatch(SingleCategorieData(_id, instituteData._id))
    } else {
      dispatch(getAllServiceOfCategory(instituteData._id, instituteData.owner))
    }
  }, [ _id, dispatch,  instituteData._id, instituteData.owner, pathname])

   useEffect(() => {
    let body = {
      id: serviceId ? serviceId : _id,
      userId: instituteData.owner,
    }
    if (serviceId) {
      dispatch(getSingleService(body));
    }
  }, [_id, dispatch, instituteData.owner, serviceId]) 

  const handleService = (_id) => {
    setServiceId(_id)
  }

   useEffect(() => {
    if (pathname.includes("/category-services")&&_id) {
      dispatch(SingleCategorieData(_id, instituteData._id))
    }
  }, [_id, dispatch, instituteData._id, pathname]) 



  const handleAppointment = () => {
    if ((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain())) {
      if (!preview) {
        history(`/book-appointment/${serviceId}`);
      }
    }
    else {
      history('/customer-login');
    }
  }

  const BackToCategoryHandle = () => {
    history(`/categories`)
  }

  useEffect(()=>{
    if(pathname.includes("/category-services")){
    if(SingleOfCategorySuccess&&SingleOfCategoryData&& SingleOfCategoryData){
      setServiceArray(SingleOfCategoryData.services)
    }else{
      // setServiceArray(SingleCategoryData)
      // setServiceId(SingleCategoryData[0]._id)
    }
  }else if(pathname.includes("/service-detail")){
    setServiceArray(SingleCategoryData)
    setServiceId(_id)
  }
  else{
    if(SingleCategorySuccess&&SingleCategoryData.length>0){
      setServiceArray(SingleCategoryData)
      setServiceId(SingleCategoryData[0]._id)
    }
  }
  },[SingleCategoryData, SingleCategorySuccess, SingleOfCategoryData, SingleOfCategorySuccess, _id, pathname])
  useEffect(() => {
    if(pathname.includes("/category-services")){
    SingleOfCategorySuccess && SingleOfCategoryData && SingleOfCategoryData&& setSingleCategorydata(SingleOfCategoryData);
    SingleOfCategorySuccess && SingleOfCategoryData && SingleOfCategoryData &&SingleOfCategoryData.services.length>0&& setServiceId(SingleOfCategoryData.services[0]._id);
  }
  }, [SingleCategoryData, SingleCategorySuccess, SingleOfCategoryData, SingleOfCategorySuccess, pathname])



  return (
    <React.Fragment>
      <Container>
        <ServicePageDetailsSection>
          <ServicePageDetailsHead>
             {pathname.includes("/category-services") ?
              <h2>{SingleCategorydata.main_category_name}</h2> : ""}
            {
              (SingleOfCategorySuccess && SingleCategorydata.description && pathname.includes("/category-services") ? (
                <p>{SingleCategorydata.description}</p>
              ) : "")
            }
            {pathname.includes("/category-services") ?
              <BackToCategory type="button" onClick={BackToCategoryHandle}>
                <BackIcon>
                  <img src={ArrowIcon} alt="back icon" />
                </BackIcon>
                <BackText>
                  Back
                </BackText>
              </BackToCategory> : ""
            } 
          </ServicePageDetailsHead>
          {
            SingleCategoryLoading &&
            <>
              { /* <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div> */}
              <ComponentLoader />
            </>
          }
          {
            serviceArray && serviceArray?.length > 0 ? (
              <ServicePageDetailsGrid>
                <ServicePageDetailsMenuTabWrap>
                  <ServicePageDetailsMenuTab>
                    { serviceArray?.length > 0 &&  serviceArray?.map((item, key) => {
                      return (
                        <ServicePageDetailsMenuTabItem>
                          <ServicePageDetailsMenuButton type='button' className={item._id === serviceId ? 'active' : ""} onClick={() => handleService(item._id)}>{item.title}</ServicePageDetailsMenuButton>
                        </ServicePageDetailsMenuTabItem>
                      )
                    })
                    }
                  </ServicePageDetailsMenuTab>
                </ServicePageDetailsMenuTabWrap>
                {serviceId && serviceDetails && JSON.stringify(serviceDetails) !== '{}' &&
                  <ServicePageDetailsMenuTabContent>
                    <ServicePageDetailsItem>
                      <ServicePageDetailsDescription>
                        <h4>{serviceDetails?.title}</h4>
                        {/* <p>  {item.details ? item.details : "The Department of radio-diagnosis at Jeevan Hospital 1 is equipped with most advanced diagnostic equipment. Radio-diagnosis plays a crucial role in identification of an ailment. At Jeevan Hospital, our qualified technicians are dedicated to offer a wide range of high quality diagnostic services as below:"}</p> */}
                        <p className='sun-editor-output'
                          dangerouslySetInnerHTML={{
                            __html:
                              serviceDetails?.description
                          }}
                        ></p>
                        {/* <p>{serviceDetails?.description}</p> */}
                      </ServicePageDetailsDescription>
                      <ServicePageDetailsCoverSection>
                        <ServicePageDetailsImage>
                          <img src={serviceDetails?.image ? serviceDetails.image : DefaultImage} alt="Service First" />
                          <SectionHeroBorderBottom>
                            <SectionHeroBorderBottomL></SectionHeroBorderBottomL>
                            <SectionHeroBorderBottomM></SectionHeroBorderBottomM>
                            <SectionHeroBorderBottomR></SectionHeroBorderBottomR>
                          </SectionHeroBorderBottom>
                        </ServicePageDetailsImage>
                        {
                          serviceDetails.allowClientsOnline === true ? (
                            <BookingButton onClick={handleAppointment}>BOOK APPOINTMENT</BookingButton>
                          ) : ("")
                        }
                      </ServicePageDetailsCoverSection>
                    </ServicePageDetailsItem>
                  </ServicePageDetailsMenuTabContent>
                }
              </ServicePageDetailsGrid>
            ) :
              <ServiceNoFound>
                <h2>No service found</h2>
                <img src={NoRecordFile} alt="No Record Found" />
                <BackToHomeButtonWrap>
                  <BackToHomeButton type='button' onClick={BackToCategoryHandle}>
                    <LeftArrowIcon>&#10132;</LeftArrowIcon>
                    Go to Home Page
                  </BackToHomeButton>
                </BackToHomeButtonWrap>
              </ServiceNoFound>
          }
          



        </ServicePageDetailsSection>
      </Container>
    </React.Fragment>
  )
}

export default ServicePageDetails