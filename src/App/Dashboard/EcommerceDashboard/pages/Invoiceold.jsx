import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './invoice.scss';
import Logo from '../assets/icons/edneedLogo.png'
import { customerOrderDetail, getOrderList } from '../../../../store/actions/ecommerce/action/cartOrder';
import { getInstituteData } from '../../../../store/actions/businessInfo';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';

const Invoiceold = ({ orderDetails }) => {
  const [orderDetail, setOrderDetails] = useState();

  const { customerOrderDetail: detail } = useSelector((state) => state.orderCartList);
  const { getInstituiteData } = useSelector((state) => state.businessInfo);
  const user = useSelector((state) => state.user);

  const { orderId } = useParams();
  const dispatch = useDispatch();
  // console.log(orderId, "orderId")
  useEffect(() => {
    dispatch(customerOrderDetail(orderDetails._id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type])



  useEffect(() => {
    if (detail.success === true) {
      setOrderDetails(detail.data);
    }
  }, [detail, orderDetails._id]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/ecommerce/orderList/:id/OrderList/" title="Orders" />
        <BreadcrumbItem to={`/ecommerce/invoice/${orderId}`} title="Invoice" />
      </Breadcrumb>
      <div className="flex between-xs middle-xs ">
        {/* <h4 className="mb-20 text-sm w-500 mt-30">Invoice</h4>
        <button
          className="button button-xs button-base"
          onClick={() => window.print()}
        >
          &#x1F5B6;&nbsp;Print Invoice
        </button> */}
        <div className="order-invoice-custom">
          <table className="" style={{ width: "100%", backgroundColor: "#fff" }}>
            <tr style={{ height: "100px" }}>
              <td style={{ overflowWrap: "break-word", wordBreak: "break-word", textAlign: "left", paddingLeft: "40px", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>
                <img src={getInstituiteData.success && getInstituiteData.data ?
                  getInstituiteData.data.business_logo : Logo} alt="Edneed Logo" style={{ width: "150px" }} />
              </td>
              <td colspan="3" style={{ overflowWrap: "break-word", wordBreak: "break-word", textAlign: "right", paddingLeft: "10px", paddingRight: "40px", paddingTop: "10px", paddingBottom: "10px" }}>
                <p style={{ fontSize: "22px", fontWeight: "600", whiteSpace: "nowrap" }}>Tax Invoice/Bill of Supply/Cash Memo</p>
                <p style={{ fontSize: "20px", fontWeight: "500" }}>
                  (Original for Recipient)
                </p>
              </td>
            </tr>
            <tr style={{}}>
              <td style={{ overflowWrap: "break-word", wordBreak: "break-word", textAlign: "left", paddingLeft: "40px", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px", width: "50%" }}>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Sold By:</p>
                <p style={{ fontSize: "14px" }}>{`${getInstituiteData.success && getInstituiteData.data ?
                  getInstituiteData.data.business_name : ""}
                ${getInstituiteData.success && getInstituiteData.data ?
                    getInstituiteData.data.business_phone : ""}
                  ${getInstituiteData.success && getInstituiteData.data ?
                    getInstituiteData.data.business_address : ""}, ${getInstituiteData.success && getInstituiteData.data ?
                      getInstituiteData.data.business_country : ""} ,
                    ${getInstituiteData.success && getInstituiteData.data ?
                    getInstituiteData.data.business_city : ""} ,  ${getInstituiteData.success && getInstituiteData.data ?
                      getInstituiteData.data.business_state : ""}
                        ${getInstituiteData.success && getInstituiteData.data ?
                    getInstituiteData.data.business_zipcode : ""}`}</p>
              </td>
              <td colspan="3" style={{ overflowWrap: "break-word", wordBreak: "break-word", textAlign: "right", paddingLeft: "10px", paddingRight: "40px", paddingTop: "10px", paddingBottom: "10px", width: "50%" }}>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Billing Address:</p>
                <p style={{ fontSize: "14px", fontWeight: "500" }}>{orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.name}</p>
                <p style={{ fontSize: "14px", fontWeight: "500", textTransform: "uppercase" }}> {orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.addressType},  {orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.fullAddress} <br />
                  {orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.city},  </p>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>State/UT code: <span style={{ fontWeight: "500" }}>{orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.state}</span></p>
              </td>
            </tr>
            <tr>
              <td style={{ overflowWrap: "break-word", wordBreak: "break-word", textAlign: "left", paddingLeft: "40px", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>
                <p style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase" }}>PAN NO: <span style={{ fontWeight: "500" }}></span></p>
                <p style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase" }}>State/UT code: <span style={{ fontWeight: "500" }}></span></p>
              </td>
            </tr>
            <tr>
              <td colSpan={4} style={{ overflowWrap: "break-word", wordBreak: "break-word", textAlign: "right", paddingLeft: "40px", paddingRight: "40px", paddingTop: "10px", paddingBottom: "10px" }}>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Shipping Address:</p>
                <p style={{ fontSize: "14px", fontWeight: "500" }}>{orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.name}</p>
                <p style={{ fontSize: "14px", fontWeight: "500", textTransform: "uppercase", width: "50%", marginLeft: "auto" }}>{orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.addressType},  {orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.fullAddress} <br />
                  {orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.city}</p>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>State/UT code: <span style={{ fontWeight: "500" }}></span>{orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.state}</p>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Place of Supply: <span style={{ fontWeight: "500", textTransform: "uppercase" }}>{orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.state}</span></p>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Place of delivery: <span style={{ fontWeight: "500", textTransform: "uppercase" }}>{orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.state}</span></p>
              </td>
            </tr>
            <tr style={{}}>
              <td style={{ overflowWrap: "break-word", wordBreak: "break-word", textAlign: "left", paddingLeft: "40px", paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px", width: "50%" }}>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Order Number: <span style={{ fontWeight: "500" }}>{orderDetail && orderDetail._id && orderDetail._id}</span></p>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Order Date: <span style={{ fontWeight: "500" }}>{orderDetail && orderDetail.createdAt && orderDetail.createdAt.substring(0, 10)}</span></p>
              </td>
              <td colspan="3" style={{ overflowWrap: "break-word", wordBreak: "break-word", textAlign: "right", paddingLeft: "10px", paddingRight: "40px", paddingTop: "10px", paddingBottom: "10px", width: "50%" }}>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Invoice Number: <span style={{ fontWeight: "500" }}></span></p>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Invoice Detaild: <span style={{ fontWeight: "500" }}></span></p>
                <p style={{ fontSize: "14px", fontWeight: "700" }}>Invoice Date: <span style={{ fontWeight: "500" }}></span></p>
              </td>
            </tr>
            <tr>
              <td colSpan={9} style={{ overflowWrap: "break-word", wordBreak: "break-word", paddingLeft: "40px", paddingRight: "40px", paddingTop: "30px", paddingBottom: "0" }}>
                <table style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "14px", fontWeight: "600", lineHeight: "15px", textAlign: "start" }}>SI.No</th>
                      <th style={{ overflowWrap: "break-word", wordBreak: "break-word", width: "40%", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "14px", fontWeight: "600", lineHeight: "15px", textAlign: "start" }}>Discription</th>
                      <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "14px", fontWeight: "600", lineHeight: "15px", textAlign: "start" }}>Unit Price</th>
                      <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "14px", fontWeight: "600", lineHeight: "15px", textAlign: "start" }}>Qty</th>
                      <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "14px", fontWeight: "600", lineHeight: "15px", textAlign: "start" }}>Net Amount</th>
                      <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "14px", fontWeight: "600", lineHeight: "15px", textAlign: "start" }}>Tax Rate</th>
                      <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "14px", fontWeight: "600", lineHeight: "15px", textAlign: "start" }}>Tax type</th>
                      <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "14px", fontWeight: "600", lineHeight: "15px", textAlign: "start" }}>Tax Amount</th>
                      <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "14px", fontWeight: "600", lineHeight: "15px", textAlign: "start" }}>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start" }}>1</td>
                      <td style={{ overflowWrap: "break-word", wordBreak: "break-word", width: "40%", border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start", wordWrap: "break-word" }}>{(orderDetail && orderDetail.length) && orderDetail.LightBoxHeader.variationName} {(orderDetail && orderDetail.length) && orderDetail.LightBoxHeader.description}</td>
                      <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start" }}>{(orderDetail && orderDetail.length) && orderDetail.orderTotal}</td>
                      <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start" }}>{(orderDetail && orderDetail.length) && orderDetail.LightBoxHeader.quantity}</td>
                      <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start" }}>{(orderDetail && orderDetail.length) && orderDetail.orderTotal}</td>
                      <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start" }}>-</td>
                      <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start" }}>-</td>
                      <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start" }}>-</td>
                      <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start" }}>{(orderDetail && orderDetail.length) && orderDetail.orderTotal}</td>
                    </tr>
                    <tr>
                      <td colSpan={7} style={{ border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "700", lineHeight: "18px", textAlign: "start" }}>TOTAL:</td>
                      <td style={{ border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "700", lineHeight: "18px", textAlign: "start" }}>{orderDetail && orderDetail.orderTotal}</td>
                      <td style={{ border: "1px solid black", borderCollapse: "collapse", padding: "5px", fontSize: "13px", fontWeight: "700", lineHeight: "18px", textAlign: "start" }}>{orderDetail && orderDetail.orderTotal}</td>
                    </tr>
                    <tr>
                      <td colSpan={9} style={{ border: "1px solid black", borderCollapse: "collapse", padding: "5px", textAlign: "start" }}>
                        <p style={{ wordWrap: "break-word", fontSize: "13px", fontWeight: "700", lineHeight: "18px", textTransform: "capitalize" }}>Amount in Words</p>
                        <p style={{ wordWrap: "break-word", fontSize: "13px", fontWeight: "700", lineHeight: "18px", textTransform: "capitalize" }}></p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={9} style={{ border: "1px solid black", borderCollapse: "collapse", padding: "5px", textAlign: "end" }}>
                        <p style={{ fontSize: "13px", fontWeight: "700", lineHeight: "18px", textTransform: "capitalize" }}>{`For  ${getInstituiteData.success && getInstituiteData.data ?
                          getInstituiteData.data.business_name : ""}`}</p>
                        <div style={{ height: "80px", width: "150px", marginLeft: "auto" }}>
                          {/* <img src="https://images.squarespace-cdn.com/content/v1/5f9c87493dc9a0416e8b1e6d/8ee4a2bf-c0e5-4a0b-93e9-626963626fc5/sigsal-logo-black-w-tag.png"
                          style={{ maxWidth: "100%" }} alt="" /> */}
                        </div>
                        <p style={{ fontSize: "13px", fontWeight: "700", lineHeight: "18px", textTransform: "capitalize" }}>Authorized Signatory</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={9} style={{ overflowWrap: "break-word", wordBreak: "break-word", paddingLeft: "40px", paddingRight: "40px", paddingTop: "0", paddingBottom: "20px", fontSize: "14px" }}>
                Whether tax is payable under reverse changes NO.
              </td>
            </tr>
            <tr>
              <td colspan={9} style={{ overflowWrap: "break-word", wordBreak: "break-word", paddingLeft: "40px", paddingRight: "40px" }}>
                <tr>
                  <td style={{ border: "1px solid black", borderCollapse: "collapse", width: "45%", padding: "5px", textAlign: "start" }}>
                    <h5 style={{ fontWeight: "700", fontSize: "14px" }}>Payment Transation ID:</h5>
                    <p style={{ fontWeight: "500", fontSize: "14px" }}></p>
                  </td>
                  <td style={{ border: "1px solid black", borderCollapse: "collapse", width: "18.33%", padding: "5px", textAlign: "start" }}>
                    <h5 style={{ fontWeight: "700", fontSize: "14px" }}>Date & time: <span style={{ fontWeight: "500", fontSize: "14px" }}>{orderDetail && orderDetail.createdAt && orderDetail.createdAt.substring(0, 10)}</span></h5>
                  </td>
                  <td style={{ border: "1px solid black", borderCollapse: "collapse", width: "16.33%", padding: "5px", textAlign: "start" }}>
                    <h5 style={{ fontWeight: "700", fontSize: "14px" }}>Invoice Value:</h5>
                    <p style={{ fontWeight: "500", fontSize: "14px" }}>{orderDetail && orderDetail.orderTotal}</p>
                  </td>
                  <td style={{ border: "1px solid black", borderCollapse: "collapse", width: "20.33%", padding: "5px", textAlign: "start" }}>
                    <h5 style={{ fontWeight: "700", fontSize: "14px" }}>Mode of Payment:</h5>
                    <p style={{ fontWeight: "500", fontSize: "14px" }}>Online</p>
                  </td>
                </tr>
                <tr>
                  {/* <td colSpan={9} style={{ textAlign: "center", margin: "auto", paddingLeft: "40px", paddingRight: "40px", paddingTop: "60px", paddingBottom: "30px" }}>
                  <p style={{ color: "#a5a5a5", display: "block", margin: "auto", fontSize: "12px", fontWeight: "400", lineHeight: "16px", width: "80%" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores in consequuntur soluta sunt? Sunt, cum. Hic, molestiae voluptate autem earum ex quo reprehenderit ad deserunt, quidem aut sequi nobis libero!</p>
                </td> */}
                </tr>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </React.Fragment >
  )
}

export default Invoiceold