import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AppLink from '../../../Common/AppLink';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import Card from '../../../Common/Card';
import CardBody from '../../../Common/Card/CardBody';
import { createShipping, editShipping, getExistingStates, getSingleShipping, resetCreateShipping, resetEditShipping, resetSingleShipping } from '../../../store/actions/shipping';
import Varientpopup from '../../Dashboard/EcommerceDashboard/Component/VarientPopup/Varientpopup';
import './shipping.scss';
import ShippingCountry from './ShippingCountry/ShippingCountry';
import ShoppingCard from './ShoppingCard/ShoppingCard';

const Shipping = () => {
  const history = useNavigate()
  const { id } = useParams()
  const { user, singleShipping, singleShippingSuccess, createShippingLoading, createShippingSuccess, editShippingLoading, editShippingSuccess } = useSelector((state) => {
    return {
      countries: state.countries,
      user: state.user,
      singleShipping: state.shipping.single.data,
      singleShippingSuccess: state.shipping.single.success,
      createShippingLoading: state.shipping.create.loading,
      createShippingSuccess: state.shipping.create.success,
      editShippingLoading: state.shipping.edit.loading,
      editShippingSuccess: state.shipping.edit.success
    }
  });
  const [saveError, setSaveError] = useState(false)
  const [zoneList, setZoneList] = useState([])
  const [shippingRates, setShippingRates] = useState([])
  const [pinCode, setPinCode] = useState("")
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState({
    country: "",
    countryFlag: "",
    state: [],
    Store_pincode: ""
  });
  const [isAddCountryOpen, setIscountryOpen] = useState(id ? true : false);
  const handleAddCountryOpen = () => {
    setIscountryOpen(!isAddCountryOpen)
  }

  const handleSetCoutry = (data, name) => {
    // console.log("line 50", data, name);
    switch (name) {
      case "country": {
        inputValue[name] = data;
        inputValue[name + "IsValid"] = true
        break;
      }
      case "countryFlag": {
        inputValue[name] = data;
        inputValue[name + "IsValid"] = true
        break;
      }
      default: {
        inputValue[name] = data;
        inputValue[name + "IsValid"] = true
        break;
      }
    }
    setInputValue({ ...inputValue });
  }
  const handleCancel = () => {
    if (id) {
      history('/ecommerce/shipping')
    }
    handleAddCountryOpen()
    setSaveError(false)
  }
  const handleLoadZoneList = (val) => {
    setZoneList(val.zoneList)
    setPinCode(val.pinCode)
  }
  const dataPrep = () => {
    return {
      country: inputValue.country,
      state: inputValue.state,
      countryFlag: inputValue.countryFlag,
      business: user.user_business,
      shipping_rate: shippingRates,
      Store_pincode: pinCode,
      Zones: zoneList
    }
  }
  const handleShippingRates = (val) => {
    setShippingRates(val)
  }

  const handleSave = () => {
    if (inputValue.country && shippingRates.every((item) => item.shipping_option_name !== "" && item.shipping_title !== "" && item.estimated_delivery_time !== "" && item.rate !== "")) {
      if (id) {
        // if (zoneList.length > 0 && pinCode) {
        dispatch(editShipping(dataPrep(), id))
        // }
      } else {
        // if (zoneList.length > 0 && pinCode) {
        dispatch(createShipping(dataPrep(), user.user_business))
        // }
      }
      setSaveError(false)
    } else {
      setSaveError(true)
    }
  }
  useEffect(() => {
    if (id) {
      dispatch(getSingleShipping(id, user.user_business))
    }
  }, [dispatch, id, user.user_business])
  useEffect(() => {
    if (isAddCountryOpen && !id) {
      dispatch(getExistingStates(user.user_business, ""))
    }
  }, [dispatch, id, isAddCountryOpen, user.user_business])
  useEffect(() => {
    if (singleShippingSuccess && singleShipping) {
      let data = {
        country: singleShipping.country,
        state: singleShipping.state,
        countryFlag: singleShipping?.countryFlag,
        Store_pincode: singleShipping.Store_pincode
      }
      setInputValue({ ...data })
    }
  }, [shippingRates.Store_pincode, singleShipping, singleShippingSuccess])
  useEffect(() => {
    if (createShippingSuccess) {
      handleAddCountryOpen()
      dispatch(resetCreateShipping())
    } else if (editShippingSuccess) {
      handleAddCountryOpen()
      dispatch(resetEditShipping())
      history('/ecommerce/shipping')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createShippingSuccess, editShippingSuccess])
  useEffect(() => {
    if (!isAddCountryOpen) {

      if (singleShippingSuccess) {
        dispatch(resetSingleShipping())
      }
    }
  }, [dispatch, isAddCountryOpen, singleShippingSuccess])

  useEffect(() => {
    if (!isAddCountryOpen) {
      setInputValue({
        country: "",
        state: [],
        Store_pincode: "",
        countryFlag: "",
      })
    }
  }, [isAddCountryOpen])
  useEffect(() => {
    if (id) {
      if (isAddCountryOpen) {
        dispatch(getExistingStates(user.user_business, id))
      }
    }
  }, [dispatch, id, isAddCountryOpen, user.user_business])
  return (
    <React.Fragment>
      <div className='shipping-container'>
        <Breadcrumb>
          <BreadcrumbItem to="/dashboard" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/shipping" title="Shipping" />
        </Breadcrumb>
        
        <div className='heading-container'>
          <div className='heading-leftSide'>
            <AppLink to={'/'} >
              <div className='backcircle'>
                <i className='ed-icon primary i-xxs icon-arrow '></i>
              </div>

            </AppLink>
            <div className='text-heading-div'>
              <h3 className=' text-heading text-md w-600 base'>Shipping & Delivery</h3>
              <p className='text-2xs base w-300 delivery-text'>Manage your delivery settings here.</p>
            </div>
          </div>
          {isAddCountryOpen &&
            <React.Fragment>
              {id && !singleShippingSuccess ? "" :
                <div className='heading-rightSide'>
                  <button className='button btn-xs btn-o-silver' type='button' onClick={handleCancel}>Cancel</button>
                  {
                    createShippingLoading || editShippingLoading ?
                      <button className='button btn-xs button-primary' type='button'>Saving...</button> :
                      <button className='button btn-xs button-primary' type='button' onClick={handleSave}>Save</button>
                  }

                </div>
              }    </React.Fragment>}
        </div>

        <div className='hr-line mt-20'></div>
        <div className='shipping-lower-wrap'>
          <ShippingCountry handleSetCoutry={handleSetCoutry} saveError={saveError} isAddCountryOpen={isAddCountryOpen} handleAddCountryOpen={handleAddCountryOpen} inputValue={inputValue} onLoadZoneList={handleLoadZoneList} shippingRateDetails={handleShippingRates} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Shipping