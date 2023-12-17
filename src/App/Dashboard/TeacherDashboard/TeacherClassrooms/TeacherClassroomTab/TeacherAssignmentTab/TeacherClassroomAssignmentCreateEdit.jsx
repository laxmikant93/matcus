/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Uploader from "../../../../../../Common/ImageUploader";
import UploadButton from "../../../../../../Common/UploadButton";
import FormInput from "../../../../../../Common/Form/FormInput";
import FormError from "../../../../../../Common/Form/FormError";
import InputDateTimePicker from "../../../../../../Common/Form/InputDateTimePicker";
import FormTextArea from "../../../../../../Common/Form/FormTextArea";
import Validation from "../../../../../../Classes/Validation";
// import IconAttachment from "../../../icon-attachment.svg";
import ModalBody from "../../../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../../../Common/Modal/ModalFooter";
import Modal from "../../../../../../Common/Modal";
import ModalHeader from "../../../../../../Common/Modal/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  AddAssignementClassroom,
  UpdateAssigmentClassroom,
  AddAssignmentClear,
  UpdateAssignmentClear,
  UpdateAssignmentSelectionClear,
} from "../../../../../../store/actions/classroomdetail";
import { useParams } from "react-router";

const CreateEditAssignment = ({
  CloseAssignmentModal,
  modalOpen,
  modalState,
}) => {
  const dispatch = useDispatch();
  const { classroomId, subjectId } = useParams();
  const minDate = new Date();
  const validateLib = new Validation();
  const [showSubmitError, setShowSubmitError] = useState(false);

  const {
    users,
    ClassroomDetail,
    ClassroomDetailSuccess,
    UpdateSelectionSuccess,
    UpdateSelection,
    UpdateLoading,
    addAssignmentClassroomLoading,
    addAssignmentClassroomSuccess,
    UpdateSuccess,
  } = useSelector((state) => {
    return {
      UpdateSelectionSuccess:
        state.classroomDetail.AssignmentUpdateSelection.success,
      UpdateSelection: state.classroomDetail.AssignmentUpdateSelection.data,
      users: state.user,
      ClassroomDetail: state.classroomDetail.classrooomData.data,
      ClassroomDetailSuccess: state.classroomDetail.Assignmentlist.success,
      UpdateLoading: state.classroomDetail.AssignmentUpdate.loading,
      UpdateSuccess: state.classroomDetail.AssignmentUpdate.success,
      addAssignmentClassroomLoading:
        state.classroomDetail.addAssignmentClassroom.loading,
      addAssignmentClassroomSuccess:
        state.classroomDetail.addAssignmentClassroom.success,
    };
  });

  ////// Values
  const [course, setCourse] = useState("");
  const [classroom, setClassroom] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [fileupload, setFileupload] = useState();

  /////// Value Valid or not

  const [titleIsValid, setTitleIsValid] = useState(false);
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [duedateIsValid, setDuedateIsValid] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (UpdateSuccess) {
      CloseAssignmentModal();
      dispatch(UpdateAssignmentClear());
      dispatch(UpdateAssignmentSelectionClear());
    }
  }, [CloseAssignmentModal, UpdateSuccess, dispatch]);

  useEffect(() => {
    if (addAssignmentClassroomSuccess) {
      CloseAssignmentModal();
      dispatch(AddAssignmentClear());
    }
  }, [CloseAssignmentModal, addAssignmentClassroomSuccess, dispatch]);

  useEffect(() => {
    if (subjectId && classroomId) {
      setCourse(classroomId);
      setClassroom(subjectId);
    }
  }, [classroomId, subjectId]);

  useEffect(() => {
    if (
      modalState === "Edit Assignment" &&
      UpdateSelectionSuccess &&
      !isFilled
    ) {
      setIsFilled(true);
      setTitle(UpdateSelection.title);
      setDescription(UpdateSelection.description);
      setDuedate(moment(UpdateSelection.duedate));
      setFileupload(UpdateSelection.fileupload);
      setTitleIsValid(UpdateSelection.title ? true : false);
      setDescriptionIsValid(UpdateSelection.description ? true : false);
      setDuedateIsValid(true);
    }
  }, [
    UpdateSelection.description,
    UpdateSelection.duedate,
    UpdateSelection.fileupload,
    UpdateSelection.title,
    UpdateSelectionSuccess,
    isFilled,
    modalState,
  ]);

  const handleInput = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    switch (inputName) {
      case "title":
        setTitle(inputValue);
        setTitleIsValid(!validateLib.isEmpty(inputValue));
        break;
      case "description":
        setDescription(inputValue);
        setDescriptionIsValid(!validateLib.isEmpty(inputValue));
        break;
      default:
        setTitle(inputValue);
    }
  };

  const uploadImage = (data) => {
    let imgData = data.location;
    setFileupload(imgData);
  };

  const handleDatePicker = (duedate) => {
    setDuedate(duedate);
    setDuedateIsValid(true);
  };

  const removeFileUpload = () => {
    setFileupload("");
  };

  const SubmitAssignmentCreate = () => {
    setShowSubmitError(true);
    if (
      duedateIsValid &&
      descriptionIsValid &&
      titleIsValid &&
      validateLib.compareCurrentDateTime(duedate)
    ) {
      dispatch(AddAssignementClassroom(getFormData(), users.user_fullname));
    }
  };

  const getFormData = () => {
    return {
      course: course,
      classroom: classroom,
      course_coursename: ClassroomDetail.data_courseInfo_coursename,
      classroom_classroomname: ClassroomDetail.data_classroomInfo_classroomname,
      title: title,
      description: description,
      duedate: duedate,
      fileupload: fileupload,
      institute: users.user_institute,
      owner: users._id,
    };
  };

  const SubmitAssignmentUpdate = (_id) => {
    setShowSubmitError(true);
    if (
      duedateIsValid &&
      descriptionIsValid &&
      titleIsValid &&
      validateLib.compareCurrentDateTime(duedate)
    ) {
      dispatch(UpdateAssigmentClassroom(getFormData(), UpdateSelection._id));
    }
  };

  // useEffect(() => {

  // }, [])
  const ref=useRef();

  return (
    <React.Fragment>
      <Modal show={modalOpen}>
        <ModalHeader
          title={modalState}
          closeButton={true}
          onclose={() => CloseAssignmentModal()}
        />
        <ModalBody>
          <div className="pageFullCenter">
            <div className="row">
              <div className="col-xs-12 col-md-12">
                {ClassroomDetailSuccess ? (
                  <React.Fragment>
                    {/* <div className="formFieldwrap">
                      <div>
                        <FormInput
                          className=""
                          id="select_course"
                          key="courseSelect"
                          name="course"
                          value={ClassroomDetail.data_courseInfo_coursename}
                          disabled={true}
                        />
                        <label className="animLabel" htmlFor="select_course">
                          Select <DynamicCourseHeader />
                        </label>
                      </div>
                    </div>
                    <div className="formFieldwrap">
                      <div>
                        <FormInput
                          className=""
                          key="classroomSelect"
                          name="classroom"
                          value={
                            ClassroomDetail.data_classroomInfo_classroomname
                          }
                          disabled={true}
                        />
                        <label className="animLabel" htmlFor="select_course">
                          Select <DynamicClassroomHeader />
                        </label>
                      </div>
                    </div> */}
                    <div className="formFieldwrap">
                      <FormInput
                        className={
                          !titleIsValid && showSubmitError ? "errorInput" : ""
                        }
                        label="Assignment Title"
                        name="title"
                        type="text"
                        value={title}
                        placeholder="Assignment title"
                        onChange={(e) => handleInput(e)}
                      />
                      <FormError
                        show={!titleIsValid && showSubmitError}
                        error="Title required."
                      />
                    </div>
                    <div className="datePickerWrap">
                      <InputDateTimePicker
                        className={
                          `form-control ${!duedateIsValid && showSubmitError ? "errorInput" : ""}`
                        }
                        label="Due Date"
                        name="duedate"
                        onSelect={(selectedDob) =>
                          handleDatePicker(selectedDob)
                        }
                        minDate={minDate}
                        id="duedate"
                        type="datetime-local"
                        value={duedate}
                        placeholder="Due Date"
                      />
                      <FormError
                        show={!duedateIsValid && showSubmitError}
                        error="Due date required."
                      />
                      <FormError
                        show={
                          showSubmitError &&
                          duedateIsValid &&
                          !validateLib.compareCurrentDateTime(duedate)
                        }
                        error="Date and Time invalid."
                      />
                    </div>
                    <div className="formFieldwrap">
                      <FormTextArea
                        className={`form-control ${!descriptionIsValid && showSubmitError
                          ? "errorInput"
                          : ""
                          }`}
                        label="Description"
                        id="exampleFormControlTextarea1"
                        rows="2"
                        name="description"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => handleInput(e)}
                      />
                      <FormError
                        className="textareaError"
                        show={!descriptionIsValid && showSubmitError}
                        error="Description required."
                      />
                    </div>
                    <div className="file-upload-input">
                      <label className="labelcst text-xxs w-700">
                        Upload file
                      </label>
                      <p className="text-xxs">
                        Accept only png, .jpg, .docx, .pdf, and .xlsx and
                        maximum file size 1 MB.
                      </p>
                      <div className="mt-5">
                        <Uploader size={5}
                          // accept={IMG_ACCEPT}
                          onclose={() => ref?.current?.close()}
                          multiSelect={false} discartRef={ref} onUploaded={(val) => fileupload(val)} uploadLimit={1} />
                        <UploadButton onClick={() => ref?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="i-md gray" BtnName="Upload Image" />
                        {fileupload && fileupload.src ? (
                          // <p className="mt-10">
                          //   <img src={IconAttachment} alt="attachment icon" />
                          //   &nbsp;
                          //   <a href={fileupload} target="_blank" rel="noreferrer">
                          //     View Attachment
                          //   </a>
                          // </p>
                          <a
                            className="mt-10"
                            href={fileupload.src}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Attachment
                          </a>
                        ) : (
                          ""
                        )}
                      </div>

                      {fileupload && (
                        <button
                          className="button btn-sm btn-o-red red mt-5"
                          onClick={removeFileUpload}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {modalState === "Edit Assignment" && !UpdateLoading && (
            <button
              className="button btn-md button-theme"
              onClick={() => SubmitAssignmentUpdate()}
            >
              Update Assignment
            </button>
          )}
          {modalState === "Edit Assignment" && UpdateLoading && (
            <button className="button btn-md button-theme">
              Updating Assignment...
            </button>
          )}

          {modalState === "Create Assignment" &&
            !addAssignmentClassroomLoading && (
              <button
                className="button btn-md button-theme"
                onClick={() => SubmitAssignmentCreate()}
              >
                Create Assignment
              </button>
            )}
          {modalState === "Create Assignment" &&
            addAssignmentClassroomLoading && (
              <button className="button btn-md button-theme">
                Creating... Assignment
              </button>
            )}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
export default CreateEditAssignment;
