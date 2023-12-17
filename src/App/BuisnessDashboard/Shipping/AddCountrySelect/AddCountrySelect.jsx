import React from 'react'
import ShoppingCard from '../ShoppingCard/ShoppingCard';
import './addCountrySelect.scss'
import CountrySelect from '../../../../Common/Form/CountrySelect';
import FormError from '../../../../Common/Form/FormError'
import SelecStatePopup from './SelectStatePopup/SelecStatePopup';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import CountryStateFlagDropdown from '../../../../Common/CountryFlag/CountryStateFlag';
const AddCountrySelect = ({ handleSetCoutry, inputValue, saveError, isAddCountryOpen }) => {
  const openpopup = useRef(null);
  const { countries, existingStates } = useSelector((state) => {
    return {
      countries: state.countries,
      existingStates: state.shipping.existingStates.data
    }
  });
  const onOpenRejectOrder = () => {
    if (inputValue.country && countries.states && countries.states.length)
      openpopup.current.open()
  }
  const onCloseRejectOrder = () => {
    openpopup.current.close()
  }
  const [autoCheckState, setAutoCheckState] = useState(false)

  const handleCountryFlag = (data) => {
    handleSetCoutry(data.country, "country")
    handleSetCoutry(data.value, "countryFlag")
    setAutoCheckState(true)
  }
  return (
    <div className='shappingRate-section'>
      <ShoppingCard>
        <div className="formFieldwrap">
          {/* <CountrySelect
            name="select_country"
            id="select_country"
            value={inputValue.country}
            // onSelect={(value) => set_institute_country(value)}
            // onEvent={handleInput}
            autoevent={true}
            onSelect={(data) => handleSetCoutry(data, "country")}
          // label="Select country"
          // className={
          //   institute_country_error && isSubmit ? "errorInput" : ""
          // }
          /> */}
          <CountryStateFlagDropdown
            CountryCode={false}
            label="Select Country"
            onSelect={(data) => handleCountryFlag(data)}
            selectedCountry={inputValue.country}
            selectedFlag={inputValue.countryFlag}
            CountryName={true}
          />
          <FormError
            show={saveError && !inputValue.country}
            error="Please select country."
          />
        </div>
        <div className='state-section'>
          <p className=' text-xs w-500 base state-lable'>
            Select States
          </p>
          <div className='state-input-wraper' role={""}>
            <div className='state-text'>
              <p className='text-xxs primary w-500'>{inputValue && inputValue.state ? inputValue.state.length : 0} states and Union territories</p>
            </div>
            <div className='select-input-edit'>
              <button className='button btn-3xs edit-btn ' onClick={() => { onOpenRejectOrder() }}> <i className='ed-icon primary i-xs icon-pencial'></i> Edit </button>
            </div>
          </div>
        </div>
        {
          inputValue.country && countries.states.length > 0 && <SelecStatePopup autoCheckState={autoCheckState} openpopup={openpopup} isAddCountryOpen={isAddCountryOpen} onclose={onCloseRejectOrder} countryState={countries.states.length > 0 ? countries.states : []} handleSetCoutry={handleSetCoutry} inputValue={inputValue} />
        }

      </ShoppingCard>
    </div>
  )
}

export default AddCountrySelect