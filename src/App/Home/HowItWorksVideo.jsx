/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { openHomepageVideoPopup, closeHomepageVideoPopup } from "../../store/actions/homePage";
// import { useDispatch, useSelector } from "react-redux";

// const HowItWorksVideo = ({ setVideopop, videopop, videopopfooter, manageCloseVideopopfooter }) => {
//   const dispatch = useDispatch();
//   window.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" || e.key === "kssioi") {
//       dispatch(closeHomepageVideoPopup());
//     }
//   });
//   // window.onclick = function (e) {
//   //   if (e.target === (videopop || videopopfooter)) {
//   //     manageCloseVideopop();
//   //     history('/')
//   //   }
//   // }
//   // const [locationKeys, setLocationKeys] = useState([]);
//   const history = useNavigate();
//   const handleHistoryData = () => {
//     window.history.pushState(null, null, window.location.href);
//     window.onpopstate = function () {
//       if (videoPopupState === true) {
//         dispatch(closeHomepageVideoPopup());
//         document.body.classList.remove('videoPopBody');
//         window.scrollTo(0, 0);
//       }
//     };
//   }
//   useEffect(() => {
//     handleHistoryData();
//   }, []);

//   const manageCloseVideopop = () => {
//     dispatch(closeHomepageVideoPopup());
//     document.body.classList.remove('videoPopBody');
//     window.scrollTo(0, 0);
//   }
//   const { videoPopupState } = useSelector((state) => {
//     return {
//       videoPopupState: state.homepageVideoPopup.isOpen
//     }
//   })
//   return (
//     <React.Fragment>
//       {videoPopupState &&
//         <div className="videoPop">
//           <video autoPlay muted loop controls>
//             <source src="https://api.getmelight.com/videos/homepageVideo?videoName=dashboardVideo" type="video/mp4" />
//           </video>
//           <span className="crossIcon" onClick={() => manageCloseVideopop()}></span>
//         </div>
//       }
//     </React.Fragment>
//   )
// }
// export default HowItWorksVideo

import React, { useEffect, useImperativeHandle, useState, forwardRef, useCallback, useNavigate } from 'react'
import { createPortal } from 'react-dom'
import ScrollToTop from '../../Common/ScrollPageTop'
import './HowItWorksVideo.scss'



export function HowItWorksVideo({ children, fade = false, defaultOpened = false }, ref) {
  const modalElement = document.getElementById('edwapp')

  const [isOpen, setIsOpen] = useState(defaultOpened)

  const close = useCallback(() => setIsOpen(false), [])
  // const history = useNavigate()

  useImperativeHandle(ref, () => ({
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
      document.body.classList.add('videoPopBody');
      window.onpopstate = function () {
        window.history.go(0);
        manageBrowserBtn()
        close();
        <ScrollToTop />
      };
    }
    else {
      document.body.classList.remove('videoPopBody');
    }
  }
  const manageBrowserBtn = () => {
    // if (history.action === 'POP') {
    //   close()
    // }
    window.history.pushState(null, null, window.location.href);
  }


  // window.history.pushState(null, null, window.location.href);

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    manageBodyScroll();
    manageBrowserBtn();
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return createPortal(
    isOpen ? (
      <div className={`videoPopModal ${fade ? 'videoPop-fade' : ''}`}>
        <div className="videoPop-overlay" onClick={close}></div>
        <div className="videoPop-body">
          <video autoPlay muted loop controls>
            <source src="https://api.edneed.com/videos/homepageVideo?videoName=dashboardVideo" type="video/mp4" />
          </video>
        </div>
        <span role="button" className="videoPop-close" aria-label="close" onClick={close}></span>
      </div>
    ) : null,
    modalElement
  )
}

export default forwardRef(HowItWorksVideo)
