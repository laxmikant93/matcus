/* eslint-disable no-unused-vars */
// ALL THE DEPENDENCIES AND UTILITY REQUIRED FOR THIS COMPONENT
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import Storage from "../../Classes/Storage";
import SessionStorage from "../../Classes/SessionStorage";
import CommonArtTheme from "../../Common/Theme/CommonArtTheme";
import UserRequest from "../../store/actions/user/UserRequest";
import ValidationFile from "../Auth/ValidationFile";
import { setCommonError } from "../../store/actions/commonerror";
import { showSuccessPopup } from "../../store/actions/successmessagepopup";
import { useDispatch } from "react-redux";
import { Userid } from "../../Common/UserElement";
import "./WebsitePendingEmailVerification.scss";

// FUNCTIONAL COMPONENT FOR INSTITUTE REGISTRATION VERIFICATION
const WebsitePendingEmailVerification = () => {
  // USING DISPACH HOOK FOR DATA MANIPULATION IN REDUX
  const dispatch = useDispatch();
  const history = useNavigate();

  // GET USER ID FOR LOGIN VARIFICATION
  const id = Userid();

  useEffect(() => {
    if (id) {
      history("/");
    }
  }, [id, history]);

  // LOCAL STATE VARIBALE
  const [checkDomain, setcheckDomain] = useState({
    institute_subdomain: {
      value: "",
      isValid: false,
      changeinput: false,
    },
  });
  const [createAccount, setcreateAccountData] = useState({
    fullName: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  // EMAIL RESEND METHOD FOR SENDING VARIFICATION LINK TO MAIL
  const resendMail = () => {
    UserRequest.resendVerification(
      { action: "resendverification", email: createAccount.email.value },
      (success) => {
        dispatch(
          showSuccessPopup("confirmation link has been send successfully !")
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };

  // RETRIEVE DOMAIN NAME FROM STORAGE
  useEffect(() => {
    // if (Storage.alive("DomainName")) {
    //   const domainName = Storage.getJson("DomainName");
    if (SessionStorage.alive("DomainName")) {
      const domainName = SessionStorage.getJson("DomainName");
      const checkDomainData = {
        ...checkDomain,
        institute_subdomain: {
          value: domainName,
          isValid: ValidationFile.validEmpty(domainName),
        },
      };
      setcheckDomain(checkDomainData);
    } else {
    }
  }, [checkDomain]);

  // RETRIEVE INSTITUTE USER DATA FROM STORAGE
  useEffect(() => {
    // if (Storage.alive("UserRegistration")) {
    //   const userValue = Storage.getJson("UserRegistration");
    if (SessionStorage.alive("UserRegistration")) {
      const userValue = SessionStorage.getJson("UserRegistration");

      const fullName = userValue.fullname;
      const email = userValue.email;
      const password = userValue.password;

      const createAccountData = {
        ...createAccount,
        fullName: {
          value: fullName,
          isValid: ValidationFile.validEmpty(fullName),
        },
        email: {
          value: email,
          isValid: ValidationFile.validEmail(email),
        },
        password: {
          value: password,
          isValid: ValidationFile.validEmpty(password),
        },
      };
      setcreateAccountData(createAccountData);
    } else {
    }
  }, [createAccount]);

  // REMOVE LOCAL STORAGE DATA
  useEffect(() => {
    // Storage.remove("DomainName");
    // Storage.remove("InstituteWebsite");
    // Storage.remove("RegisterInstitiute");
    // Storage.remove("UserRegistration");
    SessionStorage.remove("DomainName");
    SessionStorage.remove("InstituteWebsite");
    SessionStorage.remove("RegisterInstitiute");
    SessionStorage.remove("UserRegistration");
  }, []);

  return (
    <React.Fragment>
      <div className="PendingEmailVerifyWrapper">
        <div className="PendingEmailVerify">
          <div className="PendingEmailVerifyItem">
            <p className="text-2xl primary">Just one step away</p>
            {/* <p className="">
                <span className="secondary">
                  {checkDomain.institute_subdomain.value}.edneed.com
                </span>
                &nbsp;is ready to go live.
              </p> */}
          </div>
          <div className="PendingEmailVerifyItem mt-50">
            <p className="text-xs">
              Your Institute has been successfully created. Please log in to your account using OTP.

            </p>
            {/* <p className="text-xs red">
                Your account verification is pending.
              </p>
              <p className="text-xs">
                Please check your email{" "}
                <strong>{createAccount.email.value}.</strong>
              </p>
            </div>
            <div className="PendingEmailVerifyItem mt-50">
              <p className="text-xs">
                If you have not received any verification email from Edneed.
              </p>
              <p className="text-xs underline primary" onClick={resendMail}>
                Resend Verification Email Again
              </p> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WebsitePendingEmailVerification;
