import React from 'react'
import './cancellationpopup.scss'
import Modals from '../../../../../../Common/Modals'
import ModalBody from '../../../../../../Common/Modals/ModalsBody'
import ModalHeader from '../../../../../../Common/Modals/ModalsHeader'

const CancellationPopup = ({ openpopup, onclose, oncloseAndSwitchButton, AllowCancellationData }) => {
  const closeModal = () => {
    onclose();
    oncloseAndSwitchButton(false)
    AllowCancellationData(false)

  }
  const handlesubmit = () => {
    onclose();
    AllowCancellationData(true)
  }

  return (
    <div>   <Modals ref={openpopup} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
      <ModalHeader title={'Allow Cancellations'} />
      <ModalBody>
        <p className='popup-note-div w-500 base'>Do you wish to allow cancellation for this product?</p>
        <div className='inline mt-25  confirm-btn-wrapper'>
          <button className='button btn-o-gray  btn-oval btn-xs btn-gray-border' onClick={() => closeModal()}>No</button>
          <button className='button button-primary btn-oval btn-xs ' onClick={() => handlesubmit()}>Yes </button>
        </div>
      </ModalBody>
    </Modals>
    </div>
  )
}

export default CancellationPopup 