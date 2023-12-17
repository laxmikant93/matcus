import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './orderDetails.scss';
import ProductImage from '../assets/icons/productImage.png';
import { changeOrderStatus, customerOrderDetail, getOrderList, orderListReject, shippingDetails, getShipItems, getDeliverItems, getFailItems, getItemSuborders, resetAdminOrderList } from '../../../../store/actions/ecommerce/action/cartOrder';
import DropDown from '../../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/CommonComponent/CommonJsx/TrueThemeDropDown';
import SelfShippingPopup from './SelfShipping/SelfShippingPopup';
import FailedOrderShippingPopup from './SelfShipping/FailedOrderShippingPopup';
import moment from 'moment';
import { setCommonError } from '../../../../store/actions/commonerror';
import CommonError from '../../../../Common/CommonError';
import AppLink from '../../../../Common/AppLink';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import ImportProductPopup from '../../../BuisnessDashboard/BulkUpload/ImportProductPopup/ImportProductPopup';
import RejectProductPopup from '../Component/RejectProductPopup/RejectProductPopup';
import AcceptOrderPopup from '../Component/AcceptOrderpopup/AcceptOrderPopup';
import ShippedItems from '../Component/ShippedItems/ShippedItems';
import DefaultImg from '../assets/images/Product_default.jpg'
import DeliveredItems from '../Component/ShippedItems/DeliveredItems';
import FailedItem from '../Component/ShippedItems/FailedItem';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader'; 

