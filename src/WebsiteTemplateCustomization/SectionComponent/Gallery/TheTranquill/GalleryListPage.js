/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import Lightbox from "react-image-lightbox";
// import 'react-image-lightbox/style.css';
import { Container } from '../../../CommonComponent/Container.styled'

import DefaultImage1 from "./default1.svg";
import DefaultImage2 from "./default2.svg";
import DefaultImage3 from "./default3.svg";
import { useDispatch, useSelector } from 'react-redux';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import { getGalleryAlbumData } from '../../../../store/actions/serviceWebsiteTemplate';


const GalleryListSection = styled.div`
padding: 40px 0;
`;
const GalleryListHead = styled.div`
margin-bottom: 48px;
h2{
  font-weight: ${({ theme }) => theme.GalleryListSection.h2.FontWeight};
  font-size: ${({ theme }) => theme.GalleryListSection.h2.FontSize};
  line-height: ${({ theme }) => theme.GalleryListSection.h2.LineHeight};
  font-style: ${({ theme }) => theme.GalleryListSection.h2.FontStyle};
  font-family: ${({ theme }) => theme.GalleryListSection.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.GalleryListSection.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.GalleryListSection.h2.Alignment};
  text-transform: ${({ theme }) => theme.GalleryListSection.h2.TextTransform};
  color: ${({ theme }) => theme.GalleryListSection.h2.Color};
  }
  h3{
  font-weight: ${({ theme }) => theme.GalleryListSection.h3.FontWeight};
  font-size: ${({ theme }) => theme.GalleryListSection.h3.FontSize};
  line-height: ${({ theme }) => theme.GalleryListSection.h3.LineHeight};
  font-style: ${({ theme }) => theme.GalleryListSection.h3.FontStyle};
  font-family: ${({ theme }) => theme.GalleryListSection.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.GalleryListSection.h3.LetterSpacing};
  text-align: ${({ theme }) => theme.GalleryListSection.h3.Alignment};
  text-transform: ${({ theme }) => theme.GalleryListSection.h3.TextTransform};
  color: ${({ theme }) => theme.GalleryListSection.h3.Color};
  }
`;

const GalleryListFilter = styled.div`
display: flex;
align-items: center;
gap: 10px;
margin-bottom: ${({ theme }) => theme.GalleryListSection.GalleryListFilter.MarginBottom};
`;

const GalleryListFilterButton = styled.button`

font-weight: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.FontWeight};
font-size: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.FontSize};
line-height: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.LineHeight};
background: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.Background};
border: 1px solid ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.BorderColor};
border-radius: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.BorderRadius};
color: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.Color};
padding: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.PaddingY} ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.Hover.Background};
color: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
&.active{
background: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.Active.Background};
color: ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.Active.Color};
border: 1px solid ${({ theme }) => theme.GalleryListSection.GalleryListFilterButton.Active.BorderColor};
}
`;

