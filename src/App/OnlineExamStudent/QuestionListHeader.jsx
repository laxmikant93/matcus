import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../Common/Card";
import CardBody from "../../Common/Card/CardBody";
import CardHeader from "../../Common/Card/CardHeader";
import UseOutsideClick from "../../Common/UseOutsideClick";
import {
  examInformation,
  patchSubmitExam,
  resetSubmitSuccess,
} from "../../store/actions/onlineexamstudent";
import withTimer from "./utility/Timer";
import { messaging } from "../../firebase/messaginInit";
import { subscriberToTopic } from "../../firebase/subscribetopic";
import { showSuccessPopup } from "../../store/actions/successmessagepopup";
import { setCommonError } from "../../store/actions/commonerror";
import { checkStudentExam } from "../../store/actions/onlineexam";
import { useNavigate, useParams } from "react-router-dom";

const QuestionListHeader = ({ counter, minutes, seconds }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { _id } = useParams();
  const { detail, submitExamSuccess, user, attemptedQuestion } = useSelector(
    (state) => {
      return {
        user: state.user,
        detail: state.onlineexamstudent.detail,
        submitExamSuccess: state.onlineexamstudent.submit.success,
        attemptedQuestion: state.onlineexamstudent.attemptedQuestion.data.questions,
      };
    }
  );

  async function firenotification() {
    if (messaging) {
      messaging.onMessage((payload) => {
        let value = payload && payload.data.rejectRequest;
        let value2 = payload && payload.data.acceptDescription;
        let value3 = payload && payload.data.to;
        if (value || value2) {
          if (value2 === "acceptDiscription" && value3 === user._id) {
            dispatch(
              showSuccessPopup(
                `Your grace time is extended by ${payload.data.totalTime} minutes`
              )
            );
          } else if (value === "rejectDiscription" && value3 === user._id) {
            dispatch(
              setCommonError(
                `Sorry, your grace time request is rejected - ${payload.data.rejectDiscription}`
              )
            );
          }
          setTimeout(() => {
            dispatch(examInformation(_id, user._id));
          }, 3000);
        }
      });
      if (user._id) {
        const firebaseToken = await messaging.getToken();
        subscriberToTopic(firebaseToken, user._id);
      }
    }
  }

  useEffect(() => {
    firenotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [submitPayload, setSubmitPayload] = useState(null);
  useEffect(() => {
    if (!attemptedQuestion) {
      setSubmitPayload({
        questions: [],
      });
    } else {
      setSubmitPayload(attemptedQuestion);
    }
  }, [attemptedQuestion]);

  const [ToggleAttemptedQuestion, SetToggleAttemptedQuestion] = useState(false);
  const DropCheckToggleRef = useRef();

  UseOutsideClick(DropCheckToggleRef, () => {
    if (ToggleAttemptedQuestion) SetToggleAttemptedQuestion(false);
  });

  useEffect(() => {
    if (counter === 0) {
      if (document.fullscreenElement !== null) {
        document.exitFullscreen();
      }
      dispatch(patchSubmitExam(detail.submittedInfo._id, submitPayload));
    }
  }, [counter, submitPayload, dispatch, detail.submittedInfo]);

  useEffect(() => {
    return () => {
      dispatch(resetSubmitSuccess());
    };
  }, [dispatch]);

  const [once, setOnce] = useState(false);
  if (submitExamSuccess && !once) {
    setOnce(true);
    if (detail && !detail.isQuestionSubjective && detail.submittedInfo._id) {
      dispatch(checkStudentExam(detail.submittedInfo._id, { optional: "" }));
    }
    history("/dashboard/student/online-test");
  }


  return (
    <React.Fragment>
      {detail.course ? (
        <div className="QuestionListHeader">
          <div className="QuestionListHeader-intro">
            <p className="heading text-xs w-300 mb-3"> {detail.title} </p>
            <p className="sub-heading text-xxs dgray w-400">
              {detail.courseInfo.coursename},
              {detail.classroomInfo.classroomname}
            </p>
          </div>
          <div className="QuestionListHeader-detail">
            <div className="QuestionListHeader-time">
              <p className="text-xxs mb-3 w-400"> Remaining Time </p>
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
            </div>
            <div
              className="QuestionListHeader-attempted-question"
              ref={DropCheckToggleRef}
            >
              <p className="text-xxs mb-3 w-400"> Attempted Question </p>
              <p
                className={`dgray w-500 quest-attempt-count ${ToggleAttemptedQuestion ? `active` : ``
                  }`}
                onClick={() =>
                  SetToggleAttemptedQuestion(!ToggleAttemptedQuestion)
                }
              >
                <span className="text-xs">
                  {submitPayload ? submitPayload.length : 0}
                </span>
                <span> &nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;</span>
                <span className="text-xxs">{detail.questions.length || 0}</span>
              </p>
              {ToggleAttemptedQuestion && (
                <Card className="attempted-question-drop cardPadding">
                  <CardHeader>
                    <p> Attempted Question </p>
                  </CardHeader>
                  <CardBody>
                    <div className="attempted-q-preview-list">
                      <ul>
                        {detail.questions.map((qItem, qIndex) => {
                          return (
                            <li key={`${qItem._id}.mOption`}>
                              <span
                                className={`attempted-q-preview ${submitPayload &&
                                  submitPayload
                                    .map((q) => {
                                      return q.questionId === qItem._id
                                        ? "active"
                                        : "";
                                    })
                                    .toString()
                                    .replaceAll(",", "")
                                  }`}
                              >
                                {qIndex + 1}
                              </span>
                              <span className="attempted-q-preview-label">
                                Marks {qItem.marks}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
          <div className="QuestionListHeader-user">
            <p className="heading mb-3 text-xs w-300">{user.user_fullname}</p>
            <p className="heading mb-3 text-xs w-300">{user.user_email}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="QuestionListHeader-time MobileViewStudenremaingtime">
            <p className="text-xxs mb-3 w-400"> Remaining Time </p>
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
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default withTimer(QuestionListHeader);
