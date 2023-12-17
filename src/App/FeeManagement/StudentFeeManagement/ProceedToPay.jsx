import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createOrder,
  OrderCreateReset,
} from "../../../store/actions/feeManagementStudent";

function ProceedToPay({
  closeModalPayFeeState,
  modalPayFee,
  ProceedToPayData,
  AccumilativeFee,
  classRoomData
}) {
  const { ordercreatesuccess, users, ordercreateloading } = useSelector(
    (state) => {
      return {
        users: state.user,
        ordercreatesuccess: state.feeManagementStudent.createOrder.success,
        ordercreateloading: state.feeManagementStudent.createOrder.loading,
        studentFeeDataSuccess:
          state.feeManagementStudent.studentFeeData.success,
        studentFeeDataLoading:
          state.feeManagementStudent.studentFeeData.loading,
      };
    }
  );
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (ProceedToPayData) {
      if (ProceedToPayData._id.length > 0) {
        const feeData = {
          feeId: ProceedToPayData._id,
        };
        dispatch(createOrder(feeData));
      } else {
        const feeData = {
          feeId: ProceedToPayData._id,
        };
        dispatch(createOrder(feeData));
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(OrderCreateReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (ordercreatesuccess) {
    // history(`/payment-checkout/${ProceedToPayData._id}`)

    if (
      typeof ProceedToPayData._id !== "string" &&
      ProceedToPayData._id.length > 0
    ) {
      let stringId = "";
      for (let i = 0; i < ProceedToPayData._id.length; i++) {
        if (stringId === "") {
          stringId = ProceedToPayData._id[i];
        } else {
          stringId = stringId + `-` + ProceedToPayData._id[i];
        }


      }

      history(`/payment-checkout/${stringId}`);
    } else {

      history(`/payment-checkout/${ProceedToPayData._id}`);
    }
  }

  return (
    <div className={`modal modalShowing-${modalPayFee}`}>
      <div className="modalwrapper">
        <span
          className="closeModal text-xxs dgray"
          onClick={() => closeModalPayFeeState()}
        >
          X Close
        </span>
        <div className="modalHead">
          <div className="mb-10">
            <h3 className="text-sm w-500">
              Fee Payment To : {users.user_institute_institute_name}
            </h3>
            <h5 className="text-xxs w-400">
              {ProceedToPayData && ProceedToPayData.paymentMonth
                ? ProceedToPayData.paymentMonth.replace(",", " ")
                : ""},{" "}
              {ProceedToPayData.feeYear},{" "}Classroom:{" "}{classRoomData && classRoomData.coursename}
            </h5>
          </div>
          <hr />
        </div>
        <div className="modalbody">
          <h4>Fee Breakups</h4>
          <div className="pricebreakupTbl mt-10">
            {ProceedToPayData &&
              ProceedToPayData.feestructure &&
              ProceedToPayData.feestructure.length > 0 &&
              ProceedToPayData.feestructure.map((item) => {
                return (
                  <ul>
                    <li>{item.type}</li>
                    <li>₹{item.amount}</li>
                  </ul>
                );
              })}
            <ul className="seperator">
              <li>
                <hr />
              </li>
            </ul>
            <ul>
              <li>Scholarship (%)</li>
              <li>
                {ProceedToPayData && ProceedToPayData.feeStudentScholorship > 0
                  ? "-"
                  : ""}{" "}
                ₹{ProceedToPayData && ProceedToPayData.feeStudentScholorship}
              </li>
            </ul>
            <ul>
              <li>Discount (INR)</li>
              <li>
                {ProceedToPayData && ProceedToPayData.feeStudentDiscount > "₹" + 0
                  ? "-"
                  : ""}{" "}
                ₹{ProceedToPayData && ProceedToPayData.feeStudentDiscount}
              </li>
            </ul>
            <ul className="seperator">
              <li>
                <hr />
              </li>
            </ul>
            <ul>
              <li>Late Fine Amount (INR)</li>
              <li>₹{AccumilativeFee}</li>
            </ul>
            <ul className="seperator">
              <li>
                <hr />
              </li>
            </ul>
            <ul>
              <li>Convenience Fees(3%)</li>
              <li>{((ProceedToPayData.totalAmount + AccumilativeFee) - (ProceedToPayData.feeStudentDiscount + ProceedToPayData.feeStudentScholorship)) * 3 / 100}</li>
            </ul>
          </div>
          <div>
            <h2 className="mt-20">
              Total:{" "}  ₹
              {ProceedToPayData &&
                ((ProceedToPayData.totalAmount + AccumilativeFee) - (ProceedToPayData.feeStudentDiscount + ProceedToPayData.feeStudentScholorship)) +
                ((ProceedToPayData.totalAmount + AccumilativeFee) - (ProceedToPayData.feeStudentDiscount + ProceedToPayData.feeStudentScholorship)) * 3 / 100}
            </h2>
            <p className="text-xxs">({ProceedToPayData.paymentCycle} fee is inclusive of all taxes + 3% convenience charges.)</p>
          </div>
        </div>
        <div className="modalFooter">
          <div className="row">
            {ordercreateloading ? (
              <button className="button btn-md button-theme primary">
                Loading...
              </button>
            ) : (
              <button
                className="button btn-md button-theme primary"
                onClick={handleClick}
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProceedToPay;
