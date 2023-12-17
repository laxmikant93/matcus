import React, { useState } from "react";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import './bookAppointment.style.scss'

export default function PaymentPreferences({ closeModal, show }) {

  const CloseHandle = () => {
    closeModal()
  }
  return (
    <div className="PTH-Item">
      <Modal show={show}>
        <ModalBody>
          <ModalHeader
            closeButton={true}
            onclose={() => closeModal()}
          />
          <h1>Payment Preferences</h1>
          <h2>How do you want your client to pay for this service?</h2>
          <div className="radioButton_grid">
            <label className="small">
              <input
                type="radio"
                name="Entire"
                value="person"
              />
              Entire amount in person
            </label>
            <label className="small">
              <input
                type="radio"
                name="Entire"
                value="amount"
              />
              Entire amount in Online
            </label>
            <label className="small">
              <input
                type="radio"
                name="Entire"
                value="Eitherperson"
              />
              Either in person or online
            </label>
          </div>
          <div className="justify-end">
            <button className="button button-o-primary mr-10">Cancel</button>
            <button className="button button-primary">Save</button>
          </div>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </div>
  )
}

