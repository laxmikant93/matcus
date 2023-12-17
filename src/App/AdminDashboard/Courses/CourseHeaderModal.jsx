import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import ValidationFile from "../../../Classes/ValidationFile";
import {
  postCourseHeader,
  resetCourseHeader,
} from "../../../store/actions/courseHeader";
import { useNavigate } from "react-router-dom";
import IconTootltip from "./icon-tooltip.svg";
import "./Course.scss";
import SelectInput from "../../../Common/Form/SelectInput";
import AppLink from "../../../Common/AppLink";


function CourseHeaderModal() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showClassroomFormInput, setShowClassroomFormInput] = useState(false);
  const [showCourseFormInput, setShowCourseFormInput] = useState(false);
  const [ScheduleClassModal, setScheduleClassModal] = useState(true);
  const [courseTitle, setCourseTitle] = useState("Classroom");
  const [classroomTitle, setClassroomTitle] = useState("Subject");
  const [courseFormTitle, setCourseFormTitle] = useState("");
  const [classroomFormTitle, setClassroomFormTitle] = useState("");
  const [courseError, setCourseError] = useState(false);
  const [classroomError, setClassroomError] = useState(false);
  const [courseFormError, setCourseFormError] = useState(false);
  const [error, setError] = useState(false);
  const [classroomFormError, setClassroomFormError] = useState(false);
  const { user, postCourse } = useSelector((state) => {
    return {
      user: state.user,
      postCourse: state.courseHeader.post,
    };
  });

  const CloseScheduleClassModal = () => {
    setScheduleClassModal(!ScheduleClassModal)
    history("/");
  }

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "courseHeader":
        if (inputValue === "Others") {
          setShowCourseFormInput(true);
          setCourseTitle(inputValue);
          setError(true);
        } else {
          setShowCourseFormInput(false);
          setCourseTitle(inputValue);
          setCourseFormTitle("");
          setError(false);
          setCourseFormError(false);
        }
        setCourseError(ValidationFile.isEmpty(inputValue));
        break;

      case "courseFormTitle":
        setCourseFormTitle(inputValue);
        setCourseFormError(ValidationFile.isEmpty(inputValue));
        break;
      case "classroomHeader":
        if (inputValue === "Others") {
          setShowClassroomFormInput(true);
          setClassroomTitle(inputValue);
          setError(true);
        } else {
          setShowClassroomFormInput(false);
          setClassroomTitle(inputValue);
          setClassroomFormTitle("");
          setError(false);
          setClassroomFormError(false);
        }
        setClassroomError(ValidationFile.isEmpty(inputValue));
        break;
      case "classroomFormTitle":
        setClassroomFormTitle(inputValue);
        setClassroomFormError(ValidationFile.isEmpty(inputValue));

        break;
      default:
    }
  };
  const postData = () => {
    return {
      institute: user.user_institute,
      coursehead: courseTitle === "Others" ? courseFormTitle : courseTitle,
      classroomhead:
        classroomTitle === "Others" ? classroomFormTitle : classroomTitle,
    };
  };
  useEffect(() => {
    return () => {
      dispatch(resetCourseHeader());
    };
  }, [dispatch]);
  const handleSubmit = () => {
    setCourseError(true);
    setClassroomError(true);
    if (ValidationFile.isEmpty(courseTitle)) {
      setCourseError(true);
    }
    if (ValidationFile.isEmpty(classroomTitle)) {
      setClassroomError(true);
    }
    if (
      !ValidationFile.isEmpty(courseTitle) &&
      !ValidationFile.isEmpty(classroomTitle)
    ) {
      if (courseTitle === "Others" && ValidationFile.isEmpty(courseFormTitle)) {
        setCourseFormError(true);
      } else {
        setError(false);
        setCourseFormError(false);
      }
      if (
        classroomTitle === "Others" &&
        ValidationFile.isEmpty(classroomFormTitle)
      ) {
        setClassroomFormError(true);
      } else {
        setError(false);
        setClassroomFormError(false);
      }
      if (courseFormError || classroomFormError) {
        setError(true);
      }
      if (!courseFormError && !classroomFormError && !error) {
        dispatch(postCourseHeader(postData()));
      }
    }
  };
  const [postLoading, setPostLoading] = useState(false);
  if (!postLoading && postCourse.success) {
    setPostLoading(true);
    history("/school-admin-course");
    dispatch(resetCourseHeader());
  }
  return (
    <React.Fragment>
      <Modal show={ScheduleClassModal}>
        <ModalHeader title="" subtitle="" closeButton={true}
          onclose={() => CloseScheduleClassModal()}>

          <div className="inline items-center">
            <h3 className="text-sm w-300">
              Default Naming about Classroom and Subject&nbsp;
            </h3>
            <div className="tooltip-cst defaultNamingTooltip  mt-3">
              <i className="question-circle-icon">
                <img src={IconTootltip} alt="Tooltip Icon" width="15" />
              </i>
              <div className="tooltip-content-cst medium text-xxs">
                <h6 className="text-xs">What are Classroom and Subjects?</h6>
                <p className="mt-10">
                  Edneed is an inclusive platform that caters to the need of all
                  educational institutes globally. Keeping this diversity in
                  mind, we have come up with{" "}
                  <span className="w-700 base">Classroom and Subjects</span>.
                </p>
                <p className="mt-10">
                  A Classroom is where you place a school standard or degree.
                  Subjects are a subdivision of Classroom, and are meant to
                  segregate the various subjects within a Classroom.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xxs">
            You can select naming conversion as per your convenience.
          </p>
        </ModalHeader>
        <ModalBody className="EditService-MBody">
          <div className="formFieldwrap">
            {/* <div
              className={`cstmSelectWrap
                                }} `}
            > */}
            <SelectInput
              className={`${!courseTitle && courseError} && "errorInput"`}
              name="courseHeader"
              onChange={handleInput}
              onKeyUp={handleInput}
              onKeyDown={handleInput}
              value={courseTitle}
              id="select_Course"
              label="Classroom Heading"
            >
              <option value="">Select Classroom</option>
              <option value="Classroom">Classroom</option>
              <option value="Session">Session</option>
              <option value="Batch">Batch</option>
              <option value="Others">Others</option>
            </SelectInput>
            {/* <label className="animLabel" htmlFor="select_Course">
                Classroom Heading
              </label>
            </div> */}

            <FormError
              show={!courseTitle && courseError}
              error="Classroom heading is required"
            />
          </div>
          {showCourseFormInput ? (
            <div className="formFieldwrap">
              <FormInput
                type="text"
                label="Tell us about your suitable name"
                name="courseFormTitle"
                value={courseFormTitle}
                placeholder="Tell us about your suitable name"
                onChange={handleInput}
                maxLength="20"
                onKeyUp={handleInput}
              />

              <FormError
                show={!courseFormTitle && courseFormError}
                error="Classroom heading is required."
              />
            </div>
          ) : (
            ""
          )}
          <div className="formFieldwrap">
            {/* <div
              className={`cstmSelectWrap
                                }} `}
            > */}
            <SelectInput
              className={` ${!classroomTitle && classroomError ? "errorInput" : ""}`}
              name="classroomHeader"
              onChange={handleInput}
              onKeyUp={handleInput}
              onKeyDown={handleInput}
              value={classroomTitle}
              id="select_Course"
              label="Subject Heading"
            >
              <option value="">Select Subject </option>
              <option value="Subject">Subject</option>
              <option value="Session">Session</option>
              <option value="Batch">Batch</option>
              <option value="Others">Others</option>
            </SelectInput>
            {/* <label className="animLabel" htmlFor="select_Course">
              Subject Heading
            </label>
          </div> */}

            <FormError
              show={!classroomTitle && classroomError}
              error="Subject heading is required"
            />
          </div>
          {showClassroomFormInput ? (
            <React.Fragment>
              <div className="formFieldwrap">
                <FormInput
                  type="text"
                  label="Tell us about your suitable name"
                  name="classroomFormTitle"
                  value={classroomFormTitle}
                  placeholder="Tell us about your suitable name"
                  onChange={handleInput}
                  onKeyUp={handleInput}
                  maxLength="20"
                />
                <FormError
                  show={!classroomFormTitle && classroomFormError}
                  error="Subject Heading is required"
                />
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter>
          {postCourse.loading ? (
            <button type="button" className="button btn-sm button-primary">
              Saving...
            </button>
          ) : (
            <button
              type="button"
              className="button btn-sm button-primary"
              onClick={handleSubmit}
            >
              Save and Continue
            </button>
          )}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
export default CourseHeaderModal;
