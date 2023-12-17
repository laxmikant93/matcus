/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from '../../../CommonComponent/Rating';
import DefaultImage from "./defaultImage.svg";
import { useSelector } from 'react-redux';

const TestimonialHeroSection = styled.div`
padding: 20px 0;
.slick-slide{
  margin: 0 10px;
}
.slick-dots{
  bottom: -30px;
  .slick-active{
  margin: 0;
  button{
  &::before{
  font-size: 12px;
  color: ${({ theme }) => theme.Testimonial.TestimonialHero.Dots.Active.Color};
  }
  }
  }
  button{
  &::before{
  font-size: 12px;
  color: ${({ theme }) => theme.Testimonial.TestimonialHero.Dots.Color};
  }
  }
  }
  .slick-prev{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-right: 2px solid ${({ theme }) => theme.Testimonial.TestimonialHero.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.Testimonial.TestimonialHero.SlickArrowColor.Color};
    z-index: 1;
    margin-left: -0.5rem;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    &::before{
    color: transparent;
    }
    &:hover{
      border-right: 2px solid ${({ theme }) => theme.Testimonial.TestimonialHero.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.Testimonial.TestimonialHero.SlickArrowColor.Hover.Color};    
    }
    }
    .slick-next{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-left: 2px solid ${({ theme }) => theme.Testimonial.TestimonialHero.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.Testimonial.TestimonialHero.SlickArrowColor.Color};
    z-index: 1;
    margin-right: -0.5rem;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    &::before{
    color: transparent;
    }
    &:hover{
      border-left: 2px solid ${({ theme }) => theme.Testimonial.TestimonialHero.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.Testimonial.TestimonialHero.SlickArrowColor.Hover.Color};    
    }
    }
`;
const TestimonialHeroHead = styled.div`
margin-bottom: 24px;
text-align: ${({ theme }) => theme.Testimonial.TestimonialHero.TestimonialHeroHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.Testimonial.TestimonialHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Testimonial.TestimonialHero.h2.FontSize};
line-height: ${({ theme }) => theme.Testimonial.TestimonialHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Testimonial.TestimonialHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Testimonial.TestimonialHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Testimonial.TestimonialHero.h2.LetterSpacing};
color: ${({ theme }) => theme.Testimonial.TestimonialHero.h2.Color};
}
h3{

font-weight: ${({ theme }) => theme.Testimonial.TestimonialHero.h3.FontWeight};
font-size: ${({ theme }) => theme.Testimonial.TestimonialHero.h3.FontSize};
line-height: ${({ theme }) => theme.Testimonial.TestimonialHero.h3.LineHeight};
font-style: ${({ theme }) => theme.Testimonial.TestimonialHero.h3.FontStyle};
font-family: ${({ theme }) => theme.Testimonial.TestimonialHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.Testimonial.TestimonialHero.h3.LetterSpacing};
color: ${({ theme }) => theme.Testimonial.TestimonialHero.h3.Color};
}
}
`;

const TestimonialItem = styled.div`
box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.02), 0px 0px 8px 2px rgba(0, 0, 0, 0.02);
background: ${({ theme }) => theme.Testimonial.TestimonialHero.TestimonialItem.Background};
border-radius: 8px;
padding:  ${({ theme }) => theme.Testimonial.TestimonialHero.TestimonialItem.Padding};
margin-left: 10px;
margin-right: 10px;
h4{
  
  font-weight: ${({ theme }) => theme.Testimonial.TestimonialHero.h4.FontWeight};
  font-size: ${({ theme }) => theme.Testimonial.TestimonialHero.h4.FontSize};
  line-height: ${({ theme }) => theme.Testimonial.TestimonialHero.h4.LineHeight};
  font-style: ${({ theme }) => theme.Testimonial.TestimonialHero.h4.FontStyle};
  font-family: ${({ theme }) => theme.Testimonial.TestimonialHero.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Testimonial.TestimonialHero.h4.LetterSpacing};
  color: ${({ theme }) => theme.Testimonial.TestimonialHero.h4.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
},
h5{
  
  font-weight: ${({ theme }) => theme.Testimonial.TestimonialHero.h5.FontWeight};
  font-size: ${({ theme }) => theme.Testimonial.TestimonialHero.h5.FontSize};
  line-height: ${({ theme }) => theme.Testimonial.TestimonialHero.h5.LineHeight};
  font-style: ${({ theme }) => theme.Testimonial.TestimonialHero.h5.FontStyle};
  font-family: ${({ theme }) => theme.Testimonial.TestimonialHero.h5.FontFamily};
  letter-spacing: ${({ theme }) => theme.Testimonial.TestimonialHero.h5.LetterSpacing};
  color: ${({ theme }) => theme.Testimonial.TestimonialHero.h5.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
},
p{
  
  font-weight: ${({ theme }) => theme.Testimonial.TestimonialHero.p.FontWeight};
  font-size: ${({ theme }) => theme.Testimonial.TestimonialHero.p.FontSize};
  line-height: ${({ theme }) => theme.Testimonial.TestimonialHero.p.LineHeight};
  font-style: ${({ theme }) => theme.Testimonial.TestimonialHero.p.FontStyle};
  font-family: ${({ theme }) => theme.Testimonial.TestimonialHero.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Testimonial.TestimonialHero.p.LetterSpacing};
  color: ${({ theme }) => theme.Testimonial.TestimonialHero.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
 
`;

