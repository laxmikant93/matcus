/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
// import DefaultImage from "../Admissions.png"
import DefaultImage1 from "./defaultImage1.png"
import DefaultImage2 from "./defaultImage2.svg"
import Modal from '../../../CommonComponent/Modal/index';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import ModalFooter from '../../../CommonComponent/Modal/ModalFooter';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const AdmissionSection = styled.div`
padding: 40px 0;
`;
const Admission = styled.div`

`;
const AdmissionHead = styled.div`
margin-bottom: ${({ theme }) => theme.Admission.AdmissionPage.AdmissionHead.MarginBottom};
display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Admission.AdmissionPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionPage.h2.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Admission.AdmissionPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Admission.AdmissionPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Admission.AdmissionPage.h2.Alignment};
color: ${({ theme }) => theme.Admission.AdmissionPage.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.h3.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.Admission.AdmissionPage.h3.Color};
  text-align: ${({ theme }) => theme.Admission.AdmissionPage.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Admission.AdmissionPage.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Admission.AdmissionPage.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Admission.AdmissionPage.BorderBottom.BottomSpace};
  }
  }
`;
const AdmissionDescription = styled.div`
display: grid;
grid-template-columns:  repeat(auto-fit, minmax(400px, 1fr));
gap:30px;
`;
const AdmissionCard = styled.figure`
width: 100%;
height: 401px;
position: relative;
img{
object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 24px;
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
${AdmissionCard}:hover & {
  height: 100%;
  transition: all 0.35s ease-in-out 0s;
 background: linear-gradient(180deg, rgba(234,234,234,0.8) 0%, #EAEAEA 80.51%);
}
h6{
  font-style: normal;
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.h6.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.h6.LineHeight};
  color: ${({ theme }) => theme.Admission.AdmissionPage.h6.Color};
position: relative;
padding-bottom: 10px;
&::after{
  width: 40%;
height: 2px;
background: ${({ theme }) => theme.Admission.AdmissionPage.h6.Color};
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
  font-style: normal;
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.p.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.p.LineHeight};
  color: ${({ theme }) => theme.Admission.AdmissionPage.p.Color};
}
`;

