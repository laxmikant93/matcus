import React from "react";
import "./uploadSection.scss";
import UnspashSection from "../UnsplashSection/UnspashSection";
import Upload from "../../Upload";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import FormTextArea from "../../Form/FormTextArea";
import FormInput from "../../Form/FormInput";
import MyFiles from "../MyFiles";
import gallary1 from "../gallary1.svg";
import { useDispatch, useSelector } from "react-redux";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Request from "../../../Classes/Request";
import blueTick from "../../../../src/assets/Icons/blueTick.svg";
import { setCommonError } from "../../../store/actions/commonerror";
import AudioImage from "../../../assets/images/audio.png";
import VideoImage from "../../../assets/images/video.png";
import FileImage from "../../../assets/images/doc.png";
const UploadSection = ({
  toggleState,
  multiSelect,
  discartRef,
  onUpload,
  searchTerm,
  uploadLimit,
  size,
  accept,
  validationProp,
  bulkUploadTrue
}) => {
  const ref = useRef();
  const UploadRequest = new Request();
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  const encodeS3URI = (filename) => {
   filename=filename.replace(/[!,@,#,$,%,^,&,(,),{,},+,_,;,:,<,>,|, ,=,~,-]/g, "")
   return encodeURI(filename)
  }
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [imageList, setImageList] = useState([]);
  const [imageIndex, setImageIndex] = useState(-1);
  const [payloadArray, setPayloadArray] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (data) => {
    let images = imageList;
    let payload = payloadArray;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      images.push(element);
      payload.push({
        src: "",
        business: "",
        owner: "",
        title: "",
        alt: "",
        key: "",
        type: fileType(element.type),
        size: 0,
        desc: "",
      });
    }
    setImageList([...images]);
    setPayloadArray([...payload]);
  };

  const removeImage = (key) => {
    let images = imageList;
    images.splice(key, 1);
    setImageList([...images]);
  };

  const cancel = () => {
    discartRef.current.close();
  };

  const fileType = (type) => {
    if (type.includes("image")) {
      return "img";
    } else if (type.includes("audio")) {
      return "music";
    } else if (type.includes("video")) {
      return "video";
    } else {
      return "file";
    }
  };

  const handleSelectImage = (item, key) => {
    if (fileType(item.type) === "img") {
      setImageIndex(key);
    }
  };

  const save = async () => {
    let payload = payloadArray;
    let s3

    setLoading(true);
    for (let index = 0; index < imageList.length; index++) {
      // let element = imageList[index];
      // const encodedName = encodeS3URI(element.name);
      // const encodedFile = new File([element], encodedName, { type: element.type });
      // imageList[index] = encodedFile;
      let finalData = imageList[index]
      let fileNameTest
      let bucketName
      let keyCheck
      let dataNow=Date.now().toString()
      if (bulkUploadTrue) {
        s3= new S3Client({
          region: process.env.REACT_APP_REGION,
          credentials: {
            accessKeyId: process.env.REACT_APP_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
          },
        });
        bucketName = process.env.REACT_APP_BUCKET_NAME_BULKUPLOAD
        fileNameTest = `${process.env.REACT_APP_S3_URL_BULKUPLOAD}/${user.user_business}/${user._id}/${dataNow}${encodeS3URI(finalData.name)}`;
        // let dataFileName = fileNameTest.split(process.env.REACT_APP_S3_URL_BULKUPLOAD);
        keyCheck = `/${user.user_business}/${user._id}/${dataNow}${encodeS3URI(finalData.name)}`;
      } else {
        s3=  new S3Client({
          region: process.env.REACT_APP_REGION,
          credentials: {
            accessKeyId: process.env.REACT_APP_ACCESS_DEV_ID,
            secretAccessKey: process.env.REACT_APP_ACCESS_DEV_KEY,
          },
        });
        bucketName = process.env.REACT_APP_BUCKET_NAME
        fileNameTest = `${process.env.REACT_APP_S3_URL}/${user.user_business}/${user._id}/${dataNow}${encodeS3URI(finalData.name)}`;
        // let dataFileName = fileNameTest.split(process.env.REACT_APP_S3_URL);
        keyCheck = `${user.user_business}/${user._id}/${dataNow}${encodeS3URI(finalData.name)}`;
      }

      console.log("line 102", keyCheck,fileNameTest,bucketName)
      let params = {
        Bucket: bucketName,
        Key: keyCheck,
        Body: finalData,
      };
      // console.log("line 103", params)
      const command = new PutObjectCommand(params);
      const data = (await s3.send(command)).$metadata;
      if (data.httpStatusCode === 200) {
        payloadArray[index]["src"] = fileNameTest;
        payloadArray[index]["business"] = user.user_business;
        payloadArray[index]["owner"] = user._id;
        payloadArray[index]["title"] = finalData.name;
        payloadArray[index]["alt"] = "";
        payloadArray[index]["size"] = finalData.size;
        payloadArray[index]["key"] = params.Key;
        payloadArray[index]["type"] = fileType(finalData.type);
        payloadArray[index]["desc"] = "";
      }
    }
    await UploadRequest.post(
      UploadRequest.url(
        "/FileUpload/UploadFileMultipleFrontend",
        "commonservices"
      ),
      payload,
      (success) => {
        setLoading(false)
        discartRef.current.close();
        if (multiSelect) {
          onUpload(success.data);
        } else {
          onUpload(success.data[0]);
        }
      },
      (error) => {
        dispatch(setCommonError("Error in upload."));
      }
    );
    setPayloadArray([...payload]);
  };
   
  const handleInput = (e) => {
    let { name, value } = e.target;
    let payload = payloadArray;
    payload[imageIndex][name] = value;
    setPayloadArray([...payload]);
  };

  const handleUnsplashImages = async (value) => {
    setLoading(true)
    await UploadRequest.post(
      UploadRequest.url(
        "/FileUpload/UploadFileMultipleFrontend",
        "commonservices"
      ),
      value,
      (success) => {
        setLoading(false)
        discartRef.current.close();
        if (multiSelect) {
          onUpload(success.data);
        } else {
          onUpload(success.data[0]);
        }
      },
      (error) => {
        dispatch(setCommonError("Error in upload."));
      }
    );
    // if (!multiSelect) {
    //   onUpload(value[0]);
    // } else {
    //   let imagesList = [];
    //   for (let index = 0; index < value.length; index++) {
    //     const element = value[index];
    //     imagesList.push(element);
    //   }
    //   onUpload([...imagesList]);
    // }
    // discartRef.current.close();
  };

  useEffect(() => {
    setImageList([]);
  }, [toggleState]);

  const handleDrag = (e) => {
    window.addEventListener(
      "dragover",
      function (e) {
        e = e || e;
        e.preventDefault();
      },
      false
    );
    window.addEventListener(
      "drop",
      function (e) {
        e = e || e;
        e.preventDefault();
      },
      false
    );
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      ref?.current?.drag(e.dataTransfer.files);
    }
  };

  const value = (index, key) => {
    if (imageIndex !== -1 && payloadArray.length > 0) {
      if (key === "src") {
        if (payloadArray[index]["type"] === "img") {
          return URL.createObjectURL(imageList[index]);
        } else if (payloadArray[index]["type"] === "audio") {
          return "";
        } else if (payloadArray[index]["type"] === "video") {
          return "";
        } else {
          return "";
        }
      } else {
        return payloadArray[index][key];
      }
    } else {
      return gallary1;
    }
  };

  const handleFilesImages = (value) => {
    if (multiSelect) {
      onUpload(value);
      discartRef.current.close();
    } else {
      onUpload(value[0]);
      discartRef.current.close();
    }
  };

  return (
    <React.Fragment>
      <div className={`${toggleState === 1 ? "active-content" : "content"}`}>
        <div className="imageUpload-wrapper">
          {imageList.length ? (
            <div className="imageUpload-more-section">
              <div className="image-upload-wrapper">
                <div className="image-upload-wrap">
                  <div
                    className={`uploadfile-wrap ${imageList.length < uploadLimit
                      ? ""
                      : "uploadfile-wrap-disable"
                      }`}
                  >
                    <i className="file-icon"></i>
                    <h5 className="text-s w-500 base text-addfiles">
                      Upload more Files
                    </h5>
                    <div className="image-upload-btn-wrapper">
                      <button className="button primary btn-xs  upload-file">
                        + Upload Media
                      </button>
                      {imageList.length < uploadLimit ? (
                        <Upload
                          size={size}
                          imageUploader={true}
                          onUploaded={(file) => handleFileUpload(file)}
                          multiSelect={multiSelect}
                          uploadLimit={(
                            uploadLimit - imageList.length
                          ).toString()}
                          validationProp={validationProp}
                          accept={accept}
                        />
                      ) : (
                        <Upload
                          disableHandel={true}
                          size={size}
                          imageUploader={true}
                          onUploaded={(file) => handleFileUpload(file)}
                          multiSelect={multiSelect}
                          uploadLimit={(
                            uploadLimit - imageList.length
                          ).toString()}
                          validationProp={validationProp}
                          accept={accept}
                        />
                      )}
                    </div>
                    {/* <small>Upload the files in .jpg, .png, .pdf formats only</small> */}
                  </div>
                  <hr />
                  <div className="images-list">
                    {imageList.map((item, key) => {
                      return (
                        <div
                          className="image-wrapper"
                          key={key}
                          onClick={() => handleSelectImage(item, key)}
                        >
                          {fileType(item.type) === "img" ? (
                            <img src={URL.createObjectURL(item)} alt="my" />
                          ) : fileType(item.type) === "music" ? (
                            <img src={AudioImage} alt="" />
                          ) : fileType(item.type) === "video" ? (
                            <img src={VideoImage} alt="" />
                          ) : (
                            <img src={FileImage} alt="" />
                          )}

                          <div
                            className="image-cross"
                            onClick={() => removeImage(key)}
                          >
                            <i className="ed-icon i-xs white icon-cross"></i>
                          </div>
                          {imageIndex === key && (
                            <img
                              src={blueTick}
                              alt="blue_tick"
                              className="blueTick"
                            />
                          )}
                          <div className="overlay"> </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* use this class  disabledWrapper in alttext-wrapper className to disabled the side bar  */}
                <div className="alttext-wrapper">
                  <p className="para text-2xs w-400 lgray pb-5 text-left">
                    Select the images to update their Alt Text
                  </p>
                  <div className="img-wrapper">
                    <div className="img-wrap">
                      <img
                        src={value(imageIndex, "src")}
                        width="149"
                        height="90"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="alt-wrap">
                    <FormTextArea
                      rows={"2"}
                      label={"Alt Text"}
                      labelPosition="top"
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      name={"alt"}
                      disabled={imageIndex === -1}
                      value={value(imageIndex, "alt")}
                    />
                  </div>
                  <div className="title-wrap">
                    <FormInput
                      type="text"
                      label="Title"
                      labelPosition={"top"}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      name={"title"}
                      value={value(imageIndex, "title")}
                      disabled={imageIndex === -1}
                    />
                  </div>
                  <div className="description-wrap">
                    <FormTextArea
                      rows={"2"}
                      label={"Description"}
                      labelPosition="top"
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      name={"desc"}
                      value={value(imageIndex, "desc")}
                      disabled={imageIndex === -1}
                    />
                  </div>
                </div>
                {/* <small>Upload the files in .jpg, .png, .pdf formats only</small> */}
              </div>
              {/* <hr />
                <div className='images-list'>

                  {
                    imageList.map((item, key) => {
                      return (
                        <div className='image-wrapper' key={key}>
                          <img src={item.location} alt="my" />
                          <div className='image-cross' onClick={() => removeImage(key)}>
                            <i className='ed-icon i-xs white icon-cross'></i>
                          </div>
                          <div className='overlay'> </div>
                        </div>
                      )
                    })
                  }
                </div> */}
              <div className="btn-div text-right">
                <button
                  className="button btn-xs btn-o-silver base"
                  onClick={cancel}
                >
                  Cancel
                </button>
                {loading ? <button className="button btn-xs button-primary">
                  Loading...
                </button> : <button className="button btn-xs button-primary" onClick={save}>
                  Done
                </button>}
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              onDragEnter={handleDrag}
              className="drag-area"
            >
              <div onDrop={handleDrop}>
                <Upload
                  className="image-upload-main"
                  ref={ref}
                  size={size}
                  imageUploader={true}
                  onUploaded={(file) => handleFileUpload(file)}
                  multiSelect={multiSelect}
                  uploadLimit={uploadLimit}
                  validationProp={validationProp}
                  accept={accept}
                />
                <div className="uploadfile-wrap">
                  <i className="file-icon"></i>
                  <h5 className="text-xs w-500 base ">
                    Start adding your files
                  </h5>
                  <p className="pb-20 text-2xs w-300 gray">
                    {dragActive
                      ? "Drop your Images"
                      : "Drag and drop files or upload from your computer"}
                  </p>
                  <div className="image-upload-btn-wrapper">
                    <button className="button button-primary btn-xs mb-20 upload-file">
                      + Upload Media
                    </button>
                  </div>

                  <div className="limit-wrapper">
                    <div className="fist-wrapper">
                      <p className="text-2xs w-400 base inline">
                        {" "}
                        <span>Size Limit :</span>{" "}
                        <span className="w-600"> &nbsp; {size}mb</span>
                      </p>
                    </div>
                    <div className="v-hr"></div>
                    <div className="fist-wrapper">
                      <p className=" text-2xs w-400 base inline">
                        Max no. of Files :{" "}
                        <span className="w-600">
                          {" "}
                          &nbsp; {uploadLimit} Files
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* } */}
              {/* {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}><h1>hiiiii</h1></div>} */}
            </form>
          )}
        </div>
      </div>
      <div className={`${toggleState === 2 ? "active-content" : "content"}`}>
        <div className="language-wrapper">
          <UnspashSection
            multiSelect={multiSelect}
            selectedUnsplashImages={handleUnsplashImages}
            toggleState={toggleState}
            search={searchTerm}
            buttonLoading={loading}
            uploadLimit={uploadLimit}
          />
        </div>
      </div>
      <div className={`${toggleState === 4 ? "active-content" : "content"}`}>
        <div className="language-wrapper">
          <MyFiles
            multiSelect={multiSelect}
            selectedMyFilesImages={handleFilesImages}
            toggleState={toggleState}
            uploadLimit={uploadLimit}
            onCancel={() => discartRef.current.close()}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadSection;
