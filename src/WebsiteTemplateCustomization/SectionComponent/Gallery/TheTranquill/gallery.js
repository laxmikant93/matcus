/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled'
import sneek from "../Sneakpeak.png";
import sneek1 from "../../../assets/Vespertine/sneek1.jpg";
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";


import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import GalleryListPage from './GalleryListPage';


const GalleryHomePageSection = styled.div`
margin: 72px 0;
`;
const GalleryHomePage = styled.div`
`;
const GalleryHomePageHead = styled.div`
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
const GalleryItem = styled.figure`
position: relative;
`;
const GalleryImage = styled.div`
width: 100%;
height: 344px;
img{
  border-radius: 5px;
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
const GalleryPageGrid = styled.div`
display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`;

const GalleryAlbumPage = () => {
  const { data, success } = useSelector((state) => state.serviceTemplate.gallery)
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const [galleryList, setGalleryList] = useState(false);
  const [galleryId, setGalleryId] = useState([])
  const handleGalleryAlbum = (item) => {

    setGalleryId(item)
    setGalleryList(true);
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
                  <h2>{(subheadersData && subheadersData['galleryhead']) || "Gallery"}</h2>
                  <h3>{(subheadersData && subheadersData['gallerysubhead']) || "Have a sneak peak"}</h3>
                </GalleryHomePageHead>
                <GalleryPageGrid>
                  {
                    success && data.length ?
                      data.map((item, key) => {
                        return (
                          <React.Fragment>

                            <GalleryItem key={key} onClick={() => handleGalleryAlbum(item._id)} >
                              <GalleryImage >
                                <img src={item.thumbnail ? item.thumbnail : DefaultImage} alt="Album" />
                              </GalleryImage>
                              <GalleryCaption>
                                <h6>{item.title ? item.title : "My Gallery"}</h6>
                              </GalleryCaption>
                            </GalleryItem>
                          </React.Fragment>
                        )
                      }) :
                      <>
                        <GalleryItem>
                          <GalleryImage>
                            <img src={Default1} alt="" />
                          </GalleryImage>
                          <GalleryCaption>
                            <h6>Yoga se he hoga</h6>
                          </GalleryCaption>
                        </GalleryItem>
                        <GalleryItem>
                          <GalleryImage>
                            <img src={Default2} alt="" />
                          </GalleryImage>
                          <GalleryCaption>
                            <h6>Fun Activities 2022</h6>
                          </GalleryCaption>
                        </GalleryItem>
                        <GalleryItem>
                          <GalleryImage>
                            <img src={Default3} alt="" />
                          </GalleryImage>
                          <GalleryCaption>
                            <h6>Fun Fest 2022</h6>
                          </GalleryCaption>
                        </GalleryItem>
                        <GalleryItem>
                          <GalleryImage>
                            <img src={Default1} alt="" />
                          </GalleryImage>
                          <GalleryCaption>
                            <h6>Yoga se he hoga</h6>
                          </GalleryCaption>
                        </GalleryItem>
                        <GalleryItem>
                          <GalleryImage>
                            <img src={Default2} alt="" />
                          </GalleryImage>
                          <GalleryCaption>
                            <h6>Fun Activities 2022</h6>
                          </GalleryCaption>
                        </GalleryItem>
                        <GalleryItem>
                          <GalleryImage>
                            <img src={Default3} alt="" />
                          </GalleryImage>
                          <GalleryCaption>
                            <h6>Fun Fest 2022</h6>
                          </GalleryCaption>
                        </GalleryItem>
                      </>
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