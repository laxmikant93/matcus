/* eslint-disable jsx-a11y/no-distracting-elements */
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'

const FaqsSection = styled.div`
padding: 40px 0;
`;
const Faqs = styled.div`

`;
const FaqsHead = styled.div`
margin-bottom: ${({ theme }) => theme.FaqsPage.FaqsHead.MarginBottom};
text-align: ${({ theme }) => theme.FaqsPage.FaqsHead.Alignment};
h2{
  font-weight: ${({ theme }) => theme.FaqsPage.h2.FontWeight};
  font-size: ${({ theme }) => theme.FaqsPage.h2.FontSize};
  line-height: ${({ theme }) => theme.FaqsPage.h2.LineHeight};
  font-style: ${({ theme }) => theme.FaqsPage.h2.FontStyle};
  font-family: ${({ theme }) => theme.FaqsPage.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.FaqsPage.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.FaqsPage.h2.Alignment};
  text-transform: ${({ theme }) => theme.FaqsPage.h2.TextTransform};
  color: ${({ theme }) => theme.FaqsPage.h2.Color};
@media screen and (max-width: 768px) {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
}
h3{
  font-weight: ${({ theme }) => theme.FaqsPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.FaqsPage.h3.FontSize};
  line-height: ${({ theme }) => theme.FaqsPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.FaqsPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.FaqsPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.FaqsPage.h3.LetterSpacing};
  text-align: ${({ theme }) => theme.FaqsPage.h3.Alignment};
  text-transform: ${({ theme }) => theme.FaqsPage.h3.TextTransform};
  color: ${({ theme }) => theme.FaqsPage.h3.Color};
@media screen and (max-width: 768px) {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
}
}
`;
const FaqsDescription = styled.div`

`;
const FaqList = styled.ul`
padding: 0 20px;
`;
const FaqListItem = styled.li`
border-bottom: 1px solid ${({ theme }) => theme.FaqsPage.FaqListItem.BorderColor};
padding: 16px 0 16px 24px;
h6{
  
  font-weight: ${({ theme }) => theme.FaqsPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.FaqsPage.h6.FontSize};
  line-height: ${({ theme }) => theme.FaqsPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.FaqsPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.FaqsPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.FaqsPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.FaqsPage.h6.Color};
  position: relative; 
  
  &::before{
    width: 8px;
    height: 8px;
    border-radius:50%;
    background: ${({ theme }) => theme.FaqsPage.h6.Color};
    left: -20px;
    top: 8px;
  }
},
p{
  
  font-weight: ${({ theme }) => theme.FaqsPage.p.FontWeight};
  font-size: ${({ theme }) => theme.FaqsPage.p.FontSize};
  line-height: ${({ theme }) => theme.FaqsPage.p.LineHeight};
  font-style: ${({ theme }) => theme.FaqsPage.p.FontStyle};
  font-family: ${({ theme }) => theme.FaqsPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.FaqsPage.p.LetterSpacing};
  color: ${({ theme }) => theme.FaqsPage.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;
const ViewMoreFaqsSection = styled.div`
display: flex;
justify-content: center;
margin-top: ${({ theme }) => theme.FaqsPage.ViewMoreFaqsSection.MarginTop};
}
`;

const Faq = () => {
  const { faqsData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)

  return (
    <Container>
      <FaqsSection>
        <Faqs>
          <FaqsHead>
            {/* <h2>FAQs</h2>
            <h3>Have Questions?</h3> */}
            <h2>{(subheadersData && subheadersData['faqhead']) || "Frequently Asked Questions"}</h2>
            <h3>{(subheadersData && subheadersData['faqsubhead']) || "Frequently Asked Questions"}</h3>
          </FaqsHead>
          <FaqsDescription>
            <FaqList>
              {
                faqsData && faqsData.length ?
                  faqsData.map((item, key) => {
                    return (
                      <FaqListItem key={key}>
                        <h6>{item.title}</h6>
                        <p dangerouslySetInnerHTML={{
                          __html:
                            item.description,
                        }}></p>
                      </FaqListItem>
                    )
                  }) :
                  <FaqListItem>
                    <h6>New Faq</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </FaqListItem>
              }
            </FaqList>
          </FaqsDescription>
        </Faqs>
      </FaqsSection>
    </Container>
  )
}

export default Faq