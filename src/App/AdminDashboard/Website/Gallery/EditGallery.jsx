/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGalleryUploadData,
  editGalleryUploadData,
  getGalleryUploadData,
  getGalleryUploadSingleData,
  postGalleryUploadData,
  resetGalleryUploadDataInfo,
} from "../../../../store/actions/galleryupload";
import {
  editGalleryData,
  getGalleryDataId,
} from "../../../../store/actions/gallary";
import { useParams } from "react-router-dom";
import Upload from "../../../../Common/Upload";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import Cropper from "../../../../Common/Cropper";
import { IconAttachment } from "../../../../Common/Icon";
import "./Gallery.scss";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import SelectInput from "../../../../Common/Form/SelectInput";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
import ImageViewer from "../../../../Common/ImageViewer";
export default function DashboardFacultyList() {
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const { _id } = useParams();
  const dispatch = useDispatch();
  const videoRef=useRef(null)
  const [clearFileName, setClearFileName] = useState(false);

  const { gallery, galleryIdData, galleryupload, updateSelection, businesstype, insID } =
    useSelector((state) => {
      return {
        gallery: state.gallery.list.data,
        galleryIdData: state.gallery.listid.data,
        galleryupload: state.galleryupload.list.data,
        updateSelection: state.galleryupload.updateSelectionGallery,
        businesstype: state.user.user_business_type,
        insID: state.user.user_institute,
      };
    });
  const emptyImage = [];
  const [galleryEditId, setGalleryEditId] = useState("");
  useEffect(() => {
    dispatch(getGalleryUploadData(_id, businesstype));
    dispatch(getGalleryDataId(_id, businesstype));
  }, [dispatch, _id]);

  const user = useSelector((state) => state.user);
  const ref = useRef()
  const [index,setIndex]=useState("")
  const [modalState, setModalState] = useState(false);
  const [modalStateEdit, setModalStateEdit] = useState(false);
  const [previewModel, setpreviewModel] = useState(false);
  const [galleryPopup, setGalleryPopup] = useState({});
  const [galleryuploadInfo, setGalleryuploadInfo] = useState({
    kind: "",
    images: "",
    videos: "",
    featuredFlag: true,
    description: "",
    industry: user.user_business_type,
    business: insID

  });
  const [inputFields, setInputFields] = useState(emptyImage);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setGalleryEditId(_id);
    setIsActive(isActive);
  };

  const manageModalState = () => {
    const album = [];
    album.push({
      kind: "",
      images: "",
      videos: "",
      description: "",
      featuredFlag: true,
      industry: user.user_business_type,
      business: insID
    });
    setInputFields(album);
    setModalState(!modalState);
  };

  const manageModalEdit = (item) => {
    setModalStateEdit(!modalStateEdit);
    setClearFileName(false);
  };

  const closeModalState = () => {
    setShowError(false);
    setInputFields(emptyImage);
    setModalState(false);
  };

  //edit title
  const [gallerytitleChange, setgallerytitleChange] = useState({
    gallerytitle: {
      value: "",
    },
  });

  const [isEditable, setIsEditable] = useState();
  const handlegallerytitleChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let galleryInfo = {
      ...gallerytitleChange,
      [inputName]: {
        value: inputValue,
      },
    };
    setgallerytitleChange(galleryInfo);
  };
  const SubmitgallerytitleChange = () => {
    if (!ValidationUtils.isEmpty(gallerytitleChange.gallerytitle.value)) {
      dispatch(editGalleryData(galleryIdData._id, gallerytitleChangeData()));
    } else {
    }
  };
  const gallerytitleChangeData = () => {
    return {
      title: gallerytitleChange.gallerytitle.value,
      industry: user.user_business_type
    };
  };
  const editOptions = {
    gallerytitle: "gallerytitle",
  };

  const [showError, setShowError] = useState(false);

  const handleSelect = (e, key) => {
    let newValue = e.target.value;
    const allinputs = inputFields;
    allinputs[key]["kind"] = newValue;
    setInputFields([...allinputs]);
  };

  const uploadImage = (data, key) => {
    let imgData = data;
    const allinputs = inputFields;
    if (allinputs[key]["kind"] === "images") {
      allinputs[key]["images"] = imgData;
      allinputs[key]["videos"] = "";
    } else {
      allinputs[key]["images"] = "";
      allinputs[key]["videos"] = imgData;
    }
    allinputs[key]["gallery"] = _id;
    allinputs[key]["institute"] = user.user_institute;
    allinputs[key]["owner"] = user._id;
    setInputFields([...allinputs]);
  };

  const handleDescription = (value, key) => {
    const inputValue = value;
    if (inputValue.length > 0) {
      const allinputs = inputFields;
      allinputs[key]["description"] = inputValue;
      allinputs[key]["institute"] = user.user_institute;
      allinputs[key]["owner"] = user._id;
      allinputs[key]["gallery"] = _id;
      setInputFields([...allinputs]);
    }
  };

  const handleAddClick = () => {
    let allNew = inputFields;
    allNew.push({
      kind: "",
      images: "",
      videos: "",
      featuredFlag: true,
      description: "",
      industry: user.user_business_type
    });
    setInputFields([...allNew]);
  };
  const handleRemoveClick = (index, key) => {
    let newinputs = inputFields.filter((newItem, index) => index !== key);
    setInputFields([...newinputs]);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setShowError(true);
    if (inputFields.some((i) => i["images"] || i["videos"])) {
      setShowError(false);
      dispatch(postGalleryUploadData(inputFields));
      closeModalState(false);
      setTimeout(() => {
        dispatch(getGalleryUploadData(_id, user.user_business_type));
      }, 200);
    }
  };
  const DeleteItem = (_id) => {
    dispatch(deleteGalleryUploadData(_id, user.user_business_type));
    onClickBtnDropDownRemove(false);
  };

  const featuredFlagUpdate = (e, _id) => {
    const newData = e.target.value;
    const updatedFlag =
      newData === "No" ? { featuredFlag: false, industry: user.user_business_type } : { featuredFlag: true, industry: user.user_business_type };
    dispatch(editGalleryUploadData(_id, updatedFlag));
  };

  const [sort, setSort] = useState("all");

  const selectedSort = (selected) => {
    setSort(selected);
  };

  const filteredSearch = () => {
    switch (sort) {
      case "images":
        return galleryupload.filter((item) => item.kind === "images");
      case "videos":
        return galleryupload.filter((item) => item.kind === "videos");
      case "true":
        return galleryupload.filter((item) => item.featuredFlag === true);
      case "false":
        return galleryupload.filter((item) => item.featuredFlag === false);
      default:
        return galleryupload;
    }
  };

  const sortedData = filteredSearch();

  // -----------------------FOR THE CODE OF EDIT FUNCTIONALITY-----------------

  const [isFilled, setIsFilled] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editAttachmentn, setEditAttachment] = useState("");
  const [selectType, setSelectType] = useState("");
  const [editVideoAttachment, setEditVideoAttachment] = useState("");

  if (updateSelection.data && updateSelection.success && !isFilled) {
    setIsFilled(true);
    setEditDescription(updateSelection.data.description);
    setEditAttachment(updateSelection.data.images);
    setEditVideoAttachment(updateSelection.data.videos);
    setSelectType(updateSelection.data.kind);
  }

  const EditButton = (item) => {
    manageModalEdit();
    dispatch(getGalleryUploadSingleData(item._id, user.user_business_type));
  };

  const selectChange = (e) => {
    const type = e.target.value;
    setSelectType(type);
    setSelectTypeError(false);
  };

  const editFormData = () => {
    return {
      kind: selectType,
      images: editAttachmentn,
      videos: editVideoAttachment,
      description: editDescription,
      industry: businesstype
    };
  };

  const handleEdit = (inputValue) => {
    setEditDescription(inputValue);
  };

  const closeModalStateEdit = () => {
    setShowError(false);
    dispatch(resetGalleryUploadDataInfo());
    setIsFilled(false);
    setClearFileName(true);
    setModalStateEdit(false);
  };
  const uploadImageEdit = (data) => {
    let imgData = data;
    if (selectType === "images") {
      setEditAttachment(imgData);
      setEditVideoAttachment("");
    } else {
      setEditVideoAttachment(imgData);
      setEditAttachment("");
    }
  };
  const invalidError = () => {
    setEditAttachment("");
    setEditVideoAttachment("");
  };
  const [selectTypeError, setSelectTypeError] = useState(false);
  const EditItem = (_id) => {
    setShowError(true);
    const editedData = editFormData();
    if (selectType === "images") {
      const emptyVideo = editedData;
      emptyVideo.videos = "";
      setGalleryuploadInfo(emptyVideo);
      setSelectTypeError(true);
    } else {
      const emptyImage = editedData;
      emptyImage.images = "";
      setGalleryuploadInfo(emptyImage);
      setSelectTypeError(true);
    }
    if (editedData["images"] || editedData["videos"]) {
      setShowError(false);
      dispatch(editGalleryUploadData(_id, editedData));
      closeModalStateEdit();
      dispatch(resetGalleryUploadDataInfo());
      setIsFilled(false);
    }
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
      <>
        <>
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
            <BreadcrumbItem to="/gallery-list" title="Gallery" />
            <BreadcrumbItem to={`/edit-gallery/${_id}`} title="Edit Album" />
          </Breadcrumb>
          <div className="PageTopHead PTH-EditGalleryHead mt-30">
            <div className="PTH-Item">
              <div className="heading-with-edit">
                {isEditable === editOptions.gallerytitle ? (
                  <FormInput
                    onChange={handlegallerytitleChange}
                    onBlur={() => {
                      SubmitgallerytitleChange();
                      setIsEditable("");
                    }}
                    name="gallerytitle"
                    type="text"
                    placeholder={gallery.title}
                    defaultValue={galleryIdData.title}
                    autoFocus
                  />
                ) : (
                  <h3 className="primary text-sm w-300">
                    {galleryIdData.title}
                  </h3>
                )}
                <i>
                  <button
                    onClick={() => setIsEditable(editOptions.gallerytitle)}
                    className="btnText"
                  >
                    <i className="ed-icon icon-edit lgray i-s"></i>
                  </button>
                </i>
              </div>
            </div>
            <div className="PTH-Item">
              <div className="SortByTableHeadCst">
                <label>Sort by</label>
                <select
                  id="sort"
                  name="sort"
                  onChange={(e) => selectedSort(e.target.value)}
                >
                  <option value="all" selected>
                    All
                  </option>
                  <option value="images">Image</option>
                  <option value="videos"> Video</option>
                  <optgroup label="Featured Marked">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <div className="PTH-Item P-Right">
              <div className={`modal modalShowing-${modalState}`}>
                <div className="modalwrapper">
                  <span
                    className="closeModal text-xxs dgray"
                    onClick={() => closeModalState()}
                  >
                    Close
                  </span>
                  <div className="modalHead">
                    <h3 className="heading text-sm w-300">
                      Add new images or videos
                    </h3>
                    <p className="sub-heading text-xxs">{galleryIdData.title}</p>
                  </div>
                  <div className="modalbody">
                    <ul className="DashedInstructionList mb-20">
                      <li className="text-xxs">
                        You can upload up to 5 images or videos at a time.
                      </li>
                    </ul>
                    {inputFields.map((galleryItem, key) => {
                      return (
                        <div key={key} className="mt-20">
                          <div className="formFieldwrap">
                            <SelectInput
                              id={"exampleFormControlTextarea1" + key}
                              name="fileType"
                              onChange={(e) => {
                                handleSelect(e, key);
                                removeFile(key);
                              }}
                              value={galleryItem.kind}
                              className={
                                `text-2xs ${!galleryItem.kind && showError
                                  ? "errorInput"
                                  : ""}`
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
                              show={!galleryItem.kind && showError}
                              error="File type is required"
                            />
                          </div>
                          <div className="formFieldwrap">
                            {galleryItem.kind ? (
                              galleryItem.kind === "videos" ? (
                                <>
                                  <p className="text-xxs">
                                    --- For videos accept only .MP4 file.
                                  </p>
                                  <p className="text-xxs">
                                    --- Maximum size can be 10 MB.
                                  </p>
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
                                  BtnPropClass="btn-o-silver btn-xs"
                                  onClick={() => {
                                    videoRef.current.open();
                                    setIndex(key);
                                  }}
                                />
                                <Uploader
                                  size={10}
                                  validationProp={"onlyVideo"}
                                  onclose={() => videoRef.current.close()}
                                  multiSelect={false}
                                  discartRef={videoRef}
                                  onUploaded={(data) => uploadImage(data,index)}
                                  uploadLimit={1}
                                />
                                </>
                              ) : (
                                <>
                                  <p className="text-xxs">
                                    --- For images accept only .PNG .JPG or
                                    .JPEG file format.
                                  </p>
                                  <p className="text-xxs">
                                    --- Max size can be 2 MB.
                                  </p>

                          
                                  <UploadButton
                                BtnName="Upload Image"
                                    IconClassName="i-md gray"
                                    BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                                  onClick={() => {
                                    ref.current.open();
                                    setIndex(key);
                                  }}
                                  showLink={true}
                                  object={galleryItem.images}
                                />
                                <Uploader
                                  size={2}
                                  onclose={() => ref.current.close()}
                                  multiSelect={false}
                                  discartRef={ref}
                                  onUploaded={(data) => uploadImage(data,index)}
                                  uploadLimit={1}
                                />
                                
                                </>
                              )
                            ) : (
                              ""
                            )}
                            <a
                              href={galleryItem?.videos?.src}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {galleryItem.videos?.src?.replace(
                                s3Url,
                                ""
                              )}
                            </a>
                            <FormError
                              show={
                                galleryItem.kind &&
                                !galleryItem.images &&
                                !galleryItem.videos &&
                                showError
                              }
                              error="File required."
                            />
                          </div>
                          <div className="formFieldwrap">
                            {/* <FormTextArea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              name="desc"
                              onChange={(e) => handleDescription(e, key)}
                              value={galleryItem.description}
                              placeholder="Don't forget to add image description"
                              maxlength="220"
                            /> */}
                            <TextEditor
                              preFilledData={galleryItem.description}
                              currentResponse={(value) => handleDescription(value, key)}
                            />
                          </div>
                          {
                            inputFields.length !== 1 && (
                              <button
                                type="button"
                                className="button btn-o-red red btn-sm"
                                onClick={(e) => handleRemoveClick(e, key)}
                              >
                                Remove
                              </button>
                            )
                          }
                        </div>
                      );
                    })}
                    <div className="mt-20">
                      {inputFields.length !== 5 && (
                        <button
                          type="button"
                          onClick={handleAddClick}
                          className="button btn-o-primary btn-sm"
                        >
                          Add more
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="modalFooter">
                    <div className="pageFullCenter">
                      <div className="row ">
                        <div className="col-xs-12">
                          <button
                            type="reset"
                            onClick={submitForm}
                            className="button btn-md button-theme btn-md"
                          >
                            Add Images or Videos
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="button button-primary btn-oval btn-sm button-block"
                onClick={() => manageModalState()}
              >
                <i className="ed-icon icon-plus-add white i-xs"></i>
                Add Image/Video
              </button>
            </div>
          </div>
          <div className="row mt-20">
            <div className="col-md-12 col-xs-12">
              <div className="gridTable">
                <table>
                  <thead>
                    <tr>
                      <th width="30%">Thumbnail</th>
                      <th width="35%">Description</th>
                      <th width="20%">Featured Marked</th>
                      <th width="15%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryupload.length ? (
                      sortedData.length ? (
                        sortedData.map((item, key) => {
                          return (
                            <tr key={key}>
                              <td data-column="Thumbnail">
                                {item.videos?.src ? (
                                  <div
                                    className="g-thumb-video-wrap"
                                    onClick={() => {
                                      setGalleryPopup(item);
                                      setpreviewModel(true);
                                    }}
                                  >
                                    <video
                                      src={item.videos}
                                      className="gallery-thumnail"
                                      alt={item?.videos?.src}
                                    />
                                    <span className="g-thumb-video-overlay">
                                      <i className="ed-icon icon-video white i-s"></i>
                                    </span>
                                  </div>
                                ) : (
                                  <ImageViewer
                                    object={item.images}
                                    className="gallery-thumnail"
                                    onClick={() => {
                                      setGalleryPopup(item);
                                      setpreviewModel(true);
                                    }}
                                  />
                                )}
                              </td>
                              <td data-column="Description"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item.description
                                }}
                              >
                                {/* {item.description} */}
                              </td>
                              <td data-column="Featured Marked">
                                <div className="selectTextType">
                                  <select
                                    id="featuredFlag"
                                    name="featuredFlag"
                                    onChange={(e) =>
                                      featuredFlagUpdate(e, item._id)
                                    }
                                    defaultValue={
                                      item.featuredFlag === true ? "Yes" : "No"
                                    }
                                  >
                                    <option>Yes</option>
                                    <option>No</option>
                                  </select>
                                </div>
                              </td>
                              <td>
                                <div className="actionBtnCustom">
                                  <div className="groupBtn">
                                    <button onClick={() => EditButton(item)}>
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

                                  {item._id === galleryEditId && (
                                    <div
                                      ref={dropdownRef}
                                      className={`popup removePopup ${isActive ? "active" : "inactive"
                                        }`}
                                    >
                                      <p className="heading text-xxs">
                                        {item.videos
                                          ? "You are about to remove this video."
                                          : "You are about to remove this image."}
                                      </p>
                                      <p className="sub-heading text-xxs">
                                        Are you sure?
                                      </p>
                                      <div className="removePopBtn">
                                        <button
                                          className="button btn-o-silver dgray btn-sm"
                                          onClick={() =>
                                            onClickBtnDropDownRemove(
                                              item._id,
                                              false
                                            )
                                          }
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          className="button button-red btn-sm"
                                          onClick={() => {
                                            DeleteItem(item._id);
                                            dispatch(getGalleryUploadData(_id, businesstype));
                                            dispatch(getGalleryUploadData(_id, businesstype));
                                            onClickBtnDropDownRemove(
                                              item._id,
                                              false
                                            );
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
                          <td colSpan="4">
                            <NoDataAvailable title="No Records Found." />
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan="4">
                          <NoDataAvailable title="No Records Found." />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className={`modal modalShowing-${modalStateEdit}`}>
                  <div className="modalwrapper">
                    <span
                      className="closeModal text-xxs gray"
                      onClick={() => {
                        closeModalStateEdit();
                      }}
                    >
                      Close
                    </span>
                    <div className="modalHead">
                      <div className="row">
                        <div className="col-md-12">
                          <h3 className="heading dgray text-sm w-300">Edit</h3>
                          <p className="sub-heading text-xxs gray">
                            {galleryIdData.title}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="modalbody">
                      <div className="row mt-20">
                        <div className="col-xs-12">
                          <div className="edit-gallery-imgpreview">
                            {updateSelection.success ? (
                              <ImageViewer
                                object={editAttachmentn}
                                className=""
                                alt=""
                              />
                            ) : (
                              "Loading...."
                            )}
                            {editVideoAttachment && updateSelection.success ? (
                              <video
                                width="200"
                                src={
                                  editVideoAttachment?.src ? editVideoAttachment?.src : ""
                                }
                                className=""
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          {selectType === "images" ? (
                            <p className="text-xxs mt-3 mb-20">
                              Accept only .jpg or .png
                            </p>
                          ) : (
                            <p className="text-xxs mt-3 mb-20">Accept only .mp4</p>
                          )}
                        </div>
                        <div className="col-xs-12">
                          <div className="formFieldwrap">
                            <SelectInput
                              id="fileType"
                              name="fileType"
                              onChange={(e) => selectChange(e)}
                              value={selectType}
                              label="File Type"
                              className=" text-2xs"
                            >
                              <option value="images">Image</option>
                              <option value="videos">Video</option>
                            </SelectInput>
                            {/* <label className="animLabel" htmlFor="fileType">
                              File Type
                            </label> */}
                          </div>
                        </div>
                        <div className="col-xs-12">
                          <div className="formFieldwrap">
                            {selectType === "videos" ? (
                              
                              <React.Fragment>
                                <UploadButton
                                BtnName="Change File"
                                IconClassName="icon-file-upload base i-xs"
                                BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                                onClick={() => {
                                  videoRef.current.open();
                                }}
                              />
                              <Uploader
                                size={10}
                                onclose={() => videoRef.current.close()}
                                multiSelect={false}
                                discartRef={videoRef}
                                onUploaded={(data) => uploadImageEdit(data)}
                                validationProp={"onlyVideo"}
                                uploadLimit={1}
                              />
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                 <UploadButton
                                BtnName="Upload Image"
                                    IconClassName="i-md gray"
                                    BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                                  onClick={() => {
                                    ref.current.open()
                                  }}
                                  showLink={true}
                                  object={editAttachmentn}
                                />
                                <Uploader
                                  size={2}
                                  onclose={() => ref.current.close()}
                                  multiSelect={false}
                                  discartRef={ref}
                                  onUploaded={(data) => uploadImageEdit(data)}
                                  uploadLimit={1}
                                />
                                
                              </React.Fragment>
                            

                            )}
                            {!editAttachmentn || editAttachmentn === "" ? (
                              ""
                            ) : (
                              <a
                                href={editAttachmentn?.src}
                                target="_blank"
                                rel="noreferrer"
                                className="btnText priamry text-2xs attachmentwithtext mt-3"
                              >
                                <i className="ed-icon icon-attachment gray i-xs"></i>
                                {editAttachmentn?.src?.replace(s3Url, "")}
                              </a>
                            )}
                            {!editVideoAttachment?.src ||
                              editVideoAttachment?.src === "" ? (
                              ""
                            ) : (
                              <a
                                href={editVideoAttachment?.src}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Watch Uploaded Video
                              </a>
                            )}
                            {showError ? <br /> : ""}
                            <FormError
                              show={
                                !editAttachmentn?.src &&
                                !editVideoAttachment?.src &&
                                showError
                              }
                              error="File required."
                            />
                            {selectTypeError ? <br /> : ""}
                            <FormError
                              show={showError && selectTypeError}
                              error="Change your file type."
                            />
                          </div>
                        </div>
                        <div className="col-xs-12">
                          <div className="formFieldwrap position-relative">
                            {/* <FormTextArea
                              name="desc"
                              className="form-control"
                              onChange={handleEdit}
                              onKeyUp={handleEdit}
                              id="exampleFormControlTextarea1"
                              rows="4"
                              maxLength="219"
                              label="video description"
                              value={
                                updateSelection.success
                                  ? editDescription
                                  : "Loading...."
                              }
                              placeholder="Don't forget to add image description"
                            /> */}
                            <TextEditor
                              preFilledData={editDescription}
                              currentResponse={(value) => handleEdit(value)}
                            />
                            <p className="text-xxs">
                              Max. 220 characters limit.
                            </p>
                          </div>
                        </div>
                        <div className="pageFullCenter">
                          <div className="row ">
                            <div className="col-xs-12">
                              <button
                                type="submit"
                                onClick={() =>
                                  EditItem(updateSelection.data._id)
                                }
                                className="button btn-md button-theme btn-md"
                              >
                                Update File
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        {previewModel && (
          <>
            {
              <div className="ThumnailPopWrapper">
                <div className="ThumnailPopBody">
                  {galleryPopup.videos?.src ? (
                    <video
                      src={galleryPopup.videos?.src}
                      controls
                      autoPlay
                      loop
                    />
                  ) : (
                    <ImageViewer object={galleryPopup.images}  />
                  )}
                </div>
                <span
                  className="closeModal"
                  onClick={() => setpreviewModel(false)}
                ></span>
              </div>
            }
          </>
        )}
      </>
    </React.Fragment>
  );
}
