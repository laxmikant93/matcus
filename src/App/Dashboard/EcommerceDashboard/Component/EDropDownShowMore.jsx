import React from 'react';
import './eDropDownShowMore.scss'

const EDropDownShowMore = ({ children }) => {
  return (
    <React.Fragment>
      <div className='eDropDownShowMore-container'>
        {children}
      </div>
    </React.Fragment>
  )
}

export default EDropDownShowMore