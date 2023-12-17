import React, { useEffect, useRef, useState } from "react";
import { useDetectOutsideClick } from "../../../../../Common/DetectOutsideClick/useDetectOutsideClick";
// import {
//   IconFacebook,
//   IconTwitter,
//   IconWhatsapp,
//   IconLinkedin,
//   IconEmail,
// } from "../../../assets/images";
import facebook from "../../../assets/images/facebook-icon.png"
import twitter from "../../../assets/images/twitter-icon.png"
import link from "../../../assets/images/link-icon.png"
import gmail from "../../../assets/images/gmail.icon.png"
import Login from "../../../../../App/Auth/Login";
import "./share.scss";
import { number } from "prop-types";
import { useLocation } from "react-router-dom";

export default function Share({
  id,
  slug,
  IconClassName
}) {

  const inputUrl = useRef(null);
  const shareRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // console.log(shareUrl)
  // console.log("..", window.location.href, slug)
  const [isActiveShare, setIsActiveShare] = useDetectOutsideClick(
    shareRef,
    false
  );
  const onClickBtnShare = () => {
    setIsActiveShare(!isActiveShare);
  };

  const ShopUrl = window.location.href + "/" + slug;
  const DefaultUrl = window.location.href;

  const shareUrl = slug ? ShopUrl : DefaultUrl;

  const copyToClipBoard = () => {
    const shareElement = document.createElement("input");
    shareElement.value = shareUrl
    document.body.appendChild(shareElement);
    shareElement.select();
    document.execCommand("copy");
    document.body.removeChild(shareElement);
    shareUrl && setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };


  return (
    <React.Fragment>
      <div className='product-share-btn-wrapper'>
        <button className={`product-share-btn-item ${isActiveShare && IconClassName ? "detailIcon" : ""}`} ref={shareRef} onClick={(id) => onClickBtnShare(id)}>
          <i className='share-icon ed-icon '></i>
        </button>
        <div className={`share-popup-main-wrapper ${isActiveShare ? "visible" : ""}`}>
          <ul className='sharepopup-icon-wrapper'>
            <li className="share-icon-item">
              <a
                href={`mailto:info@example.com?&subject=&cc=&bcc=&body=${shareUrl}%0A`}
                title="Email"
                target="blank"
              >
                <img src={gmail} alt="" className="gmail-icon" />
              </a>
            </li>
            <li className="share-icon-item">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                title="Facebook"
                target="blank"
              >
                <img src={facebook} alt="" className="facebook-icon" />
              </a>
            </li>
            <li className="share-icon-item">
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=`}
                title="Twitter"
                target="blank"
              >
                <img src={twitter} alt="" className="twitter-icon" />
              </a>
            </li>
            <li className="share-icon-item">
              <button
                className={`${copySuccess ? "" : ""}`}
                onClick={copyToClipBoard}
              >
                <img src={link} alt="" className="link-icon" />
              </button>
            </li>
            <input
              type="text"
              ref={inputUrl}
              value={shareUrl}
              style={{ opacity: "0" }}
              readOnly
            />
          </ul>
        </div>
      </div>
      {
        copySuccess ? (
          <>
            <div className="SuccessAlert">
              <p>Link Copied Successfully</p>
            </div>
          </>
        ) : ""
      }
    </React.Fragment>
  );
}
