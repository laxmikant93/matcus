import { func } from "prop-types";
import React, { useState, useEffect, Fragment, forwardRef, useImperativeHandle } from "react";
import OnlineExamEditForm from "../OptionForm/EditExamForm";
import { showSuccessPopup } from "../../../store/actions/successmessagepopup";
import { useDispatch } from "react-redux";
import Card from "../../../Common/Card";
import CardBody from "../../../Common/Card/CardBody";
import Storage from "../../../Classes/SessionStorage";

const EditQuestions = forwardRef(({ owner, course, classroom, questionData, onSave }, ref) => {

  const dispatch = useDispatch();
  const [totalmarks, setTotalMarks] = useState(0);
  const [questionCount, setQuestionCount] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    let initials = {}
    if (Storage.alive("Questions")) {
      const questionData = Storage.getJson("Questions").questions
      questionData.forEach((question) => {
        Object.assign(initials, {
          [question._id]: {
            question: {
              _id: question._id,
              questiontitle: question.questiontitle,
              fileUpload: question.fileUpload,
              marks: question.marks,
              questiontype: question.questiontype,
              options: question.options,
              answer: question.answer,
            },
          },
        });
      });
      setQuestionList(initials);
      setQuestionCount(questionData)
    }
  }, [questionData])

  // Add new create question form
  const handleCreateForm = () => {
    setQuestionCount([...questionCount, Math.random().toFixed(6)]);
  };

  // Remove the question from question list
  const removeForm = (formkey, index) => {
    if (questionCount.length > 0) {
      const unremovedQuestions = Object.keys(questionList).reduce(
        (object, key) => {
          if (key !== formkey) {
            object[key] = questionList[key];
          }
          return object;
        },
        {}
      );
      setQuestionList(unremovedQuestions);
      setQuestionCount(questionCount.filter((item, i) => i !== index));
      dispatch(showSuccessPopup("Question deleted successfully"));
    }
  };

  // Add and update the question
  const updateQuestionList = (questionData) => {
    let allQuestionList = { ...questionList };
    let questionObject = { ...questionData };
    // Assiging course, classroom and owner
    questionObject.owner = owner;
    questionObject.course = course;
    questionObject.classroom = classroom;
    // Add new question
    allQuestionList = {
      ...allQuestionList,
      [questionData.formkey]: questionObject,
    };
    setQuestionList(allQuestionList);
  };


  useEffect(() => {
    let totalmarks = 0;
    if (Object.keys(questionList).length > 0) {
      Object.keys(questionList).forEach((questionItemKey) => {
        let questionItem = questionList[questionItemKey];
        if (questionItem.question.marks > 0) {
          totalmarks = totalmarks + parseInt(questionItem.question.marks);
        }
      });
    }
    setTotalMarks(totalmarks);
  }, [questionList]);

  // All question forms validation
  function areFormValid() {
    let validCheck = [];
    if (Object.keys(questionList).length > 0) {
      Object.keys(questionList).forEach((questionItemKey) => {
        let questionItem = questionList[questionItemKey];
        validCheck.push(questionItem.isValid);
      });
    }
    let valid = validCheck.includes(false);
    return !valid
  }


  const QuestionList = () => {
    let questionItemList = [];
    let questionItems = {};
    if (Object.keys(questionList).length > 0) {
      Object.keys(questionList).forEach((questionItemKey) => {
        let questionItemObject = questionList[questionItemKey];
        if (questionItemObject.question) {
          questionItems = { ...questionItemObject.question };
        } else {
          questionItems = { ...questionItemObject };
        }
        const addons = {
          ...questionItems,
          course,
          classroom,
          owner
        };
        questionItemList.push(addons);
      });
    }
    return questionItemList;
  };


  useImperativeHandle(ref, () => ({
    handleSecondTabData(tab) {
      saveAndContinue("onSwitch", tab)
    }
  }));


  const saveAndContinue = (onSwitch, tab) => {
    scrollToTop()
    setValidate(true);
    if (areFormValid()) {
      Storage.setJson("Questions", { questions: QuestionList(), totalmarks })
      onSwitch ? onSave(tab) : onSave()
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <Fragment>
      <div className="CreateQuestionPaperTop mb-20">
        <p className="text-sm base w-300">
          {questionCount.length}&nbsp;
          {questionCount.length === 1 ? "Question" : "Questions"}
        </p>
        <div className="CreateTestCalculatedMarks">
          <p className="text-xxs">Calculated Total Marks</p>
          <p className="w-600 text-xs mt-3">{totalmarks}</p>
        </div>
      </div>
      {questionCount.length ? (
        <Fragment>
          {questionCount.map((formkey, index) => (
            <Card key={`questionForm${formkey._id ? formkey._id : formkey}`} className="cardPadding bg-silver mb-20">
              <CardBody>
                <OnlineExamEditForm
                  key={`questionForm${formkey._id ? formkey._id : formkey}`}
                  validate={validate}
                  removeForm={removeForm}
                  onFormUpdated={(formData) => {
                    updateQuestionList(formData);
                  }}
                  formkey={formkey._id ? formkey._id : formkey}
                  value={formkey}
                  questionNo={index}
                  questionLength={questionCount.length}
                />
              </CardBody>
            </Card>
          ))}
        </Fragment>
      ) : (
        <p className="text-sm mt-60">No Questions Added</p>
      )}
      {questionCount.length < 200 && (
        <button
          className="button btn-sm secondary btn-o-secondary mt-10"
          onClick={handleCreateForm}
        >
          Add More
        </button>
      )}
      <div className="onlineTestAction mt-50">
        <button
          type="button"
          onClick={saveAndContinue}
          className="button btn-md button-theme btn-sm"
        >
          Save and Continue
        </button>
      </div>
    </Fragment>
  );
})

EditQuestions.defaultProps = {
  onSave: () => { },
};

EditQuestions.proptoType = {
  onSave: func.isRequired,
};

export default EditQuestions;
