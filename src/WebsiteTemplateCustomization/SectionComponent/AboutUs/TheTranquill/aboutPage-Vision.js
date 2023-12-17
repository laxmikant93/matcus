/* eslint-disable jsx-a11y/no-distracting-elements */
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled';


const VisionSection = styled.div`
margin-top: 48px;
`;
const VisionHead = styled.div`
margin-bottom: ${({ theme }) => theme.AboutUsPage.VisionSection.VisionHead.MarginBottom};
text-align: ${({ theme }) => theme.AboutUsPage.VisionSection.VisionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.AboutUsPage.h2.FontWeight};
font-size: ${({ theme }) => theme.AboutUsPage.h2.FontSize};
line-height: ${({ theme }) => theme.AboutUsPage.h2.LineHeight};
font-style: ${({ theme }) => theme.AboutUsPage.h2.FontStyle};
font-family: ${({ theme }) => theme.AboutUsPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUsPage.h2.LetterSpacing};
color: ${({ theme }) => theme.AboutUsPage.h2.Color};
text-align: ${({ theme }) => theme.AboutUsHero.h2.Alignment};
text-transform: ${({ theme }) => theme.AboutUsPage.h2.TextTransform};
}
h3{
font-weight: ${({ theme }) => theme.AboutUsPage.h3.FontWeight};
font-size: ${({ theme }) => theme.AboutUsPage.h3.FontSize};
line-height: ${({ theme }) => theme.AboutUsPage.h3.LineHeight};
font-style: ${({ theme }) => theme.AboutUsPage.h3.FontStyle};
font-family: ${({ theme }) => theme.AboutUsPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUsPage.h3.LetterSpacing};
color: ${({ theme }) => theme.AboutUsPage.h3.Color};
text-align: ${({ theme }) => theme.AboutUsHero.h3.Alignment};
text-transform: ${({ theme }) => theme.AboutUsPage.h3.TextTransform};
position: relative;
display: inline-block;
}
`;
const VisionDescription = styled.div`
p{
  font-weight: ${({ theme }) => theme.AboutUsPage.p.FontWeight};
font-size: ${({ theme }) => theme.AboutUsPage.p.FontSize};
line-height: ${({ theme }) => theme.AboutUsPage.p.LineHeight};
font-style: ${({ theme }) => theme.AboutUsPage.p.FontStyle};
font-family: ${({ theme }) => theme.AboutUsPage.p.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUsPage.p.LetterSpacing};
color: ${({ theme }) => theme.AboutUsPage.p.Color};
text-align: ${({ theme }) => theme.AboutUsPage.p.Alignment};
}
`;
const AboutPageVision = () => {
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)

  return (
    <Container>
      <VisionSection>
        <VisionHead>
          <h2>{instituteData.business_vision_head ?
            instituteData.business_vision_head
            : (
              "Our Vision"
            )}</h2>
          {instituteData.business_vision_subhead ?
            <h3>{instituteData.business_vision_subhead}</h3>
            : (
              ""
            )}
        </VisionHead>
        <VisionDescription>
          <p className='sun-editor-output'
            dangerouslySetInnerHTML={{
              __html:
                instituteData.business_vision ? instituteData.business_vision :
                  ""
            }}
          ></p>
        </VisionDescription>
      </VisionSection>
    </Container>
  )
}

export default AboutPageVision