import React, { useRef, useState } from "react";
import Modal from "../Common/Modal";
import ModalHeader from "../Common/Modal/ModalHeader";
import ModalBody from "../Common/Modal/ModalBody";
import ModalFooter from "../Common/Modal/ModalFooter";
import FormInput from "../Common/Form/FormInput";
import InputDatePicker from "../Common/Form/InputDatePicker";
import Upload from "../Common/Upload";
import moment from "moment";
import Request from "../Classes/Request";
import Validation from "../Classes/Validation";
import FormError from "../Common/Form/FormError";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { applyAdmissionnotification } from "../store/actions/admission";
import SelectInput from "../Common/Form/SelectInput";
import Uploader from "../Common/ImageUploader";
import UploadButton from "../Common/UploadButton";

const AdmissionApplyRequest = new Request();
const ValidationLib = new Validation();

const ApplyAdmission = ({ open, close, detail, back, backAction }) => {
  const user = useSelector((state) => state.user);
  const useremail = user.user_email || undefined;
  const userfullname = user.user_fullname || undefined;
  const usercontact = user.user_contact || undefined;
  const userdob = user.user_dob || undefined;
  const disatch = useDispatch();
  const applyAdmissionFormRef = useRef(null);
  const closeModal = () => {
    resetVacForm();
    setsubmitStatus("");
    setstatusMessage("");
    close(); // Fire close prop
  };

  const resetVacForm = () => {
    setsubmitted(false); // reset form submit
    handleDateInput(""); // reset date input
    applyAdmissionFormRef.current.reset(); // reset form
  };

  const [submitStatus, setsubmitStatus] = useState(""); // loading, success, error and default is "" (blank)
  const [statusMessage, setstatusMessage] = useState(""); // default is "" (blank)

  const [formInput, setFormInput] = useState({
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
      value: userdob ? new Date(userdob) : "",
      valid: userdob ? true : false,
    },
    qualification: {
      value: "",
      valid: true,
    },
    address: {
      value: "",
      valid: true,
    },
    photo: {
      value: "",
      valid: true,
    },
    attachment: {
      value: "",
      valid: true,
    },
  });
  const [submitted, setsubmitted] = useState("");
  const handleInput = (e) => {
    const { name, value } = e.target;
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

      case "contact":
        formInputs = {
          ...formInputs,
          [name]: {
            value,
            valid:
              ValidationLib.contactNumber(value) &&
              ValidationLib.minLength(value, 10) &&
              ValidationLib.maxLength(value, 15),
          },
        };
        break;

      case "qualification":
        formInputs = {
          ...formInputs,
          [name]: {
            value,
            valid: ValidationLib.isNotEmpty(value),
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
      AdmissionApplyRequest.post(
        AdmissionApplyRequest.url("admission/application"),
        formData(),
        (success) => {
          if (success.status === 200) {
            resetVacForm();
            setsubmitStatus("success");
            setstatusMessage("Application has submitted successfully.");
            success.data._id && disatch(applyAdmissionnotification(success.data));
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

  const handleFileUpload = (name, file) => {
    let formInputs = formInput;
    if (file) {
      formInputs = {
        ...formInputs,
        [name]: {
          value: file,
          valid: true,
        },
      };
    } else  {
      formInputs = {
        ...formInputs,
        [name]: {
          value: "",
          valid: true,
        },
      };
    }
    setFormInput(formInputs);
  };

  const formData = () => {
    return {
      admission: detail._id,
      fullname: formInput.fullname.value,
      email: formInput.email.value,
      contact: formInput.contact.value,
      dob: formInput.dob.value,
      qualification: formInput.qualification.value,
      address: formInput.address.value,
      photo: formInput.photo.value,
      attachment: formInput.attachment.value,
      institute: detail.institute,
    };
  };

  const isValid = () => {
    return !formInput.fullname.valid ||
      !formInput.contact.valid ||
      !formInput.email.valid ||
      !formInput.dob.valid
      ? false
      : true;
  };

  const getDiffDate = (numOfYears, date = new Date()) => {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
  }
  const ref = useRef()
  const ref2 = useRef()
  return (
    <Modal className="ViewFeeStructureWrap" ModalSize="modal-l" show={open}>
      <form onSubmit={formSubmit} ref={applyAdmissionFormRef}>
        <ModalHeader
          title={`${detail.title}`}
          subtitle={detail.class}
          TitleClass="base"
          SubTitleClass="primary"
          closeButton={true}
          onclose={closeModal}
        ></ModalHeader>
        <ModalBody>
          <div className="ApplyAdmissionWrapper">
            <div className="ApplyAdmissionBanner">
              <ul>
                {detail.currencyType && detail.courseFee &&
                  < li >
                    <p className="text-xxs">Course Fees</p>
                    {detail.courseFee && (
                      <p className="text-xs">
                        ({detail.currencyType}) {detail.courseFee}
                      </p>
                    )}
                  </li>
                }
                {
                  detail.applicationFee &&
                  <li>
                    <p className="text-xxs">Application Fees</p>
                    {detail.applicationFee && (
                      <p className="text-xs">
                        ({detail.currencyTypeApplicationfee}){" "}
                        {detail.applicationFee}
                      </p>
                    )}
                  </li>
                }
                <li>
                  <p className="text-xxs">No. of Seat</p>
                  <p className="text-xs">{detail.noOfSeats}</p>
                </li>
                <li>
                  <p className="text-xxs">Last date to apply</p>
                  <p className="text-xxs">
                    {moment(detail.lastApplyDate).format("LLLL")}
                  </p>
                </li>
              </ul>
            </div>
            {submitStatus === "success" ? (
              <div className="ApplyAdmissionForm mt-30">
                <p>{statusMessage}</p>
              </div>
            ) : (
              <React.Fragment>
                <div className="ApplyAdmissionForm mt-30">
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
                      name="email"
                      defaultValue={formInput.email.value}
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
                      // maxDate={new Date()}
                      maxDate={getDiffDate(detail.age)}
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
                </div>
                <div className="ApplyAdmissionUploadCV mt-30">
                  <p className="text-xs w-600">Upload photo</p>
                  <ul className="DashedInstructionList">
                    <li className="text-xxs">Accept only .PNG, .JPG</li>
                  </ul>
                  <div className="formFieldwrap mt-15">
                    {/* <Upload
                      size={5}
                      isFileImage={true}
                      onUploaded={(file) => handleFileUpload("photo", file)}
                      label="Upload Photo"
                      IconFileUploadClass="icon-file-upload base i-xs"
                    /> */}
                    <Uploader size={5}
                      // accept={IMG_ACCEPT}
                      onclose={() => ref?.current?.close()}
                      multiSelect={false} discartRef={ref} onUploaded={(val) => handleFileUpload("photo", val)} uploadLimit={1} />
                    <UploadButton object={formInput.photo.value} showLink={true} onClick={() => ref?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconClassName="i-md gray" BtnName="Upload" />
                  </div>
                </div>
                <div className="ApplyAdmissionUploadCV mt-30">
                  <p className="text-xs w-600">Upload document</p>
                  <ul className="DashedInstructionList">
                    <li className="text-xxs">
                      Accept only .PNG, .JPG or .PDF file.
                    </li>
                  </ul>
                  <div className="formFieldwrap mt-15">
                    {/* <Upload
                      size={5}
                      isFileImage={true}
                      onUploaded={(file) =>
                        handleFileUpload("attachment", file)
                      }
                      label="Upload Document"
                      IconFileUploadClass="icon-file-upload base i-xs"
                    /> */}
                    <Uploader size={5}
                      // accept={IMG_ACCEPT}
                      onclose={() => ref2?.current?.close()}
                      multiSelect={false} discartRef={ref2} onUploaded={(val) => handleFileUpload("attachment", val)} uploadLimit={1} />
                    <UploadButton object={formInput.attachment.value} showLink={true} onClick={() => ref2?.current?.open()} BtnPropClass={"btn-o-silver btn-xs button-block CropUploadBtn"} IconFileUploadClass="icon-file-upload base i-xs" BtnName="Upload" />
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          {submitStatus !== "success" && (
            <React.Fragment>
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
          {back && (
            <button className="button btnText" onClick={() => backAction()}>
              Back
            </button>
          )}
        </ModalFooter>
      </form>
    </Modal >
  );
};

export default ApplyAdmission;
