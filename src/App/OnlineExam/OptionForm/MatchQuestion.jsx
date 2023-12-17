import React, { useState } from "react";
import BackgroundDefault from "../../../../src/assets/images/img/BackgroundDefault.png";
import FormInput from "../../../Common/Form/FormInput";
import "../../OnlineExamStudent/OnlineExamStudent.scss";
const MatchQuestion = () => {
  const [institute_about_upload, set_institute_about_upload] = useState("");
  const [institute_intro_video, set_institute_intro_video] = useState("");
  const removeAboutImage = () => {
    set_institute_about_upload("");
  };
  const removeIntroVideo = () => {
    set_institute_intro_video("")
  }

  return (
    <div className="student-online-test">
      <div className="">
        <div className="q-option-area">
          <div className="q-match-grid mt-20">
            <div className="q-match-grid-head head-gap">
              <div className="promt-head text-xs w-700">
                Prompts
              </div>
              <div className="answer-head text-sm w-700">
                Answers
              </div>
            </div>
            <div className="q-match-list-wrap">
              <ul className="q-match-list-cst mb-30">
                <li className="">
                  <div className="question-grid">
                    <span className="font count-question"></span>
                    <div className="mb-0">
                      <FormInput
                        type="text"
                        placeholder="Pig is a"
                        className="mb-20"
                      />
                      <div className="file-grid">
                        <div className="file-input-wrapper"><label className="hidden">Upload file</label><input type="file" className="form-control undefined" name="0.5174682587509953" /><div className="file-input-overlap"><i className="ed-icon icon-file-upload base i-xs"></i><span className="text-xxs">Upload file</span></div></div>
                        <label htmlFor="#" className="badge">!
                          <span id="tool" className="tooltip">
                            <div className="tooltip-label">
                              <h4 className=" base mb-5">Upload question as file (optional).</h4>
                              <p className="mb-2"><small>Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4</small></p>
                              <p><small>Max File size allowed is 10MB.</small></p>
                            </div>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="q-match-answer">
                  <div className="formFieldwrap">
                    <div className="formFieldwrap">
                      <FormInput
                        className="border-0"
                        type="text"
                        placeholder="Lion is a"
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="q-match-list-cst mb-30">
                <li className="">
                  <div className="question-grid">
                    <span className="font count-question"></span>
                    <div className="mb-0">
                      <FormInput
                        type="text"
                        placeholder="Herbivorous"
                        className="mb-20"
                      />
                      <div className="file-grid">
                        <div className="file-input-wrapper"><label className="hidden">Upload file</label><input type="file" className="form-control undefined" name="0.5174682587509953" /><div className="file-input-overlap"><i className="ed-icon icon-file-upload base i-xs"></i><span className="text-xxs">Upload file</span></div></div>
                        <label htmlFor="#" className="badge">!
                          <span id="tool" className="tooltip">
                            <div className="tooltip-label">
                              <h4 className=" base mb-5">Upload question as file (optional).</h4>
                              <p className="mb-2"><small>Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4</small></p>
                              <p><small>Max File size allowed is 10MB.</small></p>
                            </div>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="q-match-answer">
                  <div className="formFieldwrap">
                    <div className="formFieldwrap">
                      <FormInput
                        className="border-0"
                        type="text"
                        placeholder="Carnivorious"
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="q-match-list-cst mb-30">
                <li className="">
                  <div className="question-grid">
                    <span className="font count-question"></span>
                    <div className="mb-0">
                      <FormInput
                        type="text"
                        placeholder="Elephant is a "
                        className="mb-10"
                      />
                      <div className="file-grid mb-5 d-none">
                        {/* <div className="file-input-wrapper"><label className="hidden">Upload file</label><input type="file" className="form-control undefined" name="0.5174682587509953" /><div className="file-input-overlap"><i className="ed-icon icon-file-upload base i-xs"></i><span className="text-xxs">Upload file</span></div></div> */}
                        {/* <label htmlFor="#" className="badge">!
                          <span id="tool" className="tooltip">
                            <div className="tooltip-label">
                              <h4 className=" base mb-5">Upload question as file (optional).</h4>
                              <p className="mb-2"><small>Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4</small></p>
                              <p><small>Max File size allowed is 10MB.</small></p>
                            </div>
                          </span>
                        </label> */}
                      </div>
                      <div className="MIW-AboutUploadImageRight">
                        <div className="MIW-AboutImagePreview">
                          <img
                            className="MIW-AboutImgPreview"
                            src={
                              institute_about_upload
                                ? institute_about_upload
                                : BackgroundDefault
                            }
                            alt="About preview"
                          />
                        </div>
                        <div className="d-flex">
                          <button className="button btn-sm btn-o-secondary secondary mt-8 ">Edit</button>&nbsp;&nbsp;
                          <button className="button btn-sm btn-o-red red mt-8">Remove</button>
                        </div>
                        {institute_about_upload && (
                          <button
                            className="button btn-sm btn-o-red red mt-8"
                            onClick={removeAboutImage}
                          >
                            {" "}
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="q-match-answer">
                  <div className="formFieldwrap">
                    <div className="formFieldwrap">
                      <FormInput
                        className="border-0"
                        type="text"
                        placeholder="Herbivorous"
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="q-match-list-cst mb-30">
                <li className="">
                  <div className="question-grid">
                    <span className="font count-question"></span>
                    <div className="mb-0">
                      <FormInput
                        type="text"
                        placeholder="Animal in this video is?"
                        className="mb-20"
                      />
                      {/* <div className="file-grid mb-5">
                        <div className="file-input-wrapper"><label className="hidden">Upload file</label><input type="file" className="form-control undefined" name="0.5174682587509953" /><div className="file-input-overlap"><i className="ed-icon icon-file-upload base i-xs"></i><span className="text-xxs">Upload file</span></div></div>
                        <label htmlFor="#" className="badge">!
                          <span id="tool" className="tooltip">
                            <div className="tooltip-label">
                              <h4 className=" base mb-5">Upload question as file (optional).</h4>
                              <p className="mb-2"><small>Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4</small></p>
                              <p><small>Max File size allowed is 10MB.</small></p>
                            </div>
                          </span>
                        </label>

                      </div> */}
                      <div className="MIW-IntroVideoRight">
                        <div className="MIW-IntroVideoPreview Question-video ">
                          {institute_intro_video &&
                            institute_intro_video.includes(".mp4") ? (
                            <video
                              height="180"
                              src={institute_intro_video && institute_intro_video}
                              controls
                              className="gallery-thumnail"
                              alt=""
                            ></video>
                          ) : institute_intro_video &&
                            institute_intro_video.includes("embed") ? (
                            <iframe
                              title="youtube video"
                              src={institute_intro_video && institute_intro_video}
                              frameborder="0"
                              width="350"
                              height="250"
                            ></iframe>
                          ) : (
                            <video
                              height="180"
                              src=""
                              controls
                              className="gallery-thumnail"
                              alt=""
                            ></video>
                          )}
                        </div>
                        <div className="d-flex">
                          <button className="button btn-sm btn-o-secondary secondary mt-8">Edit</button>&nbsp;&nbsp;
                          <button className="button btn-sm btn-o-red red mt-8">Remove</button>
                        </div>
                        {institute_intro_video && (
                          <button
                            className="button btn-sm btn-o-red red mt-8"
                            onClick={removeIntroVideo}
                          >
                            {" "}
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="q-match-answer">
                  <div className="formFieldwrap">
                    <div className="formFieldwrap">
                      <FormInput
                        className="border-0"
                        type="text"
                        placeholder="Carnivorious"
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="q-match-list-cst mb-30">
                <li className="">
                  <div className="question-grid">
                    <span className="font count-question"></span>
                    <div className="mb-0">
                      <FormInput
                        type="text"
                        placeholder="Animal in this audio is?"
                        className="mb-20"
                      />
                      {/* <div className="file-grid">
                        <div className="file-input-wrapper"><label className="hidden">Upload file</label><input type="file" className="form-control undefined" name="0.5174682587509953" /><div className="file-input-overlap"><i className="ed-icon icon-file-upload base i-xs"></i><span className="text-xxs">Upload file</span></div></div>
                        <label htmlFor="#" className="badge">!
                          <span id="tool" className="tooltip">
                            <div className="tooltip-label">
                              <h4 className=" base mb-5">Upload question as file (optional).</h4>
                              <p className="mb-2"><small>Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4</small></p>
                              <p><small>Max File size allowed is 10MB.</small></p>
                            </div>
                          </span>
                        </label>
                      </div> */}
                      <div className="wrapper-audio">
                        <audio controls preload="metadata" controlsList="nodownload noplaybackrate">
                          <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg" />
                        </audio>
                      </div>
                      <div className="d-flex">
                        <button className="button btn-sm btn-o-secondary secondary mt-8">Edit</button>&nbsp;&nbsp;
                        <button className="button btn-sm btn-o-red red mt-8">Remove</button>
                      </div>
                      {institute_intro_video && (
                        <button
                          className="button btn-sm btn-o-red red mt-8"
                          onClick={removeIntroVideo}
                        >
                          {" "}
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </li>
                <li className="q-match-answer">
                  <div className="formFieldwrap">
                    <div className="formFieldwrap">
                      <FormInput
                        className="border-0"
                        type="text"
                        placeholder="Herbivorous"
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="q-match-list-cst mb-30">
                <li className="">
                  <div className="question-grid">
                    <span className="font count-question"></span>
                    <div className="mb-0">
                      <FormInput
                        type="text"
                        placeholder="Elephant is a"
                        className="mb-20"
                      />
                      <div className="file-grid">
                        <div className="file-input-wrapper"><label className="hidden">Upload file</label><input type="file" className="form-control undefined" name="0.5174682587509953" /><div className="file-input-overlap"><i className="ed-icon icon-file-upload base i-xs"></i><span className="text-xxs">Upload file</span></div></div>
                        <label htmlFor="#" className="badge">!
                          <span id="tool" className="tooltip">
                            <div className="tooltip-label">
                              <h4 className=" base mb-5">Upload question as file (optional).</h4>
                              <p className="mb-2"><small>Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4</small></p>
                              <p><small>Max File size allowed is 10MB.</small></p>
                            </div>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="q-match-answer">
                  <div className="formFieldwrap">
                    <div className="formFieldwrap">
                      <FormInput
                        className="border-0"
                        type="text"
                        placeholder="Carnivorious"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchQuestion