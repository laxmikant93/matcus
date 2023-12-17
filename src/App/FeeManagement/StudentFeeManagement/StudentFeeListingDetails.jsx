/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import AppLink from "../../../Common/AppLink";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import "../../FeeManagement/fee-management.scss";
import { useDispatch, useSelector } from "react-redux";
import { getStudentFee } from "../../../store/actions/feeManagementStudent";
import { useParams } from "react-router-dom";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import ProceedToPay from "./ProceedToPay";
// import { getStudentFeeViewDetails } from "../../../store/actions/feeManagementStudent";
import PreviewFee from "./PreviewFee";

const StudentFeeListingDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { studentFeeData, studentFeeDataSuccess, studentFeeDataLoading } =
    useSelector((state) => {
      return {
        studentFeeData: state.feeManagementStudent.studentFeeData.data,
        // studentFeeDataAccumilativeFee: state.feeManagementStudent.studentFeeData.data,
        studentFeeDataSuccess:
          state.feeManagementStudent.studentFeeData.success,
        studentFeeDataLoading:
          state.feeManagementStudent.studentFeeData.loading,
        instituteData: state.user,
        users: state.user,
      };
    });
  // const { user_institute_institute_address, user_institute_institute_name, user_institute } = instituteData;
  // const { user_fullname } = users;
  const [AccumilativeDueFee, setAccumilativeDueFee] = useState(0);

  useEffect(() => {
    if (!studentFeeDataLoading && studentFeeDataSuccess && studentFeeData) {
      setAccumilativeDueFee(
        studentFeeData.AccumilativeDueFee
          ? studentFeeData.AccumilativeDueFee.AccumilativeDueFee
          : 0
      );
    }
  }, [studentFeeDataLoading, studentFeeDataSuccess, studentFeeData]);


  const [PayItem, setPayItem] = useState("");

  const modalPreviewFeeState = (item) => {
    setPayItem(item);
    setModalPaidFee(!modalPaidFee);
  };
  const modalPayFeeState = (data) => {
    setPayItem(data);
    setProceedToPay(data)
    setModalPayFee(!modalPayFee);
  };

  const showInfoModal = () => {
    setInfoModal(!infoModal);
  };
  const showfeeNotifyPopup = () => setfeeNotifyPopup(!feeNotifyPopup);
  const [modalPaidFee, setModalPaidFee] = useState(false);
  const [proceedToPayItem, setProceedToPay] = useState({});
  const modalPaidFeeState = () => {
    setModalPaidFee(!modalPaidFee);
  };
  const closeModalPaidFeeState = () => {
    setModalPaidFee(!modalPaidFee);
  };

  const [modalPayFee, setModalPayFee] = useState(false);
  const [showReceipt, setShowReceipt] = useState("");
  const modalPayFeeStatePay = (data) => {

    setProceedToPay(data);
    setModalPayFee(!modalPayFee);
  };
  const closeModalPayFeeState = () => {
    setModalPayFee(!modalPayFee);
  };

  const dropdownRef = useRef(null);
  const [feeNotifyPopup, setfeeNotifyPopup] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const [infoModal, setInfoModal] = useDetectOutsideClick(dropdownRef, false);
  const [course, setCourse] = useState();
  const [institute, setInstitute] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    const splitid = id.split("-");
    setCourse(splitid[0]);
    setInstitute(splitid[1]);
    setUser(splitid[2]);
  }, [id]);
  useEffect(() => {
    if (course && institute && user) {
      dispatch(getStudentFee(course, institute, user, ""));
    }
  }, [course, dispatch, institute, user]);
  const [monthPayment, setMonthPayment] = useState("singleMonth");
  const [monthFeeObj, setMonthFeeObj] = useState([]);

  const handleMultipleMonths = (data) => {
    let checkData = monthFeeObj;
    let valueCheck = checkData.findIndex((item) => data._id === item._id);
    if (valueCheck < 0) {
      checkData.push(data);
    } else {
      checkData.splice(valueCheck, 1);
    }
    setMonthFeeObj(checkData);
  };

  const MultiPay = () => {
    if (monthFeeObj.length > 0) {
      let data = {
        _id: [],
        paymentMonth: "",
        feeYear: "",
        feestructure: [],
        feeStudentScholorship: 0,
        feeStudentDiscount: 0,
        totalAmount: 0,
        dueAmmount: AccumilativeDueFee,
      };
      for (let i = 0; i < monthFeeObj.length; i++) {
        if (monthFeeObj[i] === 0) {
          data._id.push(monthFeeObj[i]._id);
          data.paymentMonth = monthFeeObj[i].paymentMonth;
          data.feeYear = monthFeeObj[i].feeYear;
          data.feestructure = monthFeeObj[i].feestructure;
          data.feeStudentScholorship = monthFeeObj[i].feeStudentScholorship;
          data.feeStudentDiscount = monthFeeObj[i].feeStudentDiscount;
          data.totalAmount = monthFeeObj[i].totalAmount;
        } else {
          data._id.push(monthFeeObj[i]._id);
          data.paymentMonth =
            data.paymentMonth + monthFeeObj[i].paymentMonth + `,`;
          data.feeYear = monthFeeObj[i].feeYear;
          data.feestructure = monthFeeObj[i].feestructure;
          data.feeStudentScholorship =
            monthFeeObj[i].feeStudentScholorship + data.feeStudentScholorship;
          data.feeStudentDiscount =
            monthFeeObj[i].feeStudentDiscount + data.feeStudentDiscount;
          data.totalAmount = monthFeeObj[i].totalAmount + data.totalAmount;
        }
      }
      setProceedToPay(data);
      setModalPayFee(!modalPayFee);
    }
  };
  const selectGroup = ["Paid", "Pending"];
  const filterValues = [];
  const handleChange = (type) => {
    switch (type) {
      case "Paid": {
        dispatch(getStudentFee(course, institute, user, type));
        break;
      }
      case "Pending": {
        dispatch(getStudentFee(course, institute, user, type));
        break;
      }
      default: {
        dispatch(getStudentFee(course, institute, user, ""));
      }
    }
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/student/fee-management"
            title="Fee Listing"
          />
          {/* <BreadcrumbItem to="/dashboard/student/fee-listing"
              title="Class Room" /> */}
        </Breadcrumb>
        <div className="pageHeadIntro">
          <div>
            <h1 className="text-sm w-300">Fee Management</h1>
            <p className="text-xxs w-600">
              {studentFeeData.Course && studentFeeData.Course.coursename}
            </p>
          </div>
        </div>
        <div className="pageHeadIntro col2 mt-10 position-relative">
          <div className="itemShow">
            <div>
              <SingleSelectDropdown
                SingleSelectLabelName="Sort by status"
                selectGroup={selectGroup}
                SingleSelectHandel={handleChange}
                filterValues={filterValues}
              />
            </div>
          </div>
          <div className="itemShow">
            <div className="input-custom-type inline">
              <label className="small">
                <input
                  type="radio"
                  onChange={(e) => setMonthPayment("singleMonth")}
                  checked={monthPayment === "singleMonth"}
                />
                Single month payment
              </label>
              <label className="small">
                <input
                  type="radio"
                  onChange={(e) => setMonthPayment("multiMonth")}
                  checked={monthPayment === "multiMonth"}
                  disabled={studentFeeData && studentFeeData.structure && studentFeeData.structure.length > 0 && studentFeeDataSuccess ? false : true}
                />
                Multiple months payment
              </label>
            </div>
          </div>
          <div className="right">
            <div className="itemShow right col2">
              <div className="">
                <button
                  onClick={showfeeNotifyPopup}
                  className="button btn-xs btn-o-red red"
                  disabled={studentFeeData.structure && studentFeeData.structure.length > 0 ? false : true}
                >
                  <span>
                    Fee Notification <i className="w-500 red"></i>
                  </span>
                </button>
                {feeNotifyPopup && (
                  <React.Fragment>
                    <div className="showInlinePopup" ref={dropdownRef}>
                      <span
                        className="closeBtn primary"
                        onClick={() => setfeeNotifyPopup(!feeNotifyPopup)}
                      ></span>
                      {studentFeeDataSuccess &&
                        studentFeeData &&
                        studentFeeData.structure &&
                        studentFeeData.structure
                          .filter((item) => item.feeStatus === "Pending")
                          .slice(0, 1)
                          .map((item, index) => (
                            <div className="itemsRow" key={index}>
                              <p className="text-x w-600">
                                Pay due fee for the amount ₹
                                {item.totalAmount -
                                  item.feeStudentScholorship -
                                  item.feeStudentDiscount}
                              </p>
                              <p className="text-xxs mt-3">
                                {" "}
                                {item.paymentMonth}, {item.feeYear}
                              </p>
                              <p className="mt-5">
                                <button
                                  // onClick={() => modalPayFeeState()}
                                  onClick={() => modalPayFeeState(item)}
                                  className="linkBtn primary btn-xs"
                                >
                                  Pay Fee
                                </button>
                              </p>
                            </div>
                          ))}

                      <div className="itemsRow">
                        {studentFeeData.AccumilativeDueFee !== null ? (
                          <p className="text-x w-600">
                            Total Late Fee Fine ₹
                            {
                              studentFeeData.AccumilativeDueFee
                                .AccumilativeDueFee
                            }
                          </p>
                        ) : (
                          ""
                        )}
                        <p className="text-xxs mt-3"></p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
              <div>
                <button
                  onClick={showInfoModal}
                  className="info-button-sqaure"
                  disabled={studentFeeData.structure && studentFeeData.structure.length > 0 ? false : true}
                >
                  <span>i</span>
                </button>
                {infoModal && (
                  <>
                    <div className="showInlinePopup" ref={dropdownRef}>
                      <span
                        className="closeBtn primary"
                        onClick={() => setInfoModal(!infoModal)}
                      ></span>
                      {studentFeeDataSuccess &&
                        studentFeeData &&
                        studentFeeData.structure &&
                        studentFeeData.structure
                          .filter((item) => item.feeStatus === "Pending")
                          .slice(0, 1)
                          .map((item, index) => (
                            <div className="itemsRow" key={index}>
                              <p className="text-x w-500">
                                Fee : {item.paymentMonth}
                              </p>
                              <p className="text-xs w-700">
                                ₹
                                {item.totalAmount -
                                  item.feeStudentScholorship -
                                  item.feeStudentDiscount}
                              </p>
                            </div>
                          ))}

                      {studentFeeData.AccumilativeDueFee !== null ? (
                        <div className="itemsRow red">
                          <p className="text-x w-500">Total Late Fee Fine</p>
                          <p className="text-xs w-700">
                            ₹
                            {
                              studentFeeData.AccumilativeDueFee
                                .AccumilativeDueFee
                            }
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="gridListTable">
          <ul className="gridHeader numeric">
            {monthPayment === "multiMonth" && <li className="col col-1"></li>}
            <li
              className={
                monthPayment === "multiMonth" ? "col col-2" : "col col-3"
              }
            >
              Year:&nbsp;{new Date().getFullYear()}
            </li>
            <li className="col col-2 n-c">Academic / Tution</li>
            <li className="col col-2 n-c">Discount / Scholarship</li>
            <li className="col col-3 n-c">Total Fee & Status</li>
            <li className="col col-2">&nbsp;</li>
          </ul>
          <div className="gridBody">
            {studentFeeDataSuccess &&
              studentFeeData.structure &&
              studentFeeData.structure.length > 0 ? (
              studentFeeData.structure.map((item, index) => {
                return item.feeStatus === "Pending" ? (
                  <div className="gridRow" key={index}>
                    <ul className="topInfo">
                      {monthPayment === "multiMonth" && (
                        <li className="col col-1">
                          <div className="input-custom-type">
                            <label className="small">
                              <input
                                type="checkbox"
                                name={item.paymentMonth}
                                onChange={() => handleMultipleMonths(item)}
                                value={item}
                              />
                            </label>
                          </div>
                        </li>
                      )}
                      <li
                        className={
                          monthPayment === "multiMonth"
                            ? "col col-2"
                            : "col col-3"
                        }
                        data-head={new Date().getFullYear()}
                      >
                        {item.paymentMonth}
                      </li>
                      <li
                        className="col col-2 n-c"
                        data-head="Academic/Tution"
                      >
                        ₹{item.totalAmount}
                      </li>
                      <li
                        className="col col-2 n-c"
                        data-head="Discount/Scholarship"
                      >
                        ₹{item.feeStudentDiscount}/
                        {item.feeStudentScholorship}
                      </li>
                      {/* <li className="col col-2" data-head="Late Fee Fine">
                          ₹{item.accumilativeFeeDue}
                        </li> */}
                      <li
                        className="col col-3 n-c"
                        data-head="Total Fee & Status"
                      >
                        <div className="text-xs w-600">
                          ₹
                          {item.totalAmount -
                            item.feeStudentScholorship -
                            item.feeStudentDiscount}
                        </div>
                        <div className="mt-3">
                          {monthPayment === "singleMonth" && (
                            <button
                              className="button btn-o-primary btn-xs primary"
                              onClick={() => modalPayFeeStatePay(item)}
                            >
                              Pay now
                            </button>
                          )}
                        </div>
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <button
                            className="btn-square"
                            title="View Fee"
                            onClick={() => {
                              modalPreviewFeeState(item);
                              setShowReceipt("");
                            }}
                          >
                            <span className="cssIcon">
                              <i className="ed-eye"></i>
                            </span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="gridRow" key={index}>
                    <ul className="topInfo">
                      {monthPayment === "multiMonth" && (
                        <li className="col col-1"></li>
                      )}
                      <li
                        className={
                          monthPayment === "multiMonth"
                            ? "col col-2"
                            : "col col-3"
                        }
                      >
                        {item.paymentMonth}
                      </li>
                      <li
                        className="col col-2 n-c"
                        data-head="Academic/Tution"
                      >
                        ₹{item.totalAmount}
                      </li>
                      <li
                        className="col col-2 n-c"
                        data-head="Discount/Scholarship"
                      >
                        ₹{item.feeStudentDiscount}/
                        {item.feeStudentScholorship}
                      </li>
                      <li
                        className="col col-3 n-c"
                        data-head="Total Fee & Status"
                      >
                        <div className="text-xs w-600">
                          ₹{item.totalAmount}
                        </div>
                        <div className="mt-3">
                          <i className="icon-checkMark"></i> Paid
                        </div>
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <AppLink
                            className="btn-square"
                            title="Download Fee Slip"
                            to={`/dashboard/student/student-invoice-print/${item._id}`}
                            target="_blank"
                          >
                            <span className="cssIcon">
                              <i className="ed-download"></i>
                            </span>
                          </AppLink>
                          <button
                            className="btn-square"
                            title="View Fee"
                            onClick={() => {
                              modalPreviewFeeState(item);
                              setShowReceipt("Receipt");
                            }}
                          >
                            <span className="cssIcon">
                              <i className="ed-eye"></i>
                            </span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : studentFeeDataLoading ? (
              <div className="loadingGridData">
                <p>Loading...</p>
              </div>
            ) : (
              <NoDataAvailable title="Record Not Found" />
            )}
          </div>
        </div>
        {monthPayment === "multiMonth" && (
          <button
            type="button"
            className="button btn-sm button-primary mt-20"
            onClick={() => MultiPay()}
          >
            Pay Now
          </button>
        )}
        <ProceedToPay
          closeModalPayFeeState={closeModalPayFeeState}
          modalPayFee={modalPayFee}
          ProceedToPayData={proceedToPayItem}
          AccumilativeFee={AccumilativeDueFee}
          classRoomData={studentFeeData.Course}
        />
        <PreviewFee
          modalPaidFee={modalPaidFee}
          closeModalPaidFeeState={closeModalPaidFeeState}
          PreviewData={PayItem}
          AccumilativeFee={AccumilativeDueFee}
          Receipt={showReceipt}
          classRoomData={studentFeeData.Course}
        />
        {/* <div className={`modal modalShowing-${modalPaidFee}`}>
          <div className="modalwrapper">
            <span
              className="closeModal text-xxs dgray"
              onClick={() => closeModalPaidFeeState()}
            >
              X Close
            </span>
            <div className="modalHead">
              <div>
                <h3 className="text-sm w-300">View Fee Details </h3>

                <h2>{user_fullname}</h2>
                <h5>{studentFeeData.Course.coursename}</h5>
                <h4>{user_institute_institute_name}</h4>
                <h5>{user_institute_institute_address}</h5>
                <hr />
              </div>
            </div>
            <div className="modalbody">
              <h4>Order Summary #7555</h4>
              <div className="pricebreakupTbl">
                <ul>
                  <li>Order Date</li>
                  <li>12 Mar. 2021 4:33pm</li>
                </ul>
                <ul>
                  <li>Invoice No.</li>
                  <li>DLEN7899588</li>
                </ul>
                <ul>
                  <li>Payment Method</li>
                  <li>Net Banking - ICICI Bank</li>
                </ul>
                <ul>
                  <li className="w-600">Paid Amount</li>
                  <li className="w-600">₹7,800</li>
                </ul>
                <ul className="seperator">
                  <li>
                    <hr />
                  </li>
                </ul>
              </div>
              <h4 className="mt-40">Fee Breakups</h4>
              <div className="pricebreakupTbl">
                <ul>
                  <li>Academic/Tution Fee</li>
                  <li>₹4000</li>
                </ul>
                <ul>
                  <li>Cricket</li>
                  <li>₹200</li>
                </ul>
                <ul>
                  <li>Chess</li>
                  <li>₹200</li>
                </ul>
                <ul>
                  <li>Bus Charge</li>
                  <li>₹2000</li>
                </ul>
                <ul className="seperator">
                  <li>
                    <hr />
                  </li>
                </ul>
                <ul>
                  <li>Scholarship (%)</li>
                  <li>- 20% (₹800)</li>
                </ul>
                <ul>
                  <li>Discount (INR)</li>
                  <li>- ₹4000</li>
                </ul>
                <ul className="seperator">
                  <li>
                    <hr />
                  </li>
                </ul>
                <ul>
                  <li className="w-600">Total</li>
                  <li className="w-600">₹7800</li>
                </ul>
                <ul className="seperator">
                  <li>
                    <hr />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </React.Fragment>
    </React.Fragment>
  );
};

export default StudentFeeListingDetails;
