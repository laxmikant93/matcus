/* eslint-disable no-empty-pattern */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getInvitationHistoryData,
  postTeacherDataInvite,
} from "../../../store/actions/inviteteacher";
import ValidationUtils from "../Classes/ValidationUtils";
import FormError from "../Common/Form/FormError";
import FormInput from "../Common/Form/FormInput";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ closeModalState }) => {
  const history = useNavigate();
  const [showEmailErr, setShowEmailErr] = useState(false);

  const [] = useState("");

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  const emptyFacultyFields = [
    {
      email: "",
      institute: "",
      owner: "",
      kind: "",
      isValid: "",
    },
  ];

  const [inputFields, setInputFields] = useState(emptyFacultyFields);

  const handleRemoveClick = (position) => {
    let newinputs = inputFields.filter((faculty, index) => index !== position);
    setInputFields([...newinputs]);
  };

  const handleAddClick = () => {
    let allNew = inputFields;
    allNew.push({
      email: "",
      isValid: false,
    });
    setInputFields([...allNew]);
  };

  const handleInput = (e, key) => {
    let inputValue = e.target.value;
    let allinputs = inputFields;
    allinputs[key]["email"] = inputValue;
    allinputs[key]["isValid"] =
      ValidationUtils.isEmail(inputValue) &&
      ValidationUtils.isNotEmpty(inputValue);
    allinputs[key]["email"] = inputValue;
    allinputs[key]["institute"] = user.user_institute;
    allinputs[key]["owner"] = user._id;
    allinputs[key]["kind"] = "teacher";

    setInputFields([...allinputs]);
    isEmailValid();
  };

  const isEmailValid = () => {
    let isValid = true;
    for (let key = 0; key < inputFields.length; key++) {
      const element = inputFields[key];
      if (
        !ValidationUtils.isEmail(element.email) ||
        ValidationUtils.isEmpty(element.email)
      ) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setShowEmailErr(false);
    } else {
      setShowEmailErr(true);
    }
    return isValid;
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidEmail = isEmailValid();

    if (isValidEmail) {
      dispatch(postTeacherDataInvite(inputFields));

      setTimeout(() => {
        dispatch(getInvitationHistoryData(user.user_institute));
      }, 300);

      closeModalState();
      setInputFields(emptyFacultyFields);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="modalHead">
          <div className="row">
            <div className="col-md-12">
              <h3 className="heading dgray text-sm w-300">Invite Teachers</h3>
              <p className="sub-heading text-xxs">
                You can invite up to 10 teachers at a time.
              </p>
            </div>
          </div>
        </div>

        <div className="modalbody">
          <div className="pageFullCenter">
            <div className="row">
              <div className="col-md-12">
                {inputFields.map((faculty, key) => {
                  return (
                    <div key={key}>
                      <div className="addSubWrapper">
                        <div className="formFieldwrap">
                          <FormInput
                            className={`form-control ${showEmailErr == true ? "errorInput" : ""
                              }`}
                            name={key}
                            type="email"
                            label="Email"
                            value={faculty.email}
                            onKeyUp={(e) => handleInput(e, key)}
                            onChange={(e) => handleInput(e, key)}
                            placeholder="Email address"
                          />

                          {showEmailErr == true && (
                            <FormError
                              show={!inputFields[key]["isValid"]}
                              error="Email is required."
                            ></FormError>
                          )}
                        </div>
                        {inputFields.length !== 1 && (
                          <button
                            type="button"
                            className="button btn-o-silver base btn-sm w-500"
                            onClick={() => handleRemoveClick(key)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {inputFields.length !== 10 && (
                  <button
                    type="button"
                    className="button btn-o-primary primary btn-sm w-500"
                    onClick={handleAddClick}
                  >
                    Invite More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="modalFooter">
          <div className="pageFullCenter">
            <div className="row">
              <div className="col-xs-12">
                <button
                  type="button"
                  className="button btn-md button-theme"
                  onClick={handleSubmit}
                >
                  Send Invitation <i className="animate-r-arrow-icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
