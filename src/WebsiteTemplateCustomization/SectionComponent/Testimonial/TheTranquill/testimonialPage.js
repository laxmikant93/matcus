/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from '../../../CommonComponent/Rating';
import DefaultImage from "./defaultImage.jpg";
import { useSelector } from 'react-redux';
import { Container } from '../../../CommonComponent/Container.styled'
import Testimonial1 from "./testimonial1.jpg";
import ImageViewer from '../../../../Common/ImageViewer';

const TestimonialPageListSection = styled.div`
margin: 72px 0;
`;
const TestimonialPageListHead = styled.div`
margin-bottom: 48px;
h2{
  font-weight: ${({ theme }) => theme.TestimonialPageListSection.h2.FontWeight};
  font-size: ${({ theme }) => theme.TestimonialPageListSection.h2.FontSize};
  line-height: ${({ theme }) => theme.TestimonialPageListSection.h2.LineHeight};
  font-style: ${({ theme }) => theme.TestimonialPageListSection.h2.FontStyle};
  font-family: ${({ theme }) => theme.TestimonialPageListSection.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.TestimonialPageListSection.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.TestimonialPageListSection.h2.Alignment};
  text-transform: ${({ theme }) => theme.TestimonialPageListSection.h2.TextTransform};
  color: ${({ theme }) => theme.TestimonialPageListSection.h2.Color};
  }
  h3{
  font-weight: ${({ theme }) => theme.TestimonialPageListSection.h3.FontWeight};
  font-size: ${({ theme }) => theme.TestimonialPageListSection.h3.FontSize};
  line-height: ${({ theme }) => theme.TestimonialPageListSection.h3.LineHeight};
  font-style: ${({ theme }) => theme.TestimonialPageListSection.h3.FontStyle};
  font-family: ${({ theme }) => theme.TestimonialPageListSection.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.TestimonialPageListSection.h3.LetterSpacing};
  text-align: ${({ theme }) => theme.TestimonialPageListSection.h3.Alignment};
  text-transform: ${({ theme }) => theme.TestimonialPageListSection.h3.TextTransform};
  color: ${({ theme }) => theme.TestimonialPageListSection.h3.Color};
  }
`;

const TestimonialPageListGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 100px 48px;
margin-top: 88px;
@media screen and (max-width: 768px) {
  grid-template-columns: repeat(1, 1fr);
  }
`;
const TestimonialPageListItem = styled.div`
width: 100%;
min-height: 284px;
background: #FDEDE1;
box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.1);
border-radius: 8px;
padding: 58px 24px 24px 24px;
position: relative;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
p{
font-weight: ${({ theme }) => theme.TestimonialPageListSection.p.FontWeight};
font-size: ${({ theme }) => theme.TestimonialPageListSection.p.FontSize};
line-height: ${({ theme }) => theme.TestimonialPageListSection.p.LineHeight};
font-style: ${({ theme }) => theme.TestimonialPageListSection.p.FontStyle};
font-family: ${({ theme }) => theme.TestimonialPageListSection.p.FontFamily};
letter-spacing: ${({ theme }) => theme.TestimonialPageListSection.p.LetterSpacing};
text-align: ${({ theme }) => theme.TestimonialPageListSection.p.Alignment};
text-transform: ${({ theme }) => theme.TestimonialPageListSection.p.TextTransform};
color: ${({ theme }) => theme.TestimonialPageListSection.p.Color};
display: -webkit-box;
-webkit-line-clamp: 10;
-webkit-box-orient: vertical;
overflow: hidden;
}
h6{
font-weight: ${({ theme }) => theme.TestimonialPageListSection.h6.FontWeight};
font-size: ${({ theme }) => theme.TestimonialPageListSection.h6.FontSize};
line-height: ${({ theme }) => theme.TestimonialPageListSection.h6.LineHeight};
font-style: ${({ theme }) => theme.TestimonialPageListSection.h6.FontStyle};
font-family: ${({ theme }) => theme.TestimonialPageListSection.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.TestimonialPageListSection.h6.LetterSpacing};
text-align: ${({ theme }) => theme.TestimonialPageListSection.h6.Alignment};
text-transform: ${({ theme }) => theme.TestimonialPageListSection.h6.TextTransform};
color: ${({ theme }) => theme.TestimonialPageListSection.h6.Color};
margin-top: 16px;
}
img{
width: 72px;
height: 72px;
filter: drop-shadow(2px 5px 15px rgba(32, 32, 32, 0.15));
border-radius: 50%;
object-fit: cover;
position: absolute;
top: -31px;
}
`;

const TestimonialPage = () => {

  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { testimonialData } = useSelector((state) => state.serviceTemplate.getTemplate.data)

  return (
    <Container>
      <TestimonialPageListSection>
        <TestimonialPageListHead>
          <h2>Testimonials</h2>
          <h3>What our customers say?</h3>
        </TestimonialPageListHead>
        <TestimonialPageListGrid>
          {testimonialData && testimonialData.length ?
            testimonialData.map((item, key) => {
              return (
                <TestimonialPageListItem key={key} >
                  <ImageViewer object={item.thumbnail ? item.thumbnail : item.message || item.name ? DefaultImage : Testimonial1} defaultImage={Testimonial1} alt='Testimonial Profile' />
                  <p title="" dangerouslySetInnerHTML={{
                    __html:
                      item.message,
                  }}></p>
                  <h6>{item.name}</h6>
                </TestimonialPageListItem>
              );
            })
            :
            <>
              < TestimonialPageListItem >
                <img src={Testimonial1} alt='Testimonial Profile' />
                <p title="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h6>Rajesh Gupta</h6>
              </TestimonialPageListItem>
              <TestimonialPageListItem>
                <img src={Testimonial1} alt='Testimonial Profile' />
                <p title="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h6>Rajesh Gupta</h6>
              </TestimonialPageListItem>
              <TestimonialPageListItem>
                <img src={Testimonial1} alt='Testimonial Profile' />
                <p title="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h6>Rajesh Gupta</h6>
              </TestimonialPageListItem>
              <TestimonialPageListItem>
                <img src={Testimonial1} alt='Testimonial Profile' />
                <p title="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h6>Rajesh Gupta</h6>
              </TestimonialPageListItem>
              <TestimonialPageListItem>
                <img src={Testimonial1} alt='Testimonial Profile' />
                <p title="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h6>Rajesh Gupta</h6>
              </TestimonialPageListItem>
              <TestimonialPageListItem>
                <img src={Testimonial1} alt='Testimonial Profile' />
                <p title="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h6>Rajesh Gupta</h6>
              </TestimonialPageListItem>
              <TestimonialPageListItem>
                <img src={Testimonial1} alt='Testimonial Profile' />
                <p title="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h6>Rajesh Gupta</h6>
              </TestimonialPageListItem>
            </>
          }
        </TestimonialPageListGrid>
      </TestimonialPageListSection>
    </Container >
  )
}

export default TestimonialPage