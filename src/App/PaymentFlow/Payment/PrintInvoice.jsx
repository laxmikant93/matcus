import React, { useEffect } from "react";
import logo from "../../../assets/images/logo/edneed-logo.svg";

import moment from "moment";

import { DATETIME_FORMAT_AP } from "../../../Constant/constants";
// import SessionStorage from "../../../Classes/SessionStorage";
import { useDispatch } from "react-redux";
import {
  getDomainAvailablityRESET,
  getUserDetailsRESET,
  postDomainSubmitRESET,
  tldspriceRESET,
} from "../../../store/actions/privateDomain";

import {
  getOrderDetails,
  getUserDetails,
} from "../../../store/actions/privateDomain";
import { useSelector } from "react-redux";

import {
  instiid,
  privateDomainAddNewIns,
  privateDomainBookNew,
  privateDomainOfflineFlow,
  privateDomainProceedToCheckout,
  uid,
} from "../../../Constant/auth";
import Storage from "../../../Classes/Storage";
import ComponentLoader from "../../../Common/Loader/ComponentLoader";
import SessionStorage from "../../../Classes/SessionStorage";
import "./Payment.scss";
const PrintInvoice = () => {
  const dispatch = useDispatch();

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
    dispatch(getOrderDetails(users._id, users.user_institute, users.user_business_type))
  }, [dispatch, users._id, users.user_business_type, users.user_institute])

  return (
    <React.Fragment>
      {userDetailSuccess &&
        getOrderDetailsSuccess &&
        getOrderDetailsData ? (
        <table className="mt-80 mb-80" style={{ width: "100%" }}>
          <tr style={{ borderBottom: "1px solid #000" }}>
            <td style={{ textAlign: "left", padding: "10px 0" }}>
              <button
                className="button btn-xs button-base"
                onClick={() => window.print()}
              >
                &#x1F5B6;&nbsp;Print Invoice
              </button>
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #000" }}>
            <td style={{ textAlign: "left", padding: "10px 0" }}>
              <img src={logo} alt="Edneed Logo" style={{ width: "150px" }} />
            </td>
            <td colspan="3" style={{ textAlign: "right", padding: "10px 0" }}>
              <p style={{ fontSize: "30px" }}>Invoice</p>
              <p style={{ fontSize: "12px", fontWeight: "600" }}>
                Original for Recipient
              </p>
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #000" }}>
            <td style={{ textAlign: "left", padding: "10px 0" }}>
              <p style={{ fontSize: "13px" }}>Invoice Number:</p>
              {users ? (
                <p style={{ fontSize: "13px", fontWeight: "600" }}>
                  EDN-{getOrderDetailsData.receipt}
                </p>
              ) : (
                <p style={{ fontSize: "13px", fontWeight: "600" }}>
                  EDN-{getOrderDetailsData.receipt}
                </p>
              )}
            </td>
            <td colspan="3" style={{ textAlign: "right", padding: "10px 0" }}>
              <p style={{ fontSize: "13px" }}>Invoice Date:</p>
              <p style={{ fontSize: "13px", fontWeight: "600" }}>
                {moment(getOrderDetailsData.createdAt).format(
                  DATETIME_FORMAT_AP
                )}
              </p>
            </td>
          </tr>
          {users.token ? (
            <tr style={{ borderBottom: "1px solid #000" }}>
              <td style={{ textAlign: "left", padding: "10px 0" }}>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Seller Details
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    paddingTop: "10px",
                  }}
                >
                  Edneed Technology PVT LTD
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    paddingTop: "20px",
                  }}
                >
                  203, Tower C, I-Thum Sector-62 Noida Uttar Pradesh, 201301
                  INDIA
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    paddingTop: "20px",
                  }}
                >
                  PAN #: AAFCE8671F
                </p>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  CIN #: U72900DL2020PTC362764
                </p>
              </td>
            </tr>
          ) : (
            <tr style={{ borderBottom: "1px solid #000" }}>
              <td style={{ textAlign: "left", padding: "10px 0" }}>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Buyer Details
                </p>

                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    paddingTop: "10px",
                  }}
                >
                  {/*  */}
                  {userDetailData.domain}
                </p>

                <p
                  style={{
                    fontSize: "13px",
                    paddingTop: "20px",
                  }}
                >
                  {users.address} &nbsp;
                  {users.address_line2} &nbsp;
                  {users.address_line3}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {users.user_contact}
                </p>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "right",
                  padding: "10px 0",
                  width: "100px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Seller Details
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    paddingTop: "10px",
                  }}
                >
                  Edneed Technology PVT LTD
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    paddingTop: "20px",
                  }}
                >
                  203, Tower C, I-Thum Sector-62 Noida Uttar Pradesh, 201301
                  INDIA
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    paddingTop: "20px",
                  }}
                >
                  PAN #: AAFCE8671F
                </p>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  CIN #: U72900DL2020PTC362764
                </p>
              </td>
            </tr>
          )}

          <tr style={{ borderBottom: "1px solid #000" }}>
            <td
              style={{
                textAlign: "left",
                padding: "40px 0 10px 0",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Order Details
            </td>
            <td
              colspan="3"
              style={{
                textAlign: "right",
                padding: "40px 0 10px 0",
                fontSize: "12px",
              }}
            >
              All amounts are in INR
            </td>
          </tr>

          <tr style={{ borderBottom: "1px solid #000" }}>
            <th
              style={{
                padding: "10px 0",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "left",
                width: "10%",
              }}
            >
              #
            </th>
            <th
              style={{
                padding: "10px 0",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "left",
                width: "50%",
              }}
            >
              Item
            </th>
            <th
              style={{
                padding: "10px 0",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "left",
                width: "20%",
              }}
            >
              Period
            </th>
            <th
              style={{
                padding: "10px 0",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "right",
                width: "20%",
              }}
            >
              Price
            </th>
          </tr>
          <tr style={{ borderBottom: "1px solid #000" }}>
            <td style={{ padding: "10px 0" }}>1</td>
            <td style={{ padding: "10px 0" }}>
              <p style={{ fontSize: "14px", fontWeight: "600" }}>
                ThunderBolt Combo Package
              </p>
              <p style={{ fontSize: "14px" }}>
                {userDetailData.domain}

              </p>
            </td>
            <td style={{ padding: "10px 0", fontSize: "14px" }}>12 Months</td>
            <td
              style={{
                padding: "10px 0",
                fontSize: "14px",
                textAlign: "right",
              }}
            >
              ₹ 39,999
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #000" }}>
            <td
              rowspan="2"
              colspan="2"
              style={{
                textAlign: "left",
                padding: "10px 0",
                borderRight: "1px solid #000",
              }}
            >
              <p style={{ fontSize: "14px", fontWeight: "600" }}>
                For Edneed Technology Pvt. Ltd.{" "}
              </p>
              <img
                src={logo}
                alt="Edneed Logo"
                style={{
                  width: "150px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <p style={{ fontSize: "14px" }}>Name : Pooja Sharma</p>
              <p style={{ fontSize: "14px" }}>
                Designation: Authorized Signatory
              </p>
            </td>
            <td colspan="2" style={{ padding: "10px 0" }}>
              <tr style={{ display: "inline" }}>
                <td style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", paddingLeft: "10px", width: "100%" }}>
                  <span style={{ fontSize: "14px" }}>
                    Discount Applied
                  </span>
                  <span style={{ fontSize: "14px" }}>₹ 30,000</span>
                </td>
                <td style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: "5px", paddingLeft: "10px", width: "100%" }}>
                  <span style={{ fontSize: "14px" }}>Calculated Amount</span>
                  <span style={{ fontSize: "14px" }}>₹ 9,999</span>
                </td>
                <td style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: "5px", paddingLeft: "10px", width: "100%" }}>
                  <span style={{ fontSize: "14px" }}>
                    Convenience charge(3%)
                  </span>
                  <span style={{ fontSize: "14px" }}>
                    ₹ 299
                  </span>
                </td>
              </tr>
              {/* <p className="text-2xs" style={{ marginTop: "10px" }}>
                  {" "}
                  EDNEED50%{" "}
                </p> */}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #000" }}>
            <td colspan="2" style={{ textAlign: "left", width: "100%" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", paddingLeft: "10px" }}>
                <span>
                  Total Invoice Amount
                </span>
                <span>
                  ₹ 10,298
                </span>
              </div>
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #000" }}>
            <td
              colspan="4"
              style={{ textAlign: "center", padding: "10px 0" }}
            >
              <p style={{ fontSize: "18px", fontWeight: "600" }}>
                Thank you for business with Edneed
              </p>
              <p style={{ fontSize: "12px" }}>
                This document is for your records only and does not represent
                a balance due.
              </p>
            </td>
          </tr>
        </table>
      ) : (
        <ComponentLoader />
      )}
    </React.Fragment>
  );
};
export default PrintInvoice;
