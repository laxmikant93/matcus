/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import GalleryListPage from '../Vespertine/GalleryListPage';
import React, { useState } from 'react';
import sneek from "../Sneakpeak.png";
import sneek1 from "../../../assets/Vespertine/sneek1.jpg";
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";



const CatergoryGalleryHomeHeroSection = styled.div`
margin-top: 48px;
`;
const CatergoryGalleryHomeHero = styled.div`
`;
const CatergoryGalleryHomeHeroHead = styled.div`
h2{

  font-weight: ${({ theme }) => theme.CatergoryGalleryHero.h2.FontWeight};
  font-size: ${({ theme }) => theme.CatergoryGalleryHero.h2.FontSize};
  line-height: ${({ theme }) => theme.CatergoryGalleryHero.h2.LineHeight};
  font-style: ${({ theme }) => theme.CatergoryGalleryHero.h2.FontStyle};
  font-family: ${({ theme }) => theme.CatergoryGalleryHero.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.CatergoryGalleryHero.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.CatergoryGalleryHero.h2.Alignment};
  color: ${({ theme }) => theme.CatergoryGalleryHero.h2.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
  h3{
    font-weight: ${({ theme }) => theme.CatergoryGalleryHero.h3.FontWeight};
    font-size: ${({ theme }) => theme.CatergoryGalleryHero.h3.FontSize};
    line-height: ${({ theme }) => theme.CatergoryGalleryHero.h3.LineHeight};
    font-style: ${({ theme }) => theme.CatergoryGalleryHero.h3.FontStyle};
    font-family: ${({ theme }) => theme.CatergoryGalleryHero.h3.FontFamily};
    letter-spacing: ${({ theme }) => theme.CatergoryGalleryHero.h3.LetterSpacing};
    color: ${({ theme }) => theme.CatergoryGalleryHero.h3.Color};
    text-align: ${({ theme }) => theme.CatergoryGalleryHero.h3.Alignment};
    position: relative;
    display: inline-block;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
`;
const CatergoryGalleryItem = styled.figure`
position: relative;
cursor: pointer;
`;
const CatergoryGalleryImage = styled.div`
width: 100%;
height: 100%;
img{
  border-radius: 5px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
`;
const CatergoryGalleryCaption = styled.figcaption`
position: absolute;
width: 100%;
bottom: 0;
height: 100%;
display: flex;
align-items: flex-end;
justify-content: flex-start;
border-radius: 5px;
background: ${({ theme }) => theme.CatergoryGalleryHero.CatergoryGalleryCaption.Background};
padding: 32px;
h6{
  font-weight: ${({ theme }) => theme.CatergoryGalleryHero.h6.FontWeight};
  font-size: ${({ theme }) => theme.CatergoryGalleryHero.h6.FontSize};
  line-height: ${({ theme }) => theme.CatergoryGalleryHero.h6.LineHeight};
  font-style: ${({ theme }) => theme.CatergoryGalleryHero.h6.FontStyle};
  font-family: ${({ theme }) => theme.CatergoryGalleryHero.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.CatergoryGalleryHero.h6.LetterSpacing};
  color: #FFFFFF;
  text-align: ${({ theme }) => theme.CatergoryGalleryHero.h6.Alignment};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const CatergoryGalleryHeroGrid = styled.div`

  margin-top: 48px;
  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
  .slick-slide > div {
    margin: 0 16px;
  }
  .slick-list {
    margin: 0 -16px;
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
        margin-left: 0.5rem;
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
        margin-left: 0.5rem;
        }
      }
`;
const ViewMoreSection = styled.div`
margin-top: ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreSection.MarginTop};
display: grid;
align-items: center;
grid-template-columns: 1fr auto;
`;

const ViewMoreSectionDivider = styled.div`
    width: 100%;
    height: 2px;
    background:  ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreSectionDivider.Background};
