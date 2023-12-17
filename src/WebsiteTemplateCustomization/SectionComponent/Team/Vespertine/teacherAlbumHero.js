/* eslint-disable jsx-a11y/no-distracting-elements */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';

// import Team1 from "../../../assets/Vespertine/Team1.svg";
import Team from "../Teacher.png";
import Team2 from "../../../assets/Vespertine/Team2.svg";
// import Team3 from "../../../assets/Vespertine/Team3.svg";
// import { SocialMediaIconListItem } from '../../../FooterLayout/Vespertine/Footer.styled';
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from '../../../../Common/ImageViewer';

const TeamHomeHeroSection = styled.div`
padding: 32px 0;
`;
const TeamAlbumHomeHero = styled.div`

`;
const TeamAlbumHomeHeroHead = styled.div`
margin-bottom: 48px;
display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Team.TeamHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamHero.h2.FontSize};
line-height: ${({ theme }) => theme.Team.TeamHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Team.TeamHero.h2.Alignment};
color: ${({ theme }) => theme.Team.TeamHero.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.Team.TeamHero.h3.FontWeight};
  font-size: ${({ theme }) => theme.Team.TeamHero.h3.FontSize};
  line-height: ${({ theme }) => theme.Team.TeamHero.h3.LineHeight};
  font-style: ${({ theme }) => theme.Team.TeamHero.h3.FontStyle};
  font-family: ${({ theme }) => theme.Team.TeamHero.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Team.TeamHero.h3.LetterSpacing};
  color: ${({ theme }) => theme.Team.TeamHero.h3.Color};
  text-align: ${({ theme }) => theme.Team.TeamHero.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Team.TeamHero.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Team.TeamHero.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Team.TeamHero.BorderBottom.BottomSpace};
  }
  }
`;
const TeamAlbumHomeList = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 0 60px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  gap: 30px;
  }
`;
const TeamAlbumHomeCard = styled.div`
border: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.BorderWidth}; 
solid ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.BorderColor};
box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.1);
border-radius: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.BorderRadius};
height: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.Height};
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
padding: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingY} ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingX};

h4{
  font-weight: ${({ theme }) => theme.Team.TeamHero.h4.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamHero.h4.FontSize};
line-height: ${({ theme }) => theme.Team.TeamHero.h4.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamHero.h4.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamHero.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamHero.h4.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamHero.h4.Color};
  position: relative;
  // margin-bottom: ${({ theme }) => theme.Team.TeamPage.h4.MarginBottom};
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp:1;
  -webkit-box-orient: vertical;
  overflow: hidden;
 }
 h5{
  font-weight: ${({ theme }) => theme.Team.TeamHero.h5.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamHero.h5.FontSize};
line-height: ${({ theme }) => theme.Team.TeamHero.h5.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamHero.h5.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamHero.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamHero.h5.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamHero.h5.Color};
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp:1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
  }
  ${TeamAlbumHomeCard}:hover & {
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


const CardOverlayDivider = styled.div`
width: 70%;
height: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Height};
background-color: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Background};
margin: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.MarginY} 0;
`;

const TeamAlbumHomeCardOverlay = styled.div`
background-color: rgba(255, 255, 255, 0.8);
border-bottom-right-radius: inherit;
border-bottom-left-radius: inherit;
position: absolute;
bottom: 0;
width: 100%;
padding: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingY} ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingX};
h4{

font-weight: ${({ theme }) => theme.Team.TeamHero.h4.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamHero.h4.FontSize};
line-height: ${({ theme }) => theme.Team.TeamHero.h4.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamHero.h4.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamHero.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamHero.h4.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamHero.h4.Color};
position: relative;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h5{

font-weight: ${({ theme }) => theme.Team.TeamHero.h5.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamHero.h5.FontSize};
line-height: ${({ theme }) => theme.Team.TeamHero.h5.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamHero.h5.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamHero.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamHero.h5.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamHero.h5.Color};
word-break: break-all;
display: -webkit-box;
-webkit-line-clamp:1;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const ViewMoreButtonSection = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const ViewMoreTeamButton = styled.a`

font-weight: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.FontSize};
line-height: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.LineHeight};
background: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Background};
border: 1px solid ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.BorderColor};
border-radius: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.BorderRadius};
color: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Color};
padding: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.PaddingY} ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.Background};
color: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const TeamAlbumHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { manageTeamData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/faculty", true))
    }
    else {
      history("/faculty")
    }
  }

  return (
    <Container>
      <TeamHomeHeroSection>
        <TeamAlbumHomeHero>
          <TeamAlbumHomeHeroHead>
            <h2>{(subheadersData && subheadersData['facultyhead']) || "Meet Our Teams"}</h2>
            <h3>{(subheadersData && subheadersData['facultysubhead']) || ""}</h3>
          </TeamAlbumHomeHeroHead>
          <TeamAlbumHomeList>
            {
              manageTeamData && manageTeamData.length ?
                manageTeamData.slice(0, 3).map((item, key) => {
                  return (
                    <TeamAlbumHomeCard key={key}>
                    <ImageViewer object={item.profileurl} defaultImage={Team} />

                      {/* <img src={item.profileurl ? item.profileurl : Team} alt="" /> */}
                      {/* <TeamAlbumHomeCardOverlay>
                      <h4>{item.fullname}</h4>
                      <CardOverlayDivider></CardOverlayDivider>
                      <h5>{item.designation}</h5>
                    </TeamAlbumHomeCardOverlay> */}
                      <CardOverlay>
                        <h4>{item.fullname}</h4>
                        <CardOverlayDivider />
                        <h5>{item.designation}</h5>
                        <CardOverlayDetails>
                          <p dangerouslySetInnerHTML={{
                            __html:
                              item.description,
                          }}></p>
                        </CardOverlayDetails>
                      </CardOverlay>

                    </TeamAlbumHomeCard>
                  )
                }) : <TeamAlbumHomeCard>
                  <img src={Team2} alt="" />
                  {/* <TeamAlbumHomeCardOverlay>
                  <h4> Rajat Kumar</h4>
                  <CardOverlayDivider></CardOverlayDivider>
                  <h5>Owner</h5>
                </TeamAlbumHomeCardOverlay> */}
                  <CardOverlay>
                    <h4> Rajat Kumar</h4>
                    <CardOverlayDivider />
                    <h5>Owner</h5>
                    <CardOverlayDetails>
                      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, atque.</p>
                    </CardOverlayDetails>
                  </CardOverlay>
                </TeamAlbumHomeCard>
            }
          </TeamAlbumHomeList>
          <ViewMoreButtonSection>
            <ViewMoreTeamButton onClick={() => handleViewMoreButton()}>
              View More
            </ViewMoreTeamButton>
          </ViewMoreButtonSection>
        </TeamAlbumHomeHero>
      </TeamHomeHeroSection>
    </Container>
  )
}

export default TeamAlbumHero