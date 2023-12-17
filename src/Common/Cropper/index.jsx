import React, { useState, useRef, useEffect, bool, forwardRef } from "react";
import UseOutsideClick from "../UseOutsideClick";
import ModalHeader from "../Modals/ModalsHeader";
import useUploadImage from "./useUploadImage";
import ModalBody from "../Modals/ModalsBody";
import FormError from "../Form/FormError";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "../Modal";
import "./Cropper.scss";
import UploadIcon from "./icon-file-upload.svg";
import { checkFileSize, isJpgPng } from "../../Classes/FileValidation";
import Modals from "../Modals";
const ImageCropper = forwardRef(
  ({ BtnPropClass, array, onUploaded, minWidth, maxWidth, maxHeight, minHeight, IconClassName, cropUploadBtn, BtnName, InputUploadIconClass, InputLabel, InputOvelapLabel, InputOvelapClass, defaultRatio, logoLand = false, banner = false, square = false, landscape = false, portrait = false, customCropper, free = false, uploadViaModel = true, filesize }, ref, props, children) => {
    // const [scaleX, setScaleX] = useState(true);
    // const [scaleY, setScaleY] = useState(true);
    const [modalState, setModalState] = useState(false);
    const cropperModalRef = useRef()
    // const ref = useRef();
    // console.log(minHeight, minWidth, defaultRatio)
    const manageModalState = () => {
      if (array) {
        cropperModalRef.current.open()
      } else {
        ref.current.open()
      }
      // setModalState(!modalState);
    };

    const isSizeAllowed = (file) => {
      const checkfilesize = checkFileSize(file.size);
      let valid = true;
      if (checkfilesize > filesize) {
        valid = false;
      }
      else {
        valid = true;
      }
      return valid;
    }

    // UseOutsideClick(ref, () => {
    //   if (modalState) setModalState(false);
    // });

    const closeModalState = () => {
      setModalState(false);
      setImage(null);
      setRawImg(null);
      setResult(null);
      setReady(false);
      setCropData(null);
      setReqError(false);

    };

    const [
      uploadToS3,
      uploadLoading,
      uploadSuccess,
      UploadError,
      uploadResponse,
      resetResponse,
    ] = useUploadImage();
    const ts = new Date()
    const [reqError, setReqError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("");
    const [cropper, setCropper] = useState();
    const [invalidFormatError, setInvalidFormatError] = useState(false)
    const onChange = (e) => {
      e.preventDefault();
      setWarning();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }


      let updatedFileName = Math.floor(ts / 1000).toString().concat(e.target.files[0].name)
      let newFileName = updatedFileName
      if (updatedFileName.includes("+")) {
        newFileName = updatedFileName.replaceAll("+", "");
      }
      // let newFileName = updatedFileName.replaceAll("+", "");
      let isAllowed = isJpgPng(newFileName);
      let sizeAllowed = isSizeAllowed(e.target.files[0]);

      if (isAllowed && sizeAllowed) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        setInvalidFormatError(false)
        files[0] && reader.readAsDataURL(files[0]);
      } else {
        setInvalidFormatError(true)
        setImage("");
      }
    };

    const [rawImg, setRawImg] = useState();
    const [result, setResult] = useState();
    const [ready, setReady] = useState(false);

    const getCropData = () => {
      setReady(true);
      if (typeof cropper !== "undefined") {
        setCropData(
          cropper
            .getCroppedCanvas({
              minWidth: minWidth,
              maxWidth: maxWidth || 600,
              minHeight: minHeight,
              maxHeight: maxHeight || 600,
              imageSmoothingQuality: "high",
            })
            .toBlob((blob) => {
              let file = new File([blob], "image.webp", { type: "image/webp" });
              const url = URL.createObjectURL(blob);
              setResult(url);
              setRawImg(file);
            }, "image/webp")
        );
      }
    };

    useEffect(() => {
      ready && result && rawImg && uploadToS3(rawImg, result);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, rawImg, ready]);

    useEffect(() => {
      if (uploadSuccess && uploadResponse) {
        onUploaded(uploadResponse);
        setReqError(false);
        resetResponse();
        closeModalState();
        setImage("")
        if (array) {
          cropperModalRef.current.close()
        } else {
          ref.current.close()
        }
      }
    }, [uploadSuccess, uploadResponse, resetResponse, onUploaded, uploadLoading, setModalState, ref, array]);



    return (
      <React.Fragment>
        {!customCropper && <React.Fragment>
          {uploadViaModel ? (
            <button
              type="button"
              className={`button ${BtnPropClass}`}
              onClick={manageModalState}
            >
              {cropUploadBtn && (
                <i className={`ed-icon icon-file-upload ${IconClassName}`}></i>
              )}
              {BtnName}
            </button>
          ) : (
            <div className="file-input-wrapper" onClick={manageModalState}>
              <label className="hidden">{InputLabel}</label>
              <input
                type="file"
                name="fileUpload"
                onChange={onChange}
              />
              <div className={InputOvelapClass}>
                <i className={`ed-icon ${InputUploadIconClass}`}></i>
                <span>{InputOvelapLabel}</span>
              </div>
            </div>
            // <button className={`button ${BtnPropClass}`} onClick={manageModalState}>
            //   <input
            //     type="file"
            //     name="fileUpload"
            //     accept="image/*"
            //     onChange={onChange}
            //   />
            //   {cropUploadBtn && (
            //     <i className={`ed-icon icon-file-upload ${IconClassName}`}></i>
            //   )}
            //   {BtnName}
            // </button>
          )}

        </React.Fragment>}
        <FormError show={warning} error="Server error" />
        <Modals
          ModalsSize="modal-xl"
          Position="center" slide="top"
          ref={array ? cropperModalRef : ref}
          className="CropImageModal"
          ClosePopUp={closeModalState}

        >
          <ModalHeader title="Image Crop" />
          <ModalBody>
            <div className="ImageCropperModalBody">
              <div className="ImageCropperModalBodyHeadGrid">
                <div className="ImageCropperHeadGridItem">
                  <div className="formFieldwrap mt-10">
                    <div className="file-input-wrapper">
                      <label className="hidden">Upload Logo</label>
                      <input
                        type="file"
                        name="fileUpload"
                        accept="image/*"
                        onChange={onChange}

                      />
                      <div className="file-input-overlap">
                        <img src={UploadIcon} alt="fileUpload icon" />
                        <span>Upload Image</span>
                      </div>
                    </div>
                    <FormError show={invalidFormatError} error="Invalid Format" />
                  </div>
                  <div className="CropOrientationBtn">
                    <div className="SelectedOrientation">
                      {banner && (
                        <button
                          className="button btn-xs button-base"
                          onClick={() => cropper?.setAspectRatio(16 / 7)}
                          type="button"
                        >
                          Banner
                        </button>
                      )}
                      {logoLand && (
                        <button
                          className="button btn-xs button-base"
                          onClick={() => cropper?.setAspectRatio(3 / 1)}
                          type="button"
                        >
                          Landscape
                        </button>
                      )}
                      {square && (
                        <button
                          className="button btn-xs button-base"
                          onClick={() => cropper?.setAspectRatio(1)}
                          type="button"
                        >
                          Square
                        </button>
                      )}
                      {landscape && (
                        <button
                          className="button btn-xs button-base"
                          onClick={() => cropper?.setAspectRatio(3 / 2)}
                          type="button"
                        >
                          Landscape
                        </button>
                      )}
                      {portrait && (
                        <button
                          className="button btn-xs button-base"
                          onClick={() => cropper?.setAspectRatio(2 / 3)}
                          type="button"
                        >
                          Portrait
                        </button>
                      )}
                    </div>
                    <div className="OrientationActionIcon">
                      <div className="actionBtnCustom">
                        <div className="groupBtn">
                          <button
                            onClick={() => cropper?.zoom(0.1)}
                            type="button"
                          >
                            <i className="ed-icon icon-zoom-in base i-xs"></i>
                          </button>
                          <button
                            onClick={() => cropper?.zoom(-0.1)}
                            type="button"
                          >
                            <i className="ed-icon icon-zoom-out base i-xs"></i>
                          </button>
                          <button
                            onClick={() => cropper?.rotate(-45)}
                            type="button"
                          >
                            <i className="ed-icon icon-rotate-left base i-xs"></i>
                          </button>
                          <button
                            onClick={() => cropper?.rotate(45)}
                            type="button"
                          >
                            <i className="ed-icon icon-rotate-right base i-xs"></i>
                          </button>
                          <button onClick={() => cropper?.reset()} type="button">
                            <i className="ed-icon icon-reset base i-xs"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* {free && (
                    <button
                      className="button btn-xs button-base"
                      onClick={() => cropper?.setAspectRatio(NaN)}
                    >
                      Free
                    </button>
                  )} */}

                    {/* <button
                    className="button btn-xs button-base"
                    onClick={() => cropper?.move(0, -10)}
                  >
                    Up
                  </button>
                  <button
                    className="button btn-xs button-base"
                    onClick={() => cropper?.move(0, 10)}
                  >
                    Down
                  </button> */}
                    {/* <button
                    className="button btn-xs button-base"
                    onClick={() => cropper?.move(-10, 0)}
                  >
                    left
                  </button>
                  <button
                    className="button btn-xs button-base"
                    onClick={() => cropper?.move(10, 0)}
                  >
                    Right
                  </button> */}

                    {/* <button
                    className="button btn-xs button-base"
                    onClick={() => {
                      setScaleX(!scaleX);
                      scaleX ? cropper?.scaleX(-1) : cropper?.scaleX(1);
                    }}
                  >
                    LeftRight
                  </button>
                  <button
                    className="button btn-xs button-base"
                    onClick={() => {
                      setScaleY(!scaleY);
                      scaleY ? cropper?.scaleY(-1) : cropper?.scaleY(1);
                    }}
                  >
                    TopBottom
                  </button> */}
                  </div>
                </div>
              </div>

              <div className="ImageCropperGrid mt-10">
                <div className="CropperUploadImageSection">
                  {image ? (
                    <Cropper
                      src={image}
                      viewMode={1}
                      zoomTo={0.5}
                      guides={true}
                      background={true}
                      responsive={true}
                      autoCropArea={0.8}
                      minCropBoxWidth={10}
                      minCropBoxHeight={10}
                      preview=".img-preview"
                      checkCrossOrigin={true}
                      checkOrientation={false}
                      aspectRatio={defaultRatio}
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      style={{ height: "50vh", width: "100%" }}
                    />
                  ) : (
                    <div className="defaultUploadImageSection bg-silver"></div>
                  )}
                </div>
                <div className="AfterCropperImageSection">
                  {/* <div
                  className={`CroopedImagePreview ${
                    cropData ? "" : "bg-silver"
                  }`}
                >
                  <div
                    className="img-preview"
                    style={{ width: "100%", float: "left", height: "200px" }}
                  />
                </div> */}
                  {uploadLoading ? (
                    <button className="button button-base btn-sm">
                      Uploading...
                    </button>
                  ) : (
                    <>
                      <div className="formFieldwrap">
                        <button
                          className="button button-base btn-sm"
                          onClick={getCropData}
                          type="button"
                        >
                          Upload
                        </button>
                        <FormError
                          show={reqError}
                          error="Kindly provide image to upload"
                        />
                        <FormError show={UploadError} error="Server error" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
        </Modals>
      </React.Fragment>
    );
  });
ImageCropper.defaultProps = {
  cropUploadBtn: true,
};

ImageCropper.propTypes = {
  cropUploadBtn: bool,
};
export default ImageCropper;
