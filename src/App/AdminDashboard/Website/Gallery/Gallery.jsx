/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import FormInput from "../../../../Common/Form/FormInput";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGalleryData,
  getGalleryData,
  postGalleryData,
} from "../../../../store/actions/gallary";
import { useNavigate } from "react-router-dom";
import Upload from "../../../../Common/Upload";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../../../Common/SectionTitle";
import ModalBody from "../../../../Common/Modal/ModalBody";
import Modal from "../../../../Common/Modal";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import Cropper from "../../../../Common/Cropper";
import { IconAttachment } from "../../../../Common/Icon";
import "./Gallery.scss";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import SelectInput from "../../../../Common/Form/SelectInput";
import TextEditor from "../../../../Common/Form/TextEditor";
import ImageViewer from "../../../../Common/ImageViewer";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
export default function DashboardFacultyList() {
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const titleRef = useRef(null);
  const [index, setIndex] = useState("");
  const dispatch = useDispatch();
  const galleryData = useSelector((state) => state.gallery.list.data);
  const [showError, setShowError] = useState(false);
  const users = useSelector((state) => state.user);
  const [galleryId, setGalleryId] = useState("");
  const videoRef = useRef(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    dispatch(getGalleryData(users.user_institute, users.user_business_type));
  }, [users, dispatch]);

  setTimeout(() => {
    setGallery(galleryData);
  }, 500);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setGalleryId(_id);
    setIsActive(isActive);
  };

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [showTitleError, setShowTitleError] = useState(false);

  const emptyImage = [];

  const [albumDesc, setAlbumDesc] = useState("");
  const [inputFields, setInputFields] = useState(emptyImage);
  const ref = useRef();
  const emptyAlbum = {
    title: {
      value: "",
      isValid: false,
    },
    institute: {
      value: users.userinfo_institute,
    },
    owner: {
      value: users._id,
    },
    featuredFlag: true,
    validation: false,
  };
  const [albumData, setAlbumData] = useState(emptyAlbum);

  const [modalState, setModalState] = useState(false);

  const manageModalState = () => {
    const album = [];
    album.push({
      kind: "",
      images: "",
      videos: "",
      description: "",
      featuredFlag: true,
    });
    setInputFields(album);
    setAlbumData(emptyAlbum);
    setModalState(!modalState);
  };

  const closeModalState = () => {
    titleRef.current.value = "";
    setInputFields(emptyImage);
    setAlbumData(emptyAlbum);
    setShowError(false);
    setShowTitleError(false);
    setModalState(false);
  };

  const handleAddClick = () => {
    let allNew = inputFields;
    allNew.push({
      kind: "",
      images: "",
      videos: "",
      description: "",
      featuredFlag: true,
    });
    setInputFields([...allNew]);
  };
  const handleRemoveClick = (position) => {
    let newinputs = inputFields.filter((gallery, index) => index !== position);
    setInputFields([...newinputs]);
  };

  //create Album
  const uploadImage = (data, key) => {
    let imgData = data;
    let allinputs = inputFields;
    if (allinputs[key]["kind"] === "images") {
      allinputs[key]["images"] = imgData;
      allinputs[key]["videos"] = "";
    } else {
      allinputs[key]["images"] = "";
      allinputs[key]["videos"] = imgData;
    }
    setInputFields([...allinputs]);
  };

  const handleInput = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    let galleryData = {
      ...albumData,
      [inputName]: {
        value: inputValue,
        isValid: ValidationFile.validEmpty(inputValue),
      },
      validation: formValid(),
    };
    setAlbumData(galleryData);
  };

  const formValid = () => {
    return albumData.title.isValid;
  };

  const handleSelect = (e, key) => {
    let newValue = e.target.value;
    const allinputs = inputFields;
    allinputs[key]["kind"] = newValue;
    setInputFields([...allinputs]);
  };

  const handleDescription = (value, key) => {
    let newValue = value;
    const allinputs = inputFields;
    allinputs[key]["description"] = newValue;
    setInputFields([...allinputs]);
  };

  const sendGalleryData = () => {
    return {
      title: albumData.title.value,
      images: inputFields,
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      industry: users.user_business_type,
    };
  };

  //post data
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTitleError(true);
    setShowError(true);
    if (
      albumData.title.isValid &&
      inputFields.every((i) => i["images"] || i["videos"]) &&
      inputFields.every((i) => i["kind"])
    ) {
      setShowError(false);
      dispatch(postGalleryData(sendGalleryData()));
      closeModalState(false);
      setTimeout(() => {
        dispatch(
          getGalleryData(users.user_institute, users.user_business_type)
        );
      }, 300);
    }
  };

  const history = useNavigate();
  const EditItem = (_id) => {
    history(`/edit-gallery/${_id}`);
  };
  const DeleteItem = (_id) => {
    dispatch(deleteGalleryData(_id, users.user_business_type));
  };

  const removeFile = (key) => {
    setShowError(false);
    const temp = inputFields;
    temp[key]["videos"]
      ? (temp[key]["videos"] = "")
      : (temp[key]["images"] = "");
    setInputFields([...temp]);
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/gallery-list" title="Gallery" />
      </Breadcrumb>
      <div className="PageTopHead PTH-AdminManageGallery mt-30">
        <div className="PTH-Item">
          {gallery && (
            <h3 className="text-sm w-300">
              <span className="primary">{gallery.length}</span> Albums
            </h3>
          )}
        </div>
        <div className="PTH-Item">
          <Modal show={modalState}>
            <ModalHeader
              title="Add New Album"
              closeButton={true}
              onclose={closeModalState}
            />

            <form onSubmit={handleSubmit}>
              <ModalBody>
                <div className="formFieldwrap">
                  <FormInput
                    className={
                      !albumData.title.isValid && showTitleError
                        ? "errorInput"
                        : ""
                    }
                    ref={titleRef}
                    name="title"
                    type="text"
                    onKeyUp={(e) => handleInput(e)}
                    onChange={(e) => handleInput(e)}
                    label="Album title"
                    placeholder="Album title"
                  />
                  <FormError
                    show={!albumData.title.isValid && showTitleError}
                    error="Title required."
                  />
                </div>
                {inputFields.map((gallery, key) => {
                  return (
                    <div key={key}>
                      <p className="labelcst text-xs w-600">
                        Add images or videos
                      </p>
                      <ul className="DashedInstructionList">
                        <li className="text-xxs mb-20">
                          You can upload up to 5 images or videos at a time.
                        </li>
                      </ul>
                      <div className="formFieldwrap">
                        <SelectInput
                          id={"exampleFormControlTextarea1" + key}
                          name="fileType"
                          onChange={(e) => {
                            handleSelect(e, key);
                            removeFile(key);
                          }}
                          value={gallery.kind}
                          className={
                            !gallery.kind && showError ? "errorInput" : ""
                          }
                          label="File Type"
                        >
                          <option value="" disabled selected>
                            Choose File Type
                          </option>
                          <option value="images">Image</option>
                          <option value="videos"> Video</option>
                        </SelectInput>
                        <FormError
                          show={!gallery.kind && showError}
                          error="File type is required."
                        />
                      </div>
                      <div className="formFieldwrap">
                        {gallery.kind ? (
                          gallery.kind === "videos" ? (
                            <>
                              <ul className="DashedInstructionList">
                                <li className="text-xxs">
                                  For videos accept only .MP4 file.
                                </li>
                              </ul>
                              {/* <Upload
                                onUploaded={(e) => uploadImage(e, key)}
                                label="Upload File"
                                onlyVideo={true}
                                size={10}
                                hidenFileName={true}
                                invalidError={() => {
                                  removeFile(key);
                                }}
                                IconFileUploadClass="icon-file-upload base i-xs"
                              /> */}
                              <UploadButton
                                BtnName="Upload Video"
                                IconClassName="icon-file-upload base i-xs"
                                BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                                onClick={() => {
                                  videoRef.current.open();
                                  setIndex(key);
                                }}
                              />
                              <Uploader
                                size={10}
                                onclose={() => videoRef.current.close()}
                                multiSelect={false}
                                discartRef={videoRef}
                                onUploaded={(data) => uploadImage(data,index)}
                                validationProp={"onlyVideo"}
                                uploadLimit={1}
                              />
                            </>
                          ) : (
                            <>
                              <ul className="DashedInstructionList">
                                <li className="text-xxs">
                                  For images accept only .PNG .JPG or .JPEG file
                                  format.
                                </li>
                              </ul>
                              <div className="cropwrap">
                                {/* <Cropper
                                  square={true}
                                  ref={ref}
                                  portrait={true}
                                  landscape={true}
                                  minWidth={400}
                                  maxWidth={1200}
                                  onUploaded={(e) => uploadImage(e, key)}
                                  BtnName="Upload Image"
                                  IconClassName="i-md gray"
                                  BtnPropClass="btn-o-silver btn-xs"
                                /> */}
                                <UploadButton
                                  BtnName="Upload Image"
                                  IconClassName="i-md gray"
                                  BtnPropClass="btn-o-silver btn-xs"
                                  onClick={() => {
                                    ref.current.open();
                                    setIndex(key);
                                  }}
                                />
                                <Uploader
                                  size={10}
                                  onclose={() => ref.current.close()}
                                  multiSelect={false}
                                  discartRef={ref}
                                  onUploaded={(data) => uploadImage(data,index)}
                                  uploadLimit={1}
                                />
                              </div>
                            </>
                          )
                        ) : (
                          ""
                        )}
                        {gallery?.videos?.src && (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={gallery?.videos?.src}
                          >
                            {gallery?.videos?.src.replace(s3Url, "")}
                          </a>
                        )}
                        {gallery?.images?.src && (
                          <a
                            className="btnText priamry text-2xs attachmentwithtext mt-3"
                            target="_blank"
                            rel="noreferrer"
                            href={gallery?.images?.src}
                          >
                            <i className="ed-icon icon-attachment gray i-xs"></i>
                            {gallery?.images?.src.replace(s3Url, "")}
                          </a>
                        )}
                        <FormError
                          show={
                            gallery.kind &&
                            !gallery?.images?.src &&
                            !gallery?.videos?.src &&
                            showError
                          }
                          error="File required."
                        />
                      </div>

                      <div className="formFieldwrap position-relative">
                        {/* <textarea
                          className="form-control"
                          id={"exampleFormControlTextarea1" + key}
                          rows="3"
                          value={gallery.description}
                          name="desc"
                          maxLength="220"
                          onChange={(e) => handleDescription(e, key)}
                          placeholder="Description"
                        ></textarea> */}
                        <TextEditor
                          preFilledData={albumDesc}
                          currentResponse={(value) =>
                            handleDescription(value, key)
                          }
                        />
                        <label
                          className="animLabel"
                          htmlFor={"exampleFormControlTextarea1" + key}
                        >
                          Image description
                        </label>
                        <p className="text-2xs mt-2 w-500">
                          Max. 220 characters limit.
                        </p>
                        {inputFields.length > 1 && (
                          <button
                            type="button"
                            className="button mt-8 btn-o-silver base btn-sm w-500"
                            onClick={(e) => handleRemoveClick(key)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {inputFields.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddClick}
                    className="button btn-o-primary primary btn-sm"
                  >
                    Add more
                  </button>
                )}
              </ModalBody>
              <ModalFooter>
                <button
                  type="submit"
                  className="button btn-md button-theme btn-md"
                >
                  Add New Album
                </button>
              </ModalFooter>
            </form>
          </Modal>
          <button
            className="button button-primary btn-oval btn-sm button-block"
            onClick={() => manageModalState()}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>Add New Album
          </button>
        </div>
      </div>
      <SelectTitle type="galleriesSelect" />
      <div className="row mt-20">
        <div className="col-md-12 col-xs-12">
          <div className="gallery-list-table gridTable">
            <table>
              <thead>
                <tr>
                  <th width="25%">Album Title</th>
                  <th width="30%">Thumbnail</th>
                  <th width="15%">Images</th>
                  <th width="15%">Videos</th>
                  <th width="15%"></th>
                </tr>
              </thead>

              <tbody>
                {gallery ? (
                  gallery.map((item) => {
                    return (
                      <tr>
                        <td data-column="Album Title">{item.title}</td>
                        <td data-column="Thumbnail">
                          {item.thumbnail?.src &&
                          item.thumbnail?.src?.includes("mp4") ? (
                            <div className="g-thumb-video-wrap">
                              <video
                                src={item.thumbnail?.src}
                                className="gallery-thumnail"
                                alt="Gallery Thumbnail"
                              />
                            </div>
                          ) : (
                            <ImageViewer
                              object={item.thumbnail}
                              className="gallery-thumnail"
                              />

                          )}
                        <td data-column="No. of Image">{item.gallerycount}</td>
                        <td data-column="No. of Video">{item.videoscount}</td>
                          <div className="actionBtnCustom">
                            <div className="groupBtn">
                              <button onClick={() => EditItem(item._id)}>
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  onClickBtnDropDownRemove(item._id, true)
                                }
                              >
                                Remove
                              </button>
                            </div>
                            {item._id === galleryId && (
                              <div
                                ref={dropdownRef}
                                className={`popup removePopup ${
                                  isActive ? "active" : "inactive"
                                }`}
                              >
                                <h5 className="heading gray text-xxs w-400">
                                  You are about to remove this album.
                                </h5>
                                <p className="sub-heading dgray text-xxs w-400">
                                  Are you sure?
                                </p>
                                <div className="removePopBtn">
                                  <button
                                    className="button btn-o-silver dgray btn-sm"
                                    onClick={() =>
                                      onClickBtnDropDownRemove(item._id, false)
                                    }
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="button button-red btn-sm"
                                    onClick={() => {
                                      DeleteItem(item._id);
                                      onClickBtnDropDownRemove(item._id, false);
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">
                      <NoDataAvailable title="No Records Found." />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