const TestimonialItemReview = styled.div`
height: 150px;
`;

const TestimonialItemProfile = styled.div`
display: flex;
align-items: center;
gap: 20px;
margin-top: 16px;
img{
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
`;
const TestimonialItemProfileDescription = styled.div``;

const ViewMoreTestimonialHeroSection = styled.div`
display: flex;
justify-content: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroSection.Alignment};
}
`;
const ViewMoreTestimonialHeroButton = styled.a`

font-weight: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.FontWeight};
font-size: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.FontSize};
line-height: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.Background};
border-radius: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.BorderRadius};
color: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.Background};
padding: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.PaddingY} ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.PaddingX};

text-decoration: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.TextDecoration};
margin-top: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.MarginTop};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.Hover.Background};
color: ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Testimonial.TestimonialHero.ViewMoreTestimonialHeroButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const testimonialItem = [
  { title: 'Sumit Kumar', content: 'Slate helps you see how many more days you need to work to reach your financial goal for the month and year.We believe in transparency, trust and value creation..' },
  { title: 'Furkan Kumar', content: 'Slate helps you see how many more days you need to work to reach your financial goal for the month and year.We believe in transparency, trust and value creation..' },
  { title: 'Bhupendra Kumar', content: 'Slate helps you see how many more days you need to work to reach your financial goal for the month and year.We believe in transparency, trust and value creation..' },
  { title: 'Kshitij Kumar', content: 'Slate helps you see how many more days you need to work to reach your financial goal for the month and year.We believe in transparency, trust and value creation..' },

];

const TestimonialHero = () => {
  const settingsTestimonialHero = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: testimonialItem.length > 3 ? 3 : 3,
    slidesToScroll: 1,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  return (
    <TestimonialHeroSection>
      <TestimonialHeroHead>
        <h2>{(subheadersData && subheadersData['testimonialhead']) || "Reviews"}</h2>
        <h3>{(subheadersData && subheadersData['testimonialsubhead']) || ""}</h3>

        <h2>Reviews</h2>
        <h3>We love to here from you!</h3>
      </TestimonialHeroHead>
      <Slider {...settingsTestimonialHero}>
        {testimonialItem.map((item, key) => {
          return (
            <TestimonialItem key={key}>
              <TestimonialItemReview>
                <Rating
                  IsClickable={false}
                  ratingValue="2"
                />
                <p>{item.content ? item.content : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}</p>
              </TestimonialItemReview>
              <TestimonialItemProfile>
                <img src={DefaultImage} alt="" />
                <TestimonialItemProfileDescription>
                  <h4>{item.title ? item.title : "Testimonials"}</h4>
                  <h5>sachiasuh</h5>
                </TestimonialItemProfileDescription>
              </TestimonialItemProfile>
            </TestimonialItem>
          );
        })}
      </Slider>

      <ViewMoreTestimonialHeroSection>
        <ViewMoreTestimonialHeroButton to="">
          View Reviews
        </ViewMoreTestimonialHeroButton>
      </ViewMoreTestimonialHeroSection>
    </TestimonialHeroSection>
  )
}

export default TestimonialHero