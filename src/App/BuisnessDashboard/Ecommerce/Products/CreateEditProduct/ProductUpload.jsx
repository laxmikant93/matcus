import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageUploader from "../../../../../Common/ImageUploader";
import CrossImage from '../../../../Dashboard/EcommerceDashboard/assets/icons/imageCross.png';
const ProductUpload = ({ productName, onLoadProductImages }) => {
  const { productDetails } = useSelector((state) => {
    return {
      productDetails: state.productList.getSingleProduct.data,
    }
  })
  const { _id } = useParams()
  const [productImages, setProductImages] = useState([])
  const discartRef = useRef()
  const addMoreRef = useRef()

  const openDiscart = () => {
    discartRef.current.open()
  }
  const UploadModle = () => {
    addMoreRef.current.open()
  }
  const oncloseDiscardPopup = () => {
    discartRef.current.close()
  }
  const oncloseAddMorePopup = () => {
    addMoreRef.current.close()
  }
  const deletemg = (i) => {
    let images = productImages;
    images.splice(i, 1);
    setProductImages([...images]);
    onLoadProductImages(images)
  }
  const handleUpload = (values) => {
    let images = productImages

    for (let index = 0; index < values.length; index++) {
      const element = values[index];
      images.push(element)
    }
    setProductImages([...images]);
    onLoadProductImages(images)
  }
  useEffect(() => {
    if (_id) {
      setProductImages(productDetails.product?.productPicture ? productDetails.product?.productPicture : [])
    }
  }, [_id, productDetails.product?.productPicture])

  return (
    <React.Fragment>
      <div className='e-commerce-wrap sectionGap'>
        <p className='e-commerce-card-para'>Product Images & Videos</p>
        <hr className='horizontal-line' />
        {productImages && productImages.length === 0 && <div className='uploadwrap'>
          {/* <Cropper /> */}
          <button className='upload addImages' onClick={openDiscart}>
            <div className='upload-icons'>
              <i className="Icon-gallery"></i>
              <span className='addText'>Add Images</span>
            </div>
          </button>
        </div>}

        <ImageUploader onclose={() => oncloseDiscardPopup()} multiSelect={true} discartRef={discartRef} onUploaded={handleUpload} search={productName} uploadLimit={5} />

        <div className="drag-gallery-wrapper">
          <div className="gallery-wrap">
            {productImages && productImages.length > 0 && productImages.map((img, i) => {
              return (
                <div className='gallery_item' key={i}>
                  <img
                    className="gallery_img"
                    src={img}
                    alt={img}
                  />
                  <div className='gallery_item-overlay'>
                    <div className='gallery_item-btn-wrapper'>
                      <div className='gallery_item-circle'>
                        <img src={CrossImage} alt="" onClick={() => deletemg(i)} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {productImages && productImages.length > 0 && productImages.length < 5 &&
              <div className='gallery_item'>
                <div className="image-drag" onClick={() => UploadModle()}>
                  <div className="dragbutton">
                    <span className="set__icon"><i className='icon-plus'>&#43;</i></span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <ImageUploader onclose={() => oncloseAddMorePopup()} multiSelect={true} discartRef={addMoreRef} onUploaded={handleUpload} search={productName} uploadLimit={5 - productImages.length} />

      </div>
    </React.Fragment>
  )
}
export default ProductUpload