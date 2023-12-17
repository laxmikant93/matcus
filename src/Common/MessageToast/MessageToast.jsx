import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as successPopupAction from "../../store/actions/successmessagepopup";
import './MessageToast.scss';

const MessageToast = () => {
  const dispatch = useDispatch();
  const success = useSelector(state => state.successmessagepopup)

  const handleClose = useCallback(() => {
    dispatch(successPopupAction.hideSuccessPopup())
  }, [dispatch])

  useEffect(() => {
    if (success.showToast) {
      setTimeout(handleClose, 3000)
    }
  }, [success, handleClose])
  return (
    <div className='messageToast-container'>
      {success.showToast &&
        <div className={`toast-wrap ${success.toastType === 'success' ? 'success-border' : success.toastType === 'error' ? 'error-border' : success.toastType ? 'warning-border' : ''}`}>
          <div className='toast-icon'>
            {
              success.toastType === 'success' ? <i className='icon-success'></i>
                : success.toastType === 'error' ? <i className='icon-error'></i>
                  : success.toastType === 'warning' ? <i className='  icon-warning'></i> : ''
            }

          </div>
          <div className='toast-para-wrap'>
            <p className='toast-para-text text-2xs w-400'>{success.message}</p>
          </div>
          <span className='cross-span' onClick={handleClose}>
            <i className='icon-cross '></i>
          </span>
        </div>
      } </div>
  )
}

export default MessageToast