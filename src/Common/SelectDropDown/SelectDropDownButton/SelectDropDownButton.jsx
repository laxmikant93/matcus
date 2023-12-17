import React from 'react';
import './selectDropDownButton.scss';

const SelectDropDownButton = ({ value, setopenDropDown, buttonType, selectedValue }) => {

  return (
    <div className='selectdropdownButton-container '>
      <button className={`selectDropDownButton-wrap  ${buttonType === 'oval' ? 'btn-ovalShape' : ''}`} onClick={setopenDropDown}>
        <span className='text-xs w-400 base'>{selectedValue ? selectedValue : "Select Value"}
        </span><span><i className={`icon-down ${value ? 'icon-rotate' : ''}`} ></i></span>
      </button>
    </div>
  )
}

export default SelectDropDownButton