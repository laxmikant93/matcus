import React from 'react';

import './sliderCard.scss';


const SliderCard = ({ id, image, bgColor, text }) => {
  
  return (
    <React.Fragment>
      <div className='sliderCard-image-wrap'>
        <img src={image} alt="productImage" />
        <div className={`sliderCard-text-wrap ${bgColor}`}>
          <p>{text} </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SliderCard