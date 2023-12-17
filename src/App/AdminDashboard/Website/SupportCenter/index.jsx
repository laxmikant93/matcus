/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import FormError from "../../../../Common/Form/FormError";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import {
  findInstituteInformation,
  resetManageInstituteInfo,
  updateInstituteInformation,
} from "../../../../store/actions/instituteregistration/action";
import "./SupportCenter.scss";
import CountrySelect from "../../../../Common/Form/CountrySelect";
import { patchInstituteInfo } from "../../../../store/actions/businessInfo";
import { changeUserInfo } from "../../../../store/actions/user";
export default function SupportCenter() {
  const { user, institutedetail, institutedetailSuccess, institutedetailLoading,
    institutedetailUpdateSuccess, businessdetail, institutedetailUpdating, businessType } = useSelector((state) => {
      return {
        user: state.user,
        institutedetail: state.manageinstituteinfo.data,
        institutedetailLoading: state.manageinstituteinfo.loading,
        institutedetailSuccess: state.manageinstituteinfo.success,
        institutedetailUpdating: state.manageinstituteinfo.updating,
      };
    });
  const history = useNavigate();
  const dispatch = useDispatch();
  const [addCheckBox, setAddCheckBox] = useState(false)

  const [contactError, setContactError] = useState(false);
  const [supportError, setSupportError] = useState(false);
  const [whatsAppNo, setWhatsAppNumber] = useState("");
  const [toggle, setToggle] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [removeState, setRemoveState] = useState(false);
  const [addedNumber, setAddedNumber] = useState("");
  const [showRemoveBtn, setShowRemoveBtn] = useState(false);
  const [contactSupportnoSet, setContactSupportnoSetSet] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    if (institutedetail.added_Contact === institutedetail.contact_support) {
      setWhatsAppNumber(institutedetail.added_Contact);
      setAddCheckBox(true)
      // console.log("if")
      setToggle(true);
      setShowRemoveBtn(true);
    } else {
      setWhatsAppNumber(institutedetail.business_phone ? institutedetail.business_phone : institutedetail.institute_phone);
      // console.log("UseEffect Else")
      setToggle(false);
      setShowRemoveBtn(false);
    }
    setAddedNumber(institutedetail.added_Contact);
  }, [institutedetail.added_Contact, institutedetail.business_phone, institutedetail.contact_support, institutedetail.institute_phone])

  const handleRadio = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setWhatsAppNumber(inputValue);
    if (inputName === "addedNumber") {
      // console.log(inputValue, "if")
      setAddNew(true);
      setToggle(true);
      setShowRemoveBtn(true);
      setAddCheckBox(true)
      setCheckBox(true)
    } else {
      // console.log(inputValue, "else")
      setToggle(false);
      setAddNew(false);
      setShowRemoveBtn(false);
      setAddCheckBox(false)
      setCheckBox(false)
    }
  };
  const handleInputContact = (value, formattedValue) => {
    setWhatsAppNumber(value);
    if (formattedValue.dialCode === "91") {
      if (value.length === 12) {
        setContactError(false);
        setWhatsAppNumber(value);
      } else {
        setContactError(true);
      }
    } else {
      if (value.length > 4) {
        setContactError(false);
        setWhatsAppNumber(value);
      } else {
        setContactError(true);
      }
    }
  };

  const removeContact = () => {
    setAddedNumber("");
    setRemoveState(true);
    setWhatsAppNumber(institutedetail.business_phone ? institutedetail.business_phone : institutedetail.institute_phone);
    setToggle(false)
    setAddNew(false)
    setCheckBox(false)
    setContactSupportnoSetSet(true)
  };

  const contactAddUpdated = () => {
    return {
      contact_support: whatsAppNo,
      added_Contact: whatsAppNo,
    };
  };

  const contactUpdated = () => {
    if (!institutedetail.business_phone || !institutedetail.institute_phone) {
      return {
        contact_support: whatsAppNo,
        added_Contact: whatsAppNo,
      }
    } else {
      return {
        contact_support: whatsAppNo,
      }
    }
  };
  const removedNumber = () => {
    if (!institutedetail.business_phone || institutedetail.institute_phone === "") {
      return {
        contact_support: "",
        added_Contact: "",
      }
    } else {
      return {
        contact_support: whatsAppNo,
        added_Contact: "",
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetManageInstituteInfo());
    };
  }, [dispatch]);
  const handleSave = () => {
    setSupportError(true);
    if (addNew) {
      if (!contactError && whatsAppNo !== "") {
        dispatch(updateInstituteInformation(user.user_institute, contactAddUpdated(), "support", user.user_business_type))
        history("/")
      }
    }
    else {
      if (removeState) {
        dispatch(updateInstituteInformation(user.user_institute, removedNumber(), "support", user.user_business_type))
        history("/")
      }
      else {
        dispatch(updateInstituteInformation(user.user_institute, contactUpdated(), "support", user.user_business_type))
        history("/")
      }
    }
  };
  useEffect(() => {
    dispatch(findInstituteInformation(user.user_institute, user.user_business_type));
  }, [dispatch, user]);

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/admin-support-center" title="Support Center" />
      </Breadcrumb>
      <div className="supportCenterWrapper mt-10">
        <p className="text-md mb-10">Support Center</p>
        <p className="text-xxs mb-40">
          Configure your WhatsApp Number to easy connect.
        </p>
        <p className="text-xs w-400">
          Choose your current using number for WhatsApp
        </p>
        <div className="input-custom-type mt-10">
          {institutedetailSuccess && !institutedetailLoading ? (
            <React.Fragment>
              {institutedetail.business_phone || institutedetail.institute_phone ?
                <React.Fragment>
                  <label className="small w-600">
                    <input
                      type="radio"
                      name="adminContact"
                      value={institutedetail.business_phone ? institutedetail.business_phone : institutedetail.institute_phone}
                      onChange={handleRadio}
                      checked={
                        whatsAppNo === (institutedetail.business_phone ? institutedetail.business_phone : institutedetail.institute_phone)
                      }
                    />
                    {institutedetail.business_phone_country_code} {institutedetail.business_phone}{institutedetail.institute_phone_country_code} {institutedetail.institute_phone}
                  </label>
                </React.Fragment>
                :
                ""}
              <label className="small">
                <input
                  type="radio"
                  name={"addedNumber"}
                  value={addedNumber ? addedNumber : ""}
                  onChange={handleRadio}
                  checked={checkBox ? (true) : (addedNumber ? institutedetail.contact_support === addedNumber && addCheckBox === true : addNew)}
                />
                {addedNumber ? addedNumber : "Add Number"}
              </label>
              {!toggle ? "" :
                <div className="formFieldwrap">
                  <div className="cstmPhoneInput">
                    <PhoneInput
                      countryCodeEditable={false}
                      containerClass="form-group"
                      inputClass="form-control"
                      specialLabel
                      country={"in"}
                      value={addedNumber}
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                        placeholder: "Enter mobile",
                      }}
                      enableSearch
                      name="mobileNo"
                      searchPlaceholder="Search Country"
                      onChange={(value, formattedValue) => {
                        handleInputContact(value, formattedValue);
                      }}
                      onKeyUp={(value, formattedValue) => {
                        handleInputContact(value, formattedValue);
                      }}
                      disableSearchIcon
                    />
                    <label className="animLabel" htmlFor="mobile_number">
                      Mobile Number
                    </label>
                    <FormError
                      show={whatsAppNo?.length < 3 && supportError}
                      error="Mobile number is required."
                    />
                  </div>
                </div>}
              {addedNumber ? (
                showRemoveBtn ?
                  <button
                    className="button btn-sm btn-o-red red smallError"
                    onClick={removeContact}>Remove</button>
                  : "") : ("")}
              <div className="submitBtnWrap">
                {institutedetailUpdating ? (
                  <button
                    type="button"
                    className="button btn-md button-theme btn-md">
                    Updating...
                  </button>) : (
                  <button
                    className="button btn-md button-theme btn-md"
                    onClick={handleSave}>
                    Save for Support
                  </button>
                )}
              </div>
            </React.Fragment>
          ) : (
            <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
