import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled';





const MissionSection = styled.div`
background: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.Background};
border-radius: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.BorderRadius};
padding: 55px 75px;
@media screen and (max-width: 768px) {
  padding: 32px 24px;
}
`;
const MissionHead = styled.div`
margin-bottom: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.MissionHead.MarginBottom};
text-align: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.MissionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.Color};
text-alignment: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.Alignment};
}

h3{
  font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontSize};
  line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.Color};
  text-align: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.AboutUs.AboutUsPage.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.AboutUs.AboutUsPage.BorderBottom.Background};
  bottom: ${({ theme }) => theme.AboutUs.AboutUsPage.BorderBottom.BottomSpace};
  }
  }
`;
const MissionDescription = styled.div`
p{
  font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.p.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.p.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.p.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.p.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.p.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.p.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.p.Color};
text-align: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.p.Alignment};
}
`;
const MissionSectionWrap = styled.div`
padding:40px 0;
`;





const AboutUsMission = () => {
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  return (
    <Container>
      <MissionSectionWrap>
        <MissionSection>
          <MissionHead>
            <h2>{instituteData.institute_mission_head ? instituteData.institute_mission_head : ""}</h2>
            <h3>{instituteData.institute_mission_subhead ? instituteData.institute_mission_subhead : ""}</h3>
          </MissionHead>
          <MissionDescription>
            <p dangerouslySetInnerHTML={{
              __html:
                instituteData.institute_mission ? instituteData.institute_mission : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
            }}
            ></p>
          </MissionDescription>
        </MissionSection>
      </MissionSectionWrap>
    </Container>
  )
}
export default AboutUsMission