import React, { useEffect } from "react";
import { useState } from "react";
// import AppLink from "../../Common/AppLink";
import PPRightTopArt from "../../assets/images/img/PP-RightTopArt.svg";
import PPLeftBottomArt from "../../assets/images/img/PP-LeftBottomArt.svg";
import FormInput from "../../Common/Form/FormInput";
import ValidationFile from "../../Classes/ValidationFile";
import FormError from "../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../Common/DetectOutsideClick/useDetectOutsideClick";
import { useRef } from "react";
import {
  patchContact,
  postWorkAddress,
  postPrimaryaddress,
  patchWorkAddress,
  patchprimaryaddress,
  getContact,
  getprimaryAddress,
  getWorkAddress,
  deleteprimaryaddress,
  deleteWorkAaddress,
} from "../../store/actions/publicProfile";

const ProfileContact = () => {
  const dispatch = useDispatch();
  const [isPrimaryEmail, setPrimaryEmail] = useState(false);
  const [isPrimarycontact, setPrimarycontact] = useState(false);
  const [isPrimaryaddress, setPrimaryaddress] = useState(false);
  const [isSecondaryaddress, setSecondaryaddress] = useState(false);
  const [valid, setIsValid] = useState(false);
  const [primaryID, setPrimaryID] = useState("");
  const [workID, setWorkID] = useState("");
  // const [setEffect] = useState(false);
  let chnageValue = false;
  const [emailvalid, setEmailvalid] = useState(false);
  const [contactvalid, setContactValid] = useState(false);
  const [addressvalid, setAddressValid] = useState(false);
  const [workaddressvalid, setWorkAddressvalid] = useState(false);

  const dropdownRef = useRef(null);
  const [isActiveWork, setIsActivework] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  function closeModalState() {
    setEmailvalid(false);
    setIsActivework(false);
    setIsActiveprimary(false);
    setPrimaryEmail(false);
    setInputstatecontact({
      primaryEmail: {
        value:
          contactData && contactData.primary_email.email
            ? contactData.primary_email.email
            : "",
        isValid: contactData && contactData.primary_email.email ? true : false,
      },
      primaryEmailcheck: {
        visibility:
          contactData &&
          contactData.primary_email &&
          contactData.primary_email.visibility,
      },
      primaryContact: {
        value:
          contactData && contactData.primary_contact.contact
            ? contactData.primary_contact.contact
            : "",
        isValid:
          contactData && contactData.primary_contact.contact ? true : false,
      },
      primaryContactcheck: {
        visibility:
          contactData &&
          contactData.primary_contact &&
          contactData.primary_contact.visibility,
      },
    });
  }

  const closeModalStatecontact = () => {
    setContactValid(false);
    setIsActivework(false);
    setIsActiveprimary(false);
    setPrimarycontact(false);
    setInputstatecontact({
      primaryEmail: {
        value:
          contactData && contactData.primary_email.email
            ? contactData.primary_email.email
            : "",
        isValid: contactData && contactData.primary_email.email ? true : false,
      },
      primaryEmailcheck: {
        visibility:
          contactData &&
          contactData.primary_email &&
          contactData.primary_email.visibility,
      },
      primaryContact: {
        value:
          contactData && contactData.primary_contact.contact
            ? contactData.primary_contact.contact
            : "",
        isValid:
          contactData && contactData.primary_contact.contact ? true : false,
      },
      primaryContactcheck: {
        visibility:
          contactData &&
          contactData.primary_contact &&
          contactData.primary_contact.visibility,
      },
    });
  };
  const primaryClose = () => {
    setAddressValid(false);
    setIsActivework(false);
    setPrimaryaddress(false);
    setIsActiveprimary(false);
    if (primaryArray.length > 0) {
      setInputPrimaryAddress({
        primaryAddress: {
          _id: primaryArray[0]._id,
          value: primaryArray[0].address,
          isValid: primaryArray[0].address ? true : false,
        },
        primaryAddresscheck: {
          visibility: primaryArray[0].visibility,
        },
      });
    } else {
      setInputPrimaryAddress({
        primaryAddress: {
          _id: "",
          value: "",
          isValid: false,
        },
        primaryAddresscheck: {
          visibility: "Public",
        },
      });
    }
  };
  const workClose = () => {
    setWorkAddressvalid(false);
    setIsActivework(false);
    setIsActiveprimary(false);
    setSecondaryaddress(false);
    if (workArray.length > 0) {
      setSecondaryAddress({
        secodaryAddress: {
          _id: workArray[0]._id,
          value: workArray[0].address,
          isValid: workArray[0].address ? true : false,
        },
        secondaryAddresscheck: {
          visibility:
            workArray[0].visibility === "Public" ? "Public" : "Private",
        },
      });
    } else {
      setSecondaryAddress({
        secodaryAddress: {
          _id: "",
          value: "",
          isValid: false,
        },
        secondaryAddresscheck: {
          visibility: "Public",
        },
      });
    }
  };
  const { user, userId, contactData, contactDataSuccess, primaryAd, workad } =
    useSelector((state) => {
      return {
        user: state.user,
        userId: state.publicProfile.singleProfile.data.userInfo.user,
        contactData: state.publicProfile.contact.data,
        contactDataSuccess: state.publicProfile.contact.success,
        primaryAd: state.publicProfile.primaryAddress,
        workad: state.publicProfile.workAddress,
      };
    });

  const [isActiveprimary, setIsActiveprimary] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  const IsUser = userId === user._id;
  const primaryArray = primaryAd && primaryAd.data;
  const workArray = workad && workad.data;
  const Primaryvalue = () => {
    if (primaryArray.length > 0) {
      setPrimaryID(primaryArray[0]._id);
    }
    return primaryArray.length > 0 ? true : false;
  };
  const workvalue = () => {
    if (workArray.length > 0) {
      setWorkID(workArray[0]._id);
    }
    return workArray.length > 0 ? true : false;
  };

  const [inputStateContact, setInputstatecontact] = useState({
    primaryEmail: {
      value: "",

      isValid: false,
    },
    primaryEmailcheck: {
      visibility: "",
    },
    primaryContact: {
      value: "",
      isValid: false,
    },
    primaryContactcheck: {
      visibility: "",
    },
  });
  const [inputPrimaryAddress, setInputPrimaryAddress] = useState({
    primaryAddress: {
      _id: "",
      value: "",
      isValid: false,
    },
    primaryAddresscheck: {
      visibility: "",
    },
  });
  const [inputSecondaryAddress, setSecondaryAddress] = useState({
    secodaryAddress: {
      _id: "",
      value: "",
      isValid: false,
    },
    secondaryAddresscheck: {
      visibility: "",
    },
  });
  useEffect(() => {
    userId && dispatch(getContact(userId));
    userId && dispatch(getprimaryAddress(userId));
    userId && dispatch(getWorkAddress(userId));
  }, [dispatch, userId]);

  const onClickBtnDropDownRemove = (isActive) => {
    setIsActiveprimary(isActive);
  };
  const onClickBtnDropDownRemoveWork = (isActive) => {
    setIsActivework(isActive);
  };

  useEffect(() => {
    if (primaryArray.length > 0) {
      setInputPrimaryAddress({
        primaryAddress: {
          _id: primaryArray[0]._id,
          value: primaryArray[0].address,
          isValid: primaryArray[0].address ? true : false,
        },
        primaryAddresscheck: {
          visibility: primaryArray[0].visibility,
        },
      });
    }
  }, [primaryArray]);

  useEffect(() => {
    if (workArray.length > 0) {
      setSecondaryAddress({
        secodaryAddress: {
          _id: workArray[0]._id,
          value: workArray[0].address,
          isValid: workArray[0].address ? true : false,
        },
        secondaryAddresscheck: {
          visibility: workArray[0].visibility,
        },
      });
    }
  }, [workArray]);
  const postdata = {
    primary_email: {
      email: inputStateContact.primaryEmail.value,
      visibility: inputStateContact.primaryEmailcheck.visibility,
    },
    primary_contact: {
      contact: inputStateContact.primaryContact.value,
      visibility: inputStateContact.primaryContactcheck.visibility,
    },
    // primaryCheck: {},
  };
  // const postDataInfo = () => {
  //   return {
  //     primary_email: {
  //       email: inputStateContact.primaryEmail.value,
  //       visibility: inputStateContact.primaryEmailcheck.visibility,
  //     },
  //     primary_contact: {
  //       contact: inputStateContact.primaryContact.value,
  //       visibility: inputStateContact.primaryContactcheck.visibility,
  //     },
  //   };
  // };
  const postAddress = {
    primary_address: {
      _id: inputPrimaryAddress.primaryAddress._id,
      address: inputPrimaryAddress.primaryAddress.value,
      visibility: inputPrimaryAddress.primaryAddresscheck.visibility,
    },
    work_address: {
      _id: inputSecondaryAddress.secodaryAddress._id,
      address: inputSecondaryAddress.secodaryAddress.value,
      visibility: inputSecondaryAddress.secondaryAddresscheck.visibility,
    },
  };

  const removePrimaryaddress = (id, isActive) => {
    let _id = { _id: id };
    dispatch(deleteprimaryaddress(userId, _id));
    setTimeout(() => {
      dispatch(getprimaryAddress(userId));
    }, 800);
    setInputPrimaryAddress({
      primaryAddress: {
        _id: "",
        value: "",
        isValid: false,
      },
      primaryAddresscheck: {
        visibility: "Public",
      },
    });

    setIsActiveprimary(isActive);
  };

  const removeSecondaryaddress = (id, isActive) => {
    let _id = { _id: id };
    dispatch(deleteWorkAaddress(userId, _id));
    setTimeout(() => {
      dispatch(getWorkAddress(userId));
    }, 800);
    setSecondaryAddress({
      secodaryAddress: {
        _id: "",
        value: "",
        isValid: false,
      },
      secondaryAddresscheck: {
        visibility: "Public",
      },
    });

    setIsActivework(isActive);
  };
  const InputHandle = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trim();
    setIsValid(false);
    let data = {
      ...inputStateContact,
      [inputName]: {
        value: inputValue,
        isValid: varificationConfirm(inputValue, inputName),
      },
    };
    setInputstatecontact(data);
    // setInputStateAddress(data);
  };
  const InputHandleAddress = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trim();
    setIsValid(false);
    let data = {
      ...inputPrimaryAddress,
      [inputName]: {
        _id: Primaryvalue() ? primaryID : "",
        value: inputValue,
        isValid: varificationConfirm(inputValue, inputName),
      },
    };
    setInputPrimaryAddress(data);
  };

  const InputHandlesecondaryAddress = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trim();
    setIsValid(false);
    let data = {
      ...inputSecondaryAddress,
      [inputName]: {
        _id: workvalue() ? workID : "",
        value: inputValue,
        isValid: varificationConfirm(inputValue, inputName),
      },
    };
    setSecondaryAddress(data);
  };

  const InputHandleCheck = (e, type) => {
    let inputName = e.target.name;
    // let visible = e.target.checked;
    let inputValue = e.target.value;
    setIsValid(false);
    let dataa = {
      ...inputStateContact,
      [inputName]: {
        visibility: inputValue,
      },
    };
    setInputstatecontact(dataa);
    onSubmitData(type, dataa);
  };

  const InputPrimaryCheck = (e, type) => {
    // let inputName = e.target.name;
    // let visible = e.target.checked;
    let inputValue = e.target.value;
    setIsValid(false);
    let dataa = {
      ...inputPrimaryAddress,
      primaryAddresscheck: {
        visibility: inputValue,
      },
    };
    setInputPrimaryAddress(dataa);
    onSubmitData(type, dataa);
  };
  const InputSecondaryCheck = (e, type) => {
    let inputName = e.target.name;
    // let visible = e.target.checked;
    let inputValue = e.target.value;
    setIsValid(false);
    let dataa = {
      ...inputSecondaryAddress,
      [inputName]: {
        visibility: inputValue,
      },
    };
    setSecondaryAddress(dataa);
    onSubmitData(type, dataa);
  };
  const varificationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "primaryEmail": {
        return ValidationFile.validEmail(inputValue);
      }
      case "primaryContact": {
        return ValidationFile.validPhoneNumber(inputValue);
      }
      case "primaryAddress": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "secodaryAddress": {
        return ValidationFile.validEmpty(inputValue);
      }
      default:
        return false;
    }
  };

  const desContactData = (data) => {
    return {
      primary_email: {
        email: data.primaryEmail.value,
        visibility: data.primaryEmailcheck.visibility,
      },
      primary_contact: {
        contact: data.primaryContact.value,
        visibility: data.primaryContactcheck.visibility,
      },
    };
  };

  const descPrimaryAddress = (data) => {
    return {
      _id: data.primaryAddress._id,
      address: data.primaryAddress.value,
      visibility: data.primaryAddresscheck.visibility,
    };
  };
  const descWorkAddress = (data) => {
    return {
      _id: data.secodaryAddress._id,
      address: data.secodaryAddress.value,
      visibility: data.secondaryAddresscheck.visibility,
    };
  };
  const onSubmitData = (type, dataa) => {
    switch (type) {
      case "primaryEmail": {
        setEmailvalid(true);
        if (inputStateContact.primaryEmail.isValid && !valid) {
          dispatch(patchContact(userId, postdata));
          setPrimaryEmail(false);
          closeModalState();
          // setTimeout(() => {
          //   dispatch(getContact(userId));
          // }, 800);
        }

        break;
      }
      case "primaryEmailcheck": {
        // setEffect(true);
        // if (inputStateContact.primaryEmail.isValid) {
        dispatch(patchContact(userId, desContactData(dataa)));

        setTimeout(() => {
          dispatch(getContact(userId));
        }, 2500);
        // }
        break;
      }
      case "primaryContact": {
        setContactValid(true);
        if (inputStateContact.primaryContact.isValid) {
          dispatch(patchContact(userId, postdata));
          setPrimarycontact(false);
          closeModalStatecontact();
          setTimeout(() => {
            dispatch(getContact(userId));
          }, 800);
        }

        break;
      }
      case "primaryContactcheck": {
        // setEffect(true);
        dispatch(patchContact(userId, desContactData(dataa)));
        break;
      }
      case "primaryAddress": {
        setAddressValid(true);
        if (inputPrimaryAddress.primaryAddress.isValid && !valid) {
          dispatch(postPrimaryaddress(userId, postAddress.primary_address));
          setTimeout(() => {
            dispatch(getprimaryAddress(userId));
          }, 800);
          primaryClose();
          setPrimaryaddress(false);
        }

        break;
      }
      case "primaryAddressPatch": {
        setAddressValid(true);
        if (inputPrimaryAddress.primaryAddress.isValid && !valid) {
          dispatch(patchprimaryaddress(userId, postAddress.primary_address));
          setTimeout(() => {
            dispatch(getprimaryAddress(userId));
          }, 800);
          primaryClose();
          setPrimaryaddress(false);
        }

        break;
      }

      case "primaryAddresscheck": {
        // setEffect(true);
        dispatch(patchprimaryaddress(userId, descPrimaryAddress(dataa)));
        setTimeout(() => {
          dispatch(getprimaryAddress(userId));
        }, 1500);
        break;
      }
      case "secodaryAddresspost": {
        setWorkAddressvalid(true);
        if (inputSecondaryAddress.secodaryAddress.isValid && !valid) {
          dispatch(postWorkAddress(userId, postAddress.work_address));
          setSecondaryaddress(false);

          setTimeout(() => {
            dispatch(getWorkAddress(userId));
          }, 800);
          setSecondaryaddress(false);
          workClose();
        }
        break;
      }
      case "workAddressPatch": {
        setWorkAddressvalid(true);
        if (inputSecondaryAddress.secodaryAddress.isValid && !valid) {
          dispatch(patchWorkAddress(userId, postAddress.work_address));
          setTimeout(() => {
            dispatch(getWorkAddress(userId));
          }, 800);
          setSecondaryaddress(false);
          workClose();
        }

        break;
      }
      case "secondaryAddresscheck": {
        // setEffect(true);
        dispatch(patchWorkAddress(userId, descWorkAddress(dataa)));
        setTimeout(() => {
          dispatch(getWorkAddress(userId));
        }, 1500);
        break;
      }
      default:
        return;
    }
  };

  useEffect(() => {
    if (contactData && !chnageValue) {
      setInputstatecontact({
        primaryEmail: {
          value:
            contactData && contactData.primary_email.email
              ? contactData.primary_email.email
              : "",
          isValid:
            contactData && contactData.primary_email.email ? true : false,
        },
        primaryEmailcheck: {
          visibility:
            contactData &&
            contactData.primary_email &&
            contactData.primary_email.visibility,
        },
        primaryContact: {
          value:
            contactData && contactData.primary_contact.contact
              ? contactData.primary_contact.contact
              : "",
          isValid:
            contactData && contactData.primary_contact.contact ? true : false,
        },
        primaryContactcheck: {
          visibility:
            contactData &&
            contactData.primary_contact &&
            contactData.primary_contact.visibility,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactData]);

  return (
    <div className="PublicProfileContactCst">
      <div className="PublicProfileContactHead">
        <p className="text-sm">Get in Touch </p>
      </div>

      {(inputStateContact.primaryEmailcheck.visibility === "Public" &&
        inputStateContact.primaryEmail.value &&
        !IsUser) ||
        IsUser ? (
        <div className="ContactPEmail">
          <p className="text-xxs w-600 mb-5">Official Email</p>

          {IsUser ? (
            isPrimaryEmail ? (
              <div className="formFieldwrap">
                <FormInput
                  placeholder="Enter your official email"
                  // onChange={handleChange}
                  name="primaryEmail"
                  autoFocus={true}
                  onChange={(e) => InputHandle(e)}
                  defaultValue={inputStateContact.primaryEmail.value}
                />
                <FormError
                  show={!inputStateContact.primaryEmail.isValid && emailvalid}
                  error={
                    inputStateContact.primaryEmail.value === "" ||
                      inputStateContact.primaryEmail.value === null
                      ? "Official email is required."
                      : "Invalid email."
                  }
                />
              </div>
            ) : (
              <a
                className="text-xs"
                href={`mailto:${inputStateContact.primaryEmail.value}`}
              >
                {inputStateContact.primaryEmail.value}
              </a>
            )
          ) : (
            !IsUser &&
            inputStateContact.primaryEmailcheck.visibility === "Public" &&
            inputStateContact.primaryEmail.value && (
              <a
                className="text-xs"
                href={`mailto:${inputStateContact.primaryEmail.value}`}
              >
                {inputStateContact.primaryEmail.value}
              </a>
            )
          )}
          <div className="ContactPEmail-ActionBtn">
            {IsUser &&
              (!isPrimaryEmail ? (
                <button
                  className="button btn-o-primary primary btn-xs mt-8"
                  type="button"
                  onClick={() => setPrimaryEmail(true)}
                >
                  {inputStateContact.primaryEmail.value ? (
                    <i className="ed-icon icon-edit i-xxs primary"></i>
                  ) : (
                    <i className="ed-icon icon-plus-add i-xxs primary"></i>
                  )}
                  {inputStateContact.primaryEmail.value ? "Edit" : "Add"}
                </button>
              ) : (
                <React.Fragment>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => onSubmitData("primaryEmail")}
                  >
                    Save
                  </button>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => closeModalState()}
                  >
                    Cancel
                  </button>
                </React.Fragment>
              ))}
          </div>
          <div className="input-custom-type mt-15">
            {IsUser &&
              contactData &&
              contactData.primary_email &&
              contactData.primary_email.email &&
              contactDataSuccess && (
                <React.Fragment>
                  <p className="text-2xs w-600">Mark Visibility as</p>
                  <div className="cstm-switch mt-8">
                    {inputStateContact.primaryEmailcheck.visibility ===
                      "Public" ? (
                      <>
                        <input
                          id="switch-primaryEmailcheck"
                          type="checkbox"
                          onClick={(e) =>
                            InputHandleCheck(e, "primaryEmailcheck")
                          }
                          name="primaryEmailcheck"
                          value="Private"
                        />
                        <label htmlFor="switch-primaryEmailcheck">
                          <i></i>
                        </label>
                      </>
                    ) : (
                      inputStateContact.primaryEmailcheck.visibility ===
                      "Private" && (
                        <>
                          <input
                            id="switch-primaryEmailcheck"
                            type="checkbox"
                            onClick={(e) =>
                              InputHandleCheck(e, "primaryEmailcheck")
                            }
                            name="primaryEmailcheck"
                            value="Public"
                            defaultChecked
                          />
                          <label htmlFor="switch-primaryEmailcheck">
                            <i></i>
                          </label>
                        </>
                      )
                    )}
                  </div>
                </React.Fragment>
              )}
          </div>
        </div>
      ) : (
        ""
      )}

      {(inputStateContact.primaryContactcheck.visibility === "Public" &&
        inputStateContact.primaryContact.value &&
        !IsUser) ||
        IsUser ? (
        <div className="ContactPNumber">
          <p className="text-xxs w-600 mb-5">Official Contact</p>

          {IsUser ? (
            isPrimarycontact ? (
              <div className="formFieldwrap">
                <FormInput
                  placeholder="Enter your official contact"
                  // onChange={handleChange}
                  name="primaryContact"
                  autoFocus={true}
                  onChange={(e) => InputHandle(e)}
                  type="number"
                  maxlength="10"
                  defaultValue={inputStateContact.primaryContact.value}
                />
                <FormError
                  show={
                    (!inputStateContact.primaryContact.isValid ||
                      inputStateContact.primaryContact.isValid === undefined) &&
                    contactvalid
                  }
                  error={
                    (inputStateContact.primaryContact.value.length < 8 ||
                      inputStateContact.primaryContact.value.length > 10) &&
                      inputStateContact.primaryContact.value !== ""
                      ? "Invalid contact."
                      : "Official contact is required."
                  }
                />
              </div>
            ) : (
              <a
                className="text-xs mt-8"
                href={`tel:${inputStateContact.primaryContact.value}`}
              >
                {inputStateContact.primaryContact.value}
              </a>
            )
          ) : (
            !IsUser &&
            inputStateContact.primaryContactcheck.visibility === "Public" &&
            inputStateContact.primaryContact.value && (
              <a
                className="text-xs mt-8"
                href={`tel:${inputStateContact.primaryContact.value}`}
              >
                {inputStateContact.primaryContact.value}
              </a>
            )
          )}
          <div className="ContactPEmail-ActionBtn">
            {IsUser &&
              (!isPrimarycontact ? (
                <button
                  className="button btn-o-primary primary btn-xs mt-8"
                  type="button"
                  onClick={() => setPrimarycontact(true)}
                >
                  {inputStateContact.primaryContact.value ? (
                    <i className="ed-icon icon-edit i-xxs primary"></i>
                  ) : (
                    <i className="ed-icon icon-plus-add i-xxs primary"></i>
                  )}
                  {inputStateContact.primaryContact.value ? "Edit" : "Add"}
                </button>
              ) : (
                <React.Fragment>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => onSubmitData("primaryContact")}
                  >
                    Save
                  </button>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => closeModalStatecontact()}
                  >
                    Cancel
                  </button>
                </React.Fragment>
              ))}
          </div>
          <div className="input-custom-type mt-15">
            {IsUser &&
              contactData &&
              contactData.primary_contact &&
              contactData.primary_contact.contact && (
                <React.Fragment>
                  <p className="text-2xs w-600">Mark Visibility as</p>
                  <div className="cstm-switch mt-8">
                    {inputStateContact.primaryContactcheck.visibility ===
                      "Public" ? (
                      <>
                        <input
                          id="switch-primaryContactcheck"
                          type="checkbox"
                          onClick={(e) =>
                            InputHandleCheck(e, "primaryContactcheck")
                          }
                          name="primaryContactcheck"
                          value="Private"
                        />
                        <label htmlFor="switch-primaryContactcheck">
                          <i></i>
                        </label>
                      </>
                    ) : (
                      inputStateContact.primaryContactcheck.visibility ===
                      "Private" && (
                        <>
                          <input
                            id="switch-primaryContactcheck"
                            type="checkbox"
                            onClick={(e) =>
                              InputHandleCheck(e, "primaryContactcheck")
                            }
                            name="primaryContactcheck"
                            value="Public"
                            defaultChecked
                          />
                          <label htmlFor="switch-primaryContactcheck">
                            <i></i>
                          </label>
                        </>
                      )
                    )}
                  </div>
                </React.Fragment>
              )}
          </div>
        </div>
      ) : (
        ""
      )}

      {(inputPrimaryAddress.primaryAddresscheck.visibility === "Public" &&
        inputPrimaryAddress.primaryAddress.value &&
        !IsUser) ||
        IsUser ? (
        <div className="ContactPAddress">
          <p className="text-xxs w-600 mb-5">Address</p>

          {IsUser ? (
            isPrimaryaddress ? (
              <div className="formFieldwrap">
                <FormInput
                  placeholder="Enter your address"
                  // onChange={handleChange}
                  name="primaryAddress"
                  autoFocus={true}
                  onChange={(e) => InputHandleAddress(e)}
                  defaultValue={inputPrimaryAddress.primaryAddress.value}
                />
                <FormError
                  show={
                    (!inputPrimaryAddress.primaryAddress.isValid ||
                      inputPrimaryAddress.primaryAddress.isValid ===
                      undefined) &&
                    addressvalid
                  }
                  error="Address is required."
                />
              </div>
            ) : inputPrimaryAddress.primaryAddress.value ? (
              <p className="text-xs">
                {inputPrimaryAddress.primaryAddress.value}
              </p>
            ) : (
              ""
            )
          ) : (
            !IsUser &&
            inputPrimaryAddress.primaryAddresscheck.visibility === "Public" &&
            inputPrimaryAddress.primaryAddress.value && (
              <p className="text-xs">
                {inputPrimaryAddress.primaryAddress.value}
              </p>
            )
          )}
          <div className="ContactPEmail-ActionBtn">
            {IsUser &&
              (!isPrimaryaddress ? (
                <React.Fragment>
                  {primaryArray.length > 0 ? (
                    <button
                      className="button btn-o-primary primary btn-xs mt-8"
                      type="button"
                      onClick={() => setPrimaryaddress(true)}
                    >
                      <i className="ed-icon icon-edit i-xxs primary"></i>
                      Edit
                    </button>
                  ) : (
                    <button
                      className="button btn-o-primary primary btn-xs mt-8"
                      type="button"
                      onClick={() => setPrimaryaddress(true)}
                    >
                      <i className="ed-icon icon-plus-add i-xxs primary"></i>
                      Add
                    </button>
                  )}
                  {primaryArray.length > 0 ? (
                    <button
                      className="button btn-o-primary primary btn-xs mt-8"
                      type="button"
                      onClick={() => onClickBtnDropDownRemove(true)}
                    >
                      <i className="ed-icon icon-delete i-xs primary"></i>
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ) : primaryArray.length > 0 ? (
                <div>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => onSubmitData("primaryAddressPatch")}
                  >
                    Save
                  </button>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => primaryClose()}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => onSubmitData("primaryAddress")}
                  >
                    Save
                  </button>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => primaryClose()}
                  >
                    Cancel
                  </button>
                </div>
              ))}

            {primaryArray && primaryArray.length > 0 && (
              <div
                ref={dropdownRef}
                className={`popup removePopup ${isActiveprimary ? "active" : "inactive"
                  }`}
              >
                <p className="heading text-xxs">
                  You are about to remove this Address.
                </p>
                <p className="sub-heading red text-xxs">Are you sure?</p>
                <div className="removePopBtn">
                  <button
                    className="button btn-o-silver dgray btn-sm"
                    onClick={() => primaryClose()}
                  >
                    Cancel
                  </button>
                  <button
                    className="button button-red btn-sm"
                    onClick={() =>
                      removePrimaryaddress(primaryArray[0]._id, false)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="input-custom-type mt-15">
            {IsUser && primaryArray.length > 0 && (
              <React.Fragment>
                <p className="text-2xs w-600">Mark Visibility as</p>
                <div className="cstm-switch mt-8">
                  {inputPrimaryAddress.primaryAddresscheck.visibility ===
                    "Public" ||
                    inputPrimaryAddress.primaryAddresscheck.visibility === "" ||
                    inputPrimaryAddress.primaryAddresscheck.visibility ===
                    "on" ? (
                    <>
                      <input
                        id="switch-primaryAddresscheck"
                        type="checkbox"
                        onClick={(e) =>
                          InputPrimaryCheck(e, "primaryAddresscheck")
                        }
                        name="primaryAddresscheck"
                        value="Private"
                      />
                      <label htmlFor="switch-primaryAddresscheck">
                        <i></i>
                      </label>
                    </>
                  ) : (
                    inputPrimaryAddress.primaryAddresscheck.visibility ===
                    "Private" && (
                      <>
                        <input
                          id="switch-primaryAddresscheck"
                          type="checkbox"
                          onClick={(e) =>
                            InputPrimaryCheck(e, "primaryAddresscheck")
                          }
                          name="primaryAddresscheck"
                          value="Public"
                          defaultChecked
                        />
                        <label htmlFor="switch-primaryAddresscheck">
                          <i></i>
                        </label>
                      </>
                    )
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      {(inputSecondaryAddress.secondaryAddresscheck.visibility === "Public" &&
        inputSecondaryAddress.secodaryAddress.value &&
        !IsUser) ||
        IsUser ? (
        <div className="ContactSAddress">
          <p className="text-xxs w-600 mb-5">Office Address</p>

          {IsUser ? (
            isSecondaryaddress ? (
              <div className="formFieldwrap">
                <FormInput
                  placeholder="Enter your office address"
                  // onChange={handleChange}
                  name="secodaryAddress"
                  onChange={(e) => InputHandlesecondaryAddress(e)}
                  autoFocus={true}
                  defaultValue={inputSecondaryAddress.secodaryAddress.value}
                />
                <FormError
                  show={
                    (!inputSecondaryAddress.secodaryAddress.isValid ||
                      inputSecondaryAddress.secodaryAddress.isValid ===
                      undefined) &&
                    workaddressvalid
                  }
                  error="Office address is required."
                />
              </div>
            ) : inputSecondaryAddress.secodaryAddress.value ? (
              <p className="text-xs">
                {inputSecondaryAddress.secodaryAddress.value}
              </p>
            ) : (
              <p className="text-xs">
                {/* 45/78, Prabhat Tower, 4th Floor Nagpal Chowk, Sector - 16B Dwarka,
              New Delhi - 110078 India */}
              </p>
            )
          ) : (
            !IsUser &&
            inputSecondaryAddress.secondaryAddresscheck.visibility ===
            "Public" &&
            inputSecondaryAddress.secodaryAddress.value && (
              <p className="text-xs">
                {inputSecondaryAddress.secodaryAddress.value}
              </p>
            )
          )}
          <div className="ContactPEmail-ActionBtn">
            {IsUser &&
              (!isSecondaryaddress ? (
                <React.Fragment>
                  {workArray.length > 0 ? (
                    <button
                      className="button btn-o-primary primary btn-xs mt-8"
                      type="button"
                      onClick={() => setSecondaryaddress(true)}
                    >
                      <i className="ed-icon icon-edit i-xxs primary"></i>
                      Edit
                    </button>
                  ) : (
                    <button
                      className="button btn-o-primary primary btn-xs mt-8"
                      type="button"
                      onClick={() => setSecondaryaddress(true)}
                    >
                      <i className="ed-icon icon-plus-add i-xxs primary"></i>
                      Add
                    </button>
                  )}
                  {workArray.length > 0 ? (
                    <button
                      className="button btn-o-primary primary btn-xs mt-8"
                      type="button"
                      onClick={() => onClickBtnDropDownRemoveWork(true)}
                    >
                      <i className="ed-icon icon-delete i-xxs primary"></i>
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ) : workArray.length > 0 ? (
                <React.Fragment>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => onSubmitData("workAddressPatch")}
                  >
                    Save
                  </button>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => workClose()}
                  >
                    Cancel
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => onSubmitData("secodaryAddresspost")}
                  >
                    Save
                  </button>
                  <button
                    className="button btn-o-primary primary btn-xs"
                    type="button"
                    onClick={() => workClose()}
                  >
                    Cancel
                  </button>
                </React.Fragment>
              ))}

            {workArray && workArray.length > 0 && (
              <div
                ref={dropdownRef}
                className={`popup removePopup ${isActiveWork ? "active" : "inactive"
                  }`}
              >
                <p className="heading text-xxs">
                  You are about to remove this offfice address.
                </p>
                <p className="sub-heading red text-xxs">Are you sure?</p>
                <div className="removePopBtn">
                  <button
                    className="button btn-o-silver dgray btn-sm"
                    onClick={() => workClose()}
                  >
                    Cancel
                  </button>
                  <button
                    className="button button-red btn-sm"
                    onClick={() =>
                      removeSecondaryaddress(workArray[0]._id, false)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="input-custom-type mt-15">
            {IsUser && workArray.length > 0 && (
              <React.Fragment>
                <p className="text-2xs w-600">Mark Visibility as</p>
                <div className="cstm-switch mt-8">
                  {inputSecondaryAddress.secondaryAddresscheck.visibility ===
                    "Public" ||
                    inputSecondaryAddress.secondaryAddresscheck.visibility ===
                    "" ||
                    inputSecondaryAddress.secondaryAddresscheck.visibility ===
                    "on" ? (
                    <>
                      <input
                        id="switch-1"
                        type="checkbox"
                        onClick={(e) =>
                          InputSecondaryCheck(e, "secondaryAddresscheck")
                        }
                        name="secondaryAddresscheck"
                        value="Private"
                      />
                      <label htmlFor="switch-1">
                        <i></i>
                      </label>
                    </>
                  ) : (
                    inputSecondaryAddress.secondaryAddresscheck.visibility ===
                    "Private" && (
                      <>
                        <input
                          id="switch-1"
                          type="checkbox"
                          onClick={(e) =>
                            InputSecondaryCheck(e, "secondaryAddresscheck")
                          }
                          name="secondaryAddresscheck"
                          value="Public"
                          defaultChecked
                        />
                        <label htmlFor="switch-1">
                          <i></i>
                        </label>
                      </>
                    )
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="PP-RightTopArt">
        <img src={PPRightTopArt} alt="Artwork" />
      </div>
      <div className="PP-LeftBottomArt">
        <img src={PPLeftBottomArt} alt="Artwork" />
      </div>
    </div>
  );
};

export default ProfileContact;