`;

const ViewMoreButton = styled.a`
font-weight: ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.FontWeight};
font-size: ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.FontSize};
line-height: ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.LineHeight};
border-radius: ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.BorderRadius};
color: ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.Color};
padding: 8px 24px 8px 8px;
cursor: pointer;
position: relative;
text-decoration: none;
&::after{
  content: '';
  width: 6px;
  height: 6px;
  border-right: 2px solid  ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.Hover.Color};
  border-bottom: 2px solid ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.Hover.Color};
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
 background:   ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.Hover.Color};
 position: absolute;
 right: 2px;
 left: auto;
 top: 19px;
}
&:hover{
color: ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.Hover.Color};
text-decoration: underline;
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
&::after{
  border-color: ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.Hover.Color};
}
&::before{  
 background: ${({ theme }) => theme.CatergoryGalleryHero.ViewMoreButton.Hover.Color};
}
}
`;



const GalleryHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  // const { data, success } = useSelector((state) => state.serviceTemplate.gallery)
  const { data } = useSelector((state) => state.serviceTemplate.getTemplate.data.bookAppointCategory)
  const [galleryList, setGalleryList] = useState(false);
  const [galleryId, setGalleryId] = useState([])
  const handleGalleryAlbum = (item) => {
    setGalleryList(true);
    setGalleryId(item)
  }
  const { route, preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/gallery", true))
    }
    else {
      history("/gallery")
    }
  }
  const settingsCategoryGalleryHero = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6 > 3 ? 3 : 6,
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
  return (
    <React.Fragment>
      <CatergoryGalleryHomeHeroSection>
        <CatergoryGalleryHomeHero>
          <CatergoryGalleryHomeHeroHead>
            <h2>Our Categories</h2>
            <h3>Always Caring</h3>
          </CatergoryGalleryHomeHeroHead>
          <CatergoryGalleryHeroGrid>


            {data.length ?

              <Slider {...settingsCategoryGalleryHero}>
                {data.map((item, key) => {

                  return (
                    <CatergoryGalleryItem>
                      <CatergoryGalleryImage>
                        <img src={item.uploadefile ? item.uploadefile : DefaultImage} alt="" />
                      </CatergoryGalleryImage>
                      <CatergoryGalleryCaption>
                        <h6>{item.main_category_name}</h6>
                      </CatergoryGalleryCaption>
                    </CatergoryGalleryItem>
                  )
                })}
              </Slider>

              :
              <>
                <Slider {...settingsCategoryGalleryHero}>
                  <CatergoryGalleryItem>
                    <CatergoryGalleryImage>
                      <img src={Default1} alt="" />
                    </CatergoryGalleryImage>
                    <CatergoryGalleryCaption>
                      <h6>Neurology</h6>
                    </CatergoryGalleryCaption>
                  </CatergoryGalleryItem>
                  <CatergoryGalleryItem>
                    <CatergoryGalleryImage>
                      <img src={Default2} alt="" />
                    </CatergoryGalleryImage>
                    <CatergoryGalleryCaption>
                      <h6>Bones</h6>
                    </CatergoryGalleryCaption>
                  </CatergoryGalleryItem>
                  <CatergoryGalleryItem>
                    <CatergoryGalleryImage>
                      <img src={Default3} alt="" />
                    </CatergoryGalleryImage>
                    <CatergoryGalleryCaption>
                      <h6>Oncology</h6>
                    </CatergoryGalleryCaption>
                  </CatergoryGalleryItem>

                </Slider> </>
            }

          </CatergoryGalleryHeroGrid>
          <ViewMoreSection>
            <ViewMoreSectionDivider></ViewMoreSectionDivider>
            <ViewMoreButton onClick={() => handleViewMoreButton()}>
              View All
            </ViewMoreButton>
          </ViewMoreSection>
        </CatergoryGalleryHomeHero>
      </CatergoryGalleryHomeHeroSection>

    </React.Fragment >
  )
}

export default GalleryHero