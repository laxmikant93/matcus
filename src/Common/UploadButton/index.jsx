import React, { forwardRef } from "react";

const UploadButton = forwardRef(
  ({
    customButton,
    child,
    BtnPropClass,
    IconClassName,
    cropUploadBtn,
    BtnName,
    object,
    showLink,
    InputUploadIconClass,
    children,
    ...props
  }) => {
    return (
      <React.Fragment>
        {customButton ? (
          children
        ) : (
          <React.Fragment>
            <button type="button" className={`button ${BtnPropClass}`} {...props}>
              {cropUploadBtn && (
                <i className={`ed-icon icon-file-upload ${IconClassName}`}></i>
              )}
              {BtnName}
            </button>
            {object && showLink ?
              <a
                className="btnText priamry text-2xs attachmentwithtext mt-3"
                href={object?.key ? process.env.REACT_APP_S3_BUCKET_URL +`/`+ object?.key : object?.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ed-icon icon-attachment gray i-xs"></i>
                {object?.key ? process.env.REACT_APP_S3_BUCKET_URL +`/`+ object?.key : object?.src}
              </a>
              : ""
            }
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
);
export default UploadButton;
