/* eslint-disable jsx-a11y/no-distracting-elements */
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import DefaultImage from "../Admissions.png"
import DefaultImage1 from "./defaultImage1.png"
import DefaultImage2 from "./defaultImage2.svg"
import ImageViewer from '../../../../Common/ImageViewer';
const AnnouncementSection = styled.div`
padding: 40px 0;
`;
const Announcement = styled.div`

`;
const AnnouncementHead = styled.div`
margin-bottom: ${({ theme }) => theme.Announcement.AnnouncementPage.AnnouncementHead.MarginBottom};

display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontSize};
line-height: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.Alignment};
color: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.Announcement.AnnouncementPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.Announcement.AnnouncementPage.h3.FontSize};
  line-height: ${({ theme }) => theme.Announcement.AnnouncementPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.Announcement.AnnouncementPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.Announcement.AnnouncementPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.Announcement.AnnouncementPage.h3.Color};
  text-align: ${({ theme }) => theme.Announcement.AnnouncementPage.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Announcement.AnnouncementPage.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Announcement.AnnouncementPage.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Announcement.AnnouncementPage.BorderBottom.BottomSpace};
  }
  }
`;
const AnnouncementDescription = styled.div`
display: grid;
grid-template-columns:  repeat(2, 1fr);
gap:30px;
@media screen and (max-width: 768px) {
  grid-template-columns:  1fr;
}
`;
const AnnouncementCard = styled.figure`
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
${AnnouncementCard}:hover & {
  height: 100%;
  transition: all 0.35s ease-in-out 0s;
  background: linear-gradient(180deg, rgba(234,234,234,0.8) 0%, #EAEAEA 80.51%);
  overflow-y: hidden;

 h6{
  -webkit-line-clamp: initial;  
 }

  p {
    overflow:auto;
  }
 
}
h6{
  
  font-weight: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.FontSize};
  line-height: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.Color};
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
margin-bottom: 6px;
`;

const CardOverlayDetails = styled.div`

// display: -webkit-box;
// -webkit-line-clamp: 8;
// -webkit-box-orient: vertical;
${'' /* height: auto; */}
height: 300px;
overflow-y:auto; 
padding-right:8px;
&.attachment_Active{
  height: 250px;
}
&::-webkit-scrollbar {
    width: 5px;
  }
&::-webkit-scrollbar-thumb {
  border-radius: 10px;
}
p{
  font-weight: ${({ theme }) => theme.Announcement.AnnouncementPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Announcement.AnnouncementPage.p.FontSize};
  line-height: ${({ theme }) => theme.Announcement.AnnouncementPage.p.LineHeight};
  font-style: ${({ theme }) => theme.Announcement.AnnouncementPage.p.FontStyle};
  font-family: ${({ theme }) => theme.Announcement.AnnouncementPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementPage.p.LetterSpacing};
  color: ${({ theme }) => theme.Announcement.AnnouncementPage.p.Color}; 
}
`;

const CardOverlayAction = styled.div`
margin-top: 24px
`;
const OverlayDownloadButton = styled.button`

font-weight: ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.FontWeight};
font-size: ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.FontSize};
line-height: ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.LineHeight};
background: ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.Background};
border: 1px solid ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.BorderColor};
border-radius: ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.BorderRadius};
color: ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.Color};
padding: ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.PaddingY} ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.Hover.Background};
color: ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Announcement.AnnouncementPage.OverlayDownloadButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const Announcements = () => {
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { announcementData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const pushDropDownCheck = useSelector((state) => state.websiteTemplate.pushDropDown.data)
  const handleDownload = (item) => {
    window.open(item.attachment?.src, '_blank');
  }

  var element = document.getElementById(pushDropDownCheck);

useEffect(()=>{
  if(pushDropDownCheck&&element){
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
 
},[pushDropDownCheck,element])
 

  return (
    <Container>
      <AnnouncementSection>
        <Announcement>
          <AnnouncementHead>
            <h2>{(subheadersData && subheadersData['announcementhead']) || "Announcements"}</h2>
            <h3>{(subheadersData && subheadersData['announcementsubhead']) || ""}</h3>

          </AnnouncementHead>
          <AnnouncementDescription>
            {
              announcementData && announcementData.length ?
                announcementData.map((item, key) => {
                  return (
                    <AnnouncementCard key={key}>
                      <ImageViewer object={item.thumbnail} defaultImage={DefaultImage}/>
                      {/* <img id={item._id} src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} alt="Announcement" /> */}
                      <CardOverlay>
                        <h6>{item.title}</h6>
                        <Divider />
                        <CardOverlayDetails className={item.attachment && item.attachment !== "" ? "attachment_Active" : ""}>
                          <p dangerouslySetInnerHTML={{
                            __html:
                              item.description,
                          }}></p>
                        </CardOverlayDetails>
                        <CardOverlayAction>
                          {item.attachment && item.attachment !== "" ? <OverlayDownloadButton onClick={() => handleDownload(item)}>Download File</OverlayDownloadButton> : ""}
                        </CardOverlayAction>
                      </CardOverlay>
                    </AnnouncementCard>
                  )
                }) :
                <AnnouncementCard>
                  <img src={DefaultImage1} alt="Announcement" />
                  <CardOverlay>
                    <h6>New Announcement</h6>
                    <CardOverlayDetails>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      </p>
                    </CardOverlayDetails>
                  </CardOverlay>
                </AnnouncementCard>
            }

            {/* <AnnouncementCard>
              <img src={DefaultImage2} alt="Announcement" />
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
                  <OverlayDownloadButton>Download File</OverlayDownloadButton>
                </CardOverlayAction>
              </CardOverlay>
            </AnnouncementCard> */}
          </AnnouncementDescription>
        </Announcement>
      </AnnouncementSection>
    </Container>
  )
}

export default Announcements