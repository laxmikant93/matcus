/* eslint-disable jsx-a11y/no-distracting-elements */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import DefaultImage from "../Admissions.png";
import DefaultImage2 from "./defaultImage2.svg";
import DefaultImage3 from "./defaultImage3.svg";
import Modal from '../../../CommonComponent/Modal/index';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import ModalFooter from '../../../CommonComponent/Modal/ModalFooter';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import ApplyAdmission from '../../../../InstituteWebsite/ApplyAdmission';
import { useState } from 'react';
import { useRef } from 'react';
import { Container } from '../../../CommonComponent/Container.styled';
import Slider from "react-slick";
import ImageViewer from '../../../../Common/ImageViewer';

const AdmissionHeroSection = styled.div`
padding: 20px 0;
`;
const AdmissionHeroHead = styled.div`
margin-bottom: 24px;
text-align: ${({ theme }) => theme.Admission.AdmissionHero.AdmissionHomeHeroHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.Admission.AdmissionHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionHero.h2.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Admission.AdmissionHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Admission.AdmissionHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Admission.AdmissionHero.h2.LetterSpacing};
color: ${({ theme }) => theme.Admission.AdmissionHero.h2.Color};
}

`;
const AdmissionHeroGrid = styled.div`
/* display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;
@media speech and (max-width: 992px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
} */
  .slick-slide {
    padding: 0px 10px;
  }

  .slick-prev {
    z-index: 1;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid rgba(0, 52, 89, 1);
    left: 0;
    position: absolute;
    top: -80px;
    left: 92%;
    
    @media screen and (max-width:1000px){
      left: 87%;
    }
    @media screen and (max-width:700px){
      left: 84%;
    }
    @media screen and (max-width:500px){
      left: 77%;
    }
  }

  .slick-dots li button:before{
    display: none;
  }

  .slick-prev:before {
    border-right: 2px solid rgba(0, 52, 89, 1);
    border-bottom: 2px solid rgba(0, 52, 89, 1);
    transform: rotate(135deg);
    color: transparent;
    width: 8px;
    height: 8px;
    top: 8px;
    left: 8px;
    z-index: 3;
  }

  .slick-prev:after{
    width: 12px;
    height: 2px;
    background-color: rgba(0, 52, 89, 1);
    top: 12px;
    left: 8px;
  }

  .slick-next {
    z-index: 1;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid rgba(0, 52, 89, 1);
    right: 0;
    position: absolute;
    top: -80px;
  }

  .slick-next:before {
    position: absolute;
    font-size: 40px;
    border-right: 2px solid rgba(0, 52, 89, 1);
    border-bottom: 2px solid rgba(0, 52, 89, 1);
    color: transparent;
    width: 8px;
    height: 8px;
    top: 8px;
    left: 8px;
    transform: rotate(-45deg);
  }


  .slick-next:after{
    width: 12px;
    height: 2px;
    background-color: rgba(0, 52, 89, 1);
    top: 12px;
    left: 5px;
  } 

  .slick-prev.slick-disabled:before, .slick-next.slick-disabled:before {
    opacity: 1;
  }
  .slick-prev:focus:before, .slick-next:focus:before {
    opacity: 0.3;
  }
  .slick-next.slick-disabled:before, .slick-prev.slick-disabled:before {
    opacity: 1;
  }
  .slick-next:focus:before, .slick-prev:focus:before {
    opacity: 0.3;
  }


  .slick-prev.slick-disabled:after, .slick-next.slick-disabled:after {
    opacity: 1;
  }
  .slick-prev:focus:after, .slick-next:focus:after {
    opacity: 0.3;
  }
  .slick-next.slick-disabled:after, .slick-prev.slick-disabled:after {
    opacity: 1;
  }
  .slick-next:focus:after, .slick-prev:focus:after {
    opacity: 0.3;
  }


  .slick-prev.slick-disabled, .slick-next.slick-disabled {
    opacity: 1;
  }
  .slick-prev:focus, .slick-next:focus {
    opacity: 0.3;
  }
  .slick-next.slick-disabled, .slick-prev.slick-disabled {
    opacity: 1;
  }
  .slick-next:focus, .slick-prev:focus {
    opacity: 0.3;
  }
`;

