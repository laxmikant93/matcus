import React, { useState } from "react";
import AuthContainer from "../../../App/Auth/AuthContainer";
import { useDispatch } from "react-redux";
import { setCommonError } from "../../../store/actions/commonerror";
import UserRequest from "../../../store/actions/user/UserRequest";
import { showSuccessPopup } from "../../../store/actions/successmessagepopup";
import RecreateAccount from "./RecreateAccount";
import Storage from "../../../Classes/Storage";
import { emailSignupData } from "../../../Constant/auth";
import { useEffect } from "react";

const ThankYouSignup = () => {

  const dispatch = useDispatch();
  const [email, setemail] = useState("")

  // Resend email states
  const [resendEmailLoading, setResendEmailLoading] = useState(false);


  // Re-create account process
  const [AnotherEmailActivate, SetAnotherEmailActivate] = useState(false);


  const resendEmail = () => {

    setResendEmailLoading(true)
    UserRequest.resendVerification(
      { action: 'resendverification', email: email },
      success => {
        setResendEmailLoading(false)
        dispatch(showSuccessPopup('confirmation link has been sent successfully !'));
      },
      error => {
        setResendEmailLoading(false)
        dispatch(setCommonError(error.message))
      }
    )
  };

  useEffect(() => {
    let userData = Storage.getJson(emailSignupData);
    setemail(userData.email);
  }, [])



  return (
    <AuthContainer>
      <>
        <div className="middleContentPlacement">
          <div className="innerCntFluid">
            <div className="row center-xs">
              <div className="col-xs-12 col-md-6 col-lg-4 text-center">
                <div className="row">
                  <div className="col-xs-12">
                    {/* <BrandLogo /> */}
                    <div className="mt-20">
                      <h1 className="text-sm w-500">Account confirmation email sent</h1>
                      <p className="text-xxs mt-20">
                        Please check your email <span className="primary">{email}</span>.
                      </p>

                      <p className="text-xxs">
                        A confirmation link has been sent which is
                        required to complete the sign-up process.
                      </p>
                      <p className="text-xxs mt-40">
                        No email in your email, promotions or spam
                        folder?
                      </p>
                      {
                        resendEmailLoading ?
                          <button type="button" className="btnText underlineLink text-xxs mb-20">Sending...</button>
                          :
                          <button onClick={resendEmail} type="button" className="btnText underlineLink text-xxs mb-20">Resend Email</button>
                      }

                      <p className="text-xxs mt-40">
                        If you have entered a wrong email
                      </p>

                      <button
                        className={`btnText BtnCaret text-xxs w-300 ${AnotherEmailActivate ? `active` : ``
                          }`}
                        onClick={() =>
                          SetAnotherEmailActivate(
                            !AnotherEmailActivate
                          )
                        }
                      >
                        Use Another Email
                      </button>
                      {AnotherEmailActivate && <RecreateAccount onSuccess={({ status, email }) => {
                        status && SetAnotherEmailActivate(!AnotherEmailActivate) // Hide email input
                        setemail(email) // Set updated email
                      }} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </AuthContainer>
  );
};
export default ThankYouSignup