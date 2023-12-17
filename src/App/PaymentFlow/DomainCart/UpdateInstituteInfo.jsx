import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import CountrySelect from "../../../Common/Form/CountrySelect";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import StateSelect from "../../../Common/Form/StateSelect";
import { patchDomainInstituteDetails } from "../../../store/actions/privateDomain";
import ZipCodes from "../../../Common/Zipcodes/Zipcodes.json"
const UpdateInstituteInfo = ({ isInstituteEmpty, finalFucntionSubmit, ValidationTrue,
  ValidationFalse }) => {

  const dispatch = useDispatch()
  const [institute_phone, set_institute_phone] = useState("");
  const [institute_phone_country_code, set_institute_phone_country_code] = useState("");
  const [institute_country, set_institute_country] = useState("");
  const [institute_state, set_institute_state] = useState("");
  const [institute_city, set_institute_city] = useState("");
  const [institute_address, set_institute_address] = useState("");
  const [institute_address_line2, set_institute_address_line2] = useState("");
  const [institute_address_line3, set_institute_address_line3] = useState("");

  const [institute_zipcode, set_institute_zipcode] = useState("");

  const [institute_phone_valid, set_institute_phone_valid] = useState(false);
  const [institute_country_valid, set_institute_country_valid] = useState(false);
  const [institute_state_valid, set_institute_state_valid] = useState(false);
  const [institute_city_valid, set_institute_city_valid] = useState(false);
  const [institute_address_valid, set_institute_address_valid] = useState(false);
  const [institute_zipcode_valid, set_institute_zipcode_valid] = useState(false);
  const [show_error, set_show_error] = useState(false);
  const [country, setCountry] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState("");

  const {
    users,
    instituteDetailsSuccess,
    instituteDetails
  } = useSelector((state) => {
    return {
      users: state.user,
      instituteDetailsSuccess: state.privatedomain.getInstitutedetails.success,
      instituteDetails: state.privatedomain.getInstitutedetails.data.data
    };
  });

  useEffect(() => {
    if (instituteDetails && instituteDetailsSuccess) {

      if (!instituteDetails.institute_address) {
        set_institute_address_valid(false)
      } else if (instituteDetails.institute_address.length > 67) {
        set_institute_address_valid(false)
      } else {
        set_institute_address_valid(true)
      }

      if (!instituteDetails.institute_city) {
        set_institute_city_valid(false)
      } else {
        set_institute_city_valid(true)
      }
      if (!instituteDetails.institute_country) {
        set_institute_country_valid(false)
      } else {
        set_institute_country_valid(true)
      }
      if (!instituteDetails.institute_phone || !instituteDetails.institute_phone_country_code) {
        set_institute_phone_valid(false)
      } else if (instituteDetails.institute_phone.length < 10 || instituteDetails.institute_phone_country_code.length < 2) {
        set_institute_phone_valid(false)
      } else {
        set_institute_phone_valid(true)
      }

      if (!instituteDetails.institute_zipcode) {
        set_institute_zipcode_valid(false)
      } else if (instituteDetails.institute_zipcode.length > 6) {
        set_institute_zipcode_valid(false)
      } else {
        set_institute_zipcode_valid(true)
      }

      if (!instituteDetails.institute_state) {
        set_institute_state_valid(false)
      } else {
        set_institute_state_valid(true)
      }

      set_institute_phone(instituteDetails.institute_phone)
      if (instituteDetails.institute_phone_country_code) {
        set_institute_phone_country_code(instituteDetails.institute_phone_country_code)
      } else {
        set_institute_phone_country_code("91")
      }
      set_institute_country(instituteDetails.institute_country)
      set_institute_state(instituteDetails.institute_state)
      set_institute_city(instituteDetails.institute_city)
      set_institute_address(instituteDetails.institute_address)
      set_institute_address_line2(instituteDetails.institute_address_line2)
      set_institute_address_line3(instituteDetails.institute_address_line3)
      set_institute_zipcode(instituteDetails.institute_zipcode)
    }

  }, [instituteDetails, instituteDetailsSuccess])

  const handelInsituteInfoInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    SwitchHandelInput(inputName, inputValue)
    ZipCodeValidCheck()
  };

  const SwitchHandelInput = (inputName, inputValue) => {
    switch (inputName) {
      case "institute_address":
        set_institute_address(inputValue)
        if (inputValue && inputValue.length < 65) {
          set_institute_address_valid(true)
        } else {
          set_institute_address_valid(false)
        }

        break;

      case "institute_city":
        set_institute_city(inputValue)
        if (inputValue) {
          set_institute_city_valid(true)
        } else {
          set_institute_city_valid(false)
        }

        break;

      case "institute_zipcode":
        set_institute_zipcode(inputValue)
        if (inputValue && inputValue.length < 7) {
          set_institute_zipcode_valid(true)
        } else {
          set_institute_zipcode_valid(false)
        }

        break;

      case "institute_country":
        set_institute_country(inputValue)
        if (inputValue) {
          set_institute_country_valid(true)
        } else {
          set_institute_country_valid(false)
        }
        break;

      case "institute_state":
        set_institute_state(inputValue)
        if (inputValue) {
          set_institute_state_valid(true)
        } else {
          set_institute_state_valid(false)
        }
        break;

      case "institute_address_line2":
        set_institute_address_line2(inputValue)

        break;

      case "institute_address_line3":
        set_institute_address_line3(inputValue)

        break;

      default:
        break;
    }
  }

  const handleInputContact = (value, formattedValue) => {

    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    set_institute_phone(inputValue)
    set_institute_phone_country_code(dialCode)
    set_institute_phone_valid(checkValidationContact(formattedValue, value))
  };

  const checkValidationContact = (formattedValue, value) => {
    if (formattedValue.dialCode === "91") {
      if (value.length < 13 && value.length > 11 && value !== "") {
        return true
      } else {
        return false
      }
    } else {
      if (value.length < 10 && value.length > 4 && value !== "") {
        return false
      } else {
        return true
      }
    }
  }

  useEffect(() => {
    CheckValidation()
    set_show_error(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalFucntionSubmit])

  const CheckValidation = () => {
    if (institute_phone_valid &&
      institute_country_valid &&
      institute_state_valid &&
      institute_city_valid &&
      institute_address_valid &&
      institute_zipcode_valid && !countryZipCodeError) {
      ValidationTrue()
      dispatch(patchDomainInstituteDetails(users.user_institute, dataForm()))
    } else {
      ValidationFalse()
    }
  }
  const dataForm = () => {
    return {
      "institute_phone": institute_phone,
      "institute_phone_country_code": institute_phone_country_code,
      "institute_country": institute_country,
      "institute_state": institute_state,
      "institute_city": institute_city,
      "institute_address": institute_address,
      "institute_address_line2": institute_address_line2,
      "institute_address_line3": institute_address_line3,
      "institute_zipcode": institute_zipcode
    }
  }


  const [countryZipCodeIndex, setCountryZipCodeIndex] = useState("");
  const [countryZipCodeError, setCountryZipCodeError] = useState(false);

  const ZipCodeValidCheck = () => {

    if (institute_zipcode && countryZipCodeIndex) {

      let RegExCHeck = ZipCodes.zipCode[countryZipCodeIndex].Regex;
      var pattern = new RegExp(RegExCHeck)
      if (pattern.test(institute_zipcode)) {

        setCountryZipCodeError(false)
        return true
      }
      else {

        setCountryZipCodeError(true)
        return false
      }
    }
  }

  const ZipCodeValidCheckUseEffect = (i) => {

    if (institute_zipcode) {

      let RegExCHeck = ZipCodes.zipCode[i].Regex;
      var pattern = new RegExp(RegExCHeck)
      if (pattern.test(institute_zipcode)) {

        setCountryZipCodeError(false)
        return true
      }
      else {

        setCountryZipCodeError(true)
        return false
      }
    }
  }

  useEffect(() => {
    for (let i = 0; i < ZipCodes.zipCode.length; i++) {

      if (institute_country === ZipCodes.zipCode[i].Country) {

        setCountryZipCodeIndex(i)
        ZipCodeValidCheckUseEffect(i)
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institute_country])


  return (
    <div className="userInfoForm mt-30">
      <div className="cartRowWrap col3">

        {isInstituteEmpty.includes("institute_address") && (
          <>
            <div className="formFieldwrap">
              <FormInput
                onChange={handelInsituteInfoInput}
                onKeyUp={handelInsituteInfoInput}
                value={institute_address}
                name="institute_address"
                type="text"
                label="Address Line 1"
                placeholder="Address Line 1"
                maxLength={63}
              />
              <FormError
                show={!institute_address_valid && show_error && !institute_address}
                error="Institute full address required."
              />

            </div>
            <div className="formFieldwrap">
              <FormInput
                onChange={handelInsituteInfoInput}
                onKeyUp={handelInsituteInfoInput}
                value={institute_address_line2}
                name="institute_address_line2"
                type="text"
                label="Address Line 2"
                placeholder="Address Line 2"
                maxLength={63}
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                onChange={handelInsituteInfoInput}
                onKeyUp={handelInsituteInfoInput}
                value={institute_address_line3}
                name="institute_address_line3"
                type="text"
                label="Address Line 3"
                placeholder="Address Line 3"
                maxLength={63}
              />
            </div>
          </>
        )}
        {(isInstituteEmpty.includes("institute_country") || isInstituteEmpty.includes("institute_state")) && (
          <div className="formFieldwrap">
            <CountrySelect
              name="institute_country"
              value={institute_country}
              onSelect={() => setCountry(country)}
              onEvent={handelInsituteInfoInput}
              autoevent={true}

            />
            <FormError
              show={!institute_country_valid && show_error}
              error="Institute country is required."
            />
          </div>
        )}

        {(isInstituteEmpty.includes("institute_country") || isInstituteEmpty.includes("institute_state")) && (
          <div className="formFieldwrap">
            <StateSelect
              name="institute_state"
              value={institute_state}
              onSelect={(value) => setState(value)}
              onEvent={handelInsituteInfoInput}
              autoevent={true}
            />
            <FormError
              show={!institute_state_valid && show_error}
              error="Institute state is required."
            />
          </div>
        )}

        {(isInstituteEmpty.includes("institute_phone") || isInstituteEmpty.includes("institute_phone_country_code")) && (
          <div className="formFieldwrap">
            <PhoneInput
              countryCodeEditable={false}
              containerClass="form-group"
              inputClass="form-control"
              specialLabel="hii"
              country={"in"}
              value={(isInstituteEmpty.includes("institute_phone_country_code") ? "91" : institute_phone_country_code) + institute_phone}
              inputProps={{
                name: "phone",
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
            <FormError
              show={!institute_phone_valid && show_error}
              error="Official contact number required."
            />
          </div>
        )}
        {isInstituteEmpty.includes("institute_city") && (
          <div className="formFieldwrap">

            <FormInput
              onChange={handelInsituteInfoInput}
              onKeyUp={handelInsituteInfoInput}
              value={institute_city}
              name="institute_city"
              type="text"
              label="City Name"
              placeholder="Enter City"
            />
            <FormError
              show={!institute_city_valid && show_error}
              error="Institute city is required."
            />
          </div>
        )}
        {isInstituteEmpty.includes("institute_zipcode") && (
          <div className="formFieldwrap">

            <FormInput
              onChange={handelInsituteInfoInput}
              onKeyUp={handelInsituteInfoInput}
              value={institute_zipcode}
              name="institute_zipcode"
              type="text"
              label="Zip/Pin code"
              placeholder="Zip/Pin code"
              maxLength="15"
            />
            <FormError
              show={!institute_zipcode_valid && show_error && !institute_zipcode}
              error="Institute zipcode is required."
            />
            <FormError
              show={institute_zipcode && show_error && countryZipCodeError}
              error="Invalid zipcode."
            />
          </div>
        )}

      </div>
    </div>
  )
}
export default UpdateInstituteInfo;