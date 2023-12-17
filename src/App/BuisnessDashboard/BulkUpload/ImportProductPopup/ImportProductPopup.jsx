import React from 'react';
import Modals from '../../../../Common/Modals';
import ModalBody from '../../../../Common/Modals/ModalsBody';
import ModalHeader from '../../../../Common/Modals/ModalsHeader';
import './importproductpopup.scss'


const ImportProductPopup = ({ openref, onclose }) => {
  const closeModal = () => {
    onclose();
  }
  return (
    <Modals ref={openref} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
      <ModalHeader title={'Imported Products'} />
      <ModalBody>
        <div className='pT-5 inline between-xs between-lg mb-2'>
          <p className='text-s w-400 base'>New Products</p>
          <p className='text-s w-400 base'>05</p>
        </div>
        <div className='inline between-xs between-lg mt-10'>
          <p className='text-s w-400 base'>Existing Products</p>
          <p className='text-s w-400 base'>02</p>
        </div>
        <hr className='mt-25 mb-15 ' />
        <div className='inline popup-btn-container mt-2'>
          <button className='button btn-2xs btn-o-gray'>Cancel</button>
          <button className='button btn-2xs  button-primary'>Import</button>
        </div>
      </ModalBody>

    </Modals>
  )
}

export default ImportProductPopup