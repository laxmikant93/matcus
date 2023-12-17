import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../Common/Form/FormInput";
import {
  readCoursesHeader,
  resetCourseHeader,
  updateCourseHeader,
} from "../../../store/actions/courseHeader";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import SelectInput from "../../../Common/Form/SelectInput";

function CourseHeader() {
  const dispatch = useDispatch();
  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false);
  const [showCourseFormInput, setShowCourseFormInput] = useState(false);
  const [showClassroomFormInput, setShowClassroomFormInput] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseFormTitle, setCourseFormTitle] = useState("");
  const [courseFormError, setCourseFormError] = useState(false);
  const [classroomFormTitle, setClassroomFormTitle] = useState("");
  const [classroomFormError, setClassroomFormError] = useState(false);
  const [classroomTitle, setClassroomTitle] = useState("");
  const { user, courseData } = useSelector((state) => {
    return {
      user: state.user,
      courseData: state.courseHeader.list,
    };
  });
  if (courseData.success && courseData.data && !isFilled) {
    setIsFilled(true);
    setClassroomTitle(courseData.data.classroomhead);
    setCourseTitle(courseData.data.coursehead);
    setClassroomTitle(courseData.data.classroomhead);
    if (
      courseData.data.coursehead !== "Classroom" &&
      courseData.data.coursehead !== "Session" &&
      courseData.data.coursehead !== "Batch"
    ) {
      setShowCourseFormInput(true);
      setCourseTitle("Others");
      setCourseFormTitle(courseData.data.coursehead);
    }
    if (
      courseData.data.classroomhead !== "Subject" &&
      courseData.data.classroomhead !== "Session" &&
      courseData.data.classroomhead !== "Batch"
    ) {
      setShowClassroomFormInput(true);
      setClassroomTitle("Others");
      setClassroomFormTitle(courseData.data.classroomhead);
    }
  }

  const handleInput = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    switch (inputName) {
      case "courseHeader":
        if (inputValue === "Others") {
          setShowCourseFormInput(true);
          setCourseTitle(inputValue);

        } else {
          setCourseTitle(inputValue);
          setShowCourseFormInput(false);
          setCourseFormTitle("");
          setCourseFormError(false);

        }
        break;
      case "classroomHeader":
        if (inputValue === "Others") {
          setShowClassroomFormInput(true);
          setClassroomTitle(inputValue);

        } else {
          setClassroomTitle(inputValue);
          setShowClassroomFormInput(false);
          setClassroomFormTitle("");
          setClassroomFormError(false);
        }
        break;
      case "courseformhead":
        setCourseFormTitle(ValidationFile.spaceNotAccept(inputValue));
        setCourseFormError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "classroomformhead":
        setClassroomFormTitle(ValidationFile.spaceNotAccept(inputValue));
        setClassroomFormError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      default:
    }


  };
  const courseHeaderData = () => {
    return {
      coursehead: courseTitle === "Others" ? courseFormTitle : courseTitle,
      classroomhead:
        classroomTitle === "Others" ? classroomFormTitle : classroomTitle,
      institute: user.user_institute,
    };
  };
  useEffect(() => {
    dispatch(readCoursesHeader(user.user_institute));
  }, [user, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(resetCourseHeader());
    };
  }, [dispatch]);

  const handleCourseValidation = () => {
    let isValid = false
    if (courseTitle === "Others" && ValidationFile.isEmpty(courseFormTitle)) {
      isValid = false
      setCourseFormError(true);
    } else {
      isValid = true
    }
    return isValid
  }
  const handleClassroomValidation = () => {
    let isValid = false
    if (
      classroomTitle === "Others" &&
      ValidationFile.isEmpty(classroomFormTitle)
    ) {
      isValid = false
      setClassroomFormError(true);
    } else {
      isValid = true
    }
    return isValid
  }

  const onBlur = () => {
    const isCourseValid = handleCourseValidation()
    const isClassroomValid = handleClassroomValidation()
    if (isCourseValid && isClassroomValid) {
      dispatch(
        updateCourseHeader(
          courseData.data ? courseData.data._id : "",
          courseHeaderData()
        )
      );
      SetToggleSectionTitle(false);
    }
  };
  return (
    <div className="SectionTitleCustomWrap">
      <div className="SectionTitleCustom">
        <button
          className={`btnText BtnCaret text-xxs w-300 ${ToggleSectionTitle ? `active` : ``
            }`}
          onClick={() => SetToggleSectionTitle(!ToggleSectionTitle)}
        >
          Classroom & Subject Heading
        </button>
        {ToggleSectionTitle && (
          <div className="SectionTitleInput mt-10">
            {!courseData.loading && courseData.success ? (
              <React.Fragment>
                <div className="formFieldwrap">
                  {/* <div
                    className={`cstmSelectWrap
                                }} `}
                  > */}
                  <SelectInput
                    className={"errorInput"}
                    name="courseHeader"
                    onChange={handleInput}
                    value={courseTitle}
                    onKeyUp={handleInput}
                    onKeyDown={handleInput}
                    id="select_Course"
                    label="Classroom Heading"
                  >
                    <option value="Classroom">Classroom</option>
                    <option value="Session">Session</option>
                    <option value="Batch">Batch</option>
                    <option value="Others">Others</option>
                  </SelectInput>
                  {/* <label className="animLabel" htmlFor="select_Course">
                      Classroom Heading
                    </label> */}
                  {/* </div> */}
                </div>
                {showCourseFormInput ? (
                  <React.Fragment>
                    <div className="formFieldwrap">
                      <FormInput
                        type="text"
                        label="Tell us about your suitable name"
                        name="courseformhead"
                        value={courseFormTitle}
                        placeholder="Tell us about your suitable name"
                        onChange={handleInput}
                        onKeyUp={handleInput}
                        maxLength="20"
                      />
                      <FormError
                        show={!courseFormTitle && courseFormError}
                        error="Classroom heading is required."
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  ""
                )}
                <div className="formFieldwrap">
                  {/* <div
                    className={`cstmSelectWrap
                                }} `}
                  > */}
                  <SelectInput
                    className={"errorInput"}
                    onChange={handleInput}
                    name="classroomHeader"
                    id="select_Course"
                    value={classroomTitle}
                    label="Subject Heading"
                  >
                    <option value="Subject">Subject</option>
                    <option value="Session">Session</option>
                    <option value="Batch">Batch</option>
                    <option value="Others">Others</option>
                  </SelectInput>
                  {/* <label className="animLabel" htmlFor="select_Course">
                      Subject Heading
                    </label>
                  </div> */}
                </div>
                {showClassroomFormInput ? (
                  <React.Fragment>
                    <div className="formFieldwrap">
                      <FormInput
                        type="text"
                        label="Tell us about your suitable name"
                        name="classroomformhead"
                        placeholder="Tell us about your suitable name"
                        onChange={handleInput}
                        value={classroomFormTitle}
                        onKeyUp={handleInput}
                        maxLength="20"
                      />

                      <FormError
                        show={!classroomFormTitle && classroomFormError}
                        error="Subject heading is required"
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  ""
                )}
                <button
                  className="button button-primary btn-sm mb-20"
                  onClick={onBlur}
                >
                  Save
                </button>
              </React.Fragment>
            ) : (
              <h3> Loading...</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default CourseHeader;
