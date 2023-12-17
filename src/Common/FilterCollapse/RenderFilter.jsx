import React, { useState, useEffect, useRef } from "react";
import styles from "./filter.module.scss";
import { useDetectOutsideClick } from '../DetectOutsideClick/useDetectOutsideClick';

export default function RenderFilter({ title, children, FilterButtonClass, IconClass }) {
  const searchRef = useRef(null)
  const [activeFilter, setActiveFilter] = useDetectOutsideClick(searchRef, false);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      {windowSize.width <= 768 ?
        <React.Fragment>
          <div className={styles.RenderFilterWrapper}>
            <button className={`${FilterButtonClass ? FilterButtonClass : styles.FilterButton}`} onClick={() => setActiveFilter(!activeFilter)}>
              <i className={IconClass ? IconClass : styles.FilterIcon}></i>{title && title}
            </button>
          </div>
          <div className={`${styles.RenderFilterContent} ${activeFilter && styles.Active}`}>
            <div className={`${styles.ContentWrapper} ${activeFilter && styles.SlideLeft}`} ref={searchRef}>
              {children}
            </div>
          </div>
        </React.Fragment>
        :
        <>
          {children}
        </>
      }
    </React.Fragment >
  );
}