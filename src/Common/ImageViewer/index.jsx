import React, { forwardRef } from "react";

const ImageViewer = forwardRef(({ object, defaultImage, ...props }) => {
  return (
    <React.Fragment>
      {object?.key ? (
        <img
          src={process.env.REACT_APP_S3_BUCKET_URL+`/`+ object?.key ? process.env.REACT_APP_S3_BUCKET_URL + `/`+ object?.key : defaultImage}
          alt={object?.alt}
          {...props} />
      ) : (
        <img
          src={object?.src ? object.src : defaultImage}
          alt={object?.alt}
          {...props} />
      )}
    </React.Fragment>
  );
});
export default ImageViewer