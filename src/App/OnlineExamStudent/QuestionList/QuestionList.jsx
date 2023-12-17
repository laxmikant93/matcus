import React, { useState, useEffect, useCallback } from "react";
import CardBody from "../../../Common/Card/CardBody";
import CardHeader from "../../../Common/Card/CardHeader";
import FormTextArea from "../../../Common/Form/FormTextArea";
import Upload from "../../../Common/Upload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import SuccessMessagePopup from "../../../Common/SuccessMessagePopup";
import CommonError from "../../../Common/CommonError";
import { checkStudentExam } from "../../../store/actions/onlineexam";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import ModalBody from "../../../Common/Modal/ModalBody";
import Modal from "../../../Common/Modal";
import Card from "../../../Common/Card";
import TypeHint from "../utility/TypeHint";
import BackgroundDefault from "../../../../src/assets/images/img/BackgroundDefault.png";
import {
  onlineExamFileRest,
  onlineExamFileSet,
  onlineExamStudentFileReset,
  onlineExamStudentFileSet,
  patchExamAnswer,
  patchSubmitExam,
  attemptedQuestion
} from "../../../store/actions/onlineexamstudent";
import Restriction from "../utility/Restrictions.js";
import ExamInstruction from "../utility/ExamInstruction"
import FormInput from "../../../Common/Form/FormInput";


