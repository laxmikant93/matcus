import React, { useEffect, useImperativeHandle, useState, forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom';
import styles from "./Lightbox.module.scss";
import LightBoxHeader from './LightBoxHeader';
export function Lightbox({ children, Fade = true, defaultOpened = false, CancelButton, ActionItem, Title, LightboxSize, Slide, Position, ClosePopUp }, ref) {
  const LightboxElement = document.getElementById('edwapp')
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])
  const closePopupLightbox = () => {
    ClosePopUp()
    close()
  }

  useImperativeHandle(ref, () => ({
    isOpen: isOpen,
    open: () => setIsOpen(true),
    close
  }), [close, isOpen])

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
    // if (history.action === 'POP') {
    //   close()
    // }
    window.history.pushState(null, null, window.location.href);
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
      <div className={`${styles.EdneedLightbox} ${Fade ? styles.Lightbox_Fade : ''} `}>
        <div className={styles.LightboxOverlay} onClick={closePopupLightbox} />
        <div className={`${styles.LightboxWrapper}`}>
          <div className={styles.LightboxHeader}>
            <div className={styles.LightboxHeaderLeft}>
              <button className={styles.LightboxBack} type="button" aria-label="close" onClick={closePopupLightbox}>
                <i className={styles.Lightbox_Back_Icon}></i>
              </button>
              {Title && <h2>{Title}</h2>}
            </div>
            <div className={styles.LightboxHeaderRight}>
              {ActionItem}
              {CancelButton === "true" && <button className={styles.LightboxClose} type="button" aria-label="close" onClick={closePopupLightbox}>
                <i className={styles.Lightbox_Cancel_Icon}></i>
              </button>}
            </div>
          </div>
          {children}
        </div>
      </div >
    ) : null,
    LightboxElement
  )
}

export default forwardRef(Lightbox)