/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import sneek from "../Sneakpeak.png";
import sneek1 from "../../../assets/Vespertine/sneek1.jpg";


import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import GalleryListPage from '../Defaultine/GalleryListPage';
import ImageViewer from '../../../../Common/ImageViewer';


const GalleryHomePageSection = styled.div`
padding: 20px 0;
`;
const GalleryHomePage = styled.div`
`;
const GalleryHomePageHead = styled.div`
margin-bottom: 48px;
h2{
font-weight: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Gallery.GalleryPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Gallery.GalleryPage.h2.Alignment};
color: ${({ theme }) => theme.Gallery.GalleryPage.h2.Color};
text-transform: uppercase;
}
h3{
font-weight: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Gallery.GalleryPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Gallery.GalleryPage.h2.Alignment};
color: ${({ theme }) => theme.Gallery.GalleryPage.h2.Color};
text-decoration: underline;
}
`;
const GalleryItem = styled.figure`
position: relative;
`;
const GalleryImage = styled.div`
width: 100%;
height: 344px;
img{
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
`;
const GalleryCaption = styled.figcaption`
position: absolute;
width: 100%;
bottom: 0;
height: 65px;
background: ${({ theme }) => theme.Gallery.GalleryPage.GalleryCaption.Background};
display: flex;
align-items: center;
justify-content: center;
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
h6{

font-weight: ${({ theme }) => theme.Gallery.GalleryPage.h6.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryPage.h6.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryPage.h6.LineHeight};
font-style: ${({ theme }) => theme.Gallery.GalleryPage.h6.FontStyle};
font-family: ${({ theme }) => theme.Gallery.GalleryPage.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.Gallery.GalleryPage.h6.LetterSpacing};
text-align: ${({ theme }) => theme.Gallery.GalleryPage.h6.Alignment};
color: ${({ theme }) => theme.Gallery.GalleryPage.h6.Color};
}
`;
const GalleryPageGrid = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 32px;
`;

const GalleryAlbumPage = () => {
  const { data, success } = useSelector((state) => state.websiteTemplate.gallery)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [galleryList, setGalleryList] = useState(false);
  const [galleryId, setGalleryId] = useState([])
  const handleGalleryAlbum = (item) => {
    setGalleryList(true);
    setGalleryId(item)
  }

  return (

    <React.Fragment>
      {
        galleryList ? <GalleryListPage galleryId={galleryId} />
          :

          <Container>

            <GalleryHomePageSection>
              <GalleryHomePage>
                <GalleryHomePageHead>
                  {/* <h2>GALLERY</h2> */}
                  <h2>{(subheadersData && subheadersData['galleryhead']) || "GALLERY"}</h2>
                  <h3>{(subheadersData && subheadersData['gallerysubhead']) || ""}</h3>
                </GalleryHomePageHead>
                <GalleryPageGrid>
                  {
                    success && data.length ?
                      data.map((item, key) => {
                        return (
                          <React.Fragment>

                            <GalleryItem >
                              <GalleryImage key={key} onClick={() => handleGalleryAlbum(item._id)}>
                                {/* <img src={item.thumbnail ? item.thumbnail : sneek} alt="Album" /> */}
                                {/* <ImageViewer object={item.thumbnail} defaultImage={sneek} /> */}

                                <img src={item?.thumbnail&&item?.thumbnail.src ? item?.thumbnail.src.includes(".mp4") ? sneek : item?.thumbnail.src : sneek} alt="Album" />

                              </GalleryImage>
                              <GalleryCaption>
                                <h6>{item.title ? item.title : "My Gallery"}</h6>
                              </GalleryCaption>
                            </GalleryItem>
                          </React.Fragment>
                        )
                      }) :
                      // <>
                      //   <GalleryItem>
                      //     <GalleryImage>
                      //       <img src={Default1} alt="" />
                      //     </GalleryImage>
                      //     <GalleryCaption>
                      //       <h6>Yoga se he hoga</h6>
                      //     </GalleryCaption>
                      //   </GalleryItem>
                      //   <GalleryItem>
                      //     <GalleryImage>
                      //       <img src={Default2} alt="" />
                      //     </GalleryImage>
                      //     <GalleryCaption>
                      //       <h6>Fun Activities 2022</h6>
                      //     </GalleryCaption>
                      //   </GalleryItem>
                      //   <GalleryItem>
                      //     <GalleryImage>
                      //       <img src={Default3} alt="" />
                      //     </GalleryImage>
                      //     <GalleryCaption>
                      //       <h6>Fun Fest 2022</h6>
                      //     </GalleryCaption>
                      //   </GalleryItem>
                      //   <GalleryItem>
                      //     <GalleryImage>
                      //       <img src={Default1} alt="" />
                      //     </GalleryImage>
                      //     <GalleryCaption>
                      //       <h6>Yoga se he hoga</h6>
                      //     </GalleryCaption>
                      //   </GalleryItem>
                      //   <GalleryItem>
                      //     <GalleryImage>
                      //       <img src={Default2} alt="" />
                      //     </GalleryImage>
                      //     <GalleryCaption>
                      //       <h6>Fun Activities 2022</h6>
                      //     </GalleryCaption>
                      //   </GalleryItem>
                      //   <GalleryItem>
                      //     <GalleryImage>
                      //       <img src={Default3} alt="" />
                      //     </GalleryImage>
                      //     <GalleryCaption>
                      //       <h6>Fun Fest 2022</h6>
                      //     </GalleryCaption>
                      //   </GalleryItem>
                      // </>
                      "No Records Found."
                  }
                </GalleryPageGrid>
              </GalleryHomePage>
            </GalleryHomePageSection>
          </Container>
      }

    </React.Fragment>
  )
}

export default GalleryAlbumPage