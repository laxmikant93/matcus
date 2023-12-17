import React, { forwardRef } from "react";
import { func, string } from "prop-types";
import {
  isImageAllowed,
  checkFileSize,
  isFileImageAllowed,
  onlyXmlAllowed,
  isVideoAllowed,
  isFileOnlyImagePdf,
  isAudioAllowed,
  examAnswerFileUpload,
  isStudyMaterial,
} from "../../Classes/FileValidation";
import { useState } from "react";
import FormError from "../Form/FormError";
import IconAttachment from "./icon-attachment.svg";
import { useImperativeHandle } from "react";

const Upload = forwardRef(
  (
    {
      isFileImage,
      onlyVideo,
      onlyAudio,
      onlyXml,
      onlyImage,
      name,
      type,
      IconFileUploadClass,
      onUploaded,
      onError,
      label,
      placeholder,
      invalidError,
      className,
      fileOvelapClass,
      fileOvelapPlaceholder,
      size,
      hidenFileName = false,
      loadingModal,
      bulkUpload,
      clearFileName,
      allFiles,
      onlyImagePdf,
      multiSelect,
      disableHandel,
      uploadLimit,
      studyMaterialFiles,
      children,
      Instruction,
      accept,
      imageUploader,
      validationProp,
    },
    ref
  ) => {
  
    const [loading, setLoading] = useState(false);
    const [uploadError, setuploadError] = useState(false);
    const [filename, setfilename] = useState("");
    const [sizeError, setSizeError] = useState(false);
    const [FileUploadData, setFileUploadData] = useState([]);
    const [fileSize, setFileSize] = useState([]);
    const [Link,setLink]=useState("")
    let filesize = +size;

    let ts = Date.now();
    const handleFileSelect = async (files) => {
      setSizeError(false);
      console.log(files)
      if (files[0] === undefined) {
      } else {
        let limit = 0;
        if (uploadLimit) {
          if (files.length < uploadLimit) {
            limit = files.length;
          } else {
            limit = uploadLimit;
          }
        } else {
          limit = files.length;
        }
         const myfiles = [];
        for (let i = 0; i < limit; i++) {
          let file = files[i];
          //let newFileName = event.target.files[0].name;
          let updatedFileName = Math.floor(ts / 1000)
            .toString()
            .concat(files[i].name);
          let newFileName = updatedFileName.replaceAll("+", "");
          var isAllowed = false;

          if (validationProp==="onlyImage") {
            isAllowed = isImageAllowed(newFileName);
          } else if (validationProp==="isFileImage") {
            isAllowed = isFileImageAllowed(newFileName);
          } else if (validationProp==="onlyXml") {
            isAllowed = onlyXmlAllowed(newFileName);
          } else if (validationProp==="onlyVideo") {
            isAllowed = isVideoAllowed(newFileName);
          } else if (validationProp==="onlyAudio") {
            isAllowed = isAudioAllowed(newFileName);
          } else if (validationProp==="allFiles") {
            isAllowed = isFileImageAllowed(newFileName);
          } else if (validationProp==="onlyImagePdf") {
            isAllowed = isFileOnlyImagePdf(newFileName);
          } else if (validationProp==="studyMaterialFiles") {
            isAllowed = isStudyMaterial(newFileName);
          } else if (validationProp==="examAnswerFileUpload") {
            isAllowed = examAnswerFileUpload(newFileName);
          } else {
            isAllowed = isImageAllowed(newFileName);
          }

          const checkfilesize = checkFileSize(file.size);

          let fileSizeAllowed = 5;
          size === undefined
            ? (fileSizeAllowed = 5)
            : (fileSizeAllowed = filesize);

          if (isAllowed) {
            setuploadError(false);
            if (checkfilesize < fileSizeAllowed) {
              setFileSize(checkfilesize);
              setuploadError(false);
              setLoading(false);
              setSizeError(false);
              myfiles.push(file);
            } else {
              setSizeError(!checkfilesize < fileSizeAllowed);
              if (invalidError) {
                invalidError();
              }
            }
          } else {
            setuploadError(true);
            if (invalidError) {
              invalidError();
            }
          }
        }
        onUploaded(myfiles)
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        drag: (item) => handleFileSelect(item),
      }),
      []
    );
    return (
      <React.Fragment>
        <div className={imageUploader ? "" : "file-input-wrapper"}>
          {label && <label className="hidden">{label}</label>}
          <input
            type="file"
            onChange={(event) => handleFileSelect(event.target.files)}
            className={`form-control ${className}`}
            name={name}
            accept={accept}
            disabled={disableHandel}
            // {...props}
            multiple={true}
          />
          <div className={`file-input-overlap ${fileOvelapClass}`}>
            {children}
            {IconFileUploadClass && (
              <i className={`ed-icon ${IconFileUploadClass}`}></i>
            )}
            <span className={fileOvelapPlaceholder}>
              {!loading
                ? label
                  ? label
                  : placeholder
                : `${loading ? "Loading..." : placeholder}`}
            </span>
          </div>
        </div>
        {!uploadError && !sizeError && !hidenFileName && (
          <>
            {filename ? (
              <div className="text-xxs dgray w-300 attachmentwithtext">
                <img src={IconAttachment} alt="" />
                <a href={Link} target="_blank" rel="noopener noreferrer">
                  {filename}
                </a>
              </div>
            ) : (
              ""
            )}
          </>
        )}

        {uploadError || sizeError ? (
          ""
        ) : (
          <p className="text-xxs">{Instruction}</p>
        )}
        <FormError show={uploadError} error="Invalid file format." />
        <FormError show={sizeError} error="File size exceeds maximum limit." />
      </React.Fragment>
    );
  }
);
Upload.defaultProps = {
  name: Math.random(),
  type: "file",
  onUploaded: () => {},
  onError: () => {},
  label: undefined,
};

Upload.propTypes = {
  name: string.isRequired,
  type: string,
  onUploaded: func.isRequired,
  onError: func.isRequired,
  label: string,
};

export default Upload;
