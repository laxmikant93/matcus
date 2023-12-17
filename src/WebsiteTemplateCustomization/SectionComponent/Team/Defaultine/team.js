/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import { useSelector } from 'react-redux';
import Team1 from "../../../assets/Vespertine/Team1.svg";
import Team from "../Teacher.png";
import Team2 from "../../../assets/Vespertine/Team2.svg";
import Team3 from "../../../assets/Vespertine/Team3.svg";
import ImageViewer from '../../../../Common/ImageViewer';
const TeamPageSection = styled.div`
padding: 64px 0;
`;

const TeamAlbumPageHead = styled.div`
margin-bottom: 48px;
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
text-align: ${({ theme }) => theme.Team.TeamPage.h3.Alignment};
color: ${({ theme }) => theme.Team.TeamPage.h3.Color};
text-decoration: underline;
}
`;
const TeamAlbumHomeList = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 40px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
}
`;
const TeamAlbumHomeCard = styled.div`
border: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.BorderWidth} solid ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.BorderColor};
border-radius: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.BorderRadius};
height: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.Height};
background: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.Background};
padding: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.Padding};
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
const TeamAlbumHomeCardOverlay1 = styled.div`
width: 100%;
padding: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PaddingY} ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PaddingX};
text-align: center;
h4{

font-weight: ${({ theme }) => theme.Team.TeamPage.h4.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamPage.h4.FontSize};
line-height: ${({ theme }) => theme.Team.TeamPage.h4.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamPage.h4.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamPage.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamPage.h4.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamPage.h4.Color};
position: relative;
margin-bottom: ${({ theme }) => theme.Team.TeamPage.h4.MarginBottom};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
&::after{
width: 70%;
height: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PrimaryBorderBottom.Height};
background-color: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PrimaryBorderBottom.Background};
bottom: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PrimaryBorderBottom.Bottom};
}
}

h5{

font-weight: ${({ theme }) => theme.Team.TeamPage.h5.FontWeight};
font-size: ${({ theme }) => theme.Team.TeamPage.h5.FontSize};
line-height: ${({ theme }) => theme.Team.TeamPage.h5.LineHeight};
font-style: ${({ theme }) => theme.Team.TeamPage.h5.FontStyle};
font-family: ${({ theme }) => theme.Team.TeamPage.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.Team.TeamPage.h5.LetterSpacing};
color: ${({ theme }) => theme.Team.TeamPage.h5.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const Divider = styled.div`
width: 70%;
height: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PrimaryBorderBottom.Height};
background-color: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PrimaryBorderBottom.Background};
bottom: ${({ theme }) => theme.Team.TeamPage.TeamAlbumCard.TeamAlbumCardOverlay.PrimaryBorderBottom.Bottom};
margin: 5px 0;
`;
// const Divider = styled.div`
// width: 70%;
// height: '1px';
// background-color: 'transparent';
// bottom: "-5px";
// margin: 5px 0;
// `;


const TeamPage = () => {
  const { manageTeamData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  return (
    <Container>
      <TeamPageSection>
        <TeamAlbumPageHead>
        <h2>{(subheadersData && subheadersData['facultyhead']) || "OUR TEAM"}</h2>
        <h3>{(subheadersData && subheadersData['facultysubhead']) || ""}</h3>
        </TeamAlbumPageHead>
        <TeamAlbumHomeList>
          {
            manageTeamData && manageTeamData.length ?
              manageTeamData.map((item, key) => {
                return (
                  <TeamAlbumHomeCard key={key}>
                    <ImageViewer object={item.profileurl} defaultImage={Team} />
                    {/* <img src={item.profileurl ? item.profileurl : Team} alt="" /> */}
                    <TeamAlbumHomeCardOverlay1>
                      <h4>{item.fullname ? item.fullname : ""}</h4>
                      <Divider />
                      <h5>{item.designation ? item.designation : ""}</h5>
                    </TeamAlbumHomeCardOverlay1>
                  </TeamAlbumHomeCard>
                )
              }) :
              <TeamAlbumHomeCard>
                <img src={Team2} alt="" />
                <TeamAlbumHomeCardOverlay1>
                  <h4>Dr. Bhupinder Kumar</h4>
                  <h5>Principal</h5>
                </TeamAlbumHomeCardOverlay1>
              </TeamAlbumHomeCard>
          }

          {/* <TeamAlbumHomeCard>
            <img src={Team2} alt="" />
            <TeamAlbumHomeCardOverlay>
              <h4>Dr. Anjali Chauhan</h4>
              <h5>Principal</h5>
            </TeamAlbumHomeCardOverlay>
          </TeamAlbumHomeCard>
          <TeamAlbumHomeCard>
            <img src={Team3} alt="" />
            <TeamAlbumHomeCardOverlay>
              <h4>Dr. Anjali Chauhan</h4>
              <h5>Principal</h5>
            </TeamAlbumHomeCardOverlay>
          </TeamAlbumHomeCard>
          <TeamAlbumHomeCard>
            <img src={Team1} alt="" />
            <TeamAlbumHomeCardOverlay>
              <h4>Dr. Anjali Chauhan</h4>
              <h5>Principal</h5>
            </TeamAlbumHomeCardOverlay>
          </TeamAlbumHomeCard>
          <TeamAlbumHomeCard>
            <img src={Team2} alt="" />
            <TeamAlbumHomeCardOverlay>
              <h4>Dr. Anjali Chauhan</h4>
              <h5>Principal</h5>
            </TeamAlbumHomeCardOverlay>
          </TeamAlbumHomeCard>
          <TeamAlbumHomeCard>
            <img src={Team3} alt="" />
            <TeamAlbumHomeCardOverlay>
              <h4>Dr. Anjali Chauhan</h4>
              <h5>Principal</h5>
            </TeamAlbumHomeCardOverlay>
          </TeamAlbumHomeCard>
          <TeamAlbumHomeCard>
            <img src={Team1} alt="" />
            <TeamAlbumHomeCardOverlay>
              <h4>Dr. Anjali Chauhan</h4>
              <h5>Principal</h5>
            </TeamAlbumHomeCardOverlay>
          </TeamAlbumHomeCard>
          <TeamAlbumHomeCard>
            <img src={Team2} alt="" />
            <TeamAlbumHomeCardOverlay>
              <h4>Dr. Anjali Chauhan</h4>
              <h5>Principal</h5>
            </TeamAlbumHomeCardOverlay>
          </TeamAlbumHomeCard>
          <TeamAlbumHomeCard>
            <img src={Team3} alt="" />
            <TeamAlbumHomeCardOverlay>
              <h4>Dr. Anjali Chauhan</h4>
              <h5>Principal</h5>
            </TeamAlbumHomeCardOverlay>
          </TeamAlbumHomeCard> */}
        </TeamAlbumHomeList>
      </TeamPageSection>
    </Container>
  )
}

export default TeamPage