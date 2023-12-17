import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import image from "../../assets/images/banner.jpg"
import "./login.scss"
import AppLink from "../../../../Common/AppLink";
import FormError from '../../../../Common/Form/FormError'
import FormInput from '../../../../Common/Form/FormInput';
import { getCustomerLogin, resetCustomerLogin } from '../../../../store/actions/ecommerce/action/auth';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import { useSelector } from 'react-redux';
import ValidationFile from '../../../../Classes/ValidationFile';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState("")
  const [contactError, setContactError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const { loading, success, data } = useSelector((state) => state.ecomAuth.login)
  const user = useSelector((state) => state.user);
  const subdomainuser = useSelector((state) => state.subdomainuser);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [type, setType] = useState("email");
  const { businessData, businessSuccess } = useSelector((state) => {
    return {
      businessData: state.businessInfo.ecomWebsite.data,
      businessSuccess: state.businessInfo.ecomWebsite.success
    }
  });
  // useEffect(() => {
  // }, []);
  const inputHandler = (t, v) => {

    dispatch(resetCustomerLogin())
    if (t === 'email') {
      setEmail(v);
      setEmailError(false)
    }
    if (t === "contact") {
      setContact(v)
      setContactError(false)
    }
    if (t === 'pw') {
      setPassword(v);
      setPasswordError(false)
    }
  };

  const customerLoginHandler = () => {
    let body = {};
    if (type === "email") {
      if (!ValidationFile.isEmail(email)) {
        setEmailError(true)
      }
      if (ValidationFile.isEmpty(password)) {
        setPasswordError(true)
      }
      if (email) {
        body.email = email;
      }
      if (password) {
        body.password = password
      }
      if (ValidationFile.isEmail(email) && ValidationFile.isNotEmpty(password)) {
        if (AppLinkUrl.privateDomain()) {
          dispatch(getCustomerLogin(AppLinkUrl.getHost(), body, "private_domain_login", "privateDomain"));

        } else {
          dispatch(getCustomerLogin(AppLinkUrl.subdomain(), body, "private_domain_login"));
        }
        // dispatch(getCustomerLogin(AppLinkUrl.subdomain(), body, "private_domain_login"));
      }
    } else {
      if (ValidationFile.isEmpty(contact)) {
        setContactError(true)
      }
      if (ValidationFile.isEmpty(password)) {
        setPasswordError(true)
      }
      if (contact) {
        body.contact = contact;
        body.country_code = 91
      }
      if (password) {
        body.password = password
      }
      if (ValidationFile.isNotEmpty(contact) && ValidationFile.isNotEmpty(password)) {
        if (AppLinkUrl.privateDomain()) {
          dispatch(getCustomerLogin(AppLinkUrl.getHost(), body, "contact_password_login_private_domain", "privateDomain"));
        } else {
          dispatch(getCustomerLogin(AppLinkUrl.subdomain(), body, "contact_password_login_private_domain"));
        }
      }
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetCustomerLogin())
    }
  }, [dispatch])
  useEffect(() => {
    if (success && data.data !== "Incorrect Password" && data.data !== "Invalid Email" && data.data !== "Invalid Contact") {
      history("/")
    }
  }, [data.data, history, success])

  return (
    <React.Fragment>
      <div className='loginsignup-wrapper pb-45 '>
        <div className="login_wrap">
          <div className="banner">
            {
              businessSuccess && businessData && businessData.banners ? (
                businessData.banners.length ?
                  <img src={businessData.banners[0].business_featured_banner ? businessData.banners[0].business_featured_banner : image} className="img-fluid" alt="" />

                  : <React.Fragment>
                    <img src={image} className="img-fluid" alt="" />
                  </React.Fragment>) : <img src={image} className="img-fluid" alt="" />

            }
          </div>
          <div className="login-content">

            {/* <>
                <h2 className="font mb-0">Verify with OTP</h2>
                <p className="OTP_text">OTP sent to your number <span>+91-9560625959 </span></p>
                <h4>Enter OTP</h4>
                <div className='formFieldwrap'>
                  <div className="OTP_inputfields">
                    <input type="text" className="form-control" id="first" tabIndex="1" maxlength="1" />
                    <input type="text" className="form-control" id="second" tabIndex="2" maxlength="1"
                    />
                    <input type="text" className="form-control" id="third" tabIndex="3" maxlength="1"
                    />
                    <input type="text" className="form-control" id="fourth" tabIndex="4" maxlength="1"
                    />
                    <input type="text" className="form-control" id="fifth" tabIndex="5" maxlength="1"
                    />
                    <input type="text" className="form-control" id="sixth" tabIndex="6" maxlength="1"
                    />
                  </div>
                  <FormError show={false} error="Enter Valid OTP." />
                  <FormError show={false} error="Invalid OTP" />
                </div>
                <button className="button-secondary">CONTINUE</button>
              </> */}

            <>
              <h2 className="font">
                <button>Login</button>
                {/* <span>or</span>  */}
                {/* <button>Signup</button> */}
              </h2>
              {/* <div className="cstmPhoneInput">
                  <PhoneInput
                    containerClass="form-group"
                    inputClass="form-control"
                    specialLabel="hii"
                    value={`${true} ${true}`}
                    country={"in"}
                    countryCodeEditable={false}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: false,
                    }}
                    onChange={(value, formattedValue) => {
                      true(value, formattedValue);
                    }}
                    onKeyUp={(value, formattedValue) => {
                      true(value, formattedValue);
                    }}
                    enableSearch
                    disableSearchIcon
                  />
                </div> */}
              {
                type === "email" ?
                  <div className="formFieldwrap formpaddingbottom">
                    <FormInput
                      placeholder="Email"
                      onChange={(vl) => inputHandler('email', vl.target.value)}
                    />
                    <FormError show={email && emailError} error="Invalid email." />
                    <FormError show={!email && emailError} error="Email required." />
                    <FormError show={data.data === "Invalid Email"} error={data.data} />
                  </div> :
                  <div className="formFieldwrap formpaddingbottom">
                    <FormInput
                      placeholder="Phone No."
                      onChange={(vl) => inputHandler('contact', vl.target.value)}
                    />
                    <FormError show={contact && contactError} error="Invalid Contact." />
                    <FormError show={!contact && contactError} error="Contact required." />
                    <FormError show={data.data === "Invalid Contact"} error={data.data} />
                  </div>
              }
              <div className='formFieldwrap formpaddingbottom'>
                <div className="input-custom-type inline">
                  <label className={type === "email" ? "active" : ""}>
                    <input
                      value={type}
                      onChange={() => setType("email")}
                      checked={type === "email"}
                      type="radio"
                    />
                    Email
                  </label>
                  <label className={type === "contact" ? "active" : ""}>
                    <input
                      type="radio"
                      value={type}
                      onChange={() => setType("contact")}
                      checked={type === "contact"}
                    />
                    Mobile Number
                  </label>
                </div>
              </div>
              <div className="formFieldwrap formpaddingbottom mt-8">
                <FormInput
                  type='password'
                  placeholder="Password"
                  onChange={(vl) => inputHandler('pw', vl.target.value)}
                />
                <FormError show={passwordError} error="Password required." />
                <FormError show={data.data === "Incorrect Password"} error={data.data} />
              </div>
              <p>By continuing, I agree to the  <Link to="#" className="secondaryLink">Terms of Use</Link> & <Link to="#" className="secondaryLink">Privacy Policy</Link></p>
              {
                loading ? <button className="button-secondary">Loading...</button> :
                  <button className="button-secondary" onClick={customerLoginHandler}>LOGIN</button>
              }
            </>
            <div className='login-login-links'>
              <Link to={'/customer-signup'} className="login-p">Create Account</Link>
              {/* <Link to="/" className="login-p">Go To Home</Link> */}
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login