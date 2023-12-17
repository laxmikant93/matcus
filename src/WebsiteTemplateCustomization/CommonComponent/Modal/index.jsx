import React, { useEffect, useImperativeHandle, useState, forwardRef, useCallback } from 'react'
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import CloseIcon from "./closeIcon.svg"

const ModalWTC = styled.div`
width: 100vw;
height: 100vh;
backdrop-filter: blur(5px);
position: fixed;
overflow-y: auto;
overflow: hidden;
top: 0;
right: 0;
bottom: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.65);
z-index: 999999;
box-sizing: border-box;
&.modal-fade-wtc {
  animation: fade-in 1s 1 linear;
  animation-fill-mode: forwards;
  opacity: 0;
}
@keyframes fade-in {
  0% {
    animation-timing-function: cubic-bezier(0.2242, 0.7499, 0.3142, 0.8148);
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
`;
const ModalOverlayWtc = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  `;
const ModalCloseWtc = styled.span`
position: absolute;
right: 15px;
top: 10px;
color: ${({ theme }) => theme.Global.Modal.ModalCloseWtc.Color};
cursor: pointer;
font-weight: 400;
font-size: 16px;
line-height: 20px;
padding: 0px 10px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
z-index: 999999;
box-sizing: border-box;
.close-icon {
  width: 20px;
  height: 20px;
  display: block;
  cursor: pointer;
  -webkit-mask: url(${CloseIcon}) no-repeat center;
  mask-image: url(${CloseIcon}) no-repeat center;
  background: ${({ theme }) => theme.Global.Modal.ModalCloseWtc.Color};

  &:hover {
    background: ${({ theme }) => theme.Global.Modal.ModalCloseWtc.Hover.Color};
  }
}

&:hover {
  color: ${({ theme }) => theme.Global.Modal.ModalCloseWtc.Color};
  .close-icon {
    &:hover {
      background: ${({ theme }) => theme.Global.Modal.ModalCloseWtc.Color};
    }
  }
}
  `;

const ModalWrapperWtc = styled.div`
z-index: 2;
position: relative;
border-radius: 36px 0 0 36px;
overflow-x: hidden;
overflow-y: auto;
max-height: 100%;
// padding: 35px; 
color: #c3c0c0;
z-index: 1080;
width: 60%;
background-color: #fff;
box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
min-height: 100vh;
margin-right: 0;
margin-left: auto;
@media screen and (max-width: 1200px) {
  width: 80%
}
@media screen and (max-width: 768px) {
  width: 100%
}

@media screen and (max-width: 768px) {
  width: 100%;
  }
&.slide-left {
  animation: 1.5s slide-left;
}
@keyframes slide-left {
  from {
    margin-right: -100%;
  }
  to {
    margin-left: auto;
  }
}
&.modal-full {
  width: 100%;
  @media screen and (max-width: 768px) {
    width: 100%
  }
}
&.modal-l {
  width: 90%;
  @media screen and (max-width: 768px) {
    width: 100%
  }
}
&.modal-m {
  width: 70%;
  
  @media screen and (max-width: 768px) {
    width: 100%
  }
}
  `;
export function Modal({ children, fade = true, defaultOpened = false, ModalSize }, ref) {
  const modalElement = document.getElementById('edwapp')
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const close = useCallback(() => setIsOpen(false), [])

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
    if (ref?.current?.isOpen) {
      window.history.pushState(null, null, window.location.href);
    }
    // window.history.pushState(null, null, window.location.href);
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
      <ModalWTC className={fade ? 'modal-fade-wtc' : ''}>
        <ModalOverlayWtc onClick={close} />
        <ModalCloseWtc role="button" aria-label="close" onClick={close}>
          <i className="close-icon"></i> Close
        </ModalCloseWtc>
        <ModalWrapperWtc className={`${ModalSize} ${fade ? 'slide-left' : ''}`}>{children}</ModalWrapperWtc>
      </ModalWTC>
    ) : null,
    modalElement
  )
}

export default forwardRef(Modal)