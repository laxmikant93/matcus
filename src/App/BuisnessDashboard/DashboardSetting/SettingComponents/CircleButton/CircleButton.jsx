import React from 'react';
import { Link } from 'react-router-dom';
import './circleButton.scss'

const CircleButton = ({ position, path }) => {
  return (
    <React.Fragment>
      <Link to={path}>
        <div className='circleButton-container'>
          <div className='circle-div'>
            <i className={`ed-icon i-xxs primary icon-rightIcon position-${position}`}></i>
          </div>
        </div>
      </Link>
    </React.Fragment >
  )
}

export default CircleButton