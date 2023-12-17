import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../../../Common/SectionTitle";
import AddPaymentModal from "./AddPaymentModal";
import {
  paymentLists,
  deletePaymentDetails,
  updatePaymentDetails,
} from "../../../../store/actions/paymentmode";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import "./PaymentMode.scss";

const AddedModeDetails = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [paymentEditId, setPaymentEditId] = useState("");

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setPaymentEditId(_id);
    setIsActive(isActive);
  };

  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);
  const [SelectedPaymentOpt, SetSelectedPaymentOpt] = useState("");
  const [updateItem, setUpdateItem] = useState([]);
  const [PopUpClose, setPopUpClose] = useState(false);

  const closeModalState = () => {
    setUpdateItem(null)
    setPopUpClose(!PopUpClose)
    SetScheduleClassModal(!ScheduleClassModal);
  };

  const dispatch = useDispatch();

  const { InstituteID, bankDetails, upiDetails, chequeDetails, paypalDetails } =
    useSelector((state) => {
      return {
        InstituteID: state.user.user_institute,
        bankDetails: state.paymentmode.bankDetails.data,
        upiDetails: state.paymentmode.upiDetails.data,
        chequeDetails: state.paymentmode.chequeDetails.data,
        paypalDetails: state.paymentmode.paypalDetails.data,
        allPaymentList: state.paymentmode.allPaymentList.data,
      };
    });

  useEffect(() => {
    dispatch(paymentLists(InstituteID));
  }, [dispatch, InstituteID]);

  const [bankData, setBankData] = useState([]);
  const [upiData, setUpiData] = useState([]);
  const [chequeData, setChequeData] = useState([]);
  const [paypalData, setPaypalData] = useState([]);

  useEffect(() => {
    setUpiData([...upiDetails]);
    setBankData([...bankDetails]);
    setChequeData([...chequeDetails]);
    setPaypalData([...paypalDetails]);
  }, [upiDetails, bankDetails, chequeDetails, paypalDetails]);

  var total =
    upiDetails.length +
    bankDetails.length;

  const updateBankDetails = (item) => {
    setPopUpClose(!PopUpClose)
    SetScheduleClassModal(!ScheduleClassModal);
    SetSelectedPaymentOpt("bank");
    setUpdateItem(item);
  };
  const updateChequeDetails = (item) => {
    setPopUpClose(!PopUpClose)
    SetScheduleClassModal(!ScheduleClassModal);
    SetSelectedPaymentOpt("cheque");
    setUpdateItem(item);
  };
  const updateUpiDetails = (item) => {
    setPopUpClose(!PopUpClose)
    SetScheduleClassModal(!ScheduleClassModal);
    SetSelectedPaymentOpt("upi");
    setUpdateItem(item);
  };
  const updatePaypalDetails = (item) => {
    setPopUpClose(!PopUpClose)
    SetScheduleClassModal(!ScheduleClassModal);
    SetSelectedPaymentOpt("paypal");
    setUpdateItem(item);
  };
  const activeStatusToogle = (item) => {
    const setStatus =
      item.status === "Inactive"
        ? { status: "Active" }
        : { status: "Inactive" };
    dispatch(updatePaymentDetails(item._id, setStatus));
    dispatch(paymentLists(InstituteID));
    dispatch(paymentLists(InstituteID));
  };

  const deletePayment = (id) => {
    dispatch(deletePaymentDetails(id));
  };
  const [paymentTab, setPaymentTab] = useState('tabModeBank');
  return (
    <React.Fragment>
      <>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
          <BreadcrumbItem to="/payment-mode-details" title="Payment Method" />
        </Breadcrumb>
        <div className="PageTopHead PTH-PaymentMode mt-30">
          <div className="PTH-Item">
            <p className="text-sm">
              <span>{total}&nbsp;</span>Payment Method
            </p>
          </div>
        </div>
        <SelectTitle type="paymentSelect" />
        <div className="scrollCntWrap mt-20">
          <ul className="tabsBtnNav">
            <li
              className={paymentTab === 'tabModeBank' ? 'active' : ''}
              onClick={() => setPaymentTab(paymentTab === "tabModeBank" ? "default" : "tabModeBank"
              )}>Bank</li>
            <li
              className={paymentTab === 'tabModeUpi' ? 'active' : ''}
              onClick={() => setPaymentTab(paymentTab === "tabModeUpi" ? "default" : "tabModeUpi"
              )}>UPI</li>
          </ul>
        </div>
        <div className="">
          {paymentTab === "tabModeCheque" ? (
            <div className="paymentTabItem">
              {chequeDetails &&
                chequeData.map((item, key) => {
                  return (
                    <div key={key} className="AddedPaymentModeWrap">
                      <div className="AddedModeItemHead">
                        <p className="text-xs w-700">{item.cancelledCheque.bankname ? item.cancelledCheque.bankname : 'Cheque'}</p>
                        <div className="actionBtnCustom">
                          <div className="groupBtn">
                            <button
                              className={item.status === "Active" ? "active" : ""}
                              onClick={() => {
                                activeStatusToogle(item);
                              }}
                            >
                              {item.status}
                            </button>
                            <button
                              onClick={() => {
                                updateChequeDetails(item);
                              }}
                            >
                              Update{" "}
                            </button>
                            <button
                              onClick={(e) => {
                                onClickBtnDropDownRemove(item._id, true);
                              }}
                            >
                              Remove{" "}
                            </button>
                          </div>
                          {item._id === paymentEditId && (
                            <div
                              ref={dropdownRef}
                              className={`popup removePopup ${isActive ? "active" : "inactive"
                                }`}
                            >
                              <p className="heading text-xxs">
                                You are about to remove this cheque detail.
                              </p>
                              <p className="sub-heading text-xxs">Are you sure?</p>
                              <div className="removePopBtn">
                                <button
                                  className="button btn-o-silver dgray btn-sm"
                                  onClick={() =>
                                    onClickBtnDropDownRemove(item._id, false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="button button-red btn-sm"
                                  onClick={() => {
                                    deletePayment(item._id);
                                    dispatch(paymentLists(InstituteID));
                                    dispatch(paymentLists(InstituteID));
                                    onClickBtnDropDownRemove(item._id, false)
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <ul className="AddedChequeModeItem">
                        <li>
                          <p className="text-xxs">Bank Name</p>
                          <p className="text-xxs">{item.cancelledCheque.bankname}</p>
                        </li>
                        <li>
                          <p className="text-xxs mt-10">Payee Name</p>
                          <p className="text-xxs">{item.cancelledCheque.payto}</p>
                        </li>
                        <li className="AddedChequePhoto">
                          <p className="text-xxs">Cancelled Cheque Sample</p>
                          {item.cancelledCheque.upload ? (
                            <img
                              src={item.cancelledCheque.upload}
                              alt="cancelled cheque"
                            />
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>
                    </div>
                  );
                })}
              <div className="btmBtnWrap">
                {chequeData.length > 0 && chequeData.length < 5 && (
                  <button
                    className="button btn-sm button-primary"
                    onClick={() => {
                      SetScheduleClassModal(!ScheduleClassModal);
                      SetSelectedPaymentOpt("cheque");
                      setUpdateItem(null);
                    }}
                  >
                    Upload More Cheque
                  </button>
                )}
                {!chequeDetails.length && (
                  <button
                    className="button btn-sm button-primary"
                    onClick={() => {
                      SetScheduleClassModal(!ScheduleClassModal);
                      SetSelectedPaymentOpt("cheque");
                      setUpdateItem(null);
                    }}
                  >
                    Upload Cheque
                  </button>
                )}
              </div>
            </div>
          ) : paymentTab === "tabModeUpi" ? (
            <div className="paymentTabItem">
              {upiDetails &&
                upiData.map((item, key) => {
                  return (
                    <div key={key} className="AddedPaymentModeWrap">
                      <div className="AddedModeItemHead">
                        <p className="text-xs w-700">{item.addUpi.name ? item.addUpi.name : 'UPI Details'}</p>
                        <div className="actionBtnCustom">
                          <div className="groupBtn">
                            <button
                              className={item.status === "Active" ? "active" : ""}
                              onClick={() => {
                                activeStatusToogle(item);
                              }}
                            >
                              {item.status}
                            </button>
                            <button
                              onClick={() => {
                                updateUpiDetails(item);
                              }}
                            >
                              {" "}
                              Update{" "}
                            </button>
                            <button
                              onClick={(e) => {
                                onClickBtnDropDownRemove(item._id, true);
                              }}
                            >
                              Remove{" "}
                            </button>
                          </div>
                          {item._id === paymentEditId && (
                            <div
                              ref={dropdownRef}
                              className={`popup removePopup ${isActive ? "active" : "inactive"
                                }`}
                            >
                              <p className="heading text-xxs">
                                You are about to remove this UPI detail.
                              </p>
                              <p className="sub-heading text-xxs">Are you sure?</p>
                              <div className="removePopBtn">
                                <button
                                  className="button btn-o-silver dgray btn-sm"
                                  onClick={() =>
                                    onClickBtnDropDownRemove(item._id, false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="button button-red btn-sm"
                                  onClick={() => {
                                    deletePayment(item._id);
                                    dispatch(paymentLists(InstituteID));
                                    dispatch(paymentLists(InstituteID));
                                    onClickBtnDropDownRemove(item._id, false)
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <ul className="AddedUpiModeItem">
                        <li>
                          <p className="text-xxs">Merchant ID</p>
                          <p className="text-xxs">{item.addUpi.merchantID}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Merchant's Mobile Number</p>
                          <p className="text-xxs">{item.addUpi.merchantmobile}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Merchant Name</p>
                          <p className="text-xxs">{item.addUpi.merchantname}</p>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              <div className="btmBtnWrap">
                {upiData.length > 0 && upiData.length < 5 && (
                  <button
                    className="button btn-sm button-primary"
                    onClick={() => {
                      SetScheduleClassModal(!ScheduleClassModal);
                      SetSelectedPaymentOpt("upi");
                      setUpdateItem(null);
                    }}
                  >
                    Add More
                  </button>
                )}
                {!upiDetails.length && (
                  <button
                    className="button btn-sm button-primary"
                    onClick={() => {
                      SetScheduleClassModal(!ScheduleClassModal);
                      SetSelectedPaymentOpt("upi");
                      setUpdateItem(null);
                    }}
                  >
                    Add UPI
                  </button>
                )}
              </div>
            </div>
          ) : paymentTab === "tabModePaypal" ? (
            <div className="paymentTabItem">
              {paypalDetails &&
                paypalData.map((item, key) => {
                  return (
                    <div key={key} className="AddedPaymentModeWrap">
                      <div className="AddedModeItemHead">
                        <p className="text-xs w-700">{item.addPaypal.id ? item.addPaypal.id : 'Paypal'}</p>
                        <div className="actionBtnCustom">
                          <div className="groupBtn">
                            <button
                              className={item.status === "Active" ? "active" : ""}
                              onClick={() => {
                                activeStatusToogle(item);
                              }}
                            >
                              {item.status}
                            </button>
                            <button
                              onClick={() => {
                                updatePaypalDetails(item);
                              }}
                            >
                              Update
                            </button>
                            <button
                              onClick={(e) => {
                                onClickBtnDropDownRemove(item._id, true);
                              }}
                            >
                              Remove{" "}
                            </button>
                          </div>
                          {item._id === paymentEditId && (
                            <div
                              ref={dropdownRef}
                              className={`popup removePopup ${isActive ? "active" : "inactive"
                                }`}
                            >
                              <p className="heading text-xxs">
                                You are about to remove this PayPal detail.
                              </p>
                              <p className="sub-heading text-xxs">Are you sure?</p>
                              <div className="removePopBtn">
                                <button
                                  className="button btn-o-silver dgray btn-sm"
                                  onClick={() =>
                                    onClickBtnDropDownRemove(item._id, false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="button button-red btn-sm"
                                  onClick={() => {
                                    deletePayment(item._id);
                                    dispatch(paymentLists(InstituteID));
                                    dispatch(paymentLists(InstituteID));

                                    onClickBtnDropDownRemove(item._id, false)
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <ul className="AddedUpiModeItem">
                        <li>
                          <p className="text-xxs">Paypal ID</p>
                          <p className="text-xxs">{item.addPaypal.id}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Paypal Email</p>
                          <p className="text-xxs">{item.addPaypal.email}</p>
                        </li>
                        <li>&nbsp;</li>
                        <li>&nbsp;</li>
                        <li>
                          <p className="text-xxs">Button Code</p>
                          <p className="text-xxs">{item.addPaypal.code}</p>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              <div className="btmBtnWrap">
                {paypalData.length > 0 && paypalData.length < 5 && (
                  <button
                    className="button btn-sm button-primary"
                    onClick={() => {
                      SetScheduleClassModal(!ScheduleClassModal);
                      SetSelectedPaymentOpt("paypal");
                      setUpdateItem(null);
                    }}
                  >
                    Add More
                  </button>
                )}
                {!paypalDetails.length && (
                  <button
                    className="button btn-sm button-primary"
                    onClick={() => {
                      SetScheduleClassModal(!ScheduleClassModal);
                      SetSelectedPaymentOpt("paypal");
                      setUpdateItem(null);
                    }}
                  >
                    Add Paypal A/C
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="paymentTabItem">
              {bankDetails &&
                bankData.map((item, key) => {
                  return (
                    <div key={key} className="AddedPaymentModeWrap">
                      <div className="AddedModeItemHead">
                        <p className="text-xs w-700">{item.bankDetails.bankname ? item.bankDetails.bankname : 'Bank Details'}</p>
                        <div className="actionBtnCustom">
                          <div className="groupBtn">
                            <button
                              className={item.status === "Active" ? "active" : ""}
                              onClick={() => {
                                activeStatusToogle(item);
                              }}
                            >
                              {item.status}
                            </button>
                            <button
                              onClick={() => {
                                updateBankDetails(item);
                              }}
                            >
                              Update{" "}
                            </button>
                            <button
                              onClick={(e) => {
                                onClickBtnDropDownRemove(item._id, true);
                              }}
                            >
                              Remove{" "}
                            </button>
                          </div>
                          {item._id === paymentEditId && (
                            <div
                              ref={dropdownRef}
                              className={`popup removePopup ${isActive ? "active" : "inactive"
                                }`}
                            >
                              <p className="heading text-xs w-600">
                                You are about to remove this bank detail.
                              </p>
                              <p className="sub-heading red text-xxs">Are you sure?</p>
                              <div className="removePopBtn">
                                <button
                                  className="button btn-o-silver dgray btn-sm"
                                  onClick={() =>
                                    onClickBtnDropDownRemove(item._id, false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="button button-red btn-sm"
                                  onClick={() => {
                                    deletePayment(item._id);
                                    dispatch(paymentLists(InstituteID));
                                    dispatch(paymentLists(InstituteID));

                                    onClickBtnDropDownRemove(item._id, false)
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <ul className="AddedBankModeItem">
                        <li>
                          <p className="text-xxs">A/c Name</p>
                          <p className="text-xs w-700">{item.bankDetails.acname}</p>
                        </li>
                        <li>
                          <p className="text-xxs">A/c Number</p>
                          <p className="text-xs w-700">{item.bankDetails.acnumber}</p>
                        </li>
                        <li>
                          <p className="text-xxs">IFSC Code</p>
                          <p className="text-xs w-700">{item.bankDetails.ifscCode}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Branch Name</p>
                          <p className="text-xs w-700">{item.bankDetails.branchname}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Branch Address</p>
                          <p className="text-xs w-700">{item.bankDetails.branchaddress}</p>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              <div className="btmBtnWrap">
                {bankData.length > 0 && bankData.length < 5 && (
                  <button
                    className="button btn-sm button-primary"
                    onClick={() => {
                      SetScheduleClassModal(!ScheduleClassModal);
                      SetSelectedPaymentOpt("bank");
                      setUpdateItem(null);
                    }}
                  >
                    Add More
                  </button>
                )}
                {!bankDetails.length && (
                  <button
                    className="button btn-sm button-primary"
                    onClick={() => {
                      SetScheduleClassModal(!ScheduleClassModal);
                      SetSelectedPaymentOpt("bank");
                      setUpdateItem(null);
                    }}
                  >
                    Add Bank Details
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </>
      <div className={`modal modalShowing-${ScheduleClassModal}`}>
        <AddPaymentModal
          updateItem={updateItem}
          selected={SelectedPaymentOpt}
          onclose={closeModalState}
          show={ScheduleClassModal}
          PopUpClose={PopUpClose}
        />
      </div>
    </React.Fragment>
  );
};

export default AddedModeDetails;
