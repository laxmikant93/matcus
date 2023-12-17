import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddCountrySelect from '../AddCountrySelect/AddCountrySelect';
import PinCode from '../PinCode/PinCode';
import ShippingRates from '../ShippingRates/ShippingRates';
import ShoppingCard from '../ShoppingCard/ShoppingCard';
import ShipingCountryListing from './ShipingCountryListing';
import './shippingCountry.scss';

const ShippingCountry = ({ handleSetCoutry, saveError, inputValue, shippingRateDetails, isAddCountryOpen, handleAddCountryOpen, onLoadZoneList, countryPopup }) => {
  const { id } = useParams();
  const { singleShipping, singleShippingSuccess, singleShippingLoading } = useSelector((state) => {
    return {
      singleShipping: state.shipping.single.data,
      singleShippingSuccess: state.shipping.single.success,
      singleShippingLoading: state.shipping.single.loading
    }
  });

  const [shippingRates, setShippingRates] = useState([])
  const handleShippingRates = (val) => {
    // console.log(val, "sr")
    setShippingRates(val.shippingRates)
    shippingRateDetails(val.shippingRates)
  }

  return (
    <React.Fragment>
      <div className='shippingCountries-section'>
        <React.Fragment>
          {id && !singleShippingSuccess ? (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          ) : (
            <React.Fragment>
              <ShoppingCard>
                <div className='shippingContries-container-or-dilevery'>
                  <div className='contiries-lefside'>
                    <div className='contiriesLeftside-icon'>
                      <i className='ed-icon primary icon-shipping'></i>
                    </div>
                    <div className='contiriesLeftside-text'>
                      <p className='base w-500 text-shippingCountry'>Shipping Countries</p>
                      {
                        !isAddCountryOpen ? (<p className='text-xxs baseL w-400 para-shippingCountry'>Add the countries your products are shipped to </p>) : (< p className='text-xxs baseL w-400 para-shippingCountry'>Add the countries your products are shipped and shipping rates. Also manage delivery by pincode/distance</p>)
                      }
                    </div>
                  </div>
                  {
                    !isAddCountryOpen && (
                      <div className='contiries-lefright'>
                        <button className='button btn-xs button-primary' onClick={() => handleAddCountryOpen()}>Add Country</button>
                      </div>
                    )
                  }
                </div>
              </ShoppingCard>
              {
                isAddCountryOpen && (
                  <div className='shippingContries-expend-container'>

                    <AddCountrySelect handleSetCoutry={handleSetCoutry} saveError={saveError} isAddCountryOpen={isAddCountryOpen} inputValue={inputValue} />
                    <ShippingRates inputValue={inputValue} saveError={saveError} isAddCountryOpen={isAddCountryOpen} onLoadShippingRates={handleShippingRates} />
                    <PinCode shippingRates={shippingRates} onLoadZoneList={onLoadZoneList} isAddCountryOpen={isAddCountryOpen} />
                  </div>
                )
              }
            </React.Fragment>
          )
          }
        </React.Fragment>
        {/* ShipingCountryListing */}
        {
          !isAddCountryOpen && <ShipingCountryListing />
        }

      </div>
    </React.Fragment >
  )
}

export default ShippingCountry