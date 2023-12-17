import React, { useState } from 'react';
import BackgroundDefault from "../../../../src/assets/images/img/BackgroundDefault.png";
import FormInput from "../../../Common/Form/FormInput";
import "../../OnlineExamStudent/OnlineExamStudent.scss";
const FillUpQuestion = () => {
  const [institute_about_upload, set_institute_about_upload] = useState("");
  const [institute_intro_video, set_institute_intro_video] = useState("");
  const removeAboutImage = () => {
    set_institute_about_upload("");
  };
  const removeIntroVideo = () => {
    set_institute_intro_video("")
  }

  return (
    <div className="q-match-list-wrap">
      <ul className="q-match-list-cst mb-30">
        <li className="">
          <div className="">
            <div className="mb-0">
              <div className='mb-20 fill-form'>
                <FormInput
                  type="text"
                  placeholder=""
                  className="mb-2"
                />
                <em className=''>Question format : Number of planet in our solar system is [TEN]</em>
              </div>

              <div className="formFieldwrap optional-file-upload fillup-file">
                <p className="text-xs  w-600 mb-5">
                  Upload question as file (optional).
                </p>
                <ul className="DashedInstructionList">
                  <li className="text-xxs">
                    Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4
                  </li>
                  <li className="text-xxs mb-10">Max File size allowed is 10MB.</li>
                </ul>
                <div className="file-input-wrapper file-fill-up"><label className="hidden">Upload file</label><input type="file" className="form-control undefined" name="0.5174682587509953" /><div className="file-input-overlap"><i className="ed-icon icon-file-upload base i-xs"></i><span className="text-xxs">Upload file</span></div></div>
              </div>
            </div>
          </div>
        </li>
        <li className="">
          <div className="">
            <div className="mb-0">
              <div className='mb-20 fill-form'>
                <FormInput
                  type="text"
                  placeholder=""
                  className="mb-2"
                />
                <em className=''>Question format : Number of planet in our solar system is [TEN]</em>
              </div>
              <div className="formFieldwrap optional-file-upload fillup-file">
                <p className="text-xs  w-600 mb-5">
                  Upload question as file (optional).
                </p>
                <ul className="DashedInstructionList">
                  <li className="text-xxs">
                    Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4
                  </li>
                  <li className="text-xxs mb-10">Max File size allowed is 10MB.</li>
                </ul>
                <div className="MIW-AboutImagePreview">
                  <img
                    className="MIW-AboutImgPreview img-fluid"
                    src={
                      institute_about_upload
                        ? institute_about_upload
                        : BackgroundDefault
                    }
                    alt="About preview"
                  />
                </div>
                <div className="d-flex">
                  <button className="button btn-sm btn-o-secondary secondary mt-8">Edit</button>&nbsp;&nbsp;
                  <button className="button btn-sm btn-o-red red mt-8">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="">
          <div className="">
            <div className="mb-0">
              <div className='mb-20 fill-form'>
                <FormInput
                  type="text"
                  placeholder=""
                  className="mb-2"
                />
                <em className=''>Question format : Number of planet in our solar system is [TEN]</em>
              </div>

              <div className="formFieldwrap optional-file-upload fillup-file">
                <p className="text-xs  w-600 mb-5">
                  Upload question as file (optional).
                </p>
                <ul className="DashedInstructionList">
                  <li className="text-xxs">
                    Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4
                  </li>
                  <li className="text-xxs mb-10">Max File size allowed is 10MB.</li>
                </ul>
                <div className="MIW-IntroVideoRight Question-video ">
                  <div className="">
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
                <div className="d-flex">
                  <button className="button btn-sm btn-o-secondary secondary mt-8">Edit</button>&nbsp;&nbsp;
                  <button className="button btn-sm btn-o-red red mt-8">Remove</button>
                </div>
              </div>

            </div>
          </div>
        </li>
        <li className="">
          <div className="">
            <div className="mb-0">
              <div className='mb-20 fill-form'>
                <FormInput
                  type="text"
                  placeholder=""
                  className="mb-2"
                />
                <em className=''>Question format : Number of planet in our solar system is [TEN]</em>
              </div>

              <div className="formFieldwrap optional-file-upload fillup-file">
                <p className="text-xs w-600 mb-5">
                  Upload question as file (optional).
                </p>
                <ul className="DashedInstructionList">
                  <li className="text-xxs">
                    Files accepted .PNG, .JPG, .JPEG, .PDF, .MP3, .MP4
                  </li>
                  <li className="text-xxs mb-10">Max File size allowed is 10MB.</li>
                </ul>
                <div className="wrapper-audio">
                  <audio controls preload="metadata" controlsList="nodownload noplaybackrate">
                    <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg" />
                  </audio>
                </div>
                <div className="d-flex">
                  <button className="button btn-sm btn-o-secondary secondary mt-8">Edit</button>&nbsp;&nbsp;
                  <button className="button btn-sm btn-o-red red mt-8">Remove</button>
                </div>
              </div>

            </div>
          </div>
        </li>
        <span>Note :  Text box and file upload fields will be displayed to the participant.</span>
      </ul>
    </div>
  )
}

export default FillUpQuestion