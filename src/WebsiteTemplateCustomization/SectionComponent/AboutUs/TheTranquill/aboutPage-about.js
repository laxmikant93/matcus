import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import { useSelector } from 'react-redux';

const AboutusSection = styled.div`
`;
const AboutSection = styled.div`
background: ${({ theme }) => theme.AboutUsPage.AboutSection.Background};
padding: 72px 0;
`;
const SectionHead = styled.div`
margin-bottom: ${({ theme }) => theme.AboutUsPage.SectionHead.MarginBottom};
text-align: ${({ theme }) => theme.AboutUsPage.SectionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.AboutUsPage.h2.FontWeight};
font-size: ${({ theme }) => theme.AboutUsPage.h2.FontSize};
line-height: ${({ theme }) => theme.AboutUsPage.h2.LineHeight};
font-style: ${({ theme }) => theme.AboutUsPage.h2.FontStyle};
font-family: ${({ theme }) => theme.AboutUsPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUsPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.AboutUsPage.h2.Alignment};
text-transform: ${({ theme }) => theme.AboutUsPage.h2.TextTransform};
color: ${({ theme }) => theme.AboutUsPage.h2.Color};
}
h3{
font-weight: ${({ theme }) => theme.AboutUsPage.h3.FontWeight};
font-size: ${({ theme }) => theme.AboutUsPage.h3.FontSize};
line-height: ${({ theme }) => theme.AboutUsPage.h3.LineHeight};
font-style: ${({ theme }) => theme.AboutUsPage.h3.FontStyle};
font-family: ${({ theme }) => theme.AboutUsPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUsPage.h3.LetterSpacing};
text-align: ${({ theme }) => theme.AboutUsPage.h3.Alignment};
text-transform: ${({ theme }) => theme.AboutUsPage.h3.TextTransform};
color: ${({ theme }) => theme.AboutUsPage.h3.Color};
position: relative;
display: inline-block;
}
`;




const SectionDescription = styled.div`
p{
  font-weight: ${({ theme }) => theme.AboutUsPage.p.FontWeight};
  font-size: ${({ theme }) => theme.AboutUsPage.p.FontSize};
  line-height: ${({ theme }) => theme.AboutUsPage.p.LineHeight};
  font-style: ${({ theme }) => theme.AboutUsPage.p.FontStyle};
  font-family: ${({ theme }) => theme.AboutUsPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUsPage.p.LetterSpacing};
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.AboutUsPage.p.Color};
  
  }
`;


const AboutUsPage = () => {
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  return (
    <AboutusSection>

      <AboutSection>
        <Container>

          <SectionHead>
            <h2>{instituteData.business_about_head ?
              instituteData.business_about_head
              : (
                "About Us"
              )}</h2>
            {instituteData.business_about_subhead ?
              <h3>{instituteData.business_about_subhead}</h3>
              : (
                ""
              )}
          </SectionHead>
          <SectionDescription>
            <p className='sun-editor-output'
              dangerouslySetInnerHTML={{
                __html:
                  instituteData.business_about ? instituteData.business_about :
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et."
              }}
            ></p>
          </SectionDescription>
        </Container>
      </AboutSection>


    </AboutusSection >
  )
}

export default AboutUsPage