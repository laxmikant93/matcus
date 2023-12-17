/* eslint-disable jsx-a11y/no-distracting-elements */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import Default from "../Admissions.png"
import Announcement1 from "./announcement-1.jpg"
import Announcement2 from "./announcement-2.jpg"
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";

const AnnouncementSection = styled.div`
margin: 72px 0;
`;
const Announcement = styled.div`

`;
const AnnouncementHead = styled.div`
h2{
  font-weight: ${({ theme }) => theme.AnnouncementPage.h2.FontWeight};
  font-size: ${({ theme }) => theme.AnnouncementPage.h2.FontSize};
  line-height: ${({ theme }) => theme.AnnouncementPage.h2.LineHeight};
  font-style: ${({ theme }) => theme.AnnouncementPage.h2.FontStyle};
  font-family: ${({ theme }) => theme.AnnouncementPage.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.AnnouncementPage.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.AnnouncementPage.h2.Alignment};
  text-transform: ${({ theme }) => theme.AnnouncementPage.h2.TextTransform};
  color: ${({ theme }) => theme.AnnouncementPage.h2.Color};
  }
  h3{
  font-weight: ${({ theme }) => theme.AnnouncementPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.AnnouncementPage.h3.FontSize};
  line-height: ${({ theme }) => theme.AnnouncementPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.AnnouncementPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.AnnouncementPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.AnnouncementPage.h3.LetterSpacing};
  text-align: ${({ theme }) => theme.AnnouncementPage.h3.Alignment};
  text-transform: ${({ theme }) => theme.AnnouncementPage.h3.TextTransform};
  color: ${({ theme }) => theme.AnnouncementPage.h3.Color};
  }
`;
const AnnouncementDescription = styled.div`
display: grid;
grid-template-columns:  repeat(2, 1fr);
gap:30px;
margin-top: 48px;
@media screen and (max-width: 768px) {
  grid-template-columns:  1fr;
}
`;
const AnnouncementCard = styled.figure`
width: 100%;
height: 373px;
position: relative;
img{
object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}


`;
const CardOverlay = styled.figcaption`
position: absolute;
bottom: 0;
border-radius: 4px;
padding: 16px 24px;
width: 100%;
height: 100%;
background: ${({ theme }) => theme.AnnouncementPage.CardOverlay.Background};
transition: all 0.35s ease-in-out 0s;
overflow: hidden;
cursor: pointer;
display: flex;
flex-direction: column;
justify-content: flex-end;
${AnnouncementCard}:hover & {
  
justify-content:center;
  height: 100%;
  transition: all 0.35s ease-in-out 0s;
  background: ${({ theme }) => theme.AnnouncementPage.CardOverlay.Hover.Background};
 -webkit-transition-duration: 700ms;
 -moz-transition-duration: 700ms;
 -o-transition-duration: 700ms;
 transition-duration: 700ms;
}
h6{
  font-weight: ${({ theme }) => theme.AnnouncementPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.AnnouncementPage.h6.FontSize};
  line-height: ${({ theme }) => theme.AnnouncementPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.AnnouncementPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.AnnouncementPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.AnnouncementPage.h6.LetterSpacing};
  text-align: ${({ theme }) => theme.AnnouncementPage.h6.Alignment};
  text-transform: ${({ theme }) => theme.AnnouncementPage.h6.TextTransform};
  color: ${({ theme }) => theme.AnnouncementPage.h6.Color};
  }
`;

const CardOverlayDetails = styled.div`

display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
${CardOverlay}:hover & {
  transition: all 0.35s ease-in-out 0s;
  -webkit-line-clamp: 8;
  -webkit-transition-duration: 700ms;
  -moz-transition-duration: 700ms;
  -o-transition-duration: 700ms;
  transition-duration: 700ms;
}
p{
  font-weight: ${({ theme }) => theme.AnnouncementPage.p.FontWeight};
  font-size: ${({ theme }) => theme.AnnouncementPage.p.FontSize};
  line-height: ${({ theme }) => theme.AnnouncementPage.p.LineHeight};
  font-style: ${({ theme }) => theme.AnnouncementPage.p.FontStyle};
  font-family: ${({ theme }) => theme.AnnouncementPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.AnnouncementPage.p.LetterSpacing};
  color: ${({ theme }) => theme.AnnouncementPage.p.Color};
}
`;
const CardOverlayAction = styled.div`
margin-top: 24px;
display: none;
${CardOverlay}:hover & {
  display: block;
  -webkit-transition-duration: 700ms;
  -moz-transition-duration: 700ms;
  -o-transition-duration: 700ms;
  transition-duration: 700ms;
}
`;
const OverlayDownloadButton = styled.button`

font-weight: ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.FontWeight};
font-size: ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.FontSize};
line-height: ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.LineHeight};
background: ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.Background};
border: 1px solid ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.BorderColor};
border-radius: ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.BorderRadius};
color: ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.Color};
padding: ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.PaddingY} ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.Hover.Background};
color: ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.AnnouncementPage.OverlayDownloadButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const AnnouncementPage = () => {
  const { announcementData } = useSelector((state) => state.serviceTemplate.getTemplate.data);
  const handleDownload = (item) => {
    window.open(item.attachment?.src, '_blank');
  }
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)

  return (
    <Container>
      <AnnouncementSection>
        <Announcement>
          <AnnouncementHead>
            <h2>{(subheadersData && subheadersData['announcementhead']) || "Announcements"}</h2>
            <h3>{(subheadersData && subheadersData['announcementsubhead']) || "Announcements"}</h3>

            {/* <p>{(subheadersData && subheadersData['announcementsubhead']) || "Announcements"}</p> */}

          </AnnouncementHead>
          <AnnouncementDescription>
            {announcementData && announcementData.length ?
              announcementData.map((item, key) => {
                return (
                  <AnnouncementCard key={key}>
                    <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} alt="Announcement" />
                    <CardOverlay>
                      <h6>{item.title}</h6>
                      <CardOverlayDetails>
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
                );
              })
              :
              <>
                <AnnouncementCard>
                  <img src={Announcement1} alt="Announcement" />
                  <CardOverlay>
                    <h6>New Announcement</h6>
                    <CardOverlayDetails>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      </p>
                    </CardOverlayDetails>
                  </CardOverlay>
                </AnnouncementCard>
                <AnnouncementCard>
                  <img src={Announcement2} alt="Announcement" />
                  <CardOverlay>
                    <h6>New Announcement</h6>
                    <CardOverlayDetails>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      </p>
                    </CardOverlayDetails>
                    <CardOverlayAction>
                      <OverlayDownloadButton>Download File</OverlayDownloadButton>
                    </CardOverlayAction>
                  </CardOverlay>
                </AnnouncementCard>
              </>
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

export default AnnouncementPage