const OrderDetails = () => {
  const openref = useRef(null);
  const openpopup = useRef(null);
  const [orderDetail, setOrderDetails] = useState('');
  const [statusOpt, setStatusOpt] = useState(['Placed', 'Processing', 'Shipped', 'Failed', 'Delivered']);

  const { customerOrderDetail: detail } = useSelector((state) => state.orderCartList);
  const user = useSelector((state) => state.user);
  const { shippingOrderLoading, shippingOrderSuccess, RejectOrderLoading, RejectOrderSuccess, RejectedData, getItemSubordersSuccess, getItemSubordersData, getShipItemsSuccess, getShipItemsData,
    getFailItemsSuccess, getFailItemsData, getDeliverItemsSuccess, getDeliverItemsData,customerDetailSuccess } = useSelector((state) => {
      return {
        shippingOrderLoading: state.orderCartList.adminOrderList.loading,
        shippingOrderSuccess: state.orderCartList.adminOrderList.success,
        RejectOrderLoading: state.orderCartList.orderListReject.loading,
        RejectOrderSuccess: state.orderCartList.orderListReject.success,
        RejectedData: state.orderCartList.orderListReject,
        getItemSubordersSuccess: state.orderCartList.getSubOrderdList.success,
        getItemSubordersData: state.orderCartList.getSubOrderdList.data,
        getShipItemsSuccess: state.orderCartList.getShipItemsList.success,
        getShipItemsData: state.orderCartList.getShipItemsList.data,
        getFailItemsSuccess: state.orderCartList.getFailItemsList.success,
        getFailItemsData: state.orderCartList.getFailItemsList.data,
        getDeliverItemsSuccess: state.orderCartList.getDeliverItemsList.success,
        getDeliverItemsData: state.orderCartList.getDeliverItemsList.data,
        customerDetailSuccess:state.orderCartList.customerOrderDetail.success

      }
    })
  // console.log(customerOrderDetail, shippingOrderSuccess, "line35")
  // console.log("RejectedData", RejectedData)
  // console.log("ordedetailks", orderDetail)

  // console.log("  orderDetail.orderProduct", orderDetail.orderProduct)
  // console.log("getFailItemsData,getDeliverItemsSuccess,getDeliverItemsData ",getFailItemsData,getDeliverItemsSuccess,getDeliverItemsData )
  // console.log("getItemSubordersData",getItemSubordersData,subOrderDetailsAnOrder)
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const failedpopupref = useRef(null);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [AcceptOrder, setAcceptOrder] = useState(false);
  const [subOrderDetailsAnOrder, setSubOrderDetailsAnOrder] = useState([]);
  const[loading,setLoading]=useState(false);

  const AcceptOrderHandle = () => {
    // setAcceptOrder(true)
    dispatch(shippingDetails(orderId, { isAccept: true }));
    /* setTimeout(()=>{
     dispatch(customerOrderDetail(orderId));
    },500)  */
  }
  useEffect(() => {
    return () => {
      dispatch(resetAdminOrderList())
    }
  }, [])

  useEffect(() => {
    if (getItemSubordersSuccess && getItemSubordersData) {
      setSubOrderDetailsAnOrder(getItemSubordersData)
    }
  }, [orderId])

  /*  useEffect(() => {
     dispatch(customerOrderDetail(orderId));
   }, [dispatch, orderId]); */

  useEffect(() => {
    if (orderId) {
      // console.log("line 88")
    setLoading(true);
      dispatch(customerOrderDetail(orderId));
      dispatch(getShipItems(orderId));
      dispatch(getFailItems(orderId));
      dispatch(getDeliverItems(orderId));
    }
    // alert("mjdddk")
  }, [orderId])

  useEffect(() => {
    if (detail.success === true) {
      setOrderDetails(detail.data);
    }
  }, [detail, orderId]);
useEffect(()=>{
setLoading(false)
},[customerDetailSuccess])
  // useEffect(()=>{
  //   if(shippingOrderSuccess){
  //     dispatch(getShipItems(orderId));
  //     // dispatch(customerOrderDetail(orderId));
  //   }
  // },[shippingOrderSuccess])
  /*  useEffect(() => {
     if (RejectOrderSuccess && RejectedData.data) {
       setOrderDetails(RejectedData.data)
     }
   }, [RejectOrderSuccess, RejectedData]) */

  const deliveryStatusHandler = (type, val, id) => {
    const data = {
      status: "edit order",
      orderId: id,
      Status: val
    };

    dispatch(changeOrderStatus(data));
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleShipThisOrderButton = () => {
    openref.current.open()
  }

  const onclosepopup = () => {
    // openref.current.close()
  }

  const handleMarkAsDelivered = () => {
    const data = {
      Status: "Delivered",
      order_delivery_date: new Date(),
    };
    dispatch(shippingDetails(orderId, data));
    setShowToast(true);
    /* setTimeout(()=>{
      dispatch(getShipItems(orderId));
      dispatch(getFailItems(orderId));
      dispatch(getDeliverItems(orderId));
    },500) */
  }

  const handleFailedButton = () => {
    failedpopupref.current.open()
  }


  useEffect(() => {
    if (shippingOrderSuccess) {
      // dispatch(customerOrderDetail(orderId));
      setTimeout(() => {
        setShowToast(false);
      }, 3000)
    }
  }, [shippingOrderSuccess])

  useEffect(() => {
    if (orderDetail && orderDetail.orderProduct && orderDetail.orderProduct.length) {
      let price = 0;
      for (let i = 0; i < orderDetail.orderProduct.length; i++) {
        let element = orderDetail.orderProduct[i];
        if (element?.defaultVariation) {
          if (element.quantity_of_products > 0) {
            price = (element.price * element.quantity_of_products) + price;
          }
          else {
            price = element.price + price;
          }
        }
        else {
          if (element.quantity_of_products > 0) {
            price = ((element.price + element.salePrice) * element.quantity_of_products) + price;
          }
          else {
            price = element.price + element.salePrice + price;
          }
        }
      }
      setSubTotal(price);
    }
  }, [orderDetail])

  useEffect(() => {
    if (orderDetail && orderDetail.orderProduct && orderDetail.orderProduct.length) {
      let shippingPrice = 0;
      for (let i = 0; i < orderDetail.orderProduct.length; i++) {
        let element = orderDetail.orderProduct[i];
        if (element.shipping_cost) {
          shippingPrice = element.shipping_cost + shippingPrice;
        }
      }
      setShippingTotal(shippingPrice);
    }
  }, [orderDetail])


  const onOpenRejectOrder = () => {
    openpopup.current.open()
  }
  const onCloseRejectOrder = () => {
    openpopup.current.close()
  }
  const openacceptpopup = useRef(null);
  const onOpenAcceptOrder = () => {
    openacceptpopup.current.open()
    // dispatch(customerOrderDetail(orderId));
    // dispatch(getShipItems(orderId));
    dispatch(getItemSuborders(orderId));
  }
  const onCloseAcceptOrder = () => {
    openacceptpopup.current.close()
  }
  return (
    <React.Fragment>
      {/* <CommonError /> */}
      {detail&&detail.success&&orderDetail&&getItemSubordersData?(
        <div className='dashBoard-home-container'>
        <div className='orderDetails-container'>
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem to="/ecommerce/orderList/:id/OrderList/" title="Orders" />
            <BreadcrumbItem to={`/ecommerce/orderDetails/${orderId}`} title="Order Details" />
          </Breadcrumb>
          <div className='order-details-item'>
            <p className='text-s w-600'>Order Details</p>
            {/* reject or accepet order and order details wrapper */}

            <div className='inline between-xs between-lg mt-5 order-details-child-item'>
              <div className='order-details-date-wrapper'>
                <p className='text-xxs w-500'><span>Order on </span><span>{orderDetail && orderDetail?.createdAt && moment(orderDetail.createdAt).format("LL")}</span>
                  <span className='timeDateSpace'>{orderDetail && orderDetail?.createdAt && moment(orderDetail.createdAt).format("LT")}</span></p>
                <div className='vline'></div>
                <p className='text-xxs w-500'><span>Order Id -</span><span>{orderDetail && orderDetail.order_id && orderDetail.order_id}</span></p>
              </div>
              <div className='inline button-group-wraper'>
                {
                  orderDetail.isAccept ? (
                    <>
                      {
                        orderDetail && (orderDetail.Status === "Placed") ?
                          <button
                            className='button button-primary btn-2xs'
                            onClick={onOpenAcceptOrder}
                          >
                            Ship this Order
                          </button>
                          :
                          orderDetail && (orderDetail.Status === "PartiallyFulfilled") ?
                            <button
                              className='button button-primary btn-2xs'
                              onClick={onOpenAcceptOrder}
                            >
                              Ship Remaining Items
                            </button>
                            :
                            orderDetail && orderDetail.Status === "Shipped" && !orderDetail?.isPartial ?
                              <>
                                <button
                                  className='failed-bupoptton text-xxs w-500 button btn-2xs btn-o-red '
                                  onClick={() => handleFailedButton()}
                                >
                                  Failed
                                </button>
                                <button
                                  className='button button-primary btn-2xs'
                                  onClick={() => handleMarkAsDelivered()}
                                >
                                  Mark as Delivered
                                </button>
                              </>
                              :
                              orderDetail && orderDetail.Status === "Failed" ?
                                <>
                                  {showToast &&
                                    <div className='header-order-status-wrapper'>
                                      <div className='flag-color flag-for-failed'></div>
                                      <div>
                                        <p>
                                          <span className='mr-10 text-xs w-400'>Order Status :</span>
                                          <span className=' status-dilever-failed text-xs w-400'>Failed</span>
                                        </p>
                                      </div>
                                    </div>
                                  }
                                </>
                                : orderDetail && orderDetail.Status === "Delivered" ?
                                  <>
                                    {showToast &&
                                      <div className='header-order-status-wrapper'>
                                        <div className='flag-color flag-for-delivered'></div>
                                        <div>
                                          <p>
                                            <span className='mr-10 text-xs w-400'>Order Status :</span>
                                            <span className=' status-dileverd text-xs w-400'>Delivered</span>
                                          </p>
                                        </div>
                                      </div>
                                    }
                                  </> :
                                  ""
                      }
                    </>
                  ) :
                    <>
                      {
                        orderDetail && (
                          orderDetail.Status === "Shipped" ||
                          orderDetail.Status === "Failed" ||
                          orderDetail.Status === "Rejected" ||
                          orderDetail.Status === "Delivered") ? (
                          ""
                        ) : (
                          <>
                            <button className='button btn-2xs btn-o-red failed-bupoptton ' onClick={() => { onOpenRejectOrder() }} >Reject</button>
                            <button
                              className='button button-primary btn-2xs'
                              onClick={() => AcceptOrderHandle()}
                            >
                              Accept Order
                            </button>
                          </>
                        )
                      }
                    </>
                }

              </div>

              {/* accept order button  */}
              {/* <div>
                  <button className='button button-primary btn-2xs '>Accept Order</button>
                </div> */}
              {/* <div>
                  <button className='button btn-2xs btn-o-red failed-bupoptton ' onClick={() => { onOpenRejectOrder() }} >Reject</button>
                </div>
                {
                  <RejectProductPopup openpopup={openpopup} onclose={onCloseRejectOrder} />
                } */}
              {/* <div>
                <button className='button button-primary btn-2xs ' onClick={() => { onOpenAcceptOrder() }}>Ship this Order</button>
              </div> */}

              {/* ship remaining item  */}
              {/* <div>
                  <button className='button button-primary btn-2xs ' onClick={() => { onOpenAcceptOrder() }} >Ship remaining items</button>
                </div>
                {
                  <AcceptOrderPopup openref={openacceptpopup} onclose={onCloseAcceptOrder} />
                } */}
              {/* failed button  */}
              {/* <div>
                  <button className='button btn-2xs btn-o-red ' onClick={() => { onOpenRejectOrder() }} >Failed</button>
                </div> */}
              {/* mark as dilivered */}
              {/* <div>
                  <button className='button button-primary btn-2xs '>
                    Mark as delivered
                  </button>
                </div> */}
              {/* </div> */}
            </div>

          </div>

          {/* <DropDown
            // name={orderDetail && orderDetail.Status} 
            options={statusOpt}
            status={orderDetail && orderDetail.Status}
            handleFilters={(type, val) => { deliveryStatusHandler(type, val, orderDetail._id) }}
          /> */}

          {/* first section */}
          <div className='orderDetails-content-div mt-25'>
            <div className='orderDetails-description-wrap'>
              <div className='orderDetails-shipping-address-wrap'>
                <h3 className='text-s w-600 order-info mb-5 '>Shipping Address</h3>
                <p className='text-xxs order-info w-700 mt-5 gray'>{orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.name} <br /></p>
                <p className='text-xxs w-400 order-info gray'> {orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.addressType},  {orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.fullAddress} <br />
                  {orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.city},  {orderDetail && orderDetail.orderAddress && orderDetail.orderAddress.state}
                </p>
                <p className='text-xxs w-700 mt-5 gray'>{orderDetail && orderDetail?.orderAddress?.phone}</p>
              </div>

              <div className='orderDetails-shipping-address-wrap'>
                <h3 className='text-s w-600 mb-5  '>Billing Address</h3>
                <p className='text-xxs w-700 mt-5 order-info gray'>
                  {orderDetail && orderDetail?.orderAddress && orderDetail?.orderAddress.name} <br /> </p>
                <p className='text-xxs w-400 order-info gray'> {orderDetail && orderDetail?.orderAddress && orderDetail?.orderAddress?.addressType},  {orderDetail && orderDetail?.orderAddress && orderDetail?.orderAddress?.fullAddress} <br />
                  {orderDetail && orderDetail?.orderAddress && orderDetail?.orderAddress?.city},  {orderDetail && orderDetail?.orderAddress && orderDetail?.orderAddress?.state}
                </p>
                <p className='text-xxs w-700 mt-5 gray'>{orderDetail && orderDetail?.orderAddress?.phone}</p>
              </div>

              <div className='orderDetails-shipping-address-wrap'>
                <h3 className='text-s w-600 mb-5 '>Order Summary</h3>
                <div className='orderDetails-orderSummary-wrap mt-5'>
                  <div className='orderSummary-div mt-10 '>
                    <p className='text-xs gray w-400'>Total  items</p>
                    <p className='text-xs gray w-400'>
                      <span>{orderDetail && orderDetail.orderProduct && orderDetail.orderProduct.length ? orderDetail.orderProduct.length : ""}</span>
                    </p>
                  </div>
                  <div className='orderSummary-div mt-10'>
                    <p className='text-xs w-400'>Item(s) Subtotal:</p>
                    <p className='text-xs w-400'><span>&#8377;</span><span>{subTotal ? subTotal : "00"}</span></p>
                  </div>
                  <div className='orderSummary-div mt-10'>
                    <p className='text-xs gray w-400'>Shipping:</p>
                    <p className='text-xs w-400'><span>&#8377;</span><span>{shippingTotal ? shippingTotal : "00"}</span></p>
                  </div>
                  <div className='orderSummary-div mt-10'>
                    <p className='text-xs gray w-400'>Discount:</p>
                    <p className='text-xs w-400'><span>&#8377;</span><span>{subTotal ? (subTotal - (orderDetail && orderDetail.orderTotal)) : "00"}</span></p>
                  </div>
                  <div className='orderSummary-div mt-10'>
                    <p className='text-xs  gray w-800'>Grand Total:</p>
                    <p className='text-xs gray w-600'><span>&#8377;</span><span>{orderDetail && orderDetail.orderTotal}</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className='order-status-info-wrapper mt-40'>
              <div className='order-list-status-wrapper'>
                <h3 className='order-status-heading '>Order Status</h3>
                <p className={orderDetail && orderDetail.Status === "Placed" && !orderDetail.isAccept ? 'order-status-input primary text-xxs w-500  mt-5'
                  : orderDetail && orderDetail.Status === "Shipped" ? 'order-status-input order-shiped text-xxs w-500  mt-5'
                    : orderDetail && orderDetail.Status === "Delivered" ? 'order-status-input order-deliver text-xxs w-500  mt-5'
                      : orderDetail && orderDetail.Status === "Placed" && orderDetail.isAccept ? 'order-status-input order-deliver text-xxs w-500  mt-5'
                        : orderDetail && orderDetail.Status === "Rejected" ? 'order-status-input order-fail text-xxs w-500  mt-5'
                          : 'order-status-input order-Partially text-xxs w-500  mt-5'
                }
                >
                  {orderDetail && orderDetail.Status === "PartiallyFulfilled" ? "Partially Fulfilled" :
                    orderDetail && orderDetail.Status === "Placed" && orderDetail.isAccept ? "Processing" : orderDetail.Status}
                </p>
                <div>
                  {orderDetail && orderDetail.Status === "Failed" ?
                    <div className='mt-15'>
                    {orderDetail && orderDetail.cancellaion_reason?<>
                      <p className='text-xxs w-500 mb-2'>Message :</p>
                      <p className='text-2xs mt-3 gray w-400'>{orderDetail && orderDetail.cancellaion_reason}</p>
                    </>:""}</div>
                    : orderDetail && orderDetail.Status === "Rejected" ?
                      <div className='mt-15'>
                        <p className='text-xxs w-500 mb-2'>Message :</p>
                        <p className='text-2xs mt-3 gray w-400'>{orderDetail && orderDetail.rejection_reason}</p>
                      </div>
                      : ""
                  }
                </div>
              </div>
              <div className='orderDetails-shipping-address-wrap'>
                <h3 className='order-status-heading'>Payment Mode</h3>
                <p className=' pay-status-input text-xs w-600 mt-5'>
                  {orderDetail && orderDetail.order_payment_method === "cashOnDelivery" ? "COD" :
                    orderDetail && orderDetail.order_payment_method === "Razorpay" ? "Online" : "Online"}
                </p>
              </div>

              {orderDetail && orderDetail.Status !== "Placed" ?
                <div>
                  <h3 className='order-status-heading'> Tracking id</h3>
                  <p className='mt-5 text-xxs w-400'>
                    <span >{orderDetail && orderDetail.shipping_partner}- </span>
                    <span className='primary '>{orderDetail && orderDetail.shipping_tracking_id}</span>
                  </p>
                  <p className='mt-5 text-xxs w-400'>
                    <span className='primary '>{orderDetail && orderDetail.tracking_url}</span>
                  </p>
                  {/* <p className='text-xs w-400 mt-5'>{orderDetail && orderDetail.tracking_url}</p> */}
                </div>
                : ""
              }
            </div>
          </div>

          {/* secound section */}
          {getItemSubordersData && getItemSubordersData.length > 0 ?
            <div className='oderList-table-wrapper product'>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '5%', }}></th>
                    <th className='uppercase' style={{ width: '25%', }}>Name </th>
                    <th className='uppercase' style={{ width: '15%' }}>PRICE</th>
                    <th className='uppercase' style={{ width: '20%' }}>SKU</th>
                    <th className='uppercase' style={{ width: '20%' }}>QUANTITY</th>
                    <th className='uppercase' style={{ width: '20%' }}>TOTAL AMOUNT</th>
                  </tr>
                </thead>
                {/* <thead>
                <tr className='product-tr-list'>
                  <th></th>
                  <th className='uppercase  '>Name</th>

                  <th className='uppercase'>PRICE</th>

                  <th className='uppercase'>SKU</th>
                  <th className=''> QUANTITY</th>
                </tr>
              </thead> */}
                <tbody>


                  <React.Fragment>

                    {getItemSubordersData && getItemSubordersData.length ?
                      getItemSubordersData.map((item, key) => {
                        // console.log("item", item)
                        return (
                          <React.Fragment >
                            <tr className={` product-list-td-wrapper cursor-pointer`}>
                              <td></td>
                              <td>
                                <div className='inline align-center' style={{ gap: '36px', }}>
                                  <div className='order-list-th-wrapper' >
                                    <div className='product-image-wraper-div'>
                                      <img src={item?.suborderData[0]?.productData?.productPicture.length ? item?.suborderData[0]?.productData?.productPicture[0] : DefaultImg} alt="productImage" className='img-response' />                      </div>
                                  </div>
                                  <div className='order-list-th-wrapper'>
                                    <p className='text-xs black order-list-th-item  w-500'>{item?.suborderData[0]?.productData?.variationName}</p>
                                    <p className='text-2xs order-list-th-item ordered-product-category gray  w-400 mt-3'>
                                      {item?.suborderData[0]?.productData.variant_scheme && item?.suborderData[0]?.productData.variant_scheme.length ?
                                        item?.suborderData[0]?.productData.variant_scheme.map((varItem, key) => {
                                          return (
                                            <React.Fragment key={key}>

                                            {key!==0?" /":""}  {varItem?.value} 
                                            </React.Fragment>
                                          );
                                        }) : ""
                                      }
                                    </p>
                                  </div>

                                </div>

                              </td>

                              <td data-label="Price">
                                <div className='order-list-th-wrapper'>
                                  {item?.suborderData[0]?.productData?.discountPercentage > 0 ?
                                    <>
                                      {item?.suborderData[0]?.productData?.defaultVariation ?
                                        <>
                                          {item?.suborderData[0]?.productData?.discount_by_percent ?
                                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil((100 - item?.suborderData[0]?.productData?.discountPercentage) / 100 * (item?.suborderData[0]?.productData?.price))}
                                            </span></p>
                                            :
                                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil(item?.suborderData[0]?.productData?.price - item?.suborderData[0]?.productData?.discountPercentage)}
                                            </span></p>
                                          }
                                        </>
                                        :
                                        <>
                                          {item?.discount_by_percent ?
                                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil((100 - item?.suborderData[0]?.productData?.discountPercentage) / 100 * (item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice))}
                                            </span></p>
                                            :
                                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil((item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice) - item?.suborderData[0]?.productData?.discountPercentage)}
                                            </span></p>
                                          }
                                        </>
                                      }
                                    </>
                                    :
                                    <>
                                      {item?.suborderData[0]?.productData?.defaultVariation ?
                                        <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                          {item?.suborderData[0]?.productData?.price}
                                        </span></p>
                                        :
                                        <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                          {item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice}
                                        </span></p>
                                      }
                                    </>
                                  }



                                </div>
                              </td>
                              <td data-label="SKU">
                                <div className='order-list-th-wrapper '>
                                  <span className='text-xs w-500'>{item?.suborderData[0]?.productData?.SKU}</span>

                                </div>
                              </td>
                              <td data-label="Quantity">
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xs w-600 mt-8'>{item?.suborderData?.length}</p>
                                </div>
                              </td>
                              <td data-label='TOTAL AMOUNT'>
                                {/*   <div className='order-list-th-wrapper'>
                                <p className='text-xs w-600 mt-8'>500</p>
                              </div> */}
                                <div className='order-list-th-wrapper'>
                                  {item?.suborderData[0]?.productData?.discountPercentage > 0 ?
                                    <>
                                      {item?.suborderData[0]?.productData?.defaultVariation ?
                                        <>
                                          {item?.suborderData[0]?.productData?.discount_by_percent ?
                                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil((100 - item?.suborderData[0]?.productData?.discountPercentage) / 100 * (item?.suborderData[0]?.productData?.price)) * item?.suborderData?.length}
                                            </span></p>
                                            :
                                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil(item?.suborderData[0]?.productData?.price - item?.suborderData[0]?.productData?.discountPercentage) * item?.suborderData?.length}
                                            </span></p>
                                          }
                                        </>
                                        :
                                        <>
                                          {item?.discount_by_percent ?
                                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil((100 - item?.suborderData[0]?.productData?.discountPercentage) / 100 * (item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice)) * item?.suborderData?.length}
                                            </span></p>
                                            :
                                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil((item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice) - item?.suborderData[0]?.productData?.discountPercentage) * item?.suborderData?.length}
                                            </span></p>
                                          }
                                        </>
                                      }
                                    </>
                                    :
                                    <>
                                      {item?.suborderData[0]?.productData?.defaultVariation ?
                                        <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                          {item?.suborderData[0]?.productData?.price * item?.suborderData?.length}
                                        </span></p>
                                        :
                                        <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                          {(item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice) * item?.suborderData?.length}
                                        </span></p>
                                      }
                                    </>
                                  }



                                </div>
                              </td>
                              {/* <td data-label="Total">
                              <div className='order-list-th-wrapper'>
                                <p className='text-xs w-600 mt-8'>{item?.suborderData?.length}</p>
                              </div>
                            </td> */}
                            </tr>
                            <hr className='horizontal-line' />
                          </React.Fragment>
                        );
                      }) : ""
                    }

                  </React.Fragment>
                </tbody>
              </table>
            </div>

            : <></>}
          {/* shipped items */}
          {getShipItemsData && getShipItemsData.length > 0 ?
            <div className='mt-40 '>
              <p className='primary text-sm  w-500 mb-5'>Shipped Items</p>
              <hr className='mb-25' />
              <ShippedItems orderId={orderId}></ShippedItems>
            </div>
            : <></>}

          {/* delivered items */}
          {getDeliverItemsData && getDeliverItemsData.length > 0 ?
            <div className='mt-40 '>
              <p className='primary text-sm  w-500 mb-5'>Delivered Items</p>
              <hr className='mb-25' />
              <DeliveredItems orderId={orderId}></DeliveredItems>
            </div>
            : <></>}

          {/* failed items */}
          {getFailItemsData && getFailItemsData.length > 0 ?
            <div className='mt-40 '>
              <p className='primary text-sm  w-500 mb-5'>Failed Items</p>
              <hr className='mb-25' />
              <FailedItem orderId={orderId}></FailedItem>
            </div>
            : <></>}
          {/* third section */}
          <div className='item-prizing-details-wrapper'>
            <div className="inline between-lg between-xs text-xs w-500">
              <h3 >Total Items</h3>
              <h3>
                {orderDetail && orderDetail.orderProduct && orderDetail.orderProduct.length ? orderDetail.orderProduct.length : ""}
              </h3>
            </div>
            <div className="inline between-lg between-xs text-xs w-500 gray mt-15" >
              <p>Item(s) Subtotal:</p>
              <p> <span>&nbsp; &#8377;</span> {subTotal ? subTotal : "00"}</p>
            </div>
            <div className="inline between-lg between-xs text-xs w-500 gray mt-15" >
              <p>Shipping:</p>
              <p> <span>&nbsp; &#8377;</span>{shippingTotal ? shippingTotal : "00"}</p>
            </div>
            <div className="inline between-lg between-xs text-xs w-500 gray mt-15" >
              <p>Discount:</p>
              <p> <span>&nbsp; &#8377;</span> {subTotal ? (subTotal - (orderDetail && orderDetail.orderTotal)) : "00"}</p>
            </div>
            <div className="inline between-lg between-xs text-s w-600 gray mt-15" >
              <p>Grand Total:</p>
              <p> <span>&nbsp; &#8377;</span> {orderDetail && orderDetail.orderTotal}</p>
            </div>
          </div>

          <AcceptOrderPopup openref={openacceptpopup} onclose={onCloseAcceptOrder} />
          <RejectProductPopup openpopup={openpopup} onclose={onCloseRejectOrder} orderId={orderDetail._id} setShowToast={(val) => setShowToast(val)} />
          <SelfShippingPopup onclose={() => onclosepopup()} openref={openref} orderId={orderDetail._id} />
          <FailedOrderShippingPopup onclose={() => onclosepopup()} openref={failedpopupref} orderId={orderDetail._id} setShowToast={(val) => setShowToast(val)} />
        </div>
      </div>
      )
      
      :<ComponentLoader/>
      }
    </React.Fragment>
  )
}

export default OrderDetails