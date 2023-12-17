/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
// import MessageProfile1 from "../Message.png";
import Slider from "react-slick";
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from '../../../CommonComponent/Container.styled'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';

import F1 from "./assets/feature-1.png";
import F2 from "./assets/feature-2.png";
import G1 from "./assets/goverment-1.png";
import G2 from "./assets/goverment-2.png";
import G3 from "./assets/goverment-3.png";
import G4 from "./assets/goverment-4.png";
import G5 from "./assets/goverment-5.png";
import G6 from "./assets/goverment-6.png";
import G7 from "./assets/goverment-7.png";
import G8 from "./assets/goverment-8.png";
import G9 from "./assets/goverment-9.png";
import G10 from "./assets/goverment-10.png";
import G11 from "./assets/goverment-11.png";
import G12 from "./assets/goverment-12.png";
import G13 from "./assets/goverment-13.png";
import G14 from "./assets/goverment-14.png";
import G15 from "./assets/goverment-15.png";
import G16 from "./assets/goverment-16.png";
import G17 from "./assets/goverment-17.png";
import G18 from "./assets/goverment-18.png";
import G19 from "./assets/goverment-19.png";
import G20 from "./assets/goverment-20.png";
import G21 from "./assets/goverment-21.png";
import G22 from "./assets/goverment-22.png";
import G23 from "./assets/goverment-23.png";
import G24 from "./assets/goverment-24.png";
import G25 from "./assets/goverment-25.png";
import G26 from "./assets/goverment-26.png";
import G27 from "./assets/goverment-27.png";
import G28 from "./assets/goverment-28.png";
import G29 from "./assets/goverment-29.png";
import G30 from "./assets/goverment-30.png";
import G31 from "./assets/goverment-31.png";
import G32 from "./assets/goverment-32.png";
import G33 from "./assets/goverment-33.png";
import G34 from "./assets/goverment-34.png";
import G35 from "./assets/goverment-35.png";
import TAP1 from "./assets/tap-1.png";
import TAP2 from "./assets/tap-2.png";
import TAP3 from "./assets/tap-3.png";
import TAP4 from "./assets/tap-4.png";
import TAP5 from "./assets/tap-5.png";
import TAP6 from "./assets/tap-6.png";
import TAP7 from "./assets/tap-7.png";
import TAP8 from "./assets/tap-8.png";
import TAP9 from "./assets/tap-9.png";
import TAP10 from "./assets/tap-10.png";
import TAP11 from "./assets/tap-11.png";
import TAP12 from "./assets/tap-12.png";
import TAP13 from "./assets/tap-13.png";
import TAP14 from "./assets/tap-14.png";
import TAP15 from "./assets/tap-15.png";
import TAP16 from "./assets/tap-16.png";
import TAP17 from "./assets/tap-17.png";
import TAP18 from "./assets/tap-18.png";
import TAP19 from "./assets/tap-19.png";
import TAP20 from "./assets/tap-20.png";
import TAP21 from "./assets/tap-21.png";
import TAP22 from "./assets/tap-22.png";
import TAP23 from "./assets/tap-23.png";
import TAP24 from "./assets/tap-24.png";
import TAP25 from "./assets/tap-25.png";
import TAP26 from "./assets/tap-26.png";
import TAP27 from "./assets/tap-27.png";
import TAP28 from "./assets/tap-28.png";
import TAP29 from "./assets/tap-29.png";
import TAP30 from "./assets/tap-30.png";
import TAP31 from "./assets/tap-31.png";
import TAP32 from "./assets/tap-32.png";
import TAP33 from "./assets/tap-33.png";
import TAP34 from "./assets/tap-34.png";
import TAP35 from "./assets/tap-35.png";
import TAP36 from "./assets/tap-36.png";
import TAP37 from "./assets/tap-37.png";
import TAP38 from "./assets/tap-38.png";
import TAP39 from "./assets/tap-39.png";

