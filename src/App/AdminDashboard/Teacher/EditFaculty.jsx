import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import InviteFacultyList from "./InviteFacultyList";
import { useDispatch, useSelector } from "react-redux";
import { getCourseData } from "../../../store/actions/courses";
import { useParams } from "react-router-dom";
import { getStudentUserInfoDataIdFaculty } from "../../../store/actions/studentlistuserinfo";
import {
  deleteClassroomAssignedData,
  getClassroomAssignedFacultyData,
  postCourseAssignedData,
  updateSelectionCourseId,
  getTeacherAssignedClassroomData,
} from "../../../store/actions/classroomassigned";
import "./AdminDashboardTeacher.scss";

import {
  clearTeacherToUpdate,
  postTeacherData,
} from "../../../store/actions/editteacherlist";
import FormError from "../../../Common/Form/FormError";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import ValidationUtils from "../../../Classes/ValidationUtils";
import EditFacultyPopUp from "./EditFacultyPopUP";
import { getClassroomData } from "../../../store/actions/classroom";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import SelectInput from "../../../Common/Form/SelectInput";

const EditFaculty = () => {
  const success = false;
  const [courseId, setCourseId] = useState("");
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setCourseId(_id);
    setIsActive(isActive);
  };

  const dropdownRef = useRef(null);
  const { _id } = useParams();
  const {
    teacherAssignedClassroomNameSuccess,
    teacherAssignedClassroomName,
    classroom,
    users,
  } = useSelector((state) => {
    return {
      editteacherlist: state.editteacherlist.list.data,
      editTeacherUsernameList: state.editteacherlist.teacherusername.data,
      updateSelection: state.editteacherlist.update.data,
      classroom: state.classroom.list.data,
      assignedTeacherClassroom:
        state.editteacherlist.assignedteacherclassroom.data,
      users: state.user,
      updateselectioncourseid: state.classroomassigned.updateselection.data,
      teacherAssignedClassroomName:
        state.classroomassigned.teacherassignedclassrooom.data,
      teacherAssignedClassroomNameSuccess:
        state.classroomassigned.teacherassignedclassrooom.success,
      ClassroomNameData: state.classroomassigned.ClassroomData,
      updateSelectionClassroomAssigned:
        state.classroomassigned.updateselection.data.classroomInfo,
    };
  });
  const [modalStateAssignClassroom, setModalStateAssignClassroom] =
    useState(false);
  const userId = useSelector((state) => state.studentlistuserinfo.dataid.data);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const user = useSelector((state) => state.user);
  const [modalState, setModalState] = useState(false);

  const manageModalState = () => {
    setModalState(!modalState);
  };
  const closeModalState = () => {
    setModalState(false);
  };

  const [value, setValue] = useState([]);

  const [isState, setIsState] = useState(false);

  var data = [];

  if (teacherAssignedClassroomNameSuccess && !isState) {
    for (let i = 0; i < teacherAssignedClassroomName.length; i++) {
      data.push(teacherAssignedClassroomName[i].classroom);
      setValue([...data]);
    }
    setIsState(true);
  }
  let filteredClassroom = classroom.filter((c) => !value.includes(c._id));

  const closeModalStateAssignClassroom = () => {
    setModalStateAssignClassroom(false);
    dispatch(clearTeacherToUpdate());
    setTimeout(() => {
      dispatch(getClassroomAssignedFacultyData(user.user_institute, _id));
    }, 600);
  };

  const modalAssignClassroom = () => {
    setModalStateAssignClassroom(!modalStateAssignClassroom);
  };

  useEffect(() => {
    dispatch(getClassroomAssignedFacultyData(user.user_institute, _id));
    dispatch(getStudentUserInfoDataIdFaculty(_id));
    dispatch(getCourseData(user.user_institute));
  }, [_id, dispatch, user]);

  const classrooms = useSelector(
    (state) => state.classroomassigned.facultyList.data
  );
  const [showCourseError, setShowCourseError] = useState(false);
  const courses = useSelector((state) => state.courses.list.data);

  const emptyInputFields = [
    {
      course: "",
    },
  ];

  const [inputFields, setInputFields] = useState(emptyInputFields);

  const handleAddCLick = () => {
    let allNew = inputFields;
    allNew.push({
      course: "",
    });
    setInputFields([...allNew]);
  };

  const handleRemoveClick = (position) => {
    let newinputs = inputFields.filter((course, index) => index !== position);
    setInputFields([...newinputs]);
  };

  const handleCourseChange = (e, key) => {
    let inputValue = e.target.value;
    let allinputs = inputFields;
    allinputs[key]["course"] = inputValue;
    allinputs[key]["institute"] = user.user_institute;
    allinputs[key]["owner"] = user._id;
    allinputs[key]["user"] = _id;
    allinputs[key]["kind"] = "teacher";

    setInputFields([...allinputs]);
    isCourseFormValid();
  };

  const DeleteItem = (id) => {
    dispatch(deleteClassroomAssignedData(_id, id.course));

    setTimeout(() => {
      dispatch(getClassroomAssignedFacultyData(user.user_institute, _id));
    }, 400);
  };

  const isCourseFormValid = () => {
    let isValid = true;
    for (let key = 0; key < inputFields.length; key++) {
      const element = inputFields[key];
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

  const handleSubmit = () => {
    const isCourseValid = isCourseFormValid();
    if (isCourseValid) {
      dispatch(postCourseAssignedData(inputFields));

      closeModalState();
      setTimeout(() => {
        dispatch(getClassroomAssignedFacultyData(user.user_institute, _id));
      }, 500);
    }
  };

  const [courseID, setCourseID] = useState("");
  const postId = useParams();

  const handelUpdateUser = (item) => {
    dispatch(updateSelectionCourseId(item._id));
    dispatch(
      getTeacherAssignedClassroomData(users.user_institute, item.course, _id)
    );
    dispatch(getClassroomData(item.course));
    setCourseID(item.course);
    modalAssignClassroom();
    setIsState(false);
  };

  //////////// ASSIGN NEW CLASSROOM //////////

  const [ShowClassroomError, setShowClassroomError] = useState(false);

  const emptyAssignClassroomFields = [
    {
      classroom: "",
    },
  ];

  const [AssignClassroomFields, setAssignClassroomFields] = useState(
    emptyAssignClassroomFields
  );

  const handleDropdownRemoveClick = (position) => {
    let newinputs = AssignClassroomFields.filter(
      (classroom, index) => index !== position
    );
    setAssignClassroomFields([...newinputs]);
  };

  const handleDropdownAddClick = () => {
    let allNew = AssignClassroomFields;
    allNew.push({
      classroom: "",
    });

    setAssignClassroomFields([...allNew]);
  };

  const handelDropdownChange = (e, key) => {
    let value = e.target.value;
    let allinputs = AssignClassroomFields;
    allinputs[key]["classroom"] = value;
    allinputs[key]["course"] = courseID;
    allinputs[key]["owner"] = users._id;
    allinputs[key]["institute"] = users.user_institute;
    allinputs[key]["user"] = _id;
    allinputs[key]["kind"] = "teacher";

    setAssignClassroomFields([...allinputs]);
    isClassroomFormValid();
  };

  const isClassroomFormValid = () => {
    let isValid = true;
    for (let key = 0; key < AssignClassroomFields.length; key++) {
      const element = AssignClassroomFields[key];
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

  const handleSubmitAssignClassroom = (e) => {
    e.preventDefault();
    const isClassroomValid = isClassroomFormValid();
    if (isClassroomValid) {
      dispatch(postTeacherData(AssignClassroomFields));
      closeModalStateAssignClassroom();
      setAssignClassroomFields(emptyAssignClassroomFields);

      setTimeout(() => {
        dispatch(getClassroomAssignedFacultyData(user.user_institute, _id));
      }, 400);
    }
  };


  return (
    <React.Fragment>
      {success ? (
        <InviteFacultyList />
      ) : (
        <React.Fragment>
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem to="/invite-faculty-list" title="Teachers" />
            <BreadcrumbItem
              to={`/edit-faculty/${postId._id}`}
              title="Edit Teacher"
            />
          </Breadcrumb>
          <div className="PageTopHead PTH-EditFaculty mt-20">
            <div className="PTH-Item">
              <p className="heading dgray text-sm w-300">{userId.fullname}</p>
              <p className="sub-heading primary">{userId.email}</p>
            </div>
            <div className="PTH-Item">
              <button
                onClick={() => manageModalState()}
                className="button button-primary btn-sm btn-oval button-block"
              >
                <i className="ed-icon icon-plus-add white i-xs"></i>
                Assign <DynamicCourseHeader />
              </button>
            </div>
          </div>

          <div className="editFacultySession mt-20">
            <p className="dgray text-sm w-300">
              <span className="primary"></span> <DynamicCourseHeader />
            </p>
            <div className="editFacultyBoxWrapper mt-15">
              {classrooms.length ? (
                classrooms.map((item) => {
                  return (
                    <div className="editFacultyBox text-center">
                      <h2 className="heading text-xs w-400">
                        {item.course_coursename}
                      </h2>
                      <p className="sub-heading">
                        {item.classroomCount} <DynamicClassroomHeader />
                      </p>
                      <div className="editFacultyAction mt-10">
                        <div className="groupBtn">
                          <button
                            className="button btn-o-silver text-xxs primary btn-sm"
                            onClick={() => handelUpdateUser(item)}
                          >
                            Edit <DynamicClassroomHeader />
                          </button>
                          <button
                            className="button btn-o-silver text-xxs primary btn-sm"
                            onClick={() =>
                              onClickBtnDropDownRemove(item._id, true)
                            }
                          >
                            Delete
                          </button>
                        </div>
                        {item._id === courseId && (
                          <div
                            ref={dropdownRef}
                            className={`popup removePopup ${isActive ? "active" : "inactive"
                              }`}
                          >
                            <h5 className="heading gray text-xxs w-300">
                              You are about to remove this{" "}
                              <DynamicCourseHeader />.
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
                                onClick={() => DeleteItem(item)}
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
                <div className="mt-20 text-center">
                  No <DynamicCourseHeader />
                </div>
              )}
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
                    <div className="col-md-12">
                      <h3 className="text-sm w-300">
                        <DynamicClassroomHeader />
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modalbody">
                <div className="pageFullCenter">
                  <div className="row">
                    <EditFacultyPopUp />
                  </div>
                  <div className="divider"></div>
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="dgray text-xs w-500">
                        Add new <DynamicClassroomHeader />
                      </h3>
                      {AssignClassroomFields.map((classrooms, key) => {
                        return (
                          <div className="addSubWrapper mt-15" key={key}>
                            <div className="formFieldwrap">

                              <SelectInput
                                id="select_classroom"
                                name="name"
                                key={key}
                                value={classrooms.classroom}
                                type="text"
                                label={`Select ${DynamicClassroomHeader()}`}
                                // placeholder="Classroom"
                                onChange={(e) => {
                                  handelDropdownChange(e, key);
                                }}
                              >
                                <option value="">
                                  Select {DynamicClassroomHeader()}
                                </option>
                                {filteredClassroom.length ? (
                                  filteredClassroom.map((item) => {
                                    return (
                                      <option value={item._id}>
                                        {item.classroomname}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <option value="">
                                    No {DynamicClassroomHeader()}
                                  </option>
                                )}
                              </SelectInput>

                              {ShowClassroomError && (
                                <FormError
                                  show={
                                    !AssignClassroomFields[key]["classroom"]
                                  }
                                  error={
                                    DynamicClassroomHeader() + " is required."
                                  }
                                ></FormError>
                              )}
                            </div>

                            {
                              AssignClassroomFields.length !== 1 && (
                                <button
                                  className="button btn-o-silver base btn-sm w-500"
                                  onClick={() => handleDropdownRemoveClick(key)}
                                >
                                  Remove
                                </button>
                              )
                            }
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {AssignClassroomFields.length !== 10 && (
                        <button
                          className="button btn-o-primary primary btn-sm w-500"
                          onClick={handleDropdownAddClick}
                        >
                          Add <DynamicClassroomHeader />
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
                        className="button btn-md button-theme"
                        onClick={(e) => handleSubmitAssignClassroom(e)}
                      >
                        Update Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                      Assign New <DynamicCourseHeader />
                    </h3>
                  </div>
                </div>
              </div>
              <div className="modalbody">
                <div className="row">
                  <div className="col-md-12">
                    {inputFields.map((coursesValue, key) => {
                      return (
                        <div key={key}>
                          <div className="addSubWrapper">
                            <div className="formFieldwrap">

                              <SelectInput
                                onChange={(e) => handleCourseChange(e, key)}
                                name={key}
                                value={coursesValue.course}
                                id="select_course"
                                className={showCourseError ? "errorInput" : ""}
                                label={`Select ${DynamicCourseHeader()}`}
                              >
                                <option value="">
                                  Select {DynamicCourseHeader()}
                                </option>
                                {courses.length
                                  ? courses.map((item) => {
                                    return (
                                      <option value={item._id}>
                                        {item.coursename}
                                      </option>
                                    );
                                  })
                                  : ""}
                              </SelectInput>
                            </div>

                            {showCourseError && (
                              <FormError
                                show={!inputFields[key]["course"]}
                                error={DynamicCourseHeader() + " Required"}
                              ></FormError>
                            )}
                          </div>
                          {inputFields.length !== 1 && (
                            <button
                              onClick={() => handleRemoveClick(key)}
                              className="button btn-o-silver base btn-sm w-500"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    {inputFields.length !== 5 && (
                      <button
                        onClick={handleAddCLick}
                        className="button btn-o-primary primary btn-sm w-500"
                      >
                        Assign New <DynamicCourseHeader />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="modalFooter">
                <div className="row">
                  <div className="col-md-12">
                    <button
                      type="reset"
                      onClick={handleSubmit}
                      className="button btn-md button-theme"
                    >
                      Assign Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
      }
    </React.Fragment>
  );
};
export default EditFaculty;
