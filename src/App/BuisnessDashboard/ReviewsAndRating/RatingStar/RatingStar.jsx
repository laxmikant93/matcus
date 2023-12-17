import React from 'react';
import StarFilled from './StarYellow.png';
import StartEmpty from './StarWhite.png';
import './ratingStar.scss';
import { useState } from 'react';

const RatingStar = ({ state, title }) => {
  const stars = [
    {
      id: 1,
      ratingValue: 1,
    },
    {
      id: 2,
      ratingValue: 2,
    },
    {
      id: 3,
      ratingValue: 3,
    },
    {
      id: 4,
      ratingValue: 4,
    },
    {
      id: 5,
      ratingValue: 5,
    },
  ]
  const [rating, setRating] = useState(null);
  const [onHover, setHover] = useState(null);
  return (
    <div className='star-container'>
      <p className='text-xs w-400 base rating-label'>{title ? title : 'Select Stars'}</p>
      <div className='star-wrap'>
        {/* <i className='star star-filled'></i>
     <i className='star star-empty'></i>
     <i className='star'></i> */}
        {
          stars.map(({ id, ratingValue }) => (
            <label className='rating-label' key={id} >
              <input type="radio" name="rating" value={ratingValue} onClick={() => { setRating(ratingValue) }} />
              <i className={`star-icon ${ratingValue <= (onHover || rating) ? 'starIcon-filled' : 'starIcon-empty'}`} onMouseEnter={() => { setHover(ratingValue) }} onMouseLeave={() => { setHover(null) }}></i>
            </label>
          ))
        }
      </div>
    </div>
  )
}

export default RatingStar