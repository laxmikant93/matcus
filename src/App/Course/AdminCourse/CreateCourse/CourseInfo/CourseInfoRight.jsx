import React, { useEffect, useRef, useState } from "react";
import Upload from "../../../../../Common/Upload";
// import IconVideoDummy from "../../../../../assets/Icons/icon-video-dummy.svg";
// import IconImageDummy from "../../../../../assets/Icons/icon-image-dummy.svg";
import Cropper from "../../../../../Common/Cropper";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import DummyVideo from "../../../../../Common/DummyMedia/DummyVideo";
import DummyImage from "../../../../../Common/DummyMedia/DummyImage";
import ImageViewer from "../../../../../Common/ImageViewer";
import UploadButton from "../../../../../Common/UploadButton";
import Uploader from "../../../../../Common/ImageUploader";
const CourseInfoRight = ({ onImageUpload, onVideoUpload, onDefaultBanner }) => {
  const [imageBanner, setImageBanner] = useState("");
  const [videoBanner, setVideoBanner] = useState("");
  const { bannerData, dataState } = useSelector((state) => {
    return {
      bannerData: state.admincourse.getSingleCourseInfoData.data,
      dataState: state.admincourse.getSingleCourseInfoData,
    };
  });
  const ref = useRef();
  const videoRef = useRef();
  const [defaultBanner, setDefaultBanner] = useState("video");
  const { _id } = useParams();
  useEffect(() => {
    if (_id && dataState.success && !dataState.loading) {
      setImageBanner(bannerData.courseBanner);
      setVideoBanner(bannerData.courseIntroVideo);
      setDefaultBanner(
        bannerData.defaultBanner ? bannerData.defaultBanner : "video"
      );
      // setStartDate(getCourseInfoData.courseTitle)
      // setDurationMonth(getCourseInfoData.courseTitle)
      // setDurationYear(getCourseInfoData.courseTitle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, dataState.loading, dataState.success]);

  const handleVideoUpload = (data) => {
    setVideoBanner(data);
    onVideoUpload(data);
  };

  const updateImage = (data) => {
    setImageBanner(data);
    onImageUpload(data);
  };

  const removeImageBanner = () => {
    setImageBanner("");
    setDefaultBanner("");
    onDefaultBanner("");
  };
  const removeVideoBanner = () => {
    setVideoBanner("");
    setDefaultBanner("");
    onDefaultBanner("");
  };
  const handleRadioButton = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "image":
        setDefaultBanner(inputValue);
        onDefaultBanner(inputValue);
        break;
      case "video":
        setDefaultBanner(inputValue);
        onDefaultBanner(inputValue);
        break;
      default:
        return false;
    }
  };
  // useEffect(() => {
  //   if (
  //     imageBanner &&
  //     videoBanner
  //   ) {
  //     setDefaultBanner("video");
  //     onDefaultBanner("video")
  //   }
  // }
  //   , [defaultBanner, imageBanner, onDefaultBanner, videoBanner]);
  // useEffect(() => {
  //   onImageUpload(imageBanner)
  // }, [imageBanner, onImageUpload])
  // useEffect(() => {
  //   onVideoUpload(videoBanner)
  // }, [onVideoUpload, videoBanner])
  return (
    <div className="CourseInfoMediaUpload">
      <div className="UploadBanner">
        <div className="DummyUploadBanner mb-20">
          {imageBanner?.src ? (
            <ImageViewer object={imageBanner} className="banner-image"/>
          ) : (
            <DummyImage Caption="No Image Available" />
          )}
        </div>
        <div className="ActionUploadBanner">
          <UploadButton
            IconClassName="i-md primary"
            BtnPropClass="button btn-xs btn-o-primary primary w-400"
            BtnName={imageBanner?.src ? "Update Banner" : "Upload Banner"}
            onClick={() => {
              ref.current.open();
            }}
          />

          {/* Upload Banner
          </button> */}
          {imageBanner && (
            <button
              type="button"
              onClick={removeImageBanner}
              className="button btn-xs btn-o-red red"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      <div className="UploadVideo mt-20">
        <div className="DummyUploadVideo mb-20">
          {videoBanner?.src ? (
            <video
              className="banner-video"
              // height="180"
              src={videoBanner?.src}
              controls
              // className="gallery-thumnail"
              alt=""
            ></video>
          ) : (
            <DummyVideo Caption="No Video Available" />
          )}
        </div>
        <div className="ActionUploadVideo">
          {/* <button
            type="button"
            className="button btn-xs btn-o-primary primary"
          > */}
          <div className="formFieldwrap">
            <UploadButton
              IconFileUploadClass="icon-file-upload btn-xs primary i-xs"
              fileOvelapClass="videoBanner-text"
              BtnName={videoBanner?.src ? "Update Banner" : "Upload Banner"}
              BtnPropClass="button btn-xs btn-o-primary primary w-400"
              onClick={() => {
                videoRef.current.open();
              }}
            />
          </div>
          <div className="formFieldwrap">
            {/* </button> */}
            {videoBanner?.src ? (
              <button
                type="button"
                onClick={removeVideoBanner}
                className="button btn-xs btn-o-red red"
              >
                Remove
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {imageBanner?.src && videoBanner?.src ? (
        <div className="input-custom-type inline SelectOptUpload">
          <label className={defaultBanner === "image" ? "active" : ""}>
            <input
              type="radio"
              name="image"
              onChange={handleRadioButton}
              value="image"
              checked={defaultBanner === "image"}
            />
            Image
          </label>
          <label className={defaultBanner === "video" ? "active" : ""}>
            <input
              type="radio"
              name="video"
              onChange={handleRadioButton}
              value="video"
              checked={defaultBanner === "video"}
            />
            Video
          </label>
        </div>
      ) : (
        ""
      )}
      <Uploader
        onclose={() => ref.current.close()}
        multiSelect={false}
        discartRef={ref}
        onUploaded={(data) => updateImage(data)}
        uploadLimit={1}
      />
      <Uploader
        onclose={() => videoRef.current.close()}
        multiSelect={false}
        discartRef={videoRef}
        validationProp={"onlyVideo"}
        size={15}
        onUploaded={(data) => handleVideoUpload(data)}
        uploadLimit={1}
      />
    </div>
  );
};

export default CourseInfoRight;
