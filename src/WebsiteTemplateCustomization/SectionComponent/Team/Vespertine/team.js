/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'

import Team1 from "../../../assets/Vespertine/Team1.svg";
import TeamPreview from "../Teacher.png";
import Team2 from "../../../assets/Vespertine/Team2.svg";
import Team3 from "../../../assets/Vespertine/Team3.svg";
import { useSelector } from 'react-redux';
import ImageViewer from '../../../../Common/ImageViewer';
const TeamSection = styled.div`
padding: 40px 0;
`;
const TeamAlbum = styled.div`

`;
const TeamAlbumHead = styled.div`
margin-bottom: 48px;
display: flex;
align-items: center;
flex-direction: column;
h2{

font-weight: ${({ theme }) => theme.Team.TeamPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamPage.h2.FontSize};
line-height: ${({ theme }) => theme.Team.TeamPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Team.TeamPage.h2.Alignment};
color: ${({ theme }) => theme.Team.TeamPage.h2.Color};
}
h3{
  font-weight: ${({ theme }) => theme.Team.TeamPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.Team.TeamPage.h3.FontSize};
  line-height: ${({ theme }) => theme.Team.TeamPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.Team.TeamPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.Team.TeamPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Team.TeamPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.Team.TeamPage.h3.Color};
  text-align: ${({ theme }) => theme.Team.TeamPage.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Team.TeamPage.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Team.TeamPage.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Team.TeamPage.BorderBottom.BottomSpace};
  }
  }
`;
const TeamAlbumList = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  gap: 30px;
  }
`;
const TeamAlbumCard = styled.div`
border: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.BorderWidth} 
solid ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.BorderColor};
box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.1);
border-radius: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.BorderRadius};
height: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.Height};
position: relative;
cursor: pointer;
img{
width: 100%;
height: 100%;
object-fit: cover;
border-radius: inherit;
position: relative;
display: block;
}
`;

const CardOverlay = styled.figcaption`
position: absolute;
bottom: 0;
width: 100%;
height: 20%;
transition: all 0.35s ease-in-out 0s;
overflow: hidden;
cursor: pointer;
background-color: rgba(255, 255, 255, 0.8);
border-bottom-right-radius: inherit;
border-bottom-left-radius: inherit;

padding: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PaddingY} ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PaddingX};
h4{
  font-weight: ${({ theme }) => theme.Team.TeamPage.h4.FontWeight};
  font-size: ${({ theme }) => theme.Team.TeamPage.h4.FontSize};
  line-height: ${({ theme }) => theme.Team.TeamPage.h4.LineHeight};
  font-style: ${({ theme }) => theme.Team.TeamPage.h4.FontStyle};
  font-family: ${({ theme }) => theme.Team.TeamPage.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Team.TeamPage.h4.LetterSpacing};
  color: ${({ theme }) => theme.Team.TeamPage.h4.Color};
  position: relative;
  // margin-bottom: ${({ theme }) => theme.Team.TeamPage.h4.MarginBottom};
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp:1;
  -webkit-box-orient: vertical;
  overflow: hidden;
 }
 h5{
  font-weight: ${({ theme }) => theme.Team.TeamPage.h5.FontWeight};
  font-size: ${({ theme }) => theme.Team.TeamPage.h5.FontSize};
  line-height: ${({ theme }) => theme.Team.TeamPage.h5.LineHeight};
  font-style: ${({ theme }) => theme.Team.TeamPage.h5.FontStyle};
  font-family: ${({ theme }) => theme.Team.TeamPage.h5.FontFamily};
  letter-spacing: ${({ theme }) => theme.Team.TeamPage.h5.LetterSpacing};
  color: ${({ theme }) => theme.Team.TeamPage.h5.Color};
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp:1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
  }
  ${TeamAlbumCard}:hover & {
    height: 100%;
    transition: all 0.35s ease-in-out 0s;
    background-color: rgba(255, 255, 255, 0.8);
    overflow-y: hidden;
    
  border-radius: 24px;
    p {
      overflow:auto;
    }
  }
`

const CardOverlayDetails = styled.div`
  height: 250px;
  
  p,
  p > div > span{
  
  font-weight: ${({ theme }) => theme.Announcement.AnnouncementPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Announcement.AnnouncementPage.p.FontSize};
  line-height: ${({ theme }) => theme.Announcement.AnnouncementPage.p.LineHeight};
  font-style: ${({ theme }) => theme.Announcement.AnnouncementPage.p.FontStyle};
  font-family: ${({ theme }) => theme.Announcement.AnnouncementPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementPage.p.LetterSpacing};
  color: ${({ theme }) => theme.Team.TeamPage.h5.Color} !important;
  max-height: 100%;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
  }
