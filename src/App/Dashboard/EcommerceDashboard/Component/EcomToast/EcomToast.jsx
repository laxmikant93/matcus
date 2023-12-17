
import React from 'react';
import './ecomtoast.scss'

const EcomToast = ({ text }) => {
  return (
    <React.Fragment>
      <div className='ecom-toast-container'>
        <div className='tost-cart'>
          <p>{text} </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EcomToast