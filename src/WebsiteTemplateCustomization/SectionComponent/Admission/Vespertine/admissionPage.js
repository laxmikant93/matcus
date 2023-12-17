/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import DefaultImage from "../Admissions.png"
import DefaultImage1 from "./defaultImage1.png"
// import DefaultImage2 from "./defaultImage2.svg"
import Modal from '../../../CommonComponent/Modal/index';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import ModalFooter from '../../../CommonComponent/Modal/ModalFooter';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import ApplyAdmission from '../../../../InstituteWebsite/ApplyAdmission';
import ImageViewer from '../../../../Common/ImageViewer';

const AdmissionPageSection = styled.div`
padding: 40px 0;
`;
// const AdmissionPage = styled.div`

// `;
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
grid-template-columns:  repeat(2, 1fr);
gap:30px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  }
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
cursor: pointer;
position: absolute;
bottom: 0;
border-radius: 24px;
padding: 32px;
width: 100%;
height: 25%;
background: linear-gradient(180deg, rgba(234,234,234,0.8) 0%, #EAEAEA 80.51%);
transition: all 0.35s ease-in-out 0s;
overflow: hidden;
${AdmissionCard}:hover & {
 height: 100%;
 transition: all 0.35s ease-in-out 0s;
 background: linear-gradient(180deg, rgba(234,234,234,0.8) 0%, #EAEAEA 80.51%);
 overflow-y:auto;
 h6{
  -webkit-line-clamp: initial;  
 }
}
h6{
  
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.h6.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.Admission.AdmissionPage.h6.Color};
  position: relative;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
  },
`;

const Divider = styled.div`
width: 40%;
height: 2px;
background: ${({ theme }) => theme.Admission.AdmissionPage.h6.Color};
margin-bottom: 10px;
`;


const CardOverlayDetails = styled.div`

p{
  
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.p.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.p.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.p.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.p.LetterSpacing};
  color: ${({ theme }) => theme.Admission.AdmissionPage.p.Color};
  // display: -webkit-box;
  // -webkit-line-clamp: 8;
  // -webkit-box-orient: vertical;
  // overflow: hidden;
}
`;

const CardOverlayAction = styled.div`
margin-top: 24px;
display: flex;
gap: 20px;
align-items: center;
@media screen and (max-width: 768px) {
 display: grid;
 grid-template-column: 1fr;
}
`;
const OverlayDownloadButton = styled.button`

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

@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
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
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const AdmissionModalDetailsListItem = styled.div`
p{
  
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LetterSpacing};
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

@media screen and (max-width: 768px) {
  flex-direction: column;
  align-items: flex-start;
}
  `;
const ApplyNowButton = styled.button`
display: block;

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
  
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.LetterSpacing};
  text-align: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.Alignment};
  color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.Color};
  }
  p{
    margin-top: 5px;
    
    font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontWeight};
    font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontSize};
    line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LineHeight};    
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LetterSpacing};
    text-align: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Alignment};
    color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Color};
  }
  `;
const TermsAndCondition = styled.div`
  margin-top: 3rem;
  h6{
  
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.LetterSpacing};
  text-align: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.Alignment};
  color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.h6.Color};
  }
  p{
    margin-top: 5px;
    
    font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontWeight};
    font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontSize};
    line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LineHeight};    
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LetterSpacing};
    text-align: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Alignment};
    color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Color};
  }
  `;
const TermsAndConditionList = styled.ul`
  padding-left: 20px;
  margin-top: 5px;
  `;
const TermsAndConditionItem = styled.li`
  list-style-type: decimal;
  
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.LetterSpacing};
  text-align: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Alignment};
  color: ${({ theme }) => theme.Admission.AdmissionPage.ViewDetailAdmissionModalBody.p.Color};
  `;

