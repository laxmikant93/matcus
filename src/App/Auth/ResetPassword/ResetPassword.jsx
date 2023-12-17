import React, { useEffect, useState } from "react";
import Prepare from "./Prepare";
import Modal from "../../../Common/Modal";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../ValidationFile";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";

import {
  changePasswordData,
  passwordChangedTrue,
} from "../../../store/actions/changePassword";
import FormError from "../../../Common/Form/FormError";
import Storage from "../../../Classes/Storage";
import { useNavigate } from "react-router-dom";
import { changepasswordPopup } from "../../../Constant/auth";

const ResetPassword = () => {
  const history = useNavigate();
  const success = false;
  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);

  const [RegExPassword, setRegExPassword] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { users, passwordChangeTrue, passwordChange } = useSelector((state) => {
    return {
      users: state.user,
      passwordChangeTrue: state.changePassword.passwordchanged.success,
      passwordChange: state.changePassword.success,
    };
  });
  const [loginCred, setLoginCred] = useState({
    loginEmail: {
      value: "",
      isValid: false,
    },
    loginPassword: {
      value: "",
      isValid: false,
    },
  });
  useEffect(() => {
    SetScheduleClassModal(true);
    if (Storage.alive("EmailLogin") && Storage.alive("PasswordLogin")) {
      var loginemail = Storage.getJson("EmailLogin");
      var loginpassword = Storage.getJson("PasswordLogin");

      let loginCredData = {
        ...loginCred,
        loginEmail: {
          value: loginemail,
          isValid: ValidationFile.validEmpty(loginemail),
        },
        loginPassword: {
          value: loginpassword,
          isValid: ValidationFile.validEmpty(loginpassword),
        },
      };

      setLoginCred(loginCredData);
    } else {
      history("/");
    }
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }, [history, loginCred]);



  const [changePassword, setChangePassword] = useState({
    password: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let changePasswordData = {
      ...changePassword,
      [inputName]: {
        value: inputValue,
        isValid: ValidationFile.validEmpty(inputValue),
      },
      validation: isFormValid(),
    };

    setChangePassword(changePasswordData);
    setRegExPassword(false);
    setShowLoginError(false);
  };
  const isFormValid = () => {
    return changePassword.password.isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);
    if (changePassword.password.value.length > "3") {
      setRegExPassword(false);
      if (changePassword.validation) {
        setLoading(true);
        dispatch(changePasswordData(getFormData()));
      }
    } else {
      setRegExPassword(true);
    }
  };
  const [passwordChangeTrueCheck, setPasswordChangeTrue] = useState(false);

  const [passwordChangeUser, setPasswordChangeUser] = useState(false);

  if (passwordChangeTrue && !passwordChangeUser) {
    setPasswordChangeUser(true);
    Storage.remove(changepasswordPopup);
    Storage.remove("EmailLogin");
    Storage.remove("PasswordLogin");

    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }
  const getFormData = () => {
    return {
      action: "changepassword",
      email: loginCred.loginEmail.value,
      oldpassword: loginCred.loginPassword.value,
      newpassword: changePassword.password.value,
      edneedapi_key: "useredneed_987",
    };
  };

  const getChangedPassword = () => {
    return {
      password_change: true,
    };
  };

  if (passwordChange && !passwordChangeTrueCheck) {
    setPasswordChangeTrue(true);
    dispatch(passwordChangedTrue(users._id, getChangedPassword()));
  }

  let Route = "/";
  return (
    <React.Fragment>
      {success ? (
        <Prepare Routes={Route} />
      ) : (
        <Modal show={ScheduleClassModal}>
          <ModalHeader title="" />
          {/* closeButton={true} onclose={() => SetScheduleClassModal(!ScheduleClassModal)} */}
          <ModalBody>
            <div className="EmailForgotPasswordWrap">
              <div className="EmailForgotPasswordCst">
                <p className="text-xs secondary w-300">
                  Almost Done, {users.user_fullname}
                </p>
                <p className="text-xs mt-10">
                  Set password to join your institute.
                </p>
                <p className="text-xs mt-20">Registered email</p>
                <p className="text-xs">{users.user_email}</p>
                <div className="formFieldwrap mt-10">
                  <FormInputWithIcon
                    className={
                      !changePassword.password.isValid && showLoginError
                        ? "errorInput"
                        : ""
                    }
                    name="password"
                    type="password"
                    label="Password"
                    minLength="4"
                    placeholder="Password"
                    minlength="4"
                    onKeyUp={handleInput}
                    onChange={handleInput}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                  />
                  <FormError
                    show={
                      !changePassword.password.isValid && showLoginError
                    }
                    error="Password required."
                  />
                  <FormError
                    show={RegExPassword && changePassword.password.isValid}
                    error="Min. 4 characters should be there."
                  />
                </div>
                {showLoading ? (
                  <button className="button btn-md button-theme button-block">
                    Loading...<div className='loader loader25'></div>
                  </button>
                ) : (
                  <button
                    className="button btn-md button-theme button-block"
                    onClick={handleSubmit}
                  >
                    Set password
                  </button>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      )}
    </React.Fragment>
  );
};
export default ResetPassword;
