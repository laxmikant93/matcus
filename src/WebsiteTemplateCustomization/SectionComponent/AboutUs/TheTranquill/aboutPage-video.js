import styled from 'styled-components';
// import Layout from "../../.."
// import Footer from "../../../FooterLayout/Vespertine"
// import { Fragment } from 'react';
// import MessageDeskDummyProfile from "../messageDeskDummyProfile.png";
// import DefaultCover from "../defaultCover.svg";
import { useSelector } from 'react-redux';

import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import { Container } from '../../../CommonComponent/Container.styled';




const SectionHeroBorderBottom = styled.div`
display: grid;
grid-template-columns: 25% 50% 25%;
align-items:center;
height: 8px;
`;
const SectionHeroBorderBottomL = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.AboutUsHero.SectionHeroBorderBottomL.Background} 
`;
const SectionHeroBorderBottomM = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.AboutUsHero.SectionHeroBorderBottomM.Background} 
`;
const SectionHeroBorderBottomR = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.AboutUsHero.SectionHeroBorderBottomR.Background} 
`;

const BannerCoverSection = styled.div`
margin: 48px 0;
`;
const BannerCoverSectionImage = styled.div`
width: 100%;
// height: 478px;
img{
  width: 100%;
  height: 100%;
  display: block;
  // object-fit: cover;
}
iframe, video{
  width: 100%;
  height: 478px;
  border: none;
  border-radius: 8px;
  display: block;
}
@media screen and (max-width: 768px) {
  height: auto;
}
`;
const AboutUsPageVideoSection = () => {
  const { homecomponenthideData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  return (
    <Container>
      <BannerCoverSection>
        <BannerCoverSectionImage>
          {instituteData.business_intro_video &&
            instituteData.business_intro_video.includes(".mp4") ? (
            <video
              // height="180"
              src={instituteData.business_intro_video && instituteData.business_intro_video}
              controls
              // className="gallery-thumnail"
              alt=""
            ></video>
          ) : instituteData.business_intro_video &&
            instituteData.business_intro_video.includes("embed") ? (
            <iframe
              title="youtube video"
              src={instituteData.business_intro_video && instituteData.business_intro_video}
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : instituteData.business_about_upload ?
            <>
              <img src={instituteData.business_about_upload ? instituteData.business_about_upload : DefaultImage} alt="" />
              <SectionHeroBorderBottom>
                <SectionHeroBorderBottomL></SectionHeroBorderBottomL>
                <SectionHeroBorderBottomM></SectionHeroBorderBottomM>
                <SectionHeroBorderBottomR></SectionHeroBorderBottomR>
              </SectionHeroBorderBottom>
            </>
            :
            (<video
              src=""
              alt=""
            ></video>
            )}

        </BannerCoverSectionImage>
      </BannerCoverSection>
    </Container>
  )
}

export default AboutUsPageVideoSection