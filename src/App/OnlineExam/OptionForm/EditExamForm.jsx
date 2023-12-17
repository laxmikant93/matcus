import React, { useEffect, useState, useRef } from "react";
import FormInput from "../../../Common/Form/FormInput";
import FormError from "../../../Common/Form/FormError";
import { bool, func, string } from "prop-types";
import Validation from "../../../Classes/Validation";
import QuestionType from "../QuestionType";
import QuestionTypeOption from "../QuestionTypeOption";
import MultiQuestionForm from "./MultiQuestionForm";
import SingleQuestionForm from "./SingleQuestionForm";
import SubjectiveQuestionForm from "./SubjectiveQuestionForm";
import TruefalseQuestionForm from "./TruefalseQuestionForm";
import Upload from "../../../Common/Upload";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import FormTextArea from "../../../Common/Form/FormTextArea";
import MatchQuestion from "./MatchQuestion";
import FillUpQuestion from "./FillUpQuestion";
import UploadButton from "../../../Common/UploadButton";
import Uploader from "../../../Common/ImageUploader";

const validateForm = new Validation();
const questionOptionEvent = {
  multi: "multi",
  single: "single",
  subjective: "subjective",
  matchquestion: "matchquestion",
  fillUp: "fillUp",
  truefalse: "tf",
};

