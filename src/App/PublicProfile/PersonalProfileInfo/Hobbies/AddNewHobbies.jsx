import React from "react";
import { useState, useRef } from "react";
import FormInput from "../../../../Common/Form/FormInput";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import { useDispatch } from "react-redux";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  postInterestHobbies,
  getInterestHoobies,
  DeleteInterestHobbies,
} from "../../../../store/actions/publicProfile";
import FormError from "../../../../Common/Form/FormError";
import { useEffect } from "react";
import ValidationFile from "../../../../Classes/ValidationFile";
function AddNewHobbies({ showprop, closeModalStateprop, user, singleProfile }) {
  const dispatch = useDispatch();
  const [valid, setValid] = useState(false);
  const [Interest, setInterestHobbies] = useState({
    name: {
      value: "",
      isValid: false,
    },
  });
  const [hobbyArray, setHobbyArray] = useState("");
  useEffect(() => {
    setInterestHobbies({
      name: {
        value: "",
        isValid: false,
      },
    });
    setValid(false);
  }, [closeModalStateprop]);

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "Interests":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const IsOnline = user && user._id;
  const OnChangeHandle = (e) => {
    setValid(false);
    let inputName = e.target.name;
    let inputValue = e.target.value.trim();
    setInterestHobbies({
      name: {
        value: ValidationFile.spaceNotAccept(inputValue),
        isValid: validationConfirm(ValidationFile.spaceNotAccept(inputValue), inputName),
      },
    });
    let splitVale = inputValue.split(",");
    setHobbyArray(splitVale);
  };

  const postdata = (value) => {
    return {
      name: value,
    };
  };
  const OnsubmitHandle = (e) => {
    e.preventDefault();
    setValid(true);
    let ProfileId = singleProfile && singleProfile.user;

    if (IsOnline && Interest.name.isValid && !valid) {
      for (let i = 0; i < hobbyArray.length; i++) {
        if (hobbyArray[i]) {
          dispatch(postInterestHobbies(ProfileId, postdata(hobbyArray[i])));
          if (hobbyArray.length) {
            closeModalStateprop();
            setInterestHobbies({
              name: {
                value: "",
                isValid: false,
              }
            })
            setTimeout(() => {
              dispatch(getInterestHoobies(ProfileId));
            }, 300);
          }
        } else {
          setInterestHobbies({
            name: {
              value: "",
              isValid: false,
            }
          })
          closeModalStateprop();
        }
      }
    }
  };
  return (
    <Modal show={showprop}>
      <ModalHeader
        closeButton={true}
        onclose={closeModalStateprop}
        title="Interests"
      ></ModalHeader>
      <ModalBody>
        <React.Fragment>
          <form
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            onSubmit={OnsubmitHandle}
          // method="post"
          >
            <div className="formFieldwrap">
              <FormInput
                type="text"
                placeholder="Interests"
                label="Interests"
                name="Interests"
                maxLength="38"
                onChange={(e) => OnChangeHandle(e)}
                value={Interest.name.value}
              />
              <FormError
                show={!Interest.name.isValid && valid}
                error="Please enter your interest.  "
              />
            </div>

            <button className="button button-primary btn-sm" type="submit">
              Save
            </button>
            <button
              className="button btn-o-primary primary btn-sm"
              type="button"
              onClick={closeModalStateprop}
            >
              Cancel
            </button>
          </form>
        </React.Fragment>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
}

export default AddNewHobbies;

export function RemoveHobbies({
  showprop,
  closeModalStateprop,
  user,
  singleProfile,
  interest,
}) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [HobbieId, sethobbieId] = useState("");

  const dispatch = useDispatch();
  const ProfileId = singleProfile && singleProfile.user;
  const IsOnline = user && user._id;

  const onClickBtnDropDownRemove = (_id, isActive) => {
    sethobbieId(_id);
    setIsActive(isActive);
  };
  const removeAward = (id, isActive) => {
    let objId = { _id: id };
    if (IsOnline) {
      dispatch(DeleteInterestHobbies(ProfileId, objId));
      setTimeout(() => {
        dispatch(getInterestHoobies(ProfileId));
      }, 800);

      interest &&
        interest.data &&
        interest.data.length < 2 &&
        closeModalStateprop();
    }
    setIsActive(isActive);
  };

  return (
    <Modal show={showprop}>
      <ModalHeader
        closeButton={true}
        onclose={closeModalStateprop}
        title="Interests"
      ></ModalHeader>
      <ModalBody>
        <React.Fragment>
          <div className="AddNewHobbiesCustom">
            {interest &&
              interest.data &&
              interest.data.map((item) => {
                return (
                  <div className="formFieldwrap" key={item._id}>
                    <FormInput
                      type="text"
                      placeholder="Interests"
                      label="Interests"
                      name="award_date"
                      value={item.name}
                    />
                    <button
                      type="button"
                      className="button btn-o-primary primary"
                      onClick={() => onClickBtnDropDownRemove(item._id, true)}
                    >
                      Remove
                    </button>

                    {item._id === HobbieId && (
                      <div
                        ref={dropdownRef}
                        className={`popup removePopup ${isActive ? "active" : "inactive"
                          }`}
                      >
                        <p className="heading text-xxs">
                          You are about to remove this Hobbie.
                        </p>
                        <p className="sub-heading red text-xxs">Are you sure?</p>
                        <div className="removePopBtn">
                          <button
                            className="button btn-o-silver dgray btn-sm"
                            onClick={() => setIsActive(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="button button-red btn-sm"
                            onClick={() => removeAward(item._id, false)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </React.Fragment>
      </ModalBody>
      <ModalFooter>
        {/* <button className="button button-primary btn-xs" type="submit">
          More
        </button> */}
        <button
          className="button btn-o-primary primary btn-xs"
          type="button"
          onClick={closeModalStateprop}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}
