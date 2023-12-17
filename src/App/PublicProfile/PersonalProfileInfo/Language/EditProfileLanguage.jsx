import React from "react";
import { useState } from "react";
import FormInput from "../../../../Common/Form/FormInput";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import FormError from "../../../../Common/Form/FormError";
import ValidationFile from "../../../Auth/ValidationFile";
import {
  patchLanguages,
} from "../../../../store/actions/publicProfile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SelectInput from "../../../../Common/Form/SelectInput";
function EditProfileLanguage({
  show,
  closeModalState,
  user,
  singleProfile,
  editdata,
}) {
  const dispatch = useDispatch();
  const IsOnline = user && user._id;
  const IsUser = (singleProfile && singleProfile.user) === (user && user._id);
  const profileId = singleProfile && singleProfile.user;
  const [valid, setValid] = useState(false);
  const [languages, setLanguage] = useState({
    language_name: { value: "", isValid: false },
    language_expertise: {
      value: "",
      isValid: false,
    },
    language_read: { value: null },
    language_write: { value: null },
    language_speak: { value: null },
  });

  useEffect(() => {
    setLanguage({
      language_name: {
        value: editdata.language_name,
        isValid: editdata.language_name ? true : false,
      },
      language_expertise: {
        value: editdata.language_expertise,
        isValid: editdata.language_expertise ? true : false,
      },
      language_read: {
        value: editdata.language_read ? editdata.language_read : null,
      },
      language_write: {
        value: editdata.language_write ? editdata.language_write : null,
      },
      language_speak: {
        value: editdata.language_speak ? editdata.language_speak : null,
      },
    });
    setValid(false);
  }, [editdata]);

  const postData = {
    _id: editdata && editdata._id,
    language_name: languages.language_name.value,
    // ? languages.language_name.value
    // : editdata && editdata.language_name,
    language_expertise: languages.language_expertise.value,
    // ? languages.language_expertise.value
    // : editdata && editdata.language_expertise,
    language_read: languages.language_read.value,
    language_write: languages.language_write.value,
    language_speak: languages.language_speak.value,
  };

  const OnChangeHandle = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trim();
    setValid(false);
    let data = {
      ...languages,
      [inputName]: {
        value: inputValue,
        isValid: verifyConfirm(inputName, inputValue),
      },
    };
    setLanguage(data);
  };
  const OnChangeCheckHandle = (e) => {
    let inputName = e.target.name;
    // let inputChecked = e.target.checked;
    let inputValue = e.target.value;
    setValid(false);
    let data = {
      ...languages,
      [inputName]: {
        value: inputValue,
      },
    };
    setLanguage(data);
  };
  const verifyConfirm = (inputName, inputValue) => {
    switch (inputName) {
      case "language_name": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "language_expertise": {
        return ValidationFile.validEmpty(inputValue);
      }
      default:
        return false;
    }
  };
  const onSubmitData = (e) => {
    e.preventDefault();
    setValid(true);
    let IsallValid =
      languages.language_name.isValid && languages.language_expertise.isValid;
    if (IsOnline && IsallValid && IsUser) {
      dispatch(patchLanguages(profileId, postData));
      closeModalState();
      setValid(false);
    }
  };

  return (
    <Modal show={show}>
      <ModalHeader
        closeButton={true}
        title="Update Language"
        onclose={closeModalState}
      ></ModalHeader>
      <ModalBody>
        <React.Fragment>
          <form
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            method="post"
          >
            <div className="formFieldwrap">
              <FormInput
                type="text"
                placeholder="Language"
                label="Language"
                name="language_name"
                defaultValue={languages.language_name.value}
                onChange={OnChangeHandle}
              />
              <FormError
                show={!languages.language_name.isValid && valid}
                error="Please enter language name.  "
              />
            </div>
            <div className="formFieldwrap">
              <SelectInput
                name="language_expertise"
                onChange={OnChangeHandle}
                value={languages.language_expertise.value}
                label="Language Level"
              >
                <option value="">Select</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
                <option value="Professional">Professional</option>
              </SelectInput>
              <FormError
                show={!languages.language_expertise.isValid && valid}
                error="Please enter language expertise.  "
              />
            </div>
            <div className="input-custom-type inline">
              <label className="small">
                {languages.language_read.value === null ||
                  (languages.language_read.value === "" &&
                    !languages.language_read.value) ? (
                  <input
                    type="checkbox"
                    name="language_read"
                    value="Read"
                    onClick={OnChangeCheckHandle}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="language_read"
                    value=""
                    onClick={OnChangeCheckHandle}
                    defaultChecked
                  />
                )}
                Read
              </label>
              <label className="small">
                {languages.language_write.value === null ||
                  (languages.language_write.value === "" &&
                    !languages.language_write.value) ? (
                  <input
                    type="checkbox"
                    name="language_write"
                    value="Write"
                    onClick={OnChangeCheckHandle}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="language_write"
                    value=""
                    onClick={OnChangeCheckHandle}
                    defaultChecked
                  />
                )}
                Write
              </label>
              <label className="small">
                {languages.language_speak.value === null ||
                  (languages.language_speak.value === "" &&
                    !languages.language_speak.value) ? (
                  <input
                    type="checkbox"
                    name="language_speak"
                    value="Speak"
                    onClick={OnChangeCheckHandle}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="language_speak"
                    value=""
                    onClick={OnChangeCheckHandle}
                    defaultChecked
                  />
                )}
                Speak
              </label>
            </div>
          </form>
        </React.Fragment>
      </ModalBody>
      <ModalFooter>
        <button
          className="button button-primary btn-sm"
          type="submit"
          onClick={onSubmitData}
        >
          Save
        </button>
        <button
          className="button btn-o-primary primary btn-sm"
          type="button"
          onClick={closeModalState}
        >
          Cancel
        </button>
      </ModalFooter>
    </Modal >
  );
}

export default EditProfileLanguage;
