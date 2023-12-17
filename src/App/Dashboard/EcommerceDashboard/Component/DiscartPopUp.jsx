import React from 'react';
import Modals from '../../../../Common/Modals';
import ModalsHeader from '../../../../Common/Modals/ModalsHeader';
import ModalsBody from '../../../../Common/Modals/ModalsBody';
import './discartPopUp.scss';
import { useNavigate } from 'react-router-dom';


const DiscartPopUp = ({ onclose, discartRef, closeregistrationform, popuptext, editpopup, editId, resetData }) => {

  const closeModal = () => {
    onclose();
  }
  const history = useNavigate()
  const closeModalPopup = () => {
    discartRef.current.close();
    // resetData();
  }
  const closeModalWithoutClearPopup = () => {
    discartRef.current.close();
    history('/ecommerce/payments/default/id')
  }
  const handleYesButton = () => {
    closeregistrationform(false);
    discartRef.current.close();
    resetData();
  }

  // const handleProceedToAdd = () => {
  //   if (editpopup === true) {
  //     history(`/ecommerce/payments/ProceedToPayEdit/${editId}`);
  //   } else {
  //     history("/ecommerce/payments/ProceedToPay/id");
  //   }
  // }

  return (
    <React.Fragment>
      <Modals ref={discartRef} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize="modal-s">
        <ModalsHeader title={'Discard Changes '} />
        <ModalsBody className='discartpopup-body-container'>
          <div className='discart-container'>
            {popuptext ?
              <p className='text-xs w-500 base'>Please add your account details to disbale COD.</p>
              :
              <p className='text-xs w-500 base'>Do you really want to discard all the changes ?</p>
            }
            {/* <p className='text-xs w-500 base'>Do you really want to discard all the changes ?</p> */}
            <div className='discard-btn-wrapper mt-35'>
              <button className='button btn-sm btn-o-gray' onClick={closeModalPopup}>{popuptext ? "Cancel" : "No"}</button>
              {popuptext ?
                <button className='button btn-sm button-primary' onClick={closeModalWithoutClearPopup}> Proceed to add an account </button>
                :
                <button className='button btn-sm button-primary' onClick={handleYesButton}> Yes </button>
              }
            </div>
          </div>
        </ModalsBody>
      </Modals>

      {/* <Dialog ref={discartRef} Footer="true" CancelButton="true" SaveButton="true">
        <DialogBody bodyClass="remove-catergory-dialog-body">
          <div className='remove-catergory-dialog'>
          
            <p className="dgray text-xs w-500 base">Do you really want to discard all the changes ?</p>
            <div className='discard-btn-wrapper mt-35'>
              <button className='button btn-sm btn-o-gray' onClick={closeModalPopup}>No</button>
              <button className='button btn-sm button-primary' onClick={handleYesButton}>Yes</button>
            </div>
          </div>
        </DialogBody>
      </Dialog> */}
    </React.Fragment>
  )
}

export default DiscartPopUp