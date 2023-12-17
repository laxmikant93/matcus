import React, { useRef, useState, useEffect } from 'react';
import './currencySelector.scss';
import Flag from '../../assets/images/indianFlag.png'
import DropDownList from './DropDownList/DropDownList';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrency } from '../../../../store/actions/ecommerce/action/currency';
import { Link } from 'react-router-dom';
import "../../../../Common/CountryFlag/flags.scss"

const CurrencySelector = () => {
  const [currencyList, setCurrencyList] = useState([]);

  const { currency, selectedCurrency, primaryCurrency } = useSelector((state) => {
    return {
      currency: state.currencyList,
      selectedCurrency: state.currencyList.selectedCurrency,
      primaryCurrency: state.currencyList.primaryCurrency,
    };
  });

  const dropRef = useRef()
  const dispatch = useDispatch();
  const [innerWindow, setWindow] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindow({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.addEventListener("resize", handleResize);
  }, [])

  useEffect(() => {
    let curr = [];
    if (currency.primaryCurrency && currency.primaryCurrency.success) {
      if (currency.primaryCurrency.data) curr.push(currency.primaryCurrency.data);
    }
    if (currency.secondaryCurrency && currency.secondaryCurrency.success) {
      if (currency.secondaryCurrency.data) curr = [...curr, ...currency.secondaryCurrency.data];
    }
    curr.length && setCurrencyList([...curr]);
  }, [currency]);

  const [shopDropdown, setshopDropdown] = useDetectOutsideClick(dropRef, false);
  const handleShowDropdown = () => {
    setshopDropdown(!shopDropdown);
  }

  const currRef = useRef();
  currRef.current = (selectedCurrency || primaryCurrency) &&
    (selectedCurrency.data || primaryCurrency.data) &&
    (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) &&
    (selectedCurrency.data || primaryCurrency.data);

  const selectCurrencyHandler = (val) => {
    currRef.current = val;
    // dispatch(selectCurrency(val));
    // console.log(val);
    // handleShowDropdown();
  };
  const currencyApplyHandler = () => {
    dispatch(selectCurrency(currRef.current));
    handleShowDropdown();
  }
  return (
    <div className='currencySelector-container' ref={dropRef}>
      {innerWindow.width <= 992  ? <Link to={'/ecom-currency-selector'}>
        <button className='currentSelect-button' onClick={handleShowDropdown}>
          {/* <img src={Flag} alt="flag" className="flag-img" /> */}
          <div className='dropdown-content-wrap'>
            <p className='dropDown-content-text'>
              {
                (selectedCurrency || primaryCurrency) &&
                (selectedCurrency.data || primaryCurrency.data) &&
                (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) ?
                  <i class={`flag flag-${(selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode).slice(0, 2).toLowerCase()}`}></i> :
                  <i class={`flag flag-in`}></i>
              }
              {' '}
              {
                (selectedCurrency || primaryCurrency) &&
                  (selectedCurrency.data || primaryCurrency.data) &&
                  (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) ?
                  (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) :
                  `INR`
              }
              {' '}
              {
                (selectedCurrency || primaryCurrency) &&
                  (selectedCurrency.data || primaryCurrency.data) &&
                  (selectedCurrency.data.symbol || primaryCurrency.data.symbol) ?
                  (`(${selectedCurrency.data.symbol || primaryCurrency.data.symbol})`) :
                  `(₹)`
              }
            </p>
            <span></span>
            <span>  </span>
            <span><i className={`icon icon-s icon-dropDown ${shopDropdown ? '' : 'icon-rotate'}`}></i></span>
          </div>
        </button>
      </Link> :
      <div>
        <button className='currentSelect-button' onClick={handleShowDropdown}>
          {/* <img src={Flag} alt="flag" className="flag-img" /> */}
          <div className='dropdown-content-wrap'>
            <p className='dropDown-content-text'>
              {
                (selectedCurrency || primaryCurrency) &&
                (selectedCurrency.data || primaryCurrency.data) &&
                (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) ?
                  <i class={`flag flag-${(selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode).slice(0, 2).toLowerCase()}`}></i> :
                  <i class={`flag flag-in`}></i>
              }
              {' '}
              {
                (selectedCurrency || primaryCurrency) &&
                  (selectedCurrency.data || primaryCurrency.data) &&
                  (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) ?
                  (selectedCurrency.data.ISOCode || primaryCurrency.data.ISOCode) :
                  `INR`
              }
              {' '}
              {
                (selectedCurrency || primaryCurrency) &&
                  (selectedCurrency.data || primaryCurrency.data) &&
                  (selectedCurrency.data.symbol || primaryCurrency.data.symbol) ?
                  (`(${selectedCurrency.data.symbol || primaryCurrency.data.symbol})`) :
                  `(₹)`
              }
            </p>
            <span></span>
            <span>  </span>
            <span><i className={`icon icon-s icon-dropDown ${shopDropdown ? '' : 'icon-rotate'}`}></i></span>
          </div>
        </button>
      </div>}
      {/* {
         innerWindow.width <=992 
      } */}

      {
        shopDropdown && (innerWindow.width > 992) && (
          <div className='showDropdown-container'>
            <div className='currency-wrap'>
              <DropDownList type="currency" label={'Currency'} curr={currRef.current} list={currencyList} selectionMaker={(val) => { selectCurrencyHandler(val) }} />
            </div>
            {/* <div className='lanuage-wrap'>
              <DropDownList type="language" label={'Languages'}  />
              <MultiLanguage />
            </div> */}
            <div className='btn-wrap'>
              <button className='buttonTrue btnTrue-primary btn-block btn-xs btn-apply' onClick={currencyApplyHandler}>Apply</button>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default CurrencySelector