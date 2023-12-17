import React from 'react';
import './socialMediaLogin.scss';
import Facebook from '../../../assets/images/facebook.png';
import Google from '../../../assets/images/google.png';
import Instagram from '../../../assets/images/insta.png'

const SocialMediaLogin = () => {
  return (
    <React.Fragment>
      <div className='socialMedia-container'>
        <div className='socialMedia-wrap'>
          <img src={Facebook} alt="" />
        </div>
        <div className='socialMedia-wrap'>
          <img src={Google} alt="" />
        </div>
        <div className='socialMedia-wrap'>
          <img src={Instagram} alt="" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default SocialMediaLogin