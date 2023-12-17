/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Default2 from "./defaultImage2.svg";
import { useDispatch, useSelector } from 'react-redux';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { useNavigate } from 'react-router-dom';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";


const AnnouncementHomeHeroSection = styled.div`
margin-top: 48px;
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
height: 344px;
img{
  border-radius: 24px;
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
height: 65px;
background: ${({ theme }) => theme.Announcement.AnnouncementHero.AnnouncementCaption.Background};
border-bottom-left-radius: 24px;
border-bottom-right-radius: 24px;
padding: 24px;
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
  grid-template-columns: repeat(2, 1fr);
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
  const { announcementData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const history = useNavigate();
  const dispatch = useDispatch();
  const { route, preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
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
  return (
    <AnnouncementHomeHeroSection>
      <AnnouncementHomeHero>
        <AnnouncementHomeHeroHead>
          <h2>Announcement</h2>
        </AnnouncementHomeHeroHead>
        <AnnouncementHeroGrid>
          {
            announcementData && announcementData.length ?
              announcementData.map((item, key) => {
                return (
                  <AnnouncementItem key={key}>
                    <AnnouncementImage>
                      <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} alt="" />
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

        </AnnouncementHeroGrid>
        <ViewMoreButtonSection>
          <ViewMoreAnnouncementButton onClick={() => handleViewMoreButton()}>
            View All
          </ViewMoreAnnouncementButton>
        </ViewMoreButtonSection>
      </AnnouncementHomeHero>
    </AnnouncementHomeHeroSection>
  )
}

export default AnnouncementHero