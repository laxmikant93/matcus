import React, { useEffect, useImperativeHandle, useState, forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom';

export function Dialog({ children, fade = true, defaultOpened = false, Footer, SaveButton, CancelButton, FooterClass, CancelButtonClass, CancelButtonName, SaveButtonClass, SaveButtonName, handleActionProp }, ref) {
  const modalElement = document.getElementById('edwapp')
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const close = useCallback(() => setIsOpen(false), [])
  useImperativeHandle(ref, () => ({
    isOpen: isOpen,
    open: () => setIsOpen(true),
    close
  }), [close])

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])

  const onTop = () => {
    window.scrollTo(0, 0);
  }
  const manageBodyScroll = () => {
    if (isOpen === true) {
      document.body.classList.add('avoidscroll');
      window.onpopstate = function () {
        window.history.go(0);
        manageBrowserBtn()
        close();
        onTop()
      };
    }
    else {
      document.body.classList.remove('avoidscroll');
    }
  }
  const manageBrowserBtn = () => {
    if (ref.current.isOpen) {
      window.history.pushState(null, null, window.location.href);
    }
  }
  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    manageBodyScroll()
    manageBrowserBtn()
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return createPortal(
    isOpen ? (
      <div className={`EdneedDialog Dialog-fade`}>
        <div className="DialogOverlay" onClick={close} />
        <div className={`DialogWrapper fade`}>
          <button type="button" className="dialog-cancel-btn" onClick={close}><i className="dialog-cancel-icon"></i></button>
          {children}
          {Footer && <div className={`DialogFooter ${FooterClass}`}>
            {CancelButton && <button type="button" className={`${CancelButtonClass ? CancelButtonClass : 'linkBtn btn-xs button-base'}`} onClick={close}>{CancelButtonName ? CancelButtonName : 'Cancel'}</button>}
            {SaveButton && <button type="button" className={`${SaveButtonClass ? SaveButtonClass : 'linkBtn btn-xs button-red'}`} onClick={() => handleActionProp()}>{SaveButtonName ? SaveButtonName : 'Confirm'}</button>}
          </div>}
        </div>
      </div>
    ) : null,
    modalElement
  )
}

export default forwardRef(Dialog)