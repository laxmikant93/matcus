import React, { useState, useEffect } from "react";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import FormError from "../../../../Common/Form/FormError";
import ValidationFile from "../../../../Classes/ValidationFile";
import {
  updateFaqList,
  resetSingleFaqInfo,
} from "../../../../store/actions/Faq";
import { useDispatch, useSelector } from "react-redux";
import "./ManageFaqs.scss";
import TextEditor from "../../../../Common/Form/TextEditor";

function EditFaq({ closePopup }) {
  const dispatch = useDispatch();

  const getSingleFaqData = useSelector((state) => state.faq.singleFaqData);
  const isSuccess = useSelector((state) => state.faq.updateFaq.success);
  const InsID = useSelector((state) => state.user.user_institute);
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  const [showError, setShowError] = useState(false);
  const [isFilled, setisFilled] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (getSingleFaqData.data && getSingleFaqData.success && !isFilled) {
    setisFilled(true);
    setTitle(getSingleFaqData.data.title);
    setDescription(getSingleFaqData.data.description);
  }

  const inputHandel = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trimStart();

    switch (inputName) {
      case "title":
        setTitle(inputValue);
        setTitleError(ValidationFile.isEmpty(inputValue));
        break;
      case "description":
        setDescription(inputValue);
        setDescriptionError(ValidationFile.isEmpty(inputValue));
        break;
      default:
        return false;
    }
  };

  const handleAnswerChange = (value) => {
    setDescription(value);
    setDescriptionError(ValidationFile.isEmpty(value));
  }

  const handleClose = () => {
    dispatch(resetSingleFaqInfo());
    setisFilled(false);
    setShowError(false);
    closePopup();
  };

  const editedFaqData = () => {
    return {
      title: title,
      description: description,
    };
  };

  const handleUpdateFaq = (e) => {
    e.preventDefault();
    setShowError(true);

    if (ValidationFile.isEmpty(title)) {
      setTitleError(true);
    }
    if (ValidationFile.isEmpty(description)) {
      setDescriptionError(true);
    }
    if (
      !ValidationFile.isEmpty(title) &&
      !ValidationFile.isEmpty(description)
    ) {
      dispatch(updateFaqList(getSingleFaqData.data._id, editedFaqData(), user.user_business_type));
      dispatch(resetSingleFaqInfo());
      setisFilled(false);
      setShowError(false);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    closePopup();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="modalwrapper">
      <span className="closeModal dgray text-xxs" onClick={handleClose}>
        Close
      </span>
      <div className="modalHead">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-sm w-300">Update FAQ</h3>
          </div>
        </div>
      </div>
      <form onSubmit={handleUpdateFaq}>
        <div className="modalbody">
          <div className="pageFullCenter">
            <div className="row mt-20">
              <div className="col-xs-12">
                <div className="formFieldwrap">
                  <FormInput
                    name="title"
                    value={title}
                    onChange={inputHandel}
                    label="Question"
                    placeholder="Question"
                    maxLength="500"
                  />
                  <FormError
                    show={titleError && showError}
                    error="Question is required."
                  />
                </div>
                <div className="formFieldwrap">
                  <div className="formFieldwrap mt-10">
                    {/* <FormTextArea
                      id="exampleFormControlTextarea1"
                      rows="5"
                      type="text"
                      placeholder="Write Your answer here."
                      label="Answer"
                      name="description"
                      style={{ whiteSpace: " pre-wrap" }}
                      maxLength="2000"
                      TextareaBtmTxt="2000"
                      value={description}
                      onChange={inputHandel}
                    /> */}
                    <TextEditor
                      preFilledData={description}
                      currentResponse={(value) => handleAnswerChange(value)}
                    />
                    <label className="animLabel" htmlFor="description">
                      Question Answer
                    </label>
                    <FormError
                      show={descriptionError && showError}
                      error="Answer is required."
                    ></FormError>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modalFooter">
          <div className="pageFullCenter">
            <div className="row ">
              <div className="col-xs-12">
                {!isLoading ? (
                  <button className="button btn-md button-theme btn-md" type="submit">
                    Update Question
                  </button>
                ) : (
                  <button className="button btn-md button-theme btn-md">Loading...</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditFaq;
