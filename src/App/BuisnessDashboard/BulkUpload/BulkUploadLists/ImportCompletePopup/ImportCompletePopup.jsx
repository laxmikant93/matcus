import React from 'react'
import Modals from '../../../../../Common/Modals'
import ModalBody from '../../../../../Common/Modals/ModalsBody'
import ModalHeader from '../../../../../Common/Modals/ModalsHeader'
import './importcompletepopup.scss'
import Success from '../../../../BuisnessDashboard/BulkUpload/Success.png';
import AppLink from '../../../../../Common/AppLink'
const ImportCompletePopup = ({ openref, onclose }) => {
  const closeModal = () => {
    onclose();
  }
  return (
    <div>
      <Modals ref={openref} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
        <ModalHeader title={'Imported Products'} />
        <ModalBody>
          <div className='complete-popup-wrapper'>
            <p className='text-sm w-500 base import-complete-heading'>Import Complete</p>
            <div className='succes-image-div'>
              <img src={Success} alt="" />
            </div>
            <div className='text-center mt-15 mb-2'>
              <p className=' text-xs w-400 import-info '>To see the products you've added,</p>
              <p className='text-xs w-400 import-info'>   use the filter "Last Imported" in the Products list.</p>
            </div>

            <hr className='mt-10 mb-2' />
            <div className='text-center mt-10'>
              <AppLink className='button button-primary btn-xs ' to="/ecommerce/productList">Done</AppLink>

            </div>
          </div>
        </ModalBody>

      </Modals>
    </div>
  )
}

export default ImportCompletePopup