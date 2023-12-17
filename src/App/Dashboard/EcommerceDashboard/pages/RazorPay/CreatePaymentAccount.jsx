import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ValidationFile from '../../../../../Classes/ValidationFile';
import FormError from '../../../../../Common/Form/FormError';
import FormInput from '../../../../../Common/Form/FormInput';
import { addBankAccountDetails, createRazorPayAccount, resetAddBankAccountDetails, resetCreateRazorPayAccount } from '../../../../../store/actions/ecommerce/action/cartOrder';
// import '../Payment/initialPaymentPage.scss';
import './paymentDetails.scss';

const CreatePaymentAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('savings');
  const [accountBeneficiaryName, setAccountBeneficiaryName] = useState('');
  const [IFSCCode, setIFSCCode] = useState('');

  const [accountNumberError, setAccountNumberError] = useState('');
  const [accountTypeError, setAccountTypeError] = useState('');
  const [accountBeneficiaryNameError, setAccountBeneficiaryNameError] = useState('');
  const [IFSCCodeError, setIFSCCodeError] = useState('');
  const user = useSelector((state) => state.user);
  // const { data: userData, success } = useSelector((state) => state.businessInfo.ecomWebsite)
  const { createRazorPayLoading, createRazorPaySuccess, addAccountLoading, addAccountSuccess } = useSelector((state) => {
    return {
      createRazorPayLoading: state.orderCartList.createRazorPayAccount.loading,
      createRazorPaySuccess: state.orderCartList.createRazorPayAccount.success,
      addAccountLoading: state.orderCartList.addBankDetails.loading,
      addAccountSuccess: state.orderCartList.addBankDetails.success,
    }
  })
  const dispatch = useDispatch();
  const history = useNavigate()
  useEffect(() => {
    setAccountNumber(user.user_account_number ? user.user_account_number : "")
    setAccountType(user.user_account_type ? user.user_account_type : "")
    setAccountBeneficiaryName(user.user_account_beneficiary_name ? user.user_account_beneficiary_name : "")
    setIFSCCode(user.user_account_ifsc_code ? user.user_account_ifsc_code : "")

  }, [user.user_account_beneficiary_name, user.user_account_ifsc_code, user.user_account_number, user.user_account_type]);

  const createRazorPayAccountHandler = (e) => {
    e.preventDefault();
    if (ValidationFile.isEmpty(accountNumber)) {
      setAccountNumberError(true)
    }
    if (ValidationFile.isEmpty(accountType)) {
      setAccountTypeError(true)
    }
    if (ValidationFile.isEmpty(accountBeneficiaryName)) {
      setAccountBeneficiaryNameError(true)
    }
    if (ValidationFile.isEmpty(IFSCCode)) {
      setIFSCCodeError(true)
    }
    if (ValidationFile.isNotEmpty(accountNumber) && ValidationFile.isNotEmpty(accountType) && ValidationFile.isNotEmpty(accountBeneficiaryName) && ValidationFile.isNotEmpty(IFSCCode) && user.user_business) {
      const body = {
        account_number: accountNumber.trim(),
        account_type: accountType,
        account_beneficiary_name: accountBeneficiaryName,
        account_ifsc_code: IFSCCode.trim()
      };
      dispatch(addBankAccountDetails(user.user_business, body));
    }
  };


  const activateRazorPayAccountHandler = (e) => {
    e.preventDefault();
    if (ValidationFile.isEmpty(accountNumber)) {
      setAccountNumberError(true)
    }
    if (ValidationFile.isEmpty(accountType)) {
      setAccountTypeError(true)
    }
    if (ValidationFile.isEmpty(accountBeneficiaryName)) {
      setAccountBeneficiaryNameError(true)
    }
    if (ValidationFile.isEmpty(IFSCCode)) {
      setIFSCCodeError(true)
    }
    if (user.user_account_number) {
      dispatch(createRazorPayAccount(user.user_business));
    }
  }
  const [disabledState, setDisabledState] = useState(false)
  useEffect(() => {
    if (user.user_razorpay_id) {
      setDisabledState(true)
    }
  }, [user.user_razorpay_id])
  useEffect(() => {
    if (!user.user_business_business_shop_category.length) {
      history('/ecommerce/businessInfo')
    }
  }, [history, user.user_business_business_shop_category.length])
  useEffect(() => {
    if (createRazorPaySuccess) {
      history('/')
    }
  }, [createRazorPaySuccess, history])
  useEffect(() => {
    return () => {
      dispatch(resetAddBankAccountDetails())
      dispatch(resetCreateRazorPayAccount())
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <div className='containerTrue mt-24 payment-wrapper'>
        <div className='paymentPage-container'>
          <div className='paymentPage-wrap'>
            <form action="">
              <p className='mb-15 text-s w-500'>Create your RazorPay Account(<span className='text-xxs  w-300 red'>*Account details can't be changed once it's activated</span>)</p>
              <div className="formFieldwrap">
                <FormInput type="text" disabled={disabledState} placeholder="Account Number" value={accountNumber} onChange={(e) => { setAccountNumber(e.target.value?.trim()) }} onKeyUp={(e) => { setAccountNumber(e.target.value) }} label="Account Number" />
                <FormError error="Account Number required." show={accountNumberError} />
              </div>
              <div className="formFieldwrap addProduct-align-div">
                {/* <FormInput type="text" disabled={disabledState} placeholder="Account Type" value={accountType} onChange={(e) => { setAccountType(e.target.value) }} onKeyUp={(e) => { setAccountType(e.target.value) }} /> */}
                <select
                  id="weightSelect paymenttype-select"
                  onChange={(e) => { setAccountType(e.target.value) }}
                  value={accountType}
                  disabled={disabledState}
                >
                  <option >Select Account Type</option>
                  <option value={'savings'}>savings</option>
                  <option value={'current'}>current</option>
                </select>
                <FormError error="Account Type required." show={accountTypeError} />
              </div>
              <div className="formFieldwrap">
                <FormInput type="text" disabled={disabledState} placeholder="Account Holder Name" value={accountBeneficiaryName} onChange={(e) => { setAccountBeneficiaryName(e.target.value) }} label="Account Holder Name" />
                <FormError error="Account Holder Name required." show={accountBeneficiaryNameError} />
              </div>
              <div className="formFieldwrap">
                <FormInput type="text" disabled={disabledState} placeholder="IFSC Code" value={IFSCCode} onChange={(e) => { setIFSCCode(e.target.value?.trim()) }} label="IFSC Code" />
                <FormError error="Account IFSC required." show={IFSCCodeError} />
              </div>
              {
                addAccountLoading ? <button className='button button-o-primary btn-sm margin-right-p'>Loading...</button> :
                  <React.Fragment>
                    <button disabled={disabledState} className='button button-primary btn-sm' onClick={(e) => { createRazorPayAccountHandler(e) }}>Submit </button>
                  </React.Fragment>
              }

              {user.user_account_number && <React.Fragment>
                {
                  createRazorPayLoading ?
                    <button className='button button-o-primary btn-sm'>Loading...</button>
                    :
                    <button disabled={disabledState} className='button button-primary btn-sm' onClick={(e) => { activateRazorPayAccountHandler(e) }}>
                      Create
                    </button>
                }
              </React.Fragment>}
            </form>
          </div>

        </div>

      </div>
    </React.Fragment>
  )
}

export default CreatePaymentAccount;