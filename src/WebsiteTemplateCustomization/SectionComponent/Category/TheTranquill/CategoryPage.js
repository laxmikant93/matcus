/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { getAllServiceOfSingleCategory, getSingleCategory } from '../../../../store/actions/serviceWebsiteTemplate';
import React from 'react';
import { Container } from '../../../CommonComponent/Container.styled'
import { setParamId } from '../../../../store/actions/serviceWebsiteTemplate';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import { getMainBusinessCategory } from '../../../../store/actions/bookAppointment';
import { useEffect } from 'react';



const CategoryPageSection = styled.div`
margin:  72px 0;
`;
const CategoryPageHead = styled.div`
h2{

  font-weight: ${({ theme }) => theme.CategoryPage.h2.FontWeight};
  font-size: ${({ theme }) => theme.CategoryPage.h2.FontSize};
  line-height: ${({ theme }) => theme.CategoryPage.h2.LineHeight};
  font-style: ${({ theme }) => theme.CategoryPage.h2.FontStyle};
  font-family: ${({ theme }) => theme.CategoryPage.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.CategoryPage.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.CategoryPage.h2.Alignment};
  color: ${({ theme }) => theme.CategoryPage.h2.Color};
  }
  h3{
    font-weight: ${({ theme }) => theme.CategoryPage.h3.FontWeight};
    font-size: ${({ theme }) => theme.CategoryPage.h3.FontSize};
    line-height: ${({ theme }) => theme.CategoryPage.h3.LineHeight};
    font-style: ${({ theme }) => theme.CategoryPage.h3.FontStyle};
    font-family: ${({ theme }) => theme.CategoryPage.h3.FontFamily};
    letter-spacing: ${({ theme }) => theme.CategoryPage.h3.LetterSpacing};
    color: ${({ theme }) => theme.CategoryPage.h3.Color};
    text-align: ${({ theme }) => theme.CategoryPage.h3.Alignment};
    position: relative;
    text-transform: uppercase;
    }
`;


const CategoryPageGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 32px;
  margin-top: 72px;
  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryNotAvilable = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:100px;
  p{
    color: #006f9c;
  }
`

const CategoryItem = styled.figure`
position: relative;
cursor: pointer;
`;
const CategoryImage = styled.div`
width: 100%;
height: 251px;
img{
  border-radius: 5px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
`;
const CategoryCaption = styled.figcaption`
position: absolute;
width: 100%;
bottom: 0;
height: 100%;
display: flex;
align-items: flex-end;
justify-content: flex-start;
border-radius: 5px;
background: ${({ theme }) => theme.CategoryPage.CategoryCaption.Background};
padding: 32px;
h6{
  font-weight: ${({ theme }) => theme.CategoryPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.CategoryPage.h6.FontSize};
  line-height: ${({ theme }) => theme.CategoryPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.CategoryPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.CategoryPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.CategoryPage.h6.LetterSpacing};
  color: #FFFFFF;
  text-align: ${({ theme }) => theme.CategoryPage.h6.Alignment};
}
`;


const CategoryPage = () => {
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data } = useSelector((state) =>{
    return{
      data: state.serviceTemplate.getTemplate.data.bookAppointCategory
    }
  })
  const { preview, insID,institute,owner,user,getMainCategoryName} = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview,
      insID: state.user.user_institute,
      institute: state.user.user_institute,
      owner: state.user._id,
      user: state.user,
      getMainCategoryName: state.bookAppointment.getMainBusinessCat,
    }
  })

  useEffect(() => {
    dispatch(getMainBusinessCategory(institute, owner, user.user_business_type))
  }, [dispatch, institute, owner, user.user_business_type]);

  // console.log( getMainCategoryName?.data?.main_business_category_name,"line131")
 
  const handleViewCategory = (item) => {
    // console.log("I", item._id)
    if (preview) {
      dispatch(selectRouteForPreview(`/category-services/${item._id}`, true))
      dispatch(setParamId(item._id))
      // dispatch(getAllServiceOfSingleCategory(item._id, insID))
    } else {
      // dispatch(getAllServiceOfSingleCategory(item._id, insID))
      history(`/category-services/${item._id}`)
    }
  }
  // console.log(subheadersData, "line124")
  return (
    <React.Fragment>
      <Container>
        <CategoryPageSection>
          <CategoryPageHead>
            {/* <h2>{(subheadersData && subheadersData['categoryhead']) || "Our Categories"}</h2>
            <h3>{(subheadersData && subheadersData['categorysubhead']) || "Always Caring"}</h3> */}
            <h2>{getMainCategoryName?.data?.main_business_category_name || "Categories"}</h2>
            {/* <h3>{(subheadersData && subheadersData['categorysubhead']) || "Always Caring"}</h3> */}
          </CategoryPageHead>

          {data.length ?
            <CategoryPageGrid>
              {
                data.filter((item)=> item.isHide === false).map((item, key) => {
                  return (
                    <CategoryItem key={key} onClick={() => handleViewCategory(item)}>
                      <CategoryImage>
                        <img src={item.uploadefile ? item.uploadefile : DefaultImage} alt="" />
                      </CategoryImage>
                      <CategoryCaption>
                        <h6>{item.main_category_name}</h6>
                      </CategoryCaption>
                    </CategoryItem>
                  );
                })
              }
            </CategoryPageGrid> :
            <CategoryNotAvilable>
              <p>Category Not Avilable</p>
            </CategoryNotAvilable>
          }
        </CategoryPageSection>
      </Container>
    </React.Fragment>
  )
}

export default CategoryPage