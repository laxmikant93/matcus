import React from 'react'
import "./proceedtobookstrip.scss"

const ProceedToBookStrip = ({ handleClick, btnName, title }) => {
  return (
    <>
      <div className="Booktostripe-wrapper mt-20">
        <p className="text-xxs white w-400">{title}</p>
        <button className="bookstript-btn primary w-500 text-xxs" onClick={handleClick}>{btnName}</button>
        {/* <button type="button" className="closeIcon" >&#10006;</button> */}
      </div>
    </>
  )
}

export default ProceedToBookStrip