import React, { useRef, useState } from "react";
import ModalBody from "../../Common/Modal/ModalBody";
import Modal from "../../Common/Modal";
import ModalHeader from "../../Common/Modal/ModalHeader";
import ModalFooter from "../../Common/Modal/ModalFooter";
import FormError from "../../Common/Form/FormError";
import FormInput from "../../Common/Form/FormInput";
import { IconAttachment } from "../../Common/Icon";
import ValidationFile from "../../Classes/ValidationFile";
import { getVideos, postVideos } from "../../store/actions/publicProfile";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../../Common/Upload";
import UploadButton from "../../Common/UploadButton";
import Uploader from "../../Common/ImageUploader";

export default function AddProfileVideoAlbum() {
  const dispatch = useDispatch();
  const ref=useRef()
  const [index,setIndex]=useState("")
  const {
    userProfile,
    user,
    //  videoSuccess,
    ProfilesVideo,
  } = useSelector((state) => {
    return {
      userProfile: state.publicProfile.singleProfile.data.userInfo,
      user: state.user,
      // videoSuccess: state.publicProfile.videos.success,
      ProfilesVideo: state.publicProfile.videos.data,
    };
  });

  const Id = userProfile && userProfile.user;

  const emptyAlbum = {
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
    },
    validation: false,
  };

  const [album, setAlbum] = useState(emptyAlbum);
  const [videos, setVideos] = useState([
    {
      video: "",
      isValid: false,
    },
  ]);

  const [modalState, setModalState] = useState(false);
  const [checkValid, setCheckValid] = useState(false);
  const [isVideoValid, setIsVideoValid] = useState(false);

  const handleAddClick = () => {
    let newVideos = videos;
    newVideos.push({
      video: "",
      isValid: false,
    });
    setVideos([...newVideos]);
  };

  const manageModalState = () => {
    setModalState(!modalState);
  };

  const closeModalState = () => {
    setModalState(false);
    setCheckValid(false);
    setVideos([
      {
        video: "",
        isValid: false,
      },
    ]);
    setAlbum(emptyAlbum);
    setIsVideoValid(false);
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "title":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const isFormValid = () => {
    return album.title.isValid && isVideoValid ? true : false;
  };

  const handleInput = (e) => {
    let newFields = {
      ...album,
      [e.target.name]: {
        value: e.target.value.trimStart(),
        isValid: validationConfirm(e.target.value, e.target.name),
      },
      validation: isFormValid(),
    };

    setAlbum(newFields);
  };

  const uploadImage = (data, key) => {
    let videoData = data;
    const tempVideo = videos;
    // tempVideo[key]["video"] = videoData;
    tempVideo[key] = {
      video: videoData,
      isValid: ValidationFile.validEmpty(videoData),
    };
    setVideos([...tempVideo]);
    const videoValid = ValidationFile.validEmpty(videoData);
    setIsVideoValid(videoValid);
  };

  const removeUploads = (key) => {
    videos.splice(key, 1);
    setVideos([...videos]);
  };

  const isAllVideoValid = () => {
    let checker = videos.every((everyVideo) => everyVideo.isValid === true);
    return checker;
  };

  const postData = {
    name: album.title.value,
    description: album.description.value,
    videos,
  };

  const handleSubmitAlbum = () => {
    setCheckValid(true);

    if (isFormValid() && isAllVideoValid()) {
      dispatch(postVideos(Id, postData));
      setTimeout(() => {
        dispatch(getVideos(Id));
      }, 800);
      setModalState(false);
      setVideos([
        {
          video: "",
          isValid: false,
        },
      ]);
      setAlbum(emptyAlbum);
      setIsVideoValid(false);
      setCheckValid(false);
    }
  };

  return (
    <div className="PTH-AdminManageGallery">
      <div className="PTH-Item">
        <Modal show={modalState}>
          <ModalHeader
            title="Add New Album"
            closeButton={true}
            onclose={closeModalState}
          />

          <ModalBody>
            <div className="formFieldwrap">
              <FormInput
                name="title"
                type="text"
                onChange={(e) => handleInput(e)}
                label="Album title"
                placeholder="Album title"
                value={album.title.value}
              />
              <FormError
                show={!album.title.isValid && checkValid}
                error="Title required."
              />
            </div>
            <div className="formFieldwrap position-relative">
              <textarea
                className="form-control"
                id={"exampleFormControlTextarea1"}
                rows="3"
                name="description"
                maxLength="220"
                onChange={(e) => handleInput(e)}
                placeholder="Description"
                value={album.description.value}
              ></textarea>
              <label
                className="animLabel"
                htmlFor={"exampleFormControlTextarea1"}
              >
                Album description
              </label>
              <p className="text-2xs mt-2 w-500">Max. 220 characters limit.</p>
            </div>

            <div key={""}>
              <p className="labelcst text-xs w-600">Add Video</p>
              <ul className="DashedInstructionList">
                <li className="text-xxs">
                  You can upload up to 5 video at a time.
                  <li className="text-xxs">For videos accept only .MP4 file.</li>
                </li>
              </ul>
              {videos.map((video, key) => {
                return (
                  <div className="formFieldwrap" key={key + 1}>
                    <>
                      {/* <Upload
                        onUploaded={(e) => uploadImage(e, key)}
                        label="Upload File"
                        onlyVideo={true}
                        size={10}
                        hidenFileName={true}
                        IconFileUploadClass="icon-file-upload base i-xs"
                      /> */}
                        <UploadButton
                       BtnName="Upload File"
                        IconClassName="icon-file-upload base i-xs"
                        BtnPropClass="btn-o-silver"
                       InputOvelapClass="button btn-o-primary btn-sm mt-10 primary"
                        InputOvelapLabel="Add Videos"
                        InputUploadIconClass="icon-file-upload primary i-xs"
                        onClick={() => {
                          ref.current.open();setIndex(key)
                        }}
                      />
                      <Uploader
                        onclose={() => ref.current.close()}
                        multiSelect={false}
                         size={10}
                        validationProp={"onlyVideo"}
                        discartRef={ref}
                        onUploaded={(data) => uploadImage(data,index)}
                        uploadLimit={1}
                      />
                    </>
                    {video?.video?.src && (
                      <a
                        className="btnText priamry text-2xs attachmentwithtext mt-3"
                        target="_blank"
                        rel="noreferrer"
                        href={video?.video?.src}
                      >
                        <i className="ed-icon icon-attachment gray i-xs"></i>
                        {video.video?.src}
                      </a>
                    )}
                    {videos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeUploads(key)}
                        className="button btn-o-silver primary btn-sm"
                      >
                        Remove
                      </button>
                    )}
                    <FormError
                      show={!video.isValid && checkValid}
                      error="Video required."
                    />
                  </div>
                );
              })}
              {/* <FormError
                show={!isVideoValid && checkValid}
                error="Video required."
              /> */}
            </div>
            {videos.length < 5 && (
              <button
                type="button"
                onClick={handleAddClick}
                className="button btn-o-silver primary btn-sm"
              >
                Add more
              </button>
            )}
          </ModalBody>
          <ModalFooter>
            <button onClick={handleSubmitAlbum} className="button btn-md button-theme">
              Add New Album
            </button>
          </ModalFooter>
        </Modal>
        {user && user._id === Id && ProfilesVideo.length < 5 && (
          <button
            className="button button-primary btn-oval btn-sm button-block"
            onClick={() => manageModalState()}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>Add New Album
          </button>
        )}
      </div>
    </div>
  );
}
