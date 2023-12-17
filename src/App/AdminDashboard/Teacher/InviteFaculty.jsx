/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { useDispatch, useSelector } from "react-redux";
import {
  postTeacherDataInvite,
  postBulkUpload,
  createTeacherDataRest,
  postBulkUploadClear,
} from "../../../store/actions/inviteteacher";
import FormInput from "../../../Common/Form/FormInput";
import FormError from "../../../Common/Form/FormError";
import "./AdminDashboardTeacher.scss";
import ValidationUtils from "../../../Classes/ValidationUtils";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { getCourseData } from "../../../store/actions/courses";
import { getClassroomDataInviteFaculty } from "../../../store/actions/classroom";
import { IconDownload } from "../../../Common/Icon";
import UploadFile from "../../../Common/Upload";
import PhoneInput from "react-phone-input-2";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ProgressLoader from "../../../assets/images/img/progress-loader.gif";
import Storage from "../../../Classes/Storage";
import "react-phone-input-2/lib/style.css";
import "./AdminDashboardTeacher.scss"
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import { getFacultyUserInfoData, resetTeacherList } from "../../../store/actions/studentlistuserinfo";
import StaffList from ".";
import UploadButton from "../../../Common/UploadButton";
import Uploader from "../../../Common/ImageUploader";

