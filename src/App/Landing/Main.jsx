/* eslint-disable no-unused-vars */
// ALL THE DEPENDENCIES AND UTILITY REQUIRED FOR THIS COMPONENT
import React, { useState, useEffect } from "react";
import RegisterUser from "./RegisterUser";
import RegisterInstitute from "./RegisterInstitutes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommonArtTheme from "../../Common/Theme/CommonArtTheme";
// import HomeHeaderMain from "../Home/HomeHeaderMain";
import DomainSelection from "./DomainSelection";
import SessionStorage from "../../Classes/SessionStorage";
import {
  PaymentComplete,
  privateDomainOpt,
  registrationWorkDone,
} from "../../Constant/auth";
import {
  postUserDetailsOffilineRESET,
  getDomainAvailablityRESET,
} from "../../store/actions/privateDomain";

import "./DomainSelection.scss";
// FUNCTIONAL COMPONENT FOR REGISTER INSTITUTE
export default function Main() {
  const history = useNavigate();
  const dispatch = useDispatch();
  // LOCAL STATE VARIBALE
  const [submitCheckSubdomain, setSubmitCheckSubdomain] = useState(false);
  const [submitRegisterUser, setSubmitRegisterUser] = useState(false);
  const [submitRegisterInstitute, setRegisterInstitute] = useState(false);
  const [subDomainNameSubmit, setSubDomainNameSubmit] = useState(false);
  const [privateDomainGo, setPrivateDomainGo] = useState(false);
  const [privateDomainGoSubmit, setPrivateDomainGoSubmit] = useState(false);
  const [registerUserSubmit, setRegisterUserSubmit] = useState(false);
  const [registerInstituteSubmit, setRegisterInstituteSubmit] = useState(false);
  const [hideRegister, sethideRegister] = useState(false);
  const [isSubmitted, setIsSubmittted] = useState(false);
  // const [registerWorkDone, setRegisterWorkDone] = useState(false);

  // REDUX HOOK FOR GETTING LOGGED IN USER TOKEN
  const { token } = useSelector((state) => {
    return {
      token: state.user.token,
    };
  });

  // useEffect(() => {
  //   if (SessionStorage.alive(registrationWorkDone)) {
  //     setRegisterWorkDone(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // HIDES INSTITUTE USER INPUT
  useEffect(() => {
    if (!token) {
      sethideRegister(true);
    } else {
    }
  }, [token]);

  useEffect(() => {
    if (SessionStorage.alive(PaymentComplete)) {
      history("/payment-invoice");
    }
  }, [history]);

  useEffect(() => {
    if (SessionStorage.alive(registrationWorkDone)) {
      history("/myCart");
    }
  }, [history]);

  useEffect(() => {
    return () => {
      dispatch(getDomainAvailablityRESET());
      dispatch(postUserDetailsOffilineRESET());
      dispatch(postUserDetailsOffilineRESET());
    };
  }, [dispatch]);

  // SET TRUE AFTER VALID INSTITUTE DETAILS
  const regInsData = () => {
    setRegisterInstituteSubmit(true);
  };

  // // SET TRUE AFTER VALID INSTITUTE USER DETAILS
  const regUserData = () => {
    setRegisterUserSubmit(true);
  };

  // // SET TRUE AFTER VALID DOMAIN NAME
  const regDomainData = () => {
    setSubDomainNameSubmit(true);
  };
  // // SET TRUE AFTER VALID PRIVATE DOMAIN NAME
  const regPrivateDomainData = () => {
    setPrivateDomainGoSubmit(true);
  };

  // // CHECKING FOR OFFLINE OR ONLINE
  const createInstitute = () => {
    // OFFLINE
    setIsSubmittted(true);
    if (!token) {
      setSubmitCheckSubdomain(true);
      setSubmitRegisterUser(true);
      setRegisterInstitute(true);
      setPrivateDomainGo(true);
    }
    // ONLINE
    else {
      setSubmitCheckSubdomain(true);
      setRegisterInstitute(true);
      setPrivateDomainGo(true);
    }
  };

  // RESTRICT SUBMIT AND THROUGH ERROR FOR INVALID COMPONENT DATA
  const ChangeSubmitValidationCheck = () => {
    setIsSubmittted(false);
    setSubmitCheckSubdomain(false);
    setSubmitRegisterUser(false);
    setRegisterInstitute(false);
    setSubDomainNameSubmit(false);
    setRegisterUserSubmit(false);
    setRegisterInstituteSubmit(false);
    setPrivateDomainGoSubmit(false);
    setPrivateDomainGo(false);
  };

  useEffect(() => {
    // if (registerUserSubmit && subDomainNameSubmit && registerInstituteSubmit && privateDomainGoSubmit) {
    if (SessionStorage.alive(privateDomainOpt)) {
      if (SessionStorage.getBool(privateDomainOpt) === "true") {
        if (
          registerUserSubmit &&
          subDomainNameSubmit &&
          registerInstituteSubmit &&
          privateDomainGoSubmit
        ) {
          history("/myCart");
        }
      } else {
        if (token) {
          if (subDomainNameSubmit && registerInstituteSubmit) {
            history("/create-website");
          }
        } else {
          if (
            registerUserSubmit &&
            subDomainNameSubmit &&
            registerInstituteSubmit
          ) {
            history("/create-website");
          }
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    registerInstituteSubmit,
    registerUserSubmit,
    subDomainNameSubmit,
    privateDomainGoSubmit,
  ]);

  useEffect(() => {
    if (
      subDomainNameSubmit &&
      registerInstituteSubmit &&
      privateDomainGoSubmit &&
      token
    ) {
      if (SessionStorage.alive(privateDomainOpt)) {
        if (SessionStorage.getBool(privateDomainOpt) === "true") {
          history("/myCart");
        } else {
          history("/create-website");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerInstituteSubmit, subDomainNameSubmit, privateDomainGoSubmit]);

  useEffect(() => {
    if (SessionStorage.alive(registrationWorkDone)) {
      history("/myCart");
    }
  }, [history]);
  return (
    <>
      <React.Fragment>
        <React.Fragment>
          <DomainSelection
            isSubmitted={isSubmitted}
            regPrivateDomainData={() => regPrivateDomainData()}
            submitCheckSubdomain={submitCheckSubdomain}
            ChangeSubmitValidationCheck={() => ChangeSubmitValidationCheck()}
            regDomainData={() => regDomainData()}
            privateDomainGo={privateDomainGo}
          />

          {hideRegister ? (
            <RegisterUser
              submitRegisterUser={submitRegisterUser}
              ChangeSubmitValidationCheck={() =>
                ChangeSubmitValidationCheck()
              }
              regUserData={() => regUserData()}
            />
          ) : (
            <p></p>
          )}
          <RegisterInstitute
            submitRegisterInstitute={submitRegisterInstitute}
            ChangeSubmitValidationCheck={() => ChangeSubmitValidationCheck()}
            regInsData={() => regInsData()}
          />
          <div className="edContainer">
            {isSubmitted ? (
              <button className="button btn-md button-theme mt-30 mb-50">Loading...</button>
            ) : (
              <button
                className="button btn-md button-theme mt-30 mb-50"
                onClick={() => createInstitute()}
              >
                Continue
              </button>
            )}
          </div>
        </React.Fragment>
      </React.Fragment>
    </>
  );
}
