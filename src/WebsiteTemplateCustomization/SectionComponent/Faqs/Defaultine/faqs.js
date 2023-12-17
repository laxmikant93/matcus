/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled';
import { useSelector } from 'react-redux';

const FaqsSection = styled.div`
padding: 40px 0;
`;
const Faqs = styled.div`

`;
const FaqsHead = styled.div`
margin-bottom: ${({ theme }) => theme.Faqs.FaqsPage.FaqsHead.MarginBottom};
text-align: ${({ theme }) => theme.Faqs.FaqsPage.FaqsHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontSize};
line-height: ${({ theme }) => theme.Faqs.FaqsPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Faqs.FaqsPage.h2.LetterSpacing};
color: ${({ theme }) => theme.Faqs.FaqsPage.h2.Color};
}
h3{
font-weight: ${({ theme }) => theme.Faqs.FaqsPage.h3.FontWeight};
font-size: ${({ theme }) => theme.Faqs.FaqsPage.h3.FontSize};
line-height: ${({ theme }) => theme.Faqs.FaqsPage.h3.LineHeight};
font-style: ${({ theme }) => theme.Faqs.FaqsPage.h3.FontStyle};
font-family: ${({ theme }) => theme.Faqs.FaqsPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.Faqs.FaqsPage.h3.LetterSpacing};
color: ${({ theme }) => theme.Faqs.FaqsPage.h3.Color};
}
}
`;
const FaqsDescription = styled.div`

`;
const FaqList = styled.ul`
padding: 0 20px;
`;
const FaqListItem = styled.li`
border-bottom: 1px solid ${({ theme }) => theme.Faqs.FaqsPage.FaqListItem.BorderColor};
padding: 16px 0 16px 24px;
h6{
  
  font-weight: ${({ theme }) => theme.Faqs.FaqsPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.Faqs.FaqsPage.h6.FontSize};
  line-height: ${({ theme }) => theme.Faqs.FaqsPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.Faqs.FaqsPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.Faqs.FaqsPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Faqs.FaqsPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.Faqs.FaqsPage.h6.Color};
  position: relative; 
  
  &::before{
    width: 8px;
    height: 8px;
    border-radius:50%;
    background: ${({ theme }) => theme.Faqs.FaqsPage.h6.Color};
    left: -20px;
    top: 8px;
  }
},
p{
  
  font-weight: ${({ theme }) => theme.Faqs.FaqsPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Faqs.FaqsPage.p.FontSize};
  line-height: ${({ theme }) => theme.Faqs.FaqsPage.p.LineHeight};
  font-style: ${({ theme }) => theme.Faqs.FaqsPage.p.FontStyle};
  font-family: ${({ theme }) => theme.Faqs.FaqsPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Faqs.FaqsPage.p.LetterSpacing};
  color: ${({ theme }) => theme.Faqs.FaqsPage.p.Color};

}
`;

const Faq = () => {
  const { faqsData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  return (
    <Container>
      <FaqsSection>
        <Faqs>
          <FaqsHead>
            <h2>{(subheadersData && subheadersData['faqhead']) || "Frequently Asked Questions"}</h2>
            <h3>{(subheadersData && subheadersData['faqsubhead']) || ""}</h3>
            {/* <h3>Need help? Refer to our most frequently asked questions.</h3> */}
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
                  <>
                    <FaqListItem>
                      <h6>What is your school philosophy or vision?</h6>
                      <p>It’s important to find out what a school’s philosophy or vision is. You want to make sure this is consistent with your own educational
                        beliefs and values. Often, a school’s philosophy is reflected in its mission statement, and is carried out through what’s called a “strategic
                        plan”</p>
                    </FaqListItem>
                    <FaqListItem>
                      <h6>What is your school philosophy or vision?</h6>
                      <p>It’s important to find out what a school’s philosophy or vision is. You want to make sure this is consistent with your own educational
                        beliefs and values. Often, a school’s philosophy is reflected in its mission statement, and is carried out through what’s called a “strategic
                        plan”</p>
                    </FaqListItem>
                  </>
              }

            </FaqList>
          </FaqsDescription>
        </Faqs>
      </FaqsSection>
    </Container>
  )
}

export default Faq