import React from 'react';
import Image1 from '../../../assets/images/image1.png'
import AddImageIcon from '../AddImageIcon/AddImageIcon';
import ImageUploader from '../../../../../../Common/ImageUploader/index'
import './uploadedImages.scss';
import { useState } from 'react';
import { useRef } from 'react';

const UploadedImages = ({ imageCount, data, productImages, handleClose, productTitle, handleUpload, handleImageSelect, uploadedImageLength }) => {
  // const data = [Image1, Image1, Image1, Image1, Image1];
  const ref = useRef()
  const uploadPopup = () => {
    if (!data.length) {
      ref.current.open()
    }
  }
  return (
    <React.Fragment>
      <div className={`uploadedImages-container ${uploadedImageLength > 1 ? 'positionRight' : 'positionLeft '}`}>
        <div className='uploadedImages-div'>
          <p className='text-3xs w-400 upload-text'>Select the images you uploaded or add more images</p>
          <div className='image-container'>
            <div className='list-images-wrappwer'>
              {
                productImages.length ? productImages.map((images) => {
                  return (
                    <div className='image-div' onClick={() => handleImageSelect(images)}>
                      <img src={images} alt="" />
                      {data.length ? data.includes(images) && <div className='image-check'>
                        <i className='ed-icon  white icon-check'></i>
                      </div> : ""}
                    </div>
                  )
                }) : ""
              }
              {/* if the image is 5 then the click wil be disable */}
              <AddImageIcon handleShow={uploadPopup} count={data.length} />

            </div>
            {
              data.length ? <button className='button btn-3xs button-primary btn-oval mt-10' onClick={() => handleClose()}>Add</button>
                : ""
            }
          </div>
        </div>
        <ImageUploader onclose={() => ref.current.close()} multiSelect={true} discartRef={ref} onUploaded={handleUpload} search={productTitle} uploadLimit={5 - uploadedImageLength} />

      </div>
    </React.Fragment>
  )
}

export default UploadedImages