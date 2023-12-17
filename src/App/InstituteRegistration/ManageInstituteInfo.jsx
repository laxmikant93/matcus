import React, { useEffect, useState } from "react";
import FormInput from "../../Common/Form/FormInput";
import FormError from "../../Common/Form/FormError";
import InstituteValidation from "./instituteValidation";
// import { setUserActiveRole } from ".././../store/actions/user";
import { connect } from "react-redux";
import InstituteTheme from "../../Common/Theme/InstituteTheme";
import "./manageInstituteInfo.scss"
import {
  InsManageMapStateToProps,
  InsManageMapDispatchToProps,
} from "./insManageMapDispatch";
import CountrySelect from "../../Common/Form/CountrySelect";
import StateSelect from "../../Common/Form/StateSelect";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import ZipCodes from "../../Common/Zipcodes/Zipcodes.json";
import FormTextArea from "../../Common/Form/FormTextArea";
import SelectInput from "../../Common/Form/SelectInput";

const ManageInstituteInfo = (props) => {
  const { getInstituteInformation, user } = props;
  const history = useNavigate();
  // Data states
  const [institute_name, set_institute_name] = useState("");
  const [institute_email, set_institute_email] = useState("");
  const [institute_category, set_institute_category] = useState("");
  const [institute_phone, set_institute_phone] = useState("");
  const [institute_phone_country_code, set_institute_phone_country_code] =
    useState("");
  const [institute_country, set_institute_country] = useState("");
  const [institute_state, set_institute_state] = useState("");
  const [institute_city, set_institute_city] = useState("");
  const [institute_address, set_institute_address] = useState("");
  const [institute_address_line2, set_institute_address_line2] = useState("");
  const [institute_address_line3, set_institute_address_line3] = useState("");

  const [institute_zipcode, set_institute_zipcode] = useState("");
  const [institute_website, set_institute_website] = useState("");

  // Error states
  const [institute_name_error, set_institute_name_error] = useState(false);
  // const [institute_email_error, set_institute_email_error] = useState(false);
  const [institute_category_error, set_institute_category_error] =
    useState(false);
  // const [institute_phone_error, set_institute_phone_error] = useState(false);
  // const [institute_country_error, set_institute_country_error] =
  //   useState(false);
  // const [institute_state_error, set_institute_state_error] = useState(false);
  //const [institute_phone_country_code_error, set_institute_phone_country_code_error] = useState(false);
  // const [institute_city_error, set_institute_city_error] = useState(false);
  // const [institute_address_error, set_institute_address_error] =
  //   useState(false);
  // const [institute_zipcode_error, set_institute_zipcode_error] =
  //   useState(false);
  // Other states
  const [isFilled, setisFilled] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  // const [institute_about_error, set_institute_about_error] = useState(false)
  const [showError, setShowError] = useState(false);

  const handleInput = (e) => {
    setIsSubmit(false)

    setShowError(true);
    const inputName = e.target.name;
    const inputValue = e.target.value;
    switch (inputName) {
      case "institute_email":
        set_institute_email(inputValue);
        // set_institute_email_error(
        //   !InstituteValidation.isEmail(inputValue) && showError
        // );
        break;
      case "institute_name":
        set_institute_name(inputValue);
        set_institute_name_error(
          !InstituteValidation.isNotEmpty(inputValue) && showError
        );
        break;

      case "institute_category":
        set_institute_category(inputValue);

        set_institute_category_error(
          InstituteValidation.isNotEmpty(inputValue) && showError
        );
        break;
      case "institute_address":
        set_institute_address(inputValue);
        // set_institute_address_error(
        //   !InstituteValidation.isNotEmpty(inputValue) && showError
        // );
        break;
      case "institute_address_line2":
        set_institute_address_line2(inputValue);
        // set_institute_address_error(false);
        break;
      case "institute_address_line3":
        set_institute_address_line3(inputValue);
        // set_institute_address_error(false)
        break;

      // case "institute_phone":
      //   set_institute_phone(inputValue);
      //   set_institute_phone_error(
      //     InstituteValidation.contactValidation(inputValue) && showError
      //   );
      //   break;
      case "institute_country":
        set_institute_country(inputValue);
        // set_institute_country_error(
        //   !InstituteValidation.isNotEmpty(inputValue) && showError
        // );
        break;
      case "institute_state":
        set_institute_state(inputValue);
        // set_institute_state_error(
        //   !InstituteValidation.isNotEmpty(inputValue) && showError
        // );
        break;

      case "institute_zipcode":
        set_institute_zipcode(inputValue);
        // set_institute_zipcode_error(
        //   !InstituteValidation.isNotEmpty(inputValue) && showError
        // );
        ZipCodeValidCheck()

        break;
      case "institute_city":
        set_institute_city(inputValue);
        // set_institute_city_error(
        //   !InstituteValidation.isNotEmpty(inputValue) && showError
        // );
        break;
      // case "institute_phone_country_code":
      //   set_institute_phone_country_code(inputValue);
      //   set_institute_phone_country_code_error(InstituteValidation.isNotEmpty(inputValue) && showError)
      //   break;
      default:
        break;
    }

    checkRegistrationErrors();
  };

  const [countryZipCodeIndex, setCountryZipCodeIndex] = useState("");
  const [countryZipCodeError, setCountryZipCodeError] = useState(false);

  const ZipCodeValidCheck = () => {
    let valid = true;
    if (institute_zipcode && countryZipCodeIndex) {
      let RegExCHeck = ZipCodes.zipCode[countryZipCodeIndex].Regex;
      var pattern = new RegExp(RegExCHeck);
      if (pattern.test(institute_zipcode)) {
        setCountryZipCodeError(false);
        valid = true;
      } else {
        setCountryZipCodeError(true);
        valid = false;
      }
    }
    return valid;
  };

  useEffect(() => {
    for (let i = 0; i < ZipCodes.zipCode.length; i++) {
      if (
        institute_country ===
        ZipCodes.zipCode[i].Country
      ) {
        setCountryZipCodeIndex(i);
        ZipCodeValidCheckUseEffect(i);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institute_country]);

  const ZipCodeValidCheckUseEffect = (i) => {
    if (institute_zipcode) {
      let RegExCHeck = ZipCodes.zipCode[i].Regex;
      var pattern = new RegExp(RegExCHeck);
      if (pattern.test(institute_zipcode)) {
        setCountryZipCodeError(false);
        return true;
      } else {
        setCountryZipCodeError(true);
        return false;
      }
    }
  };
  const handleFormSubmit = (e) => {
    setIsSubmit(true)
    e.preventDefault();
    setShowError(true);
    if (!InstituteValidation.isNotEmpty(institute_state)) {
      // set_institute_state_error(true)
    }
    if (!InstituteValidation.isNotEmpty(institute_state)) {
      // set_institute_country_error(true)
    } else {
      // set_institute_country_error(false)
    }
    const { updateInstitute, user } = props;
    checkRegistrationErrors();
    if (isFormValid() && ZipCodeValidCheck()) {
      setShowError(false);
      updateInstitute(user.user_institute, dataToUpdate(), user.user_business_type, user.user_dashboard_stepper, user._id);
    } else {
      setShowError(true);
    }
  };

  const isFormValid = () => {
    // return institute_email_error ||
    //   institute_category_error ||
    //   institute_phone_error ||
    //   institute_name_error ||
    //   institute_address_error ||
    //   institute_country_error ||
    //   institute_city_error ||
    //   institute_state_error ||
    //   institute_zipcode_error
    //   ? false
    //   : true;

    return institute_category_error || institute_name_error
      ? false
      : true;
  };

  const checkRegistrationErrors = () => {
    const { institutedetail } = props;
    set_institute_name_error(
      !InstituteValidation.isNotEmpty(institute_name) && showError
    );
    // set_institute_email_error(
    //   !InstituteValidation.isEmail(institute_email) && showError
    // );
    set_institute_category_error(
      !InstituteValidation.isNotEmpty(institute_category) && showError
    );
    // set_institute_phone_error(
    //   !InstituteValidation.contactNumber(institute_phone) && showError
    // );
    // set_institute_address_error(
    //   !InstituteValidation.isNotEmpty(institute_address) && showError
    // );
    // set_institute_city_error(
    //   !InstituteValidation.isNotEmpty(institute_city) && showError
    // );
    // set_institute_zipcode_error(
    //   !InstituteValidation.isNotEmpty(institute_zipcode) && showError
    // );
    if (institutedetail.success && !isFilled) {
      setisFilled(true);
      set_institute_name(institutedetail.data.institute_name);
      set_institute_email(institutedetail.data.institute_email);
      set_institute_category(institutedetail.data.institute_category);
      set_institute_phone(institutedetail.data.institute_phone);
      set_institute_phone_country_code(
        institutedetail.data.institute_phone_country_code
          ? institutedetail.data.institute_phone_country_code
          : "91"
      );
      set_institute_country(institutedetail.data.institute_country);

      set_institute_state(institutedetail.data.institute_state);
      set_institute_city(institutedetail.data.institute_city);
      set_institute_address(institutedetail.data.institute_address);
      set_institute_address_line2(institutedetail.data.institute_address_line2);
      set_institute_address_line3(institutedetail.data.institute_address_line3);

      set_institute_zipcode(institutedetail.data.institute_zipcode);
      set_institute_website(institutedetail.data.institute_website);
    }
  };

  const dataToUpdate = () => {
    return {
      institute_name,
      institute_email,
      institute_category,
      institute_phone,
      institute_country,
      institute_state,
      institute_city,
      institute_address,
      institute_address_line2,
      institute_address_line3,
      institute_zipcode,
      institute_website,
      institute_phone_country_code,
      contact_support: institute_phone
    };
  };
  useEffect(() => {
    // const { getInstituteInformation, user } = props;
    getInstituteInformation(user.user_institute, user.user_business_type);
  }, [getInstituteInformation, user]);

  useEffect(checkRegistrationErrors, [
    showError,
    props,
    institute_email,
    institute_category,
    institute_phone,
    institute_country,
    institute_state,
    institute_city,
    institute_address,
    institute_address_line2,
    institute_address_line3,
    institute_name,
    institute_zipcode,
    isFilled,
  ]);

  useEffect(() => {
    return () => {
      props.resetInformation();
      // set_institute_state_error(false)
    };
  }, []);

  const handleInputContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    set_institute_phone(inputValue);
    set_institute_phone_country_code(dialCode);
    checkValidationContact(formattedValue, value);
    // let data = {
    //   ...registerInstitute,
    //   "institute_phone": {
    //     value: inputValue,
    //     isValid: checkValidationContact(formattedValue, value)
    //   },
    //   "institute_phone_country_code": {
    //     value: dialCode,
    //     isValid: checkValidationContact(formattedValue, value)
    //   },
    //   validation: isFormValid(),
    // }
    // setRegisterInstitute(data)
  };

  const checkValidationContact = (formattedValue, value) => {
    if (formattedValue.dialCode === "91") {
      if (value.length < 13 && value.length > 11 && value !== "") {
        // set_institute_phone_error(false);
        // set_institute_phone_country_code_error(false)
      } else {
        // set_institute_phone_error(true);
        //   set_institute_phone_country_code_error(true)
        //
      }
    } else {
      if (value.length < 10 && value.length > 4 && value !== "") {
        // set_institute_phone_error(true);
        //   set_institute_phone_country_code_error(true)
        return false;
      } else {
        // set_institute_phone_error(false);
        //  set_institute_phone_country_code_error(false)
        return true;
      }
    }
  };

  // useEffect(() => {
  //   if (props.institutedetail.updating) {
  //     if (window.location.pathname.includes("manage-basic-info")) {
  //       history("/manage-basic-info")
  //     }
  //     else {
  //       history("/manage-basic-info")
  //     }
  //   }
  // }, [history, props.institutedetail.updating])

  useEffect(() => {
    if (props.institutedetail.updatesuccess) {
      history('/dashboard')
      props.resetInformation();
    }
  }, [history, props, props.institutedetail.updatesuccess])
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* {window.location.pathname.includes("manage-basic-info") && <BreadcrumbItem to="/website-manage" title="Manage Website" />} */}
        {window.location.pathname.includes("manage-basic-info") ?
          <BreadcrumbItem to="/manage-basic-info" title="Update Institute Information" /> : <BreadcrumbItem to="/manage-institute" title="Update Institute Information" />
        }
      </Breadcrumb>
      {props.institutedetail.success ? (
        <React.Fragment>
          <form onSubmit={handleFormSubmit}>
            <div className="institute-wrapper">
              <div className="row">
                <div className="col-md-12 text-left">
                  <h2 className="heading text-sm w-300">
                    Update Institute Information
                  </h2>
                </div>
              </div>
              <div className="row mt-20">
                <div className="col-xs-12 col-sm-8">
                  <div className="formFieldwrap">
                    <FormInput
                      value={institute_name}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      className={institute_name_error && isSubmit ? "errorInput" : ""}
                      name="institute_name"
                      type="text"
                      label="*Institute Name"
                      placeholder="* Institute name"
                    />
                    <FormError
                      show={institute_name_error && isSubmit}
                      error="Institute name required."
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                  <div className="formFieldwrap">
                    <SelectInput
                      value={institute_category}
                      className={
                        institute_category_error && isSubmit ? "errorInput" : ""
                      }
                      onChange={handleInput}
                      label={"Select Category"}
                      id="institute_category"
                      name="institute_category"
                    >
                      <option value="">* Select Category</option>
                      <option value="Play School">Play School</option>
                      <option value="Day Care">Day Care</option>
                      <option value="Special Care">Special Care</option>
                      <option value="Primary School">Primary School</option>
                      <option value="Secondary School">
                        Secondary School
                      </option>
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

                  </div>
                </div>

                <div className="col-xs-12 col-sm-6">
                  <div className="formFieldwrap">
                    <FormInput
                      value={institute_email}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      // className={institute_email_error && isSubmit ? "errorInput" : ""}
                      name="institute_email"
                      type="text"
                      id="institute_email"
                      label="Official email"
                      placeholder="Official email"
                    />
                    {/* <FormError
                      show={institute_email_error && isSubmit}
                      error="Official email required."
                    /> */}
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="formFieldwrap">
                    <div className="cstmPhoneInput">
                      <PhoneInput
                        countryCodeEditable={false}
                        containerClass="form-group"
                        inputClass="form-control"
                        country={"in"}
                        value={`${institute_phone_country_code}${institute_phone}`}
                        inputProps={{
                          name: "institute_phone",
                          required: true,
                          autoFocus: true,
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
                      <label className={`animLabel`}>
                        Phone Number
                      </label>
                      {/* <FormInput
                      defaultValue={institute_phone}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      maxLength={15}
                      className={institute_phone_error ? "errorInput" : ""}
                      name="institute_phone"
                      type="text"
                      id="institute_phone"
                      label="*Official contact number"
                      placeholder="* Official contact number"
                    /> */}
                      {/* <FormError
                        show={institute_phone_error && isSubmit}
                        error="Official contact number required."
                      /> */}
                    </div>
                  </div>
                </div>
                {/* <div className="col-xs-12 col-sm-4">
                  <div className="formFieldwrap">
                    <FormInput
                      defaultValue={institute_website}
                      onChange={(e) => set_institute_website(e.target.value)}
                      onKeyUp={(e) => set_institute_website(e.target.value)}
                      className=""
                      name="institute_website"
                      type="text"
                      id="institute_website"
                      label="Existing website URL"
                      placeholder="Existing website URL"
                    />
                  </div>
                </div> */}

                <div className="col-xs-12">
                  <div className="formFieldwrap">
                    <FormTextArea
                      value={institute_address}
                      onChange={(e) => set_institute_address(e.target.value)}
                      onKeyUp={(e) => set_institute_address(e.target.value)}
                      // className={
                      //   institute_address_error && isSubmit ? "errorInput" : ""
                      // }
                      name="institute_address"
                      type="text"
                      label="Address line 1"
                      placeholder="Address line 1"
                      maxLength="63"
                      rows="1"
                    />
                    {/* <FormError
                      show={institute_address_error && isSubmit}
                      error="Address line 1 required."
                    /> */}
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="formFieldwrap">
                    <FormTextArea
                      value={institute_address_line2}
                      onChange={(e) => set_institute_address_line2(e.target.value)}
                      onKeyUp={(e) => set_institute_address_line2(e.target.value)}
                      className=""
                      name="institute_address_line2"
                      type="text"
                      label="Address Line 2"
                      placeholder="Address Line 2"
                      maxLength={63}
                      rows="1"
                    />
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="formFieldwrap pb-0">
                    <FormTextArea
                      value={institute_address_line3}
                      onChange={(e) => set_institute_address_line3(e.target.value)}
                      onKeyUp={(e) => set_institute_address_line3(e.target.value)}
                      className=""
                      name="institute_address_line3"
                      type="text"
                      label="Address Line 3"
                      placeholder="Address Line 3"
                      maxLength={63}
                      rows="1"
                    />
                    {/* <FormError
                      show={institute_address_error}
                      error="Institute full address invalid, Should not more than 64 Characters."
                    /> */}
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="formFieldwrap">
                    <CountrySelect
                      name="institute_country"
                      id="institute_country"
                      value={institute_country}
                      onSelect={(value) => set_institute_country(value)}
                      onEvent={handleInput}
                      autoevent={true}
                      label="Select country"
                      // className={
                      //   !institute_country && institute_country_error && isSubmit ? "errorInput" : ""
                      // }
                    />
                    {/* <FormError
                      show={!institute_country && institute_country_error && isSubmit}
                      error="Please select country."
                    /> */}
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="formFieldwrap">
                    <StateSelect
                      name="institute_state"
                      id="institute_state"
                      value={institute_state}
                      onSelect={(value) => set_institute_state(value)}
                      onEvent={handleInput}
                      label="Select state"
                      // className={
                      //   institute_state_error && isSubmit ? "errorInput" : ""
                      // }
                    />
                    {/* <FormError
                      show={institute_state_error && isSubmit}
                      error="Please provide state."
                    />{" "} */}
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="formFieldwrap">
                    <FormInput
                      value={institute_city}
                      onChange={(e) => set_institute_city(e.target.value)}
                      onKeyUp={(e) => set_institute_city(e.target.value)}
                      name="institute_city"
                      type="text"
                      label="City Name"
                      id="City Name"
                      placeholder="Enter City"
                      // className={` ${institute_city_error && isSubmit ? "errorInput" : ""}`}
                    />
                    {/* <FormError
                      show={institute_city_error && isSubmit}
                      error="Please enter institute city."
                    /> */}
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                  <div className="formFieldwrap">
                    <FormInput
                      value={institute_zipcode}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      name="institute_zipcode"
                      type="text"
                      id="Zip/Pin code"
                      label="Zip/Pin code"
                      placeholder="Zip/Pin code"
                      // className={
                      //   (institute_zipcode_error && isSubmit) || (institute_zipcode &&
                      //     countryZipCodeError && isSubmit) ? "errorInput" : ""
                      // }
                    />
                    {/* <FormError
                      show={institute_zipcode_error && isSubmit}
                      error="Please provide pincode/zipcode."
                    /> */}
                    <FormError
                      show={institute_zipcode &&
                        countryZipCodeError && isSubmit
                      }
                      error="Invalid zipcode."
                    />
                  </div>
                </div>

              </div>
            </div>
            <div className="col-xs-12">
              {props.institutedetail.updating ? (
                <button type="button" className="button btn-sm button-primary">
                  Loading...
                </button>
              ) : (
                <button type="submit" className="button btn-sm button-primary">
                  Update Now <i className="animate-r-arrow-icon"></i>
                </button>
              )}
            </div>
          </form>
        </React.Fragment>
      ) : (
        <div className="pageInCenter">Loading...</div>
      )}
    </React.Fragment>
  );
};

export default connect(
  InsManageMapStateToProps,
  InsManageMapDispatchToProps
)(ManageInstituteInfo);
