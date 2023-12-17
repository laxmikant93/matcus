import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  findQuestion,
  getAnswerData,
  postAnswerData,
  deleteAnswerwData,
  answerVote,
  getMoreAnswerData,
} from "../../../store/actions/community/index";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import AppLink from "../../../Common/AppLink";
import ListAnswers from "./ListAnswers";
import Upload from "../../../Common/Upload";
import { Userid, UserToken } from "../../../Common/UserElement";
import Login from "../../Auth/Login";
import { useNavigate } from "react-router-dom";
import FormTextArea from "../../../Common/Form/FormTextArea";

export default function CommentOnQuestion() {
  const [modalState, setModalState] = useState(false);
  const history = useNavigate();
  const closeModalState = () => {
    setModalState(false);
  };

  const manageModalState = () => {
    history("/auth/login")
    setModalState(!modalState);
  };

  const token = UserToken();

  useEffect(() => {
    if (token) {
      closeModalState();
    }
  }, [token]);

  const id = Userid();

  // REACT HOOK FOR PUBLISHING ROUTE

  const { postId } = useParams();

  const dispatch = useDispatch();

  // information about question...
  const { text, ownerName, createdAt, isLoading, photo, userId } = useSelector(
    (state) => {
      return {
        text: state.community.findQuestion.data.text,
        ownerName: state.community.findQuestion.data.owner_fullname,
        createdAt: state.community.findQuestion.data.createdAt,
        photo: state.community.findQuestion.data.photo,
        isLoading: state.community.findQuestion.loading,
        userId: state.user._id,
      };
    }
  );

  // information about answer...

  const answers = useSelector((state) => state.community.listAnswers.data.data);
  const answerLength = useSelector(
    (state) => state.community.listAnswers.data.total
  );

  useEffect(() => {
    dispatch(findQuestion(postId));
    dispatch(getAnswerData(postId));
  }, [postId, dispatch]);

  // User Questions.
  const [inputAnswer, setInputAnswer] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    dispatch(findQuestion(postId));
    dispatch(getAnswerData(postId));
  }, [dispatch, postId]);

  function handleInputAnswer(e) {
    setInputAnswer(e.target.value.trimStart());
    e.target.value.trimStart() && setIsEmpty(false);
  }

  function deleteAnswer(answerId) {
    dispatch(deleteAnswerwData(answerId));
    // dispatch(getAnswerData(postId))

    setTimeout(() => {
      dispatch(getAnswerData(postId));
    }, 600);
  }

  //  UPLOAD IMAGE
  const [answerImgLink, setAnswerImgLink] = useState("");

  const uploadImage = (data) => {
    setAnswerImgLink(data.location);
  };

  function removeImage() {
    setAnswerImgLink("");
  }
  //
  const upvoteSchema = (ANSWER_ID) => {
    return {
      up: true,
      kind: "answer",
      ref: ANSWER_ID,
      owner: userId,
    };
  };
  const downvoteSchema = (ANSWER_ID) => {
    return {
      up: false,
      kind: "answer",
      ref: ANSWER_ID,
      owner: userId,
    };
  };

  function upvote(ANSWER_ID) {
    dispatch(answerVote(upvoteSchema(ANSWER_ID)));
  }
  function downvote(ANSWER_ID) {
    dispatch(answerVote(downvoteSchema(ANSWER_ID)));
  }

  const [limit, setLimit] = useState(20);
  let skip = answerLength - limit;

  function loadMore() {
    dispatch(getMoreAnswerData(postId, 20, 10));
    setLimit((prevlimit) => (skip >= 10 ? prevlimit + 10 : prevlimit + 10));
  }

  const answerSchema = () => {
    return {
      post: postId,
      owner: userId,
      // text: answer,
      text: inputAnswer,
      photo: answerImgLink,
    };
  };

  // post question
  function postAnswer() {
    if ((!isEmpty && inputAnswer !== "") || answerImgLink !== "") {
      dispatch(postAnswerData(answerSchema()));
      setInputAnswer("");
      setIsEmpty(true);
      setAnswerImgLink("");
    }
  }

  let isVisibleButton = true;

  return (
    <>
      <>
        <div className="row center-md">
          <div className="col-md-10">
            <div className="row mt-10">
              <div className="col-md-12 text-left">
                <ul className="BreadCrumb mt-20">
                  <li className="text-xxs w-400">
                    <AppLink className="btnText" to="/community">
                      <i className="animate-r-arrow-icon back-i"></i> Back to
                      Community
                    </AppLink>
                  </li>
                </ul>
              </div>
            </div>
            {isLoading ? (
              <div className="row">
                <div className="col-md-12">
                  <div className="c-asked-ques-detail position-relative mt-20">
                    <div className="c-asked-ques-area text-left">
                      {text !== undefined ? (
                        <div>
                          <div className="heading c-asked-ques-name">
                            <h1
                              className="text-sm w-700"
                              style={{ whiteSpace: "pre-wrap" }}
                            >
                              {text}
                            </h1>
                          </div>
                          <div>
                            {photo !== (undefined || "") && (
                              <div className="UploadImageCst">
                                <a href={photo} target="blank">
                                  <img src={photo} alt="" />
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="sub-heading c-asked-question-detail mt-10">
                            <ul>
                              <li className="btnText bsPink">
                                {answerLength} Answers
                              </li>
                              <li className="text-xxs dgray">
                                Asked by:
                                <span className="base w-500">{ownerName}</span>
                              </li>
                              <li className="text-xxs dgray">
                                Asked on:
                                <span className="base w-500">
                                  {moment(createdAt).format("llll")}{" "}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <h2>Loading...</h2>
                      )}
                    </div>

                    <div className="position-relative">
                      <div className="community-ask">
                        <div className="ques-ans-area mt-8">
                          <div className="formFieldwrap">
                            <FormTextArea
                              style={{ whiteSpace: "pre-wrap" }}
                              onChange={handleInputAnswer}
                              value={inputAnswer}
                              id="exampleFormControlTextarea1"
                              rows="3"
                              placeholder="Know the answer to this question? Share your knowledge"
                            />
                          </div>
                        </div>
                        <div className="ask-question-footer text-left">
                          {/* upload picture of question */}
                          <div className="ques-ans-upload">
                            <p className="dgray text-xxs w-300">
                              You can upload a picture of your Answer (optional)
                            </p>
                            <div className="formFieldwrap">
                              <Upload
                                label={"Upload Image"}
                                onUploaded={uploadImage}
                                hidenFileName={true}
                                IconFileUploadClass="icon-file-upload base i-xs"
                              />
                              <p className="fileuploadNameTxt">
                                {answerImgLink}
                              </p>
                            </div>
                            {answerImgLink !== "" && (
                              <button
                                className="button button-primary btn-sm button-block"
                                onClick={removeImage}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="ask-upload-button">
                            <button
                              className="button button-bsPink btn-sm"
                              onClick={() => {
                                id ? postAnswer() : manageModalState();
                              }}
                            >
                              Submit Your Answer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            )}

            {answerLength > 0 ? (
              <React.Fragment>
                <div className="row">
                  <div className="col-md-12">
                    <ListAnswers
                      answerData={answers}
                      deleteAnswer={deleteAnswer}
                      upVote={upvote}
                      downVote={downvote}
                      isVisibleButton={isVisibleButton}
                    />
                  </div>
                </div>
                {skip >= 0 && (
                  <div className="row">
                    <div className="col-md-12">
                      <div className="load-more-btn">
                        <button
                          className="button button-mgray gray"
                          onClick={loadMore}
                        >
                          Loading more questions.
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ) : (
              <>
                <h4>No answer yet.</h4>
                <p>
                  <small>Be the first one to answer this question.</small>
                </p>
              </>
            )}
          </div>
        </div>
      </>
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
