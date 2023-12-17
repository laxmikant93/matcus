import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './orderDetails.scss';
import '../../CommonComponent/CommonJsx/OtherItem/otheritem.scss'
import Image1 from '../../assets/images/bestSeller1.png'
import { customerOrderDetailReset, customerOrderSingleDetail, getSingleOrderOfOtheritems, resetCancelUpdateStatus, shippingDetails, updateCustomerStatus } from '../../../../store/actions/ecommerce/action/cartOrder';
// import { getSavedCustomer } from '../../../../store/actions/ecommerce/action/auth';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import moment from 'moment/moment';
import { convertToIndianFormat } from '../../../../CommonFunctions/helperFunction';
import DefaultImage from '../../assets/images/Product_default.jpg'
import Otheritem from '../../CommonComponent/CommonJsx/OtherItem/Otheritem';
import Shoes from '../../assets/images/product-1.png'
import Modal from '../../../../Common/Modal';
import { priceCalculator } from '../../CommonComponent/commonFunction/PriceCalculator';

import ModalBody from '../../../../Common/Modal/ModalBody';
import ContectUs from './ContectUs';
import ModalHeader from '../../../../Common/Modal/ModalHeader';
import ModalFooter from '../../../../Common/Modal/ModalFooter';
import DeleteConfirmPop from '../../../../App/Dashboard/EcommerceDashboard/Component/DeleteConfirmPop/DeleteConfirmPop';
const OrderDetails = () => {
  const [order, setOrder] = useState({});
  // const [total, setTotal] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState("")
  const [elseSubOrder, setElseSubOrder] = useState("")


  const [contactPage, setContactPage] = useState(false)
  const [modalStateClose, setModalStateClose] = useState(true);
  const [openDeletePop, setOpenDeletePop] = useState(-1);
  const [openAllCancelPop, setOpenAllCancelPop] = useState(-1)
  // const { customerOrderDetail: detail, currency } = useSelector((state) => {
  //   return {
  //     detail: state.orderCartList,
  //     currency: state.currencyList,
  //   }
  // });
  const { getSingleOrderData, getSingleOrderSuccess, customerOrderDetail: detail, currency, statusUpdateSuccss, statusUpdateLoading } = useSelector((state) => {
    return {
      getSingleOrderData: state.orderCartList.getSingleOrderNsubOrders.data,
      getSingleOrderSuccess: state.orderCartList.getSingleOrderNsubOrders.success,
      statusUpdateSuccss: state.orderCartList.updateCustomerStatus.success,
      statusUpdateLoading: state.orderCartList.updateCustomerStatus.loading,
      detail: state.orderCartList,
      currency: state.currencyList,
    }
  });
  // console.log(statusUpdateSuccss, " successs")
  // console.log(statusUpdateLoading, " loadin")
  const dispatch = useDispatch();
  const history = useNavigate();
  // const { customerDetail } = useSelector((state) => state.ecomAuth);
  // const user = useSelector((state) => state.user);
  // const subdomainuser = useSelector((state) => state.subdomainuser);
  // orderId, SuborderID
  const { orderId, productId } = useParams();

  // console.log(getSingleOrderData, "getSingleOrderDatagetSingleOrderDatas")
  useEffect(() => {
    // dispatch(getSavedCustomer());
    dispatch(getSingleOrderOfOtheritems(orderId, productId));
  }, []);

  // useEffect(() => {
  //   if (detail.success === true) {
  //     setOrder(detail.data);

  //   }
  // }, [detail]);
  // useEffect(() => {
  //   if (detail.success === true && detail.data) {
  //     setOrder(detail.data.orderProduct.find((item) => item._id === productId))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [detail.data, detail.success])

  const toOrderList = () => {
    dispatch(customerOrderDetailReset());
    history('/ecom-myOrders');
  };

  useEffect(() => {
    if (getSingleOrderSuccess && getSingleOrderData) {
      setSelectedOrder(getSingleOrderData[0].selectedSubOrder)
    }
  }, [getSingleOrderData]);
  useEffect(() => {
    if (getSingleOrderSuccess && getSingleOrderData) {
      setElseSubOrder(getSingleOrderData[0].elseSubOrder)
    }
  }, [getSingleOrderData]);
  // useEffect(() => {
  //   if (list.success === true && list.data.length > 0) {

  //     list.data.forEach((vl) => {
  //       if (vl._id === orderId) {
  //         setOrder(vl);
  //       }
  //     });
  //   }
  // }, [list, orderId]);

  // useEffect(() => {
  //   if (detail.data) {
  //     const tot = detail.data.orderProduct.reduce((t, vl) => {
  //       return t + vl.price * vl.quantity;
  //     }, 0);
  //     setTotal(tot);
  //   }
  // }, [detail.data]);

  // const orderCancelHandler = () => {
  //   const body = { orderId: orderId, status: "user cancel detail.data" };
  //   // dispatch(customerCancelOrder(body, customerDetail.data.data._id));
  //   if (AppLinkUrl.privateDomain()) {
  //     dispatch(customerCancelOrder(body, user._id));
  //   } else {
  //     dispatch(customerCancelOrder(body, subdomainuser._id));
  //   }
  //   history('/ecom-myOrders');
  // };

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }
  const handleCancelProduct = (SubId) => {
    // console.log(SubId, "SubId")
    setOpenDeletePop(SubId)
  }
  const orderInfoHandler = (ordId, subOrderId) => {
    // console.log(ordId, subOrderId, "ordId,subOrderId")
    history(`/ecom-orderDetails/${orderId}/${subOrderId}`);
  }
  const handle = () => {
    setContactPage(true)
    setModalStateClose(true);
  }

  const closeModalState = () => {
    setModalStateClose(false);
    setContactPage(false)
  };
  const handleAcceptPopupCancel = () => {
    setOpenDeletePop(-1)
  }
  const SureCancelProduct = () => {
    dispatch(updateCustomerStatus(openDeletePop, { status: "Failed", isFailedByUser: true, order_failure_date: new Date(), }));

    if (statusUpdateSuccss) {
      setOpenDeletePop(-1)
    }
    setTimeout(() => {
      dispatch(getSingleOrderOfOtheritems(orderId, productId));
    }, 500)
  }
  useEffect(() => {
    if (statusUpdateSuccss) {
      dispatch((resetCancelUpdateStatus()))
    }
  }, [dispatch, statusUpdateSuccss])
  let type = "Cancel"
  useEffect(() => {
    if (statusUpdateSuccss) {
      setOpenDeletePop(-1)
    }
  }, [dispatch, statusUpdateSuccss])
  const CancelAllOrder = (orderID) => {
    setOpenAllCancelPop(orderID)
    // console.log(orderID, "orderID")
  }
  const handleAcceptPopupALLCancel = () => {
    setOpenAllCancelPop(-1)
  }
  const SureCancelAllProduct = () => {
    let data = {
      Status: "Failed",
      isFailedByUser: true,
      order_failure_date: new Date(),
    }
    dispatch(shippingDetails(openAllCancelPop, data));
    setOpenAllCancelPop(-1);
    setTimeout(() => {
      dispatch(getSingleOrderOfOtheritems(orderId, productId));
    }, 500)
    // if (statusUpdateSuccss) {
    //   setOpenDeletePop(-1)
    // }
  }
  return (

    <React.Fragment>
      {getSingleOrderSuccess &&
        getSingleOrderData ? (
        <div className='containerTrue pb-45 '>
          <div className='orderDetails-container'>
            <div className='page-heading-button-container'>
              <h2 className='myOrders-heading' onClick={() => { toOrderList() }}> <span className='heading-arrow'>&#10229;</span> Back to my orders</h2>
              {selectedOrder && selectedOrder?.order?.Status === "Placed" && selectedOrder && selectedOrder?.status === "Placed" ?
                <div >
                  <button className=' cancel-product-btn button btn-xs' onClick={() => CancelAllOrder(selectedOrder?.orderId)}>Cancel Order</button>
                </div> : selectedOrder?.order?.Status === "PartiallyFulfilled" && selectedOrder && selectedOrder?.status === "Placed" ?
                  <div >
                    <button className=' cancel-product-btn button btn-xs' onClick={() => CancelAllOrder(selectedOrder?.orderId)}>Cancel Order</button>
                  </div> : ""
                // : selectedOrder && selectedOrder?.order?.Status === "Placed" && selectedOrder && selectedOrder?.status === "Failed" ? "" : ""
              }
              {
                openAllCancelPop === selectedOrder?.orderId && <DeleteConfirmPop type={type} handleAcceptPopup={() => handleAcceptPopupALLCancel()} deleteVarHandler={() => SureCancelAllProduct()} />
              }
              {/* {selectedOrder?.status === "Delivered" && <div>
                <button className='button btn-xs cancel-product-btn'>Return Order</button>
              </div>} */}
            </div>
            <div className='orderDetails-wrapper'>
              <div className='orderDetails-wrapper-leftSidebar'>
                <div className='myOrders-list-wraper '>
                  <div className='myOrders-id-wrap'>
                    <p className='id-p'><span>ORDER ID-&nbsp;</span> <span className=' id-item'>#{selectedOrder.order ? selectedOrder?.order
                      .order_id : 'No Order'}</span></p>
                    <p className='id-p'><span>ORDER PLACED ON-&nbsp;</span> <span className='id-sapn'>{selectedOrder.order ? moment(selectedOrder.order.order_placing_date).format("ll") : 'No Order'}</span></p>
                  </div>
                  <div className='myOrder-orderList-wrap order-border'>
                    <div className='myOrder-orderList-leftsidebar'>
                      <img src={selectedOrder.orderProduct?.productPicture && selectedOrder.orderProduct?.productPicture.length > 0 ? selectedOrder.orderProduct?.productPicture[0] : DefaultImage} alt="" />
                    </div>
                    <div className='myOrder-orderList-rightsidebar'>
                      <p className='text-xs w-700'>{selectedOrder.orderProduct?.variationName} </p>
                      <div className='inline between-lg between-xs order-info-status-item '>
                        <div>
                          <p className='mt-10'> <span className='text-xxs w-400'>SKU  :  </span> <span className='text-xxs w-600'>{selectedOrder.orderProduct?.SKU}</span> </p>
                          {selectedOrder.orderProduct?.variant_scheme && selectedOrder.orderProduct?.variant_scheme.length ?
                            selectedOrder.orderProduct?.variant_scheme.map((varItem, key) => {
                              return (
                                <React.Fragment key={key}>
                                  <p className='mt-10'><span className='text-xxs w-400'>{varItem?.title} : </span> <span className='text-xxs w-600'> {varItem?.value} </span>  </p>
                                  {/* <span>{varItem?.title}:&nbsp;</span> <span>{varItem?.value}<br /></span> */}
                                </React.Fragment>
                              );
                            }) : ""
                          }

                        </div>
                        <div className='cancel-status-item'>
                          {/* <div className='order-status-div'>
                            <p className='status-marker'></p> <p><span className='pr-3'>Status :</span>
                              <span className={`para mt-16  ${selectedOrder.status === "Failed" ? 'color-red' : 'color-green'}`}>
                                {selectedOrder && selectedOrder.status === "Placed" ? "Processing" : selectedOrder?.status}
                              </span>
                            </p>
                          </div> */}
                          <div className='order-status-div'>
                            <p className='status-marker'></p> <p><span className='pr-3'>Status :</span>
                              {/* <span className={`para mt-16  ${selectedOrder.status === "Failed" ? 'color-red' : 'color-green'}`}>
                                {selectedOrder && selectedOrder.status === "Failed" ? "Processing" : selectedOrder?.status}
                              </span> */}
                              {selectedOrder && selectedOrder.status === "Failed" &&
                                // selectedOrder.order.Status === "PartiallyFulfilled" &&
                                !selectedOrder.isFailedByUser &&
                                <span className='color-red'>
                                  Failed
                                </span>
                              }
                              {selectedOrder && selectedOrder.status === "Placed" && !selectedOrder.order.Status === "Rejected" &&
                                <span className='color-processing '>
                                  Processing
                                </span>
                              }
                              {selectedOrder && selectedOrder.status === "Placed" && selectedOrder.order.Status === "Placed" &&
                                <span className='color-processing '>
                                  Processing
                                </span>
                              }
                              {selectedOrder && selectedOrder.status === "Placed" && selectedOrder.order.Status === "PartiallyFulfilled" &&
                                <span className='color-processing '>
                                  Processing
                                </span>
                              }
                              {selectedOrder && selectedOrder.order.Status === "Rejected" && selectedOrder.status === "Placed" &&
                                <span className='color-red'>
                                  Rejected
                                </span>
                              }
                              {/* {selectedOrder && selectedOrder.status === "Cancelled" &&
                                <span className='color-red'>
                                  Cancelled
                                </span>
                              } */}
                              {selectedOrder && selectedOrder.order.Status === "Placed" && selectedOrder.isFailedByUser &&
                                <span className='color-red'>
                                  Cancelled
                                </span>
                              }
                              {selectedOrder && selectedOrder.order.Status === "PartiallyFulfilled" && selectedOrder.status === "Failed" && selectedOrder.isFailedByUser &&
                                <span className='color-red'>
                                  Cancelled
                                </span>
                              }
                              {selectedOrder && selectedOrder.status === "Shipped" &&
                                <span className='color-shipped'>
                                  Shipped
                                </span>
                              }
                              {selectedOrder && selectedOrder.order.Status === "Failed" && selectedOrder.isFailedByUser && selectedOrder.order.Status === "Failed" &&
                                < span className='color-red'>
                                  Cancelled
                                </span>
                              }
                              {selectedOrder && selectedOrder.status === "Delivered" && selectedOrder.order.Status === "PartiallyFulfilled" &&
                                < span className='color-dilevered'>
                                  Delivered
                                </span>
                              }
                              {selectedOrder && selectedOrder.status === "Delivered" && selectedOrder.order.Status === "Delivered" &&
                                < span className='color-dilevered'>
                                  Delivered
                                </span>
                              }
                            </p>
                          </div>
                          {selectedOrder.status === "Placed" && !selectedOrder.order.Status === "Rejected" && selectedOrder.orderProduct.allowCancellation ?
                            <button className='cancel-product-btn' onClick={() => handleCancelProduct(selectedOrder._id)}>
                              Cancel Product
                            </button>
                            : selectedOrder.status === "Placed" && selectedOrder.order.Status === "PartiallyFulfilled" && selectedOrder.orderProduct.allowCancellation ?
                              <button className='cancel-product-btn' onClick={() => handleCancelProduct(selectedOrder._id)}>
                                Cancel Product
                              </button> : selectedOrder.status === "Placed" && selectedOrder.order.Status === "Placed" && selectedOrder.orderProduct.allowCancellation ?
                                <button className='cancel-product-btn' onClick={() => handleCancelProduct(selectedOrder._id)}>
                                  Cancel Product
                                </button> : ""
                          }
                        </div>
                        {
                          openDeletePop === selectedOrder._id && <DeleteConfirmPop type={type} handleAcceptPopup={handleAcceptPopupCancel} deleteVarHandler={SureCancelProduct} loading={statusUpdateLoading} />
                        }


                      </div>
                      {/* <p className='para mt-12'><span>Size:&nbsp;</span> <span>M</span></p> */}
                      {/* <p className='para mt-12'><span>Delivery by:&nbsp;</span><span className='date-bold' >30 Oct, 2022</span></p> */}
                      {/* when order is canceled use color class "color-red" */}

                      {/* {selectedOrder && selectedOrder?.order.Status !== "Placed" ?
                        <div className=' orderdetails-trackingid-wrapper mt-5'>
                          <div className='orderdetails-tracking'>
                            <h3 className='detail.data-status-heading text-xxs w-500'> Tracking ID: </h3>
                            <p className=' text-xxs w-700'>
                              <span >{selectedOrder?.shipping_partner}- </span>
                              <span className='trackid-item '>{selectedOrder?.shipping_tracking_id}</span>
                            </p>
                          </div>
                          <div className='orderdetails-tracking mt-3'>
                            <h3 className='detail.data-status-heading text-xxs w-500'> Tracking URL: </h3>
                            <p className='text-xxs w-700'>
                              <span className='trackid-item'>{selectedOrder?.tracking_url}</span>
                            </p>
                          </div>
                          <div className='orderdetails-tracking mt-3'>
                            {detail?.data?.Status === "Failed" &&
                              <React.Fragment>
                                <h3 className='detail.data-status-heading text-xxs w-500'>Message:</h3>
                                <p className='text-xxs w-700'>
                                  <span className='w-500'>{detail.data && detail.data?.cancellaion_reason}</span>
                                </p>
                              </React.Fragment>
                            }
                          </div>
                        </div>
                        : ""
                      } */}
                      {/* <div className='myOrder-btn-wrap'>
                        <button className='buttonTrue btnTrue-o-primary btn-xs btn-detail.data' onClick={() => { detail.data.Status !== "Cancelled" && orderCancelHandler() }}>{detail.data.Status !== "Cancelled" ? "Cancel Order" : "Cancelled"}</button>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className='mt-12 detail.data-border orderDetails-help'>
                    <p>NEED HELP WITH YOUR ORDER?</p>
                    <p className='orderDetails-support'>CONNECT WITH OUR SUPPORT TEAM</p>
                  </div> */}
                </div>
                <div className='other-item-wrapper'>
                  {selectedOrder && selectedOrder?.status === "Shipped" &&
                    <div className='other-item-tracking-wrapper'>
                      <div className='other-item-tracking-item'>
                        <p className="tracking-heading-item  w-700">Tracking Details</p>

                        <div className='tracking-details-item-div'>
                          <p> <span className="text-xxs id-item w-400"> Courier:</span> <span className="text-xxs id-item w-600"> {selectedOrder?.shipping_partner} </span></p>
                          <p> <span className="text-xxs id-item w-400"> Tracking ID:  </span> <span className="text-xxs id-item w-600"> {selectedOrder?.shipping_tracking_id} </span></p>
                        </div>
                        <p className="mt-10"> <span className="text-xxs id-item w-400" > Tracking ID: </span> <span className="text-xxs id-item w-600">{selectedOrder?.tracking_url}</span></p>
                      </div>
                    </div>

                  }
                  {selectedOrder && selectedOrder?.status === "Failed" && selectedOrder?.cancellaion_reason &&
                    < div className='other-item-tracking-wrapper'>
                      <div className='other-item-tracking-item'>
                        <p className="tracking-heading-item  w-700">Order failed reason</p>
                        <p className="mt-10 gray w-400 text-xxs">{selectedOrder?.cancellaion_reason}</p>
                      </div>
                    </div>
                  }
                  {selectedOrder && selectedOrder.status === "Placed" && selectedOrder?.order.Status === "Rejected" &&
                    <div className='other-item-tracking-wrapper'>
                      <div className='other-item-tracking-item'>
                        <p className="tracking-heading-item  w-700">Order Rejected reason</p>
                        <p className="mt-10 gray w-400 text-xxs">{selectedOrder?.order.rejection_reason}</p>
                      </div>
                    </div>
                  }
                  {elseSubOrder && elseSubOrder.length > 0 && <p className='other-item-header w-700'>Other items in this order</p>}
                  {elseSubOrder && elseSubOrder.length > 0 && elseSubOrder.map((item, key) => {
                    return (
                      <div className='other-item-body-wrapper'>
                        <div className='product-div-item'>
                          <div className='product-div-left-item'>
                            <img src={item.orderProduct?.productPicture && item.orderProduct?.productPicture.length > 0 ? item.orderProduct?.productPicture[0] : DefaultImage} alt="" />

                          </div>
                          <div className='product-div-right-item'>
                            <p className='other-product-name-div'>{item.orderProduct.variationName}</p>
                            <div className='other-product-info-wrapper'>
                              {item.orderProduct.variant_scheme && item.orderProduct.variant_scheme.length ? item.orderProduct.variant_scheme.map((varItem, key) => {
                                return (
                                  <div className='product-variants-wapper'>
                                    <div className='product-variants-item'>
                                      <p><span>{varItem?.title} : </span> <span className='item-type'> {varItem?.value} </span></p>
                                      {/* <p> <span>{varItem?.title} : </span> <span className='item-type'> {varItem?.value} </span></p> */}
                                    </div>

                                  </div>
                                )
                              }) : ""}
                              <button className='btn-order-details' onClick={() => { orderInfoHandler(item.orderId, item._id) }}>View Details</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                  }
                  <div className='connect-coustmer-div'>
                    <p className='connect-coustmer-item '>NEED HELP WITH YOUR ORDER?</p>
                    <p className='connect-coustmer-link' onClick={() => handle()} >CONNECT WITH OUR SUPPORT TEAM</p>
                  </div>
                </div>
                {/* <Otheritem /> */}
              </div>

              <div className='orderDetails-wrapper-rightSidebar'>
                <div className='order-details-wrap-shipping  order-border'>
                  <p className='shipping-p'>SHIPPING DETAILS</p>
                  <p className='name mt-16'>{selectedOrder.order?.delivery_address && selectedOrder.order?.delivery_address.name ? selectedOrder.order?.delivery_address.name : ''}</p>
                  <p className='shipping-address mt-12'>{selectedOrder.order?.delivery_address && selectedOrder.order?.delivery_address.fullAddress ? `${selectedOrder.order?.delivery_address.fullAddress} ${selectedOrder.order?.delivery_address.city} ${selectedOrder.order.delivery_address.state}` : ''}</p>
                </div>
                <div className=' order-border paymentSummary-container mt-12'>
                  <div className='paymentSummary-div'>
                    <p>PAYMENT SUMMARY</p>
                  </div>
                  <div className='payment-details'>
                    <div className='payment-div'>
                      <p>Cart Total</p>

                      <p>{selectedOrder?.order?.orderTotal ? getPrice(selectedOrder?.order?.orderTotal) : getPrice(0)}</p>
                    </div>
                    <div className='payment-div'>
                      <p>Delivery Fee</p>
                      <p className='delivery-fee'> <del>RS 0</del></p>
                    </div>
                    <div className='payment-div'>
                      <p>Order Total</p>
                      <p>{selectedOrder?.order?.orderTotal ? getPrice(selectedOrder?.order?.orderTotal) : getPrice(0)}</p>
                    </div>
                    <hr className='line' />
                    <div className='payment-div'>
                      <p>Total Amount</p>
                      <p className='total-amount'>{selectedOrder?.order?.orderTotal ? getPrice(selectedOrder?.order?.orderTotal) : getPrice(0)}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
          {contactPage === true ?
            <div className='orderDetails-popup-container'>
              < Modal show={modalStateClose}>
                <ModalBody>
                  <ModalHeader
                    closeButton={true}
                    onclose={closeModalState}
                  />
                  <ContectUs closeModalState={closeModalState} />

                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </Modal></div> : ""
          }
        </div >

      ) : ("")
      }

    </React.Fragment >
  )
}

export default OrderDetails