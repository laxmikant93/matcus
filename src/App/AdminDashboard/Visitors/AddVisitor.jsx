import React, { useEffect, useRef, useState } from 'react'
import ValidationUtils from '../../../Classes/ValidationUtils';
import ValidationFile from "../../../Classes/ValidationFile";
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import Card from '../../../Common/Card';
import CardBody from '../../../Common/Card/CardBody';
import ImageCropper from '../../../Common/Cropper';
import FormError from '../../../Common/Form/FormError';
import FormInput from '../../../Common/Form/FormInput';
import FormTextArea from '../../../Common/Form/FormTextArea';
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme';
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { useNavigate, useParams } from 'react-router-dom';
import { editVisitorDetail, getSingleVisitor, postVisitorDetail, resetEditVisitorDetail, resetPostVisitorDetail, resetSingleVisitor } from "../../../store/actions/visitorManagement";
import SearchUserByUsername from '../../../Common/SearchUserByUsername';
import './guardVistor.style.scss'
import { getTeacherUsernameDataReset } from '../../../store/actions/editteacherlist';
import SelectInput from '../../../Common/Form/SelectInput';
import TextEditor from '../../../Common/Form/TextEditor';
import UploadButton from '../../../Common/UploadButton';
import Uploader from '../../../Common/ImageUploader';
const VisitorDetails = () => {
  const [visitorName, setVisitorName] = useState("");
  const [PersonToVisitName, setPersonToVisitName] = useState("");
  const [PersonToVisitID, setPersonToVisitID] = useState("");
  const [PersonToVisitContact, setPersonToVisitContact] = useState("");
  const [PersonToVisitCountryCode, setPersonToVisitCountryCode] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorNumber, setVisitorNumber] = useState("");
  const [visitorCountryCode, setVisitorCountryCode] = useState("91");
  const [visitorIDProofType, setVisitorIDProofType] = useState("");
  const [visitorIDProofNo, setVisitorIDProofNo] = useState("");
  const [visitorCount, SetVisitorCount] = useState("");
  const [purpose, SetPurpose] = useState("");
  const [visitorPhoto, setVisitorPhoto] = useState("");
  const [visitorNameError, setVisitorNameError] = useState("");
  const [visitorEmailError, setVisitorEmailError] = useState("");
  const [visitorNumberError, setVisitorNumberError] = useState("");
  const [visitorIDProofTypeError, setVisitorIDProofTypeError] = useState("");
  const [visitorIDProofNoError, setVisitorIDProofNoError] = useState("");
  const [purposeError, setPurposeError] = useState("")
  const [visitorRole, setVisitorRole] = useState("employee");
  const [validateForm, setValidateForm] = useState(false);
  const [PersonToVisitNameError, setPersonToVisitNameError] = useState(false);
  const [assignStudentFormKey, setAssignStudentFormKey] = useState([
    { formKey: Math.random().toFixed(6), value: "" },
  ]);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchEmailError, setSearchEmailError] = useState("");
  const symbolsArr = [",", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")", "_",
    "-", "=", "+", ".", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  const symbolsArrNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const symbolsArray = ["e", "E", "+", "-", "."]
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const [adharValidationError, setAdharValidationError] = useState(false)
  let history = useNavigate();
  let dispatch = useDispatch();
  const { _id } = useParams();
  const ref = useRef()
  const { userId, users, insId, success, loading, cancelLoading, visitor, visitorData,
    editVisitorSuccess, editVisitorLoading } = useSelector((state) => {
      return {
        userId: state.user._id,
        users: state.user,
        insId: state.user.user_institute,
        success: state.visitorManagement.postVisitor.success,
        loading: state.visitorManagement.postVisitor.loading,
        cancelLoading: state.visitorManagement.postVisitor.cancelLoading,
        visitor: state.visitorManagement.getSingleVisitor,
        visitorData: state.visitorManagement.getSingleVisitor.data,
        editVisitorSuccess: state.visitorManagement.editVisitor.success,
        editVisitorLoading: state.visitorManagement.editVisitor.loading
      };
    })

  const handleVisitorPersonalDetails = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    switch (inputName) {
      case "Visitor_Name":
        setVisitorName(value);
        setVisitorNameError(ValidationUtils.isEmpty(value));
        break;

      case "Visitor_Email":
        setVisitorEmail(value);
        setVisitorEmailError(false);
        break;

      case "Visitor_ID":
        setVisitorIDProofNo(value);
        setVisitorIDProofNoError(ValidationUtils.isEmpty(value));
        setAdharValidationError(false)
        break;

      case "Visitor_Count":
        SetVisitorCount(inputValue);
        break;
      case "purpose":
        SetPurpose(value)
        setPurposeError(ValidationUtils.isEmpty(value));
        break;

      default:
        SetPurpose(value);
    }
  }

  const handleOnChange = (value) => {
    SetPurpose(value);
    setPurposeError(ValidationUtils.isEmpty(value));
  }

  const uploadImage = (data) => {
    let imgData = data;
    setVisitorPhoto(imgData);
  }


  const removeImage = () => {
    let imgData = ""
    setVisitorPhoto(imgData);
  }
  let Visitors = {
    institute: insId,
    name: visitorName,
    visitor_email: visitorEmail,
    visitor_contact_no: visitorNumber,
    visit_reason: purpose,
    owner: userId,
    photo: visitorPhoto,
    visitor_country_code: visitorCountryCode,
    id_proof_type: visitorIDProofType,
    id_proof_no: visitorIDProofNo,
    no_of_visit_person: visitorCount,
    user: PersonToVisitID,
    search_visitor_role: visitorRole
  }

  const handlePhoneInput = (inputValue, countryDetail) => {
    if (inputValue > 9) {
      let dialCode = countryDetail.dialCode;
      let mobile = inputValue.replace(dialCode, "");
      setVisitorNumber(mobile);
      setVisitorCountryCode(dialCode);
      setVisitorNumberError(ValidationUtils.isEmpty(mobile));
    }
  }
  const validEmail = () => {
    let isvalid = true;
    if (visitorEmail) {
      if (!ValidationUtils.isEmail(visitorEmail)) {
        isvalid = false;
        setVisitorEmailError(true)
      }
    }
    else {
      isvalid = true;
      setVisitorEmailError(false)
    }
    return isvalid;
  }
  const adharValidation = () => {
    let isValid = true
    if (visitorIDProofType === "AadharCard") {
      if (visitorIDProofNo) {
        if (visitorIDProofNo.length === 12) {
          setAdharValidationError(false)
          isValid = true
        } else {
          isValid = false
          setAdharValidationError(true)
        }
      } else {
        isValid = true;
        setAdharValidationError(false)
      }
    } else {
      isValid = true
      setAdharValidationError(false)
    }
    return isValid
  }
  const numberValidation = () => {
    let isValid = true
    if (visitorNumber && visitorCountryCode == "91") {
      if (visitorNumber.length < 10) {
        isValid = false;
      } else {
        isValid = true
      }
    } else {
      isValid = false
    }
    return isValid
  }
  const handleSave = () => {
    let emailValid = validEmail()
    setVisitorEmailError(!emailValid)
    if (ValidationUtils.isEmpty(visitorName)) {
      setVisitorNameError(true);
    }
    let aadharValid = adharValidation()
    setVisitorIDProofNoError(!aadharValid)
    let numberValid = numberValidation()

    setVisitorNumberError(!numberValid)
    if (ValidationUtils.isEmpty(purpose)) {
      setPurposeError(true)
    }
    // if (isFormValid()) {
    //   const adharValid = adharValidation()
    // }
    if (ValidationUtils.isEmpty(visitorIDProofType)) {
      setVisitorIDProofTypeError(true);
    }
    if (ValidationUtils.isEmpty(visitorIDProofNo)) {
      setVisitorIDProofNoError(true);
    }
    if (ValidationUtils.isEmpty(PersonToVisitName)) {
      setPersonToVisitNameError(true);
    }
    // if (ValidationUtils.isEmpty(searchEmail)) {
    //   setSearchEmailError(true);
    // }

    if (emailValid && aadharValid && numberValid &&
      ValidationUtils.isNotEmpty(visitorName) &&
      ValidationUtils.isNotEmpty(visitorIDProofType) &&
      ValidationUtils.isNotEmpty(purpose) &&
      ValidationUtils.isNotEmpty(PersonToVisitName) &&
      // ValidationUtils.isNotEmpty(searchEmail) &&
      ValidationUtils.isNotEmpty(visitorIDProofNo)) {
      let type = "save";
      dispatch(postVisitorDetail(Visitors, type));
    }
  }

  if (success) {
    history("/visitor-management-list");
  }

  useEffect(() => {
    return () => {
      dispatch(resetPostVisitorDetail());
      dispatch(resetEditVisitorDetail());
      dispatch(resetSingleVisitor());
      dispatch(getTeacherUsernameDataReset());
    }
  }, [dispatch])

  const handleCancel = () => {
    let type = "cancel";
    dispatch(postVisitorDetail([], type));
  }

  const suggestionSelected = (user) => {
    const allFormArr = assignStudentFormKey.map((FormItem) =>
      FormItem.formKey === user.inputkey
        ? {
          ...FormItem,
          value: {
            user: user.user,
          },
        }
        : FormItem
    );
    setSearchEmail(user.userData.email);
    setPersonToVisitID(user.userData._id);
    setPersonToVisitName(user.userData.fullname);
    setPersonToVisitNameError(ValidationUtils.isEmpty(user))
    setPersonToVisitContact(user.userData.contact);
    setPersonToVisitCountryCode(user.userData.country_code);
    setSearchEmailError(ValidationUtils.isEmpty(user));
    setAssignStudentFormKey([...allFormArr]);
  };



  const handleEmailSearch = (e) => {
    setValidateForm(true);
    setSearchEmail(e.target.value);
  }

  const handleRoles = (value) => {
    setVisitorRole(value);
    dispatch(getTeacherUsernameDataReset());
  }

  const handleSelectIdProof = (e) => {
    let inputValue = e.target.value;
    setVisitorIDProofType(inputValue);
    setVisitorIDProofTypeError(ValidationUtils.isEmpty(inputValue));
    setVisitorIDProofNo("")
  }

  useEffect(() => {
    if (_id) {
      dispatch(getSingleVisitor(_id));
    }
  }, [dispatch, _id])

  useEffect(() => {
    if (visitor.success && visitorData) {
      setVisitorName(visitorData.name);
      setVisitorEmail(visitorData.visitor_email);
      setVisitorNumber(visitorData.visitor_contact_no?.toString());
      SetVisitorCount(visitorData.no_of_visit_person);
      SetPurpose(visitorData.visit_reason);
      setVisitorPhoto(visitorData.photo);
      setVisitorCountryCode(visitorData.country_code);
      setVisitorIDProofType(visitorData.id_proof_type);
      setVisitorIDProofNo(visitorData.id_proof_no);
      setVisitorRole(visitorData.search_visitor_role);
      setPersonToVisitName(visitorData.fullname);
      setPersonToVisitContact(visitorData.contact);
      setPersonToVisitCountryCode(visitorData.country_code);
      setSearchEmail(visitorData.email);
      setPersonToVisitID(visitorData.user);
    }
  }, [visitor.success, visitorData])


  const handleUpdate = () => {
    if (ValidationUtils.isEmpty(visitorName)) {
      setVisitorNameError(true);
    }
    let emailValid = validEmail()
    setVisitorEmailError(!emailValid)
    if (ValidationUtils.isEmpty(visitorIDProofType)) {
      setVisitorIDProofTypeError(true);
    }
    if (ValidationUtils.isEmpty(visitorIDProofNo)) {
      setVisitorIDProofNoError(true);
    }
    if (ValidationUtils.isEmpty(purpose)) {
      setPurposeError(true)
    }
    let numberValid = numberValidation()
    setVisitorNumberError(!numberValid)
    let aadharValid = adharValidation()
    setVisitorIDProofNoError(!aadharValid)
    if (ValidationUtils.isEmpty(PersonToVisitName)) {
      setPersonToVisitNameError(true);
    }

    if (emailValid && numberValid && aadharValid &&
      ValidationUtils.isNotEmpty(visitorName) &&
      ValidationUtils.isNotEmpty(purpose) &&
      ValidationUtils.isNotEmpty(visitorIDProofType) &&
      ValidationUtils.isNotEmpty(PersonToVisitName) &&
      ValidationUtils.isNotEmpty(visitorIDProofNo)
    ) {
      dispatch(editVisitorDetail(_id, Visitors));
    }
  }

  if (editVisitorSuccess) {
    history("/visitor-management-list");
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/visitor-management-list" title="Visitors" />
        {_id ?
          <BreadcrumbItem to={`/edit-visitor/${_id}`} title="Edit Visitor" />
          :
          <BreadcrumbItem to="/add-visitors" title="Add Visitor" />}
      </Breadcrumb>
      <React.Fragment>
        <div className="S-DetailCst visitorWrap">
          <div className="S-DetailList">

            <Card className="cardPadding mt-10" >
              <CardBody className='addVisitorForm'>
                <p className="text-xs primary w-600 addVisitorDetails mb-20">Visitor Details</p>
                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Name"
                    id="Name"
                    name="Visitor_Name"
                    value={visitorName}
                    placeholder="Name"
                    onChange={handleVisitorPersonalDetails}
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }
                    maxLength="80"

                  />
                  <FormError
                    show={visitorNameError}
                    error="Visitor name is required."
                    className='visitorFormError'
                  />
                </div>

                <div className="formFieldwrap">
                  <FormInput
                    type="email"
                    label="Email"
                    id="Email"
                    name="Visitor_Email"
                    value={visitorEmail}
                    placeholder="Email"
                    onChange={handleVisitorPersonalDetails}
                    maxLength="80"

                  />
                  <FormError
                    show={visitorEmail && visitorEmailError}
                    error="Invalid Email. Please recheck and enter again."
                    className='visitorFormError'
                  />
                </div>

                <div className="formFieldwrap">
                  <FormInput
                    type="number"
                    label="Visitor's Count"
                    id="Visitor_Count"
                    name="Visitor_Count"
                    value={visitorCount}
                    placeholder="Visitor's Count"
                    min="0"
                    max="20"
                    onKeyDown={(e) =>
                      symbolsArray.includes(e.key) && e.preventDefault()
                    }
                    onWheel={(e) => e.target.blur()}
                    onChange={handleVisitorPersonalDetails}
                    maxLength="80"

                  />
                </div>

                <div className="formFieldwrap">
                  <div className="cstmPhoneInput">
                    <PhoneInput
                      countryCodeEditable={false}
                      containerClass="form-group"
                      inputClass="form-control"
                      specialLabel
                      country={"in"}

                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: false,
                        placeholder: "Enter mobile",
                      }}
                      enableSearch
                      name="mobileNo"
                      value={`${visitorCountryCode} ${visitorNumber}`}
                      searchPlaceholder="Search Country"
                      onChange={(value, country) => {
                        handlePhoneInput(value, country);
                      }}
                      onKeyUp={(value, country) => {
                        handlePhoneInput(value, country);
                      }}
                      disableSearchIcon
                    />
                    <label className="animLabel" htmlFor="mobile_number">
                      Mobile Number
                    </label>
                  </div>
                  <FormError
                    show={visitorNumberError}
                    error="Mobile Number is invalid."
                    className='visitorFormError'
                  />
                </div>
                <div className="formFieldwrap">
                  <SelectInput
                    id="profession_cat"
                    name="Id_Proof"
                    value={visitorIDProofType}
                    onChange={handleSelectIdProof}
                    label="Select ID Proof"
                  >
                    <option value="">
                      Select ID Proof
                    </option>
                    <option value="AadharCard">Aadhaar Card</option>
                    <option value="PanCard">Pan Card</option>
                    <option value="Licence">Licence</option>
                    <option value="GovtID">Govt ID</option>
                  </SelectInput>

                  <FormError
                    show={visitorIDProofTypeError}
                    error="Visitor ID Proof is required."
                    className='visitorFormError'
                  />

                </div>
                <div className={`formFieldwrap visitorFromfield ${visitorIDProofType ? 'displayShow' : 'displayhide'}`}>
                  {visitorIDProofType &&
                    <React.Fragment>
                      {
                        visitorIDProofType === "AadharCard" ?
                          <FormInput
                            type="text"
                            label="ID Proof"
                            id="ID Proof"
                            name="Visitor_ID"
                            value={visitorIDProofNo}
                            placeholder="Visitor ID Proof"

                            onChange={handleVisitorPersonalDetails}
                            onKeyDown={(e) =>
                              e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" ? handleVisitorPersonalDetails :
                                !symbolsArrNumber.includes(e.key) && e.preventDefault()
                            }

                            maxLength={12}
                            autoFocus={true}
                          /> :
                          <FormInput
                            type="text"
                            label="ID Proof"
                            id="ID Proof"
                            name="Visitor_ID"
                            value={visitorIDProofNo}
                            placeholder="Visitor ID Proof"
                            onChange={handleVisitorPersonalDetails}
                            maxLength="80"
                          />
                      }

                    </React.Fragment>
                  }
                  <FormError
                    show={visitorIDProofType && !visitorIDProofNo && visitorIDProofNoError}
                    error="Visitor ID Number is required."
                    className='visitorFormError'
                  />
                  <FormError
                    show={visitorIDProofType && visitorIDProofNoError && visitorIDProofNo}
                    error="Visitor ID Number is required."
                    className='visitorFormError'
                  />
                  <FormError show={adharValidationError}
                    error="Adhar Number is invalid."
                    className='visitorFormError' />
                </div>
                <div className="formFieldwrap addVisitorReason">
                  {/* <FormTextArea
                    className="form-control"
                    id="Visit reason"
                    rows="3"
                    type="text"
                    name="purpose"
                    value={purpose}
                    placeholder="Visit Reason"
                    onChange={handleVisitorPersonalDetails}
                    label="Purpose to visit"
                    style={{ whiteSpace: " pre-wrap" }}
                    maxLength="500"
                    TextareaBtmTxt="500"
                  ></FormTextArea> */}
                  <TextEditor
                    preFilledData={purpose}
                    currentResponse={(value) => handleOnChange(value)}
                  />
                  <FormError
                    show={purposeError}
                    error="Visit Reason is required."
                    className='visitorFormError'
                  />
                </div>
                <div className='addVisitorUploadImage'>
                  <p className="text-xs w-600">
                    {" "}
                    Upload visitor Image
                  </p>
                  <div className="DashedInstructionList">
                    <p className="text-xxs">
                      - For images accept only .PNG or .JPG file format.
                    </p>
                  </div>
                  <div className="formFieldwrap visitorFromfield mt-15">
                    <UploadButton
                     BtnName="Upload Image"
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{ref.current.open()}}
                      showLink={true}
                      object={visitorPhoto}
                    />
               <Uploader 
       onclose={() => ref.current.close()}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadImage(data)}  uploadLimit={1} />
                   

                    {visitorPhoto ? (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="button btn-xs btn-o-red red mt-5"
                      >
                        Remove
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

              </CardBody>

              <CardBody className='addVisitorForm'>
                <div className='addVisitorDetails'>
                  <p className="text-xs w-600 addVisitorDetails primary mb-20">Person to visit</p>
                  <div className="input-custom-type inline mt-10 mb-20">
                    <label>
                      <input
                        type="radio"
                        name="employee"
                        value="employee"
                        checked={visitorRole === "employee"}
                        onChange={() => handleRoles("employee")}
                      />
                      Employee
                    </label>
                    <label
                    >
                      <input
                        type="radio"
                        name="student"
                        value="student"
                        checked={visitorRole === "teacher"}
                        onChange={() => handleRoles("teacher")}
                      />
                      Teacher
                    </label>
                  </div>
                </div>
                <div className="formFieldwrap visitorFromfield ">
                  <SearchUserByUsername
                    validate={validateForm}
                    name={searchEmail}
                    inputkey={searchEmail}
                    onSelect={(user) => {
                      suggestionSelected(user);
                    }}
                    usertype={visitorRole === "teacher" ? process.env.REACT_APP_TEACHER : process.env.REACT_APP_EMPLOYEE}
                    institute={insId}
                    kind={visitorRole}
                    visitor="true"
                    label="Search person to visit"
                    placeholder="Search person to visit"
                    onChange={(e) => handleEmailSearch(e)}
                    className='primary'
                    industry={users.user_business_type}
                  />
                  <FormError
                    show={searchEmailError}
                    error="Email is required."
                    className='visitorFormError'
                  />
                </div>

                <div className="formFieldwrap visitorFromfield ">
                  <FormInput
                    type="text"
                    label=" Name"
                    disabled
                    placeholder="Name"
                    value={PersonToVisitName}
                    maxLength="80"
                  />
                  <FormError
                    show={PersonToVisitNameError}
                    error="Person to Visit Name is required."
                    className='visitorFormError'
                  />
                </div>

                <div className="formFieldwrap visitorFromfield ">
                  <div className="cstmPhoneInput">
                    <PhoneInput
                      countryCodeEditable={false}
                      containerClass="form-group"
                      inputClass="form-control"
                      specialLabel
                      country={"in"}
                      disabled
                      value={`${PersonToVisitCountryCode} ${PersonToVisitContact}`}
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: false,
                        placeholder: "Enter mobile",
                      }}
                      enableSearch
                      name="mobileNo"
                      searchPlaceholder="Search Country"
                      disableSearchIcon
                    />
                    <label className="animLabel" htmlFor="mobile_number">
                      Mobile Number
                    </label>
                  </div>
                </div>

              </CardBody>
              <CardBody>
              </CardBody>
            </Card>

            <div className="mt-40 mb-40">

              {_id ?
                <React.Fragment>
                  {editVisitorLoading ?
                    <button
                      className="button btn-md button-theme"
                      type="button"
                    >
                      Updating...
                    </button>
                    :
                    <button
                      className="button btn-md button-theme mr-20"
                      type="button"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>}
                </React.Fragment>
                :
                <React.Fragment>
                  {loading ?
                    <button
                      className="button btn-md button-theme mr-10"
                      type="button"
                    >
                      Saving...
                    </button>
                    :
                    <button
                      className="button btn-md button-theme mr-10"
                      type="button"
                      onClick={handleSave}
                    >
                      Save & Notify
                    </button>}
                </React.Fragment>
              }

              {cancelLoading ?
                <button
                  className="button btn-md button-theme"
                  type="button"
                >
                  Canceling...
                </button>
                :
                <button
                  className="button btn-md button-theme"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>}

            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
export default VisitorDetails;
