/* eslint-disable jsx-a11y/no-distracting-elements */
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppLink from '../../../../Common/AppLink';
import Modal from '../../../CommonComponent/Modal';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { Container } from '../../../CommonComponent/Container.styled'

const FeeStructureHomeHeroSection = styled.div`
padding: 32px 0;
`;
const FeeStructureHomeHero = styled.div`

`;
const FeeStructureHomeHeroHead = styled.div`
margin-bottom: 48px;
display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.Alignment};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.Color};
  text-align: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.BorderBottom.Background};
  bottom: ${({ theme }) => theme.FeeStructure.FeeStructureHero.BorderBottom.BottomSpace};
  }
  }
`;
const FeeStructureHomeHeroList = styled.ul`

`;
const FeeStructureHomeHeroListItem = styled.li`
background: #FFFFFF;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
border-radius: 16px;
padding: 16px 24px 16px 32px;
margin-bottom: 24px;
display: grid;
grid-template-columns: 1fr auto;
align-items: center;
gap: 24px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  justify-content: center;
}
&::before{
  padding-left: 24px;
}
&:last-child{
  margin-bottom:0;
}

h6{
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.Color};
  position: relative;
  &::before{
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.Color};
    left: -12px;
    top: 10px;
  }
}
button{
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.Color};
  border:none;
  background-color:transparent;
  position: relative;
  &::after{
    width: 100%;
    border:none;
    height: 1px;
    background-color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.Color};
    bottom: 0;
    left:0;
  }
}
`;

const ViewMoreFeeStructureHeroButtonSection = styled.div`
display:flex;
align-items:center;
justify-content:center;

`;
const ViewMoreFeeStructureHeroButton = styled.a`
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.LineHeight};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Color};
padding: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.PaddingY} ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.PaddingX};
cursor: pointer;
text-align: center;
margin-top: 32px;
background-color: transparent;
border: none;
&:hover{
border:none;
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const ViewMoreFaqsHeroSection = styled.div`
display: flex;
justify-content: center;
margin-top: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroSection.MarginTop};
}
`;
const ViewMoreFaqsHeroButton = styled.a`

font-weight: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.FontWeight};
font-size: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.FontSize};
line-height: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.LineHeight};
background: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Background};
border: 1px solid ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.BorderColor};
border-radius: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.BorderRadius};
color: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Color};
padding: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.PaddingY} ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Hover.Background};
color: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const DownloadFileButton = styled.button`
display: block;
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.LineHeight};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.LetterSpacing};
background: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.Background};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.BorderColor};
border-radius: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.BorderRadius};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.Color};
padding: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.PaddingY} ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.PaddingX};
cursor: pointer;
margin-top: 32px;
&:hover{
background: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.Hover.Background};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const AnnouncementsHero = () => {
  const announcementRef = useRef(null);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { announcementData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const [announcement, setAnnouncement] = useState("");

  const handleReadMoreButton = (item) => {
    setAnnouncement(item);
    announcementRef.current.open();
  }

  // const closeModal = () => {
  //   ref.current.close();
  //   setAnnouncement("");
  // }

  const handleDownload = () => {
    if (announcement.attachment && announcement.attachment !== "") {
      window.open(announcement.attachment, '_blank');
    }
  }

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/announcements", true))
    }
    else {
      history("/announcements")
    }
  }

  return (
    <Container>
    <FeeStructureHomeHeroSection>
      <FeeStructureHomeHero>
        <FeeStructureHomeHeroHead>
          <h2>{(subheadersData && subheadersData['announcementhead']) || "Announcements"}</h2>

        </FeeStructureHomeHeroHead>
        <FeeStructureHomeHeroList>
          {announcementData.length ? announcementData.slice(0, 5).map((item, key) => {
            return (
              <FeeStructureHomeHeroListItem>
                <h6>{item.title}</h6>
                <button onClick={() => handleReadMoreButton(item)}>Read More</button>
              </FeeStructureHomeHeroListItem>
            );
          })
            :
            <>
              <FeeStructureHomeHeroListItem>
                <h6>Pre-Council Examination 2023 Time Table</h6>
                <AppLink to="">Read More</AppLink>
              </FeeStructureHomeHeroListItem>
              <FeeStructureHomeHeroListItem>
                <h6>Monthly Tuition Fee Notice</h6>
                <AppLink to="">Read More</AppLink>
              </FeeStructureHomeHeroListItem>
              <FeeStructureHomeHeroListItem>
                <h6>Class XI 2nd Monthly Test, 2022 Results</h6>
                <AppLink to="">Read More</AppLink>
              </FeeStructureHomeHeroListItem>
              <FeeStructureHomeHeroListItem>
                <h6>Boarding Points of Private Vehicles</h6>
                <AppLink to="">Read More</AppLink>
              </FeeStructureHomeHeroListItem>
              <FeeStructureHomeHeroListItem>
                <h6>Half Holiday (29th and 30th November, 2022)</h6>
                <AppLink to="">Read More</AppLink>
              </FeeStructureHomeHeroListItem>
            </>
          }
        <ViewMoreFaqsHeroSection>
          <ViewMoreFaqsHeroButton onClick={() => handleViewMoreButton()}>
            View More
          </ViewMoreFaqsHeroButton>
        </ViewMoreFaqsHeroSection>
        </FeeStructureHomeHeroList>
      </FeeStructureHomeHero>
      <Modal ref={announcementRef} ModalsSize={'modal-s'}>
        <ModalHeader title={announcement?.title} />
        <ModalBody>
          <div className='account-wrapper'>
            <div className='accont-text-wrap'>
              <p dangerouslySetInnerHTML={{
                __html:
                  announcement?.description,
              }}></p>
              {/* <p className='accont-text base w-500'>{announcement?.description}</p> */}
            </div>
            <DownloadFileButton  onClick={handleDownload}>Download File</DownloadFileButton>
          </div>
        </ModalBody>
      </Modal>
    </FeeStructureHomeHeroSection>
    {/* <ViewMoreFeeStructureHeroButtonSection>
          <ViewMoreFeeStructureHeroButton onClick={() => handleViewMoreButton()}>
            View More
          </ViewMoreFeeStructureHeroButton>
        </ViewMoreFeeStructureHeroButtonSection> */}
    </Container>
  )
}

export default AnnouncementsHero