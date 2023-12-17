/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Team1 from "./Team1.jpg";
import Team2 from "./Team2.jpg";
import Team3 from "./Team3.jpg";
import Team4 from "./Team4.jpg";
import React from 'react';
import { setParamId } from '../../../../store/actions/serviceWebsiteTemplate';
import { Container } from '../../../CommonComponent/Container.styled';

const TeamHeroSection = styled.div`
margin-top: 48px;
`;

const TeamAlbumHeroHead = styled.div`
margin-bottom: 24px;
h2{

font-weight: ${({ theme }) => theme.TeamHero.h2.FontWeight};
font-size: ${({ theme }) => theme.TeamHero.h2.FontSize};
line-height: ${({ theme }) => theme.TeamHero.h2.LineHeight};
font-style: ${({ theme }) => theme.TeamHero.h2.FontStyle};
font-family: ${({ theme }) => theme.TeamHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.TeamHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.TeamHero.h2.Alignment};
color: ${({ theme }) => theme.TeamHero.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.AboutUsHero.h3.FontWeight};
  font-size: ${({ theme }) => theme.AboutUsHero.h3.FontSize};
  line-height: ${({ theme }) => theme.AboutUsHero.h3.LineHeight};
  font-style: ${({ theme }) => theme.AboutUsHero.h3.FontStyle};
  font-family: ${({ theme }) => theme.AboutUsHero.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUsHero.h3.LetterSpacing};
  color: ${({ theme }) => theme.AboutUsHero.h3.Color};
  text-align: ${({ theme }) => theme.AboutUsHero.h2.Alignment};
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
// display: flex;
// flex-wrap: wrap;
// gap: 60px;
margin-top: 44px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
}

.slick-slide > div {
  margin: 0 10px;
}
.slick-list {
  margin: 0 -10px;
}
.slick-dots{
  bottom: -30px;
  .slick-active{
  margin: 0;
  button{
  &::before{
  font-size: 12px;
  color: ${({ theme }) => theme.TeamHero.Dots.Active.Color};
  }
  }
  }
  button{
  &::before{
  font-size: 12px;
  color: ${({ theme }) => theme.TeamHero.Dots.Color};
  }
  }
  }
  .slick-prev{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-right: 2px solid ${({ theme }) => theme.TeamHero.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.TeamHero.SlickArrowColor.Color};
    z-index: 0;
    margin-left: -0.5rem;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
 
    &::before{
    color: transparent;
    }
    &:hover{
      border-right: 2px solid ${({ theme }) => theme.TeamHero.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.TeamHero.SlickArrowColor.Hover.Color};    
    }
    @media screen and (max-width: 768px) {
      width: 1rem;
      height: 1rem;
      margin-left: 0;
      left: 15px;
      }
    }
    .slick-next{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-left: 2px solid ${({ theme }) => theme.TeamHero.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.TeamHero.SlickArrowColor.Color};
    z-index: 0;
    margin-right: -0.5rem;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    @media screen and (max-width: 768px) {
    margin-right: auto;
    }
    &::before{
    color: transparent;
    }
    &:hover{
      border-left: 2px solid ${({ theme }) => theme.TeamHero.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.TeamHero.SlickArrowColor.Hover.Color};    
    }
    @media screen and (max-width: 768px) {
    width: 1rem;
    height: 1rem;
    right: 15px;
    }
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
background: ${({ theme }) => theme.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.Background};
width: 100%;
padding: ${({ theme }) => theme.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingY} ${({ theme }) => theme.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PaddingX};
text-align: center;
min-height: 100px;
height: 100%;
align-items: center;
justify-content: center;
display: flex;
flex-direction: column;
h6{

font-weight: ${({ theme }) => theme.TeamHero.h6.FontWeight};
font-size: ${({ theme }) => theme.TeamHero.h6.FontSize};
line-height: ${({ theme }) => theme.TeamHero.h6.LineHeight};
font-style: ${({ theme }) => theme.TeamHero.h6.FontStyle};
font-family: ${({ theme }) => theme.TeamHero.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.TeamHero.h6.LetterSpacing};
color: ${({ theme }) => theme.TeamHero.h6.Color};
position: relative;
margin-bottom: ${({ theme }) => theme.TeamHero.h6.MarginBottom};
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
&::after{
width: 70%;
height: ${({ theme }) => theme.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Height};
background-color: ${({ theme }) => theme.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Background};
bottom: ${({ theme }) => theme.TeamHero.TeamAlbumHomeCard.TeamAlbumHomeCardOverlay.PrimaryBorderBottom.Bottom};
}
}
p{

font-weight: ${({ theme }) => theme.TeamHero.p.FontWeight};
font-size: ${({ theme }) => theme.TeamHero.p.FontSize};
line-height: ${({ theme }) => theme.TeamHero.p.LineHeight};
font-style: ${({ theme }) => theme.TeamHero.p.FontStyle};
font-family: ${({ theme }) => theme.TeamHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.TeamHero.p.LetterSpacing};
color: ${({ theme }) => theme.TeamHero.p.Color};

display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;

const ViewMoreSection = styled.div`
margin-top: ${({ theme }) => theme.TeamHero.ViewMoreSection.MarginTop};
display: grid;
align-items: center;
grid-template-columns: 1fr auto;
`;

const ViewMoreSectionDivider = styled.div`
    width: 100%;
    height: 2px;
    background:  ${({ theme }) => theme.TeamHero.ViewMoreSectionDivider.Background};
