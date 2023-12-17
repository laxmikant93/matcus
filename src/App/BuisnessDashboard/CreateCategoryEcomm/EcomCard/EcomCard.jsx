import React from 'react';
import './ecomCard.scss';

const EcomCard = ({ children, bgColor }) => {
  return (
    <React.Fragment>
      {/* accept backgroud color */}
      <div className={`ecom-container`} style={{ backgroundColor: bgColor }}>
        {children}
      </div>
    </React.Fragment>
  )
}

export default EcomCard