import React, { useEffect } from 'react'
import './guestorderdetail.scss'
import ProductImg from '../../../assets/images/bestSeller1.png'
import { customerOrderList } from '../../../../../store/actions/ecommerce/action/cartOrder';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clientGuestgetAllSubordersClient, getGuestOrderDetails } from '../../../../../store/actions/ecommerce/action/guestIndex';
import moment from 'moment/moment';
import { useState } from 'react';
import Modal from '../../../../../Common/Modal';
import ModalBody from '../../../../../Common/Modal/ModalBody';
import ModalHeader from '../../../../../Common/Modal/ModalHeader';
import Contectus from './Contectus';
import ModalFooter from '../../../../../Common/Modal/ModalFooter';
import { convertToIndianFormat } from '../../../../../CommonFunctions/helperFunction';
import { priceCalculator } from '../../../CommonComponent/commonFunction/PriceCalculator';
import ThreeDotLoader from '../../../../../Common/ThreeDotLoader/ThreeDotLoader';

const GuestOrderDetail = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { user, subdomainuser, customerOrderListData, getGuestOrderBookingListSuccess, getGuestOrderBookingListLoading, getGuestOrderBookingListData, businessInfoData, businessInfoSuccess, currency } = useSelector((state) => {
    return {
      user: state.user,
      subdomainuser: state.subdomainuser,
      customerOrderListData: state.orderCartList.customerOrderList.data,
      getGuestOrderBookingListData: state.guestDataReducer.getGuestOrderBookingList.data,
      getGuestOrderBookingListSuccess: state.guestDataReducer.getGuestOrderBookingList.success,
      getGuestOrderBookingListLoading: state.guestDataReducer.getGuestOrderBookingList.loading,
      businessInfoSuccess: state.businessInfo.ecomWebsite.success,
      businessInfoData: state.businessInfo.ecomWebsite.data,
      currency: state.currencyList,
    }
  });

  useEffect(() => {
    let guestuserId = localStorage.getItem("Guest_new_userId");
    (dispatch(clientGuestgetAllSubordersClient(businessInfoData._id, guestuserId, "user")))
  }, [dispatch, businessInfoData._id]);


  const [contactPage, setContactPage] = useState(false)
  const [modalStateClose, setModalStateClose] = useState(true);

  const handle = () => {

    setContactPage(true)
    // history("/ecom-contactus")

    setModalStateClose(true);

    // console.log(contactPage)
    // console.log(modalStateClose)
    // console.log("bbbbb")

  }
  // const dispatch = useDispatch()
  const closeModalState = () => {
    setModalStateClose(false);
    // console.log(contactPage)
    // console.log(modalStateClose)
    // setPersonalDetailShow(true)
    setContactPage(false)


  };

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }

  const [productDetail, setProductDetails] = useState({})
  const [ShippingDetail, setShippingDetail] = useState({})
  useEffect(() => {
    if (getGuestOrderBookingListSuccess && getGuestOrderBookingListData) {
      setShippingDetail(getGuestOrderBookingListSuccess && getGuestOrderBookingListData.length > 0 && getGuestOrderBookingListData[0])
      setProductDetails(getGuestOrderBookingListSuccess && getGuestOrderBookingListData.length > 0 && getGuestOrderBookingListData[0].suborders[0])
    }
  }, [getGuestOrderBookingListData, getGuestOrderBookingListSuccess])

  const [openDeletePop, setOpenDeletePop] = useState(-1);
  const [openAllCancelPop, setOpenAllCancelPop] = useState(-1)

 
  const handleCancelProduct = (SubId) => {
    // console.log(SubId, "SubId")
    setOpenDeletePop(SubId)
  }
  const orderInfoHandler = (item) => {
    setProductDetails(item)
    // console.log(item, "line11111")
  }
  console.log(ShippingDetail, "ShippingDetail")
  return (
    <div className='mt-20'>
      <div className='containerTrue pb-45 '>
        <div className='trueTheme-cart-container'>
          <div className='myOrders-container'>
            <h2 className='myOrders-heading'> Orders Details</h2>
            {
              getGuestOrderBookingListLoading && !getGuestOrderBookingListSuccess ? (
                <ThreeDotLoader center={true} />
              ) : (
                <>
                  <div className='guest-myOrder-orderList-main-wrap'>
                    <div className='guestorder-container-left'>
                      <div className='myOrders-list-wraper '>
                        <div className='myOrders-id-wrap'>
                          <p className='id-p'><span>ORDER ID-&nbsp;</span> <span className=' id-item'>#{productDetail ? productDetail._id : 'No Order'}</span></p>
                          <p className='id-p'><span>ORDER PLACED ON-&nbsp;</span> <span className='id-sapn'>{productDetail.createdAt ? moment(productDetail.createdAt).format("ll") : 'No Order'}</span></p>
                        </div>
                        <div className='myOrder-orderList-wrap order-border'>
                          <div className='myOrder-orderList-leftsidebar'>
                            <img src={productDetail?.orderProduct?.productPicture[0] ? productDetail?.orderProduct?.productPicture[0] : ProductImg} alt="cartImage" />
                          </div>
                          <div className='myOrder-orderList-rightsidebar'>
                            <p className='text-xs w-700'>{productDetail?.orderProduct?.variationName ?? productDetail?.orderProduct?.variationName}</p>
                            <div className='inline between-lg between-xs order-info-status-item '>
                              <div>
                                <p className='mt-10'> <span className='text-xxs w-400'>SKU  :  </span> <span className='text-xxs w-600'>{productDetail?.orderProduct?.SKU ?? productDetail?.orderProduct?.SKU}</span> </p>
                                {productDetail?.orderProduct?.variant_scheme && productDetail?.orderProduct?.variant_scheme.length ?
                                  productDetail?.orderProduct?.variant_scheme.map((varItem, key) => {
                                    return (
                                      <React.Fragment key={key}>
                                      <p className='mt-10'><span className='text-xxs w-400'>{varItem?.title} : </span> <span className='text-xxs w-600'> {varItem?.value} </span>  </p>
                                      </React.Fragment>
                                    );
                                  }) : ""
                                }
                              </div>
                              <div className='cancel-status-item'>
                                <div className='order-status-div'>
                                  <p className='status-marker'></p> <p><span className='pr-3'>Status :</span>
                                    {productDetail?.status && productDetail?.status === "Failed" &&
                                      !productDetail.isFailedByUser &&
                                      <span className='color-red'>
                                        Failed
                                      </span>
                                    }
                                    {productDetail && productDetail?.status === "Placed" && !productDetail?.status === "Rejected" &&
                                      <span className='color-processing '>
                                        Processing
                                      </span>
                                    }
                                    {productDetail && productDetail?.status === "Placed" && productDetail?.status === "Placed" &&
                                      <span className='color-processing '>
                                        Processing
                                      </span>
                                    }
                                    {productDetail && productDetail?.status === "Placed" && productDetail?.status === "PartiallyFulfilled" &&
                                      <span className='color-processing '>
                                        Processing
                                      </span>
                                    }
                                    {productDetail && productDetail?.status === "Rejected" && productDetail?.status === "Placed" &&
                                      <span className='color-red'>
                                        Rejected
                                      </span>
                                    }

                                    {productDetail && productDetail?.status === "Placed" && productDetail?.isFailedByUser &&
                                      <span className='color-red'>
                                        Cancelled
                                      </span>
                                    }
                                    {productDetail && productDetail?.status === "PartiallyFulfilled" && productDetail?.status === "Failed" && productDetail.isFailedByUser &&
                                      <span className='color-red'>
                                        Cancelled
                                      </span>
                                    }
                                    {productDetail && productDetail?.status === "Shipped" &&
                                      <span className='color-shipped'>
                                        Shipped
                                      </span>
                                    }
                                    {productDetail && productDetail?.status === "Failed" && productDetail?.isFailedByUser && productDetail.status === "Failed" &&
                                      < span className='color-red'>
                                        Cancelled
                                      </span>
                                    }
                                    {productDetail && productDetail?.status === "Delivered" && productDetail?.status === "PartiallyFulfilled" &&
                                      < span className='color-dilevered'>
                                        Delivered
                                      </span>
                                    }
                                    {productDetail && productDetail?.status === "Delivered" && productDetail?.status === "Delivered" &&
                                      < span className='color-dilevered'>
                                        Delivered
                                      </span>
                                    }
                                  </p>
                                </div>
                                {productDetail?.status === "Placed" && !productDetail?.status === "Rejected" && productDetail?.orderProduct.allowCancellation ?
                                  <button className='cancel-product-btn' onClick={() => handleCancelProduct(productDetail._id)}>
                                    Cancel Product
                                  </button>
                                  : productDetail?.status === "Placed" && productDetail?.status === "PartiallyFulfilled" && productDetail?.orderProduct.allowCancellation ?
                                    <button className='cancel-product-btn' onClick={() => handleCancelProduct(productDetail._id)}>
                                      Cancel Product
                                    </button> : productDetail?.status === "Placed" && productDetail?.status === "Placed" && productDetail?.orderProduct.allowCancellation ?
                                      <button className='cancel-product-btn' onClick={() => handleCancelProduct(productDetail?._id)}>
                                        Cancel Product
                                      </button> : ""
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className='other-item-wrapper'>
                        {getGuestOrderBookingListSuccess && getGuestOrderBookingListData.length > 0 && <p className='other-item-header w-700'>Other items in this order</p>}
                        {getGuestOrderBookingListSuccess && getGuestOrderBookingListData.length > 0 && getGuestOrderBookingListData[0].suborders.filter((val) => val._id !== productDetail._id).map((item, key) => {
                          return (
                            <div className='other-item-body-wrapper' key={key}>
                              <div className='product-div-item'>
                                <div className='product-div-left-item'>
                                  <img src={item.orderProduct?.productPicture && item.orderProduct?.productPicture.length > 0 ? item.orderProduct?.productPicture[0] : ProductImg} alt="" />
                                </div>
                                <div className='product-div-right-item'>
                                  <p className='other-product-name-div'>{item.orderProduct.variationName}</p>
                                  <div className='other-product-info-wrapper'>
                                    {item.orderProduct.variant_scheme && item.orderProduct.variant_scheme.length ? item.orderProduct.variant_scheme.map((varItem, key) => {
                                      return (
                                        <div className='product-variants-wapper'>
                                          <div className='product-variants-item'>
                                            <p><span>{varItem?.title} : </span> <span className='item-type'> {varItem?.value} </span></p>
                                          </div>
                                        </div>
                                      )
                                    }) : ""}
                                    <button className='btn-order-details' onClick={() => orderInfoHandler(item)}>View Details</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                        }
                      </div>
                      <div className="other-item-wrapper">
                        <div className='connect-coustmer-div'>
                          <p className='connect-coustmer-item '>NEED HELP WITH YOUR ORDER?</p>
                          <p className='connect-coustmer-link' onClick={() => handle()} >CONNECT WITH OUR SUPPORT TEAM</p>
                        </div>
                      </div>
                    </div>
                    <div className='guestorder-container-right'>
                      <div className='geust-order-details-wrap-shipping  guest-order-border'>
                        <p className='shipping-p'>SHIPPING DETAILS</p>
                        <p className='name mt-16'>{ShippingDetail?.delivery_address?.name} </p>

                        <p className='shipping-address mt-12'>{ShippingDetail?.delivery_address?.addressLineTwo}{ShippingDetail?.delivery_address?.addressLineThree ? `, ${ShippingDetail?.delivery_address?.addressLineThree}` : ""}{ShippingDetail?.delivery_address?.city ? `, ${ShippingDetail?.delivery_address?.city}` : ""}{ShippingDetail?.delivery_address?.state ? `, ${ShippingDetail?.delivery_address?.state}` : ""}{ShippingDetail?.delivery_address?.pinCode ? `, ${ShippingDetail?.delivery_address?.pinCode}`: ""}
                         {ShippingDetail?.delivery_address?.landmark ? `, Landmark- ${ShippingDetail?.delivery_address?.landmark}` : ""}
                         </p>
                      </div>
                      <div className='guest-order-border guest-paymentSummary-container mt-12'>
                        <div className='paymentSummary-div'>
                          <p>PAYMENT SUMMARY</p>
                        </div>
                        <div className='payment-details'>
                          <div className='payment-div'>
                            <p>Cart Total</p>
                            <p> {getPrice(ShippingDetail?.orderTotal)}</p>
                          </div>
                          <div className='payment-div'>
                            <p>Delivery Fee</p>
                            <p className='delivery-fee'><del>RS 0</del></p>
                          </div>
                          <div className='payment-div'>
                            <p>Order Total</p>
                            <p> {getPrice(ShippingDetail?.orderTotal)}</p>
                          </div>
                          <hr className='line' />
                          <div className='payment-div'>
                            <p>Total Amount</p>
                            <p className='total-amount'> {getPrice(ShippingDetail?.orderTotal)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>

              )
            }

          </div>
        </div>
      </div>
      {contactPage === true ?
        <div className='guest-content-us-container'>
          <Modal show={modalStateClose}>
            <ModalBody>
              <ModalHeader
                closeButton={true}
                onclose={closeModalState}
              />
              <Contectus closeModalState={closeModalState} />
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </Modal>  </div> : ""
      }

    </div>
  )
}

export default GuestOrderDetail