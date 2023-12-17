/* eslint-disable jsx-a11y/no-distracting-elements */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import DefaultVacancyImage from "../defaultImage.svg";
import DefaultVacancyImage1 from "../Admissions.png";
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";

const VacancyHomeHeroSection = styled.div`
margin-top: 48px;
`;
const VacancyHomeHero = styled.div`

`;
const VacancyHomeHeroHead = styled.div`
margin-bottom: ${({ theme }) => theme.Vacancy?.VacancyHero.VacancyHomeHeroHead.MarginBottom};
text-align: ${({ theme }) => theme.Vacancy?.VacancyHero.VacancyHomeHeroHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.Vacancy.VacancyHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Vacancy.VacancyHero.h2.FontSize};
line-height: ${({ theme }) => theme.Vacancy.VacancyHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Vacancy.VacancyHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Vacancy.VacancyHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Vacancy.VacancyHero.h2.LetterSpacing};
color: ${({ theme }) => theme.Vacancy.VacancyHero.h2.Color};
}
}
`;
const VacancyHomeHeroDescription = styled.div`
display: grid;
grid-template-columns:  repeat(2, 1fr);
gap:30px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const VacancyCard = styled.div`
width: 100%;
height: 401px;
position: relative;
img{
object-fit: cover;
  width: 100%;
  border-radius: 24px;  
  height: 100%;
}
`;
const VacancyCardOverlay = styled.div`

width: 100%;
background: linear-gradient(180deg, rgba(32, 32, 32, 0) 60.3%, #202020 92.51%);
height: 100%;
position: absolute;
bottom: 0;
border-radius: 24px;
padding:32px;
&::after{
  width: 40%;
height: 2px;
background: ${({ theme }) => theme.Vacancy?.VacancyHero.h6.Color};
bottom: 32px;
left:32px;
}
h6{
  
  font-weight: ${({ theme }) => theme.Vacancy.VacancyHero.h6.FontWeight};
  font-size: ${({ theme }) => theme.Vacancy.VacancyHero.h6.FontSize};
  line-height: ${({ theme }) => theme.Vacancy.VacancyHero.h6.LineHeight};
  font-style: ${({ theme }) => theme.Vacancy.VacancyHero.h6.FontStyle};
  font-family: ${({ theme }) => theme.Vacancy.VacancyHero.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Vacancy.VacancyHero.h6.LetterSpacing};
  color: ${({ theme }) => theme.Vacancy.VacancyHero.h6.Color};
  position: absolute;
  bottom: 40px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
},
`;
const ViewMoreVacancyHeroSection = styled.div`
display: flex;
justify-content: center;
margin-top: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroSection.MarginTop};
}
`;
const ViewMoreVacancyHeroButton = styled.a`
font-style: normal;
font-weight: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.FontWeight};
font-size: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.FontSize};
line-height: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.LineHeight};
background: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.Background};
border: 1px solid ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.BorderColor};
border-radius: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.BorderRadius};
color: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.Color};
padding: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.PaddingY} ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.Hover.Background};
color: ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Vacancy?.VacancyHero.ViewMoreVacancyHeroButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const VacancyHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { vacancyData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)


  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/vacancy", true))
    }
    else {
      history("/vacancy")
    }
  }

  return (
    <VacancyHomeHeroSection>
      <VacancyHomeHero>
        <VacancyHomeHeroHead>
          <h2>{(subheadersData && subheadersData['vacancyhead']) || "Vacancy"}</h2>
          <h3>{(subheadersData && subheadersData['vacancysubhead']) || "Vacancy"}</h3>


        </VacancyHomeHeroHead>
        <VacancyHomeHeroDescription>
          {
            vacancyData.length ?
              vacancyData.slice(0, 2).map((item, key) => {
                return (<VacancyCard key={key}>
                  <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultImage} alt="vacancy" />
                  <VacancyCardOverlay>
                    <h6>{item.title}</h6>
                  </VacancyCardOverlay>
                </VacancyCard>
                )
              }) :
              <VacancyCard>
                <img src={DefaultVacancyImage} alt="vacancy" />
                <VacancyCardOverlay>
                  <h6>lorem ipsum</h6>
                </VacancyCardOverlay>
              </VacancyCard>
          }
        </VacancyHomeHeroDescription>
        <ViewMoreVacancyHeroSection>
          <ViewMoreVacancyHeroButton onClick={() => handleViewMoreButton()}>
            View More
          </ViewMoreVacancyHeroButton>
        </ViewMoreVacancyHeroSection>
      </VacancyHomeHero>
    </VacancyHomeHeroSection>
  )
}

export default VacancyHero