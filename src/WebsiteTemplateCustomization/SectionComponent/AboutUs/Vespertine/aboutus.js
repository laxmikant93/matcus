import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RenderAboutComponents from './RenderAboutComponents';
const AboutusSection = styled.div`
`;

const AboutUsPage = () => {
  const { homecomponenthideData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const pushDropDownCheck = useSelector((state) => state.websiteTemplate.pushDropDown.secitonTile)

  // console.log(pushDropDownCheck,"hishzzzdauidh14")
  var element = document.getElementById(pushDropDownCheck);

useEffect(()=>{
  if(pushDropDownCheck&&element){
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
 
},[pushDropDownCheck,element])

  return (
    <AboutusSection>
      {/* {
        homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHide.includes("Aboutus") ? 
        : ""
      }

      <Container>

        {
          homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHide.includes("PrincipalWelcome") ? 
          : ""
        }
        <MissionSectionWrap>
          {
            homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHide.includes("Mission") ?
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
            </MissionSection> : ""
          }
        </MissionSectionWrap>
        <VisionSectionWrap>
          {
            homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHide.includes("Vission") ?
           : ""
          }
        </VisionSectionWrap>
        <BannerCoverSectionWrap>
          {
            homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHide.includes("Videos") ? <BannerCoverSection>
              <BannerCoverSectionImage>
                <img src={instituteData.institute_about_upload ? instituteData.institute_about_upload : DefaultCover} alt="" />
              </BannerCoverSectionImage>
            </BannerCoverSection> : ""
          }

        </BannerCoverSectionWrap>

      </Container > */}
      {
          homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHideData.length && homecomponenthideData[0].aboutSectionHideData.map((item, key) => {
            return (
              <div key={key} id={item.title}>
                {item.show === true && React.createElement(RenderAboutComponents[item.field])}
              </div>

              // <h1>{item}</h1>
            )

          })
        }
    </AboutusSection >
  )
}

export default AboutUsPage