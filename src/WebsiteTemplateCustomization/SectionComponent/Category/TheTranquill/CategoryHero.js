/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRouteForPreview, setParamId } from '../../../../store/actions/serviceWebsiteTemplate';
import { useNavigate } from 'react-router-dom';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import { Container } from '../../../CommonComponent/Container.styled';



const CatergoryHomeHeroSection = styled.div`
margin-top: 48px;
`;
const CatergoryHomeHero = styled.div`
`;
const CatergoryHomeHeroHead = styled.div`
h2{

  font-weight: ${({ theme }) => theme.CategoryHero.h2.FontWeight};
  font-size: ${({ theme }) => theme.CategoryHero.h2.FontSize};
  line-height: ${({ theme }) => theme.CategoryHero.h2.LineHeight};
  font-style: ${({ theme }) => theme.CategoryHero.h2.FontStyle};
  font-family: ${({ theme }) => theme.CategoryHero.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.CategoryHero.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.CategoryHero.h2.Alignment};
  color: ${({ theme }) => theme.CategoryHero.h2.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
  h3{
    font-weight: ${({ theme }) => theme.CategoryHero.h3.FontWeight};
    font-size: ${({ theme }) => theme.CategoryHero.h3.FontSize};
    line-height: ${({ theme }) => theme.CategoryHero.h3.LineHeight};
    font-style: ${({ theme }) => theme.CategoryHero.h3.FontStyle};
    font-family: ${({ theme }) => theme.CategoryHero.h3.FontFamily};
    letter-spacing: ${({ theme }) => theme.CategoryHero.h3.LetterSpacing};
    color: ${({ theme }) => theme.CategoryHero.h3.Color};
    text-align: ${({ theme }) => theme.CategoryHero.h3.Alignment};
    position: relative;
    display: inline-block;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
`;
const CatergoryItem = styled.figure`
position: relative;
cursor: pointer;
`;
const CatergoryImage = styled.div`
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
const CatergoryCaption = styled.figcaption`
position: absolute;
width: 100%;
bottom: 0;
height: 100%;
display: flex;
align-items: flex-end;
justify-content: flex-start;
border-radius: 5px;
background: ${({ theme }) => theme.CategoryHero.CatergoryCaption.Background};
padding: 32px;
h6{
  font-weight: ${({ theme }) => theme.CategoryHero.h6.FontWeight};
  font-size: ${({ theme }) => theme.CategoryHero.h6.FontSize};
  line-height: ${({ theme }) => theme.CategoryHero.h6.LineHeight};
  font-style: ${({ theme }) => theme.CategoryHero.h6.FontStyle};
  font-family: ${({ theme }) => theme.CategoryHero.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.CategoryHero.h6.LetterSpacing};
  color: #FFFFFF;
  text-align: ${({ theme }) => theme.CategoryHero.h6.Alignment};
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const CategoryHeroGrid = styled.div`

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
    color: ${({ theme }) => theme.CategoryHero.Dots.Active.Color};
    }
    }
    }
    button{
    &::before{
    font-size: 12px;
    color: ${({ theme }) => theme.CategoryHero.Dots.Color};
    }
    }
    }
    .slick-prev{
      content: '';
      width: 1.3rem;
      height: 1.3rem;
      border-right: 2px solid ${({ theme }) => theme.CategoryHero.SlickArrowColor.Color};
      border-bottom: 2px solid ${({ theme }) => theme.CategoryHero.SlickArrowColor.Color};
      z-index: 0;
      margin-left: -0.5rem;
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      &::before{
      color: transparent;
      }
      &:hover{
        border-right: 2px solid ${({ theme }) => theme.CategoryHero.SlickArrowColor.Hover.Color};
        border-bottom: 2px solid ${({ theme }) => theme.CategoryHero.SlickArrowColor.Hover.Color};    
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
      border-left: 2px solid ${({ theme }) => theme.CategoryHero.SlickArrowColor.Color};
      border-bottom: 2px solid ${({ theme }) => theme.CategoryHero.SlickArrowColor.Color};
      z-index: 0;
      margin-right: -0.5rem;
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
      &::before{
      color: transparent;
      }
      &:hover{
        border-left: 2px solid ${({ theme }) => theme.CategoryHero.SlickArrowColor.Hover.Color};
        border-bottom: 2px solid ${({ theme }) => theme.CategoryHero.SlickArrowColor.Hover.Color};    
      }
      @media screen and (max-width: 768px) {
        width: 1rem;
        height: 1rem;
        margin-right: 0;
        right: 15px;
        }
      }
`;
const ViewMoreSection = styled.div`
margin-top: ${({ theme }) => theme.CategoryHero.ViewMoreSection.MarginTop};
display: grid;
align-items: center;
grid-template-columns: 1fr auto;
`;

const ViewMoreSectionDivider = styled.div`
    width: 100%;
    height: 2px;
    background:  ${({ theme }) => theme.CategoryHero.ViewMoreSectionDivider.Background};
`;

const ViewMoreButton = styled.a`
font-weight: ${({ theme }) => theme.CategoryHero.ViewMoreButton.FontWeight};
font-size: ${({ theme }) => theme.CategoryHero.ViewMoreButton.FontSize};
line-height: ${({ theme }) => theme.CategoryHero.ViewMoreButton.LineHeight};
border-radius: ${({ theme }) => theme.CategoryHero.ViewMoreButton.BorderRadius};
color: ${({ theme }) => theme.CategoryHero.ViewMoreButton.Color};
padding: 8px 24px 8px 8px;
cursor: pointer;
position: relative;
text-decoration: none;
&::after{
  content: '';
  width: 6px;
  height: 6px;
  border-right: 2px solid  ${({ theme }) => theme.CategoryHero.ViewMoreButton.Hover.Color};
  border-bottom: 2px solid ${({ theme }) => theme.CategoryHero.ViewMoreButton.Hover.Color};
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
 background:   ${({ theme }) => theme.CategoryHero.ViewMoreButton.Hover.Color};
 position: absolute;
 right: 2px;
 left: auto;
 top: 19px;
}
&:hover{
color: ${({ theme }) => theme.CategoryHero.ViewMoreButton.Hover.Color};
text-decoration: underline;
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
&::after{
  border-color: ${({ theme }) => theme.CategoryHero.ViewMoreButton.Hover.Color};
}
&::before{  
 background: ${({ theme }) => theme.CategoryHero.ViewMoreButton.Hover.Color};
}
}
`;



const CategoryPage = () => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { data } = useSelector((state) =>{
    return{
      data: state.serviceTemplate.getTemplate.data.bookAppointCategory
    }
  })
  const { preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/categories", true))
    }
    else {
      history("/categories")
    }
  }

  const settingsCategorycategoryHero = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6 > 3 ? 3 : 6,
    slidesToScroll: 1,
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

  const handleViewCategory = (item) => {
    if (preview) {
      dispatch(selectRouteForPreview(`/category-services/${item._id}`, true))
      dispatch(setParamId(item._id))
    } else {
      history(`/category-services/${item._id}`)
    }
  }

  return (
    <React.Fragment>
      <Container>
        <CatergoryHomeHeroSection>
          <CatergoryHomeHero>
            <CatergoryHomeHeroHead>
              <h2>{(subheadersData && subheadersData['categoryhead']) || "Our Categories"}</h2>
              <h3>{(subheadersData && subheadersData['categorysubhead']) || "Always Caring"}</h3>
            </CatergoryHomeHeroHead>
            <CategoryHeroGrid>
              {data.filter((item) => item.markAsFeatured === true).length ?
                <Slider {...settingsCategorycategoryHero}>
                  {data.filter((item) => item.markAsFeatured === true).map((item, key) => {
                    return (
                      <CatergoryItem key={key} onClick={() => handleViewCategory(item)} >
                        <CatergoryImage>
                          <img src={item.uploadefile ? item.uploadefile : DefaultImage} alt="" />
                        </CatergoryImage>
                        <CatergoryCaption>
                          <h6>{item.main_category_name}</h6>
                        </CatergoryCaption>
                      </CatergoryItem>
                    );
                  })}
                </Slider>
                :

                <Slider {...settingsCategorycategoryHero}>
                  <CatergoryItem>
                    <CatergoryImage>
                      <img src={Default1} alt="" />
                    </CatergoryImage>
                    <CatergoryCaption>
                      <h6>Neurology</h6>
                    </CatergoryCaption>
                  </CatergoryItem>
                  <CatergoryItem>
                    <CatergoryImage>
                      <img src={Default2} alt="" />
                    </CatergoryImage>
                    <CatergoryCaption>
                      <h6>Bones</h6>
                    </CatergoryCaption>
                  </CatergoryItem>
                </Slider>
              }
            </CategoryHeroGrid>
            <ViewMoreSection>
              <ViewMoreSectionDivider></ViewMoreSectionDivider>
              <ViewMoreButton onClick={() => handleViewMoreButton()}>
                View All
              </ViewMoreButton>
            </ViewMoreSection>
          </CatergoryHomeHero>
        </CatergoryHomeHeroSection>
      </Container>
    </React.Fragment>
  )
}

export default CategoryPage