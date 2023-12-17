import React from 'react';
import Modals from '../../../../../Common/Modals';
import ModalBody from '../../../../../Common/Modals/ModalsBody';
import ModalHeader from '../../../../../Common/Modals/ModalsHeader';
import AddImageIcon from './AddImageIcon/AddImageIcon';
import Image1 from '../../assets/images/image1.png'

import './varientImage.scss';
import { useState } from 'react';
import UploadedImages from './UploadedImages/UploadedImages';
import ValidationFile from '../../../../../Classes/ValidationFile';
import FormError from '../../../../../Common/Form/FormError';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const VarientImagePop = ({ varientRef, onclose, handleClearPrevious, onConnectImage, productVariations, productImages, productTitle }) => {
  const [showUploadedImages, setShowUploadedImages] = useState(false);
  // const handleShow = (value) => {
  //   setShowUploadedImages(!showUploadedImages);
  // }
  const { _id } = useParams()
  const { productDetails } = useSelector((state) => {
    return {
      productDetails: state.productList.getSingleProduct.data,
    }
  })
  // console.log(productTitle, "title-18");
  const [showSubject, hideSubject] = useState(-1);
  const [imageSectionArray, setImageSectionArray] = useState([])
  function handleShow(index) {
    if (showSubject !== index) {

    }
    hideSubject(showSubject === index ? -1 : index);
    if (imageSectionArray.length) {
      let array = imageSet
      for (let key = 0; key < imageSectionArray.length; key++) {
        const element = imageSectionArray[key];
        array[index]['images'].push(element)
      }
      setImageSet([...array])
      setImageSectionArray([])
    }
  }
  const [selectedName, setSelectedName] = useState("")
  const [selectedError, setSelectedError] = useState(false)
  const [imageSet, setImageSet] = useState([])
  const closeModal = () => {
    onclose();
    hideSubject(-1)
    setImageSectionArray([])
    setImageSet([])
    setSelectedName("")
  }

  const handleSelect = (e) => {
    handleClearPrevious()
    setSelectedName(e.target.value)
    setSelectedError(ValidationFile.isEmpty(e.target.value))
    if (e.target.value !== "") {
      let array = []
      let data = productVariations.find((i) => i.title === e.target.value)?.value
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        array.push({
          variant_value: element,
          images: []
        })
      }

      setImageSet([...array])
    } else {
      setImageSet([])
    }

  }
  const uploadImage = (val, key) => {
    let images = imageSet
    for (let index = 0; index < val.length; index++) {
      const element = val[index];
      images[key]['images'].push(element)
    }
    setImageSet([...images])
    hideSubject(-1);
  }
  const handleImageSelect = (image, index) => {
    let array = imageSet
    // console.log(array[index]['images'].includes(image), "hihhihihihiih")
    // if (array[index]['images'].includes(image)) {
    //   array[index]['images'].splice(image, 1);
    //   setImageSet([...array]);
    // } else {
    //   array[index]['images'].push(image)
    //   setImageSet([...array])
    // }

    let data = imageSectionArray
    if (data.includes(image)) {
      let index = data.indexOf(image)
      data.splice(index, 1)
    } else {
      if (data.length < 5 - array[index]['images'].length) {
        data.push(image)
      }
    }
    setImageSectionArray([...data])
  }
  const handleApply = () => {
    if (ValidationFile.isNotEmpty(selectedName)) {
      let data = productVariations.find((i) => i.title === selectedName)
      // console.log(data, "dataa")
      onConnectImage(data, [...imageSet])
    }

  }
  const handleCancel = () => {
    varientRef.current.close()
    hideSubject(-1)
    setImageSectionArray([])
    setImageSet([])
    setSelectedName("")
  }
  const deleteImage = (index, image) => {
    let imagesSet = imageSet;
    let key = imageSet[index].images.indexOf(image);
    imageSet[index].images.splice(key, 1);
    setImageSet([...imagesSet])
  }
  useEffect(() => {
    if (_id) {
      if (productDetails?.product?.variant.length) {
        let data = productDetails?.product?.variant.find((i) => i.isConnectImg === true)
        setSelectedName(data?.title)
        setImageSet(data?.imageSet ? data?.imageSet : [])
      }
    }
  }, [_id, productDetails?.product?.variant])
  // console.log(imageSet, "lll")
  return (
    <React.Fragment>
      <Modals ref={varientRef} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-m'}>
        <ModalHeader title={'Connect images to an option'} />
        <ModalBody className={'varientImage-modalBody'}>
          <div className='varientImage-container'>
            <div className='varientImage-padding'>
              <p className='text-xs w-400 base'>Select an option and connect images you want customers to see
                when they click on that option’s choices.</p>
            </div>
            <div className='varientImage-note-div varientImage-padding'>
              <p className='text-2xs w-400 base'>Please note - you can only connect images to one option.</p>
            </div>
            <div className='varientImage-option-div varientImage-padding'>
              <p className='text-xs w-400 base'>Select an option</p>
              <div className=" varient-select ">
                <select
                  id="list"
                  onChange={handleSelect}
                  value={selectedName}
                  defaultValue={false}
                >
                  <option value="">Select Title</option>
                  {
                    productVariations && productVariations.map((item) => {
                      return (
                        <option value={item.title}>{item.title}</option>
                      )
                    })
                  }
                </select>
                <FormError show={selectedError} error="Field Required." />
              </div>
            </div>
            <div className='varientImage-showImageSection'>

              <div className=" varientImage-header">
                <div className="varientImage-choice-div">
                  <p className='text-xxs w-500 text-black'>Choice</p>
                </div>
                <div className="varientImage-choice-div">
                  <p className='text-xxs w-500 text-black'>Product images</p>
                </div>
              </div>
              {imageSet.length > 0 ? <div className=' varientImage-body'>
                {/* loop start here */}
                <div className='pb-40'>
                  {
                    imageSet.length > 0 ? imageSet.map((data, index) => (
                      < React.Fragment >
                        <div className="varientImag-lowerSection"  >
                          <div className="varienText">
                            <div className='choice-wrapper'>
                              <p className='text-xxs w-500 text-black'>{data.variant_value}</p>
                            </div>
                          </div>
                          <div className="varientImages">
                            <div className='image-container'>
                              <div className='list-images-wrappwer'>
                                {
                                  data.images.length ? data.images.map((images, key) => {
                                    return (
                                      <div className='image-div' key={key}>
                                        <img src={images ? images : Image1} alt="" />
                                        <div className='delete-overlay' onClick={() => deleteImage(index, images)}>
                                          <i className='ed-icon icon-delete i-xs white'></i>
                                        </div>
                                      </div>
                                    )
                                  }) : ""
                                }
                                {/* if the image count is 5 section will be hide */}
                                {
                                  (data.images.length < 5) ?
                                    <div className='varientImages-icon-wrpper'>
                                      <AddImageIcon handleShow={() => handleShow(index)} />
                                      {
                                        showSubject === index &&
                                        // count number of images based on that shift the position popup
                                        <UploadedImages uploadedImageLength={data?.images?.length ? data?.images?.length : 0} imageCount={(imageSectionArray.length)} data={imageSectionArray} productImages={productImages} productTitle={productTitle} handleUpload={(val) => uploadImage(val, index)} handleImageSelect={(val) => handleImageSelect(val, index)} handleClose={() => handleShow(index)} />
                                      }
                                    </div> : ""
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />

                      </React.Fragment>
                    )) : <div className="varientImag-lowerSection">Select any one Title</div>
                  }
                </div>
              </div> : ""}
              <div className='varientImage-btn-wrapper'>
                <div className='text-right varientImage-btn-div'>
                  <button className='button btn-2xs btn-o-primary btn-oval' onClick={handleCancel}>Cancel</button>
                  {/* when button is disable add 'btn-disable ' class
                    when button is active add button-primary' class */}
                  <button className='button btn-2xs button-primary btn-oval' onClick={handleApply}>Apply</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

      </Modals>
    </React.Fragment >
  )
}

export default VarientImagePop