const AdmissionItem = styled.figure`
box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.1);
background: ${({ theme }) => theme.Admission.AdmissionHero.AdmissionItem.Background};
border-radius: 8px;
`;
const AdmissionImage = styled.div`
width: 100%;
height: 295px;
img{
width: 100%;
height: 100%;
object-fit: cover;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
}
`;
const AdmissionItemCaption = styled.figcaption`
width: 100%;
height: auto;
border-bottom-left-radius: inherit;
border-bottom-right-radius: inherit;
padding: ${({ theme }) => theme.Admission.AdmissionHero.AdmissionItemCaption.Padding};
h4{
  
  font-weight: ${({ theme }) => theme.Admission.AdmissionHero.h4.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionHero.h4.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionHero.h4.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionHero.h4.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionHero.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionHero.h4.LetterSpacing};
  color: ${({ theme }) => theme.Admission.AdmissionHero.h4.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
};
p{
  font-weight: ${({ theme }) => theme.Admission.AdmissionHero.p.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionHero.p.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionHero.p.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionHero.p.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionHero.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionHero.p.LetterSpacing};
  color: ${({ theme }) => theme.Admission.AdmissionHero.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
`;
const ViewMoreAdmissionHeroSection = styled.div`
display: flex;
justify-content: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroSection.Alignment};
`;
const ApplyNowButton = styled.button`

font-weight: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Background};
border-radius: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Background};
padding: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.PaddingX};
cursor: pointer;
display: inline-block;
margin-top: 48px;
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const NextIcon = styled.i`
display: inline-block;
  color: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Background};
  opacity: 1;
  width: 0.6rem;
  height: 0.6rem;
  border-style: solid;
  border-color: currentColor;
  border-width: 0.15rem 0.15rem 0 0;
  margin-left: 5px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  ${ApplyNowButton}:hover & {
    color: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Color};
  }
`;
const ViewMoreAdmissionHeroButton = styled.button`

font-weight: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Background};
border-radius: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Background};
padding: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.PaddingX};

