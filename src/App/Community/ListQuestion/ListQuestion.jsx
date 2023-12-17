/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  IconThumbdown,
  IconThumbup,
  IconThumbupColored,
  IconThumbdownColored,
} from "../../../Common/Icon";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import moment from "moment";
import { Userid, UserToken } from "../../../Common/UserElement";
import AppLink from "../../../Common/AppLink";
import ListAnswers from "./ListAnswers";
import { useDispatch } from "react-redux";
import { deleteAnswerwData } from "../../../store/actions/community/index";
import SharePopUp from "../../../Common/SharePopUp";
import Login from "../../Auth/Login";
import { useNavigate } from "react-router-dom";
export default function ListQuestion({
  questionData,
  deleteQuestion,
  upVote,
  upvoteAnswer,
  downVote,
  downvoteAnswer,
}) {
  const [modalState, setModalState] = useState(false);
  const history = useNavigate();
  const closeModalState = () => {
    setModalState(false);
  };

  const manageModalState = () => {


    history("/auth/login")
    setModalState(!modalState);
  };

  const dropdownQuestionDelete = useRef(null);
  const dispatch = useDispatch();

  const [isActiveQuestionDelete, setIsActiveQuestionDelete] =
    useDetectOutsideClick(dropdownQuestionDelete, false);

  const [isQuestionId, setIsQuestionId] = useState("");

  const onClickQuestionDelete = (id) => {
    setIsActiveQuestionDelete(!isActiveQuestionDelete);
    setIsQuestionId(id);
  };

  const id = Userid();
  const token = UserToken();
  function deleteAnswer(answerId) {
    dispatch(deleteAnswerwData(answerId));
  }

  let postUrl = window.location.hostname;

  let isVisibleButton = false;

  useEffect(() => {
    if (token) {
      closeModalState();
    }
  }, [token]);

  const [disabledUp, setDisabledUp] = useState(false);
  const validUpVote = (question) => {
    if (!id) {
      manageModalState();
    }
    if (id && (question.myVote === -1 || question.myVote === 0)) {
      setDisabledUp(true);
      upVote(question._id);
      setTimeout(() => {
        setDisabledUp(false);
      }, 500);
    }
  };

  const [disableDown, setDisableDown] = useState(false);
  const validDownVote = (question) => {
    if (!id) {
      manageModalState();
    }
    if (id && (question.myVote === 1 || question.myVote === 0)) {
      setDisableDown(true);
      downVote(question._id);
      setTimeout(() => {
        setDisableDown(false);
      }, 500);
    }
  };

  return (
    <>
      {questionData.map((question) => (
        <div key={question._id} className="community-asked">
          <div className="ask-profile text-left">
            <div className="ask-profile-img">
              <a
                href={`profile/${question.owner_username}`}
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="profile-img"
                  src={
                    question.ownerdata_profile_picture ===
                      null ||
                      question.ownerdata_profile_picture ===
                      undefined ||
                      question.ownerdata_profile_picture === ""
                      ? DummyProfile
                      : question.ownerdata_profile_picture

                  }
                  alt="User Profile"
                />
              </a>
            </div>
            <div className="asked-question-area text-left">
              {/* Question */}
              <div className="asked-question-area-wrap">
                <div className="heading asked-ques-name">
                  <h2
                    className="text-xs w-700"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {question.text}
                  </h2>
                </div>
                <div className="sub-heading asked-ques-detail">
                  <ul>
                    <li className="text-xxs dgray">
                      Asked by:
                      <span className="w-500">
                        {" "}
                        <a
                          href={`profile/${question.owner_username}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bsPink"
                        >
                          {question.owner_fullname}{" "}
                        </a>
                        {/* {question.owner_fullname}{" "} */}
                      </span>
                    </li>
                    <li className="text-xxs dgray">
                      Asked on:
                      <span className="base w-500">
                        {moment(question.createdAt).format(
                          "MMM Do, YYYY h:mm a"
                        )}{" "}
                      </span>
                    </li>
                  </ul>
                </div>
                {question.photo !== (undefined || "") && (
                  <div className="UploadImageCst">
                    <a href={question.photo} target="blank">
                      <img src={question.photo} alt={question.text} />
                    </a>
                  </div>
                )}
              </div>
            </div>
            {/** */}
            {/* Delete POST  Button*/}
            {token && id === question.owner && (
              <div className="asked-question-delete position-relative">
                <button
                  className="button button-gray btn-sm"
                  onClick={() => onClickQuestionDelete(question._id)}
                >
                  {" "}
                  Delete{" "}
                </button>
                {question._id === isQuestionId && (
                  <div
                    ref={dropdownQuestionDelete}
                    className={`popup removePopup ${isActiveQuestionDelete ? "active" : "inactive"
                      }`}
                  >
                    <h5 className="gray text-xxs w-300">
                      You are about to delete your question.
                    </h5>
                    <p className="dgray text-xxs w-400">Are you sure?</p>
                    <div className="removePopBtn">
                      <button
                        className="button btn-o-silver dgray btn-sm"
                        onClick={() => onClickQuestionDelete(question._id)}
                      >
                        Cancel
                      </button>
                      <button
                        className="button button-red btn-sm"
                        onClick={() => {
                          deleteQuestion(question._id);
                          onClickQuestionDelete(question._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="asked-answer-all text-left">
            <ul className="asked-answer-all-ui">
              <li className="asked-answer-all-ui-item">
                <AppLink
                  className="btnText"
                  to={`/answer/${question._id}`}
                  target="_blank"
                >
                  {question.answersCount} Answers
                  <i className="animate-r-arrow-icon"></i>
                </AppLink>
              </li>
              <li className="asked-answer-all-ui-item">
                <AppLink to={`/answer/${question._id}`} target="_blank">
                  Answer this question
                </AppLink>
              </li>
              <li className="asked-answer-all-ui-item">
                <button
                  disabled={disabledUp}
                  className="btnText"
                  onClick={(e) => {
                    validUpVote(question);
                  }}
                >
                  <i
                    className={`ed-icon icon-thumbup i-s ${question.myVote === 1 ? "bsPink" : "mgray"
                      }`}
                  ></i>

                  {question.upVotes}
                </button>
              </li>
              <li className="asked-answer-all-ui-item">
                <button
                  disabled={disableDown}
                  className="btnText"
                  onClick={() => {
                    validDownVote(question);
                  }}
                >
                  <i
                    className={`ed-icon icon-thumbdown i-s ${question.myVote === -1 ? "bsPink" : "gray"
                      }`}
                  ></i>
                  {question.downVotes}
                </button>
              </li>
              <li className="asked-answer-all-ui-item sharepopupWrapper">
                <SharePopUp
                  shareUrl={`${postUrl}/answer/${question._id}`}
                  shareiconclass="base i-xs"
                  shareBtnClass="btnText"
                />
              </li>
            </ul>
          </div>
          <ListAnswers
            answerData={question.answers_data}
            deleteAnswer={deleteAnswer}
            upVote={upvoteAnswer}
            downVote={downvoteAnswer}
            isVisibleButton={isVisibleButton}
          />
        </div>
      ))}
      {/* LOGIN POOPUP */}
      <div className={`modal c-modal modalShowing-${modalState}`}>
        <div className="modalwrapper">
          <div className="modalHead">
            <span
              className="closeModal text-xxs gray"
              onClick={() => closeModalState()}
            >
              {" "}
              Close
            </span>
          </div>
          <div className="modalbody">
            <div className="pageFullCenter">
              <div className="pageFullCenter">
                <Login hideSignup />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END OF MODAL */}
    </>
  );
}