const CardOverlayAction = styled.div`
margin-top: 24px;
display: flex;
gap: 20px;
align-items: center;
`;
const OverlayDownloadButton = styled.button`
font-style: normal;
font-weight: ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.LineHeight};
background: ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.Background};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.BorderColor};
border-radius: ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.Color};
padding: ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.OverlayDownloadButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const OverlayViewButton = styled.button`
font-style: normal;
font-weight: ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.LineHeight};
background: ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.Background};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.BorderColor};
border-radius: ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.Color};
padding: ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.OverlayViewButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const ViewDetailAdmissionModalBody = styled.div`

`;
const AdmissionModalDetails = styled.div`
display: grid;
grid-template-columns: 300px 1fr;
gap: 50px;
`;
const AdmissionModalDetailsCover = styled.div`
img{
  width: 100%;
  border-radius: 16px;
  height: 260px;
  object-fit: cover;
}
`;
const AdmissionModalDetailsList = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 10px;
`;
const AdmissionModalDetailsListItem = styled.div`
p{
  font-style: normal;
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LineHeight};
  color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Color};
  &:last-child{
font-weight: 600;
  }
}
`;

const AdmissionModalDetailsAction = styled.div`
display: flex;
align-items: center;
gap: 10px;
margin-top: 30px;
  `;
const ApplyNowButton = styled.button`
display: block;
font-style: normal;
font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.LineHeight};
letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.LetterSpacing};
background: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.Background};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.BorderColor};
border-radius: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.Color};
padding: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.ApplyNowButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
  `;
const DownloadFeeStructureButton = styled.button`
display: block;
font-style: normal;
font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.LineHeight};
letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.LetterSpacing};
background: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.Background};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.BorderColor};
border-radius: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.Color};
padding: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadFeeStructureButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
  `;
const DownloadBrochureButton = styled.button`
display: block;
font-style: normal;
font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.LineHeight};
letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.LetterSpacing};
background: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.Background};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.BorderColor};
border-radius: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.Color};
padding: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.DownloadBrochureButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
  `;

const Description = styled.div`
  margin-top: 3rem;
  h6{
  font-style: normal;
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.LineHeight};
  text-align: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.Alignment};
  color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.Color};
  }
  p{
    margin-top: 5px;
    font-style: normal;
    font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontWeight};
    font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontSize};
    line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LineHeight};
    text-align: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Alignment};
    color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Color};
  }
  `;
const TermsAndCondition = styled.div`
  margin-top: 3rem;
  h6{
  font-style: normal;
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.LineHeight};
  text-align: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.Alignment};
  color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.Color};
  }
  `;
const TermsAndConditionList = styled.ul`
  padding-left: 20px;
  margin-top: 5px;
  `;
const TermsAndConditionItem = styled.li`
  list-style-type: decimal;
  font-style: normal;
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LineHeight};
  text-align: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Alignment};
  color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Color};
  `;

const AdmissionPage = () => {
  const viewAdmissionDetailModal = useRef(null)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  return (
    <Container>
      <AdmissionSection>
        <Admission>
          <AdmissionHead>
            <h2>{(subheadersData && subheadersData['admissionhead']) || "Admissions"}</h2>
            <h3>{(subheadersData && subheadersData['admissionsubhead']) || ""}</h3>

          </AdmissionHead>
          <AdmissionDescription>
            <AdmissionCard>
              <img src={DefaultImage1} alt="Admission" />
              <CardOverlay>

                <h6>Cultural Fest on 25th Feb?</h6>
                <CardOverlayDetails>
                  <p>Lörem ipsum spest moras terakade simonade. Nesk
                    lukrod suprack fiss. Osk vögetyck. Cirkulent megakrati kvasir.
                  </p>
                  <p>
                    Dining pock, och prefögisk. Saligt tesade, med krora sass megans. Bespektigt mifism cancelkultur yliga. Öktig astrokemi.
                    Lament lan nyras i fuvalagt esk. Senera speren, innan myr i dians nebingen.
                  </p>
                  <p>
                    Bens sepöskade prerågen. Antis pepobelt antesäl rera.
                  </p>
                  <p>
                    Böpreledes mytokemi. Spenade nimosäska och öng. Sev agisk, i saning jag sul mins. Krovis repiras, bioskapet. </p>
                </CardOverlayDetails>
                <CardOverlayAction>
                  <OverlayViewButton onClick={() => viewAdmissionDetailModal.current.open()}>View Detail</OverlayViewButton>
                  <OverlayDownloadButton>Download File</OverlayDownloadButton>
                </CardOverlayAction>
              </CardOverlay>
            </AdmissionCard>
            <AdmissionCard>
              <img src={DefaultImage2} alt="Admission" />
              <CardOverlay>

                <h6>List of Holidays</h6>
                <CardOverlayDetails>
                  <p>Lörem ipsum spest moras terakade simonade. Nesk
                    lukrod suprack fiss. Osk vögetyck. Cirkulent megakrati kvasir.
                  </p>
                  <p>
                    Dining pock, och prefögisk. Saligt tesade, med krora sass megans. Bespektigt mifism cancelkultur yliga. Öktig astrokemi.
                    Lament lan nyras i fuvalagt esk. Senera speren, innan myr i dians nebingen.
                  </p>
                  <p>
                    Bens sepöskade prerågen. Antis pepobelt antesäl rera.
                  </p>
                  <p>
                    Böpreledes mytokemi. Spenade nimosäska och öng. Sev agisk, i saning jag sul mins. Krovis repiras, bioskapet. </p>
                </CardOverlayDetails>
                <CardOverlayAction>
                  <OverlayViewButton>View Detail</OverlayViewButton>
                  <OverlayDownloadButton>Download File</OverlayDownloadButton>
                </CardOverlayAction>
              </CardOverlay>
            </AdmissionCard>
          </AdmissionDescription>
        </Admission>
      </AdmissionSection>
      <Modal ref={viewAdmissionDetailModal}>
        <ModalHeader title="Admission Open - Class X"></ModalHeader>
        <ModalBody>
          <ViewDetailAdmissionModalBody>
            <AdmissionModalDetails>
              <AdmissionModalDetailsCover>
                <img src={DefaultImage1} alt="Admission" />
              </AdmissionModalDetailsCover>
              <AdmissionModalDetailsList>
                <AdmissionModalDetailsListItem>
                  <p>Session For</p>
                  <p>2021 - 2022</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>No. of Seat</p>
                  <p>45</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Minimum Age</p>
                  <p>10 years</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Course Fees</p>
                  <p>14000 (INR)</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Course/Classroom</p>
                  <p>For Class 5th to 10th</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Minimum Qualification</p>
                  <p>Not Applicable</p>
                </AdmissionModalDetailsListItem>
                <AdmissionModalDetailsListItem>
                  <p>Last Date to Apply</p>
                  <p>25 Aug. 2022</p>
                </AdmissionModalDetailsListItem>
              </AdmissionModalDetailsList>
            </AdmissionModalDetails>
            <AdmissionModalDetailsAction>
              <ApplyNowButton type='button'>Apply Now</ApplyNowButton>
              <DownloadFeeStructureButton type='button'>Download Fee Structure</DownloadFeeStructureButton>
              <DownloadBrochureButton type='button'>Download Brochure</DownloadBrochureButton>
            </AdmissionModalDetailsAction>
            <Description>
              <h6>Fee Description</h6>
              <p>
                Lörem ipsum tresk nist: mivuning gun pede. Dist lisången, benade, och gin nifänade.
                Vasyment vint då semiskade. Masat onera antining .
                Anteligen heterod. Paraligen lask nysåvis.
                Tide kav egogasare. Monotåligen megatos treriv segaren. Jorar megaling. Kal makron.
              </p>
            </Description>
            <TermsAndCondition>
              <h6>Terms & Conditions</h6>
              <TermsAndConditionList>
                <TermsAndConditionItem>Lörem ipsum tresk nist: mivuning gun pede. Dist lisången, benade, och gin nifänade.</TermsAndConditionItem>
                <TermsAndConditionItem>Lörem ipsum tresk nist: mivuning gun pede. Dist lisången, benade, och gin nifänade.</TermsAndConditionItem>
                <TermsAndConditionItem>Lörem ipsum tresk nist: mivuning gun pede. Dist lisången, benade, och gin nifänade.</TermsAndConditionItem>
                <TermsAndConditionItem>Lörem ipsum tresk nist: mivuning gun pede. Dist lisången, benade, och gin nifänade.</TermsAndConditionItem>
              </TermsAndConditionList>
            </TermsAndCondition>
          </ViewDetailAdmissionModalBody>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </Container>
  )
}

export default AdmissionPage