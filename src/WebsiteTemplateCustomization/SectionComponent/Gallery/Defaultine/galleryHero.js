/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import GalleryListPage from './GalleryListPage';
import React, { useState } from 'react';
import sneek from "../Sneakpeak.png";
// import sneek1 from "../../../assets/Vespertine/sneek1.jpg";/
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from './../../../../Common/ImageViewer';


const GalleryHomeHeroSection = styled.div`
padding: 20px 0;
`;
const GalleryHomeHero = styled.div`
`;
const GalleryHomeHeroHead = styled.div`
margin-bottom: 24px;
h2{

font-weight: ${({ theme }) => theme.Gallery.GalleryHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryHero.h2.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Gallery.GalleryHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Gallery.GalleryHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Gallery.GalleryHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Gallery.GalleryHero.h2.Alignment};
color: ${({ theme }) => theme.Gallery.GalleryHero.h2.Color};
}
`;
const GalleryItem = styled.figure`
position: relative;
`;
const GalleryImage = styled.div`
width: 100%;
height: 280px;
img{
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
`;
const GalleryCaption = styled.figcaption`
position: absolute;
width: 100%;
bottom: 0;
height: 65px;
display: flex;
align-items: center;
justify-content: center;
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
background: rgba(9, 51, 81, 0.6);
h6{
font-weight: 500;
font-size: 18px;
line-height: 27px;
color: #FFFFFF;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const GalleryHeroGrid = styled.div`
/* display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 20px;
  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  } */

  .slick-slide {
    padding: 0px 10px;
  }

  .slick-prev {
    z-index: 1;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid rgba(0, 52, 89, 1);
    left: 0;
    position: absolute;
    top: -80px;
    left: 92%;
    
    @media screen and (max-width:1000px){
      left: 87%;
    }
    @media screen and (max-width:700px){
      left: 84%;
    }
    @media screen and (max-width:500px){
      left: 77%;
    }
  }

  .slick-dots li button:before{
    display: none;
  }

  .slick-prev:before {
    border-right: 2px solid rgba(0, 52, 89, 1);
    border-bottom: 2px solid rgba(0, 52, 89, 1);
    transform: rotate(135deg);
    color: transparent;
    width: 8px;
    height: 8px;
    top: 8px;
    left: 8px;
    z-index: 3;
  }

  .slick-prev:after{
    width: 12px;
    height: 1px;
    background-color: rgba(0, 52, 89, 1);
    top: 13px;
    left: 8px;
  }

  .slick-next {
    z-index: 1;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid rgba(0, 52, 89, 1);
    right: 0;
    position: absolute;
    top: -80px;
  }

  .slick-next:before {
    position: absolute;
    font-size: 40px;
    border-right: 2px solid rgba(0, 52, 89, 1);
    border-bottom: 2px solid rgba(0, 52, 89, 1);
    color: transparent;
    width: 8px;
    height: 8px;
    top: 8px;
    left: 8px;
    transform: rotate(-45deg);
  }


  .slick-next:after{
    width: 12px;
    height: 1px;
    background-color: rgba(0, 52, 89, 1);
    top: 13px;
    left: 5px;
  } 

  .slick-prev.slick-disabled:before, .slick-next.slick-disabled:before {
    opacity: 1;
  }
  .slick-prev:focus:before, .slick-next:focus:before {
    opacity: 0.3;
  }
  .slick-next.slick-disabled:before, .slick-prev.slick-disabled:before {
    opacity: 1;
  }
  .slick-next:focus:before, .slick-prev:focus:before {
    opacity: 0.3;
  }


  .slick-prev.slick-disabled:after, .slick-next.slick-disabled:after {
    opacity: 1;
  }
  .slick-prev:focus:after, .slick-next:focus:after {
    opacity: 0.3;
  }
  .slick-next.slick-disabled:after, .slick-prev.slick-disabled:after {
    opacity: 1;
  }
  .slick-next:focus:after, .slick-prev:focus:after {
    opacity: 0.3;
  }


  .slick-prev.slick-disabled, .slick-next.slick-disabled {
    opacity: 1;
  }
  .slick-prev:focus, .slick-next:focus {
    opacity: 0.3;
  }
  .slick-next.slick-disabled, .slick-prev.slick-disabled {
    opacity: 1;
  }
  .slick-next:focus, .slick-prev:focus {
    opacity: 0.3;
  }
`;
const ViewMoreGalleryButton = styled.a`

font-weight: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Background};
border-radius: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.BorderRadius};
color: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Background};
padding: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.PaddingY} ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Hover.Background};
color: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const ViewMoreButtonSection = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const GalleryHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data, success } = useSelector((state) => state.websiteTemplate.gallery)
    const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [galleryList, setGalleryList] = useState(false);
  const [galleryId, setGalleryId] = useState([])
  const handleGalleryAlbum = (item) => {
    // setGalleryList(true);
    history("/gallery")
    setGalleryId(item)
  }
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
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

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [

      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <Container>
      <React.Fragment>
        {
          galleryList ? <GalleryListPage galleryId={galleryId} />
            :
            <GalleryHomeHeroSection>
              <GalleryHomeHero>
                <GalleryHomeHeroHead>
                <h2>{(subheadersData && subheadersData['galleryhead']) || "GALLERY"}</h2>
                <h3>{(subheadersData && subheadersData['gallerysubhead']) || ""}</h3>
                </GalleryHomeHeroHead>
                <GalleryHeroGrid>

                  {
                    success && data.length ?
                    <Slider {...settings} >
                      {
                      data.map((item, key) => {
                        return (
                          <GalleryItem>
                            <GalleryImage key={key} onClick={() => handleGalleryAlbum(item._id)}>
                            {/* <ImageViewer object={item?.thumbnail} defaultImage={sneek}/> */}
                            <img src={item?.thumbnail&&item?.thumbnail.src ? item?.thumbnail.src.includes(".mp4") ? sneek : item?.thumbnail?.src : sneek} alt="Album" />
                            </GalleryImage>
                            <GalleryCaption>
                              <h6>{item.title ? item.title : "My Gallery"}</h6>
                            </GalleryCaption>
                          </GalleryItem>
                        )
                      }) 
                    }
                     </Slider>
                    :

                      <>
                        <Slider {...settings} >
                        <GalleryItem>
                          <GalleryImage>
                            <img src={Default2} alt="" />
                          </GalleryImage>
                          <GalleryCaption>
                            <h6>Fun Activities 2022</h6>
                          </GalleryCaption>
                        </GalleryItem>
                        <GalleryItem>
                          <GalleryImage>
                            <img src={Default3} alt="" />
                          </GalleryImage>
                          <GalleryCaption>
                            <h6>Fun Fest 2022</h6>
                          </GalleryCaption>
                        </GalleryItem>
                        </Slider>
                      </>
                  }
                </GalleryHeroGrid>
                <ViewMoreButtonSection>
                  <ViewMoreGalleryButton onClick={() => handleViewMoreButton()}>
                    View All
                  </ViewMoreGalleryButton>
                </ViewMoreButtonSection>
              </GalleryHomeHero>
            </GalleryHomeHeroSection>
        }

      </React.Fragment>
    </Container>
  )
}

export default GalleryHero