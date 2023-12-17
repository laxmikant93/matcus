import React from 'react'
import './otheritem.scss'
import Shoes from '../../../assets/images/product-1.png'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppLinkUrl from '../../../../../Common/AppLink/AppLinkUrl';
import { getOtherItemInThisOrder } from '../../../../../store/actions/ecommerce/action/cartOrder';
const Otheritem = () => {



  return (
    <React.Fragment>
      {/* <div className='other-item-wrapper'>

        <div className='other-item-tracking-wrapper'>
          <div className='other-item-tracking-item'>
            <p className="tracking-heading-item  w-700">Tracking Details</p>

            <div className='tracking-details-item-div'>
              <p> <span className="text-xxs id-item w-400"> Courier:</span> <span className="text-xxs id-item w-600"> Dehlivery  </span></p>
              <p> <span className="text-xxs id-item w-400"> Tracking ID:  </span> <span className="text-xxs id-item w-600"> 7895552114253  </span></p>
            </div>
            <p className="mt-10"> <span className="text-xxs id-item w-400" > Tracking ID: </span> <span className="text-xxs id-item w-600">www.sdhsjdasyyybsygba.wese/dfsdafhh-sadfas-yyybsygba.wese/dfsdafhh-sadfas/sdgv...</span></p>
          </div>
        </div>
        <div className='other-item-tracking-wrapper'>
          <div className='other-item-tracking-item'>
            <p className="tracking-heading-item  w-700">Order failed reason</p>
            <p className="mt-10 gray w-400 text-xxs">Unable to reach at your location, response from your phone carrier informing you that the entered number was invalid.</p>
          </div>
        </div>

        <p className='other-item-header w-700'>Other items in this order</p>

        <div className='other-item-body-wrapper'>
          <div className='product-div-item'>
            <div className='product-div-left-item'>
              <img src={Shoes} alt="" />
            </div>
            <div className='product-div-right-item'>
              <p className='other-product-name-div'>Men brown beast within graphics printed oversized over shoes</p>
              <div className='other-product-info-wrapper'>
                <div className='product-variants-wapper'>
                  <div className='product-variants-item'>
                    <p><span>Size : </span> <span className='item-type'>38</span></p>
                    <p> <span>Material : </span> <span className='item-type'>Leather</span></p>
                  </div>
                  <div className='product-variants-item'>
                    <p><span>Colour : </span> <span className='item-type'>Brown</span></p>
                    <p> <span>Style : </span> <span className='item-type'>Afro </span></p>
                  </div>
                </div>

                <button className='btn-order-details '>View Details</button>

              </div>
            </div>
          </div>
        </div>
        <div className='connect-coustmer-div'>
          <p className='connect-coustmer-item '>NEED HELP WITH YOUR ORDER?</p>
          <p className='connect-coustmer-link'>CONNECT WITH OUR SUPPORT TEAM</p>
        </div>
      </div> */}
    </React.Fragment>
  )
}

export default Otheritem