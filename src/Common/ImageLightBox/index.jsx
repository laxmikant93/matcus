import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import styles from "./LightBox.module.scss";
import LightBoxHeader from "./LightBoxHeader";

const Image = styled.img`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${({ itemID }) => `scale(${itemID})`};
`;

export function ImageLightBox(
  { src, currentImageIndex, Fade = true, defaultOpened = false, ClosePopUp },
  ref
) {
  const [scale, setScale] = useState(1);
  const LightboxElement = document.getElementById("edwapp");
  const [isOpen, setIsOpen] = useState(defaultOpened);
  const [index, setIndex] = useState(currentImageIndex);


  const zoomIn = () => {
    setScale((scale) => scale - 0.1);
  };
  const zoomOut = () => {
    setScale((scale) => scale + 0.1);
  };
  

  // prev and next button function so wen need to data array of abject then we can run this code.
  // const handleNext = () => {
  //   if (index === [].length - 1) {
  //     setIndex(0);
  //   } else {
  //     setIndex(index + 1);
  //   }
  // };

  // const handlePrev = () => {
  //   if (index === 0) {
  //     setIndex([].length - 1);
  //   } else {
  //     setIndex(index - 1);
  //   }
  // };

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const closePopupLightbox = (e) => {
    ClosePopUp();
    close();
  };

  useImperativeHandle(
    ref,
    () => ({
      isOpen: isOpen,
      open: () => setIsOpen(true),
      close,
    }),
    [close, isOpen]
  );

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  const onTop = () => {
    window.scrollTo(0, 0);
  };
  const manageBodyScroll = () => {
    if (isOpen === true) {
      document.body.classList.add("avoidscroll");
      window.onpopstate = function () {
        window.history.go(0);
        manageBrowserBtn();
        close();
        onTop();
      };
    } else {
      document.body.classList.remove("avoidscroll");
    }
  };
  const manageBrowserBtn = () => {
    window.history.pushState(null, null, window.location.href);
  };
  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    manageBodyScroll();
    manageBrowserBtn();
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div
        className={`${styles.LightBoxWrapper} ${
          Fade ? styles.Lightbox_Fade : ""
        }`}
      >
        <div
          onClick={closePopupLightbox}
          className={styles.overlay_lightbox}
        ></div>
        <LightBoxHeader
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          setScale={setScale}
          ClosePopUp={ClosePopUp}
        />
        <div className={`${styles.LightboxContent}`}>
          <div className={`${styles.LightboxContentInner}`}>
            <Image src={src ? src : ""} itemID={scale} alt="" />
          </div>
        </div>
      </div>
    ) : null,
    LightboxElement
  );
}
export default forwardRef(ImageLightBox);
