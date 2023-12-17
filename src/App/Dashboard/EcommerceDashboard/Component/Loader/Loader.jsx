import React from 'react';
import './loader.scss';
import LoadingImage from '../../assets/images/Loading_icon.gif'
import LoadingImage2 from '../../assets/images/loading-gray.gif';
import LoadingImage3 from '../../assets/images/loader_blue.gif';

const Loader = () => {
  return (
    <React.Fragment>
      <div className='loader-container'>
        <div className='loader-wrapper'>
          <div className='loaderImage'>
            <img src={LoadingImage2} alt="" />
          </div>
          <p className='text-xxs w-500 base mt-8 loading-text'>Loading...</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Loader