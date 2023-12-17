/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";

import { useDispatch, useSelector } from "react-redux";
import {
  getStudentData,
  postStudentData,
  deleteStudentData,
  updateStudentData,
  StudentSelectionData,
  getCourseListtData,
  getStudentDataReset,
  getStudentDataCount,
} from "../../../store/actions/editstudentlist";
import SearchUserByUsername from "../../../Common/SearchUserByUsername";
import ValidationUtils from "../../../Classes/ValidationUtils";
import FormError from "../../../Common/Form/FormError";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import "./Course.scss";
import { useNavigate } from "react-router";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import SelectInput from "../../../Common/Form/SelectInput";
import ImageViewer from "../../../Common/ImageViewer";

export default function DashboardFacultyList({ courseid }) {
  const [courseId, setCourseId] = useState("");
  const dispatch = useDispatch();

  const {
    users,
    editstudentlist,
    courseListData,
    editstudentupdateselection,
    editstudentlistSuccess,
  } = useSelector((state) => {
    return {
      editstudentlist: state.editstudentlist.list.data,
      editstudentlistSuccess: state.editstudentlist.list.success,
      users: state.user,
      updateSelection: state.editstudentlist.update.data,
      editStudentUsernameList: state.editstudentlist.studentusername.data,
      courseListData: state.editstudentlist.courselist.data,
      editstudentupdateselection: state.editstudentlist.updateselection.data,
    };
  });

  useEffect(() => {
    dispatch(getStudentData(users.user_institute, courseid));
  }, [dispatch, users, courseid]);
  useEffect(() => {
    return () => {
      dispatch(getStudentDataReset());
    };
  }, [dispatch]);

  const [modalStateAssignClassroom, setModalStateAssignClassroom] =
    useState(false);
  const history = useNavigate();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [modalState, setModalState] = useState(false);
  const [EmptySelectError, setEmptySelectError] = useState(false);
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setCourseId(_id);
    setIsActive(isActive);
  };

  const maodalAssignClassroom = () => {
    setModalStateAssignClassroom(!modalStateAssignClassroom);
  };
  const closeModalStateAssignClassroom = () => {
    setModalStateAssignClassroom(false);
  };

  const manageModalState = () => {
    setModalState(!modalState);
  };
  const closeModalState = () => {
    setModalState(false);
    setTimeout(() => {
      dispatch(
        getStudentDataCount(
          users.user_institute,
          courseid,
          process.env.REACT_APP_STUDENT
        )
      );
      dispatch(
        getStudentData(
          users.user_institute,
          courseid,
          process.env.REACT_APP_STUDENT
        )
      );
    }, 600);

    setAssignStudentFormKey([{ formKey: Math.random().toFixed(6), value: "" }]);
  };

  const [AssignnewCourse, setAssignnewCourse] = useState({
    course: {
      value: "",
    },
  });

  const [assignStudentFormKey, setAssignStudentFormKey] = useState([
    { formKey: Math.random().toFixed(6), value: "" },
  ]);

  //////// TEACHER REMOVE STATE //////

  const handleRemoveClick = (inputKey) => {
    let allFormKeys = assignStudentFormKey.filter(
      (FormItem) => FormItem.formKey !== inputKey
    );
    setAssignStudentFormKey([...allFormKeys]);
  };

  // Validate Teacher Input

  const [validateForm, setValidateForm] = useState(false);
  //////// CLASSROOM ADD STATE //////

  const handleAddClick = () => {
    let allNewFormKeys = assignStudentFormKey;
    allNewFormKeys.push({ formKey: Math.random().toFixed(6), value: "" });
    setAssignStudentFormKey([...allNewFormKeys]);
  };

  ///////// HANDEL SUBMIT /////////
  const handleSubmit = (e) => {
    setValidateForm(true);
    e.preventDefault();

    if (assignStudentValid()) {
      dispatch(postStudentData(assignStudentRequestData()));
      closeModalState();
    }
  };
  const assignStudentValid = () => {
    return !assignStudentFormKey
      .map((FormInput) => (FormInput.value ? FormInput.value : undefined))
      .includes(undefined);
  };

  const assignStudentRequestData = () => {
    return assignStudentFormKey.map((FormInput) =>
      FormInput.value ? FormInput.value : undefined
    );
  };

  const suggestionSelected = (user) => {
    const allFormArr = assignStudentFormKey.map((FormItem) =>
      FormItem.formKey === user.inputkey
        ? {
          ...FormItem,
          value: {
            user: user.user,
            owner: users._id,
            institute: users.user_institute,
            kind: "student",
            course: courseid,
          },
        }
        : FormItem
    );
    setAssignStudentFormKey([...allFormArr]);
  };

  const DeleteItem = (_id) => {
    dispatch(deleteStudentData(_id));
  };
  const [patchId, setPatchId] = useState("");

  const EditItem = (_id) => {
    history(`/update-multiple-courses/${_id}/course/${courseid}`);
  };

  const handelDropdownChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let courseList = {
      ...AssignnewCourse,
      [inputName]: {
        value: inputValue,
      },
    };
    setAssignnewCourse(courseList);
    setEmptySelectError(false);
  };

  // UPDATE STUDENT COURSE SUBMIT
  const handleSubmitAssignCourse = (e) => {
    e.preventDefault();

    if (!ValidationUtils.isEmpty(AssignnewCourse.course.value)) {
      setEmptySelectError(false);

      dispatch(
        updateStudentData(
          editstudentupdateselection.user._id,
          patchId,
          handleSubmitAssignCourseData()
        )
      );

      closeModalStateAssignClassroom();
    } else {
      setEmptySelectError(true);
    }
  };

  const handleSubmitAssignCourseData = () => {
    return {
      course: AssignnewCourse.course.value,
    };
  };

  const filteredCourses = courseListData.filter(
    (c) => c._id !== editstudentupdateselection.course
  );

  return (
    <React.Fragment>
      <button
        className="button btn-o-silver primary btn-sm mt-20"
        onClick={() => manageModalState()}
      >
        Assign New Student
      </button>

      {editstudentlistSuccess ? (
        <>
          {editstudentlist.length > 0 ? (
            <div className="gridListTable">
              <ul className="gridHeader">
                <li className="col col-4">Student Details</li>
                <li className="col col-2">{DynamicClassroomHeader()}</li>
                <li className="col col-4">Parent Name</li>
                <li className="col col-2">&nbsp;</li>
              </ul>
              <div className="gridBody">
                {editstudentlistSuccess ? (
                  <>
                    {editstudentlist.length > 0 ? (
                      editstudentlist.filter(item => item.user !== null).map((item) => {
                        return (
                          <div className="gridRow" key={item._id}>
                            <ul className="topInfo">
                              <li className="col col-4">
                                <div className="userDetails">
                                  <div className="profileCircle">
                                    <a
                                      href={`/profile/${item.user?.username}`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <ImageViewer
                                        className="ListTableImg"
                                        object={item.user?.profile_picture
                                        }
                                        defaultImage={DummyProfile}
                                      />
                                    </a>
                                  </div>
                                  <div className="profileDetails">
                                    <div className="profile-name">
                                      <a
                                        className="base"
                                        href={`/profile/${item.user?.username}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {item.user?.fullname}{" "}
                                      </a>
                                    </div>
                                    <div className="profile-email">
                                      {item.user?.email}
                                    </div>
                                    <div className="profile-contact">
                                      {item.user?.contact}
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li
                                className="col col-2"
                                data-head={`${DynamicClassroomHeader()}`}
                              >
                                {item.ClassroomAssigned
                                  ? !item.ClassroomAssigned.length
                                    ? ""
                                    : item.ClassroomAssigned &&
                                      item.ClassroomAssigned.length === 1
                                      ? getClassroomName(item)
                                      : item.ClassroomAssigned.length
                                  : ""}
                              </li>
                              <li className="col col-4" data-head="Parent Name">
                                {item.user?.parent_name}
                              </li>
                              <li className="col col-2 actionCols">
                                <div className="actionBtn">
                                  <button
                                    className="btn-square"
                                    title="Edit"
                                    onClick={() => EditItem(item.user?._id)}
                                  >
                                    {/* Edit <DynamicCourseHeader /> */}
                                    <span className="cssIcon">
                                      <i className="ed-pen"></i>
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
                                    </span>
                                  </button>
                                </div>
                                {item._id === courseId && (
                                  <div
                                    ref={dropdownRef}
                                    className={`popup removePopup ${isActive ? "active" : "inactive"
                                      }`}
                                  >
                                    <h5 className="heading gray text-xxs w-300">
                                      You are about to remove this Student.
                                    </h5>
                                    <p className="sub-heading dgray text-xxs w-400">
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
          ) : (
            <NoDataAvailable title="No Records Found." />
          )}
        </>
      ) : (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      )}

      <div className={`modal modalShowing-${modalState}`}>
        <div className="modalwrapper">
          <span
            className="closeModal text-xxs gray"
            onClick={() => closeModalState()}
          >
            Close
          </span>
          <div className="modalHead">
            <div className="pageFullCenter">
              <div className="row">
                <div className="col-xs-12 col-md-12">
                  <h3 className="heading dgray text-sm w-300">Add Students</h3>
                  <p className="sub-heading text-xxs">
                    You can add up to 5 students at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modalbody">
            <div className="pageFullCenter">
              <div className="row">
                <div className="col-xs-12 col-md-12">
                  {assignStudentFormKey.map((FormItem) => {
                    return (
                      <div key={FormItem.formKey}>
                        <div className="addSubWrapper">
                          <div className="formFieldwrap">
                            <SearchUserByUsername
                              validate={validateForm}
                              name={FormItem.formKey}
                              inputkey={FormItem.formKey}
                              kind="student"
                              institute={users.user_institute}
                              usertype={process.env.REACT_APP_STUDENT}
                              courseid={courseid}
                              onSelect={(user) => {
                                suggestionSelected(user);
                              }}
                              industry={users.user_business_type}
                              label="Email"
                              placeholder="Student's Email "
                            />
                          </div>
                          {assignStudentFormKey.length !== 1 && (
                            <button
                              className="button btn-o-silver base btn-sm w-500"
                              onClick={() =>
                                handleRemoveClick(FormItem.formKey)
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
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-12">
                {assignStudentFormKey.length !== 5 && (
                  <button
                    className="button btn-o-primary primary btn-sm w-500"
                    onClick={handleAddClick}
                  >
                    Add More
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="modalFooter">
            <div className="row">
              <div className="col-md-12">
                <button className="button btn-md button-theme" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal modalShowing-${modalStateAssignClassroom}`}>
        <div className="modalwrapper">
          <span
            className="closeModal text-xxs gray"
            onClick={() => closeModalStateAssignClassroom()}
          >
            Close
          </span>
          <div className="modalHead">
            <div className="pageFullCenter">
              <div className="row">
                <div className="col-xs-12 col-md-12">
                  <h3 className="text-sm w-300">
                    Change <DynamicCourseHeader />{" "}
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
                    <SelectInput
                      className={` ${EmptySelectError ? "errorInput" : ""
                        }`}
                      id="select_course"
                      name="course"
                      type="text"
                      // label="Full Name"
                      placeholder="Courses"
                      onChange={(e) => {
                        handelDropdownChange(e);
                      }}
                      label={`Select ${DynamicCourseHeader}`}
                    >
                      <option value="">
                        Select {DynamicCourseHeader()}{" "}
                      </option>
                      {filteredCourses.length ? (
                        filteredCourses.map((item) => {
                          return (
                            <option value={item._id}>
                              {item.coursename}
                            </option>
                          );
                        })
                      ) : (
                        <option value="">No {DynamicCourseHeader()}</option>
                      )}
                    </SelectInput>
                    {/* <label className="animLabel" htmlFor="select_course">
                        Select <DynamicCourseHeader />
                      </label> */}

                    <FormError
                      show={EmptySelectError}
                      error={DynamicCourseHeader() + " is required"}
                    ></FormError>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modalFooter">
            <div className="pageFullCenter">
              <div className="row">
                <div className="col-md-12">
                  <button
                    className="button btn-md button-theme"
                    onClick={handleSubmitAssignCourse}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  function getClassroomName(item) {
    return item.ClassroomAssigned?.length > 0
      ? item.ClassroomAssigned[0].classroomname
      : "";
  }
}
