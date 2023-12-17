import React from 'react';
import './deleteConfirm.scss';

const DeleteConfirmPop = ({ onClosePop, heading, para, btntext, wishlist, deleteHandler }) => {

  return (
    <React.Fragment>
      <div className='deletePop-container'>
        <div className='trueThemepop-wrap'>
          <p className='deletepop-p'>{heading ? heading : "Delete Confirmation"}</p>
          <p className='deletepop-para'>{para ? para : "You are about to delete this. Are you sure?"}</p>
          <div className='deletePop-btn-wrapper'>
            <hr className='line' />
            <button onClick={() => { onClosePop(false) }} className="buttonpop">Cancel</button>
            <button onClick={deleteHandler} className={`buttonpop ${wishlist ? "btn-wishlist" : "btn-delete"}`}>{btntext ? btntext : "Delete"}</button>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default DeleteConfirmPop