const QuestionList = ({ props }) => {


  const dispatch = useDispatch();
  const history = useNavigate();
  const { _id } = useParams();
  const [fileUploadModal, setFileUploadModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [submitDataInfo, setSubmitDataInfo] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState();
  const [once, setOnce] = useState(false);
  const [hideWarning, setHideWarning] = useState(false)
  const [activeDrop, setActiveDrop] = useState(false);

  const manageActiveDrop = () => {
    setActiveDrop(!activeDrop);
  }

  const { detailSuccess, detail, submitId, submitExamSuccess, fileUploadData, studentFileUploadData } = useSelector((state) => {
    return {
      users: state.user,
      detailSuccess: state.onlineexamstudent.successExamLoaded,
      detail: state.onlineexamstudent.detail,
      submitId: state.onlineexamstudent.detail.submittedInfo._id,
      submitExamSuccess: state.onlineexamstudent.submit.success,
      ExamLoadedsuccess: state.onlineexamstudent.successExamLoaded,
      submitInfo: state.onlineexamstudent.create.data.submitInfo,
      fileUploadData: state.onlineexamstudent.fileData.data,
      studentFileUploadData: state.onlineexamstudent.studentFileData.data
    };
  });


  useEffect(() => {
    let tempObject = {};
    if (detail) {
      detail.questions.forEach((question) => {
        if (question.selectedOptions) {
          Object.assign(tempObject, {
            [question._id]: {
              fileUploads: question.fileUploads ? question.fileUploads : "",
              questionId: question._id,
              selectedOptions: question.selectedOptions,
            },
          });
        }
      });
      setQuestions(tempObject);
    }
  }, [detail]);

  if (!isFilled && detailSuccess) {
    setIsFilled(true);
    let tempo = [];
    detail.questions.forEach((item, index) => {
      Object.assign(item, { key: index });
      tempo.push(item);
    });
    setSubmitDataInfo([...tempo]);
    setAccessibilityMode(detail.accessibilityMode);
  }

  const patchData = useCallback(() => {
    return {
      questions: Object.values(questions),
    };
  }, [questions])

  const manageLocalState = (
    questionId,
    selectedOptions,
    fileUploads,
    remove
  ) => {
    let replacable = submitDataInfo.find((item) => item._id === questionId);
    fileUploads || remove
      ? (replacable = {
        ...replacable,
        selectedOptions,
        fileUploads,
      })
      : (replacable = {
        ...replacable,
        selectedOptions,
      });
    let newInfo = { ...submitDataInfo };
    newInfo = {
      ...newInfo,
      [replacable.key]: replacable,
    };
    let temp = [];
    Object.values(newInfo).forEach((e) => {
      temp.push(e);
    });
    setSubmitDataInfo(temp);
  };

  const handleSubjectiveAnswer = (inputAnswer, uploads, questionId, remove) => {
    const selectedOptions = [];
    let fileUploads = "";
    let dataStore = { ...questions };
    if (!inputAnswer && !uploads) {
      delete dataStore[questionId];
    } else {
      detail.questions.forEach((q) => {
        if (q._id === questionId) {
          if (uploads && uploads.includes("https")) {
            fileUploads = uploads;
          }
          selectedOptions.push(inputAnswer);
        }
      });
      let objectOfArray = { questionId, selectedOptions, fileUploads };
      dataStore = {
        ...dataStore,
        [objectOfArray.questionId]: objectOfArray,
      };
    }
    setQuestions(dataStore);
    // MANAGING LOCAL STATE
    manageLocalState(questionId, selectedOptions, fileUploads, remove);
  };

  const handleSingleChoiceAnswer = (value, questionId) => {
    let dataStore = { ...questions };
    const selectedOptions = [];
    detail.questions.forEach((q) => {
      if (q._id === questionId) {
        selectedOptions.push(value);
      }
    });
    let objectOfArray = { questionId, selectedOptions };
    dataStore = {
      ...dataStore,
      [objectOfArray.questionId]: objectOfArray,
    };
    setQuestions(dataStore);
    // MANAGING LOCAL STATE
    manageLocalState(questionId, selectedOptions);
  };

  const handleMultiChoiceAnswer = (data) => {
    let dataStore = { ...questions };
    if (!data().selectedOptions.length) {
      delete dataStore[data().questionId];
    } else {
      dataStore = {
        ...dataStore,
        [data().questionId]: data(),
      };
    }
    setQuestions(dataStore);
    const selectedOptions = data().selectedOptions;
    // MANAGING LOCAL STATE
    manageLocalState(data().questionId, selectedOptions);
  };

  const handleTrueFalseAnswer = (value, questionId) => {
    let dataStore = { ...questions };
    const selectedOptions = [];
    detail.questions.forEach((q) => {
      if (q._id === questionId) {
        selectedOptions.push(value);
      }
    });
    let objectOfArray = { questionId, selectedOptions };
    dataStore = {
      ...dataStore,
      [objectOfArray.questionId]: objectOfArray,
    };
    setQuestions(dataStore);
    // MANAGING LOCAL STATE
    manageLocalState(questionId, selectedOptions);
  };

  const viewStudentFile = (item) => {
    setFileUploadModal(!fileUploadModal);
    dispatch(onlineExamStudentFileSet(item));
  };

  const viewUploadedFile = (item) => {
    setFileUploadModal(!fileUploadModal);
    dispatch(onlineExamFileSet(item));
  };

  const closeModalFileUpload = () => {
    setFileUploadModal(!fileUploadModal);
    dispatch(onlineExamFileRest());
    dispatch(onlineExamStudentFileReset());
  };

  useEffect(() => {
    dispatch(attemptedQuestion(patchData()))
    dispatch(patchExamAnswer(submitId, patchData()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patchData]);

  const [resumed, setResumed] = useState(false)
  useEffect(() => {
    if (!resumed && props.location.state && props.location.state.isResumed) {
      setResumed(true)
      dispatch(patchExamAnswer(submitId, { resumeTime: new Date() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumed, patchData])


  const handleFinalSubmit = () => {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    }
    dispatch(patchSubmitExam(submitId, { ...patchData(), endExam: new Date() }));
    setHideWarning(true)
  };

  if (submitExamSuccess && !once) {
    setOnce(true);
    if (!detail.isQuestionSubjective) {
      dispatch(checkStudentExam(submitId, { optional: "" }));
    }
    history("/dashboard/student/online-test");
  }

  const [institute_about_upload, set_institute_about_upload] = useState("");
  const [institute_intro_video, set_institute_intro_video] = useState("");
  const removeIntroVideo = () => {
    set_institute_intro_video("")
  }
  // sha function




  return (
    <React.Fragment>
      <SuccessMessagePopup />
      <CommonError graceReject={true} />
      <ExamInstruction examid={_id} payload={patchData()} />
      {accessibilityMode &&
        accessibilityMode !== "No Restrictions" &&
        <Restriction hideWarning={hideWarning} examid={_id} payload={patchData()} />
      }
      {submitDataInfo.length ? (
        <React.Fragment>
          <div className="student-online-test">
            {submitDataInfo.map((questionItem, key) => {
              return (
                <Card className="cardPadding mb-20" key={key}>
                  <CardHeader>
                    <p className="Qhead base text-xs w-500 mb-5">
                      {questionItem.questiontitle}
                    </p>
                    <small className="dgray">
                      <TypeHint type={questionItem.questiontype} />
                    </small>
                  </CardHeader>
                  <CardBody>
                    <div className="q-option-area mb-5">
                      {questionItem.questiontype === "subjective" ? (
                        <React.Fragment>
                          <div className="formFieldwrap mt-8">
                            <FormTextArea
                              name="GraceRequest"
                              rows="4"
                              placeholder="Type here your answer."
                              defaultValue={
                                questionItem.selectedOptions &&
                                questionItem.selectedOptions[0]
                              }
                              onBlur={(e) =>
                                handleSubjectiveAnswer(
                                  e.target.value,
                                  questionItem.fileUploads &&
                                  questionItem.fileUploads,
                                  questionItem._id
                                )
                              }
                              onPaste={(e) => { e.preventDefault(); return false; }}
                            ></FormTextArea>
                          </div>
                          {accessibilityMode === "No Restrictions" &&
                            !questionItem.fileUploads && (
                              <React.Fragment>
                                <ul>
                                  <li className="text-xxs">
                                    Accept only .PNG, .JPG{" "}
                                  </li>
                                  <li className="text-xxs">
                                    Max. file size allowed is 5 MB.
                                  </li>
                                </ul>
                                <div className="formFieldwrap">
                                  <Upload
                                    label="Upload file"
                                    size={5}
                                    name="answerAttachment"
                                    onlyImagePdf={true}
                                    hidenFileName={true}
                                    placeholder="File Upload"
                                    onUploaded={(e) =>
                                      handleSubjectiveAnswer(
                                        questionItem.selectedOptions &&
                                        questionItem.selectedOptions[0],
                                        e.location,
                                        questionItem._id
                                      )
                                    }
                                    IconFileUploadClass="icon-file-upload base i-xs"
                                  />
                                </div>
                              </React.Fragment>
                            )}
                          {questionItem.fileUploads && (
                            <div className="AfterUploadDocActionBtn">
                              <button
                                className="button button-purple btn-xs"
                                onClick={() => viewStudentFile(questionItem)}
                              >
                                <i className="ed-icon icon-attachment i-s white"></i>
                                Answer Attachment
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleSubjectiveAnswer(
                                    questionItem.selectedOptions &&
                                    questionItem.selectedOptions[0],
                                    "",
                                    questionItem._id,
                                    "remove"
                                  )
                                }
                                className="button btn-xs btn-o-red red"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </React.Fragment>
                      ) : questionItem.questiontype === "multi" ? (
                        <MultipleChoice
                          option={questionItem.options}
                          questionId={questionItem._id}
                          selectedAnswers={questionItem.selectedOptions}
                          onUpdated={(data) => handleMultiChoiceAnswer(data)}
                        />
                      ) : (
                        questionItem.options.map((answerOption, optionkey) => {
                          return questionItem.questiontype === "single" ? (
                            <div
                              className="input-custom-type"
                              key={`single${optionkey}`}
                            >
                              <label
                                className={`small ${questionItem.selectedOptions &&
                                  questionItem.selectedOptions[0] ===
                                  answerOption &&
                                  "s-active"
                                  }`}
                              >
                                <input
                                  onChange={(e) =>
                                    handleSingleChoiceAnswer(
                                      e.target.value,
                                      questionItem._id
                                    )
                                  }
                                  type="radio"
                                  name={key}
                                  value={answerOption}
                                  checked={
                                    questionItem.selectedOptions &&
                                    questionItem.selectedOptions[0] ===
                                    answerOption
                                  }
                                  onPaste={(e) => { e.preventDefault(); return false; }}
                                />
                                {answerOption}
                              </label>
                            </div>
                          ) : (
                            <div
                              className="input-custom-type"
                              key={`tf${optionkey}`}
                            >
                              <label
                                className={`small ${questionItem.selectedOptions &&
                                  questionItem.selectedOptions[0] ===
                                  answerOption &&
                                  "s-active"
                                  }`}
                              >
                                <input
                                  onChange={(e) =>
                                    handleTrueFalseAnswer(
                                      e.target.value,
                                      questionItem._id
                                    )
                                  }
                                  type="radio"
                                  name={key}
                                  value={answerOption}
                                  checked={
                                    questionItem.selectedOptions &&
                                    questionItem.selectedOptions[0] ===
                                    answerOption
                                  }
                                />
                                {answerOption}
                              </label>
                            </div>
                          );
                        })
                      )}
                      {questionItem.fileUpload && (
                        <button
                          className="button button-secondary btn-xs mt-10"
                          onClick={() => viewUploadedFile(questionItem)}
                        >
                          <i className="ed-icon icon-attachment i-s white"></i>
                          Question Attachment
                        </button>
                      )}
                    </div>
                    <div className="total-ques-marks text-xxs w-400">
                      <span className="gray w-300">Marks</span>{" "}
                      {questionItem.marks}
                    </div>
                  </CardBody>
                </Card>
              );
            })}

            <Modal className="onlineTestAttachmentPopup" show={fileUploadModal}>
              <ModalHeader
                subtitle=""
                closeButton={true}
                onclose={closeModalFileUpload}
                className="onlineTest"
              />
              <ModalBody>
                {fileUploadData.fileUpload ? (
                  <React.Fragment>
                    {fileUploadData.fileUpload.includes(".mp4") ? (
                      <React.Fragment>
                        <video
                          height="500"
                          src={fileUploadData.fileUpload}
                          controls
                          controlsList="nodownload nofullscreen noremoteplayback"
                          alt="videofile"
                        ></video>
                      </React.Fragment>
                    ) : fileUploadData.fileUpload.includes(".mp3") ? (
                      <React.Fragment>
                        <audio controls>
                          <source
                            src={fileUploadData.fileUpload}
                            type="audio/mpeg"
                          />
                        </audio>
                      </React.Fragment>
                    ) : fileUploadData.fileUpload.includes(".pdf") ? (
                      <React.Fragment>
                        <object
                          data={fileUploadData.fileUpload}
                          type="application/pdf"
                          height="500px"
                          aria-labelledby="pdf"
                        ></object>
                        <label htmlFor="" id="pdf"></label>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <img src={fileUploadData.fileUpload} alt="imageFile" className="onlineexamstudenQuestionlistimg" />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : studentFileUploadData.fileUploads ? (
                  <React.Fragment>
                    {studentFileUploadData.fileUploads.includes(".pdf") ? (
                      <React.Fragment>
                        <object
                          data={studentFileUploadData.fileUploads}
                          type="application/pdf"
                          height="500px"
                          aria-labelledby="pdf"
                        ></object>
                        <label htmlFor="" id="pdf"></label>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <img
                          src={studentFileUploadData.fileUploads}
                          alt="imageFile"

                        />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <h1>Loading....</h1>
                )}
              </ModalBody>
            </Modal>
            <button
              onClick={handleFinalSubmit}
              className="button btn-md button-theme btn-sm mt-30"
            >
              Submit Your Test
            </button>
          </div>
        </React.Fragment>
      ) : null
      }
    </React.Fragment>
  );
};

export default QuestionList;
