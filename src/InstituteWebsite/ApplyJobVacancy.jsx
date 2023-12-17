import React, { useRef, useState } from "react";
import Modal from "../Common/Modal";
import ModalHeader from "../Common/Modal/ModalHeader";
import ModalBody from "../Common/Modal/ModalBody";
import FormInput from "../Common/Form/FormInput";
import InputDatePicker from "../Common/Form/InputDatePicker";
import FormTextArea from "../Common/Form/FormTextArea";
import Upload from "../Common/Upload";
import moment from "moment";
import Request from "../Classes/Request";
import Validation from "../Classes/Validation";
import FormError from "../Common/Form/FormError";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { applyVacancyNotification } from "../store/actions/vacancy";
import SelectInput from "../Common/Form/SelectInput";
import ValidationFile from "../Classes/ValidationFile";
import Uploader from "../Common/ImageUploader";
import UploadButton from "../Common/UploadButton";
const VacancyApplyRequest = new Request();
const ValidationLib = new Validation();

const ApplyJobVacancy = ({ open, close, detail, back, backAction }) => {
  const user = useSelector((state) => state.user,
  );
  const businesstype = useSelector((state) => state.websiteTemplate.getTemplate.websiteType,
  );
  const useremail = user.user_email || undefined;
  const userfullname = user.user_fullname || undefined;
  const usercontact = user.user_contact || undefined;
  const dispatch = useDispatch()
  const userInfo = {
    fullname: {
      value: userfullname ? userfullname : "",
      valid: userfullname ? true : false,
    },
    email: {
      value: useremail ? useremail : "",
      valid: useremail ? true : false,
    },
    contact: {
      value: usercontact ? usercontact : "",
      valid: usercontact ? true : false,
    },
    dob: {
      value: "",
      valid: true,
    },
    qualification: {
      value: "",
      valid: true,
    },
    experience: {
      value: "",
      valid: false,
    },
    currentOrganization: {
      value: "",
      valid: true,
    },
    address: {
      value: "",
      valid: true,
    },
    about: {
      value: "",
      valid: true,
    },
    fileUpload: {
      value: "",
      valid: true,
    },
  };

  const aboutTextLength = 2000;
  const applyFormRef = useRef(null);
  const closeModal = () => {
    resetVacForm();
    setsubmitStatus("");
    setstatusMessage("");
    close(); // Fire close prop
  };

  const resetVacForm = () => {
    setsubmitted(false); // reset form submit
    handleDateInput(""); // reset date input
    applyFormRef.current.reset(); // reset form
  };
  const symbolsArrNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


  const [submitStatus, setsubmitStatus] = useState(""); // loading, success, error and default is "" (blank)
  const [statusMessage, setstatusMessage] = useState(""); // default is "" (blank)

  const [formInput, setFormInput] = useState(userInfo);
  const [submitted, setsubmitted] = useState("");
  const handleInput = (e) => {
    const { name, value } = e.target;
    let inputValue = ValidationFile.spaceNotAccept(value);
    let formInputs = formInput;
    switch (name) {
      case "fullname":
        formInputs = {
          ...formInputs,
          [name]: {
            value,
            valid: ValidationLib.isNotEmpty(value),
          },
        };
        break;
      case "email":
        formInputs = {
          ...formInputs,
          [name]: {
            value,
            valid: ValidationLib.isEmail(value),
          },
        };
        break;
      case "about":
        formInputs = {
          ...formInputs,
          [name]: {
            value: inputValue,
            valid: inputValue
              ? ValidationLib.isNotEmpty(inputValue) &&
              ValidationLib.maxLength(inputValue, aboutTextLength)
              : true,
          },
        };
        break;

      case "contact":
        formInputs = {
          ...formInputs,
          [name]: {
            value,
            valid:
              ValidationLib.contactNumber(value) &&
              ValidationLib.minLength(value, 10),
          },
        };
        break;

      case "experience":
        formInputs = {
          ...formInputs,
          [name]: {
            value,
            valid:
              ValidationLib.isNumber(value) && ValidationLib.maximum(value, 80), // Experience must be numeric and max value is 80
          },
        };
        break;

      default:
        formInputs = {
          ...formInputs,
          [name]: {
            value,
            valid: true,
          },
        };
        break;
    }
    setFormInput(formInputs);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setsubmitted(true);
    if (isValid()) {
      setsubmitStatus("loading");
      VacancyApplyRequest.post(
        VacancyApplyRequest.url("vacancy/applicant", "commonservices"),
        formData(),
        (success) => {
          if (success.status === 200) {
            resetVacForm();
            setsubmitStatus("success");
            setstatusMessage("Application has been submitted successfully.");
            success.data._id && dispatch(applyVacancyNotification(success.data, businesstype));     //apply vacancy notification 
          } else {
            setsubmitStatus("error");
            setstatusMessage(
              success.message
                ? success.message
                : "An error occurred, please try later."
            );
          }
        },
        (error) => {
          setsubmitStatus("error");
          setstatusMessage(
            error.message
              ? error.message
              : "An error occurred, please try later."
          );
        }
      );
    }
    // else {
    //   setsubmitted(false)
    // }
  };

  const handleDateInput = (dob) => {
    let formInputs = formInput;
    formInputs = {
      ...formInputs,
      dob: {
        value: dob,
        valid: dob ? true : false,
      },
    };
    setFormInput(formInputs);
  };

  const handleFileUpload = (file) => {
    let formInputs = formInput;
    if (file) {
      formInputs = {
        ...formInputs,
        fileUpload: {
          value: file,
        },
      };
    } else{
      formInputs = {
        ...formInputs,
        fileUpload: {
          value: "",
          valid: true,
        },
      };
    }
    setFormInput(formInputs);
  };

  const formData = () => {
    return {
      vacancy: detail._id,
      fullname: formInput.fullname.value,
      email: formInput.email.value,
      contact: formInput.contact.value,
      dob: formInput.dob.value,
      qualification: formInput.qualification.value,
      experience: formInput.experience.value,
      currentOrganization: formInput.currentOrganization.value,
      address: formInput.address.value,
      about: formInput.about.value,
      fileUpload: formInput.fileUpload.value,
      industry: businesstype,
      institute: detail.institute ? detail.institute : detail.business,
    };
  };

  const isValid = () => {
    return !formInput.fullname.valid ||
      !formInput.contact.valid ||
      !formInput.email.valid ||
      !formInput.experience.valid
      ? false
      : true;
  };

  const ref = useRef();
  const ref2 = useRef();
  return (
    <Modal className="ViewFeeStructureWrap" ModalSize="modal-l" show={open}>
      <ModalHeader
        title={`${detail.title} (${detail.qualification})`}
        TitleClass="base"
        closeButton={true}
        onclose={closeModal}
      >
        {back && (
          <button
            className="button button-base btn-sm"
            onClick={() => backAction()}
          >
            Back
          </button>
        )}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={formSubmit} ref={applyFormRef}>
          <div className="ApplyJobVacancyWrapper">
            <div className="ApplyJobVacancyBanner">
              <ul>
                <li>
                  <p className="text-xxs">Position Type</p>
                  <p className="text-xs">{detail.position}</p>
                </li>
                <li>
                  <p className="text-xxs">No. of Position</p>
                  <p className="text-xs">{detail.noOfPosition}</p>
                </li>

                <li>
                  <p className="text-xxs">Annual Salary</p>
                  <p className="text-xs">
                    <strong>({detail.currencyType})</strong>{" "}
                    {detail.annualSalary}
                  </p>
                </li>
                <li>
                  <p className="text-xxs">Minimum Experience</p>
                  <p className="text-xs">{detail.experience}</p>
                </li>

                {detail.lastApplyDate ? <li>
                  <p className="text-xxs">Last date to apply</p>
                  <p className="text-xxs">
                    {moment(detail.lastApplyDate).format("LLLL")}
                  </p>
                </li> : ""}
              </ul>
            </div>
            {submitStatus === "success" ? (
              <div className="ApplyJobVacancyForm mt-30">
                <p>{statusMessage}</p>
              </div>
            ) : (
              <React.Fragment>
                <div className="ApplyJobVacancyForm mt-30">
                  <div className="formFieldwrap">
                    <FormInput
                      label="Full Name"
                      defaultValue={formInput.fullname.value}
                      className={
                        !formInput.fullname.valid && submitted
                          ? "errorInput"
                          : ""
                      }
                      name="fullname"
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      placeholder="Enter Full Name"
                    />
                    <FormError
                      show={!formInput.fullname.valid && submitted}
                      error="Enter fullname"
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      label="Email"
                      defaultValue={formInput.email.value}
                      name="email"
                      className={
                        !formInput.email.valid && submitted ? "errorInput" : ""
                      }
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      placeholder="Enter Email"
                    />
                    <FormError
                      show={!formInput.email.valid && submitted}
                      error="Enter valid email"
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      defaultValue={formInput.contact.value}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      name="contact"
                      label="Contact Number"
                      placeholder="Contact Number"
                      className={
                        !formInput.contact.valid && submitted
                          ? "errorInput"
                          : ""
                      }
                      onKeyDown={(e) =>
                        e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" ? handleInput :
                          !symbolsArrNumber.includes(e.key) && e.preventDefault()
                      }
                    />
                    <FormError
                      show={!formInput.contact.valid && submitted}
                      error="Enter valid contact number"
                    />
                  </div>
                  <div className="datePickerWrap">
                    <InputDatePicker
                      label="Date of Birth"
                      name="dob"
                      value={formInput.dob.value}
                      id="class_timing"
                      type="datetime-local"
                      className={
                        !formInput.dob.valid && submitted ? "errorInput" : ""
                      }
                      placeholder="Date of Birth"
                      onSelect={(dob) => handleDateInput(dob)}
                      maxDate={new Date()}
                    />
                    <FormError
                      show={!formInput.dob.valid && submitted}
                      error="Select date of birth"
                    />
                  </div>
                  <div className="formFieldwrap">
                    <SelectInput
                      name="qualification"
                      onChange={handleInput}
                      className={
                        !formInput.qualification.valid && submitted
                          ? "errorInput"
                          : ""
                      }
                      label="Highest Qualification"
                    >
                      <option value="">Qualification</option>
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
                    <FormError
                      show={!formInput.qualification.valid && submitted}
                      error="Select a valid qualification"
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      name="experience"
                      label="Year of Experience"
                      placeholder="Year of Experience"
                      className={
                        !formInput.experience.valid && submitted
                          ? "errorInput"
                          : ""
                      }
                    />
                    <FormError
                      show={!formInput.experience.valid && submitted}
                      error="Enter year of Experience"
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      name="currentOrganization"
                      label="Organization Name"
                      placeholder="Organization Name"
                      className={
                        !formInput.currentOrganization.valid && submitted
                          ? "errorInput"
                          : ""
                      }
                    />
                    <FormError
                      show={!formInput.currentOrganization.valid && submitted}
                      error="Enter organization name"
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      name="address"
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      label="Full Address"
                      placeholder="Enter Full Address"
                      className={
                        !formInput.address.valid && submitted
                          ? "errorInput"
                          : ""
                      }
                    />
                    <FormError
                      show={!formInput.address.valid && submitted}
                      error="Enter full address"
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormTextArea
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      value={formInput?.about?.value}
                      name="about"
                      rows="3"
                      TextareaBtmTxt={aboutTextLength}
                      maxlength={aboutTextLength}
                      label="About your Self"
                      placeholder="Tell us short induction about yourself"
                      className={
                        !formInput.about.valid && submitted ? "errorInput" : ""
                      }
                    />
                    <FormError
                      show={!formInput.about.valid && submitted}
                      error="Enter about your Self"
                    />
                  </div>
                </div>
                <div className="ApplyJobVacancyUploadCV mt-30">
                  <p className="text-xs w-600">Upload CV/Resume</p>
                  <ul className="DashedInstructionList">
                    <li className="text-xxs">
                      Accept only .PNG, .JPG or .PDF file.
                    </li>
                  </ul>
                  <div className="formFieldwrap mt-15">
                    <Uploader size={5}
                      // accept={IMG_ACCEPT}
                      onclose={() => ref2?.current?.close()}
                      multiSelect={false} discartRef={ref2} onUploaded={(val) => handleFileUpload(val)} uploadLimit={1} />
                    <UploadButton object={formInput.fileUpload.value} showLink={true} onClick={() => ref2?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="icon-file-upload base i-xs" BtnName="Upload" />
                    {/* <Upload
                      size={10}
                      onlyImagePdf={true}
                      onUploaded={(file) => handleFileUpload(file)}
                      label="Upload File"
                      IconFileUploadClass="icon-file-upload base i-xs"
                    /> */}
                  </div>
                </div>
                {submitStatus === "error" && (
                  <p className="text-red">{statusMessage}</p>
                )}
                {submitStatus === "loading" ? (
                  <button className="button btn-md button-theme" type="button">
                    Loading...
                  </button>
                ) : (
                  <button className="button btn-md button-theme" type="submit">
                    Submit Application
                  </button>
                )}
              </React.Fragment>
            )}
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ApplyJobVacancy;
