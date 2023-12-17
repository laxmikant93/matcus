import React, { useEffect, useState, useRef } from "react";
import FormInput from "../../../Common/Form/FormInput";
import FormError from "../../../Common/Form/FormError";
import { bool, func, string } from "prop-types";
import Validation from "../../../Classes/Validation";
import QuestionType from "../QuestionType";
import QuestionTypeOption from "../QuestionTypeOption";
import SingleQuestionForm from "./SingleQuestionForm";
import MultiQuestionForm from "./MultiQuestionForm";
import TruefalseQuestionForm from "./TruefalseQuestionForm";
import SubjectiveQuestionForm from "./SubjectiveQuestionForm";
import Upload from "../../../Common/Upload";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";


const validateForm = new Validation();
const questionOptionEvent = {
  multi: "multi",
  single: "single",
  subjective: "subjective",
  truefalse: "tf",
};

const OnlineExamForm = ({
  onFormUpdated,
  formkey,
  questionNo,
  removeForm,
  validate,
  questionLength
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


  const assismentDataToFormat = () => {
    return {
      isValid: isFormValid(),
      formkey,
      question: {
        _id: formkey,
        questiontype: selectedQuestionType,
        questiontitle: questionAndAns.question.value,
        marks: questionAndAns.mark.value,
        fileUpload: questionAndAns.fileUpload.value,
        options: updatedOption.options || [],
        answer: updatedOption.answer || [],
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

  const handleQuestionInput = (inputValue) => {
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

  const handleMarksInput = (inputValue) => {
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
            onUpdated={(data) => {
              setupdatedOption(data);
            }}
            validate={validate}
          />
        );

      case questionOptionEvent.subjective:
        return (
          <SubjectiveQuestionForm
            onUpdated={(data) => {
              setupdatedOption(data);
            }}
            validate={validate}
          />
        );

      case questionOptionEvent.truefalse:
        return (
          <TruefalseQuestionForm
            onUpdated={(data) => {
              setupdatedOption(data);
            }}
            validate={validate}
          />
        );

      default:
        return (
          <MultiQuestionForm
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
    onFormUpdated(assismentDataToFormat());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionAndAns, updatedOption, validate]);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClickBtnRemove = () => setIsActive(!isActive);

  return (
    <div className="question-card">
      <div className="create-question-section">
        <div className="create-question-head">
          <h5 className="text-xs secondary w-500">
            Question No. {questionNo + 1}
          </h5>
          <p className="text-xs w-300">Choose Question Type</p>
          <p className="text-xxs gray w-300">
            Note: All your data will be lost if you switch to a different tab.
          </p>
        </div>
        {
          questionLength > 1 && (
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
                className={`popup removePopup ${isActive ? "active" : "inactive"}`}
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
          )
        }

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
              active={selectedQuestionType === questionOptionEvent.multi}
              eventId={questionOptionEvent.multi}
              onSelect={(selectedOption) =>
                setSelectedQuestionType(selectedOption)
              }
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
          </QuestionType>
        </div>
        <div className="question-title">
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <div className="formFieldwrap">
                <FormInput
                  className={
                    isValid && !questionAndAns.question.isValid
                      ? "errorInput"
                      : ""
                  }
                  name="question"
                  type="text"
                  onChange={(e) => handleQuestionInput(e.target.value)}
                  label="Question Title"
                  placeholder="Question Title"
                />
                <FormError
                  show={isValid && !questionAndAns.question.isValid}
                  error="Question is required."
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-10 optional-file-upload">
                <p className="text-xxs base w-500 mb-5">
                  Upload question as file (optional)
                </p>
                <ul className="DashedInstructionList">
                  <li className="text-xxs">
                    Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4
                  </li>
                  <li className="text-xxs">Max File size allowed is 10MB.</li>
                </ul>
                {!questionAndAns.fileUpload.value ? (
                  <Upload
                    size={10}
                    examanswerfileupload={true}
                    label="Upload file"
                    onUploaded={(fileUrlObject) => {
                      updateFile(fileUrlObject.location || "");
                    }}
                    placeholder="File Upload"
                    onError={() => {
                      updateFile("");
                    }}
                    hidenFileName={false}
                    IconFileUploadClass="icon-file-upload base i-xs"
                  />
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
                      onClick={() => updateFile("")}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="input-output-section ">
          {OptionByQuestionType(selectedQuestionType)}
        </div>
        <div className="marks-create-input mt-20">
          <div className="formFieldwrap">
            <label>Marks</label>
            <FormInput
              type="text"
              className={
                isValid && !questionAndAns.mark.isValid
                  ? "form-control errorInput"
                  : "form-control"
              }
              onChange={(e) => handleMarksInput(e.target.value)}
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
              show={isValid && !questionAndAns.mark.isValid}
              error="Marks are required."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

OnlineExamForm.defaultProps = {
  onFormUpdated: () => { },
  formkey: Math.round(Math.random().toFixed(6)),
  removeForm: () => { },
  validate: false,
};

OnlineExamForm.propTypes = {
  onFormUpdated: func.isRequired,
  formkey: string.isRequired,
  removeForm: func.isRequired,
  validate: bool,
};

export default OnlineExamForm;
