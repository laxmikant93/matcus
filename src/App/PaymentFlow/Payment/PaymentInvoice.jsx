/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import {
  createPrivateDomainNewInstiute,
  instiid,
  invoicePriceValue,
  invoicePrint,
  privateDomain,
  privateDomainAddNewIns,
  privateDomainBookNew,
  privateDomainOfflineFlow,
  privateDomainOpt,
  privateDomainProceedToCheckout,
  privateDomainTLDS,
  registerDetails,
  registrationWorkDone,
  reviewValue,
  totalPriceValue,
  uid,
} from "../../../Constant/auth";
import {
  getOrderDetails,
  getUserDetails,
  techSupportMail,
} from "../../../store/actions/privateDomain";
import SessionStorage from "../../../Classes/SessionStorage";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../Constant/constants";
import { useNavigate } from "react-router";
import Storage from "../../../Classes/Storage";
import HomeFooter from "../../../Layout/WithoutAuthLayout/Footer";
import ComponentLoader from "../../../Common/Loader/ComponentLoader";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import FormInput from "../../../Common/Form/FormInput";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import "./Payment.scss";
import { updateDashboardStepper } from "../../../store/actions/user";
const PaymentInvoice = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    users,
    userDetailSuccess,
    userDetailData,
    userDetailLoading,
    postOrderLoading,
    postOrderSuccess,
    postOrderData,
    getOrderDetailsSuccess,
    getOrderDetailsData,
    getOrderDetailsLoading,
    techSupportSuccess,
    techSupportLoading
  } = useSelector((state) => {
    return {
      users: state.user,
      userDetailSuccess: state.privatedomain.getUserDetails.success,
      userDetailData: state.privatedomain.getUserDetails.data,
      userDetailLoading: state.privatedomain.getUserDetails.loading,
      postOrderLoading: state.privatedomain.createOrderDetails.loading,
      postOrderSuccess: state.privatedomain.createOrderDetails.success,
      postOrderData: state.privatedomain.createOrderDetails.data,
      getOrderDetailsSuccess: state.privatedomain.getOrderDetails.success,
      getOrderDetailsData: state.privatedomain.getOrderDetails.data,
      getOrderDetailsLoading: state.privatedomain.getOrderDetails.loading,
      techSupportSuccess: state.privatedomain.techSupportMailData.success,
      techSupportLoading: state.privatedomain.techSupportMailData.loading,

    };
  });

  const GotoDashboard = () => {
    history("/");
  };
  const GotoBuildYourWebsite = () => {
    if (users.token) {
      let url = "/institute-info-manage";
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
      //history("/website-manage")
    } else {
      history("/pending-email-verify");
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    if (SessionStorage.alive(registerDetails)) {
      let data = SessionStorage.getJson(registerDetails);
      Storage.setJson(invoicePrint, data);
    }
    if (SessionStorage.alive(totalPriceValue)) {
      let data = SessionStorage.getJson(totalPriceValue);
      Storage.setJson(invoicePriceValue, data);
    }
  };
  const [wells, setwells] = useState(false);

  const managewells = () => {
    setwells(!wells);
  };
  const [review, setReview] = useState("");
  const [showFormError, setShowFormError] = useState(false);

  const handleReview = () => {
    SessionStorage.setJson(reviewValue, "Thanks");
    setReview(SessionStorage.getJson(reviewValue));
  };
  useEffect(() => {
    if (SessionStorage.alive(reviewValue)) {
      setReview(SessionStorage.getJson(reviewValue));
    }
  }, []);
  const [showForm, setShowForm] = useState(false);
  const handleSupportForm = () => {
    setShowForm(!showForm);
  };
  const [formInput, setFormInput] = useState({
    message: {
      value: "",
      isValid: false,
    },
    validation: false,
  });
  const handleChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let createInputData = {
      ...formInput,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };

    setFormInput(createInputData);

    setShowFormError(false);
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "message":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };
  const isFormValid = () => {
    return formInput.message.isValid ? true : false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFormError(true);
    if (userDetailSuccess && userDetailData) {
      let MailerData = {
        userName: users.user_fullname,
        email: users.user_email,
        // phone: users.DomainInfo.phone,
        message: formInput.message.value,
        domainName: userDetailData.domain
      };
      if (formInput.message.isValid) {
        dispatch(techSupportMail(MailerData));
      }
    }
  };
  useEffect(() => {
    if (techSupportSuccess) {
      setShowForm(!showForm);
      setFormInput({
        message: {
          value: "",
          isValid: false,
        },
      });
      setShowFormError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [techSupportSuccess]);
  const handleCancel = () => {
    setShowForm(!showForm);
    setFormInput({
      message: {
        value: "",
        isValid: false,
      },
    });
    setShowFormError(false);
  };

  useEffect(() => {
    dispatch(getUserDetails(users._id, users.user_institute, users.user_business_type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getOrderDetails(users._id, users.user_institute, users.user_business_type))
  }, [dispatch, users._id, users.user_business_type, users.user_institute])

  useEffect(() => {
    if (getOrderDetailsSuccess &&
      userDetailSuccess &&
      userDetailData &&
      getOrderDetailsData) {
      let data = {
        ...users.user_dashboard_stepper, addDomain: true
      }
      dispatch(updateDashboardStepper(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOrderDetailsSuccess,
    userDetailSuccess,
    userDetailData,
    getOrderDetailsData])
  return (
    <React.Fragment>
      {getOrderDetailsSuccess &&
        userDetailSuccess &&
        userDetailData &&
        getOrderDetailsData ? (
        <div className="PaymentInvoice mt-100">
          <h3 className="secondary w-500 text-sm">Your payment was successful, Here's your payment summary.</h3>
          <p className="text-sm w-500">{users.user_fullname}</p>
          <p className="text-xxs w-300">
            Your order has been successfully placed. We will send another
            email when your domain is ready to go live.
          </p>
          {!wells && (
            <div className="DomainTechSupportWells mt-20">
              <p className="text-xs">
                Your domain{" "}
                <u className="text-xs secondary">
                  {userDetailData.domain}
                </u>
                &nbsp; will be ready for use in 24 to 48 hours.
              </p>
              <div className="DomainTechSupportWellsAction mt-20">
                {SessionStorage.alive(reviewValue) ? (
                  <button
                    onClick={handleReview}
                    className="button btn-sm button-white secondary mr-5"
                  >
                    {review}
                  </button>
                ) : (
                  <button
                    onClick={handleReview}
                    className="button btn-sm button-white secondary mr-5"
                  >
                    Ok, I am fine
                  </button>
                )}

                <button
                  onClick={handleSupportForm}
                  className="button btn-sm button-white secondary"
                >
                  I need Technical Support
                </button>
                <Modal show={showForm}>
                  <ModalBody>
                    <form onSubmit={handleSubmit}>
                      <div className="formFieldwrap">
                        <FormInput
                          type="text"
                          name="message"
                          value={formInput.message.value}
                          onChange={handleChange}
                          placeholder="Type your message here.."
                          label="Message"
                        />
                        <FormError
                          show={!formInput.message.value && showFormError}
                          error="Message should not be empty."
                        />
                      </div>
                      {techSupportLoading ? (
                        <button className="button btn-md button-primary mr-5" type="button">
                          Loading...
                        </button>
                      ) : (
                        <button className="button btn-md button-primary mr-5" type="submit">
                          Send request
                        </button>
                      )}

                      <button
                        className="button btn-o-primary btn-md primary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </form>
                  </ModalBody>
                </Modal>
              </div>
            </div>
          )}
          <div className="OrderSummary">
            <p className="text-xs w-600">
              Order Summary ID :&nbsp;
              <span className="text-xs">#{getOrderDetailsData.order_id}</span>
            </p>
            <div className="OrderSummaryCst">
              <div className="OrderSummaryCstItem">
                <p>Order Date</p>
                <p>
                  {moment(getOrderDetailsData.createdAt).format(
                    DATETIME_FORMAT_AP
                  )}
                </p>
              </div>
              <div className="OrderSummaryCstItem">
                <p>Invoice ID</p>
                <p className="uppercase">EDN-{getOrderDetailsData.receipt}</p>
              </div>
              <div className="OrderSummaryCstItem">
                <p>Payment Method</p>
                <p>{getOrderDetailsData.method?.toUpperCase()}</p>
              </div>
              <div className="OrderSummaryCstItem">
                <p>Paid Amount</p>
                <p>
                  ₹10,298 &nbsp;
                  <span className="text-xxs">Inclusive of all taxes.</span>
                </p>
              </div>
            </div>
          </div>
          <div className="PurchasedDomainSummary">
            <p className="text-xs w-600">Order Details</p>
            <p className="text-xxs w-600 mt-10">ThunderBolt Combo Package</p>
            <div className="PurchasedDomainSummaryCst">
              <ul className="PurchasedDomainSummaryItem">
                <li className="text-xs">
                  {userDetailData.domain}
                </li>
                <li className="text-xxs">1 year</li>
                <li className="text-xxs">&#8377;&nbsp;39,999</li>
              </ul>
            </div>
          </div>
          <div className="PurchasedExtraDetailsWrapper">
            <div className="PurchasedExtraDetailsCst">
              <ul className="PurchasedExtraDetailsItem">
                <li className="text-xs">Discount Applied</li>
                <li className="text-xxs">
                  <span className="secondary w-600 uppercase"></span>
                </li>
                <li className="text-xxs">
                  <span className="secondary w-600">&#8377;&nbsp;30000</span>
                </li>
              </ul>
              <ul className="PurchasedTotalPricing">
                <li className="text-xs">Calculated Amount</li>
                <span>
                  <p className="text-sm w-600 mt-3">&#8377;&nbsp; 9,999</p>
                </span>
              </ul>
              <ul className="PurchasedTotalPricing">
                <li className="text-xs">Convenience charge(3%)</li>
                <span>
                  <p className="text-sm w-600 mt-3">&#8377;&nbsp; 299</p>
                </span>
              </ul>
              <ul className="PurchasedTotalPricing">
                <li className="text-xs">(Includes 3% Convenience
                  ) Total Paid</li>
                <span>
                  <p className="text-sm w-600 mt-3">&#8377;&nbsp;10,298</p>
                </span>
              </ul>
            </div> Total Invoice Amount₹ 10,298


          </div>

          <ul className="PaymentInvoiceActionBtn mt-30 mb-20">
            <li
              className="button btn-md button-theme primary btn-sm"
              onClick={GotoDashboard}
            >
              Go to Dashboard
            </li>

            <li
              className="button btn-o-primary primary btn-sm"
              onClick={GotoBuildYourWebsite}
            >
              Build your Website
            </li>
            <li
              className="button btn-o-primary primary btn-sm"
              users={users}
              userdetails={userDetailData}
              getorderdetailsdata={getOrderDetailsData}
              onClick={() => openInNewTab("/printInvoice")}
            >
              Print Invoice
            </li>
          </ul>
        </div>
      ) : (
        <ComponentLoader />
      )}
      {/* <HomeFooter /> */}
    </React.Fragment>
  );
};

export default PaymentInvoice;
