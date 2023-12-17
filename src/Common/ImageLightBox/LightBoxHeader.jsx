import React from "react";
import styles from "./LightBox.module.scss";

const LightBoxHeader = (
  { zoomIn, zoomOut, setScale, scale, ClosePopUp },
  ref
) => {
  const closeModle = () => {
    ClosePopUp();
  };
  return (
    <div className={styles.Head_wrapper}>
      <button onClick={closeModle} className={styles.back_button}>
        &#10140;
      </button>
      <div className={styles.Button_group}>
        <button
          className="button btn-2xs button-primary"
          disabled={scale < 0.5}
          onClick={() => zoomIn()}
        >
          Zoom in
        </button>
        <button
          className="button btn-2xs button-primary"
          onClick={() => zoomOut()}
        >
          Zoom out
        </button>
        <button
          onClick={() => setScale(1)}
          className="button btn-2xs button-primary"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default LightBoxHeader;
