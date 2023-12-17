/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postQuestionData,
  getQuestionData,
  questionVote,
  searchQuestion,
  deleteQuestionData,
  getMoreQuestionData,
} from "../../store/actions/community";
import { Fullname, Userid, UserImageUrl } from "../../Common/UserElement";
import DummyProfile from "../../assets/images/img/DummyProfile.png";
import { IconCamera } from "../../Common/Icon";
import SuccessMessagePopup from "../../Common/SuccessMessagePopup";
import ListQuestion from "./ListQuestion/ListQuestion";
import Upload from "../../Common/Upload";
import Login from "../Auth/Login";
import SearchCommunity from "./SearchCommunity";
import CommunityTheme from "../../Common/Theme/CommunityTheme";
import Storage from "../../Classes/SessionStorage";
import "./Community.scss";
import { useNavigate } from "react-router-dom";
import FormError from "../../Common/Form/FormError";
import ReactGA from "react-ga"
import FormTextArea from "../../Common/Form/FormTextArea";
export default function Community() {
  const history = useNavigate();
  const [modalStateEdit, setModalStateEdit] = useState(false);
  const [modalState, setModalState] = useState(false);

  const closeModalState = () => {
    setModalState(false);
    setModalStateEdit(false);
  };

  const manageModalState = () => {
    history("/auth/login")
    // setModalState(!modalState);
  };

  // ---------------------------------------------------------------------------------------//

  // username and useremail is coming from state
  const UserFullname = Fullname();
  // const UserName = Username();
  const id = Userid();
  const profile_url = UserImageUrl();

  // REACT HOOK FOR PUBLISHING ROUTE

  // dispatch
  const dispatch = useDispatch();

  const {
    userQuestionlist,
    searchWords,
    searchFound,
    userId,
    isloaded,
    token,
  } = useSelector((state) => {
    return {
      userQuestionlist: state.community.listQuestions.data,
      userId: state.user._id,
      token: state.user.token,
      searchWords: state.community.searchWords,
      searchFound: state.community.listQuestions.totalQuestionFound,
      isloaded: state.community.listQuestions.isloaded,
      myvote: state.community.listQuestions.isloaded,
      voteCheck: state.community.voteCheck.loaded,
      voteCheckAns: state.community.voteCheckAns.loaded,
    };
  });

  ReactGA.event({
    category: "community",
    action: "click",
    label: "Home_Explore",
  })

  useEffect(() => {
    dispatch(getQuestionData());
    dispatch(searchQuestion(searchWords));
    if (token) {
      closeModalState();
    }
  }, [token, dispatch, searchWords]);

  // User Questions.
  const [question, setQuestion] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  function handleInputQuestion(e) {
    let question = e.target.value;
    // if (!token) {
    // Storage.setJson("communityData", question);
    // }
    setQuestion(question.trimStart());
    question.trimStart() && setIsEmpty(false);
  }

  // delete question
  function deleteQuestion(_id) {
    dispatch(deleteQuestionData(_id));
    setTimeout(() => {
      dispatch(getQuestionData());
    }, 600);
  }
  //  UPLOAD IMAGE
  const [questionImgLink, setQuestionImgLink] = useState("");

  const uploadImage = (data) => {
    if (!token) {
      Storage.setJson("communityData", question);
    }
    setQuestionImgLink(data.location);
  };

  function removeImage() {
    setQuestionImgLink("");
  }

  const upvoteSchema = (POST_ID) => {
    return {
      up: true,
      kind: "post",
      ref: POST_ID,
      owner: userId,
    };
  };
  const downvoteSchema = (POST_ID) => {
    return {
      up: false,
      kind: "post",
      ref: POST_ID,
      owner: userId,
    };
  };

  function upvote(POST_ID) {
    dispatch(questionVote(upvoteSchema(POST_ID)));
  }

  function downvote(POST_ID) {
    dispatch(questionVote(downvoteSchema(POST_ID)));
  }

  let skip = searchFound - userQuestionlist.length;

  const loadMore = useCallback(() => {
    let skip = searchFound - userQuestionlist.length;
    let limit = 10;
    dispatch(getMoreQuestionData(skip, limit));
  }, [searchFound, dispatch, userQuestionlist]);

  useEffect(() => {
    if (token && Storage.alive("communityData")) {
      const savedQuestion = Storage.getJson("communityData");
      setQuestion(savedQuestion.text);
      setQuestionImgLink(savedQuestion.photo);
      // Storage.remove("communityData")
    }
  }, [token]);
  // post question
  function postQuestion() {
    if ((!isEmpty && question !== "") || questionImgLink !== "") {
      if (!id) {
        Storage.setJson("communityData", questionSchema());
        manageModalState();
      } else {
        dispatch(postQuestionData(questionSchema(), UserFullname, profile_url));
        Storage.remove("communityData");
        setQuestion("");
        setQuestionImgLink("");
        setIsEmpty(true);
      }
    }
    setQuestionError(!questionError)
  }

  const questionSchema = () => {
    return {
      owner: userId,
      text: question,
      photo: questionImgLink,
    };
  };

  useEffect(() => {
    const onScroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        userQuestionlist.length <= searchFound && loadMore();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [searchFound, userQuestionlist.length, loadMore]);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [questionError, setQuestionError] = useState(false);
  return (
    <>
      <React.Fragment>
        {windowSize.width >= 1024 ? (
          ""
        ) : (
          <div className="mt-40">
            <SearchCommunity />
          </div>
        )}
        <div className="row center-md">
          <div className="col-xs-12 col-md-10">
            <div className="row">
              {/* success message component */}
              <SuccessMessagePopup />
              <div className="col-xs-12 col-md-6">
                <div className="community-head-text text-left">
                  <h1 className="heading w-300 text-sm">
                    Welcome to
                    <br />
                    Edneed <span className="bsPink">Community</span>
                  </h1>
                  <p className="sub-heading text-xs">
                    Expand your learning goal with others.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-12">
                <div className="community-ask">
                  <div className="ask-profile text-left">
                    {token && (
                      <div className="ask-profile-img">
                        <img
                          src={profile_url ? DummyProfile : profile_url}
                          alt="User Profile"
                        />
                      </div>
                    )}
                    <div className="ask-profile-detail">
                      {token && (
                        <h3 className="heading text-xs w-300">
                          {UserFullname}
                        </h3>
                      )}
                      <p className="sub-heading text-xxs w-500">
                        Have a question?
                      </p>
                    </div>
                  </div>
                  <div className="ask-question-area mt-8">
                    <div className="formFieldwrap">
                      <FormTextArea
                        style={{ whiteSpace: "pre-wrap" }}
                        onChange={handleInputQuestion}
                        value={question}
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Write your question here"
                      ></FormTextArea>
                      <FormError show={!question && questionError} error="Question is required" />
                    </div>
                  </div>
                  <div className="ask-question-footer text-left">
                    {/* upload picture of question */}
                    <div className="ques-ans-upload">
                      <p className="dgray text-xxs w-300">
                        You can upload a picture of your question (optional)
                      </p>
                      <div className="formFieldwrap">
                        <Upload
                          label="Upload Image"
                          onUploaded={uploadImage}
                          onlyImage={true}
                          hidenFileName={true}
                          IconFileUploadClass="icon-file-upload base i-xs"
                          Instruction="Accept only .jpg, .jpeg, .bmp or .png."
                        />
                        <p className="bsPink text-xxs mt-5 w-500">
                          {questionImgLink}
                        </p>
                      </div>
                      {questionImgLink && (
                        <button
                          className="button button-bsPink btn-xs"
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
                          postQuestion();
                        }}
                      >
                        Ask Community
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="asked-answer-area text-left">
              {/*List Question Component */}

              {userQuestionlist.length > 0 ? (
                <>
                  <ListQuestion
                    questionData={userQuestionlist}
                    deleteQuestion={deleteQuestion}
                    upVote={upvote}
                    // upvoteAnswer={upvoteAnswer}
                    downVote={downvote}
                  // downvoteAnswer={downvoteAnswer}
                  />
                  {skip >= 0 && (
                    <div className="row">
                      <div className="col-md-12">
                        <div className="load-more-btn">
                          <button
                            className="button button-mgray gray"
                            onClick={loadMore}
                          >
                            Loading more questions
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : isloaded === !true ? (
                <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              ) : (
                searchFound === 0 && <h2>Not Found</h2>
              )}
            </div>
          </div>
        </div>
        <div className={`modal c-modal modalShowing-${modalState}`}>
          <div className="modalwrapper">
            <span
              className="closeModal text-xxs gray"
              onClick={() => closeModalState()}
            >
              Close
            </span>
            <div className="modalHead">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="dgray text-sm w-300 mt-30">
                    What is the slogan by Swami Dayanand Saraswati?
                  </h3>
                </div>
              </div>
            </div>
            <div className="modalbody">
              <div className="row mt-10">
                <div className="col-md-12">
                  <div className="m-ask-question-area mt-8">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Write your question here"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <div className="row mt-20">
                <div className="col-md-12">
                  <div className="m-ask-question-footer text-left mt-8">
                    <div className="m-ask-upload-question">
                      <p className="dgray text-xxs w-300">
                        You can upload a picture of your question (optional)
                      </p>
                      <button className="button btn-o-silver btn-sm">
                        <i className="ed-icon icon-camera gray i-xs"></i>
                        Upload Image
                      </button>
                    </div>
                    <div className="m-ask-upload-button">
                      <button className="button button-bsPink btn-sm">
                        Ask your Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`modal c-modal modalShowing-${modalStateEdit}`}>
          <div className="modalwrapper">
            <span
              className="closeModal text-xxs gray"
              onClick={() => closeModalState()}
            >
              Close
            </span>
            <div className="modalHead">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="dgray text-sm w-300 mt-30">
                    What is the slogan by Swami Dayanand Saraswati?
                  </h3>
                </div>
              </div>
            </div>
            <div className="modalbody">
              <div className="row mt-10">
                <div className="col-md-12">
                  <div className="m-ask-question-area mt-8">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Ask your question here..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <div className="row mt-20">
                <div className="col-md-12">
                  <div className="m-ask-question-footer text-left mt-8">
                    <div className="m-ask-upload-question">
                      <p className="dgray text-xxs w-300">
                        You can upload a picture of your question (optional)
                      </p>
                      <button className="button btn-o-silver btn-sm">
                        <i className="ed-icon icon-camera gray i-xs"></i>
                        Upload Image
                      </button>
                    </div>
                    <div className="m-ask-upload-button">
                      <button className="button button-bsPink btn-sm">
                        Update Answer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <Login hideSignup />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
      {/* END OF MODAL */}
    </>
  );
}
