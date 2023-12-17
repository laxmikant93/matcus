import React, { useEffect, useState } from "react";
import Login from "./index";
import BrandLogo from "../../../Common/BrandLogo";
// import { IconSuccessCheck } from "../../../Common/Icon";
import ForgotPassword from "../../../store/actions/forgotpassword/ForgotPassword";
import { useParams } from "react-router-dom";
import Storage from "../../../Classes/Storage";
import { redirectToUrl } from "../../../Constant/auth";

const VerifySignup = () => {
  const [success, setSuccess] = useState(false);
  const [SubmitResponseMessage, setSubmitResponseMessage] = useState("");

  const { verificationcode } = useParams();
  useEffect(() => {
    ForgotPassword.signupVerification(
      verificationcode,
      (success) => {
        SubmitResponse(success.data.message);
      },
      (error) => {
        SubmitResponse(error.data.message);
      }
    );
    Storage.set(redirectToUrl, "/");
  }, [verificationcode]);

  const SubmitResponse = (message) => {
    if (message === "created") {
      setSuccess(true);
    } else {
      setSuccess(false);
      setSubmitResponseMessage(message);
    }
  };

  return (
    <div>
      {success ? (
        <div className="row center-md middleContentPlacement">
          <div className="col-xs-12 col-md-4 col-lg-3 text-left">
            <div className="row">
              <div className="col-xs-12 center-xs">
                {/* <BrandLogo /> */}
                <div className="succesCheckIconCst">
                  <div className="mt-30">
                    <i className="ed-icon icon-check-circle secondary i-85"></i>

                    <h2 className="text-sm w-300 secondary mt-3">
                      You are all set!
                    </h2>
                    <p className="text-xxs w-400 gray">
                      You account has been successfully created.
                    </p>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
            <Login hideGoogleLogin hideForgetPassword hideSignup />
          </div>
        </div>
      ) : (
        <div className="row center-md middleContentPlacement">
          <div className="col-xs-12 col-md-4 col-lg-3 text-left">
            <div className="row">
              <div className="col-xs-12 center-xs">
                <BrandLogo />
                <div className="succesCheckIconCst">
                  <div className="mt-30">
                    <div>
                      <h2 className="text-sm w-300 secondary mt-3 red">
                        {SubmitResponseMessage}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default VerifySignup;
