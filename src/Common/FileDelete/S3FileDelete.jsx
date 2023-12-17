import S3 from "react-aws-s3";
import { useDispatch } from "react-redux";
import { setCommonError } from "../../store/actions/commonerror";
import React from "react";


function S3FileDelete({ fileName }) {

  const dispatch = useDispatch();
  const config = {
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    s3Url: process.env.REACT_APP_S3_URL,
    bucketName: process.env.REACT_APP_BUCKET_NAME,

  };

  const deleteUploadedFile = () => {
    var ReactS3Client = new S3(config);
    const extractFileName = fileName.split("https://edneed-images-uat.s3.amazonaws.com/");
    const filename = "1618310296principal-img_new.jpg"
    ReactS3Client.deleteFile(filename)
      .then((data) => {
        if (data.status === 204) {
        } else {
          dispatch(
            setCommonError(
              "Error occured in uploading your file, Try again."
            )
          );
        }
      })
      .catch((error) => {
        dispatch(setCommonError(error.message));
      });
  }


  return (
    <React.Fragment>
      <button
        className="button btn-sm btn-o-red red mt-5"
        onClick={deleteUploadedFile}
      >
        {" "}
        Remove
      </button>
    </React.Fragment>
  );
}


export default S3FileDelete;
