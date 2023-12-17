import React from 'react';
import './showRatingStar.scss';

const ShowRaringStar = ({starsValue,width,height}) => {
  const starLength = [1,2,3,4,5]
  return (
    <div className='showRatingstar-container'>
      <div className='star-wrap'>
        {
          starLength.map((index)=> (
            <i className={`star-icon ${ starsValue >= index? 'starIcon-filled':'starIcon-empty'}`} style={{width:width+ 'px',height:height + 'px'}}></i>
          ))
        }
      </div>
    </div>
  )
}

export default ShowRaringStar