/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect, useState } from 'react';
// import Lightbox from 'react-image-lightbox';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import { getGalleryAlbumData } from '../../../../store/actions/WebsiteTemplate';
import { Container } from '../../../CommonComponent/Container.styled'

// import DefaultImage1 from "./default1.jpg";
// import DefaultImage2 from "./default2.jpg";
// import DefaultImage3 from "./default3.jpg";

import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import ImageViewer from '../../../../Common/ImageViewer';


const GalleryListSection = styled.div`
padding: 40px 0;
`;
const GalleryListHead = styled.div`
margin-bottom: 48px;
h2{

font-weight: ${({ theme }) => theme.Gallery.GalleryListSection.h2.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryListSection.h2.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryListSection.h2.LineHeight};
font-style: ${({ theme }) => theme.Gallery.GalleryListSection.h2.FontStyle};
font-family: ${({ theme }) => theme.Gallery.GalleryListSection.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Gallery.GalleryListSection.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Gallery.GalleryListSection.h2.Alignment};
color: ${({ theme }) => theme.Gallery.GalleryListSection.h2.Color};
}
`;

const GalleryListFilter = styled.div`
display: flex;
align-items: center;
gap: 10px;
margin-bottom: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilter.MarginBottom};
`;

const GalleryListFilterButton = styled.button`

font-weight: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.FontWeight};
font-size: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.FontSize};
line-height: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.LineHeight};
background: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.Background};
border: 1px solid ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.BorderColor};
border-radius: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.BorderRadius};
color: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.Color};
padding: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.PaddingY} ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.Hover.Background};
color: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
&.active{
  background: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.Active.Background};
color: ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.Active.Color};
border: 1px solid ${({ theme }) => theme.Gallery.GalleryListSection.GalleryListFilterButton.Active.BorderColor};
}
`;
const GalleryListImage = styled.div`
width: 100%
height: 352px;
position: relative;
img{
width: 100%;
height: auto;
display: block;
border-radius: 24px;
}
`;
const GalleryListAlbum = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
`;
const ThumnailPopBody = styled.div`
width: 100%
height: 352px;
position: relative;
video{
width: 100%;
height: 100%;
display: block;
border-radius: 24px;
@media screen and (max-width: 768px) {
height: auto;
  }
}
`;

const GalleryListPage = ({ galleryId }) => {
  const [filter, setFilter] = useState('all')
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.websiteTemplate.galleryAlbum)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { success } = useSelector((state) => state.websiteTemplate.galleryAlbum)
  useEffect(() => {
    dispatch(getGalleryAlbumData(galleryId))
  }, [dispatch, galleryId])
  const [galleryPopup, setGalleryPopup] = useState({})
  const [previewModel, setPreviewModel] = useState(false)
  const handlePopup = (item) => {
    setGalleryPopup(item)
    setPreviewModel(true)
  }
  return (
    <Container>
      <GalleryListSection>
        <GalleryListHead>
          {/* <h2>Our Gallery</h2> */}
          <h2>{(subheadersData && subheadersData['galleryhead']) || "OUR GALLERY"}</h2>
          <h3>{(subheadersData && subheadersData['gallerysubhead']) || ""}</h3>
        </GalleryListHead>
        <GalleryListFilter>
          <GalleryListFilterButton className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</GalleryListFilterButton>
          <GalleryListFilterButton className={filter === "images" ? "active" : ""} onClick={() => setFilter("images")}>Images</GalleryListFilterButton>
          <GalleryListFilterButton className={filter === "videos" ? "active" : ""} onClick={() => setFilter("videos")}>Videos</GalleryListFilterButton>
        </GalleryListFilter>
        {/* {
          success ? (data.length > 0 ?
            <React.Fragment>
              {
                filter === "all" ? */}
        {/* <GalleryListAlbum>
          {
            data.length ?
              data.map((item, key) => {
                return (
                  <React.Fragment key={key}>
                    <GalleryListImage onClick={() => handlePopup(item)}>
                      {item.kind === "images" ?
                        <img src={item.images} alt="Album" />
                        :
                        <video src={item.videos} alt="Video Album" />}

                    </GalleryListImage>
                  </React.Fragment>
                )
              }) :
              // <>
              //   <GalleryListImage>
              //     <img src={Default1} alt="" />
              //   </GalleryListImage>
              //   <GalleryListImage>
              //     <img src={Default2} alt="" />
              //   </GalleryListImage>
              //   <GalleryListImage>
              //     <img src={Default3} alt="" />
              //   </GalleryListImage>
              // </>
              "No Records Found."
          }
        </GalleryListAlbum> */}
        {
          success ? (data.length > 0 ?
            <React.Fragment>
              {
                filter === "all" ?
                  <GalleryListAlbum>
                    {
                      data.length ?
                        data.map((item, key) => {
                          return (
                            <React.Fragment key={key}>
                              <GalleryListImage onClick={() => handlePopup(item)}>
                                {item.kind === "images" ?
                                <ImageViewer object={item.images} />
                                  // <img src={item.images} alt="Album" />
                                  :
                                  <video src={item.videos&&item?.videos?.src} alt="Video Album" />}
                              </GalleryListImage>
                            </React.Fragment>
                          )
                        }) : "No Records Found."
                    }

                  </GalleryListAlbum>
                  :
                  <GalleryListAlbum>
                    {
                      data.filter((item) => item.kind === filter).length ?
                        data.filter((item) => item.kind === filter).map((item) => {
                          return (
                            <React.Fragment>
                              <GalleryListImage onClick={() => handlePopup(item)}>
                                {item.kind === "images" ?
                                <ImageViewer object={item.images} />

                                  // <img src={item.images} alt="Album" />
                                  :
                                  <video src={item.videos&&item?.videos?.src} alt="Video Album" />}
                                  {/* <video src={item.videos} alt="Video Album" />} */}
                              </GalleryListImage>
                            </React.Fragment>
                          )
                        }) : "No Records Found."
                    }

                  </GalleryListAlbum>
              }
            </React.Fragment>
            :
            "No Records Found."
          ) :
            <ComponentLoader />
        }
      </GalleryListSection>
      {previewModel && (
        <>
          {

            galleryPopup.videos ? (
              <>
                <div className="ThumnailPopWrapper">
                  <ThumnailPopBody>
                    <video
                      src={galleryPopup.videos.src}
                      alt={galleryPopup.videos.alt}
                      controls
                      autoPlay
                      loop
                    />
                  </ThumnailPopBody>
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