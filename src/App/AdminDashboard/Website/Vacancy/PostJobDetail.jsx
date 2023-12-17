/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import Cropper from "../../../../Common/Cropper";
import InputDateTimePicker from "../../../../Common/Form/InputDateTimePicker";
import FormError from "../../../../Common/Form/FormError";
import Upload from "../../../../Common/Upload/index";
import BackgroundDefault from "../../../../assets/images/img/BackgroundDefault.png";
import ValidatonFile from "../../../Auth/ValidationFile";
import { useDispatch, useSelector } from "react-redux";
import {
  createVacancy,
  getVacancySelection,
  UpdateVacancy,
  updateSelectionReset,
  updateVacancyReset,
  VacancySelectionReset,
  createVacancyReset,
} from "../../../../store/actions/vacancy";
import ValidationFileCommon from "../../../../Classes/ValidationFile";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { IconAttachment } from "../../../../Common/Icon";
import "./Vacancy.scss";
import SelectInput from "../../../../Common/Form/SelectInput";
import TextEditor from "../../../../Common/Form/TextEditor";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
import ImageViewer from "../../../../Common/ImageViewer";
const PostJobDetail = () => {
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const { id } = useParams();
  const ref = useRef();
  const dispatch = useDispatch();
  const history = useNavigate();
  const docRef = useRef();
  const {
    users,
    updateSelectionSuccess,
    updateSelectionData,
    updateSuccess,
    createVacancySuccess,
    createVacancysaveLoading,
    createVacancyLoading,
    updateLoading,
    businesstype,
  } = useSelector((state) => {
    return {
      users: state.user,
      businesstype: state.user.user_business_type,
      updateSelectionSuccess: state.vacancy.updateSelection.success,
      updateSelectionData: state.vacancy.updateSelection.data,
      createVacancySuccess: state.vacancy.create.success,
      createVacancyLoading: state.vacancy.create.loading,
      createVacancysaveLoading: state.vacancy.create.saveLoading,
      updateSuccess: state.vacancy.update.success,
      updateLoading: state.vacancy.update.loading,
    };
  });

  useEffect(() => {
    return () => {
      dispatch(updateSelectionReset());
      dispatch(updateVacancyReset());
      dispatch(VacancySelectionReset());
      dispatch(createVacancyReset());
    };
  }, [dispatch]);

  ////////// BEFORE INITILIZATION FUNCTIONS

  const isFormValid = () => {
    if (postJobVacancy.title.isValid && postJobVacancy.position.isValid) {
      return true;
    }
    if (ValidationUtils.isEmpty(description) || description === "<p><br></p>") {
      // setDescriptionError(true);
      return false;
    } else {
      return false;
    }
  };

  const onlyNumber1 = () => {
    if (postJobVacancy.noOfPosition.value) {
      if (postJobVacancy.noOfPosition.isValid) {
        setOnlyNumberNoOfPositon(true);
      } else {
        setOnlyNumberNoOfPositon(false);
      }
    } else {
      setOnlyNumberNoOfPositon(true);
    }
  };

  const onlyNumber2 = () => {
    if (postJobVacancy.annualSalary.value) {
      if (postJobVacancy.annualSalary.isValid) {
        setAnnualSalaryOnlyNumber(true);
      } else {
        setAnnualSalaryOnlyNumber(false);
      }
    } else {
      setAnnualSalaryOnlyNumber(true);
    }
  };

  const validDueDateCheck = () => {
    if (postJobVacancy.lastApplyDate.value) {
      if (!postJobVacancy.lastApplyDate.isValid) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const [uploadThumbnail, setUploadThumbnail] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [submit, setSubmit] = useState(false);
  const [onlyNumberNoOfPositon, setOnlyNumberNoOfPositon] = useState(false);
  const [annualSalaryOnlyNumber, setAnnualSalaryOnlyNumber] = useState(false);
  const [editPostSwitch, setEditPostSwitch] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [isCreateSuccess, setCreateSuccess] = useState(false);
  const [statusExpired, setStatusExpired] = useState(false);
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [keyRoles, setKeyRoles] = useState("");

  const [postJobVacancy, setPostJobVacancy] = useState({
    title: {
      value: "",
      isValid: false,
    },
    position: {
      value: "",
      isValid: false,
    },
    noOfPosition: {
      value: "",
      isValid: false,
    },
    annualSalary: {
      value: "",
      isValid: false,
    },
    currencyType: {
      value: "INR",
      isValid: false,
    },
    qualification: {
      value: "",
      isValid: false,
    },
    experience: {
      value: "",
      isValid: false,
    },
    lastApplyDate: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    keyRoles: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const fillUpdateData = () => {
    let jobVacancy = {
      ...postJobVacancy,
      title: {
        value: updateSelectionData.title,
        isValid: ValidatonFile.validEmpty(updateSelectionData.title),
      },
      position: {
        value: updateSelectionData.position,
        isValid: ValidatonFile.validEmpty(updateSelectionData.position),
      },
      noOfPosition: {
        value: updateSelectionData.noOfPosition,
        isValid: ValidatonFile.validEmpty(updateSelectionData.noOfPosition),
      },
      annualSalary: {
        value: updateSelectionData.annualSalary,
        isValid: ValidatonFile.validEmpty(updateSelectionData.annualSalary),
      },
      currencyType: {
        value: updateSelectionData.currencyType,
        isValid: ValidatonFile.validEmpty(updateSelectionData.currencyType),
      },
      qualification: {
        value: updateSelectionData.qualification,
        isValid: ValidatonFile.validEmpty(updateSelectionData.qualification),
      },
      experience: {
        value: updateSelectionData.experience,
        isValid: ValidatonFile.validEmpty(updateSelectionData.experience),
      },
      lastApplyDate: {
        value: updateSelectionData.lastApplyDate,
        isValid: ValidatonFile.validEmpty(updateSelectionData.lastApplyDate),
      },
      description: {
        value: updateSelectionData.description,
        isValid: ValidatonFile.validEmpty(updateSelectionData.description),
      },
      keyRoles: {
        value: updateSelectionData.keyRoles,
        isValid: ValidatonFile.validEmpty(updateSelectionData.keyRoles),
      },
      validation: true,
    };
    setDescription(updateSelectionData.description);
    setKeyRoles(updateSelectionData.keyRoles);
    setUploadThumbnail(updateSelectionData.thumbnail);
    setUploadDescription(updateSelectionData.fileUpload);
    setPostJobVacancy(jobVacancy);
    setOnlyNumberNoOfPositon(true);
    setAnnualSalaryOnlyNumber(true);
    if (updateSelectionData.isStatus === "Expired") {
      setStatusExpired(true);
    }
  };

  // console.log(description, "line no 87");

  const clearPostData = () => {
    let jobVacancy = {
      ...postJobVacancy,
      title: {
        value: "",
        isValid: false,
      },
      position: {
        value: "",
        isValid: false,
      },
      noOfPosition: {
        value: "",
        isValid: false,
      },
      annualSalary: {
        value: "",
        isValid: false,
      },
      currencyType: {
        value: "INR",
        isValid: false,
      },
      qualification: {
        value: "",
        isValid: false,
      },
      experience: {
        value: "",
        isValid: false,
      },
      lastApplyDate: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      keyRoles: {
        value: "",
        isValid: false,
      },
      validation: false,
    };
    setUploadThumbnail("");
    setUploadDescription("");
    setPostJobVacancy(jobVacancy);
    setOnlyNumberNoOfPositon(false);
    setAnnualSalaryOnlyNumber(false);
  };

  if (!editPostSwitch && id) {
    setEditPostSwitch(true);
    dispatch(getVacancySelection(id, businesstype));
  }

  if (id === undefined && !isCleared) {
    setIsCleared(true);
    clearPostData();
  }

  if (!isFilled && updateSelectionSuccess) {
    setIsFilled(true);
    fillUpdateData();
  }

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if (inputName === "noOfPosition") {
      let jobVacancy = {
        ...postJobVacancy,
        [inputName]: {
          value: inputValue,
          isValid: ValidatonFile.ValidateNumber(inputValue),
        },
        validation: isFormValid(),
      };
      setPostJobVacancy(jobVacancy);
      onlyNumber1();
      onlyNumber2();
      validDueDateCheck();
    } else if (inputName === "annualSalary") {
      let jobVacancy = {
        ...postJobVacancy,
        [inputName]: {
          value: inputValue,
          isValid: ValidatonFile.ValidateNumber(inputValue),
        },
        validation: isFormValid(),
      };
      setPostJobVacancy(jobVacancy);
      onlyNumber1();
      onlyNumber2();
      validDueDateCheck();
    } else {
      let jobVacancy = {
        ...postJobVacancy,
        [inputName]: {
          value: inputValue,
          isValid: ValidatonFile.validEmpty(inputValue),
        },
        validation: isFormValid(),
      };

      setPostJobVacancy(jobVacancy);
      validDueDateCheck();
      onlyNumber1();
      onlyNumber2();
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
      setKeyRoles(val);
    }
  };

  const handleDatePicker = (datetime) => {
    let vacancyInfoData = {
      ...postJobVacancy,
      lastApplyDate: {
        value: datetime,
        isValid: ValidationFileCommon.compareCurrentDateTime(datetime),
      },
      validation: isFormValid(),
    };
    setPostJobVacancy(vacancyInfoData);
    validDueDateCheck();
    onlyNumber1();
    onlyNumber2();
  };

  ///////FILE UPLOAD DESC
  const uploadJobDescription = (data) => {
    let imgData = data;
    setUploadDescription(imgData);
  };
  const removeUplaodDescription = () => {
    setUploadDescription("");
  };
  ///////FILE UPLOAD THUMBNAIL
  const uploadJobThumbnail = (data) => {
    let imgData = data;
    // let imgData = s3Url + "fit-in/300x180/" + data.location.replace(
    //   "https://edneed-images-uat.s3.amazonaws.com/", "");
    setUploadThumbnail(imgData);
  };
  const removeUploadThumbnail = () => {
    setUploadThumbnail("");
  };

  const publishVacancy = () => {
    isFormValid();
    validDueDateCheck();

    if (ValidationUtils.isEmpty(description) || description === "<p><br></p>") {
      setDescriptionError(true);
    }

    if (
      isFormValid() &&
      onlyNumberNoOfPositon &&
      annualSalaryOnlyNumber &&
      validDueDateCheck() &&
      ValidationUtils.isNotEmpty(description) &&
      description !== "<p><br></p>"
    ) {
      let type = "publish";
      dispatch(createVacancy(publishVacancyDataInfo(), type));
    } else {
      setSubmit(true);
      // setDescriptionError(true);
    }
  };
  const publishVacancyDataInfo = () => {
    return {
      title: postJobVacancy.title.value,
      qualification: postJobVacancy.qualification.value,
      position: postJobVacancy.position.value,
      noOfPosition: postJobVacancy.noOfPosition.value,
      lastApplyDate: postJobVacancy.lastApplyDate.value,
      keyRoles: keyRoles,
      experience: postJobVacancy.experience.value,
      description: description,
      annualSalary: postJobVacancy.annualSalary.value,
      currencyType: postJobVacancy.currencyType.value,
      fileUpload: uploadDescription,
      thumbnail: uploadThumbnail,
      isStatus: "Active",
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      industry: businesstype,
    };
  };

  const saveJobVacancy = () => {
    isFormValid();

    if (ValidationUtils.isEmpty(description) || description === "<p><br></p>") {
      setDescriptionError(true);
    }

    if (
      isFormValid() &&
      onlyNumberNoOfPositon &&
      annualSalaryOnlyNumber &&
      validDueDateCheck() &&
      ValidationUtils.isNotEmpty(description) &&
      description !== "<p><br></p>"
    ) {
      dispatch(createVacancy(saveJobVacancyDataInfo()));
      //history("/vacancy")
    } else {
      setSubmit(true);
      // setDescriptionError(true);
    }
  };
  const saveJobVacancyDataInfo = () => {
    return {
      title: postJobVacancy.title.value,
      qualification: postJobVacancy.qualification.value,
      position: postJobVacancy.position.value,
      noOfPosition: postJobVacancy.noOfPosition.value,
      lastApplyDate: postJobVacancy.lastApplyDate.value,
      keyRoles: keyRoles,
      experience: postJobVacancy.experience.value,
      description: description,
      annualSalary: postJobVacancy.annualSalary.value,
      fileUpload: uploadDescription,
      thumbnail: uploadThumbnail,
      isStatus: "Saved",
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      industry: businesstype,
    };
  };

  /////// EDIT WORK ////////

  const updateVacancySubmit = () => {
    isFormValid();

    if (ValidationUtils.isEmpty(description) || description === "<p><br></p>") {
      setDescriptionError(true);
    }

    if (
      isFormValid() &&
      onlyNumberNoOfPositon &&
      annualSalaryOnlyNumber &&
      validDueDateCheck() &&
      ValidationUtils.isNotEmpty(description) &&
      description !== "<p><br></p>"
    ) {
      if (
        statusExpired &&
        ValidationFileCommon.compareCurrentDateTime(
          postJobVacancy.lastApplyDate.value
        )
      ) {
        let SuccessPopChange = true;
        dispatch(
          UpdateVacancy(updateJobVacancyDataInfo(), id, SuccessPopChange)
        );
      } else {
        let SuccessPopChange = false;
        dispatch(
          UpdateVacancy(updateJobVacancyDataInfo(), id, SuccessPopChange)
        );
      }
    } else {
      setSubmit(true);
      // setDescriptionError(true);
    }
  };
  const updateJobVacancyDataInfo = () => {
    if (
      statusExpired &&
      ValidationFileCommon.compareCurrentDateTime(
        postJobVacancy.lastApplyDate.value
      )
    ) {
      return {
        title: postJobVacancy.title.value,
        qualification: postJobVacancy.qualification.value,
        position: postJobVacancy.position.value,
        noOfPosition: postJobVacancy.noOfPosition.value,
        lastApplyDate: postJobVacancy.lastApplyDate.value,
        keyRoles: keyRoles,
        experience: postJobVacancy.experience.value,
        description: description,
        annualSalary: postJobVacancy.annualSalary.value,
        currencyType: postJobVacancy.currencyType.value,
        fileUpload: uploadDescription,
        thumbnail: uploadThumbnail,
        institute: users.user_institute,
        owner: users._id,
        isStatus: "Active",
        industry: businesstype,
      };
    } else {
      return {
        title: postJobVacancy.title.value,
        qualification: postJobVacancy.qualification.value,
        position: postJobVacancy.position.value,
        noOfPosition: postJobVacancy.noOfPosition.value,
        lastApplyDate: postJobVacancy.lastApplyDate.value,
        currencyType: postJobVacancy.currencyType.value,
        keyRoles: keyRoles,
        experience: postJobVacancy.experience.value,
        description: description,
        annualSalary: postJobVacancy.annualSalary.value,
        fileUpload: uploadDescription,
        thumbnail: uploadThumbnail,
        institute: users.user_institute,
        owner: users._id,
        industry: businesstype,
      };
    }
  };

  if (createVacancySuccess && !isCreateSuccess) {
    setCreateSuccess(true);
    history("/vacancy-list");
  }
  if (updateSuccess && !isCreateSuccess) {
    setCreateSuccess(true);
    history("/vacancy-list");
  }
  return (
    <React.Fragment>
      <div className="AddVacancyCst">
        <div className="AddVacancyList">
          <Card className="JobProfileCard">
            <CardBody>
              <div className="formFieldwrap">
                <FormInput
                  className={
                    !postJobVacancy.title.isValid && submit ? "errorInput" : ""
                  }
                  label="Job Title"
                  placeholder="Job Title"
                  defaultValue={postJobVacancy.title.value}
                  name="title"
                  onKeyUp={handleInput}
                  onChange={handleInput}
                  maxLength={93}
                />
                <FormError
                  show={!postJobVacancy.title.isValid && submit}
                  error="Title is required."
                />
              </div>
              <div className="formFieldwrap ">
                <SelectInput
                  name="position"
                  value={postJobVacancy.position.value}
                  onKeyUp={handleInput}
                  onChange={handleInput}
                  className={
                    !postJobVacancy.position.isValid && submit
                      ? "errorInput"
                      : ""
                  }
                  label="Position Type"
                >
                  <option value="">Position Type</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Internship</option>
                  <option>Contractual</option>
                  <option>Zero Contract</option>
                  <option>Trainee</option>
                  <option>Volunteer</option>
                </SelectInput>
                <FormError
                  show={!postJobVacancy.position.isValid && submit}
                  error="Please select position type."
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  className={`cstmSelectWrap`}
                  label="No. of Positions"
                  placeholder="No. of Positions"
                  defaultValue={postJobVacancy.noOfPosition.value}
                  onKeyDown={(e) =>
                    symbolsArr.includes(e.key) && e.preventDefault()
                  }
                  name="noOfPosition"
                  onKeyUp={handleInput}
                  onChange={handleInput}
                />
                {/* <FormError
                  show={
                    !postJobVacancy.noOfPosition.isValid &&
                    !postJobVacancy.noOfPosition.value == "" &&
                    !onlyNumberNoOfPositon &&
                    submit
                  }
                  error="No. of positions is required."
                /> */}
              </div>
              <div className="formFieldwrap">
                <div className="select-input-group">
                  <div className="input-group-prepend">
                    <select
                      className="form-control primary"
                      name="currencyType"
                      value={postJobVacancy.currencyType.value}
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
                    className={`form-control`}
                    placeholder="Annual Salary"
                    defaultValue={postJobVacancy.annualSalary.value}
                    name="annualSalary"
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }
                    onKeyUp={handleInput}
                    onChange={handleInput}
                  />
                  <label className="animLabel">Annual Salary</label>
                </div>
                {/* <FormError
                  show={
                    !postJobVacancy.annualSalary.isValid &&
                    !postJobVacancy.annualSalary.value == "" &&
                    submit &&
                    !annualSalaryOnlyNumber
                  }
                  error="Annual salary is required."
                /> */}
              </div>
              <div className="formFieldwrap">
                <SelectInput
                  name="qualification"
                  value={postJobVacancy.qualification.value}
                  onChange={handleInput}
                  onKeyUp={handleInput}
                  label="Minimum Qualification"
                >
                  <option value="">Qualification</option>
                  <option>10th</option>
                  <option>10+2</option>
                  <option>Under Graduate</option>
                  <option>Post Graduate</option>
                  <option>Bachelor’s in Education (B.Ed)</option>
                  <option>Diploma</option>
                  <option>Master’s in Education (M.Ed)</option>
                  <option>Certification</option>
                  <option>Central Teacher Eligibility Test</option>
                  <option>Specialist Degree</option>
                  <option>Others</option>
                </SelectInput>
              </div>
              <div className="formFieldwrap">
                <SelectInput
                  name="experience"
                  value={postJobVacancy.experience.value}
                  onChange={handleInput}
                  onKeyUp={handleInput}
                  label="Minimum Experience"
                >
                  <option value="">Select in years</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>10 plus</option>
                </SelectInput>
              </div>
              <div className="datePickerWrap">
                <InputDateTimePicker
                  className={`form-control ${
                    !postJobVacancy.lastApplyDate.isValid && submit
                      ? "errorInput"
                      : ""
                  }`}
                  value={postJobVacancy.lastApplyDate.value}
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
                    postJobVacancy.lastApplyDate.value &&
                    !postJobVacancy.lastApplyDate.isValid &&
                    submit
                  }
                  error="Date-Time should be in future."
                />
              </div>
            </CardBody>
          </Card>
          <Card className="cardPadding mt-40">
            <CardBody>
              <p className="text-xs w-600 mb-10">Job Description</p>
              <div className="formFieldwrap pb-0">
                {/* <FormTextArea
                  className={
                    !postJobVacancy.description.isValid && submit
                      ? "errorInput"
                      : ""
                  }
                  label="Description"
                  placeholder="Describe the job and its purpose in your institute."
                  defaultValue={postJobVacancy.description.value}
                  name="description"
                  onKeyUp={handleInput}
                  style={{ whiteSpace: " pre-wrap" }}
                  onChange={handleInput}
                  maxLength={2000}
                  rows="5"
                  TextareaBtmTxt="2000"
                ></FormTextArea> */}
                <TextEditor
                  preFilledData={description}
                  currentResponse={(value) =>
                    handleOnChangeInput(value, "description")
                  }
                />
                <FormError
                  show={descriptionError}
                  error="Job description is required."
                />
              </div>
            </CardBody>
          </Card>
          <Card className="cardPadding mt-40">
            <CardBody>
              <p className="text-xs w-600">
                Upload job description or related document
              </p>
              <ul className="DashedInstructionList">
                <li className="text-xxs">
                  For images accept only .PDF, .PNG or .JPG file format.
                </li>
              </ul>
              <div className="formFieldwrap mt-15">
                <UploadButton
                  BtnName="Upload File"
                  IconClassName="icon-file-upload base i-xs"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  onClick={() => {
                    docRef.current.open();
                  }}
                />
                <Uploader
                  size={2}
                  onclose={() => docRef.current.close()}
                  multiSelect={false}
                  discartRef={docRef}
                  onUploaded={(data) => uploadJobDescription(data)}
                  validationProp={"onlyImagePdf"}
                  uploadLimit={1}
                />
              </div>
              {uploadDescription?.src ? (
                <p className="mt-10">
                  <i className="ed-icon icon-attachment gray i-xs"></i>
                  <a
                    href={uploadDescription?.src}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Attachment
                  </a>
                </p>
              ) : (
                ""
              )}
              {uploadDescription?.src && (
                <button
                  className="button btn-sm btn-o-red red mt-8"
                  onClick={removeUplaodDescription}
                >
                  {" "}
                  Remove
                </button>
              )}
            </CardBody>
          </Card>
          <Card className="cardPadding mt-40">
            <CardBody>
              <p className="text-xs w-600">Upload Thumbnail/Banner</p>
              <ul className="DashedInstructionList">
                <li className="text-xxs">Accept only .PNG, .JPG file.</li>
              </ul>
              <div className="formFieldwrap mt-15">
                {/* <Upload
                  size={1}
                  label="Upload File"
                  onUploaded={uploadJobThumbnail}
                  hidenFileName={true}
                  invalidError={() => removeUploadThumbnail()}
                /> */}

                <UploadButton
                  BtnName="Upload Image"
                  IconClassName="i-md gray"
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                  onClick={() => {
                    ref.current.open();
                  }}
                  object={uploadThumbnail}
                  showLink={true}
                />
                <Uploader
                  size={2}
                  onclose={() => ref.current.close()}
                  multiSelect={false}
                  discartRef={ref}
                  onUploaded={(data) => uploadJobThumbnail(data)}
                  uploadLimit={1}
                />
                
              </div>
              <div className="ThumnailPreview">
                <ImageViewer object={uploadThumbnail} defaultImage={BackgroundDefault}/> 
               
                <br></br>
                {uploadThumbnail && (
                  <button
                    className="button btn-sm btn-o-red red mt-8"
                    onClick={removeUploadThumbnail}
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
              <p className="text-xs w-600 mb-10">
                Key Roles & Responsibilities
              </p>
              <div className="formFieldwrap pb-0">
                {/* <FormTextArea
                  label="Key & Roles"
                  placeholder="Elaborate on the general tasks and daily responsibilities. "
                  name="keyRoles"
                  style={{ whiteSpace: " pre-wrap" }}
                  defaultValue={postJobVacancy.keyRoles.value}
                  onKeyUp={handleInput}
                  onChange={handleInput}
                  maxLength={2000}
                  rows="5"
                  TextareaBtmTxt="2000"
                ></FormTextArea> */}
                <TextEditor
                  preFilledData={keyRoles}
                  currentResponse={(value) =>
                    handleOnChangeInput(value, "keyRole")
                  }
                />
              </div>
            </CardBody>
          </Card>
          {editPostSwitch && isFilled ? (
            <div className="mt-40">
              {updateLoading ? (
                <button className="button btn-md button-theme btn-md">
                  Updating Job...
                </button>
              ) : (
                <button
                  className="button btn-md button-theme btn-md"
                  onClick={updateVacancySubmit}
                >
                  Update Job
                </button>
              )}
            </div>
          ) : (
            <div className="mt-40">
              {createVacancyLoading ? (
                <button className="button btn-md button-theme btn-md">
                  Publishing
                </button>
              ) : (
                <button
                  className="button btn-md button-theme btn-md"
                  onClick={publishVacancy}
                >
                  Publish Job
                </button>
              )}
              {createVacancysaveLoading ? (
                <button className="button btn-md button-theme btn-md">
                  Saving Job...
                </button>
              ) : (
                <button
                  className="button btn-o-primary btn-md primary"
                  onClick={saveJobVacancy}
                >
                  Save for later
                </button>
              )}
            </div>
          )}
        </div>
        <div className="mt-30">&nbsp;</div>
      </div>
    </React.Fragment>
  );
};

export default PostJobDetail;
