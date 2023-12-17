import React, { useEffect } from 'react';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import './myAccount.scss';

const MyAccount = () => {

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <div className='containerTrue pb-45 '>
        <div className='myprofile-container'>
          <p className='myAccount-para'>My Account</p>
          <div className='myProfile-list-wrap'>
            <div className='myprofile-list'>
              <p className='myprofile-list-order'>My Orders</p>
              <p className='myprofile-list-p'>View, modify and track orders</p>
            </div>
            <div className='myprofile-list'>
              <p className='myprofile-list-order'>My Addresses</p>
              <p className='myprofile-list-p'>View, modify and track orders</p>
            </div>
            <div className='myprofile-list'>
              <p className='myprofile-list-order'>My Profile</p>
              <p className='myprofile-list-p'>View, modify and track orders</p>
            </div>
          </div>
          <div className='myProfile-details-wrap'>
            <h3>Buy something to get personalised
              recommendations.</h3>
            <button className='buttonTrue btnTrue-o-primary btn-xs'>Continue Shopping</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MyAccount