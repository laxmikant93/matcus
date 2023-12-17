import React, { useState } from 'react';
import Signup from "../../../../assets/images/img/signup_img.png";
// import "../auth.scss";
import FormInput from '../../../../Common/Form/FormInput';
import iconGoogle from "../../../../assets/Icons/icon-google.svg";
import PhoneInput from "react-phone-input-2";
import MobileSignup from "../../../../assets/images/img/signup_logo.png"
import AppLink from "../../../../Common/AppLink";




const CreateAccoutV1 = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [check, setCheck] = useState();


  const handlePassword = (e) => {
    setPasswordShown(!passwordShown);
    e.preventDefault();
  }
  return (

    <section className='sign_sec'>
      <div className="container">
        <div className="row center-xs mb-50">
          <div className='wrapper'>
            <div className="item">
              <picture>
                <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
                <img src={Signup} alt="" className='img-fluid' />
              </picture>

            </div>
            <div className="item">
              <div className='main_form'>
                <h2 className='pt-40'>Welcome back</h2>
                <p className='mb-30'>Welcome back! Please enter your details.</p>
                <FormInput label="Enter e-mail" placeholder="Enter phone number or e-mail" className="mb-20" />
                <button className='button white Login-btn'>Login</button>
                <p className='small mt-10 w-100 end-xs primary'><AppLink to="#">Forgot Password?</AppLink></p>

                <div className='posi_border'>
                  or
                </div>
                <button className='button button-white google_btn'>
                  <img src={iconGoogle} alt="" />&nbsp;&nbsp;
                  Sign in with Google</button>
                <div className='text-change mt-10'>
                  <p>Don’t have account? <span className='primary'><AppLink to="#">Sign up for free</AppLink></span></p>
                </div>
              </div>
              <div className='term_list'>
                <ul>
                  <li><AppLink to="#">Terms of Service</AppLink></li>
                  <li><AppLink to="#">|</AppLink></li>
                  <li><AppLink to="#">Privacy Policy</AppLink></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <section className='sign_sec'>
    //   <div className="container">
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40'>Welcome back</h2>
    //             <p className='mb-30'>Welcome back! Please enter your details.</p>
    //             <FormInput label="Enter e-mail" placeholder="Enter phone number or e-mail" className="mb-20" />
    //             <button className='button white Login-btn'>Login</button>
    //             <p className='small mt-10 w-100 end-xs primary'><AppLink to="#">Forgot Password?</AppLink></p>

    //             <div className='posi_border'>
    //               or
    //             </div>
    //             <button className='button button-white google_btn'>
    //               <img src={iconGoogle} alt="" />&nbsp;&nbsp;
    //               Sign in with Google</button>
    //             <div className='text-change mt-10'>
    //               <p>Don’t have account? <span className='primary'><AppLink to="#">Sign up for free</AppLink></span></p>
    //             </div>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* login from email */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40'>Welcome back</h2>
    //             <p className='mb-30'>Welcome back! Please enter your details.</p>
    //             <FormInput label="Enter e-mail" placeholder="Enter phone number or e-mail" className="primary mb-20" />
    //             <FormInput label="Password" placeholder="Password" type="password" className="mb-0" />
    //             <div className='check_sec mb-20'>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Show password</span>
    //                 </label>
    //               </div>
    //               <div className='mt-5'>
    //                 <small><AppLink to="#">Forgot Password?</AppLink></small>
    //               </div>
    //             </div>
    //             <button className='button white Login-btn'>Login</button>

    //             <div className='posi_border'>
    //               or
    //             </div>
    //             <button className='button button-white google_btn'>
    //               <img src={iconGoogle} alt="" />&nbsp;&nbsp;
    //               Sign in with Google</button>
    //             <div className='text-change mt-10'>
    //               <p>Don’t have account? <span className='primary'><AppLink to="#">Sign up for free</AppLink></span></p>
    //             </div>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>

    //         </div>
    //       </div>
    //     </div>
    //     {/* login from number */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40'>Welcome back</h2>
    //             <p className='mb-30'>Welcome back! Please enter your details.</p>
    //             {/* <FormInput label="Phone number" type="Number" placeholder="Number" className="mb-10" /> */}
    //             <div className="cstmPhoneInput mb-10">
    //               <PhoneInput
    //                 containerClass="form-group"
    //                 inputClass="form-control"
    //                 specialLabel="hii"
    //                 country={"in"}
    //                 inputProps={{
    //                   name: "phone",
    //                   required: true,
    //                   autoFocus: true,
    //                 }}
    //                 enableSearch
    //                 disableSearchIcon
    //               />
    //               <label className="animLabel" htmlFor="mobile_number">
    //                 Mobile Number
    //               </label>
    //             </div>
    //             <div className='radio_text mb-20'>
    //               <label className="small">
    //                 <input
    //                   type="radio"
    //                   name="radio"
    //                   value="Password"
    //                 />&nbsp;&nbsp;
    //                 Password
    //               </label>
    //               <label className="small">
    //                 <input
    //                   type="radio"
    //                   name="radio"
    //                   value="another"
    //                 />&nbsp;&nbsp;
    //                 OTP
    //               </label>
    //             </div>
    //             <button className='button button-primary btn-xs white send_otp'>SEND OTP</button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* login from password */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40'>Welcome back</h2>
    //             <p className='mb-30'>Welcome back! Please enter your details.</p>
    //             {/* <FormInput label="Phone number" type="Number" placeholder="Number" className="mb-10" /> */}
    //             <div className="cstmPhoneInput mb-10">
    //               <PhoneInput
    //                 containerClass="form-group"
    //                 inputClass="form-control"
    //                 specialLabel="hii"
    //                 country={"in"}
    //                 inputProps={{
    //                   name: "phone",
    //                   required: true,
    //                   autoFocus: true,
    //                 }}
    //                 enableSearch
    //                 disableSearchIcon
    //               />
    //               <label className="animLabel" htmlFor="mobile_number">
    //                 Mobile Number
    //               </label>
    //             </div>
    //             <div className='radio_text mb-20'>
    //               <label className="small">
    //                 <input
    //                   type="radio"
    //                   name="radio"
    //                   value="Password_1"
    //                 />&nbsp;&nbsp;
    //                 Password
    //               </label>
    //               <label className="small">
    //                 <input
    //                   type="radio"
    //                   name="radio"
    //                   value="another_1"
    //                 />&nbsp;&nbsp;
    //                 OTP
    //               </label>
    //             </div>
    //             <FormInput label="Password" placeholder="Password" type="password" className="mb-0" />
    //             <div className='check_sec mb-20'>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Show password</span>
    //                 </label>
    //               </div>
    //               <div className='mt-5'>
    //                 <small><AppLink to="#">Forgot Password?</AppLink></small>
    //               </div>
    //             </div>
    //             <button className='button white Login-btn'>Continue</button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* login continue button */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40'>Welcome back</h2>
    //             <p className='mb-30'>Welcome back! Please enter your details.</p>
    //             {/* <FormInput label="Phone number" type="Number" placeholder="Number" className="mb-10" /> */}
    //             <div className="cstmPhoneInput mb-10">
    //               <PhoneInput
    //                 containerClass="form-group"
    //                 inputClass="form-control"
    //                 specialLabel="hii"
    //                 country={"in"}
    //                 inputProps={{
    //                   name: "phone",
    //                   required: true,
    //                   autoFocus: true,
    //                 }}
    //                 enableSearch
    //                 disableSearchIcon
    //               />
    //               <label className="animLabel" htmlFor="mobile_number">
    //                 Mobile Number
    //               </label>
    //             </div>
    //             <div className='radio_text mb-20'>
    //               <label className="small">
    //                 <input
    //                   type="radio"
    //                   name="radio"
    //                   value="Password_2"
    //                 />&nbsp;&nbsp;
    //                 Password
    //               </label>
    //               <label className="small">
    //                 <input
    //                   type="radio"
    //                   name="radio"
    //                   value="another_2"
    //                 />&nbsp;&nbsp;
    //                 OTP
    //               </label>
    //             </div>
    //             <FormInput label="Password" placeholder="Password" type="password" className="mb-0" />
    //             <div className='check_sec mb-20'>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Show password</span>
    //                 </label>
    //               </div>
    //               <div className='mt-5'>
    //                 <small><AppLink to="#">Forgot Password?</AppLink></small>
    //               </div>
    //             </div>
    //             <button className='button button-primary btn-sm button-block'>Continue</button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* login with OTP */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40'>Verify Mobile Number</h2>
    //             <p className='mb-20 veryfy_text'>An OTP has been sent to the entered mobile
    //               number +919560625959 <span className='primary'><AppLink to="#">Change number?</AppLink></span></p>
    //             {/* <FormInput placeholder="Enter phone number or e-mail" className="mb-20" /> */}
    //             <h4>Enter OTP</h4>
    //             <div className="otp_inputs mt-5">
    //               <input className="form-control" type="text" id="first" maxlength="1" />
    //               <input className="form-control" type="text" id="second" maxlength="1" />
    //               <input className="form-control" type="text" id="third" maxlength="1" />
    //               <input className="form-control" type="text" id="fourth" maxlength="1" />
    //               <input className="form-control" type="text" id="fifth" maxlength="1" />
    //               <input className="form-control" type="text" id="sixth" maxlength="1" />
    //             </div>
    //             <p className='mt-10 mb-10 center-xs w-100'><AppLink to="#" className='primary'>Resend code in 00:29</AppLink></p>
    //             <button className='button button-primary btn-sm white continue_btn'>Verify</button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* signup screen */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40 mb-30'>Create account</h2>
    //             <FormInput label="Enter e-mail" placeholder="Enter phone number or e-mail" className="primary mb-20" />
    //             <FormInput label="Type Password" placeholder="Type password" type={passwordShown ? "text" : "password"} className="mb-20" />
    //             <FormInput label="Re-Type Password" placeholder="Re-type password" type={passwordShown ? "text" : "password"} className="mb-0" />
    //             <div className='check_sec mb-20'>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Save password</span>
    //                 </label>
    //               </div>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                   onClick={handlePassword}
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Show password</span>
    //                 </label>
    //               </div>
    //             </div>
    //             <button className='button button-primary btn-sm button-block'>Continue</button>

    //             <div className='posi_border'>
    //               or
    //             </div>
    //             <button className='button button-white google_btn'>
    //               <img src={iconGoogle} alt="" />&nbsp;&nbsp;
    //               Sign in with Google</button>
    //             <div className='text-change mt-10'>
    //               <p>Already have a account? <span className='primary'><AppLink to="#">Login</AppLink></span></p>
    //             </div>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>

    //         </div>
    //       </div>
    //     </div>
    //     {/* signup with continue button lorder */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40 mb-30'>Create account</h2>
    //             <FormInput label="Enter e-mail" placeholder="Enter phone number or e-mail" className="primary mb-20" />
    //             <FormInput label="Type Password" placeholder="Type password" type={passwordShown ? "text" : "password"} className="mb-20" />
    //             <FormInput label="Re-Type Password" placeholder="Re-type password" type={passwordShown ? "text" : "password"} className="mb-0" />
    //             <div className='check_sec mb-20'>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Save password</span>
    //                 </label>
    //               </div>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                   onClick={handlePassword}
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Show password</span>
    //                 </label>
    //               </div>
    //             </div>
    //             <button className='button button-primary btn-sm button-block'>Continue <div className='loader loader25'></div></button>

    //             <div className='posi_border'>
    //               or
    //             </div>
    //             <button className='button button-white google_btn'>
    //               <img src={iconGoogle} alt="" />&nbsp;&nbsp;
    //               Sign in with Google</button>
    //             <div className='text-change mt-10'>
    //               <p>Already have a account? <span className='primary'><AppLink to="#">Login</AppLink></span></p>
    //             </div>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>

    //         </div>
    //       </div>
    //     </div>
    //     {/*verify your email note*/}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form note_form'>
    //             <h2 className='pt-40 mb-20 start-xs'>Verify your email</h2>
    //             <p className='mb-30 note_text'>We sent  an email to <span className='primary'><AppLink to="#">abc@gmail.com</AppLink></span>&nbsp;
    //               to make sure you own it. Please check
    //               inbox and follow the steps to finish setting
    //               up your Edneed account.</p>
    //             <AppLink to="#" className='text_link mb-40'>Use a different email address as your Edneed
    //               account</AppLink>
    //           </div>
    //           <div className="main_form">
    //             <button className='button button-primary btn-sm button-block'>Resend email</button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>

    //         </div>
    //       </div>
    //     </div>
    //     {/* signup screen with number */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40 mb-30'>Create account</h2>
    //             <div className="cstmPhoneInput mb-20">
    //               <PhoneInput
    //                 containerClass="form-group"
    //                 inputClass="form-control"
    //                 specialLabel="hii"
    //                 country={"in"}
    //                 inputProps={{
    //                   name: "phone",
    //                   required: true,
    //                   autoFocus: true,
    //                 }}
    //                 enableSearch
    //                 disableSearchIcon
    //               />
    //               <label className="animLabel" htmlFor="mobile_number">
    //                 Mobile Number
    //               </label>
    //             </div>
    //             <FormInput label="Type Password" placeholder="Type new password" type={passwordShown ? "text" : "password"} className="mb-20" />
    //             <FormInput label="Re-Type Password" placeholder="Re-type new password" type={passwordShown ? "text" : "password"} className="mb-0" />
    //             <div className='check_sec mb-20'>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Save password</span>
    //                 </label>
    //               </div>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                   onClick={handlePassword}
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Show password</span>
    //                 </label>
    //               </div>
    //             </div>
    //             <button className='button button-primary btn-sm button-block'>Continue</button>


    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>

    //         </div>
    //       </div>
    //     </div>
    //     {/*OTP verification screen*/}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form note_form'>
    //             <h2 className='pt-40'>OTP Verification</h2>
    //             <p className='mb-20 otp_veification_text'>Enter the OTP sent to your number &nbsp;<span className='primary'><AppLink to="#"> +919560625959</AppLink></span></p>
    //           </div>
    //           <div className="main_form">
    //             <h4>Enter OTP</h4>
    //             <div className="otp_inputs mt-5">
    //               <input className="form-control" type="text" id="first" maxlength="1" />
    //               <input className="form-control" type="text" id="second" maxlength="1" />
    //               <input className="form-control" type="text" id="third" maxlength="1" />
    //               <input className="form-control" type="text" id="fourth" maxlength="1" />
    //               <input className="form-control" type="text" id="fifth" maxlength="1" />
    //               <input className="form-control" type="text" id="sixth" maxlength="1" />
    //             </div>
    //             <p className='mt-10 mb-20 center-xs w-100'><AppLink to="#" className='primary'>Resend code in 00:29</AppLink></p>
    //             <button className='button button-primary btn-sm white continue_btn'>Verify</button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/*OTP validation error screen */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form note_form'>
    //             <h2 className='pt-40'>OTP Verification</h2>
    //             <p className='mb-20 otp_veification_text'>Enter the OTP sent to your number &nbsp;<span className='primary'><AppLink to="#"> +919560625959</AppLink></span></p>
    //           </div>
    //           <div className="main_form">
    //             <h4>Enter OTP</h4>
    //             <div className="otp_inputs mt-5 mb-10">
    //               <input className="form-control" type="text" id="first" maxlength="1" />
    //               <input className="form-control" type="text" id="second" maxlength="1" />
    //               <input className="form-control" type="text" id="third" maxlength="1" />
    //               <input className="form-control" type="text" id="fourth" maxlength="1" />
    //               <input className="form-control" type="text" id="fifth" maxlength="1" />
    //               <input className="form-control" type="text" id="sixth" maxlength="1" />
    //             </div>
    //             <p className='text-danger flex middle-sm center-xs'><span className='badge'>!</span>&nbsp; Enter valid OTP</p>
    //             <p className='mt-10 mb-20 center-xs w-100'><AppLink to="#" className='primary'>RESEND OTP</AppLink></p>
    //             <button className='button button-primary btn-sm white continue_btn'>Verify</button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/*enter currect OTP screen */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form note_form'>
    //             <h2 className='pt-40'>OTP Verification</h2>
    //             <p className='mb-20 otp_veification_text'>Enter the OTP sent to your number &nbsp;<span className='primary'><AppLink to="#"> +919560625959</AppLink></span></p>
    //           </div>
    //           <div className="main_form">
    //             <h4>Enter OTP</h4>
    //             <div className="otp_inputs mt-5">
    //               <input className="form-control" type="text" id="first" maxlength="1" />
    //               <input className="form-control" type="text" id="second" maxlength="1" />
    //               <input className="form-control" type="text" id="third" maxlength="1" />
    //               <input className="form-control" type="text" id="fourth" maxlength="1" />
    //               <input className="form-control" type="text" id="fifth" maxlength="1" />
    //               <input className="form-control" type="text" id="sixth" maxlength="1" />
    //             </div>
    //             <p className='mt-10 mb-20 center-xs w-100'><AppLink to="#" className='primary'>RESEND OTP</AppLink></p>
    //             <button className='button button-primary btn-sm white continue_btn'>Verify <div className='loader'></div></button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* forget password screen  */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40 mb-20'>Forgot Password</h2>
    //             <FormInput label="Enter e-mail" placeholder="Enter phone number or e-mail" className="mb-20" />
    //             <button className='button button-primary btn-sm button-block'>Continue</button>


    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* forget password screen FOR NUMBER */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40 mb-20'>Forgot Password</h2>
    //             <div className="cstmPhoneInput mb-10">
    //               <PhoneInput
    //                 containerClass="form-group"
    //                 inputClass="form-control"
    //                 specialLabel="hii"
    //                 country={"in"}
    //                 inputProps={{
    //                   name: "phone",
    //                   required: true,
    //                   autoFocus: true,
    //                 }}
    //                 enableSearch
    //                 disableSearchIcon
    //               />
    //               <label className="animLabel" htmlFor="mobile_number">
    //                 Mobile Number
    //               </label>
    //             </div>

    //           </div>
    //           <div className="main_form note_form mb-20">
    //             <p className='center-xs forg_text'>We will send an OTP(One Time Password) to your mobile</p>
    //           </div>
    //           <div className='main_form'>
    //             <button className='button button-primary btn-sm button-block'>Request OTP</button>


    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* forget password otp screen */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40'>Forgot Password</h2>
    //             <p className='mb-20 text-gray veryfy_text '>An OTP has been sent to the entered mobile
    //               number +919560625959 <span className='primary'><AppLink to="#">Change number?</AppLink></span></p>
    //             {/* <FormInput placeholder="Enter phone number or e-mail" className="mb-20" /> */}
    //             <h4>Enter OTP</h4>
    //             <div className="otp_inputs mt-5">
    //               <input className="form-control" type="text" id="first" maxlength="1" />
    //               <input className="form-control" type="text" id="second" maxlength="1" />
    //               <input className="form-control" type="text" id="third" maxlength="1" />
    //               <input className="form-control" type="text" id="fourth" maxlength="1" />
    //               <input className="form-control" type="text" id="fifth" maxlength="1" />
    //               <input className="form-control" type="text" id="sixth" maxlength="1" />
    //             </div>
    //             <p className='mt-20 mb-20 center-xs w-100'><AppLink to="#" className='primary'>Resend code in 00:29</AppLink></p>
    //             <button className='button button-primary btn-sm white continue_btn'>Verify</button>
    //             <div className='posi_border'>
    //               or
    //             </div>
    //             <button className='button btn-o-primary btn-sm primary continue_btn'>Reset with email</button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* create password screen  */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className='main_form'>
    //             <h2 className='pt-40 mb-30'>Create Password</h2>
    //             <FormInput label="Create New Password" placeholder="Create New Password" type={passwordShown ? "text" : "password"} className="mb-20" />
    //             <FormInput label="Confirm New Password" placeholder="Confirm New Password" type={passwordShown ? "text" : "password"} className="mb-0" />
    //             <div className='check_sec mb-20'>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Save password</span>
    //                 </label>
    //               </div>
    //               <div className='mt-5'>
    //                 <label
    //                   className=""
    //                   onClick={handlePassword}
    //                 >
    //                   <input
    //                     type="checkbox"
    //                   />&nbsp;&nbsp;<span className='check-text'>Show password</span>
    //                 </label>
    //               </div>
    //             </div>
    //             <button className='button button-primary btn-sm button-block'>Set New password</button>
    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>

    //         </div>
    //       </div>
    //     </div>
    //     {/* create pass */}
    //     <div className="row center-xs mb-50">
    //       <div className='wrapper'>
    //         <div className="item">
    //           <picture>
    //             <source media="(max-width: 1024px)" srcSet={MobileSignup} className='img-fluid' />
    //             <img src={Signup} alt="" className='img-fluid' />
    //           </picture>

    //         </div>
    //         <div className="item">
    //           <div className="main_form note_form">
    //             <h2 className='pt-40 mb-10'>Check Your Email </h2>
    //             <p className="mb-80 forg_note">We have sent password recover instructions
    //               to your email <span className="primary"><AppLink to="#">abcd@gmail.com</AppLink></span></p>
    //             <div className='flex center-xs middle-sm'>
    //               <p className='text-dark forg_note'>Didn't receive the email?</p>&nbsp;&nbsp;
    //               <button className='button button-primary btn-xs white email_btn'>Resend email</button>
    //             </div>

    //           </div>
    //           <div className='term_list'>
    //             <ul>
    //               <li><AppLink to="#">Terms of Service</AppLink></li>
    //               <li><AppLink to="#">|</AppLink></li>
    //               <li><AppLink to="#">Privacy Policy</AppLink></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )
}

export default CreateAccoutV1;