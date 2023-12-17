import FormInput from "../../../Common/Form/FormInput";
import FormError from "../../../Common/Form/FormError";
import React, { useEffect, useState } from "react";
import Validation from "../../../Classes/Validation";
import { func, bool } from "prop-types";
const validateForm = new Validation();

function MultiQuestionForm({
  onUpdated,
  validate,
  options,
  answer,
  questiontype,
}) {
  // For initial options
  const optionIds = {
    one: Math.random().toFixed(6),
    two: Math.random().toFixed(6),
    three: Math.random().toFixed(6),
    four: Math.random().toFixed(6),
  };
  const inputLimit = 10;
  const correctAnsCount = 2;
  const [formValidate, setFormValidate] = useState(false);
  const [answerMarked, setanswerMarked] = useState(false);

  const [option, setOption] = useState({
    [`option${optionIds.one}`]: {
      value: "",
      isValid: false,
      correct: false,
    },
    [`option${optionIds.two}`]: {
      value: "",
      isValid: false,
      correct: false,
    },
    [`option${optionIds.three}`]: {
      value: "",
      isValid: false,
      correct: false,
    },
    [`option${optionIds.four}`]: {
      value: "",
      isValid: false,
      correct: false,
    },
  });

  useEffect(() => {
    if (options && questiontype === "multi") {
      let tempOptions = {};
      options.forEach((value) => {
        Object.assign(tempOptions, {
          [`option${Math.random().toFixed(6)}`]: {
            value: value,
            isValid: true,
            correct: answer.includes(value) ? true : false,
          },
        });
      });
      setOption(tempOptions);
    }
  }, [options, answer, questiontype]);

  const handleAddMoreOption = () => {
    const optionKey = Math.random().toFixed(6);
    // And in option
    const allOptions = {
      ...option,
      [`option${optionKey}`]: {
        value: "",
        isValid: false,
        correct: false,
      },
    };
    setOption(allOptions);
  };

  const handleRemoveMoreOption = (optionId) => {
    // Remove option from `option` object
    const unremovedOptions = Object.keys(option).reduce((object, key) => {
      if (key !== optionId) {
        object[key] = option[key];
      }
      return object;
    }, {});
    setOption(unremovedOptions);
    onUpdated(prepareOption());
  };

  const handleInputAnswer = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    let prevState = { ...option };
    prevState = {
      ...prevState,
      [inputName]: {
        ...prevState[inputName],
        value: inputValue,
        isValid: validateForm.isNotEmpty(inputValue),
      },
    };
    setOption(prevState);
    onUpdated(prepareOption());
  };

  function prepareOption() {
    // Option prepare part
    let answerOptions = [];
    let correctAnswers = [];
    Object.keys(option).forEach((v) => {
      const optionItem = option[v];
      if (optionItem.isValid) {
        answerOptions.push(optionItem.value);
      }
      if (optionItem.isValid && optionItem.correct) {
        correctAnswers.push(optionItem.value);
      }
    });
    // return prepared option with validation
    return {
      isValid: multiFormValidation(),
      options: answerOptions,
      answer: correctAnswers,
    };
  }

  const handleAnswerSelection = (e, key, value) => {
    let allOptions = { ...option };
    Object.keys(allOptions).forEach((v) => {
      key === v
        ? (allOptions[v].correct = !value)
        : (allOptions[v].correct = option[v].correct);
    });
    setOption(allOptions);
    multiFormValidation();
    onUpdated(prepareOption());
  };

  const multiFormValidation = () => {
    let ansSelectCount = 0;
    let ansInputFilled = [];
    Object.keys(option).forEach((v) => {
      const optionItem = option[v];
      ansInputFilled.push(optionItem.isValid);
      ansSelectCount =
        optionItem.correct === true ? ansSelectCount + 1 : ansSelectCount;
    });
    setanswerMarked(ansSelectCount < correctAnsCount);
    return ansSelectCount >= correctAnsCount && !ansInputFilled.includes(false);
  };

  // errorInput
  useEffect(() => {
    if (formValidate !== validate) {
      setFormValidate(validate);
    }
    onUpdated(prepareOption());
    multiFormValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, validate, formValidate]);

  return (
    <React.Fragment>
      {formValidate && answerMarked && (
        <p className="red mb-10">
          Please mark at least ({correctAnsCount}) correct options.
        </p>
      )}
      {Object.keys(option).length > 0 &&
        Object.keys(option).map((ansOption) => (
          <React.Fragment key={`${ansOption}multi`}>
            <div className="formFieldwrap">
              <div key={`${ansOption}multi`} className="inline-input-output">
                <FormInput
                  className={
                    formValidate && !option[ansOption].isValid
                      ? "errorInput"
                      : ""
                  }
                  defaultValue={option[ansOption].value}
                  name={ansOption}
                  onChange={handleInputAnswer}
                  onKeyUp={handleInputAnswer}
                  type="text"
                  placeholder="Answer"
                />
                <div className="input-custom-type">
                  <label
                    className={`small ${option[ansOption].correct && "t-active"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={option[ansOption].correct}
                      onChange={(e) =>
                        handleAnswerSelection(
                          e,
                          ansOption,
                          option[ansOption].correct
                        )
                      }
                      name={`answer${ansOption}`}
                    />
                    <span className="text">
                      {option[ansOption].correct ? "Marked" : "Mark"} Correct
                    </span>
                  </label>
                </div>
                {Object.keys(option).length > 4 && (
                  <button
                    className="button btn-o-mgray btn-sm"
                    onClick={() => handleRemoveMoreOption(ansOption)}
                  >
                    Remove
                  </button>
                )}
              </div>
              <FormError
                show={formValidate && !option[ansOption].isValid}
                error="Please fill the answer."
              />
            </div>
          </React.Fragment>
        ))}
      {Object.keys(option).length < inputLimit && (
        <button
          className="button btn-o-mgray btn-sm"
          onClick={handleAddMoreOption}
        >
          Add More
        </button>
      )}
    </React.Fragment>
  );
}

MultiQuestionForm.defaultProps = {
  onUpdated: () => { },
  validate: false,
};
MultiQuestionForm.propTypes = {
  onUpdated: func,
  validate: bool,
};

export default MultiQuestionForm;
