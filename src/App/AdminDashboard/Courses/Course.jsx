/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import FormInput from "../../../Common/Form/FormInput";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseData,
  postCourseData,
  deleteCourseData,
  createErrorRemove,
  getCourseDataReset,
} from "../../../store/actions/courses";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import ValidationUtils from "../../../Classes/ValidationUtils";
import { SearchIcon } from "../../../Common/Icon";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import CourseHeader from "./CourseHeader";
import "./Course.scss";
import SearchControl from "../../../Common/SearchControl";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import ContactEmailVerify from "../../Dashboard/ContactEmailVerify";
export default function AdminDashboardCourse() {
  const dispatch = useDispatch();

  const {
    courses,
    coursesSuccess,
    courseHeading,
    users,
    duplicateCourseErr,
    createMsg,
  } = useSelector((state) => {
    return {
      courses: state.courses.list.data,
      coursesSuccess: state.courses.list.success,
      createMsg: state.courses.create.success,
      duplicateCourseErr: state.courses.courseError.courseAC,
      courseHeading: state.courseHeader.list,
      users: state.user,
    };
  });
  // console.log(courseHeading, "line 46")
  useEffect(() => {
    dispatch(getCourseData(users.user_institute));
  }, [dispatch, users]);

  useEffect(() => {
    return () => {
      dispatch(getCourseDataReset());
    };
  }, [dispatch]);
  const [ShowSubmitError, setShowSubmitError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [coursesLength, setCoursesLength] = useState("");
  const [SearchFind, setSearchFind] = useState(false);
  const [modalState, setModalState] = useState(false);
  const history = useNavigate();

  const dropdownRef = useRef(null);
  const [CourseId, setCourseId] = useState("");
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [errorState, setErrorState] = useState(false);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setCourseId(_id);
    setIsActive(isActive);
  };

  const DynamicReduxCourse = () => {
    const course = courseHeading;
    return course.success && course.data.coursehead
      ? course.data.coursehead
      : "Classroom";

  };
  const DynamicReduxClassroom = () => {
    const course = courseHeading;
    return course.success && course.data.classroomhead
      ? course.data.classroomhead
      : "Subject";
  };

  const testModals = useRef(null);

  const closeMainPopUp = () => {
    testModals.current.close()
  }

  const manageModalState = () => {

    if (!users.user_dashboard_stepper.addClassroom && !users.user_email_verify) {
      testModals.current.open();
    } else {
      setModalState(!modalState);
      //openMainPopUp();
    }
  };
  const closeModalState = () => {
    setModalState(false);
    resetCourseField();
    setShowSubmitError(false);
    setAddNewClassroom(emptynewClassroom);
  };

  const emptynewClassroom = [
    {
      classroom: "",
      isValid: false,
    },
  ];

  const [AddNewClassroom, setAddNewClassroom] = useState(emptynewClassroom);

  const [course, setCourse] = useState({
    CourseName: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const CourseInputChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    // setCourse(inputValue);
    let CourseAdd = {
      ...course,
      [inputName]: {
        value: inputValue,
        isValid: ValidationFile.validEmpty(inputValue),
      },
      validation: formValid(),
    };

    setCourse(CourseAdd);
    setShowSubmitError(false);
  };

  const resetCourseField = () => {
    let CourseAdd = {
      ...course,
      CourseName: {
        value: "",
        isValid: false,
      },
      validation: false,
    };

    setCourse(CourseAdd);
  };
  const formValid = () => {
    return course.CourseName.isValid;
  };

  const [ShowClassroomError, setShowClassroomError] = useState(false);
  const [fetchAllData, setfetchAllData] = useState(false);
  const isClassroomValid = () => {
    let isValid = true;
    for (let key = 0; key < AddNewClassroom.length; key++) {
      const element = AddNewClassroom[key];
      if (ValidationUtils.isEmpty(element.classroom)) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setShowClassroomError(false);
    } else {
      setShowClassroomError(true);
    }
    return isValid;
  };

  const handleInputChange = (e, key) => {
    let inputValue = e.target.value.trim();
    let allinputs = AddNewClassroom;
    allinputs[key]["classroom"] = inputValue;
    allinputs[key]["isValid"] = ValidationUtils.isNotEmpty(inputValue);

    setAddNewClassroom([...allinputs]);
    isClassroomValid();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSubmitError(true);
    dispatch(createErrorRemove());
    const ClassroomValid = isClassroomValid();
    if (ClassroomValid && course.validation) {
      dispatch(postCourseData(getUpdateCourseFormData(), users.user_dashboard_stepper));
      setfetchAllData(false);
      setAddNewClassroom(emptynewClassroom);
      setAllData([]);
      setTimeout(() => {
        setErrorState(false);
        dispatch(getCourseData(users.user_institute));
      }, 1000);
    }
  };

  if (!duplicateCourseErr && createMsg && !errorState) {
    setErrorState(true);
    closeModalState();
  }

  const handleRemoveClick = (position) => {
    let newinputs = AddNewClassroom.filter(
      (classroomValue, index) => index !== position
    );
    setAddNewClassroom([...newinputs]);
  };

  const handleAddClick = () => {
    let allNew = AddNewClassroom;
    allNew.push({
      classroom: "",
      isValid: false,
    });

    setAddNewClassroom([...allNew]);
  };

  const [allData, setAllData] = useState([]);

  const getUpdateCourseFormData = () => {
    if (!fetchAllData) {
      ClassroomnamesData();
    }

    return {
      coursename: course.CourseName.value,
      owner: users._id,
      institute: users.user_institute,
      classrooms: allData,
    };
  };

  const ClassroomnamesData = () => {
    AddNewClassroom.forEach((item) => {
      let allNew = allData;
      allNew.push(item.classroom);
      setAllData([...allNew]);
    });
    setfetchAllData(true);
  };

  const DeleteItem = (_id) => {
    dispatch(deleteCourseData(_id));
  };

  const EditItem = (value) => {
    history(`/edit-course/${value}`);
  };
  useEffect(() => {
    if (searchTerm) {
      setSearchFind(true);
      let arr = [];
      for (let i = 0; i < courses.length; i++) {
        if (
          courses[i].coursename.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          arr.push(courses[i]);
        }
      }
      setCoursesLength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [courses, searchTerm]);
  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/school-admin-course"
            title={DynamicReduxCourse()}
          />
        </Breadcrumb>
        <div className="PageTopHead PTH-CourseListing mt-20">
          <div className="PTH-Item">
            <h3 className="text-sm w-300">
              <span className="primary">
                {coursesSuccess
                  ? SearchFind
                    ? coursesLength
                    : courses.length
                  : "-"}
              </span>{" "}
              <DynamicReduxCourse />
            </h3>
          </div>
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={handleChange}
              placeholder={DynamicReduxCourse() + " Search"}
            />
          </div>
          <div className="PTH-Item">
            <form onSubmit={handleSubmit}>
              <div className={`modal modalShowing-${modalState}`}>
                <div className="modalwrapper">
                  <span
                    className="closeModal text-xxs gray"
                    onClick={() => closeModalState()}
                  >
                    {" "}
                    Close
                  </span>
                  <div className="modalHead">
                    <div className="pageFullCenter">
                      <div className="row">
                        <div className="col-xs-12 col-md-12">
                          <h3 className="text-sm w-300">
                            Create New <DynamicReduxCourse />
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modalbody">
                    <div className="pageFullCenter">
                      <div className="row">
                        <div className="col-xs-12 col-md-12">
                          <div className="formFieldwrap">
                            <FormInput
                              type="text"
                              label={DynamicReduxCourse() + " Name"}
                              className={`form-control ${!course.CourseName.isValid &&
                                ShowSubmitError
                                ? "errorInput"
                                : ""
                                }`}
                              name="CourseName"
                              maxLength="40"
                              onChange={CourseInputChange}
                              placeholder={DynamicReduxCourse()}
                              value={course.CourseName.value}
                              onKeyUp={CourseInputChange}
                            />
                            <FormError
                              show={
                                !course.CourseName.isValid &&
                                ShowSubmitError
                              }
                              error={DynamicReduxCourse() + " is required."}
                            />

                            <FormError
                              show={duplicateCourseErr && ShowSubmitError}
                              error="This coursename already exists,take another name."
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <h5 className="heading text-xs w-500">
                            Add <DynamicReduxClassroom />
                          </h5>
                          <p className="sub-heading dgray text-xxs">
                            You can add up to 5 <DynamicReduxClassroom /> at
                            a time.
                          </p>
                          {AddNewClassroom.map((classroomValue, key) => {
                            return (
                              <div className="mt-10" key={key}>
                                <div className="addSubWrapper">
                                  <div className="formFieldwrap">
                                    <FormInput
                                      type="text"
                                      value={classroomValue.classroom}
                                      className={`form-control ${ShowClassroomError
                                        ? "errorInput"
                                        : ""
                                        }`}
                                      key={key}
                                      maxLength="40"
                                      label={<DynamicReduxClassroom />}
                                      name={key}
                                      defaultValue={classroomValue.value}
                                      placeholder={DynamicReduxClassroom()}
                                      onChange={(e) =>
                                        handleInputChange(e, key)
                                      }
                                      onKeyUp={(e) =>
                                        handleInputChange(e, key)
                                      }
                                    />
                                    {ShowClassroomError && (
                                      <FormError
                                        show={
                                          !AddNewClassroom[key]["isValid"]
                                        }
                                        error={
                                          courseHeading.success &&
                                            courseHeading.data.classroomhead
                                            ? courseHeading.data
                                              .classroomhead +
                                            " is required"
                                            : "Classroom  is required."
                                        }
                                      ></FormError>
                                    )}
                                  </div>
                                  {AddNewClassroom.length !== 1 && (
                                    <button
                                      type="button"
                                      className="button btn-o-silver base btn-sm w-500"
                                      onClick={(e) =>
                                        handleRemoveClick(key)
                                      }
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
                        <div className="col-xs-12 col-md-12">
                          {AddNewClassroom.length !== 5 && (
                            <button
                              type="button"
                              className="button btn-o-primary btn-sm w-500"
                              onClick={handleAddClick}
                            >
                              Add New <DynamicReduxClassroom />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modalFooter">
                    <div className="row">
                      <div className="col-xs-12 col-md-12">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="button btn-md button-theme"
                        >
                          Create <DynamicReduxCourse />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <button
              className="button button-primary btn-oval btn-sm button-block"
              onClick={() => manageModalState()}
            >
              <i className="ed-icon icon-plus-add white i-xs"></i>
              Create New <DynamicReduxCourse />
            </button>
          </div>
        </div>
        <CourseHeader />
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-3">
              <DynamicReduxCourse /> Name
            </li>
            <li className="col col-3">
              <DynamicReduxClassroom />
            </li>
            <li className="col col-2">Teacher</li>
            <li className="col col-2">Student</li>
            <li className="col col-2">&nbsp;</li>
          </ul>
          <div className="gridBody">
            {coursesSuccess ? (
              <>
                {courses.length ? (
                  courses
                    // eslint-disable-next-line array-callback-return
                    .filter((courses) => {
                      if (searchTerm === "") {
                        return courses;
                      } else if (
                        courses.coursename
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return courses;
                      }
                    })
                    .map((item) => {
                      return (
                        <div className="gridRow" key={item._id}>
                          <ul className="topInfo">
                            <li
                              className="col col-3"
                              data-head={DynamicReduxCourse() + " Name"}
                            >
                              {item.coursename}
                            </li>
                            <li
                              className="col col-3"
                              data-head={DynamicReduxClassroom()}
                            >
                              {item.classroomcount}
                            </li>
                            <li className="col col-2" data-head="Teacher">
                              {item.teachercount}
                            </li>
                            <li className="col col-2" data-head="Student">
                              {item.studentcount}
                            </li>
                            <li className="col col-2 actionCols">
                              <div className="actionBtn">
                                <button
                                  className="btn-square"
                                  title="View Details"
                                  onClick={() => EditItem(item._id)}
                                >
                                  <span className="cssIcon">
                                    <i className="ed-eye"></i>
                                  </span>
                                </button>
                                <button
                                  className="btn-square"
                                  title="Remove"
                                  onClick={() =>
                                    onClickBtnDropDownRemove(item._id, true)
                                  }
                                >
                                  <span className="cssIcon">
                                    <i className="ed-trash"></i>
                                  </span>{" "}
                                </button>
                              </div>
                              {item._id === CourseId && (
                                <div
                                  ref={dropdownRef}
                                  className={`popup removePopup ${isActive ? "active" : "inactive"
                                    }`}
                                >
                                  <h5 className="heading base  text-xs w-600">
                                    You are about to remove this{" "}
                                    <DynamicReduxCourse /> .
                                  </h5>
                                  <p className="sub-heading red  text-xxs w-400">
                                    Are you sure?
                                  </p>
                                  <div className="removePopBtn">
                                    <button
                                      className="button btn-o-silver dgray btn-sm"
                                      onClick={() =>
                                        onClickBtnDropDownRemove(
                                          item._id,
                                          false
                                        )
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="button button-red btn-sm"
                                      onClick={() => {
                                        DeleteItem(item._id);
                                        onClickBtnDropDownRemove(
                                          item._id,
                                          false
                                        );
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                          </ul>
                        </div>
                      );
                    })
                ) : (
                  <NoDataAvailable title="No Records Found." />
                )}
              </>
            ) : (
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            )}
          </div>
        </div>
        <ContactEmailVerify verifyState={"addEmail"} testModals={testModals} closeMainPopUp={() => closeMainPopUp()} />
      </React.Fragment>
    </>
  );
}
