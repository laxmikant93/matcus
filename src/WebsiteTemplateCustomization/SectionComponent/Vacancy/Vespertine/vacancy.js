import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import DefaultImage1 from "./defaultImage1.png"
import DefaultImage from "../Admissions.png"
// import DefaultImage2 from "./defaultImage2.svg"
import Modal from '../../../CommonComponent/Modal/index';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import ModalFooter from '../../../CommonComponent/Modal/ModalFooter';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ApplyJobVacancy from '../../../../InstituteWebsite/ApplyJobVacancy';
import FormatText from '../../../../Common/FormatText';
import ImageViewer from '../../../../Common/ImageViewer';
const VacancySection = styled.div`
padding: 40px 0;
`;
const Vacancy = styled.div`

`;
const VacancyHead = styled.div`
margin-bottom: ${({ theme }) => theme.Vacancy.VacancyPage.VacancyHead.MarginBottom};

display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyPage.h2.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Vacancy.VacancyPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Vacancy.VacancyPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Vacancy.VacancyPage.h2.Alignment};
color: ${({ theme }) => theme.Vacancy.VacancyPage.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyPage.h3.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyPage.h3.Color};
  text-align: ${({ theme }) => theme.Vacancy.VacancyPage.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Vacancy.VacancyPage.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Vacancy.VacancyPage.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Vacancy.VacancyPage.BorderBottom.BottomSpace};
  }
  }
`;
const VacancyDescription = styled.div`
display: grid;
grid-template-columns:  repeat(auto-fill, minmax(400px, 1fr));
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
  border-radius: 24px;
}
@media screen and (max-width: 768px) {
  height: 300px;
  }

`;
const CardOverlay = styled.figcaption`
position: absolute;
bottom: 0;
border-radius: 24px;
padding: 32px;
width: 100%;
height: 25%;
background: linear-gradient(180deg, rgba(234,234,234,0.8) 0%, #EAEAEA 80.51%);
transition: all 0.35s ease-in-out 0s;
overflow: hidden;
cursor: pointer;
${VacancyCard}:hover & {
  height: 100%;
  transition: all 0.35s ease-in-out 0s;
 background: linear-gradient(180deg, rgba(234,234,234,0.8) 0%, #EAEAEA 80.51%);
}
h6{
  
  font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyPage.h6.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyPage.h6.Color};
position: relative;
padding-bottom: 10px;
&::after{
  width: 40%;
height: 2px;
background: ${({ theme }) => theme.Vacancy.VacancyPage.h6.Color};
bottom: 5px;
    left: 0;
}
},
`;

const CardOverlayDetails = styled.div`

display: -webkit-box;
-webkit-line-clamp: 8;
-webkit-box-orient: vertical;
overflow: hidden;
p{
  
  font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyPage.p.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.p.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyPage.p.Color};
}
`;

const CardOverlayAction = styled.div`
margin-top: 24px;
display: flex;
gap: 20px;
align-items: center;
`;
const OverlayApplyNowButton = styled.button`

font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.LineHeight};
background: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.Background};
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.BorderColor};
border-radius: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.BorderRadius};
color: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.Color};
padding: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.PaddingY} ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.Hover.Background};
color: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyPage.OverlayApplyNowButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const OverlayViewButton = styled.button`

font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.LineHeight};
background: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.Background};
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.BorderColor};
border-radius: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.BorderRadius};
color: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.Color};
padding: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.PaddingY} ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.Hover.Background};
color: ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Vacancy.VacancyPage.OverlayViewButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const VacancyContentSection = styled.div`
h6{
  font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyPage.h6.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyPage.h6.Color};
}

p{
  font-weight: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyPage.p.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyPage.p.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyPage.p.Color};
}
`;

const VacancyPage = () => {
  const viewVacancyDetailModal = useRef(null)
  const [applyPopup, setApplyPopup] = useState(false)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { vacancyData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
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
            <h2>{(subheadersData && subheadersData['vacancyhead']) || "Vacancy"}</h2>
            <h3>{(subheadersData && subheadersData['vacancysubhead']) || "Vacancy"}</h3>

          </VacancyHead>
          <VacancyDescription>
            {
              vacancyData.length ?
                vacancyData.map((item, key) => {
                  return (
                    <VacancyCard key={key}>
                      <ImageViewer object={item.thumbnail} defaultImage={DefaultImage}/>
                      {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} alt="Vacancy" /> */}
                      <CardOverlay>
                        <h6>{item.title}</h6>
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
                <VacancyCard>
                  <img src={DefaultImage1} alt="vacancy" />
                  <CardOverlay>
                    <CardOverlayDetails>
                      <h6>lorem ipsum</h6>
                    </CardOverlayDetails>
                  </CardOverlay>
                </VacancyCard>
            }
          </VacancyDescription>

        </Vacancy>
      </VacancySection>
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
                {details.lastApplyDate ? <li>
                  <p className="text-xxs">Last date to apply</p>
                  <p className="text-xxs">
                    {details.lastApplyDate ? moment(details.lastApplyDate).format("DD MMM. YYYY") : ""}
                  </p>
                </li> : ""}
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
              {details.fileUpload &&details.fileUpload.src&& (
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
            <VacancyContentSection className="VD-ContentSection mt-20">
              <h6 className="text-sm w-600">Job Description</h6>
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
                  <h6 className="text-sm mt-20">Key Roles & Responsibility</h6>
                  <FormatText text={details.keyRoles}>
                    {({ formatedText }) => (
                      <p className='sun-editor-output'
                        dangerouslySetInnerHTML={{ __html: formatedText }}
                      ></p>
                    )}
                  </FormatText>

                </Fragment>
              )}
            </VacancyContentSection>
          </div>
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
    </Container>
  )
}

export default VacancyPage