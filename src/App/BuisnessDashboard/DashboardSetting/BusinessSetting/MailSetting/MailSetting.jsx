import React, { useEffect } from 'react'
import './mailsetting.scss'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../../../Common/Breadcrumb'
import BreadcrumbItem from '../../../../../Common/Breadcrumb/BreadcrumbItem'
import CurrencyComponent from '../../WebsiteSetting/CurrencyAndLanguage/Components/CurrencyComponent/CurrencyComponent'
import Card from '../../../../../Common/Card'
import CardBody from '../../../../../Common/Card/CardBody'
import CheckboxInput from '../../../../../Common/Form/CheckboxInput'
import { useState } from 'react'
import FormInput from '../../../../../Common/Form/FormInput'
import FormError from '../../../../../Common/Form/FormError'
import FormTextArea from '../../../../../Common/Form/FormTextArea'
import ValidationFile from '../../../../../Classes/ValidationFile'

import ScrollToTop from '../../../../../Common/ScrollPageTop'
import { useDispatch, useSelector } from 'react-redux'
import { getInstituteData, patchInstituteDataReset, patchInstituteInfo, postSMTPTestMail, postSMTPTestMailReset } from '../../../../../store/actions/businessInfo'
import CircleButton from '../../SettingComponents/CircleButton/CircleButton'
const MailSetting = () => {

  let dispatch = useDispatch();

  const { getInstituiteInfoData, users, getInstituiteInfoDataSuccess, patchInstituiteInfoDataSuccess,
    businessId, testMailSuccess, testMailResponse } = useSelector(
      (state) => {
        return {
          getInstituiteInfoData: state.businessInfo.getInstituiteData.data,
          getInstituiteInfoDataSuccess: state.businessInfo.getInstituiteData.success,
          patchInstituiteInfoDataSuccess: state.businessInfo.patchInstituteInfo.loaded,
          testMailSuccess: state.businessInfo.testMailSMTP.success,
          testMailResponse: state.businessInfo.testMailSMTP.data,
          users: state.user,
          businessId: state.user.user_business
        };
      }
    );

  const [toggleState, setToggleState] = useState("SMTP");
  const [customSMTPCheck, setCustomSMTPCheck] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [SMTPRegistration, setSMTPRegistration] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSMTPPassword, setShowSMTPPassword] = useState(false);
  const [SMTP_Host, setSMTP_Host] = useState("");
  const [SMTP_Port, setSMTP_Port] = useState(465);
  const [SMTP_UserName, setSMTP_UserName] = useState("");
  const [SMTP_Password, setSMTP_Password] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [editPassword, setEditPassword] = useState(false);

  //error states
  const [registeredEmailError, setRegisteredEmailError] = useState(false);
  const [appPasswordError, setAppPasswordError] = useState(false);
  const [SMTP_HostError, setSMTP_HostError] = useState(false);
  const [SMTP_PortError, setSMTP_PortError] = useState(false);
  const [SMTP_UserNameError, setSMTP_UserNameError] = useState(false);
  const [SMTP_PasswordError, setSMTP_PasswordError] = useState(false);
  const [recipientError, setRecipientError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    dispatch(getInstituteData(businessId, users.user_business_type));
  }, [businessId, dispatch, users.user_business_type]);

  const handleToggleState = (status) => {
    setToggleState(status);
    if (status === "Test") {
      setCustomSMTPCheck(false);
    } else {
      setCustomSMTPCheck(getInstituiteInfoData && getInstituiteInfoData?.custom_smtp)
    }
  }

  const handleCustomSMTPCheckBox = (e) => {
    let inputChecked = e.target.checked;
    if (inputChecked) {
      setCustomSMTPCheck(true);
    }
    else {
      setCustomSMTPCheck(false);
    }
  }

  const handleInputValues = (e) => {
    let inputName = e.target.name;
    let inputvalue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputvalue);

    switch (inputName) {
      case "registered_email":
        setRegisteredEmail(value);
        setRegisteredEmailError(!ValidationFile.isEmail(value));
        break;
      case "app_password":
        setAppPassword(value);
        setAppPasswordError(ValidationFile.isEmpty(value));
        break;
      case "SMTP_Host":
        setSMTP_Host(value);
        setSMTP_HostError(ValidationFile.isEmpty(value));
        break;
      case "SMTP_Port":
        setSMTP_Port(value);
        setSMTP_PortError(ValidationFile.isEmpty(value));
        break;
      case "SMTP_UserName":
        setSMTP_UserName(value);
        setSMTP_UserNameError(ValidationFile.isEmpty(value));
        break;
      case "SMTP_Password":
        setSMTP_Password(value);
        setSMTP_PasswordError(ValidationFile.isEmpty(value));
        break;
      case "recipient":
        setRecipient(value);
        setRecipientError(!ValidationFile.isEmail(value));
        break;
      case "subject":
        setSubject(value);
        setSubjectError(ValidationFile.isEmpty(value));
        break;
      case "message":
        setMessage(value);
        setMessageError(ValidationFile.isEmpty(value));
        break;
      default:
        break;
    }
    setSMTPRegistration(true);
  }

  const handleRegisterButton = () => {

    if (!ValidationFile.isEmail(registeredEmail)) {
      setRegisteredEmailError(true);
    }
    if (ValidationFile.isEmpty(appPassword)) {
      setAppPasswordError(true);
    }

    if (ValidationFile.isEmail(registeredEmail) && ValidationFile.isNotEmpty(appPassword)) {
      dispatch(patchInstituteInfo(businessId, {
        smtp_email: registeredEmail.trim()
        , smtp_password: appPassword.trim(),
        custom_smtp: false,
      }, users.user_business_type, "", "", true))
      setSMTPRegistration(false);
      setShowToast(true);
      setCustomSMTPCheck(false);
    }
  }

  useEffect(() => {
    if (patchInstituiteInfoDataSuccess || testMailSuccess) {
      setRecipient("");
      setSubject("");
      setMessage("");
      setTimeout(() => {
        setShowToast(false);
      }, 3000)
    }
  }, [patchInstituiteInfoDataSuccess, testMailSuccess])

  useEffect(() => {
    if (getInstituiteInfoData && getInstituiteInfoDataSuccess) {
      setCustomSMTPCheck(getInstituiteInfoData.custom_smtp && getInstituiteInfoData.custom_smtp);
      setSMTP_UserName(getInstituiteInfoData.custom_smtp_email && getInstituiteInfoData.custom_smtp_email);
      setSMTP_Password(getInstituiteInfoData.custom_smtp_password && getInstituiteInfoData.custom_smtp_password);
      setSMTP_Host(getInstituiteInfoData.custom_smtp_host && getInstituiteInfoData.custom_smtp_host);
      setSMTP_Port(getInstituiteInfoData.custom_smtp_port && getInstituiteInfoData.custom_smtp_port);
      setRegisteredEmail(getInstituiteInfoData.smtp_email && getInstituiteInfoData.smtp_email);
      setAppPassword(getInstituiteInfoData.smtp_password && getInstituiteInfoData.smtp_password);
    }
  }, [getInstituiteInfoData, getInstituiteInfoDataSuccess])

  useEffect(() => {
    return () => {
      dispatch(postSMTPTestMailReset());
      dispatch(patchInstituteDataReset());
    }
  }, [dispatch])

  const showHidePassword = (e) => {
    if (e.target.checked) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  }

  const showHideSMTPPassword = (e) => {
    if (e.target.checked) {
      setShowSMTPPassword(true);
    } else {
      setShowSMTPPassword(false);
    }
  }


  // console.log(SMTP_Port, "SMTP_Port")

  const handleSaveChangesButton = () => {
    let data = {
      custom_smtp: customSMTPCheck,
      custom_smtp_host: SMTP_Host?.trim(),
      custom_smtp_password: SMTP_Password?.trim(),
      custom_smtp_port: SMTP_Port,
      custom_smtp_email: SMTP_UserName?.trim()
    }
    if (!ValidationFile.isEmail(SMTP_Host)) {
      setSMTP_HostError(true);
    }
    if (ValidationFile.isEmpty(SMTP_Password)) {
      setSMTP_PasswordError(true);
    }
    if (ValidationFile.isEmpty(SMTP_UserName)) {
      setSMTP_UserNameError(true);
    }
    if (ValidationFile.isEmpty(SMTP_Port)) {
      setSMTP_PortError(true);
    }

    if (ValidationFile.isEmail(SMTP_Host) && ValidationFile.isNotEmpty(SMTP_Password)
      && ValidationFile.isNotEmpty(SMTP_UserName) && ValidationFile.isNotEmpty(SMTP_Port)) {
      dispatch(patchInstituteInfo(businessId, data, users.user_business_type, "", "", true));
      setSMTPRegistration(false);
      setShowToast(true);
      setAppPassword("");
      setRegisteredEmail("");
      setEditPassword(false);
    }
  }

  const handleSendMailButton = () => {
    let data = {
      business: users.user_business,
      type: users.user_business_type,
      mail_recepient: recipient.trim(),
      mail_message: message,
      mail_subject: subject
    }
    if (!ValidationFile.isEmail(recipient)) {
      setRecipientError(true);
    }
    if (ValidationFile.isEmpty(subject)) {
      setSubjectError(true);
    }
    if (ValidationFile.isEmpty(message)) {
      setMessageError(true);
    }

    if (ValidationFile.isEmail(recipient) && ValidationFile.isNotEmpty(subject) && ValidationFile.isNotEmpty(message)) {
      dispatch(postSMTPTestMail(data));
      setSMTPRegistration(false);
      setShowToast(true);
    }
  }

  const handleEditButton = () => {
    setEditPassword(true);
  }

  const handleCancelButton = () => {
    setSMTP_Password(getInstituiteInfoData && getInstituiteInfoData?.smtp_password);
    setEditPassword(false);
  }

  const handleUpdateButton = () => {
    if (ValidationFile.isEmpty(SMTP_Password)) {
      setSMTP_PasswordError(true);
    }

    if (ValidationFile.isNotEmpty(SMTP_Password)) {
      dispatch(patchInstituteInfo(businessId, { custom_smtp_password: SMTP_Password }, users.user_business_type, "", "", true));
      setEditPassword(false);
    }
  }

  return (
    <div className='smtp-container'>
      <ScrollToTop />
      <Breadcrumb>
        <BreadcrumbItem to='/settings' title='Settings  '></BreadcrumbItem>
        <BreadcrumbItem to='/mail-setting' title='SMTP Mail Settings'></BreadcrumbItem>
      </Breadcrumb>
      {/* heading container */}
      <section className="mail-header-wrapper inline between-xs  between-lg align-center ">
        <div className='inline mail-header-left-item align-center'>
          <div className='header-back-icon-btn'>
          <CircleButton position={'left'} path={'/settings'} />
          {/* <Link to="/ecommerce/settings"><i className='icon-back'>&#x276E;</i></Link> */}
          </div>
          <h1>SMTP Mail Settings</h1>
        </div>
        {/* registration flag  success */}
        {showToast && !customSMTPCheck && toggleState === "SMTP" ?
          <div className='mail-header-right-item text-xs w-400'>
            <div className='flag-header'></div>
            Registration Successful!
          </div>
          : showToast && customSMTPCheck && toggleState === "SMTP" ?
            <div className='mail-header-right-item text-xs w-400'>
              <div className='flag-header'></div>
              Changes Saved Successfully!
            </div>
            : showToast && toggleState === "Test" && testMailResponse.messageId ?
              <div className='mail-header-right-item text-xs w-400'>
                <div className='flag-header'></div>
                Mail Sent Successfully!
              </div>
              : showToast && toggleState === "Test" && testMailSuccess && testMailResponse &&
                !testMailResponse.messageId ?
                <div className='mail-header-right-item text-xs w-400'>
                  <div className='red-flag-header'></div>
                  SMTP Registration Failed. Please check your details and try again!
                </div>
                : ""
        }
      </section>
      <span className=' text-2xs w-400 manage-policy-item '>Register/Test your SMTP mail settings here </span>
      <hr className='mt-20 mb-2' />

      <div className='tabContainer mt-2'>
        <div className='tab-head'>
          <div className={`tab ${toggleState === "SMTP" ? 'active-tab' : ''}`} onClick={() => { handleToggleState("SMTP") }}>SMTP Registration</div>
          <div className={`tab ${toggleState === "Test" ? 'active-tab' : ''}`} onClick={() => { handleToggleState("Test") }}>Test Mail</div>
        </div>
        <div className='tab-content-div'>
          <div className={`${toggleState === "SMTP" ? 'active-content' : 'content'}`}>
            <div className='login-div'>
              <div className='smtp-email-div  '>
                <div className='inline between-lg between-xs form-label-item '>
                  <div>Registered Email Address</div>
                  <span>:</span>
                </div>
                <div className="smtp-form-div">
                  <FormInput
                    type="email"
                    label=""
                    id="name"
                    value={registeredEmail}
                    name="registered_email"
                    onChange={handleInputValues}
                    placeholder='Enter email address'
                    disabled={customSMTPCheck}
                  />
                  <FormError
                    show={registeredEmailError && !registeredEmail}
                    error="Registered Email required."
                  />
                  <FormError
                    show={registeredEmail && registeredEmailError}
                    error="Invalid Email."
                    className='visitorFormError'
                  />
                </div>

              </div>
              <div className='smtp-email-div pT-20 '>
                <div className='inline between-lg between-xs form-label-item '>
                  <div>App Password</div>
                  <span>:</span>
                </div>
                <div className="smtp-form-div">
                  <FormInput
                    type={showPassword ? "text" : "password"}
                    label=""
                    id="app_password"
                    value={appPassword}
                    onChange={handleInputValues}
                    name="app_password"
                    disabled={customSMTPCheck}
                    placeholder='Type the App password of your email address'
                  />
                  <FormError
                    show={appPasswordError && !appPassword}
                    error="App Password required."
                  />
                </div>

              </div>
              {appPassword &&
                <div className='mt-5 show-passward-div'>
                  <label
                    className=""
                  >
                    <input
                      type="checkbox"
                      onChange={showHidePassword}
                      checked={showPassword === true}
                    />&nbsp;&nbsp;<span className='check-text'>Show Password</span>
                  </label>
                </div>}
              <div className='  '>
                <p className={`text-xs  w-400 ${customSMTPCheck ? 'policy-disable ' : 'note-div'} `}>
                  If you don’t have an App password. Go to your email provider panel and Turn-on 2 step verfication. Then generate  an app password and complete your SMTP registration here.
                </p>
              </div>
            </div>
            <div className='register-button-container inline between-xs between-lg'>
              <div className='inline confirm-checkbox-div align-center'>
                <input type="checkbox"
                  checked={customSMTPCheck}
                  onChange={handleCustomSMTPCheckBox}
                />
                <p className='confirm-note '>Check the box for custom SMTP registration</p>
              </div>
              {!customSMTPCheck ?
                <div>
                  <button className={SMTPRegistration ? 'button button-primary btn-xs' : 'button button-gray btn-xs'}
                    onClick={handleRegisterButton}
                    disabled={!SMTPRegistration}
                  >Register
                  </button>
                </div>
                : ""
              }
            </div>

          </div>
          <div className={`${toggleState === "Test" ? 'active-content' : 'content'}`}>
            {!getInstituiteInfoData.smtp_email || !getInstituiteInfoData.smtp_password ?
              <p className='text-xs w-400 base mt-15 test-mail-note-item'>To send test mails, first you have to complete your SMTP registration. </p>
              : ""
            }
            <div className='test-mail-div'>
              <div className='smtp-test-email-item  '>
                <div className='inline between-lg between-xs form-label-item '>
                  <div>Recipient</div>
                  <span>:</span>
                </div>
                <div className="smtp-form-div">
                  <FormInput

                    type="email"
                    value={recipient}
                    name="recipient"
                    onChange={handleInputValues}
                    placeholder='Enter the recipient’s mail address'

                  />
                  <FormError
                    show={recipientError}
                    error="Valid Recipient’s mail address required."
                  />
                </div>

              </div>
              <div className='smtp-test-email-item mt-20 '>
                <div className='inline between-lg between-xs form-label-item '>
                  <div>Subject</div>
                  <span>:</span>
                </div>
                <div className="smtp-form-div">
                  <FormInput
                    type="text"
                    label=""
                    id="name"
                    value={subject}
                    name="subject"
                    onChange={handleInputValues}
                    placeholder='Enter the subject of your mail'
                  />
                  <FormError
                    show={subjectError}
                    error="Subject required."
                  />
                </div>

              </div>
              <div className='smtp-test-email-item mt-20 '>
                <div className='inline between-lg between-xs  form-label-item '>
                  <div>Message</div>
                  <span>:</span>
                </div>
                <div className="smtp-form-div">
                  <FormTextArea
                    className="form-control"
                    rows="9"
                    type="text"
                    value={message}
                    name="message"
                    placeholder="Type your message here"
                    onChange={handleInputValues}
                    style={{ whiteSpace: " pre-wrap" }}
                    maxLength="500"
                  // TextareaBtmTxt="500"
                  ></FormTextArea>
                  <FormError
                    show={messageError}
                    error="Message required."
                  />
                </div>
              </div>
            </div>
            {/* send mail button */}
            <div className='mt-25'>
              {getInstituiteInfoData.smtp_email && getInstituiteInfoData.smtp_password ?
                <button className='button button-primary btn-xs'
                  disabled={!SMTPRegistration}
                  onClick={handleSendMailButton}
                >
                  Send Mail
                </button>
                :
                <button className='button button-primary btn-xs' disabled>
                  Send Mail
                </button>
              }

            </div>
          </div>
        </div>
      </div>
      {/* smtp form  */}
      {customSMTPCheck ?
        <div className=''>
          <div className='smtp-form-wrapper mt-25'>
            <div className='smtp-register-item'>
              <div className='inline between-lg between-xs form-label-item  '>
                <div className='text-xs w-500'>SMTP Host</div>
                <span>:</span>
              </div>
              <div>
                <FormInput
                  className=""
                  type="text"
                  value={SMTP_Host}
                  name="SMTP_Host"
                  onChange={handleInputValues}
                  placeholder="eg: info@yourdomain.com"
                ></FormInput>
                <FormError
                  show={SMTP_HostError}
                  error="SMTP Host required."
                />
                <p className='text-xs w-400 italic-text'>Your mail server</p>
              </div>
            </div>
            <div className='smtp-register-item mt-20'>
              <div className='inline between-lg between-xs  form-label-item '>
                <div className='text-xs w-500'>SMTP Port</div>
                <span>:</span>
              </div>
              <div className='smtp-form-div'>
                <FormInput
                  className=""
                  type="number"
                  value={SMTP_Port}
                  name="SMTP_Port"
                  onChange={handleInputValues}
                  placeholder="eg: 758m"
                ></FormInput>
                <FormError
                  show={SMTP_PortError}
                  error="SMTP Port required."
                />
                <p className='text-xs w-400 italic-text'>The port to your mail server</p>
              </div>
            </div>
            <div className='smtp-register-item mt-20'>
              <div className='inline between-lg between-xs  form-label-item '>
                <div className='text-xs w-500'>SMTP Username</div>
                <span>:</span>
              </div>
              <div className='smtp-form-div'>
                <FormInput
                  className=""
                  type="text"
                  value={SMTP_UserName}
                  name="SMTP_UserName"
                  onChange={handleInputValues}
                  placeholder="eg: mailstation"
                ></FormInput>
                <FormError
                  show={SMTP_UserNameError}
                  error="SMTP Username required."
                />
                <p className='text-xs w-400 italic-text'>The username to login to your mail server</p>
              </div>
            </div>
            <div className='smtp-register-item mt-20'>
              <div className='inline between-lg between-xs form-label-item  '>
                <div className='text-xs w-500'>SMTP Password</div>
                <span>:</span>
              </div>
              <div>
                <div className="passward-form-input ">
                  <FormInput
                    type={showSMTPPassword ? " text" : "password"}
                    value={SMTP_Password}
                    name="SMTP_Password"
                    onChange={handleInputValues}
                    placeholder="Enter the SMTP password"
                    disabled={getInstituiteInfoData.custom_smtp_host && !editPassword}
                  ></FormInput>

                  <div className='edit-passward-btn-wrapper inline '>
                    {getInstituiteInfoData.custom_smtp_host && !editPassword ?
                      <p className='text-xs w-500 primary edit-passward-edit-btn '
                        onClick={handleEditButton}
                      >Edit</p>
                      : editPassword ?
                        <>
                          <p className='edit-passward-cancel-btn text-xs w-500'
                            onClick={handleCancelButton}
                          >Cancel</p>
                          <p className='text-xs w-500 primary edit-passward-edit-btn '
                            onClick={handleUpdateButton}
                          >Update</p>
                        </>
                        : ""
                    }
                    {/* {!editPassword ?
                      <p className='text-xs w-500 primary edit-passward-edit-btn '
                        onClick={handleEditButton}
                      >Edit</p>
                      :
                      <>
                        <p className='edit-passward-cancel-btn text-xs w-500'
                          onClick={handleCancelButton}
                        >Cancel</p>
                        <p className='text-xs w-500 primary edit-passward-edit-btn '
                          onClick={handleUpdateButton}
                        >Update</p>
                      </>
                    } */}
                  </div>
                </div>
                <FormError
                  show={SMTP_PasswordError}
                  error="SMTP Password required."
                />
                <div className='inline between-lg between-xs  align-center'>
                  <p className='text-xs w-400 italic-text'>The SMTP Password to login to your mail server</p>
                  <div className='mt-5 show-passward-div'>
                    <label
                      className=""
                    >
                      <input
                        type="checkbox"
                        onChange={showHideSMTPPassword}
                        checked={showSMTPPassword === true}
                      />&nbsp;&nbsp;<span className='check-text'>Show Password</span>
                    </label>
                  </div>
                </div>

              </div>

            </div>
          </div>
          {/* save changes button */}
          <div className='mt-25'>
            <button className={SMTPRegistration ? 'button button-primary btn-xs ' : 'button button-gray btn-xs'}
              disabled={!SMTPRegistration}
              onClick={handleSaveChangesButton}
            >
              Save Changes
            </button>
          </div>
        </div>
        : ""
      }
    </div >
  )
}

export default MailSetting