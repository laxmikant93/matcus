import React, { useRef, useState } from "react";
import { useDetectOutsideClick } from "../DetectOutsideClick/useDetectOutsideClick";
import {
  IconFacebook,
  IconTwitter,
  IconWhatsapp,
  IconLinkedin,
  IconEmail,
} from "../Icon";
import Login from "../../App/Auth/Login";

export default function SharePopUp({
  shareUrl,
  textName,
  shareBtnClass,
  shareiconclass,
}) {
  const [modalState, setModalState] = useState(false);

  const closeModalState = () => {
    setModalState(false);
  };

  const dropdownRefShare = useRef(null);
  const [isActiveShare, setIsActiveShare] = useDetectOutsideClick(
    dropdownRefShare,
    false
  );
  const [copySuccess, setCopySuccess] = useState(false);
  const onClickBtnShare = () => {
    setIsActiveShare(!isActiveShare);
    setCopySuccess(false);
  };

  const inputUrl = useRef(null);

  const copyToClipBoard = () => {
    inputUrl.current.select();
    document.execCommand("copy");
    shareUrl && setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  return (
    <React.Fragment>
      <button className={shareBtnClass} onClick={onClickBtnShare}>
        <i className={`ed-icon icon-share ${shareiconclass}`}></i>
        Share
      </button>

      <div
        ref={dropdownRefShare}
        className={`popup sharePopup ${isActiveShare ? "active" : "inactive"}`}
      >
        <h5 className="gray text-xxs w-400">
          {`Share this ${textName ? textName : "question"} on`}
        </h5>
        <ul className="socialShare-icon">
          <li className="socialShare-iconItem">
            {/* <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} title="Facebook" target="blank"> */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              title="Facebook"
              target="blank"
            >
              <i className="ed-icon icon-fb i-md gray"></i>
            </a>
          </li>
          <li className="socialShare-iconItem">
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=`}
              title="Twitter"
              target="blank"
            >
              <i className="ed-icon icon-twitter i-md gray"></i>
            </a>
          </li>
          <li className="socialShare-iconItem">
            <a
              href={`https://wa.me?text=${shareUrl}`}
              title="whatsapp"
              target="blank"
            >
              <i className="ed-icon icon-whatsapp i-md gray"></i>
            </a>
          </li>
          <li className="socialShare-iconItem">
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
              title="Linkedin"
              target="blank"
            >
              <i className="ed-icon icon-linkedin i-md gray"></i>
            </a>
          </li>
          <li className="socialShare-iconItem">
            <a
              href={`mailto:info@example.com?&subject=&cc=&bcc=&body=${shareUrl}%0A`}
              title="Email"
              target="blank"
            >
              <i className="ed-icon icon-mail i-md gray"></i>
            </a>
          </li>
        </ul>

        <div className="c-copy-share-link mt-10">
          <button
            className={`button btn-sm ${copySuccess ? "secondary" : "base"
              }`}
            onClick={copyToClipBoard}
          >
            {copySuccess ? "Copied" : "Copy Share Link"}
          </button>
        </div>
        <input
          type="text"
          ref={inputUrl}
          value={shareUrl}
          style={{ opacity: "0" }}
          readOnly
        />
      </div>

      {/* LOGIN POOPUP */}
      <div className={`modal pop-login modalShowing-${modalState}`}>
        <div className="modalwrapper">
          <div className="modalHead">
            <span
              className="closeModal text-xxs gray"
              onClick={() => closeModalState()}
            >
              Close
            </span>
          </div>
          <div className="modalbody">
            <div className="pageFullCenter">
              <Login />
            </div>
          </div>
        </div>
      </div>
      {/* END OF MODAL */}
    </React.Fragment>
  );
}
