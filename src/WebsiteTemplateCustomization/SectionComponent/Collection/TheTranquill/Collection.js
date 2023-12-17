/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
// import sneek from "../Sneakpeak.png";
// import sneek1 from "../../../assets/Vespertine/sneek1.jpg";
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";


import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
// import CollectionListPage from './CollectionListPage';
import { useNavigate } from 'react-router-dom';
import { getAllCollection, getMainBusiCollectionName } from '../../../../store/actions/bookAppointment';
// import ComponentLoader from '../../../../Common/Loader/ComponentLoader';


const CollectionHomePageSection = styled.div`
margin: 72px 0;
`;
const CollectionHomePage = styled.div`
`;
const CollectionHomePageHead = styled.div`
margin-bottom: 48px;
h2{
font-weight: ${({ theme }) => theme.GalleryPage.h2.FontWeight};
font-size: ${({ theme }) => theme.GalleryPage.h2.FontSize};
line-height: ${({ theme }) => theme.GalleryPage.h2.LineHeight};
font-style: ${({ theme }) => theme.GalleryPage.h2.FontStyle};
font-family: ${({ theme }) => theme.GalleryPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.GalleryPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.GalleryPage.h2.Alignment};
text-transform: ${({ theme }) => theme.GalleryPage.h2.TextTransform};
color: ${({ theme }) => theme.GalleryPage.h2.Color};
}
h3{
font-weight: ${({ theme }) => theme.GalleryPage.h3.FontWeight};
font-size: ${({ theme }) => theme.GalleryPage.h3.FontSize};
line-height: ${({ theme }) => theme.GalleryPage.h3.LineHeight};
font-style: ${({ theme }) => theme.GalleryPage.h3.FontStyle};
font-family: ${({ theme }) => theme.GalleryPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.GalleryPage.h3.LetterSpacing};
text-align: ${({ theme }) => theme.GalleryPage.h3.Alignment};
text-transform: ${({ theme }) => theme.GalleryPage.h3.TextTransform};
color: ${({ theme }) => theme.GalleryPage.h3.Color};
}
`;
const CollectionItem = styled.figure`
position: relative;
`;
const CollectionImage = styled.div`
width: 100%;
height: 187px;
img{
  border-radius: 5px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
`;
const CollectionCaption = styled.figcaption`
position: absolute;
width: 100%;
bottom: 0;
height: 100%;
background: ${({ theme }) => theme.GalleryPage.GalleryCaption.Background};
display: flex;
align-items: flex-end;
justify-content: flex-start;
border-radius: 5px;
padding: 16px 24px;
cursor: pointer;
h6{
font-weight: ${({ theme }) => theme.GalleryPage.h6.FontWeight};
font-size: ${({ theme }) => theme.GalleryPage.h6.FontSize};
line-height: ${({ theme }) => theme.GalleryPage.h6.LineHeight};
font-style: ${({ theme }) => theme.GalleryPage.h6.FontStyle};
font-family: ${({ theme }) => theme.GalleryPage.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.GalleryPage.h6.LetterSpacing};
text-align: ${({ theme }) => theme.GalleryPage.h6.Alignment};
color: ${({ theme }) => theme.GalleryPage.h6.Color};
}
`;
const CollectionPageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 24px;
`;

const CollectionPage = () => {
  const history = useNavigate();
  // const { data, success } = useSelector((state) => state.serviceTemplate.gallery)

  const [mainCollName, setMainCollName] = useState("")

  const dispatch = useDispatch()
  const { user,data, owner, institute,businesstype,getMainBusiCollection, getAllCollectiondata, getAllCollectionLoading ,businessInfoData} = useSelector((state) => {
    return {
      user: state.user,
      owner: state.user._id,
      data: state.websiteTemplate.getTemplate,
      institute: state.user.user_institute,
      businesstype: state.user.user_business_type,
      getAllCollectiondata: state.bookAppointment.getAllCollection.data,
      getAllCollectionLoading: state.bookAppointment.getAllCollection.loading,
      getAllCollectionSuccss: state.bookAppointment.getAllCollection.success,
      getMainBusiCollection: state.bookAppointment.getMainBusiCollection.data,
      businessInfoData: state.websiteTemplate.getTemplate.data,
    }
  });

  // useEffect(() => {
  //   dispatch(getMainBusiCollectionName(user.user_business_type, institute, owner))
  // }, [ institute, owner, user.user_business_type]);


  useEffect(() => {
    setMainCollName(getMainBusiCollection?.data?.main_business_collection_name)

    // setShowOnFooter(getMainBusiCollection?.data?.metaKeywords)

  }, [getMainBusiCollection])
  // console.log(getAllCollectiondata)

  useEffect(() => {
    dispatch(getAllCollection(data.type, businessInfoData._id, businessInfoData.owner, ""))
  }, [])

  const handleCollectionAlbum = (id) => {
    history(`/collection/${id}`);
    // console.log(CollectionId,"line99")
  }
  // console.log(getAllCollectionLoading)

  return (

    <React.Fragment>
      <Container>
      {   getAllCollectionLoading ? "" :

        <CollectionHomePageSection>
          <CollectionHomePage>
            <CollectionHomePageHead>
              <h2>{mainCollName?mainCollName:"Departmensast"}</h2>
            </CollectionHomePageHead>
            <CollectionPageGrid>

             {getAllCollectiondata && getAllCollectiondata.length ?
               
                    getAllCollectiondata.map((item, key) => {
                      return (
                        <React.Fragment>
                          <CollectionItem key={key} onClick={() => handleCollectionAlbum(item.urlSlug)} >
                            <CollectionImage >
                              <img src={item.image ? item.image : DefaultImage} alt="Album" />
                            </CollectionImage>
                            <CollectionCaption>
                              <h6>{item.name ? item.name : "My Collection"}</h6>
                            </CollectionCaption>
                          </CollectionItem>
                        </React.Fragment>
                      )
                    }) :
                  <>
                    <CollectionItem onClick={() => handleCollectionAlbum()}>
                      <CollectionImage>
                        <img src={Default1} alt="" />
                      </CollectionImage>
                      <CollectionCaption>
                        <h6>Yoga se he hoga</h6>
                      </CollectionCaption>
                    </CollectionItem>
                    <CollectionItem>
                      <CollectionImage>
                        <img src={Default2} alt="" />
                      </CollectionImage>
                      <CollectionCaption>
                        <h6>Fun Activities 2022</h6>
                      </CollectionCaption>
                    </CollectionItem>
                    <CollectionItem>
                      <CollectionImage>
                        <img src={Default3} alt="" />
                      </CollectionImage>
                      <CollectionCaption>
                        <h6>Fun Fest 2022</h6>
                      </CollectionCaption>
                    </CollectionItem>
                    <CollectionItem>
                      <CollectionImage>
                        <img src={Default1} alt="" />
                      </CollectionImage>
                      <CollectionCaption>
                        <h6>Yoga se he hoga</h6>
                      </CollectionCaption>
                    </CollectionItem>
                    <CollectionItem>
                      <CollectionImage>
                        <img src={Default2} alt="" />
                      </CollectionImage>
                      <CollectionCaption>
                        <h6>Fun Activities 2022</h6>
                      </CollectionCaption>
                    </CollectionItem>
                    <CollectionItem>
                      <CollectionImage>
                        <img src={Default3} alt="" />
                      </CollectionImage>
                      <CollectionCaption>
                        <h6>Fun Fest 2022</h6>
                      </CollectionCaption>
                    </CollectionItem>
                  </>
              }
            </CollectionPageGrid>
          </CollectionHomePage>
        </CollectionHomePageSection>
}
      </Container>
    </React.Fragment>
  )
}

export default CollectionPage