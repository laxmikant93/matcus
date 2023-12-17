import React from 'react';
import './ribbon.scss';

const Ribbon = ({ Ribbon }) => {
  return (
    <React.Fragment>
      <div className='ribbon-container'>
        <p className='ribbon-text'>{Ribbon?.ribbon ? Ribbon?.ribbon : "15% off"}</p>
      </div>
    </React.Fragment>
  )
}

export default Ribbon