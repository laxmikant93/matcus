import React, { useEffect, useState, useMemo } from "react";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import CardHeader from "../../../../Common/Card/CardHeader";
import FormInput from "../../../../Common/Form/FormInput";
import CheckboxInput from "../../../../Common/Form/CheckboxInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import Upload from "../../../../Common/Upload/index";
import { useDispatch, useSelector } from "react-redux";
import {
  postFee,
  getPaymentMode,
  getSingleFeeStructure,
  resetSingleFeeInfo,
  updateSingleFee,
} from "../../../../store/actions/feeStructure";
import { useNavigate, useParams } from "react-router";
import FormError from "../../../../Common/Form/FormError";
import ValidationFile from "../../../Auth/ValidationFile";
import AppLink from "../../../../Common/AppLink";
import SelectInput from "../../../../Common/Form/SelectInput";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
import { useRef } from "react";

const FeeStructureDetail = ({ doUpdate }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const { user, InsID, allPaymentMode, singleFeeStructure, addedFeeSuccess } =
    useSelector((state) => {
      return {
        user: state.user._id,
        InsID: state.user.user_institute,
        allPaymentMode: state.feeStructure.availablePaymentMode.data,
        singleFeeStructure: state.feeStructure.singleFee,
        addedFeeSuccess:
          state.feeStructure.addFee.data.status === 200 ? true : false,
      };
    });
  const [isFilled, setIsFilled] = useState();
  const [feeTitle, setFeeTitle] = useState("");
  const [feeCourse, setFeeCourse] = useState("");
  const [feeDiscription, setFeeDiscription] = useState("");
  const [termCondition, setTermCondition] = useState("");
  const [feeStructureDoc, setFeeStructureDoc] = useState("");
  const [feeStructureFeeType, setFeeStructureFeeType] = useState("rupees");
  const [feeStructureTotalFee, setFeeStructureTotalFee] = useState("");
  const [feeStrucutureData, setFeeStrucutureData] = useState([
    {
      type: "",
      amount: "",
      paymentCycle: "one time",
      total: "",
    },
  ]);

  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const ref=useRef(null)
  // error states
  const [showError, setShowError] = useState(false);
  const [feeTitleError, setFeeTitleError] = useState(false);
  const [feeCourseError, setFeeCourseError] = useState(false);
  // const [feeDiscriptionError, setFeeDiscriptionError] = useState(false);
  const [feeStructureFeeTypeError, setFeeStructureFeeTypeError] = useState(false);
  const [feeStructureFeeAmtError, setFeeStructureFeeAmtError] = useState(false);

  if (
    singleFeeStructure.data &&
    singleFeeStructure.success &&
    !isFilled &&
    doUpdate
  ) {
    setIsFilled(true);
    setFeeTitle(singleFeeStructure.data.title);
    setFeeCourse(singleFeeStructure.data.class);
    setFeeDiscription(singleFeeStructure.data.description);
    setTermCondition(singleFeeStructure.data.terms);
    setFeeStructureDoc(singleFeeStructure.data.document);
    setFeeStructureTotalFee(singleFeeStructure.data.fee);
    setFeeStructureFeeType(singleFeeStructure.data.feeType);
    setFeeStrucutureData([...singleFeeStructure.data.feestructure]);
  }

  useEffect(() => {
    dispatch(getPaymentMode(InsID));
    if (doUpdate) {
      dispatch(getSingleFeeStructure(id));
    }
  }, [InsID, dispatch, doUpdate, id]);

  function getTotalAmount() {
    let amount = feeStrucutureData.map((fee) => {
      switch (fee.paymentCycle) {
        case "one time":
          return fee.amount * 1;
        case "quarterly":
          return fee.amount * 4;
        case "halfYearly":
          return fee.amount * 2;
        case "monthly":
          return fee.amount * 12;
        default:
          return fee.amount * 1;
      }
    });
    let totalAmount = amount.reduce((a, b) => a + b, 0);
    const validTotalAmount = totalAmount ? totalAmount : 0;
    setFeeStructureTotalFee(validTotalAmount);
  }
  const [isNumberValid, setIsNumberValid] = useState(false);

  const addMoreFeeType = () => {
    let newfee = feeStrucutureData;
    newfee.push({
      type: "",
      amount: "",
      paymentCycle: "one time",
      total: "",
    });
    setFeeStrucutureData([...newfee]);
  };

  const removeFeeType = (key) => {
    feeStrucutureData.splice(key, 1);
    setFeeStrucutureData([...feeStrucutureData]);
    getTotalAmount();
  };

  // handleChange for feestructuredata
  const handletypeChange = (e, key) => {
    const feeTypeValue = e.target.value.trimStart();
    const temp = feeStrucutureData;
    temp[key]["type"] = feeTypeValue;
    setFeeStrucutureData([...temp]);
  };

  const [keyForAmount, setKeyForAmount] = useState("");
  const handleAmountChange = (e, key) => {
    const feeAmountValue = e.target.value;
    setKeyForAmount(key);
    const temp = feeStrucutureData;
    temp[key]["amount"] = feeAmountValue;

    ValidationFile.ValidateNumber(feeAmountValue)
      ? setIsNumberValid(false)
      : setIsNumberValid(true);

    setFeeStrucutureData([...temp]);
    getTotalAmount();
  };
  const handlePaymentCycle = (e, key) => {
    const feePayment = e.target.value.trimStart();
    const temp = feeStrucutureData;
    temp[key]["paymentCycle"] = feePayment;
    setFeeStrucutureData([...temp]);
    getTotalAmount();
  };

  const uploadImg = (data) => {
    let imgData = data;
    setFeeStructureDoc(imgData);
  };
  const removeFile = () => {
    // let imgData = data.location;
    setFeeStructureDoc("");
    // setImgLink("");
  };

  const handleFee = (e) => {
    let inputValue = e.target.value.trimStart();
    let inputName = e.target.name;
    switch (inputName) {
      case "title":
        setFeeTitle(inputValue);
        setFeeTitleError(!ValidationFile.validEmpty(inputValue));
        break;
      case "className":
        setFeeCourse(inputValue);
        setFeeCourseError(!ValidationFile.validEmpty(inputValue));
        break;
      case "description":
        setFeeDiscription(inputValue);
        // setFeeDiscriptionError(!ValidationFile.validEmpty(inputValue));
        break;
      case "terms":
        setTermCondition(inputValue);
        break;
      case "feeType":
        setFeeStructureFeeType(inputValue);
        break;
      default:
        return false;
    }
  };

  const handleOnChange = (value, type) => {
    if (type === "FeeDesc") {
      setFeeDiscription(value);
      // setFeeDiscriptionError(!ValidationFile.validEmpty(value));
      // if (value === "<p><br></p>") {
      //   setFeeDiscriptionError(true);
      // }
    }
    else {
      setTermCondition(value);
    }
  }

  const availablePaymentMode = allPaymentMode;
  const [selectedPaymentMode, setSelectedPaymentMode] = useState({
    paypal: false,
    upi: false,
    cheque: false,
    "bank transfer": false,
  });
  const [selectedmode, setSelectedMode] = useState();

  const handleCheckBox = (e) => {
    let isChecked = e.target.checked;
    let name = e.target.name.toLowerCase();

    let paymentMode = { ...selectedPaymentMode };
    paymentMode[name] = isChecked;

    setSelectedPaymentMode(paymentMode);
    const asArray = Object.entries(paymentMode);

    const getSelectedMethod = asArray.filter(([key, value]) => value !== false);
    let convertObj = Object.fromEntries(getSelectedMethod);
    setSelectedMode(Object.keys(convertObj));
  };

  useEffect(() => {
    return () => {
      dispatch(resetSingleFeeInfo());
    };
  }, [dispatch]);

  const handleSave = () => {
    setShowError(true);
    if (!ValidationFile.validEmpty(feeTitle)) {
      setFeeTitleError(true);
    }
    if (!ValidationFile.validEmpty(feeCourse)) {
      setFeeCourseError(true);
    }
    // if (!ValidationFile.validEmpty(feeDiscription)) {
    //   setFeeDiscriptionError(true);
    // }
    if (
      ValidationFile.validEmpty(feeTitle) &&
      ValidationFile.validEmpty(feeCourse)
      // ValidationFile.validEmpty(feeDiscription)
    ) {
      dispatch(postFee(feeDataForSaved()));
      setIsSaveLoading(true);
      // setTimeout(() => {
      // }, 200);
    }
  };

  addedFeeSuccess && history("/fee-structure");

  const FeeStructureTypeValidation = () => {
    let valid = true;
    for (let index = 0; index < feeStrucutureData.length; index++) {
      const element = feeStrucutureData[index];
      if (ValidationUtils.isEmpty(element.type)) {
        valid = false;
        setFeeStructureFeeTypeError(true);
      }
      if (ValidationUtils.isEmpty(element.amount)) {
        valid = false;
        setFeeStructureFeeAmtError(true);
      }
      else {
        valid = true;
        setFeeStructureFeeAmtError(false);
        setFeeStructureFeeTypeError(false);
      }
    }
    return valid;
  }

  const handlePublish = () => {
    let validation = FeeStructureTypeValidation();
    setShowError(true);
    if (!ValidationFile.validEmpty(feeTitle)) {
      setFeeTitleError(true);
    }
    if (!ValidationFile.validEmpty(feeCourse)) {
      setFeeCourseError(true);
    }
    // if (!ValidationFile.validEmpty(feeDiscription)) {
    //   setFeeDiscriptionError(true);
    // }
    if (
      ValidationFile.validEmpty(feeTitle) &&
      ValidationFile.validEmpty(feeCourse) &&
      // ValidationFile.validEmpty(feeDiscription) && 
      validation
    ) {
      dispatch(postFee(feeDataForPublish()));
      setIsPublishLoading(true);
      setTimeout(() => {
        history("/fee-structure");
      }, 200);
    }
  };

  const isFeeLoaded = useMemo(() => {
    return singleFeeStructure.data !== undefined
      ? singleFeeStructure.data.paymentMode
      : [];
  }, [singleFeeStructure]);

  const [updateMode, setUpdateMode] = useState({
    paypal: false,
    upi: false,
    cheque: false,
    bank: false,
  });

  useEffect(() => {
    const initialMode = isFeeLoaded ? isFeeLoaded : [];
    const reformedIntoObject = initialMode.reduce(
      (acc, currentKey) => ({ ...acc, [currentKey]: true }),
      {}
    );
    const updatedMode = { ...updateMode, ...reformedIntoObject };
    setUpdateMode(updatedMode);
  }, [isFeeLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateCheckbox = (e) => {
    let isChecked = e.target.checked;
    let name = e.target.name.toLowerCase();

    let paymentMode = { ...updateMode };
    paymentMode[name] = isChecked;

    setUpdateMode(paymentMode);
    const asArray = Object.entries(paymentMode);

    const getSelectedMethod = asArray.filter(([key, value]) => value !== false);
    let convertObj = Object.fromEntries(getSelectedMethod);
    setSelectedMode(Object.keys(convertObj));
  };

  const feeDataForEdit = () => {
    return {
      institute: InsID,
      owner: user,
      title: feeTitle,
      class: feeCourse,
      feeType: feeStructureFeeType ? feeStructureFeeType : "rupees",
      feestructure: feeStrucutureData,
      fee: feeStructureTotalFee ? feeStructureTotalFee : 0,
      description: feeDiscription,
      document: feeStructureDoc,
      terms: termCondition,
      paymentMode: selectedmode,
    };
  };

  const handleUpdate = () => {
    setShowError(true);
    if (!ValidationFile.validEmpty(feeTitle)) {
      setFeeTitleError(true);
    }
    if (!ValidationFile.validEmpty(feeCourse)) {
      setFeeCourseError(true);
    }
    // if (!ValidationFile.validEmpty(feeDiscription)) {
    //   setFeeDiscriptionError(true);
    // }

    if (
      ValidationFile.validEmpty(feeTitle) &&
      ValidationFile.validEmpty(feeCourse) &&
      ValidationFile.validEmpty(feeDiscription)
    ) {
      dispatch(updateSingleFee(id, feeDataForEdit()));
      setIsUpdateLoading(true);
      setTimeout(() => {
        history("/fee-structure");
      }, 400);
    }
  };

  const feeDataForPublish = () => {
    return {
      institute: InsID,
      owner: user,
      title: feeTitle,
      class: feeCourse,
      feeType: feeStructureFeeType ? feeStructureFeeType : "rupees",
      feestructure: feeStrucutureData,
      fee: feeStructureTotalFee ? feeStructureTotalFee : 0,
      description: feeDiscription,
      document: feeStructureDoc,
      terms: termCondition,
      paymentMode: selectedmode ? selectedmode : [],
      status: "Active",
    };
  };

  const feeDataForSaved = () => {
    return {
      institute: InsID,
      owner: user,
      title: feeTitle,
      class: feeCourse,
      feeType: feeStructureFeeType ? feeStructureFeeType : "rupees",
      feestructure: feeStrucutureData,
      fee: feeStructureTotalFee ? feeStructureTotalFee : 0,
      description: feeDiscription,
      document: feeStructureDoc,
      terms: termCondition,
      paymentMode: selectedmode ? selectedmode : [],
      status: "Saved",
    };
  };

  return (
    <React.Fragment>
      {!singleFeeStructure.loading ? (
        <div className="FS-DetailCst">
          <div className="FS-DetailList">
            <Card className="cardPadding Add-FS-Head mt-40">
              <CardBody>
                <div className="formFieldwrap mt-20">
                  <FormInput
                    className={showError && feeTitleError ? "errorInput" : ""}
                    name="title"
                    onChange={handleFee}
                    value={feeTitle}
                    label="Fee Structure Title"
                    placeholder="Fee Structure Title"
                    maxLength="93"
                  />
                  <FormError
                    show={showError && feeTitleError}
                    error="Title is required."
                  ></FormError>
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    label="Class or Course"
                    placeholder="For Class or Course"
                    name="className"
                    onChange={handleFee}
                    value={feeCourse}
                    className={showError && feeCourseError ? "errorInput" : ""}
                  />
                  <FormError
                    show={showError && feeCourseError}
                    error="Class or course is required."
                  ></FormError>
                </div>
              </CardBody>
            </Card>
            <Card className="cardPadding FS-Fee-Type mt-20">
              <CardHeader>
                <p className="text-xs w-600">Choose your currency</p>
                <div className="selectTextType">
                  <select
                    name="feeType"
                    onChange={handleFee}
                    value={feeStructureFeeType ? feeStructureFeeType : "rupees"}
                  >
                    <option value="rupees">&#8377; INR</option>
                    <option value="usd">&#36; USD</option>
                    <option value="euro">&euro; Euro</option>
                  </select>
                </div>
                <p>Add amount inclusive of all services/GST/local taxes.</p>
              </CardHeader>
              <CardBody>
                {feeStrucutureData.length
                  ? feeStrucutureData.map((item, key) => {
                    return (
                      <div key={key} className="FS-Fee-Type-input mt-20">
                        <div className="formFieldwrap">
                          <FormInput
                            placeholder="E.g. Tuition fee/Sports fee/Exam fee"
                            label="Type"
                            onChange={(e) => handletypeChange(e, key)}
                            value={feeStrucutureData[key].type}
                          />
                          <FormError
                            show={feeStructureFeeTypeError && !feeStrucutureData[key].type}
                            error="Fee structure type required."
                          />
                        </div>
                        <div className="formFieldwrap">
                          <FormInput
                            type="number"
                            placeholder="Amount"
                            label="Amount"
                            onChange={(e) => handleAmountChange(e, key)}
                            value={feeStrucutureData[key].amount}
                          />
                          <FormError
                            show={isNumberValid && key === keyForAmount}
                            error="Please enter digits only."
                          />
                          <FormError
                            show={feeStructureFeeAmtError && !feeStrucutureData[key].amount}
                            error="Fee structure amount required."
                          />
                        </div>
                        <div className="formFieldwrap">
                          <SelectInput
                            value={
                              feeStrucutureData[key].paymentCycle
                                ? feeStrucutureData[key].paymentCycle
                                : "one time"
                            }
                            onChange={(e) => handlePaymentCycle(e, key)}
                            label="Payment Cycle"
                          >
                            <option value="one time">One Time</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="halfYearly">Half-Yearly</option>
                            <option value="monthly">Monthly</option>
                          </SelectInput>
                        </div>

                        {
                          feeStrucutureData.length > 1 && (
                            <button
                              className="button btn-sm btn-o-primary primary"
                              onClick={() => removeFeeType(key)}
                            >
                              Remove
                            </button>
                          )
                        }
                      </div>
                    );
                  })
                  : ""}
                <button
                  className="button btn-o-primary btn-sm primary mt-10"
                  onClick={addMoreFeeType}
                >
                  Add More
                </button>
                <p className="FS-TotalFeeCount text-xs mt-20 w-600 primary">
                  {feeStructureFeeType === "rupees" ? (
                    <strong>&#8377; </strong>
                  ) : (
                    ""
                  )}
                  {feeStructureFeeType === "usd" ? <strong>&#36; </strong> : ""}
                  {feeStructureFeeType === "euro" ? (
                    <strong>&euro; </strong>
                  ) : (
                    ""
                  )}
                  &nbsp;
                  {!isNumberValid && feeStructureTotalFee
                    ? feeStructureTotalFee
                    : 0}
                  <span className="text-xxs w-300 base">
                    &nbsp;(Annual fee inclusive of all.)
                  </span>
                </p>
              </CardBody>
            </Card>
            <Card className="cardPadding mt-40">
              <CardBody>
                <p className="text-xs w-600">Fee Description</p>
                <div className="formFieldwrap mt-20">
                  {/* <FormTextArea
                    className={
                      showError && feeDiscriptionError ? "errorInput" : ""
                    }
                    id="exampleFormControlTextarea1"
                    rows="5"
                    type="text"
                    placeholder="Write the purpose of the fee here."
                    label="Fee Description"
                    name="description"
                    style={{ whiteSpace: " pre-wrap" }}
                    maxLength="2000"
                    TextareaBtmTxt="2000"
                    onChange={handleFee}
                    value={feeDiscription}
                  /> */}
                  <TextEditor
                    preFilledData={feeDiscription}
                    currentResponse={(value) => handleOnChange(value, "FeeDesc")}
                  />
                  {/* <FormError
                    show={showError && feeDiscriptionError && feeDiscription === "<p><br></p>"}
                    error="Description is required."
                  /> */}
                </div>
              </CardBody>
            </Card>
            <Card className="cardPadding FS-Document mt-40">
              <CardBody>
                <p className="text-xs w-600"> Upload Fees Structure Document</p>
                <div className="DashedInstructionList">
                  <ul className="DashedInstructionList">
                    <li className="text-xxs">
                      For images accept only .PDF, .PNG or .JPG file format.
                    </li>
                  </ul>{" "}
                  <p className="text-xxs"></p>
                </div>
                <div className="formFieldwrap mt-15">
                  {/* <Upload
                    size={10}
                    name="feestructuredoc"
                    label="Upload File"
                    onUploaded={uploadImg}
                    allFiles={true}
                    hidenFileName={true}
                    invalidError={() => removeFile()}
                    IconFileUploadClass="icon-file-upload base i-xs"
                  /> */}
                   <UploadButton
                      BtnName="Upload File"
                      array={true}
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{ref.current.open()}}
                    />
               <Uploader size={10}
       onclose={() => ref.current.close()}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadImg(data)} validationProp={"onlyImagePdf"}  uploadLimit={1} />
                  {feeStructureDoc?.src ? (
                      <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <a
                        href={feeStructureDoc?.src}
                        rel="noreferrer"
                        target="_blank"
                      >
                        View Document
                      </a>
                      <button
                        className="button btn-sm btn-o-red red mt-8"
                        onClick={removeFile}
                      >
                        {" "}
                        Remove{" "}
                      </button>
                    </div>
                  ) : (
                  ""
                  )}
                </div>
              </CardBody>
            </Card>
            <Card className="cardPadding mt-40">
              <CardBody>
                <p className="text-xs w-600">Term & Conditions</p>
                <div className="formFieldwrap mt-20">
                  {/* <FormTextArea
                    id="exampleFormControlTextarea1"
                    rows="5"
                    type="text"
                    placeholder="Write your terms and conditions here."
                    label="Terms and Conditions"
                    name="terms"
                    style={{ whiteSpace: " pre-wrap" }}
                    maxLength="2000"
                    TextareaBtmTxt="2000"
                    onChange={handleFee}
                    value={termCondition}
                  /> */}
                  <TextEditor
                    preFilledData={termCondition}
                    currentResponse={(value) => handleOnChange(value, "termCondition")}
                  />
                </div>
              </CardBody>
            </Card>
            <Card className="cardPadding mt-40">
              <CardBody>
                <p className="text-xs w-600">Select Mode of Payment</p>
                {allPaymentMode.length > 0 ? (
                  <div className="input-custom-type FS-Payment-Mode">
                    {availablePaymentMode.map((mode) => {
                      return (
                        <React.Fragment key={mode}>
                          <CheckboxInput
                            type="checkbox"
                            LabelClass={`small  ${doUpdate ? "active" : ""}`}
                            name={mode}
                            label={
                              mode === "paypal"
                                ? "PayPal"
                                : "" || mode === "upi"
                                  ? "UPI"
                                  : "" || mode === "cheque"
                                    ? "Cheque Payment"
                                    : "" || mode === "bank"
                                      ? "Bank Transfer"
                                      : ""
                            }
                            onChange={
                              doUpdate ? updateCheckbox : handleCheckBox
                            }
                            defaultChecked={
                              doUpdate &&
                                mode ===
                                singleFeeStructure.data.paymentMode.find(
                                  (item) => item === mode
                                )
                                ? true
                                : false
                            }
                          />
                        </React.Fragment>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className="DashedInstructionList">
                      <p className="text-xxs">
                        - You have not added a mode of payment. Please add first
                        to procees, or save this fee structure to add later.
                      </p>
                    </div>
                    <AppLink
                      to="/payment-mode"
                      className="button button-primary btn-oval btn-sm mt-10"
                    >
                      <i className="ed-icon icon-plus-add white i-xs"></i>
                      Add Payment Mode
                    </AppLink>
                  </>
                )}
              </CardBody>
            </Card>
            <div className="FS-DetailActionBtn mt-40">
              {doUpdate ? (
                !isUpdateLoading ? (
                  <button
                    className="button btn-md button-theme btn-md"
                    onClick={handleUpdate}
                  >
                    Update Fee Structure
                  </button>
                ) : (
                  <button className="button btn-md button-theme btn-md">Loading...</button>
                )
              ) : (
                <>
                  {!isPublishLoading ? (
                    <button
                      className="button btn-md button-theme btn-md"
                      onClick={handlePublish}
                    >
                      Publish Fee Structure
                    </button>
                  ) : (
                    <button className="button btn-md button-theme btn-md">Loading...</button>
                  )}
                  {!isSaveLoading ? (
                    <button
                      className="button btn-o-primary primary btn-md"
                      onClick={handleSave}
                    >
                      Save for later
                    </button>
                  ) : (
                    <button className="button btn-md button-theme btn-md">Loading...</button>
                  )}
                </>
              )}
            </div>
            <div className="mt-50">&nbsp;</div>
          </div>
        </div>
      ) : (
        <div className="loadingGridData">Loading...</div>
      )
      }
    </React.Fragment >
  );
};

export default FeeStructureDetail;
