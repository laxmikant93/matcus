/* eslint-disable jsx-a11y/no-distracting-elements */
// import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import Default from "../Admissions.png"
import Default1 from "./defaultImage1.png"
import ImageViewer from '../../../../Common/ImageViewer';
// import Default2 from "./defaultImage2.svg"
const AnnouncementHomePageSection = styled.div`
padding: 20px 0;
`;
const AnnouncementHomePage = styled.div`
`;
const AnnouncementHomePageHead = styled.div`
margin-bottom: 24px;
h2{
font-weight: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontSize};
line-height: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.Alignment};
color: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.Color};
text-transform: uppercase;
}
h3{
  font-weight: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontWeight};
  font-size: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontSize};
  line-height: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.LineHeight};
  font-style: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontStyle};
  font-family: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.Alignment};
  color: ${({ theme }) => theme.Announcement.AnnouncementPage.h2.Color};
text-decoration: underline;
}
`;
const AnnouncementItem = styled.figure`
position: relative;
`;
const AnnouncementImage = styled.div`
width: 100%;
height: 344px;
position: relative;
box-sizing: border-box;
img{
  border-radius: 24px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${'' /* display: block; */}
}

&:hover {
  .description {
    height: 100%;
    top: 0;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  }
}
`;

const Divider = styled.div`
width: 40%;
height: 2px;
background: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.Color};
margin-bottom: 10px;
`

const AnnouncementDescription = styled.div`
margin-top: 22px;
height: 242px;
overflow-y:auto; 
padding-right:8px;
&::-webkit-scrollbar {
    width: 5px;
  }
&::-webkit-scrollbar-thumb {
  border-radius: 10px;
}
p{
  
  color: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.Color};

  

span {
  color: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.Color} !important ;
  font-size: 400;
}
}
`

const AnnouncementCaption = styled.figcaption`
position: absolute;
left: 0px;
right: 0px;
/* top:0px; */
bottom: 0px;
box-sizing: border-box;
/* width: 100%;
height: 100%; */
overflow: hidden;
height: 100px;
background: ${({ theme }) => theme.Announcement.AnnouncementPage.AnnouncementCaption.Background};
border-bottom-left-radius: 24px;
border-bottom-right-radius: 24px;
padding: 24px;

h6{

font-weight: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.FontWeight};
font-size: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.FontSize};
line-height: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.LineHeight};
font-style: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.FontStyle};
font-family: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.LetterSpacing};
text-align: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.Alignment};
color: ${({ theme }) => theme.Announcement.AnnouncementPage.h6.Color};
}
`;

const DownLoadButton = styled.div`
    cursor: pointer;
    font-weight: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.FontWeight};
  font-size: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.FontSize};
  line-height: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.LineHeight};
  background: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Background};
  border: 1px solid ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.BorderColor};
  border-radius: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.BorderRadius};
  color: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Color};
  padding: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.PaddingY} ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.PaddingX};
  width: fit-content;

  &:hover{
    background: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.Background};
  color: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.Color};
  border: 1px solid ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.BorderColor};
  }

`




const AnnouncementPageGrid = styled.div`
display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;
const Announcements = () => {
  const { announcementData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const handleDownload = (item) => {
    window.open(item.attachment?.src, '_blank');
  }
  return (
    <Container>
      <AnnouncementHomePageSection>
        <AnnouncementHomePage>
          <AnnouncementHomePageHead>
            {/* <h2>Announcement</h2> */}
            <h2>{(subheadersData && subheadersData['announcementhead']) || "Announcements"}</h2>
            <h3>{(subheadersData && subheadersData['announcementsubhead']) || ""}</h3>
          </AnnouncementHomePageHead>
          <AnnouncementPageGrid>
            {
              announcementData && announcementData.length
                ? announcementData.map((item, key) => {
                  return (
               
                      <AnnouncementImage >
                        <ImageViewer object={item.thumbnail} defaultImage={Default} />
                        {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : Default} alt="" /> */}
                        <AnnouncementCaption className='description'>
                        <h6>{item.title} </h6>
                        <Divider />
                        {item.attachment && item.attachment !== "" ?
                        <DownLoadButton onClick={() => handleDownload(item)}>DownLoad File</DownLoadButton>:""}
                        <AnnouncementDescription>
                        <p dangerouslySetInnerHTML={{
                            __html:
                              item.description,
                          }}></p>
                          </AnnouncementDescription>
                      </AnnouncementCaption>
                      </AnnouncementImage>
                    
                
                  )
                }) :
                <AnnouncementItem>
                  <AnnouncementImage>
                    <img src={Default1} alt="" />
                  </AnnouncementImage>
                  <AnnouncementCaption>
                    <h6>Annual Function on 25th June </h6>
                  </AnnouncementCaption>
                </AnnouncementItem>
              // <AnnouncementItem>
              //   <AnnouncementImage>
              //     <img src={Default2} alt="" />
              //   </AnnouncementImage>
              //   <AnnouncementCaption>
              //     <h6>Parent Teacher Meeting on 5th June </h6>
              //   </AnnouncementCaption>
              // </AnnouncementItem>
            }
          </AnnouncementPageGrid>
        </AnnouncementHomePage>
      </AnnouncementHomePageSection>
    </Container>
  )
}

export default Announcements