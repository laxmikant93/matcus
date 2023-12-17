import React from 'react';
import { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstituteData } from '../../../../../store/actions/businessInfo';
import { customerOrderDetail, customerOrderDetailReset } from '../../../../../store/actions/ecommerce/action/cartOrder';
import invoiceLogo from '../../assets/images/invoicelogo.png';


const Invoice = ({ orderDetails }) => {
  const [orderDetail, setOrderDetails] = useState([]);
  const [NetTotal, setNetTotal] = useState([]);

  const dispatch = useDispatch();
  const customerOrder = useSelector((state) => state.orderCartList.customerOrderDetail);
  const { getInstituiteData } = useSelector((state) => state.businessInfo);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(customerOrderDetail(orderDetails._id));
  }, [dispatch]);


  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type])

  useEffect(() => {
    if (customerOrder.success === true) {
      setOrderDetails(customerOrder.data);
    }
  }, [customerOrder, orderDetails._id]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // console.log(customerOrder?.data?.orderProduct)
  const [totalAmount, setTotalAmount] = useState("")
  useEffect(() => {
    if (orderDetail && orderDetail.orderTotal) {
      setTotalAmount(orderDetail.orderTotal)

    }
  }, [orderDetail, orderDetail.orderTotal])

  var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only ' : '';
    return str;
  }

  let result = inWords(totalAmount)

  const paymentMode = (value) => {
    let resultValue = ""
    if (value) {
      value = value.substring(0, 1).toUpperCase() + value.substring(1);
      resultValue = value.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
    }
    return resultValue
  }

  useEffect(() => {
    if (orderDetail && orderDetail.orderProduct && orderDetail.orderProduct.length > 0) {
      let array = NetTotal;
      let net_total;
      let price;
      for (let index = 0; index < orderDetail.orderProduct.length; index++) {
        const element = orderDetail.orderProduct[index];
        if (element?.discountPercentage > 0) {
          if (element?.defaultVariation) {
            if (element?.discount_by_percent) {
              price = Math.ceil((100 - element.discountPercentage) / 100 * (element.price));
              net_total = price * element.quantity_of_products;
            }
            else {
              price = Math.ceil(element.price - element.discountPercentage);
              net_total = price * element.quantity_of_products;
            }
          }
          else {
            if (element?.discount_by_percent) {
              price = Math.ceil((100 - element.discountPercentage) / 100 * (element.price + element.salePrice));
              net_total = price * element.quantity_of_products;
            }
            else {
              price = Math.ceil((element.price + element.salePrice) - element.discountPercentage);
              net_total = price * element.quantity_of_products;
            }
          }
        }
        else {
          if (element?.defaultVariation) {
            price = element.price;
            net_total = price * element.quantity_of_products;
          }
          else {
            price = element.price + element.salePrice;
            net_total = price * element.quantity_of_products;
          }
        }
        array.push({
          id: element._id,
          amount: net_total
        });
      }
      setNetTotal([...array]);
    }
  }, [orderDetail])

  useEffect(() => {
    return () => {
      setNetTotal([]);
      dispatch(customerOrderDetailReset());
    }
  }, [dispatch])


  return (
    <React.Fragment>
      {customerOrder.success ?
        <div style={{ padding: '36px', backgroundColor: "#fff", width: '595px', height: 'auto', margin: 'auto', zIndex: '-1' }}>
          <table style={{ width: "100%", backgroundColor: "#fff" }} >
            <tbody style={{ width: '100%', height: '100%' }}>
              <tr style={{ height: '70px' }} >
                <td style={{ width: '14%' }} >
                  <div style={{ width: '70px', height: '70px', display: 'inline-block', verticalAlign: 'text-top' }} >
                    <img src={getInstituiteData.success ? getInstituiteData.data ?
                      getInstituiteData.data.business_logo : invoiceLogo : ""} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'center', }} />
                  </div>
                </td>
                <td style={{ verticalAlign: 'text-top', paddingLeft: '12px' }}>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>{`${getInstituiteData.success && getInstituiteData.data ?
                    getInstituiteData.data.business_name : ""}`}
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: '400', color: '#000', lineHeight: '18px' }} >
                    {/* {` ${getInstituiteData.success && getInstituiteData.data ?getInstituiteData.data.business_phone : ""}`} */}
                    {` ${getInstituiteData.success && getInstituiteData.data && getInstituiteData.data.business_address ?
                      `${getInstituiteData.data.business_address} ,` : ""} ${getInstituiteData.success && getInstituiteData?.data?.business_country ?
                        getInstituiteData.data.business_country : ""}  ${getInstituiteData.success && getInstituiteData?.data?.business_phone ?
                          getInstituiteData.data.business_phone : ""}`}
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: '400', color: '#000', lineHeight: '18px' }}> {` ${getInstituiteData.success && getInstituiteData?.data?.business_city ?
                    `${getInstituiteData.data.business_city} ,` : ""}  ${getInstituiteData.success && getInstituiteData?.data?.business_state ?
                      getInstituiteData.data.business_state : ""}
                        ${getInstituiteData.success && getInstituiteData?.data?.business_zipcode ?
                      getInstituiteData.data.business_zipcode : ""}`}</p>

                </td>
                <td style={{ verticalAlign: 'text-top' }}>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#000', verticalAlign: 'text-top', textAlign: 'end' }}>INVOICE</p>
                </td>
              </tr>
              <tr >
                <td colSpan={6} style={{ paddingTop: '46px', textAlign: 'left', width: '', verticalAlign: 'text-top' }}>
                  <tr>
                    <td>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>Bill To</p>
                      <p style={{ fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '18px' }} >{`${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.name : ""}`}</p>
                      <p style={{ fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '18px' }}>{`${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.fullAddress : ""}  ${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.city : ""}`} </p>
                      < p style={{ fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '18px' }}>{` ${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.state : ""} ${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.pinCode : ""}`} </p>
                      < p style={{ fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '18px' }}>{orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.phone : ""}</p>
                    </td>
                    <td style={{ paddingLeft: '24px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>Ship to</p>
                      <p style={{ fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '18px' }} >{` ${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.name : ""}  `}</p>
                      < p style={{ fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '18px' }}>{`${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.fullAddress : ""} ${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.city : ""}`}</p>
                      < p style={{ fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '18px' }}>{` ${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.state : ""} ${orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.pinCode : ""}`}</p>
                      < p style={{ fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '18px' }}>{orderDetail && orderDetail.orderAddress ? orderDetail.orderAddress.phone : ""}</p>
                    </td>
                    <td style={{ paddingLeft: '36px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#000', paddingTop: '0px' }}>Invoice# <span style={{ fontSize: '12px', fontWeight: '400', color: '#000', lineHeight: '18px', paddingLeft: '34px' }}>{orderDetail ? orderDetail.receipt : ""}</span></p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#000', paddingTop: '10px' }}>Invoice Date <span style={{ fontSize: '12px', fontWeight: '400', color: '#000', lineHeight: '18px', paddingLeft: '30px', textAlign: 'right' }}>{orderDetail && orderDetail.receipt_generation_date ? orderDetail.receipt_generation_date.substring(0, 10) : ""}</span> <p style={{ fontSize: '12px', fontWeight: '400', color: '#000', lineHeight: '18px', textAlign: 'right' }}>{orderDetail && orderDetail.receipt_generation_date ? moment(orderDetail.receipt_generation_date).format("hh:mm A") : ""}</p></p>
                    </td>
                  </tr>
                </td>
                <td>
                </td>
                <td>
                </td>
              </tr>
              {/* product description table */}
              <tr>
                <td colSpan={6} style={{ overflowWrap: "break-word", wordBreak: "break-word", paddingTop: '40px' }}>
                  <table style={{ width: '100%' }} >
                    <thead style={{ width: '100%' }} >
                      <tr style={{ width: '100%' }} >
                        <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "10px", borderCollapse: "collapse", fontSize: "12px", fontWeight: "600", lineHeight: "15px", textAlign: "center", background: '#E9E9E9', color: '#000', width: '10%', }}>S.No.</th>
                        <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "12px", fontWeight: "600", lineHeight: "15px", textAlign: "center", backgroundColor: '#E9E9E9', color: '#000', width: '45%' }}>Description</th>
                        <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "12px", fontWeight: "600", lineHeight: "15px", textAlign: "center", backgroundColor: '#E9E9E9', color: '#000', width: '15%' }}>Unit Price</th>
                        <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "12px", fontWeight: "600", lineHeight: "15px", textAlign: "center", backgroundColor: '#E9E9E9', color: '#000', width: '10%' }}>Qty</th>
                        <th style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", padding: "5px", borderCollapse: "collapse", fontSize: "12px", fontWeight: "600", lineHeight: "15px", textAlign: "center", backgroundColor: '#E9E9E9', color: '#000', width: '20%' }}>Net Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orderDetail && orderDetail.orderProduct && orderDetail.orderProduct.length > 0 ? (
                        orderDetail.orderProduct.map((item, i) => {
                          return (
                            <React.Fragment>
                              < tr >
                                <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "8px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "center", }}>
                                  <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>{i + 1}.</p>
                                </td>
                                <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "8px", fontSize: "13px", fontWeight: "500", lineHeight: "18px", textAlign: "start", }}>
                                  <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>{item.variationName}</p>
                                  {/* <p style={{ display: 'inline-block', fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '12px' }}> <span > Size :</span> <span>M</span>  </p> */}
                                  {/* <p style={{ display: 'inline-block', fontSize: '10px', fontWeight: '400', color: '#000', lineHeight: '12px' }}><span>Colour :</span> <span>Red</span></p> */}
                                </td>
                                <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "18px", textAlign: "start", color: '#000' }}>
                                  {item?.discountPercentage > 0 ?
                                    <>
                                      {item?.defaultVariation ?
                                        <>
                                          {item?.discount_by_percent ?
                                            <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>
                                              {Math.ceil((100 - item.discountPercentage) / 100 * (item.price))}
                                            </p>
                                            :
                                            <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>
                                              {Math.ceil(item.price - item.discountPercentage)}
                                            </p>
                                          }
                                        </>
                                        :
                                        <>
                                          {item?.discount_by_percent ?
                                            <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>
                                              {Math.ceil((100 - item.discountPercentage) / 100 * (item.price + item.salePrice))}
                                            </p>
                                            :
                                            <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>
                                              {Math.ceil((item.price + item.salePrice) - item.discountPercentage)}
                                            </p>
                                          }
                                        </>
                                      }
                                    </>
                                    :
                                    <>
                                      {item?.defaultVariation ?
                                        <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>
                                          {item.price}
                                        </p>
                                        :
                                        <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>
                                          {item.price + item.salePrice}
                                        </p>
                                      }
                                    </>
                                  }
                                  {/* <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>
                                  {item.price}
                                </p> */}
                                </td>
                                <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "18px", textAlign: "center", color: '#000' }}>
                                  <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>
                                    {item.quantity_of_products}
                                  </p>
                                </td>
                                <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "18px", textAlign: "start", color: '#000' }}>
                                  <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>
                                    {NetTotal ? NetTotal.length ? NetTotal.map((total, key) => {
                                      return (
                                        <React.Fragment key={key}>
                                          {total.id === item._id ? total.amount ? total.amount : " " : ""}
                                        </React.Fragment>
                                      );
                                    }) : " "
                                      : " "}
                                  </p>
                                </td>
                              </tr>


                            </React.Fragment>
                          )

                        })) : ("")}
                      <tr>
                        <td></td>
                        <td></td>
                        <td colSpan='2'>
                          <p style={{ fontSize: '14px', fontWeight: '600', lineHeight: '18px', color: '#000', textAlign: 'end', paddingRight: '12px' }} >Total Amount</p>
                        </td>
                        <td style={{ overflowWrap: "break-word", wordBreak: "break-word", border: "1px solid black", borderCollapse: "collapse", padding: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "18px", textAlign: "start", color: '#000', backgroundColor: '#E9E9E9' }}>
                          <p style={{ fontSize: '12px', fontWeight: '500', lineHeight: '18px', color: '#000' }}>{`₹ ${orderDetail && orderDetail.orderTotal ? orderDetail.orderTotal : " "}`}</p>
                        </td>
                      </tr>
                    </tbody>

                  </table>
                </td>
              </tr>

              {/* amount in words section */}
              <tr style={{ paddingTop: '24px' }}>
                <td colSpan='6' style={{ paddingTop: '16px' }}>
                  <hr style={{ paddingTop: '16px' }} />
                  <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '18px', color: '#000' }}><span style={{ fontWeight: '600', }}>Amount in words: &nbsp;</span> {result}</p>
                  <hr style={{ marginTop: '16px' }} />
                </td>
              </tr>

              {/* signature section */}
              <tr>
                <td colSpan='6' style={{ textAlign: "end", paddingTop: '16px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', lineHeight: '21px', color: '#000' }}>Authorized Signatory</p>
                  <p style={{ fontSize: '13px', fontWeight: '400', lineHeight: '21px', color: '#000', paddingTop: '5px' }}>{`${getInstituiteData.success && getInstituiteData.data ?
                    getInstituiteData.data.business_name : ""}`}</p>
                  <hr style={{ marginTop: '12px' }} />
                </td>
              </tr>
              {/* 
            Payment Transaction ID section */}
              <tr>
                <td colSpan='6' style={{ paddingTop: '16px' }}>
                  <tr>
                    <td>
                      {orderDetail && orderDetail?.payment_id &&
                        <p style={{ fontSize: '14px', fontWeight: '600', lineHeight: '21px', color: '#000', }}>Payment Transaction ID :</p>
                      }
                      <p style={{ fontSize: '14px', fontWeight: '600', lineHeight: '21px', color: '#000', paddingTop: '4px' }}>Date & Time :</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', lineHeight: '21px', color: '#000', paddingTop: '4px' }}>Invoice Value :</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', lineHeight: '21px', color: '#000', paddingTop: '4px' }}>Mode of Payment :</p>

                    </td>
                    <td>
                      {orderDetail && orderDetail?.payment_id &&
                        <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '21px', color: '#000', paddingLeft: '36px', }}>{orderDetail && orderDetail?.payment_id}</p>}
                      <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '21px', color: '#000', paddingLeft: '36px', paddingTop: '4px' }}>{orderDetail && orderDetail.receipt_generation_date && orderDetail.receipt_generation_date.substring(0, 10)} <span>{orderDetail && orderDetail.receipt_generation_date ? orderDetail && orderDetail.receipt_generation_date && moment(orderDetail.receipt_generation_date).format("hh:mm A") : "-"}</span> </p>
                      <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '21px', color: '#000', paddingLeft: '36px', paddingTop: '4px' }}>{`₹ ${orderDetail && orderDetail.orderTotal}`}</p>
                      <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '21px', color: '#000', paddingLeft: '36px', paddingTop: '4px' }}>{paymentMode(orderDetail && orderDetail.order_payment_method)}</p>
                    </td>
                  </tr>
                  {/* <div style={{ display: 'inline-block' }}>

                </div>
                <div style={{ display: 'inline-block' }}>

                </div> */}



                </td >
              </tr>
            </tbody>
          </table>
        </div>
        : ""
      }

    </React.Fragment >
  )
}

export default Invoice