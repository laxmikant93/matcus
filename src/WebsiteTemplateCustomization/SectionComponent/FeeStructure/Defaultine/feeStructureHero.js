/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import DefaultImage1 from "./defaultImage1.png";
import DefaultImage from "../feestrucher.png";
import DefaultImage2 from "./defaultImage2.svg";
import DefaultImage3 from "./defaultImage3.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { useRef, useState } from 'react';
import FormatText from '../../../../Common/FormatText';
import { Fragment } from 'react';
import moment from 'moment';
import { Modal } from '../../../CommonComponent/Modal';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from '../../../../Common/ImageViewer';

const FeeStructureHeroSection = styled.div`
padding: 20px 0;
`;
const FeeStructureHero = styled.div`

`;
const FeeStructureHeroHead = styled.div`
margin-bottom: ${({ theme }) => theme.FeeStructure.FeeStructureHero.FeeStructureHeroHead.MarginBottom};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructureHero.FeeStructureHeroHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.LetterSpacing};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.Color};
}
h3{

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.LetterSpacing};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.Color};
}
}
`;
const FeeStructureHeroItemGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20px;
@media screen and (max-width: 992px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
}
`;
const FeeStructureHeroItem = styled.div`
background: #fff;
height: 100%;
padding: 16px 24px;
border-radius: 12px;
box-shadow: 0px 0px 8px 2px rgba(32, 32, 32, 0.05), 0px 0px 8px 2px rgba(32, 32, 32, 0.05);
`;
const FeeStructureHeroFigure = styled.figure`
display: grid;
align-items: flex-start;
grid-template-columns: auto 1fr;
gap: 24px;
img{
width: 103px;
height: 103px;
object-fit: cover;
border-radius: 50%;
}
@media screen and (max-width: 768px) {
  align-items: center;
  grid-template-columns: 1fr;

}
`;

const FeeStructureHeroCaption = styled.figcaption`

display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
overflow: hidden;
h6{
  
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.Color};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
},
p{
  
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.p.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.p.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.p.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.p.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.p.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.p.Color};
},
`;
const ViewFeeButton = styled.button`
display: block;

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.BorderColor};
border-radius: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.BorderRadius};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.Color};
padding: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.PaddingY} ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.MarginTop};
text-decoration: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.TextDecoration};
&:hover{
background:transparent;
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewFeeButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const ViewMoreFeeStructureHeroSection = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;
const ViewMoreFeeStructureHeroButton = styled.button`
display: block;

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Background};
border-radius: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.BorderRadius};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Background};
padding: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.PaddingY} ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.MarginTop};
text-decoration: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.TextDecoration};
&:hover{
background: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Hover.Background};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const FeeStructureHeroo = () => {
  const dispatch = useDispatch();

  // const feeStructureModal = useRef(null)
  const history = useNavigate();
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/feestructure", true))
    }
    else {
      history("/feestructure")
    }
  }
  const { feestructuresData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  const [details, setDetails] = useState("")
  const viewDetail = (item) => {
    setDetails(item)
    // feeStructureModal.current.open()
  }
  const downloadFile = () => {
    window.open(details.document, '_blank');
  }
  const totalAmount = (payCycle, amount) => {
    switch (payCycle) {
      case "one time":
        return amount * 1;
      case "halfYearly":
        return amount * 2;
      case "quarterly":
        return amount * 4;
      case "monthly":
        return amount * 12;
      default:
        return amount * 1;
    }
  };
  return (
    <Container>
      <FeeStructureHeroSection>
        <FeeStructureHero>
          <FeeStructureHeroHead>
            <h2>{(subheadersData && subheadersData['feehead']) || "Fee Structures"}</h2>
            <h3>{(subheadersData && subheadersData['feesubhead']) || ""}</h3>
          </FeeStructureHeroHead>
          <FeeStructureHeroItemGrid>

            {feestructuresData.length ?
              feestructuresData.map((item) => {
                return (
                  <FeeStructureHeroItem>
                    <FeeStructureHeroFigure>
                    <ImageViewer object={item.document} defaultImage={DefaultImage}/>

                      {/* <img src={item.document ? item.document : DefaultImage} alt="Fee Structure" /> */}
                      <FeeStructureHeroCaption>
                        <h6 title={item.title}>{item.title}</h6>
                        <p title='Maths' dangerouslySetInnerHTML={{
                              __html:
                                item.description,
                            }}></p>
                        <ViewFeeButton onClick={() => viewDetail()}>
                          View Fee
                        </ViewFeeButton>
                      </FeeStructureHeroCaption>
                    </FeeStructureHeroFigure>
                  </FeeStructureHeroItem>
                );
              })
              :
              <>

                <FeeStructureHeroItem>
                  <FeeStructureHeroFigure>
                    <img src={DefaultImage1} alt="Fee Structure" />
                    <FeeStructureHeroCaption>
                      <h6>Pre Nursery To U.K.G</h6>
                      <p>(Pay fee accordingly)</p>
                      <ViewFeeButton to="">
                        View Fee
                      </ViewFeeButton>
                    </FeeStructureHeroCaption>
                  </FeeStructureHeroFigure>
                </FeeStructureHeroItem>
                <FeeStructureHeroItem>
                  <FeeStructureHeroFigure>
                    <img src={DefaultImage1} alt="Fee Structure" />
                    <FeeStructureHeroCaption>
                      <h6>Pre Nursery To U.K.G</h6>
                      <p>(Pay fee accordingly)</p>
                      <ViewFeeButton to="">
                        View Fee
                      </ViewFeeButton>
                    </FeeStructureHeroCaption>
                  </FeeStructureHeroFigure>
                </FeeStructureHeroItem>
                <FeeStructureHeroItem>
                  <FeeStructureHeroFigure>
                    <img src={DefaultImage1} alt="Fee Structure" />
                    <FeeStructureHeroCaption>
                      <h6>Pre Nursery To U.K.G</h6>
                      <p>(Pay fee accordingly)</p>
                      <ViewFeeButton to="">
                        View Fee
                      </ViewFeeButton>
                    </FeeStructureHeroCaption>
                  </FeeStructureHeroFigure>
                </FeeStructureHeroItem>
              </>
            }
          </FeeStructureHeroItemGrid>
          <ViewMoreFeeStructureHeroSection>

            <ViewMoreFeeStructureHeroButton onClick={() => handleViewMoreButton()}>
              View All
            </ViewMoreFeeStructureHeroButton>
          </ViewMoreFeeStructureHeroSection>
        </FeeStructureHero>

      </FeeStructureHeroSection>
    </Container>
  )
}

export default FeeStructureHeroo