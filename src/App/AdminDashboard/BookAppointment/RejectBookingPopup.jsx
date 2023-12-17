import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ValidationFile from '../../../Classes/ValidationFile';
import ValidationUtils from '../../../Classes/ValidationUtils';
import FormError from '../../../Common/Form/FormError';
import FormTextArea from '../../../Common/Form/FormTextArea';
import Dialog from '../../../Common/Dialog';
import DialogBody from '../../../Common/Dialog/DialogBody';
import { geteditAppListStatus } from '../../../store/actions/bookAppointment';
import "./bookAppointment.style.scss"

const RejectBookingPopup = ({ onCloseRejeact, RejectBokingRef, viewDetails }) => {
  const [reject_ReasonError, setReject_ReasonError] = useState("");
  const [reject_Reason, setReject_Reason] = useState("");
  const { businesstype } = useSelector((state) => {
    return {
      businesstype: state.user.user_business_type
    }
  })
  const dispatch = useDispatch();

  //FUNCTION ON REJECT POPUP INPUT
  const handleRejectReasonInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setReject_Reason(value);
    setReject_ReasonError(ValidationUtils.isEmpty(value));
  }

  const handleRejectButton = () => {
    if (ValidationUtils.isEmpty(reject_Reason)) {
      setReject_ReasonError(true);
    }
    if (ValidationUtils.isNotEmpty(reject_Reason)) {
      dispatch(geteditAppListStatus(viewDetails._id, businesstype, { isStatus: "Rejected", reject_reason: reject_Reason }));
      onCloseRejeact()
      setReject_Reason("")
      // closeModel()
      // setIsFilled(false);
    }
  }

  const closeModel = () => {
    onCloseRejeact()
    setReject_Reason("")

  }

  return (
    <Dialog ref={RejectBokingRef} Position="center" slide="center"
      ClosePopUp={closeModel}
      ModalsSize="sm">
      {/* <ModalHeader title={"Reject booking"} className="bgPopup" /> */}
      <DialogBody>
        <h3 className="text-s w-500 base mb-10">Reject booking</h3>
        <hr />
        <h4 className="text-xs w-400 base mb-10 mt-15">Are you sure you want to reject this booking?</h4>
        <form className="cancelBooking-wrap">
          <div>
            <FormTextArea
              type="text"
              name="Message"
              label="Message"
              onChange={handleRejectReasonInput}
              onKeyUp={handleRejectReasonInput}
              value={reject_Reason}
              placeholder="Write the reason for rejection"
            />
            <FormError
              show={reject_ReasonError}
              error="Reason cannot be empty."
            />
          </div>
          <div className="text-3xs w-400 mb-20">Note : This message will be sent to the user to notify about their rejected booking.</div>
          <div className="inline end-xs">
            <div className="button_group">
              <button className="button btn-o-primary btn-xs" type="button" onClick={closeModel}>Cancel</button>
              <button className="button button-primary btn-xs" type="button" onClick={handleRejectButton}>Reject</button>
            </div>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  )
}

export default RejectBookingPopup