import React from "react";

import Request from "../Classes/Request";
const PaymentRazor = () => {
  const RazorPayRequest = new Request();
  const razorPayUrl = RazorPayRequest.url("domain/paymentcallback", "middleware");
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
    const options = {
      key: "rzp_test_2tjxm0UUKPEDyX",
      amount: 499900,
      currency: "INR",
      name: "Rajat",
      description: "Edneed Transaction",
      order_id: "order_JpFknkCnBMrwsi",
      handler: async function (response) {
        const data = {
          orderCreationId: "order_JpFknkCnBMrwsi",
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        RazorPayRequest.post(
          razorPayUrl,
          data,
          (success) => {
            if (success.data.response._id) {

            } else {

            }
          },
          (error) => {

          }
        );
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <button onClick={openRazorPay}>pay now</button>
    </div>
  );
};

export default PaymentRazor;
