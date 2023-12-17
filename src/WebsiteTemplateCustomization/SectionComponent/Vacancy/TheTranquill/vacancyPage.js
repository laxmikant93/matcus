import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import Vacancy1 from "./vacancy-1.jpg"
import Vacancy2 from "./vacancy-2.jpg"
import DefaultImage2 from "./defaultImage2.svg"
import Modal from '../../../CommonComponent/Modal/index';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import ModalFooter from '../../../CommonComponent/Modal/ModalFooter';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import React, { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ApplyJobVacancy from '../../../../InstituteWebsite/ApplyJobVacancy';
import FormatText from '../../../../Common/FormatText';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";

const VacancySection = styled.div`
padding: 72px 0;
`;
const Vacancy = styled.div`

`;
const VacancyHead = styled.div`
margin-bottom: ${({ theme }) => theme.VacancyPage.VacancyHead.MarginBottom};
text-align: ${({ theme }) => theme.VacancyPage.VacancyHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.VacancyPage.h2.FontWeight};
font-size: ${({ theme }) => theme.VacancyPage.h2.FontSize};
line-height: ${({ theme }) => theme.VacancyPage.h2.LineHeight};
font-style: ${({ theme }) => theme.VacancyPage.h2.FontStyle};
font-family: ${({ theme }) => theme.VacancyPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.VacancyPage.h2.LetterSpacing};
color: ${({ theme }) => theme.VacancyPage.h2.Color};
text-align: ${({ theme }) => theme.VacancyPage.h2.Alignment};
text-transform: ${({ theme }) => theme.VacancyPage.h2.TextTransform};
}
h3{
font-weight: ${({ theme }) => theme.VacancyPage.h3.FontWeight};
font-size: ${({ theme }) => theme.VacancyPage.h3.FontSize};
line-height: ${({ theme }) => theme.VacancyPage.h3.LineHeight};
font-style: ${({ theme }) => theme.VacancyPage.h3.FontStyle};
font-family: ${({ theme }) => theme.VacancyPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.VacancyPage.h3.LetterSpacing};
color: ${({ theme }) => theme.VacancyPage.h3.Color};
text-align: ${({ theme }) => theme.VacancyPage.h3.Alignment};
text-transform: ${({ theme }) => theme.VacancyPage.h3.TextTransform};
}
}
`;
const VacancyDescription = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap:30px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  }
`;
const VacancyCard = styled.figure`
width: 100%;
height: 401px;
position: relative;
img{
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
@media screen and (max-width: 768px) {
  height: 300px;
  }

`;
const CardOverlay = styled.figcaption`
position: absolute;
bottom: 0;
border-radius: 4px;
padding: 16px 24px;
width: 100%;
height: 100%;
background: ${({ theme }) => theme.VacancyPage.CardOverlay.Background};
transition: all 0.35s ease-in-out 0s;
overflow: hidden;
cursor: pointer;
display: flex;
flex-direction: column;
justify-content: flex-end;
${VacancyCard}:hover & {
  justify-content: center;
  height: 100%;
  transition: all 0.35s ease-in-out 0s;
  background: ${({ theme }) => theme.VacancyPage.CardOverlay.Hover.Background};
}
h4{

  font-weight: ${({ theme }) => theme.VacancyPage.h4.FontWeight};
  font-size: ${({ theme }) => theme.VacancyPage.h4.FontSize};
  line-height: ${({ theme }) => theme.VacancyPage.h4.LineHeight};
  font-style: ${({ theme }) => theme.VacancyPage.h4.FontStyle};
  font-family: ${({ theme }) => theme.VacancyPage.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.VacancyPage.h4.LetterSpacing};
  color: ${({ theme }) => theme.VacancyPage.h4.Color};
  text-align: ${({ theme }) => theme.VacancyPage.h4.Alignment};
  text-transform: ${({ theme }) => theme.VacancyPage.h4.TextTransform};
  }
  h5{
  font-weight: ${({ theme }) => theme.VacancyPage.h5.FontWeight};
  font-size: ${({ theme }) => theme.VacancyPage.h5.FontSize};
  line-height: ${({ theme }) => theme.VacancyPage.h5.LineHeight};
  font-style: ${({ theme }) => theme.VacancyPage.h5.FontStyle};
  font-family: ${({ theme }) => theme.VacancyPage.h5.FontFamily};
  letter-spacing: ${({ theme }) => theme.VacancyPage.h5.LetterSpacing};
  color: ${({ theme }) => theme.VacancyPage.h5.Color};
  text-align: ${({ theme }) => theme.VacancyPage.h5.Alignment};
  text-transform: ${({ theme }) => theme.VacancyPage.h5.TextTransform};
  }
`;

const OverlayDivider = styled.div`
width: 40%;
height: 5px;
background: #FFF;
border-radius: 2px;
margin: 8px 0;
`;

const CardOverlayDetails = styled.div`

display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
p{
  
  font-weight: ${({ theme }) => theme.VacancyPage.p.FontWeight};
  font-size: ${({ theme }) => theme.VacancyPage.p.FontSize};
  line-height: ${({ theme }) => theme.VacancyPage.p.LineHeight};
  font-style: ${({ theme }) => theme.VacancyPage.p.FontStyle};
  font-family: ${({ theme }) => theme.VacancyPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.VacancyPage.p.LetterSpacing};
  color: ${({ theme }) => theme.VacancyPage.p.Color};
}
${VacancyCard}:hover & {
  -webkit-line-clamp: 8;
}
`;

const CardOverlayAction = styled.div`
margin-top: 24px;
align-items: center;
display: none;
gap: 20px;
${VacancyCard}:hover & {
  display: flex;
  @media screen and (max-width: 992px) {
    display: inline-block;
    }
    @media screen and (max-width: 768px) {
      display: flex;
      }
}
`;
const OverlayApplyNowButton = styled.button`

font-weight: ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.FontWeight};
font-size: ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.FontSize};
line-height: ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.LineHeight};
background: ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.Background};
border: 1px solid ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.BorderColor};
border-radius: ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.BorderRadius};
color: ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.Color};
padding: ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.PaddingY} ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.Hover.Background};
color: ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.VacancyPage.OverlayApplyNowButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const OverlayViewButton = styled.button`

font-weight: ${({ theme }) => theme.VacancyPage.OverlayViewButton.FontWeight};
font-size: ${({ theme }) => theme.VacancyPage.OverlayViewButton.FontSize};
line-height: ${({ theme }) => theme.VacancyPage.OverlayViewButton.LineHeight};
background: ${({ theme }) => theme.VacancyPage.OverlayViewButton.Background};
border: 1px solid ${({ theme }) => theme.VacancyPage.OverlayViewButton.BorderColor};
border-radius: ${({ theme }) => theme.VacancyPage.OverlayViewButton.BorderRadius};
color: ${({ theme }) => theme.VacancyPage.OverlayViewButton.Color};
padding: ${({ theme }) => theme.VacancyPage.OverlayViewButton.PaddingY} ${({ theme }) => theme.VacancyPage.OverlayViewButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.VacancyPage.OverlayViewButton.Hover.Background};
color: ${({ theme }) => theme.VacancyPage.OverlayViewButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.VacancyPage.OverlayViewButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const VacancyDetailModalWrap = styled.div`
`;

const VacancyDetailBannerGrid = styled.div`
display: grid;
grid-template-columns: auto 1fr;
@media screen and (max-width: 768px) {
  grid-template-columns: repeat(1, 1fr);
}
gap: 32px;
align-items: flex-start;
`;

const VacancyDetailBannerGridItem = styled.div`
ul{
  display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 32px;
align-items: flex-start;
@media screen and (max-width: 576px) {
  grid-template-columns: repeat(1, 1fr);
}
h6{
  font-weight: ${({ theme }) => theme.VacancyPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.VacancyPage.h6.FontSize};
  line-height: ${({ theme }) => theme.VacancyPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.VacancyPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.VacancyPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.VacancyPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.VacancyPage.h6.Color};
  text-align: ${({ theme }) => theme.VacancyPage.h6.Alignment};
  text-transform: ${({ theme }) => theme.VacancyPage.h6.TextTransform};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
  p{
    font-weight: ${({ theme }) => theme.VacancyPage.p.FontWeight};
    font-size: ${({ theme }) => theme.VacancyPage.p.FontSize};
    line-height: ${({ theme }) => theme.VacancyPage.p.LineHeight};
    font-style: ${({ theme }) => theme.VacancyPage.p.FontStyle};
    font-family: ${({ theme }) => theme.VacancyPage.p.FontFamily};
    letter-spacing: ${({ theme }) => theme.VacancyPage.p.LetterSpacing};
    color: ${({ theme }) => theme.VacancyPage.VacancyDetailModal.p.Color};
    text-align: ${({ theme }) => theme.VacancyPage.p.Alignment};
    text-transform: ${({ theme }) => theme.VacancyPage.p.TextTransform};
    }
}
`;
const VacancyDetailBannerCover = styled.div`
width: 309px;
height: 264px;
img{
  width: 100%;
  height: 100%;
  border-radius:24px;
  object-fit: cover;
}
`;
const VacancyDetailDescription = styled.div`
margin-top: 48px;
h6{
  font-weight: ${({ theme }) => theme.VacancyPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.VacancyPage.h6.FontSize};
  line-height: ${({ theme }) => theme.VacancyPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.VacancyPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.VacancyPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.VacancyPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.VacancyPage.h6.Color};
  text-align: ${({ theme }) => theme.VacancyPage.h6.Alignment};
  text-transform: ${({ theme }) => theme.VacancyPage.h6.TextTransform};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
  }
  p{
    font-weight: ${({ theme }) => theme.VacancyPage.p.FontWeight};
    font-size: ${({ theme }) => theme.VacancyPage.p.FontSize};
    line-height: ${({ theme }) => theme.VacancyPage.p.LineHeight};
    font-style: ${({ theme }) => theme.VacancyPage.p.FontStyle};
    font-family: ${({ theme }) => theme.VacancyPage.p.FontFamily};
    letter-spacing: ${({ theme }) => theme.VacancyPage.p.LetterSpacing};
    color: ${({ theme }) => theme.VacancyPage.VacancyDetailModal.p.Color};
    text-align: ${({ theme }) => theme.VacancyPage.p.Alignment};
    text-transform: ${({ theme }) => theme.VacancyPage.p.TextTransform};
    }
`;

const VacancyDetailDescriptionItem = styled.div`
margin-bottom: 16px;
ul{
  padding-left: 24px;
  li{
    font-weight: ${({ theme }) => theme.VacancyPage.p.FontWeight};
    font-size: ${({ theme }) => theme.VacancyPage.p.FontSize};
    line-height: ${({ theme }) => theme.VacancyPage.p.LineHeight};
    font-style: ${({ theme }) => theme.VacancyPage.p.FontStyle};
    font-family: ${({ theme }) => theme.VacancyPage.p.FontFamily};
    letter-spacing: ${({ theme }) => theme.VacancyPage.p.LetterSpacing};
    color: ${({ theme }) => theme.VacancyPage.VacancyDetailModal.p.Color};
    text-align: ${({ theme }) => theme.VacancyPage.p.Alignment};
    text-transform: ${({ theme }) => theme.VacancyPage.p.TextTransform};
    list-style-type: auto;
  }
}
`;

const VacancyPage = () => {
  const viewVacancyDetailModal = useRef(null)
  const [applyPopup, setApplyPopup] = useState(false)
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { vacancyData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const [details, setDetails] = useState("")
  const applyNowPopup = (item) => {
    viewVacancyDetailModal.current.close()
    setDetails(item)
    setApplyPopup(!applyPopup)
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
      <VacancySection>
        <Vacancy>
          <VacancyHead>
            <h2>Vacancy</h2>
            <h3>Career with us</h3>
            {/* <p>{(subheadersData && subheadersData['vacancysubhead']) || "Vacancy"}</p> */}

          </VacancyHead>
          <VacancyDescription>
            {
              vacancyData.length ?
                vacancyData.map((item, key) => {
                  return (
                    <VacancyCard key={key}>
                      <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} alt="Vacancy" />
                      <CardOverlay>
                        <h4>{item.title}</h4>
                        <h5>{item.qualification}</h5>
                        <OverlayDivider></OverlayDivider>
                        <CardOverlayDetails>
                          <p dangerouslySetInnerHTML={{
                            __html:
                              item.description,
                          }}></p>
                        </CardOverlayDetails>
                        <CardOverlayAction>
                          <OverlayViewButton onClick={() => viewDetailPopup(item)}>View Detail</OverlayViewButton>
                          <OverlayApplyNowButton onClick={() => applyNowPopup(item)}>Apply Now</OverlayApplyNowButton>
                        </CardOverlayAction>
                      </CardOverlay>
                    </VacancyCard>
                  )
                }) :
                <React.Fragment>
                  <VacancyCard>
                    <img src={Vacancy1} alt="Vacancy" />
                    <CardOverlay>
                      <h4>Pediatrician</h4>
                      <h5>Full Time - Graduate</h5>
                      <OverlayDivider></OverlayDivider>
                      <CardOverlayDetails>
                        <p>
                          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum. Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum.
                          Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum .
                        </p>
                      </CardOverlayDetails>
                      <CardOverlayAction>
                        <OverlayViewButton >View Detail</OverlayViewButton>
                        <OverlayApplyNowButton>Apply Now</OverlayApplyNowButton>
                      </CardOverlayAction>
                    </CardOverlay>
                  </VacancyCard>
                  <VacancyCard>
                    <img src={Vacancy2} alt="Vacancy" />
                    <CardOverlay>
                      <h4>Radiologist</h4>
                      <h5>Full Time - Graduate</h5>
                      <OverlayDivider></OverlayDivider>
                      <CardOverlayDetails>
                        <p>
                          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum. Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum.
                          Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum  Lorem ipsum .
                        </p>
                      </CardOverlayDetails>
                      <CardOverlayAction>
                        <OverlayViewButton >View Detail</OverlayViewButton>
                        <OverlayApplyNowButton >Apply Now</OverlayApplyNowButton>
                      </CardOverlayAction>
                    </CardOverlay>
                  </VacancyCard>
                </React.Fragment>
            }
          </VacancyDescription>

        </Vacancy>
      </VacancySection>
      <Modal ref={viewVacancyDetailModal}>
        <ModalHeader title={details.title}></ModalHeader>
        <ModalBody>
          <VacancyDetailModalWrap>
            <VacancyDetailBannerGrid>
              <VacancyDetailBannerGridItem>
                <VacancyDetailBannerCover>
                  <img src={details.thumbnail && details.thumbnail !== "" ? details.thumbnail : Vacancy1} alt="Vacancy" />
                </VacancyDetailBannerCover>
              </VacancyDetailBannerGridItem>
              <VacancyDetailBannerGridItem>
                <ul>
                  <li>
                    <h6 title="Vacancy Type">Vacancy Type</h6>
                    <p>{details.position}</p>
                  </li>
                  <li>
                    <h6 title="No. Of Position">No. Of Position</h6>
                    <p>{details.noOfPosition}</p>
                  </li>
                  <li>
                    <h6 title="Min. Experience">Min. Experience</h6>
                    <p>{details.experience}</p>
                  </li>
                  <li>
                    <h6 title="Annual Salary">Annual Salary</h6>
                    <p> ({details.currencyType}){details.annualSalary}</p>
                  </li>
                  <li>
                    <h6 title="Min. Qualification">Min. Qualification</h6>
                    <p>{details.qualification}</p>
                  </li>
                  {details.lastApplyDate ? <li>
                    <h6 title="Last date to apply">Last date to apply</h6>
                    <p>
                      {moment(details.lastApplyDate).format("DD MMM. YYYY")}</p>
                  </li> : ""}
                </ul>
                <div className="VD-ActionSection mt-20">
                  <button
                    onClick={() => applyNowPopup(details)}
                    className="button button-base btn-sm"
                    type="button"
                  >
                    Apply Now
                  </button>
                  <>
                    {details.fileUpload &&details.fileUpload.src && (
                      <a
                        href={details.fileUpload.src}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="button btn-o-mgray btn-sm base"
                      >
                        Download Job Description
                      </a>
                    )}
                  </>
                </div>
              </VacancyDetailBannerGridItem>
            </VacancyDetailBannerGrid>

            <VacancyDetailDescription>
              <VacancyDetailDescriptionItem>
                <h6>Job Description</h6>
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
              </VacancyDetailDescriptionItem>
              <VacancyDetailDescriptionItem>
                <h6>Key Roles & Responsibility</h6>
                <FormatText text={details.keyRoles ? details.keyRoles : ""}>
                  {({ formatedText }) => (
                    <p className='sun-editor-output'
                      dangerouslySetInnerHTML={{ __html: formatedText }}
                    ></p>
                  )}
                </FormatText>
              </VacancyDetailDescriptionItem>
            </VacancyDetailDescription>
          </VacancyDetailModalWrap>
        </ModalBody>
        <ModalFooter></ModalFooter>
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