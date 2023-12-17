/* eslint-disable jsx-a11y/no-distracting-elements */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import DefaultImage from "../Admissions.png";
import DefaultImage2 from "./defaultImage2.svg";
import DefaultImage3 from "./defaultImage3.svg";
import moment from 'moment';
import ApplyJobVacancy from '../../../../InstituteWebsite/ApplyJobVacancy';
import { Fragment, useRef, useState } from 'react';
import Modal from '../../../CommonComponent/Modal';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import FormatText from '../../../../Common/FormatText';
import { Container } from '../../../CommonComponent/Container.styled';
import Slider from "react-slick";
import ImageViewer from '../../../../Common/ImageViewer';
const VacancyHeroSection = styled.div`
padding: 20px 0;
`;
const VacancyHeroHead = styled.div`
margin-bottom: 24px;
text-align: ${({ theme }) => theme.Vacancy.VacancyHero.VacancyHeroHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.Vacancy.VacancyHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyHero.h2.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Vacancy.VacancyHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Vacancy.VacancyHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Vacancy.VacancyHero.h2.LetterSpacing};
color: ${({ theme }) => theme.Vacancy.VacancyHero.h2.Color};
}
h3{

font-weight: ${({ theme }) => theme.Vacancy.VacancyHero.h3.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyHero.h3.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyHero.h3.LineHeight};
font-style: ${({ theme }) => theme.Vacancy.VacancyHero.h3.FontStyle};
font-family: ${({ theme }) => theme.Vacancy.VacancyHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.Vacancy.VacancyHero.h3.LetterSpacing};
color: ${({ theme }) => theme.Vacancy.VacancyHero.h3.Color};
}
}
`;
const VacancyHeroGrid = styled.div`
/* display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;
@media screen and (max-width: 992px) {
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
    height: 1px;
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
    height: 1px;
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
const VacancyItem = styled.figure`
box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.1);
background: ${({ theme }) => theme.Vacancy.VacancyHero.VacancyItem.Background};
border-radius: 8px;
`;
const VacancyImage = styled.div`
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
const VacancyItemCaption = styled.figcaption`
width: 100%;
height: auto;
border-bottom-left-radius: inherit;
border-bottom-right-radius: inherit;
padding: ${({ theme }) => theme.Vacancy.VacancyPage.VacancyItemCaption.PaddingY} ${({ theme }) => theme.Vacancy.VacancyPage.VacancyItemCaption.PaddingX};
h4{
  
  font-weight: ${({ theme }) => theme.Vacancy.VacancyHero.h4.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyHero.h4.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyHero.h4.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyHero.h4.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyHero.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyHero.h4.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyHero.h4.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
p{
  
  font-weight: ${({ theme }) => theme.Vacancy.VacancyHero.p.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyHero.p.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyHero.p.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyHero.p.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyHero.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyHero.p.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyHero.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
`;
const ViewMoreVacancyHeroSection = styled.div`
display: flex;
justify-content: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroSection.Alignment};

`;
const ApplyNowButton = styled.button`

font-weight: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.Background};
border-radius: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.BorderRadius};
color: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.Background};
padding: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.PaddingY} ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.PaddingX};
cursor: pointer;
display: inline-block;

margin-top: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.Hover.Background};
color: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const ViewMoreVacancyHeroButton = styled.button`

font-weight: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.Background};
border-radius: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.BorderRadius};
color: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.Background};
padding: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.PaddingY} ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.PaddingX};

