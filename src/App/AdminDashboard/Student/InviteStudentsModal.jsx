import React, { useEffect, useState } from "react";
import FormInput from "../Common/Form/FormInput";
import ValidationUtils from "../Classes/ValidationUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentInvitationHistoryData,
  postStudentData,
} from "../store/actions/student";
import { getCourseData } from "../store/actions/courses";
import FormError from "../Common/Form/FormError";
import SelectInput from "../../../Common/Form/SelectInput";

export default function InviteStudentsModal({ closeModalState }) {

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseData(user.user_institute));
  }, [dispatch, user]);

  const courses = useSelector((state) => state.courses.list.data);
  const [showCourseError, setShowCourseError] = useState(false);
  const [showEmailError, setShowEmailErr] = useState(false);

  const emptyStudentFields = [
    {
      email: "",
      course: "",
      isValidEmail: false,
      isValidCourse: false,
    },
  ];

  const [studentFields, setStudentFields] = useState(emptyStudentFields);

  const handleRemoveClick = (position) => {
    let newinputs = studentFields.filter(
      (student, index) => index !== position
    );
    setStudentFields([...newinputs]);
  };

  const handleAddClick = () => {
    let allNew = studentFields;
    allNew.push({
      email: "",
      course: "",
      isValidEmail: false,
      isValidCourse: false,
    });

    setStudentFields([...allNew]);
  };

  const handleInput = (e, key) => {
    let inputValue = e.target.value;
    let allinputs = studentFields;
    allinputs[key]["email"] = inputValue;
    allinputs[key]["isValidEmail"] =
      ValidationUtils.isEmail(inputValue) &&
      ValidationUtils.isNotEmpty(inputValue);
    allinputs[key]["kind"] = "student";
    allinputs[key]["institute"] = user.user_institute;
    allinputs[key]["owner"] = user._id;

    setStudentFields([...allinputs]);
    isEmailValid();
  };

  const handleChange = (e, key) => {
    let value = e.target.value;
    let allinputs = studentFields;
    allinputs[key]["course"] = value;
    allinputs[key]["isValidCourse"] = ValidationUtils.isNotEmpty(value);

    setStudentFields([...allinputs]);
    isCourseFormValid();
  };

  const isEmailValid = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
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

  const isCourseFormValid = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
      if (ValidationUtils.isEmpty(element.course)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setShowCourseError(false);
    } else {
      setShowCourseError(true);
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidEmail = isEmailValid();
    const isCourseValid = isCourseFormValid();
    if (isCourseValid && isValidEmail) {
      dispatch(postStudentData(studentFields));
      setTimeout(() => {
        dispatch(getStudentInvitationHistoryData(user.user_institute));
      }, 300);
      closeModalState();

      setStudentFields(emptyStudentFields);
    }
  };
  return (
    <React.Fragment>
      <div className="modalHead">
        <div className="pageFullCenter">
          <div className="row">
            <div className="col-md-12">
              <h3 className="heading dgray text-sm w-300">Invite Students</h3>
              <p className="sub-heading text-xxs">
                You can invite up to 10 students at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modalbody">
        <div className="row">
          <div className="col-md-12">
            {studentFields.map((student, key) => {
              return (
                <div key={key}>
                  <div className="addSubWrapperGrid">
                    <div className="formFieldwrap">
                      <FormInput
                        className={showEmailError ? "errorInput" : ""}
                        name={key}
                        type="email"
                        label="Email"
                        onChange={(e) => handleInput(e, key)}
                        value={student.email}
                        placeholder="Email address"
                      />
                      {showEmailError && (
                        <FormError
                          show={!studentFields[key]["isValidEmail"]}
                          error="Email is required."
                        ></FormError>
                      )}
                    </div>
                    <div className="formFieldwrap">

                      <SelectInput
                        onChange={(e) => handleChange(e, key)}
                        name={key}
                        id="select_course"
                        value={student.course}
                        className={showCourseError ? "errorInput" : ""
                        }
                        label="Select Course"
                      >
                        <option value="">Select Course</option>
                        {courses.length
                          ? courses.map((item) => {
                            return (
                              <option key={item._id} value={item._id}>
                                {item.coursename}
                              </option>
                            );
                          })
                          : ""}
                      </SelectInput>

                      {showCourseError && (
                        <FormError
                          show={!studentFields[key]["isValidCourse"]}
                          error="Course is required."
                        ></FormError>
                      )}
                    </div>

                    {studentFields.length !== 1 && (
                      <button
                        onClick={() => handleRemoveClick(key)}
                        className="button btn-o-silver base btn-sm w-500"
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
            {studentFields.length !== 10 && (
              <button
                onClick={handleAddClick}
                className="button btn-o-primary primary btn-sm w-500"
              >
                Invite More
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="modalFooter">
        <div className="row">
          <div className="col-md-12">
            <button onClick={handleSubmit} className="button btn-md button-theme">
              Send Invitations <i className="animate-r-arrow-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
