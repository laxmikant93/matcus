import React, { useEffect } from 'react'
import Modals from '../../../../../Common/Modals'
import ModalsHeader from '../../../../../Common/Modals/ModalsHeader';
import ModalsBody from '../../../../../Common/Modals/ModalsBody';
import FormInput from '../../../../../Common/Form/FormInput';
import FormError from '../../../../../Common/Form/FormError';
import FormTextArea from '../../../../../Common/Form/FormTextArea';
import { useState } from 'react';
import ValidationFile from '../../../../../Classes/ValidationFile';
import { useDispatch, useSelector } from 'react-redux';
import { shippingDetails } from '../../../../../store/actions/ecommerce/action/cartOrder';
import './failedordershippingpopup.scss'
const FailedOrderShippingPopup = ({ openref, onclose, orderId, setShowToast, item }) => {

  const dispatch = useDispatch();

  const { shippingOrderLoading, shippingOrderSuccess, updateDeliverFailedSubOrderLoaded, updateDeliverFailedSubOrderSuccess } = useSelector((state) => {
    return {
      shippingOrderLoading: state.orderCartList.customerOrderDetail.loading,
      shippingOrderSuccess: state.orderCartList.customerOrderDetail.success,
      updateDeliverFailedSubOrderLoaded: state.orderCartList.updateDeliverFailedSubOrder.loaded,
      updateDeliverFailedSubOrderSuccess: state.orderCartList.updateDeliverFailedSubOrder.success
    }
  })

  const [failedReason, setFailedReason] = useState("");

  const [failedReasonError, setFailedReasonError] = useState(false);


  const closeModal = () => {
    onclose();
    setFailedReason("");
    setFailedReasonError(false);
  }

  const getAllSubOrders = (item) => {
    // console.log("item,item", item.data)
    let all = [];
    if (item?.data?.length > 0) {
      for (let i = 0; i < item.data.length; i++) {
        all.push(item.data[0].suborderId)
      }
    }
    return all
  }
  const handleNOButton = () => {
    openref.current.close();
    setFailedReason("");
    setFailedReasonError(false);
  }

  const handleInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setFailedReason(value);
    setFailedReasonError(ValidationFile.isEmpty(value));
  }

  const handleYesButton = () => {
    if (ValidationFile.isEmpty(failedReason)) {
      setFailedReasonError(true);
    }
    if (ValidationFile.isNotEmpty(failedReason)) {
      const data = {
        Status: "Failed",
        order_failure_date: new Date(),
        cancellaion_reason: failedReason
      };
      dispatch(shippingDetails(orderId, data));
      setShowToast(true);
    }
  }

  useEffect(() => {
    if (shippingOrderSuccess) {
      openref.current.close();
      setFailedReason("");
      setFailedReasonError(false);
    }
  }, [openref, shippingOrderSuccess])


  // console.log("suborders",suborders)


  return (
    <React.Fragment>
      <Modals ref={openref} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
        <ModalsHeader title={'Order Failed Confirmation'} />
        <ModalsBody>
          <div className='paymenntDetails-container mt-5'>
            <div>
              <p className='heading-title w-500 base'>
                Are you sure you want to mark this order as failed?
              </p>
              <div>
                <p className='text-xs w-400 base mt-20 mb-10'>
                  Message
                </p>
                <FormTextArea
                  type='text' placeholder='Write the reason for failed'
                  name='partner'
                  value={failedReason}
                  rows={4}
                  onChange={handleInput}
                >
                </FormTextArea>
                <FormError
                  show={failedReasonError}
                  error="please enter failed reason"
                />
                <p className='text-3xs w-400'> Note : This message will be sent to the user to notify about their rejected booking. </p>
                <div className='failed-buttons-wrapper'>
                  <button className='button btn-xs btn-o-gray mr-15 '
                    onClick={handleNOButton}
                  >
                    No
                  </button>
                  {shippingOrderLoading ?
                    <button className='primary button btn-sm button-primary  '>
                      loading...
                    </button>
                    :
                    <button className='primary button btn-sm  button-primary'
                      onClick={handleYesButton}
                    >
                      Yes
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </ModalsBody>
      </Modals>
    </React.Fragment>
  )
}

export default FailedOrderShippingPopup
