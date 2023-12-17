/* eslint-disable jsx-a11y/no-distracting-elements */
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import defaultImage from "../School_facilities.png";
import defaultImage2 from "./defaultImage2.svg";
import ImageViewer from '../../../../Common/ImageViewer';

const FacilitiesPageSection = styled.div`
padding: 24px 0;
`;
const FacilitiesPageHead = styled.div`
margin-bottom: 48px;
h2{
font-weight: ${({ theme }) => theme.Facility.FacilityPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilityPage.h2.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilityPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilityPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilityPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilityPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Facility.FacilityPage.h2.Alignment};
color: ${({ theme }) => theme.Facility.FacilityPage.h2.Color};
text-transform: uppercase;
}
h3{
font-weight: 400;
font-size: 16px;
line-height: 24px;
font-style: normal;
font-family: "";
letter-spacing: "";
text-align: center;
color: #4E616B;
text-decoration: underline; 
}
`;
const FacilitiesPageGrid = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap:32px;
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr;
}
`;
const FacilitiesItem = styled.figure`
border-radius: 8px;
box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.1);
`;
const FacilitiesImage = styled.div`
width: 100%;
height: 196px;
img{
width: 100%;
height: 100%;
object-fit: cover;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
}
`;
const FacilitiesDescription = styled.figcaption`
max-height: 140px;
overflow-y: scroll;
width: 100%;
margin-bottom: 20px;
&::-webkit-scrollbar {
  width: 3px;
}
&::-webkit-scrollbar-thumb{
  border-radius: 20px;
}
height: auto;
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
padding: ${({ theme }) => theme.Facility.FacilityPage.FacilitiesDescription.Padding};
background: ${({ theme }) => theme.Facility.FacilityPage.FacilitiesDescription.Background};
box-shadow: 0px 0px 19px -23px rgba(0, 0, 0, 0.69);

h4{
font-weight: ${({ theme }) => theme.Facility.FacilityPage.h4.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilityPage.h4.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilityPage.h4.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilityPage.h4.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilityPage.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilityPage.h4.LetterSpacing};
color: ${({ theme }) => theme.Facility.FacilityPage.h4.Color};
position: relative;
&::after{
width: 100%;
height: ${({ theme }) => theme.Facility.FacilityPage.FacilitiesDescription.BorderBottom.Height};
background-color: ${({ theme }) => theme.Facility.FacilityPage.FacilitiesDescription.BorderBottom.Background};
bottom: ${({ theme }) => theme.Facility.FacilityPage.FacilitiesDescription.BorderBottom.BottomSpace};
}
}
p{

font-weight: ${({ theme }) => theme.Facility.FacilityPage.p.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilityPage.p.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilityPage.p.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilityPage.p.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilityPage.p.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilityPage.p.LetterSpacing};
color: ${({ theme }) => theme.Facility.FacilityPage.p.Color};
}
`;


const Facilities = () => {
  const { facilitiesData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  return (
    <Container>
      <FacilitiesPageSection>
        <FacilitiesPageHead>
        <h2>{(subheadersData && subheadersData['servicehead']) || "SERVICES"}</h2>
        <h3>{(subheadersData && subheadersData['servicesubhead']) || ""}</h3>
        </FacilitiesPageHead>
        <FacilitiesPageGrid>
          {
            facilitiesData.length ?
              facilitiesData.map((item, key) => {
                return (
                  <FacilitiesItem>
                    <FacilitiesImage>
                    <ImageViewer object={item.thumbnail} defaultImage={defaultImage}/>
                      {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : defaultImage} alt="" /> */}
                    </FacilitiesImage>
                    <FacilitiesDescription>
                      <h4>{item.title ? item.title : "Smart Class"} </h4>
                      {item.details ?
                        <ul>
                          <li dangerouslySetInnerHTML={{
                            __html:
                              item.details,
                          }}></li>
                        </ul> :
                        ""}
                      {/* <p> {item.details ? item.details : "SmartClass is the education technology platform for K-12 and higher education, serving hundreds of thousands in many saa countries around the world , serving hundreds of thousands in many education technology platform for."}</p> */}
                    </FacilitiesDescription>
                  </FacilitiesItem>
                )
              }) :

              <FacilitiesItem>
                <FacilitiesImage>
                  <img src={defaultImage2} alt="" />
                </FacilitiesImage>
                <FacilitiesDescription>
                  <h4>Robotics Class </h4>
                  <p>SmartClass is the education technology platform for K-12 and higher education, serving hundreds of thousands in many saa countries around the world , serving hundreds of thousands in many education technology platform for.</p>
                </FacilitiesDescription>
              </FacilitiesItem>
          }
        </FacilitiesPageGrid>
      </FacilitiesPageSection>
    </Container>
  )
}

export default Facilities