import React, { useState } from "react";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import PersonalDetail from "./PersonalDetail";
import BasicDetail from "./BasicDetail";
import Storage from "../../../Classes/Storage";
import { useDispatch } from "react-redux";
import { resetPostUserDetail } from "../../../store/actions/UserDetailPopup";

export default function UserDetailPopup() {
  const [modalStateClose, setModalStateClose] = useState(true);
  const [personalDetailShow, setPersonalDetailShow] = useState(false);
  const [BasicDetailShow, setBasicDetailShow] = useState(false);
  const dispatch = useDispatch()
  const closeModalState = () => {
    setModalStateClose(false);
    Storage.setBool("__wz_user__details_verify__", true)
  };

  const closePersonalDetails = () => {
    setPersonalDetailShow(true)
  }
  const closeBasicDetails = () => {
    closeModalState()
    Storage.setBool("__wz_user__details_verify__", true)
    setBasicDetailShow(true)
  }
  const backButton = () => {
    dispatch(resetPostUserDetail())
    setPersonalDetailShow(false)
  }
  return (
    <div className="PTH-Item">
      {/* <Modal show={modalStateClose}>
        <ModalBody>
          <ModalHeader
            closeButton={true}
            onclose={closeModalState}
          />
          {personalDetailShow === false ? (
            <PersonalDetail closePersonalDetails={() => closePersonalDetails()} />
          ) : (
            <>
              {BasicDetailShow === false ? (
                <BasicDetail backButton={() => backButton()} closeBasicDetails={() => closeBasicDetails()} />
              ) : ""}
            </>
          )
          }
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal> */}
    </div>
  )
}

