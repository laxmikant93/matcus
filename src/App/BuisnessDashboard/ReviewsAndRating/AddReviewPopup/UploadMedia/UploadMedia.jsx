import React from 'react';
import UploadImage from './UploadMediaImg.png';
import './uploadMedia.scss';
import ImageCropper from '../../../../../Common/Cropper';
import { useRef } from 'react';
import { useState } from 'react';

const UploadMedia = ({ reviewMedia, setReviewMedia, setDisablebutton }) => {

  const ref = useRef();

  const uploadMediaPopup = () => {
    ref.current.open();
  }

  const uploadReviewMedia = (data) => {
    let array = reviewMedia;
    let imgData = data.location;
    array.push(imgData);
    setReviewMedia([...array]);
    setDisablebutton(false);
  }

  return (
    <>
      {/* aria-disabled will be "true" when it is disable */}
      <div className='uploadMedia-container' aria-disabled={reviewMedia.length === 5 ? true : false} onClick={uploadMediaPopup}>
        <img src={UploadImage} alt="" />
        <p className='text-2xs w-500 base'>Upload Image</p>
        <p className='text-3xs w-400 base mt-5'>Max Limit : 5 images</p>
      </div>
      <ImageCropper
        minWidth={100}
        maxWidth={1000}
        ref={ref}
        onUploaded={uploadReviewMedia}
        IconClassName=""
        BtnPropClass="button-o-silver button-block CropUploadBtn"
        customCropper={true}
      />
    </>
  )
}

export default UploadMedia