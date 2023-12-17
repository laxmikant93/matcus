import React from 'react';
import './deliveryNotAvailable.scss';
import Image from '../../../LayoutComponent/GuestLogin/icon.png'

const DeliveryNotAvailableToast = ({title}) => {
  return (
    <div className='deliveryNotAvailableToast-container'>
      <div className='delivery-error-wrap'>
        <img src={Image} alt="" />
        <p className='delivery-error-para'>{title}</p>
      </div>
    </div>
  )
}

export default DeliveryNotAvailableToast