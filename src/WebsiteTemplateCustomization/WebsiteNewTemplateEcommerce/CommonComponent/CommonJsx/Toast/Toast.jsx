import React from 'react';
import './toast.scss';

const Toast = ({ text }) => {
  return (
    <React.Fragment>
      <div className='toast-container'>
        <div className='tost-cart'>
          <p>{text} </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Toast