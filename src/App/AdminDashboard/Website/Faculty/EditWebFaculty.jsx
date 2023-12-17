/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import FormInput from "../../../../Common/Form/FormInput";
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import { useDispatch } from "react-redux";
import {
  getFacultylistinfoId,
  resetSingleFacultyInfo,
  updateFaculty,
} from "../../../../store/actions/manageFaculty";
import { useSelector } from "react-redux";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import Cropper from "../../../../Common/Cropper";
import { IconAttachment } from "../../../../Common/Icon";
import "./Faculty.scss";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
import ImageViewer from "../../../../Common/ImageViewer";

function EditWebFaculty() {
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const dispatch = useDispatch();
  const { _id } = useParams();
  const ref = useRef()
  const facultyData = useSelector((state) => state.manageFaculty.dataid);
  const updateInfo = useSelector((state) => state.manageFaculty.updateFaculty);
  const industryType = useSelector((state) =>
    state.user.user_business_type);
  const history = useNavigate();
  useEffect(() => {
    dispatch(getFacultylistinfoId(_id, industryType));
  }, [_id, dispatch]);
  const [isFilled, setisFilled] = useState(false);
  const [facultyError, setFacultyError] = useState(false);
  const [faculty_fullName, set_faculty_fullname] = useState("");
  const [faculty_designation, set_faculty_designation] = useState("");
  const [faculty_profileimg, set_faculty_profileimg] = useState("");
  const [profileError, setProfileError] = useState(false);
  const [faculty_description, setFaculty_description] = useState("")
  const [faculty_fullName_error, set_faculty_fullname_error] = useState(false);
  const [faculty_designation_error, set_faculty_designation_error] =
    useState(false);

  if (facultyData.data && facultyData.success && !isFilled) {
    setisFilled(true);
    set_faculty_fullname(facultyData.data.fullname);
    set_faculty_designation(facultyData.data.designation);
    set_faculty_profileimg(facultyData.data.profileurl);
    setFaculty_description(facultyData.data.description ? facultyData.data.description : "")
  }

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "faculty_fullName":
        set_faculty_fullname(inputValue);
        set_faculty_fullname_error(ValidationFile.isEmpty(inputValue));
        break;
      case "faculty_designation":
        set_faculty_designation(inputValue);
        set_faculty_designation_error(ValidationFile.isEmpty(inputValue));
        break;
      default:
        return false;
    }
  };

  const uploadImage = (data, e) => {
    set_faculty_profileimg(data);
  };

  useEffect(() => {
    return () => {
      dispatch(resetSingleFacultyInfo());
    };
  }, [dispatch]);

  const submitEditFaculty = (e) => {
    e.preventDefault();
    setFacultyError(true);
    setProfileError(true);
    if (ValidationFile.isEmpty(faculty_fullName)) {
      set_faculty_fullname_error(true);
    }
    if (ValidationFile.isEmpty(faculty_designation)) {
      set_faculty_designation_error(true);
    }
    if (
      !ValidationFile.isEmpty(faculty_fullName) &&
      !ValidationFile.isEmpty(faculty_designation) &&
      faculty_profileimg
    ) {
      dispatch(updateFaculty(_id, industryType, editFacultyData()));
    }
  };
  const handleOnChangeContent = (value) => {
    setFaculty_description(value);
  };
  const editFacultyData = () => {
    return {
      fullname: faculty_fullName,
      designation: faculty_designation,
      profileurl: faculty_profileimg,
      description: faculty_description
    };
  };
  const [updated, setUpdated] = useState(false);
  if (updateInfo.success && !updated) {
    setUpdated(true);
    history(`/manage-faculty`);
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/manage-faculty" title="Manage Faculty" />
        <BreadcrumbItem to={`/edit-web-faculty/${_id}`} title="Edit Faculty" />
      </Breadcrumb>
      <div className="no-gutter mt-30 mb-30">
        <h3 className="heading text-sm w-300">Update Faculty</h3>
        {facultyData.loading ? (
          <div className="loadingGridData">Loading</div>
        ) : (
          <>
            <div className="row">
              <div className="col-xs-12 col-md-8 mt-20">
                <div className="formFieldwrap">
                  <FormInput
                    label="Faculty Full Name"
                    name="faculty_fullName"
                    value={faculty_fullName}
                    placeholder="Faculty Full Name"
                    onChange={handleInput}
                    onKeyUp={handleInput}
                  />
                  <FormError
                    show={faculty_fullName_error && facultyError}
                    error="Full name is required."
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    label="Designation"
                    placeholder="Designation"
                    value={faculty_designation}
                    name="faculty_designation"
                    onChange={handleInput}
                    onKeyUp={handleInput}
                  />
                  <FormError
                    show={faculty_designation_error && facultyError}
                    error="Designation is required."
                  />
                </div>
                <TextEditor
                  preFilledData={faculty_description}
                  currentResponse={(value) => handleOnChangeContent(value)}
                />
                <div className="upload-mf-wrap">
                  <div className="formFieldwrap">
                    <label className="text-xs">Change Profile Photo</label>
                    <p className="text-xxs w-500 mb-5">
                      - Accept only .jpg or .png
                    </p>
                    {/* <Cropper
                      minWidth={200}
                      maxWidth={400}
                      ref={ref}
                      defaultRatio={1 / 1}
                      onUploaded={(e) => uploadImage(e)}
                      BtnName="Upload Image"
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                    /> */}
                     <UploadButton
                      ref={ref}
                      BtnName="Upload Image"
                      array={true}
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{ref.current.open()}}
                      showLink={true}
                      object={faculty_profileimg}
                    />
               <Uploader size={5}
      accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
       onclose={() => ref.current.close()}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadImage(data)}  uploadLimit={1} />

           
                    {/* {faculty_profileimg && (
                      <a
                        className="btnText priamry text-2xs attachmentwithtext mt-3"
                        href={faculty_profileimg}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="ed-icon icon-attachment gray i-xs"></i>
                        {faculty_profileimg.replace(s3Url, "")}
                      </a>
                    )} */}
                    {profileError ? <br /> : ""}
                    <FormError
                      show={!faculty_profileimg && profileError}
                      error="Image file required."
                    />
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-4 mt-20">
                <div className="profilePrew-mf-wrap">
                  <ImageViewer
                    object={faculty_profileimg}
                    defaultImage={DummyProfile}
                    className="admin-profile-image img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-12 mt-20">
                {updateInfo.loading ? (
                  <button
                    type="button"
                    className="button fullWidth btn-md button-theme w-500"
                  >
                    Updating Faculty...
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button fullWidth btn-md button-theme w-500"
                    onClick={submitEditFaculty}
                  >
                    Update Faculty
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default EditWebFaculty;
