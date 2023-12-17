import React, { useRef, useState } from "react";
import FormInput from "../../../../Common/Form/FormInput";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import {
  editStudentUserInfoData,
  resetStudentContactError,
} from "../../../../store/actions/studentlistuserinfo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import SelectInput from "../../../../Common/Form/SelectInput";
import ImageViewer from "../../../../Common/ImageViewer";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";

const PersonalDetails = () => {
  const [showLoginError, setShowLoginError] = useState(false);
  const { _id } = useParams();
  const history = useNavigate();
  const ref = useRef();
  const userId = useSelector((state) => state.studentlistuserinfo.dataid);
  const users = useSelector((state) => state.user);
  const updateState = useSelector((state) => state.studentlistuserinfo.update);
  useSelector((state) => {
    if (
      state.studentlistuserinfo.update.success &&
      !state.studentlistuserinfo.update.studentContactError
    ) {
      history("/invite-student-list");
    }
  });
  let user = users;
  const dispatch = useDispatch();
  const [isFilled, setisFilled] = useState(false);
  // student states
  const [student_profile, set_student_profile] = useState("");
  const [student_fullname, set_student_fullname] = useState("");
  const [student_email, set_student_email] = useState("");
  const [student_contact, set_student_contact] = useState("");
  const [student_contact_cc, set_student_contact_cc] = useState("");
  const [student_admission_no, set_student_admission_no] = useState("");
  const [student_dob, set_student_dob] = useState("");
  const [student_gender, set_student_gender] = useState("");
  // parent states
  const [student_parentname, set_student_parentname] = useState("");
  const [student_parentemail, set_student_parentemail] = useState("");
  const [student_parentgender, set_student_parentgender] = useState("");
  const [student_parentcontact, set_student_parentcontact] = useState("");
  const [student_parentcontact_cc, set_student_parentcontact_cc] = useState("");
  // address states
  const [student_address, set_student_address] = useState("");
  // error states
  const [student_email_error, set_student_email_error] = useState(false);
  const [student_fullname_error, set_student_fullname_error] = useState(false);
  const [student_contact_error, set_student_contact_error] = useState(false);
  const [student_parentcontact_error, set_student_parentcontact_error] =
    useState(false);
  const [parent_email_error, set_parent_email_error] = useState(false);

  // set all fields
  if (userId.data && userId.success && !isFilled) {
    setisFilled(true);
    set_student_fullname(userId.data.fullname);
    set_student_profile(
      userId.data.profile_picture ? userId.data.profile_picture : ""
    );
    set_student_email(userId.data.email);
    set_student_contact_cc(
      userId.data.country_code ? userId.data.country_code : ""
    );
    set_student_contact(userId.data.contact ? userId.data.contact : "");
    set_student_admission_no(
      userId.data.admission_no ? userId.data.admission_no : ""
    );
    set_student_dob(userId.data.dob ? userId.data.dob : "");
    set_student_gender(userId.data.gender ? userId.data.gender : "");
    set_student_parentname(
      userId.data.parent_name ? userId.data.parent_name : ""
    );
    set_student_parentemail(
      userId.data.parent_email ? userId.data.parent_email : ""
    );
    set_student_parentgender(
      userId.data.parent_gender ? userId.data.parent_gender : ""
    );
    set_student_parentcontact_cc(
      userId.data.parent_contact ? userId.data.parent_country_code : ""
    );
    set_student_parentcontact(
      userId.data.parent_contact ? userId.data.parent_contact : ""
    );
    set_student_address(userId.data.fulladdress ? userId.data.fulladdress : "");
  }

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    switch (inputName) {
      case "student_fullname":
        set_student_fullname(inputValue);
        set_student_fullname_error(ValidationFile.isEmpty(inputValue));
        break;
      case "student_dob":
        set_student_dob(inputValue);
        break;
      case "student_gender":
        set_student_gender(inputValue);
        break;
      case "student_email":
        set_student_email(inputValue);
        set_student_email_error(!ValidationFile.isEmail(inputValue));
        break;
      case "student_admission_no":
        set_student_admission_no(inputValue);
        break;
      case "student_parentname":
        set_student_parentname(inputValue);
        break;
      case "parent_email":
        set_student_parentemail(inputValue);
        set_parent_email_error(
          student_parentemail && !ValidationFile.isEmail(inputValue)
        );
        break;
      case "parent_gender":
        set_student_parentgender(inputValue);
        break;
      case "student_address":
        set_student_address(inputValue);
        break;
      default:
        return false;
    }
  };

  const handleStudentContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    set_student_contact_cc(dialCode);
    set_student_contact(inputValue);
    if (updateState.studentContactError) {
      dispatch(resetStudentContactError());
    }
    if (formattedValue.dialCode === "91") {
      if (value.length === 12 || value.length === 2) {
        set_student_contact_error(false);
      } else {
        set_student_contact_error(true);
      }
    } else {
      if (value.length > 4) {
        set_student_contact_error(false);
        set_student_contact(value);
      }
    }
  };

  const handleParentContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    set_student_parentcontact_cc(dialCode);
    set_student_parentcontact(inputValue);
    if (formattedValue.dialCode === "91") {
      if (value.length === 12 || value.length === 2) {
        set_student_parentcontact_error(false);
      } else {
        set_student_parentcontact_error(true);
      }
    } else {
      if (value.length > 4) {
        set_student_parentcontact_error(false);
        set_student_parentcontact(value);
      } else {
        set_student_parentcontact_error(true);
      }
    }
  };
  const updateImage = (data) => {
    set_student_profile(data);
  };
  const removeImage = () => {
    set_student_profile("");
  };
  const validParentEmail = () => {
    let isValid = true;
    if (student_parentemail) {
      if (!ValidationFile.isEmail(student_parentemail)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = true;
    }
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);
    if (!ValidationFile.isEmail(student_email)) {
      set_student_email_error(true);
    }
    if (ValidationFile.isEmpty(student_fullname)) {
      set_student_fullname_error(true);
    }
    const isValidParentEmail = validParentEmail();
    set_parent_email_error(!isValidParentEmail);

    if (
      !ValidationFile.isEmpty(student_fullname) &&
      ValidationFile.isEmail(student_email) &&
      !student_parentcontact_error &&
      !student_contact_error &&
      isValidParentEmail
      // !student_whatsNo_Error
    ) {
      dispatch(
        editStudentUserInfoData(
          _id,
          user._id,
          users.user_institute,
          editStudentData()
        )
      );
    }
  };
  const editStudentData = () => {
    if (
      parseInt(student_contact) === userId.data.StudentData_contact &&
      userId.data.StudentData_contact
    ) {
      if (student_gender === "") {
        return {
          profile_picture: student_profile,
          fullname: student_fullname,
          email: student_email,
          dob: student_dob,

          admission_no: student_admission_no,
          parent_name: student_parentname,
          parent_email: student_parentemail,
          parent_gender: student_parentgender,
          parent_contact: student_parentcontact,
          parent_country_code: student_parentcontact_cc,
          fulladdress: student_address,
        };
      } else {
        return {
          profile_picture: student_profile,
          fullname: student_fullname,
          email: student_email,
          admission_no: student_admission_no,
          dob: student_dob,
          gender: student_gender,
          parent_name: student_parentname,
          parent_email: student_parentemail,
          parent_gender: student_parentgender,
          parent_contact: student_parentcontact,
          parent_country_code: student_parentcontact_cc,
          fulladdress: student_address,
        };
      }
    } else {
      if (student_gender === "") {
        return {
          profile_picture: student_profile,
          fullname: student_fullname,
          email: student_email,
          contact: student_contact,
          country_code: student_contact_cc,
          dob: student_dob,
          admission_no: student_admission_no,
          parent_email: student_parentemail,
          parent_name: student_parentname,
          parent_gender: student_parentgender,
          parent_contact: student_parentcontact,
          parent_country_code: student_parentcontact_cc,
          fulladdress: student_address,
        };
      } else {
        return {
          profile_picture: student_profile,
          fullname: student_fullname,
          email: student_email,
          contact: student_contact,
          country_code: student_contact_cc,
          dob: student_dob,
          gender: student_gender,
          admission_no: student_admission_no,
          parent_name: student_parentname,
          parent_email: student_parentemail,
          parent_gender: student_parentgender,
          parent_contact: student_parentcontact,
          parent_country_code: student_parentcontact_cc,
          fulladdress: student_address,
        };
      }
    }
  };
  return (
    <React.Fragment>
      {userId.success && !userId.loading ? (
        <React.Fragment>
          <div className="parents_student_list_inputs mt-30">
            <div className="wrapper-input">
              <div className="formFieldwrap">
                <FormInput
                  className={
                    ValidationFile.isEmpty(student_fullname) && showLoginError
                      ? "errorInput"
                      : ""
                  }
                  name="student_fullname"
                  onChange={handleInput}
                  type="text"
                  value={student_fullname}
                  label="Full Name"
                  placeholder="Full Name"
                  onKeyUp={handleInput}
                />
                <FormError
                  show={student_fullname_error && showLoginError}
                  error="Full Name is required"
                />
              </div>

              <div
                className={`formFieldwrap ${
                  userId.data.StudentData_isVerified
                    ? "student_list_fill_flied_verify"
                    : "student_filed_not_verify"
                }`}
              >
                <FormInput
                  className={
                    student_email_error && showLoginError ? "errorInput" : ""
                  }
                  name="student_email"
                  type="text"
                  onChange={handleInput}
                  label="Email"
                  placeholder="Email address"
                  onKeyUp={handleInput}
                  value={student_email}
                />
                <FormError
                  show={student_email_error && showLoginError}
                  error="Email is required"
                />
              </div>
              <div
                className={`cstmPhoneInput ${
                  userId.data.StudentData_contact_verify
                    ? "student_list_fill_flied_verify"
                    : "student_filed_not_verify"
                }`}
              >
                <PhoneInput
                  countryCodeEditable={false}
                  containerClass="form-group"
                  inputClass="form-control"
                  specialLabel
                  country={"in"}
                  value={`${student_contact_cc} ${student_contact}`}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                    placeholder: "Enter mobile",
                  }}
                  enableSearch
                  name="studentContact"
                  searchPlaceholder="Search Country"
                  onChange={(value, formattedValue) => {
                    handleStudentContact(value, formattedValue);
                  }}
                  onKeyUp={(value, formattedValue) => {
                    handleStudentContact(value, formattedValue);
                  }}
                  disableSearchIcon
                />
                <label className="animLabel" htmlFor="mobile_number">
                  Mobile Number
                </label>
                {/* <FormError
                  show={updateState.studentContactError}
                  error="Mobile number is already exists."
                /> */}
                <FormError
                  show={updateState.studentContactError}
                  error="Mobile number is already exists."
                />
                <FormError
                  show={
                    student_contact_error &&
                    student_contact.length > 2 &&
                    showLoginError
                  }
                  error="Mobile Number is invalid"
                />
              </div>
              <SelectInput
                id="gender"
                onChange={handleInput}
                value={
                  student_gender === (null || undefined) ? "" : student_gender
                }
                name="student_gender"
                label="Gender"
                required
              >
                {student_gender === (null || undefined) && (
                  <option value="">Select Gender</option>
                )}
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </SelectInput>

              <div className="PersonalInfoDOB">
                <div className="datePickerWrap">
                  <InputDatePicker
                    name="student_dob"
                    type="date"
                    maxDate={moment().toDate()}
                    onSelect={(selectedDob) => {
                      set_student_dob(selectedDob);
                    }}
                    label="Date of Birth"
                    placeholder="Date of birth"
                    value={student_dob}
                  />
                </div>
              </div>
              <div className="PersonalInfoDOB">
                <div className="formFieldwrap">
                  <FormInput
                    name="student_admission_no"
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    type="text"
                    value={student_admission_no}
                    label="Admission Number"
                    placeholder="Admission Number"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="student_list_img_perview">
                <ImageViewer
                  object={student_profile}
                  defaultImage={DummyProfile}
                />
              </div>
              <div className="Upload_btn_student_list mt-10">
                <UploadButton
                  IconClassName="i-xs gray"
                  BtnPropClass="upload_img_student_page btn-o-silver btn-sm button-block CropUploadBtn text-xxs"
                  BtnName={student_profile?.src ? "Update" : "Upload"}
                  onClick={() => {
                    ref.current.open();
                  }}
                />
                <Uploader
                  onclose={() => ref.current.close()}
                  multiSelect={false}
                  discartRef={ref}
                  onUploaded={(data) => updateImage(data)}
                  uploadLimit={1}
                />
                {student_profile && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="button btn-o-silver button-block btn-sm text-xxs remove_img_btnstudent text-xxs"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
          <hr className="border_bottom" />

          <div className="text-xs mb-20 base">Parent Details</div>
          <div className="parents_student_list_inputs">
            <div className="wrapper-input">
              <div className="formFieldwrap">
                <FormInput
                  name="student_parentname"
                  defaultValue={student_parentname}
                  onChange={handleInput}
                  type="text"
                  label="Parent Name"
                  placeholder="Parent Name"
                  onKeyUp={handleInput}
                />
              </div>

              <div className="formFieldwrap">
                <FormInput
                  className={
                    parent_email_error && showLoginError ? "errorInput" : ""
                  }
                  name="parent_email"
                  type="text"
                  onChange={handleInput}
                  label="Parent Email"
                  placeholder="Parent Email address"
                  onKeyUp={handleInput}
                  value={student_parentemail}
                />
                <FormError
                  show={parent_email_error && showLoginError}
                  error="Email is invalid."
                />
              </div>
              <div className="cstmPhoneInput">
                <PhoneInput
                  countryCodeEditable={false}
                  containerClass="form-group"
                  inputClass="form-control"
                  specialLabel
                  country={"in"}
                  value={`${student_parentcontact_cc} ${student_parentcontact}`}
                  // value={mobileNo}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                    placeholder: "Enter Parent Number",
                  }}
                  enableSearch
                  name="mobileNo"
                  searchPlaceholder="Search Country"
                  onChange={(value, formattedValue) => {
                    handleParentContact(value, formattedValue);
                  }}
                  onKeyUp={(value, formattedValue) => {
                    handleParentContact(value, formattedValue);
                  }}
                  // value={student_contact}
                  disableSearchIcon
                />
                <label className="animLabel" htmlFor="mobile_number">
                  Parent Contact Number
                </label>
                <FormError
                  show={
                    student_parentcontact_error &&
                    student_parentcontact.length > 2 &&
                    showLoginError
                  }
                  error="Mobile Number is invalid"
                />
              </div>

              <SelectInput
                id="gender"
                onChange={handleInput}
                value={
                  student_parentgender === (null || undefined)
                    ? "Not Selcted"
                    : student_parentgender
                }
                name="parent_gender"
                label="Gender"
              >
                {student_gender === (null || undefined) && (
                  <option value="">Select Gender</option>
                )}
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </SelectInput>
            </div>
          </div>

          <hr className="border_bottom" />

          <div className="text-xs mb-20 base">Address</div>
          <div className="parents_student_list_inputs">
            <div className="formFieldwrap ">
              <FormTextArea
                name="student_address"
                defaultValue={student_address}
                onChange={handleInput}
                type="text"
                label="Full Address"
                placeholder="Full address"
                onKeyUp={handleInput}
                maxlength="499"
                className="full_address_student_list"
              />
            </div>
          </div>

          {updateState.loading ? (
            <button className="button btn-md button-theme btn-md" type="button">
              Updating Details...
            </button>
          ) : (
            <button
              className="button btn-md button-theme btn-md"
              type="button"
              onClick={handleSubmit}
            >
              Update Details
            </button>
          )}
        </React.Fragment>
      ) : (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      )}
    </React.Fragment>
  );
};
export default PersonalDetails;
