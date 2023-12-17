import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled';

const MissionSection = styled.div`
background: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.Background};
border-radius: ${({ theme }) => theme.AboutUs.AboutUsPage.MissionSection.BorderRadius};
padding: 55px 75px;
margin: 48px 0;
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
position: relative;
display: inline-block;
&::after{
width: 100%;
height: ${({ theme }) => theme.AboutUs.AboutUsPage.BorderBottom.BorderWidth};
background-color: ${({ theme }) => theme.AboutUs.AboutUsPage.BorderBottom.Background};
bottom: ${({ theme }) => theme.AboutUs.AboutUsPage.BorderBottom.BottomSpace};
}
}
`;
const MissionDescription = styled.div`
p{
  font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.p.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.p.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsPage.p.Color};
text-align: ${({ theme }) => theme.AboutUs.AboutUsPage.p.Alignment};
}
`;

const Mission = () => {
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  return (
    <Container>
      <MissionSection>
        <MissionHead>
          <h2>{instituteData.institute_mission_head ? instituteData.institute_mission_head : "Our Mission"}</h2>
          <h3>{instituteData.institute_mission_subhead ? instituteData.institute_mission_subhead : ""}</h3>
        </MissionHead>
        <MissionDescription>
          <p dangerouslySetInnerHTML={{
            __html:
              instituteData.institute_mission ? instituteData.institute_mission : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          }}
          ></p>
          {/* <p>{instituteData.institute_mission ? instituteData.institute_mission : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}</p> */}
        </MissionDescription>
      </MissionSection>
    </Container>
  )
}
export default Mission;