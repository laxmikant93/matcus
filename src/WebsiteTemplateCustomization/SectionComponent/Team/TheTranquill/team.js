/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import { useDispatch, useSelector } from 'react-redux';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import Team1 from "./Team1.jpg";
import Team2 from "./Team2.jpg";
import Team3 from "./Team3.jpg";
import Team4 from "./Team4.jpg";
import React from 'react';
import { selectRouteForPreview, setParamId } from '../../../../store/actions/serviceWebsiteTemplate';
import { useNavigate } from 'react-router-dom';
const TeamPageSection = styled.div`
padding: 72px 0;

`;

const TeamAlbumPageHead = styled.div`
margin-bottom: 24px;
h2{

font-weight: ${({ theme }) => theme.TeamPage.h2.FontWeight};
font-size: ${({ theme }) => theme.TeamPage.h2.FontSize};
line-height: ${({ theme }) => theme.TeamPage.h2.LineHeight};
font-style: ${({ theme }) => theme.TeamPage.h2.FontStyle};
font-family: ${({ theme }) => theme.TeamPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.TeamPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.TeamPage.h2.Alignment};
color: ${({ theme }) => theme.TeamPage.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.AboutUsPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.AboutUsPage.h3.FontSize};
  line-height: ${({ theme }) => theme.AboutUsPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.AboutUsPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.AboutUsPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUsPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.AboutUsPage.h3.Color};
  text-align: ${({ theme }) => theme.AboutUsPage.h2.Alignment};
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
`;
const TeamAlbumHomeList = styled.div`
display:grid;
grid-template-columns: repeat(4, 1fr);
gap: 16px;
margin-top: 44px;
@media screen and (max-width: 992px) {
  grid-template-columns: 1fr 1fr 1fr;
}
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 468px) {
  grid-template-columns: 1fr;
}
`;
const TeamAlbumHomeCard = styled.div`
position: relative;
cursor: pointer;
img{
width: 100%;
height: 284px;
object-fit: cover;
border-radius: 5px 5px 0px 0px;
position: relative;
display: block;
}

`;
const TeamAlbumHomeCardOverlay = styled.div`
background: ${({ theme }) => theme.TeamPage.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.Background};
width: 100%;
padding: ${({ theme }) => theme.TeamPage.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingY} ${({ theme }) => theme.TeamPage.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingX};
text-align: center;
h6{

font-weight: ${({ theme }) => theme.TeamPage.h6.FontWeight};
font-size: ${({ theme }) => theme.TeamPage.h6.FontSize};
line-height: ${({ theme }) => theme.TeamPage.h6.LineHeight};
font-style: ${({ theme }) => theme.TeamPage.h6.FontStyle};
font-family: ${({ theme }) => theme.TeamPage.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.TeamPage.h6.LetterSpacing};
color: ${({ theme }) => theme.TeamPage.h6.Color};
position: relative;
margin-bottom: ${({ theme }) => theme.TeamPage.h6.MarginBottom};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
&::after{
width: 70%;
height: ${({ theme }) => theme.TeamPage.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Height};
background-color: ${({ theme }) => theme.TeamPage.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Background};
bottom: ${({ theme }) => theme.TeamPage.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Bottom};
}
}
p{

font-weight: ${({ theme }) => theme.TeamPage.p.FontWeight};
font-size: ${({ theme }) => theme.TeamPage.p.FontSize};
line-height: ${({ theme }) => theme.TeamPage.p.LineHeight};
font-style: ${({ theme }) => theme.TeamPage.p.FontStyle};
font-family: ${({ theme }) => theme.TeamPage.p.FontFamily};
letter-spacing: ${({ theme }) => theme.TeamPage.p.LetterSpacing};
color: ${({ theme }) => theme.TeamPage.p.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;

const ViewMoreSection = styled.div`
margin-top: ${({ theme }) => theme.TeamPage.ViewMoreSection.MarginTop};
display: grid;
align-items: center;
grid-template-columns: 1fr auto;
`;


const ViewProfileButtonSection = styled.div`
margin-top: 8px;
`;

const ViewProfileButton = styled.a`
font-weight: ${({ theme }) => theme.TeamPage.ViewProfileButton.FontWeight};
font-size: ${({ theme }) => theme.TeamPage.ViewProfileButton.FontSize};
line-height: ${({ theme }) => theme.TeamPage.ViewProfileButton.LineHeight};
background: ${({ theme }) => theme.TeamPage.ViewProfileButton.Background};
border: 1px solid ${({ theme }) => theme.TeamPage.ViewProfileButton.BorderColor};
border-radius: ${({ theme }) => theme.TeamPage.ViewProfileButton.BorderRadius};
color: ${({ theme }) => theme.TeamPage.ViewProfileButton.Color};
padding: ${({ theme }) => theme.TeamPage.ViewProfileButton.PaddingY} ${({ theme }) => theme.TeamPage.ViewProfileButton.PaddingX};
cursor: pointer;
text-align: center;
display: block;
&:hover{
background: ${({ theme }) => theme.TeamPage.ViewProfileButton.Hover.Background};
color: ${({ theme }) => theme.TeamPage.ViewProfileButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.TeamPage.ViewProfileButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;


const TeamPage = () => {
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { manageTeamData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
    }
  })
  const history = useNavigate()
  const dispatch = useDispatch()
  const handleRoute = (_id) => {
    if (preview) {
      dispatch(selectRouteForPreview(`/profile-detail/${_id}`, true))
      dispatch(setParamId(_id))
    } else {
      history(`/profile-detail/${_id}`)
    }
  }
  return (
    <Container>
      <TeamPageSection>
        <TeamAlbumPageHead>
          <h2>{(subheadersData && subheadersData['facultyhead']) || "Our Doctors"}</h2>
          <h3>{(subheadersData && subheadersData['facultysubhead']) || "Trusted Care"}</h3>

        </TeamAlbumPageHead>
        <TeamAlbumHomeList>
          {
            manageTeamData && manageTeamData.length ?

              manageTeamData.map((item, key) => {
                return (
                  <TeamAlbumHomeCard onClick={() => handleRoute(item._id)}>
                    <img src={item.profileurl ? item.profileurl : DefaultImage} alt="" />
                    <TeamAlbumHomeCardOverlay>
                      <h6 title={item.fullname}>{item.fullname}</h6>
                      <p title={item.designation}>{item.designation}</p>
                    </TeamAlbumHomeCardOverlay>
                    <ViewProfileButtonSection onClick={() => handleRoute(item._id)}>
                      <ViewProfileButton>
                        View Profile
                      </ViewProfileButton>
                    </ViewProfileButtonSection>
                  </TeamAlbumHomeCard>
                )
              }) : <React.Fragment>
                <TeamAlbumHomeCard>
                  <img src={Team1} alt="" />
                  <TeamAlbumHomeCardOverlay>
                    <h6 title="Dr. Savita K Sabherwal">Dr. Savita K Sabherwal</h6>
                    <p title="Neurology">Neurology</p>
                  </TeamAlbumHomeCardOverlay>
                  {/* <ViewProfileButtonSection>
                    <ViewProfileButton>
                      View Profile
                    </ViewProfileButton>
                  </ViewProfileButtonSection> */}
                </TeamAlbumHomeCard>
                <TeamAlbumHomeCard>
                  <img src={Team2} alt="" />
                  <TeamAlbumHomeCardOverlay>
                    <h6 title="Dr. Gaurav Ranjan">Dr. Gaurav Ranjan</h6>
                    <p title="Neurology">Cardiology</p>
                  </TeamAlbumHomeCardOverlay>
                  {/* <ViewProfileButtonSection>
                    <ViewProfileButton>
                      View Profile
                    </ViewProfileButton>
                  </ViewProfileButtonSection> */}
                </TeamAlbumHomeCard>
                <TeamAlbumHomeCard>
                  <img src={Team3} alt="" />
                  <TeamAlbumHomeCardOverlay>
                    <h6 title="Dr. Mrs. Savita Sabherwal">Dr. Mrs. Savita Sabherwal</h6>
                    <p title="Neurology">Neurology</p>
                  </TeamAlbumHomeCardOverlay>
                  {/* <ViewProfileButtonSection>
                    <ViewProfileButton>
                      View Profile
                    </ViewProfileButton>
                  </ViewProfileButtonSection> */}
                </TeamAlbumHomeCard>
                <TeamAlbumHomeCard>
                  <img src={Team4} alt="" />
                  <TeamAlbumHomeCardOverlay>
                    <h6 title="Dr. Vipender Sabherwal">Dr. Vipender Sabherwal</h6>
                    <p title="Neurology">Neurology</p>
                  </TeamAlbumHomeCardOverlay>
                  {/* <ViewProfileButtonSection>
                    <ViewProfileButton>
                      View Profile
                    </ViewProfileButton>
                  </ViewProfileButtonSection> */}
                </TeamAlbumHomeCard>
              </React.Fragment>
          }

        </TeamAlbumHomeList>
      </TeamPageSection>
    </Container>
  )
}

export default TeamPage