margin-top: 48px;
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const AdmissionHero = () => {
  const viewAdmissionDetailModal = useRef(null)

  const dispatch = useDispatch();
  const history = useNavigate();
  const { admissionsData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [applyPopup, setApplyPopup] = useState(false)
  const [admissionData, setAdmissionData] = useState("")

  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/admission", true))
    }
    else {
      history("/admission")
    }
  }
  const closeAdmisisonApply = () => {
    setApplyPopup(!applyPopup)
  }
  const applyNow = (item) => {
    viewAdmissionDetailModal.current.close()
    setApplyPopup(!applyPopup)
    setAdmissionData(item)
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [

      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
 

  return (
    <Container>
      <AdmissionHeroSection>
        <AdmissionHeroHead>
          {/* <h2>Admissions</h2> */}
          <h2>{(subheadersData && subheadersData['admissionhead']) || "Admissions"}</h2>
          <h3>{(subheadersData && subheadersData['admissionsubhead']) || ""}</h3>
        </AdmissionHeroHead>
        <AdmissionHeroGrid>

          {
            admissionsData.length ?
            <Slider {...settings} >
              {
              admissionsData.map((item, key) => { 
               return (
                  <AdmissionItem key={key} >
                    <AdmissionImage>
                      <ImageViewer object={item.thumbnail} defaultImage={DefaultImage} loading="eager" />
                      {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} loading="eager" alt="Admission Us" /> */}
                    </AdmissionImage>
                    <AdmissionItemCaption>
                      <h4>{item.title}</h4>
                      <p dangerouslySetInnerHTML={{
                        __html:
                          item.description,
                      }}></p>
                      <ApplyNowButton onClick={() => applyNow(item)}>
                        Apply Now
                        <NextIcon></NextIcon>
                      </ApplyNowButton>
                    </AdmissionItemCaption>
                  </AdmissionItem>
                )
              })
              }
               </Slider>
               :
              <>
               <Slider {...settings} >
                <AdmissionItem>
                  <AdmissionImage>
                    <img src={DefaultImage2} loading="eager" alt="Admission Us" />
                  </AdmissionImage>
                  <AdmissionItemCaption>
                    <h4>12th Class Admission Open</h4>
                    <p>We focus on ergonomics and meeting
                      you where you work. It's only a
                      keystroke away.</p>
                    <ApplyNowButton to="">
                      Apply Now
                      <NextIcon></NextIcon>
                    </ApplyNowButton>
                  </AdmissionItemCaption>
                </AdmissionItem>


                <AdmissionItem>
                  <AdmissionImage>
                    <img src={DefaultImage3} loading="eager" alt="Admission Us" />
                  </AdmissionImage>
                  <AdmissionItemCaption>
                    <h4>12th Class Admission Open</h4>
                    <p>We focus on ergonomics and meeting
                      you where you work. It's only a
                      keystroke away.</p>
                    <ApplyNowButton to="">
                      Apply Now
                      <NextIcon></NextIcon>
                    </ApplyNowButton>
                  </AdmissionItemCaption>
                </AdmissionItem>
                </Slider>
              </>
          }


        </AdmissionHeroGrid>

        <ViewMoreAdmissionHeroSection>
          <ViewMoreAdmissionHeroButton onClick={() => handleViewMoreButton()}>
            View More
          </ViewMoreAdmissionHeroButton>
        </ViewMoreAdmissionHeroSection>
        <Modal ref={viewAdmissionDetailModal}>
          <ModalHeader title={admissionData.title}></ModalHeader>
          <ModalBody>
            {/* <ViewDetailAdmissionModalBody>
            <AdmissionModalDetails>
              <AdmissionModalDetailsCover>
                <img src={admissionData.thumbnail && admissionData.thumbnail !== "" ? admissionData.thumbnail : DefaultImage1} alt="Admission" />
              </AdmissionModalDetailsCover>
              <AdmissionModalDetailsList>
                <AdmissionModalDetailsListItem>
                  <p>Session For</p>
                  <p>{admissionData.session}</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>No. of Seat</p>
                  <p>{admissionData.noOfSeats}</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Minimum Age</p>
                  <p>{admissionData.age} years</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Course Fees</p>
                  <p>{admissionData.courseFee} (INR)</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Course/Classroom</p>
                  <p>{admissionData.class}</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Minimum Qualification</p>
                  <p>{admissionData.qualification}</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Last Date to Apply</p>
                  <p>{moment(admissionData.lastApplyDate).format("LLL")}</p>
                </AdmissionModalDetailsListItem>
              </AdmissionModalDetailsList>
            </AdmissionModalDetails>
            <AdmissionModalDetailsAction>
              <ApplyNowButton type='button' onClick={() => applyNow()}>Apply Now</ApplyNowButton>
              <DownloadFeeStructureButton type='button' onClick={() => downloadFeeStructure()} >Download Fee Structure</DownloadFeeStructureButton>
              <DownloadBrochureButton type='button' onClick={() => downloadBrochure()} >Download Brochure</DownloadBrochureButton>
            </AdmissionModalDetailsAction>
            <Description>
              <h6>Fee Description</h6>
              <p>
                {admissionData.description}
              </p>
            </Description>
            <TermsAndCondition>
              <h6>Process</h6>
              {admissionData.process}

            </TermsAndCondition> */}
            {/* </ViewDetailAdmissionModalBody> */}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
        {
          applyPopup && (
            <ApplyAdmission
              open={applyPopup}
              back={false}
              close={closeAdmisisonApply}
              detail={admissionData}
            />
          )
        }
      </AdmissionHeroSection>
    </Container>
  )
}

export default AdmissionHero