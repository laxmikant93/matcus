/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'

import FeeStructure1 from "../../../assets/Vespertine/Team1.svg";
import FeeStructure2 from "../../../assets/Vespertine/Team1.svg";
import FeeStructure3 from "../../../assets/Vespertine/Team1.svg";
import Modal from '../../../CommonComponent/Modal/index';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import ModalFooter from '../../../CommonComponent/Modal/ModalFooter';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
const FeeStructureSection = styled.div`
padding: 40px 0;
`;
const FeeStructure = styled.div`

`;
const FeeStructureHead = styled.div`
margin-bottom: 48px;
display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.Alignment};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.Color};
  text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.BorderBottom.Background};
  bottom: ${({ theme }) => theme.FeeStructure.FeeStructurePage.BorderBottom.BottomSpace};
  }
  }
`;
const FeeStructureListGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 80px;
`;
const FeeStructureListCard = styled.div`
background: #FFFFFF;
box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.15);
border-radius: 16px;
padding: 24px;
text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureListCard.Alignment};
h4{
  
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h4.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h4.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h4.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h4.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h4.LetterSpacing};
  text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h4.Alignment};
  color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h4.Color};
  display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
p{
  
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.LetterSpacing};
  text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.Alignment};
  color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.Color};
  display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const ViewFeeStructureButtonSection = styled.div`
margin-top: 16px;
`;
const ViewFeeStructureButton = styled.button`
text-decoration: underline;

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.BorderColor};
border-radius: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.BorderRadius};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.Background};
padding: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.PaddingY} ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.PaddingX};
cursor: pointer;
text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.Alignment};
&:hover{
background: transparent;
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const FeeStructureModalBody = styled.div`
margin-top: 20px;
`;
const FeeStructureModalBodyHead = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
gap: 10px;
@media screen and (max-width: 768px) {
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
  }
`;
const FeeStructureModalBodyHeadLeft = styled.div`
h4{
  
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h4.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h4.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h4.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h4.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h4.LetterSpacing};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h4.Alignment};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h4.Color};
},
h5{
  
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h5.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h5.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h5.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h5.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h5.LetterSpacing};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h5.Alignment};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h5.Color};
}
`;
const FeeStructureModalBodyHeadRight = styled.div`

`;