const GalleryListAlbumItem = styled.div`
width: 100%;
height: 352px;
position: relative;
cursor: pointer;
img{
width: 100%;
height: 100%;
display: block;
border-radius: 5px;
object-fit: cover;
}
`;
const GalleryListAlbumItemOverlay = styled.div`
opacity: 0;
visibility: hidden;
position: absolute;
width: 100%;
height: 100%;
top: 0;
bottom: 0;
border-radius: 5px;
background: ${({ theme }) => theme.GalleryListSection.GalleryListAlbumItemOverlay.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
${GalleryListAlbumItem}:hover & {
  opacity: 1;
  visibility: visible;
  transition: all 0.35s ease-in-out 0s;
}
`;
const GalleryListAlbum = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
`;

const GalleryListPage = ({ galleryId }) => {
  const [filter, setFilter] = useState('all');
  const [galleryPopup, setGalleryPopup] = useState({});
  const dispatch = useDispatch()
  const [previewModel, setPreviewModel] = useState(false);
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { data, success } = useSelector((state) => state.serviceTemplate.galleryAlbum);
  const handlePopup = (item) => {
    setGalleryPopup(item)
    setPreviewModel(true)
  }
  useEffect(() => {
    dispatch(getGalleryAlbumData(galleryId))
  }, [dispatch, galleryId])
  return (
    <Container>
      <GalleryListSection>
        <GalleryListHead>
          {/* <h2>Empanelment</h2>
          <h3>Have a sneak peak</h3> */}
          <h2>{(subheadersData && subheadersData['galleryhead']) || "Gallery"}</h2>
          <h3>{(subheadersData && subheadersData['gallerysubhead']) || "Have a sneak peak"}</h3>
        </GalleryListHead>
        <GalleryListFilter>
          <GalleryListFilterButton className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</GalleryListFilterButton>
          <GalleryListFilterButton className={filter === "images" ? "active" : ""} onClick={() => setFilter("images")}>Images</GalleryListFilterButton>
          <GalleryListFilterButton className={filter === "videos" ? "active" : ""} onClick={() => setFilter("videos")}>Videos</GalleryListFilterButton>
        </GalleryListFilter>

        {
          success ? (
            data.length > 0 ?
              <React.Fragment>
                {
                  filter === "all" ?
                    <GalleryListAlbum>
                      {
                        data.length ?
                          data.map((item, key) => {
                            return (
                              <React.Fragment key={key}>
                                <GalleryListAlbumItem onClick={() => handlePopup(item)}>
                                  {item.kind === "images" ?
                                    <img src={item.images ? item.images : DefaultImage} alt="Album" />
                                    :
                                    <video src={item.videos} alt="Video Album" />}
                                  <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
                                </GalleryListAlbumItem>
                              </React.Fragment>
                            )
                          }) : <GalleryListAlbum>
                            <GalleryListAlbumItem>
                              <img src={DefaultImage1} alt="" />
                              <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
                            </GalleryListAlbumItem>
                            <GalleryListAlbumItem>
                              <img src={DefaultImage2} alt="" />
                              <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
                            </GalleryListAlbumItem>
                            <GalleryListAlbumItem>
                              <img src={DefaultImage3} alt="" />
                              <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
                            </GalleryListAlbumItem>
                          </GalleryListAlbum>
                      }

                    </GalleryListAlbum>
                    :
                    <GalleryListAlbum>
                      {
                        data.filter((item) => item.kind === filter).length ?
                          data.filter((item) => item.kind === filter).map((item) => {
                            return (
                              <React.Fragment>
                                <GalleryListAlbumItem onClick={() => handlePopup(item)}>
                                  {item.kind === "images" ?
                                    <img src={item.images ? item.images : DefaultImage} alt="Album" />
                                    :
                                    <video src={item.videos} alt="Video Album" />}
                                  <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
                                </GalleryListAlbumItem>
                              </React.Fragment>
                            )
                          }) : "No Found"
                      }

                    </GalleryListAlbum>
                }
              </React.Fragment>
              :
              <React.Fragment>
                <GalleryListAlbum>
                  <GalleryListAlbumItem>
                    <img src={DefaultImage1} alt="" />
                    <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
                  </GalleryListAlbumItem>
                  <GalleryListAlbumItem>
                    <img src={DefaultImage2} alt="" />
                    <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
                  </GalleryListAlbumItem>
                  <GalleryListAlbumItem>
                    <img src={DefaultImage3} alt="" />
                    <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
                  </GalleryListAlbumItem>
                </GalleryListAlbum>
              </React.Fragment>
          ) :
            <ComponentLoader />
        }

        {/* <GalleryListAlbum>
          <>
            <GalleryListAlbumItem>
              <img src={DefaultImage1} alt="" />
              <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
            </GalleryListAlbumItem>
            <GalleryListAlbumItem>
              <img src={DefaultImage2} alt="" />
              <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
            </GalleryListAlbumItem>
            <GalleryListAlbumItem>
              <img src={DefaultImage3} alt="" />
              <GalleryListAlbumItemOverlay></GalleryListAlbumItemOverlay>
            </GalleryListAlbumItem>
          </>
        </GalleryListAlbum> */}

      </GalleryListSection>

      {previewModel && (
        <>
          {

            galleryPopup.videos ? (
              <>
                <div className="ThumnailPopWrapper">
                  <div className="ThumnailPopBody">
                    <video
                      src={galleryPopup.videos}
                      alt={galleryPopup.videos}
                      controls
                      autoPlay
                      loop
                    />
                  </div>
                </div>
              </>
            ) : (
              // <Lightbox
              //   mainSrc={galleryPopup.images}
              //   onCloseRequest={() => setPreviewModel(false)}
              // />
              ""
            )
          }
        </>
      )}

    </Container >
  )
}

export default GalleryListPage