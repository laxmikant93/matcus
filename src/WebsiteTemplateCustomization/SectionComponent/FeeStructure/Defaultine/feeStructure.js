/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import DefaultImage from "../feestrucher.png";
import DefaultImage1 from "./defaultImage1.png";
import Modal from '../../../CommonComponent/Modal/index';
import ModalBody from '../../../CommonComponent/Modal/ModalBody';
import ModalFooter from '../../../CommonComponent/Modal/ModalFooter';
import ModalHeader from '../../../CommonComponent/Modal/ModalHeader';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ImageViewer from '../../../../Common/ImageViewer';
const FeeStructurePageSection = styled.div`
padding: 20px 0;
`;
const FeeStructurePage = styled.div`

`;
const FeeStructurePageHead = styled.div`
margin-bottom: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructurePageHead.MarginBottom};
text-align: ${({ theme }) => theme.FeeStructure.FeeStructurePage.FeeStructurePageHead.Alignment};
h2{
text-transform: uppercase;
font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.LetterSpacing};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h2.Color};
}
h3{

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.LineHeight};
font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.FontStyle};
font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.LetterSpacing};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h3.Color};
}
}
`;
const FeeStructurePageItemGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 32px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
}
`;
const FeeStructurePageItem = styled.div`
background: #fff;
height: 100%;
padding: 16px 24px;
border-radius: 12px;
box-shadow: 0px 0px 8px 2px rgba(32, 32, 32, 0.05), 0px 0px 8px 2px rgba(32, 32, 32, 0.05);
`;
const FeeStructurePageFigure = styled.figure`
display: flex;
align-items: flex-start;
grid-template-columns: auto 1fr;
gap: 24px;
img{
width: 103px;
height: 103px;
object-fit: cover;
border-radius: 50%;
}
`;

const FeeStructurePageCaption = styled.figcaption`
h6{
  
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h6.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h6.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h6.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h6.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h6.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.h6.Color};
  display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
},
p{
  
  font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.FontWeight};
  font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.FontSize};
  line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.LineHeight};
  font-style: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.FontStyle};
  font-family: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.LetterSpacing};
  color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.p.Color};
   display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
overflow: hidden;
},
`;
const ViewFeeButton = styled.a`
display: block;

font-weight: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.FontWeight};
font-size: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.FontSize};
line-height: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.BorderColor};
border-radius: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.BorderRadius};
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.Background};
padding: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.PaddingY} ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.MarginTop};
text-decoration: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.TextDecoration};
&:hover{
background: transparent;
color: ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.Hover.Background};
border: 1px solid ${({ theme }) => theme.FeeStructure.FeeStructurePage.ViewFeeButton.Hover.BorderColor};
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
`;
const FeeStructureModalBodyHeadLeft = styled.div`
h4{
  
font-weight: 600;
font-size: 24px;
line-height: 34px;
font-style: normal;
font-family: inherit;
letter-spacing: inherit;
text-align: left;
color: #26335D;
},
h5{
  
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  font-style: normal;
  font-family: inherit;
  letter-spacing: inherit;
  text-align: left;
  color: #26335D;
}
`;
const FeeStructureModalBodyHeadRight = styled.div`

`;

const DownloadFileButton = styled.button`
display: block;

