import React from 'react';
import './googlelogin.scss';
import Googleicon from '../../../../../assets/Icons/icon-google.svg';

const GoogleLogin = () => {
  return (
    <React.Fragment>
      <button className='googleLoginButton'>
        <img src={Googleicon} alt="" />
        Continue with Google
      </button>
    </React.Fragment>
  )
}

export default GoogleLogin