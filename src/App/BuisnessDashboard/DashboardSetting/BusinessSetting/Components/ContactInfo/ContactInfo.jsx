import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import TimePicker from 'react-time-picker';
import ValidationUtils from '../../../../../../Classes/ValidationUtils';
import CheckboxInput from '../../../../../../Common/Form/CheckboxInput';
import FormError from '../../../../../../Common/Form/FormError';
import FormInput from '../../../../../../Common/Form/FormInput';
import InputDatePicker from '../../../../../../Common/Form/InputDatePicker';
import MinutesSelect from '../../../../../../Common/Form/MinutesSelect';
import TimeInput from '../TimeInput/TimeInput';
import './contactInfo.scss';
import moment from "moment";
import { array } from 'prop-types';
const ContactInfo = ({ ContactInfoPage, BussienessContactData }) => {

  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "24X7"]
  const [BusinessEmail, setBusinessEmail] = useState()
  const [BusinessEmailError, setBusinessEmailError] = useState("")
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [contactNumberError, setContactNumberError] = useState(false);
  const [openTime, setOpenTime] = useState("")
  const [closeTime, setCloseTime] = useState("")
  const [serviceDays, setServiceDays] = useState([])


  useEffect(() => {
    if (ContactInfoPage) {
      setBusinessEmail(ContactInfoPage?.BusinessEmail)
      setContactNumber(ContactInfoPage?.BusinessPhone)
      setContactNumberError(ContactInfoPage?.contactNumberError)
      setServiceDays(ContactInfoPage?.serviceDays)
      // setOpenTime(new Date(ContactInfoPage?.openTime))
      // setCloseTime(new Date(ContactInfoPage?.closeTime))
      setOpenTime(ContactInfoPage?.openTime)
      setCloseTime(ContactInfoPage?.closeTime)
      setBusinessEmailError(ContactInfoPage?.emailError)
      // console.log(ContactInfoPage?.BusinessPhone)
    }
  }, [ContactInfoPage, ContactInfoPage?.BusinessPhone, ContactInfoPage?.closeTime, ContactInfoPage?.contactNumberError, ContactInfoPage?.openTime, ContactInfoPage?.serviceDays])

  // console.log(BusinessEmailError)
  // console.log(contactNumber)
  const handlePersonalDetails = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "Email_Address":
        setBusinessEmail(inputValue);
        setBusinessEmailError(ValidationUtils.isEmpty(inputValue));
        BussienessContactData({
          BusinessEmail: inputValue,
          businessPhone: contactNumber,
          serviceDays: serviceDays,
          countryCode: countryCode,
          BusinessEmailError: BusinessEmailError,
          openTime: openTime,
          closeTime: closeTime
        })
        break;
      default:
    }
  }
  // console.log(contactNumberError)
  // console.log(serviceDays)
  // const handleCheckBox = (key, state) => {
  //   let array = opendingDays
  //   if (state === "check") {
  //     array[key]["isActive"] = true
  //     setopendingDays([...array])
  //   } else if (state === "uncheck") {
  //     array[key]["isActive"] = false
  //   }
  // }
  // console.log(BusinessEmail)
  const handleCheckBox = (e) => {
    let inputChecked = e.target.checked;
    let value = e.target.value
    let array = serviceDays;
    if (inputChecked) {
      array.push(value)
    }
    else {
      let index = array.indexOf(value);
      array.splice(index, 1);
    }
    setServiceDays([...array]);
  }
  // console.log(serviceDays, "serviceDays")
  // console.log(array, "serviceDays")
  const handleopenTime = (selectedTime) => {
    setOpenTime(selectedTime)
    BussienessContactData({
      BusinessEmail: BusinessEmail,
      businessPhone: contactNumber,
      serviceDays: serviceDays,
      countryCode: countryCode,
      // contactNumber: contactNumber,
      openTime: selectedTime,
      closeTime: closeTime
    })
  }

  const handleCloseTime = (selectedTime) => {
    setCloseTime(selectedTime)
    BussienessContactData({
      BusinessEmail: BusinessEmail,
      businessPhone: contactNumber,
      serviceDays: serviceDays,
      countryCode: countryCode,
      // contactNumber: contactNumber,
      openTime: openTime,
      closeTime: selectedTime
    })
  }


  const handlePhoneInput = (inputValue, countryDetail) => {
    if (inputValue > 9) {
      let dialCode = countryDetail.dialCode;
      let mobile = inputValue.replace(dialCode, "");
      setContactNumber(mobile);
      setCountryCode(dialCode);
      setContactNumberError(ValidationUtils.isEmpty(mobile));
      BussienessContactData({
        BusinessEmail: BusinessEmail,
        businessPhone: mobile,
        serviceDays: serviceDays,
        countryCode: dialCode,
        BusinessEmailError: BusinessEmailError,
        openTime: openTime,
        closeTime: closeTime
      })
    }
  }

  return (
    <React.Fragment>
      <div className='contactInfo-container'>
        <div className='contactInfo-left'>
          <p className='text-xs w-400 base'>Contact info</p>
          <p className='text-2xs w-300 base mt-2'>Add your business contact details so people can easily get in touch.</p>
          <div className='contactInfo-wrapper'>
            <div className='contactInfo-wrapper-left'>
              <div className="formFieldwrap width-65">
                <p className='label-heading  text-xxs w-400 base'>
                  Email Address
                </p>

                <FormInput
                  type="text"
                  name="Email_Address"
                  value={BusinessEmail}
                  onChange={handlePersonalDetails}
                  // onKeyUp={handlePersonalDetails}
                  // label="Email Address*"
                  placeholder="Enter your email address"
                // disabled={toggle === "Text"}
                />
                <FormError
                  show={!BusinessEmail && BusinessEmailError}
                  error=" Email is required."
                  className='visitorFormError'
                />


              </div>
            </div>
            <div className='contactInfo-wrapper-right'>
              <div className="formFieldwrap width-65">
                <p className='label-heading  text-xxs w-400 base'>
                  Phone Number
                </p>
                <div className="cstmPhoneInput">
                <PhoneInput
                  countryCodeEditable={false}
                  containerClass="form-group"
                  inputClass="form-control"
                  specialLabel
                  country={"in"}
                  value={`${countryCode} ${contactNumber} `}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                    placeholder: "Enter mobile",
                  }}
                  enableSearch
                  name="mobileNo"
                  searchPlaceholder="Search Country"
                  onChange={(value, formattedValue) => {
                    handlePhoneInput(value, formattedValue);
                  }}
                  onKeyUp={(value, formattedValue) => {
                    handlePhoneInput(value, formattedValue);
                  }}
                  disableSearchIcon
                />
                <FormError
                  show={!contactNumber && contactNumberError}
                  error="Contact number is required."
                  className='visitorFormError'
                />
                <FormError
                  show={contactNumber && countryCode === "91" && contactNumberError}
                  error="Invalid Contact."
                  className='visitorFormError'
                />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='v-line'></div>
        <div className='contactInfo-right'> */}
        {/* <div className='contactInfo-workingHours-wrapper'>
          <div className='workingHours-left'>
            <p className='text-xs w-400 base'>Working hours</p>
            <p className='text-2xs w-300 base mt-2'>Add your business working hours.</p>
            <div className='timeInput-wrapper'>
              <div className='timeInput-left'>
                <p className='text-xs w-400 base'>Open Time</p>
                <InputDatePicker
                  className="min-card"
                  onSelect={(selectedTime) => handleopenTime(selectedTime, "startTime")
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  value={openTime}
                  name="startTiming"
                  timeIntervals={5}
                  dateFormat="h:mm aa"
                  type="time"
                  placeholder="Start Timing"
                  onKeyDown={(e) => e.preventDefault()}
                />

              </div>
              <div className='timeInput-left'>
                <p className='text-xs w-400 base'>Closing Time</p>
                <InputDatePicker
                  className="min-card"
                  onSelect={(selectedTime) => handleCloseTime(selectedTime, "endTime")
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  name="endTiming"
                  value={closeTime}
                  timeIntervals={5}
                  dateFormat="h:mm aa"
                  type="time"
                  placeholder="End Timing"
                  onKeyDown={(e) => e.preventDefault()}

                />
              </div>
            </div>
          </div>
          <div className='workingHours-right'>
            <p className='text-xs w-400 base'>Opening Days</p>
            <div className='checkbox-wrapper'>

              {
                days.map((item, key) => {
                  return (
                    <>
                      <ul>
                        <div className='checkbox-left'>

                          <CheckboxInput
                            LabelClass={"label-heading eComm-checkbox-center"}
                            className={"eComm-checkbox"}
                            label={item}
                            type="checkbox" onClick={(e) => handleCheckBox(e)}
                          // value={item}
                          // checked={item}
                          />

                        </div>
                      </ul>
                    </>
                  )
                })}
            </div>
          </div>
        </div> */}
        {/* </div> */}

      </div>
    </React.Fragment>
  )
}

export default ContactInfo