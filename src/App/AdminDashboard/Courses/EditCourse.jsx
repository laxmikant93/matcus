import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import CourseEditStudentList from "../Courses/CourseEditStudentList";
import CourseEditTeacherList from "../Courses/CourseEditTeacherList";
import FormInput from "../../../Common/Form/FormInput";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassroomData,
  postClassroomData,
  deleteClassroomData,
  getCourseInfoData,
  selectClassroomToUpdate,
  updateClassroomData,
  updateCoursenameData,
  GetCourseDataViaClassroom,
} from "../../../store/actions/classroom";
import FormError from "../../../Common/Form/FormError";
import { getStudentDataCount } from "../../../store/actions/editstudentlist";
import { getTeacherDataCount } from "../../../store/actions/editteacherlist";
import ValidationUtils from "../../../Classes/ValidationUtils";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import AppLink from "../../../Common/AppLink";
import Storage from "../../../Classes/Storage";
import IconEdit from "./icon-edit.svg";
import "./Course.scss";
import NoDataAvailable from "../../../Common/NoDataAvailable";

const EditCourse = () => {
  const [toggle, setToggle] = useState("default"); // teacher or student

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    Storage.setJson("__wz_crse__", id);
  }, [id]);

  const {
    classroom,
    users,
    courseInfo,
    editteacherlist,
    classroomInfotoedit,
    editstudentlist,
    classroomSuccess,
    editstudentlistSuccess,
    editteacherlistSuccess,
  } = useSelector((state) => {
    return {
      courseInfo: state.classroom.courseinfo.data,
      users: state.user,
      classroom: state.classroom.list.data,
      classroomSuccess: state.classroom.list.success,
      classroomInfotoedit: state.classroom.update.data,
      editstudentlist: state.editstudentlist.studentlistcount.data,
      editstudentlistSuccess: state.editstudentlist.studentlistcount.success,
      editteacherlist: state.editteacherlist.teacherlistcount.data,
      editteacherlistSuccess: state.editteacherlist.teacherlistcount.success,
    };
  });

  useEffect(() => {
    dispatch(getClassroomData(id));
    dispatch(GetCourseDataViaClassroom(id));
    dispatch(
      getStudentDataCount(
        users.user_institute,
        id,
        process.env.REACT_APP_STUDENT
      )
    );
    dispatch(
      getTeacherDataCount(
        users.user_institute,
        id,
        process.env.REACT_APP_TEACHER
      )
    );
  }, [dispatch, users, id]);

  const [modalState, setModalState] = useState(false);
  const [modalStateClassroom, setModalStateClassroom] = useState(false);

  const dropdownRef = useRef(null);
  const [ClassroomId, setClassroomId] = useState("");
  const [isEditable, setIsEditable] = useState("");
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isEditableClassroomName, setIsEditableClassroomName] = useState("");
  const [isClassroom, setIsClassroom] = useState("");

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setClassroomId(_id);
    setIsActive(isActive);
  };

  const closeModalState = () => {
    setModalState(false);
  };

  const manageModalStateClassroom = () => {
    setModalStateClassroom(!modalStateClassroom);
  };

  const closeModalStateClassroom = () => {
    setModalStateClassroom(false);
  };

  //////// CLASSROOM CREATE STATE //////

  const emptynewClassroom = [
    {
      classroomname: "",
      isValid: false,
    },
  ];

  const [AddNewClassroom, setAddNewClassroom] = useState(emptynewClassroom);

  const [ShowClassroomError, setShowClassroomError] = useState(false);

  //////// CLASSROOM REMOVE STATE //////

  const handleRemoveClick = (position) => {
    let newinputs = AddNewClassroom.filter(
      (ClassroomValue, index) => index !== position
    );
    setAddNewClassroom([...newinputs]);
  };

  //////// CLASSROOM ADD STATE //////

  const handleAddClick = () => {
    let allNew = AddNewClassroom;
    allNew.push({
      classroomname: "",
      isValid: false,
    });

    setAddNewClassroom([...allNew]);
  };

  //////// CLASSROOM INPUT HANDEL //////

  const handleInputChange = (e, key) => {
    let inputValue = e.target.value;
    let allinputs = AddNewClassroom;
    allinputs[key]["classroomname"] = inputValue;
    allinputs[key]["isValid"] = ValidationUtils.isNotEmpty(inputValue);
    allinputs[key]["institute"] = users.user_institute;
    allinputs[key]["institute"] = users.user_institute;
    allinputs[key]["owner"] = users._id;
    allinputs[key]["course"] = id;
    setAddNewClassroom([...allinputs]);
    isClassroomValid();
  };

  const isClassroomValid = () => {
    let isValid = true;
    for (let key = 0; key < AddNewClassroom.length; key++) {
      const element = AddNewClassroom[key];
      if (ValidationUtils.isEmpty(element.classroomname)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const ClassroomValid = isClassroomValid();
    if (ClassroomValid) {
      dispatch(postClassroomData(AddNewClassroom));
      closeModalStateClassroom();
      setAddNewClassroom(emptynewClassroom);
    }
  };

  const [classroomChangeinfo, setclassroomChangeinfo] = useState({
    classroomname: {
      value: "",
    },
  });

  const [coursenameChange, setcoursenameChange] = useState({
    coursename: {
      value: "",
    },
  });

  const SubmitClassroomNameChange = () => {
    if (!ValidationUtils.isEmpty(classroomChangeinfo.classroomname.value)) {
      dispatch(
        updateClassroomData(
          classroomInfotoedit._id,
          handleSubmitClassroomNameData()
        )
      );
      setclassroomChangeinfo({
        classroomname: {
          value: "",
        }
      })
    }
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteClassroomData(id));
  };

  const editOptionsClassroomname = {
    classroomname: "classroomname",
  };

  const classroomnameChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let ClassroomInfo = {
      ...classroomChangeinfo,
      [inputName]: {
        value: inputValue,
      },
    };
    setclassroomChangeinfo(ClassroomInfo);
  };

  const handelUpdateSelection = (id) => {
    setIsClassroom(id);
    setIsEditableClassroomName(editOptionsClassroomname.classroomname);
    dispatch(selectClassroomToUpdate(id));
  };

  const handleSubmitClassroomNameData = () => {
    return {
      classroomname: classroomChangeinfo.classroomname.value,
    };
  };

  const editOptions = {
    coursename: "coursename",
  };

  const CoursenameChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let CourseInfo = {
      ...coursenameChange,
      [inputName]: {
        value: inputValue,
      },
    };

    setcoursenameChange(CourseInfo);
  };
  const SubmitcoursenameChange = () => {
    if (!ValidationUtils.isEmpty(coursenameChange.coursename.value)) {
      dispatch(updateCoursenameData(id, coursenameChangeData()));

    } else {
    }
  };
  const postId = useParams();

  const coursenameChangeData = () => {
    return {
      coursename: coursenameChange.coursename.value,
    };
  };
