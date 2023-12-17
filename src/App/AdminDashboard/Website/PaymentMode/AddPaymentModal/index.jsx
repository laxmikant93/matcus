/* eslint-disable no-unused-vars */
import React from "react";
import Modal from "../../../../../Common/Modal";
import ModalHeader from "../../../../../Common/Modal/ModalHeader";
import ModalBody from "../../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../../Common/Modal/ModalFooter";
import AddBankDetail from "./AddBankDetail";
import AddCheque from "./AddCheque";
import AddPaypal from "./AddPaypal";
import AddUPI from "./AddUPI";
const AddPaymentModal = ({ onclose, show, selected, updateItem, PopUpClose }) => {

  const modalState = () => {
    switch (selected) {
      case "bank":
        return updateItem ? "Update Bank Details" : "Add Bank Details"
      case "upi":
        return updateItem ? "Update UPI Details" : "Add UPI Details"
      case "cheque":
        return updateItem ? "Update Cancelled Cheque " : "Add Cancelled Cheque "
      case "paypal":
        return updateItem ? "Update PayPal Details" : "Add PayPal Details"
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          title={modalState()}
          closeButton={true}
          onclose={onclose}
        />
        <ModalBody className="EditService-MBody">
          {selected === "bank" ? (
            <AddBankDetail updateItem={updateItem} onclose={onclose} PopUpClose={PopUpClose} />
          ) : selected === "upi" ? (
            <AddUPI updateItem={updateItem} onclose={onclose} PopUpClose={PopUpClose} />
          ) :

            (
              ""
            )}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AddPaymentModal;
