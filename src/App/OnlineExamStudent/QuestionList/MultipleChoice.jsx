import React, { useState, useEffect } from "react";
import { func } from "prop-types";

const MultipleChoice = ({ option, questionId, onUpdated, selectedAnswers }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let optionData = [];
    option.forEach((value) => {
      optionData.push({
        value: value,
        correct:
          selectedAnswers && selectedAnswers.includes(value) ? true : false,
      });
    });
    setOptions([...optionData]);
  }, [option, selectedAnswers]);

  const handleSelectedOption = (superkey, value) => {
    let allOptions = [...options];
    allOptions.forEach((v, subkey) => {
      if (superkey === subkey) v.correct = !value;
    });
    setOptions([...allOptions]);
    onUpdated(getMarkedAnswer);
  };

  const getMarkedAnswer = () => {
    let markedAnswer = [];
    options.forEach((opt) => {
      if (opt.correct) {
        markedAnswer.push(opt.value);
      }
    });
    return {
      questionId: questionId,
      selectedOptions: markedAnswer,
    };
  };

  return options.map((item, key) => {
    return (
      <React.Fragment key={key}>
        <div className="input-custom-type">
          <label
            className={`small ${selectedAnswers &&
              selectedAnswers.includes(item.value) &&
              "s-active"
              }`}
          >
            <input
              key={key}
              type="checkbox"
              name={`multi-${key}`}
              onChange={() => handleSelectedOption(key, item.correct)}
              defaultChecked={
                selectedAnswers && selectedAnswers.includes(item.value)
                  ? true
                  : false
              }
            />
            {item.value}
          </label>
        </div>
      </React.Fragment>
    );
  });
};

MultipleChoice.defaultProps = {
  onUpdated: () => { },
};
MultipleChoice.propTypes = {
  onUpdated: func,
};

export default MultipleChoice;
