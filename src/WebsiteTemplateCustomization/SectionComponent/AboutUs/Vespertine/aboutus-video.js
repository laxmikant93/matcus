import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled';

import DefaultCover from "../banner.png";
import ImageViewer from '../../../../Common/ImageViewer';

const BannerCoverSectionWrap = styled.div`
margin:40px 0;
width: 100%;
height: auto;
`;
const BannerCoverSection = styled.div`
`;
const BannerCoverSectionImage = styled.div`
width: 100%;
height: auto;
img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.videoSection {
  width: 100%;
  height: 478px;
}
@media screen and (max-width: 768px) {
  height: auto;
}
`;
const AboutUsVideo = () => {
  const { homecomponenthideData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  return (
    <Container>

      <BannerCoverSectionWrap>
        {
          homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHideData.find((item) => item.field === "Videos" && item.show === true) ? <BannerCoverSection>
            <BannerCoverSectionImage>
              {instituteData.institute_about_upload_type && instituteData.institute_about_upload_type === "video"
               ?instituteData.institute_about_upload&&instituteData.institute_about_upload.src&&
               instituteData.institute_about_upload.src.includes("embed")?         
               <iframe
                 title="youtube video"
                 src={instituteData.institute_about_upload && instituteData.institute_about_upload.src}
                 frameborder="0"
                 width="350"
                 height="250"
                 autoPlay={true}
                 allow='autoplay'
                 className='videoSection'
               ></iframe>
             :
                <video 
                src={instituteData.institute_about_upload ? instituteData.institute_about_upload.src : ""} 
                alt="" 
                controls   
                autoPlay={true}
                muted />
                :
                <ImageViewer object={instituteData.institute_about_upload} defaultImage={DefaultCover}/>
                // <img src={instituteData.institute_about_upload ? instituteData.institute_about_upload : DefaultCover} alt="" />
              }
            </BannerCoverSectionImage>
          </BannerCoverSection> : ""
        }

      </BannerCoverSectionWrap>
    </Container>
  )
}
export default AboutUsVideo