console.log(courseInfo.coursename,"courseInfo.coursename")
console.log(courseInfo,"courseInfo")
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/school-admin-course"
          title={DynamicCourseHeader()}
        />
        <BreadcrumbItem
          to={`/edit-course/${postId.id}`}
          title={"Edit " + DynamicCourseHeader()}
        />
      </Breadcrumb>
      <div className="PageTopHead PTH-EditCourse mt-20">
        <div className="PTH-Item">
          <div className="heading-with-edit">
            {isEditable === editOptions.coursename ? (
              <FormInput
                onChange={CoursenameChange}
                onBlur={() => {
                  SubmitcoursenameChange();
                  setIsEditable("");
                }}
                name="coursename"
                type="text"
                maxLength="40"
                placeholder={courseInfo.coursename}
                defaultValue={courseInfo.coursename}
                autoFocus
              />
            ) : (
              <p className="primary text-sm w-300">{courseInfo.coursename} </p>
            )}
            <div
              className="editButton"
              onClick={() => setIsEditable(editOptions.coursename)}
            >
              <img src={IconEdit} alt="Icon Edit" />
            </div>
          </div>
        </div>
        <div className="PTH-Item">
          <form onSubmit={handleSubmit}>
            <div className={`modal modalShowing-${modalStateClassroom}`}>
              <div className="modalwrapper">
                <span
                  className="closeModal text-xxs gray"
                  onClick={() => closeModalStateClassroom()}
                >
                  Close
                </span>
                <div className="modalHead">
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="text-sm w-300">
                        Add New <DynamicClassroomHeader />
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="modalbody">
                  <div className="pageFullCenter">
                    <div className="row">
                      <div className="col-md-12">
                        {AddNewClassroom.map((ClassroomValue, key) => {
                          return (
                            <div key={key}>
                              <div className="addSubWrapper">
                                <div className="formFieldwrap">
                                  <FormInput
                                    type="text"
                                    className={`form-control ${ShowClassroomError ? "errorInput" : ""
                                      }`}
                                    key={key}
                                    label={DynamicClassroomHeader()}
                                    name={key}
                                    maxLength="40"
                                    value={ClassroomValue.classroomname}
                                    placeholder={DynamicClassroomHeader()}
                                    onChange={(e) =>
                                      handleInputChange(e, key)
                                    }
                                    onKeyUp={(e) => handleInputChange(e, key)}
                                  />
                                  {ShowClassroomError && (
                                    <FormError
                                      show={!AddNewClassroom[key]["isValid"]}
                                      error={
                                        DynamicClassroomHeader() +
                                        " is required."
                                      }
                                    ></FormError>
                                  )}
                                </div>
                                {AddNewClassroom.length !== 1 && (
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
                      <div className="col-md-7">
                        {AddNewClassroom.length !== 5 && (
                          <button
                            type="button"
                            className="button btn-o-primary primary btn-sm w-500"
                            onClick={handleAddClick}
                          >
                            Add New <DynamicClassroomHeader />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modalFooter">
                  <div className="pageFullCenter">
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="button btn-md button-theme"
                        >
                          Create <DynamicClassroomHeader />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <button
            className="button button-primary btn-oval btn-sm button-block"
            onClick={() => manageModalStateClassroom()}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Create New <DynamicClassroomHeader />
          </button>
        </div>
      </div>

      <div className="ToggleBtnSectionCst mt-20">
        <span
          className={`text-xs w-300 ${toggle === "teacher" ? "active" : ""}`}
          onClick={() =>
            setToggle(toggle === "teacher" ? "default" : "teacher")
          }
        >
          {editteacherlistSuccess ? (
            <>{editteacherlist.filter(item => item.user !== null).length} Teachers</>
          ) : (
            "Teachers"
          )}
        </span>
        <span
          className={`text-xs w-300 ${toggle === "student" ? "active" : ""}`}
          onClick={() =>
            setToggle(toggle === "student" ? "default" : "student")
          }
        >
          {editstudentlistSuccess ? (
            <>{editstudentlist.filter(item => item.user !== null).length} Students</>
          ) : (
            "Students"
          )}
        </span>
      </div>

      {toggle === "teacher" ? (
        <CourseEditTeacherList courseid={id} />
      ) : toggle === "student" ? (
        <CourseEditStudentList courseid={id} />
      ) : (
        <React.Fragment>
          <div className="editFacultyBoxWrapper mt-20">
            {classroomSuccess ? (
              <>
                {classroom.length ? (
                  classroom.map((item) => {
                    return (
                      <div className="editFacultyBox" key={item._id}>
                        {isEditableClassroomName ===
                          editOptionsClassroomname.classroomname &&
                          isClassroom === item._id ? (
                          <FormInput
                            onChange={classroomnameChange}
                            onBlur={() => {
                              SubmitClassroomNameChange();
                              setIsEditableClassroomName("");
                            }}
                            name="classroomname"
                            maxLength="40"
                            type="text"
                            placeholder=""
                            defaultValue={item.classroomname}
                            autoFocus
                          />
                        ) : (
                          <p className="heading dgray text-xs w-300">
                            {item.classroomname}{" "}
                          </p>
                        )}
                        <div className="editFacultyAction mt-20">
                          <AppLink
                            to={`/view-classroom/${item._id}`}
                            className="button btn-o-silver primary btn-xs"
                          >
                            View <DynamicClassroomHeader />
                          </AppLink>
                          <div className="groupBtn mt-20">
                            <button
                              className="btnText text-xxs primary"
                              onClick={() => handelUpdateSelection(item._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btnText text-xxs primary"
                              onClick={() =>
                                onClickBtnDropDownRemove(item._id, true)
                              }
                            >
                              Remove
                            </button>
                          </div>
                          {item._id === ClassroomId && (
                            <div
                              ref={dropdownRef}
                              className={`popup removePopup ${isActive ? "active" : "inactive"
                                }`}
                            >
                              <h5 className="heading gray text-xxs w-300">
                                You are about to remove this{" "}
                                <DynamicClassroomHeader />.
                              </h5>
                              <p className="sub-heading dgray text-xxs w-400">
                                Are you sure?
                              </p>
                              <div className="removePopBtn">
                                <button
                                  className="button btn-o-silver dgray btn-sm"
                                  onClick={() =>
                                    onClickBtnDropDownRemove(item._id, false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="button button-red btn-sm"
                                  onClick={() => handleDeleteUser(item._id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <NoDataAvailable title="No Records Found." />
                )}
              </>
            ) : (
              <div className="loadingGridData">Loading.</div>
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
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="text-sm w-300">
                        {classroomInfotoedit.classroomname}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="modalbody">
                  <div className="row mt-20">
                    <div className="col-md-10">
                      <div className="addSubWrapper">
                        <input
                          type="text"
                          className="form-control"
                          name="classroomname"
                          onChange={classroomnameChange}
                          maxLength="40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modalFooter">
                <div className="row mt-20">
                  <div className="col-md-2">
                    <button className="button btn-md button-theme">
                      Update Now!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default EditCourse;
