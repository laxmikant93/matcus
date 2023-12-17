/* eslint-disable jsx-a11y/no-distracting-elements */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { Container } from '../../../CommonComponent/Container.styled';
import DefaultAdmissionImage from "../defaultImage.svg";
const FeeStructureHomeHeroSection = styled.div`
padding: 32px 0;
`;
const FeeStructureHomeHero = styled.div`

`;
const FeeStructureHomeHeroHead = styled.div`
margin-bottom: 48px;
display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.Alignment};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.Color};
  text-align: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.BorderBottom.Background};
  bottom: ${({ theme }) => theme.FeeStructure.FeeStructureHero.BorderBottom.BottomSpace};
  }
  }
`;
const FeeStructureHomeHeroDescription = styled.div`
background: #E9DB89;
display: grid;
grid-template-columns: 2fr auto;
align-items: center;
gap: 20px;
height: 100%;
padding: 16px 24px;
border-radius: 16px;
h6{
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.h6.Color};
}
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  justify-content: center;
  h6{
  text-align: center;
  }
}
`;
const ViewMoreFeeStructureHeroButton = styled.a`
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.LineHeight};
background: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Background};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.BorderColor};
border-radius: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.BorderRadius};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Color};
padding: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.PaddingY} ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.PaddingX};
cursor: pointer;
text-align: center;
&:hover{
background: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Hover.Background};
color: ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructureHero.ViewMoreFeeStructureHeroButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const FeeStructureHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

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

  return (
    <Container>
    <FeeStructureHomeHeroSection>
      <FeeStructureHomeHero>
        <FeeStructureHomeHeroHead>
          <h2>{(subheadersData && subheadersData['feehead']) || "Fee Structures"}</h2>
          <h3>{(subheadersData && subheadersData['feesubhead']) || ""}</h3>

        </FeeStructureHomeHeroHead>
        <FeeStructureHomeHeroDescription>
          <h6>You can pay your fee by Cheque, UPI or Bank Transfer</h6>
          <ViewMoreFeeStructureHeroButton onClick={() => handleViewMoreButton()}>
            View Fee Structure
          </ViewMoreFeeStructureHeroButton>
        </FeeStructureHomeHeroDescription>
      </FeeStructureHomeHero>
    </FeeStructureHomeHeroSection>
    </Container>
  )
}

export default FeeStructureHero