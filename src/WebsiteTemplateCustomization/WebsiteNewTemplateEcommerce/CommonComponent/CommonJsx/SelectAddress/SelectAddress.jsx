import React from 'react'
import Modal from '../../../../../Common/Modal'
import ModalBody from '../../../../../Common/Modal/ModalBody'
import ModalFooter from '../../../../../Common/Modal/ModalFooter'
import ModalHeader from '../../../../../Common/Modal/ModalHeader'

const SelectAddress = ({ onClose, show }) => {
  const closeModal = () => {
    onClose()
  }
  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          closeButton={true}
          onclose={closeModal}
          className="media-modal-head"
        >
          <div className='form-wrapper'>
            <h3 className='address-heading'>Add New Address</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='form-wrapper'>

          </div>
        </ModalBody>
        <ModalFooter>
          <div className='form-wrapper'>
            <div className="footer-btn-wrapper">
              <button className='buttonTrue btnTrue-o-primary width-100' onClick={closeModal}>CANCEL</button>
              <button className='buttonTrue btnTrue-primary width-100  '>Save Address</button>
            </div>
          </div>

        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

export default SelectAddress