const EmpanelmentPageSection = styled.div`
margin: 72px 0;

`;

const EmpanelmentPageHead = styled.div`
margin-top: 40px;
h2{

font-weight: ${({ theme }) => theme.EmpanelmentPage.h2.FontWeight};
font-size: ${({ theme }) => theme.EmpanelmentPage.h2.FontSize};
line-height: ${({ theme }) => theme.EmpanelmentPage.h2.LineHeight};
font-style: ${({ theme }) => theme.EmpanelmentPage.h2.FontStyle};
font-family: ${({ theme }) => theme.EmpanelmentPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.EmpanelmentPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.EmpanelmentPage.h2.Alignment};
color: ${({ theme }) => theme.EmpanelmentPage.h2.Color};
}
h3{
  font-weight: ${({ theme }) => theme.EmpanelmentPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.EmpanelmentPage.h3.FontSize};
  line-height: ${({ theme }) => theme.EmpanelmentPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.EmpanelmentPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.EmpanelmentPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.EmpanelmentPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.EmpanelmentPage.h3.Color};
  text-align: ${({ theme }) => theme.EmpanelmentPage.h3.Alignment};
  }
`;
const EmpanelmentPanelSection = styled.div`
margin-top: 40px;
h4{
  font-weight: ${({ theme }) => theme.EmpanelmentPage.h4.FontWeight};
  font-size: ${({ theme }) => theme.EmpanelmentPage.h4.FontSize};
  line-height: ${({ theme }) => theme.EmpanelmentPage.h4.LineHeight};
  font-style: ${({ theme }) => theme.EmpanelmentPage.h4.FontStyle};
  font-family: ${({ theme }) => theme.EmpanelmentPage.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.EmpanelmentPage.h4.LetterSpacing};
  color: ${({ theme }) => theme.EmpanelmentPage.h4.Color};
  text-align: ${({ theme }) => theme.EmpanelmentPage.h4.Alignment};
  }
ul{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  align-items: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 468px) {
    grid-template-columns: 1fr;
  }
  li{
    width: 100%;
    background: #FFFFFF;
    border: 2px solid #006F9C;
    border-radius: 8px;
    height: 82px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
  } 
}
`;
const Divider = styled.div`
height: 1px;
width: 90%;
margin: 16px auto;
background: #006F9C;
`;
const EmpanelmentPanelFeatureSection = styled.ul`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 50px;
align-items: center;
margin: 48px 0;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
li{
  width: 100%;
background: #FFFFFF;
border: 2px solid #006F9C;
border-radius: 8px;
height: 145px;
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
}
`;

