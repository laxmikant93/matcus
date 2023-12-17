/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Upload from "../../../../Common/Upload/index";
import FormInput from "../../../../Common/Form/FormInput";
import FormError from "../../../../Common/Form/FormError";
import InputDateTimePicker from "../../../../Common/Form/InputDateTimePicker";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import Validation from "../../../../Classes/Validation";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import Modal from "../../../../Common/Modal";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import IconAttachment from "./icon-attachment.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./CreateEditAssignment.scss";
import {
  AddAssignementClassroom,
  UpdateAssigmentClassroom,
  AddAssignmentClear,
  UpdateAssignmentClear,
  UpdateAssignmentSelectionClear,
} from "../../../../store/actions/classroomdetail";
import { useRef } from "react";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
const CreateEditAssignment = ({
  CloseAssignmentModal,
  modalOpen,
  modalState,
}) => {
  const dispatch = useDispatch();
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
      ClassroomDetailSuccess: state.classroomDetail.classrooomData.success,
      UpdateLoading: state.classroomDetail.AssignmentUpdate.loading,
      UpdateSuccess: state.classroomDetail.AssignmentUpdate.success,
      addAssignmentClassroomLoading:
        state.classroomDetail.addAssignmentClassroom.loading,
      addAssignmentClassroomSuccess:
        state.classroomDetail.addAssignmentClassroom.success,
    };
  });
  const ref = useRef(null);
  ////// Values
  const [course, setCourse] = useState("");
  const [classroom, setClassroom] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [fileupload, setFileupload] = useState("");

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
    setCourse(ClassroomDetail.data_courseInfo);
    setClassroom(ClassroomDetail.data_classroomInfo);
  }, [ClassroomDetail.data_classroomInfo, ClassroomDetail.data_courseInfo]);

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
        setTitleIsValid(!validateLib.isEmpty(inputValue.trim()));
        break;
      case "description":
        setDescription(inputValue);
        setDescriptionIsValid(!validateLib.isEmpty(inputValue.trim()));
        break;
      default:
        setTitle(inputValue);
    }
  };

  const uploadImage = (data) => {
    let imgData = data;
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
      course: ClassroomDetail.data_courseInfo,
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
                        className={`form-control ${
                          !duedateIsValid && showSubmitError ? "errorInput" : ""
                        }`}
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
                        className={`form-control ${
                          !descriptionIsValid && showSubmitError
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

                    <div className="file-upload-input formFieldwrap">
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

                      <UploadButton
                        BtnName="Upload File"
                        array={true}
                        IconClassName="icon-file-upload base i-xs"
                        BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                        onClick={() => {
                          ref.current.open();
                        }}
                      />
                      <Uploader
                        size={1}
                        onclose={() => ref.current.close()}
                        multiSelect={false}
                        discartRef={ref}
                        onUploaded={(data) => uploadImage(data)}
                        validationProp={"isFileImage"}
                        uploadLimit={1}
                      />
                      {fileupload?.src ? (
                        <div className="attachmentwithtext mt-10 mb-10">
                          <img src={IconAttachment} alt="" />
                          <a
                            className="text-xxs"
                            href={fileupload?.src}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Attachment
                          </a>
                        </div>
                      ) : (
                        <p></p>
                      )}
                      {fileupload?.src && (
                        <button
                          className="button btn-xs btn-o-red red"
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