`;

const ViewMoreButton = styled.a`
font-weight: ${({ theme }) => theme.TeamHero.ViewMoreButton.FontWeight};
font-size: ${({ theme }) => theme.TeamHero.ViewMoreButton.FontSize};
line-height: ${({ theme }) => theme.TeamHero.ViewMoreButton.LineHeight};
border-radius: ${({ theme }) => theme.TeamHero.ViewMoreButton.BorderRadius};
color: ${({ theme }) => theme.TeamHero.ViewMoreButton.Color};
padding: 8px 24px 8px 8px;
cursor: pointer;
position: relative;
text-decoration: none;
&::after{
  content: '';
  width: 6px;
  height: 6px;
  border-right: 2px solid  ${({ theme }) => theme.TeamHero.ViewMoreButton.Hover.Color};
  border-bottom: 2px solid ${({ theme }) => theme.TeamHero.ViewMoreButton.Hover.Color};
  position: absolute;
  right: 2px;
  left: auto;
  transform: rotate(-45deg);
  top: 16px;
}
&::before{  
  content: '';
  width: 16px;
  height: 2px;
 background:   ${({ theme }) => theme.TeamHero.ViewMoreButton.Hover.Color};
 position: absolute;
 right: 2px;
 left: auto;
 top: 19px;
}
&:hover{
color: ${({ theme }) => theme.TeamHero.ViewMoreButton.Hover.Color};
text-decoration: underline;
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
&::after{
  border-color: ${({ theme }) => theme.TeamHero.ViewMoreButton.Hover.Color};
}
&::before{  
 background: ${({ theme }) => theme.TeamHero.ViewMoreButton.Hover.Color};
}
}
`;
const ViewProfileButtonSection = styled.div`
margin-top: 8px;
`;

const ViewProfileButton = styled.a`
font-weight: ${({ theme }) => theme.TeamHero.ViewProfileButton.FontWeight};
font-size: ${({ theme }) => theme.TeamHero.ViewProfileButton.FontSize};
line-height: ${({ theme }) => theme.TeamHero.ViewProfileButton.LineHeight};
background: ${({ theme }) => theme.TeamHero.ViewProfileButton.Background};
border: 1px solid ${({ theme }) => theme.TeamHero.ViewProfileButton.BorderColor};
border-radius: ${({ theme }) => theme.TeamHero.ViewProfileButton.BorderRadius};
color: ${({ theme }) => theme.TeamHero.ViewProfileButton.Color};
padding: ${({ theme }) => theme.TeamHero.ViewProfileButton.PaddingY} ${({ theme }) => theme.TeamHero.ViewProfileButton.PaddingX};
cursor: pointer;
text-align: center;
display: block;
&:hover{
background: ${({ theme }) => theme.TeamHero.ViewProfileButton.Hover.Background};
color: ${({ theme }) => theme.TeamHero.ViewProfileButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.TeamHero.ViewProfileButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;


const TeamAlbumHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { manageTeamData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
    }
  })

  const handleRoute = (_id) => {
    if (preview) {
      dispatch(selectRouteForPreview(`/profile-detail/${_id}`, true))
      dispatch(setParamId(_id))
    } else {
      history(`/profile-detail/${_id}`)
    }
  }
  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/faculty", true))
    }
    else {
      history("/faculty")
    }
  }
  const settingsTeamHero = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6 > 4 ? 4 : 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const handleFaculty = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/faculty", true))
    }
    else {
      history("/faculty");
    }
  }

  return (
    <Container>
      <TeamHeroSection>
        <TeamAlbumHeroHead>
          {/* <h2>Our Doctors</h2>
        <h3>Trusted Care</h3> */}
          <h2>{(subheadersData && subheadersData['facultyhead']) || "Our Doctors"}</h2>
          <h3>{(subheadersData && subheadersData['facultysubhead']) || "Trusted Care"}</h3>
        </TeamAlbumHeroHead>
        <TeamAlbumHomeList>

          {
            manageTeamData && manageTeamData.length ?
              <Slider {...settingsTeamHero}>
                {manageTeamData.slice(0, 4).map((item, key) => {
                  return (
                    <TeamAlbumHomeCard key={key} onClick={() => handleRoute(item._id)}>
                      <img src={item.profileurl ? item.profileurl : DefaultImage} alt="" />
                      <TeamAlbumHomeCardOverlay>
                        <h6 title={item.fullname}>{item.fullname}</h6>
                        <p title={item.designation}>{item.designation}</p>
                      </TeamAlbumHomeCardOverlay>
                      <ViewProfileButtonSection>
                        <ViewProfileButton onClick={() => handleRoute(item._id)}>
                          View Profile
                        </ViewProfileButton>
                      </ViewProfileButtonSection>
                    </TeamAlbumHomeCard>
                  )
                })
                }
              </Slider>
              :
              <React.Fragment>
                <Slider {...settingsTeamHero}>
                  <TeamAlbumHomeCard>
                    <img src={Team2} alt="" />
                    <TeamAlbumHomeCardOverlay>
                      <h6 title="Dr. Davinder Sabherwal">Dr. Davinder Sabherwal</h6>
                      <p title="Neurology">Neurology</p>
                    </TeamAlbumHomeCardOverlay>
                    <ViewProfileButtonSection>
                      <ViewProfileButton>
                        View Profile
                      </ViewProfileButton>
                    </ViewProfileButtonSection>
                  </TeamAlbumHomeCard>
                  <TeamAlbumHomeCard>
                    <img src={Team3} alt="" />
                    <TeamAlbumHomeCardOverlay>
                      <h6 title="Dr. Mrs. Savita Sabherwal">Dr. Mrs. Savita Sabherwal</h6>
                      <p title="Neurology">Neurology</p>
                    </TeamAlbumHomeCardOverlay>
                    <ViewProfileButtonSection>
                      <ViewProfileButton>
                        View Profile
                      </ViewProfileButton>
                    </ViewProfileButtonSection>
                  </TeamAlbumHomeCard>
                  <TeamAlbumHomeCard>
                    <img src={Team4} alt="" />
                    <TeamAlbumHomeCardOverlay>
                      <h6 title="Dr. Vipender Sabherwal">Dr. Vipender Sabherwal</h6>
                      <p title="Neurology">Neurology</p>
                    </TeamAlbumHomeCardOverlay>
                    <ViewProfileButtonSection>
                      <ViewProfileButton>
                        View Profile
                      </ViewProfileButton>
                    </ViewProfileButtonSection>
                  </TeamAlbumHomeCard>
                </Slider> </React.Fragment>
          }



        </TeamAlbumHomeList>
        <ViewMoreSection>
          <ViewMoreSectionDivider></ViewMoreSectionDivider>
          <ViewMoreButton onClick={() => handleViewMoreButton()}>
            View All
          </ViewMoreButton>
        </ViewMoreSection>
      </TeamHeroSection>
    </Container>
  )
}

export default TeamAlbumHero