import React from 'react'
import ShoppingCard from '../ShoppingCard/ShoppingCard';
import './shippingRates.scss';
import SingleSelectDropdown from '../../../../Common/Form/SingleSelectDropdown'
import SelectInput from '../../../../Common/Form/SelectInput';
import FormInput from '../../../../Common/Form/FormInput';
import FormError from '../../../../Common/Form/FormError';
import { useState } from 'react';
import { useEffect } from 'react';
import FreeShippingDropDown from '../FreeShippingDropDown/FreeShippingDropDown';
import { useSelector } from 'react-redux';
import ValidationFile from '../../../../Classes/ValidationFile';
import { v4 as uuid } from 'uuid';
const ShippingRates = ({ inputValue, saveError, onLoadShippingRates, isAddCountryOpen }) => {
  const symbolsArray = ["e", "E", "+", "-", "."]
  const unique_id = uuid();
  const smallId = unique_id.slice(0, 16)
  const { user, singleShipping, singleShippingSuccess } = useSelector((state) => {
    return {
      countries: state.countries,
      user: state.user,
      singleShipping: state.shipping.single.data,
      singleShippingSuccess: state.shipping.single.success,
    }
  });
  const [ShippingRateInput, setShippingRateInput] = useState([{
    shipping_title: "",
    shipping_option_name: "",
    estimated_delivery_time: "",
    rate: "",
    key: smallId
  }])
  // console.log("line 15", ShippingRateInput)

  const handleInput = (e, key, name, type) => {
    let inputValue = type === "number" ? parseInt(e.target.value) : ValidationFile.spaceNotAccept(e.target.value)
    let array = ShippingRateInput
    array[key][name] = inputValue
    setShippingRateInput([...array])
  }
  const addMoreShipingRate = () => {
    let array = ShippingRateInput;
    array.push({
      shipping_title: "",
      shipping_option_name: "",
      estimated_delivery_time: "",
      rate: "",
      key: smallId
    });
    setShippingRateInput([...array])
  }
  const deleteShippingRate = (key) => {
    let array = ShippingRateInput
    array.splice(key, 1)
    setShippingRateInput([...array])
  }

  const handleSelect = (value, key) => {
    let array = ShippingRateInput
    array[key]['shipping_title'] = value
    array[key]['rate'] = 0
    setShippingRateInput([...array])
  }
  const [condition, setCondition] = useState(false)
  useEffect(() => {
    if (ShippingRateInput.every((item) => (item.shipping_title === "FlatShipping" || item.shipping_title === ""))) {
      setCondition(false)
    } else {
      setCondition(true)
    }
  }, [ShippingRateInput])
  useEffect(() => {
    onLoadShippingRates({
      shippingRates: ShippingRateInput
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShippingRateInput])
  useEffect(() => {
    if (singleShippingSuccess && singleShipping) {
      setShippingRateInput(singleShipping.shipping_rate)
    }
  }, [singleShipping, singleShippingSuccess])
  useEffect(() => {
    if (!isAddCountryOpen) {
      setShippingRateInput({
        shipping_title: "",
        shipping_option_name: "",
        estimated_delivery_time: "",
        rate: "",
      })
    }
  }, [isAddCountryOpen])

  return (

    <div className='shippingRate-section'>
      <ShoppingCard>
        <div className='shippingRate-icon-section'>
          <div className='icon-wrap'>
            <i className='ed-icon i-xs primary icon-rupeeCircle'></i>
          </div>
          <div className='shippingRate-wrap'>
            <p className='base w-500 text-shippingCountry'>Shipping rates</p>
            <p className='text-xxs baseL w-400 para-shippingCountry'>Apply shipping rates for this country</p>
          </div>
        </div>
        <div className='hr-line mt-25 mb-15'></div>

        {
          ShippingRateInput.map((item, key) => (
            <div className='shippingRate-calulateSectiion'>
              <div className='calulateSection-dropdownSection formFieldwrap'>
                <FreeShippingDropDown onselect={(val) => handleSelect(val, key)} value={item.shipping_title} condition={(item.shipping_title === "FreeShipping") ? false : condition} />
                <FormError
                  show={saveError && !ShippingRateInput[key]['shipping_title']}
                  error="Shipping option name required"
                />
                <div className='shipping-btn-wrapper '>
                  <button className='  button-white delete-btn' onClick={() => deleteShippingRate(key)} aria-disabled={ShippingRateInput.length === 1} >  <i className='delete-icon-trash'></i> Delete</button>
                </div>
              </div>
              <div className='shippingRate-optionsWrap'>
                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Shipping option name"
                    labelPosition={'top'}
                    id="shipping_name"
                    name="title"
                    onChange={(e) => handleInput(e, key, "shipping_option_name")}
                    onKeyUp={(e) => handleInput(e, key, "shipping_option_name")}
                    value={item.shipping_option_name}
                    placeholder="e.g., Free Shipping"
                    maxLength="80"
                  />
                  <FormError
                    show={saveError && !ShippingRateInput[key]['shipping_option_name']}
                    error="Shipping option name required"
                  />
                </div>

                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Estimated Delivery Time"
                    labelPosition={'top'}
                    id="delivery_time"
                    onChange={(e) => handleInput(e, key, "estimated_delivery_time")}
                    onKeyUp={(e) => handleInput(e, key, "estimated_delivery_time")}
                    name="delivery_time"
                    value={item.estimated_delivery_time}
                    placeholder="e.g., 3 to 5 Business Days"
                    maxLength="80"
                  />
                  <FormError
                    show={saveError && !ShippingRateInput[key]['estimated_delivery_time']}
                    error="Estimated Delivery Time required."
                  />
                </div>
                <div className='rate-div-wrap'>
                  <div className="formFieldwrap">
                    <FormInput
                      type="number"
                      label="Rate"
                      labelPosition={'top'}
                      id="rate"
                      name="rate"
                      onChange={(e) => handleInput(e, key, "rate", "number")}
                      onKeyUp={(e) => handleInput(e, key, "rate", "number")}
                      value={item.rate === 0 ? "" : item.rate}
                      placeholder="  0"
                      maxLength="80"
                      onKeyDown={(e) =>
                        symbolsArray.includes(e.key) && e.preventDefault()
                      }
                      disabled={item.shipping_title === "FreeShipping" ? true : false}
                    />

                  </div>
                  <p className='ruppe-symbol'>₹</p>
                </div>

              </div>
              <div className='hr-line mt-4 mb-25'></div>



            </div>
          ))

        }
        <div className='addMore-section'>
          <button className='addMore-section-btn primary' type=' button' onClick={addMoreShipingRate} >+Add more shipping options</button>
        </div>
      </ShoppingCard >
    </div >
  )
}

export default ShippingRates