const AdmissionPage = () => {
  const viewAdmissionDetailModal = useRef(null)
  const { admissionsData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [admissionData, setAdmissionData] = useState("")
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  const [applyPopup, setApplyPopup] = useState(false)
  const handleOpenPopup = (item) => {
    viewAdmissionDetailModal.current.open()
    setAdmissionData(item)
  }
  const closeAdmisisonApply = () => {
    setApplyPopup(!applyPopup)
  }
  const applyNow = () => {
    viewAdmissionDetailModal.current.close()
    setApplyPopup(!applyPopup)
  }
  const downloadBrochure = () => {
    window.open(admissionData.prospectus?.src, '_blank');
  }
  const downloadFeeStructure = () => {
    window.open(admissionData.feeStructure?.src, '_blank');
  }
  const handleDownload = (item) => {
    window.open(item.prospectus?.src, '_blank')
  }
  return (
    <Container>
      <AdmissionPageSection>
        {/* <AdmissionPage> */}
        <AdmissionHead>
          <h2>{(subheadersData && subheadersData['admissionhead']) || "Admissions"}</h2>
          <h3>{(subheadersData && subheadersData['admissionsubhead']) || ""}</h3>
        </AdmissionHead>
        <AdmissionDescription>
          {
            admissionsData.length ?
              admissionsData.map((item, key) => {
                return (
                  <AdmissionCard key={key}>
                    <ImageViewer object={item.thumbnail} defaultImage={DefaultImage}/>
                    {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} alt="Admission" /> */}
                    <CardOverlay>
                      <h6>{item.title}</h6>
                      <Divider />
                      <CardOverlayDetails>
                        <p dangerouslySetInnerHTML={{
                          __html:
                            item.description,
                        }}></p>
                      </CardOverlayDetails>
                      <CardOverlayAction>
                        <OverlayViewButton onClick={() => handleOpenPopup(item)}>View Detail</OverlayViewButton>
                        {item.prospectus !== "" && item.prospectus?.src ?
                          <OverlayDownloadButton onClick={() => handleDownload(item)}>Download File</OverlayDownloadButton>
                          : ""
                        }

                      </CardOverlayAction>
                    </CardOverlay>
                  </AdmissionCard>
                )
              }) :
              <AdmissionCard>
                <img src={DefaultImage1} alt="Admission" />
                <CardOverlay>
                  <h6>Lorem ipsum</h6>
                  <CardOverlayDetails>
                    <p>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                  </CardOverlayDetails>
                </CardOverlay>
              </AdmissionCard>
          }

        </AdmissionDescription>
      </AdmissionPageSection>
      <Modal ref={viewAdmissionDetailModal}>
        <ModalHeader title={admissionData.title}></ModalHeader>
        <ModalBody>
          <ViewDetailAdmissionModalBody>
            <AdmissionModalDetails>
              <AdmissionModalDetailsCover>
                <img src={admissionData.thumbnail && admissionData.thumbnail !== "" ? admissionData.thumbnail : DefaultImage} alt="Admission" />
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
                {admissionData.courseFee &&
                  <AdmissionModalDetailsListItem>
                    <p>Course Fees</p>
                    <p>{admissionData.courseFee} ({admissionData.currencyType})</p>
                  </AdmissionModalDetailsListItem>
                }
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
              {admissionData.feeStructure !== "" && admissionData.feeStructure ?
                <DownloadFeeStructureButton type='button' onClick={() => downloadFeeStructure()} >Download Fee Structure</DownloadFeeStructureButton>
                : ""
              }
              {admissionData.prospectus !== "" && admissionData.prospectus ?
                <DownloadBrochureButton type='button' onClick={() => downloadBrochure()} >Download Brochure</DownloadBrochureButton>
                : ""
              }


            </AdmissionModalDetailsAction>
            <Description>
              <h6>Course Description</h6>
              {/* <p>
                {admissionData.description}
              </p> */}
              <p dangerouslySetInnerHTML={{
                __html:
                  admissionData.description,
              }}></p>
            </Description>
            <TermsAndCondition>
              <h6>Admission Process</h6>
              <p dangerouslySetInnerHTML={{
                __html:
                  admissionData.process,
              }}></p>
              {/* <p> {admissionData.process}</p> */}

            </TermsAndCondition>
          </ViewDetailAdmissionModalBody>
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
    </Container >
  )
}

export default AdmissionPage