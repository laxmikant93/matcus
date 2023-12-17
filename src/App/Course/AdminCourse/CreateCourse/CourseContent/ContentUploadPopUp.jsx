/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ModalHeader from "../../../../../Common/Modal/ModalHeader";
import ModalBody from "../../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../../Common/Modal/ModalFooter";
import AppLinkUrl from "../../../../../Common/AppLink/AppLinkUrl";
import Modal from "../../../../../Common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { resetImagePopUpData } from "../../../../../store/actions/admincourse";

const ContentUploadPopUp = ({ isDownloadable }) => {
  const dispatch = useDispatch();
  const { imagePopUpShow, users, imagePopUpShowSuccess } = useSelector(
    (state) => {
      return {
        users: state.user,
        imagePopUpShow: state.admincourse.imgaePopUp.data,
        imagePopUpShowSuccess: state.admincourse.imgaePopUp.success,
      };
    }
  );
  const resetPopUp = () => {
    dispatch(resetImagePopUpData());
  };

  const DownloadFile = () => {
    window.location.href = imagePopUpShow;
  };

  return (
    <Modal className="onlineTestAttachmentPopup" show={imagePopUpShowSuccess}>
      <ModalHeader
        subtitle=""
        closeButton={true}
        onclose={() => resetPopUp()}
        className="Courses"
      />
      <ModalBody>
        {imagePopUpShowSuccess ? (
          <React.Fragment>
            {imagePopUpShow?.src?.includes(".mp4") ? (
              <React.Fragment>
                <video
                  height="500"
                  src={imagePopUpShow}
                  controls
                  controlsList={
                    isDownloadable
                      ? "nodownload nofullscreen noremoteplayback"
                      : ""
                  }
                  alt="videofile"
                ></video>
              </React.Fragment>
            ) : imagePopUpShow?.src?.includes(".mp3") ? (
              <React.Fragment>
                <audio
                  controls
                  controlsList={
                    isDownloadable
                      ? "nodownload nofullscreen noremoteplayback"
                      : ""
                  }
                >
                  <source src={imagePopUpShow} type="audio/mpeg" />
                </audio>
              </React.Fragment>
            ) : imagePopUpShow?.src?.includes(".pdf") ? (
              <div className="popupPreviewContent">
                {isDownloadable ? (
                  <iframe src={`${imagePopUpShow}`} title="pdf"></iframe>
                ) : (
                  <iframe
                    src={`${imagePopUpShow}#toolbar=0`}
                    onContextMenu={(e) => e.preventDefault()}
                    title="pdf"
                  ></iframe>
                )}
              </div>
            ) : imagePopUpShow?.src?.includes(".doc") ||
              imagePopUpShow?.src?.includes(".docx") ? (
              <div className="popupPreviewContent">
                <iframe
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${imagePopUpShow}`}
                  frameborder="0"
                  title="doc"
                ></iframe>
                {/* <iframe src={`https://docs.google.com/gview?url=${imagePopUpShow}&embedded=true`} title="doc"></iframe> */}
                {/* <iframe src={`${imagePopUpShow}`} title="doc"></iframe> */}
                {/* <iframe src={`${imagePopUpShow}#toolbar=0`} onContextMenu={(e) => e.preventDefault()} title="doc">Document has been Downloaded u cna check them</iframe> */}
                <button
                  className="button btn-md button-theme btn-sm mt-20"
                  onClick={() => DownloadFile()}
                >
                  Download File
                </button>
              </div>
            ) : (
              <div className="popupPreviewContent">
                <img download src={imagePopUpShow?.src} alt="imageFile" />
                {isDownloadable ? (
                  <a
                    className="button btn-md button-theme btn-sm mt-20"
                    href={imagePopUpShow?.src}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                ) : (
                  ""
                )}
              </div>
            )}
          </React.Fragment>
        ) : (
          <h1>Loading....</h1>
        )}
      </ModalBody>
    </Modal>
  );
};
export default ContentUploadPopUp;
