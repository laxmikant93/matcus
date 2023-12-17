import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from "../../../Common/Modal";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
// import { OnlineExamNotificationImage } from "../../../Common/Images/index";
// import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import { useNavigate } from 'react-router';
import onlineexamntofication from "../utility/onlineexamnotification.png";
import { patchExamAnswer, } from "../../../store/actions/onlineexamstudent";

const ExamInstruction = ({ show, onclose, readIns }) => {
  const { buttonLoading } = useSelector((state) => {
    return {
      buttonLoading: state.onlineexamstudent.answer.loading,
      patchSuccess: state.onlineexamstudent.answer.success
    }
  })
  const history = useNavigate()
  const dispatch = useDispatch()
  const examDetail = useSelector(state => state.onlineexamstudent.detail)



  const handleVisibilty = () => {
    dispatch(patchExamAnswer(examDetail.submittedInfo._id, { isInstructionReaded: true }))
    onclose()
  }
  const closeModal = () => {
    onclose()
  }
  const handleCancel = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      history("/dashboard/student/online-test")
    } else {
      history("/dashboard/student/online-test")
    }
  }
  // const dropdownRef = useRef(null)
  const [notifipopexamstudent, setNotifipopexamstudent] = useState();
  const notifipopexam = () => {
    setNotifipopexamstudent(!notifipopexamstudent)
  }


  return (
    <Modal
      className="restrictedExamWarningPopup "
      show={show}
      ModalSize={`modal-full`}
    >
      <ModalHeader
        className="primary"
        title="Exam Instructions"
        closeButton={readIns}
        onclose={closeModal}
      />
      <ModalBody >
        <div className="ExamPushNotificationWrapper mt-30">
          <div className="ExamPushNotificationHead" >
            <div className="ExamPushNotificationIcon">
              <i className="ed-icon icon-bell i-s white"></i>
            </div>
            <div className="ExamPushNotificationHeadContent">
              <p className="text-sm customeresponsive gray">Enable Push Notifications</p>
              <p className="text-xxs gray">
                Before start you need to enable your push notification.
              </p>
            </div>
            <div className="notifypoponlineexamstuden" onClick={notifipopexam}  >
              <div className="text-xxs white"> &#63; </div>

              <div className={`${notifipopexamstudent ? "activepopstudentexam" : "notActivepopstudentexam"}`}>
                <p className="text-right pb-10" onClick={notifipopexam}>X Close</p>
                <img src={onlineexamntofication}
                  alt="" />
              </div>
            </div>
          </div>
          { /* <div className="ExamPushNotificationBody">
              <img src={OnlineExamNotificationImage} alt="" />
              <p className="btnText red underline w-600 mt-30">
                How to Enable Push Notification
              </p>
            </div> */ }
        </div>
        <div >
          {
            examDetail.accessibilityMode === "Strict" &&
            <div className="ExamPushNotificationWrapper mt-30">
              <div className=" strictonlinepopexamnoti">
                <div className="ExamPushNotificationHeadContent">
                  <p className="text-sm customeresponsive  red">
                    Enabled Strict Mode
                  </p>
                  <p className="text-xxs red ">
                    Your exam will be Terminated if you attempt to switch/minimize the window.
                  </p>
                </div>
              </div>
            </div>}
          {examDetail.accessibilityMode === "Moderate" &&
            <div className="ExamPushNotificationWrapper mt-30">
              <div className=" strictonlinepopexamnoti">
                <div className="ExamPushNotificationHeadContent">
                  <p className="text-sm customeresponsive red  ">
                    Enabled Moderate Mode
                  </p>
                  <p className="text-xxs red ">
                    You are allowed to minimize/switch the tab up to 5 times post which exam will be terminated.
                    Your teacher will be alerted each time you minimize/switch.
                  </p>
                </div>
              </div>
            </div>
          }
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
                  Incase, you exit without attempting any question, no marks will
                  be given.
                </li>
                <li>Click “Submit Your Test” after completing the test.</li>
                <li>
                  Marks will only be recorded if you click “Submit Your Test”.
                </li>

                {examDetail.instructionData &&
                  examDetail.instructionData.length > 0 ? (
                  examDetail.instructionData.map((item, index) => {
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
                {examDetail.questionInstruction &&
                  examDetail.questionInstruction.length > 0 && (
                    examDetail.questionInstruction.map((item, index) => {
                      return (
                        <li
                          key={index}
                        >
                          {item}
                        </li>
                      );
                    })
                  )}
              </ol>
            </li>
            {examDetail.accessibilityMode === "No Restrictions" ?
              (<li className="mt-30">
                <p className="w-500 text-xs purple">
                  No Restrictions:
                </p>
                <ol className="mt-10">
                  <li>
                    You are allowed to minimize your window freely during exams.
                  </li>
                  {examDetail.questionInstruction &&
                    examDetail.questionInstruction.length > 0 && (
                      examDetail.questionInstruction.map((item, index) => {
                        return (
                          <li
                            key={index}
                          >
                            {item}
                          </li>
                        );
                      })
                    )}
                </ol>
              </li>) :
              examDetail.accessibilityMode === "Moderate" ?
                (<li className="mt-30">
                  <p className="w-500 text-xs purple">
                    Moderate Restrictions:
                  </p>
                  <ol className="mt-10">
                    <li>
                      You are allowed to minimize/switch the tab up to 5 times post which exam will be terminated.
                      Your teacher will be alerted each time you minimize/switch.
                    </li>
                    {examDetail.questionInstruction &&
                      examDetail.questionInstruction.length > 0 && (
                        examDetail.questionInstruction.map((item, index) => {
                          return (
                            <li
                              key={index}
                            >
                              {item}
                            </li>
                          );
                        })
                      )}
                  </ol>
                </li>)
                :
                (<li className="mt-30">
                  <p className="w-500 text-xs purple">Strict Restrictions:</p>
                  <ol className="mt-10">
                    <li>
                      Your exam will be Terminated if you attempt to switch/minimize the window.
                    </li>
                    {examDetail.questionInstruction &&
                      examDetail.questionInstruction.length > 0 && (
                        examDetail.questionInstruction.map((item, index) => {
                          return (
                            <li
                              key={index}
                            >
                              {item}
                            </li>
                          );
                        })
                      )}
                  </ol>
                </li>)
            }
            {examDetail.graceTime && (
              <li className="mt-30">
                <p className="w-500 text-xs purple">Grace Time:</p>
                <ol className="mt-10">
                  <li>
                    You are allowed to request Grace time only between the time allotted by the examiner.
                    However, the authority of providing grace time lies with the examiner.
                  </li>
                </ol>
              </li>
            )}
          </ol>
        </div>
      </ModalBody>
      {
        readIns ? "" : <ModalFooter>
          {
            buttonLoading ?
              <button type='button' className="button btn-md button-theme   btn-sm  mt-20">
                Loading...
              </button> : <button onClick={handleVisibilty} type='button' className="button btn-md button-theme   btn-sm  mt-20">
                Agree and continue
              </button>
          }

          <button onClick={handleCancel} className="button btn-md button-theme   btn-sm  mt-20">
            Cancel
          </button>
          <p>By clicking "Agree & Continue" You have read our online test instruction carefully.</p>
          <p>If you don't want to participate click on cancel button.</p>
        </ModalFooter>
      }

    </Modal>
  )
}

export default ExamInstruction;