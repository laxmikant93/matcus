import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  deleteAlbum,
  deleteImage,
  editAlbum,
  getImages,
} from "../../store/actions/publicProfile";
import AddProfileAlbum from "./AddProfileAlbum";
import Cropper from "../../Common/Cropper";
import { useDetectOutsideClick } from "../../Common/DetectOutsideClick/useDetectOutsideClick";
import FormInput from "../../Common/Form/FormInput";
import ValidationFile from "../../Classes/ValidationFile";
import FormError from "../../Common/Form/FormError";
import GalarySlider from "../../Common/GalarySlider";
import ImageViewer from "../../Common/ImageViewer";
import UploadButton from "../../Common/UploadButton";
import Uploader from "../../Common/ImageUploader";

const ProfileGallery = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const ref = useRef()
  const { userProfile, profileImage, imageSuccess, user } = useSelector(
    (state) => {
      return {
        imageSuccess: state.publicProfile.images.success,
        userProfile: state.publicProfile.singleProfile.data.userInfo,
        profileImage: state.publicProfile.images.data,
        user: state.user,
      };
    }
  );

  const [isEditable, SetIsEditable] = useState(false);
  const [index,setIndex]=useState("")
  const Id = userProfile && userProfile.user;
  const IsUserFound = Id === user._id;
  useEffect(() => {
    Id && dispatch(getImages(Id));
    SetIsEditable(false);
  }, [dispatch, Id]);

  // const AddAwardModalState = () => {
  //   SetAddAwardModal(!AddAwardModal);
  // };

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

  const [editImageData, setEditImageData] = useState("");
  const [albumId, setAlbumId] = useState("");
  // const [galleryPopup, setGalleryPopup] = useState({});
  const [previewModel, setpreviewModel] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [storedPopUpImage, setStoredPopUpImage] = useState([]);

  const manageModalState = (albumId, editData) => {
    SetIsEditable(true);
    setEditImageData(editData);
    setAlbumId(albumId);
  };

  useEffect(() => {
    setEditData({
      name: {
        value: editImageData.name,
        isValid: editImageData.name ? true : false,
      },
      description: {
        value: editImageData.description,
        isValid: editImageData.description ? true : false,
      },
    });
  }, [editImageData]);

  // const albumid = data.id;

  const editAlbumData = {
    id: albumId,
    name: editData.name.value,
    description: editData.description.value,
  };

  const handleSave = () => {
    setNameValid(true);

    if (editData.name.isValid) {
      dispatch(editAlbum(Id, editAlbumData));
      setNameValid(false);
      SetIsEditable(false);
      setTimeout(() => {
        dispatch(getImages(Id));
      }, 800);
    }
  };

  const handleClose = () => {
    SetIsEditable(false);
    setNameValid(false);
    setEditData({
      name: {
        value: editImageData.name,
        isValid: editImageData.name ? true : false,
      },
      description: {
        value: editImageData.description,
        isValid: editImageData.description ? true : false,
      },
    });
  };

  const uploadImage = (data, albumId) => {
    let imgData = data;
    // console.log(albumId, "hihhiih")
    const addImageData = {
      id: albumId,
      images: [
        {
          image: imgData,
        },
      ],
    };
    dispatch(addImage(Id, addImageData));
    setTimeout(() => {
      dispatch(getImages(Id));
    }, 800);
  };

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [imageId, setImageId] = useState("");
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setImageId(_id);
    setIsActive(isActive);
  };

  const removeAlbum = (albumid, isActive) => {
    dispatch(deleteAlbum(Id, { id: albumid }));
    setTimeout(() => {
      dispatch(getImages(Id));
    }, 800);
    setIsActive(isActive);
  };

  const removeImage = (albumid, id, isActive) => {
    dispatch(deleteImage(Id, { id: albumid, imageid: id }));
    setTimeout(() => {
      dispatch(getImages(Id));
    }, 800);
    setIsActive(isActive);
  };

  const [current, setCurrent] = useState(0);

  const handleImagePopup = (image, galaryImage) => {
    setStoredPopUpImage(galaryImage);
    setpreviewModel(true);

    galaryImage.forEach((storedImage, index) =>
      storedImage.image === image ? setCurrent(index) : null
    );
  };

  const closeModel = () => {
    setpreviewModel(false);
    setCurrent(0);
  };

  return (
    <div className="ProfileGalleryPhoto">
      <div className="GalleryPhotoHead">
        <div className="PR-Head">
          <p className="text-sm">
            <span>{imageSuccess && profileImage.length}</span>&nbsp; Album
          </p>
          {IsUserFound && <small>You can add upto 10 albums.</small>}
        </div>
        {profileImage.length < 10 && <AddProfileAlbum />}
      </div>

      <div className="GalleryPhotoBody">
        {imageSuccess && profileImage && profileImage.length > 0 ? (
          profileImage.map((ProfileGallaeryImg) => {
            return (
              <React.Fragment key={ProfileGallaeryImg._id}>
                <div className="AlbumPhotoList">
                  <div className="AlbumPhotoListHead mb-10">
                    <div className="ProfileAlbumName">
                      {isEditable && ProfileGallaeryImg._id === albumId ? (
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
                          <p className="text-sm">{ProfileGallaeryImg.name}</p>
                          <small>{ProfileGallaeryImg.description}</small>
                        </>
                      )}
                      {/* <small>You can add upto 10 images in this albums.</small> */}
                    </div>
                    {/* *DO NOT REMOVE */}
                    <div className="ProfileAlbumAction">
                      {isEditable && ProfileGallaeryImg._id === albumId ? (
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
                            // onClick={() => SetIsEditable(false)}
                            onClick={handleClose}
                          >
                            <i className="ed-icon icon-delete primary i-xs"></i>
                            Cancel
                          </button>
                        </>
                      ) : (
                        IsUserFound && (
                          <>
                            <button
                              className="button btn-o-primary primary btn-xs"
                              onClick={() =>
                                manageModalState(
                                  ProfileGallaeryImg._id,
                                  ProfileGallaeryImg
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
                                  ProfileGallaeryImg._id,
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
                      {/* <button className="button button-primary btn-oval btn-xs">
                        <i className="ed-icon icon-plus-add white i-xs"></i>
                        Add New Image
                      </button> */}
                      {ProfileGallaeryImg.images.length < 10 && IsUserFound && (
                        <React.Fragment>
                         <UploadButton
                       BtnName="Add more images"
                        IconClassName="i-md gray"
                        BtnPropClass="btn-o-silver"
                      InputOvelapLabel="Add New Images"
                          InputUploadIconClass="icon-plus-add primary i-xs"
                        onClick={() => {
                          ref.current.open();setIndex(ProfileGallaeryImg._id)
                        }}
                      />
                      <Uploader
                        onclose={() => ref.current.close()}
                        multiSelect={false}
                        discartRef={ref}
                        onUploaded={(data) => uploadImage(data, index)}
                        uploadLimit={1}
                      />
                        </React.Fragment>
                      )}
                      {/* delete popup */}
                      {ProfileGallaeryImg._id === imageId && (
                        <div
                          ref={dropdownRef}
                          className={`popup removePopup ${isActive ? "active" : "inactive"
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
                                removeAlbum(ProfileGallaeryImg._id, false)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {ProfileGallaeryImg.images.map(
                    (ProfileGallaeryImages, index) => {
                      return (
                        ProfileGallaeryImages.isDeleted !== true && (
                          <div
                            key={ProfileGallaeryImages._id}
                            className="AlbumImageWrapper"
                          >
                            <ImageViewer
                              object={ProfileGallaeryImages.image}
                              onClick={() => {
                                handleImagePopup(
                                  ProfileGallaeryImages.image,
                                  ProfileGallaeryImg.images
                                );
                              }}
                            />
                            {IsUserFound && (
                              <div className="PublicProfileActionButtonAfter">
                                <span
                                  className="DelBtn"
                                  onClick={() =>
                                    removeImage(
                                      ProfileGallaeryImg._id,
                                      ProfileGallaeryImages._id,
                                      false
                                    )
                                  }
                                >
                                  <i className="ed-icon icon-delete white i-xs"></i>
                                </span>
                              </div>
                            )}
                          </div>
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
          sliderContent={storedPopUpImage}
          closeModel={closeModel}
          startFromIndex={current}
          sliderForImage={true}
        />
      )}
    </div>
  );
};

export default ProfileGallery;
