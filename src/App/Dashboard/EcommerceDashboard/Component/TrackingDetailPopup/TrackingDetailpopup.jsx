import React from 'react'
import Modals from '../../../../../Common/Modals'
import ModalsHeader from '../../../../../Common/Modals/ModalsHeader';
import ModalsBody from '../../../../../Common/Modals/ModalsBody';
import './trackingdetail.scss'
import '../../pages/SelfShipping/selfShippingPopUp.scss'
import FormInput from '../../../../../Common/Form/FormInput';
import FormError from '../../../../../Common/Form/FormError';
import { useEffect,useState } from 'react';

const TrackingDetailPopup = ({ onclose, openref,shippingPartner,trackingId,trackingUrl,propData }) => {
  const[data,setData]=useState({});

  useEffect(()=>{
    // let a=data();
    // console.log(propData)
    setData(propData);
  },[propData])
  const closeModal = () => {
    onclose();
  }


  
  const routeChange = () =>{ 
    let path = trackingUrl??trackingUrl; 
    window.location.href=path
  }
  // console.log("shippingPartner,trackingId,trackingUrl",shippingPartner,trackingId,trackingUrl)
  return (
    <div>
      <Modals ref={openref} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
        <ModalsHeader title={'Tracking Details'} />
        <ModalsBody>
          <div className='main-tarcking-container'>
            <p className='mt-15 track-heading'> View Tracking Details</p>
            <div className='inline shipping-track-wrapper'>
              <div className='shipping-track-left-item'>
                <p>  Shipping Partner<span className='track-star'>*</span></p>
                <select
                  className='addProduct-align-div '
                  readOnly
                >
                 {/*  <option value=''>Select Delivery Partner</option>
                  <option value='DTDC'>DTDC</option>
                  <option value='FED'>FED EX</option>
                  <option value='DELHIVERY'>DELHIVERY</option>
                  <option value='Others'>Others</option> */}
                  <option value='' readOnly>{data?.shippingPartner}</option>

                </select>
                <FormError
                  error="please select shipping partner"
                />

              </div>
              <div className='shipping-track-right-item'>
                <p> Tracking ID<span className='track-star'>*</span></p>
                <div className='mt-5'>
                  <input className='track-id-item ' name='trackID' type="text" placeholder='eg. 12384956325' value={data?.trackingId} />
                  <FormError
                    error="please enter tracking ID"
                  />
                </div>
              </div>
            </div>
            {/* <div className='inline between-xs between-lg mt-15 mb-5 shipping-dropdown-wrapper'>
            </div> */}

            <div className='mt-15 ' onClick={()=>{routeChange()}}>
              <p className='text-xs mb-5  w-400 base'> Tracking URL</p>
              <FormInput
                type='text' placeholder='https://www.canadapost.ca/cpotools/apps/track/personal/findByTrackNumber?trackingNumber=xfvsdfsdf '
                name='trackURL' value={data?.trackingUrl}

              />
            </div>
            <div className='mt-15 done-btn-wrap '>
              <button className='button button-primary btn-2xs btn-oval'>Done</button>
            </div>
          </div>
        </ModalsBody>
      </Modals>
    </div>
  )
}

export default TrackingDetailPopup