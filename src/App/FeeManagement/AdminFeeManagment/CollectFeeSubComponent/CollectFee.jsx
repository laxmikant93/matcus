/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import FormInput from "../../../../Common/Form/FormInput";
import AppLink from "../../../../Common/AppLink";
import "./CollectFeeSubComponent.scss";
import {
  getStudentCollectFee,
  postStudentCollectFee,
  resetStudentCollectFee,
} from "../../../../store/actions/feeManagement";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../../Classes/ValidationFile";

import Cash from "./Cash";
import Cheque from "./Cheque";
import DemandDraft from "./DemandDraft";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import CardHeader from "../../../../Common/Card/CardHeader";
import "../../fee-management.scss";

const CollectFee = () => {
  const dispatch = useDispatch();
  const [feePaymentMode, setfeePaymentMode] = useState(0);
  const feePaymentModeHandler = (feePaymentMode) => {
    setfeePaymentMode(feePaymentMode);
  };

  let { id, classroomId } = useParams();

  useEffect(() => {
    dispatch(getStudentCollectFee(id));
  }, [id, dispatch]);

  const { getStudentCollectFees, loading, success } = useSelector((state) => {
    return {
      getStudentCollectFees: state.feeManagement.getStudentCollectFees.data,
      loading: state.feeManagement.postStudentCollectFees.loading,
      success: state.feeManagement.postStudentCollectFees.success,
    };
  });

  const {
    fullname,
    admission_no,
    totalAmount,
    feeStudentScholorship,
    feeStudentDiscount,
    accumilativeFeeDue,
  } = getStudentCollectFees;

  // const totalAmount=parseFloat(totalAmount)

  const TotalDiscount = feeStudentScholorship + feeStudentDiscount;
  const paidAmount = totalAmount - TotalDiscount + accumilativeFeeDue;

  const [error, setError] = useState(false);

  const [selectMethod, setSelectMethod] = useState();
  const handleRadioChange = (e) => {
    const inputName = e.target.name;
    setError(false);
    setSelectMethod(inputName);

    const temp = {
      ...cashData,
      receiptTitle: { value: "recieptTitle", isValid: true },
      PaidAmount: { value: paidAmount, isValid: true },
      paymentMethod: { value: "cash", isValid: true },
    };

    const temp1 = {
      ...chequeData,
      receiptTitle: { value: "recieptTitle", isValid: true },
      PaidAmount: { value: paidAmount, isValid: true },
      paymentMethod: { value: "cheque", isValid: true },
    };

    const temp2 = {
      ...demandDraftData,
      receiptTitle: { value: "recieptTitle", isValid: true },
      PaidAmount: { value: paidAmount, isValid: true },
      paymentMethod: { value: "demandDraft", isValid: true },
    };

    setCashData(temp);
    setChequeData(temp1);
    setDemandDraftData(temp2);
  };

  const [cashData, setCashData] = useState({
    receiptTitle: {
      value: "",
      isValid: false,
    },
    PaidAmount: {
      value: "",
      isValid: false,
    },
    paymentMethod: {
      value: "",
      isValid: false,
    },
    transactionDate: {
      value: "",
      isValid: false,
    },
  });

  const [chequeData, setChequeData] = useState({
    receiptTitle: {
      value: "",
      isValid: false,
    },
    PaidAmount: {
      value: "",
      isValid: false,
    },
    paymentMethod: {
      value: "",
      isValid: false,
    },
    contact: {
      value: "",
      isValid: false,
    },
    accountHolderName: {
      value: "",
      isValid: false,
    },
    BankBranch: {
      value: "",
      isValid: false,
    },
    BankName: {
      value: "",
      isValid: false,
    },
    ChequeNo: {
      value: "",
      isValid: false,
    },
    uploadFile: {
      value: "",
      isValid: false,
    },
  });

  const [demandDraftData, setDemandDraftData] = useState({
    receiptTitle: {
      value: "",
      isValid: false,
    },
    PaidAmount: {
      value: "",
      isValid: false,
    },
    paymentMethod: {
      value: "",
      isValid: false,
    },
    contact: {
      value: "",
      isValid: false,
    },
    accountHolderName: {
      value: "",
      isValid: false,
    },
    BankBranch: {
      value: "",
      isValid: false,
    },
    BankName: {
      value: "",
      isValid: false,
    },
    DemandDraftNo: {
      value: "",
      isValid: false,
    },
    uploadFile: {
      value: "",
      isValid: false,
    },
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    switch (selectMethod) {
      case "cash":
        const cashDetailsData = {
          ...cashData,
          [inputName]: {
            value: inputValue,
            isValid: inputValidation(inputName, inputValue),
          },
        };
        setCashData(cashDetailsData);
        break;
      case "cheque":
        const chequeDetailsData = {
          ...chequeData,
          [inputName]: {
            value: inputValue,
            isValid: inputValidation(inputName, inputValue),
          },
        };
        setChequeData(chequeDetailsData);
        break;
      case "demandDraft":
        const ddDetailsData = {
          ...demandDraftData,
          [inputName]: {
            value: inputValue,
            isValid: inputValidation(inputName, inputValue),
          },
        };
        setDemandDraftData(ddDetailsData);
        break;
      default:
        return false;
    }
  };

  const inputValidation = (inputName, inputValue) => {
    switch (inputName) {
      case "paymentMethod":
        return ValidationFile.validEmpty(inputValue);
      // case "transactionDate":
      //   return ValidationFile.validEmpty(inputValue);
      case "contact":
        return ValidationFile.validEmpty(inputValue);
      case "accountHolderName":
        return ValidationFile.validEmpty(inputValue);
      case "BankBranch":
        return ValidationFile.validEmpty(inputValue);
      case "BankName":
        return ValidationFile.validEmpty(inputValue);
      case "ChequeNo":
        return ValidationFile.validEmpty(inputValue);
      case "DemandDraftNo":
        return ValidationFile.validEmpty(inputValue);

      default:
        break;
    }
  };

  const isCashFormValid = () => {
    return cashData.paymentMethod.isValid ? true : false;
  };

  const isChequeFormValid = () => {
    return chequeData.paymentMethod.isValid &&
      chequeData.contact.isValid &&
      chequeData.accountHolderName.isValid &&
      chequeData.BankBranch.isValid &&
      chequeData.BankName.isValid &&
      chequeData.ChequeNo.isValid
      ? true
      : false;
  };

  const isDemandDraftFormValid = () => {
    return demandDraftData.paymentMethod.isValid &&
      demandDraftData.contact.isValid &&
      demandDraftData.accountHolderName.isValid &&
      demandDraftData.BankBranch.isValid &&
      demandDraftData.BankName.isValid &&
      demandDraftData.DemandDraftNo.isValid
      ? true
      : false;
  };

  const getCashDetailData = () => {
    return {
      receiptTitle: title,
      PaidAmount: totalAmount - TotalDiscount,
      paymentMethod: cashData.paymentMethod.value,
      transactionDate: new Date().toString(),
    };
  };
  const getChequeDetailData = () => {
    return {
      receiptTitle: chequeData.receiptTitle.value,
      PaidAmount: totalAmount - TotalDiscount,
      paymentMethod: chequeData.paymentMethod.value,
      contact: chequeData.contact.value,
      accountHolderName: chequeData.accountHolderName.value,
      BankBranch: chequeData.BankBranch.value,
      BankName: chequeData.BankName.value,
      ChequeNo: chequeData.ChequeNo.value,
      uploadFile: chequeData.uploadFile.value,
    };
  };

  const getDemandDraftDetailData = () => {
    return {
      receiptTitle: demandDraftData.receiptTitle.value,
      PaidAmount: totalAmount - TotalDiscount,
      paymentMethod: demandDraftData.paymentMethod.value,
      contact: demandDraftData.contact.value,
      accountHolderName: demandDraftData.accountHolderName.value,
      BankBranch: demandDraftData.BankBranch.value,
      BankName: demandDraftData.BankName.value,
      DemandDraftNo: demandDraftData.DemandDraftNo.value,
      uploadFile: demandDraftData.uploadFile.value,
    };
  };

  const payNowSubmitButton = async (e) => {
    e.preventDefault();
    setError(true);
    switch (selectMethod) {
      case "cash":
        if (isCashFormValid()) {
          const data = getCashDetailData();
          dispatch(postStudentCollectFee(data, id));
        }

        break;
      case "cheque":
        if (isChequeFormValid()) {
          const data = getChequeDetailData();
          dispatch(postStudentCollectFee(data, id));
        }
        break;

      case "demandDraft":
        if (isDemandDraftFormValid()) {
          const data = getDemandDraftDetailData();
          dispatch(postStudentCollectFee(data, id));
        }
        break;
      default:
        break;
    }
  };

  const handleDatePicker = (datetime) => {
    let feeDate = {
      ...cashData,
      transactionDate: {
        value: datetime,
        isValid: ValidationFile.compareCurrentDateTime(datetime),
      },
      validation: isCashFormValid(),
    };
    setCashData(feeDate);
  };

  const handleUploadFile = (data) => {
    let feeUploadFileCheque = {
      ...chequeData,
      uploadFile: {
        value: data.location,
        isValid: true,
      },
    };
    let feeUploadFileDD = {
      ...demandDraftData,
      uploadFile: {
        value: data.location,
        isValid: true,
      },
    };
    switch (selectMethod) {
      case "cheque":
        setChequeData(feeUploadFileCheque);
        break;
      case "demandDraft":
        setDemandDraftData(feeUploadFileDD);
        break;
      default:
        break;
    }
  };
  const history = useNavigate();
  if (success) {
    dispatch(resetStudentCollectFee())
    history(`/view-fee-listing/${classroomId}`);
  }
  const [title, setTitle] = useState("");
  const onChangeTitle = (e) => {
    let value = e.target.vlaue;
    setTitle(value);
  };
  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/fee-management" title="Fee Management" />
          <BreadcrumbItem to={`/collect-fee/${id}/${classroomId}`} title="collect fee" />
        </Breadcrumb>
        <div className="collect-fee-custom mt-20">
          <h1 className="text-sm w-300">Collect Fee</h1>
          <div className="formFieldwrap mt-20">
            <FormInput
              className=""
              type="text"
              label="Receipt Title"
              placeholder="Receipt Title"
              onChange={(e) => onChangeTitle(e)}
              value={title}
            />
          </div>
          <Card className="cardPadding">
            <CardHeader className="mb-10">
              <p className="text-xs w-600">Student Info</p>
            </CardHeader>
            <CardBody>
              <div className="">
                <p className="text-xxs w-400">Student Name</p>
                <p className="text-xs w-600">{fullname}</p>
              </div>
              <div className="mt-10">
                <p className="text-xxs w-400">Admission Number</p>
                <p className="text-xs w-600">{admission_no}</p>
              </div>
            </CardBody>
          </Card>
          <Card className="cardPadding mt-40">
            <CardHeader className="mb-10">
              <p className="text-xs w-600">Payment Info</p>
            </CardHeader>
            <CardBody>
              <div className="">
                <p className="text-xxs w-400">Scholorship and Fee Discount</p>
                <p className="text-xs w-600 primary">
                  ₹&nbsp;{feeStudentScholorship + feeStudentDiscount}
                </p>
              </div>
              <div className="mt-10">
                <p className="text-xxs w-400">Late Fee</p>
                <p className="text-xs w-600 primary">
                  ₹&nbsp;{accumilativeFeeDue ? accumilativeFeeDue : "0"}
                </p>
              </div>
              <div className="mt-10">
                <p className="text-xxs w-400">Total Due Amount</p>
                <p className="text-sm w-700 primary">
                  {totalAmount ? (
                    <React.Fragment>
                      ₹&nbsp;{parseFloat(totalAmount)}
                    </React.Fragment>
                  ) : (
                    "Loading..."
                  )}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="cardPadding mt-40">
            <CardHeader className="mb-10">
              <p className="text-xs w-600">Payment Method</p>
            </CardHeader>
            <CardBody>
              <div className="scroll-nav-tab-wrapper">
                <div className="input-custom-type inline">
                  <label
                    className={`mt-10 w-600 ${feePaymentMode === 1 ? "active" : ""
                      }`}
                  >
                    <input
                      type="radio"
                      name="cash"
                      value="accept_fee_mode_cash"
                      checked={feePaymentMode === 1}
                      onChange={(e) => {
                        feePaymentModeHandler(1);
                        handleRadioChange(e);
                      }}
                    />
                    <span className="lable-text text-xxs w-600">Cash</span>
                  </label>
                  <label
                    className={`mt-10 w-600 ${feePaymentMode === 2 ? "active" : ""
                      }`}
                  >
                    <input
                      type="radio"
                      name="cheque"
                      value="accept_fee_mode_cheque"
                      checked={feePaymentMode === 2}
                      onChange={(e) => {
                        feePaymentModeHandler(2);
                        handleRadioChange(e);
                      }}
                    />
                    <span className="lable-text text-xxs w-600">Cheque</span>
                  </label>
                  <label
                    className={`mt-10 w-600 ${feePaymentMode === 3 ? "active" : ""
                      }`}
                  >
                    <input
                      readOnly
                      type="radio"
                      name="demandDraft"
                      value="accept_fee_mode_dd"
                      checked={feePaymentMode === 3}
                      onChange={(e) => {
                        feePaymentModeHandler(3);
                        handleRadioChange(e);
                      }}
                    />
                    <span className="lable-text text-xxs w-600">
                      Demand Draft
                    </span>
                  </label>
                </div>
              </div>
              {feePaymentMode === 1 && (
                <>
                  <Cash
                    handleChange={handleChange}
                    totalAmount={totalAmount}
                    discount={feeStudentScholorship + feeStudentDiscount}
                    cashData={cashData}
                    handleDatePicker={handleDatePicker}
                    error={error}
                  />
                </>
              )}
              {feePaymentMode === 2 && (
                <>
                  <Cheque
                    handleChange={handleChange}
                    chequeData={chequeData}
                    error={error}
                    handleUploadFile={handleUploadFile}
                    totalAmount={totalAmount}
                    discount={feeStudentScholorship + feeStudentDiscount}
                  />

                  <div className="mt-3">&nbsp;</div>
                </>
              )}
              {feePaymentMode === 3 && (
                <>
                  <DemandDraft
                    handleChange={handleChange}
                    demandDraftData={demandDraftData}
                    error={error}
                    handleUploadFile={handleUploadFile}
                    totalAmount={totalAmount}
                    discount={feeStudentScholorship + feeStudentDiscount}
                  />

                  <div className="mt-3">&nbsp;</div>
                </>
              )}
            </CardBody>
          </Card>

          <div className="feeFormWrap">
            <button
              className="button btn-md button-theme"
              onClick={payNowSubmitButton}
              disabled={loading}
            >
              {loading ? "Loading.." : "Pay Now"}
            </button>
            <AppLink
              to={`/view-fee-listing/${classroomId}`}
              className="button btn-o-gray gray"
            >
              Cancel
            </AppLink>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};
export default CollectFee;
