import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import ImageCropper from '../../../../../../Common/Cropper';
import FormError from '../../../../../../Common/Form/FormError';
import FormInput from '../../../../../../Common/Form/FormInput';
import CardContainer from '../../../SettingComponents/CardContainer/CardContainer';
import './businessInfo.scss';
import Cropper from "../../../../../../Common/Cropper";

import Image1 from '../../../asserts/images/jj.png';
import Canva from '../../../asserts/images/canva.webp'
import ValidationUtils from '../../../../../../Classes/ValidationUtils';
import ImageViewer from '../../../../../../Common/ImageViewer';
import UploadButton from '../../../../../../Common/UploadButton';
import Uploader from '../../../../../../Common/ImageUploader';
const BussienessInfo = ({ BusinessInfo, BussienessInfoData, BussienessInfoDatabusinessLogo }) => {
  const [changeText, setChangeText] = useState(false);
  const [BussinessName, setBusinessName1] = useState("");
  const [businessLogo, setBusinessLogo] = useState("");
  const [bussinessNameError, setBussinessNameError] = useState("");
  const ref = useRef()
  // const [businessLogo, setFaculty] = useState()


  useEffect(() => {
    setBusinessName1(BusinessInfo?.BussinessName)
    setBusinessLogo(BusinessInfo?.businessLogo)
  }, [BusinessInfo?.BussinessName, BusinessInfo?.businessLogo])

  const handlePersonalDetails = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "business_name":
        setBusinessName1(inputValue);
        setBussinessNameError(ValidationUtils.isEmpty(inputValue));
        // let editBussinessinfo = {
        //   BussinessName: inputValue,
        //   // businessLogo: businessLogo
        // }
        // BussienessInfoData(inputValue)

        BussienessInfoData(inputValue)
        break;
      default:
    }

  }

  const handleUpload = () => {
    ref.current.open()
  }

  const uploadImage = (data) => {
    let imgData = data;
    setBusinessLogo(imgData)
    BussienessInfoDatabusinessLogo(imgData)

  }

  // useEffect(() => {
  //   BussienessInfoData(BussinessName)
  //   BussienessInfoDatabusinessLogo(businessLogo)
  // })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // let editBussinessinfo = {
  //   BussinessName: BussinessName,
  //   businessLogo: businessLogo
  // }
  // useEffect(() => {
  //   BussienessInfoData(editBussinessinfo)
  // },)



  return (
    <React.Fragment>
      <div className='businessInfo-container'>
        <div className='businessInfo-left'>

          <CardContainer>
            <div className='siteName-wrapper'>
              <p className='tex-18 w-500 primary website-name'>Site Name</p>
              <p className='text-2xs base w-300 mt-8'>Edit this name to easily find it on your Dashboard and more.</p>
              <div className='input-wrapper'>
                <div className="formFieldwrap ">
                  <FormInput
                    value={BussinessName}
                    id="business_name"
                    name="business_name"
                    onChange={handlePersonalDetails}
                    placeholder="Enter Site Name"
                    maxLength="80"
                  />
                  <FormError
                    show={!BussinessName && bussinessNameError}
                    error="Name is required."
                  />
                </div>
                <div>
                  {/* <p className='text-xs w-400 primary cursor-pointer text-right' onClick={() => { setChangeText(!changeText) }}>{changeText ? 'Done' : 'Edit'}</p> */}
                </div>
              </div>
            </div>
          </CardContainer>
        </div>
        <div className='businessInfo-right'>
          <div className='logoSection-container'>
            <CardContainer>
              <div className='logo-wrapper'>
                <div className='logo-wrapper-left'>
                  <p className='tex-18 w-500 primary website-name'>Logo</p>
                  <p className='text-2xs base w-300 mt-8'>For best results upload high reslution image.</p>
                  {/* after logo is added */}
                  {/* <p className='text-2xs base w-300 mt-8'>Logo uploaded successfully!</p> */}
                  <UploadButton customButton={true}><button className='button button-primary btn-3xs mt-8' onClick={handleUpload}> Add Logo</button></UploadButton>
                  
                    <Uploader
      accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
       onclose={() => ref.current.close()}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadImage(data)}  uploadLimit={1} />
                  {/* after logo is added this button will shown */}
                  {/* <button className='button btn-o-silver btn-3xs mt-8'> Remove</button> */}
                  <p className='text-2xs w-300 base mt-10'>Get your own personalised logo. <span className='primary cursor-pointer'>Hire an Expert</span></p>
                </div>
                <div className='logo-wrapper-right'>
                  <div className='addLogoSection-container'>

                    <div className="image-drag" onClick={handleUpload}>
                      {!businessLogo ? <div className="dragwrap">
                        <span className="set__icon"><i className='set__icon icon-plus'>&#43;</i></span>

                        <div className="ActionUploadBanner">

                          <span className="set__icon"><i className='icon-plus'>&#43;</i> </span>
                        </div>

                      </div> :
                        <div className='image-div'>
                          <ImageViewer object={businessLogo} alt="" />
                        </div>}
                    </div>
                  </div>
                </div>
              </div>
            </CardContainer>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BussienessInfo