const OnlineExamEditForm = ({
  onFormUpdated,
  formkey,
  value,
  questionNo,
  removeForm,
  validate,
  questionLength,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [updatedOption, setupdatedOption] = useState({
    options: [],
    answer: [],
  });
  const [selectedQuestionType, setSelectedQuestionType] = useState(
    questionOptionEvent.single
  );
  const [questionAndAns, setquestionAndAns] = useState({
    question: {
      value: "",
      isValid: false,
    },
    mark: {
      value: "",
      isValid: false,
    },
    fileUpload: {
      value: "",
    },
  });

  useEffect(() => {
    if (value) {
      let prevStateQuestion = { ...questionAndAns };
      prevStateQuestion = {
        ...prevStateQuestion,
        question: {
          ...prevStateQuestion.question,
          value: value.questiontitle,
          isValid: questionAndAns.question.isValid ? true : validateForm.isNotEmpty(value.questiontitle),
        },
        mark: {
          ...prevStateQuestion.question,
          value: value.marks,
          isValid: questionAndAns.mark.isValid ? true : validateForm.isNotEmpty(value.marks),
        },
        fileUpload: {
          ...prevStateQuestion.fileUpload,
          value: value.fileUpload,
        },
      };
      setquestionAndAns(prevStateQuestion);
      value.questiontype
        ? setSelectedQuestionType(value.questiontype)
        : setSelectedQuestionType("single");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const assismentDataToFormat = () => {
    return {
      formkey,
      isValid: isFormValid(),
      question: {
        _id: formkey,
        questiontype: selectedQuestionType,
        questiontitle: questionAndAns.question.value,
        marks: questionAndAns.mark.value,
        fileUpload: questionAndAns.fileUpload.value,
        options: updatedOption.options,
        answer: updatedOption.answer,
      },
    };
  };

  const isFormValid = () => {
    return !questionAndAns.question.isValid ||
      !questionAndAns.mark.isValid ||
      !updatedOption.isValid
      ? false
      : true;
  };

  const handleQuestionInput = (e) => {
    const inputValue = e.target.value;
    let prevStateQuestion = { ...questionAndAns };
    prevStateQuestion = {
      ...prevStateQuestion,
      question: {
        ...prevStateQuestion.question,
        value: inputValue,
        isValid: validateForm.isNotEmpty(inputValue),
      },
    };
    setquestionAndAns(prevStateQuestion);
    onFormUpdated(assismentDataToFormat());
  };

  function updateFile(fileUrl) {
    let prevStateQuestion = { ...questionAndAns };
    prevStateQuestion = {
      ...prevStateQuestion,
      fileUpload: {
        ...prevStateQuestion.fileUpload,
        value: fileUrl,
      },
    };
    setquestionAndAns(prevStateQuestion);
    onFormUpdated(assismentDataToFormat());
  }

  const handleRemove = () => {
    removeForm(formkey, questionNo);
    onClickBtnRemove();
  };

  const handleMarksInput = (e) => {
    let inputValue = e.target.value;
    let prevStateMark = { ...questionAndAns };
    prevStateMark = {
      ...prevStateMark,
      mark: {
        ...prevStateMark.mark,
        value: inputValue,
        isValid: inputValue > 0 && inputValue <= 100 && !isNaN(inputValue),
      },
    };
    setquestionAndAns(prevStateMark);
    onFormUpdated(assismentDataToFormat());
  };

  const OptionByQuestionType = (questionType) => {
    switch (questionType) {
      case questionOptionEvent.single:
        return (
          <SingleQuestionForm
            options={value.options}
            answer={value.answer}
            questiontype={value.questiontype}
            onUpdated={(data) => {
              setupdatedOption(data);
            }}
            validate={validate}
          />
        );

      case questionOptionEvent.subjective:
        return (
          <SubjectiveQuestionForm
            options={value.options}
            answer={value.answer}
            questiontype={value.questiontype}
            onUpdated={(data) => {
              setupdatedOption(data);
            }}
            validate={validate}
          />
        );

      case questionOptionEvent.truefalse:
        return (
          <TruefalseQuestionForm
            options={value.options}
            answer={value.answer}
            questiontype={value.questiontype}
            onUpdated={(data) => {
              setupdatedOption(data);
            }}
            validate={validate}
          />
        );
      // case questionOptionEvent.matchquestion:
      //   return (
      //     <MatchQuestion
      //       options={value.options}
      //       answer={value.answer}
      //       questiontype={value.questiontype}
      //       onUpdated={(data) => {
      //         setupdatedOption(data);
      //       }}
      //       validate={validate}
      //     />
      //   );
      //   case questionOptionEvent.fillUp:
      //   return (
      //     <FillUpQuestion
      //       options={value.options}
      //       answer={value.answer}
      //       questiontype={value.questiontype}
      //       onUpdated={(data) => {
      //         setupdatedOption(data);
      //       }}
      //       validate={validate}
      //     />
      //   );

      default:
        return (
          <MultiQuestionForm
            options={value.options}
            answer={value.answer}
            questiontype={value.questiontype}
            onUpdated={(data) => {
              setupdatedOption(data);
            }}
            validate={validate}
          />
        );
    }
  };

  useEffect(() => {
    if (isValid !== validate) {
      setIsValid(validate);
    }
    isFormValid()
    onFormUpdated(assismentDataToFormat());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedOption, questionAndAns, validate]);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClickBtnRemove = () => setIsActive(!isActive);
  const uploadRef=useRef(null)
  return (
    <div className="question-card">
      <div className="create-question-section">
        <div className="create-question-head">
          <h5 className="text-xs base w-600">Question No. {questionNo + 1}</h5>
          <p className="text-xs dgray w-300">Choose Question Type</p>
          <p className="text-xs dgray w-300">
            Note: All your data will be lost if you switch to a different tab.
          </p>
        </div>
        {questionLength > 1 && (
          <div className="deleteQuestioBtn text-right">
            <button
              type="button"
              className="btnText text-xxs red w-500"
              onClick={onClickBtnRemove}
            >
              <u>Delete</u>
            </button>
            <div
              ref={dropdownRef}
              className={`popup removePopup ${isActive ? "active" : "inactive"
                }`}
            >
              <p className="heading gray text-xxs w-300">
                You are about to delete this question.
              </p>
              <p className="sub-heading dgray text-xxs w-400">Are you sure?</p>
              <div className="removePopBtn">
                <button
                  onClick={onClickBtnRemove}
                  className="button btn-o-silver dgray btn-sm"
                >
                  Cancel
                </button>
                <button
                  className="button button-red btn-sm"
                  onClick={handleRemove}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="choose-q-type scroll-nav-tab-wrapper">
          <QuestionType>
            <QuestionTypeOption
              icon="icon-radio"
              title="Single Select"
              active={selectedQuestionType === questionOptionEvent.single}
              eventId={questionOptionEvent.single}
              onSelect={(selectedOption) =>
                setSelectedQuestionType(selectedOption)
              }
            />
            <QuestionTypeOption
              icon="icon-checkbox"
              title="Multi Select"
              onSelect={(selectedOption) =>
                setSelectedQuestionType(selectedOption)
              }
              active={selectedQuestionType === questionOptionEvent.multi}
              eventId={questionOptionEvent.multi}
            />
            <QuestionTypeOption
              icon="icon-truefalse"
              title="True/False"
              active={selectedQuestionType === questionOptionEvent.truefalse}
              eventId={questionOptionEvent.truefalse}
              onSelect={(selectedOption) =>
                setSelectedQuestionType(selectedOption)
              }
            />

            <QuestionTypeOption
              icon="icon-subjective"
              title="Subjective"
              active={selectedQuestionType === questionOptionEvent.subjective}
              eventId={questionOptionEvent.subjective}
              onSelect={(selectedOption) =>
                setSelectedQuestionType(selectedOption)
              }
            />
            {/* <QuestionTypeOption
              icon="icon-subjective"
              title="Match the column"
              active={selectedQuestionType === questionOptionEvent.matchquestion}
              eventId={questionOptionEvent.matchquestion}
              onSelect={(selectedOption) =>
                setSelectedQuestionType(selectedOption)
              }
            />
            <QuestionTypeOption
              icon="icon-subjective"
              title="Fill in the blanks"
              active={selectedQuestionType === questionOptionEvent.fillUp}
              eventId={questionOptionEvent.fillUp}
              onSelect={(selectedOption) =>
                setSelectedQuestionType(selectedOption)
              }
            /> */}
          </QuestionType>
        </div>
        <div className="question-title">
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <div className="formFieldwrap">
                {selectedQuestionType === questionOptionEvent.subjective ? (
                  <React.Fragment>
                    <FormTextArea
                      className={
                        isValid && !questionAndAns.question.isValid
                          ? "errorInput"
                          : ""
                      }
                      name="question"
                      type="text"
                      rows="2"
                      defaultValue={questionAndAns.question.value}
                      onChange={handleQuestionInput}
                      onKeyUp={handleQuestionInput}
                      label="Question Title"
                      placeholder="Question Title"
                    />
                    <FormError
                      show={isValid && !questionAndAns.question.isValid}
                      error="Question is required."
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <FormInput
                      className={
                        isValid && !questionAndAns.question.isValid
                          ? "errorInput"
                          : ""
                      }
                      name="question"
                      type="text"
                      defaultValue={questionAndAns.question.value}
                      onChange={handleQuestionInput}
                      onKeyUp={handleQuestionInput}
                      label="Question Title"
                      placeholder="Question Title"
                    />
                    <FormError
                      show={isValid && !questionAndAns.question.isValid}
                      error="Question is required."
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="formFieldwrap optional-file-upload">
                <p className="text-xs dgray w-300 mb-5">
                  Upload question as file (optional).
                </p>
                <ul className="DashedInstructionList">
                  <li className="text-xxs">
                    Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4
                  </li>
                  <li className="text-xxs">Max File size allowed is 10MB.</li>
                </ul>
                {!questionAndAns.fileUpload.value ? (
                  <>
                     <UploadButton
                        BtnName="Upload File"
                        IconClassName="icon-file-upload base i-xs"
                        BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                        onClick={() => {
                          uploadRef.current.open();
                        }}
                      />
                      <Uploader
                        size={5}
                        onclose={() => uploadRef.current.close()}
                        multiSelect={false}
                        discartRef={uploadRef}
                        onUploaded={(fileUrlObject) => updateFile(fileUrlObject || "")}
                        validationProp={"examanswerfileupload"}
                        uploadLimit={1}
                      />
                  </>
                ) : (
                  <div className="AfterUploadDocActionBtn">
                    <a
                      className="button btn-xs button-secondary"
                      target="_blank"
                      rel="noreferrer"
                      href={questionAndAns.fileUpload.value}
                    >
                      <i className="ed-icon icon-attachment i-s white"></i>
                      View Attachment
                    </a>
                    <button
                      className="button btn-xs btn-o-red red"
                      onClick={() => updateFile(null)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ul className="input-output-section ">
          {OptionByQuestionType(selectedQuestionType)}
        </ul>
        <div className="marks-create-input">
          <div className="formFieldwrap">
            <label>Marks</label>
            <FormInput
              type="text"
              className={
                isValid && !questionAndAns.mark.isValid
                  ? "form-control errorInput"
                  : "form-control"
              }
              defaultValue={questionAndAns.mark.value}
              onChange={handleMarksInput}
              onKeyUp={handleMarksInput}
              maxLength={3}
              name="mark"
              placeholder="Marks"
            />
            <FormError
              show={
                isValid &&
                questionAndAns.mark.value &&
                (!validateForm.lessthanVal(100, questionAndAns.mark.value) ||
                  !questionAndAns.mark.isValid)
              }
              error="Please enter marks between 1 - 100."
            />
            <FormError
              show={isValid && !questionAndAns.mark.value}
              error="Marks are required."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

OnlineExamEditForm.defaultProps = {
  onFormUpdated: () => { },
  formkey: Math.round(Math.random().toFixed(6)),
  removeForm: () => { },
  validate: false,
};

OnlineExamEditForm.propTypes = {
  onFormUpdated: func.isRequired,
  formkey: string.isRequired,
  removeForm: func.isRequired,
  validate: bool,
};

export default OnlineExamEditForm;
