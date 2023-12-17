import React from 'react'
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import { useNavigate } from "react-router-dom";

function ModalfeeStructureExist({ show, setShow }) {
  const history = useNavigate();

  const CloseScheduleClassModal = () => {
    setShow(!show)
    history("/");
  }

  return (
    <Modal show={show} setShow={setShow}>
      <ModalHeader closeButton={true}
        onclose={() => CloseScheduleClassModal()}>

      </ModalHeader>
      <ModalBody className="EditService-MBody">
        <h3 className="text-sm w-300">Please publish your first fee structure.</h3>
      </ModalBody>
      <ModalFooter>
        <a href='/add-lms-fee-structure' className="button btn-o-primary primary btn-md">
          Create Fee Structure
        </a>
      </ModalFooter>
    </Modal>
  )
}

export default ModalfeeStructureExist