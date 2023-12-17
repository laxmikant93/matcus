import React from 'react';
import './deleteConfirm.scss';

const DeleteConfirmPop = ({ index, handleAcceptPopup, deleteVarHandler, loading, type }) => {


  return (
    <React.Fragment>
      <div className='deletePop-container-admin'>
        <div className='trueThemepop-wrap-admin'>
          <div className='cancel-btn-wrapper'>
            {
              type === "Cancel" &&
              <button className='cancel-btn' onClick={() => handleAcceptPopup()}> <i className='ed-icon i-xs  icon-cross' ></i></button>
            }
          </div>

          <p className='deletepop-p '> {type === "Cancel" ? "Cancel Confirmation " : "Delete Confirmation"}</p>
          <p className='text-xxs w-400 mt-5 '> {type ? "Are you sure you want to cancel this order ?" : "Are you sure you want to delete ?"} </p>
          <div className='deletePop-btn-wrapper'>
            <hr className='line' />
            <button onClick={() => handleAcceptPopup()} className="buttonpop">Cancel</button>
            {
              loading ? (
                <button className={`buttonpop  btn-delete`}>  {type === "Cancel" ? "Cancelling..." : "Deleting..."}  </button>
              ) : (
                <button onClick={() => { index || index === 0 ? deleteVarHandler(index, 'change') : deleteVarHandler('', 'multi') }} className={`buttonpop  btn-delete`}>  {type === "Cancel" ? "Confirm" : "Delete"} </button>
              )
            }
          </div>
        </div>
      </div>




    </React.Fragment>
  )
}

export default DeleteConfirmPop