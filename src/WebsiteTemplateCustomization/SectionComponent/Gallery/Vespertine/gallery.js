/* eslint-disable jsx-a11y/no-distracting-elements */
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'

import DefaultImage1 from "./default1.jpg";
import DefaultImage2 from "./default2.jpg";
import DefaultImage3 from "./default3.jpg";
import sneek1 from "../../../assets/Vespertine/sneek1.jpg";
import DefaultImage from "../Sneakpeak.png";
import React from 'react';
import { useState } from 'react';
import GalleryListPage from './GalleryListPage';


const GallerySection = styled.div`
padding: 40px 0;
`;
const Gallery = styled.div`
`;
const GalleryHead = styled.div`
margin-bottom: 48px;

display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Gallery.GalleryPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Gallery.GalleryPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Gallery.GalleryPage.h2.Alignment};
color: ${({ theme }) => theme.Gallery.GalleryPage.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.Gallery.GalleryPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.Gallery.GalleryPage.h3.FontSize};
  line-height: ${({ theme }) => theme.Gallery.GalleryPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.Gallery.GalleryPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.Gallery.GalleryPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Gallery.GalleryPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.Gallery.GalleryPage.h3.Color};
  text-align: ${({ theme }) => theme.Gallery.GalleryPage.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Gallery.GalleryPage.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Gallery.GalleryPage.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Gallery.GalleryPage.BorderBottom.BottomSpace};
  }
  }
`;
const GalleryImage = styled.div`
width: 100%
height: 352px;
position: relative;
img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top;
}
`;
const GalleryImageOverlay = styled.div`
position: absolute;
bottom: 0;
padding: 24px;
width: 100%;
height: 100%;
background:linear-gradient(180deg, rgba(32, 32, 32, 0) 60.3%, #202020 105.23%);
cursor: pointer;
display: flex;
align-items: end;
h4{
  
  font-weight: ${({ theme }) => theme.Gallery.GalleryPage.h4.FontWeight};
  font-size: ${({ theme }) => theme.Gallery.GalleryPage.h4.FontSize};
  line-height: ${({ theme }) => theme.Gallery.GalleryPage.h4.LineHeight};
  font-style: ${({ theme }) => theme.Gallery.GalleryPage.h4.FontStyle};
  font-family: ${({ theme }) => theme.Gallery.GalleryPage.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Gallery.GalleryPage.h4.LetterSpacing};
  color: #FFFFFF;
}
`;
const GalleryAlbum = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    }

`;

const GalleryAlbumPage = () => {
  const { data, success } = useSelector((state) => state.websiteTemplate.gallery)
  const [galleryList, setGalleryList] = useState(false);
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  const [galleryId, setGalleryId] = useState([])
  const handleGalleryAlbum = (item) => {
    setGalleryList(true);
    setGalleryId(item)
  }

  return (
    <React.Fragment>
      {
        galleryList ? <GalleryListPage galleryId={galleryId} />
          : <Container>
            <GallerySection>
              <Gallery>
                <GalleryHead>
                  <h2>{(subheadersData && subheadersData['galleryhead']) || "Gallery"}</h2>
                  <h3>{(subheadersData && subheadersData['gallerysubhead']) || ""}</h3>

                </GalleryHead>
                <GalleryAlbum>
                  {
                    success && data.length ?
                      data.map((item, key) => {
                        return (
                          <React.Fragment>
                            <GalleryImage key={key} onClick={() => handleGalleryAlbum(item._id)}>
                              <img src={item?.thumbnail && item.thumbnail?.src ? item?.thumbnail?.src.includes(".mp4") ? DefaultImage : item.thumbnail?.src : DefaultImage} alt="Album" />
                              <GalleryImageOverlay>
                                <h4>{item.title ? item.title : "My Gallery"}</h4>
                              </GalleryImageOverlay>
                            </GalleryImage>
                          </React.Fragment>
                        )
                      }) : <GalleryImage>
                        <img src={sneek1} alt="Album" />
                        <GalleryImageOverlay>
                          <h4>My Gallery</h4>
                        </GalleryImageOverlay>
                      </GalleryImage>
                  }
                </GalleryAlbum>
              </Gallery>

            </GallerySection>
          </Container>
      }

    </React.Fragment>
  )
}

export default GalleryAlbumPage