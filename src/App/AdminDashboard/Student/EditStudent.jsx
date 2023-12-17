import React, { useEffect, useState } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import FormInput from "../../../Common/Form/FormInput";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import {
  editStudentUserInfoData,
  getStudentUserInfoDataId,
  clearStudentEdit,
} from "../../../store/actions/studentlistuserinfo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import { getCourseData } from "../../../store/actions/courses";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import FormTextArea from "../../../Common/Form/FormTextArea";
import InputDatePicker from "../../../Common/Form/InputDatePicker";
import moment from "moment";
import { DynamicCourseHeader } from "../../../Common/UserElement";
import "./AdminDashboardStudent.scss";
import SelectInput from "../../../Common/Form/SelectInput";
import ImageViewer from "../../../Common/ImageViewer";

const EditStudent = () => {
  const [showLoginError, setShowLoginError] = useState(false);
  const { _id } = useParams();
  const history = useNavigate();
  const userId = useSelector((state) => state.studentlistuserinfo.dataid);
  const users = useSelector((state) => state.user);
  let user = users;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentUserInfoDataId(_id, users.user_institute));
  }, [_id, dispatch, users]);

  useEffect(() => {
    return () => {
      dispatch(clearStudentEdit());
    };
  }, [dispatch]);

  const [isFilled, setisFilled] = useState(false);
  const [isRefreshed, setisRefreshed] = useState(false);
  const [student_fullname, set_student_fullname] = useState("");
  const [student_course, set_student_course] = useState("");
  const [student_email, set_student_email] = useState("");
  const [student_contact, set_student_contact] = useState("");
  const [student_dob, set_student_dob] = useState("");
  const [student_gender, set_student_gender] = useState("");
  const [student_parentname, set_student_parentname] = useState("");
  const [student_parentcontact, set_student_parentcontact] = useState("");
  const [student_address, set_student_address] = useState("");
  const [student_profile, set_student_profile] = useState("");
  const [student_username, set_student_username] = useState("");

  if (userId.data && userId.success && !isFilled && isRefreshed) {
    setisFilled(true);
    set_student_fullname(userId.data.StudentData_fullname);
    set_student_profile(
      userId.data.StudentData_profile_picture
        ? userId.data.StudentData_profile_picture
        : ""
    );
    set_student_course(
      userId.data.StudentData_courseData
        ? userId.data.StudentData_courseData
        : ""
    );
    set_student_email(userId.data.StudentData_email);
    set_student_contact(
      userId.data.StudentData_contact ? userId.data.StudentData_contact : ""
    );
    set_student_dob(
      userId.data.StudentData_dob ? userId.data.StudentData_dob : ""
    );
    set_student_gender(
      userId.data.StudentData_gender ? userId.data.StudentData_gender : ""
    );
    set_student_parentname(
      userId.data.StudentData_parent_name
        ? userId.data.StudentData_parent_name
        : ""
    );
    set_student_parentcontact(
      userId.data.StudentData_parent_contact
        ? userId.data.StudentData_parent_contact
        : ""
    );
    set_student_address(
      userId.data.StudentData_fulladdress
        ? userId.data.StudentData_fulladdress
        : ""
    );
  }
  if (userId.loading && !isRefreshed) {
    setisRefreshed(true);
    set_student_fullname("");
    set_student_profile("");
    set_student_course("");
    set_student_email("");
    set_student_contact("");
    set_student_dob("");
    set_student_gender("");
    set_student_parentname("");
    set_student_parentcontact("");
    set_student_address("");
    set_student_username("");
  }

  useEffect(() => {
    dispatch(getCourseData(user.user_institute));
  }, [dispatch, user]);

  const [student_email_error, set_student_email_error] = useState(false);
  const [student_fullname_error, set_student_fullname_error] = useState(false);
  const [student_course_error, set_student_course_error] = useState(false);
  const [student_contact_error, set_student_contact_error] = useState(false);
  const [student_parentcontact_error, set_student_parentcontact_error] =
    useState(false);

  const courses = useSelector((state) => state.courses.list.data);
  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    switch (inputName) {
      case "student_fullname":
        set_student_fullname(inputValue);
        set_student_fullname_error(ValidationFile.isEmpty(inputValue));
        break;
      case "student_course":
        set_student_course(inputValue);
        set_student_course_error(ValidationFile.isEmpty(inputValue));
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
      case "student_parentname":
        set_student_parentname(inputValue);
        break;
      case "student_address":
        set_student_address(inputValue);
        break;
      case "student_contact":
        set_student_contact(inputValue);
        set_student_contact_error(!ValidationFile.ValidateNumber(inputValue));
        break;
      case "student_parentcontact":
        set_student_parentcontact(inputValue);
        set_student_parentcontact_error(
          !ValidationFile.ValidateNumber(inputValue)
        );
        break;

      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);
    if (!ValidationFile.isEmail(student_email)) {
      set_student_email_error(true);
    }

    if (ValidationFile.isEmpty(student_course)) {
      set_student_course_error(true);
    }

    if (ValidationFile.isEmpty(student_fullname)) {
      set_student_fullname_error(true);
    }

    if (
      !ValidationFile.isEmpty(student_fullname) &&
      ValidationFile.isEmail(student_email) &&
      !ValidationFile.isEmpty(student_course) &&
      !student_parentcontact_error &&
      !student_contact_error
    ) {
      dispatch(
        editStudentUserInfoData(
          _id,
          user._id,
          users.user_institute,
          editStudentData()
        )
      );
      setTimeout(() => {
        history(`/invite-student-list`);
      }, 2000);
    }
  };

  const editStudentData = () => {
    if (student_gender === "") {
      return {
        course: student_course,
        fullname: student_fullname,
        email: student_email,
        contact: student_contact,
        dob: student_dob,
        parent_name: student_parentname,
        parent_contact: student_parentcontact,
        fulladdress: student_address,
      };
    } else {
      return {
        course: student_course,
        fullname: student_fullname,
        email: student_email,
        contact: student_contact,
        dob: student_dob,
        gender: student_gender,
        parent_name: student_parentname,
        parent_contact: student_parentcontact,
        fulladdress: student_address,
      };
    }
  };
  const postId = useParams();

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/invite-student-list" title=" Student List" />
        <BreadcrumbItem
          to={`/edit-student/${postId._id}`}
          title="Edit Student"
        />
      </Breadcrumb>
      {userId.loading ? (
        <div>Loading</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row mt-30">
            <div className="col-md-12">
              <h1 className="heading dgray text-sm w-300">
                {student_fullname}
              </h1>
              <p className="sub-heading dgray text-xxs w-500 ">
                {student_username}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-7">
              <div className="row mt-20">
                <div className="col-xs-12 col-md-12">
                  <div className="formFieldwrap">

                    <SelectInput
                      id="profession_cat"
                      onChange={handleInput}
                      name="student_course"
                      value={student_course}
                      label={`Select ${DynamicCourseHeader}`}
                      className={student_course_error && showLoginError
                        ? "errorInput"
                        : ""
                      }
                    >
                      <option value="">
                        Select {DynamicCourseHeader()}
                      </option>

                      {courses.length
                        ? courses.map((item) => {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.coursename}
                            </option>
                          );
                        })
                        : ""}
                    </SelectInput>

                    <FormError
                      show={student_course_error && showLoginError}
                      error={DynamicCourseHeader() + " is required."}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-6">
                  <div className="formFieldwrap">
                    <FormInput
                      className={
                        ValidationFile.isEmpty(student_fullname) &&
                          showLoginError
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
                </div>

                <div className="col-xs-12 col-md-6">
                  <div className="formFieldwrap">
                    <FormInput
                      className={
                        student_email_error && showLoginError
                          ? "errorInput"
                          : ""
                      }
                      name="student_email"
                      type="text"
                      onChange={handleInput}
                      label="Email"
                      disabled={true}
                      placeholder="Email address"
                      onKeyUp={handleInput}
                      value={student_email}
                    />
                    <FormError
                      show={student_email_error && showLoginError}
                      error="Email is required"
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-6">
                  <div className="formFieldwrap">
                    <FormInput
                      className=""
                      name="student_contact"
                      type="text"
                      onChange={handleInput}
                      label="Contact Number"
                      maxLength="15"
                      defaultValue={student_contact}
                      placeholder="Contact Number"
                      onKeyUp={handleInput}
                    />
                    <FormError
                      show={student_contact_error && showLoginError}
                      error="Contact can only contain 0-9 numbers"
                    />
                  </div>
                </div>
                <div className="col-xs-6 col-md-6">
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
                <div className="col-xs-6 col-md-6">
                  <div className="formFieldwrap">
                    <SelectInput
                      id="gender"
                      onChange={handleInput}
                      value={
                        student_gender === (null || undefined)
                          ? "Not Selcted"
                          : student_gender
                      }
                      name="student_gender"
                      label="Gender"
                    >
                      {student_gender === (null || undefined) && (
                        <option value="null">Select Gender</option>
                      )}
                      <option value="null">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </SelectInput>
                  </div>
                </div>
                <div className="col-xs-12 col-md-6">
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
                </div>
                <div className="col-xs-12 col-md-6">
                  <div className="formFieldwrap">
                    <FormInput
                      name="student_parentcontact"
                      defaultValue={student_parentcontact}
                      maxLength="15"
                      onChange={handleInput}
                      type="text"
                      label="Parent Contact"
                      placeholder="Parent Contact"
                      onKeyUp={handleInput}
                    />
                    <FormError
                      show={student_parentcontact_error && showLoginError}
                      error="Contact can only contain 0-9 numbers"
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-12">
                  <div className="formFieldwrap">
                    <FormTextArea
                      name="student_address"
                      defaultValue={student_address}
                      onChange={handleInput}
                      type="text"
                      label="Full Address"
                      placeholder="Full address"
                      onKeyUp={handleInput}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-3 col-sm-5 first-xs last-md">
              <div className="editStudentPicPreview mt-20">
                <ImageViewer
                  object={student_profile}
                  defaultImage={DummyProfile}
                  alt="student profile"
                />
              </div>
            </div>
          </div>

          <div className="row mt-40">
            <div className="col-md-2">
              <button
                className="button btn-md button-theme button-block"
                type="submit"
              >
                Update Details
              </button>
            </div>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};
export default EditStudent;
