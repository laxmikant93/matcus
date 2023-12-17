import { useState } from 'react'
import S3 from "react-aws-s3";
import { useDispatch } from "react-redux";
import { setCommonError } from "../../store/actions/commonerror";

const useUploadImage = () => {

  const dispatch = useDispatch()
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [UploadError, setUploadError] = useState(null)
  const [uploadResponse, setUploadResponse] = useState(null)

  const resetResponse = () => {
    setUploadLoading(false)
    setUploadResponse(null)
    setUploadSuccess(false)
    setUploadError(null)
  }

  const uploadToS3 = (file, newFileName) => {
    setUploadLoading(true)
    const config = {
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
      s3Url: process.env.REACT_APP_S3_URL,
      bucketName: process.env.REACT_APP_BUCKET_NAME,
    };

    const ReactS3Client = new S3(config);

    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => {
        if (data.status === 204) {
          setUploadSuccess(true);
          setUploadResponse(data);
          setUploadLoading(false);
        } else {
          dispatch(
            setCommonError(
              "Error occured in uploading your file, Try again."
            )
          );
        }
      })
      .catch((error) => {
        setUploadLoading(false);
        setUploadError(error);
        dispatch(setCommonError(error.message));
      });
  }

  return [
    uploadToS3,
    uploadLoading,
    uploadSuccess,
    UploadError,
    uploadResponse,
    resetResponse,
  ]
}

export default useUploadImage;
