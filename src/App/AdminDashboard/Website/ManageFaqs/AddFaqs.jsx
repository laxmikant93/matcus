import React, { useState } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import FormError from "../../../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import { postFaq } from "../../../../store/actions/Faq";
import { useNavigate } from "react-router-dom";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import "./ManageFaqs.scss";
import TextEditor from "../../../../Common/Form/TextEditor";

const AddFaqs = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [questionError, setQuestionError] = useState(false);
  const [answerError, setAnswerError] = useState(false);
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  const InsID = useSelector((state) => state.user.user_institute);
  const isSuccess = useSelector((state) => state.faq.addFaq.success);
  const [isLoading, setIsLoading] = useState(false);

  let [faqs, setFaqs] = useState([
    {
      type: "Institute",
      institute: InsID,
      title: "",
      description: "",
      isQuestionValid: false,
      isAnswerValid: false,
    },
  ]);

  const isFaqsValid = () => {
    let isValid = true;
    for (let key = 0; key < faqs.length; key++) {
      const element = faqs[key];
      if (ValidationUtils.isEmpty(element.title)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setQuestionError(false);
    } else {
      setQuestionError(true);
    }
    return isValid;
  };

  const isFaqAnswerValid = () => {
    let isValid = true;
    for (let key = 0; key < faqs.length; key++) {
      const element = faqs[key];
      if (ValidationUtils.isEmpty(element.description)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setAnswerError(false);
    } else {
      setAnswerError(true);
    }
    return isValid;
  };

  const addMoreFaqs = () => {
    const faq = {
      type: "Institute",
      institute: InsID,
      title: "",
      description: "",
      isQuestionValid: false,
      isAnswerValid: false,
    };
    setFaqs([...faqs, faq]);
  };

  const handleQuestionChange = (e, key) => {
    let faqsField = e.target.value.trimStart();
    faqs[key]["title"] = faqsField;
    faqs[key]["isQuestionValid"] = ValidationUtils.isNotEmpty(faqsField);
    setFaqs([...faqs]);
    isFaqsValid();
  };

  const handleAnswerChange = (value, key) => {
    let faqsField = value;
    faqs[key]["description"] = faqsField;
    faqs[key]["isAnswerValid"] = ValidationUtils.isNotEmpty(faqsField);
    setFaqs([...faqs]);
    isFaqAnswerValid();
  };

  const removeFaq = (key) => {
    let faq = [...faqs];
    faq.splice(key, 1);
    setFaqs([...faq]);
  };

  const saveFaq = (e) => {
    e.preventDefault();
    const isValidTitle = isFaqsValid();
    const isValidDesc = isFaqAnswerValid();
    if (isValidTitle && isValidDesc) {
      if (user.user_business_type === "Ecommerce" || user.user_business_type === "Services") {
        for (let key = 0; key < faqs.length; key++) {
          faqs[key]["business"] = user.user_business;
        }
      }

      dispatch(postFaq(faqs, user.user_business_type));
      setIsLoading(true);
    }
  };

  // setTimeout(() => {
  isSuccess && history(`/manage-faqs`);
  // }, 1000);

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/manage-faqs" title="FAQs" />
        <BreadcrumbItem to="/add-faqs" title="Add FAQs" />
      </Breadcrumb>
      <div className="AddTestimonialHead mt-30">
        <p className="text-sm w-500">Add FAQs</p>
        <p className="text-xxs">You can add up to 5 FAQs at a time.</p>
      </div>
      {faqs.map((faqData, key) => {
        return (
          <div className="AddTestimonialListCst" key={key}>
            <div className="AddTestimonialList">
              <Card className="cardPadding">
                <CardBody>
                  <p className="mb-10 text-right">
                    {faqs.length !== 1 && (
                      <button
                        type="button"
                        className="btnText primary"
                        onClick={() => {
                          removeFaq(key);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </p>
                  <div className="formFieldwrap">
                    <FormInput
                      label="Question"
                      placeholder="Question"
                      name={key}
                      maxLength={500}
                      value={faqData.title}
                      onChange={(e) => handleQuestionChange(e, key)}
                      onKeyUp={(e) => handleQuestionChange(e, key)}
                    />
                    {questionError === true && (
                      <FormError
                        show={!faqs[key]["isQuestionValid"]}
                        error="Question is required."
                      ></FormError>
                    )}
                  </div>
                  <div className="formFieldwrap">
                    {/* <FormTextArea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      type="text"
                      placeholder="Write your answer here."
                      label="Answer"
                      name="description"
                      style={{ whiteSpace: " pre-wrap" }}
                      maxLength="2000"
                      TextareaBtmTxt="2000"
                      value={faqData.description}
                      onChange={(e) => handleAnswerChange(e, key)}
                      onKeyUp={(e) => handleAnswerChange(e, key)}
                    ></FormTextArea> */}
                    <TextEditor
                      preFilledData={faqData.description}
                      currentResponse={(value) => handleAnswerChange(value, key)}
                    />
                    {answerError === true && (
                      <FormError
                        show={!faqs[key]["isAnswerValid"]}
                        error="Answer is required."
                      ></FormError>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        );
      })}
      <div className="mt-40">
        {faqs.length < 5 && (
          <button className="button button-primary btn-sm" onClick={addMoreFaqs}>
            Add More
          </button>
        )}
      </div>
      <div className="mt-40">
        {!isLoading ? (
          <button className="button btn-md button-theme btn-md" onClick={saveFaq}>
            Publish FAQs
          </button>
        ) : (
          <button className="button btn-md button-theme btn-md">Loading...</button>
        )}
      </div>
    </React.Fragment>
  );
};

export default AddFaqs;
