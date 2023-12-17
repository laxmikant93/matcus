import React from 'react';
import './threeDotLoader.scss';

const ThreeDotLoader = (center) => {
  return (
    <div className={`threedotContainer ${center ? "centerAlign" : ""}`}>
      <div className='loader'>
        <span ></span>
        <span ></span>
        <span></span>
      </div>
    </div>
  )
}

export default ThreeDotLoader