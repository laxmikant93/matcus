import React from 'react';
import Favicon from '../../../asserts/images/favionpreview.png';
import './previewIcon.scss';
import MoobiIcon from '../../../asserts/images/moobi.png';
import EdFav from '../../../asserts/images/favicon.png';
import EdLogo from '../../../asserts/images/edlogo.png'

const PreviewIcon = () => {
  return (
    <React.Fragment>
      <div className='previewIcon-container'>
        <div className='favIcon-container'>
          <img src={EdFav} alt="" />
          {/* <div className='circle-image'>
            <img src={Lays} alt="" />
          </div>
          <div className='text-div'>
            <p>Bally Caefdfdfd </p>
          </div> */}
        </div>
        {/* <div className='icon-div'>
          <img src={EdLogo} alt="" />
        </div> */}
      </div>
    </React.Fragment>
  )
}

export default PreviewIcon