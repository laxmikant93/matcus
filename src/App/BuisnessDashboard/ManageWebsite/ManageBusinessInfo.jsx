import React, { useEffect, useState } from "react";
import FormInput from "../../../Common/Form/FormInput";
import FormError from "../../../Common/Form/FormError";
import { connect, useDispatch, useSelector } from "react-redux";
import "./businessInfo.scss"
import CountrySelect from "../../../Common/Form/CountrySelect";
import StateSelect from "../../../Common/Form/StateSelect";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import ZipCodes from "../../../Common/Zipcodes/Zipcodes.json";
import FormTextArea from "../../../Common/Form/FormTextArea";
import SelectInput from "../../../Common/Form/SelectInput";
import ValidationUtils from "../../../Classes/ValidationUtils";
import { getBusinessCategoryList, getInstituteData, getInstituteDataReset, patchInstituteDataReset, patchInstituteInfo } from "../../../store/actions/businessInfo";
import ValidationFile from "../../../Classes/ValidationFile";

const ManageBusinessInfo = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { user, getbusinessInfoSuccess, getbusinessInfoData,
    patchbusinessInfoLoading, patchbusinessInfoSuccess, getBusinessCategoryListData, getBusinessCategorySuccess, businessType } = useSelector((state) => {
      return {
        user: state.user,
        businessType: state.user.user_business_type,
        getbusinessInfoSuccess: state.businessInfo.getInstituiteData.success,
        getbusinessInfoData: state.businessInfo.getInstituiteData.data,
        patchbusinessInfoLoading: state.businessInfo.patchInstituteInfo.loading,
        patchbusinessInfoSuccess: state.businessInfo.patchInstituteInfo.loaded,
        getBusinessCategoryListData: state.businessInfo.getBusinessCategoryData.data,
        getBusinessCategorySuccess: state.businessInfo.getBusinessCategoryData.success,
      };
    })

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
  const [institute_email_error, set_institute_email_error] = useState(false);
  const [institute_category_error, set_institute_category_error] =
    useState(false);
  const [institute_phone_error, set_institute_phone_error] = useState(false);
  const [institute_country_error, set_institute_country_error] = useState(false);
  const [institute_state_error, set_institute_state_error] = useState(false);
  const [institute_city_error, set_institute_city_error] = useState(false);
  const [institute_address_error, set_institute_address_error] =
    useState(false);
  const [institute_zipcode_error, set_institute_zipcode_error] =
    useState(false);
  // Other states
  const [isFilled, setisFilled] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showError, setShowError] = useState(false);
  const [countryZipCodeIndex, setCountryZipCodeIndex] = useState("");
  const [countryZipCodeError, setCountryZipCodeError] = useState(false);
  const symbolsArr = [",", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")", "_",
    "-", "=", "+", ".", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`]


  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type])

  // useEffect(() => {
  //   dispatch(getBusinessCategoryList());
  // }, [dispatch])

  const handleInput = (e) => {
    setIsSubmit(false)
    setShowError(true);
    const inputName = e.target.name;
    const inputValue = e.target.value;
    switch (inputName) {
      case "institute_email":
        set_institute_email(inputValue);
        set_institute_email_error(
          !ValidationUtils.isEmail(inputValue) && showError
        );
        break;
      case "institute_name":
        set_institute_name(inputValue);
        set_institute_name_error(
          !ValidationUtils.isNotEmpty(inputValue) && showError
        );

        break;

      case "institute_category":
        set_institute_category(inputValue);
        set_institute_category_error(
          ValidationUtils.isNotEmpty(inputValue) && showError
        );
        break;
      case "institute_address":
        set_institute_address(inputValue);
        set_institute_address_error(
          !ValidationUtils.isNotEmpty(inputValue) && showError
        );
        break;
      case "institute_address_line2":
        set_institute_address_line2(inputValue);
        set_institute_address_error(false);
        break;
      case "institute_address_line3":
        set_institute_address_line3(inputValue);
        set_institute_address_error(false)
        break;
      case "institute_country":
        set_institute_country(inputValue);
        set_institute_country_error(
          !ValidationUtils.isNotEmpty(inputValue) && showError
        );
        break;
      case "institute_state":
        set_institute_state(inputValue);
        set_institute_state_error(
          !ValidationUtils.isNotEmpty(inputValue) && showError
        );
        break;

      case "institute_zipcode":
        set_institute_zipcode(inputValue);
        set_institute_zipcode_error(
          !ValidationUtils.isNotEmpty(inputValue) && showError
        );
        ZipCodeValidCheck()

        break;
      case "institute_city":
        set_institute_city(inputValue);
        set_institute_city_error(
          !ValidationUtils.isNotEmpty(inputValue) && showError
        );
        break;
      default:
        break;
    }
    checkRegistrationErrors();
  };
  // console.log(institute_category, "jwdinstitute_categorywhdjewd");
  const ZipCodeValidCheck = () => {

    if (institute_zipcode && countryZipCodeIndex) {
      let RegExCHeck = ZipCodes.zipCode[countryZipCodeIndex].Regex;
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
    if (!ValidationUtils.isNotEmpty(institute_state)) {
      set_institute_state_error(true)
    }
    if (!ValidationUtils.isNotEmpty(institute_country)) {
      set_institute_country_error(true)
    }

    checkRegistrationErrors();
    if (isFormValid() && !ValidationUtils.isEmpty(institute_state) && showError) {
      setShowError(false);
      dispatch(patchInstituteInfo(user.user_business, dataToUpdate(), user.user_business_type, user._id, user.user_dashboard_stepper));
    } else {
      setShowError(true);
    }
  };

  const isFormValid = () => {
    return institute_email_error ||
      institute_phone_error ||
      institute_name_error ||
      institute_address_error ||
      institute_country_error ||
      institute_city_error ||
      institute_state_error ||
      institute_zipcode_error
      ? false
      : true;
  };

  const checkRegistrationErrors = () => {
    set_institute_name_error(
      !ValidationUtils.isNotEmpty(institute_name) && showError
    );
    set_institute_email_error(
      !ValidationUtils.isEmail(institute_email) && showError
    );
    set_institute_category_error(
      !ValidationUtils.isNotEmpty(institute_category) && showError
    );
    set_institute_phone_error(
      !ValidationUtils.contactNumber(institute_phone) && showError
    );
    set_institute_address_error(
      !ValidationUtils.isNotEmpty(institute_address) && showError
    );
    set_institute_city_error(
      !ValidationUtils.isNotEmpty(institute_city) && showError
    );
    set_institute_zipcode_error(
      !ValidationUtils.isNotEmpty(institute_zipcode) && showError
    );
  };

  useEffect(() => {
    if (getbusinessInfoSuccess && getbusinessInfoData && isFilled === false) {
      setisFilled(true);
      set_institute_name(getbusinessInfoData.business_name);
      set_institute_email(getbusinessInfoData.business_email);
      if (businessType === "Services") {
        set_institute_category(getbusinessInfoData.business_category);
      } else {
        set_institute_category(getbusinessInfoData.business_shop_type);
      }

      set_institute_phone(getbusinessInfoData.business_phone);
      set_institute_phone_country_code(
        getbusinessInfoData.business_phone_country_code
          ? getbusinessInfoData.business_phone_country_code
          : "91"
      );
      set_institute_country(getbusinessInfoData.business_country);

      set_institute_state(getbusinessInfoData.business_state);
      set_institute_city(getbusinessInfoData.business_city);
      set_institute_address(getbusinessInfoData.business_address);
      set_institute_address_line2(getbusinessInfoData.business_address_line2);
      set_institute_address_line3(getbusinessInfoData.business_address_line3);

      set_institute_zipcode(getbusinessInfoData.business_zipcode);
      set_institute_website(getbusinessInfoData.business_website);
    }
  }, [getbusinessInfoData, getbusinessInfoSuccess, isFilled])

  const dataToUpdate = () => {
    if (businessType === "Services") {
      return {
        business_name: institute_name,
        business_email: institute_email,
        business_category: institute_category,
        business_phone: institute_phone,
        business_country: institute_country,
        business_state: institute_state,
        business_city: institute_city,
        business_address: institute_address,
        business_address_line2: institute_address_line2,
        business_address_line3: institute_address_line3,
        business_zipcode: institute_zipcode,
        business_website: institute_website,
        business_phone_country_code: institute_phone_country_code,
        contact_support: institute_phone
      }

    } else {
      return {
        business_name: institute_name,
        business_email: institute_email,
        business_shop_type: institute_category,
        // business_shop_category: [institute_category],
        business_phone: institute_phone,
        business_country: institute_country,
        business_state: institute_state,
        business_city: institute_city,
        business_address: institute_address,
        business_address_line2: institute_address_line2,
        business_address_line3: institute_address_line3,
        business_zipcode: institute_zipcode,
        business_website: institute_website,
        business_phone_country_code: institute_phone_country_code,
        contact_support: institute_phone
      }
    }

  };


  useEffect(() => {
    return () => {
      dispatch(patchInstituteDataReset());
      dispatch(getInstituteDataReset());
      set_institute_state_error(false);
      set_institute_country_error(false);
    };
  }, [dispatch]);

  const handleInputContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    set_institute_phone(inputValue);
    set_institute_phone_country_code(dialCode);
    checkValidationContact(formattedValue, value);
  };

  const checkValidationContact = (formattedValue, value) => {
    if (formattedValue.dialCode === "91") {
      if (value.length < 13 && value.length > 11 && value !== "") {
        set_institute_phone_error(false);
        // set_institute_phone_country_code_error(false)
      } else {
        set_institute_phone_error(true);
        //   set_institute_phone_country_code_error(true)
        //
      }
    } else {
      if (value.length < 10 && value.length > 4 && value !== "") {
        set_institute_phone_error(true);
        return false;
      } else {
        set_institute_phone_error(false);
        return true;
      }
    }
  };

  useEffect(() => {
    if (patchbusinessInfoSuccess) {
      history("/");
    }
  }, [history, patchbusinessInfoSuccess])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/ecommerce/businessInfo" title="Update Business Information" />
      </Breadcrumb>
      {true ? (
        <React.Fragment>
          <form onSubmit={handleFormSubmit}>
            <div className="institute-wrapper">
              <div className="row">
                <div className="col-md-12 text-left">
                  <h2 className="heading text-sm w-300">
                    Update Business Information
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
                      label="*Business Name"
                      placeholder="* Business name"

                    />
                    <FormError
                      show={institute_name_error && isSubmit}
                      error="Business name required."
                    />

                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                  {businessType === "Services" ?
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

                        {businessType === "Services" ?
                          <option value="Book Appointment">Book Appointment
                          </option>
                          :
                          // getBusinessCategorySuccess && getBusinessCategoryListData.length && getBusinessCategoryListData.map((item) => {
                          //   return (
                          //     <option value={item._id}>{item.categoryName}
                          //     </option>
                          //   )
                          // })
                          <React.Fragment>
                            <option value="Kirana Store & Grocery">Kirana Store & Grocery</option>
                            <option value="Fashion Apparels, Shoes & Accessories">Fashion Apparels, Shoes & Accessories</option>
                            <option value="Home Decor">Home Decor</option>
                            <option value="Gift Shop">Gift Shop</option>
                            <option value="Fruit & Vegetables">Fruit & Vegetables</option>
                            <option value=">Books & Stationery Products">Books & Stationery Products</option>
                            <option value="Electronics">Electronics</option>
                            {institute_category !== "Kirana Store & Grocery" && institute_category !== "Home Decor" && institute_category !== "Electronics" &&
                              institute_category !== "Fashion Apparels, Shoes & Accessories" && institute_category !== "Gift Shop" &&
                              institute_category !== "Fruit & Vegetables" && institute_category !== "Books & Stationery Products" &&
                              <option value={institute_category}>{institute_category}</option>
                            }

                          </React.Fragment>
                        }
                      </SelectInput>
                      <FormError
                        show={institute_category_error && isSubmit}
                        error="Please select category."
                      />
                    </div>
                    : ""}
                </div>

                <div className="col-xs-12 col-sm-6">
                  <div className="formFieldwrap">
                    <FormInput
                      value={institute_email}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      className={institute_email_error && isSubmit ? "errorInput" : ""}
                      name="institute_email"
                      type="text"
                      id="institute_email"
                      label="*Official email"
                      placeholder="* Official email"
                    />
                    <FormError
                      show={institute_email_error && isSubmit}
                      error="Official email required."
                    />
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
                      <FormError
                        show={institute_phone_error && isSubmit}
                        error="Official contact number required."
                      />
                    </div>
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
                      className={
                        institute_country_error && isSubmit ? "errorInput" : ""
                      }
                    />
                    <FormError
                      show={institute_country_error && isSubmit}
                      error="Please select country."
                    />
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
                      className={
                        institute_state_error && isSubmit ? "errorInput" : ""
                      }
                    />
                    <FormError
                      show={institute_state_error && isSubmit}
                      error="Please provide state."
                    />{" "}
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
                      className={` ${institute_city_error && isSubmit ? "errorInput" : ""}`}
                    />
                    <FormError
                      show={institute_city_error && isSubmit}
                      error="Please enter institute city."
                    />
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
                      className={
                        (institute_zipcode_error && isSubmit) || (institute_zipcode &&
                          countryZipCodeError && isSubmit) ? "errorInput" : ""
                      }
                    />
                    <FormError
                      show={institute_zipcode_error && isSubmit}
                      error="Please provide pincode/zipcode."
                    />
                    <FormError
                      show={institute_zipcode &&
                        countryZipCodeError && isSubmit
                      }
                      error="Invalid zipcode."
                    />
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="formFieldwrap">
                    <FormTextArea
                      value={institute_address}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      className={
                        institute_address_error && isSubmit ? "errorInput" : ""
                      }
                      name="institute_address"
                      type="text"
                      label="Address line 1"
                      placeholder="Address line 1"
                      maxLength="63"
                      rows="1"
                    />
                    <FormError
                      show={institute_address_error && isSubmit}
                      error="Address line 1 required."
                    />
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="formFieldwrap">
                    <FormTextArea
                      value={institute_address_line2}
                      onChange={handleInput}
                      onKeyUp={handleInput}
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
                <div className="col-xs-6">
                  <div className="formFieldwrap pb-0">
                    <FormTextArea
                      value={institute_address_line3}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      className=""
                      name="institute_address_line3"
                      type="text"
                      label="Address Line 3"
                      placeholder="Address Line 3"
                      maxLength={63}
                      rows="1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              {patchbusinessInfoLoading ? (
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

export default ManageBusinessInfo;
