import React, { useEffect, useState } from 'react';
import './radioAddress.scss';

const RadioAddress = ({ name, fullAddress, state, country, city, pinCode, phone, selected, line1, mobileNumber, showFullAddress, handleChange, handleSelectDiv, key, _id }) => {
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
  })

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
    })
  }
  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])
  return (
    <React.Fragment>
      <div className='radioAddress-container'>
        <div className='radioAddress-wrap'>
          <input type="radio" id="address" name="address" checked={selected === true} onChange={handleChange} className='change-address-radio' onClick={() => handleSelectDiv(_id, key)}
            key={key} />
          <div className='cart-changeAddress-wrap'>
            <p className='cart-user-name'>{name} </p>
            {
              <>
                <p className='cart-user-address'>  {!showFullAddress ? ((windowDimenion.winWidth < 600) || (windowDimenion.winWidth > 768 && windowDimenion.winWidth < 992) ? fullAddress && fullAddress.slice(0, 15) + "......" : fullAddress) : fullAddress}</p>
                <p className='cart-user-address cart-user-pin'>{country} {state} {city} {pinCode}</p>
                <p className='cart-mobile-p'> <span className='cart-user-address'>Mobile:&nbsp;</span> <span className='cart-user-name'> {phone}</span> </p>
              </>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RadioAddress