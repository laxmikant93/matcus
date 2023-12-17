import React from 'react';
import CountrySelect from '../../../../../Common/Form/CountrySelect';
import PhoneInput from 'react-phone-input-2';
import FormError from '../../../../../Common/Form/FormError';
import FormInput from '../../../../../Common/Form/FormInput';
import StateSelect from '../../../../../Common/Form/StateSelect';
import Modal from '../../../../../Common/Modal';
import ModalBody from '../../../../../Common/Modal/ModalBody';
import ModalFooter from '../../../../../Common/Modal/ModalFooter';
import ModalHeader from '../../../../../Common/Modal/ModalHeader';
import './addressModal.scss';

const AddressPopUp = ({ submitHandler, code, setCountryCode, onClose, show, data, fullname, fullnameV, mobile, countryV, mobileV, country, pinCode, pinCodeV, city, cityV, state, stateV, showError, address, userAddressV, address1, userAddressV1, landmark, landmarkV }) => {

  // const AddressPopUp = ({ submitHandler, onClose, show, data, fullname, fullnameV, mobile, mobileV, pinCode,
  //   pinCodeV, city, cityV, state, stateV, showError, address, userAddressV, address1, userAddressV1, landmark,
  //   landmarkV, code, setCountryCode }) => {

  const closeModal = () => {
    onClose()
  }

  const handlePhoneInput = (inputValue, countryDetail) => {
    let dialCode = countryDetail.dialCode;
    let mob = inputValue.replace(dialCode, "");
    mobile(mob);
    setCountryCode(dialCode);
    // setVisitorNumberError(ValidationUtils.isEmpty(mobile));
  }

  const symbolsArray = ["e", "E", "+", "-", "."]
  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          closeButton={true}
          onclose={closeModal}
          className="media-modal-head"
        >
          <div className='form-wrapper'>
            <h3 className='address-heading'>{data.name ? 'Change Address' : 'Add New Address'}</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='form-wrapper'>
            <form action="">
              <div className="formFieldwrap">

                <FormInput
                  type="text"
                  // label="name"
                  id="name"
                  name="product_Name"
                  placeholder="Full Name"
                  maxLength="80"
                  // val={data.name}
                  value={fullnameV}
                  onChange={(vl) => { fullname(vl.target.value) }}
                />
                <FormError
                  show={fullnameV === "" && showError}
                  error="Full Name is required."
                />
              </div>
              <div className="formFieldwrap newAddresForm">
                {/* <FormInput
                  type="number"
                  // label="name"
                  id="mobileNumber"
                  name="mobile_Number"
                  placeholder="Mobile Number"
                  maxLength="80"
                  // val={data.phone}
                  value={mobileV}
                  onChange={(v) => { mobile(v.target.value) }}
                  onWheel={(e) => e.target.blur()}
                  onKeyDown={(e) =>
                    symbolsArray.includes(e.key) && e.preventDefault()
                  }
                /> */}
                <PhoneInput
                  countryCodeEditable={false}
                  containerClass="form-group"
                  inputClass="form-control"
                  specialLabel
                  country={"in"}

                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                    placeholder: "Enter mobile",
                  }}
                  enableSearch
                  name="mobileNo"
                  value={`${code} ${mobileV}`}
                  searchPlaceholder="Search Country"
                  onChange={(value, country) => {
                    handlePhoneInput(value, country);
                  }}
                  onKeyUp={(value, country) => {
                    handlePhoneInput(value, country);
                  }}
                  disableSearchIcon
                />
                <FormError
                  show={mobileV === "" && showError}
                  error="Mobile Number is required."
                />
              </div>
              {/* pin code */}
              <div className="formFieldwrap">
                <FormInput
                  type="number"
                  // label="name"
                  id="pinCode"
                  name="pinCode"
                  placeholder="Pin Code"
                  maxLength="80"
                  // val={data.pinCode}
                  value={pinCodeV}
                  onChange={(e) => { pinCode(e.target.value) }}
                  onWheel={(e) => e.target.blur()}
                  onKeyDown={(e) =>
                    symbolsArray.includes(e.key) && e.preventDefault()
                  }
                />
                <FormError
                  show={pinCodeV === "" && showError}
                  error="Pin Code is required."
                />
              </div>
              <div className='cart-Inputaddress-wrap'>

                <div className="formFieldwrap width-100">
                  {/* {console.log(countryV)} */}
                  <CountrySelect
                    name="country"
                    id="country"
                    value={countryV}
                    onSelect={(value) => country(value)}
                    onEvent={(e) => country(e.target.value)}
                    autoevent={true}
                    label="Select country"

                  />
                  <FormError
                    show={countryV === "" && showError}
                    error="Please select country."
                  />
                </div>
                <div className="formFieldwrap width-100">

                  <StateSelect
                    name="institute_state"
                    id="institute_state"
                    value={stateV}
                    onSelect={(value) => state(value)}
                    onEvent={(e) => state(e.target.value)}
                    label="Select state"
                    disableEffect={true}
                  />
                  <FormError
                    show={stateV === "" && showError}
                    error="State is required."
                  />{" "}
                </div>
              </div>
              <div className="formFieldwrap width-100">
                <FormInput
                  type="text"
                  // label="name"
                  id="city"
                  name="city"
                  placeholder="City"
                  maxLength="80"
                  // val={data.city}
                  value={cityV}
                  onChange={(e) => { city(e.target.value) }}
                />
                <FormError
                  show={cityV === "" && showError}
                  error="City is required."
                />
              </div>
              <div className="formFieldwrap width-100">
                <FormInput
                  type="line1"
                  // label="name"
                  id="line1"
                  name="line1"
                  placeholder="Flat no/Building, Street name, Area"
                  maxLength="80"
                  // val={data.fullAddress}
                  value={userAddressV}
                  onChange={(e) => { address(e.target.value) }}
                />
                <FormError
                  show={userAddressV === "" && showError}
                  error="Address is required."
                />
              </div>
              <div className="formFieldwrap width-100">
                <FormInput
                  type="line1"
                  // label="name"
                  id="line1"
                  name="line1"
                  placeholder="Area/Locality (Optional)"
                  maxLength="80"
                  // val={data.fullAddress}
                  value={userAddressV1}
                  onChange={(e) => { address1(e.target.value) }}
                />
                {/* <FormError
                  show={userAddressV === "" && showError}
                  error="Address is required."
                /> */}
              </div>
              {/* <div className="formFieldwrap width-100">
                <FormInput
                  type="area"
                  // label="name"
                  id="area"
                  name="area"
                  placeholder="Area/Locality"
                  maxLength="80"
                  // val={data.name}
                  value={userAddressV1}
                  onChange={(e) => { address1(e.target.value) }}
                />
                <FormError
                  show={userAddressV1 === "" && showError}
                  error="Area/Locality is required."
                />
              </div> */}
              <div className="formFieldwrap width-100">
                <FormInput
                  type="landmark"
                  // label="name"
                  id="landmark"
                  name="landmark"
                  placeholder="Landmark (Optional)"
                  maxLength="80"
                  // val={data.landmark}
                  value={landmarkV}
                  onChange={(e) => { landmark(e.target.value) }}
                />
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='form-wrapper'>
            <div className="footer-btn-wrapper">
              <button className='buttonTrue btnTrue-o-primary width-100' onClick={closeModal}>CANCEL</button>
              <button className='buttonTrue btnTrue-primary width-100 ' onClick={submitHandler}>Save Address</button>
            </div>
          </div>

        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

export default AddressPopUp
