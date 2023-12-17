import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import ShippingRates from '../../../../../App/BuisnessDashboard/Shipping/ShippingRates/ShippingRates';
import Request from '../../../../../Classes/Request';
import './shipping.scss';
import { convertToIndianFormat } from '../../../../../CommonFunctions/helperFunction';
import { priceCalculator } from '../../commonFunction/PriceCalculator';

const Shipping = ({ shippingRate, apiHit }) => {

  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite);
  const { shippingDetailsSuccess, shippingDetails, subdomainuser, currency } = useSelector((state) => {
    return {
      shippingDetailsSuccess: state.orderCartList.shippingDetails.success,
      shippingDetails: state.orderCartList.shippingDetails.data,
      subdomainuser: state.subdomainuser,
      currency: state.currencyList,
    }
  })

  const ShippingTypeRequest = new Request();
  const [currentActive, setcurrentActive] = useState(1);
  const handleCurrentActive = async (item) => {
    setcurrentActive(item._id);
    shippingRate((item.rate) + (shippingDetails.deliveryCharges ? shippingDetails.deliveryCharges : 0))
    if (apiHit) {
      await ShippingTypeRequest.post(ShippingTypeRequest.url("/productService/updateshippingpricecart", "ecommerce"),
        {
          user: subdomainuser._id,
          business: success && data._id,
          price: parseInt(parseInt(item.rate) + parseInt(shippingDetails.deliveryCharges ? shippingDetails.deliveryCharges : 0)),
        },
        (success) => {
        },
        (error) => {

        }
      );
    }
  }
  useEffect(() => {
    if (shippingDetailsSuccess) {
      if (shippingDetails.available_shippings && shippingDetails.available_shippings.length > 0) {
        shippingRate((shippingDetails.available_shippings[0].rate) + (shippingDetails.deliveryCharges ? shippingDetails.deliveryCharges : 0))
        setcurrentActive(shippingDetails.available_shippings[0]._id)
      }
      // shippingRate(shippingDetails.deliveryCharges ? shippingDetails.deliveryCharges : 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingDetails.deliveryCharges, shippingDetailsSuccess])

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }


  return (
    <div className='free-shipping-wrapper'>
      {
        shippingDetailsSuccess ?
          shippingDetails.available_shippings && shippingDetails.available_shippings.length ? shippingDetails.available_shippings.map((item, key) => {
            return (
              <div key={key} className={`free-shipping-container-wrap ${currentActive === item._id ? 'border-color' : ''}`} onClick={() => { handleCurrentActive(item) }}>
                <div className='free-shipping-container'>
                  <div className='radioAddress-wrap'>
                    <input type="radio" name={key} checked={currentActive === item._id ? true : false} className='change-address-radio' />
                  </div>
                  <div className='free-shipping-item'>
                    <p className='free-shipping-heading'>{item?.shipping_option_name}</p>
                    <p className='shipping-time-item'>{item.estimated_delivery_time} days</p>
                  </div>
                </div>
                <p className='secondary'>
                  {item.shipping_title === "FlatShipping" ? <> {getPrice(item.rate)}</> : "FREE"}
                </p>
              </div>
            )
          }) : "" : ""
      }
    </div>
  )
}

export default Shipping