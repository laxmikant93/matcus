/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, memo } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import moment from "moment";
import { Userid, UserToken } from "../../../Common/UserElement";
import {
  IconThumbdown,
  IconThumbup,
  IconThumbupColored,
  IconThumbdownColored,
} from "../../../Common/Icon";
import Login from "../../Auth/Login";
import "../Community.scss";
import { useNavigate } from "react-router-dom";
const ListAnswers = memo(

  ({ answerData, deleteAnswer, upVote, downVote, isVisibleButton }) => {
    const history = useNavigate();
    const [modalState, setModalState] = useState(false);
    const closeModalState = () => {
      setModalState(false);
    };

    const manageModalState = () => {

      history("/auth/login")
      setModalState(!modalState);
    };

    const dropdownanswerDelete = useRef(null);

    const [isActiveanswerDelete, setIsActiveanswerDelete] =
      useDetectOutsideClick(dropdownanswerDelete, false);

    const [isAnswerId, setIsAnswerId] = useState("");

    const onClickanswerDelete = (id) => {
      setIsActiveanswerDelete(!isActiveanswerDelete);
      setIsAnswerId(id);
    };

    const id = Userid();
    const token = UserToken();
    const pageName = window.location.pathname;

    useEffect(() => {
      if (token) {
        closeModalState();
      }
    }, [token]);

    const [disabledUp, setDisabledUp] = useState(false);
    const validUpVote = (answer) => {
      if (!id) {
        manageModalState();
      }
      if (id && (answer.myVote === -1 || answer.myVote === 0)) {
        setDisabledUp(true);
        upVote(answer._id);
        setTimeout(() => {
          setDisabledUp(false);
        }, 500);
      }
    };

    const [disableDown, setDisableDown] = useState(false);
    const validDownVote = (answer) => {
      if (!id) {
        manageModalState();
      }
      if (id && (answer.myVote === 1 || answer.myVote === 0)) {
        setDisableDown(true);
        downVote(answer._id);
        setTimeout(() => {
          setDisableDown(false);
        }, 500);
      }
    };
    return (
      <>
        {answerData.map((answer) => {
          return (
            <div key={answer._id} className="row">
              <div className="col-md-12">
                <div className="c-ques-answered-area text-left">
                  <div className="c-answered-profile-img">
                    <a
                      href={`/profile/${answer.owner_username}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        src={
                          // pageName === "/community"
                          //   ?
                          answer.ownerdata_profile_picture ===
                            null ||
                            answer.ownerdata_profile_picture ===
                            undefined ||
                            answer.ownerdata_profile_picture === ""
                            ? DummyProfile
                            : answer.ownerdata_profile_picture
                          // : ""
                        }
                        alt="User Profile"
                      />
                    </a>
                  </div>
                  <div className="c-answered-profile-detail">
                    <div className="c-answered-profile-m-grid">
                      <div className="c-answered-profile-m-g1">
                        <h3 className="heading text-xxs w-500 dgray">
                          {answer.ownerdata_fullname
                            ? answer.ownerdata_fullname
                            : answer.owner_fullname}
                        </h3>
                        <p className="sub-heading text-xxs">
                          <span className="dgray">Answered on:</span>
                          <span className="base">
                            {moment(answer.createdAt).format("llll")}
                          </span>
                        </p>
                        <div className="answerDispWrap UploadImageCst">
                          {answer.photo !== (undefined || "") && (
                            <a href={answer.photo} target="blank">
                              <img src={answer.photo} alt="answer attachment" />
                            </a>
                          )}
                          <p>{answer.text}</p>
                        </div>
                        <div className="text-left">
                          {isVisibleButton && (
                            <ul className="answer-likeup-likedown">
                              <li>
                                <button
                                  disabled={disabledUp}
                                  className="btnText"
                                  onClick={() => {
                                    validUpVote(answer);
                                  }}
                                >
                                  <i
                                    className={`ed-icon icon-thumbup  i-s ${answer.myVote === 1 ? "bsPink" : "mgray"
                                      }`}
                                  ></i>
                                  {answer.upVotes}
                                </button>
                              </li>

                              <li>
                                <button
                                  disabled={disableDown}
                                  className="btnText"
                                  onClick={() => {
                                    validDownVote(answer);
                                  }}
                                >
                                  <i
                                    className={`ed-icon icon-thumbdown i-s ${answer.myVote === -1 ? "bsPink" : "gray"
                                      }`}
                                  ></i>
                                  {answer.downVotes}
                                </button>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                      <div className="c-answered-profile-m-g2 text-right">
                        {token && id === answer.owner && isVisibleButton && (
                          <div className="asked-answer-delete position-relative">
                            <button
                              className="button button-gray btn-sm"
                              onClick={() => onClickanswerDelete(answer._id)}
                            >
                              {" "}
                              Delete{" "}
                            </button>
                            {answer._id === isAnswerId && (
                              <div
                                ref={dropdownanswerDelete}
                                className={`popup removePopup ${isActiveanswerDelete ? "active" : "inactive"
                                  }`}
                              >
                                <h5 className="text-xxs w-400">
                                  You are about to delete your answer.{" "}
                                </h5>
                                <p className="w-500 red">Are you sure?</p>
                                <div className="removePopBtn">
                                  <button
                                    className="button btn-o-silver dgray btn-sm"
                                    onClick={() =>
                                      onClickanswerDelete(answer._id)
                                    }
                                  >
                                    {" "}
                                    Cancel{" "}
                                  </button>
                                  <button
                                    className="button button-red btn-sm"
                                    onClick={() => {
                                      deleteAnswer(answer._id);
                                      onClickanswerDelete(answer._id);
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* LOGIN POOPUP */}
        <div className={`modal pop-login modalShowing-${modalState}`}>
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
                <Login hideSignup />
              </div>
            </div>
          </div>
        </div>
        {/* END OF MODAL */}
      </>
    );
  }
);

export default ListAnswers;
