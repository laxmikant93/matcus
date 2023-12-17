import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import FormInput from "../../../Common/Form/FormInput";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import { useDispatch } from "react-redux";
import {
  getAllClassroomSubjects,
  addNewClassroom,
  resetAddNewSameClassroomError,
  addNewSubject,
  addNewSubjectReset,
} from "../../../store/actions/admincourse";

import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import { useSelector } from "react-redux";
const CourseMultipleClassroom = ({ OnSelectedValue }) => {
  const dispatch = useDispatch();
  const mainCheckboxRef = useRef();
  const { _id } = useParams();
  const [ToggleAddNewCourse, SetToggleAddNewCourse] = useState(false);
  const [addSubject, setAddSubject] = useState(false);
  const [showList, hideList] = useState("index");
  const [classroomSubjects, setClassroomSubjects] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [classroomForm, setClassroomForm] = useState("");
  const [classroomFormError, setClassroomFormError] = useState("");
  const [subjectForm, setSubject] = useState("");
  const [subjectFormError, setSubjectError] = useState("");
  const [courseError, setCourseError] = useState(false);
  const [classroomSubjectField, setClassroomSubjectField] = useState("");
  const [ClassroomId, setClassroomId] = useState("");
  // const [isFilled, setIsFilled] = useState(false)
  const [backUpClassroom, setBackupClassrooms] = useState([]);
  const [classroomSubjectError, setClassroomSubjectError] = useState(false);

  const {
    user,
    classroomSubjectsDetails,
    classroomSubjectSuccess,
    sameClassroomError,
    addNewClassroomState,
    getEditData,
    getEditDataState,
  } = useSelector((state) => {
    return {
      user: state.user,
      classroomSubjectsDetails: state.admincourse.getAllClassroomSubjects.data,
      classroomSubjectSuccess:
        state.admincourse.getAllClassroomSubjects.success,
      sameClassroomError: state.admincourse.addNewClassroom.sameCourseError,
      addNewClassroomState: state.admincourse.addNewClassroom,
      addNewSubjectState: state.admincourse.addNewSubject,
      getEditData: state.admincourse.getSingleCourseInfoData.data.classroomInfo,
      getEditDataInfo: state.admincourse.getSingleCourseInfoData.data,
      getEditDataState: state.admincourse.getSingleCourseInfoData,
    };
  });
  useSelector((state) => {
    if (
      state.admincourse.addNewClassroom.success &&
      !state.admincourse.addNewClassroom.sameCourseError
    ) {
      // history("/invite-student-list");
      SetToggleAddNewCourse(!ToggleAddNewCourse);
      dispatch(resetAddNewSameClassroomError());
      setClassroomForm("");
      setSubject("");
    }
  });

  useSelector((state) => {
    if (state.admincourse.addNewSubject.success) {
      // history("/invite-student-list");
      setAddSubject(false);
      setClassroomSubjectField("");
      setCourseId("");
      dispatch(addNewSubjectReset());
    }
  });

  useEffect(() => {
    if (_id) {
      if (
        classroomSubjectSuccess &&
        classroomSubjectsDetails &&
        getEditDataState.success &&
        !getEditDataState.loading
      ) {
        let arrayValidationsFill = [];
        for (let i = 0; i < getEditData.length; i++) {
          const element = getEditData[i];
          let filterGetClassroomData =
            element.isCourseAssigned === "yes" && element._id;
          let ForFilterClassroomData = [filterGetClassroomData];
          let filterGetSubjectsData = element.subjectInfo.map((item) => {
            return item.isClassroomAssigned === "yes" ? item._id : false;
          });
          arrayValidationsFill.push({
            ...element,
            classroomCheckData: ForFilterClassroomData.filter(
              (item) => item !== false
            ),
            subjectsData: filterGetSubjectsData.filter(
              (item) => item !== false
            ),
            isCourseValid: false,
            isSubjectFormValid: false,
            subjectForm: "",
            isClassroomValid: false,
          });
        }
        setClassroomSubjects(arrayValidationsFill);
      }
    } else {
      if (classroomSubjectSuccess && classroomSubjectsDetails) {
        let arrayValidationsFill = [];
        for (let index = 0; index < classroomSubjectsDetails.length; index++) {
          // setIsFilled(true)

          const element = classroomSubjectsDetails[index];
          let filterBackupClassroomData = backUpClassroom.length
            ? backUpClassroom.map((item) => {
              return item._id === element._id &&
                item.classroomCheckData.length
                ? item.classroomCheckData[0]
                : false;
            })
            : [];
          let filterBackupSubjectsData = backUpClassroom.length
            ? backUpClassroom.map((item) => {
              return item._id === element._id && item.subjectsData.length
                ? item.subjectsData.filter((item) => {
                  return item;
                })
                : false;
            })
            : [];
          let afterFilterSubjectsData = filterBackupSubjectsData.filter(
            (item) => item !== false
          );
          arrayValidationsFill.push({
            ...element,
            classroomCheckData: filterBackupClassroomData.filter(
              (item) => item !== false
            ),
            subjectsData: afterFilterSubjectsData.length
              ? afterFilterSubjectsData[0]
              : [],
            // subjectsData: [],
            isCourseValid: false,
            isSubjectFormValid: false,
            subjectForm: "",
            isClassroomValid: false,
          });
        }
        setClassroomSubjects(arrayValidationsFill);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classroomSubjectSuccess, classroomSubjectsDetails]);

  useEffect(() => {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      dispatch(getAllClassroomSubjects(user.user_institute, user._id));
    } else {
      dispatch(getAllClassroomSubjects(user.user_institute));
    }
  }, [dispatch, user._id, user.user_activeRole, user.user_institute]);

  const showHideList = (index) => {
    setAddSubject(false);
    // setCourseId(index)
    setClassroomSubjectError(false);
    setClassroomSubjectField("");
    setClassroomId("");
    if (showList === "index") {
      hideList(index);
    } else if (showList === index) {
      hideList("index");
    } else {
      hideList(index);
    }
  };

  const showSubjectForm = (_id) => {
    if (addSubject === false) {
      setAddSubject(true);
    } else {
      setAddSubject(false);
    }
    setCourseId(_id);
    setClassroomSubjectError(false);
    setClassroomSubjectField("");
    setClassroomId("");
    dispatch(addNewSubjectReset());
  };
  const handleClassroom = (e, key) => {
    const { name, checked } = e.target;
    setClassroomSubjects([...classroomSubjects]);
    if (checked) {
      classroomSubjects[key]["classroomCheckData"].push(name);
      if (!_id) {
        classroomSubjects[key]["subjectsData"] = classroomSubjects[
          key
        ].classroomData.map((item) => {
          return item._id;
        });
      } else {
        classroomSubjects[key]["subjectsData"] = classroomSubjects[
          key
        ].subjectInfo.map((item) => {
          return item._id;
        });
      }
    } else {
      classroomSubjects[key]["classroomCheckData"] = [];
      classroomSubjects[key]["subjectsData"] = [];
    }
    setClassroomSubjects([...classroomSubjects]);
  };
  const handleSubjectsCheck = (e, key) => {
    const { name, checked, value } = e.target;
    if (checked) {
      if (!classroomSubjects[key]["classroomCheckData"].length) {
        classroomSubjects[key]["classroomCheckData"].push(value);
      }
      classroomSubjects[key]["subjectsData"].push(name);
    } else {
      let data = classroomSubjects[key]["subjectsData"];
      let index = data.indexOf(name);
      data.splice(index, 1);
      if (!classroomSubjects[key]["subjectsData"].length) {
        classroomSubjects[key]["classroomCheckData"] = [];
      }
    }

    setClassroomSubjects([...classroomSubjects]);
  };

  const handleClassroomFormInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "classroomForm":
        setClassroomForm(inputValue);
        if (sameClassroomError) {
          dispatch(resetAddNewSameClassroomError());
        }
        setClassroomFormError(ValidationFile.isEmpty(inputValue));
        break;
      case "subjectForm":
        setSubject(inputValue);
        setSubjectError(ValidationFile.isEmpty(inputValue));
        break;
      default:
        return false;
    }
  };
  const classroomSubjectData = () => {
    return {
      classrooms: [subjectForm],
      coursename: classroomForm,
      institute: user.user_institute,
      owner: user._id,
    };
  };
  const saveClassroom = () => {
    setCourseError(true);
    if (ValidationFile.isEmpty(classroomForm)) {
      setClassroomFormError(true);
    }
    if (ValidationFile.isEmpty(subjectForm)) {
      setSubjectError(true);
    }
    if (
      !ValidationFile.isEmpty(classroomForm) &&
      !ValidationFile.isEmpty(subjectForm)
    ) {
      dispatch(addNewClassroom(_id ? "edit" : "post", classroomSubjectData()));
      setBackupClassrooms(classroomSubjects);
    }
  };

  const cancelButton = () => {
    setClassroomFormError(false);
    setSubjectError(false);
    SetToggleAddNewCourse(!ToggleAddNewCourse);
  };

  // add new subject in classrooms
  const closeButton = () => {
    setAddSubject(!addSubject);
    setClassroomSubjectError(false);
    setClassroomSubjectField("");
    setClassroomId("inputName");
  };
  const handleAddClassroomSubject = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    setClassroomSubjectField(inputValue);
    setClassroomId(inputName);
    setClassroomSubjectError(ValidationFile.isEmpty(inputValue));
  };
  const addNewClassroomSubjectdata = [
    {
      classroomname: classroomSubjectField,
      course: ClassroomId,
      institute: user.user_institute,
      owner: user._id,
    },
  ];
  const saveSubject = () => {
    if (ValidationFile.isEmpty(classroomSubjectField)) {
      setClassroomSubjectError(true);
    }
    if (!ValidationFile.isEmpty(classroomSubjectField)) {
      dispatch(
        addNewSubject(_id ? "edit" : "post", addNewClassroomSubjectdata)
      );
      setBackupClassrooms(classroomSubjects);
    }
  };
  useEffect(() => {
    OnSelectedValue(classroomSubjects);
  }, [OnSelectedValue, classroomSubjects]);

  return (
    <React.Fragment>
      <div className="MultipleClassroomList mt-10">
        <React.Fragment>
          <div className="MultipleClassroomListItemWrapper">
            {classroomSubjectSuccess ? (
              classroomSubjects.length ? (
                classroomSubjects.map((item, key) => {
                  return (
                    <React.Fragment key={key}>
                      <div id="" className="MultipleClassroomListItem">
                        <div className="MultipleClassroomListItemHead">
                          <div
                            className={`input-custom-type ${showList === item._id ? "active" : ""
                              }`}
                            onClick={() => showHideList(item._id)}
                          >
                            <label className="small">
                              <input
                                type="checkbox"
                                ref={mainCheckboxRef}
                                onChange={(e) => handleClassroom(e, key)}
                                checked={
                                  item.classroomCheckData &&
                                  item.classroomCheckData.includes(item._id)
                                }
                                defaultChecked={
                                  item.classroomCheckData &&
                                  item.classroomCheckData.includes(item._id)
                                }
                                name={item._id}
                                value={item._id}
                              />
                              <div className="text-xs w-500 labelText">
                                {item.coursename}
                                <br />
                                <span className="text-2xs gray w-200">
                                  {item.subjectsData &&
                                    item.subjectsData.length}
                                  /
                                  {_id
                                    ? item.subjectInfo &&
                                    item.subjectInfo.length
                                    : item.classroomData &&
                                    item.classroomData.length}
                                  {/* {}{" "} */}
                                  {" " + DynamicClassroomHeader()}
                                </span>
                              </div>
                            </label>
                          </div>

                          {user.user_activeRole ===
                            process.env.REACT_APP_TEACHER ? (
                            ""
                          ) : (
                            <React.Fragment>
                              {showList === item._id && (
                                <button
                                  type="button"
                                  className="button btn-xs button-base"
                                  onClick={() => showSubjectForm(item._id)}
                                >
                                  Add {DynamicClassroomHeader()}
                                </button>
                              )}
                            </React.Fragment>
                          )}
                        </div>

                        {showList === item._id && (
                          <div className="MultipleClassroomListItemBody">
                            {addSubject && courseId === item._id && (
                              <div className="addSubjectCustom">
                                <div className="formFieldwrap">
                                  <FormInput
                                    label={`${DynamicClassroomHeader()} Title*`}
                                    placeholder="Subject Title"
                                    onChange={handleAddClassroomSubject}
                                    onKeyUp={handleAddClassroomSubject}
                                    value={classroomSubjectField}
                                    name={item._id}
                                  />
                                  <FormError
                                    show={classroomSubjectError}
                                    error={`${DynamicClassroomHeader()} is required.`}
                                  />
                                </div>
                                <div>
                                  <ul className="actionAddSubjectCustom">
                                    <li onClick={saveSubject}>
                                      <i className="checkIcon"></i>
                                    </li>
                                    <li onClick={closeButton}>
                                      <i className="closeIcon"></i>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                            <div className="input-custom-type">
                              <React.Fragment>
                                {_id ? (
                                  <React.Fragment>
                                    {item.subjectInfo && item.subjectInfo.length
                                      ? item.subjectInfo.map(
                                        (classroomItem, classroomItemKey) => {
                                          return (
                                            <React.Fragment
                                              key={classroomItemKey}
                                            >
                                              <label className="xsmall">
                                                <input
                                                  ref={mainCheckboxRef}
                                                  type="checkbox"
                                                  onChange={(e) =>
                                                    handleSubjectsCheck(
                                                      e,
                                                      key
                                                    )
                                                  }
                                                  name={classroomItem._id}
                                                  value={item._id}
                                                  checked={
                                                    item.subjectsData
                                                      .length &&
                                                    item.subjectsData.includes(
                                                      classroomItem._id
                                                    )
                                                  }
                                                  defaultChecked={
                                                    item.subjectsData &&
                                                    item.subjectsData.includes(
                                                      classroomItem._id
                                                    )
                                                  }
                                                />
                                                {classroomItem.classroomname}
                                              </label>
                                            </React.Fragment>
                                          );
                                        }
                                      )
                                      : "No records"}
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    {item.classroomData &&
                                      item.classroomData.length
                                      ? item.classroomData.map(
                                        (classroomItem, classroomItemKey) => {
                                          return (
                                            <React.Fragment
                                              key={classroomItemKey}
                                            >
                                              <label className="xsmall">
                                                <input
                                                  type="checkbox"
                                                  onChange={(e) =>
                                                    handleSubjectsCheck(
                                                      e,
                                                      key
                                                    )
                                                  }
                                                  name={classroomItem._id}
                                                  value={item._id}
                                                  checked={
                                                    item.subjectsData
                                                      .length &&
                                                    item.subjectsData.includes(
                                                      classroomItem._id
                                                    )
                                                  }
                                                  defaultChecked={
                                                    item.subjectsData &&
                                                    item.subjectsData.includes(
                                                      classroomItem._id
                                                    )
                                                  }
                                                />
                                                {classroomItem.classroomname}
                                              </label>
                                            </React.Fragment>
                                          );
                                        }
                                      )
                                      : "No records"}
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            </div>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })
              ) : (
                <div className="loadingGridData">No Records Found.</div>
              )
            ) : (
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            )}
          </div>

          {ToggleAddNewCourse && (
            <React.Fragment>
              <div className="formFieldwrap mt-10">
                <FormInput
                  label={`Enter ${DynamicCourseHeader()} Title`}
                  placeholder={`Enter ${DynamicCourseHeader()} Title`}
                  name="classroomForm"
                  onChange={handleClassroomFormInput}
                  onKeyUp={handleClassroomFormInput}
                />
                <FormError
                  show={sameClassroomError}
                  error={`This ${DynamicCourseHeader()} already exists,take another name.`}
                />
                <FormError
                  show={classroomFormError && courseError}
                  error={`${DynamicCourseHeader()} title is required.`}
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  label={`Enter ${DynamicClassroomHeader()} Title`}
                  placeholder={`Enter ${DynamicClassroomHeader()} Title`}
                  name="subjectForm"
                  onChange={handleClassroomFormInput}
                  onKeyUp={handleClassroomFormInput}
                />

                <FormError
                  show={subjectFormError && courseError}
                  error={`${DynamicClassroomHeader()} title is required.`}
                />
              </div>
              {addNewClassroomState.loading ? (
                <button
                  type="button"
                  className="button btn-xs btn-o-primary primary"
                // onClick={saveClassroom}
                >
                  Saving {DynamicCourseHeader()}...
                </button>
              ) : (
                <button
                  type="button"
                  className="button btn-xs btn-o-primary primary"
                  onClick={saveClassroom}
                >
                  Save {DynamicCourseHeader()}
                </button>
              )}
              {/* <button
                type="button"
                className="button btn-xs btn-o-primary primary"
                onClick={saveClassroom}
              >
                Save Course
              </button> */}
              <button
                type="button"
                className="button btn-xs btn-o-mgray base"
                onClick={cancelButton}
              >
                Cancel
              </button>
            </React.Fragment>
          )}
          {user.user_activeRole === process.env.REACT_APP_TEACHER ? (
            ""
          ) : (
            <React.Fragment>
              {!ToggleAddNewCourse && (
                <button
                  type="button"
                  className="button btn-xs btn-o-primary primary mt-10"
                  onClick={() => SetToggleAddNewCourse(!ToggleAddNewCourse)}
                >
                  Add New {DynamicCourseHeader()}
                </button>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};
export default CourseMultipleClassroom;
