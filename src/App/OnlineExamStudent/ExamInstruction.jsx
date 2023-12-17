import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDetectOutsideClick } from "../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  postStudentExam,
  resetOESLoadedDetail,
  resetOnlineExamStudent,
} from "../../store/actions/onlineexamstudent";
import { getSingleExamDetails } from "../../store/actions/onlineexam";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import ErrorBoundary from "../../Classes/ErrorBoundary";
// import OnlineExamNotificationImage from "../../assets/images/img/onlineexam-notification.png";
import moment from "moment";
import withTimer from "./utility/Timer"
// import RenderInWindow from "./RenderInWindow";

const ExamInstruction = ({ counter, minutes, seconds }) => {
  const dropdownRef = useRef(null);
  const { _id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();

  const { user, successApplyExam, detail } = useSelector((state) => {
    return {
      user: state.user,
      successApplyExam: state.onlineexamstudent.create,
      detail: state.onlineexam.getSingleExam.data,
    };
  });

  if (
    moment(detail.quizon).add(detail.estimatedtime, "m").format() <
    moment(new Date()).format()
  ) {
    history("/dashboard/student/online-test");
  }

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClickBtnRemove = () => setIsActive(!isActive);


  const handleClick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
    dispatch(postStudentExam(studentExamData()));
  };

  if (successApplyExam.success) {
    history(`/dashboard/student-online-test/${_id}`);
  }


  useEffect(() => {
    dispatch(getSingleExamDetails(_id));
    dispatch(resetOnlineExamStudent());
  }, [dispatch, _id]);



  useEffect(() => {
    return () => {
      dispatch(resetOESLoadedDetail());
    };
  }, [dispatch]);
  const cancelExam = () => {
    history("/dashboard/student/online-test");
  };
  useEffect(() => {
    if (counter === 0) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      }
      dispatch(postStudentExam(studentExamData()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, dispatch])

  const studentExamData = () => {
    return {
      student: user._id,
      examId: _id,
    };
  };

  return (
    <ErrorBoundary url="/dashboard/teacher-online-test">
      <React.Fragment>
        <div className="ExamPushNotificationWrapper mt-30">
          <div className="ExamPushNotificationHead">
            <div className="ExamPushNotificationIcon">
              <i className="ed-icon icon-bell i-s red"></i>
            </div>
            <div className="ExamPushNotificationHeadContent">
              <p className="text-sm white">Enable Push Notifications</p>
              <p className="text-xxs white">
                Before start you need to enable your push notification.
              </p>

            </div>
          </div>
          {/*<div className="ExamPushNotificationBody">
              <img src={OnlineExamNotificationImage} alt="" />
              <p className="btnText red underline w-600 mt-30">
                How to Enable Push Notification
              </p>
  </div>*/}
        </div>
        <p className="text-sm w-300 mt-30">Basic Instructions for test:</p>
        <div className="instruction-section">
          <ol type="A">
            <li className="mt-30">
              <p className="w-500 text-xs purple">General Instructions:</p>
              <ol className="mt-10">
                <li>Read all the instructions given below thoroughly.</li>
                <li>
                  The test is timed.Once you click “Agree and Continue” your
                  timer will start.
                </li>
                <li>
                  You cannot exit the test midway.The test has to be
                  completed in one-sitting.
                </li>
                <li>If you exit the test midway, no marks will be given.</li>
                <li>
                  Incase, you exit without attempting any question, no marks
                  will be given.
                </li>
                <li>Click “Submit Your Test” after completing the test.</li>
                <li>
                  Marks will only be recorded if you click “Submit Your Test”.
                </li>

                {detail.instructionData &&
                  detail.instructionData.length > 0 ? (
                  detail.instructionData.map((item, index) => {
                    return (
                      <li
                        key={index}
                      >
                        {item}
                      </li>
                    );
                  })
                ) : ""}
              </ol>
            </li>
            <li className="mt-30">
              <p className="w-500 text-xs purple">
                Questions Type Instructions:
              </p>
              <ol className="mt-10">
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
                {
                  detail.questionInstruction
                }
              </ol>
            </li>
            {detail.accessibilityMode === "Moderate" ? (
              <li className="mt-30">
                <p className="w-500 text-xs purple">
                  Moderate Restrictions:
                </p>
                <ol className="mt-10">
                  <li>
                    Teacher will be notified when student minimises the
                    screen.
                  </li>
                </ol>
              </li>
            ) : detail.accessibilityMode === "Strict" ? (
              <li className="mt-30">
                <p className="w-500 text-xs purple">Strict Restrictions:</p>
                <ol className="mt-10">
                  <li>
                    Test will be auto terminated if the students minimize the
                    window. Also, they will not have the option of uploading
                    attachments in this mode.
                  </li>
                  {
                    detail.questionInstruction
                  }
                </ol>
              </li>
            ) : (
              ""
            )}
            {
              detail.graceTime && (
                <li className="mt-30">
                  <p className="w-500 text-xs purple">Grace Time:</p>
                  <ol className="mt-10">
                    <li>
                      Enabled You are allowed to request grace time before the
                      exam duration ends. However, the authority of providing
                      the grace time lies with the examiner.
                    </li>
                    <li>
                      Disabled You are not allowed to request grace time..
                    </li>
                  </ol>
                </li>
              )}
          </ol>
        </div>
        <div className="remaining-time-wrapper">
          <p className="remaining-time-content">
            <span className="remaining-time-cst red text-xs">
              {minutes}
            </span>
            <span className="remaining-time-label-cst text-2xs">
              Minutes
            </span>
          </p>
          <p className="remaining-time-content">
            <span className="remaining-time-cst red text-xs">
              {seconds}
            </span>
            <span className="remaining-time-label-cst text-2xs">
              Second
            </span>
          </p>
        </div>
        <div className="ExamInstructionBtn mt-50">
          {
            successApplyExam.loading && !successApplyExam.loaded ?
              (
                <button type="button" className="button btn-md button-theme">
                  Loading...
                </button>
              ) : moment(detail.quizon).format() >
                moment(new Date()).format() &&
                !detail.isCancelled ? (
                <button
                  type="button"
                  onClick={handleClick}
                  className="button btn-md button-theme btn-sm"
                  disabled="disabled"
                >
                  Agree and Continueee
                </button>
              ) :
                moment(detail.quizon)
                  .add(detail.estimatedtime, "m")
                  .format() > moment(new Date()).format() ? (
                  <button
                    type="button"
                    onClick={handleClick}
                    className="button btn-md button-theme btn-sm"
                  >
                    Agree and Continueee
                  </button>
                ) :
                  moment(detail.quizon).format() ===
                  moment(new Date()).format() && (
                    <button
                      type="button"
                      onClick={handleClick}
                      className="button btn-md button-theme btn-sm"
                    >
                      Agree and Continueeee
                    </button>
                  )
          }
          <button
            id="requestFullscreen"
            type="button"
            className="button btn-o-purple purple btn-sm"
            onClick={onClickBtnRemove}
          >
            No, Leave
          </button>
          <div
            ref={dropdownRef}
            className={`popup removePopup ${isActive ? "active" : "inactive"
              }`}
          >
            <p className="heading gray text-xxs w-400">
              You are about to leave this online test.
            </p>
            <p className="sub-heading text-xxs w-400">Are you sure?</p>
            <div className="removePopBtn">
              <button
                // onClick={onClickBtnRemove}
                onClick={handleClick}
                className="button btn-o-silver dgray btn-sm"
              >
                Cancel
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
      </React.Fragment>
    </ErrorBoundary>
  );
};

export default withTimer(ExamInstruction);
