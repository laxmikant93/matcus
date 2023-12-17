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
import Team1 from "./Team1.jpg";
import Team2 from "./Team2.jpg";
import Team3 from "./Team3.jpg";
import Team4 from "./Team4.jpg";
import { useEffect } from 'react';
import { getSingleService } from '../../../../store/actions/serviceWebsiteTemplate';
import { useParams } from 'react-router-dom';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import Auth from '../../../../Classes/Auth';
import NoRecordFile from './NoRecordFile.svg';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import { getSingleCollection, getSingleCollectionEndUser } from '../../../../store/actions/bookAppointment';


const CollectionPageDetailsSection = styled.div`
margin: 72px 0;
`;
const CollectionPageDetailsHead = styled.div`
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
`;
const CollectionPageDetailsGrid = styled.div`
display: grid;
grid-template-columns: 250px 1fr;
align-items: flex-start;
gap:36px;
margin-top: 48px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const CollectionPageDetailsMenuTabWrap = styled.div`
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
const CollectionPageDetailsMenuTab = styled.ul`
display: flex;
flex-direction: column;
justify-content: space-between;
@media screen and (max-width: 768px) {
  flex-direction: row;
  align-items: center;
}
`;

const CollectionPageDetailsMenuTabItem = styled.li`
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
const CollectionPageDetailsMenuButton = styled.button`
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

const CollectionPageDetailsMenuTabContent = styled.div`
`;
const CollectionPageDetailsItem = styled.figure`
display: grid;
grid-template-columns: 1fr auto;
align-items: flex-start;
gap: 36px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const CollectionPageDetailsCoverSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const CollectionPageDetailsImage = styled.div`
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
const CollectionPageDetailsDescription = styled.figcaption`
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

const CollectionPageDetailsItemHero = styled.div`
margin-top:56px;
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
const ServiceNoFound = styled.div`
  margin-top:100px;
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
const CollectionListPage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { _id } = useParams();
  const [serviceId, setServiceId] = useState("")
  const [servicesData, setServicesData] = useState([])
  const { preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const {getSingleCollectonEndUserData,businessInfoData, getSingleCollectonEndUserLoading,data,getSingleCollectonEndUserSuccess
  } = useSelector((state) => {
    return {
      data: state.websiteTemplate.getTemplate,
      businessInfoData: state.websiteTemplate.getTemplate.data,
      getSingleCollectonEndUserData: state.bookAppointment.getSingleCollectonEndUser.data,
      getSingleCollectonEndUserLoading: state.bookAppointment.getSingleCollectonEndUser.loading,
      getSingleCollectonEndUserSuccess: state.bookAppointment.getSingleCollectonEndUser.success,
    }
  });
  console.log(data, businessInfoData)
  useEffect(() => {
    if (_id && data) {
      dispatch(getSingleCollectionEndUser(data.type, businessInfoData._id, _id))
    }
  }, [dispatch, _id])

  const { pathname } = useLocation()

  useEffect(() => {
    if (getSingleCollectonEndUserData && getSingleCollectonEndUserData[0] && getSingleCollectonEndUserData[0]?.service[0] && getSingleCollectonEndUserData[0]?.service[0]?._id) {
      setServiceId(getSingleCollectonEndUserData && getSingleCollectonEndUserData[0] && getSingleCollectonEndUserData[0]?.service[0] && getSingleCollectonEndUserData[0]?.service[0]?._id)
    } else {
      let firstServiceId = getSingleCollectonEndUserData.length ? getSingleCollectonEndUserData && getSingleCollectonEndUserData[0] && getSingleCollectonEndUserData[0]?.service[0] && getSingleCollectonEndUserData[0]?.service[0]?._id : ""
      setServiceId(firstServiceId)
    }
  }, [getSingleCollectonEndUserData, pathname])

  useEffect(() => {
    if (serviceId) {
      let categoryServices = getSingleCollectonEndUserData && getSingleCollectonEndUserData[0] && getSingleCollectonEndUserData[0]?.service?.filter((item, key) => item?._id === serviceId);
      categoryServices && setServicesData(categoryServices[0]);
    }
  }, [_id, getSingleCollectonEndUserData, serviceId])

  const handleService = (_id) => {
    console.log("line 486",_id)
    setServiceId(_id)
  }

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
    history("/collections")
  }
  return (
    <React.Fragment>
      <Container>

        {getSingleCollectonEndUserLoading&&!getSingleCollectonEndUserSuccess ? <ComponentLoader /> :

          <CollectionPageDetailsSection>
            <CollectionPageDetailsHead>
              <h2>{getSingleCollectonEndUserData && getSingleCollectonEndUserData[0]?.name ? getSingleCollectonEndUserData && getSingleCollectonEndUserData[0]?.name : ""}</h2>
            </CollectionPageDetailsHead>
            {
              getSingleCollectonEndUserData && getSingleCollectonEndUserData[0] && getSingleCollectonEndUserData[0]?.service.length ?


                <CollectionPageDetailsGrid>
                  <CollectionPageDetailsMenuTabWrap>
                    <CollectionPageDetailsMenuTab>
                      {
                        getSingleCollectonEndUserData && getSingleCollectonEndUserData[0] && getSingleCollectonEndUserData[0]?.service.map((item, key) => {

                          return (

                            <CollectionPageDetailsMenuTabItem>
                              <CollectionPageDetailsMenuButton type='button' className={item._id === serviceId ? 'active' : ""} onClick={() => handleService(item._id)}>{item.title}</CollectionPageDetailsMenuButton>
                            </CollectionPageDetailsMenuTabItem>

                          )
                        })

                      }
                    </CollectionPageDetailsMenuTab>
                  </CollectionPageDetailsMenuTabWrap>
                  {serviceId && servicesData &&
                    <CollectionPageDetailsMenuTabContent>
                      <CollectionPageDetailsItem>
                        <CollectionPageDetailsDescription>
                          <h4>{servicesData?.title}</h4>
                          {/* <p>  {item.details ? item.details : "The Department of radio-diagnosis at Jeevan Hospital 1 is equipped with most advanced diagnostic equipment. Radio-diagnosis plays a crucial role in identification of an ailment. At Jeevan Hospital, our qualified technicians are dedicated to offer a wide range of high quality diagnostic services as below:"}</p> */}
                          <p className='sun-editor-output'
                            dangerouslySetInnerHTML={{
                              __html:
                                servicesData?.description
                            }}
                          ></p>
                          {/* <p>{serviceDetails?.description}</p> */}


                        </CollectionPageDetailsDescription>

                        <CollectionPageDetailsCoverSection>
                          <CollectionPageDetailsImage>
                            <img src={servicesData?.image ? servicesData?.image : DefaultImage} alt="Facilities First" />
                            <SectionHeroBorderBottom>
                              <SectionHeroBorderBottomL></SectionHeroBorderBottomL>
                              <SectionHeroBorderBottomM></SectionHeroBorderBottomM>
                              <SectionHeroBorderBottomR></SectionHeroBorderBottomR>
                            </SectionHeroBorderBottom>
                          </CollectionPageDetailsImage>
                          {
                            servicesData?.allowClientsOnline === true ? (
                              <BookingButton onClick={handleAppointment}>BOOK APPOINTMENT</BookingButton>
                            ) : ("")
                          }
                        </CollectionPageDetailsCoverSection>
                      </CollectionPageDetailsItem>


                    </CollectionPageDetailsMenuTabContent>
                  }
                </CollectionPageDetailsGrid>
                : <ServiceNoFound>
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
          </CollectionPageDetailsSection>
        }
      </Container>
    </React.Fragment>
  )
}

export default CollectionListPage