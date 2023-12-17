import React from "react";
import FormInput from "../../Common/Form/FormInput";
import FormTextArea from "../../Common/Form/FormTextArea";
import PPRightTopArt from "../../assets/images/img/PP-RightTopArt.svg";
import PPLeftBottomArt from "../../assets/images/img/PP-LeftBottomArt.svg";
const ProfileAskQuestion = () => {
  return (
    <div className="PublicProfileAskQuestion">
      <div className="PublicProfileAskQuestionHead">
        <p className="text-sm">Ask a question from Meenal</p>
      </div>
      <div className="PublicProfileAskQuestionForm">
        <div className="formFieldwrap">
          <FormTextArea
            label="Enter your Question"
            rows="4"
            placeholder="Message"
          />
        </div>
        <div className="formFieldwrap">
          <FormInput type="text" label="Full Name" placeholder="Full Name" />
        </div>
        <div className="formFieldwrap">
          <FormInput
            type="email"
            label="Enter Email"
            placeholder="Enter Email"
          />
        </div>
        <div className="formFieldwrap">
          <FormInput type="text" label="Contact" placeholder="Contact" />
        </div>
        <button className="button btn-md button-theme button-block">
          Submit Question
        </button>
      </div>
      <div className="PP-RightTopArt">
        <img src={PPRightTopArt} alt="Artwork" />
      </div>
      <div className="PP-LeftBottomArt">
        <img src={PPLeftBottomArt} alt="Artwork" />
      </div>
    </div>
  );
};

export default ProfileAskQuestion;