const DownloadFileButton = styled.a`
display: block;
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.LineHeight};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.LetterSpacing};
background: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.Background};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.BorderColor};
border-radius: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.BorderRadius};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.Color};
padding: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.PaddingY} ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.Hover.Background};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeStructureButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.DownloadFileButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const FeeStructureBreakuplist = styled.ul`
padding: 2rem 0;
table{
width: 100%;
tr{
  border-top: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.FeeStructureBreakuplist.tr.BorderColor};;
}
th{
  padding: 10px 0;
}
td{
  padding: 10px 0;
}
thead{
  th{
    text-align:center;
    width: 25%;
    
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #343F64;
    &:first-child{
      text-align: left;
    }
    &:last-child{
      text-align: right;
    }
  }
}
tbody{
  td{
    text-align:center;
    width: 25%;
    
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #343F64;
    &:first-child{
      text-align: left;
    }
    &:last-child{
      text-align: right;
    }
  }
}
tfoot{
  td{
    text-align:center;
    width: 25%;
    
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #343F64;
    &:first-child{
      text-align: left;
    }
    &:last-child{
      text-align: right;
    }
  }
}
}
`;
const Description = styled.div`
margin-top: 3rem;
h6{

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.LetterSpacing};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.Alignment};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.Color};
}
p{
  margin-top: 5px;
  
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.LetterSpacing};
  text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.Alignment};
  color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.Color};
}
`;
const TermsAndCondition = styled.div`
margin-top: 3rem;
h6{

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.LetterSpacing};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.Alignment};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.h6.Color};
}
p{
  margin-top: 5px;
  
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.LetterSpacing};
  text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.Alignment};
  color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.Color};
}
`;
const TermsAndConditionList = styled.ul`
padding-left: 20px;
margin-top: 5px;
`;
const TermsAndConditionItem = styled.li`
list-style-type: decimal;

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.LetterSpacing};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.Alignment};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructureModalBody.p.Color};
`;
const Feestructure = () => {
  const feeStructureModal = useRef(null)
  const { feestructuresData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  const [details, setDetails] = useState("")
  const viewDetail = (item) => {
    setDetails(item)
    feeStructureModal.current.open()
  }
  const downloadFile = () => {
    window.open(details.document?.src, '_blank');
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
    <>
      <Container>
        <FeeStructureSection>
          <FeeStructure>
            <FeeStructureHead>
              <h2>{(subheadersData && subheadersData['feehead']) || "Fee Structures"}</h2>
              <h3>{(subheadersData && subheadersData['feesubhead']) || ""}</h3>
            </FeeStructureHead>
            <FeeStructureListGrid>
              {
                feestructuresData.length ?
                  feestructuresData.map((item, key) => {
                    return (
                      <FeeStructureListCard key={key}>
                        <h4 title={item.title}>{item.title}</h4>
                        <p title='Maths' dangerouslySetInnerHTML={{
                          __html:
                            item.description,
                        }}></p>
                        <ViewFeeStructureButtonSection>
                          <ViewFeeStructureButton onClick={() => viewDetail(item)}>View Fee Structure</ViewFeeStructureButton>
                        </ViewFeeStructureButtonSection>
                      </FeeStructureListCard>
                    )
                  }) :
                  <FeeStructureListCard>
                    <h4 >Fee Title</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                  </FeeStructureListCard>
              }


            </FeeStructureListGrid>
          </FeeStructure>
        </FeeStructureSection>
      </Container>
      <Modal ref={feeStructureModal}>
        <ModalHeader title={details.title} subtitle="General Knowledge"></ModalHeader>
        <ModalBody>
          <FeeStructureModalBody>
            <FeeStructureModalBodyHead>
              <FeeStructureModalBodyHeadLeft>
                <h4>Fee Breapkup</h4>
                {/*  <h5>All Fee in India Rupee (₹)</h5> */}
                <h5>All Fee in {details.feeType?.toUpperCase()} ({
                  details.feeType === "rupees" ? (
                    <i className="primary w-600">&#8377;</i>) : ("")}
                  {details.feeType === "usd" ? (
                    <i className="primary w-600">&#36;</i>) : ("")}
                  {details.feeType === "euro" ? (
                    <i className="primary w-600">&euro;</i>) : ("")})</h5>

              </FeeStructureModalBodyHeadLeft>
              <FeeStructureModalBodyHeadRight>
                <DownloadFileButton type='button' onClick={downloadFile}>Download File</DownloadFileButton>
              </FeeStructureModalBodyHeadRight>
            </FeeStructureModalBodyHead>
            <FeeStructureBreakuplist>
              <table>
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Amount</th>
                    <th>Payment Cycle</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {details.feestructure &&
                    details.feestructure.length ? (
                    details.feestructure.map((feeOption) => (
                      <tr key={feeOption._id}>
                        <td data-column="Fee Type">{feeOption.type}</td>
                        <td data-column="Amount">{feeOption.amount}</td>
                        <td data-column="Payment">{feeOption.paymentCycle}</td>
                        <td data-column="Total">
                          {totalAmount(feeOption.paymentCycle, feeOption.amount)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No information available</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan={2}>Grand Total</td>
                    <td colspan={2}>  {
                      details.feeType === "rupees" ? (
                        <i className="primary w-600">&#8377; </i>
                      ) : (
                        ""
                      )
                    }
                      {details.feeType === "usd" ? (
                        <i className="primary w-600">&#36; </i>
                      ) : (
                        ""
                      )}
                      {details.feeType === "euro" ? (
                        <i className="primary w-600">&euro; </i>
                      ) : (
                        ""
                      )}  {details.fee}</td>
                  </tr>
                </tfoot>
              </table>
            </FeeStructureBreakuplist>
            <Description>
              <h6>Fee Description</h6>
              <p dangerouslySetInnerHTML={{
                __html:
                  details.description,
              }}></p>
            </Description>
            <TermsAndCondition>
              <h6>Terms & Conditions</h6>
              {/* <p>{details.terms}</p> */}
              <p dangerouslySetInnerHTML={{
                __html:
                  details.terms,
              }}></p>
            </TermsAndCondition>
          </FeeStructureModalBody>
        </ModalBody>
      </Modal>
    </>
  )
}

export default Feestructure