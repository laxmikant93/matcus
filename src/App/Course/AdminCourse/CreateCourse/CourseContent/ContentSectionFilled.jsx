/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FormError from "../../../../../Common/Form/FormError";
import FormInput from "../../../../../Common/Form/FormInput";
import TextEditor from "../../../../../Common/Form/TextEditor";
import Popup from "../../../../../Common/Popup";
import Content from "./Content";
import ContentUploadPopUp from "./ContentUploadPopUp";

const ContentSectionFilled = ({ AddNewTopic }) => {
  const RemovePopToggleRef = useRef();
  const RemovePopToggleRefChapter = useRef();

  const { taxanomyData, taxanomySuccess, imagePopUpShowSuccess } = useSelector(
    (state) => {
      return {
        taxanomyData: state.admincourse.getTaxanomy.data,
        taxanomySuccess: state.admincourse.getTaxanomy.success,
        imagePopUpShowSuccess: state.admincourse.imgaePopUp.success,
      };
    }
  );
  const CoursesTaxanomyContent = () => {

    if (taxanomySuccess) {
      if (taxanomyData && taxanomyData.taxanomyContent) {
        return taxanomyData.taxanomyContent
      } else {
        return "Content"
      }
    } else {
      return "Content"
    }
  }

  const CoursesTaxanomyChapter = () => {

    if (taxanomySuccess) {
      if (taxanomyData && taxanomyData.taxanomyChapter) {
        return taxanomyData.taxanomyChapter
      } else {
        return "Chapter"
      }
    } else {
      return "Chapter"
    }
  }
  const CoursesTaxanomyTopic = () => {

    if (taxanomySuccess) {
      if (taxanomyData && taxanomyData.taxanomyTopic) {
        return taxanomyData.taxanomyTopic
      } else {
        return "Topic"
      }
    } else {
      return "Topic"
    }
  }

  const [courseTopicFilledData, setCourseTopicFilledData] = useState([]);
  const [showTopicChapterDetails, setShowTopicChapterDetails] = useState("");
  const [showTopicDetails, setShowTopicDetails] = useState("");
  const [deleteTopicToggleID, setDeleteTopicToggleID] = useState("");
  const [deleteChapterToggleID, setDeleteChapterToggleID] = useState("");
  const [editTopicDetails, setEditTopicDetails] = useState("");
  const [RemovePop, setRemovePop] = useState(false);
  const [RemovePopChapter, setRemovePopChapter] = useState(false);
  const [tempTopicTitleDetailsEdit, setTempTopicTitleDetailsEdit] =
    useState("");
  const [tempTopicDescriptionDetailsEdit, setTempTopicDescriptionDetailsEdit] = useState("");
  const [tempChapterTitleDetailsEdit, setTempChapterTitleDetailsEdit] =
    useState("");
  const [
    tempChapterDescriptionDetailsEdit,
    setTempChapterDescriptionDetailsEdit,
  ] = useState("");

  useEffect(() => {
    if (AddNewTopic) {
      setCourseTopicFilledData(AddNewTopic);
    }
  }, [AddNewTopic]);

  const showHideTopicDetails = (index) => {
    setEditTopicDetails("");
    if (showTopicDetails === index) {
      setShowTopicDetails("");
    } else {
      setShowTopicDetails(index);
    }
  };

  const showHideChapterDetails = (_id) => {
    if (showTopicChapterDetails === _id) {
      setShowTopicChapterDetails("");
    } else {
      setShowTopicChapterDetails(_id);
    }
  };

  const DeleteChapterContent = (_id) => {
    setRemovePop(!RemovePop);
    let newinputs = courseTopicFilledData;
    for (let i = 0; i < newinputs.length; i++) {
      let Index = "";
      for (let j = 0; j < newinputs[i].topicChapter.length; j++) {
        if (newinputs[i].topicChapter[j]._id === _id) {
          Index = j;
        }
      }
      newinputs[i].topicChapter.splice(Index, 1);
      setCourseTopicFilledData([...newinputs]);
      break;
    }
  };

  const deleteTopicDetailsPopUp = (_id) => {
    setRemovePop(!RemovePop);
    if (deleteTopicToggleID === _id) {
      setDeleteTopicToggleID("");
    } else {
      setDeleteTopicToggleID(_id);
    }

  };


  const editTopicDetailsMode = (key, data) => {
    setEditTopicDetails(key);
    setTempTopicTitleDetailsEdit(data.topicTitle);
    setTempTopicDescriptionDetailsEdit(data.topicShortDescription);
  };

  const cancelEditTopicDetails = () => {
    setEditTopicDetails("");
  };

  const DeleteTopicDetails = (index) => {
    let AlreadyFillingData = courseTopicFilledData;
    AlreadyFillingData.splice(index, 1);
    setCourseTopicFilledData([...AlreadyFillingData]);
  };

  const topicChapterDelete = (_id) => {
    setRemovePopChapter(!RemovePopChapter);
    if (deleteChapterToggleID === _id) {
      setDeleteChapterToggleID("");
    } else {
      setDeleteChapterToggleID(_id);
    }

  };

  const OnChangeTopic = (e, switchValue) => {
    let Value = e.target.value;
    if (switchValue === "topicTitle") {
      setTempTopicTitleDetailsEdit(Value);
    } else {
      setTempTopicDescriptionDetailsEdit(Value);
    }
  };

  const OnChangeChapter = (e, switchValue) => {
    if (switchValue === "chapterTitle") {
      let Value = e.target.value;
      setTempChapterTitleDetailsEdit(Value);
    } else {
      setTempChapterDescriptionDetailsEdit(e);
    }
  };

  const patchEditTopicDetails = (key) => {
    let AlreadyFillingData = courseTopicFilledData;
    AlreadyFillingData[key].topicTitle = tempTopicTitleDetailsEdit;
    AlreadyFillingData[key].topicShortDescription = tempTopicDescriptionDetailsEdit;
    setCourseTopicFilledData([...AlreadyFillingData]);
    cancelEditTopicDetails();
  };
  const onChangeContentType = (
    value,
    switchValue,
    variableName,
    key,
    index,
    ChapterKey
  ) => {

    let CurrentFillingData = courseTopicFilledData;
    if (switchValue === "topicContent") {
      CurrentFillingData[index].topicContent[key][variableName] = value;
    } else {
      CurrentFillingData[index].topicChapter[ChapterKey].chapterContent[key][
        variableName
      ] = value;
    }
    setCourseTopicFilledData([...CurrentFillingData]);
  };

  const onDeleteContent = (_id, switchValue, index, chapterKey) => {
    if (switchValue === "Topic") {
      let newinputs = courseTopicFilledData;
      newinputs[index].topicContent.splice(_id, 1);
      setCourseTopicFilledData([...newinputs]);
      // for (let i = 0; i < newinputs.length; i++) {
      //   let Index = "";
      //   if (newinputs[i].topicContent) {
      //     for (let j = 0; j < newinputs[i].topicContent.length; j++) {
      //       if (newinputs[i].topicContent[j]._id === _id) {
      //         Index = j;
      //       }
      //     }
      //     newinputs[i].topicContent.splice(Index, 1);
      //     setCourseTopicFilledData([...newinputs]);
      //     break;
      //   }
      // }
    } else {
      let newinputs = courseTopicFilledData;

      newinputs[index].topicChapter[chapterKey].chapterContent.splice(_id, 1);
      setCourseTopicFilledData([...newinputs]);
      // let IndexK = "";
      // let IndexJ = "";
      // for (let i = 0; i < newinputs.length; i++) {
      //   if (newinputs[i].topicChapter) {
      //     for (let j = 0; j < newinputs[i].topicChapter.length; j++) {
      //       if (newinputs[i].topicChapter[j].chapterContent) {
      //         for (
      //           let k = 0;
      //           k < newinputs[i].topicChapter[j].chapterContent.length;
      //           k++
      //         ) {
      //           if (
      //             newinputs[i].topicChapter[j].chapterContent[k]._id === _id
      //           ) {
      //             IndexK = k;
      //             IndexJ = j;
      //           }
      //         }
      //       }
      //     }
      //   }

      //   newinputs[i].topicChapter[IndexJ].chapterContent.splice(IndexK, 1);
      //   setCourseTopicFilledData([...newinputs]);
      // }
    }
  };

  const EditTopicChapter = (TopicKey, key) => {
    let CurrentFillingData = courseTopicFilledData;

    CurrentFillingData[TopicKey].topicChapter[key].NewChapter = true;

    setCourseTopicFilledData([...CurrentFillingData]);
    setTempChapterTitleDetailsEdit(
      CurrentFillingData[TopicKey].topicChapter[key].chapterTitle
    );
    setTempChapterDescriptionDetailsEdit(
      CurrentFillingData[TopicKey].topicChapter[key].chapterShortDescription
    );
  };

  const addNewTopicContent = (
    fileUploadType,
    contentFileUploadValue,
    fileType,
    fileSize,
    index
  ) => {
    let CurrentFillingData = courseTopicFilledData;

    if (CurrentFillingData[index].topicContent) {
      for (let j = 0; j < CurrentFillingData[index].topicContent.length; j++) {
        CurrentFillingData[index].topicContent[j].NewTopicContent = false;
      }
      CurrentFillingData[index].topicContent.push({
        _id: Math.floor(Math.random() * 80000000000),
        contentFileUploadType: fileUploadType,
        contentFileUpload: contentFileUploadValue ? contentFileUploadValue : "",
        contentFileType: fileType ? fileType : "",
        contentDescription: "",
        isPublished: "Publish",
        isDownloadable: true,
        NewTopicContent: true,
        contentFileSize: fileSize ? fileSize : "",
      });

      setCourseTopicFilledData([...CurrentFillingData]);
    } else {
      CurrentFillingData[index].topicContent = [
        {
          _id: Math.floor(Math.random() * 80000000000),
          contentFileUploadType: fileUploadType,
          contentFileUpload: contentFileUploadValue
            ? contentFileUploadValue
            : "",
          contentFileType: fileType ? fileType : "",
          contentDescription: "",
          isPublished: "Publish",
          isDownloadable: true,
          NewTopicContent: true,
          contentFileSize: fileSize ? fileSize : "",
        },
      ];
      setCourseTopicFilledData([...CurrentFillingData]);
    }
  };

  const editfalseContent = (key, index) => {
    let CurrentFillingData = courseTopicFilledData;
    if (CurrentFillingData[index].topicContent[key].contentFileUpload === "") {

    } else {
      CurrentFillingData[index].topicContent[key].NewTopicContent = false;
      setCourseTopicFilledData([...CurrentFillingData]);
    }
  };

  const addNewChapterContent = (fileUploadType, contentFileUploadValue, fileType, fileSize, key, index) => {
    let CurrentFillingData = courseTopicFilledData;
    for (let i = 0; i < CurrentFillingData.length; i++) {
      if (CurrentFillingData[i].topicChapter) {
        if (CurrentFillingData[i].topicChapter[key]) {
          if (CurrentFillingData[i].topicChapter[key].chapterContent) {
            for (let j = 0; j < CurrentFillingData[i].topicChapter.length; j++) {
              if (CurrentFillingData[i].topicChapter[j].chapterContent) {
                for (let k = 0; k < CurrentFillingData[i].topicChapter[j].chapterContent.length; k++) {
                  if (CurrentFillingData[i].topicChapter[j].chapterContent[k].NewChapterContent) {
                    CurrentFillingData[i].topicChapter[j].chapterContent[k].NewChapterContent = false;
                  }
                }
              }
            }
          }
        }
      }
    }
    if (CurrentFillingData[index].topicChapter[key].chapterContent) {
      CurrentFillingData[index].topicChapter[key].chapterContent.push({
        _id: Math.floor(Math.random() * 80000000000),
        contentFileUploadType: fileUploadType,
        contentFileUpload: contentFileUploadValue
          ? contentFileUploadValue
          : "",
        contentFileType: fileType ? fileType : "",
        contentDescription: "",
        isPublished: "Publish",
        isDownloadable: true,
        NewChapterContent: true,
        contentFileSize: fileSize ? fileSize : "",
      });
      setCourseTopicFilledData([...CurrentFillingData]);
    }
    else {
      CurrentFillingData[index].topicChapter[key].chapterContent = [
        {
          _id: Math.floor(Math.random() * 80000000000),
          contentFileUploadType: fileUploadType,
          contentFileUpload: contentFileUploadValue
            ? contentFileUploadValue
            : "",
          contentFileType: fileType ? fileType : "",
          contentDescription: "",
          isPublished: "Publish",
          isDownloadable: true,
          NewChapterContent: true,
          contentFileSize: fileSize ? fileSize : "",
        },
      ];
      setCourseTopicFilledData([...CurrentFillingData]);
    }
  };
  const editfalseChapterContent = (index, key, topicChapterKey) => {
    let CurrentFillingData = courseTopicFilledData;

    CurrentFillingData[index].topicChapter[topicChapterKey].chapterContent[
      key
    ].NewChapterContent = false;

    setCourseTopicFilledData([...CurrentFillingData]);
  };

  const addNewTopicChapter = (index) => {
    let CurrentFillingData = courseTopicFilledData;

    let data = [];
    if (CurrentFillingData[index].topicChapter) {
      for (let j = 0; j < CurrentFillingData[index].topicChapter.length; j++) {
        CurrentFillingData[index].topicChapter[j].NewChapter = false;
      }
      CurrentFillingData[index].topicChapter.push({
        _id: Math.floor(Math.random() * 80000000000),
        chapterTitle: "Chapter Title",
        chapterShortDescription: "",
        NewChapter: true,
      });
      setCourseTopicFilledData([...CurrentFillingData]);
    } else {
      CurrentFillingData[index].topicChapter = [
        {
          _id: Math.floor(Math.random() * 80000000000),
          chapterTitle: "Chapter Title",
          chapterShortDescription: "",
          NewChapter: true,
        },
      ];
      setCourseTopicFilledData([...CurrentFillingData]);
    }
  };
  const patchEditChapterDetails = (i, key) => {
    let CurrentFillingData = courseTopicFilledData;
    if (tempChapterTitleDetailsEdit === "") {
      CurrentFillingData[i].topicChapter[key].chapterTitle = "Chapter Title";
      CurrentFillingData[i].topicChapter[key].chapterShortDescription =
        tempChapterDescriptionDetailsEdit;
      CurrentFillingData[i].topicChapter[key].NewChapter = false;

      setCourseTopicFilledData([...CurrentFillingData]);
      setTempChapterTitleDetailsEdit("");
      setTempChapterDescriptionDetailsEdit("");
    } else {
      CurrentFillingData[i].topicChapter[key].chapterTitle =
        tempChapterTitleDetailsEdit;
      CurrentFillingData[i].topicChapter[key].chapterShortDescription =
        tempChapterDescriptionDetailsEdit;
      CurrentFillingData[i].topicChapter[key].NewChapter = false;
      setCourseTopicFilledData([...CurrentFillingData]);
      setTempChapterTitleDetailsEdit("");
      setTempChapterDescriptionDetailsEdit("");
    }
  };

  const cancelEditChapterDetails = (i, key) => {
    let CurrentFillingData = courseTopicFilledData;
    CurrentFillingData[i].topicChapter[key].NewChapter = false;
    setCourseTopicFilledData([...CurrentFillingData]);
  };

  const setRemovePopTopic = () => {
    setRemovePop(!RemovePop);
    setDeleteTopicToggleID("")
  }
  const setRemovePopTopicChapter = () => {
    setRemovePopChapter(!RemovePopChapter);
    topicChapterDelete("")
  }

  return (
    <React.Fragment>
      <div className="addedTopicListWrap">
        {imagePopUpShowSuccess && <ContentUploadPopUp />}
        {courseTopicFilledData.length > 0
          ? courseTopicFilledData.map((contentData, index) => {
            return (
              <article
                key={index}
                id={index}
                // className={showTopicDetails === index ? "active" : ""}
                onClick={() => showHideTopicDetails(index)}
              >
                <div
                  className={`addedTopicListHeadWrap ${showTopicDetails === index && "active"
                    }`}
                >
                  <div className="addedTopicListheadContent">
                    {editTopicDetails !== index && (
                      <p
                        className="text-xs w-700 mt-3"
                      >
                        {contentData.topicTitle}
                      </p>
                    )}

                    {showTopicDetails === index &&
                      editTopicDetails !== index && (
                        <ul className="addedTopicListheadContentAction">
                          <li>
                            <i
                              className="ed-icon icon-edit i-xxs mgray"
                              onClick={() =>
                                editTopicDetailsMode(index, contentData)
                              }
                            ></i>
                          </li>
                          <li>
                            <i
                              className="ed-icon icon-delete i-xs mgray"
                              onClick={() =>
                                deleteTopicDetailsPopUp(contentData._id)
                              }
                            ></i>
                          </li>
                        </ul>
                      )}

                    {deleteTopicToggleID === contentData._id && RemovePop && (
                      <Popup
                        show={RemovePop}
                        RemovePopToggleRef={RemovePopToggleRef}
                        CancelProp={() => setRemovePopTopic()}
                        RemoveProp={() => DeleteTopicDetails(index)}
                      >
                        <p className="gray text-xxs w-300">
                          You are about to remove this {CoursesTaxanomyTopic()}
                        </p>
                        <p className="dgray text-xxs w-400">Are you sure?</p>
                      </Popup>
                    )}
                  </div>
                  {editTopicDetails === index && (
                    <div className="addedTopicListheadEditContent">
                      <>
                        <FormInput
                          placeholder="Topic Title"
                          value={tempTopicTitleDetailsEdit}
                          onChange={(e) => OnChangeTopic(e, "topicTitle")}
                          label={`${CoursesTaxanomyTopic()}Title*`}
                        />
                        <FormError
                          show={contentData.topicTitle === ""}
                          error={`${CoursesTaxanomyTopic()} Title is required.`}
                        ></FormError>
                      </>

                      <ul className="addedTopicListheadEditContentAction">
                        <li onClick={() => patchEditTopicDetails(index)}>
                          &#10004;
                        </li>
                        <li onClick={() => cancelEditTopicDetails()}>
                          &#10006;
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="headSubContent mb-20">
                    <p className="text-xxs w-500 mgray">{CoursesTaxanomyTopic()} {index + 1}</p>
                    {contentData.topicChapter ? (
                      <p className="text-xxs w-500 base">
                        {" "}
                        {contentData.topicChapter.length} {CoursesTaxanomyChapter()}
                      </p>
                    ) : (
                      <p className="text-xxs w-500 base"> 0 {CoursesTaxanomyChapter()}</p>
                    )}
                  </div>
                  <div className="headDes">
                    <p className="text-2xs mt-5 mb-5 base w-500">
                      {showTopicDetails === index &&
                        editTopicDetails !== index &&
                        contentData.topicShortDescription}
                    </p>
                    {editTopicDetails === index && (
                      <>
                        <div className="formFieldwrap">
                          <FormInput
                            placeholder="Topic Description"
                            value={tempTopicDescriptionDetailsEdit}
                            onChange={(e) =>
                              OnChangeTopic(e, "topicDescription")
                            }
                            label={`${CoursesTaxanomyTopic()} Description.`}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  {showTopicDetails === index && (
                    <Content
                      contentValue={contentData}
                      ContentHeader={"Topic"}
                      onChangeContent={(
                        value,
                        SwitchType,
                        data,
                        topicContentKey
                      ) =>
                        onChangeContentType(
                          value,
                          SwitchType,
                          data,
                          topicContentKey,
                          index
                        )
                      }
                      contentID={contentData._id}
                      onDeleteContent={(contentIDKey) =>
                        onDeleteContent(contentIDKey, "Topic", index)
                      }
                      addNewTopicContent={(
                        fileUploadType,
                        contentFileUploadValue,
                        fileType,
                        fileSize
                      ) =>
                        addNewTopicContent(
                          fileUploadType,
                          contentFileUploadValue,
                          fileType,
                          fileSize,
                          index
                        )
                      }
                      editfalseContent={(key) => editfalseContent(key, index)}
                    />
                  )}
                </div>

                {
                  showTopicDetails === index && contentData.topicChapter ? (
                    <div className="addedTopicListContentWrap">
                      {contentData.topicChapter.map(
                        (itemTopicChapterDetails, TopicChapterDetailsKey) => {
                          return (
                            <React.Fragment>
                              <div className="addedChapterListWrap">
                                <div
                                  className={`addedChapterListHeadWrap ${showTopicChapterDetails ===
                                    itemTopicChapterDetails._id && "active"
                                    }`}
                                >
                                  {itemTopicChapterDetails.NewChapter ===
                                    true &&
                                    showTopicChapterDetails ===
                                    itemTopicChapterDetails._id ? (
                                    <div className="addedTopicListheadEditContent">
                                      <FormInput
                                        placeholder="Chapter Title"
                                        value={tempChapterTitleDetailsEdit}
                                        onChange={(e) =>
                                          OnChangeChapter(e, "chapterTitle")
                                        }
                                        label={`${CoursesTaxanomyChapter()} Title.`}
                                      />
                                      <FormError
                                        show={
                                          itemTopicChapterDetails.chapterTitle ===
                                          ""
                                        }
                                        error={`Course ${CoursesTaxanomyChapter()}  Title is required.`}
                                      ></FormError>
                                      {showTopicChapterDetails ===
                                        itemTopicChapterDetails._id &&
                                        itemTopicChapterDetails.NewChapter ===
                                        true && (
                                          <ul className="addedTopicListheadEditContentAction">
                                            <li
                                              onClick={() =>
                                                patchEditChapterDetails(
                                                  index,
                                                  TopicChapterDetailsKey
                                                )
                                              }
                                            >
                                              &#10004;
                                            </li>
                                            <li
                                              onClick={() =>
                                                cancelEditChapterDetails(
                                                  index,
                                                  TopicChapterDetailsKey
                                                )
                                              }
                                            >
                                              &#10006;
                                            </li>
                                          </ul>
                                        )}
                                    </div>
                                  ) : (
                                    <React.Fragment>
                                      <div className="addedChapterListheadContent">
                                        <p
                                          className="text-xs w-700 mt-3 mb-5"
                                          onClick={() =>
                                            showHideChapterDetails(
                                              itemTopicChapterDetails._id
                                            )
                                          }
                                        >
                                          {itemTopicChapterDetails.chapterTitle}
                                        </p>
                                        {showTopicChapterDetails ===
                                          itemTopicChapterDetails._id &&
                                          itemTopicChapterDetails.NewChapter ===
                                          false && (
                                            <ul className="addedChapterListheadContentAction">
                                              <li>
                                                <i
                                                  className="ed-icon icon-edit i-xxs mgray"
                                                  onClick={() =>
                                                    EditTopicChapter(
                                                      index,
                                                      TopicChapterDetailsKey
                                                    )
                                                  }
                                                ></i>
                                              </li>
                                              <li>
                                                <i
                                                  className="ed-icon icon-delete i-xs mgray"
                                                  onClick={() =>
                                                    topicChapterDelete(
                                                      itemTopicChapterDetails._id
                                                    )
                                                  }
                                                ></i>
                                              </li>
                                            </ul>
                                          )}
                                        {deleteChapterToggleID ===
                                          itemTopicChapterDetails._id &&
                                          RemovePopChapter && (
                                            <Popup
                                              show={RemovePopChapter}
                                              RemovePopToggleRefChapter={
                                                RemovePopToggleRefChapter
                                              }
                                              CancelProp={() =>
                                                setRemovePopTopicChapter()
                                              }
                                              RemoveProp={() =>
                                                DeleteChapterContent(
                                                  itemTopicChapterDetails._id
                                                )
                                              }
                                            >
                                              <p className="gray text-xxs w-300">
                                                You are about to remove this {CoursesTaxanomyChapter()}.
                                              </p>
                                              <p className="dgray text-xxs w-400">
                                                Are you sure?
                                              </p>
                                            </Popup>
                                          )}
                                      </div>
                                    </React.Fragment>
                                  )}

                                  <div className="headSubContent">
                                    <p className="text-xxs w-500 base">
                                      {CoursesTaxanomyChapter()} {index + 1}.
                                      {TopicChapterDetailsKey + 1}
                                    </p>
                                  </div>
                                  {showTopicChapterDetails ===
                                    itemTopicChapterDetails._id &&
                                    itemTopicChapterDetails.NewChapter ===
                                    false && (
                                      <div className="headSubContent sun-editor-output">
                                        <div dangerouslySetInnerHTML={{ __html: itemTopicChapterDetails.chapterShortDescription }} />
                                      </div>
                                    )}
                                  {itemTopicChapterDetails.NewChapter ===
                                    true &&
                                    showTopicChapterDetails ===
                                    itemTopicChapterDetails._id && (
                                      <>
                                        <TextEditor
                                          preFilledData={
                                            tempChapterDescriptionDetailsEdit
                                          }
                                          currentResponse={(e, value) =>
                                            OnChangeChapter(
                                              e,
                                              "chapterDescription",
                                              value
                                            )
                                          }
                                        />
                                        {/* <FormInput placeholder="Chapter Description" value={tempChapterDescriptionDetailsEdit} onChange={(e) => OnChangeChapter(e, "chapterDescription")} label="Chapter Description" /> */}
                                      </>
                                    )}

                                  {showTopicChapterDetails ===
                                    itemTopicChapterDetails._id ? (
                                    <Content
                                      contentValue={itemTopicChapterDetails}
                                      ContentHeader={"Chapter"}
                                      onChangeContent={(
                                        value,
                                        SwitchType,
                                        data,
                                        topicContentKey
                                      ) =>
                                        onChangeContentType(
                                          value,
                                          SwitchType,
                                          data,
                                          topicContentKey,
                                          index,
                                          TopicChapterDetailsKey
                                        )
                                      }
                                      contentID={itemTopicChapterDetails._id}
                                      onDeleteContent={(contentIDKey) =>
                                        onDeleteContent(contentIDKey, "Chapter", index, TopicChapterDetailsKey)
                                      }
                                      // addNewTopicContent={(fileUploadType, contentFileUploadValue, fileType, fileSize) => addNewTopicContent(fileUploadType, contentFileUploadValue, fileType, fileSize)}
                                      editfalseChapterContent={(key) =>
                                        editfalseChapterContent(
                                          index,
                                          key,
                                          TopicChapterDetailsKey
                                        )
                                      }
                                      addNewChapterContent={(
                                        fileUploadType,
                                        contentFileUploadValue,
                                        fileType,
                                        fileSize
                                      ) =>
                                        addNewChapterContent(
                                          fileUploadType,
                                          contentFileUploadValue,
                                          fileType,
                                          fileSize,
                                          TopicChapterDetailsKey, index
                                        )
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    ""
                  )
                }
                {
                  showTopicDetails === index && (
                    <div className="addedTopicListContentWrap">
                      {courseTopicFilledData[index] && courseTopicFilledData[index].topicChapter && courseTopicFilledData[index].topicChapter.length > 9 ? (
                        <button
                          type="button"
                          className="button btn-sm button-base"
                          // onClick={() => addNewTopicChapter(index)}
                          disabled={true}
                        >
                          <i className="ed-icon icon-plus-add white i-xs"></i>
                          Add New {CoursesTaxanomyChapter()}
                        </button>
                      ) : (
                        <React.Fragment>
                          {
                            courseTopicFilledData[index] && courseTopicFilledData[index].topicChapter && courseTopicFilledData[index].topicChapter.length > 0 ? (
                              <button
                                type="button"
                                className="button btn-sm button-base"
                                onClick={() => addNewTopicChapter(index)}
                              >
                                <i className="ed-icon icon-plus-add white i-xs"></i>
                                Add New {CoursesTaxanomyChapter()}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="button btn-sm button-base"
                                onClick={() => addNewTopicChapter(index)}
                              >
                                <i className="ed-icon icon-plus-add white i-xs"></i>
                                Add {CoursesTaxanomyChapter()}
                              </button>
                            )}
                        </React.Fragment>

                      )

                      }

                    </div>
                  )
                }
              </article>
            );
          })
          : ""}
      </div>
    </React.Fragment >
  );
};
export default ContentSectionFilled;
