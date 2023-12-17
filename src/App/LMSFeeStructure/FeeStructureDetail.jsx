import React, { useEffect, useState, useMemo } from "react";
import Card from "../../Common/Card";
import CardBody from "../../Common/Card/CardBody";
import CardHeader from "../../Common/Card/CardHeader";
import FormInput from "../../Common/Form/FormInput";
import Upload from "../../Common/Upload/index";
import { useDispatch, useSelector } from "react-redux";
import {
  postFee,
  resetSingleFeeInfo,
  updateSingleFee,
  availableCourses,
  getPaymentMode,
  getSingleFeeStructure,
} from "../../store/actions/lmsfeeStructure";
import { useNavigate, useParams } from "react-router";
import FormError from "../../Common/Form/FormError";
import ValidationFile from "../Auth/ValidationFile";
import TextEditor from "../../Common/Form/TextEditor";
import CenterPopup from "../../Common/CenterPopup";
import InputDatePicker from "../../Common/Form/InputDatePicker";
import moment from "moment";
import Modal from "../../Common/Modal";
import ModalHeader from "../../Common/Modal/ModalHeader";
import ModalBody from "../../Common/Modal/ModalBody";
import ModalFooter from "../../Common/Modal/ModalFooter";
import AddAccountDetails from "./AddAccountDetails";
import { DynamicCourseHeader } from "../../Common/UserElement";
import { paymentDetailStore, resetSendData } from "../../store/actions/paymentmode";
import SelectInput from "../../Common/Form/SelectInput";
import "./FeeStructure.scss"
import { useRef } from "react";
import UploadButton from "../../Common/UploadButton";
import Uploader from "../../Common/ImageUploader";
// import AddBankDetail from "../../../Dashboard/InstituteDashboard/KycVerification/AddPaymentModal/AddBankDetail";
const FeeStructureDetail = ({ doUpdate, feeStructureId, CloneAndEdit }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const {
    user,
    InsID,
    singleFeeStructure,
    addFeeSuccess,
    paymentDetailStoreData,
    updateFeeSuccess,
    FeeErrorHandling,
    paymentDetailStoreSuccess,
    paymentModeActive,
    sessionExist,
    coursesData,
    coursesSuccess,
    allPaymentMode,
    sessionTo,
    sessionFrom,
    postedBankDetailSuccess,
    userData
  } = useSelector((state) => {
    return {
      user: state.user._id,
      InsID: state.user.user_institute,
      sessionExist: state.user.user_sessionExit,
      sessionFrom: state.user.user_sessionFrom,
      sessionTo: state.user.user_sessionTo,
      paymentModeActive: state.user.user_account_number,
      allPaymentMode: state.lmsfeeStructure.availablePaymentMode.data,
      postedBankDetailSuccess: state.paymentmode.postedBankDetail.success,
      singleFeeStructure: state.lmsfeeStructure.singleFee,
      FeeErrorHandling: state.lmsfeeStructure.updateFeeError.success,
      updateFeeSuccess: state.lmsfeeStructure.updateFee.success,
      paymentDetailStoreData: state.paymentmode.savePaymentData.data,
      paymentDetailStoreSuccess: state.paymentmode.savePaymentData.success,
      addFeeSuccess: state.lmsfeeStructure.addFee.success,
      coursesData: state.lmsfeeStructure.availableCourses.data,
      coursesSuccess: state.lmsfeeStructure.availableCourses.success,
      coursesLoading: state.lmsfeeStructure.availableCourses.loading,
      userData: state.user
    };
  });
  const ref=useRef(null)
  const [isFilled, setIsFilled] = useState();
  const [feeTitle, setFeeTitle] = useState("");
  const [feeCourse, setFeeCourse] = useState("");
  const [feeDiscription, setFeeDiscription] = useState("");
  const [termCondition, setTermCondition] = useState("");
  const [feeStructureDoc, setFeeStructureDoc] = useState("");
  const [feeStructureFeeType, setFeeStructureFeeType] = useState("rupees");
  const [feeStructureTotalFee, setFeeStructureTotalFee] = useState("");
  const [paymentCycle, setPaymentCycle] = useState("monthly");
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const quarterlyArray = [
    "1st Quarter",
    "2nd Quarter",
    "3rd Quarter",
    "4th Quarter",
  ];
  const halfYearlyArray = ["1st Half of Year", "2nd Half of Year"];
  // const [lateFeesAmount, setLateFeesAmount] = useState("")
  // const [SingleRange, setSingleRange] = useState(false)
  const [showPaymentPopUp, setShowPaymentPopUp] = useState(false);
  const [feeStrucutureData, setFeeStrucutureData] = useState([
    {
      type: "",
      amount: "",
      rangeFrom: "",
      entireYear: true,
      rangeTo: "",
      total: "",
      rangeForSingleMonth: false,
    },
  ]);
  const [paymentModeData, setPaymentModeData] = useState("");
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [pCycle, setPCycle] = useState("monthly");
  const [lateFeesData, setLateFeesData] = useState("");
  const [lateFeesDate, setLateFeesDate] = useState("");
  const [sameClassroomCreateError, setSameClassroomCreateError] =
    useState(false);
  const [isSaveLoading, setIsSavingLoading] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [AboveErrorType, setAboveErrorType] = useState("");
  // error states
  const [showError, setShowError] = useState(false);
  const [feeTitleError, setFeeTitleError] = useState(false);
  const [feeCourseError, setFeeCourseError] = useState(false);
  const [feeDiscriptionError, setFeeDiscriptionError] = useState(false);
  const [isLateFees, setIsLateFees] = useState(false);

  if (
    singleFeeStructure.data &&
    singleFeeStructure.success &&
    !isFilled &&
    (doUpdate ||
      CloneAndEdit)
  ) {
    setIsFilled(true);
    setFeeTitle(singleFeeStructure.data.title);
    !CloneAndEdit && setFeeCourse(singleFeeStructure.data.class);
    setFeeDiscription(singleFeeStructure.data.description);
    setTermCondition(singleFeeStructure.data.terms);
    setFeeStructureDoc(singleFeeStructure.data.document);
    setFeeStructureTotalFee(singleFeeStructure.data.fee);
    setFeeStructureFeeType(singleFeeStructure.data.feeType);
    setFeeStrucutureData([...singleFeeStructure.data.feestructure]);
    !CloneAndEdit && setFeeCourse(singleFeeStructure.data.classRoomId);
    setLateFeesDate(singleFeeStructure.data.lateFeesAmount.startDate);
    setLateFeesData(singleFeeStructure.data.lateFeesAmount.amount);
    setIsLateFees(singleFeeStructure.data.lateFeesAmount && singleFeeStructure.data.lateFeesAmount.amount ? true : false);
    setPaymentCycle(singleFeeStructure.data.paymentCycle);
  }
  useEffect(() => {
    if (CloneAndEdit) {
      dispatch(getSingleFeeStructure(id));
    }
  }, [CloneAndEdit]);
  useEffect(() => {
    dispatch(getPaymentMode(InsID));
    if (doUpdate) {
      dispatch(getSingleFeeStructure(id));
    }
    setFeeCourse();
  }, [CloneAndEdit, InsID, dispatch, doUpdate, id]);

  useEffect(() => {
    if (sessionExist) {
      setStartSessionChange(sessionFrom)
      setEndSessionChange(sessionTo)
      setStartSession(true);
      setEndSession(true);
      if (checkIfFullYear(sessionFrom, sessionTo)) {
        setFullYearSession(true)
      }
    }
  }, [sessionExist]);
  const checkIfFullYear = (sessionFrom, sessionTo) => {
    let Month = [];

    const startFrom = sessionFrom;
    const endTo = sessionTo;
    let m = monthArray.indexOf(startFrom);
    let end = monthArray.indexOf(endTo);
    for (let i = 0; i <= 11; i++) {
      if (m > 11) {
        m = 0;
        Month.push({ month: monthArray[m], circle: true, monthNo: m });
      } else {
        Month.push({ month: monthArray[m], circle: false, monthNo: m })
      }
      if (m === end) {
        break;
      }
      m += 1;
    }
    if (Month.length < 12) {
      return false
    } else {
      return true
    }
  }


  useEffect(() => {
    if (postedBankDetailSuccess) {
      dispatch(getPaymentMode(InsID));
    }
  }, [InsID, dispatch, postedBankDetailSuccess]);

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
      entireYear: true,
      amount: "",
      rangeFrom: "",
      rangeTo: "",
      total: "",
      rangeForSingleMonth: false,
    });
    setFeeStrucutureData([...newfee]);
  };

  useEffect(() => {
    if (updateFeeSuccess) {
      setIsUpdateLoading(false);
      history("/fee-management");
    }
  }, [updateFeeSuccess]);
  // const lateFeesAddMore = () => {
  //   let newLateFee = lateFeesData;
  //   newLateFee.push({
  //     days: "",
  //     amount: ""
  //   });
  //   setLateFeesData([...newLateFee]);
  // }

  const removeFeeType = (key) => {
    feeStrucutureData.splice(key, 1);
    setFeeStrucutureData([...feeStrucutureData]);
    getTotalAmount();
  };
  // const removeLateFee = (key) => {
  //   lateFeesData.splice(key);
  //   setLateFeesData([...lateFeesData]);
  // };

  // handleChange for feestructuredata
  const handletypeChange = (e, key) => {
    const feeTypeValue = e.target.value;
    const temp = feeStrucutureData;
    temp[key]["type"] = feeTypeValue;
    setFeeStrucutureData([...temp]);
  };
  const lateFeesChange = (e) => {
    const lateFeeValue = e.target.value;
    setLateFeesData(lateFeeValue);
  };
  const lateFeeDateChange = (e) => {
    const value = e.target.value;
    if (value > 28) {
    } else {
      setLateFeesDate(value);
    }
  };

  const handleAmountChange = (e, key) => {
    const feeAmountValue = e.target.value;
    const temp = feeStrucutureData;
    temp[key]["amount"] = feeAmountValue;

    ValidationFile.ValidateNumber(feeAmountValue)
      ? setIsNumberValid(false)
      : setIsNumberValid(true);

    setFeeStrucutureData([...temp]);
    getTotalAmount();
  };

  const handlePaymentCycle = (e) => {
    const feePayment = e.target.value;
    setPCycle(feePayment);
    setPaymentCycle(feePayment);
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
    setSameClassroomCreateError(false);
    setAboveErrorType("");
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
      case "lateFeesAmount":
        setLateFeesData(inputValue);
        break;
      default:
        return false;
    }
  };

  const [selectedmode] = useState();

  useEffect(() => {
    return () => {
      dispatch(resetSingleFeeInfo());
      dispatch(resetSendData());
    };
  }, [dispatch]);

  const handleSave = () => {
    setShowError(true);
    setAboveErrorType("");
    if (checked) {
      if (paymentDetailStoreSuccess || paymentModeActive) {
        if (!ValidationFile.validEmpty(feeTitle)) {
          setFeeTitleError(true);
          setAboveErrorType("Save");
        }
        if (!ValidationFile.validEmpty(feeCourse)) {
          setFeeCourseError(true);
          setAboveErrorType("Save");
        }
        // if (!ValidationFile.validEmpty(feeDiscription)) {
        //   setFeeDiscriptionError(true);
        // }
        if (
          ValidationFile.validEmpty(feeTitle) &&
          ValidationFile.validEmpty(feeCourse)
        ) {
          if (checkValidationTypeAddMore()) {
            setIsSavingLoading(true);
            dispatch(postFee(feeDataForSaved(), sessionExist));
          }
        }
      } else {
        setAboveErrorType("Save");
      }
    } else {
      setAboveErrorType("Save");
    }
  };

  useEffect(() => {
    if (addFeeSuccess) {
      history("/fee-management");
    }
  }, [addFeeSuccess, history]);

  const checkValidationTypeAddMore = () => {
    let result = true;
    for (let i = 0; i < feeStrucutureData.length; i++) {
      if (
        feeStrucutureData[i].amount === "" ||
        feeStrucutureData[i].type === ""
      ) {
        result = false;
      }
      if (!feeStrucutureData[i].entireYear) {
        if (
          feeStrucutureData[i].rangeFrom === "" ||
          feeStrucutureData[i].rangeTo === ""
        ) {
          result = false;
        }
      }
    }
    return result;
  };

  const handlePublish = () => {
    setIsPublishLoading(true);
    dispatch(postFee(feeDataForPublish(), sessionExist));
    ClosePublishPopup();
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

  const feeDataForEdit = () => {
    return {
      institute: InsID,
      owner: user,
      title: feeTitle,
      classRoomId: feeCourse,
      feeType: feeStructureFeeType ? feeStructureFeeType : "rupees",
      feestructure: feeStrucutureData,
      fee: feeStructureTotalFee ? feeStructureTotalFee : 0,
      description: feeDiscription,
      document: feeStructureDoc,
      terms: termCondition,
      paymentMode: selectedmode,
      status: "Active",
      lateFeesAmount: {
        startDate: isLateFees ? lateFeesDate : "",
        amount: isLateFees ? parseInt(lateFeesData) : 0,
      },
    };
  };

  const handleUpdate = () => {
    setShowError(true);
    setAboveErrorType("");
    if (checked) {
      if (paymentDetailStoreSuccess || paymentModeActive) {
        if (!ValidationFile.validEmpty(feeTitle)) {
          setFeeTitleError(true);
          setAboveErrorType("Update");
        }
        if (!ValidationFile.validEmpty(feeCourse)) {
          setFeeCourseError(true);
          setAboveErrorType("Update");
        }
        // if (!ValidationFile.validEmpty(feeDiscription)) {
        //   setFeeDiscriptionError(true);
        // }
        if (
          ValidationFile.validEmpty(feeTitle) &&
          ValidationFile.validEmpty(feeCourse)
        ) {
          if (checkValidationTypeAddMore()) {
            dispatch(updateSingleFee(id, feeDataForEdit()));
            setIsUpdateLoading(true);
          }
        }
      }
    } else {
      setAboveErrorType("Update");
    }
  };

  useEffect(() => {
    if (FeeErrorHandling) {
      setSameClassroomCreateError(true);
      setIsPublishLoading(false);
      setAboveErrorType("Publish")
      setIsSavingLoading(false);
      setIsUpdateLoading(false);
    }
  }, [FeeErrorHandling]);

  const feeDataForPublish = () => {
    return {
      institute: InsID,
      owner: user,
      title: feeTitle,
      classRoomId: feeCourse,
      feeType: feeStructureFeeType ? feeStructureFeeType : "rupees",
      feestructure: feeStrucutureData,
      paymentCycle: pCycle,
      lateFeesAmount: {
        startDate: lateFeesDate,
        amount: parseInt(lateFeesData),
      },
      fee: feeStructureTotalFee ? feeStructureTotalFee : 0,
      description: feeDiscription,
      document: feeStructureDoc,
      terms: termCondition,
      status: "Active",
      session: {
        sessionExist: true,
        sessionFrom: startSessionChange,
        sessionTo: endSessionChange,
      },
      paymentData: paymentDetailStoreData,
      Publish: "Active",
    };
  };

  const feeDataForSaved = () => {
    return {
      institute: InsID,
      owner: user,
      title: feeTitle,
      classRoomId: feeCourse,
      feeType: feeStructureFeeType ? feeStructureFeeType : "rupees",
      feestructure: feeStrucutureData,
      paymentCycle: pCycle,
      lateFeesAmount: {
        startDate: lateFeesDate,
        amount: parseInt(lateFeesData),
      },
      fee: feeStructureTotalFee ? feeStructureTotalFee : 0,
      description: feeDiscription,
      document: feeStructureDoc,
      terms: termCondition,
      paymentMode: selectedmode ? selectedmode : [],
      session: {
        sessionExist: true,
        sessionFrom: startSessionChange,
        sessionTo: endSessionChange,
      },
      paymentData: paymentDetailStoreData,
      status: "Saved",
      Publish: "Saved",
    };
  };
  useEffect(() => {
    dispatch(availableCourses(InsID));
  }, [dispatch, InsID]);

  const handleLateFees = () => {
    if (isLateFees) {
      setIsLateFees(false);
    } else {
      setIsLateFees(true);
    }
  };

  const handleentireYear = (e, key) => {
    setShowError(false);
    let checked = e.target.checked;
    if (checked) {
      let newfee = feeStrucutureData;
      newfee[key]["entireYear"] = false;
      setFeeStrucutureData([...newfee]);
    } else {
      let newfee = feeStrucutureData;
      newfee[key]["entireYear"] = true;
      setFeeStrucutureData([...newfee]);
    }
  };

  const handleDateRange = (e, switchValue, key) => {
    setShowError(false);
    let inputValue = e.target.value;
    if (switchValue === "from") {
      let feeData = feeStrucutureData;
      feeData[key]["rangeFrom"] = inputValue;
      if (feeData[key]["rangeForSingleMonth"]) {
        feeData[key]["rangeTo"] = inputValue;
      }
      setFeeStrucutureData([...feeData]);
    } else if (switchValue === "to") {
      let feeData = feeStrucutureData;
      feeData[key]["rangeTo"] = inputValue;
      setFeeStrucutureData([...feeData]);
    }
  };

  const PopUpClose = () => {
    setShowPaymentPopUp(false);
    setShowView(false);
    setPaymentModeData("");
  };
  const [showView, setShowView] = useState(false);
  const popUpOpen = (showView) => {
    setShowPaymentPopUp(true);
    if (showView) {
      setShowView(true);
    }
  };

  const [checked, setChecked] = useState(doUpdate ? true : false);
  const handlePaymentBrakdown = () => {
    setChecked(!checked);
  };
  const [publishPopup, setPublishPopup] = useState(false);

  const handlePublishPopup = () => {
    setShowError(true);
    setAboveErrorType("");
    if (checked) {
      if (paymentDetailStoreSuccess || paymentModeActive) {
        if (!ValidationFile.validEmpty(feeTitle)) {
          setFeeTitleError(true);

          setAboveErrorType("Publish");
        }
        if (!ValidationFile.validEmpty(feeCourse)) {
          setFeeCourseError(true);
          setAboveErrorType("Publish");
        }
        // if (!ValidationFile.validEmpty(feeDiscription)) {
        //   setFeeDiscriptionError(true);
        // }
        if (
          ValidationFile.validEmpty(feeTitle) &&
          ValidationFile.validEmpty(feeCourse)
        ) {
          if (checkValidationTypeAddMore()) {
            setPublishPopup(!publishPopup);
          }
        }
      } else {
        setAboveErrorType("Publish");
      }
    } else {
      setAboveErrorType("Publish");
    }
  };
  const ClosePublishPopup = () => {
    setPublishPopup(!publishPopup);
  };
  // const SingleRangeForCycle = (key, Range) => {
  //   if (!Range) {
  //     let feeData = feeStrucutureData;
  //     feeData[key]['rangeTo'] = feeStrucutureData[key]['rangeFrom'];
  //     setFeeStrucutureData([...feeData])
  //   } else {
  //     let feeData = feeStrucutureData;
  //     feeData[key]['rangeTo'] = "";
  //     setFeeStrucutureData([...feeData])
  //   }
  //   setSingleRange(!Range);
  // }
  const [startSession, setStartSession] = useState("");
  const [EndSession, setEndSession] = useState("");

  const [startSessionChange, setStartSessionChange] = useState("");
  const [endSessionChange, setEndSessionChange] = useState("");
  const [fullYearSession, setFullYearSession] = useState(false);

  const startSessionHandel = (data) => {
    setStartSession(data);
    setEndSession("");
    setEndSessionChange("");
    setAboveErrorType("");
    let startMonth = data.getMonth();
    setStartSessionChange(monthArray[startMonth]);
  };
  const endSessionHandel = (data) => {
    setEndSession(data);
    setAboveErrorType("")
    let endMonth = data.getMonth();
    setEndSessionChange(monthArray[endMonth]);
    let firstIndex = monthArray.indexOf(startSessionChange);
    if (firstIndex === 0 && monthArray[endMonth] === "December") {
      setFullYearSession(true);
    } else if (monthArray[firstIndex - 1] === monthArray[endMonth]) {
      setFullYearSession(true);
    } else {
      setFullYearSession(false);
      setPCycle("monthly");
      setPaymentCycle("monthly");
    }
  };
  var date = new Date();
  let year = moment(date).format("yyyy");
  let month = moment(date).format("M");

  const SingleRangeSelected = (key) => {
    if (!feeStrucutureData[key]["rangeForSingleMonth"]) {
      let feeData = feeStrucutureData;
      feeData[key]["rangeForSingleMonth"] = true;
      feeData[key]["rangeTo"] = feeData[key]["rangeFrom"];
      setFeeStrucutureData([...feeData]);
    } else {
      let feeData = feeStrucutureData;
      feeData[key]["rangeTo"] = "";
      feeData[key]["rangeForSingleMonth"] = false;
      setFeeStrucutureData([...feeData]);
    }
  };
  const calculateYear = () => {

    let date = new Date().getFullYear();
    let IncDate = (new Date().getFullYear() + 1);
    IncDate = IncDate.toString();
    IncDate = IncDate.slice(2, 4)
    if (monthArray.indexOf(sessionFrom) < monthArray.indexOf(sessionTo)) {
      return date;
    } else {

      return date + "-" + IncDate;

    }

  }
  const getFormData = () => {
    return {
      account_type: userData.user_account_type,
      account_beneficiary_name: userData.user_account_beneficiary_name,
      account_number: userData.user_account_number,
      account_ifsc_code: userData.user_account_ifsc_code,
      institute_email: userData.user_institute_email,
    }
  }
  useEffect(() => {
    if (userData.user_account_number && userData.user_account_number !== "" && userData.user_account_number !== false) {
      dispatch(paymentDetailStore(getFormData()));
      setPaymentModeData(getFormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentDetailStoreSuccess]);


  useEffect(() => {
    dispatch(getSingleFeeStructure(feeStructureId))
  }, [feeStructureId])
  return (
    <React.Fragment>
      {!singleFeeStructure.loading ? (
        <React.Fragment>
          <div className="FS-DetailCst mt-20">
            <div className="AddFeeStructure">
              {!doUpdate && !CloneAndEdit && (
                <p className="text-sm w-500 mb-20">Add Fee Structure</p>
              )}
              <div className="fs-session-filter">
                {!sessionExist ? (
                  <>
                    <div className="datePickerWrap">
                      <InputDatePicker
                        placeholder="*Start Session"
                        label="*Start Session"
                        id={"start_session"}
                        name="start_session"
                        type="date"
                        dateFormat="MM/yy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        minDate={new Date(year, parseInt(month) - 1, "01")}
                        onSelect={(selectedDate) =>
                          startSessionHandel(selectedDate)
                        }
                        maxDate={new Date(year, parseInt(month) + 11, "01")}
                        value={startSession}
                      />
                      <FormError
                        show={showError && startSession === ""}
                        error="Start session is required."
                      ></FormError>
                    </div>
                    <div className="datePickerWrap">
                      <InputDatePicker
                        placeholder="*End Session"
                        label="*End Session"
                        id="end_session"
                        name="end_session"
                        type="date"
                        value={EndSession}
                        dateFormat="MM/yy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        minDate={startSession}
                        maxDate={new Date().setMonth(new Date(startSession).getMonth() + 11)}
                        onSelect={(selectedDate) =>
                          endSessionHandel(selectedDate)
                        }
                        disabled={startSession ? false : true}
                      />
                      <FormError
                        show={showError && EndSession === ""}
                        error="End session is required."
                      ></FormError>

                      <FormError
                        show={
                          showError &&
                          startSessionChange === endSessionChange &&
                          EndSession !== ""
                        }
                        error="Start and End Session cannot be same."
                      ></FormError>
                    </div>
                  </>
                ) : (
                  <React.Fragment>
                    {id ?
                      <h2 className="text-xs mb-20">Session : {sessionFrom}-{sessionTo},{calculateYear()}</h2> : ""
                    }
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="FS-DetailList">
              <Card className="cardPadding Add-FS-Head">
                <CardBody className="mt-20">
                  <div className="formFieldwrap">
                    <SelectInput
                      name="className"
                      defaultValue={feeCourse}
                      value={feeCourse}
                      onChange={handleFee}
                      disabled={doUpdate}
                      label={`Select ${DynamicCourseHeader()}`}
                    >
                      <option value="">Select {DynamicCourseHeader()}</option>
                      {coursesSuccess &&
                        coursesData.length &&
                        coursesData.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.coursename}
                          </option>
                        ))}
                    </SelectInput>
                    {/* <label className="animLabel" htmlFor="select_Classroom">
                        Select <DynamicCourseHeader />
                      </label> */}
                    <FormError
                      show={showError && feeCourseError}
                      error="Classroom is required."
                    ></FormError>
                    <FormError
                      show={sameClassroomCreateError}
                      error="Cannot create two fee structure for same classroom."
                    ></FormError>
                  </div>
                  <div className="formFieldwrap">
                    <FormInput
                      className={showError && feeTitleError ? "errorInput" : ""}
                      name="title"
                      onChange={handleFee}
                      value={feeTitle}
                      label="Fee Title*"
                      placeholder="Fee Title"
                    />
                    <FormError
                      show={showError && feeTitleError}
                      error="Title is required."
                    ></FormError>
                  </div>
                </CardBody>
              </Card>
              <Card className="cardPadding FS-Fee-Type mt-20">
                <CardHeader>
                  <p className="text-xs base w-600">Select your fee cycle</p>
                  {/* <div className="selectTextType">
                    <select
                      name="feeType"
                      onChange={handleFee}
                      value={
                        feeStructureFeeType ? feeStructureFeeType : "rupees"
                      }
                    >
                      <option value="rupees">&#8377; INR</option>
                      <option value="usd">&#36; USD</option>
                      <option value="euro">&euro; Euro</option>
                    </select>
                  </div> */}
                  <div className="text-xxs base w-400">
                    Add amount inclusive of all services/GST/local taxes.
                  </div>
                </CardHeader>

                <CardBody>
                  <div className="mt-20">
                    <div className="input-custom-type inline scroll-top-menu-wrap">
                      <label className="small w-500">
                        <input
                          type="radio"
                          defaultChecked={true}
                          value="monthly"
                          name="accessibilityMode"
                          onClick={handlePaymentCycle}
                          disabled={
                            doUpdate ||
                            (!fullYearSession &&
                              startSessionChange &&
                              endSessionChange)
                          }
                          checked={
                            pCycle === "monthly" || paymentCycle === "monthly"
                          }
                        />
                        Monthly
                      </label>
                      <label className="small w-500">
                        <input
                          type="radio"
                          value="quarterly"
                          name="accessibilityMode"
                          onClick={handlePaymentCycle}
                          checked={
                            pCycle === "quarterly" ||
                            paymentCycle === "quarterly"
                          }
                          disabled={
                            doUpdate ||
                            (!fullYearSession &&
                              startSessionChange &&
                              endSessionChange)
                          }
                        />
                        Quarterly
                      </label>
                      <label className="small w-500">
                        <input
                          type="radio"
                          value="halfYearly"
                          name="accessibilityMode"
                          onClick={handlePaymentCycle}
                          disabled={
                            doUpdate ||
                            (!fullYearSession &&
                              startSessionChange &&
                              endSessionChange)
                          }
                          checked={
                            pCycle === "halfYearly" ||
                            paymentCycle === "halfYearly"
                          }
                        />
                        Half Yearly
                      </label>
                      <label className="small w-500">
                        <input
                          type="radio"
                          value="one time"
                          name="accessibilityMode"
                          onClick={handlePaymentCycle}
                          disabled={
                            doUpdate ||
                            (!fullYearSession &&
                              startSessionChange &&
                              endSessionChange)
                          }
                          checked={
                            pCycle === "one time" || paymentCycle === "one time"
                          }
                        />
                        Yearly
                      </label>
                    </div>
                    <p className="mt-15 red text-xxs">
                      <strong>Note&nbsp;-&nbsp;</strong>Payment cycle cannot be
                      changed in the same academic year.
                    </p>
                  </div>
                  {feeStrucutureData.length
                    ? feeStrucutureData.map((item, key) => {
                      return (
                        <div key={key} className="FS-Fee-Type-custom mt-30">
                          <div className="FS-Fee-Type-input">
                            <div className="formFieldwrap">
                              <FormInput
                                placeholder="E.g. Tuition fee/Sports fee/Exam fee"
                                label="Type"
                                onChange={(e) => handletypeChange(e, key)}
                                value={feeStrucutureData[key].type}
                              />
                              <FormError
                                show={
                                  feeStrucutureData[key].type === "" &&
                                  showError
                                }
                                error="Fee Type is required."
                              />
                            </div>
                            <div className="formFieldwrap">
                              <FormInput
                                placeholder="Amount (₹)"
                                type="number"
                                label="Amount (₹)"
                                onChange={(e) => handleAmountChange(e, key)}
                                value={feeStrucutureData[key].amount}
                                onWheel={(e) => e.target.blur()}
                                onKeyDown={
                                  (e) =>
                                    symbolsArr.includes(e.key) &&
                                    e.preventDefault()
                                }
                                maxLength="4"
                                min="0"
                              />
                              <FormError
                                show={
                                  feeStrucutureData[key].amount === "" &&
                                  showError
                                }
                                error="Amount is required."
                              />
                            </div>
                            {!feeStrucutureData[key].entireYear && (
                              <React.Fragment>
                                <div className="formFieldwrap">
                                  <SelectInput
                                    name="className"
                                    defaultValue={item.rangeTo}
                                    value={item.rangeFrom}
                                    onChange={(e) =>
                                      handleDateRange(e, "from", key)
                                    }
                                  // disabled={disabled}
                                  >
                                    <option value="">
                                      Select Range From
                                    </option>
                                    {paymentCycle === "monthly"
                                      ? monthArray.length &&
                                      monthArray.map((item, index) => (
                                        <option key={index} value={item}>
                                          {item}
                                        </option>
                                      ))
                                      : paymentCycle === "quarterly"
                                        ? quarterlyArray.length &&
                                        quarterlyArray.map(
                                          (item, index) => (
                                            <option
                                              key={index}
                                              value={item}
                                            >
                                              {item}
                                            </option>
                                          )
                                        )
                                        : paymentCycle === "halfYearly"
                                          ? halfYearlyArray.length &&
                                          halfYearlyArray.map(
                                            (item, index) => (
                                              <option
                                                key={index}
                                                value={item}
                                              >
                                                {item}
                                              </option>
                                            )
                                          )
                                          : ""}
                                  </SelectInput>
                                  <FormError
                                    show={
                                      feeStrucutureData[key][
                                      "rangeFrom"
                                      ] === "" && showError
                                    }
                                    error="Range to is required"
                                  ></FormError>
                                </div>

                                {!feeStrucutureData[key][
                                  "rangeForSingleMonth"
                                ] && (
                                    <div className="formFieldwrap">
                                      <SelectInput
                                        name="className"
                                        defaultValue={item.rangeTo}
                                        value={item.rangeTo}
                                        onChange={(e) =>
                                          handleDateRange(e, "to", key)
                                        }
                                        disabled={
                                          feeStrucutureData[key][
                                          "rangeFrom"
                                          ] === ""
                                        }
                                      >
                                        <option value="">
                                          Select Range To
                                        </option>
                                        {paymentCycle === "monthly"
                                          ? monthArray.length &&
                                          monthArray.map((item, index) => (
                                            <option
                                              key={index}
                                              value={item}
                                              disabled={
                                                feeStrucutureData[key][
                                                "rangeFrom"
                                                ] === item
                                              }
                                            >
                                              {item}
                                            </option>
                                          ))
                                          : paymentCycle === "quarterly"
                                            ? quarterlyArray.length &&
                                            quarterlyArray.map(
                                              (item, index) => (
                                                <option
                                                  key={index}
                                                  value={item}
                                                >
                                                  {item}
                                                </option>
                                              )
                                            )
                                            : paymentCycle === "halfYearly"
                                              ? halfYearlyArray.length &&
                                              halfYearlyArray.map(
                                                (item, index) => (
                                                  <option
                                                    key={index}
                                                    value={item}
                                                  >
                                                    {item}
                                                  </option>
                                                )
                                              )
                                              : ""}
                                      </SelectInput>
                                      <FormError
                                        show={
                                          !feeStrucutureData[key][
                                          "rangeForSingleMonth"
                                          ] &&
                                          feeStrucutureData[key][
                                          "rangeTo"
                                          ] === "" &&
                                          showError &&
                                          feeStrucutureData[key][
                                          "rangeFrom"
                                          ] !== ""
                                        }
                                        error="Range To is required"
                                      ></FormError>
                                    </div>
                                  )}

                                {paymentCycle !== "one time" && (
                                  <div className="input-custom-type">
                                    <label
                                      className="small w-500"
                                      onClick={() => SingleRangeSelected(key)}
                                    >
                                      <input
                                        type="checkbox"
                                        name="singleRange"
                                        id="singleRange"
                                        onChange={() =>
                                          SingleRangeSelected(key)
                                        }
                                        checked={item.rangeForSingleMonth}
                                      />
                                      Range For Single{" "}
                                      {paymentCycle === "monthly"
                                        ? "Month"
                                        : paymentCycle === "quarterly"
                                          ? "Quarter"
                                          : "Half Year"}
                                    </label>
                                  </div>
                                )}
                              </React.Fragment>
                            )}

                            {/* {paymentCycle !== "one time" && (
                              <React.Fragment>
                                <div className="input-custom-type">
                                  <label className="small">
                                    <input
                                      type="checkbox"
                                      onClick={(e) =>
                                        handleentireYear(e, key)
                                      }
                                      value={
                                        feeStrucutureData[key].entireYear
                                      }
                                      checked={
                                        !feeStrucutureData[key].entireYear
                                      }
                                    />
                                    Custom Range
                                  </label>
                                </div>
                              </React.Fragment>
                            )} */}
                            {feeStrucutureData.length > 1 && (
                              <button
                                className="removeBtn red"
                                title="Remove"
                                onClick={() => removeFeeType(key)}
                              >
                                <i className="ed-trash"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                    : ""}
                  <button
                    className="button btn-o-primary btn-sm primary mt-20"
                    onClick={addMoreFeeType}
                  >
                    Add More
                  </button>
                  <p className="FS-TotalFeeCount text-xs mt-20 w-600 primary">
                    {/* {feeStructureFeeType === "rupees" ? (
                      <strong>Total : &#8377; </strong>
                    ) : (
                      ""
                    )}
                    {feeStructureFeeType === "usd" ? (
                      <strong>Total : &#36; </strong>
                    ) : (
                      ""
                    )}
                    {feeStructureFeeType === "euro" ? (
                      <strong>Total : &euro; </strong>
                    ) : (
                      ""
                    )} */}
                    &nbsp;
                    Total: ₹{!isNumberValid && feeStructureTotalFee
                      ? feeStructureTotalFee
                      : 0}
                    <span className="text-xxs w-300 base">
                      &nbsp;(Fee amount inclusive of all taxes.)
                    </span>
                  </p>
                </CardBody>
              </Card>
              <Card className="cardPadding mt-40">
                <CardBody>
                  <div className="fs-applylatefine-wrap mt-20">
                    <div className="formFieldwrap">
                      <div className="input-custom-type">
                        <label className="small w-600">
                          <input
                            type="checkbox"
                            onClick={handleLateFees}
                            value={isLateFees}
                            checked={isLateFees}
                          />
                          Apply Late Fee Fine
                        </label>
                      </div>
                    </div>
                    <div className="fs-latefine-inputwrap">
                      {isLateFees && (
                        <>
                          <div className="text-xxs w-600 mb-3">
                            Late fine applied per day (In ₹)

                          </div>
                          <div className="formFieldwrap">

                            <FormInput
                              name="lateFeesAmount"
                              onChange={(e) => lateFeesChange(e)}
                              type="number"
                              placeholder="Late Fine applied per day"
                              value={lateFeesData}
                              onWheel={(e) => e.target.blur()}
                              onKeyDown={(e) =>
                                symbolsArr.includes(e.key) && e.preventDefault()
                              }
                              maxLength="4"
                              min="0"
                            />
                            <FormError
                              show={
                                isLateFees && showError && lateFeesData === ""
                              }
                              error="Amount is required"
                            ></FormError>
                          </div>

                          <div className="text-xxs w-600 mb-3">
                            Number of days (past due date) from which late fee
                            would start applying:
                          </div>
                          <div className="formFieldwrap">
                            <FormInput
                              name="lateFeesDate"
                              onChange={(e) => lateFeeDateChange(e)}
                              type="number"
                              placeholder="Days"
                              value={lateFeesDate}
                              onWheel={(e) => e.target.blur()}
                              onKeyDown={(e) =>
                                symbolsArr.includes(e.key) && e.preventDefault()
                              }
                              min="0"
                            />
                            <FormError
                              show={
                                isLateFees && showError && lateFeesDate === ""
                              }
                              error="Date is required"
                            ></FormError>
                          </div>
                        </>
                      )}
                    </div>
                    {lateFeesDate && (
                      <p className="fs-applylatefine-message">
                        Late fine will be applicable after&nbsp;-&nbsp;
                        <strong className="primary text-xxs">
                          {lateFeesDate}
                        </strong>
                        &nbsp;days past due date
                      </p>
                    )}
                  </div>
                </CardBody>
              </Card>
              <Card className="cardPadding mt-40">
                <CardBody className="mt-20">
                  <p className="text-xs w-600">Fee Description</p>
                  <div className="formFieldwrap mt-10">
                    <div className="formFieldwrap">
                      <TextEditor
                        preFilledData={feeDiscription}
                        currentResponse={(feeDiscription) =>
                          setFeeDiscription(feeDiscription)
                        }
                      />
                      {/* <FormError
                        show={showError && feeDiscriptionError}
                        error="Description is required."
                      /> */}
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="cardPadding FS-Document mt-40">
                <CardBody className="mt-20">
                  <p className="text-xs w-600">
                    {" "}
                    Upload Fees Structure Document
                  </p>
                  <ul className="DashedInstructionList">
                    <li className="text-2xs">
                      Accept only .PDF, .PNG or .JPG file format.
                    </li>
                  </ul>
                  <div className="formFieldwrap mt-15">
                     <UploadButton
                      BtnName="Upload File"
                      IconClassName="icon-file-upload base i-xs"
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
                <CardBody className="mt-20">
                  <p className="text-xs w-600">Terms & Conditions</p>
                  <div className="formFieldwrap mt-10">
                    <TextEditor
                      preFilledData={termCondition}
                      currentResponse={(termCondition) =>
                        setTermCondition(termCondition)
                      }
                    />
                  </div>
                </CardBody>
              </Card>

              {paymentModeActive ? (
                paymentDetailStoreSuccess ? (
                  <button
                    type="button"
                    onClick={() => popUpOpen(true)}
                    className="button button-primary btn-oval btn-sm mt-10"
                  >
                    {/* <i className="ed-icon icon-plus-add white i-xs"></i> */}
                    View Payment Mode
                  </button>
                ) : ""
              ) : (
                <Card className="cardPadding mt-40">
                  <CardBody>
                    <div className="DashedInstructionList">
                      {!paymentDetailStoreSuccess && (
                        <p className="text-xxs">
                          You have not added a mode of payment. Please add first
                          to procees, or save this fee structure to add later.
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => popUpOpen()}
                        className="button button-primary btn-oval btn-sm mt-10"
                      >
                        <i className="ed-icon icon-plus-add white i-xs"></i>
                        {paymentDetailStoreSuccess ? "Edit" : "Add"} Payment
                        Mode
                      </button>
                      &nbsp;&nbsp;
                      {paymentDetailStoreSuccess && (
                        <button
                          type="button"
                          onClick={() => popUpOpen(true)}
                          className="button button-primary btn-oval btn-sm mt-10"
                        >
                          {/* <i className="ed-icon icon-plus-add white i-xs"></i> */}
                          View Payment Mode
                        </button>
                      )}
                      <FormError
                        className="success secondary mt-5"
                        show={paymentDetailStoreSuccess}
                        error="Payment details has been added."
                      />
                      <FormError
                        show={
                          showError &&
                          !paymentModeActive &&
                          !paymentDetailStoreSuccess
                        }
                        error="Payment details is required."
                      />
                    </div>
                  </CardBody>
                </Card>
              )}

              <Modal show={showPaymentPopUp}>
                <ModalHeader closeButton={true} onclose={() => PopUpClose()} />
                <ModalBody className="EditService-MBody">
                  <AddAccountDetails
                    onclose={() => PopUpClose()}
                    viewShow={showView}
                    paymentModeData={paymentModeData}
                  />
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
              <div className="fs-payment-breakdown mt-10">
                <div className="formFieldwrap">
                  <div className="input-custom-type inline">
                    <label className="small">
                      <input
                        type="checkbox"
                        onClick={handlePaymentBrakdown}
                        checked={checked}
                      />
                      Payment Breakdown*&nbsp;&nbsp;
                    </label>
                  </div>
                  <div className="fs-agg-msg text-2xs mb-5">
                    (By clicking on the checkbox, you agree to the payment
                    breakdown)
                  </div>
                  <FormError
                    show={!checked && showError}
                    error="Please accept payment breakdown"
                  ></FormError>

                </div>

              </div>
              {/* <FormError
                show={showError}
                error="Please check the details above."
              ></FormError> */}
              <CenterPopup
                show={publishPopup}
                closeButton={true}
                onclose={() => ClosePublishPopup()}
              >
                <div className="publish-fs-popup-cnt">
                  <div className="center-popupcnt">
                    <p className="text-sm primary w-500">
                      Are you sure,You want to publish fee structure?
                    </p>
                    <p className="text-xxs red w-600 mt-3">
                      <span>Note&nbsp;-&nbsp;</span>Payment cycle cannot be
                      changed in the same academic year
                    </p>
                  </div>
                  <div className="center-popupaction">
                    <button
                      type="button"
                      className="button btn-o-primary primary btn-sm"
                      onClick={() => ClosePublishPopup()}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="button button-primary btn-sm"
                      onClick={handlePublish}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </CenterPopup>
              {checked && (
                <Card className="cardPadding fs-payment-breakdown-content mb-30">
                  <CardBody>
                    <ul className="fs-payment-breakdown-list">
                      <strong>
                        Example :
                      </strong>
                      <li>
                        Payment Amount = <span>₹1000</span>
                      </li>
                      <li>
                        Razorpay transaction fee & GST = <span>3%</span>
                      </li>
                      <li>
                        Amount Transferred to Linked Account ={" "}
                        <span>₹970.00</span>
                      </li>
                    </ul>
                    <div className="fs-powered-by-mode">
                      Powered by - <strong className="primary">Razorpay</strong>
                    </div>
                  </CardBody>
                </Card>
              )}

              {AboveErrorType !== "" && <div className="text-xxs red mb-5">Please check the details above.</div>}
              <div className="FS-DetailActionBtn">
                {doUpdate ? (
                  !isUpdateLoading ? (
                    <button
                      className="button button-theme btn-md"
                      onClick={handleUpdate}
                    >
                      Update Fee Structure
                    </button>
                  ) : (
                    <button className="button button-theme btn-md">Loading...</button>
                  )
                ) : (
                  <>
                    {!isPublishLoading ? (
                      <button
                        className="button button-theme btn-md"
                        onClick={() => handlePublishPopup()}
                      >
                        Publish Fee Structure
                      </button>
                    ) : isPublishLoading && (
                      <button className="button button-theme btn-md">
                        Loading...
                      </button>
                    )}
                    {!isSaveLoading ? (
                      <button
                        className="button btn-o-primary primary btn-md"
                        onClick={handleSave}
                      >
                        Save for later
                      </button>
                    ) : (
                      <button className="button button-theme btn-md">
                        Loading...
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="mt-50">&nbsp;</div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      )}
    </React.Fragment>
  );
};

export default FeeStructureDetail;