font-weight: 500;
font-size: 14px;
line-height: 24px;
letter-spacing: 0.2px;
background: #26335D;
border: 1px solid #26335D;
border-radius: 4px;
color: #FFFFFF;
padding: 8px 24px;
cursor: pointer;
&:hover{
background: #FFFFFF;
color: #26335D;
border: 1px solid #26335D;
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
  border-top: 1px solid #26335D;;
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

  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  font-style: normal;
  font-family: inherit;
  letter-spacing: inherit;
  text-align: left;
  color: #26335D;
}
p{
  margin-top: 5px;
  font-weight: 400;
font-size: 16px;
line-height: 24px;
font-style: normal;
font-family: inherit;
letter-spacing: inherit;
text-align: left;
color: #26335D;
}
`;
const TermsAndCondition = styled.div`
margin-top: 3rem;
h6{
font-weight: 600;
font-size: 24px;
line-height: 34px;
font-style: normal;
font-family: inherit;
letter-spacing: inherit;
text-align: left;
color: #26335D;
}
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
        <FeeStructurePageSection>
          <FeeStructurePage>
            <FeeStructurePageHead>
            <h2>{(subheadersData && subheadersData['feehead']) || "Fee Structures"}</h2>
            <h3>{(subheadersData && subheadersData['feesubhead']) || ""}</h3>
            </FeeStructurePageHead>
            <FeeStructurePageItemGrid>
              {
                feestructuresData.length ?
                  feestructuresData.map((item, key) => {
                    return (
                      <FeeStructurePageItem>
                        <FeeStructurePageFigure>
                    <ImageViewer object={item.document} defaultImage={DefaultImage}/>

                          {/* <img src={item.document ? item.document : DefaultImage} alt="Fee Structure" /> */}
                          <FeeStructurePageCaption key={key}>
                            <h6 title={item.title}>{item.title}</h6>
                            <p title='Maths' dangerouslySetInnerHTML={{
                              __html:
                                item.description,
                            }}></p>
                            <ViewFeeButton onClick={() => viewDetail(item)}>View Fee Structure
                            </ViewFeeButton>
                          </FeeStructurePageCaption>
                        </FeeStructurePageFigure>
                      </FeeStructurePageItem>
                    )
                  }) :
                  <>
                    <FeeStructurePageItem>
                      <FeeStructurePageFigure>
                        <img src={DefaultImage1} alt="Fee Structure" />
                        <FeeStructurePageCaption>
                          <h6>Pre Nursery To U.K.G</h6>
                          <p>(Pay fee accordingly)</p>
                          <ViewFeeButton to="">
                            View Fee
                          </ViewFeeButton>
                        </FeeStructurePageCaption>
                      </FeeStructurePageFigure>
                    </FeeStructurePageItem>
                    <FeeStructurePageItem>
                      <FeeStructurePageFigure>
                        <img src={DefaultImage1} alt="Fee Structure" />
                        <FeeStructurePageCaption>
                          <h6>Pre Nursery To U.K.G</h6>
                          <p>(Pay fee accordingly)</p>
                          <ViewFeeButton to="">
                            View Fee
                          </ViewFeeButton>
                        </FeeStructurePageCaption>
                      </FeeStructurePageFigure>
                    </FeeStructurePageItem>
                    <FeeStructurePageItem>
                      <FeeStructurePageFigure>
                        <img src={DefaultImage1} alt="Fee Structure" />
                        <FeeStructurePageCaption>
                          <h6>Pre Nursery To U.K.G</h6>
                          <p>(Pay fee accordingly)</p>
                          <ViewFeeButton to="">
                            View Fee
                          </ViewFeeButton>
                        </FeeStructurePageCaption>
                      </FeeStructurePageFigure>
                    </FeeStructurePageItem>
                    <FeeStructurePageItem>
                      <FeeStructurePageFigure>
                        <img src={DefaultImage1} alt="Fee Structure" />
                        <FeeStructurePageCaption>
                          <h6>Pre Nursery To U.K.G</h6>
                          <p>(Pay fee accordingly)</p>
                          <ViewFeeButton to="">
                            View Fee
                          </ViewFeeButton>
                        </FeeStructurePageCaption>
                      </FeeStructurePageFigure>
                    </FeeStructurePageItem>
                    <FeeStructurePageItem>
                      <FeeStructurePageFigure>
                        <img src={DefaultImage1} alt="Fee Structure" />
                        <FeeStructurePageCaption>
                          <h6>Pre Nursery To U.K.G</h6>
                          <p>(Pay fee accordingly)</p>
                          <ViewFeeButton to="">
                            View Fee
                          </ViewFeeButton>
                        </FeeStructurePageCaption>
                      </FeeStructurePageFigure>
                    </FeeStructurePageItem>
                  </>
              }
            </FeeStructurePageItemGrid>

          </FeeStructurePage>
        </FeeStructurePageSection>
      </Container>
      <Modal ref={feeStructureModal}>
        <ModalHeader title={details.title} subtitle="General Knowledge"></ModalHeader>
        <ModalBody>
          <FeeStructureModalBody>
            <FeeStructureModalBodyHead>
              <FeeStructureModalBodyHeadLeft>
                <h4>Fee Breapkup</h4>
                <h5>All Fee in India Rupee (₹)</h5>
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
                        <i>&#8377; </i>
                      ) : (
                        ""
                      )
                    }
                      {details.feeType === "usd" ? (
                        <i>&#36; </i>
                      ) : (
                        ""
                      )}
                      {details.feeType === "euro" ? (
                        <i>&euro; </i>
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
              <p dangerouslySetInnerHTML={{
                __html:
                  details.terms,
              }}></p>
            </TermsAndCondition>
          </FeeStructureModalBody>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  )
}

export default Feestructure