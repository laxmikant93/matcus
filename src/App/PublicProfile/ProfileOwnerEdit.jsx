import React, { useEffect, useRef, useState } from "react";
import FormInput from "../../Common/Form/FormInput";
import Modal from "../../Common/Modal";
import ModalBody from "../../Common/Modal/ModalBody";
import ModalFooter from "../../Common/Modal/ModalFooter";
import ModalHeader from "../../Common/Modal/ModalHeader";
import { editProfileLinks } from "../../store/actions/publicProfile";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../../Common/Form/FormError";
import ValidationFile from "../Auth/ValidationFile";
import validationFile from "../../Classes/ValidationFile";
import Cropper from "../../Common/Cropper";
import FormTextArea from "../../Common/Form/FormTextArea";
import PublicProfielUrl from "./PublicProfielUrl";
import { getpublicprofileById } from "../../store/actions/publicProfile";
import { changeUserInfo } from "../../store/actions/user";
import { useNavigate } from "react-router";
import Uploader from "../../Common/ImageUploader";
import UploadButton from "../../Common/UploadButton";
import ImageViewer from "../../Common/ImageViewer";
export const ProfileOwnerEdit = ({
  userInfo,
  EditModal,
  SetEditModal,
  focusForWebsite,
  focusForSocialLinks,
  focusForHeadline,
  singleProfile,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  // const [EditModal, SetEditModal] = useState(false);
  const [imgLink, setImageLink] = useState("");
  const ref = useRef()
  const { user, userEdit, userCheck } = useSelector((state) => {
    return {
      user: state.user,
      // userInfo: state.publicProfile.singleProfile.data.userInfo,
      userEdit: state.publicProfile.editLink.data,
      userCheck: state.publicProfile.usernamecheck
    };
  });

  useEffect(() => {
    userInfo &&
      setImageLink(
        userInfo.public_profile_picture ? userInfo.public_profile_picture : ""
      );
  }, [userInfo, SetEditModal, userEdit]);

  let result =
    userCheck && userCheck.data && userCheck.data.result
      ? userCheck.data.result
      : false;
  let userNameCHecked = () => {
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  const InputValues = {
    name: { value: "", isvalid: false },
    username: "",
    short_intro: "",
    website: { value: "", isvalid: false },
    facebook: { value: "", isvalid: false },
    twitter: { value: "", isvalid: false },
    linkedin: { value: "", isvalid: false },
    instagram: { value: "", isvalid: false },
    youtube: { value: "", isvalid: false },
    public_profile_picture: { value: "", isvalid: false },
  };
  useEffect(() => {
    setEdit({
      name: {
        value: userEdit && userEdit.name,
        isvalid: userEdit && userEdit.name ? true : false,
      },
      username: userEdit && userEdit.username,
      short_intro: userEdit && userEdit.short_intro,
      website: { value: userEdit && userEdit.website, isvalid: true },
      facebook: { value: userEdit && userEdit.facebook, isvalid: true },
      twitter: { value: userEdit && userEdit.twitter, isvalid: true },
      linkedin: { value: userEdit && userEdit.linkedin, isvalid: true },
      instagram: { value: userEdit && userEdit.instagram, isvalid: true },
      youtube: { value: userEdit && userEdit.youtube, isvalid: true },
      public_profile_picture: userEdit && userEdit.public_profile_picture,
    });
  }, [userEdit, history]);

  const [edit, setEdit] = useState(InputValues);
  const [valid, setValid] = useState(false);
  // const [isupdate, setIsupdate] = useState(false);
  const ChangeValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trimStart();
    let editFullname = {
      ...edit,
      name: {
        value: inputValue,
        isvalid: inputValue === "" ? validConfirm(inputValue, inputName) : true,
      },
    };
    setEdit(editFullname);
    setValid(false);
  };
  const ChangeinputValue = (e) => {
    let editLinks = {
      ...edit,
      [e.target.name]: e.target.value,
    };
    setValid(false);
    setEdit(editLinks);
  };
  const ChangeinputValuelinks = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trimStart();
    let editLinks = {
      ...edit,
      [e.target.name]: {
        value: inputValue,
        isvalid: validConfirm(inputValue, inputName),
      },
    };
    setValid(false);
    setEdit(editLinks);
  };

  const UploadImage = (data) => {
    setImageLink(data);
    let imgd = data;
    let editImage = {
      ...edit,
      public_profile_picture: imgd,
    };
    setEdit(editImage);
    // setIsupdate(true);
  };

  const removeImage = () => {
    setImageLink("");
    // setIsupdate(false);
    let editImage = {
      ...edit,
      public_profile_picture: "",
    };
    setEdit(editImage);
  };

  const validConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "name": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "website": {
        if (inputValue === "" || inputValue === null) {
          return true;
        } else {
          return validationFile.validWebsiteLink(inputValue);
        }
      }
      case "facebook": {
        if (inputValue === "" || inputValue === null) {
          return true;
        } else {
          return validationFile.validFacebookLink(inputValue);
        }
      }
      case "twitter": {
        if (inputValue === "" || inputValue === null) {
          return true;
        } else {
          return validationFile.validtwitterLink(inputValue);
        }
      }
      case "linkedin": {
        if (inputValue === "" || inputValue === null) {
          return true;
        } else {
          return validationFile.validlinkedinLink(inputValue);
        }
      }
      case "instagram": {
        if (inputValue === "" || inputValue === null) {
          return true;
        } else {
          return validationFile.validinstagramLink(inputValue);
        }
      }
      case "youtube": {
        if (inputValue === "" || inputValue === null) {
          return true;
        } else {
          return validationFile.validyoutubeLink(inputValue);
        }
      }
      default:
        return false;
    }
  };
  const profileData = {
    name: edit.name ? edit.name.value : user.user_fullname,
    username: userNameCHecked()
      ? userCheck.username && userCheck.username.username
      : edit.username,
    short_intro: edit.short_intro,
    website: edit.website.value,
    facebook: edit.facebook.value,
    twitter: edit.twitter.value,
    linkedin: edit.linkedin.value,
    instagram: edit.instagram.value,
    youtube: edit.youtube.value,
    public_profile_picture: edit.public_profile_picture
    // ? edit.public_profile_picture
    // : !isupdate && edit.public_profile_picture === ""
    // ? ""
    // : isupdate && userInfo.public_profile_picture,
  };

  const AllisValid =
    edit.name.isvalid &&
    edit.website.isvalid &&
    edit.facebook.isvalid &&
    edit.twitter.isvalid &&
    edit.instagram.isvalid &&
    edit.linkedin.isvalid &&
    edit.youtube.isvalid;

  const userData = {
    profile_picture: edit.public_profile_picture,
    // ? edit.public_profile_picture
    // : !isupdate && edit.public_profile_picture === ""
    // ? ""
    // : isupdate && userInfo.public_profile_picture,
    fullname: edit.name ? edit.name.value : user.user_fullname,
    username: userNameCHecked()
      ? userCheck.username && userCheck.username.username
      : edit.username,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValid(true);
    let userId = userInfo.user;
    if (!valid && AllisValid) {
      dispatch(editProfileLinks(profileData, userId));
      dispatch(changeUserInfo(user._id, userData));
      setValid(false);
      SetEditModal(false);
      if (userCheck.username.username) {
        setTimeout(() => {
          history(`/profile/${profileData.username}`);
          dispatch(getpublicprofileById(profileData.username));
          // window.location.reload();
        }, 1000);
      }
    }
  };

  const closeModalState = () => {
    SetEditModal(false);
    setValid(false);
    setImageLink("");
    // setIsupdate(false);
    let editImage = {
      ...edit,
      public_profile_picture: userEdit ? userEdit.public_profile_picture : "",
    };
    setEdit(editImage);
  };
  // const manageModalState = () => {
  //   SetEditModal(!EditModal);
  // };
  return (
    <div className="ProfileOwnerEditCustom">
      {/* {userInfo && userInfo.user === user._id ? (
        <button
          className="button button-primary btn-sm"
          onClick={() => manageModalState()}
        >
          <i className="ed-icon icon-edit i-xs white"></i>
          Edit
        </button>
      ) : (
        ""
      )} */}

      <Modal ModalSize="modal-m" show={EditModal}>
        <ModalHeader closeButton={true} onclose={closeModalState}></ModalHeader>
        <ModalBody>
          <React.Fragment>
            <div className="edit-profile-hero-modal">
              <div className="edit-profile-hero-personal-detail">
                <div className="edit-personal-profpic">
                  {imgLink === "" ? (
                    <React.Fragment>
                      <div className="DefaultEditProfilePicHero"></div>
                      <UploadButton
                        BtnName="Upload Image"
                        BtnPropClass="button-primary btn-sm button-block mt-10 CropUploadBtn"
                        uploadViaModel={false}
                        InputOvelapClass="button btn-o-gray btn-sm  gray button-block m-0"
                        InputOvelapLabel="Upload Image"
                        InputUploadIconClass="icon-file-upload gray i-xs"
                        onClick={() => {
                          ref.current.open();
                        }}
                      />
                      <Uploader
                        onclose={() => ref.current.close()}
                        multiSelect={false}
                        discartRef={ref}
                        onUploaded={(data) => UploadImage(data)}
                        uploadLimit={1}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <ImageViewer
                        className="personal-profpic-img-preview"
                        object={
                          imgLink ||
                          (userEdit && userEdit.public_profile_picture)
                        }
                      />
                       <UploadButton
                       BtnName="Change"
                        IconClassName="i-md gray"
                        BtnPropClass="btn-o-silver btn-sm button-block mt-10 CropUploadBtn"
                        uploadViaModel={false}
                        InputOvelapClass="button btn-o-gray btn-sm  gray button-block m-0"
                        InputOvelapLabel="Upload Image"
                        InputUploadIconClass="icon-file-upload gray i-xs"
                        onClick={() => {
                          ref.current.open();
                        }}
                      />
                      <Uploader
                        onclose={() => ref.current.close()}
                        multiSelect={false}
                        discartRef={ref}
                        onUploaded={(data) => UploadImage(data)}
                        uploadLimit={1}
                      />
                      <button
                        className="button btn-o-red red btn-sm button-block mt-10"
                        type="button"
                        onClick={removeImage}
                      >
                        Remove
                      </button>
                    </React.Fragment>
                  )}
                </div>
                <div className="edit-personal-profDetail">
                  <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    method="post"
                  >
                    <div className="formFieldwrap">
                      <FormInput
                        label="Full Name"
                        name="name"
                        defaultValue={userEdit && userEdit.name}
                        onChange={(e) => ChangeValue(e)}
                        onKeyUp={(e) => ChangeValue(e)}
                        placeholder="Full Name"
                      />
                      <FormError
                        show={!edit.name.isvalid && valid}
                        error="Full name is required."
                      />
                    </div>
                    <div className="formFieldwrap">
                      <FormTextArea
                        label="Short Introduction"
                        placeholder="Add a short introduction about yourself"
                        rows="2"
                        name="short_intro"
                        defaultValue={userEdit && userEdit.short_intro}
                        onChange={(e) => ChangeinputValue(e)}
                        maxLength="100"
                        TextareaBtmTxt="100"
                        autoFocus={focusForHeadline}
                      />
                      {/* <FormInput
                        label="Short intro"
                        name="short_intro"
                        defaultValue={userEdit.short_intro}
                        onChange={(e) => ChangeinputValue(e)}
                        placeholder="Short intro"
                        maxLength="100"
                        TextareaBtmTxt="100"
                      /> */}
                    </div>
                    <div className="formFieldwrap">
                      <FormInput
                        label="Website"
                        name="website"
                        autoFocus={focusForWebsite}
                        defaultValue={userEdit && userEdit.website}
                        onChange={(e) => ChangeinputValuelinks(e)}
                        placeholder="Add Your Complete Website URL.(e.g. - https://www.edneed.com)"
                      />
                      <FormError
                        show={!edit.website.isvalid && valid}
                        error="Invalid Website link."
                      />
                    </div>
                  </form>
                </div>
              </div>
              <PublicProfielUrl />
              <div className="edit-profile-hero-social-detail">
                <p className="text-xs w-600 mb-20">Social Links</p>
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  method="post"
                >
                  <div className="formFieldwrap">
                    <FormInput
                      label="Facebook"
                      name="facebook"
                      defaultValue={userEdit && userEdit.facebook}
                      onChange={(e) => ChangeinputValuelinks(e)}
                      placeholder="Facebook"
                      autoFocus={focusForSocialLinks}
                    />
                    <FormError
                      show={!edit.facebook.isvalid && valid}
                      error="Invalid facebook link."
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      label="Twitter"
                      name="twitter"
                      defaultValue={userEdit && userEdit.twitter}
                      onChange={(e) => ChangeinputValuelinks(e)}
                      placeholder="Twitter"
                    />
                    <FormError
                      show={!edit.twitter.isvalid && valid}
                      error="Invalid twitter link."
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      label="LinkedIn"
                      name="linkedin"
                      defaultValue={userEdit && userEdit.linkedin}
                      onChange={(e) => ChangeinputValuelinks(e)}
                      placeholder="LinkedIn"
                    />
                    <FormError
                      show={!edit.linkedin.isvalid && valid}
                      error="Invalid linkedin link."
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      label="Instagram"
                      name="instagram"
                      defaultValue={userEdit && userEdit.instagram}
                      onChange={(e) => ChangeinputValuelinks(e)}
                      placeholder="Instagram"
                    />
                    <FormError
                      show={!edit.instagram.isvalid && valid}
                      error="Invalid instagram link."
                    />
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      label="Youtube"
                      name="youtube"
                      defaultValue={userEdit && userEdit.youtube}
                      onChange={(e) => ChangeinputValuelinks(e)}
                      placeholder="Youtube"
                    />
                    <FormError
                      show={!edit.youtube.isvalid && valid}
                      error="Invalid youtube link."
                    />
                  </div>
                  <button
                    // onClick={handleSubmit}
                    className="button btn-sm button-primary"
                    type="submit"
                  >
                    Update
                  </button>
                  <button
                    className="button btn-sm btn-o-primary primary"
                    type="reset"
                    onClick={closeModalState}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </React.Fragment>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default ProfileOwnerEdit;
