import React from 'react';
import './cardContainer.scss';

const CardContainer = ({ children }) => {
  return (
    <React.Fragment>
      <div className='cardSetting-container'>
        {children}
      </div>
    </React.Fragment>
  )
}

export default CardContainer