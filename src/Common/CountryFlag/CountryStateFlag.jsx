import { useSelector, useDispatch } from "react-redux";
import { findState } from "../../store/actions/countries";
import { string, func, bool } from "prop-types";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDetectOutsideClick } from "../DetectOutsideClick/useDetectOutsideClick";
import React from 'react'
import "./flags.scss"
import "./CountryFlag.scss"

function CountryStateFlagDropdown({ name, selectedValue, onSelect, selectedCountry, selectedFlag, label, className, CountryName = true, CountryCode = true, CountryFlag = true, CaretFill, ...props }) {
  const countries = useSelector(state => state.countries.list);
  const { existingStates } = useSelector((state) => {
    return {
      existingStates: state.shipping.existingStates.data
    }
  })
  const [countryList, setCountryList] = useState([])
  const dispatch = useDispatch()
  const [selected, setselected] = useState("")
  const dropdownRefShare = useRef(null);
  const [openDropdown, SetOpenDropdown] = useDetectOutsideClick(dropdownRefShare, false)

  const handleOpenDropdown = data => {
    setselected(data)
    onSelect(data)
    dispatch(findState(data.country))
    SetOpenDropdown(false)
  }

  useEffect(() => {
    if (selectedCountry) {
      if (selectedFlag) {
        setselected({ country: selectedCountry, value: selectedFlag ? selectedFlag : "IN" })
      } else {
        let flag = countryList.find((item) => item.country === selectedCountry)
        setselected({ country: selectedCountry, value: flag.value })
      }
    } else {
      setselected("")
    }
    if (selectedCountry) {
      dispatch(findState(selectedCountry))
    }
  }, [countryList, dispatch, selectedCountry, selectedFlag])

  // console.log(selectedFlag, selected, "line no 48");

  const filterByReference = (arr1, arr2) => {
    let res = [];
    res = arr1.filter(el => {
      return !arr2.find(element => {
        return element._id === el.country && el?.states?.length === element?.state?.length;
      });
    });
    return res;
  }
  useEffect(() => {
    if (existingStates.length > 0) {
      setCountryList(filterByReference(countries, existingStates))
    } else {
      setCountryList(countries)
    }
  }, [countries, existingStates])
  return <>
    <div className="flag-dropdown-wrapper">
      <button type='button' className={`${CaretFill ? "caret-fill" : "caret-stroke"} ${openDropdown && "active"}`} onClick={() => SetOpenDropdown(!openDropdown)}>
        <span className="button-content">
          {(selected && CountryFlag) && <i class={`flag ${`flag-${selected.value.toLowerCase()}`}`}></i>}
          {(selected && CountryName) ? <span className="country-name">{selected.country}</span> : label ? label : "Select Country"}
          {(selected && CountryCode) && <span className="country-code">{selected.value}</span>}
        </span>
      </button>
      <ul className={`data-list ${openDropdown && "show"}`} ref={dropdownRefShare}>
        {countryList.map((data, index) => {
          return (
            <li className="data-list-item" key={index} onClick={() => handleOpenDropdown(data)} title={`${data.country} - ${data.value}`}>
              <div className="dt-item-content">
                {CountryFlag && <i class={`flag ${`flag-${data.value.toLowerCase()}`}`}></i>}
                {CountryName && <span className="country-name">{data.country}</span>}
                {CountryCode && <span className="country-code">({data.value})</span>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </>
}

CountryStateFlagDropdown.defaultProps = {
  autoevent: false,
  name: "country",
  value: "",
  onSelect: () => { },
  onEvent: () => { }
}

CountryStateFlagDropdown.propTypes = {
  autoevent: bool,
  name: string.isRequired,
  value: string,
  onSelect: func.isRequired,
  onEvent: func
}

export default CountryStateFlagDropdown