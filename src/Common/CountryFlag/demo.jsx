import React, { useState, useRef } from 'react'
import FlagData from "./data.json";
import "./flags.scss"
import "./CountryFlag.scss"
import { useDetectOutsideClick } from '../DetectOutsideClick/useDetectOutsideClick';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrencyList } from '../../store/actions/ecomCurrency';
import { useEffect } from 'react';

const DemoDropdown = ({ CountryName = true, CountryCode = true, CurrencyName = true, CurrencySymbol = true, CountryFlag = true, CaretFill }) => {

  const dropdownRefShare = useRef(null);
  const [openDropdown, SetOpenDropdown] = useDetectOutsideClick(dropdownRefShare, false)
  const [selected, SetSelected] = useState("")

  const dispatch = useDispatch();


  const { user, getAllCurrenciesList, getAllCurrenciesListSuccess } = useSelector((state) => {
    return {
      user: state.user,
      getAllCurrenciesList: state.ecommerceCurrency.getCurrenciesList.data,
      getAllCurrenciesListSuccess: state.ecommerceCurrency.getCurrenciesList.success,
    }
  });

  useEffect(() => {
    dispatch(getAllCurrencyList(user.user_business));
  }, [dispatch, user.user_business])

  useEffect(() => {
    if (getAllCurrenciesListSuccess === true) console.log(getAllCurrenciesList);
  }, [getAllCurrenciesList, getAllCurrenciesListSuccess]);

  const handleOpenDropdown = (data) => {
    SetSelected(data)
    SetOpenDropdown(!openDropdown)

  }


  return (
    <React.Fragment>
      <div className="flag-dropdown-wrapper">
        <button type='button' className={`${CaretFill ? "caret-fill" : "caret-stroke"} ${openDropdown && "active"}`} onClick={() => SetOpenDropdown(!openDropdown)}>
          <span className="button-content">
            {(selected && CountryFlag) && <i class={`flag ${`flag-${selected.ISOCode.slice(0, 2).toLowerCase()}`}`}></i>}
            {(selected && CountryName) ? <span className="country-name">{selected.country}</span> : "Add Country"}
            {(selected && CountryCode) && <span className="country-code">{selected.ISOCode}</span>}
            {(selected && CountryCode) && <span className="country-code">{selected.currency}</span>}
            {(selected && CountryCode) && <span className="country-code">{selected.symbol}</span>}
          </span>
        </button>
        <ul className={`data-list ${openDropdown && "show"}`} ref={dropdownRefShare}>
          {getAllCurrenciesListSuccess && getAllCurrenciesList.map((data, index) => {
            return (
              <li className="data-list-item" key={index} onClick={() => handleOpenDropdown(data)} title={`${data.country} - ${data.ISOCode} - ${data.currency} - ${data.symbol}`}>
                <div className="dt-item-content">
                  {CountryFlag && <i class={`flag ${`flag-${data.ISOCode.slice(0, 2).toLowerCase()}`}`}></i>}
                  {CountryName && <span className="country-name">{data.country}</span>}
                  {CountryCode && <span className="country-code">({data.ISOCode})</span>}
                  {CurrencySymbol && <span className="currency-symbol">{data.symbol}</span>}
                  {CurrencyName && <span className="currency-name">({data.currency})</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default DemoDropdown