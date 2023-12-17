/* eslint-disable jsx-a11y/no-distracting-elements */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import PrincipalProfilePlaceHolder from "../Principal.png";
import PrincipalProfile from "../.././../assets/Vespertine/PrincipalProfile.svg";
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from '../../../../Common/ImageViewer';

const PrincipalDeskHomeHero = styled.div`
display: flex;
align-items: flex-start;
justify-content: flex-start;
gap:52px;
@media screen and (max-width: 768px) {
  flex-direction: column;
  align-items: center;
  }
h4{
font-weight: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontWeight};
font-size: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontSize};
line-height: ${({ theme }) => theme.Principal.PrincipalHero.h4.LineHeight};
font-style: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontStyle};
font-family: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Principal.PrincipalHero.h4.LetterSpacing};
color: ${({ theme }) => theme.Principal.PrincipalHero.h4.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
@media screen and (max-width: 768px) {
text-align:center;
}
}
h5{
font-weight: ${({ theme }) => theme.Principal.PrincipalHero.h5.FontWeight};
font-size: ${({ theme }) => theme.Principal.PrincipalHero.h5.FontSize};
line-height: ${({ theme }) => theme.Principal.PrincipalHero.h5.LineHeight};
font-style: ${({ theme }) => theme.Principal.PrincipalHero.h5.FontStyle};
font-family: ${({ theme }) => theme.Principal.PrincipalHero.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.Principal.PrincipalHero.h5.LetterSpacing};
color: ${({ theme }) => theme.Principal.PrincipalHero.h5.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
@media screen and (max-width: 768px) {
text-align:center;
}
}
p{
font-weight: ${({ theme }) => theme.Principal.PrincipalHero.p.FontWeight};
font-size: ${({ theme }) => theme.Principal.PrincipalHero.p.FontSize};
line-height: ${({ theme }) => theme.Principal.PrincipalHero.p.LineHeight};
font-style: ${({ theme }) => theme.Principal.PrincipalHero.p.FontStyle};
font-family: ${({ theme }) => theme.Principal.PrincipalHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.Principal.PrincipalHero.p.LetterSpacing};
padding-top: ${({ theme }) => theme.Principal?.PrincipalHero.p.PaddingTop};
color: ${({ theme }) => theme.Principal?.PrincipalHero.p.Color};
display: -webkit-box;
-webkit-line-clamp: 15;
-webkit-box-orient: vertical;
overflow: hidden;
@media screen and (max-width: 768px) {
text-align:center;
}
}
`;

const PrincipalDeskHomeHeroSection = styled.div`
padding: 32px 0;
`;
const PrincipalProfileContent = styled.div`
/* p:first-child {
  display: -webkit-box;
  -webkit-line-clamp: 9;
  overflow: hidden;
} */

`;
const PrincipalProfileImage = styled.div`
height: 100%;
img{
/* width: ${({ theme }) => theme.Principal?.PrincipalHero.PrincipalProfileImage.Width};
height: ${({ theme }) => theme.Principal?.PrincipalHero.PrincipalProfileImage.Height}; */
width: 450px;
height: 500px;
border-radius: ${({ theme }) => theme.Principal?.PrincipalHero.PrincipalProfileImage.BorderRadius};
background: #D9D9D9;
// margin-bottom: ${({ theme }) => theme.Principal?.PrincipalHero.PrincipalProfileImage.MarginBottom};
object-fit: cover;
@media screen and (max-width: 768px) {
  width: 100%;
  height: auto;
  }
}
`;

const ViewMoreButtonSection = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreButtonSection.MarginTop};
`;

const ViewMoreMessageButton = styled.a`

font-weight: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.FontWeight};
font-size: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.FontSize};
line-height: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.LineHeight};
background: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.Background};
border: 1px solid ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.BorderColor};
border-radius: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.BorderRadius};
color: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.Color};
padding: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.PaddingY} ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.Hover.Background};
color: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;


const PrincipalDeskHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
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
    <PrincipalDeskHomeHeroSection>
      <PrincipalDeskHomeHero>
        <PrincipalProfileImage>
          <ImageViewer object={instituteData.institute_owner_details.length?instituteData.institute_owner_details[0].institute_owner_profile_photo && instituteData.institute_owner_details.length&&instituteData.institute_owner_details[0].institute_owner_profile_photo !== "" ? instituteData.institute_owner_details.length&&instituteData.institute_owner_details[0].institute_owner_profile_photo : (instituteData.institute_owner_details.length&&instituteData.institute_owner_details[0].institute_owner_name || instituteData.institute_owner_details.length&&instituteData.institute_owner_details[0].institute_owner_designation || instituteData.institute_owner_details.length&&instituteData.institute_owner_details[0].institute_owner_message ? PrincipalProfilePlaceHolder : PrincipalProfile):PrincipalProfile} defaultImage={PrincipalProfile} alt="" />
        </PrincipalProfileImage>
        <PrincipalProfileContent >
          <h4>{instituteData.institute_owner_details.length?instituteData.institute_owner_details[0].institute_owner_name ? instituteData.institute_owner_details.length&&instituteData.institute_owner_details[0].institute_owner_name : "Bhupinder Kumar":"Bhupinder Kumar"}</h4>
          <h5>{instituteData.institute_owner_details.length?instituteData.institute_owner_details[0].institute_owner_designation ? instituteData.institute_owner_details.length&&instituteData.institute_owner_details[0].institute_owner_designation : "Owner":"Owner"}</h5>
          
          <div>
            
          <p dangerouslySetInnerHTML={{
            __html:
            instituteData.institute_owner_details.length?instituteData.institute_owner_details[0].institute_owner_message ? instituteData.institute_owner_details.length&&instituteData.institute_owner_details[0].institute_owner_message.replaceAll("<p>","").replaceAll("</p>","") : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }}
          ></p>
          </div>
        </PrincipalProfileContent>
      </PrincipalDeskHomeHero>
      <ViewMoreButtonSection>
        <ViewMoreMessageButton onClick={handleViewMoreButton}>
          View More
        </ViewMoreMessageButton>
      </ViewMoreButtonSection>
    </PrincipalDeskHomeHeroSection>
    </Container>
  )
}

export default PrincipalDeskHero