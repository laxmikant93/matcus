import React, { useReducer, useEffect, useState } from "react";
import AppLink from "../Common/AppLink";
import Card from "../Common/Card/index";
import CardBody from "../Common/Card/CardBody";
import CardAction from "../Common/Card/CardAction";
import ComponentLoader from "../Common/Loader/ComponentLoader";
import Request from "../Classes/Request";
import Modal from "../Common/Modal";
import ModalHeader from "../Common/Modal/ModalHeader";
import ModalBody from "../Common/Modal/ModalBody";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import FormatText from "../Common/FormatText";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";
import PaymentMode from "./WebsiteComponents/PaymentMode";
const InstituteFeesRequest = new Request();
let limit = 9;
const feeStructureUrl = InstituteFeesRequest.url(
  "/fee/feestructure?institute=__INSTITUTE_ID__&limit=__LIMIT__&skip=__SKIP__&status=Active"
);
const paymentModesUrl = InstituteFeesRequest.url(
  "/fee/feestructure/__FEES__ID__?institute=__INSTITUTE_ID__"
);
// Actions
const insFreeStructurections = {
  INS_FEES_LOADING: "INS_FEES_LOADING",
  INS_FEES_LOADED: "INS_FEES_LOADED",
  INS_FEES_LOADING_ERROR: "INS_FEES_LOADING_ERROR",
  INS_FEES_MORE_LOADING: "INS_FEES_MORE_LOADING",
  INS_FEES_MORE_LOADED: "INS_FEES_MORE_LOADED",
  INS_FEES_MORE_LOADING_ERROR: "INS_FEES_MORE_LOADING_ERROR",
  INS_FEES_OPEN_POPUP: "INS_FEES_OPEN_POPUP",
  INS_FEES_CLOSE_POPUP: "INS_FEES_CLOSE_POPUP",
  INS_FEES_PAYMD_LOADING: "INS_FEES_PAYMD_LOADING",
  INS_FEES_PAYMD_LOADED: "INS_FEES_PAYMD_LOADED",
  INS_FEES_PAYMD_LOADING_ERROR: "INS_FEES_PAYMD_LOADING_ERROR",
};

// initail states
const insFeesInitStates = {
  data: [],
  total: 0,
  skip: 0,
  loading: false,
  error: false,
  more: false,
  moreloading: false,
  detailPopup: false,
  detail: {},
  paymentMode: {
    loading: false,
    error: false,
    list: {
      bankModes: [],
      upiModes: [],
      chequeModes: [],
      paypalModes: [],
    },
  },
};

