import React from 'react'
import styles from "./Lightbox.module.scss";

const LightBoxHeader = ({ children, Title, CancelButton, closePopupLightbox }) => {
  return (
    <div className={styles.LightboxHeader}>
      <div className={styles.LightboxHeaderLeft}>
        <button className={styles.LightboxBack} type="button" aria-label="close" onClick={closePopupLightbox}>
          <i className={styles.Lightbox_Back_Icon}></i>
        </button>
        {Title && <h2>{Title}</h2>}
      </div>
      <div className={styles.LightboxHeaderRight}>
        {children}
        {CancelButton === "true" && <button className={styles.LightboxClose} type="button" aria-label="close" onClick={closePopupLightbox}>
          <i className={styles.Lightbox_Cancel_Icon}></i>
        </button>}
      </div>
    </div>

  )
}

export default LightBoxHeader