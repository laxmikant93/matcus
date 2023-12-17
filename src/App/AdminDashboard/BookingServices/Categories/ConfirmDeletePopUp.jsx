import React from 'react'
import Dialog from '../../../../Common/Dialog'
import DialogBody from '../../../../Common/Dialog/DialogBody';
import "./CategoriesServices.scss";

const ConfirmDeletePopUp = ({ DeleteRef, onClose, HandleDeleteYes,title,Subtitle }) => {
  const closePopup = () => {
    onClose()
  }
  return (

    <>
      <Dialog ref={DeleteRef} Position="center" slide="center" ClosePopUp={() => closePopup()}>
        <div className="head">
          <h3 className="title">Delete {title}</h3>
        </div>
        <DialogBody>
          <p className="subtitle">Do you wish to delete the selected {Subtitle}?</p>
          <div className="button_group">
            <button className="button btn-o-gray btn-xs btn-oval" type="button" onClick={() => closePopup()}>No</button>
            <button className="button button-primary btn-xs  btn-oval" type="button" onClick={() => HandleDeleteYes()}>Yes</button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  )
}

export default ConfirmDeletePopUp