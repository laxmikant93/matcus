import React, { useState, useEffect } from 'react'
import { func, bool } from "prop-types";
import Validation from "../../../Classes/Validation";
const validateForm = new Validation();

const withFunctionalities =
  (WrappedComponent, options, answer, questiontype, onUpdated, validate) => {
    const WithFunctionalities = () => {
      const optionIds = {
        one: Math.random().toFixed(6),
        two: Math.random().toFixed(6),
        three: Math.random().toFixed(6),
        four: Math.random().toFixed(6),
      };
      const correctAnsCount = 2;
      const [formValidate, setFormValidate] = useState(false);
      const [answerMarked, setAnswerMarked] = useState(false);

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

      // useEffect(() => {
      //   if (options && questiontype === "multi") {
      //     let tempOptions = {};
      //     options.forEach((value) => {
      //       Object.assign(tempOptions, {
      //         [`option${Math.random().toFixed(6)}`]: {
      //           value: value,
      //           isValid: true,
      //           correct: answer.includes(value) ? true : false,
      //         },
      //       });
      //     });
      //     setOption(tempOptions);
      //   }
      // }, [options, answer, questiontype]);

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
        setAnswerMarked(ansSelectCount < correctAnsCount);
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
        <WrappedComponent
          handleAnswerSelection={handleAnswerSelection}
          handleInputAnswer={handleInputAnswer}
          handleAddMoreOption={handleAddMoreOption}
          handleRemoveMoreOption={handleRemoveMoreOption}
          answerMarked={answerMarked}
        />
      )
    }
    WithFunctionalities.defaultProps = {
      onUpdated: () => { },
      validate: false,
    };
    WithFunctionalities.propTypes = {
      onUpdated: func,
      validate: bool,
    };
    return WithFunctionalities
  }

export default withFunctionalities
