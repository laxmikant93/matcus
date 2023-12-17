import React, { useState } from 'react'
import './rejectproductpopup.scss'
import Modals from '../../../../../Common/Modals'
import ModalHeader from '../../../../../Common/Modals/ModalsHeader'
import ModalBody from '../../../../../Common/Modals/ModalsBody'
import FormTextArea from '../../../../../Common/Form/FormTextArea'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { orderListReject, customerOrderDetail } from '../../../../../store/actions/ecommerce/action/cartOrder'
import ValidationFile from '../../../../../Classes/ValidationFile'
import FormError from '../../../../../Common/Form/FormError'
const RejectProductPopup = ({ openpopup, onclose, orderId, setShowToast }) => {

  const dispatch = useDispatch();

  const { RejectOrderLoading, RejectOrderSuccess } = useSelector((state) => {
    return {
      RejectOrderLoading: state.orderCartList.orderListReject.loading,
      RejectOrderSuccess: state.orderCartList.orderListReject.success,
    }
  })

  const [RejectedReason, setRejectedReason] = useState("");

  const [RejectedReasonError, setRejectedReasonError] = useState(false);

  const handleNOButton = () => {
    openpopup.current.close();
    setRejectedReason("");
    setRejectedReasonError(false);
  }

  const handleInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setRejectedReason(value);
    setRejectedReasonError(ValidationFile.isEmpty(value));
  }

  const handleYesButton = () => {
    if (ValidationFile.isEmpty(RejectedReason)) {
      setRejectedReasonError(true);
    }
    if (ValidationFile.isNotEmpty(RejectedReason)) {
      const data = {
        Status: "Rejected",
        // order_failure_date: new Date(),
        rejection_reason: RejectedReason
      };
      dispatch(orderListReject(orderId, data));
      setShowToast(true);
    }
  }

  useEffect(() => {
    if (RejectOrderSuccess) {
      // dispatch(customerOrderDetail(orderId)); 
      openpopup.current.close();
      setRejectedReason("");
      setRejectedReasonError(false);
    }
  }, [openpopup, RejectOrderSuccess])

  // const closeModal = () => {
  //   onclose();
  // }
  return (
    <div>
      <Modals ref={openpopup} Position="center" slide="top" ClosePopUp={() => handleNOButton()} ModalsSize={'modal-s'}>
        <ModalHeader title={'Order Reject Confirmation'} />
        <ModalBody>
          <div className='reject-popup-wrapper'>
            <p className='reject-msg-item base w-500'>Are you sure you want to reject this order?</p>
            <p className='text-xxs w-500 base pT-20'>Message</p>
            <div className='mt-10 form-area-wrapper'>
              <FormTextArea
                type="text"
                name="Message"
                value={RejectedReason}
                onChange={(e) => handleInput(e)}
                placeholder="Write the reason for rejecting this order"
                rows="3"
                className="form-item"
                maxlength="320"
              />
              <FormError
                show={!RejectedReasonError.isValid && RejectedReasonError}
                error="Please Enter Your Reason."
                className="mb-5"
              />
            </div>
            <p className='text-3xs w-400 warning-note-item'>Note : This message will be sent to the user to notify about their rejected order.</p>
            <div className='inline reject-popup-button-wrapper mt-25 '>
              <div>
                <button className='button btn-xs btn-o-base btn-oval ' onClick={handleNOButton}>No</button>
              </div>
              <div>
                {
                  RejectOrderLoading ? (
                    <button className='button button-primary btn-xs btn-oval'>Loading...</button>
                  ) : <button className='button button-primary btn-xs btn-oval' onClick={handleYesButton}>Yes</button>
                }
              </div>
            </div>
          </div>
        </ModalBody>
      </Modals>
    </div>
  )
}


export default RejectProductPopup