/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "../../../../../Common/Card";
import CardBody from "../../../../../Common/Card/CardBody";
import CardAction from "../../../../../Common/Card/CardAction";
import Topic from "./Topic";
import Content from "./Content";
import Chapter from "./Chapter";
import ContentSectionFilled from "./ContentSectionFilled";
import Popup from "../../../../../Common/Popup";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminCourseContentData,
  postAdminCourseContentData,
  resetContentData,
} from "../../../../../store/actions/admincourse";
import ContentUploadPopUp from "./ContentUploadPopUp";
import IconDeleteWhite from "./icon-delete-white.svg";
import Storage from "../../../../../Classes/Storage";
import ValidationFile from "../../../../../Classes/ValidationFile";
// import { CoursesTaxanomyTopic, CoursesTaxanomyChapter } from "../../../../../Common/UserElement"

const ContentSection = () => {
  const { _id, _classroomId } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    users,
    imagePopUpShowSuccess,
    adminCourseContentDataSuccess,
    adminCourseContentDataLoading,
    getadminCourseContentDataSuccess,
    getadminCourseContentDataLoading,
    getadminCourseContentData,
  } = useSelector((state) => {
    return {
      users: state.user,
      imagePopUpShowSuccess: state.admincourse.imgaePopUp.success,
      adminCourseContentDataSuccess: state.admincourse.courseContent.success,
      adminCourseContentDataLoading: state.admincourse.courseContent.loading,
      adminCourseContentData: state.admincourse.courseContent.data,
      getadminCourseContentDataSuccess:
        state.admincourse.courseContentList.success,
      getadminCourseContentDataLoading:
        state.admincourse.courseContentList.loading,
      getadminCourseContentData: state.admincourse.courseContentList.data,
    };
  });

  const [saveLoading, setSaveLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const subjectId = Storage.alive("__wz_crse__")
    ? Storage.getJson("__wz_crse__")
    : "";
  const { taxanomyData, taxanomySuccess } = useSelector((state) => {
    return {
      taxanomyData: state.admincourse.getTaxanomy.data,
      taxanomySuccess: state.admincourse.getTaxanomy.success,
    };
  });
  const CoursesTaxanomyContent = () => {
    if (taxanomySuccess) {
      if (taxanomyData.taxanomyContent) {
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
  const [courseTopicData, setCourseTopicData] = useState([
    {
      _id: Math.floor(Math.random() * 80000000000),
      topicTitle: "",
      topicShortDescription: "",
      institute: users.user_institute,
      owner: users._id,
      courseInfoId: _id,
    },
  ]);

  const [addCurrentFilledData, setAddCurrentFilledData] = useState([]);
  const [showChapterDescription, setShowChapterDescription] = useState("");
  const [showCourseError, setShowCourseError] = useState(false);
  const [delteTopicChapterToggleID, setDelteTopicChapterToggleID] =
    useState("");
  const RemovePopToggleRef = useRef();
  const [RemovePop, setRemovePop] = useState(false);

  useEffect(() => {
    dispatch(getAdminCourseContentData(_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getadminCourseContentDataSuccess && getadminCourseContentData) {
      let preparingData = getadminCourseContentData;
      for (let i = 0; i < preparingData.length; i++) {
        if (preparingData[i].topicChapter) {
          for (let j = 0; j < preparingData[i].topicChapter.length; j++) {
            preparingData[i].topicChapter[j].NewChapter = false;
            if (preparingData[i].topicChapter[j].chapterContent) {
              for (
                let k = 0;
                k < preparingData[i].topicChapter[j].chapterContent.length;
                k++
              ) {
                preparingData[i].topicChapter[j].chapterContent[
                  k
                ].NewChapterContent = false;
              }
            }
          }
        }
        if (preparingData[i].topicContent) {
          for (let z = 0; z < preparingData[i].topicContent.length; z++) {
            preparingData[i].topicContent[z].NewTopicContent = false;
          }
        }
        let clearData = [];
        setCourseTopicData(clearData);
      }
      setAddCurrentFilledData(preparingData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getadminCourseContentDataSuccess && getadminCourseContentData]);

  // useEffect(() => {
  //   if (adminCourseContentDataSuccess) {
  //     if (window.location.pathname.includes("edit-courses")) {
  //       history("/course");
  //     } else if (window.location.pathname.includes("edit-admin-course")) {
  //       history(`/view-classroom/${_classroomId}`);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [adminCourseContentDataSuccess]);

  useEffect(() => {
    if (adminCourseContentDataSuccess && saveLoading) {
      if (window.location.pathname.includes("admin")) {
        history(`/view-classroom/${_classroomId}`, {
          adminCourseToggle: "adminCourseToggle",
        });
      } else if (window.location.pathname.includes("edit-courses")) {
        history(`/course`);
      } else if (window.location.pathname.includes("teacher-edit-course")) {
        history(`/dashboard/teacher/course-list`);
      } else if (
        window.location.pathname.includes("edit-teacherClassroom-course")
      ) {
        history(
          `/dashboard/teacher/${_classroomId}/view-classroom/${subjectId}`,
          {
            teacherCourseToggle: "teacherCourseToggle",
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminCourseContentDataSuccess]);

  useEffect(() => {
    return () => {
      dispatch(resetContentData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showHideChapter = (id) => {
    if (showChapterDescription === id) {
      setShowChapterDescription("");
    } else {
      setShowChapterDescription(id);
    }
  };

  const addNewTopic = () => {
    if (courseTopicData[0]) {
      if (courseTopicData[0].topicTitle === "") {
        setShowCourseError(true);
      } else {
        setShowCourseError(false);
        let CurrentFillingData = courseTopicData;
        for (let i = 0; i < courseTopicData.length; i++) {
          if (CurrentFillingData[i].topicChapter) {
            for (
              let j = 0;
              j < CurrentFillingData[i].topicChapter.length;
              j++
            ) {
              if (CurrentFillingData[i].topicChapter[j].chapterContent) {
                CurrentFillingData[i].topicChapter[j].NewChapter = false;
                for (
                  let k = 0;
                  k <
                  CurrentFillingData[i].topicChapter[j].chapterContent.length;
                  k++
                ) {
                  if (
                    CurrentFillingData[i].topicChapter[j].chapterContent[k]
                      .NewChapterContent
                  ) {
                    CurrentFillingData[i].topicChapter[j].chapterContent[
                      k
                    ].NewChapterContent = false;
                  }
                }
              }
            }
          }
        }
        addCurrentFilledData.push(CurrentFillingData[0]);
        setAddCurrentFilledData([...addCurrentFilledData]);

        let newData = {
          _id: Math.floor(Math.random() * 80000000000),
          topicTitle: "",
          topicShortDescription: "",
          institute: users.user_institute,
          owner: users._id,
          courseInfoId: _id,
        };
        setCourseTopicData([newData]);
      }
    } else {
      let newData = {
        _id: Math.floor(Math.random() * 80000000000),
        topicTitle: "",
        topicShortDescription: "",
        institute: users.user_institute,
        owner: users._id,
        courseInfoId: _id,
      };
      setCourseTopicData([newData]);
    }
  };

  const addNewTopicChapter = () => {
    let CurrentFillingData = courseTopicData;
    for (let i = 0; i < CurrentFillingData.length; i++) {
      let data = [];
      if (CurrentFillingData[i].topicChapter) {
        for (let j = 0; j < CurrentFillingData[i].topicChapter.length; j++) {
          if (CurrentFillingData[i].topicChapter[j].chapterTitle === "") {
            CurrentFillingData[i].topicChapter[j].NewChapter = false;
            CurrentFillingData[i].topicChapter[j].chapterTitle =
              "Chapter Title";
          } else {
            CurrentFillingData[i].topicChapter[j].NewChapter = false;
          }
        }
        CurrentFillingData[i].topicChapter.push({
          _id: Math.floor(Math.random() * 80000000000),
          chapterTitle: "Chapter Title",
          chapterShortDescription: "",
          NewChapter: true,
        });
        setCourseTopicData([...CurrentFillingData]);
      } else {
        data.push({
          ...CurrentFillingData[i],
          topicChapter: [
            {
              _id: Math.floor(Math.random() * 80000000000),
              chapterTitle: "Chapter Title",
              chapterShortDescription: "",
              NewChapter: true,
            },
          ],
        });
        setCourseTopicData(data);
      }
    }
  };

  const addNewTopicContent = (
    fileUploadType,
    contentFileUploadValue,
    fileType,
    fileSize
  ) => {
    console.log("line 308",   fileUploadType,
    contentFileUploadValue,
    fileType,
    fileSize)
    let CurrentFillingData = courseTopicData;
    for (let i = 0; i < CurrentFillingData.length; i++) {
      let data = [];
      if (CurrentFillingData[i].topicContent) {
        for (let j = 0; j < CurrentFillingData[i].topicContent.length; j++) {
          CurrentFillingData[i].topicContent[j].NewTopicContent = false;
        }
        CurrentFillingData[i].topicContent.push({
          _id: Math.floor(Math.random() * 80000000000),
          contentFileUploadType: fileUploadType,
          contentFileUpload: contentFileUploadValue
            ? contentFileUploadValue
            : "",
          contentFileUploadisValid: true,
          contentFileType: fileType ? fileType : "",
          contentDescription: "",
          isPublished: "Publish",
          isDownloadable: true,
          NewTopicContent: true,
          contentFileSize: fileSize ? fileSize : "",
        });

        setCourseTopicData([...CurrentFillingData]);
      } else if (!CurrentFillingData[i].topicContent) {
        data.push({
          ...CurrentFillingData[i],
          topicContent: [
            {
              _id: Math.floor(Math.random() * 80000000000),
              contentFileUploadType: fileUploadType,
              contentFileUpload: contentFileUploadValue
                ? contentFileUploadValue
                : "",
              contentFileUploadisValid: true,
              contentFileType: fileType ? fileType : "",
              contentDescription: "",
              isPublished: "Publish",
              isDownloadable: true,
              NewTopicContent: true,
              contentFileSize: fileSize ? fileSize : "",
            },
          ],
        });

        setCourseTopicData([...data]);
      }
    }
  };
  const addNewChapterContent = (
    fileUploadType,
    contentFileUploadValue,
    fileType,
    fileSize,
    key
  ) => {
    console.log("line 367",   fileUploadType,
    contentFileUploadValue,
    fileType,
    fileSize,
    key)
    let CurrentFillingData = courseTopicData;
    for (let i = 0; i < CurrentFillingData.length; i++) {
      if (CurrentFillingData[i].topicChapter) {
        if (CurrentFillingData[i].topicChapter[key].chapterContent) {
          for (let j = 0; j < CurrentFillingData[i].topicChapter.length; j++) {
            if (CurrentFillingData[i].topicChapter[j].chapterContent) {
              for (
                let k = 0;
                k < CurrentFillingData[i].topicChapter[j].chapterContent.length;
                k++
              ) {
                if (
                  CurrentFillingData[i].topicChapter[j].chapterContent[k]
                    .NewChapterContent
                ) {
                  CurrentFillingData[i].topicChapter[j].chapterContent[
                    k
                  ].NewChapterContent = false;
                }
              }
            }
          }
          CurrentFillingData[i].topicChapter[key].chapterContent.push({
            _id: Math.floor(Math.random() * 80000000000),
            contentFileUploadType: fileUploadType,
            contentFileUpload: contentFileUploadValue
              ? contentFileUploadValue
              : "",
            contentFileUploadisValid: true,
            contentFileType: fileType ? fileType : "",
            contentDescription: "",
            isPublished: "Publish",
            isDownloadable: true,
            NewChapterContent: true,
            contentFileSize: fileSize ? fileSize : "",
          });
          setCourseTopicData([...CurrentFillingData]);
        } else {
          CurrentFillingData[i].topicChapter[key].chapterContent = [
            {
              _id: Math.floor(Math.random() * 80000000000),
              contentFileUploadType: fileUploadType,
              contentFileUpload: contentFileUploadValue
                ? contentFileUploadValue
                : "",
              contentFileUploadisValid: true,
              contentFileType: fileType ? fileType : "",
              contentDescription: "",
              isPublished: "Publish",
              isDownloadable: true,
              NewChapterContent: true,
              contentFileSize: fileSize ? fileSize : "",
            },
          ];
          setCourseTopicData([...CurrentFillingData]);
        }
      }
    }
  };

  const onChangeContentType = (
    value,
    SwitchType,
    dataName,
    Key,
    ChapterKey
  ) => {
    // let value = e.target.value;
    let CurrentFillingData = courseTopicData;
    if (SwitchType === "topicContent") {
      for (let i = 0; i < CurrentFillingData.length; i++) {
        if (ValidationFile.validWebsiteLink(value)) {
          CurrentFillingData[i].topicContent[Key][dataName] = value;
          CurrentFillingData[i].topicContent[Key]["contentFileUploadisValid"] = true;
        } else {
          CurrentFillingData[i].topicContent[Key]["contentFileUploadisValid"] = false;
          CurrentFillingData[i].topicContent[Key][dataName] = value;
        }
      }
    } else {
      for (let i = 0; i < CurrentFillingData.length; i++) {
        if (ValidationFile.validWebsiteLink(value)) {
          CurrentFillingData[i].topicChapter[Key].chapterContent[ChapterKey][
            dataName
          ] = value;
          CurrentFillingData[i].topicChapter[Key].chapterContent[ChapterKey][
            "contentFileUploadisValid"
          ] = true;
        } else {
          CurrentFillingData[i].topicChapter[Key].chapterContent[ChapterKey][
            dataName
          ] = value;
          CurrentFillingData[i].topicChapter[Key].chapterContent[ChapterKey][
            "contentFileUploadisValid"
          ] = false;
        }

      }
    }
    setCourseTopicData([...CurrentFillingData]);
  };

  const onDeleteContent = (_id, switchValue, index, chapterKey) => {
    if (switchValue === "Topic") {
      let newinputs = courseTopicData;
      newinputs[index].topicContent.splice(_id, 1);
      setCourseTopicData([...newinputs]);
      // for (let i = 0; i < newinputs.length; i++) {
      //   let Index = "";
      //   for (let j = 0; j < newinputs[i].topicContent.length; j++) {
      //     if (newinputs[i].topicContent[j]._id === _id) {
      //       Index = j;
      //     }
      //   }

      //   newinputs[i].topicContent.splice(Index, 1);
      //   setCourseTopicData([...newinputs]);
      //   break;
      // }
    } else {
      let newinputs = courseTopicData;
      newinputs[index].topicChapter[chapterKey].chapterContent.splice(_id, 1);
      setCourseTopicData([...newinputs]);
      // let IndexK = "";
      // let IndexJ = "";
      // for (let i = 0; i < newinputs.length; i++) {
      //   for (let j = 0; j < newinputs[i].topicChapter.length; j++) {
      //     if (newinputs[i].topicChapter[j].chapterContent) {
      //       for (
      //         let k = 0;
      //         k < newinputs[i].topicChapter[j].chapterContent.length;
      //         k++
      //       ) {
      //         if (newinputs[i].topicChapter[j].chapterContent[k]._id === _id) {
      //           IndexK = k;
      //           IndexJ = j;
      //         }
      //       }
      //     }
      //   }
      //   newinputs[i].topicChapter[IndexJ].chapterContent.splice(IndexK, 1);
      //   setCourseTopicData([...newinputs]);
      // }
    }
  };

  const editfalseContent = (key, index) => {
    let CurrentFillingData = courseTopicData;
    if (CurrentFillingData[index].topicContent[key].contentFileUpload === "") {
    } else {
      CurrentFillingData[index].topicContent[key].NewTopicContent = false;
      setCourseTopicData([...CurrentFillingData]);
    }
  };
  const editfalseChapterContent = (key, topicChapterKey) => {
    let CurrentFillingData = courseTopicData;
    for (let i = 0; i < CurrentFillingData.length; i++) {
      if (
        CurrentFillingData[i].topicChapter[topicChapterKey].chapterContent[key]
          .contentFileUpload === ""
      ) {
      } else {
        CurrentFillingData[i].topicChapter[topicChapterKey].chapterContent[
          key
        ].NewChapterContent = false;
      }
    }
    setCourseTopicData([...CurrentFillingData]);
  };

  const chapterOnChange = (value, switchValue, key) => {
    let CurrentFillingData = courseTopicData;
    for (let i = 0; i < CurrentFillingData.length; i++) {
      CurrentFillingData[i].topicChapter[key][switchValue] = value;
    }
    setCourseTopicData([...CurrentFillingData]);
  };

  const EditTopicChapter = (key) => {
    let CurrentFillingData = courseTopicData;
    for (let i = 0; i < CurrentFillingData.length; i++) {
      CurrentFillingData[i].topicChapter[key].NewChapter = true;
    }
    setCourseTopicData([...CurrentFillingData]);
  };

  const DeleteTopicChapterOpenPopUp = (_id) => {
    setDelteTopicChapterToggleID(_id);
    setRemovePop(!RemovePop);
  };

  const DeleteTopicChapter = (_id) => {
    let newinputs = courseTopicData;
    for (let i = 0; i < newinputs.length; i++) {
      let Index = "";
      for (let j = 0; j < newinputs[i].topicChapter.length; j++) {
        if (newinputs[i].topicChapter[j]._id === _id) {
          Index = j;
        }
      }
      newinputs[i].topicChapter.splice(Index, 1);
      setCourseTopicData([...newinputs]);
      break;
    }
  };
  const OnChangeTopicDetails = (Value, switchValue) => {
    setShowCourseError(false);
    let CurrentFillingData = courseTopicData;
    for (let i = 0; i < CurrentFillingData.length; i++) {
      CurrentFillingData[i][switchValue] = Value;
    }
    setCourseTopicData([...CurrentFillingData]);
  };
  const createContentExecution = (finalDataGather) => {
    finalDataGather.push(...courseTopicData);
    for (let i = 0; i < finalDataGather.length; i++) {
      if (finalDataGather[i]._id) {
        delete finalDataGather[i]._id;
      }
      if (finalDataGather[i].topicChapter) {
        for (let j = 0; j < finalDataGather[i].topicChapter.length; j++) {
          delete finalDataGather[i].topicChapter[j]._id;
          if (finalDataGather[i].topicChapter[j].chapterContent) {
            for (
              let k = 0;
              k < finalDataGather[i].topicChapter[j].chapterContent.length;
              k++
            ) {
              delete finalDataGather[i].topicChapter[j].chapterContent[k]._id;
            }
          }
        }
      }
      if (finalDataGather[i].topicContent) {
        for (let z = 0; z < finalDataGather[i].topicContent.length; z++) {
          delete finalDataGather[i].topicContent[z]._id;
        }
      }
    }
    dispatch(postAdminCourseContentData(_id, finalDataGather));
  };

  const finalSubmit = () => {
    setSaveLoading(true);
    let finalDataGather = [];
    finalDataGather = addCurrentFilledData;
    if (courseTopicData.length > 0) {
      if (courseTopicData[0].topicTitle === "") {
        addNewTopic();
      } else {
        createContentExecution(finalDataGather);
      }
    } else {
      createContentExecution(finalDataGather);
    }
  };

  const DeleteTopic = (index) => {
    let AlreadyFillingData = courseTopicData;
    AlreadyFillingData.splice(index, 1);
    setCourseTopicData([...AlreadyFillingData]);
  };
  const cancelCourse = () => {
    if (window.location.pathname.includes("admin")) {
      history(`/view-classroom/${_classroomId}`);
    } else if (window.location.pathname.includes("edit-courses")) {
      history(`/course`);
    } else if (window.location.pathname.includes("teacher-edit-course")) {
      history(`/dashboard/teacher/course-list`);
    } else if (
      window.location.pathname.includes("edit-teacherClassroom-course")
    ) {
      history(
        `/dashboard/teacher/${_classroomId}/view-classroom/${subjectId}`
      );
    }
  };
  useEffect(() => {
    const previewCourseInfoData = {
      classroomId: _classroomId && _classroomId,
      subjectId: subjectId && subjectId,
    };
    Storage.setJson("__previewCourseInfo__", previewCourseInfoData);
  }, [_classroomId, subjectId]);

  const saveAndPreviewCourse = () => {
    setPreviewLoading(true);
    let finalDataGather = [];
    finalDataGather = addCurrentFilledData;
    if (courseTopicData.length > 0) {
      if (courseTopicData[0].topicTitle === "") {
        addNewTopic();
      } else {
        createContentExecution(finalDataGather);
      }
    } else {
      createContentExecution(finalDataGather);
    }
  };
  // preview Course
  useEffect(() => {
    if (adminCourseContentDataSuccess && previewLoading) {
      if (window.location.pathname.includes("admin")) {
        history(`/dashboard/preview-course/${_id}/state/adminClassroom`);
      } else if (window.location.pathname.includes("edit-courses")) {
        history(`/dashboard/preview-course/${_id}/state/adminCourse`);
      } else if (window.location.pathname.includes("teacher-edit-course")) {
        history(`/dashboard/preview-course/${_id}/state/teacherCourse`);
      } else if (
        window.location.pathname.includes("edit-teacherClassroom-course")
      ) {
        history(`/dashboard/preview-course/${_id}/state/teacherClassroom`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminCourseContentDataSuccess]);

  return (
    <React.Fragment>
      <div className="ContentSection">
        {getadminCourseContentDataSuccess &&
          !getadminCourseContentDataLoading &&
          taxanomySuccess ? (
          <React.Fragment>
            <ContentSectionFilled AddNewTopic={addCurrentFilledData} />
            {courseTopicData.length > 0 && (
              <Card>
                <CardBody>
                  {courseTopicData.length > 0
                    ? courseTopicData.map((itemTopic, topicKey) => {
                      return (
                        <React.Fragment>
                          {addCurrentFilledData.length > 0 && (
                            <div className="DelTopicBtn">
                              <span
                                type="button"
                                onClick={() => DeleteTopic(topicKey)}
                              >
                                <img
                                  src={IconDeleteWhite}
                                  alt="Audio"
                                  title="Audio"
                                />
                              </span>
                            </div>
                          )}

                          <Topic
                            OnChangeTopicDetails={(Value, switchValue) =>
                              OnChangeTopicDetails(Value, switchValue)
                            }
                            TopicData={itemTopic}
                            showCourseError={showCourseError}
                          />

                          <Content
                            contentValue={itemTopic}
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
                                topicContentKey
                              )
                            }
                            contentID={itemTopic._id}
                            onDeleteContent={(contentIDKey) =>
                              onDeleteContent(contentIDKey, "Topic", topicKey)
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
                                fileSize
                              )
                            }
                            editfalseContent={(key) =>
                              editfalseContent(key, topicKey)
                            }
                          />
                          {imagePopUpShowSuccess && <ContentUploadPopUp />}

                          {itemTopic.topicChapter
                            ? itemTopic.topicChapter.map(
                              (itemTopicChapter, topicChapterKey) => {
                                return (
                                  <React.Fragment>
                                    {itemTopicChapter.NewChapter ===
                                      false ? (
                                      <div className="addedChapterListWrap">
                                        <div
                                          className={`addedChapterListHeadWrap ${showChapterDescription ===
                                            itemTopicChapter._id
                                            ? "active"
                                            : ""
                                            }`}
                                        >
                                          <div className="addedChapterListheadContent">
                                            <p
                                              className="text-xs w-700 mt-3 mb-5"
                                              onClick={() =>
                                                showHideChapter(
                                                  itemTopicChapter._id
                                                )
                                              }
                                            >
                                              {
                                                itemTopicChapter.chapterTitle
                                              }
                                            </p>
                                            {showChapterDescription ===
                                              itemTopicChapter._id && (
                                                <ul className="addedChapterListheadContentAction">
                                                  <li>
                                                    <i
                                                      className="ed-icon icon-edit i-xxs mgray"
                                                      onClick={() =>
                                                        EditTopicChapter(
                                                          topicChapterKey
                                                        )
                                                      }
                                                    ></i>
                                                  </li>
                                                  <li>
                                                    <i
                                                      className="ed-icon icon-delete i-xs mgray"
                                                      onClick={() =>
                                                        DeleteTopicChapterOpenPopUp(
                                                          itemTopicChapter._id
                                                        )
                                                      }
                                                    ></i>
                                                  </li>
                                                </ul>
                                              )}
                                            {delteTopicChapterToggleID ===
                                              itemTopicChapter._id &&
                                              RemovePop && (
                                                <Popup
                                                  show={RemovePop}
                                                  RemovePopToggleRef={
                                                    RemovePopToggleRef
                                                  }
                                                  CancelProp={() =>
                                                    setRemovePop(!RemovePop)
                                                  }
                                                  RemoveProp={() =>
                                                    DeleteTopicChapter(
                                                      itemTopicChapter._id
                                                    )
                                                  }
                                                >
                                                  <p className="gray text-xxs w-300">
                                                    You are about to remove
                                                    this
                                                    {CoursesTaxanomyTopic()}{" "}
                                                    {CoursesTaxanomyChapter()}
                                                    .
                                                  </p>
                                                  <p className="dgray text-xxs w-400">
                                                    Are you sure?
                                                  </p>
                                                </Popup>
                                              )}
                                          </div>
                                          <div className="headSubContent">
                                            <p className="text-xxs w-500 base">
                                              {CoursesTaxanomyChapter()}{" "}
                                              {topicKey + 1}.
                                              {topicChapterKey + 1}
                                            </p>
                                          </div>
                                          {showChapterDescription ===
                                            itemTopicChapter._id && (
                                              <div className="headSubContent sun-editor-output">
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html:
                                                      itemTopicChapter.chapterShortDescription,
                                                  }}
                                                />
                                              </div>
                                            )}
                                          {showChapterDescription ===
                                            itemTopicChapter._id && (
                                              <Content
                                                contentValue={
                                                  itemTopicChapter
                                                }
                                                ContentHeader={"Chapter"}
                                                onChangeContent={(
                                                  value,
                                                  SwitchType,
                                                  data,
                                                  key
                                                ) =>
                                                  onChangeContentType(
                                                    value,
                                                    SwitchType,
                                                    data,
                                                    topicChapterKey,
                                                    key
                                                  )
                                                }
                                                contentID={
                                                  itemTopicChapter._id
                                                }
                                                onDeleteContent={(
                                                  contentIDKey
                                                ) =>
                                                  onDeleteContent(
                                                    contentIDKey,
                                                    "Chapter",
                                                    topicChapterKey
                                                  )
                                                }
                                                // addNewTopicContent={(fileUploadType, contentFileUploadValue, fileType, fileSize) => addNewTopicContent(fileUploadType, contentFileUploadValue, fileType, fileSize)}
                                                editfalseChapterContent={(
                                                  key
                                                ) =>
                                                  editfalseChapterContent(
                                                    key,
                                                    topicChapterKey
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
                                                    topicChapterKey
                                                  )
                                                }
                                              />
                                            )}
                                        </div>
                                      </div>
                                    ) : (
                                      <React.Fragment>
                                        <div className="addNewChapterWrap">
                                          <Chapter
                                            chapterOnChange={(
                                              value,
                                              switchValue,
                                              key
                                            ) =>
                                              chapterOnChange(
                                                value,
                                                switchValue,
                                                topicChapterKey,
                                                key
                                              )
                                            }
                                            ChapterData={itemTopicChapter}
                                            DeleteTopicChapter={(_id) =>
                                              DeleteTopicChapter(_id)
                                            }
                                          />

                                          <Content
                                            contentValue={itemTopicChapter}
                                            ContentHeader={"Chapter"}
                                            onChangeContent={(
                                              value,
                                              SwitchType,
                                              data,
                                              key
                                            ) =>
                                              onChangeContentType(
                                                value,
                                                SwitchType,
                                                data,
                                                topicChapterKey,
                                                key
                                              )
                                            }
                                            contentID={itemTopicChapter._id}
                                            onDeleteContent={(
                                              contentIDKey
                                            ) =>
                                              onDeleteContent(
                                                contentIDKey,
                                                "Chapter",
                                                topicKey,
                                                topicChapterKey
                                              )
                                            }
                                            editfalseChapterContent={(
                                              key
                                            ) =>
                                              editfalseChapterContent(
                                                key,
                                                topicChapterKey
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
                                                topicChapterKey
                                              )
                                            }
                                          />
                                        </div>
                                      </React.Fragment>
                                    )}
                                  </React.Fragment>
                                );
                              }
                            )
                            : ""}
                        </React.Fragment>
                      );
                    })
                    : ""}

                  {courseTopicData.length > 0 && (
                    <>
                      <div className="addActionCustom">
                        {courseTopicData[0].topicChapter &&
                          courseTopicData[0].topicChapter.length > 9 ? (
                          <button
                            type="button"
                            className="button btn-sm button-base"
                            // onClick={() => addNewTopicChapter()}
                            disabled={true}
                          >
                            <i className="ed-icon icon-plus-add white i-xs"></i>
                            Add New {CoursesTaxanomyChapter()}.
                          </button>
                        ) : (
                          <React.Fragment>
                            {courseTopicData[0].topicChapter &&
                              courseTopicData[0].topicChapter.length > 0 ? (
                              <button
                                type="button"
                                className="button btn-sm button-base"
                                onClick={() => addNewTopicChapter()}
                              >
                                <i className="ed-icon icon-plus-add white i-xs"></i>
                                Add New {CoursesTaxanomyChapter()}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="button btn-sm button-base"
                                onClick={() => addNewTopicChapter()}
                              >
                                <i className="ed-icon icon-plus-add white i-xs"></i>
                                Add {CoursesTaxanomyChapter()}
                              </button>
                            )}
                          </React.Fragment>
                        )}
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
            )}
            {addCurrentFilledData.length + courseTopicData.length > 9 ? (
              <button
                type="button"
                className="button btn-sm button-base mt-20"
                // onClick={() => addNewTopic()}
                disabled={true}
              >
                <i className="ed-icon icon-plus-add white i-xs"></i>
                Add New {CoursesTaxanomyTopic()}
              </button>
            ) : (
              <button
                type="button"
                className="button btn-sm button-base mt-20"
                onClick={() => addNewTopic()}
              >
                <i className="ed-icon icon-plus-add white i-xs"></i>
                Add New {CoursesTaxanomyTopic()}
              </button>
            )}

            <div className="contentSectionAction mt-50">
              {adminCourseContentDataLoading && saveLoading ? (
                <button type="button" className="button btn-md button-theme btn-md">
                  Saving...
                </button>
              ) : (
                <button
                  type="button"
                  className="button btn-md button-theme btn-md"
                  onClick={finalSubmit}
                >
                  Save
                </button>
              )}
              {adminCourseContentDataLoading && previewLoading ? (
                <button type="button" className="button btn-md button-theme btn-md">
                  Saving Preview...
                </button>
              ) : (
                <button
                  type="button"
                  className="button btn-md button-theme btn-md"
                  onClick={saveAndPreviewCourse}
                >
                  Save & Preview
                </button>
              )}
              <button
                type="button"
                onClick={cancelCourse}
                className="button btn-o-silver primary btn-md"
              >
                Cancel
              </button>
            </div>
          </React.Fragment>
        ) : (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ContentSection;
