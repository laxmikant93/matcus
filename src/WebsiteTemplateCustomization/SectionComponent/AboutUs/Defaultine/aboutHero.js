/* eslint-disable jsx-a11y/no-distracting-elements */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from '../../../../Common/ImageViewer';

const AboutHeroSection = styled.div`
padding: 80px 0 40px 0;
`;
const SectionGrid = styled.div`
background: ${({ theme }) => theme.AboutUs.AboutUsHero.SectionGrid.Background};
display: grid;
grid-template-columns:  1fr;
gap: 30px;

align-items: flex-start;
@media (max-width: 768px) {
  grid-template-columns: 1fr;

}
`;
const SectionMedia = styled.div`
/* width: ; */
height: 300px;
order: 3;
display: flex;
justify-content: center;

@media (max-width: 768px) {
 width: 100%;
 height: auto;
}
img{
width: 100%;
height: 100%;
border-radius: 16px;
}
`;
const SectionHead = styled.div`
margin-bottom: ${({ theme }) => theme.AboutUs.AboutUsHero.SectionHead.MarginBottom};
text-align: ${({ theme }) => theme.AboutUs.AboutUsHero.SectionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.Color};
text-align: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.Alignment};
}
h3{
font-weight: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.Color};
text-align: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.Alignment};
position: relative;
display: inline-block;
&::after{
width: 100%;
height: ${({ theme }) => theme.AboutUs.AboutUsHero.BorderBottom.BorderWidth};
background-color: ${({ theme }) => theme.AboutUs.AboutUsHero.BorderBottom.Background};
bottom: ${({ theme }) => theme.AboutUs.AboutUsHero.BorderBottom.BottomSpace};
}
}
`;
const SectionDescription = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;

order: 2;
div{
  display: -webkit-box;
-webkit-line-clamp: 8;
-webkit-box-orient: vertical;
overflow: hidden;
width: 100%;
position: relative;


p{
text-align: ${({ theme }) => theme.AboutUs.AboutUsHero.p.Alignment};

font-weight: ${({ theme }) => theme.AboutUs.AboutUsHero.p.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsHero.p.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsHero.p.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsHero.p.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsHero.p.LetterSpacing};
letter-spacing: 0.02em;
color: ${({ theme }) => theme.AboutUs.AboutUsHero.p.Color};


}
}
`;
const ViewMoreButton = styled.a`
font-weight: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.BorderColor};
border-radius: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.BorderRadius};
color: ${({ theme }) => theme.AboutUs.AboutUsHero.p.Color};
padding: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.PaddingY} ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.PaddingX};
cursor: pointer;
text-decoration: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.TextDecoration};
text-align: center;
width: 100%;
&:hover{
background: transparent;
color: ${({ theme }) => theme.AboutUs.AboutUsHero.p.Color};
border: 1px solid ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const AboutHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/aboutus", true))
    }
    else {
      history("/aboutus")
    }
  }
  return (
    <Container>
      <AboutHeroSection>
        <SectionGrid>
          {instituteData.institute_about_upload &&
            <SectionMedia>
              {instituteData.institute_about_upload_type && instituteData.institute_about_upload?.src && instituteData.institute_about_upload_type === "video" ?
                instituteData.institute_about_upload?.src&&instituteData.institute_about_upload.src.includes("embed") ?
                  <iframe
                    title="youtube video"
                    src={instituteData.institute_about_upload&&instituteData.institute_about_upload.src && instituteData.institute_about_upload.src}
                    frameborder="0"
                    width="350"
                    height="250"
                    autoPlay={true}
                    allow='autoplay'
                  ></iframe> :
                  <video src={instituteData.institute_about_upload.src} alt="" controls autoPlay={true}
                    muted />
                :
                <ImageViewer object={instituteData.institute_about_upload} />
                // <img src={instituteData.institute_about_upload} alt="" />
              }
              {/* <img src={instituteData.institute_about_upload} alt="" /> */}
            </SectionMedia>}
          <SectionDescription>
            <SectionHead>
              <h2>About us</h2>
            </SectionHead>
            <div>
              <div className='sun-editor-output'

                dangerouslySetInnerHTML={{
                  __html:
                    instituteData.institute_about ? instituteData.institute_about  
                    :
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et."
                  
                }}

              >
              </div>
              {/* <ViewMoreButton onClick={handleViewMoreButton}>
            see more
          </ViewMoreButton> */}
            </div>
            &nbsp;<ViewMoreButton onClick={handleViewMoreButton}>
              see more
            </ViewMoreButton>

          </SectionDescription>
      
        </SectionGrid>
      </AboutHeroSection>
    </Container>
  )
}

export default AboutHero