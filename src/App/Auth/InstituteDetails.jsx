import React, { useEffect, useState } from 'react'
import FormError from '../../Common/Form/FormError'
import FormInput from '../../Common/Form/FormInput'
import AuthTimeLineLayout from "./AuthTimeLineLayout"
import StateSelect from "../../Common/Form/StateSelect";
import CountrySelect from "../../Common/Form/CountrySelect";
import PhoneInput from 'react-phone-input-2';

import ZipCodes from "../../Common/Zipcodes/Zipcodes.json";
// import { useSelector } from 'react-redux';
import ValidationFile from '../../Classes/ValidationFile';
import SessionStorage from '../../Classes/SessionStorage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SelectInput from '../../Common/Form/SelectInput';
const InstituteDetails = () => {
  const [countryZipCodeIndex, setCountryZipCodeIndex] = useState("");
  const [countryZipCodeError, setCountryZipCodeError] = useState(false);
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  // const { token } = useSelector((state) => {
  //   return {
  //     token: state.user.token,
  //   };
  // });
  // const history = useNavigate()

  // useEffect(() => {
  //   if (submitRegisterInstitute) {
  //     handleSubmit();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [submitRegisterInstitute]);

  // RETURN TRUE FOR VALID FORM DATA AND FALSE FOR INVALID FORM DATA
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const isFormValid = () => {
    return registerInstitute.institute_email.isValid &&
      registerInstitute.institute_name.isValid &&
      registerInstitute.institute_category.isValid &&
      registerInstitute.institute_phone.isValid &&
      registerInstitute.institute_country.isValid &&
      registerInstitute.institute_city.isValid &&
      registerInstitute.institute_address.isValid &&
      registerInstitute.institute_state.isValid &&
      registerInstitute.institute_zipcode.isValid &&
      !countryZipCodeError
      ? true
      : false;
  };


  // LOCAL STATE FOR INSTITUTE REGISTRATION
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [isFilled, setIsfilled] = useState(false);
  const [showError, setShowError] = useState(false);
  const history = useNavigate()
  const [registerInstitute, setRegisterInstitute] = useState({
    institute_name: {
      value: "",
      isValid: false,
    },
    institute_category: {
      value: "",
      isValid: false,
    },
    institute_email: {
      value: "",
      isValid: false,
    },
    institute_phone: {
      value: "",
      isValid: false,
    },
    institute_phone_country_code: {
      value: "91",
      isValid: false,
    },
    institute_address: {
      value: "",
      isValid: false,
    },
    institute_address_line2: {
      value: "",
      isValid: false,
    },
    institute_address_line3: {
      value: "",
      isValid: false,
    },
    institute_country: {
      value: "",
      isValid: false,
    },
    institute_state: {
      value: "",
      isValid: false,
    },
    institute_city: {
      value: "",
      isValid: false,
    },
    institute_zipcode: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  // REACT HOOK METHOD FOR RETRIEVING INSTITUTE DETAILS FOR EDITING
  useEffect(() => {
    // CHECKS IS AVAILABLE
    if (SessionStorage.alive("RegisterInstitiute")) {
      // GETTING DATA FROM LOCAL STORAGE
      const instituteValue = SessionStorage.getJson("RegisterInstitiute");
      // ASSIGN TO VARIABLE
      const institute_name = instituteValue.institute_name;
      const institute_category = instituteValue.institute_category;
      const institute_email = instituteValue.institute_email;
      const institute_phone = instituteValue.institute_phone;
      const institute_phone_country_code =
        instituteValue.institute_phone_country_code;
      const institute_address = instituteValue.institute_address;
      const institute_address_line2 = instituteValue.institute_address_line2;
      const institute_address_line3 = instituteValue.institute_address_line3;
      const institute_country = instituteValue.institute_country;
      const institute_state = instituteValue.institute_state;
      const institute_city = instituteValue.institute_city;
      const institute_zipcode = instituteValue.institute_zipcode;

      const registerInstituteData = {
        ...registerInstitute,
        institute_name: {
          value: institute_name,
          isValid: ValidationFile.validEmpty(institute_name),
        },
        institute_category: {
          value: institute_category,
          isValid: ValidationFile.validEmpty(institute_category),
        },
        institute_email: {
          value: institute_email,
          isValid: ValidationFile.validEmail(institute_email),
        },
        institute_phone: {
          value: institute_phone,
          isValid: true,
        },
        institute_phone_country_code: {
          value: institute_phone_country_code,
          isValid: true,
        },
        institute_address: {
          value: institute_address,
          isValid:
            ValidationFile.validEmpty(institute_address) &&
            institute_address.length < 65,
        },
        institute_address_line2: {
          value: institute_address_line2,
          isValid: true,
        },
        institute_address_line3: {
          value: institute_address_line3,
          isValid: true,
        },
        institute_country: {
          value: institute_country,
          isValid: ValidationFile.validEmpty(institute_country),
        },
        institute_state: {
          value: institute_state,
          isValid: ValidationFile.validEmpty(institute_state),
        },
        institute_city: {
          value: institute_city,
          isValid: ValidationFile.validEmpty(institute_city),
        },
        institute_zipcode: {
          value: institute_zipcode,
          isValid: ValidationFile.validEmpty(institute_zipcode),
        },
        validation: isFormValid(),
      };
      // SETTING VALUE TO LOCAL STATE
      setRegisterInstitute(registerInstituteData);
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (let i = 0; i < ZipCodes.zipCode.length; i++) {
      if (
        registerInstitute.institute_country.value ===
        ZipCodes.zipCode[i].Country
      ) {
        setCountryZipCodeIndex(i);
        ZipCodeValidCheckUseEffect(i);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerInstitute.institute_country.value]);

  // HANDLING FORM INPUT TO STATE VARIABLE
  const handleInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const registerInstituteData = {
      ...registerInstitute,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue.trim(), inputName),
      },
      validation: isFormValid(),
    };
    if (inputName === "institute_country" && inputValue === "") {
      setCountryZipCodeIndex("");
      setCountryZipCodeError(false);
    }
    // SETTING ERROR FALSE WHILE TYPING
    setShowError(false);
    ZipCodeValidCheck();
    // SETTING VALUE TO LOCAL STATE
    setRegisterInstitute(registerInstituteData);
  };

  // IT CHECK FOR VALIDATION REQUIRED FIELD IN FORM
  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "institute_name":
        return ValidationFile.validEmpty(inputValue);
      case "institute_category":
        return ValidationFile.validEmpty(inputValue);
      case "institute_address":
        return ValidationFile.validEmpty(inputValue) && inputValue.length < 65;
      case "institute_country":
        return ValidationFile.validEmpty(inputValue);
      case "institute_state":
        return ValidationFile.validEmpty(inputValue);
      case "institute_city":
        return ValidationFile.validEmpty(inputValue);
      case "institute_zipcode":
        return ValidationFile.validEmpty(inputValue);
      case "institute_email":
        return ValidationFile.validEmail(inputValue);
      default:
        break;
    }
  };

  // RETURNS INSTITUTE DATA IN OBJECT
  const getInstituteData = () => {
    return {
      institute_name: registerInstitute.institute_name.value,
      institute_category: registerInstitute.institute_category.value,
      institute_email: registerInstitute.institute_email.value,
      institute_phone: registerInstitute.institute_phone.value,
      institute_address: registerInstitute.institute_address.value,
      institute_address_line2: registerInstitute.institute_address_line2.value,
      institute_address_line3: registerInstitute.institute_address_line3.value,
      institute_country: registerInstitute.institute_country.value,
      institute_state: registerInstitute.institute_state.value,
      institute_city: registerInstitute.institute_city.value,
      institute_zipcode: registerInstitute.institute_zipcode.value,
      institute_phone_country_code:
        registerInstitute.institute_phone_country_code.value,
    };
  };
  const ZipCodeValidCheck = () => {
    if (registerInstitute.institute_zipcode.value && countryZipCodeIndex) {
      let RegExCHeck = ZipCodes.zipCode[countryZipCodeIndex].Regex;
      var pattern = new RegExp(RegExCHeck);
      if (pattern.test(registerInstitute.institute_zipcode.value)) {
        setCountryZipCodeError(false);
        return true;
      } else {
        setCountryZipCodeError(true);
        return false;
      }
    }
  };

  // FINAL FORM SUBMIT HANDLER
  const handleSubmit = (event) => {
    event && event.preventDefault()
    ZipCodeValidCheck();
    setShowError(true);
    if (isFormValid()) {
      // if (submitRegisterInstitute) {
      const regInstitute = getInstituteData();
      SessionStorage.setJson("RegisterInstitiute", regInstitute);
      history(`/getwebsiteV1`)
      // regInsData();
      // }
    }
    //  else {
    //   ChangeSubmitValidationCheck();
    // }
  };

  // FINAL SUBMIT METHOD IS INVOKED IF CONTINUE BUTTON IS PRESSED

  // FINAL SUBMIT IS INVOKED IF ALL THE VALIDATION IS TRUE
  if (
    registerInstitute.institute_name &&
    registerInstitute.institute_category &&
    registerInstitute.institute_phone &&
    registerInstitute.institute_email &&
    registerInstitute.institute_address &&
    registerInstitute.institute_city &&
    registerInstitute.institute_phone &&
    registerInstitute.institute_state &&
    registerInstitute.institute_zipcode &&
    registerInstitute.institute_country &&
    !countryZipCodeError &&
    !isFilled
  ) {
    setIsfilled(true);
    handleSubmit();
  }

  const handleInputContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    let data = {
      ...registerInstitute,
      institute_phone: {
        value: inputValue,
        isValid: checkValidationContact(formattedValue, value),
      },
      institute_phone_country_code: {
        value: dialCode,
        isValid: checkValidationContact(formattedValue, value),
      },
      validation: isFormValid(),
    };
    setRegisterInstitute(data);
  };

  const checkValidationContact = (formattedValue, value) => {
    if (formattedValue.dialCode === "91") {
      if (value.length < 13 && value.length > 11 && value !== "") {
        return true;
      } else {
        return false;
      }
    } else {
      if (value.length < 10 && value.length > 4 && value !== "") {
        return false;
      } else {
        return true;
      }
    }
  };

  const ZipCodeValidCheckUseEffect = (i) => {
    if (registerInstitute.institute_zipcode.value) {
      let RegExCHeck = ZipCodes.zipCode[i].Regex;
      var pattern = new RegExp(RegExCHeck);
      if (pattern.test(registerInstitute.institute_zipcode.value)) {
        setCountryZipCodeError(false);
        return true;
      } else {
        setCountryZipCodeError(true);
        return false;
      }
    }
  };
  return (
    <AuthTimeLineLayout>
      <div className="form-wrapper">
        <div className='mb-20'>
          <h1>Hi, <span className='w-400 primary'>{user.user_fullname}</span></h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="adminmain_form">
            <div className="formFieldwrap">
              <FormInput
                className={
                  !registerInstitute.institute_name.isValid && showError
                    ? "errorInput"
                    : ""
                }
                onChange={handleInput}
                onKeyUp={handleInput}
                value={registerInstitute.institute_name.value}
                name="institute_name"
                type="text"
                label="* Institute Name"
                placeholder="* Institute name"
              />
              <FormError
                show={!registerInstitute.institute_name.isValid && showError}
                error="Institute name required."
              />
            </div>
            <div className="formFieldwrap">

              <SelectInput
                onChange={handleInput}
                id="institute_category"
                name="institute_category"
                value={registerInstitute.institute_category.value}
                className={`${!registerInstitute.institute_category.value && showError
                  ? "errorInput"
                  : ""
                  } `}
                label="Select Category"
              >
                <option value="">* Select Category</option>
                <option value="Play School">Play School</option>
                <option value="Day Care">Day Care</option>
                <option value="Special Care">Special Care</option>
                <option value="Primary School">Primary School</option>
                <option value="Secondary School">Secondary School</option>
                <option value="Sr. Secondary School / High School">
                  Sr. Secondary School / High School
                </option>
                <option value="College">College</option>
                <option value="University">University</option>
                <option value="Vocational Training Centre">
                  Vocational Training Centre
                </option>
                <option value="Distance Learning Centre">
                  Distance Learning Centre
                </option>
                <option value="Professional Grooming Institute">
                  Professional Grooming Institute
                </option>
                <option value="Online Learning Institute">
                  Online Learning Institute
                </option>
                <option value="Institute">Institute</option>
                <option value="Organization">Organization</option>
                <option value="NGO">NGO</option>
                <option value="Others">Others</option>
              </SelectInput>
              <FormError
                show={!registerInstitute.institute_category.value && showError}
                error="Please select category."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                className={
                  !registerInstitute.institute_email.isValid && showError
                    ? "errorInput"
                    : ""
                }
                onChange={handleInput}
                onKeyUp={handleInput}
                value={registerInstitute.institute_email.value}
                name="institute_email"
                type="text"
                label="*Official email"
                placeholder="* Official email"
              />
              <FormError
                show={!registerInstitute.institute_email.value && showError}
                error="Email is required"
              />
              <FormError
                show={
                  !registerInstitute.institute_email.isValid &&
                  registerInstitute.institute_email.value &&
                  showError
                }
                error="Email is Invalid"
              />
            </div>

            <div className="formFieldwrap">
              <FormInput
                onChange={handleInput}
                onKeyUp={handleInput}
                value={registerInstitute.institute_address.value}
                name="institute_address"
                type="text"
                label="Address line 1"
                placeholder="Address line 1"
                maxLength="63"
                className={!registerInstitute.institute_address.isValid && showError ? "errorInput" : ""}
              />
              <FormError
                show={!registerInstitute.institute_address.isValid && showError}
                error="Address line 1 required."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                onChange={handleInput}
                onKeyUp={handleInput}
                value={registerInstitute.institute_address_line2.value}
                name="institute_address_line2"
                type="text"
                label="Address Line 2"
                placeholder="Address Line 2"
                maxLength={63}
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                onChange={handleInput}
                onKeyUp={handleInput}
                value={registerInstitute.institute_address_line3.value}
                name="institute_address_line3"
                type="text"
                label="Address Line 3"
                placeholder="Address Line 3"
                maxLength={63}
              />
              {/* <FormError
                show={registerInstitute.institute_address.value && showError && registerInstitute.institute_address.value.length > 65}
                error="Institute full address invalid, Should not more than 64 Characters."
              /> */}
            </div>
            <div className="formFieldwrap">
              <CountrySelect
                className={`errorInput ${!registerInstitute.institute_country.value && showError ? "errorInput" : ""}`}
                name="institute_country"
                value={registerInstitute.institute_country.value}
                onSelect={() => setCountry(country)}
                onEvent={handleInput}
                autoevent={true}
                label="Country"
              //defaultValue={registerInstitute.institute_country.value}
              />
              <FormError
                show={!registerInstitute.institute_country.value && showError}
                error="Institute country is required."
              />
            </div>
            <div className="formFieldwrap">
              <StateSelect
                className={`${!registerInstitute.institute_state.value && showError ? "errorInput" : ""}`}
                name="institute_state"
                value={registerInstitute.institute_state.value}
                onSelect={(value) => setState(value)}
                onEvent={handleInput}
                autoevent={true}
                label="State"
              />
              <FormError
                show={!registerInstitute.institute_state.value && showError}
                error="Institute state is required."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                onChange={handleInput}
                onKeyUp={handleInput}
                value={registerInstitute.institute_zipcode.value}
                name="institute_zipcode"
                className={(registerInstitute.institute_zipcode.value &&
                  showError &&
                  countryZipCodeError) || (!registerInstitute.institute_zipcode.isValid && showError) ? "errorInput" : ""}
                type="text"
                label="Zip/Pin code"
                placeholder="* Zip/Pin code"
                maxLength="15"
              />
              <FormError
                show={!registerInstitute.institute_zipcode.isValid && showError}
                error="Institute zipcode is required."
              />
              <FormError
                show={
                  registerInstitute.institute_zipcode.value &&
                  showError &&
                  countryZipCodeError
                }
                error="Invalid zipcode."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                onChange={handleInput}
                onKeyUp={handleInput}
                value={registerInstitute.institute_city.value}
                name="institute_city"
                className={!registerInstitute.institute_city.isValid && showError ? "errorInput" : ""}
                type="text"
                label="City Name"
                placeholder="* Enter City"
              />
              <FormError
                show={!registerInstitute.institute_city.isValid && showError}
                error="Institute city is required."
              />
            </div>
            <div className="formFieldwrap">
              <div className="cstmPhoneInput">
                <PhoneInput
                  containerClass="form-group"
                  type="phone"
                  inputClass="form-control"
                  specialLabel="hii"
                  countryCodeEditable={false}
                  className={!registerInstitute.institute_phone.isValid && showError ? "errorInput" : ""}
                  value={`${registerInstitute.institute_phone_country_code.value}${registerInstitute.institute_phone.value} `}
                  inputProps={{
                    name: "phone",
                    required: true,
                    // autoFocus: true,
                  }}
                  //disabled={contactAlreadyExist ? true : false}
                  enableSearch
                  disableSearchIcon
                  onChange={(value, formattedValue) => {
                    handleInputContact(value, formattedValue);
                  }}
                  onKeyUp={(value, formattedValue) => {
                    handleInputContact(value, formattedValue);
                  }}
                />
                <FormError
                  show={!registerInstitute.institute_phone.isValid && showError}
                  error="Official contact number required."
                />
              </div>
            </div>
          </div>
          <button className='button button-primary btn-sm white next_btn' type='submit'>Next</button>
        </form>
      </div>
    </AuthTimeLineLayout>
  )
}

export default InstituteDetails