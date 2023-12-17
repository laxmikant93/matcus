import React, {
  useState,
  Fragment,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { func } from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import MinutesSelect from "../../../Common/Form/MinutesSelect";
import Validation from "../../../Classes/Validation";
import ValidationDateTime from "../../../Classes/Validation";
import InputDatePicker from "../../../Common/Form/InputDatePicker";
import moment from "moment";
import Storage from "../../../Classes/SessionStorage";
import LocalStorage from '../../../Classes/Storage'
import { useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
const ExamSettings = forwardRef(({ onSave, onSubmit, props }, ref) => {
  const history = useNavigate();
  const { _id } = useParams()
  const validation = new Validation();
  const minDate = new Date();
  const [validate, setValidate] = useState(false);
  const [subjectId, setSubjectId] = useState("")
  const [timeError, setTimeError] = useState(false);
  const [examOnlineDate, setExamOnlineDate] = useState(new Date());
  const [examTime, setExamTime] = useState(moment(new Date()).add(10, "m"));
  const [estimatedHrs, setEstimatedHrs] = useState(0);
  const [estimatedMins, setEstimatedMins] = useState(30)
  const [showResult, setShowResult] = useState(false);
  const [graceTime, setGraceTime] = useState(false);
  const [graceStartTime, setGraceStartTime] = useState("");
  const [graceStopTime, setGraceStopTime] = useState("");
  const [reminderTest, setReminderTest] = useState();
  const [loading, setLoading] = useState(false)
  const [instructionTime, setInstructionTime] = useState()
  const [accessibilityMode, setAccessibilityMode] = useState("No Restrictions");
  const examDate =
    moment(examOnlineDate).format("DD-MMM-YYYY") +
    " " +
    moment(examTime).format("h:mm a");

  const dateB = moment(minDate);

  const dateC = moment(examDate);

  const dateA = dateC.diff(dateB, "minutes");
  let diffTime = moment(examDate).diff(moment(new Date()))

  useEffect(() => {
    if (LocalStorage.alive("__wz_clsrom__")) {
      setSubjectId(LocalStorage.getJson("__wz_clsrom__"))
    }
  }, [])


  const [realValidationDate, setRealValidationDate] = useState([]);
  const [realValidationTime, setRealValidationTime] = useState([]);
  const [realDateTime, setRealDateTime] = useState("");
  const [dateTimeValidError, setDateTimeValidErrors] = useState(false);

  const value1 = 30;
  const value2 = 120;
  const value3 = 240;
  const value4 = 720;
  const value5 = 1440;
  const value6 = 2880;
  const value7 = 5760;
  const value8 = 10080;
  const { admin, adminClone, adminEdit, create, clone, edit } =
    props.history.location.state;



  const [instruction2, setInstruction2] = useState([]);

  useEffect(() => {
    if (Storage.alive("ExamSettings")) {
      const examSettingData = Storage.getJson("ExamSettings")
      setExamOnlineDate(examSettingData.examOnlineDate)
      let validDateDetails = new Date(examSettingData.examOnlineDate).toString().split(" ");
      setRealValidationDate(validDateDetails);
      setExamTime(examSettingData.examTime)
      let validTimeDetails = new Date(examSettingData.examTime).toString().split(" ");
      setRealValidationTime(validTimeDetails);
      setEstimatedHrs(examSettingData.estimatedHrs)
      setEstimatedMins(examSettingData.estimatedMins)
      setGraceTime(examSettingData.graceTime)
      setGraceStartTime(examSettingData.graceStartTime)
      setGraceStopTime(examSettingData.graceStopTime)
      setReminderTest(examSettingData.reminderTest)
      setInstructionTime(examSettingData.instructionTime)
      setAccessibilityMode(examSettingData.accessibilityMode)
      setInstruction(examSettingData.instructionData)
      setShowResult(examSettingData.showResult)
      setInstruction2(examSettingData.questionInstruction)
    }
  }, []);

  const validDateTime = () => {
    setTimeError(false);
    const currentTime = new Date();
    const afterAddingMin = new Date(currentTime.getTime() + 9 * 60 * 1000);

    const selectedDate = new Date(examOnlineDate)
    const selectedTime = new Date(examTime);
    selectedDate.getDate()
    selectedTime.getTime()
    const validationCheck = new Date(selectedDate.getDate() + selectedTime.getTime())
    if (afterAddingMin > validationCheck) {
      setTimeError(true);
      return false
    }
    else {
      return true;
    }

  };

  //To return the status of Date time and Grace time validation whether validated as true or false
  // const handleValidation = () => {
  //   let validated = false
  //   if (validDateTime()) {
  //     validated = true
  //   }
  //   if (graceValidation()) {
  //     validated = true
  //   }
  //   return validated
  // };
  function graceValidation() {
    let isValid = true;
    if (graceTime === true || graceTime === "true") {
      if (!graceStartTime) {
        isValid = false
      } else if (!graceStopTime) {
        isValid = false
      }
    } else {
      isValid = true
    }
    return isValid
  }


  const prepareExamTime = () => {
    return estimatedHrs && !estimatedMins
      ? estimatedHrs
      : estimatedHrs !== 480 && estimatedMins
        ? estimatedHrs + estimatedMins
        : !estimatedHrs && estimatedMins
          ? estimatedMins
          : estimatedHrs === 480 && estimatedHrs;
  };

  useImperativeHandle(ref, () => ({
    handleThirdTabData(tab) {
      saveAndContinue(tab);
    },
  }));

  const saveAndContinue = (tab, submit) => {
    setValidate(true);
    const graceTimeError = graceValidation()
    if (!dateTimeValidError && graceTimeError) {
      Storage.setJson("ExamSettings", {
        examDate:
          moment(examOnlineDate).format("DD-MMM-YYYY") +
          " " +
          moment(examTime).format("h:mm a"),
        graceTime,
        reminderTest,
        graceStopTime,
        graceStartTime,
        accessibilityMode,
        examTime,
        examOnlineDate,
        estimatedHrs,
        estimatedMins,
        estimatedtime: prepareExamTime(),
        instructionTime,
        showResult,
        instructionData: instruction,
        typeInstruction: instruction1,
        questionInstruction: instruction2,
      });
      submit ? onSubmit() : onSave(tab);
      setLoading(true);
    }
  };

  const [readInstruction, setreadInstruction] = useState();

  function manageReadInstruction(index) {
    setreadInstruction(readInstruction === index ? -1 : index);
  }

  const [addInstruction, setaddInstruction] = useState();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      setError(true);
      setaddInstruction(addInstruction);
    } else {
      addData(value);
      setaddInstruction(!addInstruction);
      setValue("");
    }
  };
  const handleClose = () => {
    setaddInstruction(!addInstruction);
    setValue("");
  };
  const [instruction, setInstruction] = useState([]);
  const [instruction1, setInstruction1] = useState([])

  const addData = (text) => {
    const newData = [...instruction, text];
    setInstruction(newData);
  };

  const addData1 = (text) => {
    const newData = [...instruction1, text];
    setInstruction1(newData);
  };

  const removeData = (index) => {
    const newData = [...instruction];
    newData.splice(index, 1);
    setInstruction(newData);
  };

  const removeData1 = (index) => {
    const newData = [...instruction1];
    newData.splice(index, 1);
    setInstruction1(newData);
  };

  const addMultipleData = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const reNotify = (e) => {
    let Input = e.target.value;
    setReminderTest(Input);
  };
  const { ClassroomDetail } = useSelector((state) => {
    return {
      ClassroomDetail: state.classroomDetail.classrooomData.data,
    };
  });

  // Question Part 2
  const [addQuestion, setaddQuestion] = useState();
  const [value0, setValue0] = useState("");
  const [newValue, setNewValue] = useState("");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);


  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (!newValue) {
      setError1(true);
      setaddQuestion(addQuestion);
    } else {
      addData1(newValue);
      setaddQuestion(!addQuestion);
      setNewValue("");
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (!value0) {
      setError2(true);
      setaddQuestion(addQuestion);
    } else {
      addData2(value0);
      setaddQuestion(!addQuestion);
      setValue0("");
    }
  };

  const handleClose1 = () => {
    setaddQuestion(!addQuestion);
    setNewValue("");
  };

  const handleClose2 = () => {
    setaddQuestion(!addQuestion);
    setValue0("");
  };

  const addData2 = (text2) => {
    if (accessibilityMode === "No Restrictions") {
      const newData = [...instruction2, text2];
      setInstruction2(newData);
    } else if (accessibilityMode === "Moderate") {
      const newData = [...instruction2, text2];
      setInstruction2(newData);
    } else if (accessibilityMode === "Strict") {
      const newData = [...instruction2, text2];
      setInstruction2(newData);
    }
  };

  const removeData2 = (index) => {
    if (accessibilityMode === "No Restrictions") {
      const newData = [...instruction2];
      newData.splice(index, 1);
      setInstruction2(newData);
    } else if (accessibilityMode === "Moderate") {
      const newData = [...instruction2];
      newData.splice(index, 1);
      setInstruction2(newData);
    } else if (accessibilityMode === "Strict") {
      const newData = [...instruction2];
      newData.splice(index, 1);
      setInstruction2(newData);
    }
  };


  const addMultipleData1 = (e) => {
    let inputValue = e.target.value;
    setNewValue(inputValue);
  };

  const addMultipleData2 = (e) => {
    let inputValue = e.target.value;
    setValue0(inputValue);
  };



  const cancelExam = () => {
    if (create || clone || edit) {
      history("/dashboard/teacher-online-test");
    } else if (admin || adminClone || adminEdit) {
      history(`/view-classroom/${subjectId}`, {
        adminToggle: "adminToggle",
      });
    }
    Storage.clear()
  };
  const dropdownRef = useRef(null);

  const onClickBtnRemove = () => setIsActive(!isActive);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const handleInput = (e) => {
    let inputValue = e.target.value === "not selected" ? 0 : e.target.value;
    setEstimatedMins(inputValue * 1);
    setGraceTime(false)
    setGraceStartTime("")
    setGraceStopTime("")
  };

  // Handle for "Select Hours" dropdown code
  const handleInput2 = (e) => {
    let inputValue = e.target.value === "not selected" ? 0 : e.target.value;
    setEstimatedHrs(inputValue * 60);
    setEstimatedMins(0)
  };
  const handleDate = (selectedDate) => {
    let validDateDetails = selectedDate.toString().split(" ");
    setRealValidationDate(validDateDetails);
    setExamOnlineDate(selectedDate);
    validDateTime()
  }
  const handleTime = (selectedTime) => {
    let validTimeDetails = selectedTime.toString().split(" ");
    setRealValidationTime(validTimeDetails);
    setExamTime(selectedTime)
    validDateTime()
  }



  useEffect(() => {
    let date = [
      realValidationDate[0],
      realValidationDate[1],
      realValidationDate[2],
      realValidationDate[3],
      realValidationTime[4],
      realValidationTime[5],
      realValidationDate[6],
      realValidationDate[7],
      realValidationDate[8],
    ];

    setDateTimeValidErrors(

      // !ValidationDateTime.compareCurrentDateTime(new Date(date.join(" ")))
      moment(new Date()).add(9, "m") > new Date(date.join(" "))
    )
    setReminderTest("")
  }, [
    dateTimeValidError,
    examTime,
    examDate,
    graceTime,
    graceStartTime,
    graceStopTime,
    realDateTime,
    realValidationDate,
    realValidationTime,
  ]);

  useEffect(() => {
    if (examTime && examOnlineDate && !_id) {
      let validDateDetails = examOnlineDate.toString().split(" ");
      setRealValidationDate(validDateDetails);
      let validTimeDetails = examTime.toString().split(" ");
      setRealValidationTime(validTimeDetails);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <div className="CT_Setting__1">
        <div className="datePickerWrap">
          <InputDatePicker
            value={examOnlineDate}
            onSelect={handleDate}
            minDate={new Date()}
            onlyDate
            label="Date"
            type="date"
            placeholder="Date"
          />
          <FormError
            show={validate && !examOnlineDate}
            error="It can not be empty."
          />
          <FormError show={moment(examOnlineDate).format('DD MM YYYY') < moment(new Date()).format('DD MM YYYY')} error="Date should be in future." />
        </div>
        <div
          className={`datePickerWrap ${dateTimeValidError ? "errorInputDateTimePicker" : ""
            }`}
        >
          <InputDatePicker
            value={examTime}
            onSelect={handleTime}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={5}
            dateFormat="h:mm aa"
            label="Time"
            type="time"
            placeholder="Time"
          />
          <FormError
            show={dateTimeValidError}
            error="Exam Time should be 10 minutes in future."
          />

        </div>
        {/* Start of "Select Hours" dropdown code */}
        <div className="formFieldwrap">
          <MinutesSelect
            start={0}
            end={8}
            step={0}
            text=""
            selected={estimatedHrs / 60}
            defaultSelect={"Select Hours"}
            isHide={true}
            onEvent={handleInput2}
            label="Estimated Hrs."
          />
          {/* <label className="animLabel" htmlFor="Estimated_Hrs">
            Estimated Hrs.
          </label> */}
          <FormError
            show={
              validate && estimatedMins
                ? false
                : validate && !estimatedHrs && true
            }
            error="Please provide duration."
          />
        </div>

        {/* Select dropdown for Minutes */}
        <div className="formFieldwrap">
          <MinutesSelect
            start={!estimatedHrs ? 10 : 0}
            end={55}
            step={4}
            selected={estimatedHrs === 480 ? 0 : estimatedMins}
            text=""
            name={"minutes"}
            isHide={true}
            onEvent={handleInput}
            defaultSelect={"Select Minutes"}
            disabled={estimatedHrs > 479 ? true : false}
            label="Estimated Mins."
          />
          {/* <label className="animLabel" htmlFor="Estimated_Hrs">
            Estimated Mins.
          </label> */}
          <FormError
            show={validate && !validation.lessthanVal(480, estimatedMins)}
            error={`Maximum duration allowed is ${8} hours.`}
          />
        </div>
      </div>
      <div className="CT_Setting__2 mt-20">
        <div className="CT_Setting__2_Item">
          <p>Do you allow to extend grace minute?</p>
          <div
            className="input-custom-type inline mt-10"
          >
            <label
              className={`small ${(graceTime === "true" || graceTime === true) && "t-active"
                }`}
            >
              <input
                type="radio"
                value={true}
                name="graceTime"
                onChange={(e) => setGraceTime(e.target.value)}
                disabled={
                  !estimatedHrs && estimatedMins < 30
                    ? true
                    : estimatedHrs && estimatedMins > 29 && false
                }
                checked={
                  (graceTime === "true" || graceTime === true) && "t-active"
                }
              />
              Yes
            </label>
            <label
              className={`small ${(graceTime === "false" || graceTime === false) && "t-active"
                }`}
            >
              <input
                type="radio"
                value={false}
                name="graceTime"
                onChange={(e) => setGraceTime(e.target.value)}
                disabled={
                  !estimatedHrs && estimatedMins < 30
                    ? true
                    : estimatedHrs && estimatedMins > 29 && false
                }
                checked={
                  (graceTime === "false" || graceTime === false) && "t-active"
                }
              />
              No
            </label>
          </div>
          {(graceTime === "true" || graceTime === true) && (
            <div className="GraceTime__True mt-20">
              <div className="formFieldwrap">
                <MinutesSelect
                  id="Allow_Before"
                  start={5}
                  end={!estimatedHrs && estimatedMins < 61 ? 10 : estimatedHrs < 120 ? 20 : 60}
                  step={4}
                  selected={graceStartTime}
                  defaultSelect="Starts after"
                  onSelected={(value) => setGraceStartTime(value)}
                  //onSelected={handleGraceStartTime(value)}
                  label="Allow Minutes"
                />
                {/* <label className="animLabel" htmlFor="Allow_Before">
                  Allow Minutes
                </label> */}
                <FormError
                  show={validate && !graceStartTime}
                  error="Please provide grace start duration."
                />
              </div>
              <div className="formFieldwrap">
                <MinutesSelect
                  id="Max_Allow_Before"
                  start={5}
                  end={!estimatedHrs && estimatedMins < 61 ? 10 : estimatedHrs < 120 ? 20 : 60}
                  step={4}
                  selected={graceStopTime}
                  defaultSelect="Ends before"
                  onSelected={(value) => setGraceStopTime(value)}
                  //onSelected={handleGraceStopTime(value)}
                  label="Max. Allow Minutes"
                />
                {/* <label className="animLabel" htmlFor="Max_Allow_Before">
                  Max. Allow Minutes
                </label> */}
                <FormError
                  show={validate && (!graceStopTime || (graceStopTime === 'undefined') || (graceStopTime === 'not selected'))}
                  error="Please provide grace end duration."
                />
              </div>
            </div>
          )}
        </div>
        <div className="CT_Setting__2_Item">
          <p>Do you want to show correct answer?</p>
          <div
            className="input-custom-type inline mt-10"
            onClick={(e) => setShowResult(e.target.value)}
          >
            <label
              className={`small ${(showResult === "true" || showResult === true) && "t-active"
                }`}
            >
              <input
                type="radio"
                value="true"
                name="showResult"
                checked={
                  (showResult === "true" || showResult === true) && "t-active"
                }
              />
              Yes
            </label>
            <label
              className={`small ${(showResult === "false" || showResult === false) && "t-active"
                }`}
            >
              <input
                type="radio"
                value="false"
                name="showResult"
                checked={
                  (showResult === "false" || showResult === false) && "t-active"
                }
              />
              No
            </label>
          </div>
        </div>
        <div className="CT_Setting__2_Item">
          <div className="SortByTableHeadCst ">
            <label>Re-Notify Attendee Before</label>
            <select
              onChange={(e) => reNotify(e)}
              selected={reminderTest}
              value={reminderTest}
            >
              <option value="">No, Notify</option>
              <option disabled={dateA <= value1 ? true : false} value={value1}>
                30 Mins
              </option>
              <option disabled={dateA <= value2 ? true : false} value={value2}>
                2 Hrs
              </option>
              <option disabled={dateA <= value3 ? true : false} value={value3}>
                4 Hrs
              </option>
              <option disabled={dateA <= value4 ? true : false} value={value4}>
                12 Hrs
              </option>
              <option disabled={dateA <= value5 ? true : false} value={value5}>
                1 Day
              </option>
              <option disabled={dateA <= value6 ? true : false} value={value6}>
                2 Days
              </option>
              <option disabled={dateA <= value7 ? true : false} value={value7}>
                4 Days
              </option>
              <option disabled={dateA <= value8 ? true : false} value={value8}>
                1 Week
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="CT_Setting__3 mt-50">
        <p>Select Restriction Mode</p>

        <div
          className="input-custom-type inline mt-10"
          onClick={(e) => setAccessibilityMode(e.target.value)}
        >
          <div className="SelectRestrictionModeWrapper">

            <label
              style={{ alignItems: "flex-start" }}
              className={
                accessibilityMode === "No Restrictions" ? "t-active" : ""
              }
            >
              <input
                type="radio"
                checked={accessibilityMode === "No Restrictions" && true}
                value="No Restrictions"
                name="accessibilityMode"
              />
              <div className="text-xs SelectRestrictionwidth">
                No Restrictions <br />
                <span className="text-xxs gray">
                  Student can minimize whenever he wants.
                </span>
              </div>
            </label>
            <label
              style={{ alignItems: "flex-start" }}
              className={accessibilityMode === "Moderate" ? "t-active" : ""}
            >
              <input
                type="radio"
                value="Moderate"
                name="accessibilityMode"
                checked={accessibilityMode === "Moderate" && true}
              />
              <div className="text-xs SelectRestrictionwidth">
                Moderate <br />
                <span className="text-xxs gray">
                  Teacher will be notified each time student minimizes/switches the window
                  with a max of 5 attempts post which their exam will be auto-submitted.
                </span>
              </div>
            </label>
            <label
              style={{ alignItems: "flex-start" }}
              className={accessibilityMode === "Strict" ? "t-active" : ""}
            >
              <input
                type="radio"
                value="Strict"
                name="accessibilityMode"
                checked={accessibilityMode === "Strict" && true}
              />
              <div className="text-xs SelectRestrictionwidth">
                Strict <br />
                <span className="text-xxs gray">
                  If student attempts to minimize/switch window,
                  exam will be auto-submitted.
                </span>
              </div>
            </label>
          </div>
        </div>

      </div>
      <div className="TestInstructionCustom mt-50">
        <p className="text-sm w-500">Basic Instructions for test:</p>
        <div className="TestIns_WrapSec TestIns_Border mt-30">
          <article id="0">
            <div
              className="TestIns_Head"
              onClick={() => manageReadInstruction("General_Instruction")}
            >
              General Instruction
            </div>
            {readInstruction === "General_Instruction" && (
              <div className="TestIns_AnswerDisp">
                <ol>
                  <li>Read all the instructions given below thoroughly</li>
                  <li>
                    The test is timed. Once you click “Agree and Continue” your
                    timer will start.
                  </li>
                  <li>
                    You cannot exit the test midway. The test has to be
                    completed in one-sitting.
                  </li>
                  <li>If you exit the test midway, no marks will be given.</li>
                  <li>
                    Incase, you exit without attempting any question, no marks
                    be given.
                  </li>
                  <li>Click “Submit Your Test” after completing the test.</li>
                  <li>
                    Marks will only be recorded if you click “Submit Your Test”.
                  </li>
                  {instruction && instruction.length > 0
                    ? instruction.map((item, index) => (
                      <li key={index}>
                        {item}&nbsp;&nbsp;
                        <button
                          className="button btn-o-red  btn-xs red"
                          onClick={() => removeData(index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))
                    : ""}
                </ol>
                {addInstruction && (
                  <div className="AddInstructionInput mt-20">
                    <FormInput
                      type="text"
                      className="input"
                      value={value}
                      onChange={addMultipleData}
                      maxLength="220"
                      placeholder="You are allowed to submit only once, make sure that you have correctly attempted"
                    />
                    <FormError
                      show={error && !value}
                      error="Please provide instruction."
                      className={`mt-40`}
                    />
                    <ul className="AddInstructionGroupBtn">
                      <li
                        className="w-600 primary text-sm"
                        onClick={handleSubmit}
                      >
                        &#10003;
                      </li>
                      <li
                        className="w-600 base text-sm"
                        onClick={() => handleClose()}
                      >
                        &#10539;
                      </li>
                    </ul>
                  </div>
                )}
                <button
                  type="button"
                  className="button btn-o-primary  btn-xs primary mt-10"
                  onClick={() => setaddInstruction(!addInstruction)}
                >
                  Add Instruction
                </button>
              </div>
            )}
          </article>
          <article id="0">
            <div
              className="TestIns_Head"
              onClick={() => manageReadInstruction("Question_Type_Instruction")}
            >
              Question Type Instruction
            </div>
            {readInstruction === "Question_Type_Instruction" && (
              <div className="TestIns_AnswerDisp">
                <ol>
                  <li>All questions are compulsory.</li>
                  <li>
                    The questions will be either Objective, Subjective or both.
                  </li>
                  <li>
                    Objective Questions include; Single Answer Questions,
                    Multiple Answer Questions, and True/False Questions.
                  </li>
                  <li>
                    Single Answer Questions: Select a single correct answer from
                    multiple choices.
                  </li>
                  <li>
                    Multiple Answer Questions: Select 2 or more correct answers
                    from multiple choices.
                  </li>
                  <li>
                    True/False Questions: From the given statement, choose true
                    or false.
                  </li>
                  <li>
                    Subjective Questions should be written in the text-box below
                    the question.
                  </li>
                  <li>
                    You are allowed to submit only once, make sure that you have
                    correctly attempted all the questions before submission.
                  </li>
                  <li>
                    Subjective Questions that require you to upload a document
                    will accept; PDF, JPG, and Word File.
                  </li>
                  {instruction1 && instruction1.length > 0
                    ? instruction1.map((item, index) => (
                      <li key={index}>
                        {item}&nbsp;&nbsp;
                        <button
                          className="button btn-o-red  btn-xs red"
                          onClick={() => removeData1(index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))
                    : ""}
                </ol>
                {addInstruction && (
                  <div className="AddInstructionInput mt-20">
                    <FormInput
                      type="text"
                      className="input"
                      value={newValue}
                      onChange={addMultipleData1}
                      maxLength="220"
                      placeholder="You are allowed to submit only once, make sure that you have correctly attempted"
                    />
                    <FormError
                      show={error1 && !newValue}
                      error="Please provide instruction."
                      className={`mt-40`}
                    />
                    <ul className="AddInstructionGroupBtn">
                      <li
                        className="w-600 primary text-sm"
                        onClick={handleSubmit1}
                      >
                        &#10003;
                      </li>
                      <li
                        className="w-600 base text-sm"
                        onClick={() => handleClose1()}
                      >
                        &#10539;
                      </li>
                    </ul>
                  </div>
                )}
                <button
                  type="button"
                  className="button btn-o-primary  btn-xs primary mt-10"
                  onClick={() => setaddInstruction(!addInstruction)}
                >
                  Add Instruction
                </button>
              </div>
            )}
          </article>
          <article id="0">
            <div
              className="TestIns_Head"
              onClick={() => manageReadInstruction("Restriction_Instruction")}
            >
              Restriction Instruction
            </div>
            {readInstruction === "Restriction_Instruction" && (
              <div>
                {accessibilityMode === "No Restrictions" ? (
                  <div className="TestIns_AnswerDisp">
                    <p className="w-500 text-xs purple">No Restrictions:</p>
                    <ol>
                      <li>You are allowed to minimize your window freely during exams.</li>
                      {instruction2 && instruction2.length > 0
                        ? instruction2.map((item, index) => (
                          <li key={index}>
                            {item}&nbsp; &nbsp;
                            <button
                              className="button btn-o-red  btn-xs red"
                              onClick={() => removeData2(index)}
                            >
                              Remove
                            </button>
                          </li>
                        ))
                        : ""}
                    </ol>
                  </div>
                ) : accessibilityMode === "Moderate" ? (
                  <div className="TestIns_AnswerDisp">
                    <p className="w-500 text-xs purple">
                      Moderate Restrictions:
                    </p>
                    <ol>
                      <li>
                        You are allowed to minimize/switch the tab up to 5 times post which exam will be terminated.
                        Your teacher will be alerted each time you minimize/switch.
                      </li>
                      {instruction2 && instruction2.length > 0
                        ? instruction2.map((item, index) => (
                          <li key={index}>
                            {item}&nbsp; &nbsp;
                            <button
                              className="button btn-o-red  btn-xs red"
                              onClick={() => removeData2(index)}
                            >
                              Remove
                            </button>
                          </li>
                        ))
                        : ""}
                    </ol>
                  </div>
                ) : (
                  accessibilityMode === "Strict" && (
                    <div className="TestIns_AnswerDisp">
                      <p className="w-500 text-xs purple">
                        Strict Restrictions:{" "}
                      </p>
                      <ol>
                        <li>
                          Your exam will be Terminated if you attempt to switch/minimize the window.
                        </li>
                        {instruction2 && instruction2.length > 0
                          ? instruction2.map((item, index) => (
                            <li key={index}>
                              {item}&nbsp; &nbsp;
                              <button
                                className="button btn-o-red  btn-xs red"
                                onClick={() => removeData1(index)}
                              >
                                Remove
                              </button>
                            </li>
                          ))
                          : ""}
                      </ol>
                    </div>
                  )
                )}
                {addQuestion && (
                  <div className="AddInstructionInput mt-20">
                    <FormInput
                      type="text"
                      className="input"
                      value={value0}
                      onChange={addMultipleData2}
                      maxLength="220"
                      placeholder="You are allowed to submit only once, make sure that you have correctly attempted"
                    />
                    <FormError
                      show={error2 && !value0}
                      error="Please provide instruction."
                      className={`mt-40`}
                    />
                    <ul className="AddInstructionGroupBtn">
                      <li
                        className="w-600 primary text-sm"
                        onClick={handleSubmit2}
                      >
                        &#10003;
                      </li>
                      <li
                        className="w-600 base text-sm"
                        onClick={() => handleClose2()}
                      >
                        &#10539;
                      </li>
                    </ul>
                  </div>
                )}
                <button
                  type="button"
                  className="button btn-o-primary  btn-xs primary mt-10"
                  onClick={() => setaddQuestion(!addQuestion)}
                >
                  Add Instruction
                </button>
              </div>
            )}
          </article>
        </div>
      </div>
      <div className="ExamInstructionBtn mt-50">
        {loading ? (
          <button type="button" className="button btn-md button-theme btn-sm">
            Loading...
          </button>
        ) : (
          <button
            type="button"
            onClick={() => saveAndContinue("", "Submit")}
            className="button btn-md button-theme btn-sm"
          >
            Save & Continue
          </button>
        )}
        <button
          type="button"
          className="button btn-o-secondary secondary btn-sm"
          onClick={onClickBtnRemove}
        >
          Cancel
        </button>
        <div
          ref={dropdownRef}
          className={`popup removePopup ${isActive ? "active" : "inactive"}`}
        >
          <p className="heading gray text-xxs w-400">
            You will loose all the data if you cancel, Do you want to proceed?
          </p>
          <p className="sub-heading text-xxs w-400">Are you sure?</p>
          <div className="removePopBtn">
            <button
              onClick={onClickBtnRemove}
              className="button btn-o-silver dgray btn-sm"
            >
              No
            </button>
            <button
              onClick={cancelExam}
              className="button button-red btn-sm"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

ExamSettings.defaultProps = {
  onSave: () => { },
  onSubmit: () => { },
};

ExamSettings.proptoType = {
  onSave: func,
  onSubmit: func,
};

export default ExamSettings;