const EmpanelmentPage = () => {
  const settingsMessageDeskHero = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const dispatch = useDispatch();
  const history = useNavigate();
  const { dynamicHeaderData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/aboutus", true))
    }
    else {
      history("/aboutus")
    }
  }
  return (
    <Container>
      <EmpanelmentPageSection>
        <EmpanelmentPageHead>
          <h2>Our Empanelment</h2>
          <h3>The Hospital is already on the panel of various Government Undertakings and Private Sector
            Companies. Some of the names are as follows:-</h3>
        </EmpanelmentPageHead>
        <EmpanelmentPanelFeatureSection>
          <li>
            <img src={F1} alt="" />
          </li>
          <li>
            <img src={F2} alt="" />
          </li>
        </EmpanelmentPanelFeatureSection>
        <EmpanelmentPanelSection>
          <h4>Government Panel</h4>
          <Divider></Divider>
          <ul>

            <li> <img src={G1} alt="" /></li>
            <li> <img src={G2} alt="" /></li>
            <li> <img src={G3} alt="" /></li>
            <li> <img src={G4} alt="" /></li>
            <li> <img src={G5} alt="" /></li>
            <li> <img src={G6} alt="" /></li>
            <li> <img src={G7} alt="" /></li>
            <li> <img src={G8} alt="" /></li>
            <li> <img src={G9} alt="" /></li>
            <li> <img src={G10} alt="" /></li>
            <li> <img src={G11} alt="" /></li>
            <li> <img src={G12} alt="" /></li>
            <li> <img src={G13} alt="" /></li>
            <li> <img src={G14} alt="" /></li>
            <li> <img src={G15} alt="" /></li>
            <li> <img src={G16} alt="" /></li>
            <li> <img src={G17} alt="" /></li>
            <li> <img src={G18} alt="" /></li>
            <li> <img src={G19} alt="" /></li>
            <li> <img src={G20} alt="" /></li>
            <li> <img src={G21} alt="" /></li>
            <li> <img src={G22} alt="" /></li>
            <li> <img src={G23} alt="" /></li>
            <li> <img src={G24} alt="" /></li>
            <li> <img src={G25} alt="" /></li>
            <li> <img src={G26} alt="" /></li>
            <li> <img src={G27} alt="" /></li>
            <li> <img src={G28} alt="" /></li>
            <li> <img src={G29} alt="" /></li>
            <li> <img src={G30} alt="" /></li>
            <li> <img src={G31} alt="" /></li>
            <li> <img src={G32} alt="" /></li>
            <li> <img src={G33} alt="" /></li>
            <li> <img src={G34} alt="" /></li>
            <li> <img src={G35} alt="" /></li>

          </ul>
        </EmpanelmentPanelSection>
        <EmpanelmentPanelSection>
          <h4>TAP List</h4>
          <Divider></Divider>
          <ul>

            <li> <img src={TAP1} alt="" /></li>
            <li> <img src={TAP2} alt="" /></li>
            <li> <img src={TAP3} alt="" /></li>
            <li> <img src={TAP4} alt="" /></li>
            <li> <img src={TAP5} alt="" /></li>
            <li> <img src={TAP6} alt="" /></li>
            <li> <img src={TAP7} alt="" /></li>
            <li> <img src={TAP8} alt="" /></li>
            <li> <img src={TAP9} alt="" /></li>
            <li> <img src={TAP10} alt="" /></li>
            <li> <img src={TAP11} alt="" /></li>
            <li> <img src={TAP12} alt="" /></li>
            <li> <img src={TAP13} alt="" /></li>
            <li> <img src={TAP14} alt="" /></li>
            <li> <img src={TAP15} alt="" /></li>
            <li> <img src={TAP16} alt="" /></li>
            <li> <img src={TAP17} alt="" /></li>
            <li> <img src={TAP18} alt="" /></li>
            <li> <img src={TAP19} alt="" /></li>
            <li> <img src={TAP20} alt="" /></li>
            <li> <img src={TAP21} alt="" /></li>
            <li> <img src={TAP22} alt="" /></li>
            <li> <img src={TAP23} alt="" /></li>
            <li> <img src={TAP24} alt="" /></li>
            <li> <img src={TAP25} alt="" /></li>
            <li> <img src={TAP26} alt="" /></li>
            <li> <img src={TAP27} alt="" /></li>
            <li> <img src={TAP28} alt="" /></li>
            <li> <img src={TAP29} alt="" /></li>
            <li> <img src={TAP30} alt="" /></li>
            <li> <img src={TAP31} alt="" /></li>
            <li> <img src={TAP32} alt="" /></li>
            <li> <img src={TAP33} alt="" /></li>
            <li> <img src={TAP34} alt="" /></li>
            <li> <img src={TAP35} alt="" /></li>
            <li> <img src={TAP36} alt="" /></li>
            <li> <img src={TAP37} alt="" /></li>
            <li> <img src={TAP38} alt="" /></li>
            <li> <img src={TAP39} alt="" /></li>

          </ul>
        </EmpanelmentPanelSection>
      </EmpanelmentPageSection>
    </Container>
  )
}

export default EmpanelmentPage