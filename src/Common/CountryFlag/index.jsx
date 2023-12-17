import React, { useState, useRef } from 'react'
import FlagData from "./data.json";
import "./flags.scss"
import "./CountryFlag.scss"
import { useDetectOutsideClick } from '../DetectOutsideClick/useDetectOutsideClick';

const CountryFlagDropdown = ({ CountryName = true, CountryCode = true, CountryFlag = true, CaretFill }) => {

  const dropdownRefShare = useRef(null);
  const [openDropdown, SetOpenDropdown] = useDetectOutsideClick(dropdownRefShare, false)
  const [selected, SetSelected] = useState("")

  const handleOpenDropdown = (data) => {
    SetSelected(data)
    SetOpenDropdown(!openDropdown)

  }


  return (
    <React.Fragment>
      <div className="flag-dropdown-wrapper">
        <button type='button' className={`${CaretFill ? "caret-fill" : "caret-stroke"} ${openDropdown && "active"}`} onClick={() => SetOpenDropdown(!openDropdown)}>
          <span className="button-content">
            {(selected && CountryFlag) && <i class={`flag ${`flag-${selected.value.toLowerCase()}`}`}></i>}
            {(selected && CountryName) ? <span className="country-name">{selected.text}</span> : "Add Country"}
            {(selected && CountryCode) && <span className="country-code">{selected.value}</span>}
          </span>
        </button>
        <ul className={`data-list ${openDropdown && "show"}`} ref={dropdownRefShare}>
          {FlagData.map((data, index) => {
            return (
              <li className="data-list-item" key={index} onClick={() => handleOpenDropdown(data)} title={`${data.text} - ${data.value}`}>
                <div className="dt-item-content">
                  {CountryFlag && <i class={`flag ${`flag-${data.value.toLowerCase()}`}`}></i>}
                  {CountryName && <span className="country-name">{data.text}</span>}
                  {CountryCode && <span className="country-code">({data.value})</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default CountryFlagDropdown