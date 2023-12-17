import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ValidationFile from '../../../Classes/ValidationFile';
import ValidationUtils from '../../../Classes/ValidationUtils';
import Dialog from '../../../Common/Dialog';
import DialogBody from '../../../Common/Dialog/DialogBody';
import FormError from '../../../Common/Form/FormError';
import FormTextArea from '../../../Common/Form/FormTextArea';
import { geteditAppListStatus } from '../../../store/actions/bookAppointment';
import "./bookAppointment.style.scss"

const CancelBookingPopup = ({ onCloseCancel, cancelBokingRef, viewDetails }) => {
  const { businesstype } = useSelector((state) => {
    return {
      businesstype: state.user.user_business_type
    }
  })
  const closeModel = () => {
    onCloseCancel()
    setCancelReason("")
  }

  const [cancelReasonError, setCancelReasonError] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const dispatch = useDispatch();

  const handleCancelReason = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setCancelReason(value);
    setCancelReasonError(ValidationUtils.isEmpty(value));
  }
  const handlProcedButton = () => {
    if (ValidationUtils.isEmpty(cancelReason)) {
      setCancelReasonError(true);
    }
    if (ValidationUtils.isNotEmpty(cancelReason)) {
      dispatch(geteditAppListStatus(viewDetails._id, businesstype, { isStatus: "Cancelled", cancelReason: cancelReason, }));
      onCloseCancel()
      setCancelReason("")
      // setIsFilled(false);
    }
  }


  return (
    <Dialog ref={cancelBokingRef} Position="center" slide="center" ClosePopUp={closeModel}>
      {/* <ModalHeader title={"Cancel booking"} className="bgPopup" /> */}
      <DialogBody>
        <h3 className="text-s w-500 base mb-10">Cancel booking</h3>
        <hr />
        <h4 className="text-xs w-400 base mb-20 mt-15">Are you sure you want to cancel this booking?</h4>
        <form className="cancelBooking-wrap">
          <div>
            <FormTextArea
              type="text"
              name="Message"
              label="Message"
              placeholder="Write the reason for cancellation"
              onChange={handleCancelReason}
              onKeyUp={handleCancelReason}
              value={cancelReason}
            />
            <FormError
              show={cancelReasonError}
              error="Reason cannot be empty."
            />
          </div>
          <span className="text-3xs w-400 mb-20">Note : This message will be sent to the user to notify about their cancelled booking.</span>
          <div className="inline end-xs">
            <div className="button_group">
              <button className="button btn-o-primary btn-xs" type="button" onClick={closeModel} >Cancel</button>
              <button className="button button-primary btn-xs" type="button" onClick={handlProcedButton}>Proceed</button>
            </div>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  )
}

export default CancelBookingPopup