/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import InputDatePicker from "../../../Common/Form/InputDatePicker";
import { Userid } from "../../../Common/UserElement";
import { showSuccessPopup } from "../../../store/actions/successmessagepopup";
import { changeUserInfo, getUserInfo } from "../../../store/actions/user";
import { updateUserType } from "../../../store/actions/publicProfile";
import useOnChangeOtp from "../../Auth/Hooks/useChangeContact";
import useEmailSignVerify from "../../Auth/Hooks/useEmailSignVerify";
import useProfileEmailVerify from "../../Auth/Hooks/useProfileEmailVerify";
import useSendOtp from "../../Auth/Hooks/useSendOtp";
import useVerifyOtp from "../../Auth/Hooks/useOtpVerify";
import useEnableWhatsApp from "../../Auth/Hooks/useEnableWhatsApp";
import moment from "moment";
import UserRequest from "../../../store/actions/user/UserRequest";
import ValidationFile from "../../../Classes/ValidationFile";
import Auth from "../../../Classes/Auth";
import CountrySelect from "../../../Common/Form/CountrySelect";
import StateSelect from "../../../Common/Form/StateSelect";
import { GetUserBasicDetailPopup, UpdateUserBasicDetailPopup } from "../../../store/actions/UserDetailPopup";
import "./AccountSetting.scss"
import ZipCodes from "../../../Common/Zipcodes/Zipcodes.json";
import AppLink from "../../../Common/AppLink/AppLink";
import SelectInput from "../../../Common/Form/SelectInput";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const id = Userid();

  const [infoError, setInfoError] = useState(false);

  // const user_usertype = useSelector((state) => state.user.user_usertype);
  // const isUserVerified = useSelector((state) => state.user.user_isVerified);
  const user_email = useSelector((state) => state.user.user_email);

  const userOtherRoleName = useSelector(
    (state) => state.user.user_otherUserTypeName
  );

  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [blood_group, setBlood_Group] = useState("");
  const [aadhar_number, setAadhar_Number] = useState("");
  const [father_name, setFather_Name] = useState("");
  const [father_occupation, setFather_Occupation] = useState("");
  const [mother_name, setMother_Name] = useState("");
  const [mother_occupation, setMother_Occupation] = useState("");
  const [permanent_address, setPermanent_Address] = useState("");
  const [temporary_address, setTemporary_Address] = useState("");
  const [user_country, setUser_Country] = useState("");
  const [user_state, setUser_State] = useState("");
  const [user_city, setUser_City] = useState("");
  const [user_zipcode, setUser_Zipcode] = useState("");
  const [guardian_name, setGuardian_Name] = useState("");
  const [guardian_occupation, setGuardian_Occupation] = useState("");
  const [releation_with_guardian, setReleation_With_Guardian] = useState("");

  // ERROR
  const [aadhar_number_error, setAadhar_Number_Error] = useState(false);
  const [father_name_error, setFather_Name_ERROR] = useState(false);
  const [mother_name_error, setMother_Name_ERROR] = useState(false);
  const [permanent_address_error, setPermanent_Address_ERROR] = useState(false);
  const [user_country_error, setUser_Country_ERROR] = useState(false);
  const [user_state_error, setUser_State_ERROR] = useState(false);
  const [user_city_error, setUser_City_ERROR] = useState(false);
  const [user_zipcode_error, setUser_Zipcode_ERROR] = useState(false);

  const allRoles = ["InstituteOwner", "Teacher", "Student", "Other"];

  const [userRole, setUserRole] = useState("");
  const [chooseOtherRole, setChooseOtherRole] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [editContact, setEditContact] = useState(false);
  const [isEditable, setIsEditable] = useState("");
  const [editEmailToggle, setEditEmailToggle] = useState(false);
  const [EmailOtpSend, setEmailOtpSend] = useState(false);
  const [emailOtpValue, setemailOtpValue] = useState("");
  const [sameEmailEntered, setSameEmailEntered] = useState(false);
  const [newMail, setNewMail] = useState("");
  const [EmailInvalid, setEmailInvalid] = useState(false);
  const [sentOtpLoading, setSentOtpLoading] = useState(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const [verifyEmailOtpSuccess, setVerifyEmailOtpSuccess] = useState(true);
  const [verifyEmailOtpError, setVerifyEmailOtpError] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [emailNotSame, setIsEmailNotSame] = useState(false);

  const {
    user,
    userId,
    user_contact,
    user_contact_verify,
    user_usertype,
    isUserVerified,
    users,
    getUserDetailSuccess,
    getUserDetailData,
    getUserDetailLoading,
    user_business_type,

  } = useSelector((state) => {
    return {
      user: state.user,
      userId: state.user._id,
      user_contact: state.user.user_contact,
      user_contact_verify: state.user.user_contact_verify,
      isUserVerified: state.user.user_isVerified,
      user_dob: state.user.user_dob,
      user_gender: state.user.user_gender,
      user_blood_group: state.user.user_blood_group,
      user_aadhar_number: state.user.user_aadhar_number,
      user_father_name: state.user.user_father_name,
      user_father_occupation: state.user.user_father_occupation,
      user_mother_name: state.user.user_mother_name,
      user_mother_occupation: state.user.user_mother_occupation,
      user_permanent_address: state.user.user_permanent_address,
      user_temporary_address: state.user.user_temporary_address,
      user_user_country: state.user.user_user_country,
      user_user_state: state.user.user_user_state,
      user_user_city: state.user.user_user_city,
      user_user_zipcode: state.user.user_user_zipcode,
      user_guardian_name: state.user.user_guardian_name,
      user_guardian_occupation: state.user.user_guardian_occupation,
      user_releation_with_guardian: state.user.user_releation_with_guardian,
      user_country_code: state.user.user_country_code,
      user_usertype: state.user.user_usertype,
      user_whatsapp_contact: state.user.user_whatsapp_contact,
      users: state.user,
      getUserDetailSuccess: state.userdetailpopup.GetUserDetail.success,
      getUserDetailData: state.userdetailpopup.GetUserDetail.data,
      getUserDetailLoading: state.userdetailpopup.GetUserDetail.loading,
      user_business_type: state.user.user_business_type
    };
  });
  useEffect(() => {
    setNewRole(userOtherRoleName ? userOtherRoleName : "");
  }, [userOtherRoleName]);
  const symbolsArr = ["+", "-", ".", ",", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "=", "+", ".", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const [symbolsArrMail] = useState(["e", "E", "+", "-", "."]);

  const [countryZipCodeIndex, setCountryZipCodeIndex] = useState("");
  const [countryZipCodeError, setCountryZipCodeError] = useState(false);


  const ZipCodeValidCheck = (value) => {
    if (value && countryZipCodeIndex) {

      let RegExCHeck = ZipCodes.zipCode[countryZipCodeIndex].Regex;
      var pattern = new RegExp(RegExCHeck);
      if (pattern.test(value)) {
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
        user_country ===
        ZipCodes.zipCode[i].Country
      ) {
        setCountryZipCodeIndex(i);
        ZipCodeValidCheckUseEffect(i);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_country]);

  const ZipCodeValidCheckUseEffect = (i) => {
    if (user_zipcode) {
      let RegExCHeck = ZipCodes.zipCode[i].Regex;
      var pattern = new RegExp(RegExCHeck);
      if (pattern.test(user_zipcode)) {
        setCountryZipCodeError(false);
        return true;
      } else {
        setCountryZipCodeError(true);
        return false;
      }
    }
  };

  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    dispatch(GetUserBasicDetailPopup(users._id, users.user_business_type));
  }, [dispatch, users._id]);

  const fillUpdateData = () => {
    setDob(getUserDetailData.dob)

    setGender(getUserDetailData.gender)
    setBlood_Group(getUserDetailData.blood_group)
    setAadhar_Number(getUserDetailData.aadhar_number)
    setFather_Name(getUserDetailData.father_name)
    setFather_Occupation(getUserDetailData.father_occupation)
    setMother_Name(getUserDetailData.mother_name)
    setMother_Occupation(getUserDetailData.mother_occupation)
    setPermanent_Address(getUserDetailData.permanent_address)
    setTemporary_Address(getUserDetailData.temporary_address)
    setUser_Country(getUserDetailData.user_country)
    setUser_State(getUserDetailData.user_state)
    setUser_City(getUserDetailData.user_city)
    setUser_Zipcode(getUserDetailData.user_zipcode)
    setGuardian_Name(getUserDetailData.guardian_name)
    setGuardian_Occupation(getUserDetailData.guardian_occupation)
    setReleation_With_Guardian(getUserDetailData.releation_with_guardian)

  }
  if (!isFilled && getUserDetailSuccess && getUserDetailData && !getUserDetailLoading) {
    setIsFilled(true);
    fillUpdateData();
  }

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    switch (inputName) {
      case "user_dob":
        setDob(inputValue);
        break;
      case "user_gender":
        setGender(inputValue);
        break;
      case "user_blood_group":
        setBlood_Group(inputValue);

        break;
      case "user_aadhar_number":
        setAadhar_Number(ValidationFile.spaceNotAccept(inputValue));
        setAadhar_Number_Error(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "user_father_name":
        setFather_Name(ValidationFile.spaceNotAccept(inputValue));
        setFather_Name_ERROR(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "user_father_occupation":
        setFather_Occupation(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "user_mother_name":
        setMother_Name(ValidationFile.spaceNotAccept(inputValue));
        setMother_Name_ERROR(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "user_mother_occupation":
        setMother_Occupation(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "user_permanent_address":
        setPermanent_Address(ValidationFile.spaceNotAccept(inputValue));
        setPermanent_Address_ERROR(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "user_temporary_address":
        setTemporary_Address(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "user_user_country":
        setUser_Country(ValidationFile.spaceNotAccept(inputValue));
        setUser_Country_ERROR(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "user_user_state":
        setUser_State(ValidationFile.spaceNotAccept(inputValue));
        setUser_State_ERROR(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "user_user_city":
        setUser_City(ValidationFile.spaceNotAccept(inputValue));
        setUser_City_ERROR(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "user_user_zipcode":
        setUser_Zipcode(inputValue);
        setUser_Zipcode_ERROR(ValidationFile.isEmpty(inputValue));
        ZipCodeValidCheck(inputValue);
        break;
      case "user_guardian_name":
        setGuardian_Name(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "user_guardian_occupation":
        setGuardian_Occupation(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "user_releation_with_guardian":
        setReleation_With_Guardian(ValidationFile.spaceNotAccept(inputValue));
        break;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (users.user_isVerified) {
      setEditEmailToggle(false)
    } else {
      setEditEmailToggle(true)
    }
  }, [users.user_isVerified]);

  const editUserData = () => {
    return {
      dob: dob,
      gender: gender,
      blood_group: blood_group,
      aadhar_number: aadhar_number,
      father_name: father_name,
      father_occupation: father_occupation,
      mother_name: mother_name,
      mother_occupation: mother_occupation,
      permanent_address: permanent_address,
      temporary_address: temporary_address,
      user_country: user_country,
      user_state: user_state,
      user_city: user_city,
      user_zipcode: user_zipcode,
      guardian_name: guardian_name,
      guardian_occupation: guardian_occupation,
      releation_with_guardian: releation_with_guardian,
    }
  }

  const adharValidation = () => {
    let isValid = true;
    if (aadhar_number) {
      if (aadhar_number.length === 12) {
        isValid = true
      } else {
        isValid = false
        setAadhar_Number_Error(true);
      }
    } else {
      isValid = true
    }
    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfoError(true);
    // setProfileError(true);
    let aadharValid = adharValidation()
    setAadhar_Number_Error(!aadharValid)

    if (ValidationFile.isEmpty(father_name)) {
      setFather_Name_ERROR(true);
    }
    if (ValidationFile.isEmpty(mother_name)) {
      setMother_Name_ERROR(true);
    }
    if (ValidationFile.isEmpty(permanent_address)) {
      setPermanent_Address_ERROR(true);
    }
    if (ValidationFile.isEmpty(user_country)) {
      setUser_Country_ERROR(true);
    }
    if (ValidationFile.isEmpty(user_state)) {
      setUser_State_ERROR(true);
    }
    if (ValidationFile.isEmpty(user_city)) {
      setUser_City_ERROR(true);
    }
    if (ValidationFile.isEmpty(user_zipcode)) {
      setUser_Zipcode_ERROR(true);
    }
    if (aadharValid && !countryZipCodeError &&
      !ValidationFile.isEmpty(father_name) &&
      !ValidationFile.isEmpty(mother_name) &&
      !ValidationFile.isEmpty(permanent_address) &&
      !ValidationFile.isEmpty(user_country) &&
      !ValidationFile.isEmpty(user_state) &&
      !ValidationFile.isEmpty(user_city) &&
      !ValidationFile.isEmpty(user_zipcode)
    ) {
      dispatch(UpdateUserBasicDetailPopup(userId, editUserData(), user_business_type));
    }
  };

  useEffect(() => {
    UserRequest.getUserDetail(userId, user_business_type, (success) => {

      if (isUserVerified !== success.data.isVerified) {
        dispatch(
          changeUserInfo(userId, { isVerified: success.data.isVerified }, user.user_business_type)
        );
      }
    });
  }, [userId, isUserVerified, dispatch, user.user_business_type, user_business_type]);

  const changeRole = (e) => {
    if (e.target.value === "Other") {
      setChooseOtherRole(true);
    } else {
      setChooseOtherRole(false);
    }

    setUserRole(e.target.value);

    let userData = {
      usertype: e.target.value,
    };

    // e.target.value !== "Other" && dispatch(changeUserInfo(id, userData));
    if (e.target.value !== "Other") {
      dispatch(changeUserInfo(id, userData, user.user_business_type));
      const userDataValue = {
        usertype: userData.usertype,
        otherUserTypeName: "",
      };
      dispatch(updateUserType(id, userDataValue));
      dispatch(changeUserInfo(id, { otherUserTypeName: "" }, user.user_business_type));
    }
    // else if (e.target.value === "Other") {
    //   const userData = {
    //     usertype: "Other",
    //     otherUserTypeName: e.target.value,
    //   };

    //   dispatch(updateUserType(id, userData));
    // }
  };

  const handleRole = (e) => {
    const role = e.target.value.trimStart();
    // setOtherRole(role);
    setNewRole(role);
  };

  const handleRoleOnBlur = () => {
    setChooseOtherRole(false);
    setNewRole(userOtherRoleName);
    userRole === "Other" &&
      newRole === "" &&
      dispatch(changeUserInfo(id, { usertype: userRole }, user.user_business_type));
    (userRole === "Other" && newRole === "") ||
      dispatch(changeUserInfo(id, { usertype: userRole }, user.user_business_type));
  };

  const submitRole = () => {
    let userData = {
      otherUserTypeName: newRole,
    };
    let newData = {
      usertype: "Other",
      otherUserTypeName: newRole,
    };
    dispatch(changeUserInfo(id, userData, user.user_business_type));
    dispatch(updateUserType(id, newData));
    setChooseOtherRole(false);
  };

  // EMAIL VERIFICATION\
  const [
    isEmailValid,
    isEmailError,
    isEmailLoading,
    emailMessage,
    setValidateEmail,
    resetEmailVerificationStates,
  ] = useEmailSignVerify();
  const [
    emailValid,
    emailError,
    emailLoading,
    validateEmail,
    resetVerification,
  ] = useProfileEmailVerify(user_email);

  useEffect(() => {

    if (emailValid) {
      dispatch(changeUserInfo(id, { email: newMail }, user.user_business_type));
      dispatch(
        showSuccessPopup(
          "Email verification mail sent. Please check your inbox for further details"
        )
      );
      setIsEditable(false);
      resetVerification();
      setNewMail("");
    }
    if (isEmailValid) {
      dispatch(
        showSuccessPopup(
          "Email verification mail sent. Please check your inbox for further details"
        )
      );
      setIsEditable(false);
      resetEmailVerificationStates();
    }
  }, [
    dispatch, resetVerification,
    resetEmailVerificationStates,
    emailLoading,
    isEmailLoading,
    emailValid,
    isEmailValid,
    newMail,
    emailMessage,
    id,
  ]);

  // MOBILE NUMBER VERIFICATION VIA OTP
  const [numberAlert, setNumberAlert] = useState(false);
  const [sameError, setSameError] = useState(false);
  const [mobile, setmobile] = useState(""); // Mobile input
  const [code, setCode] = useState("");

  const handlePhoneInput = (countryDetail, inputValue) => {
    setNumberAlert(false);
    if (inputValue > 9) {
      const { dialCode } = countryDetail;
      setCode(dialCode);
      let mobile = inputValue.replace(dialCode, "");
      setmobile(mobile);
    }
  };

  // REQUEST OTP
  const [isLoading, isError, errorMessage, isSuccess, sendOtp] = useSendOtp();
  const [isOnChangeLoading, isOnChangeError, , sendOnChangeOtp] =
    useOnChangeOtp();
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile) {
      if (user_contact !== mobile || !user_contact_verify) {
        user_contact && user_contact_verify && (isLoading || isOnChangeLoading)
          ? sendOnChangeOtp(user_contact, mobile, code)
          : sendOtp(code, mobile, "checknotexist");


      } else setSameError(true);
    } else {
      setNumberAlert(true);
    }
  };
  useEffect(() => {
    if (!isError && isSuccess) {
      dispatch(
        showSuccessPopup(
          "OTP sent successfully. OTP should be valid for 30 mins only"
        )
      );
    }
  }, [dispatch, isError, isSuccess])

  // OTP VERIFICATION
  const [otp, setOtp] = useState("");
  const [submitOtp, setSubmitOtp] = useState(false);

  const [otpLoading, otpSuccess, otpError, otpResponse, resetOtpVerify] =
    useVerifyOtp(mobile, otp, submitOtp, userId, code);

  const handleOtpVerify = (e) => {
    e.preventDefault();
    setSubmitOtp(true);
  };

  useEffect(() => {
    if (otpResponse.Status !== "Error" && otpSuccess) {
      dispatch(changeUserInfo(id, { contact: mobile, contact_verify: true }, user.user_business_type));
      dispatch(showSuccessPopup("Mobile number verified successfully"));
      setEditContact(false);
      setSubmitOtp(false);
      resetOtpVerify();
    }
  }, [dispatch, resetOtpVerify, otpSuccess, otpResponse, mobile, id, user.user_business_type]);

  const [
    isEnableSuccess,
  ] = useEnableWhatsApp();

  useEffect(() => {
    isEnableSuccess &&
      dispatch(showSuccessPopup("WhatsApp notifications has been enabled"));
  }, [isEnableSuccess, dispatch]);

  useEffect(() => {
    const data = {
      whatsapp_contact: mobile ? mobile : user_contact,
      country_code: code,
    };
    if (isEnableSuccess) {

      dispatch(changeUserInfo(id, data, user.user_business_type));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, mobile, isEnableSuccess, user_contact]);

  const onChangeEmailToggle = () => {
    setEditEmailToggle(true);
    setVerifyEmailOtpSuccess(false)
  }

  const sendOtpAlreadyEmailExist = () => {
    setSentOtpLoading(true)
    onChangeEmailToggle()
    // setEditEmailToggle(false);
    setNewMail(users.user_email);
    UserRequest.resendVerification({ action: "emailOtpVerification", userID: users._id, newMail: users.user_email },
      (success) => {

        setSentOtpLoading(false);
        setEmailOtpSend(true);
      }, (error) => {
        setEmailOtpSend(true);
        setSentOtpLoading(false);
      }
    )
  }

  const onSubmitOtpRequest = () => {

    if (users.user_email) {
      if (newMail.toLowerCase() === users.user_email.toLowerCase() && users.isVerified === true) {
        setSameEmailEntered(true);
        setEmailOtpSend(false);
      } else if (newMail && ValidationFile.isEmail(newMail)) {
        setSentOtpLoading(true)
        sendMail()
      } else {
        setEmailInvalid(true);
      }
    } else if (newMail && ValidationFile.isEmail(newMail)) {
      setSentOtpLoading(true)
      sendMail()
    } else {
      setEmailInvalid(true);
    }
  }


  const sendMail = () => {
    UserRequest.resendVerification(
      { action: "checkEmailExistUserId", email: newMail === "" && user_email ? user_email : newMail, userID: users._id },
      (success) => {
        if (success.data.message === "email is taken") {
          setEmailInvalid(true);
          setSentOtpLoading(false)
          setEmailAlreadyExist(true)
        } else {
          UserRequest.resendVerification({ action: "emailOtpVerification", userID: users._id, newMail: newMail ? newMail : users.user_email },

            (success) => {
              setSentOtpLoading(false);
              setEmailOtpSend(true);
            }, (error) => {
              setEmailInvalid(true);
            }
          )
        }
      },
      (error) => {
        setEmailInvalid(true);
      }
    );
  }

  const onChangeEmailOtp = (e) => {
    let Value = e.target.value
    let splitValue = Value.split("")
    if (splitValue.length < 7) {
      setemailOtpValue(Value)
      setEmailOtpSend(true)
      setVerifyEmailOtpError(false)
    }
  }


  const onChangeEmail = (e) => {
    let Value = e.target.value;
    setVerifyEmailOtpError(false);
    setNewMail(ValidationFile.spaceNotAccept(Value));
    setemailOtpValue("");
    setEditEmailToggle(true);
    setVerifyEmailOtpSuccess(false)
    setEmailOtpSend(false);
    setSameEmailEntered(false);
    setEmailInvalid(false);
    setEmailAlreadyExist(false)
  }


  const verifyOtpEmail = () => {

    if (emailOtpValue.length > 5) {
      setVerifyOtpLoading(true);
      UserRequest.resendVerification({ action: "emailOtpCheck", userID: users._id, newMail: newMail ? newMail : users.user_email, token: emailOtpValue },
        (success) => {
          if (success.data.message === "Verification Success") {
            setVerifyOtpLoading(false);
            setVerifyEmailOtpSuccess(true)
            setVerifyEmailOtpError(false);
            setEditEmailToggle(true);
            Auth.updateUserDetail("user_email", newMail ? newMail : users.user_email);
            Auth.updateUserDetail("user_isVerified", true);
            window.location.reload()
          } else {
            setVerifyEmailOtpSuccess(false)
            setVerifyEmailOtpError(true);
            setVerifyOtpLoading(false);

          }
        }, (error) => {
          setVerifyEmailOtpSuccess(false)
          setVerifyEmailOtpError(true);
          setVerifyOtpLoading(false);
        }
      )
    } else {
      setVerifyEmailOtpError(true)
    }
  }
  const handleMobileOtp = (e) => {
    if (e.target.value.length < 7) {
      setOtp(e.target.value)
      setVerifyEmailOtpError(false)
    }
  }
  return (

    <div className="PersonalInfoWrapper">
      <div className="PTH-Item">
        <div className="PersonalInfoHeroDescription">
          <p className="text-sm w-500 base">Personal Info</p>
          <p className="text-xxs w-500 mt-20 mb-20">
            Who are you? Define your best suitable role.
          </p>
          <div className="formFieldwrap RoleSelectCst">
            <SelectInput
              value={
                userRole
                  ? userRole
                  : ["InstituteOwner", "Teacher", "Student"].includes(
                    user_usertype
                  )
                    ? user_usertype
                    : "Other"
              }
              onChange={(e) => changeRole(e)}
              label=" Select Role"
            >
              {allRoles.map((alluserrole) => {
                return (
                  <option
                    key={alluserrole}
                    value={alluserrole}
                    className={
                      alluserrole === userRole ||
                        alluserrole === user_usertype
                        ? "active"
                        : ""
                    }
                  >
                    {alluserrole === "InstituteOwner"
                      ? "Institute Admin"
                      : alluserrole}
                  </option>
                );
              })}
            </SelectInput>
            {/* <label className="animLabel" htmlFor="gender">
                Select Role
              </label> */}
            {/* {!allRoles.includes(user_usertype) && ( */}
            {newRole && !chooseOtherRole && (
              <div className="addedOtherRoleCst">
                <p className="text-sm w-600">
                  {newRole ? newRole : userOtherRoleName}
                </p>
                <p
                  className="btnText primary underline"
                  onClick={() => setChooseOtherRole(true)}
                >
                  Edit
                </p>
              </div>
            )}

            {!newRole &&
              user_usertype === "Other" &&
              !chooseOtherRole &&
              !userOtherRoleName && (
                <p
                  className="btnText base underline"
                  onClick={() => setChooseOtherRole(true)}
                >
                  Add about your profession
                </p>
              )}
          </div>
          {chooseOtherRole && (
            <div className="MP-AddOtherRoleCst">
              <FormInput
                label="Tell us about your profession"
                placeholder="Enter your role."
                value={newRole}
                onChange={handleRole}
                onBlur={handleRoleOnBlur}
                autoFocus
              />
              <button
                className="button btn-o-primary primary"
                onMouseDown={() => submitRole()}
                disabled={newRole ? false : true}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="ProfileInfoContact">
        <div className="profile-edit-box school-admin-email">
          <div className="formFieldwrap emailProfileSetting">
            {
              editEmailToggle && !verifyEmailOtpSuccess ? (
                <React.Fragment>
                  <FormInput
                    className={emailAlreadyExist ? "errorInput" : ""}
                    type="email"
                    onChange={(e) => onChangeEmail(e)}
                    label="Email"
                    value={newMail}
                    placeholder="Enter Your Email"
                  />
                  {EmailOtpSend && (
                    <p className="text-xxs secondary mt-3">
                      Otp Sent.
                    </p>
                  )}
                  {/* <FormError
                    show={EmailOtpSend}
                    error="Otp Sent."
                  /> */}
                  <FormError
                    show={EmailInvalid && newMail !== ""}
                    error="Invalid email format."
                  />
                  <FormError
                    show={sameEmailEntered && EmailOtpSend === false}
                    error="Email is already verified."
                  />
                </React.Fragment>

              ) : (
                <React.Fragment>
                  <FormInput
                    type="email"
                    label="Email"
                    onChange={(e) => onChangeEmail(e)}
                    value={users.user_email}
                  />
                  <FormError
                    show={users.user_isVerified && users.user_email}
                    error="Your Email is verified."
                  />
                  <FormError
                    show={users.user_isVerified === false && users.user_email}
                    error="Your Email is not verified."
                  />
                </React.Fragment>
              )
            }
            {isUserVerified && editEmailToggle === false && (
              <p className="text-xxs secondary mt-3">
                Your email is verified.
              </p>
            )}
            {isUserVerified === false && newMail === "" && EmailOtpSend === false && !editEmailToggle &&
              < p className="text-xxs red mt-3">
                Please add your email and verify.
              </p>
            }
            <FormError
              show={EmailInvalid && newMail === ""}
              error="Email is required."
            />
            <FormError
              show={EmailInvalid && newMail}
              error="Invalid email format."
            />
            <FormError
              show={emailAlreadyExist}
              error="Email Already Exist."
            />
          </div>

          <div className="admin-inline-head">
            {editEmailToggle === false && (
              <>
                {users.user_isVerified === false && users.user_email && sentOtpLoading === false && (
                  <button
                    className="button btn-o-secondary btn-xs secondary"
                    onClick={() => sendOtpAlreadyEmailExist()}
                  >
                    Verify Email
                  </button>
                )}
                {users.user_isVerified && users.user_email && (
                  <button
                    className="button btn-o-secondary btn-xs secondary"
                    onClick={() => onChangeEmailToggle()}
                  >
                    Change Email
                  </button>
                )
                }
                {/* {users.user_isVerified === false && !users.user_email && (
                  <button
                    className="button btn-o-secondary btn-xs secondary"
                    onClick={() => onChangeEmailToggle()}
                  >
                    Add Email
                  </button>
                )
                } */}
              </>
            )}

            {editEmailToggle && EmailOtpSend === false && !sentOtpLoading && !verifyEmailOtpSuccess && (
              <button
                className="button btn-o-secondary btn-xs secondary"
                onClick={() => onSubmitOtpRequest()}
              >
                Send Otp
              </button>
            )}
            {
              sentOtpLoading && <button
                className="button btn-o-secondary btn-xs secondary"
              >
                Loading...
              </button>
            }
            {editEmailToggle && EmailOtpSend && !verifyEmailOtpSuccess && (
              <React.Fragment>
                <div className="formFieldwrap pb-10">
                  <FormInput
                    type="number"
                    value={emailOtpValue}
                    label="Otp"
                    onWheel={(e) => e.target.blur()}
                    onKeyDown={(e) =>
                      symbolsArrMail.includes(e.key) && e.preventDefault()
                    }
                    onChange={(e) => onChangeEmailOtp(e)}
                  />
                  <FormError
                    show={emailOtpValue === "" && verifyEmailOtpError}
                    error="Otp is required"
                  />
                  <FormError
                    show={verifyEmailOtpError && emailOtpValue !== ""}
                    error="Invalid otp."
                  />
                </div>
                {verifyOtpLoading &&
                  < button

                    className="button btn-o-secondary btn-xs secondary"
                  >
                    Loading...
                  </button>
                }
                {!verifyOtpLoading && !verifyEmailOtpSuccess &&
                  < button
                    onClick={() => verifyOtpEmail()}
                    className="button btn-o-secondary btn-xs secondary"
                  >
                    Verify Otp
                  </button>
                }
              </React.Fragment>

            )}
          </div>
        </div>

        <div className="ProfileInfoContactNumber">
          {editContact ? (
            <React.Fragment>
              <div className="cstmPhoneInput">
                <PhoneInput
                  onChange={(value, country) => {
                    handlePhoneInput(country, value);
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
                <label className="animLabel" htmlFor="mobile_number">
                  Mobile Number
                </label>
                <FormError
                  show={isError}
                  error={errorMessage === "This phone number is already taken. Please try with a new number." ? "Already taken. Please try with a new number." : ""}
                />
                <FormError
                  show={sameError && user_contact_verify}
                  error="Already verified"
                />
                <FormError
                  show={numberAlert}
                  error="Enter your mobile number to enable OTP login"
                />
              </div>
              {isLoading || isOnChangeLoading ? (
                <button
                  type="button"
                  className="button btn-o-primary primary btn-xs mt-10"
                >
                  OTP sending...
                </button>
              ) : (
                <button
                  className="button btn-o-primary primary btn-xs mt-10"
                  onClick={handleSendOtp}
                >
                  Request OTP
                </button>
              )}
              <div className="MP-VerifyContactOTP mt-20">
                <div className="formFieldwrap">
                  <FormInput
                    autoFocus={true}
                    type="number"
                    minLength={6}
                    onKeyUp={handleMobileOtp}
                    placeholder="One Time Password"
                    // label="One Time Password"
                    value={otp}
                    onChange={handleMobileOtp}
                  />
                  <FormError
                    show={otpResponse.Status === "Error" || otpError}
                    error="Invalid OTP. Please recheck and enter again."
                  />

                </div>
                {otpLoading ? (
                  <button className="button btn-o-primary btn-sm primary">
                    Verifying...
                  </button>
                ) : (
                  <button
                    onClick={handleOtpVerify}
                    className="button btn-o-primary btn-sm primary"
                  >
                    Verify
                  </button>
                )}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!user_contact ? (
                <React.Fragment>
                  <div className="formFieldwrap pb-5">
                    <FormInput
                      className="w-300 text-xs lgray disable"
                      label="Mobile Number"
                      placeholder="Enter your mobile number"
                    />
                    <p
                      className="btnText base underline"
                      onClick={() => setEditContact(true)}
                      style={{ position: "absolute", top: "3px", left: "22px" }}
                    >
                      Add Mobile Number
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {user_contact_verify ? (
                    <div className="sucess">
                      <div className="formFieldwrap pb-15">
                        <FormInput value={user_contact} label="Mobile Number" />
                        <p className="text-xxs secondary mt-3">
                          Your number is verified.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="unsucess">
                      <div className="formFieldwrap pb-15">
                        <FormInput value={user_contact} />
                        <p className="text-xxs red mt-3">
                          Your number is not verified.
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    className="button btn-o-secondary btn-xs secondary"
                    onClick={() => setEditContact(true)}
                  >
                    Change Mobile Number
                  </button>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>

      {/* ---------- WhatsAPP Notification ----------- */}
      {/* <div className="WhatsappNotificationEnable">
        <div className="EnableHead">
          <i className="ed-icon icon-whatsapp"></i>
          <span className="text-xs secondary">
            Turn on WhatsApp notifications.
          </span>
        </div>
        {user_whatsapp_contact && !editWhatsapp && (
          <div className="ConfirmWhatsappNumber">
            <div className="sucess disable">
              <div className="formFieldwrap">
                <FormInput value={user_whatsapp_contact} />
              </div>
            </div>
            <button
              className="button btn-xs btn-o-secondary secondary"
              onClick={() => setEditWhatsapp(true)}
            >
              Change WhatsApp Number
            </button>
          </div>
        )}
        {((!user_whatsapp_contact && !user_contact_verify) || editWhatsapp) && (
          <React.Fragment>
            <div className="EnableWhatsappNumerNotify mt-20">
              <div className="cstmPhoneInput">
                <PhoneInput
                  onChange={(value, country) => {
                    handleWhatsAppInput(country, value);
                  }}
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
              </div>
              {isEnableLoading ? (
                <button className="button btn-o-secondary secondary">
                  Loading...
                </button>
              ) : (
                <button
                  disabled={!validNumber}
                  onClick={handleWhatsAppEnable}
                  className="button btn-o-secondary secondary"
                >
                  Enable
                </button>
              )}
              <FormError show={isEnableError} error={"Something went wrong"} />
            </div>
          </React.Fragment>
        )}

        {user_contact_verify && !user_whatsapp_contact && (
          <div className="ConfirmWhatsappNumber input-custom-type inline">
            <label className="small">
              <input
                type="radio"
                name="WhatsappNumber"
                value="same"
                onChange={(e) => setRadioCheck(e.target.value)}
                checked={radioCheck === "same"}
              />
              Yes, My WhatsApp number is same.
            </label>
            <label className="small">
              <input
                type="radio"
                name="WhatsappNumber"
                value="another"
                onChange={(e) => setRadioCheck(e.target.value)}
                checked={radioCheck === "another"}
              />
              No, I use to another.
            </label>
          </div>
        )}
        {radioCheck === "another" && (
          <div className="EnableWhatsappNumerNotify mt-20">
            <div className="cstmPhoneInput">
              <PhoneInput
                onChange={(value, country) => {
                  handleWhatsAppInput(country, value);
                }}
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
            </div>
            {isEnableLoading ? (
              <button className="button btn-o-secondary secondary">
                Loading...
              </button>
            ) : (
              <button
                disabled={!validNumber}
                onClick={handleWhatsAppEnable}
                className="button btn-o-secondary secondary"
              >
                Enable
              </button>
            )}
            <FormError show={isEnableError} error={"Something went wrong"} />
          </div>
        )}
        {radioCheck === "same" && (
          <button
            className="button btn-xs btn-o-secondary secondary mt-20"
            onClick={handleWhatsAppEnable}
          >
            Enable Whatsapp Notification
          </button>
        )}
      </div> */}
      {/* {getUserInfoLoading ? (<div className="loadingGridData">
        <i className="ed-loadingGrid"></i>
      </div>) : (<> */}
      <div className="PersonalInfoOrientationCst">
        <div className="PersonalInfoGender">
          <div className="formFieldwrap">
            <SelectInput
              id="user_gender"
              name="user_gender"
              // value={
              //   user_gender === (null || undefined)
              //     ? "Not Selcted"
              //     : user_gender
              // }
              value={
                gender === (null || undefined)
                  ? "Not Selcted"
                  : gender
              }
              onChange={handleInput}
              label="Gender"
            // className={`${user_gender === value("0") ? "animLabel" : ""}`}
            >
              {/* <option select="true">Select</option> */}
              {/* {gender === (null || undefined) && (
                  <option value="null" id="gender">Select Gender</option>
                )} */}
              <option value="" id="gender">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </SelectInput>
            {/* <label className="animLabel" htmlFor="gender">
                Gender
              </label> */}
          </div>
        </div>
        <div className="PersonalInfoDOB">
          <div className="datePickerWrap">
            <InputDatePicker
              name="user_dob"
              id="user_dob"
              type="date"
              maxDate={moment().toDate()}
              onSelect={(selectedDob) => {
                setDob(selectedDob);
              }}
              label="Date of Birth"
              placeholder="Date of birth"
              value={dob}
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
        <div className="formFieldwrap">
          <SelectInput
            id="user_blood_group"
            name="user_blood_group"
            value={blood_group}
            onChange={handleInput}
            onKeyUp={handleInput}
            label="Blood Group"
          >
            <option value="null" id="user_blood_group">Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </SelectInput>
          {/* <label className="animLabel" htmlFor="gender">
              Blood Group
            </label> */}
        </div>

        <div className="Aadhar_Number">
          <div className="formFieldwrap">
            <FormInput
              name="user_aadhar_number"
              type="number"
              value={aadhar_number}
              onChange={handleInput}
              onKeyUp={handleInput}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
              }}
              label="Aadhar Number"
              placeholder="Enter Aadhar Number"
            />
            <FormError
              show={aadhar_number_error && infoError}
              error="Aadhar Number is invalid."
            />
          </div>
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_father_name"
            value={father_name}
            onChange={handleInput}
            type="text"
            maxLength={79}
            label="Father's name"
            placeholder="Enter Father's name"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
          <FormError
            show={father_name_error && infoError}
            error="Father Name is required."
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_father_occupation"
            maxLength={79}
            value={father_occupation}
            onChange={handleInput}
            label="Father's occupation"
            placeholder="Enter Father's Occupation"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_mother_name"
            onChange={handleInput}
            maxLength={79}
            value={mother_name}
            label="Mother's Name"
            placeholder="Mother's Name"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
          <FormError
            show={mother_name_error && infoError}
            error="Mother Name is required."
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_mother_occupation"
            onChange={handleInput}
            value={mother_occupation}
            label="Mother's Occupation"
            maxLength={79}
            placeholder="Enter Mother's Occupation"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_permanent_address"
            onChange={handleInput}
            maxLength={159}
            value={permanent_address}
            label="Parmanent Address"
            placeholder="Enter Parmanent Address"
          />
          <FormError
            show={permanent_address_error && infoError}
            error="Permanent Address is required."
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_temporary_address"
            onChange={handleInput}
            maxLength={159}
            value={temporary_address}
            label="Temporary Address"
            placeholder="Enter Temporary Address"
          />
        </div>

        <div className="formFieldwrap mb-10">
          <CountrySelect
            name="user_user_country"
            id="user_country"
            value={user_country}
            onChange={handleInput}
            onEvent={handleInput}
            autoevent={true}
            label="Select country"
          />
          <FormError
            show={user_country_error && infoError}
            error="Country is required."
          />
        </div>

        <div className="formFieldwrap">
          <StateSelect
            name="user_user_state"
            value={user_state}
            onChange={handleInput}
            onEvent={handleInput}
            autoevent={true}
            label=" Select state"
          />
          <FormError
            show={user_state_error && infoError}
            error="State is required."
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_user_city"
            onChange={handleInput}
            value={user_city}
            type="text"
            label="City"
            // id="user_city"
            maxLength={179}
            placeholder="Enter City"
          />
          <FormError
            show={user_city_error && infoError}
            error="City is required."
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            value={user_zipcode}
            onChange={handleInput}
            name="user_user_zipcode"
            type="text"
            id="Zip/Pin code"
            label="Zip/Pin code"
            placeholder="Zip/Pin code"
          />
          <FormError
            show={user_zipcode_error}
            error="Please provide pincode/zipcode."
          />
          <FormError
            show={user_zipcode &&
              countryZipCodeError
            }
            error="Invalid zipcode."
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_guardian_name"
            onChange={handleInput}
            value={guardian_name}
            label="Guardian Name"
            onKeyUp={handleInput}
            maxLength={79}
            placeholder="Enter Guardian Name"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_guardian_occupation"
            onChange={handleInput}
            value={guardian_occupation}
            onKeyUp={handleInput}
            maxLength={119}
            label="Guardian Occupation"
            placeholder="Enter Guardian Occupation"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
        </div>

        <div className="formFieldwrap mb-10">
          <FormInput
            name="user_releation_with_guardian"
            onChange={handleInput}
            maxLength={79}
            onKeyUp={handleInput}
            value={releation_with_guardian}
            label="Relationship with Guardian"
            placeholder="Enter Relationship with Guardian"
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="button btn-sm button-primary"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
