/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Facilities1 from "./facilities-1.jpg";
import defaultImage from "../School_facilities.png";
import defaultImage2 from "./defaultImage2.svg";
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import { Container } from '../../../CommonComponent/Container.styled';


const FacilitiesHeroSection = styled.div`
margin-top: 48px;
`;
const FacilitiesHeroHead = styled.div`
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
const FacilitiesHeroGrid = styled.div`
display: grid;
grid-template-columns: 250px 1fr;
align-items: flex-start;
gap:36px;
margin-top: 40px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const FacilitiesMenuTab = styled.ul`
border: 1px solid #1F2B6C;
border-radius: 5px;
background: #FCFEFE;
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const FacilitiesMenuTabItem = styled.li`
text-align: center;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
&:first-child{
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

`;
const FacilitiesMenuButton = styled.button`
font-weight: ${({ theme }) => theme.FacilitiesHero.FacilitiesMenuButton.FontWeight};
font-size: ${({ theme }) => theme.FacilitiesHero.FacilitiesMenuButton.FontSize};
line-height: ${({ theme }) => theme.FacilitiesHero.FacilitiesMenuButton.LineHeight};
color: ${({ theme }) => theme.FacilitiesHero.FacilitiesMenuButton.Color};
background: transparent;
padding: ${({ theme }) => theme.FacilitiesHero.FacilitiesMenuButton.PaddingY} ${({ theme }) => theme.FacilitiesHero.FacilitiesMenuButton.PaddingX};
cursor: pointer;
border: none;
outlinbe: none;
width: 100%;  
&.active{
  background: ${({ theme }) => theme.FacilitiesHero.FacilitiesMenuButton.Active.Background};
  color: ${({ theme }) => theme.FacilitiesHero.FacilitiesMenuButton.Active.Color};
}
`;
const FacilitiesViewAllButton = styled.a`
font-weight: ${({ theme }) => theme.FacilitiesHero.FacilitiesViewAllButton.FontWeight};
font-size: ${({ theme }) => theme.FacilitiesHero.FacilitiesViewAllButton.FontSize};
line-height: ${({ theme }) => theme.FacilitiesHero.FacilitiesViewAllButton.LineHeight};
color: ${({ theme }) => theme.FacilitiesHero.FacilitiesViewAllButton.Color};
background:  ${({ theme }) => theme.FacilitiesHero.FacilitiesViewAllButton.Background};
padding: ${({ theme }) => theme.FacilitiesHero.FacilitiesViewAllButton.PaddingY} ${({ theme }) => theme.FacilitiesHero.FacilitiesViewAllButton.PaddingX};
cursor: pointer;
display: block;
border-bottom-right-radius: 5px;
border-bottom-left-radius: 5px;
&:hover{
  text-decoration: underline;
}
`;

const FacilitiesMenuTabContent = styled.div`
`;
const FacilitiesItem = styled.figure`
display: grid;
grid-template-columns: 1fr auto;
align-items: flex-start;
gap: 36px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const FacilitiesImage = styled.div`
width: 324px;
height: 232px;
@media screen and (max-width: 768px) {
  width: 100%;
height: 100%;
}
img{
width: 100%;
height: 100%;
object-fit: cover;
display:block;
}
`;
const FacilitiesDescription = styled.figcaption`
width: 100%;
height: auto;
h4{
font-weight: ${({ theme }) => theme.FacilitiesHero.h4.FontWeight};
font-size: ${({ theme }) => theme.FacilitiesHero.h4.FontSize};
line-height: ${({ theme }) => theme.FacilitiesHero.h4.LineHeight};
font-style: ${({ theme }) => theme.FacilitiesHero.h4.FontStyle};
font-family: ${({ theme }) => theme.FacilitiesHero.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.FacilitiesHero.h4.LetterSpacing};
color: ${({ theme }) => theme.FacilitiesHero.h4.Color};
margin-bottom: 16px;
position: relative;
&::after{
width: 100%;
height: ${({ theme }) => theme.FacilitiesHero.FacilitiesDescription.BorderBottom.Height};
background-color: ${({ theme }) => theme.FacilitiesHero.FacilitiesDescription.BorderBottom.Background};
bottom: ${({ theme }) => theme.FacilitiesHero.FacilitiesDescription.BorderBottom.BottomSpace};
}
}
p{

font-weight: ${({ theme }) => theme.FacilitiesHero.p.FontWeight};
font-size: ${({ theme }) => theme.FacilitiesHero.p.FontSize};
line-height: ${({ theme }) => theme.FacilitiesHero.p.LineHeight};
font-style: ${({ theme }) => theme.FacilitiesHero.p.FontStyle};
font-family: ${({ theme }) => theme.FacilitiesHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.FacilitiesHero.p.LetterSpacing};
color: ${({ theme }) => theme.FacilitiesHero.p.Color};
margin-bottom: 24px;
display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const ViewMoreSection = styled.div`
margin-top: ${({ theme }) => theme.FacilitiesHero.ViewMoreSection.MarginTop};
display: grid;
align-items: center;
grid-template-columns: 1fr auto;
`;

const ViewMoreSectionDivider = styled.div`
    width: 100%;
    height: 2px;
    background:  ${({ theme }) => theme.FacilitiesHero.ViewMoreSectionDivider.Background};
`;

const ViewMoreButton = styled.a`
font-weight: ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.FontWeight};
font-size: ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.FontSize};
line-height: ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.LineHeight};
border-radius: ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.BorderRadius};
color: ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.Color};
padding: 8px 24px 8px 8px;
cursor: pointer;
position: relative;
text-decoration: none;
&::after{
  content: '';
  width: 6px;
  height: 6px;
  border-right: 2px solid  ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.Hover.Color};
  border-bottom: 2px solid ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.Hover.Color};
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
 background:   ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.Hover.Color};
 position: absolute;
 right: 2px;
 left: auto;
 top: 19px;
}
&:hover{
color: ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.Hover.Color};
text-decoration: underline;
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
&::after{
  border-color: ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.Hover.Color};
}
&::before{  
 background: ${({ theme }) => theme.FacilitiesHero.ViewMoreButton.Hover.Color};
}
}
`;
const SectionHeroBorderBottom = styled.div`
display: grid;
grid-template-columns: 25% 50% 25%;
align-items:center;
height: 8px;
`;
const SectionHeroBorderBottomL = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.AboutUsHero.SectionHeroBorderBottomL.Background} 
`;
const SectionHeroBorderBottomM = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.AboutUsHero.SectionHeroBorderBottomM.Background} 
`;
const SectionHeroBorderBottomR = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.AboutUsHero.SectionHeroBorderBottomR.Background} 
`;
const FacilitiesHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [facilityState, setFacilityState] = useState("")
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { facilitiesData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
    }
  })

  useEffect(() => {
    setFacilityState(facilitiesData.length ? facilitiesData[0] : "")
  }, [facilitiesData])
  const handleFacility = (item) => {
    setFacilityState(item)
  }
  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/facilities", true))
    }
    else {
      history("/facilities")
    }
  }
  return (
    <Container>
      <FacilitiesHeroSection>
        <FacilitiesHeroHead>
          <h2>{(subheadersData && subheadersData['servicehead']) || "School’s Facilities"}</h2>
          <h3>{(subheadersData && subheadersData['servicesubhead']) || "School’s Facilities"}</h3>
        </FacilitiesHeroHead>
        <FacilitiesHeroGrid>
          <FacilitiesMenuTab>
            {facilitiesData.length ?
              facilitiesData.slice(0, 3).map((item, key) => {
                return (
                  <>
                    <FacilitiesMenuTabItem key={key}>
                      <FacilitiesMenuButton type='button' onClick={() => handleFacility(item)} className={facilityState._id === item._id ? "active" : ""}>{item.title ? item.title : "Radiology"}</FacilitiesMenuButton>
                    </FacilitiesMenuTabItem>

                  </>
                )
              }) :
              <>
                <FacilitiesMenuTabItem>
                  <FacilitiesMenuButton type='button' className='active'>Radiology</FacilitiesMenuButton>
                </FacilitiesMenuTabItem>
                <FacilitiesMenuTabItem>
                  <FacilitiesMenuButton type='button'>Opthalmology</FacilitiesMenuButton>
                </FacilitiesMenuTabItem>
                <FacilitiesMenuTabItem>
                  <FacilitiesMenuButton type='button'>Pathology</FacilitiesMenuButton>
                </FacilitiesMenuTabItem>
              </>
            }
            <FacilitiesMenuTabItem>
              <FacilitiesViewAllButton onClick={handleViewMoreButton} type='button'>View All</FacilitiesViewAllButton>
            </FacilitiesMenuTabItem>

          </FacilitiesMenuTab>

          <FacilitiesMenuTabContent>
            {
              facilityState ?
                <FacilitiesItem>
                  <FacilitiesDescription>
                    <h4>{facilityState.title}</h4>
                    {/* <p>{facilityState.details ? facilityState.details : ""}</p> */}
                    <p dangerouslySetInnerHTML={{
                      __html:
                        facilityState.details,
                    }}></p>

                    <ViewMoreSection>
                      <ViewMoreSectionDivider></ViewMoreSectionDivider>
                      <ViewMoreButton onClick={handleViewMoreButton}>
                        Read More
                      </ViewMoreButton>
                    </ViewMoreSection>
                  </FacilitiesDescription>

                  <FacilitiesImage>
                    <img src={facilityState.thumbnail && facilityState.thumbnail !== "" ? facilityState.thumbnail : DefaultImage} alt="Facilities First" />
                    <SectionHeroBorderBottom>
                      <SectionHeroBorderBottomL></SectionHeroBorderBottomL>
                      <SectionHeroBorderBottomM></SectionHeroBorderBottomM>
                      <SectionHeroBorderBottomR></SectionHeroBorderBottomR>
                    </SectionHeroBorderBottom>
                  </FacilitiesImage>
                </FacilitiesItem>
                :
                <FacilitiesItem>
                  <FacilitiesDescription>
                    <h4>Radiology</h4>
                    {/* <p>  {item.details ? item.details : "The Department of radio-diagnosis at Jeevan Hospital 1 is equipped with most advanced diagnostic equipment. Radio-diagnosis plays a crucial role in identification of an ailment. At Jeevan Hospital, our qualified technicians are dedicated to offer a wide range of high quality diagnostic services as below:"}</p> */}
                    <p>1st & only Cath Lab (Innova IGS530, GE-USA) in North India with wide detector & tilt table, suitable for both Cardio-Vascular & Neuro Interventional procedures with advanced 3D imaging & CT like images.</p>

                    <ViewMoreSection>
                      <ViewMoreSectionDivider></ViewMoreSectionDivider>
                      <ViewMoreButton onClick={handleViewMoreButton}>
                        Read More
                      </ViewMoreButton>
                    </ViewMoreSection>
                  </FacilitiesDescription>

                  <FacilitiesImage>
                    <img src={Facilities1} alt="Facilities First" />
                    <SectionHeroBorderBottom>
                      <SectionHeroBorderBottomL></SectionHeroBorderBottomL>
                      <SectionHeroBorderBottomM></SectionHeroBorderBottomM>
                      <SectionHeroBorderBottomR></SectionHeroBorderBottomR>
                    </SectionHeroBorderBottom>
                  </FacilitiesImage>
                </FacilitiesItem>
            }
          </FacilitiesMenuTabContent>
        </FacilitiesHeroGrid>
      </FacilitiesHeroSection>
    </Container>
  )
}

export default FacilitiesHero