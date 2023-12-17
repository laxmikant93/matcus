import React from 'react'
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
margin-bottom: ${({ theme }) => theme.Faqs.FaqsPage.FaqsHead.MarginBottom};

display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontSize};
line-height: ${({ theme }) => theme.Faqs.FaqsPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Faqs.FaqsPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Faqs.FaqsPage.h2.Alignment};
color: ${({ theme }) => theme.Faqs.FaqsPage.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.Faqs.FaqsPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.Faqs.FaqsPage.h3.FontSize};
  line-height: ${({ theme }) => theme.Faqs.FaqsPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.Faqs.FaqsPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.Faqs.FaqsPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Faqs.FaqsPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.Faqs.FaqsPage.h3.Color};
  text-align: ${({ theme }) => theme.Faqs.FaqsPage.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Faqs.FaqsPage.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Faqs.FaqsPage.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Faqs.FaqsPage.BorderBottom.BottomSpace};
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;
const PrivacyPolicy = () => {

  return (
    <React.Fragment>
      <Container>
        <FaqsSection>
          <Faqs>
            <FaqsHead>
              <h2>Privacy Policy</h2>
            </FaqsHead>
            <FaqsDescription>
              <FaqList>
                <FaqListItem>
                  <h3>THE LITTLE MASTER ENGLISH HIGHER SECONDARY SCHOOL</h3>
                  <p>(Here in after referred to as “we, our and us”) is a co-educational institute recognized by the Board of Secondary Education Manipur (BOSEM) and Council of Higher Secondary Education Manipur (COHSEM), Govt. of Manipur.
                    We appreciate and acknowledge your trust and adhere to the legal benchmarks in gathering, using, and safeguarding any personal details provided by you. We are committed to protecting your privacy. This privacy policy provides you with details about the manner in which your data is collected, stored, and used by us. Hence, we suggest you to read this policy carefully and if you do not agree to the terms of the policy then please do not go ahead and accept the terms and conditions provided on our site.
                  </p>
                </FaqListItem>
                <FaqListItem>
                  <h3>INFORMATION PROVIDED BY YOU</h3>
                  <p>The information provided by you will be categorized as “personal information” and such information will be used, retained, and protected by us as per the guidelines provided by The Information Technology Act, 2000, Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011, Personal Data Protection Bill, 2018.
                    We may use the information provided by you to get in touch with you from time to time in order to provide you with the services or products asked by you. Apart from this, we may provide you with any relevant information, required notices, and marketing promotions. We may further ask you to provide us with any extra information that can help us serve you better.
                    If the credentials provided by you are correct then we will not differentiate on who is using the application so as to provide you with the best services and easy access to any information you may require from us.
                  </p>
                </FaqListItem>
                <FaqListItem>
                  <h3>USE OF PERSONAL INFORMATION </h3>
                  <p>We use the information collected from you to for providing you best possible services and conduct research and analyze trends to understand your learning patterns and requirements. We may use your data to create a behavioral pattern and provide you with personalized content which simplifies everything for you so that you can make the best use of our services.
                    In order to create personalizedmatters for you, we will send you email notices or contact you to communicate about related services, products, and benefits to help you improve your experience.
                  </p>
                </FaqListItem>
                <FaqListItem>
                  <h3>AUTOMATIC INFORMATION COLLECTION</h3>
                  <p>Our system collects information that is sent over the internet without your control. Some examples of the information we collect and analyze include the Internet protocol (IP) address used to connect your computer to the internet; login; email; password; computer and connection information such as browser type and version, operating system, and platform; course enrolled history, which we sometimes aggregate with similar information from other users to create features, reports such as popular courses, most used features, etc; the full URL clickstream to, and from our website(s), including date and time; cookie number; courses or videos you viewed or searched for; the email id you used to call our customer service.
                    During some visits, we may use software tools to measure and collect session information, including page response times, download errors, length of visits to a certain page, course and videos, and page interaction information (such as scrolling, clicks, and mouse-overs), and methods used to browse away from the page.
                  </p>
                </FaqListItem>
                <FaqListItem>
                  <h3>SHARING INFORMATION </h3>
                  <p>We may, in order to serve you better, share your information with a third party who may work on our behalf to provide you with the desired services or to help us communicate with you, or to maintain our platform. These contractors do not have the right to disclose the information further.
                    We may have to use Personal Information without reference to any personor identity for research, statistical analysis, and business intelligence purpose and may transfer such research, statistical, or intelligence data in an aggregated or non-personally identifiable form to third parties and affiliates.
                    All our employees and data processors, who have access to, and are associated with the processing of sensitive personal data or information, are obliged to respect the confidentiality of every User’s sensitive personal data and information.
                    Your Personal Information may also be shared with third parties who have a need or authority to receive such information, if we have a good-faith belief that access, use, preservation, or disclosure of the information is reasonably necessary to comply with (i) in response to any authority having to receive such information under law (ii) any order of the court (iii) detect, prevent, or otherwise address fraud, security or technical issues (iv) protect against harm to the rights, property or our safety, our users or the public as required or permitted by lawUnder the General Data Protection Regulation (GDPR)
                  </p>
                </FaqListItem>
                <FaqListItem>
                  <h3>SECURITY</h3>
                  <p>We have uncompromising security measures in place to prevent you from any harm, loss, or misuse on the basis of information provided by you. After you have provided us with your personal information, we ensure its safety as we adhere to all the security guidelines provided under the law of Information Technology Act (2000) (“IT Act”) including Section 43A and Section 72A (which give a right to compensation for improper disclosure of personal information)
                  </p>
                </FaqListItem>
                <FaqListItem>
                  <h3>RETENTION OF DATA</h3>
                  <p>We may retain your personal data only as long as may be reasonably necessary to satisfy the purpose for which it is processed. We may alter this practice according to legal and business requirements.
                  </p>
                </FaqListItem>
                <FaqListItem>
                  <h3>YOUR CONSENT</h3>
                  <p>We believe that you are using our services with free will and have agreed to our policies with informed consent. Once you register to our site, you give us access to your personal information and we deem your consent to use such information for your benefit. Further, we may process your information in a manner to collect, store, delete, use, combine, share, transfer; disclose it so that you can get the utmost benefit from our services.
                  </p>
                </FaqListItem>
                <FaqListItem>
                  <h5>Please Note: </h5>
                  <p>Our privacy policy may change at any time without prior notification. In order to be updated with our policy, please make sure that you visit us from time to time and review our policy periodically. Further, this privacy policy shall apply on a uniform basis across all our products and services. </p>
                </FaqListItem>
              </FaqList>
            </FaqsDescription>
          </Faqs>
        </FaqsSection>
      </Container>
    </React.Fragment>
  )
}

export default PrivacyPolicy
