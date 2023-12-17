import React, { useRef, useState } from 'react';
import './currencyDropDown.scss';
import { useDetectOutsideClick } from '../../../../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CurrencyDropDown = ({ position, currencydata, onLoadPrimaryCurrencyInfo, type, data, currencyRow, setCurrencyRow, setOnChange }) => {

  let dispatch = useDispatch();
  const openref = useRef(null);

  const { getSelectedCurrencyDetails,
    getSelectedCurrencySuccess } = useSelector((state) => {
      return {
        getSelectedCurrencyDetails: state.ecommerceCurrency.getCurrencyData.data,
        getSelectedCurrencySuccess: state.ecommerceCurrency.getCurrencyData.success

      }
    })

  const [openDropDown, setOpenDropDown] = useDetectOutsideClick(openref, false);
  const [isOver, setIsOver] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("Indian rupee");
  const [selectedISOCode, setSelectedISOCode] = useState("INR");
  // const [currencydata, setCurrencydata] = useState([]);


  useEffect(() => {
    if (getSelectedCurrencySuccess && getSelectedCurrencyDetails &&
      getSelectedCurrencyDetails.primaryCurrency) {
      setSelectedCurrency(getSelectedCurrencyDetails.primaryCurrency.currency)
      setSelectedISOCode(getSelectedCurrencyDetails.primaryCurrency.ISOCode)
    }
  }, [getSelectedCurrencyDetails, getSelectedCurrencySuccess])

  const handleSelectCurrency = (item) => {
    if (type === "secondary") {
      currencyRow[data]["currency"] = item.currency;
      currencyRow[data]["ISOCode"] = item.ISOCode;
      currencyRow[data]["Rate"] = item.ISOCode;
      setCurrencyRow([...currencyRow]);
    }
    else {
      setSelectedCurrency(item.currency);
      setSelectedISOCode(item.ISOCode);
    }
    setOpenDropDown(!openDropDown);
    setOnChange(true);
  }

  const handleOpenDrop = () => {
    setOpenDropDown(!openDropDown);
  }

  const handleChangeBgColr = () => {
    setIsOver(!isOver);
  }

  useEffect(() => {
    onLoadPrimaryCurrencyInfo({
      currency: selectedCurrency,
      ISOCode: selectedISOCode
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency, selectedISOCode])

  return (
    <React.Fragment>
      <div className='currencyDropnDownContainer'>
        <div className="category-dropdown">
          <button className="categoryDropDpwn-btn"
            onClick={handleOpenDrop}>
            {type === "primary" ?
              <>
                {selectedCurrency && selectedISOCode ? `${selectedCurrency} - ${selectedISOCode}` : "Select Currency"}
              </>
              :
              <>
                {currencyRow && currencyRow.length && currencyRow[data].currency ? `${currencyRow[data].currency} - ${currencyRow[data].ISOCode}` : "Select Currency"}
              </>
            }

            <i className={`icon-openIcon icons icon-dropdown icons-s ${openDropDown ? 'rotate-icon' : ''}`}> </i>
          </button>
          <div className={`dropdown-content ${openDropDown ? '' : 'displayShow '} ${position === 'top' ? 'top' : 'bottom'}`} ref={openref}>
            <ul>
              {currencydata.length ? currencydata.map((item, key) => {
                return (
                  <li key={key} onClick={() => handleSelectCurrency(item)}>
                    <p className='w-300'>{item?.currency}</p> <span>-</span> <p className='w-500'>{item?.ISOCode}</p>
                  </li>
                );
              })
                :
                "No records found."
              }
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CurrencyDropDown