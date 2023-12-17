import React, { useState } from "react";
// import FormInput from "../../../Common/Form/FormInput";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";
// import SwitchButton from "../../../Common/Button/SwitchButton";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../Auth/ValidationFile";
import { changePasswordData } from "../../../store/actions/changePassword/index";
import GoogleLoginIcon from "../../../assets/Icons/icon-google.svg";
// import { Username } from "../../../Common/UserElement/index";
import SuccessMessagePopup from "../../../Common/SuccessMessagePopup";
import FormError from "../../../Common/Form/FormError";

const Settings = () => {

  // getting user info from redux
  const { user, googleId } = useSelector((state) => {
    return {
      user: state.user,
      googleId: state.user.user_googleID,
    };
  });

  // dispatching
  const dispatch = useDispatch();

  // form validation
  const [showLoginError, setShowLoginError] = useState(false);
  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "oldPassword":
        return ValidationFile.validEmpty(inputValue);
      case "newPassword":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const isFormValid = () => {
    return changePassword.oldPassword.isValid &&
      changePassword.newPassword.isValid
      ? true
      : false;
  };

  // initial state
  const emptyPasswordInfo = {
    oldPassword: {
      value: "",
      isValid: false,
    },
    newPassword: {
      value: "",
      isValid: false,
    },
    validation: false,
  };
  const [changePassword, setChangePassword] = useState(emptyPasswordInfo);
  const [isEmpty, setIsEmpty] = useState(false);

  // handling user input field.
  function handleInput(e) {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let resetAccountData = {
      ...changePassword,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };

    // updating state
    setChangePassword(resetAccountData);
    setIsEmpty(false);
    setShowLoginError(false);
  }

  function submitChangePassword(e) {
    e.preventDefault();
    setShowLoginError(true);
    if (ValidationFile.ValidPassword(changePassword.newPassword.value)) {
      setIsEmpty(false);
      if (changePassword.validation) {
        dispatch(changePasswordData(getFormData()));
        setTimeout(() => {
          if (isPasswordChanged === false) {
            setChangePassword(emptyPasswordInfo);
            setShowLoginError(false);
          }
        }, 200);
      } else {
      }
    } else {
      setIsEmpty(true);
    }
  }

  const getFormData = () => {
    return {
      action: "changepassword",
      edneedapi_key: "useredneed_987",
      email: user.user_email,
      oldpassword: changePassword.oldPassword.value,
      newpassword: changePassword.newPassword.value,
    };
  };

  const isPasswordDiff =
    changePassword.oldPassword.value === changePassword.newPassword.value;
  const isPasswordChanged = useSelector((state) => state.changePassword.error);

  return (
    <div className="ProfileSettingWrapper">
      <p className="text-sm w-500 base">Settings</p>
      {/* <div className="SettingProfileURL">
        <p className="text-xs w-600">Profile URL</p>
        <div className="SettingInputProfileUrl mt-20">
          <div className="formFieldwrap">
            <FormInput
              palceholder="Personalize Profile URL"
              label="Personalize Profile URL"
            />
          </div>
          <button className="button btn-o-primary primary">Save</button>
          <button className="button btn-o-silver base">Cancel</button>
        </div>
      </div> */}
      <div className="SettingChangePassword">
        {/* <p className="text-xs w-600">Change Now</p> */}
        {/* <p className="text-xxs">Last changed: Mar. 20, 2021</p> */}
        {googleId === undefined && (
          <div className="SettingInputChangePassword mt-20">
            <div className="formFieldwrap">
              <FormInputWithIcon
                // name="oldPassword"
                // type="password"
                // label="Old password"
                // placeholder="Old password"
                onChange={handleInput}
                onKeyUp={handleInput}
                value={changePassword.oldPassword.value}
                className={
                  !changePassword.oldPassword.isValid && showLoginError
                    ? "errorInput"
                    : ""
                }
                name="oldPassword"
                type="password"
                label="Old password"
                placeholder="Current password"
              />
              <FormError
                show={
                  changePassword.oldPassword.value &&
                  showLoginError &&
                  isPasswordChanged
                }
                error={isPasswordChanged ? " Old Password is Wrong." : ""}
              />
              <FormError
                show={!changePassword.oldPassword.value && showLoginError}
                error="Old password is required"
              />
            </div>
            <div className="formFieldwrap">
              <FormInputWithIcon
                className={isEmpty ? "errorInput" : ""}
                onChange={handleInput}
                onKeyUp={handleInput}
                value={changePassword.newPassword.value}
                name="newPassword"
                type="password"
                label="New password"
                placeholder="New password"
              />
              <FormError
                show={
                  isEmpty &&
                  changePassword.newPassword.value &&
                  isPasswordDiff !== true
                }
                error={
                  isPasswordDiff
                    ? "New Password Should be different ."
                    : "Min. 4 characters should be there."
                }
              />
              <FormError
                show={!changePassword.newPassword.value && showLoginError}
                error="New password is required"
              />
            </div>
            <button
              onClick={submitChangePassword}
              className="button btn-o-primary btn-sm"
            >
              Change Now
            </button>
            <SuccessMessagePopup />
          </div>
        )}

        {googleId !== undefined && (
          <div className="SocialSetting">
            <h4>Signed in with Google</h4>
            <h5 className="text-xxs w-400"> </h5>
            <img
              className="svgColorIcon mt-10"
              src={GoogleLoginIcon}
              alt="signInWithGoogle"
            />
          </div>
        )}
      </div>
      {/* <div className="AccountSettingVisibility">
        <p className="text-xs w-600">Visibility</p>
        <ul className="AccountSettingSwitchWrap mt-20">
          <li className="AccountSettingSwitchItem">
            <p className="text-xxs">Email</p>
            <SwitchButton />
          </li>
          <li className="AccountSettingSwitchItem">
            <p className="text-xxs w-500">Mobile</p>
            <SwitchButton />
          </li>
          <li className="AccountSettingSwitchItem">
            <p className="text-xxs w-500">Address</p>
            <SwitchButton />
          </li>
        </ul>
      </div> */}
      {/*  */}
      {/* <div className="AccountSettingPrefences">
        <p className="text-xs w-600">Preferences</p>
        <ul className="AccountSettingSwitchWrap mt-20">
          <li className="AccountSettingSwitchItem">
            <p className="text-xxs">Show Profile Photo</p>
            <SwitchButton />
          </li>
          <li className="AccountSettingSwitchItem">
            <p className="text-xxs w-500">Visible in Profile Search</p>
            <SwitchButton />
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Settings;