`;


const TeamAlbumCardOverlay = styled.div`
background-color: rgba(255, 255, 255, 0.8);
border-bottom-right-radius: inherit;
border-bottom-left-radius: inherit;
position: absolute;
bottom: 0;
width: 100%;
padding: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PaddingY} ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PaddingX};
h4{

font-weight: ${({ theme }) => theme.Team.TeamPage.h4.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamPage.h4.FontSize};
line-height: ${({ theme }) => theme.Team.TeamPage.h4.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamPage.h4.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamPage.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamPage.h4.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamPage.h4.Color};
position: relative;
// margin-bottom: ${({ theme }) => theme.Team.TeamPage.h4.MarginBottom};
word-break: break-all;
display: -webkit-box;
-webkit-line-clamp:1;
-webkit-box-orient: vertical;
overflow: hidden;
}


h5{

font-weight: ${({ theme }) => theme.Team.TeamPage.h5.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamPage.h5.FontSize};
line-height: ${({ theme }) => theme.Team.TeamPage.h5.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamPage.h5.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamPage.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamPage.h5.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamPage.h5.Color};
word-break: break-all;
display: -webkit-box;
-webkit-line-clamp:1;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;

const Divider = styled.div`
width: 70%;
height: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PrimaryBorderBottom.Height};
background-color: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PrimaryBorderBottom.Background};
// bottom: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PrimaryBorderBottom.Bottom};
margin: 5px 0;
`;

const Team = () => {
  const { manageTeamData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  return (
    <Container>
      <TeamSection>
        <TeamAlbum>
          <TeamAlbumHead>
            <h2>{(subheadersData && subheadersData['facultyhead']) || "Meet Our Teams"}</h2>
            <h3>{(subheadersData && subheadersData['facultysubhead']) || ""}</h3>
          </TeamAlbumHead>
          <TeamAlbumList>

            {
              manageTeamData && manageTeamData.length ?
                manageTeamData.map((item, key) => {
                  return (
                    <TeamAlbumCard key={key}>
                    <ImageViewer object={item.profileurl} defaultImage={Team} />

                      {/* <img src={item.profileurl ? item.profileurl : TeamPreview} alt="" /> */}
                      {/* <TeamAlbumCardOverlay>
                        <h4>{item.fullname ? item.fullname : ""}</h4>
                        <Divider />
                        <h5>{item.designation ? item.designation : ""}</h5>
                      </TeamAlbumCardOverlay> */}
                      <CardOverlay>
                        <h4>{item.fullname ? item.fullname : ""}</h4>
                        <Divider />
                        <h5>{item.designation ? item.designation : ""}</h5>
                        <CardOverlayDetails>
                          <p dangerouslySetInnerHTML={{
                            __html:
                              item.description,
                          }}></p>
                        </CardOverlayDetails>
                      </CardOverlay>
                    </TeamAlbumCard>
                  )
                }) :
                <TeamAlbumCard>
                  <img src={Team2} alt="" />
                  <CardOverlay>
                    <h4> Rajat Kumar</h4>
                    <Divider />
                    <h5>Owner</h5>
                    <CardOverlayDetails>
                      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, atque.</p>
                    </CardOverlayDetails>
                  </CardOverlay>
                </TeamAlbumCard>
            }
            {/* <TeamAlbumCard>
              <img src={Team2} alt="" />
              <TeamAlbumCardOverlay>
                <h4>Dr. Anjali Chauhan</h4>
                <h5>Principal</h5>
              </TeamAlbumCardOverlay>
            </TeamAlbumCard>
            <TeamAlbumCard>
              <img src={Team3} alt="" />
              <TeamAlbumCardOverlay>
                <h4>Dr. Anjali Chauhan</h4>
                <h5>Principal</h5>
              </TeamAlbumCardOverlay>
            </TeamAlbumCard>
            <TeamAlbumCard>
              <img src={Team3} alt="" />
              <TeamAlbumCardOverlay>
                <h4>Dr. Anjali Chauhan</h4>
                <h5>Principal</h5>
              </TeamAlbumCardOverlay>
            </TeamAlbumCard>
            <TeamAlbumCard>
              <img src={Team3} alt="" />
              <TeamAlbumCardOverlay>
                <h4>Dr. Anjali Chauhan</h4>
                <h5>Principal</h5>
              </TeamAlbumCardOverlay>
            </TeamAlbumCard>
            <TeamAlbumCard>
              <img src={Team3} alt="" />
              <TeamAlbumCardOverlay>
                <h4>Dr. Anjali Chauhan</h4>
                <h5>Principal</h5>
              </TeamAlbumCardOverlay>
            </TeamAlbumCard>
            <TeamAlbumCard>
              <img src={Team3} alt="" />
              <TeamAlbumCardOverlay>
                <h4>Dr. Anjali Chauhan</h4>
                <h5>Principal</h5>
              </TeamAlbumCardOverlay>
            </TeamAlbumCard> */}
          </TeamAlbumList>
        </TeamAlbum>
      </TeamSection>
    </Container>
  )
}

export default Team