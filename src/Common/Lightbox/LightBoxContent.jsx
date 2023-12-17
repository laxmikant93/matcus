import React from 'react'
import styles from "./Lightbox.module.scss";

const LightBoxContent = ({ children }) => {
  return (

    <div className={`${styles.LightboxContent}`}>
      <div className={`${styles.LightboxContentInner}`}>
        {children}
      </div>
    </div>
  )
}

export default LightBoxContent