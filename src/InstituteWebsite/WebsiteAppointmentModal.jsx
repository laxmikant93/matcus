import FormInput from "../Common/Form/FormInput"
import FormTextArea from "../Common/Form/FormTextArea"
import Modal from "../Common/Modal"
import ModalBody from "../Common/Modal/ModalBody"
import ModalHeader from "../Common/Modal/ModalHeader"
import ModalFooter from '../Common/Modal/ModalFooter'
import React, { useEffect, useState } from "react"
import PhoneInput from "react-phone-input-2"
import InputDateTimePicker from "../Common/Form/InputDateTimePicker"
import { useDispatch, useSelector } from "react-redux"
import { postAppointmentDetail, resetPostAppointmentDetail } from "../store/actions/bookAppointment"
import ValidationFile from "../Classes/ValidationFile";
import ValidationUtils from "../Classes/ValidationUtils";
import FormError from '../Common/Form/FormError';
import SelectInput from "../Common/Form/SelectInput"

const WebsiteAppoinmentModal = ({ show, onclose }) => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [bookingDateTime, setBookingDateTime] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [invalidEmailError, setInvalidEmailError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [appointmentReasonError, setAppointmentReasonError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [bookingDateTimeError, setBookingDateTimeError] = useState("");
  const [getCategoryListData, setGetCategoryListData] = useState("");

  const symbolsArr = [",", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")",
    "_", "-", "=", "+", ".", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`,
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const closeModal = () => {
    onclose();
  }

  const { insID, ownerID, loading, success, getCategoryData, getCategorySuccess, businesstype } = useSelector((state) => {
    return {
      ownerID: state.institutewebsite.data.owner,
      insID: state.institutewebsite.data._id,
      businesstype: state.user.user_business_type,
      loading: state.bookAppointment.postAppointment.loading,
      success: state.bookAppointment.postAppointment.success,
      // getCategorySuccess: state.bookAppointment.getCategoryList.success,
      // getCategoryData: state.bookAppointment.getCategoryList.data.category
    }
  })

  let dispatch = useDispatch();

  const handlePersonalDetails = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    switch (inputName) {
      case "full_name":
        setFullName(value);
        setFullNameError(ValidationUtils.isEmpty(value));
        break;
      case "email":
        setEmail(value);
        setInvalidEmailError(false);
        break;
      case "address":
        setAddress(value);
        break;
      case "Appointment_Reason":
        setAppointmentReason(value);
        setAppointmentReasonError(ValidationUtils.isEmpty(value));
        break;
      default:
        return false;
    }
  }

  const handlePhoneInput = (inputValue, countryDetail) => {
    let dialCode = countryDetail.dialCode;
    let mobile = inputValue.replace(dialCode, "");
    setContactNumber(mobile);
    setCountryCode(dialCode);
    setContactNumberError(ValidationUtils.isEmpty(mobile));
  }

  const handleDatePicker = (value) => {
    setBookingDateTime(value);

    if (value) {
      if (value < new Date()) {
        setBookingDateTimeError(true);
      }
      else {
        setBookingDateTimeError(false);
      }
    }
    else {
      setBookingDateTimeError(ValidationUtils.isEmpty(value));
    }
  }

  const handleCategorySelect = (e) => {
    let inputvalue = e.target.value;
    let data = getCategoryData.find((item) => item._id === inputvalue);
    setCategory(data.category_Name);
    setCategoryError(ValidationUtils.isEmpty(inputvalue));
    setGetCategoryListData(data);
    setSubCategory("");
  }
  const handleSubCategorySelect = (e) => {
    let inputvalue = e.target.value;
    setSubCategory(inputvalue);
    setSubCategoryError(ValidationUtils.isEmpty(inputvalue));
  }
  const appointmentDetails = {
    institute: insID,
    owner: ownerID,
    name: fullName,
    category: category,
    sub_category: subCategory,
    contact: contactNumber,
    address: address,
    email: email,
    appointment_reason: appointmentReason,
    countryCode: countryCode,
    booking_date_time: bookingDateTime,
    business: insID

  }

  const validEmail = () => {
    let isvalid = true;
    if (email) {
      if (!ValidationUtils.isEmail(email)) {
        isvalid = false;
      }
    }
    else {
      isvalid = true;
    }
    return isvalid;
  }

  const validBookingDateTime = () => {
    let isValid = true;
    if (bookingDateTime) {
      if (bookingDateTime < new Date()) {
        isValid = false;
      }
      else {
        isValid = true;
      }
    }
    else {
      isValid = false;
    }
    return isValid;
  }

  const validContactDetails = () => {
    let isValid = true;
    if (contactNumber && countryCode === "91") {
      if (contactNumber.length < 10) {
        isValid = false;
      }
      else {
        isValid = true;
      }
    }
    else {
      isValid = false;
    }
    return isValid;
  }
  const handleSubmitButton = () => {
    let emailValid = validEmail();
    setEmailError(!emailValid);
    let bookingTimingValid = validBookingDateTime();
    setBookingDateTimeError(!bookingTimingValid);
    let contactDetailsValid = validContactDetails();
    setContactNumberError(!contactDetailsValid);
    setInvalidEmailError(true);
    if (ValidationUtils.isEmpty(fullName)) {
      setFullNameError(true);
    }
    if (ValidationUtils.isEmpty(appointmentReason)) {
      setAppointmentReasonError(true);
    }
    if (ValidationUtils.isEmpty(category)) {
      setCategoryError(true);
    }
    if (ValidationUtils.isEmpty(subCategory)) {
      setSubCategoryError(true);
    }
    if (emailValid && bookingTimingValid && contactDetailsValid &&
      ValidationUtils.isNotEmpty(fullName) &&
      ValidationUtils.isNotEmpty(appointmentReason) &&
      ValidationUtils.isNotEmpty(category) &&
      ValidationUtils.isNotEmpty(subCategory)) {
      dispatch(postAppointmentDetail(businesstype, appointmentDetails));
    }
  }
  if (success) {
    onclose();
  }

  // useEffect(() => {
  //   dispatch(getCategoryList(insID));
  //   return () => {
  //     dispatch(resetPostAppointmentDetail());
  //   }
  // }, [dispatch, insID])

  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          title="Book Appointment"
          closeButton={true}
          onclose={closeModal}
        />
        <ModalBody className="EditService-MBody">
          <div className="formFieldwrap">
            <FormInput
              label="Full Name"
              placeholder="Full Name"
              name="full_name"
              maxLength={500}
              value={fullName}
              onChange={handlePersonalDetails}
              onKeyUp={handlePersonalDetails}
              onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            />
            <FormError
              show={fullNameError}
              error="Full name is required."
              className='visitorFormError'
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              label="Email"
              placeholder="Email"
              name="email"
              maxLength={500}
              value={email}
              onChange={handlePersonalDetails}
              onKeyUp={handlePersonalDetails}
            />
            <FormError
              show={email && emailError && invalidEmailError}
              error="Invalid Email. Please recheck and enter again."
              className='visitorFormError'
            />
          </div>
          <div className="formFieldwrap">
            <FormTextArea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              type="text"
              placeholder="Address"
              label="Address"
              name="address"
              style={{ whiteSpace: " pre-wrap" }}
              maxLength="1000"
              TextareaBtmTxt="1000"
              value={address}
              onChange={handlePersonalDetails}
              onKeyUp={handlePersonalDetails}
            ></FormTextArea>
          </div>

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
            </div>
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

          <div
            className="formFieldwrap mt-15"
          >
            <SelectInput
              id="profession_cat"
              name="Id_Proof"
              // value={category}
              onChange={handleCategorySelect}
              label="Select Category"
            >
              <option value="">
                Select Category
              </option>
              {getCategorySuccess ? (
                getCategoryData.length > 0 ? (
                  getCategoryData.map((item, key) => {
                    return (
                      <React.Fragment>
                        <option
                          key={item._id}
                          value={item._id}
                        >
                          {item.category_Name}
                        </option>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <option value="">No Records</option>
                )
              ) : (
                <option value="">Loading...</option>
              )}
            </SelectInput>
            {/* <label className="animLabel" htmlFor="profession_cat">
              Select Category
            </label> */}
            <FormError
              show={categoryError}
              error="Select Category."
              className='visitorFormError'
            />
          </div>

          {category &&
            <div
              className="formFieldwrap   mt-15"
            >
              <SelectInput
                id="profession_cat"
                name="Id_Proof"
                value={subCategory}
                onChange={handleSubCategorySelect}
                label="Select Sub Category"
              >
                <option value="">
                  Select Sub Category
                </option>
                ({(getCategoryListData.sub_category).length > 0 ? (
                  (getCategoryListData.sub_category).map((item, key) => {
                    return (
                      <React.Fragment>
                        <option
                          key={key}
                          value={item.sub_Category_Name}
                        >
                          {item.sub_Category_Name}
                        </option>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <option value="">No Records</option>
                )
                })
              </SelectInput>
              {/* <label className="animLabel" htmlFor="profession_cat">
                Select Sub Category
              </label> */}
              <FormError
                show={subCategoryError}
                error="Select Sub Category."
                className='visitorFormError'
              />
            </div>
          }

          <div className="SelectDemoTimeDateInput">
            <div className="datePickerWrap mt-30">
              <InputDateTimePicker
                label="Booking Date & Time*"
                name="class_timing"
                onSelect={(selectedDate) => handleDatePicker(selectedDate)}
                value={bookingDateTime}
                id="class_timing"
                type="datetime-local"
                placeholder="Schedule Demo"
                minDate={new Date()}
              />
              <FormError
                show={!bookingDateTime && bookingDateTimeError}
                error="Select Booking Date and Time."
                className='visitorFormError'
              />
            </div>

            <FormError
              show={bookingDateTime && bookingDateTimeError}
              error="Booking Timings should be in future."
              className='visitorFormError'
            />
          </div>

          <div className="formFieldwrap">
            <FormTextArea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              type="text"
              placeholder="Appointment Reason"
              label="Appointment Reason"
              name="Appointment_Reason"
              style={{ whiteSpace: " pre-wrap" }}
              maxLength="1000"
              TextareaBtmTxt="1000"
              value={appointmentReason}
              onChange={handlePersonalDetails}
              onKeyUp={handlePersonalDetails}
            ></FormTextArea>
            <FormError
              show={appointmentReasonError}
              error="Appointment Reason is required."
              className='visitorFormError'
            />
          </div>

        </ModalBody>
        <ModalFooter>
          <React.Fragment>
            {loading ?
              <button
                className="button  btn-sm"
              >
                Submiting...
              </button>
              :
              <button
                className="button  btn-sm"
                onClick={handleSubmitButton}
              >
                Submit
              </button>}

          </React.Fragment>

        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}
export default WebsiteAppoinmentModal
