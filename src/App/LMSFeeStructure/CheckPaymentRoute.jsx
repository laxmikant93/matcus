/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import {
  getPaymentModes,
  resetAvailPaymentModes,
} from "../../../../store/actions/paymentmode";

const CheckPaymentRoute = () => {
  const dispatch = useDispatch();
  const { users, availablePaymentModes, availablePaymentModesSuccess } =
    useSelector((state) => {
      return {
        users: state.user,
        availablePaymentModes: state.paymentmode.availablePaymentMode.data,
        availablePaymentModesSuccess:
          state.paymentmode.availablePaymentMode.success,
      };
    });
  const redirectToSection = () => {
    return availablePaymentModesSuccess ? (
      <Navigate to="/fee-structure" />
    ) : (
      <Navigate to="/paymentmetrhod" />
    );
  };
  useEffect(() => {
    dispatch(getPaymentModes(users.user_institute));
  }, [dispatch, users.user_institute]);
  return (
    <React.Fragment>
      <div style={{ padding: 100 }}>
        {!availablePaymentModesSuccess ? (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        ) : (
          availablePaymentModesSuccess && redirectToSection()
        )}
      </div>
    </React.Fragment>
  );
};

export default CheckPaymentRoute;
