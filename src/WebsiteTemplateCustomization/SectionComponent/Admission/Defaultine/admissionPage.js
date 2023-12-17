/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import DefaultImage from "../Admissions.png"
import DefaultImage1 from "./defaultImage1.png"
import DefaultImage2 from "./defaultImage2.svg"
import Modal from '../../../CommonComponent/Modal/index';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import ModalFooter from '../../../CommonComponent/Modal/ModalFooter';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import { useRef } from 'react';
import moment from 'moment';
import ApplyAdmission from '../../../../InstituteWebsite/ApplyAdmission';
import DefaultImage3 from "./defaultImage3.svg";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ImageViewer from '../../../../Common/ImageViewer';
const AdmissionPageSection = styled.div`
padding: 20px 0;
`;
const AdmissionPageHead = styled.div`
margin-bottom: 48px;
text-align: ${({ theme }) => theme.Admission.AdmissionPage.AdmissionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.Admission.AdmissionPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionPage.h2.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Admission.AdmissionPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Admission.AdmissionPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.h2.LetterSpacing};
color: ${({ theme }) => theme.Admission.AdmissionPage.h2.Color};
text-transform: uppercase;
}
h3{
font-weight: 400;
font-size: 16px;
line-height: 24px;
font-style: '';
font-family: '';
letter-spacing: '';
text-align: center;
color: #4E616B;
text-decoration: underline;
}
`;
const AdmissionPageGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
}
`;
const AdmissionItem = styled.figure`
box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.1);
background: ${({ theme }) => theme.Admission.AdmissionPage.AdmissionItem.Background};
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
padding: ${({ theme }) => theme.Admission.AdmissionPage.AdmissionItemCaption.Padding};
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
},
p{
  
  font-weight: ${({ theme }) => theme.Admission.AdmissionPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionPage.p.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionPage.p.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionPage.p.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionPage.p.LetterSpacing};
  color: ${({ theme }) => theme.Admission.AdmissionPage.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
`;
const ApplyNowButton = styled.a`

font-weight: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.LineHeight};
background: #FFFFFF;
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Background};
border-radius: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Background};
padding: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.PaddingX};
cursor: pointer;
display: inline-block;
margin-top: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
`;
const ViewNowButton = styled.a`

font-weight: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.LineHeight};
background: #FFFFFF;
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Background};
border-radius: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Background};
padding: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.PaddingX};
cursor: pointer;
display: inline-block;
margin-top: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
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
  ${ViewNowButton}:hover & {
    color: ${({ theme }) => theme.Admission.AdmissionHero.ApplyNowButton.Hover.Color};
  }
`;


const AdmissionPage = () => {
  const viewAdmissionDetailModal = useRef(null)
  const { admissionsData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [admissionData, setAdmissionData] = useState("")

  const [applyPopup, setApplyPopup] = useState(false)
  const handleOpenPopup = (item) => {
    viewAdmissionDetailModal.current.open()
    setAdmissionData(item)
  }
  const closeAdmisisonApply = () => {
    setApplyPopup(!applyPopup)
  }
  const applyNow = (item) => {
    viewAdmissionDetailModal.current.close()
    setApplyPopup(!applyPopup)
    setAdmissionData(item)
  }

  return (
    <Container>
      <AdmissionPageSection>
        <AdmissionPageHead>
        <h2>{(subheadersData && subheadersData['admissionhead']) || "Admissions"}</h2>
        <h3>{(subheadersData && subheadersData['admissionsubhead']) || ""}</h3>
        </AdmissionPageHead>
        <AdmissionPageGrid>

          {admissionsData.length ?
            admissionsData.map((item, key) => {
              return (
                <AdmissionItem key={key}>
                  <AdmissionImage>
                    <ImageViewer object={item.thumbnail} defaultImage={DefaultImage}/>
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
                    &nbsp; &nbsp;
                    <ViewNowButton >
                      View Now
                      <NextIcon></NextIcon>
                    </ViewNowButton>
                  </AdmissionItemCaption>
                </AdmissionItem>
              )
            }) :
            <>
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
              <AdmissionItem>
                <AdmissionImage>
                  <img src={DefaultImage1} loading="eager" alt="Admission Us" />
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
            </>
          }

        </AdmissionPageGrid>

      </AdmissionPageSection>
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
    </Container>
  )
}

export default AdmissionPage