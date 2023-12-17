/* eslint-disable jsx-a11y/no-distracting-elements */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import Miscellaneous1 from "./miscellaneous-1.jpg"
import Miscellaneous2 from "./miscellaneous-2.jpg"
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";

const MiscellaneousPageSection = styled.div`
margin: 72px 0;
`;
const MiscellaneousPageHead = styled.div`
h2{
  font-weight: ${({ theme }) => theme.MiscellaneousPage.h2.FontWeight};
  font-size: ${({ theme }) => theme.MiscellaneousPage.h2.FontSize};
  line-height: ${({ theme }) => theme.MiscellaneousPage.h2.LineHeight};
  font-style: ${({ theme }) => theme.MiscellaneousPage.h2.FontStyle};
  font-family: ${({ theme }) => theme.MiscellaneousPage.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.MiscellaneousPage.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.MiscellaneousPage.h2.Alignment};
  text-transform: ${({ theme }) => theme.MiscellaneousPage.h2.TextTransform};
  color: ${({ theme }) => theme.MiscellaneousPage.h2.Color};
  }
  h3{
  font-weight: ${({ theme }) => theme.MiscellaneousPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.MiscellaneousPage.h3.FontSize};
  line-height: ${({ theme }) => theme.MiscellaneousPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.MiscellaneousPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.MiscellaneousPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.MiscellaneousPage.h3.LetterSpacing};
  text-align: ${({ theme }) => theme.MiscellaneousPage.h3.Alignment};
  text-transform: ${({ theme }) => theme.MiscellaneousPage.h3.TextTransform};
  color: ${({ theme }) => theme.MiscellaneousPage.h3.Color};
  }
`;
const MiscellaneousPageDescription = styled.div`
display: grid;
grid-template-columns:  repeat(2, 1fr);
gap:30px;
margin-top: 48px;
@media screen and (max-width: 768px) {
  grid-template-columns:  1fr;
}
`;
const MiscellaneousCard = styled.figure`
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
background: ${({ theme }) => theme.MiscellaneousPage.CardOverlay.Background};
transition: all 0.35s ease-in-out 0s;
overflow: hidden;
cursor: pointer;
display: flex;
flex-direction: column;
justify-content: flex-end;
${MiscellaneousCard}:hover & {
  
justify-content:center;
  height: 100%;
  transition: all 0.35s ease-in-out 0s;
  background: ${({ theme }) => theme.MiscellaneousPage.CardOverlay.Hover.Background};
 -webkit-transition-duration: 700ms;
 -moz-transition-duration: 700ms;
 -o-transition-duration: 700ms;
 transition-duration: 700ms;
}

h6{
  font-weight: ${({ theme }) => theme.MiscellaneousPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.MiscellaneousPage.h6.FontSize};
  line-height: ${({ theme }) => theme.MiscellaneousPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.MiscellaneousPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.MiscellaneousPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.MiscellaneousPage.h6.LetterSpacing};
  text-align: ${({ theme }) => theme.MiscellaneousPage.h6.Alignment};
  text-transform: ${({ theme }) => theme.MiscellaneousPage.h6.TextTransform};
  color: ${({ theme }) => theme.MiscellaneousPage.h6.Color};
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
  font-weight: ${({ theme }) => theme.MiscellaneousPage.p.FontWeight};
  font-size: ${({ theme }) => theme.MiscellaneousPage.p.FontSize};
  line-height: ${({ theme }) => theme.MiscellaneousPage.p.LineHeight};
  font-style: ${({ theme }) => theme.MiscellaneousPage.p.FontStyle};
  font-family: ${({ theme }) => theme.MiscellaneousPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.MiscellaneousPage.p.LetterSpacing};
  color: ${({ theme }) => theme.MiscellaneousPage.p.Color};
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

font-weight: ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.FontWeight};
font-size: ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.FontSize};
line-height: ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.LineHeight};
background: ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.Background};
border: 1px solid ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.BorderColor};
border-radius: ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.BorderRadius};
color: ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.Color};
padding: ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.PaddingY} ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.Hover.Background};
color: ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.MiscellaneousPage.OverlayDownloadButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const MiscellaneousPage = () => {
  const { announcementData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { NoticeBoardData } = useSelector((state) => state.serviceTemplate.getTemplate.data);
  const handleDownload = (item) => {
    window.open(item.attachment, '_blank');
  }

  return (
    <Container>
      <MiscellaneousPageSection>
        <MiscellaneousPageHead>
          <h2>Miscellaneous</h2>
          <h3>Something extra</h3>
          {/* <p>{(subheadersData && subheadersData['announcementsubhead']) || "Announcements"}</p> */}

        </MiscellaneousPageHead>
        <MiscellaneousPageDescription>
          {NoticeBoardData && NoticeBoardData.length ?
            NoticeBoardData.map((item, key) => {
              return (
                <MiscellaneousCard key={key}>
                  <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} alt="MiscellaneousPage" />
                  <CardOverlay>
                    <h6>{item.title}</h6>
                    <CardOverlayDetails>
                      <p dangerouslySetInnerHTML={{
                        __html:
                          item.description,
                      }}></p>
                    </CardOverlayDetails>
                    <CardOverlayAction>
                      {item.attachment && item.attachment !== "" ?
                        <OverlayDownloadButton
                          onClick={() => handleDownload(item)}>
                          Download File
                        </OverlayDownloadButton>
                        : ""}
                    </CardOverlayAction>
                  </CardOverlay>
                </MiscellaneousCard>
              );
            })
            :
            <>
              <MiscellaneousCard>
                <img src={Miscellaneous1} alt="MiscellaneousPage" />
                <CardOverlay>
                  <h6>New Announcement</h6>
                  <CardOverlayDetails>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                  </CardOverlayDetails>
                </CardOverlay>
              </MiscellaneousCard>
              <MiscellaneousCard>
                <img src={Miscellaneous2} alt="Announcement" />
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
              </MiscellaneousCard>
            </>
          }
        </MiscellaneousPageDescription>

      </MiscellaneousPageSection>
    </Container >
  )
}

export default MiscellaneousPage