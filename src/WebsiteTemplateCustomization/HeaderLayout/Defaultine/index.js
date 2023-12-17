import React, { useEffect, useState } from 'react'
import DesktopFrame from './DesktopFrame';
import MobileFrame from './MobileFrame';

const DefaultineHeader = ({preview}) => {

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
    {windowSize.width >= 768 ?

    <DesktopFrame preview={preview}/>
    :
   <MobileFrame  preview={preview}/>
   
    }
    </React.Fragment>
  )
}

export default DefaultineHeader