import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import FormInput from "../../Common/Form/FormInput";
import SelectTeacherCourse from "../../Common/Form/SelectTeacherCourse";
import SelectTeacherClassRoom from "../../Common/Form/SelectTeacherClassRoom";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import InputDateTimePicker from "../../Common/Form/InputDateTimePicker";
import { useSelector, useDispatch } from "react-redux";
import FormError from "../../Common/Form/FormError";
import Validation from "../../Classes/Validation";
import OnlineExamEditForm from "./OptionForm/EditExamForm";
import {
  getSingleExamDetails,
  updateOnlineExam,
  resetUpdateExam,
  createOnlineExam,
  createOnlineExamReset,
  // resetOnlineExam,
} from "../../store/actions/onlineexam";
import { showSuccessPopup } from "../../store/actions/successmessagepopup";
import MinutesSelect from "../../Common/Form/MinutesSelect";
const validateLib = new Validation();

const OnlineExam = (props) => {
  const history = useNavigate();
  const user = useSelector((state) => state.user);
  const { update } = useSelector((state) => state.onlineexam);
  const { create } = useSelector((state) => state.onlineexam);
  const minDate = new Date();
  const maxDuration = 480;
  const dispatch = useDispatch();
  // const history = useNavigate();
  const examId = useParams();
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [classroom, setClassroom] = useState("");
  const [examon, setExamon] = useState(new Date());
  const [duration, setDuration] = useState();
  const [totalMarks, setTotalMarks] = useState();
  const [graceTime, setGraceTime] = useState();
  const [graceStartTime, setGraceStartTime] = useState(50)
  const [graceStopTime, setGraceStopTime] = useState()
  const [accessibilityMode, setAccessibilityMode] = useState();
  const [validateForms, setValidateForms] = useState(false);
  const [questionList, setQuestionList] = useState({});
  const [questionCount, setQuestionCount] = useState([]);
  const [symbolsArr] = useState(["e", "E", "+", "-"]);
  const onlineExamQuestion = useSelector(
    (state) => state.onlineexam.getSingleExam.data
  );
  // Add new create question form
  const handleCreateForm = () => {
    setQuestionCount([...questionCount, Math.random().toFixed(6)]);
  };

  // getting exam data
  useEffect(() => {
    dispatch(getSingleExamDetails(examId._id));
  }, [dispatch, examId]);

  useEffect(() => {
    let initals = {};
    if (
      Object.keys(onlineExamQuestion).length &&
      onlineExamQuestion.questions
    ) {
      const { title, courseInfo, classroomInfo, questions, quizon, estimatedtime, totalmarks,
        graceTime, accessibilityMode, graceStartTime, graceStopTime } = onlineExamQuestion
      setTitle(title);
      setCourse(courseInfo.coursename);
      setClassroom(classroomInfo.classroomname);
      setExamon(quizon);
      setDuration(estimatedtime);
      setTotalMarks(totalmarks);
      setGraceTime(graceTime);
      setAccessibilityMode(accessibilityMode);
      setGraceStartTime(graceStartTime)
      setGraceStopTime(graceStopTime)
      setQuestionCount(questions);
      questions.forEach((question) => {
        Object.assign(initals, {
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
      setQuestionList(initals);
    }
  }, [onlineExamQuestion]);


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

  // Save Online Test button action
  const handelAssismentFormSubmit = () => {
    setValidateForms(true);
    if (areFormValid()) {
      dispatch(updateOnlineExam(examId._id, requestData()));
    }
  };

  // Save Clone Online Test button action
  const handelCloneFormSubmit = () => {
    setValidateForms(true);
    if (areFormValid()) {
      dispatch(createOnlineExam(requestData()));
    }
  }



  const updateQuestionList = (questionData) => {
    let allQuestionList = { ...questionList };
    let questionObject = { ...questionData };
    // Assiging course, classroom and owner
    questionObject.course = course;
    questionObject.classroom = classroom;
    questionObject.owner = user._id;
    // Add new question
    allQuestionList = {
      ...allQuestionList,
      [questionData.formkey]: questionObject,
    };
    setQuestionList({ ...allQuestionList });
  };

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
    setTimeError(new Date(minDate.getTime() + 10 * 60 * 1000) > examon);
    return !valid && topQpartValidation();
  }

  function topQpartValidation() {
    let topQvalidation = false;
    topQvalidation =
      !validateLib.isNotEmpty(title ? title : onlineExamQuestion.title) ||
        !validateLib.isNotEmpty(
          course ? course : onlineExamQuestion.course._id
        ) ||
        !validateLib.isNotEmpty(
          classroom ? classroom : onlineExamQuestion.classroom._id
        ) ||
        validateLib.isEmpty(
          duration ? duration : onlineExamQuestion.estimatedtime
        ) ||
        !validateLib.lessthanVal(
          maxDuration,
          duration ? duration : onlineExamQuestion.estimatedtime
        ) ||
        !validateLib.isNotEmpty(examon ? examon : onlineExamQuestion.quizon) ||
        new Date(minDate.getTime() + 10 * 60 * 1000) > examon
        ? false
        : true;
    return topQvalidation;
  }

  useEffect(() => {
    let totalMarks = 0;
    if (Object.keys(questionList).length > 0) {
      Object.values(questionList).forEach((questionItemValue) => {
        if (questionItemValue.question.marks > 0) {
          totalMarks = totalMarks + parseInt(questionItemValue.question.marks);
        }
      });
    }
    setTotalMarks(totalMarks);
  }, [questionList]);

  function requestData() {
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
          course: onlineExamQuestion.course._id,
          classroom: onlineExamQuestion.classroom._id,
          owner: user._id,
        };
        questionItemList.push(addons);
      });
    }
    return {
      title: title ? title : onlineExamQuestion.title,
      course: onlineExamQuestion.course._id,
      classroom: onlineExamQuestion.classroom._id,
      quizon: examon ? examon.toString() : onlineExamQuestion.quizon.toString(),
      estimatedtime: duration ? duration : onlineExamQuestion.estimatedtime,
      totalmarks: totalMarks ? totalMarks : onlineExamQuestion.totalmarks,
      institute: user.user_institute,
      owner: user._id,
      questions: questionItemList,
      graceTime: graceTime,
      accessibilityMode: accessibilityMode,
    };
  }

  useEffect(() => {
    return () => {
      dispatch(resetUpdateExam());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(createOnlineExamReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (update.success) {
      history("/dashboard/teacher-online-test");
    }
  }, [update, history]);

  useEffect(() => {
    if (create.success) {
      history("/dashboard/teacher-online-test");
    }
  }, [create, history]);

  const [timeError, setTimeError] = useState(false);
  const handleDateTime = (value) => {
    setTimeError(false);
    const currentTime = new Date();
    const afterAdding10Min = new Date(currentTime.getTime() + 10 * 60 * 1000);
    const selectedTime = new Date(value);
    if (afterAdding10Min > selectedTime) {
      setTimeError(true);
    }
    setExamon(selectedTime);
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/teacher-online-test"
          title="Online Test"
        />
        {
          props.history.location.state.clone ?
            <BreadcrumbItem
              to="/dashboard/teacher-online-test"
              title="Clone & Edit Online Test"
            />
            :
            <BreadcrumbItem
              to="/dashboard/teacher-online-test"
              title="Edit Online Test"
            />
        }
      </Breadcrumb>
      {update.success ? (
        <div className="row mt-30">Wait...</div>
      ) : (
        <Fragment>
          {
            props.history.location.state.clone ?
              <p className="text-sm w-300 mt-20">Clone & Edit Online Test</p>

              :
              <p className="text-sm w-300 mt-20">Edit Online Test</p>
          }
          <div className="start-create-test mt-20">
            <div className="formFieldwrap">
              <FormInput
                className={validateForms && !title ? "errorInput" : ""}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                type="text"
                defaultValue={title}
                label="title"
                maxLength={250}
                placeholder="Title"
              />
              <FormError
                show={validateForms && !title}
                error="Title is required."
              />
            </div>

            <div className="formFieldwrap">
              <SelectTeacherCourse
                value={course}
                onSelect={(selectedCourse) => {
                  setCourse(selectedCourse);
                }}
                error={validateForms && !course}
              />
              <FormError
                show={validateForms && !course}
                error="Course required."
              />
            </div>

            <div className="formFieldwrap">
              <SelectTeacherClassRoom
                value={classroom}
                onSelect={(selectedclassroom) => {
                  setClassroom(selectedclassroom);
                }}
                error={validateForms && !classroom}
              />
              <FormError
                show={validateForms && !classroom}
                error="Classroom is required."
              />
            </div>

            <div
              className={`datePickerWrap ${validateForms && timeError ? "errorInputDateTimePicker" : ""
                }`}
            >
              <InputDateTimePicker
                value={examon}
                onChange={handleDateTime}
                minDate={minDate}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                label="Date & Time"
                placeholder="Date & Time"
              />
              <FormError
                show={validateForms && timeError}
                error="Date and Time should be atleast 10 mins in future."
              />
            </div>

            <div className="formFieldwrap">
              <FormInput
                className={
                  validateForms &&
                    (!validateLib.lessthanVal(
                      maxDuration,
                      onlineExamQuestion.estimatedtime
                    ) ||
                      onlineExamQuestion.estimatedtime <= 0)
                    ? "errorInput"
                    : ""
                }
                type="number"
                min={0}
                max={maxDuration}
                maxLength={3}
                onKeyUp={(e) => {
                  setDuration(e.target.value.trim());
                }}
                onKeyDown={(e) =>
                  symbolsArr.includes(e.key) && e.preventDefault()
                }
                onWheel={(e) => e.target.blur()}
                placeholder="Duration In Minutes"
                label="Duration In Minutes"
                defaultValue={duration}
              />
              <FormError
                show={
                  validateForms &&
                  !validateLib.lessthanVal(maxDuration, duration)
                }
                error={`Maximum duration allowed is ${maxDuration} minutes.`}
              />
              <FormError
                show={validateForms && duration <= 0 && !duration}
                error="Duration is required."
              />
            </div>

            <div className="formFieldwrap">
              <label className="text-xxs dgray w-400">
                Calculated Total Marks
              </label>
              <p className="w-600 text-xs mt-3">{totalMarks}</p>
            </div>
          </div>
          <div className="createTestRestrictionMode mt-40">
            <p>Select Restriction Mode</p>
            <div
              className="input-custom-type inline mt-10"
              onClick={(e) => setAccessibilityMode(e.target.value)}
            >
              <label style={{ alignItems: "flex-start" }} className={`${accessibilityMode === "No Restrictions" && "t-active"}`}>
                <input
                  type="radio"
                  checked={accessibilityMode === "No Restrictions"}
                  value="No Restrictions"
                  name="accessibilityMode"
                />
                <div className="text-xs">
                  No Restrictions <br />
                  <span className="text-xxs gray">
                    Student can minimise window freely.
                  </span>
                </div>
              </label>
              <label style={{ alignItems: "flex-start" }} className={`${accessibilityMode === "Moderate" && "t-active"}`}>
                <input
                  type="radio"
                  checked={accessibilityMode === "Moderate"}
                  value="Moderate"
                  name="accessibilityMode"
                />
                <div className="text-xs">
                  Moderate Restrictions <br />
                  <span className="text-xxs gray">
                    Teacher will be notified when student minimises the
                    screen.
                  </span>
                </div>
              </label>
              <label style={{ alignItems: "flex-start" }} className={`${accessibilityMode === "Strict" && "t-active"}`}>
                <input
                  type="radio"
                  checked={accessibilityMode === "Strict"}
                  value="Strict"
                  name="accessibilityMode"
                />
                <div className="text-xs">
                  Strict Restrictions <br />
                  <span className="text-xxs gray">
                    Test will be auto terminated if the students minimize the
                    window. Also, they will not have the option of uploading
                    attachments in this mode.
                  </span>
                </div>
              </label>
            </div>
          </div>
          <div className="createTestAllowAction mt-20">
            <div className="createTestAllowActionItem">
              <p>Allow Grace Time</p>
              <div
                className="input-custom-type inline mt-10"
                onClick={(e) => setGraceTime(e.target.value)}
              >
                <label
                  className={`small ${(graceTime === "true" || graceTime === true) && "t-active"
                    }`}
                >
                  <input
                    type="radio"
                    checked={graceTime === "true" || graceTime === true}
                    value="true"
                    name="graceTime"
                  />
                  Yes
                </label>
                <label
                  className={`small ${(graceTime === "false" || graceTime === false) &&
                    "t-active"
                    }`}
                >
                  <input
                    type="radio"
                    checked={graceTime === "false" || graceTime === false}
                    value="false"
                    name="graceTime"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          {(graceTime === "true" || graceTime === true) && <div className="createTestRestrictionMode mt-40">
            <p>Grace Time Settings</p>
            <div className="input-custom-type inline mt-10">
              <div className="formFieldwrap">
                <MinutesSelect
                  start={5}
                  end={60}
                  step={4}
                  defaultSelect="Select Start Time"
                  selected={graceStartTime && graceStartTime}
                  onSelected={(value) => setGraceStartTime(value)}
                  label="Select Minutes"
                />
                <FormError
                  show={validateForms && !graceStartTime}
                  error="Please provide grace start duration."
                />
              </div>
              <div className="formFieldwrap">
                <MinutesSelect
                  start={5}
                  end={60}
                  step={4}
                  defaultSelect="Select End Time"
                  selected={graceStopTime && graceStopTime}
                  onSelected={(value) => setGraceStopTime(value)}
                  label="Select Minutes"
                />
                <FormError
                  show={validateForms && !graceStopTime}
                  error="Please provide grace end duration."
                />
              </div>
            </div>
          </div>}
          {questionCount.length ? (
            <React.Fragment>
              <p className="text-sm base w-300 mt-60">
                {questionCount.length}{" "}
                {questionCount.length === 1 ? "Question" : "Questions"}
              </p>
              {questionCount.map((formkey, index) => (
                <OnlineExamEditForm
                  key={`questionForm${formkey._id ? formkey._id : formkey}`}
                  validate={validateForms}
                  removeForm={removeForm}
                  onFormUpdated={(formData) => {
                    updateQuestionList(formData);
                  }}
                  formkey={formkey._id ? formkey._id : formkey}
                  value={formkey}
                  questionNo={index}
                  questionLength={questionCount.length}
                />
              ))}
            </React.Fragment>
          ) : (
            <p className="text-sm mt-60">No Questions Added</p>
          )}

          <button
            className="button btn-sm secondary btn-o-secondary mt-10"
            onClick={handleCreateForm}
          >
            Add Question
          </button>

          <div className="onlineTestAction">
            {update.loading ? (
              <button type="button" className="button btn-md button-theme mt-30">
                Loading...
              </button>
            ) : props.history.location.state.edit ? (
              <button
                type="button"
                onClick={handelAssismentFormSubmit}
                className="button btn-md button-theme mt-30"
              >
                Update Online Test
              </button>
            ) : ""}
            {create.loading ? (
              <button type="button" className="button btn-md button-theme mt-30">
                Loading...
              </button>
            ) : props.history.location.state.clone ? (
              < button
                type="button"
                onClick={handelCloneFormSubmit}
                className="button btn-md button-theme mt-30"
              >
                Clone Online Test
              </button>
            ) : ""}
          </div>
        </Fragment>
      )}
    </React.Fragment>
  );
};

export default OnlineExam;
