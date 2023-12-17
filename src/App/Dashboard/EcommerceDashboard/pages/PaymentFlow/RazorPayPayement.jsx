import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../../../../../Common/Form/FormError";
import FormInput from "../../../../../Common/Form/FormInput";
import FormInputWithIcon from "../../../../../Common/Form/FormInputWithIcon";
import { patchInstituteInfo } from "../../../../../store/actions/businessInfo";
import DiscartPopUp from "../../Component/DiscartPopUp";
import ValidationFile from '../../../../../Classes/ValidationFile';
import { addBankAccountDetails } from '../../../../../store/actions/ecommerce/action/cartOrder';
import '../paymentFlow.scss';
import "../sidebar.scss";
import RozarPay from '../../assets/icons/rozarpay.png';
import RozarPayimage from '../../assets/icons/rozarpayImage.png';
import moment from "moment";
import { useRef } from "react";
import { useEffect } from "react";
import PaymentFlowPopUp from "../../Component/PaymentFlowPopUp";
const RazorPayPayement = () => {

  let dispatch = useDispatch();
  const discartRef = useRef(null);
  const openref = useRef(null);
  let date = new Date();

  const { user, getbusinessInfoSuccess, getbusinessInfoData, createRazorPayLoading, } = useSelector((state) => {
    return {
      user: state.user,
      getbusinessInfoSuccess: state.businessInfo.getInstituiteData.success,
      getbusinessInfoData: state.businessInfo.getInstituiteData.data,
      createRazorPayLoading: state.orderCartList.createRazorPayAccount.loading,
      createRazorPaySuccess: state.orderCartList.createRazorPayAccount.success,
      patchbusinessInfoSuccess: state.businessInfo.patchInstituteInfo.loaded
    };
  })
  const [razorPayAccountIDError, setRazorPayAccountIDError] = useState("");
  const [razorPayHas, setRazorPayHas] = useState(false);
  const [razorPayActivationDate, setRazorPayActivationDate] = useState("");
  const [razorPayKey, setRazorPayKey] = useState("");
  const [razorPaySecret, setRazorPaySecret] = useState("");
  const [razorPayAccountID, setRazorPayAccountID] = useState("");
  const [razorPayChangesAccountID, setRazorPayChangesAccountID] = useState("");
  const [razorPaySecretError, setRazorPaySecretError] = useState(false);
  const [razorPayKeyError, setRazorPayKeyError] = useState(false);
  const [registrationForm, setRegistrationForm] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('savings');
  const [accountBeneficiaryName, setAccountBeneficiaryName] = useState('');
  const [IFSCCode, setIFSCCode] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [businessName, setbusinessName] = useState("")
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [accountBeneficiaryNameError, setAccountBeneficiaryNameError] = useState(false);
  const [IFSCCodeError, setIFSCCodeError] = useState(false);
  const [accountEmailError, setAccountEmailError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [paymentFlowPopUp, setPaymentFlowPopUp] = useState(false);
  useEffect(() => {
    if (getbusinessInfoSuccess && getbusinessInfoData) {
      setRazorPayAccountID(getbusinessInfoData.razorpay_acount_id);
      setRazorPayChangesAccountID(getbusinessInfoData.razorpay_acount_id);
      setRazorPayActivationDate(getbusinessInfoData.razorpay_account_activation_date);
      setRazorPayKey(getbusinessInfoData.razorpay_api_key);
      setRazorPaySecret(getbusinessInfoData.razorpay_api_secret);
      setRazorPayHas(getbusinessInfoData.has_razorpay);
      setRazorPaySecretError(getbusinessInfoData.razorpay_api_secret ? false : true)
      setRazorPayKeyError(getbusinessInfoData.razorpay_api_key ? false : true)
      setAccountNumber(getbusinessInfoData.account_number)
      setAccountType(getbusinessInfoData.account_type)
      setAccountBeneficiaryName(getbusinessInfoData.account_beneficiary_name)
      setIFSCCode(getbusinessInfoData.account_ifsc_code)
      setAccountEmail(getbusinessInfoData.account_business_email)
      setbusinessName(getbusinessInfoData.business_name)
      setRegistrationForm(getbusinessInfoData.razorpay_acount_id || getbusinessInfoData.has_razorpay ? true : false)
    }
  }, [getbusinessInfoData, getbusinessInfoSuccess])

  const connectRazorpayKey = (e) => {
    e.preventDefault();
    if (!razorPayKeyError && !razorPaySecretError && !razorPayAccountIDError) {
      dispatch(patchInstituteInfo(user.user_business, {
        razorpay_api_key: razorPayKey,
        razorpay_api_secret: razorPaySecret,
        razorpay_account_activation_date: new Date(),
        razorpay_acount_id: razorPayChangesAccountID ? razorPayChangesAccountID : razorPayAccountID
      }, user.user_business_type, "", "", "", true))
    } else {
      setIsSubmitted(true)
    }
  }

  const HaveAnAccountHandle = (e) => {

    let inputChecked = e.target.checked;
    if (inputChecked) {
      setRazorPayHas(true)
      dispatch(patchInstituteInfo(user.user_business, { has_razorpay: true }, user.user_business_type, "", "", "", "", true))
    } else {
      setRazorPayHas(false)
      dispatch(patchInstituteInfo(user.user_business, { has_razorpay: false }, user.user_business_type, "", "", "", "", true))
    }
  }

  const onChangeAlreadyAccount = (value, type) => {
    if (type === "apiKey") {
      setRazorPayKey(value.trim())
      setRazorPayKeyError(ValidationFile.isEmpty(value.trim()))
    } else if (type === "apiSecret") {
      setRazorPaySecret(value.trim())
      setRazorPaySecretError(ValidationFile.isEmpty(value.trim()))
    } else {
      setRazorPayChangesAccountID(value.trim())
      setRazorPayAccountIDError(ValidationFile.isEmpty(value.trim()))
    }
  }

  const handleRegisterForm = () => {
    setRegistrationForm(!registrationForm);
    setAccountNumber("")
    setAccountBeneficiaryName("")
    setAccountType("")
    setIFSCCode("")
    setAccountEmail("")
    setRazorPayChangesAccountID("")
    setRazorPayKey("")
    setRazorPaySecret("")
  }

  const openPopUp = () => {
    discartRef.current.open()
  }
  const resetData = () => {

    setRegistrationForm(!registrationForm);
    setAccountNumber("")
    setAccountBeneficiaryName("")
    setAccountType("")
    setIFSCCode("")
    setAccountEmail("")

  }
  const onclosePaymentFlowPopUp = () => {
    setPaymentFlowPopUp(!paymentFlowPopUp)
  }
  const oncloseDiscardPopup = () => {
    setRegistrationForm(!registrationForm);
    setAccountNumber("")
    setAccountBeneficiaryName("")
    setAccountType("")
    setIFSCCode("")
    setAccountEmail("")
  }

  // const onclosePaymentFlowPopUp = () => {
  //   setPaymentFlowPopUp(!paymentFlowPopUp)
  // }

  const createRazorPayAccountHandler = (e) => {
    e.preventDefault();
    if (ValidationFile.isEmpty(accountNumber)) {
      setAccountNumberError(true)
    }
    if (ValidationFile.isEmpty(accountBeneficiaryName)) {
      setAccountBeneficiaryNameError(true)
    }
    if (ValidationFile.isEmpty(IFSCCode)) {
      setIFSCCodeError(true)
    }
    if (ValidationFile.isEmpty(accountEmail)) {
      setAccountEmailError(true)
    }
    if (ValidationFile.isNotEmpty(accountNumber) && ValidationFile.isNotEmpty(accountEmail) && ValidationFile.isNotEmpty(accountBeneficiaryName) && ValidationFile.isNotEmpty(IFSCCode) && user.user_business && ValidationFile.isNotEmpty(businessName) && !ValidationFile.containsSpecialChars(businessName)) {
      const body = {
        account_number: accountNumber.trim(),
        account_type: accountType,
        account_beneficiary_name: accountBeneficiaryName,
        account_ifsc_code: IFSCCode.trim(),
        account_business_email: accountEmail.trim(),
        razorpay_onboarding_account_name: businessName,
      };
      dispatch(addBankAccountDetails(user.user_business, body));
      // console.log(openref.current)
      openref.current.open()
    }
  };

  return (
    <React.Fragment>
      <div className='mt-36'>
        <div className='cod-wrapper'>
          <div className='cod-leftSidebar'>
            <div className='cod-icon-div'>
              <img src={RozarPay} alt="codIcon" />
            </div>
            <div className='cod-text-div'>
              <img src={RozarPayimage} alt="" />
              <p className='text-xxs w-300 lgray'>Connect your website with Razorpay for clients to make online payments. </p>
            </div>
          </div>
          <div className='cod-rightSidebar'>
            {
              razorPayAccountID && moment(date, "DD-MM-YYYY") > moment(razorPayActivationDate, "DD-MM-YYYY").add(1, 'days') ? (
                <>
                  <small className="status-payment primary">Processing</small>
                </>
              ) : (
                <>  {razorPayAccountID && moment(date, "DD-MM-YYYY") < moment(razorPayActivationDate, "DD-MM-YYYY").add(1, 'days') ? (
                  ""
                ) : (
                  <>{registrationForm && razorPayHas ? (
                    <div className='btn-paymentFlow-wrapper'>
                      <button className='button btn-o-gray btn-xs' onClick={handleRegisterForm}>Cancel</button>
                      <button
                        className='button button-primary btn-xs'
                        onClick={(e) => { connectRazorpayKey(e) }}
                      >
                        Connect
                      </button>
                    </div>
                  ) : (
                    <React.Fragment>
                      {registrationForm && !razorPayHas ? (
                        <React.Fragment>
                          <div className="group-wrap">
                            <button
                              className='button btn-o-gray btn-xs'
                              onClick={openPopUp}
                            >
                              Cancel
                            </button>
                            {createRazorPayLoading ?
                              <button className='button button-primary btn-xs'>Loading...</button>
                              :
                              <button
                                className='button button-primary btn-xs'
                                // disabled={disabledState}
                                onClick={(e) => { createRazorPayAccountHandler(e) }}
                              >
                                Connect
                              </button>
                            }
                          </div>
                        </React.Fragment>

                      ) : (
                        <button type="submit" className={`button btn-xs button-primary ${registrationForm ? "buttonHide" : ''}`}
                          onClick={handleRegisterForm}
                        >
                          Connect
                        </button>
                      )
                      }
                    </React.Fragment>
                  )
                  }
                  </>
                )
                }
                </>
              )
            }
          </div>
        </div>


        {registrationForm &&
          <div className='paymentPage-container mt-5'>
            <div className='checkbox-wrap inline align-center mb-20'>
              <input type="checkbox" disabled={razorPayAccountID} checked={razorPayHas} onChange={(e) => HaveAnAccountHandle(e)} />
              <p className='text-xs w-300 base'>Check the box if you already have an existing Razorpay account.</p>
            </div>
            {
              razorPayHas ? (
                <>
                  <div className='form-wrap'>
                    <div className="formFieldwrap width-50">
                      <FormInputWithIcon type="text"
                        labelPosition="top"
                        label="Account API Key"
                        placeholder="Enter Your API Key"
                        disabled={razorPayAccountID}
                        value={razorPayKey}
                        onChange={(e) => onChangeAlreadyAccount(e.target.value, "apiKey")}
                      />
                      <FormError error="Account API Key required." show={razorPayKeyError && isSubmitted} />
                    </div>
                    <div className="formFieldwrap width-50">
                      <FormInputWithIcon type="text"
                        labelPosition="top"
                        label="Account Secret Key"
                        placeholder="Enter Secret Key"
                        value={razorPaySecret}
                        disabled={razorPayAccountID}
                        onChange={(e) => onChangeAlreadyAccount(e.target.value, "apiSecret")}
                      />
                      {/* <FormError className='secondary' show={razorPayAccountID && razorPaySecret} onClick={() => onChangeAlreadyAccount("", "apiSecret")}>generate new key</FormError> */}
                      <FormError error="Account Secret Key required." show={razorPaySecretError && isSubmitted} />
                    </div>
                    <div className="formFieldwrap width-50">
                      <FormInput type="text"
                        placeholder="Enter your Merchant Id"
                        value={razorPayChangesAccountID}
                        disabled={razorPayAccountID}
                        onChange={(e) => { onChangeAlreadyAccount(e.target.value, "razorpayAccountId") }}
                      />
                      <FormError error="Account Merchant Id required." show={razorPayAccountIDError} />
                    </div>
                  </div>
                </>
              ) : (
                <form action="">
                  <div className='form-wrap'>
                    <div className="formFieldwrap width-50">
                      <p className='text-xs w-500 base pb-10'>Account Number*</p>
                      <FormInput type="text"
                        placeholder="Enter your bank account number"
                        disabled={razorPayAccountID}
                        value={accountNumber}
                        onChange={(e) => { setAccountNumber(e.target.value?.trim()) }}
                        onKeyUp={(e) => { setAccountNumber(e.target.value) }}
                      />
                      <FormError error="Account Number required." show={accountNumberError} />
                    </div>

                    <div className="formFieldwrap width-50">

                      <p className='text-xs w-500 base pb-10'>Beneficiary Name*</p>

                      <FormInput type="text"
                        placeholder="Enter your Beneficiary Name"
                        disabled={razorPayAccountID}
                        value={accountBeneficiaryName}
                        onChange={(e) => { setAccountBeneficiaryName(e.target.value) }}
                      />
                      <FormError error="Account Holder Name required." show={accountBeneficiaryNameError} />
                    </div>
                  </div>

                  <div className='paymentFlow-radio-wrap'>
                    <div className='input-custom-type inline'>
                      <label className={accountType === 'savings' ? 'small active-radio' : 'small'}>
                        <input type="radio"
                          disabled={razorPayAccountID}
                          value={'savings'}
                          checked={accountType === 'savings'}
                          onChange={(e) => { setAccountType(e.target.value) }}
                        />
                        Savings Account </label>
                    </div>
                    <div className='input-custom-type inline'>
                      <label className={accountType === 'current' ? 'small active-radio' : 'small'}>
                        <input type="radio"
                          disabled={razorPayAccountID}
                          value={'current'}
                          checked={accountType === 'current'}
                          onChange={(e) => { setAccountType(e.target.value) }}
                        />
                        Current Account </label>
                    </div>
                  </div>
                  <div className='form-wrap mt-20'>
                    <div className="formFieldwrap width-50 ">
                      <p className='text-xs w-500 base pb-10'>IFSC Code*</p>
                      <FormInput type="text"
                        placeholder="Enter your bank IFSC Code"
                        disabled={razorPayAccountID}
                        value={IFSCCode}
                        onChange={(e) => { setIFSCCode(e.target.value?.trim()) }}
                      />
                      <FormError error="Account IFSC required." show={IFSCCodeError} />
                    </div>

                    <div className="formFieldwrap width-50 ">
                      <p className='text-xs w-500 base pb-10'>Email Address*</p>
                      <FormInput type="text"
                        placeholder="Enter your email address"
                        disabled={razorPayAccountID}
                        value={accountEmail}
                        onChange={(e) => { setAccountEmail(e.target.value?.trim()) }}
                      />
                      <FormError error="Account Email required." show={accountEmailError} />
                    </div>
                  </div>

                  <DiscartPopUp onclose={() => oncloseDiscardPopup()} discartRef={discartRef} closeregistrationform={() => setRegistrationForm(!registrationForm)} resetData={() => resetData()} />
                  <PaymentFlowPopUp openref={openref} onclose={() => onclosePaymentFlowPopUp()} business={getbusinessInfoData?._id} d="openref" accountNumber={accountNumber} accountEmail={accountEmail} account_beneficiary_name={accountBeneficiaryName} IFSCCode={IFSCCode} accountType={accountType} />
                </form>
              )
            }

            {razorPayAccountID ?

              <React.Fragment>
                {moment(date, "DD-MM-YYYY") < moment(razorPayActivationDate, "DD-MM-YYYY").add(1, 'days') ?
                  <div className='toast-div'>
                    <p className='text-xxs w-500 primary'> Account Activated!
                    </p>
                  </div>
                  :
                  <div className="SuccessForm-wrap mt-20">
                    <p>It usually takes us 2-3 days to connect your razorpay account to your website. Your details are safe with us!</p>
                  </div>
                }
              </React.Fragment>
              : ""
            }
          </div>

        }
      </div >
    </React.Fragment >
  )
}
export default RazorPayPayement