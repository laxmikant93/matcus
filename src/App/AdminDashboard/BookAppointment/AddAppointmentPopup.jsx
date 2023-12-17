import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import ValidationFile from '../../../Classes/ValidationFile';
import ValidationUtils from '../../../Classes/ValidationUtils';
import FormError from '../../../Common/Form/FormError';
import FormInput from '../../../Common/Form/FormInput';
import InputDatePicker from '../../../Common/Form/InputDatePicker';
import SelectInput from '../../../Common/Form/SelectInput';
import Modals from '../../../Common/Modals';
import ModalBody from '../../../Common/Modals/ModalsBody';
import ModalHeader from '../../../Common/Modals/ModalsHeader';
import {
  getAllMainServiceList, getAllSlot, geteditAppointment, getSingleServiceDetail, postAppointmentDetail, resetEditAppointmentDetail,
  resetPostAppointmentDetail
} from '../../../store/actions/bookAppointment';
import "./bookAppointment.style.scss"

const AddAppointmentPopup = ({ onCloseAddedit, addEditRef, edit, viewDetails }) => {
  const closeModel = () => {
    if (edit === true) {
      onCloseAddedit()
      setAllSolts("")
      setWeekDays("")
      setSelectedTime("")
      setAllSolts("")
    } else {
      onCloseAddedit()
      setFullName("")
      setCountryCode("")
      setContactNumber("")
      setEmail("")
      setServiceId("")
      setAppointmentId("")
      setBookingDate("")
      setFullNameError("")
      setWeekDays("")
      setSelectedTime("")
      setAllSolts("")
      setFullNameError(false)
      setInvalidEmailError(false)
      setSelectedTimeError(false)
      setContactNumberError(false)
    }
  }

  let dispatch = useDispatch()
  const [emailError, setEmailError] = useState(false)
  const [bookingDate, setBookingDate] = useState(new Date());
  const [allSolts, setAllSolts] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [slotsLeft, setSlotsLeft] = useState();
  const [timestart, setTimeStart] = useState(false);
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedTime, setSelectedTime] = useState()

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceId, setServiceId] = useState();
  const [appointmentId, setAppointmentId] = useState("");

  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [firstNameError, setFullNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [selectedTimeError, setSelectedTimeError] = useState(false);
  const [filterService, setFilterService] = useState("")

  const { users, ownerID, institute, serviceListData,
    getAllSlotdata, getSingleServiceDetaildata, businesstype } = useSelector((state) => {
      return {
        users: state.user,
        institute: state.user.user_institute,
        businesstype: state.user.user_business_type,
        ownerID: state.user._id,
        serviceListloading: state.bookAppointment.getallServiceList.loading,
        serviceListsuccess: state.bookAppointment.getallServiceList.success,

        serviceListData: state.bookAppointment.getallServiceList.data,
        getAllSlotdataSuccess: state.bookAppointment.getAllSlot.success,

        getAllSlotdataLoading: state.bookAppointment.getAllSlot.loading,
        getAllSlotdata: state.bookAppointment.getAllSlot.data,

        getSingleServiceDetailSuccess: state.bookAppointment.getSingleService.success,
        getSingleServiceDetailLoading: state.bookAppointment.getSingleService.loading,
        getSingleServiceDetaildata: state.bookAppointment.getSingleService.data,
      }
    })

  useEffect(() => {
    if (bookingDate) {
      dispatch(getAllSlot(serviceId, institute, bookingDate, businesstype))
    }
  }, [dispatch, serviceId, institute, bookingDate, businesstype])

  useEffect(() => {
    let data = {
      id: serviceId,
      userId: users._id
    }
    dispatch(getSingleServiceDetail(businesstype, data))
  }, [dispatch, serviceId, users._id, businesstype])

  const checkDayFunction = (day) => {
    if (day === "Sunday") {
      return 0;
    } else if (day === "Monday") {
      return 1;
    }
    else if (day === "Tuesday") {
      return 2;
    } else if (day === "Wednesday") {
      return 3;
    } else if (day === "Thursday") {
      return 4;
    } else if (day === "Friday") {
      return 5;
    } else if (day === "Saturday") {
      return 6;
    }
  }

  useEffect(() => {
    let array = []
    if (getSingleServiceDetaildata && getSingleServiceDetaildata.workingDays?.length > 0) {
      getSingleServiceDetaildata.workingDays.map((item) => {
        if (item.checked === true) {
          array.push(checkDayFunction(item.serviceDay))
        }
      })
      setWeekDays([...array])
    }
  }, [getSingleServiceDetaildata])

  useEffect(() => {
    dispatch(getAllMainServiceList(institute, businesstype))
  }, [businesstype, dispatch, institute])

  const handleTiming = (item, key, timing) => {
    setTimeStart(key)
    setTimeSlot(timing)
    setSlotsLeft(item._id)
    if (timing === "morning") {
      setSelectedTime(item.startTime)
    } else if (timing === "evening") {
      setSelectedTime(item.startTime)
    }
  }

  useEffect(() => {
    if (getAllSlotdata && getAllSlotdata.length > 0) {
      getAllSlotdata.map((item) => {
        setAllSolts(item.slots)
      })
    }
  }, [getAllSlotdata])

  useEffect(() => {
    if (viewDetails && edit) {
      setFullName(viewDetails.full_name)
      setCountryCode(viewDetails.countryCode)
      setContactNumber(viewDetails.contact)
      setEmail(viewDetails.email)
      setServiceId(viewDetails?.service?._id)
      setAppointmentId(viewDetails._id)
      setBookingDate(viewDetails.booking_date)
      setSelectedTime(viewDetails.booking_time)
    }
  }, [viewDetails, edit])

  useEffect(() => {
    if (edit === false) {
      setFullName("")
      setCountryCode("")
      setContactNumber("")
      setEmail("")
      setServiceId("")
      setAppointmentId("")
      setBookingDate("")
      setAllSolts("")
      setFullNameError("")
      setInvalidEmailError("")
      setSelectedTimeError("")
      setContactNumberError("")
    }
  }, [edit])

  const handlePhoneInput = (inputValue, countryDetail) => {
    if (inputValue > 9) {
      let dialCode = countryDetail.dialCode;
      let mobile = inputValue.replace(dialCode, "");
      setContactNumber(mobile);
      setCountryCode(dialCode);
      setContactNumberError(ValidationUtils.isEmpty(mobile));
    }
  }

  const handlePersonalDetails = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    switch (inputName) {
      case "Full_Name":
        setFullName(value);
        setFullNameError(ValidationUtils.isEmpty(value));
        break;
      case "Email_Address":
        setEmail(value);
        setInvalidEmailError(ValidationUtils.isEmpty(value));
        break;
      case "selectedTime":
        setSelectedTime(value);
        setSelectedTimeError(ValidationUtils.isEmpty(value));
        break;
      default:
        return false;
    }
  }

  const hadleCategorySelect = (e) => {
    let inputValue = e.target.value
    setServiceId(inputValue);
    setAllSolts("")
  }

  const numberValidation = () => {
    let isValid = true
    if (contactNumber && countryCode === "91") {
      if (contactNumber.length < 10) {
        isValid = false
        setContactNumberError(true)
      } else {
        isValid = true
        setContactNumberError(false)
      }
    } else {
      isValid = false
    }
    return isValid
  }
  const validEmail = () => {
    let isValid = true
    if (email) {
      if (!ValidationUtils.isEmail(email)) {
        isValid = false
        setEmailError(true)
      } else {
        isValid = true
      }
    } else {
      isValid = true
    }
    return isValid
  }
  const editappointmentDetails = {
    service: serviceId,
    booking_date: moment(bookingDate).add(331, "minutes"),
    booking_time: selectedTime,
    full_name: fullName,
    contact: contactNumber,
    email: email,
    countryCode: countryCode,
    bookingSlotId: slotsLeft,
    business: institute
  }


  const appointmentDetails = {
    institute: institute,
    owner: ownerID,
    user: users._id,
    service: serviceId,
    booking_date: moment(bookingDate).add(331, "minutes"),
    booking_time: selectedTime,
    full_name: fullName,
    contact: contactNumber,
    email: email,
    countryCode: countryCode,
    bookingSlotId: slotsLeft,
    business: institute
  }

  const isFormValid = () => {
    return !ValidationFile.isEmpty(fullName)
      && !ValidationFile.isEmpty(email)
      && !ValidationFile.isEmpty(contactNumber)
      && !ValidationFile.isEmpty(selectedTime)
  }

  const handleEdit = () => {
    let numberValid = numberValidation()
    setContactNumberError(!numberValid)
    let emailValid = validEmail()
    setEmailError(!emailValid)
    if (isFormValid() && numberValid && emailValid
    ) {
      dispatch(geteditAppointment(appointmentId, businesstype, editappointmentDetails))
      onCloseAddedit()
    } else {
      setFullNameError(true)
      setInvalidEmailError(true)
      setSelectedTimeError(true)
    }
  }

  const handleSave = () => {
    let numberValid = numberValidation()
    setContactNumberError(!numberValid)
    let emailValid = validEmail()
    setEmailError(!emailValid)
    if (isFormValid() && numberValid && emailValid
    ) {
      dispatch(postAppointmentDetail(businesstype, appointmentDetails));
      onCloseAddedit()
      setFullName("")
      setCountryCode("")
      setContactNumber("")
      setEmail("")
      setServiceId("")
      setAppointmentId("")
      setBookingDate("")
      setSelectedTime("")
      setFullNameError("")
      setInvalidEmailError("")
      setSelectedTimeError("")
      setAllSolts("")
      setContactNumberError("")
    } else {
      setFullNameError(true)
      setInvalidEmailError(true)
      setSelectedTimeError(true)
    }
  }

  useEffect(() => {
    if (serviceListData && serviceListData.length > 0) {
      let array = []
      serviceListData.map((item) => {
        if (item.isHide === false) {
          array.push(item)
        }
      })
      setFilterService([...array])
    }
  }, [serviceListData])


  useEffect(() => {
    return () => {
      dispatch(resetEditAppointmentDetail())
      dispatch(resetPostAppointmentDetail())
    }
  }, [dispatch])

  return (
    <>
      <Modals ref={addEditRef} Position="center" slide="top" ClosePopUp={closeModel}>
        <ModalHeader title={edit ? "Edit Appointment" : "Add appointment"} className="bgPopup" />
        <ModalBody>

          <form className="FormPopup-wraper">
            <div className="formFieldwrap">
              <FormInput
                type="text"
                name="Full_Name"
                value={fullName}
                label="Full Name"
                placeholder="Enter Full Name"
                onChange={handlePersonalDetails}
              />
              <FormError
                show={firstNameError && !fullName}
                error=" Name is required."
                className='visitorFormError'
              />
            </div>
            {/* <div className="formFieldwrap">
              <FormInput
                type="text"
                name="LastName"
                label="Last Name"
                placeholder="Enter last name"
                onChange={handlePersonalDetails}
              />
              <FormError
                show={false}
                error="Enter last name is Required."
              />
            </div> */}
            <div className="formFieldwrap">
              <div className="cstmPhoneInput">

                <PhoneInput
                  countryCodeEditable={false}
                  containerClass="form-group"
                  inputClass="form-control"
                  specialLabel
                  country={"in"}
                  value={`${countryCode} ${contactNumber}`}
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
                <label className="animLabel" htmlFor="mobile_number">
                  Mobile Number*
                </label>
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
            <div className="formFieldwrap">
              <FormInput
                type="email"
                name="Email_Address"
                value={email}
                label="Email Address"
                placeholder="Enter email address"
                onChange={handlePersonalDetails}

              />
              <FormError
                show={!email && invalidEmailError}
                error=" Email is required."
                className='visitorFormError'
              />
              <FormError
                show={email && emailError}
                error="Invalid Email."
              />
            </div>
            <div className="formFieldwrap">
              <SelectInput
                type="text"
                id="select_classroom"
                label={`Select Service`}
                value={serviceId}
                placeholder="Select Service"
                onChange={hadleCategorySelect}

              >
                <option value="">
                  Select Service
                </option>
                {filterService.length
                  && filterService.map((item) => {
                    return (
                      <option className="option active"
                        value={item._id}
                      >
                        {item.title}
                      </option>
                    );
                  })
                }
              </SelectInput>
              <FormError
                show={false}
                error="Select Service is Required."
              />
            </div>

          </form>
          <div className="datesec-wraper mb-20">
            <h5>Date</h5>
            <div className="datepicker">
              <div className="datePickerWrap">
                <InputDatePicker
                  name='Booking_Date'
                  value={bookingDate}
                  onSelect={setBookingDate}
                  minDate={new Date()}
                  filterDate={(date) => [...weekDays].includes(date.getDay())}
                />
              </div>
            </div>
          </div>
          <div className="timeSlot-wraper">
            <h5>Time Slot</h5>
            <div className="TimePicker_wrap">

              {
                allSolts && allSolts.morning && allSolts.morning.map((item, key) => (
                  <>
                    <div>
                      <button onClick={() => handleTiming(item, key, "morning")}
                        value={selectedTime}
                        name="selectedTime" disabled={item.available === 0} className={`timeSlot ${(selectedTime === item.startTime) ? 'active' : ''}`}
                      >
                        {item.startTime}
                      </button>
                      <p className="slot">{item.available}  Slots</p>
                    </div>
                  </>

                ))
              }

              {
                allSolts && allSolts.evening && allSolts.evening.map((item, key) => (
                  <>
                    <div>
                      <button name="selectedTime" className={`timeSlot ${(selectedTime === item.startTime) ? 'active' : ''}`}
                        value={selectedTime}

                        onClick={() => handleTiming(item, key, "evening")} disabled={item.available === 0}>
                        {item.startTime}
                      </button>
                      <div className="slot">{item.available} Slots</div>
                    </div>
                  </>
                ))
              }
              <FormError
                show={!selectedTime && selectedTimeError}
                error="Please Provide Date and Time"
                className='visitorFormError'
              />
            </div>
          </div>


          <div className="datesec-wraper">
            <div className="datepicker footwrap">
              {edit ? <div className="button_group">
                <button className="button btn-o-primary btn-sm" type="button" onClick={closeModel}>Cancel</button>
                <button onClick={handleEdit} className="button button-primary btn-sm">{edit ? "Save Appointment" : "Edit Appointment"}</button>
              </div> : <div className="button_group">
                <button className="button btn-o-primary btn-sm" onClick={closeModel} >Cancel</button>
                <button onClick={handleSave} className="button button-primary btn-sm">Save</button>
              </div>}

            </div>

          </div>
        </ModalBody>
      </Modals>
    </>
  )
}

export default AddAppointmentPopup