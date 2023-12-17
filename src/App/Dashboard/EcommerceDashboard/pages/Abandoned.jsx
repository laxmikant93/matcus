import React from 'react';
import './abandoned.scss';
import ShoeImage from '../assets/icons/shoeImage.png'

const Abandoned = () => {
  const arr = [1, 2, 3, 5, 6];
  return (
    <React.Fragment>
      <div className='dashBoard-home-container'>
        <div className='abandonedPage-container'>
          <h1 className="text-md w-600">Abandoned Products 14</h1>
          <hr className='horizontal-line mt-15' />
          <div className='abandonedpgae-content-wrap'>
            <div className='abandonedpgae-content-div mt-8'>
              <p className='text-s w-500'><span>Today </span><span>(3)</span></p>
              {/* loop start here */}
              {arr.map(() => {
                return (
                  <div className='abandonedpgae-cart mt-8'>
                    <div className='abandonedpgae-image'>
                      <img src={ShoeImage} alt="productImage" className='img-response' />
                    </div>
                    <div className='abandonedpgae-text-div'>
                      <p className='text-xs gray w-400'>Nike Men's Zoom Gravity 2 Running ShoeA pair of black training sports shoes,
                        has regular styling, slip-on detail Mesh upper Cushioned footbed.</p>
                      <p className='text-xs primary mt-5'><span>Category : </span><span>Sports Shoe</span></p>
                    </div>
                  </div>
                )
              })}
              {/* loop end here */}
            </div>
            {/* 
            next section */}
            <div className='abandonedpgae-content-div mt-40'>
              <p className='text-s w-500'><span>Older abandoned products  </span><span>(24)</span></p>
              {/* loop start here */}
              {arr.map(() => {
                return (
                  <div className='abandonedpgae-cart mt-8'>
                    <div className='abandonedpgae-image'>
                      <img src={ShoeImage} alt="productImage" className='img-response' />
                    </div>
                    <div className='abandonedpgae-text-div'>
                      <p className='text-xs gray w-400'>Nike Men's Zoom Gravity 2 Running ShoeA pair of black training sports shoes,
                        has regular styling, slip-on detail Mesh upper Cushioned footbed.</p>
                      <p className='text-xs primary mt-5'><span>Category : </span><span>Sports Shoe</span></p>
                    </div>
                  </div>
                )
              })}
              {/* loop end here */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Abandoned