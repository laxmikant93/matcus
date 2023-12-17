import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import FormInput from "../../../Common/Form/FormInput";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import FormInputFileText from "../../../Common/Form/FormInputFileText";
// import { IconAttachment } from "../../../Common/Icon";
import InputDateTimePicker from "../../../Common/Form/InputDateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import IconAttachment from "./icon-attachment.svg";
import {
  getAssignmentData,
  postAssignmentData,
  updateAssignmentData,
  deleteAssignmentData,
  getSearchAssignmentData,
  getAssignmentDataReset,
  sortByRecentToOld1Assignment,
  sortByOldToRecent1Assignment,
  sortByRecentToOld2Assignment,
  sortByOldToRecent2Assignment,
  sortByRecentToOld3Assignment,
  sortByOldToRecent3Assignment,
  filteredAssignmentAccToCreatedBy,
  // setFilteredTeachers,
  courseAndClassroomFilter,
  assignmentCreatedBy,
} from "../../../store/actions/assignment";
import {
  changeClassroomAssignedData,
  changeClassroomAssignedDataResets,
} from "../../../store/actions/classroomassigned";
import { getClassroomAssignedData } from "../../../store/actions/classroomassigned";
import Upload from "../../../Common/Upload/index";
import CourseSelect from "../../../Common/Form/CourseSelect";
import ClassroomSelect from "../../../Common/Form/ClassroomSelect";
import { DATETIME_FORMAT_AP } from "../../../Constant/constants";
import { FormMode } from "../../../Constant/enums";
import moment from "moment";
import AppLink from "../../../Common/AppLink";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import FormTextArea from "../../../Common/Form/FormTextArea";
import { SearchIcon } from "../../../Common/Icon";
import Validation from "../../../Classes/Validation";

import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
// import MultipleGroupSelectDropdown from "../../../Common/Form/MultipleGroupSelectDropdown";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
// import MultipleSelectDropdown from "../../../Common/Form/MultipleSelectDropdown";
import CourseClassCheckboxFilter from "../../../Common/CourseClassCheckboxFilter";
import MultipleSelectDropDownCommon from "../../../Common/Form/MultiSelectDropDownCommon";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../store/actions/MultiSelectDropDown";
import "./TeacherDashboard.scss";
import SearchControl from "../../../Common/SearchControl";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import Modal from "../../../Common/Modal";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import SelectInput from "../../../Common/Form/SelectInput";
import Uploader from "../../../Common/ImageUploader";
import UploadButton from "../../../Common/UploadButton";
// import modalOpen from "./TeacherClassrooms/TeacherClassroomTab/TeacherAssignmentTab/TeacherClassroomAssignmentCreateEdit"

const validateLib = new Validation();

