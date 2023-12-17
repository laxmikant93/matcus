import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Modals from '../../../../../Common/Modals'
import ModalBody from '../../../../../Common/Modals/ModalsBody'
import ModalHeader from '../../../../../Common/Modals/ModalsHeader';
import SEOSetting from '../../../../../Common/SEOSetting/Index';
import './seoSettingpopup.scss';

const SEOSettingPopup = ({ openpopup, onclose, slugData, getSeoData, mainName,firstRoute }) => {
  // console.log(mainName, "Dushyant")
  const closeModal = () => {
    onclose();
  }
  const SeoData = (vl) => {
    slugData(vl)
  }

  return (

    <Modals className="seoPopup-modal" ref={openpopup} Position="right" slide="right" ClosePopUp={() => closeModal()} ModalsSize={'modal-xs'}>
      <ModalHeader title={'SEO Settings'} className="seoPopup-header"></ModalHeader>
      <ModalBody className={'seoModal-body'}>

        <SEOSetting showSlider={true} onclose={onclose} firstRoute={firstRoute} SeoData={SeoData} getSeoData={getSeoData} mainName={mainName} />
      </ModalBody>
    </Modals>

  )
}

export default SEOSettingPopup