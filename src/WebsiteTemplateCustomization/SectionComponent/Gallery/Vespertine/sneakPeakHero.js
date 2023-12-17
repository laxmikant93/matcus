/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sneek from "../Sneakpeak.png";
import sneek1 from "../../../assets/Vespertine/sneek1.jpg";
import sneek2 from "../../../assets/Vespertine/sneek2.jpg";
import sneek3 from "../../../assets/Vespertine/sneek3.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import DefaultImage from "../Sneakpeak.png";
import { Container } from '../../../CommonComponent/Container.styled';

const GalleryHomeHeroSection = styled.div`
padding: 32px 0;
`;
const SneekPeakHomeHero = styled.div`
`;
const SneekPeakHomeHeroHead = styled.div`
margin-bottom: 48px;
display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Gallery.GalleryHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryHero.h2.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Gallery.GalleryHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Gallery.GalleryHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Gallery.GalleryHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Gallery.GalleryHero.h2.Alignment};
color: ${({ theme }) => theme.Gallery.GalleryHero.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.Gallery.GalleryHero.h3.FontWeight};
  font-size: ${({ theme }) => theme.Gallery.GalleryHero.h3.FontSize};
  line-height: ${({ theme }) => theme.Gallery.GalleryHero.h3.LineHeight};
  font-style: ${({ theme }) => theme.Gallery.GalleryHero.h3.FontStyle};
  font-family: ${({ theme }) => theme.Gallery.GalleryHero.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Gallery.GalleryHero.h3.LetterSpacing};
  color: ${({ theme }) => theme.Gallery.GalleryHero.h3.Color};
  text-align: ${({ theme }) => theme.Gallery.GalleryHero.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Gallery.GalleryHero.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Gallery.GalleryHero.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Gallery.GalleryHero.BorderBottom.BottomSpace};
  }
  }
`;
const SneekPeakSliderImage = styled.div`
width: 100%;
height: 340px;
img{
width: 100%;
height: 100%;
display: block;
object-fit: cover;
border-radius: 24px;
@media screen and (max-width: 768px) {
  width: 100%;
   }
}
`;
const SneekPeakHomeHeroAlbum = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
     }
`;
const ViewMoreSneekPeakButton = styled.a`

font-weight: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.LineHeight};
background: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Background};
border: 1px solid ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.BorderColor};
border-radius: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.BorderRadius};
color: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Color};
padding: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.PaddingY} ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Hover.Background};
color: ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Gallery.GalleryHero.ViewMoreGalleryButton.Hover.BorderColor};
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

const SneakPeakHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data, success } = useSelector((state) => state.websiteTemplate.gallery)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

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

  return (
    <Container>
    <GalleryHomeHeroSection>
      <SneekPeakHomeHero>
        <SneekPeakHomeHeroHead>
          <h2>{(subheadersData && subheadersData['galleryhead']) || "Sneak Peak"}</h2>
          <h3>{(subheadersData && subheadersData['gallerysubhead']) || ""}</h3>

        </SneekPeakHomeHeroHead>
        {
          success && data.length ?
            <SneekPeakHomeHeroAlbum>
              {data.map((item, key) => {

                return (
                  <SneekPeakSliderImage key={key}>
                    <img src={item?.thumbnail&&item.thumbnail.src ? item?.thumbnail.src.includes(".mp4") ? DefaultImage : item?.thumbnail.src : DefaultImage} alt="Album" />
                  </SneekPeakSliderImage>
                )
              })}
            </SneekPeakHomeHeroAlbum> : <SneekPeakHomeHeroAlbum>
              <SneekPeakSliderImage>
                <img src={sneek2} alt="" />
              </SneekPeakSliderImage>
              <SneekPeakSliderImage>
                <img src={sneek3} alt="" />
              </SneekPeakSliderImage>
            </SneekPeakHomeHeroAlbum>
        }
        <ViewMoreButtonSection>
          <ViewMoreSneekPeakButton onClick={() => handleViewMoreButton()}>
            View More
          </ViewMoreSneekPeakButton>
        </ViewMoreButtonSection>
      </SneekPeakHomeHero>
    </GalleryHomeHeroSection>
    </Container>
  )
}

export default SneakPeakHero