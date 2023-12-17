import React, { useState, useEffect } from "react";
import { func, bool } from "prop-types";

function TruefalseQuestionForm({
  onUpdated,
  validate,
  options,
  answer,
  questiontype,
}) {
  // For initial options
  const tfOptionIds = {
    one: Math.random().toFixed(6),
    two: Math.random().toFixed(6),
  };
  const correctAnsCount = 1;
  const [formValidate, setFormValidate] = useState(false);
  const [answerMarked, setanswerMarked] = useState(false);
  // const [ansOptions, setAnsOptions] = useState([tfOptionIds.one, tfOptionIds.two])

  const [option, setOption] = useState({
    [`option${tfOptionIds.one}`]: {
      value: "True",
      isValid: false,
      correct: false,
    },
    [`option${tfOptionIds.two}`]: {
      value: "False",
      isValid: false,
      correct: false,
    },
  });

  useEffect(() => {
    if (options && questiontype === "tf") {
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

  function prepareOption() {
    // Option prepare part
    let answerOptions = [];
    let correctAnswers = [];
    Object.keys(option).forEach((v) => {
      const optionItem = option[v];
      answerOptions.push(optionItem.value);
      if (optionItem.correct) {
        correctAnswers.push(optionItem.value);
      }
    });
    // return prepared option with validation
    return {
      isValid: tfFormValidation(),
      options: answerOptions,
      answer: correctAnswers,
    };
  }

  const handleAnswerSelection = (e, key) => {
    let allOptions = { ...option };
    Object.keys(allOptions).forEach((v) => {
      key === v
        ? (allOptions[v].correct = true)
        : (allOptions[v].correct = false);
    });
    setOption(allOptions);
    tfFormValidation();
    onUpdated(prepareOption());
  };

  const tfFormValidation = () => {
    let ansSelectCount = 0;
    Object.keys(option).forEach((v) => {
      const optionItem = option[v];
      if (optionItem.correct === true) {
        ansSelectCount = 1;
      }
    });
    setanswerMarked(ansSelectCount !== correctAnsCount);
    return ansSelectCount === correctAnsCount;
  };

  // errorInput
  useEffect(() => {
    if (formValidate !== validate) {
      setFormValidate(validate);
    }
    onUpdated(prepareOption());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, validate, formValidate]);

  useEffect(() => {
    return () => {
      onUpdated({
        isValid: tfFormValidation(),
        options: [],
        answer: [],
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {formValidate && answerMarked && (
        <p className="red mb-10">Please mark the correct option.</p>
      )}
      {Object.keys(option).length > 0 &&
        Object.keys(option).map((ansOption) => (
          <li
            key={`${ansOption}tf`}
            className="inline-input-output input-truefalse-output"
          >
            {option[ansOption].value === "True" ? (
              <div className="TF-text">True</div>
            ) : (
              <div className="TF-text">False</div>
            )}
            <div className="input-custom-type">
              <label
                className={`small ${option[ansOption].correct && "t-active"}`}
              >
                <input
                  type="radio"
                  checked={option[ansOption].correct}
                  onChange={(e) => handleAnswerSelection(e, ansOption)}
                  name={`answer${ansOption}`}
                />
                {option[ansOption].correct ? "Marked Correct" : "Mark Correct"}
              </label>
            </div>
          </li>
        ))}
    </React.Fragment>
  );
}

TruefalseQuestionForm.defaultProps = {
  onUpdated: () => {},
  validate: false,
};
TruefalseQuestionForm.propTypes = {
  onUpdated: func,
  validate: bool,
};

export default TruefalseQuestionForm;
