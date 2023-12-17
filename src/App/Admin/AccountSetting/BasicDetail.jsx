/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FormError from '../../../Common/Form/FormError';
import FormInput from '../../../Common/Form/FormInput';
import StateSelect from '../../../Common/Form/StateSelect';
import ValidationFile from "../../Auth/ValidationFile";
import { useSelector, useDispatch } from 'react-redux';
import { UpdateUserBasicDetailPopup, GetUserBasicDetailPopup } from '../../../store/actions/UserDetailPopup';
import CountrySelect from '../../../Common/Form/CountrySelect';
import ValidationFileCommon from "../../../Classes//ValidationFile"
import ZipCodes from "../../../Common/Zipcodes/Zipcodes.json";
import "./AccountSetting.scss"



export default function BasicDetail({ closeBasicDetails, backButton }) {
  const { users, getUserBasicDetailSuccess, getUserBasicDetailData, getUserBasicDetailLoading, postUserBasicDetailLoading, postUserBasicDetailSuccess } = useSelector((state) => {
    return {
      users: state.user,
      getUserBasicDetailSuccess: state.userdetailpopup.GetUserBasicDetail.success,
      getUserBasicDetailData: state.userdetailpopup.GetUserBasicDetail.data,
      getUserBasicDetailLoading: state.userdetailpopup.GetUserBasicDetail.loading,
      postUserBasicDetailLoading: state.userdetailpopup.PostUserBasicDetail.loading,
      postUserBasicDetailSuccess: state.userdetailpopup.PostUserBasicDetail.success,

    }
  })
  const symbolsArr = [",", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "=", "+", ".", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const dispatch = useDispatch();

  const [infoError, setInfoError] = useState(false);

  const [userDetail, setUserDetail] = useState({
    father_name: {
      value: "",
      isValid: false
    },
    father_occupation: {
      value: "",
      isValid: true
    },
    mother_name: {
      value: "",
      isValid: false
    },
    mother_occupation: {
      value: "",
      isValid: true
    },
    permanent_address: {
      value: "",
      isValid: false
    },
    temporary_address: {
      value: "",
      isValid: true
    },
    user_country: {
      value: "",
      isValid: false
    },
    user_state: {
      value: "",
      isValid: false
    },
    user_city: {
      value: "",
      isValid: false
    },
    user_zipcode: {
      value: "",
      isValid: false
    },
    guardian_name: {
      value: "",
      isValid: true
    },
    guardian_occupation: {
      value: "",
      isValid: true
    },
    releation_with_guardian: {
      value: "",
      isValid: true
    },
    validation: false,
  })

  const [countryZipCodeIndex, setCountryZipCodeIndex] = useState("");
  const [countryZipCodeError, setCountryZipCodeError] = useState(false);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputvalue = event.target.value;
    // setInfoError(false)
    if (inputName === "father_occupation") {
      setUserDetail({
        ...userDetail,
        "father_occupation": {
          value: ValidationFileCommon.spaceNotAccept(inputvalue),
          isValid: true,
        },
        validation: isFormValid(),
      })
    } else if (inputName === "mother_occupation") {
      setUserDetail({
        ...userDetail,
        "mother_occupation": {
          value: ValidationFileCommon.spaceNotAccept(inputvalue),
          isValid: true,
        },
        validation: isFormValid(),
      })
    } else if (inputName === "temporary_address") {
      setUserDetail({
        ...userDetail,
        "temporary_address": {
          value: ValidationFileCommon.spaceNotAccept(inputvalue),
          isValid: true,
        },
        validation: isFormValid(),
      })
    } else if (inputName === "guardian_name") {
      setUserDetail({
        ...userDetail,
        "guardian_name": {
          value: ValidationFileCommon.spaceNotAccept(inputvalue),
          isValid: true,
        },
        validation: isFormValid(),
      })
    } else if (inputName === "guardian_occupation") {
      setUserDetail({
        ...userDetail,
        "guardian_occupation": {
          value: ValidationFileCommon.spaceNotAccept(inputvalue),
          isValid: true,
        },
        validation: isFormValid(),
      })
    } else if (inputName === "releation_with_guardian") {
      setUserDetail({
        ...userDetail,
        "releation_with_guardian": {
          value: ValidationFileCommon.spaceNotAccept(inputvalue),
          isValid: true,
        },
        validation: isFormValid(),
      })
    } else {
      setUserDetail({
        ...userDetail,
        [inputName]: {
          value: ValidationFileCommon.spaceNotAccept(inputvalue),
          isValid: validationConfirm(inputvalue, inputName)
        },
        validation: isFormValid(),
      })
      ZipCodeValidCheck()
    }
  }

  const fillUpdateData = () => {
    let studentInfoData = {
      ...userDetail,
      father_name: {
        value: getUserBasicDetailData.father_name,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.father_name),
      },
      father_occupation: {
        value: getUserBasicDetailData.father_occupation,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.father_occupation),
      },
      mother_name: {
        value: getUserBasicDetailData.mother_name,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.mother_name),
      },
      mother_occupation: {
        value: getUserBasicDetailData.mother_occupation,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.mother_occupation),
      },
      permanent_address: {
        value: getUserBasicDetailData.permanent_address,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.permanent_address),
      },
      temporary_address: {
        value: getUserBasicDetailData.temporary_address,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.temporary_address),
      },
      user_country: {
        value: getUserBasicDetailData.user_country,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.user_country),
      },
      user_state: {
        value: getUserBasicDetailData.user_state,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.user_state),
      },
      user_city: {
        value: getUserBasicDetailData.user_city,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.user_city),
      },
      user_zipcode: {
        value: getUserBasicDetailData.user_zipcode,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.user_zipcode),
      },
      guardian_name: {
        value: getUserBasicDetailData.guardian_name,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.guardian_name),
      },
      guardian_occupation: {
        value: getUserBasicDetailData.guardian_occupation,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.guardian_occupation),
      },
      releation_with_guardian: {
        value: getUserBasicDetailData.releation_with_guardian,
        isValid: ValidationFile.validEmpty(getUserBasicDetailData.releation_with_guardian),
      },
      validation: true,
    };
    setUserDetail(studentInfoData)
  }
  useEffect(() => {
    if (getUserBasicDetailSuccess && getUserBasicDetailData && !getUserBasicDetailLoading) {
      fillUpdateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserBasicDetailSuccess, getUserBasicDetailData, getUserBasicDetailLoading])

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "father_name":
        return ValidationFile.validEmpty(inputValue);
      case "father_occupation":
        return ValidationFile.validEmpty(inputValue);
      case "mother_name":
        return ValidationFile.validEmpty(inputValue);
      case "mother_occupation":
        return ValidationFile.validEmpty(inputValue);
      case "permanent_address":
        return ValidationFile.validEmpty(inputValue);
      case "temporary_address":
        return ValidationFile.validEmpty(inputValue);
      case "user_country":
        return ValidationFile.validEmpty(inputValue);
      case "user_state":
        return ValidationFile.validEmpty(inputValue);
      case "user_city":
        return ValidationFile.validEmpty(inputValue);
      case "user_zipcode":
        return ValidationFile.validEmpty(inputValue);
      case "guardian_name":
        return ValidationFile.validEmpty(inputValue);
      case "guardian_occupation":
        return ValidationFile.validEmpty(inputValue);
      case "releation_with_guardian":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  useEffect(() => {
    dispatch(GetUserBasicDetailPopup(users._id, users.user_business_type));
  }, [dispatch, users._id]);

  const isFormValid = () => {
    return userDetail.father_name.isValid &&
      userDetail.mother_name.isValid &&
      userDetail.permanent_address.isValid &&
      userDetail.user_country.isValid &&
      userDetail.user_state.isValid &&
      userDetail.user_city.isValid &&
      userDetail.user_zipcode.isValid && !countryZipCodeError
      ? true : false;
  };

  const ZipCodeValidCheck = () => {
    if (userDetail.user_zipcode.value && countryZipCodeIndex) {
      let RegExCHeck = ZipCodes.zipCode[countryZipCodeIndex].Regex;
      var pattern = new RegExp(RegExCHeck);
      if (pattern.test(userDetail.user_zipcode.value)) {
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
        userDetail.user_country.value ===
        ZipCodes.zipCode[i].Country
      ) {
        setCountryZipCodeIndex(i);
        ZipCodeValidCheckUseEffect(i);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail.user_country.value]);

  const ZipCodeValidCheckUseEffect = (i) => {
    if (userDetail.user_zipcode.value) {
      let RegExCHeck = ZipCodes.zipCode[i].Regex;
      var pattern = new RegExp(RegExCHeck);
      if (pattern.test(userDetail.user_zipcode.value)) {
        setCountryZipCodeError(false);
        return true;
      } else {
        setCountryZipCodeError(true);
        return false;
      }
    }
  };

  const userdata = () => {
    return {
      father_name: userDetail.father_name.value,
      father_occupation: userDetail.father_occupation.value,
      mother_name: userDetail.mother_name.value,
      mother_occupation: userDetail.mother_occupation.value,
      permanent_address: userDetail.permanent_address.value,
      temporary_address: userDetail.temporary_address.value,
      user_country: userDetail.user_country.value,
      user_state: userDetail.user_state.value,
      user_city: userDetail.user_city.value,
      user_zipcode: userDetail.user_zipcode.value,
      guardian_name: userDetail.guardian_name.value,
      guardian_occupation: userDetail.guardian_occupation.value,
      releation_with_guardian: userDetail.releation_with_guardian.value
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfoError(true)
    if (isFormValid()) {
      dispatch(UpdateUserBasicDetailPopup(users._id, userdata(), users.user_business_type))
    }
  }
  useEffect(() => {
    if (postUserBasicDetailSuccess && !postUserBasicDetailLoading) {
      closeBasicDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postUserBasicDetailSuccess])

  return (
    <React.Fragment>
      {getUserBasicDetailLoading ? (<div className="loadingGridData">
        <i className="ed-loadingGrid"></i>
      </div>) : (<>
        <div className="row mt-30">
          <div className="col-md-21 text-left">
            <button className='back-icon mb-20' onClick={() => backButton()}>&#10094;</button>
            <h1 className="heading text-sm w-300 mb-20">
              Basic Detail
            </h1>
          </div>
        </div>
        <div className="formFieldwrap mb-10">
          <FormInput
            name="father_name"
            value={userDetail.father_name.value}
            onChange={handleChange}
            onKeyUp={handleChange}
            type="text"
            maxLength={79}
            label="Father's name"
            placeholder="Enter Father's name"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}

          />
          <FormError
            show={!userDetail.father_name.value && infoError}
            error="Father name is required."
          />
        </div>
        <div className="formFieldwrap mb-10">
          <FormInput
            name="father_occupation"
            onChange={handleChange}
            maxLength={79}
            value={userDetail.father_occupation.value}
            label="Father's occupation"
            placeholder="Enter Father's Occupation"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="mother_name"
            onChange={handleChange}
            maxLength={79}
            value={userDetail.mother_name.value}
            label="Mother's Name"
            placeholder="Mother's Name"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
          <FormError
            show={!userDetail.mother_name.isValid && infoError}
            error="Mother's Name  is Required."
          />

        </div>
        <div className="formFieldwrap mb-10">
          <FormInput
            name="mother_occupation"
            onChange={handleChange}
            value={userDetail.mother_occupation.value}
            label="Mother's Occupation"
            maxLength={79}
            placeholder="Enter Mother's Occupation"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />

        </div>
        <div className="formFieldwrap mb-10">
          <FormInput
            name="permanent_address"
            onChange={handleChange}
            maxLength={159}
            value={userDetail.permanent_address.value}
            label="permanent Address"
            placeholder="Enter permanent Address"
          />
          <FormError
            show={!userDetail.permanent_address.isValid && infoError}
            error="Permanent Address is Required."
          />
        </div>
        <div className="formFieldwrap mb-10">
          <FormInput
            name="temporary_address"
            onChange={handleChange}
            maxLength={159}
            value={userDetail.temporary_address.value}
            label="Temporary Address"
            placeholder="Enter Temporary Address"
          />
        </div>
        <div className="formFieldwrap mb-10">
          <CountrySelect
            name="user_country"
            id="user_country"
            value={userDetail.user_country.value}
            onEvent={handleChange}
            autoevent={true}
            label="Select country"
          />
          <FormError
            show={!userDetail.user_country.isValid && infoError}
            error="Please select country."
          />
        </div>
        <div className="formFieldwrap">
          <StateSelect
            name="user_state"
            // id="user_state"
            value={userDetail.user_state.value}
            onEvent={handleChange}
            autoevent={true}
            label="Select state"
          />
          <FormError
            show={!userDetail.user_state.isValid && infoError}
            error="Please select state."
          />
        </div>
        <div className="formFieldwrap mb-10">
          <FormInput
            onChange={handleChange}
            value={userDetail.user_city.value}
            className=""
            name="user_city"
            type="text"
            label="City"
            id="user_city"
            maxLength={179}
            placeholder="Enter City"
          />
          <FormError
            show={!userDetail.user_city.isValid && infoError}
            error="Please Enter city."
          />
        </div>
        <div className="formFieldwrap mb-10">
          <FormInput
            value={userDetail.user_zipcode.value}
            onChange={handleChange}
            onKeyUp={handleChange}
            className=""
            name="user_zipcode"
            type="text"
            id="Zip/Pin code"
            label="Zip/Pin code"
            placeholder="Zip/Pin code"
          />
          <FormError
            show={(!userDetail.user_zipcode.value || userDetail.user_zipcode.value === "") && infoError}
            error="Please provide pincode/zipcode."
          />
          <FormError
            show={userDetail.user_zipcode.value &&
              countryZipCodeError && infoError
            }
            error="Invalid zipcode."
          />
        </div>
        <div className="formFieldwrap mb-10">
          <FormInput
            name="guardian_name"
            onChange={handleChange}
            value={userDetail.guardian_name.value}
            label="Guardian Name"
            maxLength={79}
            placeholder="Enter Guardian Name"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
        </div>
        <div className="formFieldwrap mb-10">
          <FormInput
            name="guardian_occupation"
            onChange={handleChange}
            value={userDetail.guardian_occupation.value}
            maxLength={119}
            label="Guardian Occupation"
            placeholder="Enter Guardian Occupation"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="releation_with_guardian"
            onChange={handleChange}
            maxLength={79}
            value={userDetail.releation_with_guardian.value}
            label="Relationship with Guardian"
            placeholder="Enter Relationship with Guardian"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
        </div>
        {postUserBasicDetailLoading ? (
          <button
            type="submit"
            className="button btn-md button-theme"
          >
            Submiting...
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            type="submit"
            className="button btn-md button-theme"
          >
            Submit
          </button>
        )}

      </>)}
    </React.Fragment>
  )
}