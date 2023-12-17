import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getDomainAvailablityRESET,
  getOrderDetailsRESET,
  getUserDetailsRESET,
  patchUserDetailsRESET,
  postDomainSubmitRESET,
  postOrderRESET,
  postUserDetailsOffilineRESET,
  postUserDetailsOnlineRESET,
  tldspriceRESET,
} from "../../../store/actions/privateDomain";
import SessionStorage from "../../../Classes/SessionStorage";
import Storage from "../../../Classes/Storage";
import {
  instiid,
  PaymentComplete,
  privateDomain,
  privateDomainAddNewIns,
  privateDomainBookNew,
  privateDomainOfflineFlow,
  privateDomainProceedToCheckout,
  privateDomainTLDS,
  registerDetails,
  uid,
} from "../../../Constant/auth";
import {
  createOrder,
  getUserDetails,
} from "../../../store/actions/privateDomain";
import ComponentLoader from "../../../Common/Loader/ComponentLoader";
import "./Payment.scss";
const PaymentSummary = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate();


  // const [privateDomainOffline, setPrivateDomainOffline] = useState(false);
  // const [privateDomainProceedToCheck, setPrivateDomainProceedToCheckout] = useState(false);
  // const [privateDomainBook, setPrivateDomainBook] = useState(false);
  // const [privateDomainAddnewIns, setPrivateDomainAddnewIns] = useState(false);

  useEffect(() => {
    if (SessionStorage.alive(PaymentComplete)) {
      history("/payment-invoice");
    }
  }, [history]);

  const {
    users,
    userDetails,
    userDetailSuccess,
    postOrderLoading,
    postOrderSuccess,
    userDetailLoading,
    postOrderData,
    userDetailData
  } = useSelector((state) => {
    return {
      users: state.user,
      userDetails: state.privatedomain.getUserDetails.data,
      userDetailSuccess: state.privatedomain.getUserDetails.success,
      userDetailData: state.privatedomain.getUserDetails.data,

      userDetailLoading: state.privatedomain.getUserDetails.loading,
      postOrderLoading: state.privatedomain.createOrderDetails.loading,
      postOrderSuccess: state.privatedomain.createOrderDetails.success,
      postOrderData: state.privatedomain.createOrderDetails.data,

    };
  });

  useEffect(() => {
    dispatch(getUserDetails(users._id, users.user_institute, users.user_business_type));
  }, [])



  const redirectToNext = () => {
    history("/payment-razor")
  }
  useEffect(() => {
    const orderCreteData = {
      user: users._id,
      business: users.user_institute,
      type: users.user_business_type,
      amount: 9999
    };
    const createRazorpayOrder = () => {
      if (users._id && users.user_institute) {
        dispatch(createOrder(orderCreteData));
      }
    };

    if (userDetailSuccess && !userDetailLoading) {
      createRazorpayOrder()
    }
  }, [dispatch, userDetailLoading, userDetailSuccess, users._id, users.user_business_type, users.user_institute])

  return (
    <React.Fragment>
      <div className="pageInCenter">
        <div className="PaymentSummary">
          <React.Fragment>
            {postOrderSuccess &&
              !postOrderLoading ? (
              <div className="PaymentSummaryCommonWrapper">
                <div className="PaymentSummaryCommonCst">

                  <p className="text-md">{`Hello, ${users.user_fullname}`}</p>
                  < div className="PaymentInvoiceSummary">
                    <div>
                      <p className="text-s">Institute Domain</p>
                      <p className="primary text-s w-600">
                        {userDetailData.domain}
                      </p>
                    </div>
                    <div>
                      <p className="text-s">Invoice ID</p>
                      <p className="uppercase primary text-s w-600">{`EDN-${postOrderData.receipt}`}</p>
                    </div>
                    <div>
                      <p className="text-s">Email</p>
                      <p className="primary text-s w-600">
                        {users.user_email}
                      </p>
                    </div>
                    <div>
                      <p className="text-s">
                        Contact Number{" "}
                        <span>+{users.user_country_code}</span>
                      </p>
                      <p className="primary text-s w-600">
                        {users.user_contact}
                      </p>
                    </div>
                  </div>
                  <div className="summaryPaymentBtnWrap">
                    <p className="text-xs mt-50">Total Amount</p>
                    <span>
                      <p className="text-l w-600 mt-3">&#8377;&nbsp;9999</p>
                      + 3% Convenience charge.
                    </span>
                    {postOrderLoading ? (
                      <button className="button button-sm button-block button-theme mt-15">
                        Loading...
                      </button>
                    ) : (
                      <button
                        className="button button-sm button-block button-theme mt-15"
                        onClick={redirectToNext}
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <ComponentLoader />
            )}
          </React.Fragment>
        </div >
      </div >
    </React.Fragment >
  );
};

export default PaymentSummary;
