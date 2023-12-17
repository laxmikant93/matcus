/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Cropper from "../../../../Common/Cropper/index";
import FormInput from "../../../../Common/Form/FormInput";
import FormError from "../../../../Common/Form/FormError";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import ValidationFile from "../../../../Classes/ValidationFile";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import { createNoticeDetails, editNoticeDetails, getSingleNotice, resetCreateNotice, resetEditNotice, resetGetSingleNotice } from "../../../../store/actions/NoticeBoard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoticeBoardList from "./NoticeBoardList";
import Upload from "../../../../Common/Upload";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
const NoticeBoardPopUp = () => {
  const [NoticeTitleError, setNoticeTitleError] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeRibbon, setNoticeRibbon] = useState("");
  const [DescriptionError, setDescriptionError] = useState(false);
  const [description, setDescription] = useState("");
  const [thumbnailBanner, setThumbnailBanner] = useState("");
  const [attachement, setAttachement] = useState("");
  const [showEmailNotification, setShowEmailNotification] = useState(false);
  const [emailerOption, setEmailerOption] = useState("All");
  const [isFilled, setIsFilled] = useState(false);
  const { id } = useParams();
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const history = useNavigate();
  const dispatch = useDispatch();

  const {
    users,
    getSingleNoticeLoading,
    getSingleNoticeSuccess,
    getSingleNoticeData,
    buttonCreateLoading,
    buttonCreateSuccess,
    buttonEditLoading,
    buttonEditSuccess,
    businesstype
  } = useSelector((state) => {
    return {
      users: state.user,
      getSingleNoticeLoading: state.noticeboard.getSingleNotice.loading,
      getSingleNoticeSuccess: state.noticeboard.getSingleNotice.success,
      getSingleNoticeData: state.noticeboard.getSingleNotice.data,
      buttonCreateLoading: state.noticeboard.postNotice.loading,
      buttonCreateSuccess: state.noticeboard.postNotice.success,
      buttonEditLoading: state.noticeboard.editNotice.loading,
      buttonEditSuccess: state.noticeboard.editNotice.success,
      businesstype: state.user.user_business_type
    };
  });
  const ref = useRef()
  const fileRef=useRef()
  //Getting a single notice of perticular id
  useEffect(() => {
    if (id) {
      dispatch(getSingleNotice(id, businesstype))
    }
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetGetSingleNotice())
    }
  }, [])

  //Validation on title and discription input
  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    switch (inputName) {
      case "title":
        setNoticeTitle(value);
        setNoticeTitleError(ValidationFile.isEmpty(value));
        break;
      case "description":
        setDescription(value);
        setDescriptionError(ValidationFile.isEmpty(value));
        break;
      case "ribbon":
        setNoticeRibbon(value);
        break;
      default:
        return false;
    };
  }

  const handleOnChangeInput = (inputValue) => {
    setDescription(ValidationFile.spaceNotAccept(inputValue));
    setDescriptionError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
  }

  const isFormValid = () => {
    return !ValidationFile.isEmpty(noticeTitle.trim())
      && !ValidationFile.isEmpty(description.trim())
  }


  //To get pre-filled data on edit
  const fillUpdateData = () => {
    setNoticeTitle(getSingleNoticeData.title);
    setNoticeRibbon(getSingleNoticeData?.ribbon);
    setDescription(getSingleNoticeData.description);
    setThumbnailBanner(getSingleNoticeData.thumbnail);
    setAttachement(getSingleNoticeData.attachment);
    setEmailerOption(getSingleNoticeData.academe);
    setShowEmailNotification(getSingleNoticeData.emailNotify === "Yes" ? true : false);
  }
  if (!isFilled && getSingleNoticeSuccess && getSingleNoticeData && !getSingleNoticeLoading) {
    setIsFilled(true);
    fillUpdateData();
  }

  const reusltDataInfo = () => {
    return {
      "thumbnail": thumbnailBanner,
      "title": noticeTitle,
      "ribbon": noticeRibbon,
      "description": description,
      "attachment": attachement,
      "emailNotify": showEmailNotification === true ? "Yes" : "No",
      "academe": emailerOption,
      // "isStatus": "Active",
      "owner": users._id,
      "institute": users.user_institute,
      "business": users.user_institute,
      "industry": businesstype
    }
  }

  //Function to Save Details
  const handleSave = () => {
    if (isFormValid()) {
      dispatch(createNoticeDetails(reusltDataInfo()));
    } else {
      setDescriptionError(true);
      setNoticeTitleError(true);
    }
  }
  //Function to Edit Details
  const handleUpdate = () => {
    if (isFormValid()) {
      dispatch(editNoticeDetails(id, reusltDataInfo()))
    } else {
      setDescriptionError(true);
      setNoticeTitleError(true);
    }
  }

  const handleCancle = () => {
    history("/miscellaneous-list")
  }

  //Loading on Create and Update Button
  useEffect(() => {
    if (buttonEditSuccess === true) {
      history("/miscellaneous-list")
    };
    if (buttonCreateSuccess === true) {
      history("/miscellaneous-list")
    }
  }, [buttonEditSuccess, buttonCreateSuccess])


  useEffect(() => {
    return () => {
      dispatch(resetCreateNotice())
      dispatch(resetEditNotice())
    };
  }, [dispatch])

  //Upload Image
  const uploadThumbnail = (data) => {
    let imgData = data;
    setThumbnailBanner(imgData);
  }

  //Upload File
  const uploadThumbnailFile = (data) => {
    let imgData = data;
    setAttachement(imgData);
  }

  const removeUplaodDescription = () => {
    setAttachement("");
  };

  //Upload Image remove button function
  const removeThumbnail = () => {
    setThumbnailBanner("");
  };

  //Upload File remove button function
  const removeThumbnailFile = () => {
    setAttachement("");
  }

  //Choose Mail Option
  // const inputHandelEmail = (e) => {
  //   let inputValue = e.target.value;
  //   setEmailerOption(inputValue);
  // };

  //To set Email Notify checked
  // const handleCheckOption = () => {
  //   setShowEmailNotification(!showEmailNotification)
  //   setEmailerOption('All')
  // }
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/miscellaneous-list" title="Miscellaneous" />
        {id ?
          <BreadcrumbItem to={`/update-miscellaneous/${id}`} title="Edit Miscellaneous" /> :
          <BreadcrumbItem to="/add-miscellaneous" title="Create Miscellaneous" />
        }
      </Breadcrumb>
      <>
        {
          id && getSingleNoticeLoading ? (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          ) : (
            <>
              <div className="formFieldwrap mt-50">
                <label className="text-xs w-600">Upload Thumbnail</label>
                <p className="text-xxs mt-5">
                  Accept only .JPG or .PNG file.
                </p>
                <div className="file-input-wrapper">
                  
                   <UploadButton
                   BtnName="Upload Thumbnail"
                    IconClassName="i-md gray"
                    BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{ref.current.open()}}
                      showLink={true}
                      object={thumbnailBanner}
                    />
               <Uploader size={10}
       onclose={() => ref.current.close()}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadThumbnail(data)}   uploadLimit={1} />
                 
                  {thumbnailBanner && <>
                    <button
                      type="button"
                      className="button btn-sm btn-o-red red mt-10"
                      style={{ marginBottom: "10px" }}
                      onClick={removeThumbnail}
                    > Remove
                    </button>
                    <br />
                  </>
                  }
                </div>
              </div>
              <div className="formFieldwrap">
                <FormInput
                  className={
                    !noticeTitle.isValid && NoticeTitleError
                      ? "errorInput"
                      : ""
                  }
                  name="title"
                  type="text"
                  onChange={(e) => handleInput(e)}
                  label="Title"
                  placeholder="Title"
                  maxLength="80"
                  value={noticeTitle}
                />
                <FormError
                  show={NoticeTitleError && noticeTitle === ""}
                  error="Title is required."
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  className={
                    !noticeTitle.isValid && NoticeTitleError
                      ? "errorInput"
                      : ""
                  }
                  name="ribbon"
                  type="text"
                  onChange={(e) => handleInput(e)}
                  label="Ribbon"
                  placeholder="Ribbon"
                  maxLength="80"
                  value={noticeRibbon}
                />
              </div>
              <div className="formFieldwrap">
                <p>Max. allowed 180 characters.</p>
                {/* <FormTextArea
                  className={!description.isValid && NoticeTitleError
                    ? "errorInput" : ""}
                  name="description"
                  rows="5"
                  onChange={handleInput}
                  // label="Description"
                  placeholder="Tip: Keep description short, simple and to the point"
                  style={{ whiteSpace: " pre-wrap" }}
                  maxLength="180"
                  value={description}
                ><label className="text-rdf w-600">Description</label>
                </FormTextArea> */}
                <TextEditor
                  preFilledData={description}
                  currentResponse={(value) => handleOnChangeInput(value)}
                />
                <FormError
                  show={DescriptionError && description === ""}
                  error="Description is required."
                />
              </div>
              <div className="formFieldwrap">
                <div className="attachment">
                  <label className="text-xs w-600">Upload File</label>
                  <p className="text-xxs mt-3">
                    Accept only .JPG .PNG or .Pdf file. Maximum file size 10
                    MB.
                  </p>
                  
                   <UploadButton
                      BtnName="Upload File"
                      IconClassName="icon-file-upload base i-xs"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{fileRef.current.open()}}
                      showLink={true}
                      object={attachement}
                    />
               <Uploader size={10}
       onclose={() => fileRef.current.close()}
      multiSelect={false} discartRef={fileRef} onUploaded={(data)=>uploadThumbnailFile(data)} validationProp={"onlyImagePdf"}  uploadLimit={1} />
                 
                  {attachement?.src &&
                    <button
                      type="button"
                      className="button btn-sm btn-o-red red mt-8"
                      onClick={removeThumbnailFile}
                    >
                      {" "}
                      Remove
                    </button>
                  }
                </div>
              </div>
              {/*   <p className="text-xs w-500 mb-5">
                  Do you want to send email notification
                </p>
                <div className="formFieldwrap">
                  <div className="input-custom-type inline">
                    <label className="small">
                      <input
                        type="checkbox"
                        onChange={handleCheckOption}
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
                        <label className="small">
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
                        </label>
                      </React.Fragment>
                    )}
                  </div>
                </div> */}
              {
                id ? (buttonEditLoading ? (
                  <button type="button" className="button btn-md button-theme btn-md">
                    Updating Miscellaneous...
                  </button>
                ) : (
                  <button
                    className="button btn-md button-theme btn-md"
                    onClick={() => handleUpdate()}
                  >
                    Update Miscellaneous
                  </button>
                )) : (buttonCreateLoading ? (
                  <button type="button" className="button btn-md button-theme btn-md">
                    Creating Miscellaneous...
                  </button>
                ) : (
                  <button
                    className="button btn-md button-theme btn-md"
                    onClick={() => handleSave()}
                  >
                    Add Miscellaneous
                  </button>
                ))
              }
              <button
                className="button btn-md button-theme btn-md"
                onClick={() => handleCancle()}>
                Cancel
              </button>
            </>
          )
        }
      </>
    </React.Fragment>
  )
}
export default NoticeBoardPopUp;