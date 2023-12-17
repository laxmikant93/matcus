/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Default from "../Admissions.png";
import Default2 from "./defaultImage2.svg";
import { useDispatch, useSelector } from 'react-redux';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../CommonComponent/Container.styled';
import Slider from 'react-slick';
import ImageViewer from '../../../../Common/ImageViewer';


const AnnouncementHomeHeroSection = styled.div`
padding: 20px 0;
position:relative;

.slick-slide {
  padding: 0px 10px;
}

.slick-prev {
  z-index: 1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(0, 52, 89, 1);
  left: 0;
  position: absolute;
  top: -80px;
  left: 91%;
  color:rgba(0,52,89,1);
  &:hover{
  color:rgba(0,52,89,1);
  }
  
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
  transform: translate(-50%,-50%) rotate(137deg);
  color: transparent;
  width: 8px;
  height: 8px;
  top: 50%;
  left: 15px;
  z-index: 3;
}

.slick-prev:after{
  transform: translate(-50%, -50%);
  width: 12px;
  height: 2px;
  background-color: rgba(0, 52, 89, 1);
  top: 50%;
  left: 17px;
}

.slick-next {
  z-index: 1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(0, 52, 89, 1);
  right: 0;
  position: absolute;
  top: -80px;
  color:rgba(0,52,89,1);
  &:hover{
  color:rgba(0,52,89,1);
  }
}

.slick-next:before {
  position: absolute;
  font-size: 40px;
  border-right: 2px solid rgba(0, 52, 89, 1);
  border-bottom: 2px solid rgba(0, 52, 89, 1);
  color: transparent;
  width: 8px;
  height: 8px;
  top: 50%;
  left: 17px;
  transform: translate(-50%,-50%) rotate(-45deg);
}


.slick-next:after{
  width: 12px;
  height: 2px;
  background-color: rgba(0, 52, 89, 1);
  transform: translate(-50%,-50%);
  top: 50%;
  left: 15px;
} 

.slick-prev.slick-disabled:before, .slick-next.slick-disabled:before {
  opacity: 1;
}
 {/* .slick-prev:focus:before, .slick-next:focus:before {
  opacity: 0.3;
} */}
.slick-next.slick-disabled:before, .slick-prev.slick-disabled:before {
  opacity: 1;
}
{ /* .slick-next:focus:before, .slick-prev:focus:before {
  opacity: 0.3;
} */}


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
const AnnouncementHomeHero = styled.div`
`;
const AnnouncementHomeHeroHead = styled.div`
margin-bottom: 24px;
h2{

font-weight: ${({ theme }) => theme.Announcement.AnnouncementHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Announcement.AnnouncementHero.h2.FontSize};
line-height: ${({ theme }) => theme.Announcement.AnnouncementHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Announcement.AnnouncementHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Announcement.AnnouncementHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Announcement.AnnouncementHero.h2.Alignment};
color: ${({ theme }) => theme.Announcement.AnnouncementHero.h2.Color};
}
`;
const AnnouncementItem = styled.figure`
position: relative;
`;
const AnnouncementImage = styled.div`
width: 100%;
height: 240px;
img{
  border-radius: 16px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
`;
const AnnouncementCaption = styled.figcaption`
position: absolute;
width: 100%;
bottom: 0;
height: 40px;
background: ${({ theme }) => theme.Announcement.AnnouncementHero.AnnouncementCaption.Background};
border-bottom-left-radius: 16px;
border-bottom-right-radius: 16px;
padding: 8px 12px;
h6{
font-weight: ${({ theme }) => theme.Announcement.AnnouncementHero.h6.FontWeight};
font-size: ${({ theme }) => theme.Announcement.AnnouncementHero.h6.FontSize};
line-height: ${({ theme }) => theme.Announcement.AnnouncementHero.h6.LineHeight};
font-style: ${({ theme }) => theme.Announcement.AnnouncementHero.h6.FontStyle};
font-family: ${({ theme }) => theme.Announcement.AnnouncementHero.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.Announcement.AnnouncementHero.h6.LetterSpacing};
text-align: ${({ theme }) => theme.Announcement.AnnouncementHero.h6.Alignment};
color: #FFFFFF;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const AnnouncementHeroGrid = styled.div`
display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const ViewMoreAnnouncementButton = styled.a`

font-weight: ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.FontWeight};
font-size: ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.FontSize};
line-height: ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.Background};
border-radius: ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.BorderRadius};
color: ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.Background};
padding: ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.PaddingY} ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.Hover.Background};
color: ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Announcement.AnnouncementHero.ViewMoreAnnouncementButton.Hover.Background};
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

const AnnouncementHero = () => {
  const { announcementData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const history = useNavigate();
  const dispatch = useDispatch();
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })
  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/announcements", true))
    }
    else {
      history("/announcements")
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
      <AnnouncementHomeHeroSection>
        <AnnouncementHomeHero>
          <AnnouncementHomeHeroHead>
          <h2>{(subheadersData && subheadersData['announcementhead']) || "Announcements"}</h2>
          <h3>{(subheadersData && subheadersData['announcementsubhead']) || ""}</h3>
          </AnnouncementHomeHeroHead>
          {/* <AnnouncementHeroGrid> */}
          <Slider {...settings}>
            {
              announcementData && announcementData.length ?
                announcementData.map((item, key) => {
                  return (
                    <AnnouncementItem key={key}>
                      <AnnouncementImage>
                        <ImageViewer object={item.thumbnail} defaultImage={Default}/>
                        {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : Default} alt="" /> */}
                      </AnnouncementImage>
                      <AnnouncementCaption>
                        <h6>{item.title}</h6>
                      </AnnouncementCaption>
                    </AnnouncementItem>

                  )
                }
                ) :
                <AnnouncementItem>
                  <AnnouncementImage>
                    <img src={Default2} alt="" />
                  </AnnouncementImage>
                  <AnnouncementCaption>
                    <h6>Parent Teacher Meeting on 5th June </h6>
                  </AnnouncementCaption>
                </AnnouncementItem>
            }
          </Slider>

          {/* </AnnouncementHeroGrid> */}
          <ViewMoreButtonSection>
            <ViewMoreAnnouncementButton onClick={() => handleViewMoreButton()}>
              View All
            </ViewMoreAnnouncementButton>
          </ViewMoreButtonSection>
        </AnnouncementHomeHero>
      </AnnouncementHomeHeroSection>
    </Container>
  )
}

export default AnnouncementHero