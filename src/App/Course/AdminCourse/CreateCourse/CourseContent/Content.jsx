/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import FormInput from "../../../../../Common/Form/FormInput";
import Upload from "../../../../../Common/Upload";
// import IconSave from "./icon-save.svg";
import IconActiveCircleSave from "./icon-c-active-save.svg";
import IconInActiveCircleSave from "./icon-c-save.svg";
// import IconPublish from "../../../icon-publish.svg";
import FormError from "../../../../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import { postImagePopUpData } from "../../../../../store/actions/admincourse";
import Popup from "../../../../../Common/Popup";
import IconUpload from "./icon-cloud-upload.svg";
import IconDownload from "./icon-cloud-download.svg";
import IconFeatherDownload from "./icon-feather-cloud-download.svg";
import IconDeleteBase from "./icon-delete-base.svg";
import IconAudio from "./icon-audio.svg";
// import { useEffect } from "react";
import Uploader from "../../../../../Common/ImageUploader";
import UploadButton from "../../../../../Common/UploadButton";
// import { IMG_ACCEPT } from '../../../../Constant/constants';


const Content = ({
  contentValue,
  onChangeContent,
  ContentHeader,
  onDeleteContent,
  addNewTopicContent,
  editfalseContent,
  addNewChapterContent,
  editfalseChapterContent,
}) => {
  const dispatch = useDispatch();

  const { taxanomyData, taxanomySuccess } = useSelector((state) => {
    return {
      taxanomyData: state.admincourse.getTaxanomy.data,
      taxanomySuccess: state.admincourse.getTaxanomy.success,
    };
  });
  const CoursesTaxanomyContent = () => {
    if (taxanomySuccess) {
      if (taxanomyData && taxanomyData.taxanomyContent) {
        return taxanomyData.taxanomyContent;
      } else {
        return "Content";
      }
    } else {
      return "Content";
    }
  };

  const CoursesTaxanomyChapter = () => {
    if (taxanomySuccess) {
      if (taxanomyData && taxanomyData.taxanomyChapter) {
        return taxanomyData.taxanomyChapter;
      } else {
        return "Chapter";
      }
    } else {
      return "Chapter";
    }
  };
  const CoursesTaxanomyTopic = () => {
    if (taxanomySuccess) {
      if (taxanomyData && taxanomyData.taxanomyTopic) {
        return taxanomyData.taxanomyTopic;
      } else {
        return "Topic";
      }
    } else {
      return "Topic";
    }
  };

  const [showDeletePopUpTopicContent, setShowDeletePopUpTopicContent] =
    useState("");
  const [showDeletePopUpChapterContent, setShowDeletePopUpChapterContent] =
    useState("");
  const RemovePopToggleRef = useRef();
  const [RemovePop, setRemovePop] = useState(false);
  const [restrictUpload, setRestrictUpload] = useState(false);
  // const [uploadLimit, setUploadLimit] = useState(5);
  // const [uploadIssueResolve, setUploadIssueResolve] = useState([])
  const ShowImagePopUp = (data) => {
    dispatch(postImagePopUpData(data));
  };

  // useEffect(() => {
  //   if (uploadIssueResolve.length > 0) {
  //     setChangeUpload()
  //   } else {
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [contentValue])

  const fileUpload = (data) => {
    console.log("line 100",data)
    data.forEach((element) => {
      // let fileType = element.location.split(".")[-1];
      addNewTopicContent(
        "fileUpload",
        element,
        element.type,
        element.size
      );
    });
    fileUploadLimitationTopic();
  };

  const fileUploadChapterContent = (data) => {
    console.log("line 113",data)
    data.forEach((element) => {
      // let fileType = element.location.split(".")[-1];
      addNewChapterContent(
        "fileUpload",
        element,
        element.type,
        element.size
      );
    });
    fileUploadLimitationChapter();
  };

  const fileUploadLimitationChapter = () => {
    let count = 0;
    if (contentValue.chapterContent) {
      contentValue.chapterContent.forEach((element) => {
        if (element.contentFileUploadType === "fileUpload") {
          count = count + 1;
        }
      });
      if (count > 4) {
        setRestrictUpload(true);
      } else {
        // setUploadLimit(5 - count)
        setRestrictUpload(false);
      }
    }
  };
  const fileUploadLimitationTopic = () => {
    let count = 0;
    if (contentValue.topicContent) {
      contentValue.topicContent.forEach((element) => {
        if (element.contentFileUploadType === "fileUpload") {
          count = count + 1;
        }
      });
      if (count > 4) {
        setRestrictUpload(true);
      } else {
        // setUploadLimit(5 - count)
        setRestrictUpload(false);
      }
    }
  };
  const addNewExternalURl = () => {
    addNewTopicContent("ExternalLinkUrl");
  };

  const cancelEditTopicDetails = (_id) => {
    fileUploadLimitationTopic();
    fileUploadLimitationChapter();
    onDeleteContent(_id);
  };
  const deletePopUpTopicContent = (_id) => {
    setShowDeletePopUpTopicContent(_id);
    setRemovePop(!RemovePop);
  };
  const deletePopUpChapterContent = (_id) => {
    setShowDeletePopUpChapterContent(_id);
    setRemovePop(!RemovePop);
  };
  const openExternalUrl = (data) => {
    if (data.includes("https://")) {
      window.open(data, " blank");
    } else {
      let URL = `https://${data}`;
      window.open(URL, " blank");
    }
  };
