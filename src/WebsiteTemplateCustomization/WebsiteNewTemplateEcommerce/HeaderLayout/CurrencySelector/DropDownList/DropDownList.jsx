import React from 'react';
import { useState } from 'react';
import './dropDownList.scss';
import Flag from '../../../assets/images/indianFlag.png'
import { useRaf } from 'rooks';
import { useRef } from 'react';
import { useDetectOutsideClick } from '../../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import "../../../../../Common/CountryFlag/flags.scss"

const DropDownList = ({ type, label, curr, list, selectionMaker }) => {
  const [symbol, setSymbol] = useState(`(₹)`);
  const [currency, setCurrency] = useState(`Indian Rupee`);
  const [ISO, setISO] = useState(`INR`);

  const { selectedCurrency, primaryCurrency } = useSelector((state) => {
    return {
      selectedCurrency: state.currencyList.selectedCurrency,
      primaryCurrency: state.currencyList.primaryCurrency,
    };
  });

  const dropRef = useRef(null);

  const [openDropDown, setOpenDropDown] = useDetectOutsideClick(dropRef, false);
  const handleOpenDrop = () => {
    setOpenDropDown(!openDropDown);
  }

  useLayoutEffect(() => {
    setSymbol(
      (selectedCurrency || primaryCurrency) &&
        (selectedCurrency.data || primaryCurrency.data) &&
        (selectedCurrency.data.symbol || primaryCurrency.data.symbol) ?
        (selectedCurrency.data.symbol || primaryCurrency.data.symbol) :
        `(₹)`
    );
    setCurrency(
      (selectedCurrency || primaryCurrency) &&
        (selectedCurrency.data || primaryCurrency.data) &&
        (selectedCurrency.data.currency || primaryCurrency.data.currency) ?
        (selectedCurrency.data.currency || primaryCurrency.data.currency) :
        `Indian Rupee`
    );
    setISO(
      (selectedCurrency || primaryCurrency) &&
        (selectedCurrency.data || primaryCurrency.data) &&
        (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) ?
        (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) :
        `INR`
    );
  }, [selectedCurrency, primaryCurrency]);

  const currencyHandler = (v) => {
    selectionMaker(v);
    setSymbol(v.symbol);
    setCurrency(v.currency);
    setISO(v.ISOCode);
  }

  const dataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9]
  return (
    <div className='currencyDropDown-container'>
      <div className="category-dropdown">
        <div className='label-dropdown'>
          <p className='lable-dropdown-text'>{label}</p>
        </div>
        <button className="categoryDropDpwn-btn"
          onClick={handleOpenDrop} ref={dropRef}>
          <div className='dropDown-btn-content'>
            {
              type === 'currency' ? (
                <React.Fragment>
                  {/* for currency  */}

                  <p className='dropDown-content-p'>
                    <span>
                      <i class={`flag flag-${ISO.slice(0, 2).toLowerCase()}`}></i>

                    </span>
                    {/* <span>
                      {
                        // (selectedCurrency || primaryCurrency) &&
                        // (selectedCurrency.data || primaryCurrency.data) &&
                        // (selectedCurrency.data.currency || primaryCurrency.data.currency) ?
                        // (selectedCurrency.data.currency || primaryCurrency.data.currency) :
                        // curr.currency ? curr.currency : 
                        // `Indian Rupee`
                        currency
                      }
                    </span>
                    <span>-</span> */}
                    <span>
                      {
                        // (selectedCurrency || primaryCurrency) &&
                        // (selectedCurrency.data || primaryCurrency.data) &&
                        // (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) ?
                        // (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) :
                        // curr.ISOCode ? curr.ISOCode : 
                        // `INR`
                        ISO
                      }

                    </span>
                    <span>
                      {
                        //   (selectedCurrency || primaryCurrency) &&
                        //   (selectedCurrency.data || primaryCurrency.data) &&
                        //   (selectedCurrency.data.symbol || primaryCurrency.data.symbol) ?
                        // (selectedCurrency.data.symbol || primaryCurrency.data.symbol) :
                        // curr.symbol ? curr.symbol : 
                        //   `(₹)`
                        `(${symbol})`
                      }
                    </span>
                  </p>

                </React.Fragment>
              ) : type === 'language' ? (<p className='dropDown-content-p'>Hindi</p>) : ''
            }


          </div>  <i className={`icon icon-dropDown  icon-xs ${openDropDown ? '' : 'rotate-icon'}`}> </i> </button>
        <ul className={`dropdown-content ${openDropDown ? '' : 'displayShow '}`} >

          {
            list && list.length ? list.map((v) => (
              <li className='dropDown-content-li' onClick={() => currencyHandler(v)}>
                <div className='dropDown-contents-list'>
                  {
                    type === 'currency' ? (
                      <React.Fragment>
                        {/* <img src= {Flag} alt="" className='flag-image' /> */}
                        {/* <p>{v.symbol }</p> */}
                        <div className='text-wrap' title={`${v.currency} - ${v.ISOCode} - ${v.symbol}`}>
                          <p>
                            <span>
                              <i class={`flag flag-${v.ISOCode.slice(0, 2).toLowerCase()}`}></i>
                            </span>
                            <span>{v.currency}</span>
                            <span>{v.ISOCode}</span>
                            <span>({v.symbol})</span>
                          </p>
                        </div>
                      </React.Fragment>
                    ) : type === 'language' ? (
                      <p className='language-list-p'>Hindi</p>
                    ) : ''
                  }



                </div>

              </li>
            )) :
              <li className='dropDown-content-li'>
                <div className='dropDown-contents-list'>
                  {
                    type === 'currency' ? (
                      <React.Fragment>
                        <img src={Flag} alt="" className='flag-image' />
                        <div className='text-wrap'>
                          <p>{`Indian rupee - INR (₹)`}</p>
                        </div>
                      </React.Fragment>
                    ) : type === 'language' ? (
                      <p className='language-list-p'>Hindi</p>
                    ) : ''
                  }
                </div>

              </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default DropDownList