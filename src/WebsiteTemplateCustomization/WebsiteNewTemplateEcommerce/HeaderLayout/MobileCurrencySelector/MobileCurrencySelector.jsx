import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { selectCurrency } from '../../../../store/actions/ecommerce/action/currency';
import DropDownList from '../CurrencySelector/DropDownList/DropDownList'
import './mobileCurrencySelector.scss';

const MobileCurrencySelector = (props) => {
  const [currencyList, setCurrencyList] = useState([]);

  const { currency, selectedCurrency, primaryCurrency } = useSelector((state) => { 
    return {
      currency: state.currencyList,
      selectedCurrency: state.currencyList.selectedCurrency,
      primaryCurrency: state.currencyList.primaryCurrency,
    };
  });

  const history = useNavigate();
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
  }, []);

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

  const [shopDropdown,setshopDropdown] = useDetectOutsideClick(dropRef,false);
  const handleShowDropdown = () => {
    setshopDropdown(!shopDropdown);
  }

  const selectCurrencyHandler = (val) => { 
    dispatch(selectCurrency(val));
    // console.log(val);
  };

  const navigateToPreviousPage = () => {
    history.goBack();
  }
  return (
<div className='containerTrue pb-45 '> 
  <div className='mobile-Selector-container'>
    <div className='showDropdown-container'>
    <div className='currency-wrap'>
      <DropDownList type="currency" label={'Currency'} list={currencyList} selectionMaker={(val) => {selectCurrencyHandler(val)}} />
    </div>
    <div className='lanuage-wrap'>
      <DropDownList type="language" label={'Languages'}  />
    </div>
    <div className='btn-wrap'>
      <button className='buttonTrue btnTrue-primary btn-block btn-xs btn-apply' onClick={navigateToPreviousPage}>Apply</button>
    </div>
 </div>
 </div>
 </div>
  )
}

export default MobileCurrencySelector