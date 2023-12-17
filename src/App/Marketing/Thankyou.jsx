import React from 'react';
import './thankyou.scss';
import ThankYouImage from './assets/thankyou.png';
import AppLink from '../../Common/AppLink';

const Thankyou = () => {
  return (
    <React.Fragment>
      <div className='thank-container'>
        <div className='thank-wrapper'>
          <div className='image-div'>
            <img src={ThankYouImage} className='img-fluid' alt="" />
          </div>
          <div className='content-div'>
            <p className='text-s w-400 base text-center'> Thank you for your query.</p>
            <p className='text-s w-400 base text-center mt-10'> Our team will get in touch with you you as soon as possible.</p>
          </div>
          <div className='text-center'>
            <AppLink className='button button-primary btn-sm mt-40 ' to={'/marketing'}>Go to Dashboard</AppLink>
          </div>

        </div>
      </div>
    </React.Fragment>
  )
}

export default Thankyou