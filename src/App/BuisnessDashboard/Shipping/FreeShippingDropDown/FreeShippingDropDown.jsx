import React from 'react';
import { useState } from 'react';
import './freeShippingDropDown.scss'
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick'
import { useRef } from 'react';


const FreeShippingDropDown = ({ value, onselect, condition }) => {
  const openRef = useRef(null)
  const [openShppingDropdown, setOpenShppingDropdown] = useDetectOutsideClick(openRef, false);

  const handleCloseDropDown = () => {
    setOpenShppingDropdown(!openShppingDropdown)
  }
  const handleSelect = (value) => {
    onselect(value)
    handleCloseDropDown()
  }
  return (
    <div className='freeShppingDropDown-container'>
      <p className='shppinglable text-xs w-400 base'>Select how shipping is calculated</p>

      <button className='button btn-sm btn-block btn-freeshipping' onClick={handleCloseDropDown}>
        {/* before dropdown is selected 'w-400 gray text-xxs' class will added */}
        {/* after dropdown is selected 'text-xxs w-500 base' class will added */}
        <p className={` ${false ? 'text-xxs w-500 base' : 'w-400 gray text-xxs'}`}>{!value ? "Free Shipping / Flat Shipping" :
          value === "FreeShipping" ? "Free Shipping" : "Flat Shipping"

        }</p> <p><i className={`ed-icon primary icon-arrow ${openShppingDropdown ? 'icon-rotate' : ''}`}></i></p>
      </button>
      <ul className={`freeShipping-content ${openShppingDropdown ? 'content-show ' : ''}`} ref={openRef}>
        {
          condition ?
            <li className='dropdown-li' onClick={() => handleSelect('FlatShipping')}>
              <p className='text-xxs w-500 base'>Flat rate</p>
              <p className='text-xxs w-300 lgray'>Offer flat shipping charges on all products</p>
            </li> : <React.Fragment>
              <li className='dropdown-li' onClick={() => handleSelect('FreeShipping')}>
                <p className='text-xxs w-500 base'>Free Shipping</p>
                <p className='text-xxs w-300 lgray'>Offer free shipping to your customers</p>
              </li>
              <li className='dropdown-li' onClick={() => handleSelect('FlatShipping')}>
                <p className='text-xxs w-500 base'>Flat rate</p>
                <p className='text-xxs w-300 lgray'>Offer flat shipping charges on all products</p>
              </li>
            </React.Fragment>
        }
      </ul>
    </div>
  )
}

export default FreeShippingDropDown