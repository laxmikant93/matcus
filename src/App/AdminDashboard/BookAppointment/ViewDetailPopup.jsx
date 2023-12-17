import moment from 'moment';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import AppLink from '../../../Common/AppLink';
import FormTextArea from '../../../Common/Form/FormTextArea';
import Modals from '../../../Common/Modals';
import ModalBody from '../../../Common/Modals/ModalsBody';
import ModalHeader from '../../../Common/Modals/ModalsHeader';
import AddAppointmentPopup from './AddAppointmentPopup';
import "./bookAppointment.style.scss"

const ViewDetailPopup = ({ onCloseViewDetails, viewDetailRef, viewDetails }) => {
  const addEditRef = useRef(null)
  const [newData, setNewData] = useState(viewDetails.service)
  const ShowHandlePopup = () => {
    addEditRef.current.open()
  }

  const closeModel = () => {
    onCloseViewDetails()
  }

  return (
    <Modals ref={viewDetailRef} Position="center" slide="center" ClosePopUp={closeModel} ModalsSize="sm">
      <ModalHeader title={"View Details"} className="bgPopup" >
        <button onClick={() => ShowHandlePopup()} className="edit-button"><i className="icon-edit"></i> Edit Details</button>
      </ModalHeader>
      <ModalBody>
        <div className="view-detail_wrap">


          <div className="column">
            <h5>First Name</h5>
            <p>{viewDetails.full_name}</p>
          </div>
          <div className="column">
            <h5>Mobile Number</h5>
            <p>{viewDetails.contact}</p>
          </div>
          <div className="column">
            <h5>Email address</h5>
            <p>{viewDetails.email}</p>
          </div>
          <div className="column">
            <h5>Service</h5>
            <p>{viewDetails?.service?.title}</p>
          </div>
          {/* <div className="column">
            <h5>Doctor</h5>
            <p>{viewDetails.contact}</p>
          </div> */}
          <div className="column">
            <h5>Time Slot</h5>
            <p>{viewDetails.booking_time}</p>
          </div>
          <div className="column">
            <h5>Date</h5>
            <p>{moment(viewDetails.booking_date).format("DD-MM-YYYY")}</p>
          </div>
          <div className="column">
            <h5>Status</h5>
            <p>{viewDetails.isStatus}</p>
          </div>
          <div className="column">
            <div className="mt-10">
              <button className="column button button-primary btn-sm" onClick={closeModel}>Done</button>
            </div>
          </div>
        </div>
        {/* <div className="inline end-xs">
          <button className="column button button-primary btn-sm">Done</button>
        </div> */}
        <AddAppointmentPopup onCloseAddedit={() => onCloseViewDetails()} addEditRef={addEditRef} edit={true} viewDetails={viewDetails} />
      </ModalBody>
    </Modals>
  )
}

export default ViewDetailPopup