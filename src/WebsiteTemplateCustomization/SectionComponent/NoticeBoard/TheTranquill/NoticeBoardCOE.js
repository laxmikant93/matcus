/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Container } from '../../../CommonComponent/Container.styled';
// import { NavLink } from 'react-router-dom';
import CenterOfExcellenceCoverImage from "./NoticeBoardCOE.jpg";
import FromContactHero from '../../ContactUs/TheTranquill/formContactHero';
import React from 'react';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import ImageViewer from '../../../../Common/ImageViewer';

const CenterOfExcellence = styled.div`
margin: 72px 0;

p{
  font-weight: ${({ theme }) => theme.NoticeBoardPage.p.FontWeight};
  font-size: ${({ theme }) => theme.NoticeBoardPage.p.FontSize};
  line-height: ${({ theme }) => theme.NoticeBoardPage.p.LineHeight};
  font-style: ${({ theme }) => theme.NoticeBoardPage.p.FontStyle};
  font-family: ${({ theme }) => theme.NoticeBoardPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.NoticeBoardPage.p.LetterSpacing};
  text-align: ${({ theme }) => theme.NoticeBoardPage.p.Alignment};
  text-transform: ${({ theme }) => theme.NoticeBoardPage.p.TextTransform};
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.NoticeBoardPage.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: revert;
  }
`;
const CenterOfExcellenceHead = styled.div`
margin-bottom: ${({ theme }) => theme.NoticeBoardPage.SectionHead.MarginBottom};
text-align: ${({ theme }) => theme.NoticeBoardPage.SectionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.NoticeBoardPage.h2.FontWeight};
font-size: ${({ theme }) => theme.NoticeBoardPage.h2.FontSize};
line-height: ${({ theme }) => theme.NoticeBoardPage.h2.LineHeight};
font-style: ${({ theme }) => theme.NoticeBoardPage.h2.FontStyle};
font-family: ${({ theme }) => theme.NoticeBoardPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.NoticeBoardPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.NoticeBoardPage.h2.Alignment};
text-transform: ${({ theme }) => theme.NoticeBoardPage.h2.TextTransform};
color: ${({ theme }) => theme.NoticeBoardPage.h2.Color};
}
h3{
font-weight: ${({ theme }) => theme.NoticeBoardPage.h3.FontWeight};
font-size: ${({ theme }) => theme.NoticeBoardPage.h3.FontSize};
line-height: ${({ theme }) => theme.NoticeBoardPage.h3.LineHeight};
font-style: ${({ theme }) => theme.NoticeBoardPage.h3.FontStyle};
font-family: ${({ theme }) => theme.NoticeBoardPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.NoticeBoardPage.h3.LetterSpacing};
text-align: ${({ theme }) => theme.NoticeBoardPage.h3.Alignment};
text-transform: ${({ theme }) => theme.NoticeBoardPage.h3.TextTransform};
color: ${({ theme }) => theme.NoticeBoardPage.h3.Color};
position: relative;
display: inline-block;
}
`;


const SectionHeroBorderBottom = styled.div`
display: grid;
grid-template-columns: 25% 50% 25%;
align-items:center;
height: 8px;
`;
const SectionHeroBorderBottomL = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.NoticeBoardPage.CenterOfExcellence.SectionHeroBorderBottomL.Background} 
`;
const SectionHeroBorderBottomM = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.NoticeBoardPage.CenterOfExcellence.SectionHeroBorderBottomM.Background} 
`;
const SectionHeroBorderBottomR = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.NoticeBoardPage.CenterOfExcellence.SectionHeroBorderBottomR.Background} 
`;

const BannerCoverSection = styled.div`
margin: 72px 0;
`;
const BannerCoverSectionImage = styled.div`
width: 100%;
height: 478px;
img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
@media screen and (max-width: 768px) {
  height: auto;
}
`;
const NoticeBoardCOE = () => {

  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)

  return (
    <React.Fragment>
      <Container>
        <CenterOfExcellence>
          <CenterOfExcellenceHead>
            {/* <h2>Center of Excellence</h2>
            <h3>Be a part of us</h3> */}
            <h2>{(subheadersData && subheadersData['coehead']) || "Center Of Excellence"}</h2>
            <h3>{(subheadersData && subheadersData['coesubhead']) || "Centre Of Excellence, Which specialized programs within business."}</h3>
          </CenterOfExcellenceHead>
          <p className='sun-editor-output'
            dangerouslySetInnerHTML={{
              __html:
                instituteData.business_coe ? instituteData.business_coe :
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
            }}
          ></p>
          <BannerCoverSection>
            <BannerCoverSectionImage>
              {/* <ImageViewer objetc={instituteData?.business_coebanner?.src}/> */}
              <img src={instituteData?.business_coebanner?.src ? instituteData?.business_coebanner?.src : (instituteData.business_coe_subhead || instituteData.business_coe_head || instituteData.business_coe) ? DefaultImage : CenterOfExcellenceCoverImage} alt="" />
              <SectionHeroBorderBottom>
                <SectionHeroBorderBottomL></SectionHeroBorderBottomL>
                <SectionHeroBorderBottomM></SectionHeroBorderBottomM>
                <SectionHeroBorderBottomR></SectionHeroBorderBottomR>
              </SectionHeroBorderBottom>
            </BannerCoverSectionImage>
          </BannerCoverSection>
        </CenterOfExcellence>
      </Container>

      <FromContactHero />
    </React.Fragment >
  )
}

export default NoticeBoardCOE