/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  postFaculty,
  resetSingleFacultyInfo,
} from "../../../../store/actions/manageFaculty";
import { useNavigate } from "react-router-dom";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import Cropper from "../../../../Common/Cropper";
import { IconAttachment } from "../../../../Common/Icon";
import "./Faculty.scss";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
import ImageViewer from "../../../../Common/ImageViewer";
function AddFaculties({ hiddenBreadcrumbs }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const ref = useRef()
  const [index, setIndex] = useState("")
  const [facultyNameError, setFacultyNameError] = useState(false);
  const [facultyDesignationError, setFacultyDesignationError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const facultyID = useSelector((state) => state.user.user_institute);
  const addFaculty = useSelector((state) => state.manageFaculty.addFaculty);
  const userId = useSelector((state) => state.user._id);
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const industryType = useSelector((state) =>
    state.user.user_business_type);
  let [faculty, setFaculty] = useState(
    [
      {
        institute: facultyID,
        owner: userId,
        fullname: "",
        designation: "",
        description: "",
        profileurl: "",
        facultyNameIsValid: false,
        facultyDesignationIsValid: false,
        business: facultyID
      },
    ]);

  const isFacultyNameValid = () => {
    let isValid = true;
    for (let key = 0; key < faculty.length; key++) {
      const element = faculty[key];
      if (ValidationUtils.isEmpty(element.fullname)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setFacultyNameError(false);
    } else {
      setFacultyNameError(true);
    }
    return isValid;
  };

  const isFacultyDesignationValid = () => {
    let isValid = true;
    for (let key = 0; key < faculty.length; key++) {
      const element = faculty[key];
      if (ValidationUtils.isEmpty(element.designation)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setFacultyDesignationError(false);
    } else {
      setFacultyDesignationError(true);
    }
    return isValid;
  };

  const addMoreFaculty = () => {
    let facultyLists = faculty;
    facultyLists.push({
      institute: facultyID,
      owner: userId,
      fullname: "",
      designation: "",
      profileurl: "",
      description: "",
      facultyNameIsValid: false,
      facultyDesignationIsValid: false,
      business: facultyID

    });

    setFaculty([...facultyLists]);
  };

  const handleFacultyNameChange = (e, key) => {
    let facultiesField = e.target.value.trimStart();
    faculty[key]["fullname"] = facultiesField;
    faculty[key]["facultyNameIsValid"] =
      ValidationUtils.isNotEmpty(facultiesField);
    setFaculty([...faculty]);
    isFacultyNameValid();
  };
  const handleFacultyDesignationChange = (e, key) => {
    let facultiesField = e.target.value.trimStart();
    faculty[key]["designation"] = facultiesField;
    faculty[key]["facultyDesignationIsValid"] =
      ValidationUtils.isNotEmpty(facultiesField);
    setFaculty([...faculty]);
    isFacultyDesignationValid();
  };

  //  UPLOAD IMAGE

  const uploadImage = (data, key) => {
    let imgData = data;
    let allinputs = faculty;
    allinputs[key]["profileurl"] = data;
    setFaculty([...allinputs]);
  };
  const removeFaculty = (key) => {
    let faculties = [...faculty];
    faculties.splice(key, 1);
    setFaculty([...faculties]);
  };
  const handleOnChangeContent = (key, value) => {
    faculty[key]["description"] = value;
    setFaculty([...faculty]);
  }
  const saveFaculty = (e) => {
    setThumbnailError(true);
    e.preventDefault();
    const isValidName = isFacultyNameValid();
    const isValidDesg = isFacultyDesignationValid();
    // if (isValidName && isValidDesg && faculty.every((i) => i["profileurl"])) {
    //   dispatch(postFaculty(faculty));
    // }
    if (isValidName && isValidDesg) {
      dispatch(postFaculty(industryType, faculty));
    }
  };
  const [created, setCreated] = useState(false);
  if (addFaculty.success && !created) {
    setCreated(true);
    history(`/manage-faculty`);
    dispatch(resetSingleFacultyInfo());
  }

  return (
    <React.Fragment>
      {hiddenBreadcrumbs !== true && (
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
          <BreadcrumbItem to="/manage-faculty" title="Manage Faculty" />
          <BreadcrumbItem to="/add-faculty" title="Add Faculty" />
        </Breadcrumb>
      )}
      <div className="row mt-30">
        <div className="col-xs-12 col-md-12">
          <p className="text-sm w-500">Add Faculty</p>
          <p className="text-xxs w-300 mb-10">
            You can add up to 5 faculties at one time.
          </p>
        </div>
      </div>
      {faculty.map((facultyData, key) => {
        return (
          <div
            key={key + facultyData.profileurl}
            className="manage-faculty-wrap"
          >
            <div className="row mt-20">
              <div className="col-xs-12 col-md-8">
                <div className="formFieldwrap">
                  <FormInput
                    label="Faculty Full Name"
                    name={key}
                    value={facultyData.fullname}
                    placeholder="Faculty Full Name"
                    onChange={(e) => handleFacultyNameChange(e, key)}
                    onKeyUp={(e) => handleFacultyNameChange(e, key)}
                    className={facultyNameError && !faculty[key]["facultyNameIsValid"] ? "errorInput" : ""}
                  />
                  {facultyNameError && (
                    <FormError
                      show={!faculty[key]["facultyNameIsValid"]}
                      error="Faculty name is required."
                    ></FormError>
                  )}
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    label="Designation"
                    placeholder="Designation"
                    value={facultyData.designation}
                    name={key}
                    onChange={(e) => handleFacultyDesignationChange(e, key)}
                    onKeyUp={(e) => handleFacultyDesignationChange(e, key)}
                    className={facultyDesignationError && !faculty[key]["facultyDesignationIsValid"] ? "errorInput" : ""}
                  />
                  {facultyDesignationError && (
                    <FormError
                      show={!faculty[key]["facultyDesignationIsValid"]}
                      error="Designation is required."
                    ></FormError>
                  )}
                </div>
                <TextEditor
                  preFilledData={facultyData.description}
                  currentResponse={(value) => handleOnChangeContent(key, value)}
                />
                <div className="upload-mf-wrap">
                  <div className="formFieldwrap">
                    <label className="text-xs">Upload Photo</label>
                    <p className="text-xxs mb-5">- Accept only .jpg or .png</p>
                    {/* <Cropper
                      minWidth={200}
                      ref={ref}
                      maxWidth={400}
                      defaultRatio={1 / 1}
                      onUploaded={(e) => uploadImage(e, key)}
                      BtnName="Upload Image"
                      array={true}
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                    /> */}

                    <UploadButton
                      ref={ref}
                      BtnName="Upload Image"
                      array={true}
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={() => { ref.current.open(); setIndex(key) }}
                      showLink={true}
                      object={facultyData.profileurl}
                    />
                    <Uploader size={5}
                      accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
                      onclose={() => ref.current.close()}
                      multiSelect={false} discartRef={ref} onUploaded={(data) => uploadImage(data, index)} uploadLimit={1} />

                    {/* {facultyData.profileurl.src && (
                      <a
                        className="btnText priamry text-2xs attachmentwithtext mt-3"
                        href={facultyData.profileurl.src}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="ed-icon icon-attachment gray i-xs"></i>
                        {facultyData.profileurl.replace(s3Url, "")}
                      </a>
                    )} */}
                    {thumbnailError ? <br /> : ""}
                    {/* <FormError
                      show={thumbnailError && !faculty[key]["profileurl"]}
                      error="Image file required."
                    /> */}
                  </div>
                  {faculty.length !== 1 && (
                    <button
                      type="button"
                      className="button btn-o-red btn-sm w-500 mb-10"
                      onClick={() => {
                        removeFaculty(key);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <div className="profilePrew-mf-wrap">
                  <ImageViewer
                    className="admin-profile-image"
                    object={
                      faculty[key]["profileurl"]
                    }
                    defaultImage={DummyProfile}
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="row mt-10">
        {faculty.length < 5 && (
          <div className="col-xs-12 col-md-12">
            <button
              type="button"
              className="button button-primary btn-sm w-500"
              onClick={addMoreFaculty}
            >
              Add More
            </button>
          </div>
        )}

        <div className="col-xs-12 col-md-12 mt-20">
          {!addFaculty.loading ? (
            <button
              type="button"
              className="button btn-md button-theme btn-md w-500"
              onClick={saveFaculty}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="button btn-md button-theme btn-md w-500"
            >
              Saving..
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddFaculties;
