import React, { useRef, useState } from "react";
import ModalBody from "../../Common/Modal/ModalBody";
import Modal from "../../Common/Modal";
import ModalHeader from "../../Common/Modal/ModalHeader";
import ModalFooter from "../../Common/Modal/ModalFooter";
import FormError from "../../Common/Form/FormError";
import Cropper from "../../Common/Cropper";
import FormInput from "../../Common/Form/FormInput";
import { IconAttachment } from "../../Common/Icon";
import ValidationFile from "../../Classes/ValidationFile";
import { getImages, postImage } from "../../store/actions/publicProfile";
import { useDispatch, useSelector } from "react-redux";
import FormTextArea from "../../Common/Form/FormTextArea";
import UploadButton from "../../Common/UploadButton";
import Uploader from "../../Common/ImageUploader";

export default function AddProfileAlbum() {
  const dispatch = useDispatch();
  const ref = useRef()
  const { userProfile, user, profileImage } = useSelector((state) => {
    return {
      userProfile: state.publicProfile.singleProfile.data.userInfo,
      user: state.user,
      profileImage: state.publicProfile.images.data,
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
  const [images, setImages] = useState([
    {
      image: "",
      isValid: false,
    },
  ]);

  const [modalState, setModalState] = useState(false);
  const [checkValid, setCheckValid] = useState(false);
  const [isImageValid, setIsImageValid] = useState(false);

  const handleAddClick = () => {
    let newImages = images;
    newImages.push({
      image: "",
      isValid: false,
    });
    setImages([...newImages]);
  };

  const manageModalState = () => {
    setModalState(!modalState);
  };

  const closeModalState = () => {
    setModalState(false);
    setCheckValid(false);
    setImages([
      {
        image: "",
        isValid: false,
      },
    ]);
    setAlbum(emptyAlbum);
    setIsImageValid(false);
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
    return album.title.isValid && isImageValid ? true : false;
  };

  const isAllImagesValid = () => {
    let checker = images.every((everyImage) => everyImage.isValid === true);
    return checker;
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
    let imgData = data;
    const tempImage = images;
    // tempImage[key]["image"] = imgData;
    tempImage[key] = {
      image: imgData,
      isValid: ValidationFile.validEmpty(imgData),
    };
    setImages([...tempImage]);
    const imgValid = ValidationFile.validEmpty(imgData);
    setIsImageValid(imgValid);
  };

  const removeUploads = (key) => {
    images.splice(key, 1);
    setImages([...images]);
  };

  const postData = {
    name: album.title.value,
    description: album.description.value,
    images,
  };
  const [index,setIndex]=useState("")
  const handleSubmitAlbum = () => {
    setCheckValid(true);
    if (isFormValid() && isAllImagesValid()) {
      dispatch(postImage(Id, postData));
      setTimeout(() => {
        dispatch(getImages(Id));
      }, 800);
      setModalState(false);
      setAlbum(emptyAlbum);
      setImages([
        {
          image: "",
          isValid: false,
        },
      ]);
      setIsImageValid(false);
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
                label="Album Title"
                placeholder="Album Title"
                value={album.title.value}
              />
              <FormError
                show={!album.title.isValid && checkValid}
                error="Title is required."
              />
            </div>
            <div className="formFieldwrap position-relative">
              <FormTextArea
                className="form-control"
                id={"exampleFormControlTextarea1"}
                rows="3"
                name="description"
                maxLength="220"
                onChange={(e) => handleInput(e)}
                placeholder="Description"
                value={album.description.value}
                label="Image description"
              />
              <p className="text-2xs mt-2 w-500">Max. 220 characters limit.</p>
            </div>

            <div key={""}>
              <p className="labelcst text-xs w-600">Add Images</p>
              <ul className="DashedInstructionList">
                <li className="text-xxs">
                  You can upload up to 10 images at a time.
                </li>
                <li className="text-xxs">
                  For images accept only .PNG .JPG or .JPEG file format.
                </li>
              </ul>
              {images.map((image, key) => {
                return (
                  <React.Fragment key={key + 1}>
                    <div className="formFieldwrap">
                    
                      <UploadButton
                       BtnName="Upload Image"
                        IconClassName="i-md gray"
                        BtnPropClass="btn-o-silver"
                       InputOvelapClass="button btn-o-primary btn-sm mt-10 primary"
                        InputOvelapLabel="Add Images"
                        InputUploadIconClass="icon-file-upload primary i-xs"
                        onClick={() => {
                          ref.current.open();setIndex(key)
                        }}
                      />
                      <Uploader
                        onclose={() => ref.current.close()}
                        multiSelect={false}
                        discartRef={ref}
                        onUploaded={(data) => uploadImage(data,index)}
                        uploadLimit={1}
                      />
                      <FormError
                        show={!isImageValid && checkValid}
                        error="Image required."
                      />

                      {/* <FormError
                        show={!image.isValid && checkValid}
                        error="Image required."
                      /> */}
                      {image.image?.src && (
                        <a
                          className="btnText priamry text-2xs attachmentwithtext mt-3"
                          target="_blank"
                          rel="noreferrer"
                          href={image.image?.src}
                        >
                          <i className="ed-icon icon-attachment gray i-xs"></i>
                          {image.image?.src}
                        </a>
                      )}
                      {images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeUploads(key)}
                          className="button btn-o-red red btn-xs mt-10"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
              {/* <FormError
                show={!isImageValid && checkValid}
                error="Image required."
              /> */}
            </div>
            {images.length < 10 && (
              <button
                type="button"
                onClick={handleAddClick}
                className="button btn-o-silver primary btn-sm"
              >
                Add More
              </button>
            )}
          </ModalBody>
          <ModalFooter>
            <button onClick={handleSubmitAlbum} className="button btn-md button-theme">
              Add New Album
            </button>
          </ModalFooter>
        </Modal>
        {user && user._id === Id && profileImage.length < 10 && (
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
