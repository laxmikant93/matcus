import React, { useState } from 'react'
import { useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidationFile from '../../../../../App/Auth/ValidationFile'
import ValidationUtils from '../../../../../Classes/ValidationUtils'
import CountrySelect from '../../../../../Common/Form/CountrySelect'
import FormError from '../../../../../Common/Form/FormError'
import FormInput from '../../../../../Common/Form/FormInput'
import StateSelect from '../../../../../Common/Form/StateSelect'
import GuestloginStepper from '../GuestloginStepper/GuestloginStepper'
import './guestloginform.scss'

const GuestLoginForm = ({ BussienessInfoData, guestEmailError, AllValidation, ErrorData, wellDoneError }) => {
  // const [showSameAddress, setShowSameAddress] = useState(true)
  const [guestEmail, setGuestEmail] = useState("")
  const [guestFullName, setGuestFullName] = useState("")
  const [addressStreetFlat, setAddressStreetFlat] = useState("")
  const [areaLocality, setAreaLocality] = useState("")
  const [usercity, setUserCity] = useState("")
  const [userState, setUserState] = useState("")
  const [userPinCode, setUserPinCode] = useState("")
  const [userLandMark, setUserLandMark] = useState("")
  const [userCountry, setUserCountry] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userCountryCode, setUserCountryCode] = useState("91")
  const dispatch = useDispatch();
  const history = useNavigate();
  // console.log(guestEmailError, "guestEmailError")
  // const [guestEmailError, setGuestEmailError] = useState("")
  const [guestEmailErrorAll, setGuestEmailErrorAll] = useState(false)
  const [guestFullNameError, setGuestFullNameError] = useState(false)
  const [addressStreetFlatError, setAddressStreetFlatError] = useState(false)
  const [areaLocalityError, setAreaLocalityError] = useState(false)
  const [usercityError, setUserCityError] = useState(false)
  const [userStateError, setUserStateError] = useState(false)
  const [userPinCodeError, setUserPinCodeError] = useState(false)
  // const [userLandMarkError, setUserLandMarkError] = useState("")
  const [userCountryError, setUserCountryError] = useState(false)

  const [userPhoneError, setUserPhoneError] = useState(false);
  useEffect(() => {
    setGuestEmailErrorAll(AllValidation?.guestEmailError)
    setGuestFullNameError(AllValidation?.guestFullNameError)
    setAddressStreetFlatError(AllValidation?.addressStreetFlatError)
    setAreaLocalityError(AllValidation?.areaLocalityError)
    setUserCityError(AllValidation?.usercityError)
    setUserStateError(AllValidation?.userStateError)
    setUserPinCodeError(AllValidation?.userPinCodeError)
    setUserCountryError(AllValidation?.userCountryError)
    setUserPhoneError(AllValidation?.userPhoneError)
    // console.log(userCountryError)

  }, [AllValidation?.addressStreetFlatError, AllValidation?.areaLocalityError,
  AllValidation?.guestEmailError, AllValidation?.guestFullNameError,
  AllValidation?.userCountryError, AllValidation?.userPinCodeError,
  AllValidation?.userStateError, AllValidation?.usercityError, AllValidation?.userPhoneError])
  const [symbolsArrMail] = useState(["e", "E", "+", "-", "."]);

  // console.log(userState)
  // const [BillAddGuestFullName, setBillAddGuestFullName] = useState("")
  // const [BillAddAddressStreetFlat, setBillAddAddressStreetFlat] = useState("")
  // const [BillAddAreaLocality, setBillAddAreaLocality] = useState("")
  // const [BillAddUsercity, setBillAddUserCity] = useState("")
  // const [BillAddUserState, setBillAddUserState] = useState("")
  // const [BillAddUserPinCode, setBillAddUserPinCode] = useState("")
  // const [BillAddUserLandMark, setBillAddUserLandMark] = useState("")
  // const [BillAddUserCountry, setBillAddUserCountry] = useState("")
  // console.log(BillAddGuestFullName)
  // console.log(BillAddAddressStreetFlat)
  // console.log(BillAddAreaLocality)
  // console.log(BillAddUsercity)
  // console.log(BillAddUserState)
  // console.log(BillAddUserPinCode)
  // console.log(BillAddUserLandMark)
  // console.log(BillAddUserCountry)


  // console.log(guestEmail)
  // console.log(guestFullName)
  // console.log(addressStreetFlat)
  // console.log(areaLocality)
  // console.log(usercity)
  // console.log(userState)
  // console.log(userPinCode)
  // console.log(userLandMark)
  // console.log(userCountry)

  const handleCountryInput = (value) => {
    setUserCountry(value);
    // setuser_country_error(false);
    setUserCountryError(!ValidationFile.validEmpty(value));
    BussienessInfoData({
      guestEmail: guestEmail,
      guestFullName: guestFullName,
      addressStreetFlat: addressStreetFlat,
      areaLocality: areaLocality,
      usercity: usercity,
      userPinCode: userPinCode,
      userLandMark: userLandMark,
      userCountry: value,
      countryCode: userCountryCode,
      userPhone: userPhone,
      userState: userState
    })
  }

  const handleStateInput = (value) => {
    setUserState(value);
    // setuser_state_error(false);
    setUserStateError(!ValidationFile.validEmpty(value));
    BussienessInfoData({
      guestEmail: guestEmail,
      guestFullName: guestFullName,
      addressStreetFlat: addressStreetFlat,
      areaLocality: areaLocality,
      usercity: usercity,
      userPinCode: userPinCode,
      userLandMark: userLandMark,
      userCountry: userCountry,
      countryCode: userCountryCode,
      userPhone: userPhone,
      userState: value
    })
  }

  const handleInput = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    switch (inputName) {
      case "Guest_Email":
        setGuestEmail(inputValue);
        setGuestEmailErrorAll(!ValidationFile.validEmpty(inputValue));
        BussienessInfoData({
          guestEmail: inputValue,
          guestFullName: guestFullName,
          addressStreetFlat: addressStreetFlat,
          areaLocality: areaLocality,
          usercity: usercity,
          userState: userState,
          userPinCode: userPinCode,
          userLandMark: userLandMark,
          userCountry: userCountry,
          countryCode: userCountryCode,
          userPhone: userPhone
        })
        break;
      case "Guest_Full_Name":
        setGuestFullName(inputValue);
        setGuestFullNameError(!ValidationFile.validEmpty(inputValue));
        BussienessInfoData({
          guestEmail: guestEmail,
          guestFullName: inputValue,
          addressStreetFlat: addressStreetFlat,
          areaLocality: areaLocality,
          usercity: usercity,
          userState: userState,
          userPinCode: userPinCode,
          userLandMark: userLandMark,
          userCountry: userCountry,
          countryCode: userCountryCode,
          userPhone: userPhone
        })
        break;
      case "Address_Street_Flat":
        setAddressStreetFlat(inputValue);
        setAddressStreetFlatError(!ValidationFile.validEmpty(inputValue));
        BussienessInfoData({
          guestEmail: guestEmail,
          guestFullName: guestFullName,
          addressStreetFlat: inputValue,
          areaLocality: areaLocality,
          usercity: usercity,
          userState: userState,
          userPinCode: userPinCode,
          userLandMark: userLandMark,
          userCountry: userCountry,
          countryCode: userCountryCode,
          userPhone: userPhone
        })
        break;
      case "Area_Locality":
        setAreaLocality(inputValue);
        setAreaLocalityError(!ValidationFile.validEmpty(inputValue));
        BussienessInfoData({
          guestEmail: guestEmail,
          guestFullName: guestFullName,
          addressStreetFlat: addressStreetFlat,
          areaLocality: inputValue,
          usercity: usercity,
          userState: userState,
          userPinCode: userPinCode,
          userLandMark: userLandMark,
          userCountry: userCountry,
          countryCode: userCountryCode,
          userPhone: userPhone
        })
        break;
      case "User_city":
        setUserCity(inputValue);
        setUserCityError(!ValidationFile.validEmpty(inputValue));
        BussienessInfoData({
          guestEmail: guestEmail,
          guestFullName: guestFullName,
          addressStreetFlat: addressStreetFlat,
          areaLocality: areaLocality,
          usercity: inputValue,
          userState: userState,
          userPinCode: userPinCode,
          userLandMark: userLandMark,
          userCountry: userCountry,
          countryCode: userCountryCode,
          userPhone: userPhone
        })
        break;
      case "User_Pin_Code":
        setUserPinCode(inputValue);
        setUserPinCodeError(!ValidationFile.validEmpty(inputValue));
        BussienessInfoData({
          guestEmail: guestEmail,
          guestFullName: guestFullName,
          addressStreetFlat: addressStreetFlat,
          areaLocality: areaLocality,
          usercity: usercity,
          userState: userState,
          userPinCode: inputValue,
          userLandMark: userLandMark,
          userCountry: userCountry,
          countryCode: userCountryCode,
          userPhone: userPhone
        })
        break;
      case "user_Land_Mark":
        setUserLandMark(inputValue);
        BussienessInfoData({
          guestEmail: guestEmail,
          guestFullName: guestFullName,
          addressStreetFlat: addressStreetFlat,
          areaLocality: areaLocality,
          usercity: usercity,
          userState: userState,
          userPinCode: userPinCode,
          userLandMark: inputValue,
          userCountry: userCountry,
          countryCode: userCountryCode,
          userPhone: userPhone
        })
        break;
      default:
        return
    }
  }
  // console.log(userPhoneError, "userPhoneError guestts")

  const handlePhoneInput = (inputValue, countryDetail) => {
    if (inputValue > 9) {
      let dialCode = countryDetail.dialCode;
      let mobile = inputValue.replace(dialCode, "");
      setUserPhone(mobile);
      setUserCountryCode(dialCode);
      setUserPhoneError(ValidationUtils.isEmpty(mobile));
      // console.log(dialCode, "dialCode handlePhoneInput")
      // console.log(mobile, "mobile")
      BussienessInfoData({
        guestEmail: guestEmail,
        guestFullName: inputValue,
        addressStreetFlat: addressStreetFlat,
        areaLocality: areaLocality,
        usercity: usercity,
        userState: userState,
        userPinCode: userPinCode,
        userLandMark: userLandMark,
        userCountry: userCountry,
        countryCode: dialCode,
        userPhone: mobile
      })
    }
  }
  // console.log(userCountry, "userPhone Guesttt")
  // const handleSubmit = () => {
  // useEffect(() => {
  //   if (handleForValidation === true) {
  //     console.log("hellooooooooooooooooooooo")


  //     if (!ValidationFile.validEmpty(guestEmail)) {
  //       setGuestEmailError(true);
  //     } if (!ValidationFile.validEmpty(guestFullName)) {
  //       setGuestFullNameError(true);
  //     } if (!ValidationFile.validEmpty(addressStreetFlat)) {
  //       setAddressStreetFlatError(true);
  //     } if (!ValidationFile.validEmpty(areaLocality)) {
  //       setAreaLocalityError(true);
  //     } if (!ValidationFile.validEmpty(usercity)) {
  //       setUserCityError(true);
  //     } if (!ValidationFile.validEmpty(userState)) {
  //       setUserStateError(true);
  //     } if (!ValidationFile.validEmpty(userPinCode)) {
  //       setUserPinCodeError(true);
  //     } if (!ValidationFile.validEmpty(userLandMark)) {
  //       setUserCountryError(true);
  //     } if (!ValidationFile.validEmpty(userCountry)) {
  //       setUserCountryError(true);
  //     }
  //     if (
  //       ValidationFile.validEmpty(guestEmail) &&
  //       ValidationFile.validEmpty(guestFullName) &&
  //       ValidationFile.validEmpty(addressStreetFlat) &&
  //       ValidationFile.validEmpty(areaLocality) &&
  //       ValidationFile.validEmpty(usercity) &&
  //       ValidationFile.validEmpty(userState) &&
  //       ValidationFile.validEmpty(userPinCode) &&
  //       ValidationFile.validEmpty(userLandMark) &&
  //       ValidationFile.validEmpty(userCountry)
  //     ) {
  //       // dispatch()
  //       console.log("ab krde bhai ")
  //     }
  //   }
  // })

  //  console.log(guestEmailError)
  //  console.log(BillAddAddressStreetFlat)
  //  console.log(BillAddAreaLocality)
  //  console.log(BillAddUsercity)
  //  console.log(BillAddUserState)
  //  console.log(BillAddUserPinCode)
  //  console.log(BillAddUserLandMark)
  //  console.log(BillAddUserCountry)
  // }

  // const handleBillAddress = (e) => {

  //   let inputName = e.target.name
  //   let inputValue = e.target.value
  //   switch (inputName) {
  //     case "Bill_Add_Guest_Full_Name":
  //       setBillAddGuestFullName(inputValue);

  //       break;
  //     case "Bill_Add_Address_Street_Flat":
  //       setBillAddAddressStreetFlat(inputValue);
  //       break;
  //     case "Bill_Add_Area_Locality":
  //       setBillAddAreaLocality(inputValue);
  //       break;
  //     case "Bill_Add_User_city":
  //       setBillAddUserCity(inputValue);
  //       break;
  //     case "Bill_Add_User_state":
  //       setBillAddUserState(inputValue);
  //       break;
  //     case "Bill_Add_User_Pin_Code":
  //       setBillAddUserPinCode(inputValue);
  //       break;
  //     case "Bill_Add_user_Land_Mark":
  //       setBillAddUserLandMark(inputValue);
  //       break;
  //     case "Bill_Add_User_country":
  //       setBillAddUserCountry(inputValue);
  //       break;
  //     default:
  //       return
  //   }
  // }

  // const handleCheckBox = (e) => {
  //   let inputChecked = e.target.checked
  //   setShowSameAddress(inputChecked)
  // }


  const handleLogin = () => {
    history("/customer-login")
    localStorage.removeItem("Guest_new_userId")
    // localStorage.removeItem("Uuid_For_Guest_Login")
    localStorage.removeItem("Guest_shipping_address_Id")
  }

  return (
    <div className='guest-login-form-wrapper'>
      <GuestloginStepper />
      <div className='guest-login-component-container'>
        {/* email address section  */}
        <section className='email-address-wrapper'>
          <p className="text-s w-400 heading-item mb-2">Email Address</p>
          <div className='email-address-item mt-10'>
            <FormInput
              className='guest-login-input '
              name="Guest_Email"
              type="text"
              value={guestEmail}
              // onChange={(e) => handleInput(e)}
              onChange={handleInput}
              onKeyUp={handleInput}

              // value={guestEmail}
              label="Email"
              placeholder='Enter your Email Address'
            />
            <div>
              <p className='heading-item text-xxs w-400' onClick={handleLogin}>Have an account? <span className='text-xxs w-400 login-text secondary'>LOGIN </span></p>
            </div>
            <FormError
              show={!guestEmail && guestEmailErrorAll}

              error="Enter your Email Address ."
            />
          </div>
        </section>
        <section className='mt-25 shipping-address-wrapper'>
          <p className="text-s w-400 heading-item mb-25"> Shipping Address</p>
          <div className='shipping-address-item'>
            <div className='name-div'>
              <FormInput

                className='guest-login-input '
                name="Guest_Full_Name"
                type="text"
                // onChange={(e) => handleInput(e)}
                value={guestFullName}
                onChange={handleInput}
                onKeyUp={handleInput}

                label="Full Name*"
                placeholder="Enter your full name"
              />
              <FormError
                show={!guestFullName && guestFullNameError}
                error="Please Enter Your name ."
              />

            </div>

            <div className="formFieldwrap mobile-no-div">
              <div className="cstmPhoneInput">
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
                  value={`${userCountryCode} ${userPhone}`}
                  searchPlaceholder="Search Country"
                  onChange={(value, country) => {
                    handlePhoneInput(value, country);
                  }}
                  onKeyUp={(value, country) => {
                    handlePhoneInput(value, country);
                  }}
                  disableSearchIcon
                />
                <label className="animLabel" htmlFor="mobile_number">
                  Mobile Number
                </label>
              </div>
              <FormError
                show={!userPhone && userPhoneError}
                error="Enter Your Mobile Number ."
                className='visitorFormError'
              />
            </div>


            <div className='street-name-div '>
              <FormInput
                value={addressStreetFlat}
                onChange={handleInput}
                onKeyUp={handleInput}
                className='guest-login-input '
                name="Address_Street_Flat"
                type="text"
                label="Address*"
                placeholder="Flat no./Building, Street Name"
              />
              <FormError
                show={!addressStreetFlat && addressStreetFlatError}
                error="Please Enter Your Address ."
              />
            </div>
            <div
              className='street-name-div '>
              <FormInput
                value={areaLocality}
                onChange={handleInput}
                onKeyUp={handleInput}
                className='guest-login-input '
                name="Area_Locality"
                type="text"
                label="Area/Locality*"
                placeholder="Enter Area/Locality"
              />
              <FormError
                show={!areaLocality && areaLocalityError}
                error="Please Enter Your Area/Locality ."
              />
            </div>
            <div
              className='city-div'>
              <FormInput
                value={usercity}
                onChange={handleInput}
                onKeyUp={handleInput}
                name="User_city"
                type="text"
                label="City*"
                id="City Name"
                placeholder="Enter City"
                className='guest-login-input'
              />
              <FormError
                show={!usercity && usercityError}
                error="Please Enter Your City."
              />
            </div>
            <div className='pincode-div'>

              <FormInput
                // value={institute_zipcode}
                // onChange={handleInput}
                // onKeyUp={handleInput}
                value={userPinCode}
                onChange={handleInput}
                onKeyUp={handleInput}
                name="User_Pin_Code"
                type="number"
                id="Zip/Pin code"
                label="Zip/Pin code"
                placeholder="Zip/Pin code"
                onKeyDown={(e) =>
                  symbolsArrMail.includes(e.key) && e.preventDefault()
                } />
              <FormError
                show={!userPinCode && userPinCodeError}
                error="Please Enter pincode/zipcode."
              />

            </div>
            <div className='Country-div'>

              <CountrySelect
                name="User_country"
                id="user_country"
                value={userCountry}
                onSelect={(value) => handleCountryInput(value)}
                onEvent={handleInput}
                autoevent={true}
                label="Select country"
              // className='guest-login-input'
              />
              <FormError
                show={!userCountry && userCountryError}
                error="Please select country."
              />
            </div>

            <div className='landmark-div'>
              <FormInput
                // value={institute_zipcode}
                // onChange={handleInput}
                // onKeyUp={handleInput}
                value={userLandMark}
                className='guest-login-input'
                onChange={handleInput}
                onKeyUp={handleInput}
                name="user_Land_Mark"
                type="text"
                id="user_Land_Mark"
                label="Landmark"
                placeholder="Landmark (optional)"

              />
            </div>

            <div className='Country-div'>

              <StateSelect
                name="User_state"
                value={userState}
                // onChange={handleInput}
                onSelect={(value) => handleStateInput(value)}
                onEvent={handleInput}
                autoevent={true}
                label=" Select state"
              />
              <FormError
                show={!userState && userStateError}
                error="Please Enter Your State ."
              />
              <FormError
                show={wellDoneError}
                error="Please Select other State ."
              />
            </div>

          </div>
          {/* <p className='mt-25'>
            <input
              className='mr-10'
              type="checkbox"
              checked={showSameAddress}
              onChange={handleCheckBox}
            />


            <span className='text-xs w-400'>Billing address is same as the shipping address</span>
          </p> */}
        </section>
        {/* {showSameAddress === false
          ?
          <section className='shipping-address-wrapper mt-30'>
            <p className='text-s w-400 heading-item mb-2 mb-25' >Billing Address</p>
            <div className='shipping-address-item'>
              <div className='name-div'>
                <FormInput

                  className='guest-login-input '
                  name="Bill_Add_Guest_Full_Name"
                  type="text"
                  // onChange={(e) => handleInput(e)}
                  value={BillAddGuestFullName}
                  onChange={handleBillAddress}
                  onKeyUp={handleBillAddress}

                  label="* Full Name"
                  placeholder="* Enter your full name"
                />
                <FormError
                  show={true}
                  error="Enter Your name ."
                />

              </div>

              <div className="formFieldwrap mobile-no-div">
                <div className="cstmPhoneInput">
                  <PhoneInput
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    countryCodeEditable={true}
                    containerClass="form-group"
                    inputClass="form-control"
                    specialLabel="hii"
                    country={"in"}
                    // inputProps={{
                    //   name: "phone",
                    //   required: true,
                    //   autoFocus: true,
                    // }}
                    enableSearch
                    disableSearchIcon
                  />
                  <label className="animLabel" htmlFor="mobile_number">
                    Mobile Number
                  </label>
                </div>
              </div>

              <div className='street-name-div '>
                <FormInput
                  value={BillAddAddressStreetFlat}
                  onChange={handleBillAddress}
                  onKeyUp={handleBillAddress}
                  className='guest-login-input '
                  name="Bill_Add_Address_Street_Flat"
                  type="text"
                  // label="* Full Name"
                  placeholder="* Flat no./Building, Street Name"
                />
                <FormError
                  show={true}
                  error="Enter Your name ."
                />
              </div>
              <div
                className='street-name-div '>
                <FormInput
                  value={BillAddAreaLocality}
                  onChange={handleBillAddress}
                  onKeyUp={handleBillAddress}
                  className='guest-login-input '
                  name="Bill_Add_Area_Locality"
                  type="text"
                  // label="* Full Name"
                  placeholder="* Area/Locality"
                />
                <FormError
                  show={true}
                  error="Enter Your name ."
                />
              </div>
              <div
                className='city-div'>
                <FormInput
                  value={BillAddUsercity}
                  onChange={handleBillAddress}
                  onKeyUp={handleBillAddress}
                  name="Bill_Add_User_city"
                  type="text"
                  label="City Name"
                  id="Bill_Add_User_city"
                  placeholder="Enter City"
                  className='guest-login-input'
                />
                <FormError
                  show={true}
                  error="Enter Your name ."
                />
              </div>
              <div className='state-div'>
                <StateSelect
                  name="Bill_Add_User_state"
                  id="Bill_Add_User_state"
                  value={BillAddUserState}
                  onChange={handleBillAddress}
                  onKeyUp={handleBillAddress}
                  // value={institute_state}
                  // onSelect={(value) => set_institute_state(value)}
                  onEvent={handleInput}
                  label="Select state"
                  className='guest-login-input'
                />
                <FormError
                  show={true}
                  error="Enter Your name ."
                />
              </div>
              <div className='pincode-div'>

                <FormInput
                  // value={institute_zipcode}
                  // onChange={handleInput}
                  // onKeyUp={handleInput}
                  value={BillAddUserPinCode}
                  onChange={handleBillAddress}
                  onKeyUp={handleBillAddress}
                  name="Bill_Add_User_Pin_Code"
                  type="text"
                  id="Bill_Add_User_Pin_Code"
                  label="Zip/Pin code"
                  placeholder="Zip/Pin code"

                />
                <FormError
                  // show={institute_zipcode_error && isSubmit}
                  show={true}

                  error="Please provide pincode/zipcode."
                />
                <FormError
                  // show={institute_zipcode &&
                  //   countryZipCodeError && isSubmit
                  // }
                  show={true}
                  error="Invalid zipcode."
                />
              </div>
              <div className='landmark-div'>
                <FormInput
                  // value={institute_zipcode}
                  // onChange={handleInput}
                  // onKeyUp={handleInput}
                  name="Bill_Add_user_Land_Mark"
                  type="text"
                  id="Bill_Add_user_Land_Mark"
                  label="Landmark"
                  value={BillAddUserLandMark}
                  className='guest-login-input'
                  onChange={handleBillAddress}
                  onKeyUp={handleBillAddress}
                  placeholder="Landmark (optional)"

                />
              </div>
              <div className='Country-div'>

                <CountrySelect
                  name="Bill_Add_User_country"
                  id="Bill_Add_User_country"
                  value={BillAddUserCountry}
                  // onSelect={(value) => set_institute_country(value)}
                  // onEvent={handleInput}

                  onChange={handleBillAddress}
                  onEvent={handleBillAddress}
                  autoevent={true}
                  label="Select country"
                  className='guest-login-input'
                />
                <FormError
                  show={true}
                  error="Please select country."
                />
              </div>
            </div>
          </section>
          :
          ""
        } */}


      </div>
    </div>
  )
}

export default GuestLoginForm