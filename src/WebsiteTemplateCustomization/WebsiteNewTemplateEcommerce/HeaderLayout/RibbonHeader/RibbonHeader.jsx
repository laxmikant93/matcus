import React from 'react'
import MultiLanguage from './MultiLanguage';
import './ribbonheader.scss'

const RibbonHeader = () => {
  return (
    <div className="ribbon-wrapper">
      <div className="containerTrue">
        <div className="multilang-drop">
          <MultiLanguage />
        </div>
      </div>
    </div>
  )
}

export default RibbonHeader;