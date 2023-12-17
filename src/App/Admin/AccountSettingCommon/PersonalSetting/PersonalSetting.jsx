import React from 'react';
import { useRef } from 'react';
import { useEffect, useState } from "react";
import { set } from 'react-ga';
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ValidationFile from '../../../../Classes/ValidationFile';
import CountryStateFlagDropdown from '../../../../Common/CountryFlag/CountryStateFlag';
import CountrySelect from '../../../../Common/Form/CountrySelect';
import FormError from '../../../../Common/Form/FormError';
import FormInput from '../../../../Common/Form/FormInput';
import InputDatePicker from '../../../../Common/Form/InputDatePicker';
import SelectInput from '../../../../Common/Form/SelectInput';
import StateSelect from '../../../../Common/Form/StateSelect';
import { changeUserInfo } from '../../../../store/actions/user';
import CommonOtpVerificationPersonal from '../../../Auth/AuthV1/CommonOtpVerificationPersonal';
import ContactEmailVerify from '../../../Dashboard/ContactEmailVerify';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import './personalSetting.scss';

const PersonalSetting = () => {

  let dispatch = useDispatch();
  let history = useNavigate();
  const verifyModals = useRef(null);

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })

  const [user_suitable_role, setuser_suitable_role] = useState("");
  const [user_fullname, setuser_fullname] = useState("");
  const [user_email, setuser_email] = useState("");
  const [user_contact, setuser_contact] = useState(""); //1
  const [user_country_code, setuser_country_code] = useState(""); //5
  const [user_gender, setuser_gender] = useState("");
  const [user_dob, setuser_dob] = useState(""); //2
  const [user_blood_group, setuser_blood_group] = useState("");
  const [user_aadhar_number, setuser_aadhar_number] = useState("");
  const [user_father_name, setuser_father_name] = useState("");
  const [user_father_occupation, setuser_father_occupation] = useState("");
  const [user_guardian_name, setuser_guardian_name] = useState("");
  const [user_guardian_occupation, setuser_guardian_occupation] = useState("");
  const [user_relation_with_guardian, setuser_relation_with_guardian] = useState("");
  const [user_address_line_1, setuser_address_line_1] = useState("");
  const [user_address_line_2, setuser_address_line_2] = useState("");
  const [user_country, setuser_country] = useState(""); //3
  const [user_state, setuser_state] = useState(""); //4
  const [user_city, setuser_city] = useState("");
  const [user_zipcode, setuser_zipcode] = useState("");
  const [verifyState, setVerifyState] = useState("");
  const [sendOTP, setSendOTP] = useState(false);
  const [disabledContact, setdisabledContact] = useState(false);
  const [disabledEmail, setdisabledEmail] = useState(false);
  const [profession_name, setprofession_name] = useState("");
  const [save, setSave] = useState(false);

  //error states
  const [user_country_error, setuser_country_error] = useState(false);
  const [user_state_error, setuser_state_error] = useState(false);
  const [user_city_error, setuser_city_error] = useState(false);
  const [user_zipcode_error, setuser_zipcode_error] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [fullnameError, setFullNameError] = useState(false);
  const [sutibale_role_error, setsutibale_role_error] = useState(false);
  const [profession_name_error, setprofession_name_error] = useState("");

  const [successMessage, success, errorMessage, error, resetAll, verifyOtpLoading, loading, sendEmailVerificationMail,
    VerifyEmailMail, sendContactVerificationOtp, VerifyContactOtp] = CommonOtpVerificationPersonal();

  const handleChange = (e) => {
    let inputName = e.target.name;
    let inputvalue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputvalue);
    switch (inputName) {
      case "full_name":
        setuser_fullname(value);
        setFullNameError(false);
        break;
      case "suitable_role":
        setuser_suitable_role(value);
        setsutibale_role_error(false);
        if (value === "InstituteOwner" || value === "Teacher" || value === "Student") {
          setprofession_name("");
        }
        break;
      case "email":
        resetAll();
        setuser_email(value);
        setdisabledEmail(true);
        setShowError(false);
        break;
      case "select_gender":
        setuser_gender(value);
        break;
      case "blood_group":
        setuser_blood_group(value);
        break;
      case "aadhaar_number":
        setuser_aadhar_number(value);
        break;
      case "fatherName":
        setuser_father_name(value);
        break;
      case "fatherOccupation":
        setuser_father_occupation(value);
        break;
      case "guardianName":
        setuser_guardian_name(value);
        break;
      case "guardianOccupation":
        setuser_guardian_occupation(value);
        break;
      case "guardianRelation":
        setuser_relation_with_guardian(value);
        break;
      case "address1Wrap":
        setuser_address_line_1(value);
        break;
      case "address2Wrap":
        setuser_address_line_2(value);
        break;
      case "cityName":
        setuser_city(value);
        setuser_city_error(false);
        break;
      case "zipCode":
        setuser_zipcode(value);
        setuser_zipcode_error(false);
        break;
      case "profession_name":
        setprofession_name(value);
        setprofession_name_error(false);
        setSave(true);
        break;
      default:
        break
    }
  }

  const handlePhoneInput = (inputValue, countryDetail) => {
    let dialCode = countryDetail.dialCode;
    let mobile = inputValue.replace(dialCode, "");
    setuser_contact(mobile);
    setuser_country_code(dialCode);
    setContactError(ValidationFile.isEmpty(inputValue));
    setShowError(false);
    resetAll();
    setdisabledContact(true);
  }

  const handleBirthdate = (value) => {
    setuser_dob(value);
  }

  const handleCountryInput = (value) => {
    setuser_country(value.country);
    setuser_country_error(false);

  }


  // const handleCountryFlag = (data) => {
  //   handleSetCoutry(data.country, "country")
  //   handleSetCoutry(data.value, "countryFlag")
  //   setAutoCheckState(true)
  // }

  const handleStateInput = (value) => {
    setuser_state(value);
    setuser_state_error(false);
  }


  useEffect(() => {
    if (user) {
      setuser_fullname(user?.user_fullname)
      setuser_suitable_role(user?.user_usertype === "Other" ? user?.user_otherUserTypeName : user?.user_usertype);
      setuser_email(user?.user_email);
      setuser_contact(user?.user_contact);
      setuser_country_code(user?.user_country_code ? user.user_country_code : 91);
      setuser_gender(user?.user_gender);
      setuser_dob(user?.user_dob);
      setuser_blood_group(user?.user_bloodGroup);
      setuser_aadhar_number(user?.user_aadharNumber);
      setuser_address_line_1(user?.user_fulladdress);
      setuser_father_name(user?.user_parent_name);
      setuser_father_occupation(user?.user_parent_occupation);
      setuser_guardian_name(user?.user_guardianName);
      setuser_guardian_occupation(user?.user_guardianOccupation);
      setuser_relation_with_guardian(user?.user_guardianRelation);
      setuser_address_line_2(user?.user_addressSecondary);
      setuser_country(user?.user_country);
      setuser_state(user?.user_state);
      setuser_city(user?.user_city);
      setuser_zipcode(user?.user_pincode);
      setprofession_name(user?.user_otherUserTypeName)
    }
  }, [user])

  const handleUpdateButton = () => {
    let valid = AddressValidation();
    let requiredLMS = LMSRequiredFields();
    let data = {
      fullname: user_fullname,
      usertype: profession_name ? "Other" : user_suitable_role,
      email: user_email,
      contact: user_contact,
      country_code: user_country_code,
      gender: user_gender,
      dob: user_dob,
      bloodGroup: user_blood_group,
      aadharNumber: user_aadhar_number,
      fulladdress: user_address_line_1,
      parent_name: user_father_name,
      parent_occupation: user_father_occupation,
      guardianName: user_guardian_name,
      guardianOccupation: user_guardian_occupation,
      guardianRelation: user_relation_with_guardian,
      addressSecondary: user_address_line_2,
      country: user_country,
      state: user_state,
      city: user_city,
      pincode: user_zipcode,
      otherUserTypeName: profession_name
    }
    let EcomServiceData = {
      fullname: user_fullname,
      email: user_email,
      contact: user_contact,
      country_code: user_country_code,
      gender: user_gender,
      dob: user_dob,
      fulladdress: user_address_line_1,
      addressSecondary: user_address_line_2,
      country: user_country,
      state: user_state,
      city: user_city,
      pincode: user_zipcode
    }

    if (ValidationFile.isEmpty(user_fullname)) {
      setFullNameError(true);
    }

    if (ValidationFile.isEmpty(user_suitable_role)) {
      setsutibale_role_error(true);
    }

    if (user.user_business_type === "LMS") {
      if (valid && requiredLMS && !disabledEmail && !disabledContact &&
        ValidationFile.isNotEmpty(user_fullname) && ValidationFile.isNotEmpty(user_suitable_role)) {
        dispatch(changeUserInfo(user._id, data, user.user_business_type, true));
        setuser_country_error(false);
        setuser_city_error(false);
        setuser_state_error(false);
        setuser_zipcode_error(false);
        setsutibale_role_error(false);
      }
      else {
        setIsSubmit(true);
      }
    }
    else if (valid && !disabledEmail && !disabledContact && ValidationFile.isNotEmpty(user_fullname)) {
      dispatch(changeUserInfo(user._id, EcomServiceData, user.user_business_type, true));
      setuser_country_error(false);
      setuser_city_error(false);
      setuser_state_error(false);
      setuser_zipcode_error(false);
    }
    else {
      setIsSubmit(true);
    }
  }

  const handleCancelButton = () => {
    history("/");
  }

  const AddressValidation = () => {
    let isvalid = true;
    if (user_address_line_1) {
      if (ValidationFile.isNotEmpty(user_country) && ValidationFile.isNotEmpty(user_state
        && ValidationFile.isNotEmpty(user_city) && ValidationFile.isNotEmpty(user_zipcode))) {
        isvalid = true;
      }
      else {
        isvalid = false;
        setuser_country_error(true);
        setuser_city_error(true);
        setuser_zipcode_error(true);
        if (ValidationFile.isNotEmpty(user_country)) {
          setuser_state_error(true);
        }
      }
    }
    return isvalid;
  }

  const LMSRequiredFields = () => {
    let isvalid = true;
    if (ValidationFile.isNotEmpty(user_suitable_role) && ValidationFile.isNotEmpty(user_email)) {
      isvalid = true;
    }
    else {
      isvalid = false;
    }
    return isvalid;
  }

  const closeMainPopUp = (item) => {
    setVerifyState("");
    setdisabledContact(false);
    setdisabledEmail(false);
    verifyModals.current.close();
    if (item) {
      setuser_email(user?.user_email ? user.user_email : "");
      setuser_contact(user?.user_contact ? user.user_contact : "");
    }
    setuser_country_code(91);
    // setshowModalPopUp(false);
  }

  const validContact = () => {
    let isValid = true;
    if (user_contact && user_country_code) {
      if (user_country_code.toString() === "91" && user_contact.toString().length === 10) {
        isValid = true;
      } else if (user_country_code !== "91" && (user_contact.length > 4 && user_contact.length.length < 17)) {
        isValid = true;
      } else {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    if (isValid) {
      setContactError(false);
    } else {
      setContactError(true);
    }
    return isValid;
  };

  const handleVerifyContactButton = async (e) => {
    let valid = validContact();
    e.preventDefault();
    setShowError(true);
    setVerifyState("addContact");
    if (valid) {
      await sendContactVerificationOtp({ contact: user_contact, country_code: user_country_code });
    }
  }

  useEffect(() => {
    if (success) {
      resetAll()
      setSendOTP(true);
      verifyModals.current.open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])


  const handleVerifyCancelButton = (type) => {
    if (type === "contact") {
      setuser_contact(user?.user_contact ? user.user_contact : "");
      setuser_country_code(91);
      setdisabledContact(false);
      setIsSubmit(false);
    }
    else {
      setuser_email(user?.user_email ? user.user_email : "");
      setdisabledEmail(false);
      setIsSubmit(false);
    }
  }

  const handleChangeButton = (type) => {
    if (type === "email") {
      setdisabledEmail(true);
    }
    else {
      setdisabledContact(true);
    }
  }

  const validEmailId = () => {
    let isValid = true;
    if (user_email) {
      if (!ValidationFile.isEmail(user_email)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = false;
    }
    if (isValid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    return isValid;
  };

  const handleVerifyEmailButton = async (e) => {
    let valid = validEmailId();
    e.preventDefault();
    setShowError(true);
    setVerifyState("addEmail");
    if (valid) {
      await sendEmailVerificationMail({ email: user_email, userID: user._id });
    }
  }

  const handleSaveButton = () => {
    if (profession_name) {
      setuser_suitable_role(profession_name);
    }
    else {
      setuser_suitable_role("Other");
    }
    setSave(false);
  }

  return (
    <div className='personalSetting-wrap'>
      <div className='personalSetting-wrapper'>
        {user.user_business_type === "LMS" &&
          <div className='selectRole-wrap'>
            <div className="formFieldwrap">
              <div>
                <p className='text-xs w-400 base mb-12'>Define your best suitable role</p>
              </div>
              <SelectInput
                name="suitable_role"
                value={user_suitable_role}
                onChange={handleChange}
                labelPosition="top">
                {!user_suitable_role && <option value="">Select Role</option>}
                <option value="InstituteOwner">Institute Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
                {user_suitable_role !== "InstituteOwner" && user_suitable_role !== "Teacher" &&
                  user_suitable_role !== "Student" && user_suitable_role !== "Other" ?
                  <option value={user_suitable_role}>{user_suitable_role}</option>
                  :
                  <option value="Other">Other</option>
                }
              </SelectInput>
              <FormError
                show={!user_suitable_role && sutibale_role_error}
                error="Please select suitable role."
              />
              {user_suitable_role === "Other" &&
                <div>
                  <FormInput
                    name="profession_name"
                    value={profession_name}
                    onChange={handleChange}
                    onKeyUp={handleChange}
                    type="text"
                    maxLength={80}
                    labelPosition="top"
                    label="Tell us about your profession"
                    placeholder="Enter your role"
                  // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                  />
                  <FormError
                    show={profession_name_error}
                    error="Please enter your role."
                  />
                  {save &&
                    <button
                      // className="button"
                      onClick={handleSaveButton}
                    >Save</button>
                  }
                </div>
              }

            </div>
          </div>
        }

        {/* full name*/}
        <div>
          <div className="formFieldwrap">
            <FormInput
              name="full_name"
              value={user_fullname}
              onChange={handleChange}
              onKeyUp={handleChange}
              type="text"
              maxLength={80}
              labelPosition="top"
              label="Full Name"
              placeholder="Enter Full Name"
            // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            />
            <FormError
              show={fullnameError}
              error="Full name required."
            />
          </div>
        </div>

        {/* Mobile Number */}

        <div className='mobileNumber-wrap'>
          <p className='mb-3'>Mobile Number</p>
          <div className="formFieldwrap mobileFormFiled">
          <div className="cstmPhoneInput">

            <PhoneInput

              disabled={user.user_contact && !disabledContact}
              value={`${user_country_code}${user_contact} `}
              onChange={(value, country) => {
                handlePhoneInput(value, country);
              }}
              countryCodeEditable={false}
              containerClass="form-group"
              inputClass="form-control"
              country={"in"}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              enableSearch
              disableSearchIcon
            />
            <FormError
              show={user_contact === "" && contactError && showError}
              error="contact is required."
            />
            <FormError
              show={user_contact !== "" && contactError && showError}
              error="invalid contact number."
            />
            <FormError
              show={errorMessage === "Contact Not Available" && showError && error}
              error="contact already exist."
            />
            <FormError
              show={isSubmit && disabledContact}
              error="Please verify your contact."
            />
          </div>
            {user.user_contact && user_contact && !disabledContact ?
              <div className='mobile-verify-wrap'>
                {/* when user will is verifyed it will show change text */}
                {/* <p className='text-xxs w-500 primary'>Verify</p> */}
                <p className='text-xxs w-500 primary' onClick={() => handleChangeButton("contact")}>Change</p>
              </div>
              :
              disabledContact && user_contact ?
                <div className='mobile-verify-wrap'>
                  {/* when user will is verifyed it will show change text */}
                  <p className='text-xxs w-500' onClick={() => handleVerifyCancelButton("contact")}>Cancel</p>
                  <p className='text-xxs w-500 primary' onClick={handleVerifyContactButton}>Verify</p>
                </div>
                :
                <div className='mobile-verify-wrap'>
                </div>
            }


          </div>
          {/* <MessageDisplay type={'success'} text={'Phone number changed successfully!'} /> */}
        </div>
        {/* Email address */}
        <div className='email-wrap'>
          <div className="formFieldwrap">
            <FormInput
              name="email"
              value={user_email}
              onChange={handleChange}
              onKeyUp={handleChange}
              type="email"
              maxLength={79}
              labelPosition="top"
              label="Email Address"
              placeholder="Enter your Email Address"
              disabled={user.user_email && !disabledEmail}
            // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}

            />
            <FormError
              show={user_email === "" && emailError && showError}
              error="email is required."
            />
            <FormError
              show={user_email !== "" && emailError && showError}
              error="email is invalid."
            />
            <FormError
              show={errorMessage === "Email Not Available" && showError && error}
              error="email already exist."
            />
            <FormError
              show={isSubmit && disabledEmail}
              error="Please verify your email."
            />

            {user.user_email && user_email && !disabledEmail ?
              <div className='mobile-verify-wrap'>
                {/* when user will is verifyed it will show change text */}
                {/* <p className='text-xxs w-500 primary'>Verify</p> */}
                <p className='text-xxs w-500 primary' onClick={() => handleChangeButton("email")}>Change</p>
              </div>
              :
              disabledEmail && user_email ?
                <div className='mobile-verify-wrap'>
                  {/* when user will is verifyed it will show change text */}
                  <p className='text-xxs w-500' onClick={() => handleVerifyCancelButton("email")}>Cancel</p>
                  <p className='text-xxs w-500 primary' onClick={handleVerifyEmailButton}>Verify</p>
                </div>
                :
                <div className='mobile-verify-wrap'>
                  {/* when user will is verifyed it will show change text */}
                  {/* <p className='text-xxs w-500' onClick={handleVerifyCancelButton}>Cancel</p>
                  <p className='text-xxs w-500 primary' onClick={handleVerifyContactButton}>Verify</p> */}
                </div>
            }
          </div>
        </div>

        {/* Gender Select */}
        <div className='selectGender-wrap'>
          <div className="formFieldwrap">
            <div>
              <p className='text-xs w-400 base mb-12'>Gender</p>
            </div>
            <SelectInput
              name="select_gender"
              value={user_gender}
              onChange={handleChange}
              placeholder={'Select your Genders sdsd'}
              labelPosition="top">
              <option value="">Select your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>

            </SelectInput>
            <FormError
              show={false}
              error="  "
            />
          </div>
        </div>
        {/* DOB Select */}
        <div className='dob-wrap'>
          <div>
            <p className='text-xs w-400 base mb-12'>Date of Birth</p>
          </div>
          <div className="datePickerWrap">
            <InputDatePicker
              name="dob"
              type="date"
              // maxDate={moment().toDate()}
              onSelect={(selectedDob) => {
                handleBirthdate(selectedDob);
              }}
              // label="Date of Birth"
              placeholder="MM/DD/YYYY"
              value={user_dob}
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
        </div>

        {user.user_business_type === "LMS" &&
          <React.Fragment>
            {/* Blood group */}
            <div className='bloodGroup-wrap'>
              <div className="formFieldwrap">
                <div>
                  <p className='text-xs w-400 base mb-12'>Blood Group</p>
                </div>
                <SelectInput
                  name="blood_group"
                  value={user_blood_group}
                  onChange={handleChange}
                  // label={"Define your best suitable role"}
                  placeholder={'Select your Genders sdsd'}
                  labelPosition="top">
                  <option value="">Select your Blood Group</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </SelectInput>
                <FormError
                  show={false}
                  error="  "
                />
              </div>
            </div>

            {/* Aadhaar Number */}
            <div className='aadhaar-wrap'>
              <div className="formFieldwrap">
                <FormInput
                  name="aadhaar_number"
                  value={user_aadhar_number}
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  type="number"
                  maxLength={16}
                  labelPosition="top"
                  label="Aadhaar Number"
                  placeholder="Enter Aadhaar Number"
                // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                />
                <FormError
                  show={false}
                  error=""
                />
              </div>
            </div>
          </React.Fragment>
        }


        {user_suitable_role === "Student" &&
          <React.Fragment>
            {/* Father's name */}
            <div className='fatherName-wrap'>
              <div className="formFieldwrap">
                <FormInput
                  name="fatherName"
                  value={user_father_name}
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  type="text"
                  maxLength={79}
                  labelPosition="top"
                  label="Father’s Name"
                  placeholder="Enter your Father’s name"
                // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}

                />
                <FormError
                  show={false}
                  error=""
                />
              </div>
            </div>

            {/* Father’s Occupation */}
            <div className='fatherOccupation-wrap'>
              <div className="formFieldwrap">
                <FormInput
                  name="fatherOccupation"
                  value={user_father_occupation}
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  type="text"
                  maxLength={79}
                  labelPosition="top"
                  label="Father’s Occupation"
                  placeholder="Enter your Father’s occupation"
                // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}

                />
                <FormError
                  show={false}
                  error=""
                />
              </div>
            </div>

            {/*Guardian’s Name */}
            <div className='guardianName-wrap'>
              <div className="formFieldwrap">
                <FormInput
                  name="guardianName"
                  value={user_guardian_name}
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  type="text"
                  maxLength={79}
                  labelPosition="top"
                  label="Guardian’s Name"
                  placeholder="Enter your Guardian’s name"
                // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}

                />
                <FormError
                  show={false}
                  error=""
                />
              </div>
            </div>

            {/* Guardian’s Occupation*/}
            <div className='guardianOccupation-wrap'>
              <div className="formFieldwrap">
                <FormInput
                  name="guardianOccupation"
                  value={user_guardian_occupation}
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  type="text"
                  maxLength={79}
                  labelPosition="top"
                  label="Guardian’s Occupation"
                  placeholder="Enter your Guardian’s occupation"
                // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                />
                <FormError
                  show={false}
                  error=""
                />
              </div>
            </div>

            {/* Relation with Guardian*/}
            <div className='guardianRelation-wrap'>
              <div className="formFieldwrap">
                <FormInput
                  name="guardianRelation"
                  value={user_relation_with_guardian}
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  type="text"
                  maxLength={79}
                  labelPosition="top"
                  label="Relation with Guardian"
                  placeholder="What’s your relation with the Guardian"
                // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                />
                <FormError
                  show={false}
                  error=""
                />
              </div>
            </div>
          </React.Fragment>
        }

      </div >
      <div className='address-wrap'>
        {/* Address Line 1*/}
        <div className='address1-wrap'>
          <div className="formFieldwrap">
            <FormInput
              name="address1Wrap"
              value={user_address_line_1}
              onChange={handleChange}
              onKeyUp={handleChange}
              type="text"
              maxLength={79}
              labelPosition="top"
              label="Address Line 1"
              placeholder="Enter your Address"
            // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            />
            <FormError
              show={false}
              error=""
            />
          </div>
        </div>

        {/* Address Line 2*/}
        <div className='address2-wrap'>
          <div className="formFieldwrap">
            <FormInput
              name="address2Wrap"
              value={user_address_line_2}
              onChange={handleChange}
              onKeyUp={handleChange}
              type="text"
              maxLength={79}
              labelPosition="top"
              label="Address Line 2"
              placeholder="Enter your Address (Optional)"
            // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            />
            <FormError
              show={false}
              error=""
            />
          </div>
        </div>


        <div className='selectCountry-wrap'>
          <div>
            <p className='text-xs w-400 base mb-12'>Select Country*</p>
          </div>
          <div className="formFieldwrap">
            {/* <CountrySelect
              name="select_country"
              id="select_country"
              value={user_country}
              onSelect={(value) => handleCountryInput(value)}
              // onEvent={handleInput}
              autoevent={true}
            // label="Select country"
            // className={
            //   institute_country_error && isSubmit ? "errorInput" : ""
            // }
            /> */}
            <CountryStateFlagDropdown
              CountryCode={false}
              label="Select Country"
              onSelect={(value) => handleCountryInput(value)}
              selectedCountry={user_country}
              // selectedFlag={inputValue.countryFlag}
              CountryName={true}
            />
            <FormError
              show={user_country_error && !user_country}
              error="Please select country."
            />
          </div>
        </div>

        {/* Select State* */}


        <div className='selectState-wrap'>
          <div>
            <p className='text-xs w-400 base mb-12'>Select State*</p>
          </div>
          <div className="formFieldwrap">
            <StateSelect
              name="select_state"
              id="select_state"
              value={user_state}
              onSelect={(value) => handleStateInput(value)}
              // onEvent={handleInput}
              label="Select state"
            // className={
            //   institute_state_error && isSubmit ? "errorInput" : ""
            // }
            />
            {/* {console.log(((!user_state && user_state === "") && user_country), user_country, user_state)} */}
            <FormError
              // show={(!user_state && user_state === "") && user_country}
              show={user_state_error && !user_state && user_state === ""}
              error="Please provide state."
            />
          </div>
        </div>

        {/* City Name */}
        <div className='fatherName-wrap'>
          <div className="formFieldwrap">
            <FormInput
              name="cityName"
              value={user_city}
              onChange={handleChange}
              onKeyUp={handleChange}
              type="text"
              maxLength={79}
              labelPosition="top"
              label="City Name"
              placeholder="Enter your city name"
            // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            />
            <FormError
              show={user_city_error && !user_city}
              error="Please enter city."
            />
          </div>
        </div>


        {/* Zip Code */}
        <div className='fatherName-wrap'>
          <div className="formFieldwrap">
            <FormInput
              name="zipCode"
              value={user_zipcode}
              onChange={handleChange}
              onKeyUp={handleChange}
              type="text"
              maxLength={79}
              labelPosition="top"
              label="Zip Code"
              placeholder="Enter zip code"
            // onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            />
            <FormError
              show={user_zipcode_error && !user_zipcode}
              error="Please enter Zip Code"
            />
          </div>
        </div>
      </div>

      <div>
        <ContactEmailVerify verifyState={verifyState} testModals={verifyModals}
          closeMainPopUp={(item) => closeMainPopUp(item)} accountContact={user_contact} accountEmail={user_email}
          accountCountryCode={user_country_code} sendOTP={sendOTP} setSendOTP={(val) => setSendOTP(val)} />
      </div>

      <div className='personalSetting-btn-wraper'>
        <button className='button btn-sm button-primary'
          onClick={handleUpdateButton}
        >Update</button>
        <button className='button btn-sm btn-o-silver '
          onClick={handleCancelButton}
        >Cancel</button>
      </div>
    </div>
  );
}

export default PersonalSetting;