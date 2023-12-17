import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../../Common/Card";
import CardBody from "../../../Common/Card/CardBody";
import CardHeader from "../../../Common/Card/CardHeader";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import FormTextArea from "../../../Common/Form/FormTextArea";
import { checkStudentExam } from "../../../store/actions/onlineexam";

const CheckQuestionList = ({ totalStudentMarks }) => {
  const {
    questions,
    checkExamStateDetails,
    submittedInfo,
    checkExamState,
    examInfoData,
  } = useSelector((state) => {
    return {
      questions: state.onlineexam.checkTest.data.questions,
      checkExamStateDetails: state.onlineexam.checkTest,
      submittedInfo: state.onlineexam.checkTest.data.submittedInfo,
      checkExamState: state.onlineexam.checkStudentExam,
      examInfoData: state.onlineexam.checkTest.data,
    };
  });
  const dispatch = useDispatch();
  const history = useNavigate();

  const [optionDesc, setOptionalDesc] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [questionListWithMarks, setQuestionListWithMarks] = useState([]);
  const [symbolsArr] = useState(["e", "E", "+", "-"]);
  const [payload, setPayload] = useState([]);
  const [marksError, setMarksError] = useState(false);

  useEffect(() => {
    if (checkExamStateDetails.success) {
      let arrIsValidFill = [];
      for (let i = 0; i < questions.length; i++) {
        const elementData = questions[i];
        const data =
          parseFloat(elementData.marks) >=
            parseFloat(elementData.recievedMarks) &&
            elementData.recievedMarks !== ""
            ? true
            : false;
        if (
          questions[i].questiontype === "subjective" &&
          questions[i].selectedOptions &&
          questions[i].selectedOptions.length > 0
        ) {
          if (elementData.recievedMarks === 9999) {
            arrIsValidFill.push({
              ...questions[i],
              isValid: data,
              recievedMarks: "",
            });
          } else {
            arrIsValidFill.push({ ...questions[i], isValid: data });
          }
        } else {
          arrIsValidFill.push({ ...questions[i] });
        }
      }

      setQuestionListWithMarks(arrIsValidFill);
      setOptionalDesc(examInfoData.submittedInfo.optional);
      let arr = [];
      for (let index = 0; index < questions.length; index++) {
        const element = questions[index];
        const newData = {
          questionId: element._id,
          marks:
            element.recievedMarks === undefined ||
              element.recievedMarks === null
              ? 0
              : element.recievedMarks,
        };
        arr.push(newData);
      }
      setPayload([...arr]);
    }
    isFormMarksCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkExamStateDetails.success,
    examInfoData.submittedInfo.optional,
    questions,
  ]);

  const isMarksValid = (key, marksValue) => {
    const element = questionListWithMarks[key];
    if (
      parseFloat(element.marks) >= parseFloat(marksValue) &&
      marksValue !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const forMakePatchData = () => {
    let arr = [];
    for (let index = 0; index < questionListWithMarks.length; index++) {
      const element = questionListWithMarks[index];
      const newData = {
        questionId: element._id,
        marks:
          element.recievedMarks === undefined || element.recievedMarks === null
            ? 0
            : element.recievedMarks,
      };

      arr.push(newData);
    }
    setPayload([...arr]);
  };

  const handleInput = (e, key) => {
    const marksValue = e.target.value;
    let allinputs = questionListWithMarks;
    allinputs[key]["recievedMarks"] = marksValue;
    allinputs[key]["isValid"] = isMarksValid(key, marksValue);
    setQuestionListWithMarks([...allinputs]);
    totalMarks();
    forMakePatchData();
    setMarksError(false)

  };

  const totalMarks = () => {
    let stuMarks = questionListWithMarks.map((data) => {
      return parseFloat(data.recievedMarks ? data.recievedMarks : 0);
    });
    let totalAmount = stuMarks.reduce((a, b) => a + b, 0);
    const validTotalAmount = totalAmount ? totalAmount : 0;
    totalStudentMarks(validTotalAmount);
  };
  const handleComment = (e) => {
    setOptionalDesc(e.target.value);
  };

  const patchData = () => {
    return {
      recievedMarks: payload,
      optional: optionDesc,
    };
  };
  const notSubAnsData = () => {
    return {
      optional: optionDesc,
    };
  };
  const isFormMarksCheck = () => {
    let isCheckValid = true;
    for (let key = 0; key < questionListWithMarks.length; key++) {
      const element = questionListWithMarks[key];
      if (
        element.questiontype === "subjective" &&
        element.selectedOptions &&
        element.selectedOptions.length > 0
      ) {
        if (element.isValid) {
          //isCheckValid = false;
        } else {
          isCheckValid = true;
        }
      }
    }
    return isCheckValid;
  };



  const handleCheckTest = () => {
    forMakePatchData();
    setIsChecked(false);
    setMarksError(true);
    const areMarksValid = isFormMarksCheck();
    if (areMarksValid) {
      if (examInfoData.isQuestionSubjective) {
        dispatch(checkStudentExam(submittedInfo._id, patchData()));
      } else {
        dispatch(checkStudentExam(submittedInfo._id, notSubAnsData()));
      }
    }
  };
  if (checkExamState.success && !isChecked) {
    setIsChecked(true);
    history(
      `/dashboard/teacher/online-exam/submission/${checkExamStateDetails.data._id}`, { submission: 'submission' }
    );
  }
  return (
    <React.Fragment>
      <div className="review-question-section">
        {checkExamStateDetails.success
          ? questionListWithMarks.map((TeacherTest, key) => {
            return (
              <Card
                key={key}
                className={`borderCstm cardPadding mt-20 ${TeacherTest.selectedOptions &&
                  TeacherTest.selectedOptions.length > 0
                  ? "attempted"
                  : "not-attempted"
                  }`}
              >
                <CardHeader>
                  <p className="q-attempted-status">
                    {TeacherTest.selectedOptions &&
                      TeacherTest.selectedOptions.length > 0
                      ? "Attempted"
                      : "Not Attempted"}
                  </p>
                  <p className="Qhead base text-xs w-500 mb-5">
                    {TeacherTest.questiontitle}
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="q-option-area mb-5">
                    <div className="input-custom-type">
                      {TeacherTest.questiontype === "subjective" ? (
                        <p className="text-xs dgray mt-10">
                          {TeacherTest.selectedOptions &&
                            TeacherTest.selectedOptions[0]}
                        </p>
                      ) : (
                        TeacherTest.options.map(
                          (TestAnswerOpt, optionKey) => {
                            return (
                              <React.Fragment key={optionKey}>
                                <label
                                  className={
                                    TeacherTest.questiontype === "multi"
                                      ? `small  
                                      ${TeacherTest.selectedOptions &&
                                        TeacherTest.selectedOptions.includes(
                                          TestAnswerOpt
                                        )
                                        ? "t-active"
                                        : ""
                                      }`
                                      :
                                      `small 
                                      ${TeacherTest.selectedOptions &&
                                        TeacherTest.selectedOptions[0] ===
                                        TestAnswerOpt
                                        ? "t-active"
                                        : ""
                                      }`
                                  }
                                >
                                  {TeacherTest.questiontype === "multi" ? (
                                    <input
                                      type="checkbox"
                                      name={key}
                                      checked={
                                        TeacherTest.selectedOptions &&
                                          TeacherTest.selectedOptions.includes(
                                            TestAnswerOpt
                                          )
                                          ? true
                                          : false
                                      }
                                      readOnly
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {TeacherTest.questiontype === "single" ||
                                    TeacherTest.questiontype === "tf" ? (
                                    <input
                                      type="radio"
                                      name={key}
                                      checked={
                                        TeacherTest.selectedOptions &&
                                          TeacherTest.selectedOptions[0] ===
                                          TestAnswerOpt
                                          ? true
                                          : false
                                      }
                                      readOnly
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {TestAnswerOpt}
                                  <span
                                    className={`${TeacherTest.questiontype === "multi"
                                      ? "CheckboxCheckmark"
                                      : "RadioCheckmark"
                                      }`}
                                  ></span>
                                  <span
                                    className={`text-xxs ${TeacherTest.answer.includes(
                                      TestAnswerOpt
                                    )
                                      ? "answer-t-status"
                                      : "answer-f-status"
                                      }`}
                                  >
                                    {`${TeacherTest.answer.includes(
                                      TestAnswerOpt
                                    )
                                      ? "True"
                                      : "False"
                                      }`}
                                  </span>
                                </label>
                              </React.Fragment>
                            );
                          }
                        )
                      )}
                    </div>
                    {TeacherTest.fileUpload ? (
                      <a
                        href={TeacherTest.fileUpload}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button btn-xs button-secondary secondary mt-10"
                      >
                        <i className="ed-icon icon-attachment i-s white"></i>
                        Question Attachment
                      </a>
                    ) : (
                      ""
                    )}
                    {TeacherTest.fileUploads ? (
                      <a
                        href={TeacherTest.fileUploads}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button btn-xs button-purple secondary mt-10"
                      >
                        <i className="ed-icon icon-attachment i-s white"></i>
                        Answer Attachment
                      </a>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="total-ques-marks text-xxs w-400">
                    <span className="gray w-300">Marks</span>&nbsp;&nbsp;
                    {TeacherTest.marks}
                    <div className="obtained-marks-input mt-10">
                      <label className="text-xxs gray w-300">
                        Marks Obtained
                      </label>
                      <div className="formFieldwrap">
                        {TeacherTest.questiontype === "multi" ||
                          TeacherTest.questiontype === "single" ||
                          TeacherTest.questiontype === "tf" ? (
                          <FormInput
                            className=""
                            name={key}
                            type="number"
                            maxLength="2"
                            placeholder="Marks"
                            onChange={(e) =>
                              handleInput(e, key, TeacherTest._id)
                            }
                            onKeyUp={(e) => handleInput(e, key)}
                            onKeyDown={(e) =>
                              symbolsArr.includes(e.key) && e.preventDefault()
                            }
                            value={
                              questionListWithMarks[key]["recievedMarks"] &&
                                questionListWithMarks[key]["recievedMarks"] !==
                                9999 &&
                                questionListWithMarks[key]["recievedMarks"] > 0
                                ? questionListWithMarks[key]["recievedMarks"]
                                : 0
                            }
                            disabled
                          />
                        ) : (
                          ""
                        )}
                        {TeacherTest.questiontype === "subjective" ? (
                          <FormInput
                            className=""
                            name={key}
                            type="number"
                            maxLength="2"
                            placeholder="Marks"
                            onChange={(e) =>
                              handleInput(e, key, TeacherTest._id)
                            }
                            onKeyUp={(e) => handleInput(e, key)}
                            onKeyDown={(e) =>
                              symbolsArr.includes(e.key) && e.preventDefault()
                            }
                            value={
                              questionListWithMarks[key]["recievedMarks"] ===
                                9999
                                ? ""
                                : questionListWithMarks[key]["recievedMarks"]
                            }
                            onWheel={(e) => e.target.blur()}
                          />
                        ) : (
                          ""
                        )}
                        {TeacherTest.questiontype === "subjective" ? (
                          <React.Fragment>
                            <FormError
                              show={
                                !questionListWithMarks[key]["isValid"] && marksError &&
                                questionListWithMarks[key]["recievedMarks"] >
                                questionListWithMarks[key]["marks"]
                              }
                              error="Obtained marks must be less than Total Marks."
                            ></FormError>
                            <FormError
                              show={
                                !questionListWithMarks[key]["isValid"] &&
                                marksError &&
                                !questionListWithMarks[key]["recievedMarks"]
                              }
                              error="Obtained marks can't be empty."
                            ></FormError>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })
          : "Loading..."}
      </div>
      <div className="TeacherOptionalComment">
        <div className="formFieldwrap">
          <FormTextArea
            rows="4"
            className="mt-10"
            placeholder="Optional: You can write your feedback. "
            onChange={handleComment}
            value={optionDesc}
          />
        </div>
        {checkExamState.loading && !checkExamState.success ? (
          <button className="button btn-md button-theme">Loading..</button>
        ) : (
          <button className="button btn-md button-theme" onClick={handleCheckTest}>
            Done
          </button>
        )}
      </div>
    </React.Fragment>
  );
};
export default CheckQuestionList;
