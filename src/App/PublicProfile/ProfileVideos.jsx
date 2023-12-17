import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  addVideos,
  deleteVideoAlbum,
  deleteVideos,
  editVideoAlbum,
  getVideos,
} from "../../store/actions/publicProfile";
import AddProfileVideoAlbum from "./AddProfileVideoAlbum";
import Upload from "../../Common/Upload";
import FormInput from "../../Common/Form/FormInput";
import FormError from "../../Common/Form/FormError";
import ValidationFile from "../../Classes/ValidationFile";
import GalarySlider from "../../Common/GalarySlider";
import UploadButton from "../../Common/UploadButton";
import Uploader from "../../Common/ImageUploader";

const ProfileVideos = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const { userProfile, ProfilesVideo, videoSuccess, user } = useSelector(
    (state) => {
      return {
        videoSuccess: state.publicProfile.videos.success,
        userProfile: state.publicProfile.singleProfile.data.userInfo,
        ProfilesVideo: state.publicProfile.videos.data,
        user: state.user,
      };
    }
  );

  const Id = userProfile && userProfile.user;
  const isUserFound = Id === user._id;
  const [isEditable, SetIsEditable] = useState(false);

  useEffect(() => {
    dispatch(getVideos(Id));
    SetIsEditable(false);
  }, [dispatch, Id]);

  const [editData, setEditData] = useState({
    name: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "name":
        return ValidationFile.validEmpty(inputValue);
      case "description":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const isFormValid = () => {
    return editData.name.isValid ? true : false;
  };

  const handleOnchange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let newData = {
      ...editData,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };
    setEditData(newData);
  };

  // const [modalState, setModalState] = useState(false);
  const [editVideoData, setEditVideoData] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [galleryPopup, setGalleryPopup] = useState({});
  const [previewModel, setpreviewModel] = useState(false);
  const [nameValid, setNameValid] = useState(false);

  const manageModalState = (albumId, editData) => {
    SetIsEditable(true);
    setEditVideoData(editData);
    setAlbumId(albumId);
  };

  useEffect(() => {
    setEditData({
      name: {
        value: editVideoData.name,
        isValid: editVideoData.name ? true : false,
      },
      description: {
        value: editVideoData.description,
        isValid: editVideoData.description ? true : false,
      },
    });
  }, [editVideoData]);

  const editAlbumData = {
    id: albumId,
    name: editData.name.value,
    description: editData.description.value,
  };

  const handleSave = () => {
    setNameValid(true);

    if (editData.name.isValid) {
      dispatch(editVideoAlbum(Id, editAlbumData));
      setNameValid(false);
      SetIsEditable(false);
      setTimeout(() => {
        dispatch(getVideos(Id));
      }, 800);
    }
  };

  const handleClose = () => {
    SetIsEditable(false);
    setNameValid(false);
    setEditData({
      name: {
        value: editVideoData.name,
        isValid: editVideoData.name ? true : false,
      },
      description: {
        value: editVideoData.description,
        isValid: editVideoData.description ? true : false,
      },
    });
  };
  const ref = useRef();
  const uploadImage = (data, albumId) => {
    let videoData = data;

    const addVideoData = {
      id: albumId,
      videos: [
        {
          video: videoData,
        },
      ],
    };
    dispatch(addVideos(Id, addVideoData));
    setTimeout(() => {
      dispatch(getVideos(Id));
    }, 800);
  };

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [videoId, setVideoId] = useState("");
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setVideoId(_id);
    setIsActive(isActive);
  };

  const removeAlbum = (albumid, isActive) => {
    dispatch(deleteVideoAlbum(Id, { id: albumid }));
    setTimeout(() => {
      dispatch(getVideos(Id));
    }, 800);
    setIsActive(isActive);
  };

  const removeVideo = (albumId, id, isActive) => {
    dispatch(deleteVideos(Id, { id: albumId, videoid: id }));
    setTimeout(() => {
      dispatch(getVideos(Id));
    }, 800);
    setIsActive(isActive);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoPopup = (videos, video) => {
    setGalleryPopup(videos);
    setpreviewModel(true);

    videos.forEach((storedVideo, index) =>
      storedVideo.video === video ? setCurrentIndex(index) : null
    );
  };

  const closeModel = () => {
    setpreviewModel(false);
  };

  return (
    <div className="ProfileGalleryVideo">
      <div className="GalleryVideoHead">
        <div className="GalleryVideo-Head">
          <p className="text-sm">
            <span>{videoSuccess && ProfilesVideo && ProfilesVideo.length}</span>
            &nbsp; Album
          </p>
          {isUserFound && <small>You can add upto 5 playlist.</small>}
        </div>
        {ProfilesVideo.length < 5 && <AddProfileVideoAlbum />}
      </div>
      <div className="GalleryVideoBody">
        {videoSuccess && ProfilesVideo && ProfilesVideo.length > 0 ? (
          ProfilesVideo.map((ProfileGallaeryVideo) => {
            return (
              <React.Fragment key={ProfileGallaeryVideo._id}>
                <div className="AlbumVideoList">
                  <div className="AlbumVideoListHead">
                    <div className="AlbumVideoListHeadInner">
                      <div className="ProfileVideoAlbumName mb-10">
                        {isEditable && ProfileGallaeryVideo._id === albumId ? (
                          <>
                            <div className="formFieldwrap">
                              <FormInput
                                type="text"
                                placeholder="Add Album Title"
                                name="name"
                                label="Album Title"
                                value={editData.name.value}
                                onChange={handleOnchange}
                                maxLength="100"
                              />
                              <FormError
                                show={!editData.name.isValid && nameValid}
                                error="Please enter Album Title."
                              />
                            </div>
                            <FormInput
                              type="text"
                              placeholder="Add Description ( max 100 characters allowed)"
                              name="description"
                              label="Description"
                              value={editData.description.value}
                              onChange={handleOnchange}
                              maxLength="100"
                            />
                          </>
                        ) : (
                          <>
                            <p className="text-sm">
                              {ProfileGallaeryVideo.name}
                            </p>
                            <small>{ProfileGallaeryVideo.description}</small>
                          </>
                        )}
                      </div>
                      {/* *DO NOT REMOVE */}
                      <div className="ProfileVideoAlbumAction">
                        {isEditable && ProfileGallaeryVideo._id === albumId ? (
                          <>
                            <button
                              className="button btn-o-primary primary btn-xs"
                              onClick={handleSave}
                            >
                              <i className="ed-icon icon-edit primary i-xs"></i>
                              Save
                            </button>
                            <button
                              className="button btn-o-primary primary btn-xs"
                              onClick={handleClose}
                            >
                              <i className="ed-icon icon-delete primary i-xs"></i>
                              Cancel
                            </button>
                          </>
                        ) : (
                          isUserFound && (
                            <>
                              <button
                                className="button btn-o-primary primary btn-xs"
                                onClick={() =>
                                  manageModalState(
                                    ProfileGallaeryVideo._id,
                                    ProfileGallaeryVideo
                                  )
                                }
                              >
                                <i className="ed-icon icon-edit primary i-xs"></i>
                                Edit
                              </button>
                              <button
                                className="button btn-o-primary primary btn-xs"
                                onClick={() =>
                                  onClickBtnDropDownRemove(
                                    ProfileGallaeryVideo._id,
                                    true
                                  )
                                }
                              >
                                <i className="ed-icon icon-delete primary i-xs"></i>
                                Delete
                              </button>
                            </>
                          )
                        )}
                        {ProfileGallaeryVideo.videos.length < 5 &&
                          isUserFound && (
                            <div className="addNewVideoBtn">
                              <UploadButton
                                BtnName="Upload Image"
                                IconFileUploadClass="icon-plus-add primary i-xs"
                                fileOvelapPlaceholder="primary text-xxs"
                                onClick={() => {
                                  ref.current.open();
                                }}
                              />
                              <Uploader
                                onclose={() => ref.current.close()}
                                multiSelect={false}
                                discartRef={ref}
                                onUploaded={(data) =>
                                  uploadImage(data, ProfileGallaeryVideo._id)
                                }
                                uploadLimit={1}
                              />
                            </div>
                          )}
                      </div>
                      {/* delete popup */}
                      {ProfileGallaeryVideo._id === videoId && (
                        <div
                          ref={dropdownRef}
                          className={`popup removePopup ${
                            isActive ? "active" : "inactive"
                          }`}
                        >
                          <p className="heading text-xxs">
                            You are about to remove this Album.
                          </p>
                          <p className="sub-heading red text-xxs">
                            Are you sure?
                          </p>
                          <div className="removePopBtn">
                            <button
                              className="button btn-o-silver dgray btn-sm"
                              onClick={() => setIsActive(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="button button-red btn-sm"
                              onClick={() =>
                                removeAlbum(ProfileGallaeryVideo._id, false)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {ProfileGallaeryVideo.videos.map(
                    (ProfileGallaeryVideos, index) => {
                      return (
                        ProfileGallaeryVideos.isDeleted !== true && (
                          <>
                            <div
                              key={ProfileGallaeryVideos._id}
                              className="PP-AlbumVideoItem"
                            >
                              <video
                                width="100%"
                                height="250"
                                autoPlay
                                onClick={() => {
                                  handleVideoPopup(
                                    ProfileGallaeryVideo.videos?.src,
                                    ProfileGallaeryVideos.video?.src
                                  );
                                }}
                              >
                                <source
                                  src={ProfileGallaeryVideos.video?.src}
                                  type="video/mp4"
                                />
                              </video>

                              <div className="PP-AlbumVideoIcon">
                                <i className="ed-icon icon-video white i-xs"></i>
                              </div>
                              {isUserFound && (
                                <div className="PublicProfileActionButtonAfter">
                                  <span
                                    className="DelBtn"
                                    onClick={() =>
                                      removeVideo(
                                        ProfileGallaeryVideo._id,
                                        ProfileGallaeryVideos._id,
                                        false
                                      )
                                    }
                                  >
                                    <i className="ed-icon icon-delete white i-s"></i>
                                  </span>
                                </div>
                              )}
                            </div>
                          </>
                        )
                      );
                    }
                  )}
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <p>Not Added Yet</p>
        )}
      </div>

      {previewModel && (
        <GalarySlider
          sliderContent={galleryPopup}
          closeModel={closeModel}
          startFromIndex={currentIndex}
          sliderForImage={false}
        />
      )}
    </div>
  );
};

export default ProfileVideos;
