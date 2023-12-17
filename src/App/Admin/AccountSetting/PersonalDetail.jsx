/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import FormError from '../../../Common/Form/FormError';
import FormInput from '../../../Common/Form/FormInput';
import ValidationFile from "../../Auth/ValidationFile";
import Cropper from "../../../Common/Cropper";
import { useSelector, useDispatch } from 'react-redux';
import { PostUserDetailPopup, GetUserDetailPopup } from '../../../store/actions/UserDetailPopup';
import DateValidationFile from "../../../Classes/ValidationFile";
import InputDatePicker from '../../../Common/Form/InputDatePicker';
import moment from "moment";
import ValidationFileCommon from "../../../Classes//ValidationFile"
import SelectInput from '../../../Common/Form/SelectInput';

export default function PersonalDetail({ closePersonalDetails }) {
  const [thumbnailBannerUpdate, setThumbnailBannerUpdate] = useState();
  const [infoError, setInfoError] = useState(false);

  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  const { users, getUserDetailSuccess, getUserDetailData, getUserDetailLoading, postUserDetailLoading, postUserDetailSuccess } = useSelector((state) => {
    return {
      users: state.user,
      getUserDetailSuccess: state.userdetailpopup.GetUserDetail.success,
      getUserDetailData: state.userdetailpopup.GetUserDetail.data,
      getUserDetailLoading: state.userdetailpopup.GetUserDetail.loading,
      postUserDetailLoading: state.userdetailpopup.PostUserDetail.loading,
      postUserDetailSuccess: state.userdetailpopup.PostUserDetail.success,
    }
  })
  const dispatch = useDispatch();
  const ref = useRef()
  const [userDetail, setUserDetail] = useState({
    aadhar_number: {
      value: "",
      isValid: true
    },
    blood_group: {
      value: "",
      isValid: false
    },
    profile_picture: {
      value: "",
      isValid: true

    },
    gender: {
      value: "Other",
      isValid: false
    },
    dob: {
      value: "",
      isValid: false
    },
    relegion: {
      value: "",
      isValid: true
    },
    cast_category: {
      value: "",
      isValid: true
    },
    validation: false,
  })

  const handleChange = (e) => {
    let inputName = e.target.name;
    let inputvalue = e.target.value;
    setInfoError(false)
    if (inputName === "aadhar_number") {
      setUserDetail({
        ...userDetail,
        "aadhar_number": {
          value: ValidationFileCommon.spaceNotAccept(inputvalue),
          isValid: true,
        },
        validation: isFormValid(),
      })
      // } else if (inputName === "blood_group") {
      //   setUserDetail({
      //     ...userDetail,
      //     "blood_group": {
      //       value: ValidationFileCommon.spaceNotAccept(inputvalue),
      //       isValid: true,
      //     },
      //     validation: isFormValid(),
      //   })
    } else if (inputName === "relegion") {
      setUserDetail({
        ...userDetail,
        "relegion": {
          value: ValidationFileCommon.spaceNotAccept(inputvalue),
          isValid: true,
        },
        validation: isFormValid(),
      })
    } else if (inputName === "cast_category") {
      setUserDetail({
        ...userDetail,
        "cast_category": {
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
    }
  }

  const [isFilled, setIsFilled] = useState(false);
  const fillUpdateData = () => {
    let studentInfoData = {
      ...userDetail,
      aadhar_number: {
        value: getUserDetailData.aadhar_number,
        isValid: true,
      },
      blood_group: {
        value: getUserDetailData.blood_group,
        isValid: ValidationFile.validEmpty(getUserDetailData.blood_group),
      },
      profile_picture: {
        value: getUserDetailData.profile_picture,
        isValid: ValidationFile.validEmpty(getUserDetailData.profile_picture),
      },
      gender: {
        value: getUserDetailData.gender ? getUserDetailData.gender : "Other",
        isValid: ValidationFile.validEmpty(getUserDetailData.gender),
      },
      dob: {
        value: getUserDetailData.dob,
        isValid: ValidationFile.validEmpty(getUserDetailData.dob),
      },
      relegion: {
        value: getUserDetailData.relegion,
        isValid: ValidationFile.validEmpty(getUserDetailData.relegion),
      },
      cast_category: {
        value: getUserDetailData.cast_category,
        isValid: ValidationFile.validEmpty(getUserDetailData.cast_category),
      },
      validation: true,
    };
    setUserDetail(studentInfoData)
    setThumbnailBannerUpdate(getUserDetailData.profile_picture)
  }

  useEffect(() => {
    if (getUserDetailSuccess && getUserDetailData && !getUserDetailLoading) {
      setIsFilled(true);
      fillUpdateData();
    }
  }, [getUserDetailSuccess, getUserDetailData, getUserDetailLoading])

  useEffect(() => {
    dispatch(GetUserDetailPopup(users._id, users.user_business_type));
  }, [dispatch, users._id]);


  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "aadhar_number":
        return ValidationFile.validEmpty(inputValue);
      case "blood_group":
        return ValidationFile.validEmpty(inputValue);
      case "gender":
        return ValidationFile.validEmpty(inputValue);
      case "dob":
        return ValidationFile.validEmpty(inputValue);
      case "relegion":
        return ValidationFile.validEmpty(inputValue);
      case "cast_category":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const thumbnailUpdateRemove = () => {
    setThumbnailBannerUpdate("");
  };

  const uploadThumbnailUpdate = (data, key) => {
    let imgData = data.location;
    setThumbnailBannerUpdate(imgData);
  };

  const handleBirthdate = (date) => {
    let DateInfo = {
      ...userDetail,
      dob: {
        value: date,
        isValid: DateValidationFile.isEmpty(date),
      },
      validation: isFormValid(),
    };
    setUserDetail(DateInfo);
  }

  const isFormValid = () => {
    return userDetail.aadhar_number.isValid &&
      userDetail.blood_group.isValid &&
      userDetail.profile_picture.isValid &&
      userDetail.gender.isValid &&
      userDetail.dob.isValid &&
      userDetail.relegion.isValid &&
      userDetail.cast_category.isValid
      ? true : false;
  };

  const userdata = () => {
    return {
      aadhar_number: userDetail.aadhar_number.value,
      blood_group: userDetail.blood_group.value,
      profile_picture: thumbnailBannerUpdate,
      gender: userDetail.gender.value,
      dob: userDetail.dob.value,
    }
  }
  const adharValidation = () => {
    if (userDetail.aadhar_number.value) {
      if (userDetail.aadhar_number.value.length === 12) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setInfoError(true)
    const adharValid = adharValidation()
    if (isFormValid()) {
      dispatch(PostUserDetailPopup(users._id, userdata(), users.user_business_type));
    }
    else if (adharValid) {
      dispatch(PostUserDetailPopup(users._id, userdata(), users.user_business_type));
    } else {
      setUserDetail({
        ...userDetail,
        "aadhar_number": {
          value: userDetail.aadhar_number.value,
          isValid: false,
        },
        validation: false
      })
    }
  }

  useEffect(() => {
    if (postUserDetailSuccess && !postUserDetailLoading) {
      closePersonalDetails()
    }
  }, [postUserDetailSuccess])

  return (
    <React.Fragment>
      {getUserDetailLoading ? (<div className="loadingGridData">
        <i className="ed-loadingGrid"></i>
      </div>) : (<>
        <div className="row mt-1">
          <div className="col-md-21 text-left">
            <h1 className="heading text-sm w-500 mb-10">
              Update Personal Detail
            </h1>
          </div>
        </div>
        <div className="Aadhar_Number">
          <div className="formFieldwrap">
            <FormInput
              name="aadhar_number"
              type="number"
              value={userDetail.aadhar_number.value}
              onChange={handleChange}
              onKeyUp={handleChange}

              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
              }}
              min={11}
              onKeyDown={(e) =>
                symbolsArr.includes(e.key) && e.preventDefault()
              }
              label="Aadhar Number"
              placeholder="Enter Aadhar Number"
            />
            <FormError
              show={!userDetail.aadhar_number.isValid && infoError}
              error="Aadhar Number is invalid."
            />
          </div>
        </div>
        <div className="formFieldwrap">

          <SelectInput
            id="blood_group"
            name="blood_group"
            defaultValue={userDetail.blood_group.value}

            value={userDetail.blood_group.value}
            onChange={handleChange}
            label="Blood Group"
          >
            <option value="" id="blood_group">Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
            {/* <option>Unknown</option> */}
          </SelectInput>
          {/* <label className="animLabel" htmlFor="gender">
              Blood Group
            </label> */}
          {/* <FormError
              show={!userDetail.blood_group.isValid && infoError}
              error=" Blood Group Name  is Required."
            /> */}
        </div>
        <div>
          <div className="formFieldwrap mt-15">
            <div className="formFieldwrap">
              <label className="text-xs w-600">Upload Profile Photo</label>
              <p className="text-xxs mt-3">
                Accept only .JPG or .PNG file.</p>
              <Cropper
                minWidth={300}
                maxWidth={600}
                name="profile_picture"
                defaultRatio={5 / 3}
                ref={ref}
                onUploaded={uploadThumbnailUpdate}
                BtnName="Upload Image"
                IconClassName="i-md gray"
                BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
              />

              <div className='fileUploadSub'>
                {thumbnailBannerUpdate ? (
                  <a
                    className="btnText priamry text-2xs attachmentwithtext mt-3"
                    href={thumbnailBannerUpdate}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ed-icon icon-attachment gray i-xs"></i>
                    {thumbnailBannerUpdate.replace(s3Url, "")}
                  </a>
                ) : (
                  ""
                )}
                {thumbnailBannerUpdate && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={thumbnailUpdateRemove}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="formFieldwrap  mb-10">
            <SelectInput
              id="gender"
              name="gender"
              value={userDetail.gender.value}
              onChange={handleChange}
              label="Gender"
            >
              <option value="" id="gender">Gender Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </SelectInput>
            {/* <label className="animLabel" htmlFor="gender">
                Gender
              </label> */}
          </div>
          <div className="datePickerWrap">
            <InputDatePicker
              name="dob"
              type="date"
              maxDate={moment().toDate()}
              onSelect={(selectedDob) => {
                handleBirthdate(selectedDob);
              }}
              label="Date of Birth"
              placeholder="Date of birth"
              value={userDetail.dob.value}
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
        {
          postUserDetailLoading ? (
            <button
              type="button"
              className="button btn-md button-theme"
            >
              Loading..
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              type="button"
              className="button btn-md button-theme"
            >
              Continue
            </button>
          )
        }
      </>)}
    </React.Fragment >
  )
}