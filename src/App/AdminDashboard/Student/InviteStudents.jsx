/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import FormInput from "../../../Common/Form/FormInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postStudentData,
  postBulkUpload,
  postBulkUploadClear,
  successInviteStudentReset,
} from "../../../store/actions/student";
import { getCourseData } from "../../../store/actions/courses";
import FormError from "../../../Common/Form/FormError";
import ValidationUtils from "../../../Classes/ValidationUtils";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import UploadFile from "../../../Common/Upload";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ProgressLoader from "../../../assets/images/img/progress-loader.gif";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { DynamicCourseHeader } from "../../../Common/UserElement";
import { getStudentUserInfoData, resetStudentList } from "../../../store/actions/studentlistuserinfo";
import "./AdminDashboardStudent.scss";
import ValidationFile from "../../../Classes/ValidationFile";
import SelectInput from "../../../Common/Form/SelectInput";
import UploadButton from "../../../Common/UploadButton";
import Uploader from "../../../Common/ImageUploader";

export default function InviteStudents() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { user, createSuccess, createErrorData, createManualInviteLoading,
    createManualInviteSuccess, createManualInviteData,
    createManualInviteError } =
    useSelector((state) => {
      return {
        user: state.user,
        createSuccess: state.students.create.success,
        studentData: state.studentlistuserinfo.studentdatainfo.data,
        createErrorData: state.students.errorInvite.data,
        createManualInviteLoading: state.students.manualInvite.loading,
        createManualInviteSuccess: state.students.manualInvite.success,
        createManualInviteData: state.students.manualInvite.data,
        createManualInviteError: state.students.manualInvite.error,

      };
    });

  useEffect(() => {
    dispatch(getCourseData(user.user_institute));
    dispatch(postBulkUploadClear());
  }, [dispatch, user]);

  const courses = useSelector((state) => state.courses.list.data);
  const studentBulkUploadLoadding = useSelector(
    (state) => state.students.create.loading
  );

    const ref=useRef()
  const [showCourseError, setShowCourseError] = useState(false);
  const [showSameContactError, setSameContactErr] = useState(false);
  const [showContactNoErr, setShowContactNoErr] = useState(false);

  const [showFullnameError, setShowFullnameErr] = useState(false);
  const [showAdmissionNoError, setAdmissionNoErr] = useState(false);
  const [showSameAdmissionNoError, setSameAdmissionNoErr] = useState(false);

  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);
  const [submitCheck, SetSubmitCheck] = useState(false);
  const [createErrorDataisFilled, setCreateErrorDataisFilled] = useState(false);


  var emptyStudentFields = useMemo(() => {
    return {
      email: "",
      course: "",
      fullname: "",
      admission_no: "",
      country_code: "",
      courseIsValid: false,
      contact: "",
      dialCodeInd: false,
      contactIsValid: false,
      contactIsSame: true,
      emailIsValid: false,
      kind: "",
      fullnameIsValid: false,
      emailIsSame: true,
    };
  }, []);

  const [studentFields, setStudentFields] = useState([emptyStudentFields]);

  const handleRemoveClick = (position) => {
    if (createManualInviteError) {
      dispatch(successInviteStudentReset());
      SetSubmitCheck(false);
    }
    let newinputs = studentFields.filter(
      (student, index) => index !== position
    );
    setStudentFields([...newinputs]);
  };

  const handleAddClick = () => {
    if (createManualInviteError) {
      dispatch(successInviteStudentReset());
    }
    SetSubmitCheck(false);
    let allNew = studentFields;
    allNew.push({
      email: "",
      course: "",
      fullname: "",
      admission_no: "",
      contact: "",
      country_code: "",
      dialCodeInd: false,
      contactIsValid: false,
      contactIsSame: true,
      courseIsValid: false,
      emailIsValid: false,
      fullnameIsValid: false,
      admission_noIsValid: false,
      admission_noIsSame: true,
      emailIsSame: true,
    });

    setStudentFields([...allNew]);
  };

  const handleInput = (e, key) => {
    let inputValue = e.target.value;
    inputValue = inputValue.toLowerCase();
    let allinputs = studentFields;
    allinputs[key]["email"] = inputValue;
    allinputs[key]["emailIsValid"] =
      ValidationUtils.isEmail(inputValue) &&
      ValidationUtils.isNotEmpty(inputValue);
    allinputs[key]["emailIsSame"] = checkSameEmail(inputValue);
    allinputs[key]["kind"] = "student";
    allinputs[key]["institute"] = user.user_institute;
    allinputs[key]["owner"] = user._id;

    setStudentFields([...allinputs]);
    isEmailValid();
    isSameEmail();
    SetSubmitCheck(false);

    setErrorShow(false);
  };

  const checkSameEmail = (inputValue) => {
    let sameData = studentFields.filter((item) => item.email === inputValue);

    if (sameData.length > 1) {
      return false;
    } else {
      return true;
    }
  };

  const isSameEmail = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
      if (!element.emailIsSame) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const handleChange = (e, key) => {
    let value = e.target.value;
    let allinputs = studentFields;
    allinputs[key]["course"] = value;
    allinputs[key]["courseIsValid"] = ValidationUtils.isNotEmpty(value);
    setStudentFields([...allinputs]);
    isCourseFormValid();
    SetSubmitCheck(false);
    if (createManualInviteError) {
      dispatch(successInviteStudentReset());
    }
  };

  const fullNameHandleChange = (e, key) => {
    let value = e.target.value;
    let allinputs = studentFields;
    allinputs[key]["fullname"] = ValidationFile.removeSpaceFullName(value, allinputs[key]["fullname"]);
    allinputs[key]["fullnameIsValid"] = ValidationUtils.isNotEmpty(ValidationFile.removeSpaceFullName(value, allinputs[key]["fullname"]));
    setStudentFields([...allinputs]);
    isFullNameValid();
    SetSubmitCheck(false);
    if (createManualInviteError) {
      dispatch(successInviteStudentReset());
    }
  };

  const admissionNoHandleChange = (e, key) => {
    let value = e.target.value.trim();
    let allinputs = studentFields;
    allinputs[key]["admission_no"] = ValidationFile.removeSpace(value);
    allinputs[key]["admission_noIsValid"] = ValidationUtils.isNotEmpty(ValidationFile.removeSpace(value));
    allinputs[key]["admission_noIsSame"] = checkSameAdmissionNo(ValidationFile.removeSpace(value));
    setStudentFields([...allinputs]);
    isAdmissionNoValid();
    setSameAdmissionNoErr(false);
    SetSubmitCheck(false);
    setErrorShow(false);
    isSameAdmissionNo();
    if (createManualInviteError) {
      dispatch(successInviteStudentReset());
    }
  };

  const checkSameAdmissionNo = (value) => {
    let sameData = studentFields.filter((item) => item.admission_no === value);

    if (sameData.length > 1) {
      return false;
    } else {
      return true;
    }
  };

  const isSameAdmissionNo = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
      if (!element.admission_noIsSame) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setSameAdmissionNoErr(false);
    } else {
      setSameAdmissionNoErr(true);
    }
    return isValid;
  };

  const isEmailValid = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
      if (
        !ValidationUtils.isEmail(element.email) ||
        ValidationUtils.isEmpty(element.email)
      ) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const isFullNameValid = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
      if (ValidationUtils.isEmpty(element.fullname)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setShowFullnameErr(false);
    } else {
      setShowFullnameErr(true);
    }
    return isValid;
  };

  const isAdmissionNoValid = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
      if (ValidationUtils.isEmpty(element.admission_no)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setAdmissionNoErr(false);
    } else {
      setAdmissionNoErr(true);
    }
    return isValid;
  };

  const isCourseFormValid = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
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

  const handleInputContact = (value, formattedValue, key) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    let allinputs = studentFields;
    allinputs[key]["contact"] = inputValue;
    allinputs[key]["kind"] = "student";
    allinputs[key]["institute"] = user.user_institute;
    allinputs[key]["owner"] = user._id;
    allinputs[key]["country_code"] = dialCode;
    allinputs[key]["contactIsSame"] = checkSameContact(inputValue);
    allinputs[key]["contactIsValid"] =
      inputValue.length < 10 && inputValue.length > 2 && inputValue !== ""
        ? true
        : false;
    if (formattedValue.dialCode === "91") {
      allinputs[key]["dialCodeInd"] = true;
    } else {
      allinputs[key]["dialCodeInd"] = false;
    }
    setStudentFields([...allinputs]);
    SetSubmitCheck(false);
    isContactNoValid();
    setErrorShow(false);
    if (createManualInviteError) {
      dispatch(successInviteStudentReset());
    }
  };

  const checkSameContact = (inputValue) => {
    let sameData = studentFields.filter((item) => item.contact === inputValue);

    if (sameData.length > 1) {

      return false;
    } else {

      return true;
    }
  };

  const IsContactSame = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
      if (!element.contactIsSame) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setSameContactErr(false);
    } else {
      setSameContactErr(true);
    }
    return isValid;
  };

  const isContactNoValid = () => {
    let isValid = true;
    for (let key = 0; key < studentFields.length; key++) {
      const element = studentFields[key];
      if (element.dialCodeInd) {
        if (
          element.contact.length < 10 &&
          element.contact.length > 2 &&
          element.contact !== ""
        ) {
          isValid = false;
          break;
        }
      } else {
        if (
          element.contact.length < 10 &&
          element.contact.length > 4 &&
          element.contact !== ""
        ) {
          isValid = false;
          break;
        }
      }
    }
    if (isValid) {
      setShowContactNoErr(false);
    } else {
      setShowContactNoErr(true);
    }
    return isValid;
  };

  const removeContactNumber = () => {
    let allinputs = studentFields;
    for (let key = 0; key < allinputs.length; key++) {
      const element = allinputs[key];
      if (element.dialCodeInd && element.contact.length < 3) {
        element["contact"] = "";
      }
      if (!element.dialCodeInd && element.contact.length < 5) {
        element["contact"] = "";
      }
    }
    setStudentFields([...allinputs]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SetSubmitCheck(true);
    const isCourseValid = isCourseFormValid();
    const isFullNameValidCheck = isFullNameValid();
    const isAdmissionNoValidCheck = isAdmissionNoValid();
    const isAdmissionNoSame = isSameAdmissionNo();
    const isEmailSame = isSameEmail();
    const isContactSame = IsContactSame();
    const isContactValid = isContactNoValid();
    if (
      isCourseValid &&
      isFullNameValidCheck &&
      isAdmissionNoValidCheck &&
      isAdmissionNoSame &&
      isEmailSame &&
      isContactSame &&
      isContactValid
    ) {
      removeContactNumber();
      dispatch(postStudentData(studentFields));
      setTimeout(() => {
        setCreateErrorDataisFilled(false);
      }, 500);
    } else {
    }
  };

  const [successRedirect, setSuccessRedirect] = useState(false);
  const [ErrorShow, setErrorShow] = useState(false);

  if (createManualInviteSuccess &&
    !createManualInviteError && !successRedirect) {
    setSuccessRedirect(true);
    dispatch(successInviteStudentReset());
    history(`/invite-student-list`);
  }

  const loadingModal = () => {
    SetScheduleClassModal(!ScheduleClassModal);
  };

  const uploadHandel = (data) => {
    let fileData = data;
    dispatch(postBulkUpload(bulkUploadData(fileData.src,fileData.key)));
  };
  const bulkUploadData = (fileData,key) => {
    return {
      institute: user.user_institute,
      owner: user._id,
      kind: "student",
      url: fileData,
      key:key
    };
  };

  if (createManualInviteError && !createErrorDataisFilled) {
    setStudentFields(createManualInviteData);
    setErrorShow(true);

    setCreateErrorDataisFilled(true);

  }
  useEffect(() => {
    return () => {
      dispatch(resetStudentList());
    };
  }, [dispatch]);

  if (studentBulkUploadLoadding) {
    history("/dashboard")
  }
  useEffect(() => {
    (
      getStudentUserInfoData(
        user.user_institute,
        process.env.REACT_APP_STUDENT
      )
    );
  }, [dispatch, user]);

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="invite-students" title="Invite Students" />
      </Breadcrumb>
      <div className="inviteStudentWrappper mt-20">
        <div className="inviteStudentItem">
          <p className="text-sm w-300">Invite Students</p>
          <p className="text-xxs">
            You can invite up to <span className="w-500">10 students</span> at
            a time.
          </p>
          {studentFields.map((student, key) => {
            return (
              <div key={key} className="invite-main-wrap mt-15">
                <div className="invite-wrap">
                  <div className="formFieldwrap">
                    <div className="cstmPhoneInput">
                      <PhoneInput
                        countryCodeEditable={false}
                        containerClass="form-group"
                        inputClass="form-control"
                        specialLabel="hii"
                        placeholder="Mobile No."
                        country={"in"}
                        inputProps={{
                          name: "phone",
                          required: true,
                          autoFocus: true,
                        }}
                        enableSearch
                        disableSearchIcon
                        onChange={(value, formattedValue) => {
                          handleInputContact(value, formattedValue, key);
                        }}
                        onKeyUp={(value, formattedValue) => {
                          handleInputContact(value, formattedValue, key);
                        }}
                        value={`${studentFields[key]["country_code"]} + ${studentFields[key]["contact"]}`}
                      />
                      <label className="animLabel" htmlFor="mobile_number">
                        Mobile Number*
                      </label>
                    </div>
                    {showSameContactError && (
                      <FormError
                        show={!studentFields[key]["contactIsSame"]}
                        error="Mobile number is same."
                      ></FormError>
                    )}
                    {submitCheck && studentFields[key].contact === "" && (
                      <FormError
                        show={studentFields[key].contact === ""}
                        error="Mobile number is required."
                      ></FormError>
                    )}
                    {showContactNoErr && submitCheck && (
                      <FormError
                        show={studentFields[key]["contactIsValid"]}
                        error="Mobile number is invalid."
                      ></FormError>
                    )}

                    {createManualInviteError &&
                      ErrorShow ? (
                      <>
                        {
                          <FormError
                            show={
                              studentFields[key]["contactError"]
                            }
                            error={studentFields[key]["errorMessage"]}
                          ></FormError>
                        }
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="formFieldwrap">
                    <FormInput
                      className={
                        showFullnameError && submitCheck ? "errorInput" : ""
                      }
                      name={key}
                      type="text"
                      label="full Name*"
                      value={student.fullname}
                      onKeyUp={(e) => fullNameHandleChange(e, key)}
                      onChange={(e) => fullNameHandleChange(e, key)}
                      placeholder="Student Full Name"
                    />
                    {showFullnameError && submitCheck && (
                      <FormError
                        show={!studentFields[key]["fullnameIsValid"]}
                        error="Full name is required."
                      ></FormError>
                    )}
                  </div>

                  <div className="formFieldwrap">
                    <FormInput
                      className={showAdmissionNoError === true && showSameAdmissionNoError && submitCheck ? "errorInput" : ''}
                      name={key}
                      type="text"
                      label="Admission Number*"
                      value={student.admission_no}
                      onKeyUp={(e) => admissionNoHandleChange(e, key)}
                      onChange={(e) => admissionNoHandleChange(e, key)}
                      placeholder="Admission number*"
                    />
                    {submitCheck && showAdmissionNoError && (
                      <FormError
                        show={!studentFields[key].admission_noIsValid && studentFields[key].admission_no === ""}
                        error="Admission number is required."
                      ></FormError>
                    )}
                    {submitCheck && showSameAdmissionNoError && (
                      <FormError
                        show={studentFields[key].admission_no && !studentFields[key]["admission_noIsSame"]}
                        error="Admission number is Same."
                      ></FormError>
                    )}
                    {createManualInviteError &&
                      ErrorShow ? (
                      <>
                        {
                          <FormError
                            show={
                              studentFields[key]["admissionError"]
                            }
                            error={studentFields[key]["errorMessage"]}
                          ></FormError>
                        }
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="courseSelectWrapper">
                    <div className="formFieldwrap">

                      <SelectInput
                        onChange={(e) => handleChange(e, key)}
                        name={key}
                        id="select_Course"
                        value={student.course}
                        className={showCourseError && submitCheck ? "errorInput" : ""
                        }
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
                      {showCourseError && submitCheck && (
                        <FormError
                          show={!studentFields[key]["course"]}
                          error={`${DynamicCourseHeader()} is required.`}
                        ></FormError>
                      )}
                    </div>
                  </div>
                  <div>
                    {studentFields.length !== 1 && (
                      <button
                        type="button"
                        onClick={(e) => handleRemoveClick(key)}
                        className="button btn-o-red red btn-xs mb-20"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="inviteStudentItem">
          <div className="bulk-xls-upload">
            <p className="text-xs w-500 mb-10">Bulk Students Invite</p>
            {/* <UploadFile
              placeholder="Upload Excel Sheet"
              label="Upload Excel Sheet"
              onUploaded={uploadHandel}
              onlyXml={true}
              loadingModal={loadingModal}
              bulkUpload={true}
              size={100}
              IconFileUploadClass="icon-file-upload primary i-xs text-center"
            /> */}
              <UploadButton
                     placeholder="Upload Excel Sheet"
                    label="Upload Excel Sheet"
                      BtnName="Upload Excel Sheet"
                      IconFileUploadClass="icon-file-upload primary i-xs text-center"
                      onClick={()=>{ref.current.open()}}
                    />
               <Uploader size={100}
       onclose={() => ref.current.close()} validationProp={"onlyXml"} bulkUpload={true}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadHandel(data)}  uploadLimit={1} />
            <p className="text-2xs w-300">
              Max limit of one time bulk upload is 500.
            </p>
          </div>
          <div className="Bulk-teacher-invite-section">
            <div className="bulk-xls-download">
              <p className="text-xxs">
                First download our sample format and <br />
                fill your data as per column.
              </p>
              <a
                className="btnText text-xxs mt-8"
                href={process.env.REACT_APP_DEMO_XLS_STUDENT}
              >
                <i> Download Excel Sheet</i>
                <i className="ed-icon icon-download i-s primary"></i>
              </a>
            </div>
          </div>
        </div>

      </div>
      <div className="group-button">
        {studentFields.length !== 10 && (
          <button
            onClick={handleAddClick}
            className="button btn-o-primary btn-sm w-500"
          >
            Invite More
          </button>
        )}
        {createManualInviteLoading ? (
          <button className="button btn-sm button-primary">
            Invitation Sending... <i className="animate-r-arrow-icon"></i>
          </button>
        ) : (
          <button onClick={handleSubmit} className="button btn-sm button-primary">
            Send Invitations <i className="animate-r-arrow-icon"></i>
          </button>
        )}
      </div>
      <Modal show={ScheduleClassModal}>
        <ModalBody>
          <div className="mt-40 mb-40 text-center">
            <p className="text-sm">File Uploading</p>
            <img className="mt-20" src={ProgressLoader} alt="" />
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
