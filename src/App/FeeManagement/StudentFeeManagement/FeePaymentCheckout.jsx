import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Request from "../../../Classes/Request";
import ComponentLoader from "../../../Common/Loader/ComponentLoader";
import { getStudentFeeSingle } from "../../../store/actions/feeManagementStudent";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import "./FeePaymentCheckout.scss";
const FeePaymentCheckout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const RazorPayRequest = new Request();
  const razorPayUrl = RazorPayRequest.url("feePayments/paymentCallback");
  const {
    users,
    // getOrderDetailsData,
    // userDetails,
    // getOrderDetailsSuccess,
    // getOrderDetailsLoading,
    getStudentFeeSingleSuccess,
    getStudentFeeSingleLoading,
    getStudentFeeSingleData,
  } = useSelector((state) => {
    return {
      users: state.user,
      // userDetails: state.privatedomain.getUserDetails.data,
      // getOrderDetailsData: state.privatedomain.getOrderDetails.data,
      // getOrderDetailsLoading: state.privatedomain.getOrderDetails.loading,
      // getOrderDetailsSuccess: state.privatedomain.getOrderDetails.success,
      getStudentFeeSingleSuccess:
        state.feeManagementStudent.getStudentFeeSingle.success,
      getStudentFeeSingleLoading:
        state.feeManagementStudent.getStudentFeeSingle.loading,
      getStudentFeeSingleData:
        state.feeManagementStudent.getStudentFeeSingle.data,
    };
  });
  const history = useNavigate();

  useEffect(() => {
    dispatch(getStudentFeeSingle(id));
  }, [dispatch, id]);

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
    if (users && getStudentFeeSingleData) {
      const options = {
        key: process.env.REACT_APP_RAZOR_PAY_KEY,
        currency: "INR",
        name: users.user_fullname,
        description: "Edneed Transaction",
        order_id: getStudentFeeSingleData.orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: getStudentFeeSingleData.orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          RazorPayRequest.post(
            razorPayUrl,
            data,
            (success) => {
              if (success.data === "Payment Done") {
                // push to invoice
                history(
                  `/dashboard/student/student-fee-confirmation${id}`
                );
              } else {
                history("/dashboard/student/payment-error");
              }
            },
            (error) => {

              history("/dashboard/student/payment-error");
            }
          );
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  };

  return (
    <React.Fragment>
      <React.Fragment>
        {getStudentFeeSingleLoading ? (
          <div>
            <ComponentLoader />
          </div>
        ) : (
          <div className="PaymentRazor">
            {getStudentFeeSingleLoading && !getStudentFeeSingleSuccess ? (
              <ComponentLoader />
            ) : (
              <React.Fragment>
                <div className="PaymentRazorCommonWrapper">
                  <div className="PaymentRazorCommonCst">
                    <p className="text-sm w-600">Payment for invoice</p>
                    <ul className="PaymentInvoiceRazor mt-3">
                      <li className="text-xs mb-10 mt-10">
                        {`Hello ${users.user_fullname} `}
                      </li>
                      <li className="uppercase primary text-xxs w-600">{`EDN - ${getStudentFeeSingleData.receiptId} `}</li>
                      <li className="uppercase primary text-xxs w-600">{`ORDER ID - ${getStudentFeeSingleData.orderId} `}</li>
                    </ul>
                    <p className="text-xs mt-50">Paying Total Amount</p>
                    <p className="text-sm w-600 mt-3">
                      &#8377;&nbsp;{
                        (getStudentFeeSingleData.totalAmount - (getStudentFeeSingleData.feeStudentDiscount + getStudentFeeSingleData.feeStudentScholorship))
                        + ((getStudentFeeSingleData.totalAmount - (getStudentFeeSingleData.feeStudentDiscount + getStudentFeeSingleData.feeStudentScholorship)) * 3 / 100)
                      }
                    </p>
                    <div className="RazorPayNowBtn">
                      {/* <button className="button button-block button-theme mt-15 ">
                        Loading...
                      </button> */}

                      <button
                        className="button button-block button-theme btn-md mt-15"
                        onClick={openRazorPay}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
        {/* <button
        className="button button-block button-theme mt-15"
        onClick={openRazorPay}
      >
        Pay Now
      </button> */}
      </React.Fragment>
    </React.Fragment>
  );
};

export default FeePaymentCheckout;