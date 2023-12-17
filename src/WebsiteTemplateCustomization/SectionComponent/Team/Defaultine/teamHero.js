/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';

// import Team1 from "../../../assets/Vespertine/Team1.svg";
import Team from "../Teacher.png";
import Team2 from "./Team.png";
// import Team3 from "../../../assets/Vespertine/Team3.svg";
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from '../../../../Common/ImageViewer';

const TeamHeroSection = styled.div`
padding-top: 24px 0;
`;

const TeamAlbumHeroHead = styled.div`
margin-bottom: 24px;
h2{

font-weight: ${({ theme }) => theme.Team.TeamHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamHero.h2.FontSize};
line-height: ${({ theme }) => theme.Team.TeamHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Team.TeamHero.h2.Alignment};
color: ${({ theme }) => theme.Team.TeamHero.h2.Color};
}
`;
const TeamAlbumHomeList = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 0 60px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
}
`;
const TeamAlbumHomeCard = styled.div`
border: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.BorderWidth} solid ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.BorderColor};
border-radius: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.BorderRadius};
height: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.Height};
background: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.Background};
padding: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.Padding};
position: relative;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
gap: 24px;
img{
width: 172px;
height: 172px;
object-fit: cover;
border-radius: 50%;
position: relative;
display: block;
}
`;
const TeamAlbumHomeCardOverlay = styled.div`
width: 100%;
padding: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingY} ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingX};
text-align: center;
h4{

font-weight: ${({ theme }) => theme.Team.TeamHero.h4.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamHero.h4.FontSize};
line-height: ${({ theme }) => theme.Team.TeamHero.h4.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamHero.h4.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamHero.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamHero.h4.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamHero.h4.Color};
position: relative;
margin-bottom: ${({ theme }) => theme.Team.TeamHero.h4.MarginBottom};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
&::after{
width: 70%;
height: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Height};
background-color: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Background};
bottom: ${({ theme }) => theme.Team.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Bottom};
}
}
h5{

font-weight: ${({ theme }) => theme.Team.TeamHero.h5.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamHero.h5.FontSize};
line-height: ${({ theme }) => theme.Team.TeamHero.h5.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamHero.h5.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamHero.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamHero.h5.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamHero.h5.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
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
background: transparent;
border: 1px solid ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Background};
border-radius: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.BorderRadius};
color: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Background};
padding: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.PaddingY} ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.Background};
color: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.Background};
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
      <TeamHeroSection>
        <TeamAlbumHeroHead>
          {/* <h2>OUR TEAM</h2> */}
          <h2>{(subheadersData && subheadersData['facultyhead']) || "OUR TEAM"}</h2>
          <h3>{(subheadersData && subheadersData['facultysubhead']) || ""}</h3>
        </TeamAlbumHeroHead>
        <TeamAlbumHomeList>
          {
            manageTeamData && manageTeamData.length ?
              manageTeamData.slice(0, 3).map((item, key) => {
                return (
                  <TeamAlbumHomeCard key={key}>
                    <ImageViewer object={item.profileurl} defaultImage={Team} />
                    {/* <img src={item.profileurl ? item.profileurl : Team} alt="" /> */}
                    <TeamAlbumHomeCardOverlay>
                      <h4>{item.fullname}</h4>
                      <h5>{item.designation}</h5>
                    </TeamAlbumHomeCardOverlay>
                  </TeamAlbumHomeCard>
                )
              }) :
              <TeamAlbumHomeCard>
                <img src={Team2} alt="" />
                <TeamAlbumHomeCardOverlay>
                  <h4>Rajat Kumar</h4>
                  <h5>Owner</h5>
                </TeamAlbumHomeCardOverlay>
              </TeamAlbumHomeCard>
          }

        </TeamAlbumHomeList>
        <ViewMoreButtonSection>
          <ViewMoreTeamButton onClick={() => handleViewMoreButton()}>
            View All
          </ViewMoreTeamButton>
        </ViewMoreButtonSection>
      </TeamHeroSection>
    </Container>
  )
}

export default TeamAlbumHero