const ref=useRef(null)
  // var fileName = itemTopicContent.contentFileUpload;
  // var fileExtension = fileName.split(".").pop();
  return (
    <React.Fragment>
      <div className="uploadContentSectionCst">
        <p className="text-xs w-600 mb-5">
          Upload{" "}
          {ContentHeader === "Topic"
            ? CoursesTaxanomyTopic()
            : CoursesTaxanomyChapter()}{" "}
          content
        </p>
        <ul className="DashedInstructionList">
          <li className="text-xxs">
            You can upload upto 5 files and there are no limitation for external
            file URL.
          </li>
          <li className="text-xxs">
            Allowed files only .JPG, .PNG, .MP3, .MP4, .PDF
          </li>
          <li className="text-xxs">
            Max file size allowed - 100 MB
          </li>
        </ul>

        {ContentHeader === "Topic" ? (
          <React.Fragment>
            {contentValue.topicContent
              ? contentValue.topicContent.map(
                (itemTopicContent, topicContentKey) => {
                  return (
                    <React.Fragment>
                      {itemTopicContent.NewTopicContent === true &&
                        itemTopicContent.contentFileUploadType ===
                        "ExternalLinkUrl" ? (
                        <React.Fragment>
                          <div className="AddUrlInputWrapper mt-20">
                            <div className="formFieldwrap">
                              <FormInput
                                placeholder="External File Url"
                                value={itemTopicContent.contentFileUpload}
                                onChange={(e) =>
                                  onChangeContent(
                                    e.target.value,
                                    "topicContent",
                                    "contentFileUpload",
                                    topicContentKey
                                  )
                                }
                                label={`External File URL`}
                              />

                              <FormError
                                show={
                                  itemTopicContent.contentFileUpload === ""
                                }
                                error="External File URL cannot be empty."
                              ></FormError>
                              <FormError
                                show={
                                  itemTopicContent.contentFileUpload && itemTopicContent.contentFileUploadisValid === false
                                }
                                error="Url Needed"
                              ></FormError>
                            </div>
                            <ul className="AddUrlInputAction">
                              <li
                                onClick={() =>
                                  editfalseContent(topicContentKey)
                                }
                              >
                                &#10004;
                              </li>
                              <li
                                onClick={() =>
                                  cancelEditTopicDetails(topicContentKey)
                                }
                              >
                                &#10006;
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {itemTopicContent.contentFileUploadType === "fileUpload" ? (
                            <React.Fragment>
                              <div className="uploadTopicContentList">
                                <div className="utc-content">
                                  <p
                                    className="primary text-xxs w-600"
                                    onClick={() =>
                                      ShowImagePopUp(itemTopicContent.contentFileUpload)}
                                  >
                                    {itemTopicContent?.contentFileUpload?.src.includes(".mp3") ? (
                                      <>
                                        <span className="iconAudioPlayCst">
                                          <img src={IconAudio} alt="Audio" />
                                        </span>
                                        {
                                          itemTopicContent.contentFileUpload.src
                                        }
                                      </>
                                    ) : (
                                      itemTopicContent?.contentFileUpload?.src
                                    )}
                                  </p>
                                  <p className="base text-xxs mt-3 w-500">
                                    {itemTopicContent.contentFileSize} MB
                                  </p>
                                </div>
                                <ul className="utc-action">
                                  <li
                                    type="button"
                                    onClick={() =>
                                      onChangeContent(
                                        itemTopicContent.isDownloadable
                                          ? false
                                          : true,
                                        "topicContent",
                                        "isDownloadable",
                                        topicContentKey
                                      )
                                    }
                                    className={
                                      itemTopicContent.isDownloadable === true
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <img
                                      src={
                                        itemTopicContent.isDownloadable ===
                                          true
                                          ? IconDownload
                                          : IconFeatherDownload
                                      }
                                      alt="Downloadable"
                                      title="Downloadable"
                                    />
                                  </li>
                                  <li
                                    type="button"
                                    onClick={() =>
                                      onChangeContent(
                                        itemTopicContent.isPublished ===
                                          "Publish"
                                          ? "Save"
                                          : "Publish",
                                        "topicContent",
                                        "isPublished",
                                        topicContentKey
                                      )
                                    }
                                    className={
                                      itemTopicContent.isPublished === "Save"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <img
                                      src={
                                        itemTopicContent.isPublished ===
                                          "Save"
                                          ? IconActiveCircleSave
                                          : IconInActiveCircleSave
                                      }
                                      alt="Save"
                                      title="Save"
                                    />
                                  </li>
                                  <li
                                    onClick={() =>
                                      deletePopUpTopicContent(
                                        itemTopicContent._id
                                      )
                                    }
                                  >
                                    <img
                                      src={IconDeleteBase}
                                      title="Delete"
                                      alt=""
                                    />
                                  </li>
                                </ul>
                                {showDeletePopUpTopicContent ===
                                  itemTopicContent._id &&
                                  RemovePop && (
                                    <>
                                      <Popup
                                        show={RemovePop}
                                        RemovePopToggleRef={
                                          RemovePopToggleRef
                                        }
                                        CancelProp={() =>
                                          setRemovePop(!RemovePop)
                                        }
                                        RemoveProp={() =>
                                          cancelEditTopicDetails(
                                            topicContentKey
                                          )
                                        }
                                      >
                                        <p className="gray text-xxs w-300">
                                          You are about to remove this{" "}
                                          {CoursesTaxanomyTopic()}
                                          {CoursesTaxanomyContent()}.
                                        </p>
                                        <p className="dgray text-xxs w-400">
                                          Are you sure?
                                        </p>
                                      </Popup>
                                    </>
                                  )}
                              </div>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <div className="uploadTopicContentList">
                                <div
                                  className="utc-content"
                                  onClick={() =>
                                    openExternalUrl(
                                      itemTopicContent.contentFileUpload
                                    )
                                  }
                                >
                                  <p className="primary text-xxs w-600">
                                    {itemTopicContent.contentFileUpload}
                                  </p>
                                </div>
                                <ul className="utc-action">
                                  <li
                                    onClick={() =>
                                      deletePopUpTopicContent(
                                        itemTopicContent._id
                                      )
                                    }
                                    title="Delete"
                                  >
                                    <img
                                      src={IconDeleteBase}
                                      title="Delete"
                                      alt=""
                                    />
                                  </li>
                                </ul>
                                {showDeletePopUpTopicContent ===
                                  itemTopicContent._id &&
                                  RemovePop && (
                                    <>
                                      <Popup
                                        show={RemovePop}
                                        RemovePopToggleRef={
                                          RemovePopToggleRef
                                        }
                                        CancelProp={() =>
                                          setRemovePop(!RemovePop)
                                        }
                                        RemoveProp={() =>
                                          cancelEditTopicDetails(
                                            topicContentKey
                                          )
                                        }
                                      >
                                        <p className="gray text-xxs w-300">
                                          You are about to remove this{" "}
                                          {CoursesTaxanomyTopic()}
                                          {CoursesTaxanomyContent()}.
                                        </p>
                                        <p className="dgray text-xxs w-400">
                                          Are you sure?
                                        </p>
                                      </Popup>
                                    </>
                                  )}
                              </div>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  );
                }
              )
              : ""}

            <div className="uploadTopicContentAction">
              {contentValue.topicContent &&
                contentValue.topicContent.length > 0 ? (
                contentValue.topicContent[contentValue.topicContent.length - 1]
                  .contentFileUpload === "" ? (
                  <React.Fragment>
                    <div className="formFieldwrap uploadFiles">
                      {/* <Upload
                        label="Upload Files"
                        hidenFileName={true}
                        // IconFileUploadClass="icon-file-upload base i-xs"
                        onUploaded={fileUpload}
                        size={100}
                        multiSelect={true}
                        disableHandel={true}
                        studyMaterialFiles={true}
                      >
                        <div className="UploadIcon">
                          <img src={IconUpload} alt="" />
                        </div>
                      </Upload> */}
                      <Uploader size={5}
                        // accept={IMG_ACCEPT}
                        onclose={() => ref?.current?.close()}
                        multiSelect={true} discartRef={ref} onUploaded={(val) => fileUpload(val)} uploadLimit={1} validationProp={"studyMaterialFiles"} />
                      <UploadButton onClick={() => ref?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="i-md gray" BtnName="Upload Image" />
                    </div>
                    <button
                      type="button"
                      className="button btn-md primary text-xxs addExternalFileUrlBtn"
                      onClick={() => addNewExternalURl()}
                      disabled={true}
                    >
                      Add External File URL
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="formFieldwrap uploadFiles">
                    <Uploader size={5}
                        // accept={IMG_ACCEPT}
                        onclose={() => ref?.current?.close()}
                        multiSelect={true} discartRef={ref} onUploaded={(val) => fileUpload(val)} uploadLimit={1} validationProp={"studyMaterialFiles"} />
                      <UploadButton onClick={() => ref?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="i-md gray" BtnName="Upload Image" />
                      {/* <Upload
                        label="Upload Files"
                        hidenFileName={true}
                        // IconFileUploadClass="icon-file-upload base i-xs"
                        onUploaded={fileUpload}
                        size={100}
                        multiSelect={true}
                        disableHandel={restrictUpload}
                        studyMaterialFiles={true}
                      >
                        <div className="UploadIcon">
                          <img src={IconUpload} alt="" />
                        </div>
                      </Upload> */}
                    </div>
                    <button
                      type="button"
                      className="button btn-md primary text-xxs addExternalFileUrlBtn"
                      onClick={() => addNewExternalURl()}
                    >
                      Add External File URL
                    </button>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <div className="formFieldwrap uploadFiles">
                    {/* <Upload
                      label="Upload Files"
                      hidenFileName={true}
                      // IconFileUploadClass="icon-file-upload base i-xs"
                      onUploaded={fileUpload}
                      size={100}
                      multiSelect={true}
                      disableHandel={restrictUpload}
                      studyMaterialFiles={true}
                    >
                      <div className="UploadIcon">
                        <img src={IconUpload} alt="" />
                      </div>
                    </Upload> */}
                           <Uploader size={5}
                        // accept={IMG_ACCEPT}
                        onclose={() => ref?.current?.close()}
                        multiSelect={true} discartRef={ref} onUploaded={(val) => fileUpload(val)} uploadLimit={1} validationProp={"studyMaterialFiles"} />
                      <UploadButton onClick={() => ref?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="i-md gray" BtnName="Upload Image" />
                  </div>
                  <button
                    type="button"
                    className="button btn-md primary text-xxs addExternalFileUrlBtn"
                    onClick={() => addNewExternalURl()}
                  >
                    Add External File URL
                  </button>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {contentValue.chapterContent
              ? contentValue.chapterContent.map(
                (itemChapterContent, chapterContentKey) => {
                  return (
                    <React.Fragment>
                      {showDeletePopUpChapterContent ===
                        itemChapterContent._id &&
                        RemovePop && (
                          <Popup
                            show={RemovePop}
                            RemovePopToggleRef={RemovePopToggleRef}
                            CancelProp={() => setRemovePop(!RemovePop)}
                            RemoveProp={() =>
                              cancelEditTopicDetails(chapterContentKey)
                            }
                          >
                            <p className="gray text-xxs w-300">
                              You are about to remove this{" "}
                              {CoursesTaxanomyChapter()}{" "}
                              {CoursesTaxanomyContent()}.
                            </p>
                            <p className="dgray text-xxs w-400">
                              Are you sure?
                            </p>
                          </Popup>
                        )}
                      {itemChapterContent.NewChapterContent === true &&
                        itemChapterContent.contentFileUploadType ===
                        "ExternalLinkUrl" ? (
                        <React.Fragment>
                          <div className="AddUrlInputWrapper mt-20">
                            <div className="formFieldwrap">
                              <FormInput
                                placeholder="External File Url"
                                value={itemChapterContent.contentFileUpload}
                                onChange={(e) =>
                                  onChangeContent(
                                    e.target.value,
                                    "chapterContent",
                                    "contentFileUpload",
                                    chapterContentKey
                                  )
                                }
                                label={`${CoursesTaxanomyTopic()} Title *`}
                              />
                              <FormError
                                show={
                                  itemChapterContent.contentFileUpload === ""
                                }
                                error="External File URL cannot be empty."
                              ></FormError>
                            </div>
                            <ul className="AddUrlInputAction">
                              <li
                                onClick={() =>
                                  editfalseChapterContent(chapterContentKey)
                                }
                              >
                                &#10004;
                              </li>
                              <li
                                onClick={() =>
                                  cancelEditTopicDetails(chapterContentKey)
                                }
                              >
                                &#10006;{" "}
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {itemChapterContent.contentFileUploadType ===
                            "fileUpload" ? (
                            <React.Fragment>
                              <div className="uploadTopicContentList">
                                <div className="utc-content">
                                  <p
                                    onClick={() =>
                                      ShowImagePopUp(
                                        itemChapterContent.contentFileUpload
                                      )
                                    }
                                  >
                                    {itemChapterContent?.contentFileUpload?.src.includes(".mp3") ? (
                                      <>
                                        <span className="iconAudioPlayCst">
                                          <img src={IconAudio} alt="Audio" />
                                        </span>
                                        {
                                          itemChapterContent.contentFileUpload.split(
                                            "https://edneed-images-uat.s3.amazonaws.com/"
                                          )[1]
                                        }
                                      </>
                                    ) : (
                                      itemChapterContent?.contentFileUpload?.src
                                    )}
                                  </p>
                                  <p>
                                    {itemChapterContent.contentFileSize} MB
                                  </p>
                                </div>
                                <ul className="utc-action">
                                  <li
                                    type="button"
                                    onClick={() =>
                                      onChangeContent(
                                        itemChapterContent.isDownloadable
                                          ? false
                                          : true,
                                        "chapterContent",
                                        "isDownloadable",
                                        chapterContentKey
                                      )
                                    }
                                    className={
                                      itemChapterContent.isDownloadable ===
                                        true
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <img
                                      src={
                                        itemChapterContent.isDownloadable ===
                                          true
                                          ? IconDownload
                                          : IconFeatherDownload
                                      }
                                      alt="Downloadable"
                                      title="Downloadable"
                                    />
                                  </li>
                                  <li
                                    type="button"
                                    onClick={() =>
                                      onChangeContent(
                                        itemChapterContent.isPublished ===
                                          "Publish"
                                          ? "Save"
                                          : "Publish",
                                        "chapterContent",
                                        "isPublished",
                                        chapterContentKey
                                      )
                                    }
                                    className={
                                      itemChapterContent.isPublished ===
                                        "Save"
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <img
                                      src={
                                        itemChapterContent.isPublished ===
                                          "Save"
                                          ? IconActiveCircleSave
                                          : IconInActiveCircleSave
                                      }
                                      alt="Save"
                                      title="Save"
                                    />
                                  </li>
                                  <li
                                    onClick={() =>
                                      deletePopUpChapterContent(
                                        itemChapterContent._id
                                      )
                                    }
                                    title="Delete"
                                  >
                                    <img
                                      src={IconDeleteBase}
                                      title="Delete"
                                      alt=""
                                    />
                                  </li>
                                </ul>
                              </div>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <div className="uploadTopicContentList">
                                <div
                                  className="utc-content"
                                  onClick={() =>
                                    openExternalUrl(
                                      itemChapterContent.contentFileUpload
                                    )
                                  }
                                >
                                  <p className="primary text-xxs w-600">
                                    {itemChapterContent.contentFileUpload}
                                  </p>
                                </div>
                                <ul className="utc-action">
                                  <li
                                    onClick={() =>
                                      deletePopUpChapterContent(
                                        itemChapterContent._id
                                      )
                                    }
                                    title="Delete"
                                  >
                                    <img
                                      src={IconDeleteBase}
                                      title="Delete"
                                      alt=""
                                    />
                                  </li>
                                </ul>
                              </div>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  );
                }
              )
              : ""}

            <div className="uploadTopicContentAction">
              {contentValue.chapterContent &&
                contentValue.chapterContent.length > 0 ? (
                contentValue.chapterContent[
                  contentValue.chapterContent.length - 1
                ].contentFileUpload === "" ? (
                  <React.Fragment>
                    <div className="formFieldwrap uploadFiles">
                      {/* <Upload
                        label="Upload Files"
                        hidenFileName={true}
                        // IconFileUploadClass="icon-file-upload base i-xs"
                        onUploaded={fileUploadChapterContent}
                        size={100}
                        multiSelect={true}
                        disableHandel={true}
                        studyMaterialFiles={true}
                      >
                        <div className="UploadIcon">
                          <img src={IconUpload} alt="" />
                        </div>
                      </Upload> */}
                      <Uploader size={5}
                        // accept={IMG_ACCEPT}
                        onclose={() => ref?.current?.close()}
                        multiSelect={true} discartRef={ref} onUploaded={(val) => fileUploadChapterContent(val)} uploadLimit={1} validationProp={"studyMaterialFiles"} />
                      <UploadButton onClick={() => ref?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="i-md gray" BtnName="Upload Image" />
                    </div>
                    <button
                      type="button"
                      className="button btn-md primary text-xxs addExternalFileUrlBtn"
                      onClick={() => addNewExternalURl("ExternalLinkUrl")}
                      disabled={true}
                    >
                      Add External File URL
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="formFieldwrap uploadFiles">
                      {/* <Upload
                        label="Upload Files"
                        hidenFileName={true}
                        // IconFileUploadClass="icon-file-upload base i-xs"
                        onUploaded={fileUploadChapterContent}
                        size={100}
                        multiSelect={true}
                        disableHandel={restrictUpload}
                        studyMaterialFiles={true}
                      >
                        <div className="UploadIcon">
                          <img src={IconUpload} alt="" />
                        </div>
                      </Upload> */}
                       <Uploader size={5}
                        // accept={IMG_ACCEPT}
                        onclose={() => ref?.current?.close()}
                        multiSelect={true} discartRef={ref} onUploaded={(val) => fileUploadChapterContent(val)} uploadLimit={1} validationProp={"studyMaterialFiles"} />
                      <UploadButton onClick={() => ref?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="i-md gray" BtnName="Upload Image" />
                    </div>
                    <button
                      type="button"
                      className="button btn-md primary text-xxs addExternalFileUrlBtn"
                      onClick={() => addNewChapterContent("ExternalLinkUrl")}
                    >
                      Add External File URL
                    </button>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <div className="formFieldwrap uploadFiles">
                    {/* <Upload
                      label="Upload Files"
                      hidenFileName={true}
                      // IconFileUploadClass="icon-file-upload base i-xs"
                      onUploaded={fileUploadChapterContent}
                      size={100}
                      multiSelect={true}
                      disableHandel={restrictUpload}
                      studyMaterialFiles={true}
                    >
                      <div className="UploadIcon">
                        <img src={IconUpload} alt="" />
                      </div>
                    </Upload> */}
                     <Uploader size={5}
                        // accept={IMG_ACCEPT}
                        onclose={() => ref?.current?.close()}
                        multiSelect={true} discartRef={ref} onUploaded={(val) => fileUploadChapterContent(val)} uploadLimit={1} validationProp={"studyMaterialFiles"} />
                      <UploadButton onClick={() => ref?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="i-md gray" BtnName="Upload Image" />
                  </div>
                  <button
                    type="button"
                    className="button btn-md primary text-xxs addExternalFileUrlBtn"
                    onClick={() => addNewChapterContent("ExternalLinkUrl")}
                  >
                    Add External File URL
                  </button>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
export default Content;