const InviteFaculty = () => {
  const history = useNavigate();
  const [showEmailErr, setShowEmailErr] = useState(false);
  const [showFullNameErr, setShowFullNameErr] = useState(false);
  const [showContactNoErr, setShowContactNoErr] = useState(false);
  const [showCourseErr, setShowCourseErr] = useState(false);
  const [showClassrooomErr, setShowClassrooomErr] = useState(false);
  const [classroomNotSelected, setClassroomNotSelected] = useState(false);
  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [showSameEmailError, setSameEmailErr] = useState(false);
  const [showSameContactError, setSameContactErr] = useState(false);
  const [createErrorDataisFilled, setCreateErrorDataisFilled] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const ref=useRef()

  const {
    user,
    faculty,
    facultySuccess,
    courses,
    classroom,
    createSuccess,
    createErrorData,
    createErrorSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      courses: state.courses.list.data,
      faculty: state.studentlistuserinfo.list.data,
      facultySuccess: state.studentlistuserinfo.list.success,
      classroom: state.classroom.list.data,
      createSuccess: state.inviteteacher.create.success,
      createErrorData: state.inviteteacher.errorInvite.data,
      createErrorSuccess: state.inviteteacher.errorInvite.success,
    };
  });
  const teacherBulkUploadLoading = useSelector(
    (state) => state.inviteteacher.create.loading
  );
  useEffect(() => {
    return () => {
      dispatch(resetTeacherList());
    };
  }, []);
  var emptyFacultyFields = useMemo(() => {
    return [
      {
        isEmailValid: false,
        email: "",
        emailIsSame: true,
        isCourseValid: false,
        course: "",
        contact: "",
        country_code: "",
        contactIsSame: true,
        contactIsValid: false,
        dialCodeInd: false,
        isClassroomValid: false,
        classroom: "",
        fullname: "",
        isFullNameValid: false,
        MyerrorMessage: false,
        errorMessage: "",
        institute: "",
        owner: "",
        kind: "",
      },
    ];
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseData(user.user_institute));
    setSuccessRedirect(false);
    dispatch(postBulkUploadClear());
  }, [dispatch, user]);

  const [inputFields, setInputFields] = useState(emptyFacultyFields);

  const handleRemoveClick = (position) => {
    let newinputs = inputFields.filter((faculty, index) => index !== position);
    setInputFields([...newinputs]);
  };

  const handleAddClick = () => {
    let allNew = inputFields;
    allNew.push({
      isEmailValid: false,
      email: "",
      emailIsSame: true,
      isCourseValid: false,
      course: "",
      contact: "",
      country_code: "",
      contactIsValid: false,
      dialCodeInd: false,
      contactIsSame: true,
      isClassroomValid: false,
      classroom: "",
      fullname: "",
      isFullNameValid: false,
      MyerrorMessage: false,
      errorMessage: "",
      institute: "",
      owner: "",
      kind: "",
    });

    setInputFields([...allNew]);
  };

  const handleInputFullName = (e, key) => {
    let inputValue = e.target.value;
    let allinputs = inputFields;
    allinputs[key]["fullname"] = inputValue;
    allinputs[key]["isFullNameValid"] = ValidationUtils.isNotEmpty(inputValue);
    setInputFields([...allinputs]);
    isFullNameValid();
    setSubmitted(false);
  };

  const handleInputEmail = (e, key) => {
    let inputValue = e.target.value;
    inputValue = inputValue.toLowerCase();
    let allinputs = inputFields;
    allinputs[key]["email"] = inputValue;
    allinputs[key]["isEmailValid"] =
      ValidationUtils.isNotEmpty(inputValue) &&
      ValidationUtils.isEmail(inputValue);
    allinputs[key]["emailIsSame"] = checkSameEmail(inputValue);
    allinputs[key]["institute"] = user.user_institute;
    allinputs[key]["owner"] = user._id;
    allinputs[key]["kind"] = "teacher";

    setInputFields([...allinputs]);
    isEmailValid();
    setSubmitted(false);
    setErrorShow(false);
  };

  const checkSameEmail = (inputValue) => {
    let sameData = inputFields.filter((item) => item.email === inputValue);

    if (sameData.length > 1) {
      return false;
    } else {
      return true;
    }
  };

  const isSameEmail = () => {
    let isValid = true;
    for (let key = 0; key < inputFields.length; key++) {
      const element = inputFields[key];
      if (!element.emailIsSame) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setSameEmailErr(false);
    } else {
      setSameEmailErr(true);
    }
    return isValid;
  };

  const handleInputContact = (value, formattedValue, key) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    let allinputs = inputFields;
    allinputs[key]["contact"] = inputValue;
    allinputs[key]["country_code"] = dialCode;
    allinputs[key]["contactIsSame"] = checkSameContact(inputValue);
    allinputs[key]["contactIsValid"] =
      inputValue.length < 8 && inputValue.length > 2 && inputValue !== ""
        ? true
        : false;
    if (formattedValue.dialCode === "91") {
      allinputs[key]["dialCodeInd"] = true;
    } else {
      allinputs[key]["dialCodeInd"] = false;
    }
    setInputFields([...allinputs]);
    setSubmitted(false);
    isContactNoValid();
    setErrorShow(false);
  };

  const checkSameContact = (inputValue) => {
    let sameData = inputFields.filter((item) => item.contact === inputValue);

    if (sameData.length > 1) {
      return false;
    } else {
      return true;
    }
  };

  const IsContactSame = () => {
    let isValid = true;
    for (let key = 0; key < inputFields.length; key++) {
      const element = inputFields[key];
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

  const removeContactNumber = () => {
    let allinputs = inputFields;
    for (let key = 0; key < allinputs.length; key++) {
      const element = allinputs[key];
      if (element.dialCodeInd && element.contact.length < 3) {
        element["contact"] = "";
      }
      if (!element.dialCodeInd && element.contact.length < 5) {
        element["contact"] = "";
      }
    }
    setInputFields([...allinputs]);
  };

  const handleInputCourse = (e, key) => {
    let inputValue = e.target.value;
    let allinputs = inputFields;
    allinputs[key]["course"] = inputValue;
    allinputs[key]["isCourseValid"] = ValidationUtils.isNotEmpty(inputValue);
    setInputFields([...allinputs]);
    isCourseValid();
    setSubmitted(false);

    if (inputValue === "") {
      handleInputClassroom(e, key);
    } else {
      let Classroomvalue = "";
      handleInputClassroom(e, key, Classroomvalue);
      dispatch(getClassroomDataInviteFaculty(inputValue));

      setClassroomNotSelected(true);
    }
  };

  const handleInputClassroom = (e, key, Classroomvalue) => {
    if (Classroomvalue === "") {
      let inputValue = Classroomvalue;
      let allinputs = inputFields;
      allinputs[key]["classroom"] = inputValue;
      allinputs[key]["isClassroomValid"] =
        ValidationUtils.isNotEmpty(inputValue);

      setInputFields([...allinputs]);
      isClassroomValid();
      setClassroomNotSelected(false);
      setSubmitted(false);
    } else {
      let inputValue = e.target.value;
      let allinputs = inputFields;
      allinputs[key]["classroom"] = inputValue;
      allinputs[key]["isClassroomValid"] =
        ValidationUtils.isNotEmpty(inputValue);

      setInputFields([...allinputs]);
      isClassroomValid();
      setClassroomNotSelected(false);
      setSubmitted(false);
    }
  };

  const isEmailValid = () => {
    let isValid = true;
    for (let key = 0; key < inputFields.length; key++) {
      const element = inputFields[key];
      if (
        !ValidationUtils.isEmail(element.email) ||
        ValidationUtils.isEmpty(element.email)
      ) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setShowEmailErr(false);
    } else {
      setShowEmailErr(true);
    }
    return isValid;
  };

  const isFullNameValid = () => {
    let isValid = true;
    for (let key = 0; key < inputFields.length; key++) {
      const element = inputFields[key];
      if (ValidationUtils.isEmpty(element.fullname)) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setShowFullNameErr(false);
    } else {
      setShowFullNameErr(true);
    }
    return isValid;
  };

  const isContactNoValid = () => {
    let isValid = true;
    for (let key = 0; key < inputFields.length; key++) {
      const element = inputFields[key];
      if (element.dialCodeInd) {
        if (
          element.contact.length < 8 &&
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

  const isCourseValid = () => {
    let isValid = true;
    for (let key = 0; key < inputFields.length; key++) {
      const element = inputFields[key];
      if (ValidationUtils.isEmpty(element.course)) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setShowCourseErr(false);
    } else {
      setShowCourseErr(true);
    }
    isClassroomValid();

    return isValid;
  };

  const isClassroomValid = () => {
    let isValid = true;
    for (let key = 0; key < inputFields.length; key++) {
      const element = inputFields[key];
      if (ValidationUtils.isEmpty(element.classroom)) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setShowClassrooomErr(false);
    } else {
      setShowClassrooomErr(true);
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const isValidEmail = isEmailValid();
    const isValidFullName = isFullNameValid();
    const isEmailSame = isSameEmail();
    const isContactSame = IsContactSame();
    const isContactValid = isContactNoValid();

    if (
      isValidEmail &&
      isValidFullName &&
      !classroomNotSelected &&
      isEmailSame &&
      isContactSame &&
      isContactValid
    ) {
      removeContactNumber();
      dispatch(postTeacherDataInvite(inputFields));
      setSubmitLoading(true);
      setTimeout(() => {
        setCreateErrorDataisFilled(false);
      }, 500);
      setInputFields(emptyFacultyFields);
    }
  };
  const [ErrorShow, setErrorShow] = useState(false);
  const [successRedirect, setSuccessRedirect] = useState(false);



  if (teacherBulkUploadLoading) {

    history(`/`);
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
      kind: "teacher",
      url: fileData,
      key:key
    };
  };

  if (createErrorSuccess && !createErrorDataisFilled) {
    setInputFields(createErrorData);
    setErrorShow(true);
    setSubmitLoading(false);
    setCreateErrorDataisFilled(true);
  }

  useEffect(() => {
    dispatch(
      getFacultyUserInfoData(
        user.user_institute,
        process.env.REACT_APP_TEACHER
      )
    );
  }, [dispatch, user]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {
            facultySuccess && faculty.length ? <BreadcrumbItem to="/invite-faculty-list" title="Staff List" /> : " "
          }
          <BreadcrumbItem to="/invite-faculty" title="Invite Staff" />
        </Breadcrumb>
        <div className="inviteStudentWrappper mt-20">

          <div className="inviteStudentItem">
            <div className="Bulk-teacher-invite-section">
              <p className="text-sm w-300 text-center mb-20">Invite Staff</p>
              <div className="bulk-xls-download">
                <p className="text-xxs">
                  First download our sample format and <br />
                  fill your data as per column.
                </p>
                <a
                  className="btnText text-xxs mt-8 w-600"
                  href={process.env.REACT_APP_DEMO_XLS_TEACHER}
                >
                  Download Excel Sheet
                  <i className="ed-icon icon-download i-s primary"></i>
                </a>
              </div>
              <div className="bulk-xls-upload">
                <p className="text-xs w-500">Bulk Staff Invite</p>
                {/* <UploadFile
                  placeholder="Upload Excel Sheet"
                  label="Upload Excel Sheet"
                  onlyXml={true}
                  onUploaded={uploadHandel}
                  loadingModal={loadingModal}
                  bulkUpload={true}
                  size={100}
                  IconFileUploadClass="icon-file-upload primary i-xs"
                /> */}
                 <UploadButton
                     placeholder="Upload Excel Sheet"
                    label="Upload Excel Sheet"
                      BtnName="Upload Excel Sheet"
                      IconFileUploadClass="icon-file-upload primary i-xs text-center"
                      onClick={()=>{ref.current.open()}}
                      BtnPropClass={"btn-o-primary btn-oval btn-xs mt-5 "}
                     
                    />
               <Uploader size={100}
       onclose={() => ref.current.close()} validationProp={"onlyXml"} bulkUpload={true}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadHandel(data)}  uploadLimit={1}  bulkUploadTrue={true}/>
                <p className="text-2xs w-300">
                  Max limit of one time bulk upload is 500.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
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
};
export default InviteFaculty;