margin-top: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.MarginTop};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.Hover.Background};
color: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;

}
`;

const NextIcon = styled.i`
display: inline-block;
  color: ${({ theme }) => theme.Vacancy.VacancyHero.ApplyNowButton.Background};
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
  color: ${({ theme }) => theme.Vacancy.VacancyHero.ViewMoreVacancyHeroButton.Hover.Color};

}
`;
const VacancyHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const viewVacancyDetailModal = useRef(null)
  const [applyPopup, setApplyPopup] = useState(false)
  // const { vacancyData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [details, setDetails] = useState("")
  const { vacancyData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/vacancy", true))
    }
    else {
      history("/vacancy")
    }
  }

  const applyNowPopup = (item) => {
    viewVacancyDetailModal.current.close()
    setApplyPopup(!applyPopup)
    setDetails(item)
  }
  const viewDetailPopup = (item) => {
    setDetails(item)
    viewVacancyDetailModal.current.open()
  }
  const closeVacancyApply = () => {
    setApplyPopup(!applyPopup)
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
      
      <VacancyHeroSection>
        <VacancyHeroHead>
          <h2>{(subheadersData && subheadersData['vacancyhead']) || "Vacancy"}</h2>
          <h3>{(subheadersData && subheadersData['vacancysubhead']) || ""}</h3>
        </VacancyHeroHead>
        <VacancyHeroGrid>
          {
            vacancyData.length ?
            <Slider {...settings} >
                      {
              vacancyData.map((item, key) => {
                return (
                  <VacancyItem >
                    <VacancyImage key={key} >
                      <ImageViewer src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : ""} defaultImage={DefaultImage}/>
                      {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} loading="eager" alt="Vacancy Us" /> */}
                    </VacancyImage>
                    <VacancyItemCaption>
                      <h4>{item.title}</h4>
                      <p dangerouslySetInnerHTML={{
                        __html:
                          item.description,
                      }}></p>
                      <ApplyNowButton onClick={() => viewDetailPopup(item)}>View Now
                        <NextIcon></NextIcon>
                      </ApplyNowButton>&nbsp;&nbsp;
                      <ApplyNowButton onClick={() => applyNowPopup(item)}>Apply Now
                        <NextIcon></NextIcon>
                      </ApplyNowButton>
                    </VacancyItemCaption>
                  </VacancyItem>
                )
              })
             }
             </Slider>
              :
              <>
               <Slider {...settings} >
                <VacancyItem>
                  <VacancyImage>
                    <img src={DefaultImage2} loading="eager" alt="Vacancy Us" />
                  </VacancyImage>
                  <VacancyItemCaption>
                    <h4>Requirement of Arts Faculty</h4>
                    <p>We focus on ergonomics and meeting
                      you where you work. It's only a
                      keystroke away.</p>
                    <ApplyNowButton to="">
                      Apply Now
                      <NextIcon></NextIcon>
                    </ApplyNowButton>
                  </VacancyItemCaption>
                </VacancyItem>
                <VacancyItem>
                  <VacancyImage>
                    <img src={DefaultImage3} loading="eager" alt="Vacancy Us" />
                  </VacancyImage>
                  <VacancyItemCaption>
                    <h4>Requirement of Yoga Teacher</h4>
                    <p>We focus on ergonomics and meeting
                      you where you work. It's only a
                      keystroke away.</p>
                    <ApplyNowButton to="">
                      Apply Now
                      <NextIcon></NextIcon>
                    </ApplyNowButton>
                  </VacancyItemCaption>
                </VacancyItem>
                </Slider>
              </>
          }
        </VacancyHeroGrid>

        <ViewMoreVacancyHeroSection>
          <ViewMoreVacancyHeroButton onClick={() => handleViewMoreButton()}>
            View All Vacancy
          </ViewMoreVacancyHeroButton>
        </ViewMoreVacancyHeroSection>
        <Modal ref={viewVacancyDetailModal}>
          <ModalHeader title={details.title}></ModalHeader>
          <ModalBody>
            <div className="VacancyDetailWrapper">
              <div className="VacancyDetailBanner">
                <ul>
                  <li>
                    <p className="text-xxs">Vacancy Type</p>
                    <p className="text-xs">{details.position}</p>
                  </li>
                  <li>
                    <p className="text-xxs">No. Of Position</p>
                    <p className="text-xs">{details.noOfPosition}</p>
                  </li>
                  <li>
                    <p className="text-xxs">Minimum Experience</p>
                    <p className="text-xs">{details.experience}</p>
                  </li>
                  <li>
                    <p className="text-xxs">Annual Salary</p>
                    <p className="text-xs">
                      ({details.currencyType}){details.annualSalary}
                    </p>
                  </li>
                  <li>
                    <p className="text-xxs">Minimum Qualification</p>
                    <p className="text-xs">{details.qualification}</p>
                  </li>
                  <li>
                    <p className="text-xxs">Last date to apply</p>
                    <p className="text-xxs">
                      {moment(details.lastApplyDate).format("DD MMM. YYYY")}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="VD-ActionSection mt-20">
                <button
                  onClick={() => applyNowPopup(details)}
                  className="button button-base btn-sm"
                  type="button"
                >
                  Apply Now
                </button>
                {details.fileUpload&&details.fileUpload.src && (
                  <a
                    href={details.fileUpload.src}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="button btn-o-mgray btn-sm base"
                  >
                    Download Job Description
                  </a>
                )}
              </div>
              <div className="VD-ContentSection mt-20">
                <p className="text-sm">Job Description</p>
                {
                  details.description && <FormatText text={details.description}>
                    {({ formatedText }) => (
                      <p
                        className="text-xxs mt-10 sun-editor-output"
                        dangerouslySetInnerHTML={{ __html: formatedText }}
                      ></p>
                    )}
                  </FormatText>
                }

                {details.keyRoles && (
                  <Fragment>
                    <p className="text-sm mt-20">Key Roles & Responsibility</p>
                    <FormatText text={details.keyRoles}>
                      {({ formatedText }) => (
                        <p className='sun-editor-output'
                          dangerouslySetInnerHTML={{ __html: formatedText }}
                        ></p>
                      )}
                    </FormatText>

                  </Fragment>
                )}
              </div>
            </div>
          </ModalBody>
          {/* <ModalFooter></ModalFooter> */}
        </Modal>
        {
          applyPopup && <ApplyJobVacancy
            open={applyPopup}
            back={false}
            detail={details}
            close={closeVacancyApply}
          />
        }
      </VacancyHeroSection >
    </Container>
  )
}

export default VacancyHero