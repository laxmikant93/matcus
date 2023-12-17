/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { Container } from '../../../CommonComponent/Container.styled';

const FaqsHomeHeroSection = styled.div`
padding: 40px 0;
`;
const FaqsHomeHero = styled.div`

`;
const FaqsHomeHeroHead = styled.div`
margin-bottom: ${({ theme }) => theme.Faqs.FaqsHero.FaqsHomeHeroHead.MarginBottom};
text-align: ${({ theme }) => theme.Faqs.FaqsHero.FaqsHomeHeroHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.Faqs.FaqsHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Faqs.FaqsHero.h2.FontSize};
line-height: ${({ theme }) => theme.Faqs.FaqsHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Faqs.FaqsHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Faqs.FaqsHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Faqs.FaqsHero.h2.LetterSpacing};
color: ${({ theme }) => theme.Faqs.FaqsHero.h2.Color};
}
}
`;
const FaqsHomeHeroDescription = styled.div`

`;
const FaqList = styled.ul`
padding: 0 20px;
`;
const FaqListItem = styled.li`
border-bottom: 1px solid ${({ theme }) => theme.Faqs.FaqsHero.FaqListItem.BorderColor};
padding: 16px 0 16px 24px;
h6{
  
  font-weight: ${({ theme }) => theme.Faqs.FaqsHero.h6.FontWeight};
  font-size: ${({ theme }) => theme.Faqs.FaqsHero.h6.FontSize};
  line-height: ${({ theme }) => theme.Faqs.FaqsHero.h6.LineHeight};
  font-style: ${({ theme }) => theme.Faqs.FaqsHero.h6.FontStyle};
  font-family: ${({ theme }) => theme.Faqs.FaqsHero.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Faqs.FaqsHero.h6.LetterSpacing};
  color: ${({ theme }) => theme.Faqs.FaqsHero.h6.Color};
  position: relative; 
  
  &::before{
    width: 8px;
    height: 8px;
    border-radius:50%;
    background: ${({ theme }) => theme.Faqs.FaqsHero.h6.Color};
    left: -20px;
    top: 8px;
  }
}
p{
  
  font-weight: ${({ theme }) => theme.Faqs.FaqsHero.p.FontWeight};
  font-size: ${({ theme }) => theme.Faqs.FaqsHero.p.FontSize};
  line-height: ${({ theme }) => theme.Faqs.FaqsHero.p.LineHeight};
  font-style: ${({ theme }) => theme.Faqs.FaqsHero.p.FontStyle};
  font-family: ${({ theme }) => theme.Faqs.FaqsHero.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Faqs.FaqsHero.p.LetterSpacing};
  color: ${({ theme }) => theme.Faqs.FaqsHero.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;
const ViewMoreFaqsHeroSection = styled.div`
display: flex;
justify-content: center;
margin-top: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroSection.MarginTop};
}
`;
const ViewMoreFaqsHeroButton = styled.a`

font-weight: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.FontWeight};
font-size: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.FontSize};
line-height: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Background};
border-radius: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.BorderRadius};
color: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Background};
padding: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.PaddingY} ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Hover.Background};
color: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const FaqHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { faqsData } = useSelector((state) => state.websiteTemplate.getTemplate.data);
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/faqs", true))
    }
    else {
      history("/faqs")
    }
  }

  return (
    <Container>
      <FaqsHomeHeroSection>
        <FaqsHomeHero>
          <FaqsHomeHeroHead>
            <h2>{(subheadersData && subheadersData['faqhead']) || "Frequently Asked Questions"}</h2>
            <h3>{(subheadersData && subheadersData['faqsubhead']) || ""}</h3>
          </FaqsHomeHeroHead>
          <FaqsHomeHeroDescription>
            <FaqList>
              {
                faqsData && faqsData.length ?
                  faqsData.slice(0, 3).map((item, key) => {
                    return (
                      <FaqListItem key={key}>
                        <h6>{item.title}</h6>
                        <p dangerouslySetInnerHTML={{
                        __html:
                          item.description,
                      }}></p>
                      </FaqListItem>
                    )
                  }) :
                  <FaqListItem>
                    <h6>What is your school philosophy or vision?</h6>
                    <p>It’s important to find out what a school’s philosophy or vision is. You want to make sure this is consistent with your own educational
                      beliefs and values. Often, a school’s philosophy is reflected in its mission statement, and is carried out through what’s called a “strategic
                      plan”</p>
                  </FaqListItem>
              }
            </FaqList>
          </FaqsHomeHeroDescription>
          <ViewMoreFaqsHeroSection>
            <ViewMoreFaqsHeroButton onClick={() => handleViewMoreButton()}>
              View More
            </ViewMoreFaqsHeroButton>
          </ViewMoreFaqsHeroSection>
        </FaqsHomeHero>
      </FaqsHomeHeroSection>
    </Container>
  )
}

export default FaqHero