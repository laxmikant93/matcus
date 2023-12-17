/* eslint-disable jsx-a11y/no-distracting-elements */
import { Fragment, useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FormatText from '../../../../Common/FormatText';
import { Container } from '../../../CommonComponent/Container.styled'
import Modal from '../../../CommonComponent/Modal';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
// import ModalFooter from '../../../CommonComponent/Modal/ModalFooter';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import DefaultImage1 from "./defaultImage1.png"
import DefaultImage from "../Admissions.png"
import DefaultImage2 from "./defaultImage2.svg"
import DefaultImage3 from "./defaultImage3.svg"
import moment from 'moment';
import ApplyJobVacancy from '../../../../InstituteWebsite/ApplyJobVacancy';
import ImageViewer from '../../../../Common/ImageViewer';

const VacancyHeroSection = styled.div`
padding: 48px 0;
`;
const VacancyHeroHead = styled.div`
margin-bottom: 48px;
text-align: ${({ theme }) => theme.Vacancy.VacancyPage.VacancyHeroHead.Alignment};
h2{
text-transform: uppercase;
font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyPage.h2.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Vacancy.VacancyPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Vacancy.VacancyPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.h2.LetterSpacing};
color: ${({ theme }) => theme.Vacancy.VacancyPage.h2.Color};
}
h3{

font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.h3.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyPage.h3.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyPage.h3.LineHeight};
font-style: ${({ theme }) => theme.Vacancy.VacancyPage.h3.FontStyle};
font-family: ${({ theme }) => theme.Vacancy.VacancyPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.h3.LetterSpacing};
color: ${({ theme }) => theme.Vacancy.VacancyPage.h3.Color};
text-decoration: underline;
}
}
`;
const VacancyHeroGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 40px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
}
`;
const VacancyItem = styled.figure`
box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.1);
background: ${({ theme }) => theme.Vacancy.VacancyPage.VacancyItem.Background};
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
  
  font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.h4.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyPage.h4.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyPage.h4.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyPage.h4.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyPage.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.h4.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyPage.h4.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
},
p{
  
  font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyPage.p.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.p.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyPage.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
`;
const ViewMoreVacancyHeroSection = styled.div`
display: flex;
justify-content: ${({ theme }) => theme.Vacancy.VacancyPage.ViewMoreVacancyHeroSection.Alignment};
}
`;
const ApplyNowButton = styled.a`
font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Background};
border-radius: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.BorderRadius};
color: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Background};
padding: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.PaddingY} ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.PaddingX};
cursor: pointer;
display: inline-block;
margin-top: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Hover.Background};
color: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const ViewNowButton = styled.button`
font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Background};
border-radius: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.BorderRadius};
color: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Background};
padding: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.PaddingY} ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.PaddingX};
cursor: pointer;
display: inline-block;
margin-top: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Hover.Background};
color: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const NextIcon = styled.i`
display: inline-block;
  color: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.background};
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
    color: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Hover.Color};
  }
  ${ViewNowButton}:hover & {
    color: ${({ theme }) => theme.Vacancy.VacancyPage.ApplyNowButton.Hover.Color};
  }
`;
const VacancyPage = () => {
  const viewVacancyDetailModal = useRef(null)
  const [applyPopup, setApplyPopup] = useState(false)
  const { vacancyData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [details, setDetails] = useState("")
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
              vacancyData.map((item, key) => {
                return (
                  <VacancyItem>
                    <VacancyImage key={key}>
                      <ImageViewer object={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : ""} defaultImage={DefaultImage} loading="eager"/>
                      {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} loading="eager" alt="Vacancy Us" /> */}
                    </VacancyImage>
                    <VacancyItemCaption>
                      <h4>{item.title}</h4>
                      <p dangerouslySetInnerHTML={{
                        __html:
                          item.description,
                      }}></p>

                      <ApplyNowButton onClick={() => applyNowPopup(item)}>Apply Now
                        <NextIcon></NextIcon>
                      </ApplyNowButton>
                      &nbsp;&nbsp;
                      <ViewNowButton onClick={() => viewDetailPopup(item)}>
                        View Now
                        <NextIcon></NextIcon>
                      </ViewNowButton>

                    </VacancyItemCaption>
                  </VacancyItem>
                )
              }) :
              <>
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
                    &nbsp;&nbsp;
                    <ViewNowButton>
                      View Now
                      <NextIcon></NextIcon>
                    </ViewNowButton>
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
                    &nbsp;&nbsp;
                    <ViewNowButton>
                      View Now
                      <NextIcon></NextIcon>
                    </ViewNowButton>
                  </VacancyItemCaption>
                </VacancyItem>
                <VacancyItem>
                  <VacancyImage>
                    <img src={DefaultImage1} loading="eager" alt="Vacancy Us" />
                  </VacancyImage>
                  <VacancyItemCaption>
                    <h4>Opening for Maths Teacher</h4>
                    <p>We focus on ergonomics and meeting
                      you where you work. It's only a
                      keystroke away.</p>
                    <ApplyNowButton to="">
                      Apply Now
                      <NextIcon></NextIcon>
                    </ApplyNowButton>
                    &nbsp;&nbsp;
                    <ViewNowButton>
                      View Now
                      <NextIcon></NextIcon>
                    </ViewNowButton>
                  </VacancyItemCaption>
                </VacancyItem>
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
                    &nbsp;&nbsp;
                    <ViewNowButton>
                      View Now
                      <NextIcon></NextIcon>
                    </ViewNowButton>
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
                    &nbsp;&nbsp;
                    <ViewNowButton>
                      View Now
                      <NextIcon></NextIcon>
                    </ViewNowButton>
                  </VacancyItemCaption>
                </VacancyItem>
              </>
          }

        </VacancyHeroGrid>
      </VacancyHeroSection>
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
                    {moment(details.lastApplyDate).format("DD MMM. YYYY") ? moment(details.lastApplyDate).format("DD MMM. YYYY") : ""}
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
    </Container >
  )
}

export default VacancyPage