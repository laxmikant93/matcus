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
  postLanguages,
  getLanguages,
} from "../../../../store/actions/publicProfile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SelectInput from "../../../../Common/Form/SelectInput";
function AddNewProfileLanguage({
  showprop,
  closeModalStateprop,
  user,
  singleProfile,
}) {
  const dispatch = useDispatch();
  const [valid, setValid] = useState(false);
  const IsOnline = user && user._id;
  const profileId = singleProfile && singleProfile.user;

  const [languages, setLanguage] = useState({
    language_name: { value: "", isValid: false },
    language_expertise: { value: "", isValid: false },
    language_read: { value: null },
    language_write: { value: null },
    language_speak: { value: null },
  });
  useEffect(() => {
    setLanguage({
      language_name: { value: "", isValid: false },
      language_expertise: { value: "", isValid: false },
      language_read: { value: null },
      language_write: { value: null },
      language_speak: { value: null },
    });
    setValid(false);
  }, [closeModalStateprop]);
  const postData = {
    language_name: languages.language_name.value,
    language_expertise: languages.language_expertise.value,
    language_read: languages.language_read.value,
    language_write: languages.language_write.value,
    language_speak: languages.language_speak.value,
  };
  const OnChangeHandle = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trim();
    // setValid(false);
    let data = {
      ...languages,
      [inputName]: {
        value: inputValue,
        isValid: verifyConfirm(inputName, inputValue),
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
  const OnChangeCheckHandle = (e) => {
    let inputName = e.target.name;
    let inputChecked = e.target.checked;
    let inputValue = e.target.value.trim();
    setValid(false);
    let data = {
      ...languages,
      [inputName]: {
        value: inputChecked ? inputValue : null,
        isValid: inputValue === "" ? false : true,
      },
    };
    setLanguage(data);
  };

  const isValid = () => {
    return languages.language_name.isValid &&
      languages.language_expertise.isValid
      ? true
      : false;
  };

  const onSubmitData = (e) => {
    e.preventDefault();
    setValid(true);
    if (IsOnline && isValid()) {
      dispatch(postLanguages(profileId, postData));
      setValid(false);
      setTimeout(() => {
        dispatch(getLanguages(profileId));
      }, 800);
      closeModalStateprop();
      setValid(false);
    }
  };

  return (
    <Modal show={showprop}>
      <ModalHeader
        closeButton={true}
        onclose={closeModalStateprop}
        title="Add Language"
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
                onChange={OnChangeHandle}
                value={languages.language_name.value}
              />
              <FormError
                show={!languages.language_name.isValid && valid}
                error="Please enter language name.  "
              />
            </div>
            <div className="formFieldwrap">
              <SelectInput name="language_expertise" onChange={OnChangeHandle} label="Language Level">
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
              <label
                className={`small ${languages.language_read.value ? "active" : ""
                  }`}
              >
                <input
                  type="checkbox"
                  name="language_read"
                  value="Read"
                  onChange={OnChangeCheckHandle}
                />
                Read
              </label>
              <label
                className={`small ${languages.language_write.value ? "active" : ""
                  }`}
              >
                {" "}
                <input
                  type="checkbox"
                  name="language_write"
                  value="Write"
                  onChange={OnChangeCheckHandle}
                />
                Write
              </label>
              <label
                className={`small ${languages.language_speak.value ? "active" : ""
                  }`}
              >
                {" "}
                <input
                  type="checkbox"
                  name="language_speak"
                  value="Speak"
                  onChange={OnChangeCheckHandle}
                />
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
          onClick={closeModalStateprop}
        >
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default AddNewProfileLanguage;
