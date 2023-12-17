/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import FormError from "../../../Common/Form/FormError";
import ValidationFile from "../ValidationFile";
import FormInput from "../../../Common/Form/FormInput";
import UserRequest from "../../../store/actions/user/UserRequest";
import Auth from "../../../Classes/Auth";
import AppLink from "../../../Common/AppLink/AppLink";
// import { changeUserInfo } from "../../../../store/actions/user";
const EmailAddPopUp = ({ showPopUp, closePopUp }) => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => {
    return {
      users: state.user,
    };
  });
  const [loginCred, setLoginCred] = useState({
    Email: {
      value: "",
      isValid: false,
    },
  });
  const [showLoginError, setShowLoginError] = useState(false);
  const [EmailExitAlready, setEmailExitAlready] = useState(false);
  const [showLoading, setShowLoading] = useState(false);


  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let changeData = {
      ...loginCred,
      [inputName]: {
        value: inputValue,
        isValid: ValidationFile.validEmpty(inputValue) && ValidationFile.validEmail(inputValue),
      },
    };
    setLoginCred(changeData)
    setShowLoginError(false)
    setEmailExitAlready(false)
  }

  const handleSubmit = () => {
    if (loginCred.Email.isValid) {
      setShowLoading(true);
      UserRequest.EmailVerification(loginCred.Email.value, (success) => {
        if (success.data.message === "email is available") {
          UserRequest.patchUserDetail(users._id, { "email": loginCred.Email.value, "action": "changeEmail", userId: users._id }, (success) => {
            SetCloseModal();
            Auth.updateUserDetail("user_email", loginCred.Email.value);
            setTimeout(() => {
              window.location.reload(false);
            }, 1000);
          }, (error) => {
            setShowLoading(false);
          })
        } else {
          setShowLoading(false);
          setEmailExitAlready(true)
        }
      }, (error) => {
        setShowLoading(false);
      })
    } else {
      setShowLoginError(true)
    }

  }
  const SetCloseModal = () => {
    closePopUp()
  }
  return (
    <React.Fragment>
      <Modal show={showPopUp}>
        <ModalHeader title="" onclose={() => SetCloseModal()} closeButton={showPopUp} />

        <ModalBody>
          <div className="EmailForgotPasswordWrap">
            <div className="EmailForgotPasswordCst">
              <p className="text-xs secondary w-300">
                Almost Done, {users.user_fullname}
              </p>
              <p className="text-xs mt-10">
                You need to add your email for GoogleMeet and Zoom Class
              </p>
              {/* <div className="formFieldwrap mt-10">
                  <FormInput
                    className={
                      !loginCred.Email.isValid && showLoginError
                        ? "errorInput"
                        : ""
                    }
                    name="Email"
                    type="email"
                    label="email"
                    placeholder="Email"
                    onKeyUp={handleInput}
                    onChange={handleInput}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                  />
                  <FormError
                    show={
                      !loginCred.Email.isValid && showLoginError
                    }
                    error="Email required."
                  />
                  <FormError
                    show={loginCred.Email.isValid && EmailExitAlready}
                    error="Email Already in use please try another one"
                  />
                </div>
                {showLoading ? (
                  <button className="button btn-md button-theme button-block">
                    Loading...
                  </button>
                ) : ( */}
              <AppLink
                className="button btn-md button-theme button-block"
                to="/account-setting"
              >
                Email Update
              </AppLink>
            </div>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </React.Fragment>
  )
}
export default EmailAddPopUp