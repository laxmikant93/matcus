/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import SiteLogo from "./DAV-Logo-for-Website.png";
import OwnerSignature from "./pooja-sign.png";
import { useSelector, useDispatch } from "react-redux";
import { getInstituteData } from "../../../store/actions/checkdomain";
import { useParams } from "react-router-dom";
import { getStudentInvoiceData } from "../../../store/actions/feeManagementStudent";
const StudentInvoicePrint = () => {

  const printRef = useRef();
  const { receiptId } = useParams()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentInvoiceData(receiptId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const { users, instituteWebsite, getInvoiceDataSuccess, getInvoiceData } = useSelector((state) => {
    return {
      instituteData: state.user,
      users: state.user,
      instituteWebsite: state.institutewebsite.data,
      getInvoiceDataSuccess: state.feeManagementStudent.getInvoiceData.success,
      getInvoiceData: state.feeManagementStudent.getInvoiceData.data.response

    };
  });



  const { user_fullname, user_fulladdress, user_institute, user_institute_institute_name } = users;

  const { institute_logo, institute_address, institute_address_line2 } = instituteWebsite





  const print = () => {
    printRef.current.style.display = 'none';
    window.print();
  }


  useEffect(() => {
    dispatch(getInstituteData(user_institute));
  }, [dispatch])


  return (
    <React.Fragment>
      <React.Fragment>
        <div className="print-invoice-table" >
          <div className="page-a4">
            <table className="print-invoice" width="100%">
              <tr className="printButtonWrapper">
                <td valign="bottom">
                  <button ref={printRef} className="button button-base white btn-sm printButtton" onClick={print}>
                    <i className="ed-printer"></i>
                    PRINT
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <table className="inner-table">
                    <tr>
                      <td valign="bottom">
                        <img
                          // src={SiteLogo}
                          src={institute_logo}
                          alt=""
                          className="print-site-logo"
                        />
                      </td>
                      <td
                        valign="bottom"
                        width="100%"
                        style={{ textAlign: "right" }}
                      >
                        <h1 className="text-sm">Invoice</h1>
                        <h6 className="text-xxs w-400">Original for Recipient</h6>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr className="border-tb">
                <td>
                  <table
                    className="inner-table"
                    cellPadding="0"
                    cellSpacing="0"
                    width="100%"
                  >
                    <tr>

                      <td valign="top" width="50%">
                        <p>Invoice Number:</p>
                        <p>
                          <strong>HIN32312984</strong>
                        </p>
                      </td>
                      <td valign="top" width="50%">
                        <p>Invoice Date:</p>
                        {getInvoiceDataSuccess && getInvoiceData ?
                          <p>
                            <strong>{getInvoiceData.paymentDate}</strong>
                          </p> : ""}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr className="border-btm">
                <td>
                  <table
                    className="inner-table"
                    cellPadding="0"
                    cellSpacing="0"
                    width="100%"
                  >
                    <tr>
                      <td valign="top" width="50%">
                        <p>Payee Details</p>
                        <p>
                          <strong>{user_fullname}</strong>
                        </p>
                        <address>

                          {user_fulladdress}

                        </address>
                      </td>
                      <td valign="top" width="50%">
                        <p>School Details</p>
                        <p>
                          <strong>
                            {user_institute_institute_name}
                          </strong>
                        </p>
                        <address>
                          {institute_address}
                          <br />
                          {institute_address_line2}
                          <br />


                        </address>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ height: "10px" }}>
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    className="inner-table"
                    cellPadding="0"
                    cellSpacing="0"
                    width="100%"
                  >
                    <tr>
                      <td>
                        <h3>Order Details</h3>
                      </td>
                      <td>
                        <p>All amounts are in INR</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    className="inner-table"
                    cellPadding="0"
                    cellSpacing="0"
                    width="100%"
                  >
                    <tr className="border-tb">
                      <th width="20%">
                        <p>#</p>
                      </th>
                      <th width="50%">
                        <p>Item</p>
                      </th>
                      <th width="30%">
                        <p>Price</p>
                      </th>
                    </tr>
                    {getInvoiceDataSuccess && getInvoiceData.feestructure && getInvoiceData.feestructure.map((elem, index) =>
                      <tr key={index}>

                        <td width="20%">
                          <p>{index + 1}</p>
                        </td>
                        <td width="50%">

                          <p>
                            <strong>{elem.type}</strong>
                          </p>
                        </td>
                        <td width="30%">
                          <p>₹{elem.amount}</p>
                        </td>
                      </tr>)}
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    className="inner-table"
                    cellPadding="0"
                    cellSpacing="0"
                    width="100%"
                  >
                    <tr
                      style={{
                        borderTop: "1px solid #000000",
                        borderBottom: "1px solid #000000",
                      }}
                    >
                      <td
                        valign="top"
                        rowSpan="2"
                        width="60%"
                        style={{
                          borderRight: "1px solid #000000",
                          paddingTop: "10px",
                        }}
                      >
                        <p>
                          <strong>
                            {/* DAV Public School, Berhampur, Odisha */}
                            {user_institute_institute_name}
                            <br />
                            {institute_address}
                          </strong>
                        </p>
                        {/* <p>
                            <img
                              src={OwnerSignature}
                              alt=""
                              style={{ maxWidth: "180px", marginTop: "10px" }}
                            />
                          </p>
                          <p>Pooja Sharma</p> */}
                        <p>Authorized Signatory</p>
                      </td>
                      <td width="40%">
                        <p>
                          {/* Calculated Amount <strong>₹9,400</strong> */}
                        </p>
                        {getInvoiceDataSuccess && getInvoiceData
                          ? <>
                            <p>Scholarship  ₹{getInvoiceData.feeStudentDiscount}</p>
                            <p>Discount - ₹{getInvoiceData.feeStudentDiscount}</p>
                            <p>Convenience Fees(3%) -₹{getInvoiceData.paymentType !== "Manual" ? (getInvoiceData.totalAmount - (getInvoiceData.feeStudentScholorship + getInvoiceData.feeStudentDiscount)) * 3 / 100 : 0}</p>
                          </> : ""}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #000000" }}>
                      <td width="40%">
                        {getInvoiceDataSuccess && getInvoiceData ?
                          (getInvoiceData.paymentType === "Manual" ? <p>
                            <strong>Total Invoice Amount ₹{(getInvoiceData.totalAmount - (getInvoiceData.feeStudentScholorship + getInvoiceData.feeStudentDiscount))}</strong>
                          </p> :
                            <p>
                              <strong>Total Invoice Amount ₹{(getInvoiceData.totalAmount - (getInvoiceData.feeStudentScholorship + getInvoiceData.feeStudentDiscount)) + ((getInvoiceData.totalAmount - (getInvoiceData.feeStudentScholorship + getInvoiceData.feeStudentDiscount)) * 3 / 100)}</strong>
                            </p>
                          ) : ""}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{ padding: "1rem 0", textAlign: "center" }}
                >
                  {/* <h3>DAV Public School, Berhampur, Odisha</h3> */}
                  <h3>{user_institute_institute_name}, {institute_address}</h3>
                  <p>
                    This document is for your records only and does not
                    represent a balance due.
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default StudentInvoicePrint;
