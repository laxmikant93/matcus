import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDomainAvailablityRESET,
  getOrderDetails,
  getUserDetailsRESET,
  createOrder,
  getUserDetails
} from "../../../store/actions/privateDomain";
import { useNavigate } from "react-router-dom";
import ComponentLoader from "../../../Common/Loader/ComponentLoader";
import Request from "../../../Classes/Request";
import "./RazorPay.scss";
const PaymentRazor = () => {
  const RazorPayRequest = new Request();
  const razorPayUrl = RazorPayRequest.url("domain/paymentcallback");
  const dispatch = useDispatch();
  const history = useNavigate();
  const [poymentLoading, setPaymentLoading] = useState(false);


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
    getOrderDetailsLoading
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
    };
  });


  useEffect(() => {
    dispatch(getUserDetails(users._id, users.user_institute, users.user_business_type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getOrderDetailsSuccess && getOrderDetailsData) {
      openRazorPay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOrderDetailsSuccess, getOrderDetailsData]);

  // useEffect(() => {
  //   history("/payment-invoice");
  // }, [history]);
  useEffect(() => {
    dispatch(getOrderDetails(users._id, users.user_institute, users.user_business_type))
  }, [dispatch])
  const orderCreteData = {
    user: users._id,
    business: users.user_institute,
    type: users.user_business_type,
    amount: 1000
  };

  const createRazorpayOrder = () => {
    dispatch(createOrder(orderCreteData))
  }
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const openRazorPay = async () => {
    const response = await loadScript(
      process.env.REACT_APP_RAZOR_PAY_LOAD_SCRIPT
    );
    if (!response) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    if (getOrderDetailsSuccess && getOrderDetailsData) {
      
      const options = {
        key: process.env.REACT_APP_RAZOR_PAY_KEY,
        amount: getOrderDetailsData.amount,
        currency: "INR",
        name: users.user_fullname,
        description: "Edneed Transaction",
        order_id: getOrderDetailsData.order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: getOrderDetailsData.order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          setPaymentLoading(true);

          RazorPayRequest.post(
            razorPayUrl,
            data,
            (success) => {
             
              if (success.data.domainStatus == "Domain Bought" && success.data.paymentStatus == "Payment successfull") {
                history("/payment-invoice");
              } else {
                history({
                  pathname: "/payment-summary",
                  state: { detail: true },
                });
              }
            },
          );
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  };

  return (
    <React.Fragment>
      <div className="edContainer">
        <div className="PaymentRazor">
          {getOrderDetailsLoading && userDetailLoading ? (
            <ComponentLoader />
          ) : (
            <React.Fragment>
              {userDetailSuccess ? (
                <div className="PaymentRazorCommonWrapper">
                  <p className="text-sm">{`Hello ${users.user_fullname} `}</p>
                  <div className="PaymentRazorCommonCst">
                    <div className="PaymentInvoiceRazor mt-3">
                      <p className="text-xs">Payment for invoice</p>

                      <p className="uppercase primary text-xs w-600">{`EDN - ${postOrderData.receipt} `}</p>
                    </div>
                    <p className="text-xs mt-50">Paying Total Amount</p>
                    <span>
                      <p className="text-sm w-600 mt-3">&#8377;&nbsp;9999</p>
                      + 3% Convenience charge.
                    </span>
                    <div className="RazorPayNowBtn mb-30">
                      {postOrderLoading ? (
                        <button className="button button-block button-theme mt-15 ">
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="button button-block button-theme mt-15"
                          onClick={openRazorPay}
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentRazor;
