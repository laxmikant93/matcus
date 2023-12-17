/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import FormError from "../../../../Common/Form/FormError";
import InputDateTimePicker from "../../../../Common/Form/InputDateTimePicker";
import ValidatonFile from "../../../Auth/ValidationFile";
import Upload from "../../../../Common/Upload/index";
import Cropper from "../../../../Common/Cropper";
import BackgroundDefault from "../../../../assets/images/img/BackgroundDefault.png";
import { useDispatch, useSelector } from "react-redux";
import { IconAttachment } from "../../../../Common/Icon";
import {
  createAdmission,
  getAdmissionSelection,
  UpdateAdmission,
  updateAdmissionReset,
  createAdmissionReset,
  AdmissionSelectionReset,
} from "../../../../store/actions/admission";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import ValidationFileCommon from "../../../../Classes/ValidationFile";
// import ValidationFile from "../../../Auth/ValidationFile";
import "./Admission.scss";
import SelectInput from "../../../../Common/Form/SelectInput";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
import ImageViewer from "../../../../Common/ImageViewer";

const AddAdmissionDetail = () => {
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const feeStructureRef=useRef()
  const {
    users,
    updateSelectionSuccess,
    updateSelectionData,
    createAdmissionSuccess,
    updateAdmissionSuccess,
    createAdmissionLoading,
    createAdmissionSaveLoading,
    updateAdmissionLoading,
  } = useSelector((state) => {
    return {
      users: state.user,
      updateSelectionSuccess: state.admission.updateSelection.success,
      updateSelectionData: state.admission.updateSelection.data,
      createAdmissionSuccess: state.admission.create.success,
      createAdmissionLoading: state.admission.create.loading,
      createAdmissionSaveLoading: state.admission.create.Saveloading,
      updateAdmissionSuccess: state.admission.update.success,
      updateAdmissionLoading: state.admission.update.loading,
    };
  });

  useEffect(() => {
    return () => {
      dispatch(updateAdmissionReset());
      dispatch(createAdmissionReset());
      dispatch(AdmissionSelectionReset());
    };
  }, [dispatch]);

  const [onlyNumberAge, setOnlyNumberAge] = useState(false);
  const [onlyNumberNoOfSeats, setOnlyNumberNoOfSeats] = useState(false);
  const [onlyNumberCourseFee, setOnlyNumberCourseFee] = useState(false);
  const [onlyNumberApplicationFee, setOnlyNumberApplicationFee] =
    useState(false);
  const [isCreateSuccess, setCreateSuccess] = useState(false);
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  const onlyNumberAgeCheck = () => {
    if (admissionForm.age.value) {
      if (admissionForm.age.isValid) {
        setOnlyNumberAge(true);
      } else {
        setOnlyNumberAge(false);
      }
    } else {
      setOnlyNumberAge(true);
    }
  };

  const onlyNumberSeatsCheck = () => {
    if (admissionForm.noOfSeats.value) {
      if (admissionForm.noOfSeats.isValid) {
        setOnlyNumberNoOfSeats(true);
      } else {
        setOnlyNumberNoOfSeats(false);
      }
    } else {
      setOnlyNumberNoOfSeats(true);
    }
  };
  const onlyNumberCourseFeeCheck = () => {
    if (admissionForm.courseFee.value) {
      if (admissionForm.courseFee.isValid) {
        setOnlyNumberCourseFee(true);
      } else {
        setOnlyNumberCourseFee(false);
      }
    } else {
      setOnlyNumberCourseFee(true);
    }
  };
  const onlyNumberApplicationFeeCheck = () => {
    if (admissionForm.applicationFee.value) {
      if (admissionForm.applicationFee.isValid) {
        setOnlyNumberApplicationFee(true);
      } else {
        setOnlyNumberApplicationFee(false);
      }
    } else {
      setOnlyNumberApplicationFee(true);
    }
  };

  const isFormValid = () => {
    return ValidationUtils.isNotEmpty(description) &&
      ValidationUtils.isNotEmpty(AdmissionProcess) &&
      admissionForm.class.isValid &&
      admissionForm.lastApplyDate.isValid
      ? true
      : false;
  };

  const [submit, setSubmit] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [AdmissionProcess, setAdmissionProcess] = useState("");
  const [AdmissionProcessError, setAdmissionProcessError] = useState(false);
  const [editPostSwitch, setEditPostSwitch] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [prospectus, setProspectus] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [feeStructure, setFeeStructure] = useState("");
  const [statusExpired, setStatusExpired] = useState(false);
  const ref = useRef();
  const prospectusRef = useRef();
  const [admissionForm, setAdmissionForm] = useState({
    title: {
      value: "",
      isValid: false,
    },
    class: {
      value: "",
      isValid: false,
    },
    noOfSeats: {
      value: "",
      isValid: false,
    },
    session: {
      value: "",
      isValid: false,
    },
    age: {
      value: "",
      isValid: false,
    },
    qualification: {
      value: "",
      isValid: false,
    },
    lastApplyDate: {
      value: "",
      isValid: false,
    },
    currencyType: {
      value: "INR",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    courseFee: {
      value: "",
      isValid: false,
    },
    applicationFee: {
      value: "",
      isValid: false,
    },
    currencyTypeApplicationfee: {
      value: "INR",
      isValid: false,
    },
    process: {
      value: "",
      isValid: false,
    },
    prospectus: {
      value: "",
      isValid: false,
    },
    thumbnail: {
      value: "",
      isValid: false,
    },
    feeStructure: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const fillUpdateData = () => {
    let admissionInfoData = {
      ...admissionForm,
      title: {
        value: updateSelectionData.title,
        isValid: ValidatonFile.validEmpty(updateSelectionData.title),
      },
      class: {
        value: updateSelectionData.class,
        isValid: ValidatonFile.validEmpty(updateSelectionData.class),
      },
      noOfSeats: {
        value: updateSelectionData.noOfSeats,
        isValid: ValidatonFile.validEmpty(updateSelectionData.noOfSeats),
      },
      session: {
        value: updateSelectionData.session,
        isValid: ValidatonFile.validEmpty(updateSelectionData.session),
      },
      age: {
        value: updateSelectionData.age,
        isValid: ValidatonFile.validEmpty(updateSelectionData.age),
      },
      qualification: {
        value: updateSelectionData.qualification,
        isValid: ValidatonFile.validEmpty(updateSelectionData.qualification),
      },
      lastApplyDate: {
        value: updateSelectionData.lastApplyDate,
        isValid: ValidatonFile.validEmpty(updateSelectionData.lastApplyDate),
      },
      currencyType: {
        value: updateSelectionData.currencyType,
        isValid: ValidatonFile.validEmpty(updateSelectionData.currencyType),
      },
      process: {
        value: updateSelectionData.process,
        isValid: ValidatonFile.validEmpty(updateSelectionData.process),
      },
      description: {
        value: updateSelectionData.description,
        isValid: ValidatonFile.validEmpty(updateSelectionData.description),
      },
      courseFee: {
        value: updateSelectionData.courseFee,
        isValid: ValidatonFile.validEmpty(updateSelectionData.courseFee),
      },
      applicationFee: {
        value: updateSelectionData.applicationFee,
        isValid: ValidatonFile.validEmpty(updateSelectionData.applicationFee),
      },
      currencyTypeApplicationfee: {
        value: updateSelectionData.currencyTypeApplicationfee,
        isValid: ValidatonFile.validEmpty(
          updateSelectionData.currencyTypeApplicationfee
        ),
      },
      validation: true,
    };
    setProspectus(updateSelectionData.prospectus);
    setThumbnail(updateSelectionData.thumbnail);
    setAdmissionProcess(updateSelectionData.process);
    setDescription(updateSelectionData.description);
    setFeeStructure(updateSelectionData.feeStructure);
    setAdmissionForm(admissionInfoData);
    setOnlyNumberAge(true);
    setOnlyNumberNoOfSeats(true);
    setOnlyNumberCourseFee(true);
    setOnlyNumberApplicationFee(true);
    if (updateSelectionData.status === "Expired") {
      setStatusExpired(true);
    }
  };

  const clearPostData = () => {
    let admissionInfoData = {
      ...admissionForm,
      title: {
        value: "",
        isValid: false,
      },
      class: {
        value: "",
        isValid: false,
      },
      noOfSeats: {
        value: "",
        isValid: false,
      },
      session: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: false,
      },
      qualification: {
        value: "",
        isValid: false,
      },
      lastApplyDate: {
        value: "",
        isValid: false,
      },
      currencyType: {
        value: "INR",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      courseFee: {
        value: "",
        isValid: false,
      },
      applicationFee: {
        value: "",
        isValid: false,
      },
      currencyTypeApplicationfee: {
        value: "INR",
        isValid: false,
      },
      validation: false,
    };
    setProspectus("");
    setThumbnail("");
    setFeeStructure("");
    setAdmissionForm(admissionInfoData);
    setOnlyNumberAge(false);
    setOnlyNumberNoOfSeats(false);
    setOnlyNumberCourseFee(false);
    setOnlyNumberApplicationFee(false);
  };

  if (!isFilled && updateSelectionSuccess) {
    setIsFilled(true);
    fillUpdateData();
  }
  useEffect(()=>{
    if (!editPostSwitch && id) {
      setEditPostSwitch(true);
      dispatch(getAdmissionSelection(id));
    }
  },[editPostSwitch, id])


  if (id === undefined && !isCleared) {
    setIsCleared(true);
    clearPostData();
  }

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if (inputName === "age") {
      let admissionInfoData = {
        ...admissionForm,
        [inputName]: {
          value: ValidationFileCommon.spaceNotAccept(inputValue),
          isValid: ValidatonFile.ValidateNumber(inputValue),
        },
        validation: isFormValid(),
      };
      setAdmissionForm(admissionInfoData);
      onlyNumberAgeCheck();
      onlyNumberSeatsCheck();
      onlyNumberCourseFeeCheck();
      onlyNumberApplicationFeeCheck();
    } else if (inputName === "noOfSeats") {
      let admissionInfoData = {
        ...admissionForm,
        [inputName]: {
          value: ValidationFileCommon.spaceNotAccept(inputValue),
          isValid: ValidatonFile.ValidateNumber(inputValue),
        },
        validation: isFormValid(),
      };
      setAdmissionForm(admissionInfoData);
      onlyNumberAgeCheck();
      onlyNumberSeatsCheck();
      onlyNumberCourseFeeCheck();
      onlyNumberApplicationFeeCheck();
    } else if (inputName === "courseFee") {
      let admissionInfoData = {
        ...admissionForm,
        [inputName]: {
          value: inputValue,
          isValid: ValidatonFile.ValidateNumber(inputValue),
        },
        validation: isFormValid(),
      };
      setAdmissionForm(admissionInfoData);
      onlyNumberAgeCheck();
      onlyNumberSeatsCheck();
      onlyNumberCourseFeeCheck();
      onlyNumberApplicationFeeCheck();
    } else if (inputName === "applicationFee") {
      let admissionInfoData = {
        ...admissionForm,
        [inputName]: {
          value: ValidationFileCommon.spaceNotAccept(inputValue),
          isValid: ValidatonFile.ValidateNumber(inputValue),
        },
        validation: isFormValid(),
      };
      setAdmissionForm(admissionInfoData);
      onlyNumberAgeCheck();
      onlyNumberSeatsCheck();
      onlyNumberCourseFeeCheck();
      onlyNumberApplicationFeeCheck();
    } else {
      let admissionInfoData = {
        ...admissionForm,
        [inputName]: {
          value: ValidationFileCommon.spaceNotAccept(inputValue),
          isValid: ValidatonFile.validEmpty(inputValue),
        },
        validation: isFormValid(),
      };
      setAdmissionForm(admissionInfoData);
      onlyNumberAgeCheck();
      onlyNumberSeatsCheck();
      onlyNumberCourseFeeCheck();
      onlyNumberApplicationFeeCheck();
    }
  };

  const handleOnChangeInput = (val, type) => {
    if (type === "description") {
      setDescription(val);
      setDescriptionError(ValidationUtils.isEmpty(val));
      if (val === "<p><br></p>") {
        setDescriptionError(true);
      }
    } else {
      setAdmissionProcess(val);
      setAdmissionProcessError(ValidationUtils.isEmpty(val));
      if (val === "<p><br></p>") {
        setDescriptionError(true);
      }
    }
  };

  const handleDatePicker = (datetime) => {
    let admissionInfoData = {
      ...admissionForm,
      lastApplyDate: {
        value: datetime,
        isValid: ValidationFileCommon.compareCurrentDateTime(datetime),
      },
      validation: isFormValid(),
    };
    setAdmissionForm(admissionInfoData);
  };

  const uploadProspectus = (data) => {
    let imgData = data;
    setProspectus(imgData);
  };

  const uploadThumbnail = (data) => {
    let imgData = data;
    setThumbnail(imgData);
  };

  const uploadsetFeeStructure = (data) => {
    let imgData = data;
    setFeeStructure(imgData);
  };

  const publishAdmissionForm = () => {
    isFormValid();
    if (
      isFormValid() &&
      onlyNumberAge &&
      onlyNumberNoOfSeats &&
      onlyNumberCourseFee &&
      onlyNumberApplicationFee &&
      ValidationUtils.isNotEmpty(description) &&
      ValidationUtils.isNotEmpty(AdmissionProcess) &&
      description !== "<p><br></p>" &&
      AdmissionProcess !== "<p><br></p>"
    ) {
      let type = "publish";
      dispatch(createAdmission(publishAdmissionDataInfo(), type));
    } else {
      setSubmit(true);
      setDescriptionError(true);
      setAdmissionProcessError(true);
    }
  };
  const publishAdmissionDataInfo = () => {
    return {
      title: admissionForm.title.value,
      class: admissionForm.class.value,
      noOfSeats: admissionForm.noOfSeats.value,
      session: admissionForm.session.value,
      age: admissionForm.age.value,
      qualification: admissionForm.qualification.value,
      lastApplyDate: admissionForm.lastApplyDate.value,
      currencyType: admissionForm.currencyType.value,
      description: description,
      courseFee: admissionForm.courseFee.value,
      applicationFee: admissionForm.applicationFee.value,
      currencyTypeApplicationfee:
        admissionForm.currencyTypeApplicationfee.value,
      process: AdmissionProcess,
      prospectus: prospectus,
      thumbnail: thumbnail,
      feeStructure: feeStructure,
      status: "Active",
      institute: users.user_institute,
      owner: users._id,
    };
  };

  const saveAdmissionForm = () => {
    isFormValid();
    if (
      isFormValid() &&
      onlyNumberAge &&
      onlyNumberNoOfSeats &&
      onlyNumberCourseFee &&
      onlyNumberApplicationFee &&
      ValidationUtils.isNotEmpty(description) &&
      ValidationUtils.isNotEmpty(AdmissionProcess) &&
      description !== "<p><br></p>" &&
      AdmissionProcess !== "<p><br></p>"
    ) {
      let type = "save";
      dispatch(createAdmission(saveAdmissionDataInfo(), type));
    } else {
      setSubmit(true);
      setAdmissionProcessError(true);
      setDescriptionError(true);
    }
  };

  if (createAdmissionSuccess && !isCreateSuccess) {
    setCreateSuccess(true);
    history("/admission-list");
  }
  if (updateAdmissionSuccess && !isCreateSuccess) {
    setCreateSuccess(true);
    history("/admission-list");
  }

  const saveAdmissionDataInfo = () => {
    return {
      title: admissionForm.title.value,
      class: admissionForm.class.value,
      noOfSeats: admissionForm.noOfSeats.value,
      session: admissionForm.session.value,
      age: admissionForm.age.value,
      qualification: admissionForm.qualification.value,
      lastApplyDate: admissionForm.lastApplyDate.value,
      currencyType: admissionForm.currencyType.value,
      description: description,
      courseFee: admissionForm.courseFee.value,
      applicationFee: admissionForm.applicationFee.value,
      currencyTypeApplicationfee:
        admissionForm.currencyTypeApplicationfee.value,
      process: AdmissionProcess,
      prospectus: prospectus,
      thumbnail: thumbnail,
      feeStructure: feeStructure,
      status: "Saved",
      institute: users.user_institute,
      owner: users._id,
    };
  };

  /////// EDIT WORK ////////

  const updateAdmissionSubmit = () => {
    isFormValid();
    if (
      isFormValid() &&
      onlyNumberAge &&
      onlyNumberNoOfSeats &&
      onlyNumberCourseFee &&
      onlyNumberApplicationFee &&
      ValidationUtils.isNotEmpty(description) &&
      ValidationUtils.isNotEmpty(AdmissionProcess) &&
      description !== "<p><br></p>" &&
      AdmissionProcess !== "<p><br></p>"
    ) {
      if (
        statusExpired &&
        ValidationFileCommon.compareCurrentDateTime(
          admissionForm.lastApplyDate.value
        )
      ) {
        let SuccessPopChange = true;
        dispatch(
          UpdateAdmission(updateAdmissionDataInfo(), id, SuccessPopChange)
        );
      } else {
        let SuccessPopChange = false;
        dispatch(
          UpdateAdmission(updateAdmissionDataInfo(), id, SuccessPopChange)
        );
      }
    } else {
      setSubmit(true);
      setAdmissionProcessError(true);
      setDescriptionError(true);
    }
  };
  const updateAdmissionDataInfo = () => {
    if (
      statusExpired &&
      ValidationFileCommon.compareCurrentDateTime(
        admissionForm.lastApplyDate.value
      )
    ) {
      return {
        title: admissionForm.title.value,
        class: admissionForm.class.value,
        noOfSeats: admissionForm.noOfSeats.value,
        session: admissionForm.session.value,
        age: admissionForm.age.value,
        qualification: admissionForm.qualification.value,
        lastApplyDate: admissionForm.lastApplyDate.value,
        currencyType: admissionForm.currencyType.value,
        description: description,
        courseFee: admissionForm.courseFee.value,
        applicationFee: admissionForm.applicationFee.value,
        currencyTypeApplicationfee:
          admissionForm.currencyTypeApplicationfee.value,
        process: AdmissionProcess,
        prospectus: prospectus,
        thumbnail: thumbnail,
        feeStructure: feeStructure,
        institute: users.user_institute,
        owner: users._id,
        status: "Active",
      };
    } else {
      return {
        title: admissionForm.title.value,
        class: admissionForm.class.value,
        noOfSeats: admissionForm.noOfSeats.value,
        session: admissionForm.session.value,
        age: admissionForm.age.value,
        qualification: admissionForm.qualification.value,
        lastApplyDate: admissionForm.lastApplyDate.value,
        currencyType: admissionForm.currencyType.value,
        description: description,
        courseFee: admissionForm.courseFee.value,
        applicationFee: admissionForm.applicationFee.value,
        currencyTypeApplicationfee:
          admissionForm.currencyTypeApplicationfee.value,
        process: AdmissionProcess,
        prospectus: prospectus,
        thumbnail: thumbnail,
        feeStructure: feeStructure,
        institute: users.user_institute,
        owner: users._id,
      };
    }
  };

  const removeProspectus = () => {
    setProspectus("");
  };
  const removeThumbnail = () => {
    setThumbnail("");
  };
  const removeFeeStructure = () => {
    setFeeStructure("");
  };

  return (
    <React.Fragment>
      <div className="AddAdmissionCst">
        <div className="AddAdmissionList">
          <Card className="AdmissionProfileCard">
            <CardBody>
              <div className="formFieldwrap">
                <FormInput
                  className={
                    !admissionForm.title.isValid && submit ? "errorInput" : ""
                  }
                  label="Admission Title"
                  placeholder="Admission Title"
                  value={admissionForm.title.value}
                  name="title"
                  maxLength="93"
                  onKeyUp={handleInput}
                  onChange={handleInput}
                />
                <FormError
                  show={!admissionForm.title.isValid && submit}
                  error="Title is required."
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  className={
                    !admissionForm.class.isValid && submit ? "errorInput" : ""
                  }
                  label="For Class or Course"
                  placeholder="For Course or Class"
                  name="class"
                  value={admissionForm.class.value}
                  maxLength="199"
                  onKeyUp={handleInput}
                  onChange={handleInput}
                />
                <FormError
                  show={!admissionForm.class.isValid && submit}
                  error="Course or class is required."
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  className={
                    !admissionForm.noOfSeats.isValid &&
                    !admissionForm.noOfSeats.value === "" &&
                    !onlyNumberNoOfSeats &&
                    submit
                      ? "errorInput"
                      : ""
                  }
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  label="No. of Seats"
                  placeholder="No. of Seats"
                  min="0"
                  name="noOfSeats"
                  value={admissionForm.noOfSeats.value}
                  onKeyDown={(e) =>
                    symbolsArr.includes(e.key) && e.preventDefault()
                  }
                  maxLength="10"
                  onKeyUp={handleInput}
                  onChange={handleInput}
                />
                <FormError
                  show={
                    !admissionForm.noOfSeats.isValid &&
                    admissionForm.noOfSeats.value === "" &&
                    !onlyNumberNoOfSeats &&
                    submit
                  }
                  error="No. of seats is required."
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  label="Session"
                  placeholder="Session"
                  name="session"
                  value={admissionForm.session.value}
                  maxLength="199"
                  onKeyUp={handleInput}
                  onChange={handleInput}
                  className={
                    !admissionForm.class.isValid && submit ? "errorInput" : ""
                  }
                />
                <FormError
                  show={!admissionForm.class.isValid && submit}
                  error="Required is Session"
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  className={
                    !admissionForm.age.isValid &&
                    !admissionForm.age.value === "" &&
                    !onlyNumberAge &&
                    submit
                      ? "errorInput"
                      : ""
                  }
                  label=" Minimum Age"
                  value={admissionForm.age.value}
                  placeholder=" Minimum Age"
                  name="age"
                  onKeyDown={(e) =>
                    symbolsArr.includes(e.key) && e.preventDefault()
                  }
                  maxLength="9"
                  onKeyUp={handleInput}
                  onChange={handleInput}
                />
                <FormError
                  show={
                    !admissionForm.age.isValid &&
                    !admissionForm.age.value === "" &&
                    !onlyNumberAge &&
                    submit
                  }
                  error="Minimum age is required."
                />
              </div>
              <div className="formFieldwrap">
                <SelectInput
                  name="qualification"
                  value={admissionForm.qualification.value}
                  onChange={handleInput}
                  onKeyUp={handleInput}
                  label="Minimum Qualification"
                >
                  <option value=""> Select Qualification</option>
                  <option>Not Applicable</option>
                  <option>10th</option>
                  <option>10+2</option>
                  <option>Under Graduate</option>
                  <option>Post Graduate</option>
                  <option>Diploma</option>
                  <option>Certification</option>
                  <option>Specialist Degree</option>
                  <option>Others</option>
                </SelectInput>
              </div>
              <div className="datePickerWrap">
                <InputDateTimePicker
                  className={`form-control mb-5 ${
                    !admissionForm.lastApplyDate.isValid && submit
                      ? "errorInput"
                      : ""
                  }`}
                  value={admissionForm.lastApplyDate.value}
                  onSelect={(selectedDob) => handleDatePicker(selectedDob)}
                  label="Application Deadline"
                  name="lastApplyDate"
                  id="class_timing"
                  type="datetime-local"
                  placeholder="Application Deadline"
                  minDate={new Date()}
                />
                <FormError
                  show={
                    !admissionForm.lastApplyDate.isValid &&
                    !admissionForm.lastApplyDate.value &&
                    submit
                  }
                  error="Application deadline is required."
                />
                <FormError
                  show={
                    admissionForm.lastApplyDate.value &&
                    !admissionForm.lastApplyDate.isValid &&
                    submit
                  }
                  error="Date-Time should be in future."
                />
              </div>
              <div className="formFieldwrap">
                <div className="select-input-group">
                  <div className="input-group-prepend">
                    <select
                      className="form-control primary"
                      name="currencyType"
                      value={admissionForm.currencyType.value}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                    >
                      <option value="INR">&#8377;&nbsp; INR</option>
                      <option value="USD">&#36;&nbsp; USD</option>
                      <option value="EURO">&euro;&nbsp; EURO</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    className={`form-control ${
                      !admissionForm.courseFee.isValid &&
                      !admissionForm.courseFee.value === "" &&
                      !onlyNumberCourseFee &&
                      submit
                        ? "errorInput"
                        : ""
                    }`}
                    defaultValue={admissionForm.courseFee.value}
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }
                    maxLength="99"
                    name="courseFee"
                    onKeyUp={handleInput}
                    onChange={handleInput}
                    placeholder="Course Fee"
                  />
                  <label className="animLabel">Course Fee</label>
                </div>
                <FormError
                  show={
                    !admissionForm.courseFee.isValid &&
                    !admissionForm.courseFee.value === "" &&
                    !onlyNumberCourseFee &&
                    submit
                  }
                  error="Course fee is required. "
                />
              </div>
              <div className="formFieldwrap">
                <div className="select-input-group">
                  <div className="input-group-prepend">
                    <select
                      className="form-control primary"
                      name="currencyTypeApplicationfee"
                      value={admissionForm.currencyTypeApplicationfee.value}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                    >
                      <option value="INR">&#8377;&nbsp; INR</option>
                      <option value="USD">&#36;&nbsp; USD</option>
                      <option value="EURO">&euro;&nbsp; EURO</option>
                    </select>
                  </div>
                  <input
                    className={`form-control ${
                      !admissionForm.applicationFee.isValid &&
                      !admissionForm.applicationFee.value === "" &&
                      !onlyNumberApplicationFee &&
                      submit
                        ? "errorInput"
                        : ""
                    }`}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    label="Application Fee"
                    placeholder="Application Fee"
                    value={admissionForm.applicationFee.value}
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }
                    name="applicationFee"
                    maxLength="99"
                    onKeyUp={handleInput}
                    onChange={handleInput}
                  />
                  <label className="animLabel">Application Fee</label>
                </div>
                <FormError
                  show={
                    !admissionForm.applicationFee.isValid &&
                    !admissionForm.applicationFee.value === "" &&
                    !onlyNumberApplicationFee &&
                    submit
                  }
                  error="Application fee is required."
                />
              </div>
            </CardBody>
          </Card>
          <Card className="cardPadding mt-40">
            <CardBody>
              <p className="text-xs w-600 mb-10">Course Description</p>
              <div className="formFieldwrap">
                {/* <FormTextArea
                  className={
                    !admissionForm.description.isValid && submit
                      ? "errorInput"
                      : ""
                  }
                  label="Description"
                  rows="3"
                  TextareaBtmTxt="2000"
                  placeholder="Describe the course and its key learnings."
                  value={admissionForm.description.value}
                  name="description"
                  onKeyUp={handleInput}
                  onChange={handleInput}
                  maxLength={2000}
                /> */}
                <TextEditor
                  preFilledData={description}
                  currentResponse={(value) =>
                    handleOnChangeInput(value, "description")
                  }
                />
                <FormError
                  show={descriptionError && description === "<p><br></p>"}
                  error="Course description is required."
                />
              </div>
            </CardBody>
          </Card>
          <Card className="cardPadding mt-40">
            <CardBody>
              <p className="text-xs w-600 mb-10">Admission Process</p>
              <div className="formFieldwrap">
                {/* <FormTextArea
                  className={
                    !admissionForm.process.isValid && submit ? "errorInput" : ""
                  }
                  label="Process"
                  placeholder="Describe the admission process in steps."
                  value={admissionForm.process.value}
                  name="process"
                  onKeyUp={handleInput}
                  onChange={handleInput}
                  maxlength={1999}
                  rows="3"
                  TextareaBtmTxt="2000"
                ></FormTextArea> */}
                <TextEditor
                  preFilledData={AdmissionProcess}
                  currentResponse={(value) =>
                    handleOnChangeInput(value, "Process")
                  }
                />
                <FormError
                  show={
                    AdmissionProcessError && AdmissionProcess === "<p><br></p>"
                  }
                  error="Process is required."
                />
              </div>
            </CardBody>
          </Card>
          <Card className="cardPadding mt-40">
            <CardBody>
              <p className="text-xs w-500">Upload Prospectus or Brochure</p>
              <ul className="DashedInstructionList">
                <li className="text-xxs">
                  Accept only .PNG, .JPG or .PDF file.
                </li>
              </ul>
              <div className="formFieldwrap mt-15">
                <UploadButton
                  BtnName="Upload File"
                  IconClassName="icon-file-upload base i-xs"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  onClick={() => {
                    prospectusRef.current.open();
                  }}
                />
                <Uploader
                  size={1}
                  onclose={() => prospectusRef.current.close()}
                  multiSelect={false}
                  discartRef={prospectusRef}
                  onUploaded={(data) => uploadProspectus(data)}
                  validationProp={"onlyImagePdf"}
                  uploadLimit={1}
                />
                {prospectus?.src ? (
                  <p className="mt-10">
                    <i className="ed-icon icon-attachment gray i-xs"></i>
                    <a href={prospectus?.src} target="_blank" rel="noreferrer">
                      View Attachment
                    </a>
                  </p>
                ) : (
                  ""
                )}

                {prospectus?.src && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={removeProspectus}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            </CardBody>
          </Card>

          <Card className="cardPadding mt-40">
            <CardBody>
              <p className="text-xs w-500">Upload Thumbnail/Banner</p>
              <ul className="DashedInstructionList">
                <li className="text-xxs">Accept only .PNG or .JPG file.</li>
              </ul>
              <div className="formFieldwrap mt-15">
                {/* <Cropper
                  minWidth={300}
                  ref={ref}
                  maxWidth={600}
                  defaultRatio={5 / 3}
                  onUploaded={uploadThumbnail}
                  BtnName="Upload Image"
                  IconClassName="i-md gray"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                /> */}
                 <UploadButton
                  BtnName="Upload Image"
                  IconClassName="i-md gray"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  onClick={() => {
                    ref.current.open();
                  }}
                  showLink={true}
                  object={thumbnail}
                />
                <Uploader
                  onclose={() => ref.current.close()}
                  multiSelect={false}
                  discartRef={ref}
                  onUploaded={(data) => uploadThumbnail(data)}
                  uploadLimit={1}
                />
                
              </div>
              <div className="ThumnailPreview">
                <ImageViewer object={thumbnail} defaultImage={BackgroundDefault}/> 
                
                <br></br>
                {thumbnail?.src && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={removeThumbnail}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            </CardBody>
          </Card>
          <Card className="cardPadding mt-40">
            <CardBody>
              <p className="text-xs w-500">Upload Fee Structure</p>
              <ul className="DashedInstructionList">
                <li className="text-xxs">
                  Accept only .PNG, .JPG or .PDF file.
                </li>
              </ul>
              <div className="formFieldwrap mt-15">
                {/* <Upload
                  size={1}
                  label="Upload File"
                  onUploaded={uploadsetFeeStructure}
                  onlyImagePdf={true}
                  hidenFileName={true}
                  invalidError={() => removeFeeStructure()}
                  IconFileUploadClass="icon-file-upload base i-xs"
                /> */}
                 <UploadButton
                  BtnName="Upload Image"
                  IconClassName="icon-file-upload base i-xs"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  onClick={() => {
                    feeStructureRef.current.open();
                  }}
                  showLink={false}
                />
                <Uploader
                size={1}
                  onclose={() => feeStructureRef.current.close()}
                  multiSelect={false}
                  validationProp={"onlyImagePdf"}
                  discartRef={feeStructureRef}
                  onUploaded={(data) => uploadsetFeeStructure(data)}
                  uploadLimit={1}
                />
                {feeStructure?.src ? (
                  <p className="mt-10">
                    <i className="ed-icon icon-attachment gray i-xs"></i>
                    <a
                      href={feeStructure?.src}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Attachment
                    </a>
                  </p>
                ) : (
                  ""
                )}
                {feeStructure?.src && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={removeFeeStructure}
                  >
                    {" "}
                    Remove
                  </button>
                )}
              </div>
            </CardBody>
          </Card>
          {editPostSwitch && isFilled ? (
            <div className="mt-40">
              {updateAdmissionLoading ? (
                <button className="button btn-md button-theme btn-md">
                  Admission Updating..
                </button>
              ) : (
                <button
                  className="button btn-md button-theme btn-md"
                  onClick={updateAdmissionSubmit}
                >
                  Update Admission
                </button>
              )}
            </div>
          ) : (
            <div className="mt-40">
              {createAdmissionLoading ? (
                <button className="button btn-md button-theme btn-md">
                  Publishing...
                </button>
              ) : (
                <button
                  className="button btn-md button-theme btn-md mb-5"
                  onClick={publishAdmissionForm}
                >
                  Publish Admission
                </button>
              )}
              {createAdmissionSaveLoading ? (
                <button className="button btn-md button-theme btn-md mb-5">
                  Saving Admission...
                </button>
              ) : (
                <button
                  className="button btn-o-primary primary btn-md mb-5"
                  onClick={saveAdmissionForm}
                >
                  Save for later
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-30">&nbsp;</div>
    </React.Fragment>
  );
};

export default AddAdmissionDetail;