// self reducer method
const feestructureReducer = (_state, { type, payload }) => {
  switch (type) {
    case insFreeStructurections.INS_FEES_LOADING:
      return {
        ..._state,
        loading: true,
      };

    case insFreeStructurections.INS_FEES_LOADED:
      return {
        ..._state,
        loading: false,
        data: payload,
        more: payload.length === limit,
      };

    case insFreeStructurections.INS_FEES_MORE_LOADING:
      return {
        ..._state,
        moreloading: true,
      };

    case insFreeStructurections.INS_FEES_MORE_LOADED:
      return {
        ..._state,
        moreloading: false,
        data: _state.data.concat(payload),
        more: payload.length === limit,
      };

    case insFreeStructurections.INS_FEES_OPEN_POPUP:
      return {
        ..._state,
        detailPopup: true,
        detail: _state.data.find((vacancy) => vacancy._id === payload._id),
      };

    case insFreeStructurections.INS_FEES_CLOSE_POPUP:
      return {
        ..._state,
        detailPopup: false,
        detail: {},
        paymentMode: insFeesInitStates.paymentMode,
      };

    case insFreeStructurections.INS_FEES_PAYMD_LOADING:
      return {
        ..._state,
        paymentMode: {
          ..._state.paymentMode,
          loading: true,
        },
      };

    case insFreeStructurections.INS_FEES_PAYMD_LOADED:
      return {
        ..._state,
        paymentMode: {
          ..._state.paymentMode,
          loading: false,
          error: false,
          list: payload,
        },
      };

    default:
      return _state;
  }
};
const FeeStructure = ({ instituteid, ShowFSLimit, homePage, disabledButton = false }) => {
  limit = ShowFSLimit ? ShowFSLimit : 9;

  const insWebsiteDetails = useSelector(
    (state) => state.institutewebsite.heading
  );
  const [state, dispatch] = useReducer(feestructureReducer, insFeesInitStates);
  const fetchFeesList = () => {
    dispatch({ type: insFreeStructurections.INS_FEES_LOADING, payload: {} });
    InstituteFeesRequest.get(
      feeStructureUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", 0),
      (success) => {
        dispatch({
          type: insFreeStructurections.INS_FEES_LOADED,
          payload: success.data && success.data.allfeeInfo ? success.data.allfeeInfo : [],
        });
      },
      (error) => { }
    );
  };

  const fetchFeeModeList = (feesid) => {
    dispatch({
      type: insFreeStructurections.INS_FEES_PAYMD_LOADING,
      payload: {},
    });
    InstituteFeesRequest.get(
      paymentModesUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__FEES__ID__", feesid),
      (success) => {
        dispatch({
          type: insFreeStructurections.INS_FEES_PAYMD_LOADED,
          payload: {
            bankModes: success.data.bankArr || [],
            upiModes: success.data.upiArr || [],
            chequeModes: success.data.chequeArr || [],
            paypalModes: success.data.paypalArr || [],
          },
        });
      },
      (error) => { }
    );
  };

  const fetchFeesListMore = () => {
    dispatch({
      type: insFreeStructurections.INS_FEES_MORE_LOADING,
      payload: {},
    });
    InstituteFeesRequest.get(
      feeStructureUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", state.data.length),
      (success) => {
        dispatch({
          type: insFreeStructurections.INS_FEES_MORE_LOADED,
          payload: success.data.allfeeInfo,
        });
      },
      (error) => { }
    );
  };

  const openFeesPopup = (_id) => {
    dispatch({
      type: insFreeStructurections.INS_FEES_OPEN_POPUP,
      payload: { _id },
    });

    fetchFeeModeList(_id);
  };

  const closeFeesPopup = () => {
    dispatch({
      type: insFreeStructurections.INS_FEES_CLOSE_POPUP,
      payload: {},
    });
  };

  const totalAmount = (payCycle, amount) => {
    switch (payCycle) {
      case "one time":
        return amount * 1;
      case "halfYearly":
        return amount * 2;
      case "quarterly":
        return amount * 4;
      case "monthly":
        return amount * 12;
      default:
        return amount * 1;
    }
  };

  useEffect(fetchFeesList, [instituteid]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { users, instituteWebsite } = useSelector((state) => {
    return {
      instituteWebsite: state.institutewebsite.data,
      users: state.user,
    };
  });

  useEffect(() => {
    if (users.token) {
      if (
        users._id === instituteWebsite.owner &&
        users.user_activeRole === process.env.REACT_APP_PAGE_OWNER &&
        users.user_institute_institute_subdomain ===
        instituteWebsite.institute_subdomain
      ) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [users, instituteWebsite]);
  return (
    <React.Fragment>
      {
        homePage ?
          state.data.length > 0 && (
            <div className="FeeStructureWrapper">
              <div className="sectionCntrWrap">
                <div className="PageTopHead">
                  <DynamicHeaderConsumer>
                    {(value) => (
                      <div className="PTH-Item secHeadWrap">
                        <h3 className="heading">{value.feehead || "Fee Structure"}</h3>
                        <p className="subheading">
                          {value.feesubhead ||
                            "We believe in transparency, trust and value creation"}
                          .
                        </p>
                      </div>
                    )}
                  </DynamicHeaderConsumer>
                </div>

                {state.error ? (
                  <div>
                    Error in fetching the details
                    <button onClick={() => fetchFeesList()}>Reload</button>
                  </div>
                ) : state.loading ? (
                  <ComponentLoader />
                ) : state.data.length > 0 ? (
                  <div className="FeeStructureGallery">
                    {state.data.map((feeStructure) => (
                      <Card key={feeStructure._id} className="FS-Card">
                        <CardBody className="FS-CardBody">
                          <p className="text-xs w-600">{feeStructure.title}</p>
                          {feeStructure.description && (
                            <FormatText text={feeStructure.description}>
                              {({ formatedText }) => (
                                <p className="sun-editor-output"
                                  dangerouslySetInnerHTML={{ __html: formatedText }}
                                ></p>
                              )}
                            </FormatText>
                          )}
                        </CardBody>
                        <CardAction className="FS-Action centerDisp">
                          <p
                            className="btnLink"
                            onClick={() => {
                              openFeesPopup(feeStructure._id);
                            }}
                          >
                            View{" "}
                            {insWebsiteDetails.feehead
                              ? insWebsiteDetails.feehead
                              : "Fee Structure"}
                          </p>
                        </CardAction>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <React.Fragment>
                        <p className="text-xxs">
                          You have not added a fee structure. Your visitors are
                          interested in this information.
                        </p>
                        {!disabledButton ? (
                          <AppLink
                            className="button mt-20"
                            to="/fee-structure"
                            target="_blank"
                          >
                            Add{" "}
                            {insWebsiteDetails.feehead
                              ? insWebsiteDetails.feehead
                              : "Fee Structure"}
                          </AppLink>
                        ) : (
                          <button className="button mt-20" target="_blank">
                            Add{" "}
                            {insWebsiteDetails.feehead
                              ? insWebsiteDetails.feehead
                              : "Fee Structure"}
                          </button>
                        )}
                      </React.Fragment>
                    ) : (
                      `No ${insWebsiteDetails.feehead
                        ? insWebsiteDetails.feehead
                        : "Fee Structure"}`
                    )}
                  </>
                )}
                {state.data.length > 0 ? (
                  <React.Fragment>
                    {ShowFSLimit ? (
                      <NavLink className="button mt-20" to="/feestructure">
                        View all{" "}
                        {insWebsiteDetails.feehead
                          ? insWebsiteDetails.feehead
                          : "Fee Structure"}
                      </NavLink>
                    ) : (
                      <React.Fragment>
                        {state.moreloading ? (
                          <button type="button" className="button mt-20">
                            Loading...
                          </button>
                        ) : (
                          state.more && (
                            <span
                              className="button mt-20"
                              onClick={() => fetchFeesListMore()}
                            >
                              View{" "}
                              {insWebsiteDetails.feehead
                                ? insWebsiteDetails.feehead
                                : "Fee Structure"}
                            </span>
                          )
                        )}
                      </React.Fragment>
                    )}{" "}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
              <Modal
                className="ViewFeeStructureWrap"
                ModalSize="modal-m"
                show={state.detailPopup}
              >
                <ModalHeader
                  title={state.detail.title}
                  subtitle={state.detail.class}
                  SubTitleClass=""
                  TitleClass=""
                  closeButton={true}
                  onclose={closeFeesPopup}
                />
                <ModalBody>
                  <div className="PageTopHead PTH-ViewFeeStructure mt-30">
                    <div className="PTH-Item">
                      <p className="subheading">Fee Breakup</p>
                      <p className="sub-heading w-300n text-xxs">
                        All fee in Indian rupee <strong>(&#8377;)</strong>
                      </p>
                    </div>
                    {state.detail.document&&state.detail.document.src && (
                      <div className="PTH-Item P-Right">
                        <a
                          href={state.detail.document.src}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="button"
                        >
                          Download Attachement
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="gridTable mt-20">
                    <table>
                      <thead>
                        <tr>
                          <th width="40%">Fee Type</th>
                          <th width="20%">Amount</th>
                          <th width="25%">Payment Cycle</th>
                          <th width="15%">Total </th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.detail.feestructure &&
                          state.detail.feestructure.length ? (
                          state.detail.feestructure.map((feeOption) => (
                            <tr key={feeOption._id}>
                              <td data-column="Fee Type">{feeOption.type}</td>
                              <td data-column="Amount">{feeOption.amount}</td>
                              <td data-column="Payment">{feeOption.paymentCycle}</td>
                              <td data-column="Total">
                                {totalAmount(feeOption.paymentCycle, feeOption.amount)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4}>No information available</td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="text-right" colSpan="3">
                            Grand Total {state.detail.paymentCycle !== "" && state.detail.paymentCycle === "quarterly" ? "(Quarterly)" : state.detail.paymentCycle === "one time" ?
                              "(One time)" : state.detail.paymentCycle === "halfYearly" ? "(Half Yearly)" :
                                state.detail.paymentCycle === "monthly" ? "(Monthly)" : ""}
                          </td>
                          <td>{state.detail.fee}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="ViewFeeStructure-FD mt-20">
                    <p className="text-xs w-600">Fee Description</p>
                    {state.detail.description && (
                      <FormatText text={state.detail.description}>
                        {({ formatedText }) => (
                          <p
                            className="text-xxs sun-editor-output"
                            dangerouslySetInnerHTML={{ __html: formatedText }}
                          ></p>
                        )}
                      </FormatText>
                    )}
                  </div>
                  <div className="ViewFeeStructure-TC mt-20">
                    <p className="text-xs w-600">Term & Conditions</p>
                    {state.detail.terms && (
                      <FormatText text={state.detail.terms}>
                        {({ formatedText }) => (
                          <p className="sun-editor-output" dangerouslySetInnerHTML={{ __html: formatedText }}></p>
                        )}
                      </FormatText>
                    )}
                  </div>

                  {state.detail.paymentMode && state.detail.paymentMode.length && (
                    <div className="ViewFeeStructure-PAM mt-20">
                      <p className="text-xs w-600">Payment Accept Mode</p>
                      {state.paymentMode.loading ? (
                        <div>Loading...</div>
                      ) : state.paymentMode.list.bankModes.length ||
                        state.paymentMode.list.upiModes.length ||
                        state.paymentMode.list.chequeModes.length ||
                        state.paymentMode.list.paypalModes.length ? (
                        <React.Fragment>
                          {state.paymentMode.list.bankModes.length > 0 && (
                            <PaymentMode
                              title="Bank Transfer"
                              type="bank"
                              options={state.paymentMode.list.bankModes}
                            />
                          )}
                          {state.paymentMode.list.upiModes.length > 0 && (
                            <PaymentMode
                              title="UPI Payment"
                              type="upi"
                              options={state.paymentMode.list.upiModes}
                            />
                          )}
                          {state.paymentMode.list.chequeModes.length > 0 && (
                            <PaymentMode
                              title="Cheque Payment"
                              type="cheque"
                              options={state.paymentMode.list.chequeModes}
                            />
                          )}
                          {state.paymentMode.list.paypalModes.length > 0 && (
                            <PaymentMode
                              title="Paypal Payment"
                              type="paypal"
                              options={state.paymentMode.list.paypalModes}
                            />
                          )}
                        </React.Fragment>
                      ) : (
                        <div className="mt-15">No Payment Mode Available.</div>
                      )}
                    </div>
                  )}
                </ModalBody>
              </Modal>
            </div>
          ) : (
            <div className="FeeStructureWrapper">
              <div className="sectionCntrWrap">
                <div className="PageTopHead">
                  <DynamicHeaderConsumer>
                    {(value) => (
                      <div className="PTH-Item secHeadWrap">
                        <h3 className="heading">{value.feehead || "Fee Structure"}</h3>
                        <p className="subheading">
                          {value.feesubhead ||
                            "We believe in transparency, trust and value creation"}
                          .
                        </p>
                      </div>
                    )}
                  </DynamicHeaderConsumer>
                </div>

                {state.error ? (
                  <div>
                    Error in fetching the details
                    <button onClick={() => fetchFeesList()}>Reload</button>
                  </div>
                ) : state.loading ? (
                  <ComponentLoader />
                ) : state.data.length > 0 ? (
                  <div className="FeeStructureGallery">
                    {state.data.map((feeStructure) => (
                      <Card key={feeStructure._id} className="FS-Card">
                        <CardBody className="FS-CardBody">
                          <p className="text-xs w-600">{feeStructure.title}</p>
                          {feeStructure.description && (
                            <FormatText text={feeStructure.description}>
                              {({ formatedText }) => (
                                <p className="sun-editor-output"
                                  dangerouslySetInnerHTML={{ __html: formatedText }}
                                ></p>
                              )}
                            </FormatText>
                          )}
                        </CardBody>
                        <CardAction className="FS-Action centerDisp">
                          <p
                            className="btnLink"
                            onClick={() => {
                              openFeesPopup(feeStructure._id);
                            }}
                          >
                            View{" "}
                            {insWebsiteDetails.feehead
                              ? insWebsiteDetails.feehead
                              : "Fee Structure"}
                          </p>
                        </CardAction>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <React.Fragment>
                        <p className="text-xxs">
                          You have not added a fee structure. Your visitors are
                          interested in this information.
                        </p>
                        {!disabledButton ? (
                          <AppLink
                            className="button mt-20"
                            to="/fee-structure"
                            target="_blank"
                          >
                            Add{" "}
                            {insWebsiteDetails.feehead
                              ? insWebsiteDetails.feehead
                              : "Fee Structure"}
                          </AppLink>
                        ) : (
                          <button className="button mt-20" target="_blank">
                            Add{" "}
                            {insWebsiteDetails.feehead
                              ? insWebsiteDetails.feehead
                              : "Fee Structure"}
                          </button>
                        )}
                      </React.Fragment>
                    ) : (
                      `No ${insWebsiteDetails.feehead
                        ? insWebsiteDetails.feehead
                        : "Fee Structure"}`
                    )}
                  </>
                )}
                {state.data.length > 0 ? (
                  <React.Fragment>
                    {ShowFSLimit ? (
                      <NavLink className="button mt-20" to="/feestructure">
                        View all{" "}
                        {insWebsiteDetails.feehead
                          ? insWebsiteDetails.feehead
                          : "Fee Structure"}
                      </NavLink>
                    ) : (
                      <React.Fragment>
                        {state.moreloading ? (
                          <button type="button" className="button mt-20">
                            Loading...
                          </button>
                        ) : (
                          state.more && (
                            <span
                              className="button mt-20"
                              onClick={() => fetchFeesListMore()}
                            >
                              View{" "}
                              {insWebsiteDetails.feehead
                                ? insWebsiteDetails.feehead
                                : "Fee Structure"}
                            </span>
                          )
                        )}
                      </React.Fragment>
                    )}{" "}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
              <Modal
                className="ViewFeeStructureWrap"
                ModalSize="modal-m"
                show={state.detailPopup}
              >
                <ModalHeader
                  title={state.detail.title}
                  subtitle={state.detail.class}
                  SubTitleClass=""
                  TitleClass=""
                  closeButton={true}
                  onclose={closeFeesPopup}
                />
                <ModalBody>
                  <div className="PageTopHead PTH-ViewFeeStructure mt-30">
                    <div className="PTH-Item">
                      <p className="subheading">Fee Breakup</p>
                      <p className="sub-heading w-300n text-xxs">
                        All fee in Indian rupee <strong>(&#8377;)</strong>
                      </p>
                    </div>
                    {state.detail.document &&state.detail.document.src&& (
                      <div className="PTH-Item P-Right">
                        <a
                          href={state.detail.document.src}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="button"
                        >
                          Download Attachement
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="gridTable mt-20">
                    <table>
                      <thead>
                        <tr>
                          <th width="40%">Fee Type</th>
                          <th width="20%">Amount</th>
                          <th width="25%">Payment Cycle</th>
                          <th width="15%">Total </th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.detail.feestructure &&
                          state.detail.feestructure.length ? (
                          state.detail.feestructure.map((feeOption) => (
                            <tr key={feeOption._id}>
                              <td data-column="Fee Type">{feeOption.type}</td>
                              <td data-column="Amount">{feeOption.amount}</td>
                              <td data-column="Payment">{feeOption.paymentCycle}</td>
                              <td data-column="Total">
                                {
                                  state.detail.feeType === "rupees" ? (
                                    <i className="primary w-600">&#8377; </i>
                                  ) : (
                                    ""
                                  )
                                }
                                {state.detail.feeType === "usd" ? (
                                  <i className="primary w-600">&#36; </i>
                                ) : (
                                  ""
                                )}
                                {state.detail.feeType === "euro" ? (
                                  <i className="primary w-600">&euro; </i>
                                ) : (
                                  ""
                                )}
                                {totalAmount(feeOption.paymentCycle, feeOption.amount)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4}>No information available</td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="text-right" colSpan="3">
                            Grand Total {state.detail.paymentCycle === "quarterly" ? "(Quarterly)" : state.detail.paymentCycle === "one time" ?
                              "(One time)" : state.detail.paymentCycle === "halfYearly" ? "(Half Yearly)" :
                                state.detail.paymentCycle === "monthly" ? "(Monthly)" : ""}
                          </td>
                          <td>
                            {
                              state.detail.feeType === "rupees" ? (
                                <i className="primary w-600">&#8377; </i>
                              ) : (
                                ""
                              )
                            }
                            {state.detail.feeType === "usd" ? (
                              <i className="primary w-600">&#36; </i>
                            ) : (
                              ""
                            )}
                            {state.detail.feeType === "euro" ? (
                              <i className="primary w-600">&euro; </i>
                            ) : (
                              ""
                            )}
                            {state.detail.fee}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="ViewFeeStructure-FD mt-20">
                    <p className="text-xs w-600">Fee Description</p>
                    {state.detail.description && (
                      <FormatText text={state.detail.description}>
                        {({ formatedText }) => (
                          <p
                            className="text-xxs sun-editor-output"
                            dangerouslySetInnerHTML={{ __html: formatedText }}
                          ></p>
                        )}
                      </FormatText>
                    )}
                  </div>
                  <div className="ViewFeeStructure-TC mt-20">
                    <p className="text-xs w-600">Term & Conditions</p>
                    {state.detail.terms && (
                      <FormatText text={state.detail.terms}>
                        {({ formatedText }) => (
                          <p className="sun-editor-output" dangerouslySetInnerHTML={{ __html: formatedText }}></p>
                        )}
                      </FormatText>
                    )}
                  </div>

                  {state.detail.paymentMode && state.detail.paymentMode.length && (
                    <div className="ViewFeeStructure-PAM mt-20">
                      <p className="text-xs w-600">Payment Accept Mode</p>
                      {state.paymentMode.loading ? (
                        <div>Loading...</div>
                      ) : state.paymentMode.list.bankModes.length ||
                        state.paymentMode.list.upiModes.length ||
                        state.paymentMode.list.chequeModes.length ||
                        state.paymentMode.list.paypalModes.length ? (
                        <React.Fragment>
                          {state.paymentMode.list.bankModes.length > 0 && (
                            <PaymentMode
                              title="Bank Transfer"
                              type="bank"
                              options={state.paymentMode.list.bankModes}
                            />
                          )}
                          {state.paymentMode.list.upiModes.length > 0 && (
                            <PaymentMode
                              title="UPI Payment"
                              type="upi"
                              options={state.paymentMode.list.upiModes}
                            />
                          )}
                          {state.paymentMode.list.chequeModes.length > 0 && (
                            <PaymentMode
                              title="Cheque Payment"
                              type="cheque"
                              options={state.paymentMode.list.chequeModes}
                            />
                          )}
                          {state.paymentMode.list.paypalModes.length > 0 && (
                            <PaymentMode
                              title="Paypal Payment"
                              type="paypal"
                              options={state.paymentMode.list.paypalModes}
                            />
                          )}
                        </React.Fragment>
                      ) : (
                        <div className="mt-15">No Payment Mode Available.</div>
                      )}
                    </div>
                  )}
                </ModalBody>
              </Modal>
            </div>
          )
      }
    </React.Fragment>
  );
};

export default FeeStructure;
