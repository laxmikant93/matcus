/* eslint-disable jsx-a11y/no-distracting-elements */
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import ComputerFacilities from "../../../assets/Vespertine/ComputerFacilities.svg";
import ComputerFacilities1 from "../School_facilities.png";
import { useEffect } from 'react';
import ImageViewer from '../../../../Common/ImageViewer';

const FacilitySection = styled.div`
padding: 40px 0;
`;
const Facility = styled.div`

`;
const FacilityHead = styled.div`
margin-bottom: 48px;

display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Facility.FacilityPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilityPage.h2.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilityPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilityPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilityPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilityPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Facility.FacilityPage.h2.Alignment};
color: ${({ theme }) => theme.Facility.FacilityPage.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.Facility.FacilityPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.Facility.FacilityPage.h3.FontSize};
  line-height: ${({ theme }) => theme.Facility.FacilityPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.Facility.FacilityPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.Facility.FacilityPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Facility.FacilityPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.Facility.FacilityPage.h3.Color};
  text-align: ${({ theme }) => theme.Facility.FacilityPage.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Facility.FacilityPage.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Facility.FacilityPage.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Facility.FacilityPage.BorderBottom.BottomSpace};
  }
  }
`;
const FacilityList = styled.div`
`;
const FacilityListItem = styled.div`
display: grid;
grid-template-columns: 400px 1fr;
align-items: center;
margin-bottom: 40px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  }
`;
const FacilityListItemImage = styled.div`
width: 400px;
height: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemImage.Height};
img{
  width: 100%;
  border-top-left-radius: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemImage.BorderTopLeftRadius};
  border-bottom-left-radius: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemImage.BorderBottomLeftRadius};
  height: 100%;
  object-fit: cover;
}
@media screen and (max-width: 768px) {
  width: 100%;  
  height: 200px;
  img{
    width: 100%;
    border-top-left-radius: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemImage.BorderTopLeftRadius};
    border-top-right-radius: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemImage.BorderBottomLeftRadius};
    border-bottom-left-radius: 0;    
  }
  }
`;
const FacilityListItemContent = styled.div`
height: 100%;
padding: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemContent.Padding};
background: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemContent.Background};
border-top-right-radius: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemContent.BorderTopRightRadius};
border-bottom-right-radius: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemContent.BorderBottomRightRadius};
@media screen and (max-width: 768px) {
  border-top-right-radius: 0;
  border-bottom-left-radius: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemContent.BorderTopRightRadius};
  border-bottom-right-radius: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemContent.BorderBottomRightRadius};
}
h4{

font-weight: ${({ theme }) => theme.Facility.FacilityPage.h4.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilityPage.h4.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilityPage.h4.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilityPage.h4.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilityPage.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilityPage.h4.LetterSpacing};
text-align: ${({ theme }) => theme.Facility.FacilityPage.h4.Alignment};
color: ${({ theme }) => theme.Facility.FacilityPage.h4.Color};
position: relative;
display: inline-block;
word-break: break-all;
display: -webkit-box;
-webkit-line-clamp:1;
-webkit-box-orient: vertical;
overflow: hidden;

}
ul{
  margin-top: 26px;
  padding-left: 20px;
  // display: -webkit-box;
  // -webkit-line-clamp: 8;
  // -webkit-box-orient: vertical;
  height:200px;
  overflow: auto;
  
  &::-webkit-scrollbar {
    width: 5px;
  }
&::-webkit-scrollbar-thumb {
  border-radius: 10px;
}
}
li{
  // list-style-type: decimal;
  
  font-weight: ${({ theme }) => theme.Facility.FacilityPage.li.FontWeight};
  font-size: ${({ theme }) => theme.Facility.FacilityPage.li.FontSize};
  line-height: ${({ theme }) => theme.Facility.FacilityPage.li.LineHeight};
  text-align: ${({ theme }) => theme.Facility.FacilityPage.li.Alignment};
  color: ${({ theme }) => theme.Facility.FacilityPage.li.Color};
}
`;


const Divider = styled.div`
margin: 5px 0;
width: 100%;
height: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemContent.BorderBottom.Height};
background: ${({ theme }) => theme.Facility.FacilityPage.FacilityListItemContent.BorderBottom.Background};
`;

const Facilities = () => {
  const { facilitiesData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const pushDropDownCheck = useSelector((state) => state.websiteTemplate.pushDropDown.data)
  var element = document.getElementById(pushDropDownCheck);
console.log(element,"line 159",pushDropDownCheck)
useEffect(()=>{
  if(pushDropDownCheck&&element){
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
 
},[pushDropDownCheck,element])
  return (
    <Container>
      <FacilitySection>
        <Facility>
          <FacilityHead>
            <h2>{(subheadersData && subheadersData['servicehead']) || "School’s Facilities"}</h2>
            <h3>{(subheadersData && subheadersData['servicesubhead']) || ""}</h3>

          </FacilityHead>
          <FacilityList>
            {
              facilitiesData.length ?
                facilitiesData.map((item, key) => {
                  return (
                    <>
                      <FacilityListItem key={key}>
                        <FacilityListItemImage>
                    <ImageViewer object={item.thumbnail} defaultImage={ComputerFacilities1}/>

                          {/* <img id={item._id} src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : ComputerFacilities1} alt="" /> */}
                        </FacilityListItemImage>
                        <FacilityListItemContent>
                          <h4>{item.title ? item.title : ""}</h4>
                          <Divider />
                          {item.details ?
                            <ul>
                              <li dangerouslySetInnerHTML={{
                                __html:
                                  item.details,
                              }}></li>
                            </ul> :
                            ""}
                        </FacilityListItemContent>
                      </FacilityListItem>
                    </>)
                }) : <>
                  <FacilityListItem>
                    <FacilityListItemImage>
                      <img src={ComputerFacilities} alt="" />
                    </FacilityListItemImage>
                    <FacilityListItemContent>
                      <h4>Computer Laboratory</h4>
                      <ul>
                        <li>Computer Education is compulsory for classes from Std. I to X.</li>
                        <li>
                          A fully-fledged computer laboratory has been established with a sufficient number of computer sets and able teachers run the computer classes efficiently.
                        </li>
                        <li>
                          Computer education keeping pace with the latest trends in information technology is provided compulsorily to all the student's well-equipped computer centers with latest machine and software are the most resource houses.
                        </li>
                      </ul>
                    </FacilityListItemContent>
                  </FacilityListItem>
                </>
            }
          </FacilityList>
        </Facility>
      </FacilitySection>
    </Container>
  )
}

export default Facilities