import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeacherData,
  CleargetTeacherAssignedClassroomData,
  deleteTeacherData,
  clearTeacherToUpdate,
  postTeacherData,
  getTeacherDataReset,
  getTeacherDataCount,
  adminPostClassTeacher,
} from "../../../store/actions/editteacherlist";
import CourseEditTeacherAssignClassroom from "./CourseEdtTeacherAssignClassroom";
import SearchUserByUsername from "../../../Common/SearchUserByUsername";
import ValidationUtils from "../../../Classes/ValidationUtils";
import FormError from "../../../Common/Form/FormError";
import { DynamicClassroomHeader } from "../../../Common/UserElement";
import { useNavigate } from "react-router";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import "./Course.scss";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import SelectInput from "../../../Common/Form/SelectInput";
import ImageViewer from "../../../Common/ImageViewer";
export default function DashboardFacultyList({ courseid }) {
  const dispatch = useDispatch();

  const [classTeacherData, setClassTeacherData] = useState("")
  const [teacherId, setTeacherId] = useState("");
  const {
    users,
    editteacherlist,
    assignedTeacherClassroomSuccess,
    classroom,
    updateSelection,
    assignedTeacherClassroom,
    editteacherlistSuccess,
  } = useSelector((state) => {
    return {
      editteacherlist: state.editteacherlist.list.data,
      editteacherlistSuccess: state.editteacherlist.list.success,
      editTeacherUsernameList: state.editteacherlist.teacherusername.data,
      users: state.user,
      updateSelection: state.editteacherlist.update.data,
      classroom: state.classroom.list.data,
      assignedTeacherClassroom:
        state.editteacherlist.assignedteacherclassroom.data,
      assignedTeacherClassroomSuccess:
        state.editteacherlist.assignedteacherclassroom.success,
    };
  });

  useEffect(() => {
    if (editteacherlistSuccess && editteacherlist.length) {
      let classTeacherDetails = editteacherlist.find((i) => i.classTeacher === true)
      setClassTeacherData(classTeacherDetails ? classTeacherDetails.user._id : "")
    }
  }, [editteacherlist, editteacherlistSuccess])
  useEffect(() => {
    dispatch(getTeacherData(users.user_institute, courseid));
  }, [dispatch, users, courseid]);

  useEffect(() => {
    return () => {
      dispatch(getTeacherDataReset());
    };
  }, [dispatch]);

  const [modalStateAssignClassroom, setModalStateAssignClassroom] =
    useState(false);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const [modalState, setModalState] = useState(false);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setTeacherId(_id);
    setIsActive(isActive);
  };
  const closeModalStateAssignClassroom = () => {
    setModalStateAssignClassroom(false);
    dispatch(clearTeacherToUpdate());
    setTimeout(() => {
      dispatch(
        getTeacherData(
          users.user_institute,
          courseid,
          process.env.REACT_APP_TEACHER
        )
      );
    }, 600);
    dispatch(CleargetTeacherAssignedClassroomData());
    setIsState(true);
  };

  const manageModalState = () => {
    setModalState(!modalState);
  };
  const closeModalState = () => {
    setModalState(false);
    setTimeout(() => {
      dispatch(
        getTeacherDataCount(
          users.user_institute,
          courseid,
          process.env.REACT_APP_TEACHER
        )
      );
      dispatch(
        getTeacherData(
          users.user_institute,
          courseid,
          process.env.REACT_APP_TEACHER
        )
      );
    }, 600);
    setAssignTeacherFormKey([{ formKey: Math.random().toFixed(6), value: "" }]);
  };

  const [assignTeacherFormKey, setAssignTeacherFormKey] = useState([
    { formKey: Math.random().toFixed(6), value: "" },
  ]);

  //////// TEACHER REMOVE STATE //////

  const handleRemoveClick = (inputKey) => {
    let allFormKeys = assignTeacherFormKey.filter(
      (FormItem) => FormItem.formKey !== inputKey
    );
    setAssignTeacherFormKey([...allFormKeys]);
  };

  // Validate Teacher Input

  const [validateForm, setValidateForm] = useState(false);
  //////// CLASSROOM ADD STATE //////

  const handleAddClick = () => {
    let allNewFormKeys = assignTeacherFormKey;
    allNewFormKeys.push({ formKey: Math.random().toFixed(6), value: "" });
    setAssignTeacherFormKey([...allNewFormKeys]);
  };

  //////// CLASSROOM INPUT HANDEL //////

  ///////// VALIDATION //////

  ///////// HANDEL SUBMIT /////////

  const handleSubmit = (e) => {
    setValidateForm(true);
    e.preventDefault();

    if (assignTeacherValid()) {
      dispatch(postTeacherData(assignTeacherRequestData()));
      closeModalState();
    }
  };

  const assignTeacherValid = () => {
    return !assignTeacherFormKey
      .map((FormInput) => (FormInput.value ? FormInput.value : undefined))
      .includes(undefined);
  };

  const assignTeacherRequestData = () => {
    return assignTeacherFormKey.map((FormInput) =>
      FormInput.value ? FormInput.value : undefined
    );
  };

  const suggestionSelected = (user) => {
    const allFormArr = assignTeacherFormKey.map((FormItem) =>
      FormItem.formKey === user.inputkey
        ? {
          ...FormItem,
          value: {
            user: user.user,
            owner: users._id,
            institute: users.user_institute,
            kind: "teacher",
            course: courseid,
          },
        }
        : FormItem
    );

    setAssignTeacherFormKey([...allFormArr]);
  };

  const DeleteItem = (_id) => {
    dispatch(deleteTeacherData(_id, courseid, users.user_institute));
    setTimeout(() => {
      dispatch(
        getTeacherData(
          users.user_institute,
          courseid,
          process.env.REACT_APP_TEACHER
        )
      );
    }, 400);
  };
  const history = useNavigate();
  const handelUpdateUser = (id) => {
    history(`/assign-teacher-multiple-classroom/${id}/course/${courseid}`);
  };

  let SelectedTeacherId = updateSelection._id;

  const [value, setValue] = useState([]);

  const [isState, setIsState] = useState(true);

  // const [filteredClassroom,setfilteredClassroom]=useState([])

  let data = [];

  if (assignedTeacherClassroomSuccess && isState) {
    for (let i = 0; i < assignedTeacherClassroom.length; i++) {
      data.push(assignedTeacherClassroom[i].classroom);
      setValue([...data]);
    }
    setIsState(false);
  }

  let filteredClassroom = classroom.filter((c) => !value.includes(c._id));
  ///////////// ASSIGN NEW CLASSROOM ////////

  const [ShowClassroomError, setShowClassroomError] = useState(false);

  const emptyAssignClassroomFields = [
    {
      classroom: "",
      isValid: false,
    },
  ];

  const [AssignClassroomFields, setAssignClassroomFields] = useState(
    emptyAssignClassroomFields
  );

  const handleDropdownRemoveClick = (position) => {
    let newinputs = AssignClassroomFields.filter(
      (classroomname, index) => index !== position
    );
    setAssignClassroomFields([...newinputs]);
  };

  const handleDropdownAddClick = () => {
    let allNew = AssignClassroomFields;
    allNew.push({
      classroom: "",
      isValid: false,
    });

    setAssignClassroomFields([...allNew]);
  };

  const handelDropdownChange = (e, key) => {
    let value = e.target.value;
    let allinputs = AssignClassroomFields;
    allinputs[key]["classroom"] = value;

    allinputs[key]["isValid"] = ValidationUtils.isNotEmpty(value);
    allinputs[key]["course"] = courseid;
    allinputs[key]["owner"] = users._id;
    allinputs[key]["institute"] = users.user_institute;
    allinputs[key]["user"] = updateSelection._id;
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
    }
  };
  const handleClassTeacher = (e, key) => {

    setClassTeacherData(e.target.value)
    dispatch(adminPostClassTeacher(postClassTeacherData(e.target.value)))
  }
  const postClassTeacherData = (id) => {
    return {
      user: id,
      institute: users.user_institute,
      course: courseid,
      owner: users._id
    }
  }
  return (
    <>
      <button
        className="button btn-o-silver primary btn-sm mt-20"
        onClick={() => manageModalState()}
      >
        Assign New Teacher
      </button>
      {editteacherlistSuccess ? (
        <>
          {editteacherlist.length > 0 ? (
            <div className="gridListTable">
              <ul className="gridHeader">
                <li className="col col-4">Teacher Details</li>
                <li className="col col-3">Teacher Role</li>
                <li className="col col-3">{DynamicClassroomHeader()}</li>
                <li className="col col-2">&nbsp;</li>
              </ul>
              <div className="gridBody">
                {editteacherlistSuccess ? (
                  <>
                    {editteacherlist.length ? (
                      editteacherlist.filter(item => item.user !== null).map((item, key) => {
                        return (
                          <div className="gridRow" key={key}>
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
                                        href={`/profile/${item.user?.username}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {item.user?.fullname}
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
                                className="col col-3"
                                data-head="Teacher Role"
                              >
                                <div className="input-custom-type">
                                  <label className="small">
                                    <input type="radio" onChange={(e) =>
                                      handleClassTeacher(
                                        e,
                                        item.user?._id
                                      )
                                    }
                                      checked={classTeacherData === item.user?._id}
                                      value={item.user?._id}
                                      name={key} />
                                    Mark as Class Teahcer
                                  </label>
                                </div>
                              </li>
                              <li
                                className="col col-3"
                                data-head={DynamicClassroomHeader()}
                              >
                                {" "}
                                {item.ClassroomAssigned
                                  ? !item.ClassroomAssigned.length
                                    ? ""
                                    : item.ClassroomAssigned &&
                                      item.ClassroomAssigned.length === 1
                                      ? getClassroomName(item)
                                      : item.ClassroomAssigned.length
                                  : ""}
                              </li>
                              <li className="col col-2 actionCols">
                                <div className="actionBtn">
                                  <button
                                    className="btn-square"
                                    title="Edit"
                                    onClick={() => handelUpdateUser(item.user?._id)}
                                  >
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
                                {item._id === teacherId && (
                                  <div
                                    ref={dropdownRef}
                                    className={`popup removePopup ${isActive ? "active" : "inactive"
                                      }`}
                                  >
                                    <h5 className="heading gray text-xxs w-300">
                                      You are about to remove this Teacher.
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
                                          DeleteItem(item.user?._id);
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
                      <tr>
                        <td colSpan="5">
                          <NoDataAvailable title="No Records Found." />
                        </td>
                      </tr>
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
                <div className="col-md-12">
                  <h3 className="heading dgray text-sm w-300">Add Teachers</h3>
                  <p className="sub-heading text-xxs">
                    You can add up to 5 teachers at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modalbody">
            <div className="pageFullCenter">
              <div className="row">
                <div className="col-md-12">
                  {assignTeacherFormKey.map((FormItem) => {
                    return (
                      <div key={FormItem.formKey}>
                        <div className="addSubWrapper">
                          <div className="formFieldwrap">
                            <SearchUserByUsername
                              validate={validateForm}
                              name={FormItem.formKey}
                              inputkey={FormItem.formKey}
                              kind="teacher"
                              institute={users.user_institute}
                              usertype={process.env.REACT_APP_TEACHER}
                              courseid={courseid}
                              onSelect={(user) => {
                                suggestionSelected(user);
                              }}
                              label="Email"
                              placeholder="Teacher's Email "
                              industry={users.user_business_type}
                            />
                          </div>
                          {assignTeacherFormKey.length !== 1 && (
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
              <div className="row">
                <div className="col-md-12">
                  {assignTeacherFormKey.length !== 5 && (
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
          </div>

          <div className="modalFooter">
            <div className="pageFullCenter">
              <div className="row">
                <div className="col-md-12">
                  <button
                    type="button"
                    className="button btn-md button-theme"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
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
          <div className="modalHead"></div>
          <div className="modalbody">
            <div className="pageFullCenter">
              <div className="row">
                {SelectedTeacherId && (
                  <CourseEditTeacherAssignClassroom
                    SelectedTeacherId={SelectedTeacherId}
                    courseid={courseid}
                  />
                )}
              </div>
              <div className="divider"></div>
              <div className="row">
                <div className="col-xs-12 col-md-12">
                  <h3 className="dgray text-xs w-500">
                    Add new <DynamicClassroomHeader />{" "}
                  </h3>
                  {AssignClassroomFields.map((classroomname, key) => {
                    return (
                      <div className="mt-8" key={key}>
                        <div className="addSubWrapper">
                          <div className="formFieldwrap">
                            <SelectInput
                              className={`${ShowClassroomError ? "errorInput" : ""
                                }`}
                              name={key}
                              type="text"
                              id="select_classroom"
                              // label={DynamicClassroomHeader() + "Name"}
                              label={`Select ${DynamicClassroomHeader}`}
                              value={classroomname.classroom}
                              placeholder="Classroom"
                              onChange={(e) => {
                                handelDropdownChange(e, key);
                              }}
                            >
                              <option value="">
                                Select {DynamicClassroomHeader()}{" "}
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
                                  No {DynamicClassroomHeader()}{" "}
                                </option>
                              )}
                            </SelectInput>
                            {/* <label
                                className="animLabel"
                                htmlFor="select_classroom"
                              >
                                Select <DynamicClassroomHeader /> 
                              </label>*/}
                            {ShowClassroomError && (
                              <FormError
                                show={!AssignClassroomFields[key]["classroom"]}
                                error={
                                  DynamicClassroomHeader() + " is required."
                                }
                              ></FormError>
                            )}
                          </div>
                          {AssignClassroomFields.length !== 1 && (
                            <button
                              className="button btn-o-silver base btn-sm w-500"
                              onClick={() => handleDropdownRemoveClick(key)}
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
                  {AssignClassroomFields.length !==
                    filteredClassroom.length && (
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
                <div className="col-xs-12 col-md-12">
                  <button
                    className="button btn-md button-theme"
                    onClick={(e) => handleSubmitAssignClassroom(e)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <React.Fragment />
    </>
  );

  function getClassroomName(item) {
    return item.ClassroomAssigned?.length > 0
      ? item.ClassroomAssigned[0].classroomname
      : "";
  }
}
