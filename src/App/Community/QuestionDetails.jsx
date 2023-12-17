/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import AppLink from "../../Common/AppLink";
import { useDetectOutsideClick } from "../../Common/DetectOutsideClick/useDetectOutsideClick";
import DummyProfile from "../../assets/images/img/DummyProfile.png";
import {
  IconCamera,
  IconShare,
  IconThumbdown,
  IconThumbup,
} from "../../Common/Icon";

export default function QuestionDetails() {
  const dropdownQuestionAnswer = useRef(null);
  const [isActiveQuestionAnswer, setIsActiveQuestionAnswer] =
    useDetectOutsideClick(dropdownQuestionAnswer, false);
  const onClickQuestionAnswer = () => {
    setIsActiveQuestionAnswer(!isActiveQuestionAnswer);
  };
  // const [QABtnActive, setQABtn] = useState("false");
  return (
    <>
      <>
        <div className="row center-md">
          <div className="col-md-10">
            <div className="row mt-10">
              <div className="col-md-12 text-left">
                <ul className="BreadCrumb mt-20">
                  <li className="text-xxs w-400">
                    <AppLink to="/">Back to Community</AppLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="c-asked-ques-detail position-relative mt-20">
                  <div className="c-asked-ques-area text-left">
                    <div className="heading c-asked-ques-name">
                      <h2 className="text-sm w-400 dgray">
                        What are the next 10 prime numbers after 47?
                      </h2>
                    </div>
                    <div className="sub-heading c-asked-question-detail">
                      <ul>
                        <li className="text-xxs dgray">
                          Asked by:
                          <span className="base">Raman Sisodia</span>
                        </li>
                        <li className="text-xxs dgray">
                          Asked on:
                          <span className="base">20 Jan. 2021 8:12 pm</span>
                        </li>
                      </ul>
                    </div>
                    <div className="c-asked-answer-all text-left">
                      <ul className="c-asked-answer-all-ui">
                        <li>
                          <button className="btnText">
                            <span className="bsPink">8 </span>Answers{" "}
                            <i className="animate-r-arrow-icon"></i>
                          </button>
                        </li>
                        <li>
                          <button className="btnText">
                            <i className="ed-icon icon-thumbup i-s gray"></i>
                            341
                          </button>
                        </li>
                        <li>
                          <button className="btnText">
                            <i className="ed-icon icon-thumbdown i-s dgray"></i>
                            8
                          </button>
                        </li>
                        <li>
                          <button className="btnText">
                            <i className="ed-icon icon-share i-s mgray"></i>
                            Share
                          </button>
                        </li>
                        <li className="text-right">
                          <button
                            className={`button button-${isActiveQuestionAnswer ? "gray" : "bsPink"
                              } white btn-sm`}
                            onClick={onClickQuestionAnswer}
                          >
                            Answer this Question
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    ref={dropdownQuestionAnswer}
                    className={`popup fullWidthPop ${isActiveQuestionAnswer ? "active" : "inactive"
                      }`}
                  >
                    <div className="position-relative">
                      <div className="pop-ques-ask">
                        <div className="ques-ans-area mt-8">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              placeholder="Write your question here"
                            ></textarea>
                          </div>
                        </div>
                        <div className="ques-ans-footer text-left mt-8">
                          <div className="ques-ans-upload">
                            <p className="dgray text-xxs w-300">
                              You can upload a picture of your question
                              (optional)
                            </p>
                            <button className="button btn-o-silver btn-sm">
                              <i className="ed-icon icon-camera gray i-xs"></i>
                              Upload Image
                            </button>
                          </div>
                          <div className="ques-ans-button">
                            <button className="button btn-o-silver btn-sm">
                              Cancel
                            </button>
                            <button className="button button-bsPink btn-sm">
                              Submit Answer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="c-ques-answered-area text-left">
                  <div className="c-answered-profile-img">
                    <img src={DummyProfile} alt="User Profile" />
                  </div>
                  <div className="c-answered-profile-detail">
                    <div className="c-answered-profile-m-grid">
                      <div className="c-answered-profile-m-g1">
                        <h3 className="heading text-xxs w-500 dgray">
                          Pallavi Singh
                        </h3>
                        <p className="sub-heading text-xxs w-400 dgay">
                          <span className="gray w-300">Answered on</span>
                          Jan 22, 2021 2:10 pm
                        </p>
                      </div>
                      <div className="c-answered-profile-m-g2 text-right">
                        <button className="button btnEditQuestion btn-sm btn-o-silver bsPink">
                          Edit
                        </button>
                        <button className="button btnDeleteQuestion btn-sm btn-o-silver bsPink">
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="c-answered-question-area mt-15">
                      <p className="text-xxs w-400">
                        The next ten primes after 47 are 53, 59, 61, 67, 71, 73,
                        79, 83, 89 and 97.
                      </p>
                    </div>
                    <div className="c-answered-question-actionBtn mt-15">
                      <button className="button btn-sm btn-o-silver">
                        <i className="ed-icon icon-thumbup i-s gray"></i>
                        24
                      </button>
                      <button className="button btn-sm btn-o-silver">
                        <i className="ed-icon icon-thumbdown i-s gray"></i>
                        80
                      </button>
                    </div>
                  </div>
                </div>
                <div className="c-ques-answered-area text-left">
                  <div className="c-answered-profile-img">
                    <img src={DummyProfile} alt="User Profile" />
                  </div>
                  <div className="c-answered-profile-detail">
                    <div className="c-answered-profile-m-grid">
                      <div className="c-answered-profile-m-g1">
                        <h3 className="heading text-xxs w-500 dgray">
                          Pallavi Singh
                        </h3>
                        <p className="sub-heading text-xxs w-400 dgay">
                          <span className="gray w-300">Answered on</span>
                          Jan 22, 2021 2:10 pm
                        </p>
                      </div>
                      <div className="c-answered-profile-m-g2 text-right"></div>
                    </div>
                    <div className="c-answered-question-area mt-15">
                      <p className="text-xxs w-400">
                        The next ten primes after 47 are 53, 59, 61, 67, 71, 73,
                        79, 83, 89 and 97.
                      </p>
                    </div>
                    <div className="c-answered-question-actionBtn mt-15">
                      <button className="button btn-sm btn-o-silver">
                        <i className="ed-icon icon-thumbup i-s gray"></i>
                        24
                      </button>
                      <button className="button btn-sm btn-o-silver">
                        <i className="ed-icon icon-thumbdown i-s gray"></i>
                        80
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="load-more-btn">
                  <button className="button button-mgray gray">
                    Loading more questions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
