/* eslint-disable jsx-a11y/no-distracting-elements */
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import Facilities1 from "./facilities-1.jpg";
import React, { useEffect, useState } from 'react';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";

const FacilitiesHeroSection = styled.div`
margin: 72px 0;
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
display: flex;
flex-direction: column;
justify-content: space-between;
@media screen and (max-width: 768px) {
  flex-direction: row;
  align-items: center;
}
`;

const FacilitiesMenuTabItem = styled.li`
text-align: center;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
@media screen and (max-width: 768px) {
  overflow: unset;
  border-radius: 0;
}
&:first-child{
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
}

`;
const FacilitiesMenuButton = styled.button`
font-weight: ${({ theme }) => theme.FacilitiesPage.FacilitiesMenuButton.FontWeight};
font-size: ${({ theme }) => theme.FacilitiesPage.FacilitiesMenuButton.FontSize};
line-height: ${({ theme }) => theme.FacilitiesPage.FacilitiesMenuButton.LineHeight};
color: ${({ theme }) => theme.FacilitiesPage.FacilitiesMenuButton.Color};
background: transparent;
padding: ${({ theme }) => theme.FacilitiesPage.FacilitiesMenuButton.PaddingY} ${({ theme }) => theme.FacilitiesPage.FacilitiesMenuButton.PaddingX};
cursor: pointer;
border: none;
outlinbe: none;
width: 100%;  
@media screen and (max-width: 768px) {
  white-space: nowrap;
  padding: 6px 16px;
}
&.active{
  background: ${({ theme }) => theme.FacilitiesPage.FacilitiesMenuButton.Active.Background};
  color: ${({ theme }) => theme.FacilitiesPage.FacilitiesMenuButton.Active.Color};
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
height: 300px;
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
font-weight: ${({ theme }) => theme.FacilitiesPage.h4.FontWeight};
font-size: ${({ theme }) => theme.FacilitiesPage.h4.FontSize};
line-height: ${({ theme }) => theme.FacilitiesPage.h4.LineHeight};
font-style: ${({ theme }) => theme.FacilitiesPage.h4.FontStyle};
font-family: ${({ theme }) => theme.FacilitiesPage.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.FacilitiesPage.h4.LetterSpacing};
color: ${({ theme }) => theme.FacilitiesPage.h4.Color};
margin-bottom: 16px;
position: relative;
&::after{
width: 100%;
height: ${({ theme }) => theme.FacilitiesPage.FacilitiesDescription.BorderBottom.Height};
background-color: ${({ theme }) => theme.FacilitiesPage.FacilitiesDescription.BorderBottom.Background};
bottom: ${({ theme }) => theme.FacilitiesPage.FacilitiesDescription.BorderBottom.BottomSpace};
}
}
p{

font-weight: ${({ theme }) => theme.FacilitiesPage.p.FontWeight};
font-size: ${({ theme }) => theme.FacilitiesPage.p.FontSize};
line-height: ${({ theme }) => theme.FacilitiesPage.p.LineHeight};
font-style: ${({ theme }) => theme.FacilitiesPage.p.FontStyle};
font-family: ${({ theme }) => theme.FacilitiesPage.p.FontFamily};
letter-spacing: ${({ theme }) => theme.FacilitiesPage.p.LetterSpacing};
color: ${({ theme }) => theme.FacilitiesPage.p.Color};
margin-bottom: 24px;
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
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

const FacilitiesMenuTabWrap = styled.div`
height: auto;
max-height: 90vh;
overflow: hidden;
overflow-y: auto;
scrollbar-width: thin;
position: sticky;
top: 0;
border: 1px solid #006f9c;
border-radius: 5px;
background: #FCFEFE;
@media screen and (max-width: 768px) {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  border: none;
  padding-bottom:  8px;
  border-radius: 0;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #006f9c; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #f48631; 
}
`;
const FacilitiesPage = () => {
  const { facilitiesData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const [facilityState, setFacilityState] = useState("")

  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  useEffect(() => {
    setFacilityState(facilitiesData.length ? facilitiesData[0] : "")
  }, [facilitiesData])
  const handleFacility = (item) => {
    setFacilityState(item)
  }
  return (
    <Container>
      <FacilitiesHeroSection>
        <FacilitiesHeroHead>
          {/* <h2>Our Facilites</h2>
          <h3>Care you can believe in</h3> */}
          <h2>{(subheadersData && subheadersData['servicehead']) || "School’s Facilities"}</h2>
          <h3>{(subheadersData && subheadersData['servicesubhead']) || "Care you can believe in"}</h3>

        </FacilitiesHeroHead>
        <FacilitiesHeroGrid>
          <FacilitiesMenuTabWrap>
            <FacilitiesMenuTab>
              {facilitiesData.length ?
                facilitiesData.map((item, key) => {
                  return (
                    <FacilitiesMenuTabItem>
                      <FacilitiesMenuButton type='button' onClick={() => handleFacility(item)} className={facilityState._id === item._id ? "active" : ""}>{item.title ? item.title : "Radiology"}</FacilitiesMenuButton>
                    </FacilitiesMenuTabItem>
                  )
                }) :
                <React.Fragment>
                  <FacilitiesMenuTabItem>
                    <FacilitiesMenuButton type='button' className='active'>Dermatology</FacilitiesMenuButton>
                  </FacilitiesMenuTabItem>
                  <FacilitiesMenuTabItem>
                    <FacilitiesMenuButton type='button'>Radiology</FacilitiesMenuButton>
                  </FacilitiesMenuTabItem>
                  <FacilitiesMenuTabItem>
                    <FacilitiesMenuButton type='button'>Opthalmology</FacilitiesMenuButton>
                  </FacilitiesMenuTabItem>
                  <FacilitiesMenuTabItem>
                    <FacilitiesMenuButton type='button'>Pathology</FacilitiesMenuButton>
                  </FacilitiesMenuTabItem>
                  <FacilitiesMenuTabItem>
                    <FacilitiesMenuButton type='button'>Neurology</FacilitiesMenuButton>
                  </FacilitiesMenuTabItem>
                  <FacilitiesMenuTabItem>
                    <FacilitiesMenuButton type='button'>ENT</FacilitiesMenuButton>
                  </FacilitiesMenuTabItem>
                </React.Fragment>
              }
            </FacilitiesMenuTab>
          </FacilitiesMenuTabWrap>
          <FacilitiesMenuTabContent>
            {
              facilityState ?

                <FacilitiesItem>
                  <FacilitiesDescription>
                    <h4>{facilityState.title}</h4>
                    {/* <p>{facilityState.details ? facilityState.details : "The Department of radio-diagnosis at Jeevan Hospital 1 is equipped with most advanced diagnostic equipment. Radio-diagnosis plays a crucial role in identification of an ailment. At Jeevan Hospital, our qualified technicians are dedicated to offer a wide range of high quality diagnostic services as below:"}</p> */}
                    <p dangerouslySetInnerHTML={{
                      __html:
                        facilityState.details,
                    }}></p>
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
                    <p> The Department of radio-diagnosis at Jeevan Hospital 1 is equipped with most advanced diagnostic equipment. Radio-diagnosis plays a crucial role in identification of an ailment. At Jeevan Hospital, our qualified technicians are dedicated to offer a wide range of high quality diagnostic services as below</p>

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

export default FacilitiesPage