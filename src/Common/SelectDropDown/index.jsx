import React from 'react'
import { useState } from 'react'
import SelectDropDownButton from './SelectDropDownButton/SelectDropDownButton'
import SelectdropDownContainer from './SelectDropdownContainer/SelectdropDownContainer';
import './selectDropDown.scss';
import { useRef } from 'react';
import { useDetectOutsideClick } from '../DetectOutsideClick/useDetectOutsideClick';
import { useEffect } from 'react';


const SelectDropDown = ({ values, handleSelect, showValue, disabled }) => {
  const clickOutsideRef = useRef(null)
  const [openDropdown, setOpenDropDown] = useDetectOutsideClick(clickOutsideRef, false);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (showValue) {
      setSelectedValue(showValue);
    }
  }, [showValue])

  const setopenDropDown = () => {
    setOpenDropDown(!openDropdown)
  }

  const handleOnChange = (val) => {
    setSelectedValue(val)
    setOpenDropDown(!openDropdown)
    handleSelect(val)
  }

  return (
    <div className='selectDropDown-container' ref={clickOutsideRef} aria-disabled={disabled}>
      <SelectDropDownButton value={openDropdown} setopenDropDown={setopenDropDown} selectedValue={selectedValue} />
      {
        openDropdown &&
        <SelectdropDownContainer values={values} onChange={handleOnChange} />
      }
    </div>
  )
}

export default SelectDropDown