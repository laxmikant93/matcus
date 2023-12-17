import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import FormInput from "../../../../Common/Form/FormInput";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import { connect, useDispatch, useSelector } from "react-redux";
import BackgroundDefault from "../../../../assets/images/img/BackgroundDefault.png";

import {
  getAnnouncementData,
  postAnnouncementData,
  deleteAnnouncementData,
  ClearselectAnnoucementToUpdate,
  editAnnouncementData,
  selectAnnoucementToUpdate,
  getAnnouncementDataFilter,
  postAnnouncementDataReset,
  AnnoucementEditReset,
  AnnoucementDeleteReset,
} from "../../../../store/actions/announcementlist";

import ValidationFile from "../../../Auth/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import Upload from "../../../../Common/Upload/index";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import IconAttachment from "./icon-attachment.svg";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import SelectTitle from "../../../../Common/SectionTitle";
import Cropper from "../../../../Common/Cropper";
import "./Announcements.scss";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import Modal from "../../../../Common/Modal";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import TextEditor from "../../../../Common/Form/TextEditor";
import SwitchButton from "../../../../Common/Button/SwitchButton";
import ImageViewer from "../../../../Common/ImageViewer";
import Uploader from "../../../../Common/ImageUploader";
import UploadButton from "../../../../Common/UploadButton";
export default function DashboardFacultyList() {
  const dispatch = useDispatch();
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const [ShowSubmitError, setShowSubmitError] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);

  const dropdownRef = useRef(null);
  const attachmentRef=useRef()
  const [modalState, setModalState] = useState(false);
  const [modalStateEdit, setModalStateEdit] = useState(false);
  const [Announcement, setAnnouncement] = useState("");
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setAnnouncement(_id);
    setIsActive(isActive);
  };

  const [checkedData, setCheckedData] = useState([]);
  const [isFilled, setisFilled] = useState(false);
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const [imgLink, set_imgLink] = useState("");
  const [thumbnail, set_thumbnail] = useState("");
  const [clearFileName, setClearFileName] = useState(false);
  const [emailerOption, setEmailerOption] = useState("All");

  const manageModalState = () => {
    setClearFileName(false);
    setModalState(!modalState);
  };

  const manageModalEdit = () => {
    setClearFileName(false);
    setModalStateEdit(!modalStateEdit);
  };
  const closeModalStateEdit = () => {
    setModalStateEdit(false);
    dispatch(ClearselectAnnoucementToUpdate());
    setisFilled(false);
    setClearFileName(true);
    setShowEmailNotification(false);
    setEmailerOption("All");
    setImgLink2("");
    set_title("");
    set_description("");
    set_imgLink("");
    set_thumbnail("");
    setImgLink2("");
    setThumbnailBannerUpdate("");
    setEditAnnouncementTitleRequire(false);
  };

  const closeModalState = () => {
    setModalState(!modalState);
    setannouncementData(emptyAnnouncement);
    setEmailerOption("All");
    setClearFileName(true);
    setThumbnailBanner("");
    setImgLink1("");
    setShowEmailNotification(false);
    
    set_description("");
    setModalStateEdit(false);
    dispatch(ClearselectAnnoucementToUpdate());
    setisFilled(false);
    setImgLink2("");
    set_title("");
    set_imgLink("");
    setShowSubmitError(false);
  };



  const [EditAnnouncementTitleRequire, setEditAnnouncementTitleRequire] =
    useState(false);

  const {
    announcements,
    updateSelection,
    users,
    buttonEditLoading,
    announcementDeleteSuccess,
    buttonDeleteLoading,
    announcementCreateSuccess,
    announcementEditSuccess,
    buttonCreateLoading,
    businesstype,
    announcementSccess
  } = useSelector((state) => {
    return {
      announcementSccess: state.announcement.list.success,
      announcements: state.announcement.list.data,
      updateSelection: state.announcement.update,
      announcementCreateSuccess: state.announcement.create.success,
      announcementEditSuccess: state.announcement.edit.success,
      announcementDeleteSuccess: state.announcement.delete.success,
      announcementCreateError: state.announcement.create.error,
      buttonCreateLoading: state.announcement.create.loading,
      buttonEditLoading: state.announcement.edit.loading,
      buttonDeleteLoading: state.announcement.delete.loading,
      users: state.user,
      businesstype: state.user.user_business_type,
    };
  });
  const ref = useRef()
  const refEdit = useRef()

  useEffect(() => {
    dispatch(getAnnouncementData(users.user_institute, "", businesstype));
  }, [businesstype, dispatch, users]);

  useEffect(() => {
    if (updateSelection.success && !isFilled) {
      setisFilled(true);
      set_title(updateSelection.data.title);
      set_description(updateSelection.data.description);
      set_imgLink(updateSelection.data.attachment);
      set_thumbnail(updateSelection.data.thumbnail);
      setShowEmailNotification(
        updateSelection.data.emailNotify === "No" ? false : true
      );
      setEmailerOption(updateSelection.data.academe);

    }
  }, [isFilled, updateSelection.data, updateSelection.success])

  const emptyAnnouncement = useMemo(() => {
    return {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      attachment: {
        value: "",
        isValid: false,
      },
      institute: {
        value: "",
        isValid: false,
      },
      owner: {
        value: "",
        isValid: false,
      },

      validation: false,
    };
  }, []);

  const [announcementData, setannouncementData] = useState(emptyAnnouncement);

  const inputHandelUpdate = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    switch (inputName) {
      case "title":
        set_title(inputValue);

        break;
      case "description":
        set_description(inputValue);
        break;
      default:
        break;
    }
  };

  const inputHandel = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let createAnnouncement = {
      ...announcementData,
      [inputName]: {
        value: inputValue,
        isValid: ValidationFile.validEmpty,
      },
      validation: true,
    };

    setannouncementData(createAnnouncement);
  };

  const handleDescriptionInput = (inputValue) => {
    set_description(inputValue);
  }

  const handelUpdateUser = (id) => {
    manageModalEdit();
    dispatch(selectAnnoucementToUpdate(id));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteAnnouncementData(id, businesstype));
  };

  const handelSubmitUpdateUser = (e) => {
    e.preventDefault();
    if (ValidationFile.validEmpty(title)) {
      dispatch(editAnnouncementData(updateSelection.data._id,getUpdateAnnouncementFormData(), businesstype));
      setEditAnnouncementTitleRequire(false);
    } else {
      setEditAnnouncementTitleRequire(true);
    }
  };

  const submitHandel = (e) => {
    e.preventDefault();
    setShowSubmitError(true);
    if (announcementData.validation) {
      dispatch(postAnnouncementData(getAnnouncementFormData()));
      setShowSubmitError(false);
    } else {
    }
  };

  useEffect(() => {
    if (announcementCreateSuccess) {
      closeModalState();
      setModalState(!modalState);
      setannouncementData(emptyAnnouncement);
      setClearFileName(true);
      setThumbnailBanner("");
      setImgLink1("");
      setShowEmailNotification(false);
      setEmailerOption("All");
      set_description("")
      dispatch(postAnnouncementDataReset());
    setModalStateEdit(false);
    setisFilled(false);
    setImgLink2("");
    set_title("");
    set_imgLink("");
    setShowSubmitError(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcementCreateSuccess, dispatch, emptyAnnouncement, modalState]);

  useEffect(() => {
    if (announcementEditSuccess) {
      setModalStateEdit(false);
      closeModalStateEdit();
      dispatch(ClearselectAnnoucementToUpdate());
      setisFilled(false);
      setClearFileName(true);
      setShowEmailNotification(false);
      setEmailerOption("All");
      setImgLink2("");
      set_title("");
      set_description("");
      set_imgLink("");
      setImgLink2("");
      dispatch(AnnoucementEditReset());
    }
  }, [announcementEditSuccess, dispatch]);

  useEffect(() => {
    if (announcementDeleteSuccess) {
      setModalStateEdit(false);
      dispatch(ClearselectAnnoucementToUpdate());
      setisFilled(false);
      setClearFileName(true);
      setShowEmailNotification(false);
      setEmailerOption("All");
      setImgLink2("");
      set_title("");
      set_description("");
      set_imgLink("");
      setImgLink2("");
      dispatch(AnnoucementDeleteReset());
    }
  }, [announcementDeleteSuccess, dispatch]);

  const getUpdateAnnouncementFormData = () => {
    return {
      title: title,
      description: description,
      attachment: imgLink2 === "" ? imgLink : imgLink2,
      owner: users._id,
      institute: users.user_institute,
      emailNotify: changeEmailNotify(),
      academe: emailerOption,
      thumbnail:
        thumbnailBannerUpdate === "" ? thumbnail : thumbnailBannerUpdate,
      industry: businesstype,

    };
  };

  const getAnnouncementFormData = () => {
    return {
      title: announcementData.title.value,
      description: description,
      attachment: imgLink1,
      owner: users._id,
      institute: users.user_institute,
      business: users.user_institute,
      thumbnail: thumbnailBanner,
      emailNotify: changeEmailNotify(),
      academe: emailerOption,
      industry: businesstype,
    };
  };

  const changeEmailNotify = () => {
    if (showEmailNotification) {
      return "Yes";
    } else {
      return "No";
    }
  };

  const [imgLink1, setImgLink1] = useState("");
  const uploadImage1 = (data) => {
    let imgData = data;
    setImgLink1(imgData);
  };
  const removeimgLink1 = () => {
    setImgLink1("");
  };
  const removeThumbnail = () => {
    set_thumbnail("");
  };
  const imgLinkRemove = () => {
    set_imgLink("");
  };

  const [thumbnailBanner, setThumbnailBanner] = useState("");
  const uploadThumbnail = (data) => {
    let imgData = data;
    setThumbnailBanner(imgData);
  };

  const removeThumbnailBanner = () => {
    setThumbnailBanner("");
  };
  const [thumbnailBannerUpdate, setThumbnailBannerUpdate] = useState("");
  const uploadThumbnailUpdate = (data) => {
    let imgData = data;
    setThumbnailBannerUpdate(imgData);
  };

  const thumbnailUpdateRemove = () => {
    setThumbnailBannerUpdate("");
  };
  const imgLink2Remove = () => {
    setImgLink2("");
  };
  const [imgLink2, setImgLink2] = useState("");

  const uploadImage2 = (data) => {
    let imgData = data;
    setImgLink2(imgData);
  };

  const inputHandelEmail = (e) => {
    let inputValue = e.target.value;
    setEmailerOption(inputValue);
  };

  const handelListStatusUpdate = (e, _id) => {
    let inputValue = e.target.value;
    dispatch(editAnnouncementData(_id, listStatusUpdateDataInfo(inputValue), businesstype));
  };

  const listStatusUpdateDataInfo = (inputValue) => {
    return {
      isStatus: inputValue,
      industry: businesstype
    };
  };

  const vacancyListFilter = (e) => {
    let inputValue = e.target.value;
    vacancyListFilterSwitch(inputValue);
  };

  const vacancyListFilterSwitch = (message) => {
    switch (message) {
      case "All":
        dispatch(getAnnouncementData(users.user_institute, "", businesstype));

        break;
      case "Active":
        dispatch(getAnnouncementDataFilter(users.user_institute, "Active", businesstype));

        break;
      case "Inactive":
        dispatch(getAnnouncementDataFilter(users.user_institute, "Inactive", businesstype));

        break;
      default:
        dispatch(getAnnouncementData(users.user_institute, "", businesstype));
    }
  };

  const handleSwitchButton = (e, id) => {
    let data = checkedData;
    let inputChecked = e.target.checked;
    if (inputChecked) {
      if (checkedData.length < 5) {
        data.push(id);
        dispatch(editAnnouncementData(id, { markAsFeature: true }, businesstype));
      }
    }
    else {
      let key = data.indexOf(id)
      data.splice(key, 1);
      dispatch(editAnnouncementData(id, { markAsFeature: false }, businesstype));
    }
    setCheckedData([...data]);
  }

  useEffect(() => {
    if (announcements.length) {
      let data = announcements.filter((item) => item.markAsFeature === true);
      if (data.length) {
        let ids = data.map((item) => {
          return (
            item._id
          )
        })
        setCheckedData([...ids]);
      }
    }
  }, [announcements])

  return (
    <React.Fragment>
      <>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
          <BreadcrumbItem to="/announcement-list" title="Announcements" />
        </Breadcrumb>
        <div className="PageTopHead PTH-AnnouncementList mt-30">
          <div className="PTH-Item">
            <h1 className="text-sm w-300">
              <span className="primary">{announcements.length}</span>{" "}
              Announcements
            </h1>
          </div>
          <div className="PTH-Item">
            <div className="SortByTableHeadCst">
              <label>Sort by</label>
              <select onChange={(e) => vacancyListFilter(e)}>
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="PTH-Item P-Right">
            <button
              className="button button-primary btn-oval btn-sm button-block"
              onClick={() => manageModalState()}
            >
              <i className="ed-icon icon-plus-add white i-xs"></i>
              Add New Announcement
            </button>
          </div>
        </div>
        <SelectTitle type="announcementSelect" />
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-3">Thumbnail</li>
            <li className="col col-3">Title & Description</li>
            <li className="col col-2">Attachment</li>
            <li className="col col-2">Status</li>
            <li className="col col-2">Mark as Featured</li>
            <li className="col col-2">&nbsp;</li>
          </ul>
          <div className="gridBody">
            {announcements.length ? (
              announcements.map((item, key) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li className="col col-3" data-head="Thumbnail">
                        <ImageViewer
                          object={item.thumbnail}
                          defaultImage={BackgroundDefault}
                          className="announcement-thumnail"
                        />
                      </li>
                      <li
                        className="col col-3"
                        data-head="Title & Description"
                      >
                        <div className="text-xs w-600 base">
                          {item.title}
                        </div>
                        <div className="text-xxs w-500 sun-editor-output"
                          dangerouslySetInnerHTML={{
                            __html:
                              item.description
                          }}
                        >
                        </div>
                        {/* <div className="text-xxs w-500">{item.description}</div> */}
                      </li>
                      <li className="col col-2" data-head="Attachment">
                        {" "}
                        {!item.attachment || item.attachment === "" ? (
                          ""
                        ) : (
                          <>
                            <a
                              href={item.attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <p className="inline middle-xs">View Attachment&nbsp;<img src={IconAttachment} alt="attachment icon" /></p>

                            </a>
                          </>
                        )}
                      </li>
                      <li className="col col-2" data-head="Status">
                        {item.isStatus ? (
                          <div className="selectTextType">
                            <select
                              className=""
                              onChange={(e) =>
                                handelListStatusUpdate(e, item._id)
                              }
                              value={item.isStatus}
                            >
                              <option>Active</option>
                              <option>Inactive</option>
                            </select>
                          </div>
                        ) : (
                          ""
                        )}
                      </li>
                      <li className="col col-2" data-head="Mark as Featured">
                        <SwitchButton onChange={(e) => handleSwitchButton(e, item._id)} checked={item.markAsFeature} disabled={checkedData.length && checkedData.length === 5 && !checkedData.includes(item._id)} />
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <button
                            className="btn-square"
                            title="View Details"
                            onClick={() => handelUpdateUser(item._id)}
                          >
                            <span className="cssIcon">
                              <i className="ed-pen"></i>
                            </span>
                          </button>
                          <button
                            className="btn-square"
                            title="View Details"
                            onClick={() =>
                              onClickBtnDropDownRemove(item._id, true)
                            }
                          >
                            <span className="cssIcon">
                              <i className="ed-trash"></i>
                            </span>
                          </button>
                        </div>
                        {item._id === Announcement && (
                          <div
                            ref={dropdownRef}
                            className={`popup removePopup ${isActive ? "active" : "inactive"
                              }`}
                          >
                            <p className="heading text-xs">
                              You are about to remove this announcement.
                            </p>
                            <p className="sub-heading red text-xxs">
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
                              {buttonDeleteLoading ? (
                                <button className="button button-red btn-sm">
                                  Removing..
                                </button>
                              ) : (
                                <button
                                  className="button button-red btn-sm"
                                  onClick={() => handleDeleteUser(item._id)}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <NoDataAvailable title="No Records Found." />
            )}
          </div>
        </div>
        <Modal show={modalStateEdit}>
          <ModalHeader
            title="Edit Announcement"
            closeButton={true}
            onclose={() => closeModalStateEdit()}
          />
          <ModalBody>
            <div className="formFieldwrap">
              <label className="text-xs w-600">Upload File</label>
              <p className="text-xxs mt-3">
                Accept only .JPG or .PNG file. Maximum file size 1 MB.
              </p>
              {/* <Cropper
                minWidth={300}
                maxWidth={600}
                ref={refEdit}
                defaultRatio={5 / 3}
                // defaultValue={thumbnail}
                onUploaded={uploadThumbnailUpdate}
                BtnName="Upload Image"
                IconClassName="i-md gray"
                BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
              /> */}
                <UploadButton
                  BtnName="Upload Image"
                  IconClassName="icon-file-upload base i-xs"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  onClick={() => {
                    refEdit.current.open();
                  }}
                  showLink={false}
                />
                <Uploader
                size={1}
                  onclose={() => refEdit.current.close()}
                  multiSelect={false}
                  discartRef={refEdit}
                  onUploaded={(data) => uploadThumbnailUpdate(data)}
                  uploadLimit={1}
                />
          
              {thumbnail.src && !thumbnailBannerUpdate.src && (
                <button
                  type="button"
                  className="button btn-sm btn-o-red red mt-8"
                  onClick={removeThumbnail}
                >
                  {" "}
                  Remove
                </button>
              )}
              {thumbnailBannerUpdate?.src ? (
                <a
                  className="btnText priamry text-2xs attachmentwithtext mt-3"
                  href={thumbnailBannerUpdate?.src}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ed-icon icon-attachment gray i-xs"></i>
                  {thumbnailBannerUpdate?.src?.replace(s3Url, "")}
                </a>
              ) : (
                ""
              )}
              {thumbnailBannerUpdate?.src && (
                <button
                  className="button btn-sm btn-o-red red mt-8"
                  onClick={thumbnailUpdateRemove}
                >
                  {" "}
                  Remove
                </button>
              )}
            </div>
            <div className="formFieldwrap">
              <FormInput
                className=""
                name="title"
                type="text"
                value={title}
                label="Announcement Title"
                onChange={inputHandelUpdate}
                onKeyUp={inputHandelUpdate}
                placeholder="Announcement Title"
              />
              <FormError
                show={!title && EditAnnouncementTitleRequire}
                error="Title is required."
              />
            </div>
            <div className="formFieldwrap">
              {/* <FormTextArea
                className="form-control"
                name="description"
                value={description}
                onKeyUp={inputHandelUpdate}
                onChange={inputHandelUpdate}
                rows="5"
                label="Announcement description"
                placeholder="Tip: Keep description short, simple and to the point"
                style={{ whiteSpace: " pre-wrap" }}
              /> */}
              <TextEditor
                preFilledData={description}
                currentResponse={(value) => handleDescriptionInput(value)}
              />
              {/* <label
                htmlFor="exampleFormControlTextarea1"
                className="animLabel"
              >
                Announcement description
              </label> */}
            </div>
            <div className="formFieldwrap">
              <div className="attachment">
                <label className="text-xs w-600">Upload File</label>
                <p className="text-xxs mt-3">
                  Accept only .JPG, .PNG or .Pdf file. Maximum file size 10
                  MB.
                </p>
                {/* <Upload
                  onUploaded={uploadImage2}
                  size={10}
                  label="Change Attachment"
                  clearFileName={clearFileName}
                  hidenFileName={true}
                  invalidError={() => imgLink2Remove()}
                  IconFileUploadClass="icon-file-upload base i-xs"
                /> */}
                 <UploadButton
                  BtnName="Change Attachment"
                  IconClassName="icon-file-upload base i-xs"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  onClick={() => {
                    attachmentRef.current.open();
                  }}
                 
                />
                <Uploader
                size={10}
                  onclose={() => attachmentRef.current.close()}
                  multiSelect={false}
                  validationProp={"onlyImagePdf"}
                  discartRef={attachmentRef}
                  onUploaded={(data) => uploadImage2(data)}
                  uploadLimit={10}
                />
                {imgLink?.src && !imgLink2?.src ? (
                  <a
                    href={imgLink?.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btnText priamry text-2xs attachmentwithtext mt-3"
                  >
                    <i className="ed-icon icon-attachment gray i-xs"></i>
                    View Attachment
                  </a>
                ) : (
                  ""
                )}
                {imgLink && !imgLink2 && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={imgLinkRemove}
                  >
                    {" "}
                    Remove
                  </button>
                )}
                {imgLink2 ? (
                  <a
                    href={imgLink2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 attachmentwithtext"
                  >
                    <i className="ed-icon icon-attachment gray i-xs"></i>
                    View Attachment
                  </a>
                ) : (
                  ""
                )}
                {imgLink2 && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={imgLink2Remove}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs w-500 mb-5">
              Do you want to send email notification
            </p>
            <div className="formFieldwrap">
              <div className="input-custom-type inline">
                <label className="small">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setShowEmailNotification(!showEmailNotification)
                    }
                    checked={showEmailNotification === true}
                  />
                  Yes
                </label>
                {showEmailNotification && (
                  <React.Fragment>
                    <label className="small">
                      <input
                        type="radio"
                        name="EmailNotifier"
                        value="All"
                        onChange={inputHandelEmail}
                        checked={emailerOption === "All"}
                      />
                      All
                    </label>
                    {/* <label className="small">
                      <input
                        type="radio"
                        name="EmailNotifier"
                        value="Teachers"
                        onChange={inputHandelEmail}
                        checked={emailerOption === "Teachers"}
                      />
                      Teacher
                    </label>
                    <label className="small">
                      <input
                        type="radio"
                        name="EmailNotifier"
                        value="Students"
                        onChange={inputHandelEmail}
                        checked={emailerOption === "Students"}
                      />
                      Student
                    </label> */}
                  </React.Fragment>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {buttonEditLoading ? (
              <button type="button" className="button btn-md button-theme btn-md">
                Updating Announcement...
              </button>
            ) : (
              <button
                className="button btn-md button-theme btn-md"
                onClick={handelSubmitUpdateUser}
              >
                Update Announcement
              </button>
            )}
          </ModalFooter>
        </Modal>
        <Modal show={modalState}>
          <ModalHeader
            title="Add New Announcement"
            closeButton={true}
            onclose={() => closeModalState()}
          />
          <ModalBody>
            <div className="formFieldwrap">
              <label className="text-xs w-600">Thumbnail Banner</label>

              <ul className="DashedInstructionList">
                <li className="text-xxs">Accept only .JPG or .PNG file.</li>
              </ul>
               <UploadButton
                  BtnName="Upload Image"
                  IconClassName="icon-file-upload base i-xs"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  onClick={() => {
                    ref.current.open();
                  }}
                  showLink={true}
                  object={thumbnailBanner}
                />
                <Uploader
                size={1}
                  onclose={() => ref.current.close()}
                  multiSelect={false}
                  validationProp={"onlyImagePdf"}
                  discartRef={ref}
                  onUploaded={(data) => uploadThumbnail(data)}
                  uploadLimit={1}
                />
          
              {thumbnailBanner?.src && (
                <button
                  className="button btn-sm btn-o-red red mt-8"
                  onClick={removeThumbnailBanner}
                >
                  {" "}
                  Remove
                </button>
              )}
            </div>
            <div className="formFieldwrap">
              <FormInput
                className={
                  !announcementData.title.isValid && ShowSubmitError
                    ? "errorInput"
                    : ""
                }
                name="title"
                type="text"
                label="Announcement Title"
                onChange={inputHandel}
                onKeyUp={inputHandel}
                value={announcementData.title.value}
                placeholder="Announcement Title"
              />
              <FormError
                show={!announcementData.title.isValid && ShowSubmitError}
                error="Title is required."
              />
            </div>
            <div className="formFieldwrap">
              {/* <FormTextArea
                className="form-control"
                name="description"
                value={announcementData.description.value}
                onChange={inputHandel}
                onKeyUp={inputHandel}
                rows="5"
                placeholder="Have something to share? Add announcement description here"
              /> */}
              <TextEditor
                preFilledData={description}
                currentResponse={(value) => handleDescriptionInput(value)}
              />
              <label
                className="animLabel"
                htmlFor="exampleFormControlTextarea1"
              >
                Announcement Description
              </label>
            </div>
            <div className="formFieldwrap">
              <label className="text-xs w-600">Upload File</label>
              <p className="text-xxs mt-3">
                Accept only .JPG or .PNG, Pdf file. Maximum file size 10 MB.
              </p>
              {/* <Upload
                label="Upload file"
                onUploaded={uploadImage1}
                size={10}
                clearFileName={clearFileName}
                hidenFileName={true}
                invalidError={() => removeimgLink1()}
                IconFileUploadClass="icon-file-upload base i-xs"
              /> */}
               <UploadButton
                  BtnName="Upload File"
                  IconClassName="icon-file-upload base i-xs"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  onClick={() => {
                    attachmentRef.current.open();
                  }}
                 
                />
                <Uploader
                size={10}
                  onclose={() => attachmentRef.current.close()}
                  multiSelect={false}
                  validationProp={"onlyImagePdf"}
                  discartRef={attachmentRef}
                  onUploaded={(data) => uploadImage1(data)}
                  uploadLimit={1}
                />
              {imgLink1?.src ? (
                <p className="btnText priamry text-2xs attachmentwithtext mt-3">
                  <i className="ed-icon icon-attachment gray i-xs"></i>
                  <a
                    href={imgLink1?.src}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Attachment
                  </a>
                </p>
              ) : (
                ""
              )}
              {imgLink1?.src && (
                <button
                  className="button btn-sm btn-o-red red mt-8"
                  onClick={removeimgLink1}
                >
                  {" "}
                  Remove
                </button>
              )}
            </div>
            <p className="text-xs w-500 mb-5">
              Do you want to send email notification
            </p>
            <div className="formFieldwrap">
              <div className="input-custom-type inline">
                <label className="small">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setShowEmailNotification(!showEmailNotification)
                    }
                    checked={showEmailNotification === true}
                  />
                  Yes
                </label>

                {showEmailNotification && (
                  <React.Fragment>
                    <label className="small">
                      <input
                        type="radio"
                        name="EmailNotifier1"
                        value="All"
                        onChange={inputHandelEmail}
                        checked={emailerOption === "All"}
                      />
                      All
                    </label>
                    {/* <label className="small">
                      <input
                        type="radio"
                        name="EmailNotifier2"
                        value="Teachers"
                        onChange={inputHandelEmail}
                        checked={emailerOption === "Teachers"}
                      />
                      Teacher
                    </label>
                    <label className="small">
                      <input
                        type="radio"
                        name="EmailNotifier3"
                        value="Students"
                        onChange={inputHandelEmail}
                        checked={emailerOption === "Students"}
                      />
                      Student
                    </label> */}
                  </React.Fragment>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {buttonCreateLoading ? (
              <button type="button" className="button btn-md button-theme btn-md">
                Creating Announcement...
              </button>
            ) : (
              <button className="button btn-md button-theme btn-md" onClick={submitHandel}>
                Publish Announcement
              </button>
            )}
          </ModalFooter>
        </Modal>
      </>
    </React.Fragment>
  );
}
