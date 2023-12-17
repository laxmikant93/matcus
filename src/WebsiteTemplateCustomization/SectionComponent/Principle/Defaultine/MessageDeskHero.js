/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import MessageProfile1 from "../Principal.png";
import MessageProfile from "../.././../assets/Vespertine/PrincipalProfile.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from '../../../CommonComponent/Container.styled'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import ImageViewer from '../../../../Common/ImageViewer';

const MessageDeskHomeHero = styled.div`
display: flex!important;
align-items: center;
justify-content: center;
flex-direction: column;
`;



const MessageDeskHeroSection = styled.div`
padding: 40px 0;
h4{
  font-weight: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontWeight};
  font-size: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontSize};
  line-height: ${({ theme }) => theme.Principal.PrincipalHero.h4.LineHeight};
  font-style: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontStyle};
  font-family: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Principal.PrincipalHero.h4.LetterSpacing};
  color: ${({ theme }) => theme.Principal.PrincipalHero.h4.Color};
  }
  h5{
  font-weight: ${({ theme }) => theme.Principal.PrincipalHero.h5.FontWeight};
  font-size: ${({ theme }) => theme.Principal.PrincipalHero.h5.FontSize};
  line-height: ${({ theme }) => theme.Principal.PrincipalHero.h5.LineHeight};
  font-style: ${({ theme }) => theme.Principal.PrincipalHero.h5.FontStyle};
  font-family: ${({ theme }) => theme.Principal.PrincipalHero.h5.FontFamily};
  letter-spacing: ${({ theme }) => theme.Principal.PrincipalHero.h5.LetterSpacing};
  color: ${({ theme }) => theme.Principal.PrincipalHero.h5.Color};
  }
  p{
  font-weight: ${({ theme }) => theme.Principal.PrincipalHero.p.FontWeight};
  font-size: ${({ theme }) => theme.Principal.PrincipalHero.p.FontSize};
  line-height: ${({ theme }) => theme.Principal.PrincipalHero.p.LineHeight};
  font-style: ${({ theme }) => theme.Principal.PrincipalHero.p.FontStyle};
  font-family: ${({ theme }) => theme.Principal.PrincipalHero.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Principal.PrincipalHero.p.LetterSpacing};
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.02em;
  padding-top: ${({ theme }) => theme.Principal.PrincipalHero.p.PaddingTop};
  color: ${({ theme }) => theme.Principal.PrincipalHero.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
  
  position: relative;
  width: 100%;
  .slick-dots{
  bottom: -30px;
  .slick-active{
  margin: 0;
  button{
  &::before{
  font-size: 12px;
  color: ${({ theme }) => theme.Principal.PrincipalHero.Dots.Active.Color};
  }
  }
  }
  button{
  &::before{
  font-size: 12px;
  color: ${({ theme }) => theme.Principal.PrincipalHero.Dots.Color};
  }
  }
  }
  .slick-prev{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-right: 2px solid ${({ theme }) => theme.Principal.PrincipalHero.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.Principal.PrincipalHero.SlickArrowColor.Color};
    z-index: 1;
    margin-left: -0.5rem;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    &::before{
    color: transparent;
    }
    &:hover{
      border-right: 2px solid ${({ theme }) => theme.Principal.PrincipalHero.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.Principal.PrincipalHero.SlickArrowColor.Hover.Color};    
    }
    }
    .slick-next{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-left: 2px solid ${({ theme }) => theme.Principal.PrincipalHero.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.Principal.PrincipalHero.SlickArrowColor.Color};
    z-index: 1;
    margin-right: -0.5rem;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    &::before{
    color: transparent;
    }
    &:hover{
      border-left: 2px solid ${({ theme }) => theme.Principal.PrincipalHero.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.Principal.PrincipalHero.SlickArrowColor.Hover.Color};    
    }
    }
`;
const MessageProfileImage = styled.div`
img{
width: ${({ theme }) => theme.Principal.PrincipalHero.PrincipalProfileImage.Width};
height: ${({ theme }) => theme.Principal.PrincipalHero.PrincipalProfileImage.Height};
border-radius: ${({ theme }) => theme.Principal.PrincipalHero.PrincipalProfileImage.BorderRadius};
background: #D9D9D9;
margin-bottom: ${({ theme }) => theme.Principal.PrincipalHero.PrincipalProfileImage.MarginBottom};
}
`;
const ViewMoreButton = styled.a`

font-weight: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.FontWeight};
font-size: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.FontSize};
line-height: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.BorderColor};
border-radius: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.BorderRadius};
color: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.Color};
padding: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.PaddingY} ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.PaddingX};
cursor: pointer;
text-decoration: underline;
&:hover{
background: transparent;
color: ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Principal.PrincipalHero.ViewMoreMessageButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const MessageDeskHero = () => {
  const settingsMessageDeskHero = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const dispatch = useDispatch();
  const history = useNavigate();
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  console.log("instituteData", instituteData);
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
      <MessageDeskHeroSection>
        <Slider {...settingsMessageDeskHero}>
          {instituteData?.institute_owner_details?.length ? instituteData.institute_owner_details.map((vl, i) => {
            return (
              <MessageDeskHomeHero>
                <MessageProfileImage>
                  <ImageViewer object={vl.institute_owner_profile_photo} defaultImage={MessageProfile1}/>
                  {/* <img src={vl.institute_owner_profile_photo && vl.institute_owner_profile_photo !== "" ? vl.institute_owner_profile_photo : MessageProfile1} alt="" /> */}
                </MessageProfileImage>
                <h4>{vl.institute_owner_name ? vl.institute_owner_name : ""} </h4>
                <h5>{vl.institute_owner_designation ? vl.institute_owner_designation : ""}</h5>
                <p dangerouslySetInnerHTML={{
                  __html:
                    instituteData.institute_owner_details.length &&
                      instituteData.institute_owner_details[0].institute_owner_message ?
                      instituteData.institute_owner_details[0].institute_owner_message : ""
                }}
                ></p>
                <p>
                  {/* {vl.institute_owner_message ? vl.institute_owner_message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} */}
                  &nbsp;<ViewMoreButton onClick={handleViewMoreButton}>
                    See More
                  </ViewMoreButton>
                </p>
              </MessageDeskHomeHero>
            )
          })
            :
            <MessageDeskHomeHero>
              <MessageProfileImage>
                <img src={MessageProfile1} alt="" />
              </MessageProfileImage>
              <h4>{"Bhupinder Kumar"} </h4>
              <h5>{"Owner"}</h5>
              <p>
                {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                &nbsp;<ViewMoreButton onClick={handleViewMoreButton}>
                  See More
                </ViewMoreButton>
              </p>
            </MessageDeskHomeHero>
          }

        </Slider>
      </MessageDeskHeroSection>
    </Container>
  )
}

export default MessageDeskHero