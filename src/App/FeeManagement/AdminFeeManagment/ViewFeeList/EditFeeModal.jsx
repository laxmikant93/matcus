/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, forwardRef } from "react";
import FormInput from "../../../../Common/Form/FormInput";
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import FormError from "../../../../Common/Form/FormError";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  EditStudentFeeStructure,
  resetEditModalData,
} from "../../../../store/actions/feeManagement";
function EditFeeModal(
  { modalStateEdit, closeModalStateEdit, editData, courseYear, coursename },
  ref
) {
  const [discountInput, setDiscountInput] = useState(false);
  const [scholarshipInput, setScholarshipInput] = useState(false);
  const [feeStructure, setFeeStructure] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [inputData, setInputData] = useState("");
  const dispatch = useDispatch();
  const { success, loading } = useSelector((state) => {
    return {
      success: state.feeManagement.editStudentFee.success,
      loading: state.feeManagement.editStudentFee.loading,
    };
  });
  if (success && !loading) {
    closeModalStateEdit();
    dispatch(resetEditModalData());
  }
  useEffect(() => {
    setInputData(editData);
    setFeeStructure(editData && editData.feestructure);
    isStudentFeeStructureValid();
    return () => {
      setFeeStructure([]);
      setInputData("");
    };
  }, [editData]);
  const isStudentFeeStructureValid = () => {
    for (let key = 0; key < feeStructure.length; key++) {
      const element = feeStructure[key];
      if (ValidationUtils.isEmpty(element.type)) {
        feeStructure[key]["typeIsValid"] = false;
      } else {
        feeStructure[key]["typeIsValid"] = true;
      }
      if (ValidationUtils.isEmpty(element.amount)) {
        feeStructure[key]["amountIsValid"] = false;
      } else {
        feeStructure[key]["typeIsValid"] = true;
      }
    }
  };
  const AddMoreFeeStructure = () => {
    setIsValid(false);
    setFeeStructure([
      ...feeStructure,
      { type: "", amount: "", entireYear: true },
    ]);
  };
  const handleCHeckTypeValid = () => {
    let Arr = [];
    let isValid = true;
    for (let i = 0; i < feeStructure.length; i++) {
      let ammount = parseInt(feeStructure[i].amount);
      let type = feeStructure[i].type;
      Arr.push({
        ...feeStructure[i],
        amount: ammount,
        typeIsValid: !ValidationUtils.isEmpty(type.trim()),
        amountIsValid: !ValidationUtils.isEmpty(ammount),
      });
      if (ValidationUtils.isEmpty(ammount)) {
        isValid = false;
      }
      if (ValidationUtils.isEmpty(type)) {
        isValid = false;
      }
    }
    setFeeStructure(Arr);
    return isValid;
  };
  const ReturnSubmitData = () => {
    let amount = 0;
    feeStructure.forEach((elm) => {
      amount = amount + parseFloat(elm.amount);
    });
    let data = {
      feestructure: inputData.feestructure ? inputData.feestructure : [],
      feeStudentScholorship: inputData.feeStudentScholorship
        ? inputData.feeStudentScholorship
        : 0,
      feeStudentDiscount: inputData.feeStudentDiscount
        ? inputData.feeStudentDiscount
        : 0,
      SaveRepeat: inputData.SaveRepeat ? inputData.SaveRepeat : false,
      totalAmount: amount ? parseInt(amount) : 0,
      studentId: inputData.studentId ? inputData.studentId : "",
      feeYear: inputData.feeYear ? inputData.feeYear : "",
    };
    data.feestructure = feeStructure;
    return data;
  };
  const handleOnChange = (e, key, name) => {
    setIsValid(false);
    let inputValue = e.target.value;
    if (name === "amount") inputValue = parseInt(e.target.value);
    feeStructure[key][name] = inputValue;
    feeStructure[key][name + "IsValid"] = !ValidationUtils.isEmpty(inputValue);
    setFeeStructure([...feeStructure]);
    isStudentFeeStructureValid();
  };
  const handleDiscountAndScholarship = (e) => {
    let inputName = e.target.name;
    let inputValue = parseInt(e.target.value);
    switch (inputName) {
      case "SaveRepeat": {
        setInputData({ ...inputData, SaveRepeat: e.target.checked });
        break;
      }
      case "feeStudentScholorship": {
        inputData[inputName] = inputValue;
        inputData[inputName + "IsValid"] =
          ScholarshipValidation(inputValue).isValid;
        inputData[inputName + "Error"] =
          ScholarshipValidation(inputValue).message;
        setInputData({ ...inputData });
        break;
      }
      case "feeStudentDiscount": {
        inputData[inputName] = inputValue;
        inputData[inputName + "IsValid"] =
          discountValidation(inputValue).isValid;
        inputData[inputName + "Error"] = discountValidation(inputValue).message;
        setInputData({ ...inputData });
        break;
      }
      default:
    }
  };
  const ScholarshipValidation = (value) => {
    let isValid = true;
    let Discount = parseFloat(inputData.feeStudentDiscount)
      ? parseFloat(inputData.feeStudentDiscount)
      : 0;
    if (ValidationUtils.isEmpty(value) && value !== 0) {
      isValid = false;
    } else if (parseFloat(value) + Discount > inputData.totalAmount) {
      isValid = false;
      return {
        isValid: isValid,
        message: "your scholarship is more than total amount",
      };
    }
    return { isValid: isValid, message: "this field not be empty" };
  };
  const discountValidation = (value) => {
    let isValid = true;
    let Scholarship = parseFloat(inputData.feeStudentScholorship)
      ? parseFloat(inputData.feeStudentScholorship)
      : 0;
    if (ValidationUtils.isEmpty(value) && value !== 0) {
      isValid = false;
    } else if (parseFloat(value) + Scholarship > inputData.totalAmount) {
      isValid = false;
      return {
        isValid: isValid,
        message: "your discount is more than total amount",
      };
    }
    return { isValid: isValid, message: "this field not be empty" };
  };
  const removeFeeStructure = (index) => {
    let fil = feeStructure.filter((item, idx) => {
      return idx !== index;
    });
    setFeeStructure(fil);
  };
  const saveStudentFeeStructure = () => {
    setIsValid(true);
    if (handleCHeckTypeValid() && handleCheckDeductionIsValid()) {
      dispatch(EditStudentFeeStructure(ReturnSubmitData(), editData._id));
    }
  };
  const handleCheckDeductionIsValid = () => {
    setInputData({
      ...inputData,
      feeStudentScholorshipIsValid: ScholarshipValidation(
        inputData.feeStudentScholorship
      ).isValid,
      feeStudentScholorshipError: ScholarshipValidation(
        inputData.feeStudentScholorship
      ).message,
      feeStudentDiscountIsValid: discountValidation(
        inputData.feeStudentDiscount
      ).isValid,
      feeStudentDiscountError: discountValidation(inputData.feeStudentDiscount)
        .message,
    });
    return ScholarshipValidation(inputData.feeStudentScholorship).isValid;
  };

  const calculateAmount = (type) => {
    let totalAmount = 0;
    feeStructure.length > 0 &&
      feeStructure.map((data) => {
        return (totalAmount =
          totalAmount + parseFloat(data.amount ? data.amount : 0));
      });
    let minus = 0
    if (type === "scholarship") {
      minus = (inputData.feeStudentScholorship && scholarshipInput
        ? inputData.feeStudentScholorship
        : 0);
    } else if (type === "Discount") {
      minus = (inputData.feeStudentDiscount && discountInput
        ? inputData.feeStudentDiscount
        : 0);
    } else {
      minus = (inputData.feeStudentScholorship && scholarshipInput
        ? inputData.feeStudentScholorship
        : 0) + (inputData.feeStudentDiscount && discountInput
          ? inputData.feeStudentDiscount
          : 0);
    }
    let amount = totalAmount - minus;
    if (amount < 0) amount = totalAmount;
    return amount;
  };
  useEffect(() => {
    if (editData.feeStudentDiscount > 0) {
      setDiscountInput(true)
    }
    if (editData.feeStudentScholorship > 0) {
      setScholarshipInput(true);
    }
    // editData.feeStudentDiscount ?

  }, [editData])

  const scholarshipDiscountState = (type) => {
    switch (type) {
      case "Discount": {
        if (discountInput) {
          setInputData({
            ...inputData,
            feeStudentDiscount: 0,
            feeStudentDiscountIsValid: true,
          });
        } else {
          setInputData({
            ...inputData,
            feeStudentDiscount: editData.feeStudentDiscount,
            feeStudentDiscountIsValid: true,
          });
        }
        setDiscountInput(!discountInput);
        break;
      }
      case "Scholarship": {
        if (scholarshipInput) {
          setInputData({
            ...inputData,
            feeStudentScholorship: 0,
            feeStudentScholorshipIsValid: true,
          });
        } else {
          setInputData({
            ...inputData,
            feeStudentScholorship: editData.feeStudentScholorship,
            feeStudentScholorshipIsValid: true,
          });
        }
        setScholarshipInput(!scholarshipInput);
        break;
      }
      default:
    }
  };

  return (
    <div className={`modal modalShowing-${modalStateEdit}`}>
      <div className="modalwrapper">
        <span
          className="closeModal text-xxs dgray"
          onClick={() => closeModalStateEdit()}
        >
          X Close
        </span>
        <div className="modalHead">
          <div>
            <h3 className="text-sm w-300">Edit Fee Details</h3>
            <h5>
              {coursename},{courseYear}
            </h5>
          </div>
          <div>
            <div className="userDetails mt-20">
              <div className="profileCircle">
                <a
                  href={`/profile/${editData.username}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={editData.profile_picture ? editData.profile_picture : DummyProfile} alt="Akansha Negi" />
                </a>
              </div>
              <div className="profileDetails">
                <div className="profile-name">
                  <a
                    href={`/profile/${editData.username}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {editData.fullname}
                  </a>
                </div>
                <div className="admission-no">
                  <span>ADM No. {editData.admission_no}</span>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="modalbody">
            <h3>Fee Structure</h3>
            <div className="gridListTable">
              <ul className="gridHeader">
                <li className="col col-7">Fee Type</li>
                <li className="col col-4">Amount (₹)</li>
                <li className="col col-1">&nbsp;</li>
              </ul>
              <div className="gridBody no-fixed formTable">
                {feeStructure.length > 0 &&
                  feeStructure.map((item, index) => {
                    return (
                      <div className="gridRow">
                        <ul className="topInfo" key={index}>
                          <li className="col col-7" data-head="Fee Type">
                            <div className="formFieldwrap">
                              <FormInput
                                className=""
                                type="text"
                                placeholder="Fee title"
                                onChange={(e) =>
                                  handleOnChange(e, index, "type")
                                }
                                value={item.type}
                              />
                              <FormError
                                show={
                                  !feeStructure[index]["typeIsValid"] && !feeStructure[index]["type"] && isValid
                                }
                                error="Title cant be empty"
                              />
                            </div>
                          </li>
                          <li className="col col-4" data-head="Amount">
                            <div className="formFieldwrap">
                              <FormInput
                                className=""
                                type="number"
                                min="0"
                                placeholder="Fee amount"
                                onChange={(e) =>
                                  handleOnChange(e, index, "amount")
                                }
                                value={item.amount}
                              />
                              <FormError
                                show={
                                  !feeStructure[index]["amountIsValid"] && !feeStructure[index]["amount"] &&
                                  isValid
                                }
                                error="Amount can't be empty"
                              />
                            </div>
                          </li>
                          <li className="col col-1 actionCols">
                            <div className="actionBtn">
                              <button
                                className="btn-square delete"
                                title="Delete"
                                onClick={() => removeFeeStructure(index)}
                              >
                                <span className="cssIcon">
                                  <i className="ed-trash"></i>
                                </span>
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                <div className="mt-5">
                  <button
                    className="button btn-sm btn-o-primary primary"
                    onClick={AddMoreFeeStructure}
                  >
                    + Add More
                  </button>
                </div>
              </div>
            </div>
            <h3 className="mt-40">Fee Deductions</h3>
            <div className="gridListTable">
              <ul className="gridHeader">
                <li className="col col-5">Deductions Type</li>
                <li className="col col-3">Fixed Amount</li>
                <li className="col col-3">Amount (₹)</li>
                <li className="col col-1">&nbsp;</li>
              </ul>
              <div className="gridBody no-fixed formTable">
                <div className="gridRow">
                  <ul className="topInfo">
                    <li className="col col-5" data-head="Fee Type">
                      <FormInput
                        className=""
                        type="text"
                        placeholder="Fee title"
                        value="Scholarship"
                        disabled
                      />
                    </li>
                    <li className="col col-3" data-head="Amount">
                      <FormInput
                        className=""
                        type="number"
                        placeholder="Fee amount"
                        value={
                          inputData.feeStudentScholorship &&
                          inputData.feeStudentScholorship
                        }
                        name="feeStudentScholorship"
                        min="0"
                        onChange={(e) => handleDiscountAndScholarship(e)}
                        disabled={!scholarshipInput}
                      />
                      <FormError
                        show={
                          !inputData["feeStudentScholorshipIsValid"] &&
                          isValid &&
                          scholarshipInput
                        }
                        error={inputData.feeStudentScholorshipError}
                      />
                    </li>
                    <li className="col col-3" data-head="Amount">
                      <FormInput
                        className=""
                        type="number"
                        placeholder="Fee amount"
                        value={calculateAmount("scholarship")}
                        disabled
                      />
                    </li>
                    <li className="col col-1 actionCols">
                      <div className="input-custom-type inline">
                        <label className="small">
                          <input
                            type="checkbox"
                            onClick={() =>
                              scholarshipDiscountState("Scholarship")
                            }
                            checked={scholarshipInput}
                          />
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="gridRow">
                  <ul className="topInfo">
                    <li className="col col-5" data-head="Fee Type">
                      <FormInput
                        className=""
                        type="text"
                        placeholder="Fee title"
                        value="Discount"
                        disabled
                      />
                    </li>
                    <li className="col col-3" data-head="Amount">
                      <FormInput
                        className=""
                        type="number"
                        placeholder="Fee amount"
                        value={
                          inputData.feeStudentDiscount &&
                          inputData.feeStudentDiscount
                        }
                        name="feeStudentDiscount"
                        onChange={(e) => handleDiscountAndScholarship(e)}
                        disabled={!discountInput}
                      />
                      <FormError
                        show={
                          !inputData["feeStudentDiscountIsValid"] &&
                          isValid &&
                          discountInput
                        }
                        error={inputData.feeStudentDiscountError}
                      />
                    </li>
                    <li className="col col-3" data-head="Amount">
                      <FormInput
                        className=""
                        type="number"
                        placeholder="Fee amount"
                        value={calculateAmount("Discount")}
                        disabled
                      />
                    </li>
                    <li className="col col-1 actionCols">
                      <div className="input-custom-type inline">
                        <label className="small">
                          <input
                            type="checkbox"
                            onClick={() => scholarshipDiscountState("Discount")}
                            checked={discountInput}
                          />
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-20">
                <div className="input-custom-type inline">
                  <label className="small">
                    <input
                      type="checkbox"
                      name="SaveRepeat"
                      onClick={(e) => handleDiscountAndScholarship(e)}
                      checked={inputData.SaveRepeat}
                    />
                    Save & Repeat All
                  </label>
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-30">₹{calculateAmount()}</h2>
          <p className="text-xxs">
            ({inputData.paymentCycle} fee is inclusive of all taxes + 3% convenience charges.)
          </p>
        </div>
        <div className="modalFooter mt-20">
          <div className="row">
            <button
              className="button btn-sm button-theme"
              onClick={saveStudentFeeStructure}
              disabled={loading}
            >
              {loading ? "loading..." : "Update Fee"}
            </button>
            &nbsp;&nbsp;
            <button
              className="button btn-o-primary btn-sm primary"
              onClick={closeModalStateEdit}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(EditFeeModal);