export default function TeacherAssignments() {
  const dispatch = useDispatch();

  const {
    assignment,
    users,
    courseList,
    assignmentCreateLoading,
    assignmentDeleteLoading,
    assignmentCreateSuccess,
    assignmentUpdateSuccess,
    assignmentUpdateLoading,
    assignmentSuccess,
    assignmentCreatedByListSuccess,
    assignmentCreatedByList,
  } = useSelector((state) => {
    return {
      assignmentCreatedByListSuccess:
        state.assignment.assignedAssignment.success,
      assignmentCreatedByList: state.assignment.assignedAssignment.data,
      assignment: state.assignment.list.data,
      assignmentSuccess: state.assignment.list.success,
      assignmentCreateLoading: state.assignment.create.loading,
      assignmentCreateSuccess: state.assignment.create.success,
      assignmentUpdateLoading: state.assignment.update.loading,
      assignmentUpdateSuccess: state.assignment.update.success,
      assignmentDeleteLoading: state.assignment.delete.loading,
      users: state.user,
      courseList: state.classroomassigned.courseList,
    };
  });
  useEffect(() => {
    dispatch(getAssignmentData(users._id, users.user_institute));
    dispatch(
      getClassroomAssignedData(users._id, users.user_institute, "teacher")
    );
    dispatch(assignmentCreatedBy(users._id, users.user_institute));
  }, [dispatch, users]);

  useEffect(() => {
    return () => {
      dispatch(getAssignmentDataReset());
      dispatch(changeClassroomAssignedDataResets());
    };
  }, [dispatch]);

  const minDate = new Date();
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [assignmentId, setAssignmentId] = useState("");
  const [course, setCourse] = useState("");
  const [classroom, setClassroom] = useState("");
  const [courseSubmit, setCourseSubmit] = useState(false);
  const [classroomSubmit, setClassroomSubmit] = useState(false);
  const [clearFileName, setClearFileName] = useState(false);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setAssignmentId(_id);
    setIsActive(isActive);
  };
  const onClickBtnRemove = (_id) => {
    dispatch(deleteAssignmentData(_id));
    // setAssignmentId("");
    // setIsActive(false);
  };

  const uploadImage = (data) => {
    let imgData = data
    let assignmentInfoObj = {
      ...assignmentInfo,
      fileupload: {
        value: imgData,
        isValid: validationConfirm("fileupload", imgData),
      },
      validation: isFormValid(),
    };
    setAssignmentInfo(assignmentInfoObj);
  };

  const removeFileUpload = () => {
    let assignmentInfoObj = {
      ...assignmentInfo,
      fileupload: {
        value: "",
        isValid: false,
      },
      validation: isFormValid(),
    };
    setAssignmentInfo(assignmentInfoObj);
  };

  const [modalState, setModalState] = useState(false);
  const manageModalState = (mode) => {
    setShowSubmitError(false);
    const assignment = { ...emptyAssignmentInfo, ...{ mode: mode } };
    setAssignmentInfo(assignment);
    setModalState(!modalState);
    setClearFileName(false);
  };

  const closeModalState = () => {
    setModalState(false);
    setClearFileName(true);
    setCourseSubmit(true)
    setClassroomSubmit(true)
  };

  const [EditmodalState, setEditModalState] = useState(false);
  const manageEditModalState = (info, id, mode) => {
    setShowSubmitError(false);
    var assignmentInfoObj = {};
    Object.keys(info).forEach((key) => {
      const date = moment(info[key]);

      assignmentInfoObj[key] = {
        value: date && date.isValid() && date.year() > 2001 ? date : info[key],
        isValid: validationConfirm(key, info[key]),
      };
    });
    assignmentInfoObj["mode"] = mode;
    setAssignmentId(id);
    dispatch(changeClassroomAssignedData(info.course));
    setAssignmentInfo(assignmentInfoObj);
    setModalState(!modalState);
    setClearFileName(false);
  };
  const closeEditModalState = () => {
    setEditModalState(false);
    setClearFileName(true);
  };

  const handleInput = (e) => {

    let inputName = e.target.name;
    let inputValue = e.target.value;
    let assignmentInfoData = {
      ...assignmentInfo,
      [inputName]: {
        value: ValidationFile.spaceNotAccept(inputValue),
        isValid: validationConfirm(inputName, ValidationFile.spaceNotAccept(inputValue)),
      },
      validation: isFormValid(),
    };
    setAssignmentInfo(assignmentInfoData);
    setCourseSubmit(false);
    setClassroomSubmit(false);

  }

  const handleDatePicker = (datetime) => {
    let assignmentInfoData = {
      ...assignmentInfo,
      duedate: {
        value: datetime,
        isValid: true,
      },
      validation: isFormValid(),
    };
    setAssignmentInfo(assignmentInfoData);
  };

  const isFormValid = () => {
    return assignmentInfo.course.isValid &&
      assignmentInfo.classroom.isValid &&
      assignmentInfo.title.isValid &&
      assignmentInfo.duedate.isValid &&
      assignmentInfo.description.isValid
      ? true
      : false;
  };

  const validationConfirm = (key, value) => {
    switch (key) {
      case "course":
      case "classroom":
      case "title":
      case "duedate":
      case "description":
      case "fileupload":
        return ValidationFile.validEmpty(value);
      default:
        return false;
    }
  };

  var emptyAssignmentInfo = useMemo(() => {
    return {
      course: {
        value: "",
        isValid: "",
      },
      classroom: {
        value: "",
        isValid: "",
      },
      title: {
        value: "",
        isValid: "",
      },
      description: {
        value: "",
        isValid: "",
      },
      duedate: {
        value: "",
        isValid: "",
      },
      fileupload: {
        value: "",
        isValid: "",
      },
      mode: FormMode,
      _id: "",
    };
  }, []);

  const [assignmentInfo, setAssignmentInfo] = useState(emptyAssignmentInfo);

  const onSubmit = (e) => {
    e.preventDefault();
    setShowSubmitError(true);
    switch (assignmentInfo.mode) {
      case FormMode.Edit:
        if (isFormValid()) {
          dispatch(
            updateAssignmentData(assignmentId, getFormData())

            // closeModalState(),
            // setTimeout(() => {
            //   dispatch(getAssignmentData(users._id, users.user_institute))
            // }, 1000)
          );
          setAssignmentId("");
        }
        break;

      case FormMode.Create:
        if (
          isFormValid() &&
          validateLib.compareCurrentDateTime(assignmentInfo.duedate.value)
        ) {
          dispatch(postAssignmentData(getFormData(), users.user_fullname));
        }
        break;

      default:
    }
  };

  useEffect(() => {
    if (assignmentCreateSuccess) {
      setAssignmentInfo(emptyAssignmentInfo);
      setCourseSubmit(true);
      setClassroomSubmit(true);
      closeModalState();
    }
  }, [assignmentCreateSuccess, emptyAssignmentInfo]);

  useEffect(() => {
    if (assignmentUpdateSuccess) {
      closeModalState();
    }
  }, [assignmentUpdateSuccess]);

  const getFormData = () => {
    return {
      course: assignmentInfo.course.value,
      classroom: assignmentInfo.classroom.value,
      course_coursename: course,
      classroom_classroomname: classroom,
      title: assignmentInfo.title.value,
      description: assignmentInfo.description.value,
      duedate: assignmentInfo.duedate.value,
      fileupload: assignmentInfo.fileupload.value,
      institute: users.user_institute,
      owner: users._id,
    };
  };
  const onSelect = (value, type) => {
    if (type === "course") {
      let info = courseList.filter((item) => {
        return item.course === value;
      });
      if (info.length)
        setCourse(
          courseList.filter((item) => {
            return item.course === value;
          })[0].course_coursename
        );
      else setCourse("");
    } else {
      let info = courseList.filter((item) => {
        return item.classroom === value;
      });
      if (info.length)
        setClassroom(
          courseList.filter((item) => {
            return item.classroom === value;
          })[0].classroom_classroomname
        );
      else setClassroom("");
    }
  };

  const getAssignmentHeader = (mode) => {
    return mode === FormMode.Edit
      ? "Update Assignment"
      : mode === FormMode.Create
        ? "Add Assignment"
        : "";
  };

  const [searchTerm, setSearchTerm] = useState({
    SearchTerm: {
      value: "",
    },
  });

  const resetSearch = () => {
    let SearchData = {
      ...searchTerm,
      SearchTerm: {
        value: "",
      },
    };
    setSearchTerm(SearchData);

    dispatch(getAssignmentData(users._id, users.user_institute));
  };

  let typing;

  const searchInputHandel = (evt) => {
    if (evt.target.value === "") {
      resetSearch();
    }
    let SearchData = {
      ...searchTerm,
      SearchTerm: {
        value: evt.target.value,
      },
    };
    setSearchTerm(SearchData);
    clearTimeout(typing);
    typing = setTimeout(() => {
      dispatch(
        getSearchAssignmentData(
          users._id,
          users.user_institute,
          evt.target.value
        )
      );
    }, 800);
    if (!evt.target.value) {
      clearTimeout(typing);
    }
  };

  // props that is being pass into the SingleDropdown
  const selectGroup = [
    "Created On",
    "Recent to Old 1",
    "Old to Recent 1",
    "Updated On",
    "Recent to Old 2",
    "Old to Recent 2",
    "Due Date",
    "Recent to Old 3",
    "Old to Recent 3",
  ];

  const filterValues = ["Created On", "Updated On", "Due Date"];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;

    switch (selectedValue) {
      case "ALL": {
        dispatch(getAssignmentData(users._id, users.user_institute));
        break;
      }
      case "Recent to Old 1": {
        dispatch(sortByRecentToOld1Assignment(users._id, users.user_institute));
        break;
      }
      case "Old to Recent 1": {
        dispatch(sortByOldToRecent1Assignment(users._id, users.user_institute));
        break;
      }
      case "Recent to Old 2": {
        dispatch(sortByRecentToOld2Assignment(users._id, users.user_institute));
        break;
      }
      case "Old to Recent 2": {
        dispatch(sortByOldToRecent2Assignment(users._id, users.user_institute));
        break;
      }
      case "Recent to Old 3": {
        dispatch(sortByRecentToOld3Assignment(users._id, users.user_institute));
        break;
      }
      case "Old to Recent 3": {
        dispatch(sortByOldToRecent3Assignment(users._id, users.user_institute));
        break;
      }
      default:
        dispatch(getAssignmentData(users._id, users.user_institute));
    }
  };

  const filterCourseAndClassroom = (selectedData) => {
    selectedData.courseList.length !== 0 &&
      selectedData.classRoomList.length !== 0 &&
      dispatch(
        courseAndClassroomFilter(
          users._id,
          users.user_institute,
          selectedData.courseList,
          selectedData.classRoomList
        )
      );
  };

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);
  const ToggleValue = "Online Classes";

  if (assignmentCreatedByListSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < assignmentCreatedByList.length; i++) {
      value.push(assignmentCreatedByList[i]._id);
    }
    value.push("All");
    if (ToggleValue === "Online Classes") {
      dispatch(AllEntrySelected(value));
      dispatch(AllEntrySelectedSwitch(value));
    }
  }

  const OnSelectedValueCreatedBy = (val) => {
    dispatch(
      filteredAssignmentAccToCreatedBy(users._id, users.user_institute, val)
    );
  };

  const ref=useRef()
  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/teacher-assignments"
            title="Assignment"
          />
        </Breadcrumb>
        <div className="PageTopHead PTH-TeacherAssignments1 mt-20">
          <div className="PTH-Item">
            {assignmentSuccess ? (
              <p className="text-sm w-300">{assignment.length} Assignments</p>
            ) : (
              <p className="text-sm w-300">Assignment</p>
            )}
          </div>

          <div className="PTH-Item P-Right">
            <button
              className="button button-secondary btn-oval btn-sm button-block"
              onClick={() => manageModalState(FormMode.Create)}
            >
              <i className="ed-icon icon-plus-add white i-xs"></i>
              Create Assignment
            </button>
          </div>
        </div>
        <div className="PageTopHead PTH-TeacherAssignments2 mt-20">
          <div className="PTH-Item">
            <SingleSelectDropdown
              SingleSelectHandel={SingleSelectHandel}
              selectGroup={selectGroup}
              filterValues={filterValues}
            />
          </div>
          {/* Don't Remove */}
          <div className="PTH-Item">
            <CourseClassCheckboxFilter
              onSelect={(selectedData) =>
                filterCourseAndClassroom(selectedData)
              }
            />
          </div>
          <div className="PTH-Item">
            <MultipleSelectDropDownCommon
              selectGroup={
                assignmentCreatedByList ? assignmentCreatedByList : []
              }
              OnSelectedValue={OnSelectedValueCreatedBy}
              name={"Created By"}
              SwitchSelectData={false}
            />
          </div>

          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={(evt) => searchInputHandel(evt)}
              onKeyUp={(evt) => searchInputHandel(evt)}
              placeholder="Search Assignments"
            />
          </div>
        </div>
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-2">Title</li>
            <li className="col col-3">Created & Assigned By</li>
            <li className="col col-3">
              <DynamicCourseHeader /> & <DynamicClassroomHeader />
            </li>
            <li className="col col-2">Created & Due Dateeee</li>
            <li className="col col-2">&nbsp;</li>
          </ul>
          <div className="gridBody">
            {assignmentSuccess ? (
              <>
                {assignment.length > 0 ? (
                  assignment.map((item) => {
                    return (
                      <div className="gridRow" key={item._id}>
                        <ul className="topInfo">
                          <li className="col col-2" data-head="Title">
                            {item.title}
                          </li>
                          <li
                            className="col col-3"
                            data-head="Created & Assigned By"
                          >
                            {item.createdBy}{" "}
                            {item.createdBy !== item.assignBy && "-"}{" "}
                            <span>
                              {item.createdBy === item.assignBy
                                ? ""
                                : item.assignBy}
                            </span>
                          </li>
                          <li
                            className="col col-3"
                            data-head={
                              DynamicCourseHeader() +
                              " & " +
                              DynamicClassroomHeader()
                            }
                          >
                            <p>{item.courseInfo_coursename}</p>
                            <p>{item.classroomInfo_classroomname}</p>
                          </li>
                          <li
                            className="col col-2"
                            data-head="Created & Due Date"
                          >
                            <p>
                              {moment(item.createdAt).format(
                                DATETIME_FORMAT_AP
                              )}
                            </p>
                            <p>
                              {moment(item.duedate).format(
                                DATETIME_FORMAT_AP
                              )}
                            </p>
                          </li >
                          <li className="col col-2 actionCols">
                            <div className="actionBtn">
                              <AppLink
                                className="btn-square"
                                title="View"
                                to={{
                                  pathname: `/dashboard/teacher-assignment-view/${item._id}`,
                                  data: item,
                                }}
                              >
                                <span className="cssIcon">
                                  <i className="ed-eye"></i>
                                </span>
                              </AppLink>
                              <button
                                className="btn-square"
                                title="Edit"
                                onClick={() =>
                                  manageEditModalState(
                                    item,
                                    item._id,
                                    FormMode.Edit
                                  )
                                }
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
                            {item._id === assignmentId && (
                              <div
                                ref={dropdownRef}
                                className={`popup removePopup ${isActive ? "active" : "inactive"
                                  }`}
                              >
                                <p className="heading text-xxs">
                                  You are about to remove this assignment.
                                </p>
                                <p className="sub-heading red text-xxs w-500">
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
                                  {assignmentDeleteLoading ? (
                                    <button className="button button-red btn-sm">
                                      Removing...
                                    </button>
                                  ) : (
                                    <button
                                      className="button button-red btn-sm"
                                      onClick={() => {
                                        onClickBtnRemove(item._id);
                                        onClickBtnDropDownRemove(
                                          item._id,
                                          false
                                        );
                                      }}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </li>
                        </ul >
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
        <Modal show={modalState}>
          <ModalHeader
            title={getAssignmentHeader(assignmentInfo.mode)}
            closeButton={true}
            onclose={() => closeModalState()}
          />
          <ModalBody>
            <div className="pageFullCenter">
              <div className="row">
                <div className="col-xs-12 col-md-12">
                  <div className="formFieldwrap">
                    <CourseSelect
                      className={!assignmentInfo.course.isValid && showSubmitError
                        ? "errorInput"
                        : ""
                      }
                      id="select_course"
                      key="courseSelect"
                      courseSubmit={courseSubmit}
                      name="course"
                      value={assignmentInfo.course.value}
                      onSelect={(value) => onSelect(value, "course")}
                      onEvent={handleInput}
                      label={`Select ${DynamicCourseHeader()}`}
                    />

                    <FormError
                      show={
                        !assignmentInfo.course.isValid && showSubmitError
                      }
                      error={`${DynamicCourseHeader()} required.`}
                    />
                  </div>
                  <div className="formFieldwrap">
                    <ClassroomSelect
                      className={!assignmentInfo.classroom.isValid && showSubmitError
                        ? "errorInput"
                        : ""
                      }
                      key="classroomSelect"
                      name="classroom"
                      classroomSubmit={classroomSubmit}
                      value={assignmentInfo.classroom.value}
                      onSelect={(value) => onSelect(value, "classroom")}
                      onEvent={handleInput}
                      label={`Select ${DynamicClassroomHeader()}`}
                    />
                    <FormError
                      show={
                        !assignmentInfo.classroom.isValid && showSubmitError
                      }
                      error={`${DynamicClassroomHeader()} required.`}
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      className={
                        !assignmentInfo.title.isValid && showSubmitError
                          ? "errorInput"
                          : ""
                      }
                      label="Assignment Title"
                      name="title"
                      type="text"
                      value={assignmentInfo.title.value}
                      placeholder="Assignment title"
                      readOnly={assignmentInfo.mode === FormMode.View}
                      onChange={handleInput}
                    />
                    <FormError
                      show={
                        !assignmentInfo.title.isValid && showSubmitError
                      }
                      error="Title required."
                    />
                  </div>
                  <div className="datePickerWrap">
                    <InputDateTimePicker
                      className={
                        `form-control ${!assignmentInfo.title.isValid && showSubmitError
                          ? "errorInput"
                          : ""}`
                      }
                      label="Due Date"
                      name="duedate"
                      onSelect={(selectedDob) =>
                        handleDatePicker(selectedDob)
                      }
                      minDate={minDate}
                      id="duedate"
                      type="datetime-local"
                      value={assignmentInfo.duedate.value}
                      placeholder="Due Date"
                    />
                    <FormError
                      show={
                        !assignmentInfo.duedate.isValid && showSubmitError
                      }
                      error="Due date required."
                    />
                    <FormError
                      show={
                        showSubmitError &&
                        assignmentInfo.duedate.value &&
                        !validateLib.compareCurrentDateTime(
                          assignmentInfo.duedate.value
                        )
                      }
                      error="Date and Time invalid."
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormTextArea
                      className={`form-control ${!assignmentInfo.description.isValid &&
                        showSubmitError
                        ? "errorInput"
                        : ""
                        }`}
                      label="Description"
                      id="exampleFormControlTextarea1"
                      rows="2"
                      name="description"
                      value={assignmentInfo.description.value}
                      readOnly={assignmentInfo.mode === FormMode.View}
                      placeholder="Description"
                      onChange={handleInput}
                    />
                    <FormError
                      className="textareaError"
                      show={
                        !assignmentInfo.description.isValid &&
                        showSubmitError
                      }
                      error="Description required."
                    />
                  </div>
                  <div className="file-upload-input">
                    <label className="labelcst text-xxs w-700">
                      Upload file
                    </label>
                    <ul className="DashedInstructionList mb-5">
                      <li className="text-xxs">
                        {" "}
                        Accept only png, .jpg, .docx, .pdf, and .xlsx and
                        maximum file size 1 MB.
                      </li>
                    </ul>
                    <div className="formFieldwrap">
                      {/* <Upload
                        isFileImage={true}
                        size={1}
                        onUploaded={uploadImage}
                        label="Upload file"
                        clearFileName={clearFileName}
                        hidenFileName={true}
                        invalidError={() => removeFileUpload()}
                        IconFileUploadClass="icon-file-upload base i-xs"
                      /> */}
                      <Uploader size={5}
                          // accept={IMG_ACCEPT}
                          onclose={() => ref?.current?.close()}
                          multiSelect={false} discartRef={ref} onUploaded={(val) => uploadImage(val)} uploadLimit={1} />
                        <UploadButton onClick={() => ref?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="i-md gray" BtnName="Upload Image" />
                    </div>
                    {assignmentInfo.fileupload.value &&assignmentInfo.fileupload?.value?.src? (
                      <div className="attachmentwithtext mt-10 mb-10">
                        <img src={IconAttachment} alt="Icon Attachment" />
                        <a
                          href={assignmentInfo.fileupload.value.src}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Attachment
                        </a>
                      </div>
                    ) : (
                      <p></p>
                    )}
                    {assignmentInfo.fileupload.value && (
                      <button
                        className="button btn-xs btn-o-red red"
                        onClick={removeFileUpload}
                      >
                        {" "}
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="pageFullCenter">
              <div className="row">
                <div className="col-xs-12 col-md-12">
                  {/* <button
                        className="button btn-md button-theme"
                        onClick={onSubmit}
                      >
                        {getAssignmentButtonCaption(assignmentInfo.mode)}
                      </button> */}
                  {assignmentInfo.mode === FormMode.Edit &&
                    assignmentUpdateLoading ? (
                    <>
                      <button className="button btn-md button-theme">
                        Updating Assignment...
                      </button>
                    </>
                  ) : (
                    <>
                      {assignmentInfo.mode === FormMode.Edit &&
                        !assignmentUpdateLoading ? (
                        <button
                          className="button btn-md button-theme"
                          onClick={onSubmit}
                        >
                          Update Assignment
                        </button>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                  {assignmentInfo.mode === FormMode.Create &&
                    assignmentCreateLoading ? (
                    <button className="button btn-md button-theme">
                      Creating Assignment...
                    </button>
                  ) : (
                    <>
                      {assignmentInfo.mode === FormMode.Create &&
                        !assignmentCreateLoading ? (
                        <button
                          className="button btn-md button-theme"
                          onClick={onSubmit}
                        >
                          Create Assignment
                        </button>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </ModalFooter>
        </Modal>

        <div className={`modal modalShowing-${EditmodalState}`}>
          <div className="modalwrapper">
            <span
              className="closeModal text-xxs gray"
              onClick={() => closeEditModalState()}
            >
              Close
            </span>
            <div className="modalHead">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-sm w-300">Edit assignment</h3>
                </div>
              </div>
            </div>
            <div className="modalbody">
              <div className="row mt-20">
                <div className="col-md-11">
                  <SelectInput id="select_course" name="profession_cat" label="Select Course">
                    <option value="0">Select Course</option>
                    <option value="5124">Arts and hobbies</option>
                  </SelectInput>
                  <SelectInput id="select_classroom" name="profession_cat" label="Select Classroom">
                    <option value="0">Select Classroom</option>
                    <option value="5124">Arts and hobbies</option>
                  </SelectInput>
                  <FormInput
                    className=""
                    name="name"
                    type="text"
                    label="Full Name"
                    placeholder="Assignment title"
                  />
                  <FormInput
                    className=""
                    name="name"
                    type="text"
                    label="Full Name"
                    placeholder="Due Date"
                  />
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="2"
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <div className="attachment">
                    <span>
                      <i className="ed-icon icon-attachment gray i-xs"></i>
                      map.pdf
                    </span>
                  </div>
                  <FormInputFileText type="file" />
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <div className="pageFullCenter">
                <div className="row">
                  <div className="col-md-12">
                    <AppLink to="/" className="button btn-md button-theme">
                      Add Assignment
                    </AppLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
}
