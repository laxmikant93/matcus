import React from 'react'
import './guestloginstepper.scss'
const GuestloginStepper = () => {
  return (
    <div className='guest-login-stepper-wrapper pT-10  pb-25 '>

      <div className='guest-login-stepper-wrapper-item-2'>
        <div className='stepper-div '></div>
        <div className='inline between-lg between-xs stepper-info-item'>


          <div className='cart-div inline '>
            <span className=' success-div '>
              <i className='ed-icon icon-tick i-xs white '></i>
            </span>
            <span className='text-xs w-400 pending-info secondary '> Cart</span>
          </div>

          {window.location.pathname.includes("/Payment-Details-WL") ?


            <div className='shipping-address-div inline'>
              <span className=' success-div '>
                <i className='ed-icon icon-tick i-xs white '></i>
              </span>              <span className='text-xs w-400 secondary '>Shipping Address</span>
            </div>

            :


            <div className='shipping-address-div inline'>
              <span className='stepper-count-div reach-div'>2</span>
              <span className='text-xs w-400 secondary pending-info  reach-info '>Shipping Address</span>
            </div>

          }

          {window.location.pathname.includes("/Payment-Details-WL") ?
            <div className='payment-div inline '>

              <span className='stepper-count-div reach-div'>3</span>
              <span className='text-xs w-400 secondary   reach-info  pending-info'>Payment</span>
            </div>
            :
            <div className='payment-div inline '>

              <span className='stepper-count-div pending-div'>3</span>
              <span className='text-xs w-400 secondary   reach-info  pending-info'>Payment</span>
            </div>

          }
        </div>
      </div>
    </div>
  )
}

export default GuestloginStepper