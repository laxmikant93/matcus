import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../../../Classes/Auth';
import Request from '../../../../Classes/Request';
import ValidationFile from '../../../../Classes/ValidationFile';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import FormError from '../../../../Common/Form/FormError';
import FormInput from '../../../../Common/Form/FormInput';
// import { getSavedCustomer } from '../../../../store/actions/ecommerce/action/auth';
import { showSuccessPopup } from '../../../../store/actions/successmessagepopup';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import './myprofile.scss';

const MyProfile = () => {
  // const { customerDetail } = useSelector((state) => state.ecomAuth);
  const user = useSelector((state) => state.user);
  const subdomainuser = useSelector((state) => state.subdomainuser);
  const { subdomain } = useSelector((state) => {
    return {
      subdomain: state.businessInfo.ecomWebsite.data.business_subdomain
    }
  })

  const dispatch = useDispatch();
  const history = useNavigate();
  const ProfileRequest = new Request();

  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [verify_email, setverify_email] = useState(false);
  const [contact, setcontact] = useState("");
  const [activeradio, setActiveRadio] = useState("Male");
  const [pageloading, setpageLoading] = useState(false);
  const [basicDetailsVerified, setBasicDetailsVerified] = useState(false);

  //error fields
  const [fullname_error, setfullname_error] = useState("");
  const [email_error, setemail_error] = useState("");

  //OTP verification 
  const [OTP, setOTP] = useState("");
  const [otpVerifySend, setotpVerifySend] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [validOTP, setValidOTP] = useState("");
  const [OTPError, setOTPError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const SignUpRequest = new Request();
  const [loading, setLoading] = useState(false);
  const [verifyOtpLoading, setverifyOtpLoading] = useState(false);

  // console.log(user);
  // console.log(subdomainuser);
  // useEffect(() => {
  //   dispatch(getSavedCustomer());
  // }, [dispatch]);

  useEffect(() => {
    // if (customerDetail.success === true) {

    //   if (!customerDetail.data && !customerDetail.data.data && !customerDetail.data.data._id) {
    //     history('/customer-login');
    //   }
    // }
    if (AppLinkUrl.privateDomain()) {
      if (!user || !user._id) {
        history('/customer-login');
      }
    } else {
      if (!subdomainuser || !subdomainuser._id) {
        history('/customer-login');
      }
    }
  }, [subdomainuser, user, history]);

  useEffect(() => {
    // if (customerDetail.success && customerDetail.data) {
    //   setfullname(customerDetail.data.data.fullname);
    //   setemail(customerDetail.data.data.email);
    //   setcontact(customerDetail.data.data.contact);
    //   setActiveRadio(customerDetail.data.data.gender ? customerDetail.data.data.gender : "Male");
    // }
    if (AppLinkUrl.privateDomain()) {
      if (user && user.user_fullname) {
        setfullname(user.user_fullname);
        setemail(user.user_email);
        setcontact(user.user_contact);
        setActiveRadio(user.user_gender ? user.user_gender : "Male");
      }
    } else {
      if (subdomainuser && subdomainuser.user_fullname) {
        setfullname(subdomainuser.user_fullname);
        setemail(subdomainuser.user_email);
        setcontact(subdomainuser.user_contact);
        setActiveRadio(subdomainuser.user_gender ? subdomainuser.user_gender : "Male");
      }
    }
  }, [subdomainuser, user])

  useEffect(() => {
    // if (customerDetail.success && customerDetail.data) {
    if ((user.email && user.user_email_verify) || (subdomainuser.email && subdomainuser.user_email_verify)) {
      setBasicDetailsVerified(true);
    }
    // }
  }, [subdomainuser, user, email, verify_email])


  useEffect(() => {
    if (success && sendingOtp) {
      setSendingOtp(false);
      setotpVerifySend(true);
    }
  }, [sendingOtp, success])

  const RadioHandle = (radio) => {
    setActiveRadio(radio);
  }

  const handleInput = (e, state) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    switch (state) {
      case "name":
        setfullname(value);
        setfullname_error(ValidationFile.isEmpty(value));
        break;
      case "email":
        setemail(value);
        setverify_email(true);
        setemail_error(!ValidationFile.isEmail(value));
        setotpVerifySend(false);
        break;
      case "OTP":
        setOTP(value);
        // setfullname_error(ValidationFile.isEmpty(value));
        break;
      default:
        setcontact(value);
    }
  }

  const FormValidations = () => {
    let isValid = true;
    if (ValidationFile.isEmpty(fullname)) {
      setfullname_error(true);
      isValid = false;
    }
    if (!ValidationFile.isEmail(email)) {
      setemail_error(true);
      isValid = false;
    }
    return isValid;
  }


  const handleUpdate = async () => {
    let FormValid = FormValidations();
    if (FormValid) {
      setpageLoading(true);
      await ProfileRequest.post(ProfileRequest.url(`e-authorization/customerdetailupdate/${subdomainuser && subdomainuser._id ? subdomainuser._id : user._id}?subdomain=${subdomain}`, 'ecommerce'),
        { fullname: fullname, email: email, gender: activeradio, contact: contact },
        (success) => {
          setpageLoading(false);
          dispatch(showSuccessPopup("Profile Updated Successfully."));
          Auth.updateSubdomainuserDetail("user_email", email);
          history("/");
        },
        (error) => {

        }
      );
    }
  }

  const sendEmailVerificationMail = async (data) => {
    setLoading(true)
    await SignUpRequest.post(SignUpRequest.url(`e-authorization/Privatelogin?type=EmailOtp&subdomain=${subdomain}`),
      { "email": data.email, "action": "checknotexist" },
      (success) => {
        if (success.data.Details === "Email is taken!.") {
          setErrorMessage(success.data.Details);
          setError(true)
          setLoading(false)
        }
        else {

          setLoading(false)
          setSuccessMessage(success.data.Details); // Set response data
          setSuccess(true);
          setSendingOtp(true);
        }
      },
      (error) => {
        setLoading(false)
        setErrorMessage("Invalid OTP. Please try again");
        setError(true)
      }
    );
  }

  const sendOTP = async (e) => {
    if (!ValidationFile.isEmail(email)) {
      setemail_error(true);
    }
    if (ValidationFile.isEmail(email)) {
      await sendEmailVerificationMail({ email: email });
    }
  }

  const verifyOTP = async () => {
    if (OTP.length === 6) {

      setValidOTP(OTP)
      setOTPError(false)
    } else {
      setOTPError(true)
    }
  }

  const VerifyEmailMail = async (data) => {
    setverifyOtpLoading(true)
    await SignUpRequest.post(SignUpRequest.url(`/e-authorization/Privatelogin?type=EmailOtpVerification&subdomain=${subdomain}`, "ecommerce"),
      { "email": data.email, "otp": data.otp, "action": "checknotexist" },
      (success) => {
        if (success.data.Details === "OTP VERIFIED") {
          setSuccessMessage(success.data.Details); // Set response data
          setSuccess(true);
          setverifyOtpLoading(false)
        } else {
          setErrorMessage("Invalid OTP. Please try again");
          setError(true);
          setverifyOtpLoading(false);
        }

      }, (error) => {
        setverifyOtpLoading(false);
        setErrorMessage("Invalid OTP. Please try again");
        setError(true);
      }
    )
  }

  const registrationPayload = {
    email: email,
    otp: OTP,
  }

  useEffect(() => {
    if (validOTP) {
      VerifyEmailMail(registrationPayload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validOTP])


  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <div className='containerTrue pb-45 '>
        <div className='myprofile-container'>
          {/* <h4 className='savedAddress-heading'><span><span className='heading-arrow'>&#10229;<Link className='savedAddress-heading' to="/">
            Back to My Account
          </Link>
          </span></span>
          </h4> */}

          <div className='myprofile-wrapper mt-24'>
            <h1 className='select-address-p'>My Profile</h1>
            <div className='myprofile-wrapper mt-24'>
              <div className='myprofile-name'>
                <div className="formFieldwrap width-40 ">
                  <FormInput type={'type'} placeholder="Full Name" value={fullname}
                    onChange={(e) => handleInput(e, "name")} />
                  <FormError
                    show={fullname_error}
                    error="Fullname is required."
                    className='visitorFormError'
                  />
                </div>
                {/* <div className="formFieldwrap width-100 ">
                  <FormInput type={'type'} placeholder="Last Name" />
                </div > */}
              </div>

              <div className="formFieldwrap width-40">
                <FormInput type={'email'} placeholder="Email Id" value={email}
                  onChange={(e) => handleInput(e, "email")} />
                <FormError
                  show={!email && email_error}
                  error="Email is required."
                  className='visitorFormError'
                />
                <FormError
                  show={email && email_error}
                  error="Invalid Email. Please recheck and enter again."
                  className='visitorFormError'
                />
              </div>
              {
                basicDetailsVerified &&
                (
                  <React.Fragment>
                    {
                      otpVerifySend ? (
                        <React.Fragment>
                          {successMessage === "OTP VERIFIED" ? "OTP VERIFIED"
                            :
                            <>
                              <FormInput type={'number'} placeholder="Enter OTP" value={OTP}
                                onChange={(e) => handleInput(e, "OTP")} />
                              <button className='button button-primary btn-sm white next_btn' type='submit' onClick={verifyOTP}>{verifyOtpLoading ? "Loading.." : "Verify OTP"}</button>
                              <FormError show={OTPError} error="Enter Valid OTP." />
                              <FormError show={error} error={errorMessage} />
                            </>
                          }
                        </React.Fragment>
                      ) : (
                        <button className='button button-primary btn-sm white next_btn' type='submit' onClick={sendOTP}>{loading ? "Loading.." : "Send Otp"}</button>
                      )

                    }
                  </React.Fragment>
                )
              }
              <div className="formFieldwrap width-40">
                <FormInput type="number" placeholder="Enter Phone Number" value={contact}
                  onChange={(e) => handleInput(e, "contact")} />
              </div>

              {/* <h5 className='select-gender-p'> Gender:</h5>
              <div className="gender-group">
                <button className={`radio-button ${activeradio === "Male" ? "active" : ""}`}
                  checked={activeradio === "Male"}
                  onClick={() => RadioHandle("Male")}>Male</button>
                <button className={`radio-button ${activeradio === "Female" ? "active" : ""}`}
                  checked={activeradio === "Female"}
                  onClick={() => RadioHandle("Female")}>Female</button>
              </div> */}
              {pageloading ?
                <button className="buttonTrue btnTrue-primary btn-sm ">UPDATING...</button>
                :
                <button className="buttonTrue btnTrue-primary btn-sm " onClick={handleUpdate}>UPDATE</button>}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

export default MyProfile