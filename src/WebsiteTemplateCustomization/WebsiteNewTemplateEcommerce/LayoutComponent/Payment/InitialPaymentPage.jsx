import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './initialPaymentPage.scss';
import FormInput from "../../../../Common/Form/FormInput"
import { createRazorPayOrder } from '../../../../store/actions/ecommerce/action/cartOrder';
import axios from 'axios';
import { API_PRODUCT } from '../../../../store/actions/ecommerce/config';
import { postRequest } from '../../../../store/actions/ecommerce/utils/request';

const InitialPaymentPage = () => {

  const dispatch = useDispatch();

  const RazorPayRequest = `https://api.getmelight.com/productService/paymentcallback`;

  useEffect(() => { }, []);

  const createRazorPayOrderHandler = () => {
    dispatch(createRazorPayOrder());
  };

  // function loadScript(src) {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // }
  // const openRazorPay = async () => {
  //   const response = await loadScript(
  //     process.env.REACT_APP_RAZOR_PAY_LOAD_SCRIPT
  //   );
  //   if (!response) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }
  //   if (getOrderDetailsSuccess && getOrderDetailsData) {

  //     const options = {
  //       key: process.env.REACT_APP_RAZOR_PAY_KEY,
  //       amount: getOrderDetailsData.amount,
  //       currency: "INR",
  //       name: users.user_fullname,
  //       description: "Edneed Transaction",
  //       order_id: getOrderDetailsData.order_id,
  //       handler: async function (response) {
  //         const data = {
  //           orderCreationId: getOrderDetailsData.order_id,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //         };
  //         // setPaymentLoading(true);
  //         const url = `${API_PRODUCT}/paymentcallback`;
  //         const resp = await postRequest(url,data);

  //         // RazorPayRequest.post(
  //         //   razorPayUrl,
  //         //   data,
  //         //   (success) => {

  //         //     if (success.data.domainStatus == "Domain Bought" && success.data.paymentStatus == "Payment successfull") {
  //         //       history("/payment-invoice");
  //         //     } else {
  //         //       history({
  //         //         pathname: "/payment-summary",
  //         //         state: { detail: true },
  //         //       });
  //         //     }
  //         //   },
  //         // );
  //       },
  //     };
  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   }
  // };

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <div className='containerTrue pb-45 '>
        <div className='paymentPage-container'>
          <div className='paymentPage-wrap'>
            <form action="">
              <div className="formFieldwrap">
                <FormInput type="text" placeholder="Name" />
              </div>
              <div className="formFieldwrap">
                <FormInput type="text" placeholder="Name" />
              </div>
              <p>Proceed to Pay 1000 Rs</p>
              <button className='buttonTrue btnTrue-primary' onClick={createRazorPayOrderHandler}>Pay Now</button>
            </form>
          </div>

        </div>

      </div>
    </React.Fragment>
  )
}

export default InitialPaymentPage;