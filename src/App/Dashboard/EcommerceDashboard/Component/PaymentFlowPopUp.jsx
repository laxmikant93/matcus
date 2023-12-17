import React from 'react';
import Modals from '../../../../Common/Modals';
import ModalsHeader from '../../../../Common/Modals/ModalsHeader';
import ModalsBody from '../../../../Common/Modals/ModalsBody';
import './paymentFlowPopUp.scss'
import { createRazorPayAccount } from '../../../../store/actions/ecommerce/action/cartOrder';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getInstituteData } from '../../../../store/actions/businessInfo';
const PaymentFlowPopUp = ({ onclose, business, openref, accountNumber, accountEmail, account_beneficiary_name, IFSCCode, accountType }) => {

  let dispatch = useDispatch();
  const { user, createRazorPaySuccess, } = useSelector((state) => {
    return {
      user: state.user,
      createRazorPaySuccess: state.orderCartList.createRazorPayAccount.success,
    };
  })

  const closeModal = () => {
    onclose();
  }

  const closeModalPopup = () => {
    openref.current.close();
  }

  const handleSaveButton = () => {
    dispatch(createRazorPayAccount(business));
    openref.current.close();
  }

  useEffect(() => {
    if (createRazorPaySuccess) {
      dispatch(getInstituteData(user.user_business, user.user_business_type));
    }
  }, [createRazorPaySuccess, dispatch, user.user_business, user.user_business_type])


  return (
    <React.Fragment>
      <Modals ref={openref} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
        <ModalsHeader title={'Account details confirmation'} />
        <ModalsBody>
          <div className='paymenntDetails-container mt-10'>
            <p className='text-xs w-400 base'>Please review your information below.</p>
            <div className='paymentdetails-div'>
              <div className='paymnet-details'>
                <p className='text-xs w-600 base'>Account Number</p>
                <p className='text-xxs w-300 base mt-5'>{accountNumber}</p>
              </div>
              <div className='paymnet-details'>
                <p className='text-xs w-600 base'>Beneficiary name</p>
                <p className='text-xxs w-300 base mt-5'>{account_beneficiary_name}</p>
              </div>
              <div className='paymnet-details'>
                <p className='text-xs w-600 base'>IFSC Code</p>
                <p className='text-xxs w-300 base mt-5'>{IFSCCode}</p>
              </div>
              <div className='paymnet-details'>
                <p className='text-xs w-600 base'>Account Type</p>
                <p className='text-xxs w-300 base mt-5'>{accountType}</p>
              </div>
              <div className='paymnet-details'>
                <p className='text-xs w-600 base'>Email Address</p>
                <p className='text-xxs w-300 base mt-5'>{accountEmail}</p>
              </div>
            </div>
            <div className='payment-btn-wrapper'>
              <button className='button btn-sm btn-o-gray ' onClick={closeModalPopup}>No</button>
              <button className='button btn-sm button-primary' onClick={handleSaveButton}>Save</button>
            </div>
          </div>
        </ModalsBody>

      </Modals>
    </React.Fragment>
  )
}

export default PaymentFlowPopUp