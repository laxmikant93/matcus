/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { useDispatch } from "react-redux";
import { getStudentFee, getStudentFeeSingle } from "../../../store/actions/feeManagementStudent";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ComponentLoader from "../../../Common/Loader/ComponentLoader";
import moment from "moment";
const StudentFeeConfirmation = () => {
  const history = useNavigate()
  let { id } = useParams();
  const { getStudentFeeSingleSuccess, getStudentFeeSingleLoading, getStudentFeeSingleData, users } = useSelector((state) => {
    return {
      users: state.user,
      getStudentFeeSingleSuccess: state.feeManagementStudent.getStudentFeeSingle.success,
      getStudentFeeSingleLoading: state.feeManagementStudent.getStudentFeeSingle.loading,
      getStudentFeeSingleData: state.feeManagementStudent.getStudentFeeSingle.data,
    };
  });

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudentFeeSingle(id))
  }, [dispatch, id])
  return (
    <React.Fragment>
      {getStudentFeeSingleLoading ? (
        <div>
          <ComponentLoader />
        </div>
      ) : (
        <React.Fragment>
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem
              to="/dashboard/student/student-fee-confirmation"
              title="Fee Confirmation"
            />
          </Breadcrumb>
          {getStudentFeeSingleSuccess && getStudentFeeSingleData ? (
            <div>
              <h1 className="text-sm w-300">Fee confirmation</h1>
              <h2 className="text-xs w-700 mt-30">Thank You, {users.user_fullname} !</h2>
              <p>
                Fee has been successfully paid. You will receive a copy of the
                invoice in you registered email.
              </p>
              <h4 className="mt-30">Order Summary {getStudentFeeSingleData.orderId}</h4>
              <div className="pricebreakupTbl">
                <ul>
                  <li>Order Date</li>
                  <li>{getStudentFeeSingleData.paymentDate && moment(getStudentFeeSingleData.paymentDate).add(330, 'm').format('LLL')}</li>
                </ul>
                <ul>
                  <li>Invoice No.</li>
                  <li>{getStudentFeeSingleData.receiptId}</li>
                </ul>
                <ul>
                  <li>Payment Method</li>
                  <li>{getStudentFeeSingleData.paymentMethod}</li>
                </ul>
                <ul>
                  <li className="w-600">Paid Amount</li>
                  <li className="w-600">₹{getStudentFeeSingleData.NetAmount}</li>
                </ul>
                <ul className="seperator">
                  <li>
                    <hr />
                  </li>
                </ul>
              </div>
              <h4 className="mt-40">Payment Details</h4>
              {getStudentFeeSingleSuccess ?
                (
                  getStudentFeeSingleData && getStudentFeeSingleData.feestructure.length ? (
                    getStudentFeeSingleData.feestructure.map((item) => {
                      return (
                        <div className="pricebreakupTbl">
                          <ul>
                            <li>{item.type}</li>
                            <li>₹{item.amount}</li>
                          </ul>
                        </div>
                      )
                    })
                  ) : ""
                ) : ""}

              <ul className="seperator">
                <li>
                  <hr />
                </li>
              </ul>
              <ul>
                <li>Scholarship</li>
                <li>- ₹{getStudentFeeSingleData.feeStudentScholorship}</li>
              </ul>
              <ul>
                <li>Discount (INR)</li>
                <li>- ₹{getStudentFeeSingleData.feeStudentDiscount}</li>
              </ul>
              <ul className="seperator">
                <li>
                  <hr />
                </li>
              </ul>
              <ul>
                <li>Convenience Fees(INR)</li>
                <li>₹{(getStudentFeeSingleData.totalAmount - (getStudentFeeSingleData.feeStudentScholorship + getStudentFeeSingleData.feeStudentDiscount)) * 3 / 100}</li>
              </ul>
              <ul className="seperator">
                <li>
                  <hr />
                </li>
              </ul>
              <ul>
                <li className="w-600">Total</li>
                <li className="w-600">₹{(getStudentFeeSingleData.totalAmount - (getStudentFeeSingleData.feeStudentScholorship + getStudentFeeSingleData.feeStudentDiscount)) +
                  (getStudentFeeSingleData.totalAmount - (getStudentFeeSingleData.feeStudentScholorship + getStudentFeeSingleData.feeStudentDiscount)) * 3 / 100}</li>
              </ul>
              <ul className="seperator">
                <li>
                  <hr />
                </li>
              </ul>
              <div className="mt-30">
                <button className="button button-primary" onClick={() => history("/")} >Go to Dashboard</button>
                <button className="button button-primary" onClick={() => window.print()}>Print Invoice</button>
              </div>
            </div>
          ) : <div>
            <h1>Loading..</h1>
          </div>}
        </React.Fragment>
      )}

    </React.Fragment>
  );
};

export default StudentFeeConfirmation;
