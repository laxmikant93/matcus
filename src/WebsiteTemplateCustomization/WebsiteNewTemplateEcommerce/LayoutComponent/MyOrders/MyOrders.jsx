import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './myOrders.scss';
import Image1 from '../../assets/images/bestSeller1.png'
import { customerOrderList, customerCancelOrder, getAllOrder, updateCustomerStatus, resetCancelUpdateStatus } from '../../../../store/actions/ecommerce/action/cartOrder';
// import { getSavedCustomer } from '../../../../store/actions/ecommerce/action/auth';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import moment from 'moment/moment';
import DefaultImage from '../../assets/images/Product_default.jpg';
// import DeleteConfirmPop from '../../CommonComponent/CommonJsx/DeleteConfirmPop/DeleteConfirmPop';
import { getGuestCartDetail } from '../../../../store/actions/ecommerce/action/guestIndex';
import Auth from '../../../../Classes/Auth';
import DeleteConfirmPop from '../../../../App/Dashboard/EcommerceDashboard/Component/DeleteConfirmPop/DeleteConfirmPop'
import Pagination from '../../../../Common/Pagination';



const MyOrders = () => {
  // const [orderList, setOrderList] = useState('');

  // const { customerDetail } = useSelector((state) => state.ecomAuth);
  // const user = useSelector((state) => state.user);
  // const subdomainuser = useSelector((state) => state.subdomainuser);
  // const { customerOrderList: list } = useSelector((state) => state.orderCartList);
  // const [deletepopup, setDeletePopup] = useState(false);
  // const [deleteID, setDeleteId] = useState("");
  // const handleDeleteModal = (id) => {
  //   setDeletePopup(true);
  //   setDeleteId(id);
  // }
  // const deleteHandler = () => {
  //   deleteAddress(deleteID);
  //   setDeletePopup(false);
  // };


  const [openDeletePop, setOpenDeletePop] = useState(-1);

  const { user, subdomainuser, customerOrderListSuccess, customerOrderListData, statusUpdateSuccss, statusUpdateLoading } = useSelector((state) => {
    return {
      user: state.user,
      subdomainuser: state.subdomainuser,
      customerOrderListData: state.orderCartList.getAllCustomerOrder.data,
      customerOrderListSuccess: state.orderCartList.getAllCustomerOrder.success,
      statusUpdateSuccss: state.orderCartList.updateCustomerStatus.success,
      statusUpdateLoading: state.orderCartList.updateCustomerStatus.loading,

    }
  });

  const dispatch = useDispatch();
  const history = useNavigate();
  const [ordersCount, setOrdersCount] = useState("")
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   dispatch(getSavedCustomer());
  // }, []);


  // useEffect(() => {
  //   if (window.close()) {

  //   }
  // });

  // useEffect(() => {
  //   let guestuserId = localStorage.getItem("Guest_new_userId");
  //   (Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) ?
  //     (AppLinkUrl.privateDomain() ?
  //       user && user._id && dispatch(customerOrderList(user._id, user.user_institute, "user"))
  //       :
  //       subdomainuser && subdomainuser._id && dispatch(customerOrderList(subdomainuser._id, user.user_institute, "user")))
  //     :
  //     (dispatch(customerOrderList(guestuserId, user.user_institute, "user")))
  // }, [subdomainuser, dispatch, user]);


  // useEffect(() => {
  //   // if (customerDetail.data && customerDetail.data.data && customerDetail.data.data._id) {
  //   //   dispatch(customerOrderList(customerDetail.data.data._id));
  //   // }
  //   if (AppLinkUrl.privateDomain()) {
  //     user && user._id && dispatch(customerOrderList(user._id, user.user_institute, "user"));
  //   } else {
  //     subdomainuser && subdomainuser._id && dispatch(customerOrderList(subdomainuser._id, user.user_institute, "user"));
  //   }
  // }, [subdomainuser, dispatch, user]);



  // useEffect(() => {
  //   // if (customerDetail.success === true) {

  //   //   if (!customerDetail.data || !customerDetail.data.data || !customerDetail.data.data._id) {
  //   //     history('/customer-login');
  //   //   }
  //   // }
  //   if (AppLinkUrl.privateDomain()) {
  //     if (!user || !user._id) {
  //       history('/customer-login');
  //     }
  //   } else {
  //     if (!subdomainuser || !subdomainuser._id) {
  //       history('/customer-login');
  //     }
  //   }
  // }, [user, history, subdomainuser]);

  // useEffect(() => {
  //   if (list.success === true && list.data && list.data.length > 0) {
  //     const arr = [];
  //     list.data.forEach((vl, i) => {
  //       if (vl.orderProduct && vl.orderProduct.length > 0) {
  //         vl.orderProduct.forEach((pr, j) => {
  //           let obj = { product: pr };
  //           obj.Status = vl.Status;
  //           obj.createdAt = vl.createdAt;
  //           obj._id = vl._id;
  //           obj.shipping_tracking_id = vl.shipping_tracking_id;
  //           obj.shipping_partner = vl.shipping_partner;
  //           obj.tracking_url = vl.tracking_url;
  //           arr.push(obj);
  //         });
  //       }
  //     });
  //     setOrderList([...arr]);
  //   }
  // }, [list]);

  // const customerOrderCancelHandler = (id) => {
  //   const body = { status: "user cancel order", orderId: id };
  //   dispatch(customerCancelOrder(body));
  //   // window.location.reload();
  // };

  const orderInfoHandler = (id, prdId) => {
    history(`/ecom-orderDetails/${id}/${prdId}`);
  };
  let limit = 7
  // let skip = 0
  // const loop = [1, 2, 3, 4, 5];

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      user && user._id && dispatch(getAllOrder(user.user_business, user._id, limit, (currentPage - 1) * limit))
    } else {
      subdomainuser && subdomainuser._id && dispatch(getAllOrder(subdomainuser.user_business, subdomainuser._id, limit, (currentPage - 1) * limit));
    }

  }, [dispatch, subdomainuser, user, currentPage, limit]);
  const handleCancelProduct = (suborderId) => {
    // console.log(suborderId, "suborderId")
    setOpenDeletePop(suborderId)

  }
  const handleAcceptPopupCancel = () => {
    setOpenDeletePop(-1)
  }
  const SureCancelSubProduct = () => {
    dispatch(updateCustomerStatus(openDeletePop, { status: "Failed", isFailedByUser: true, order_failure_date: new Date(), }));
    setTimeout(() => {
      if (AppLinkUrl.privateDomain()) {
        user && user._id && dispatch(getAllOrder(user.user_business, user._id, limit, ((currentPage - 1) * limit)))
      } else {
        subdomainuser && subdomainuser._id && dispatch(getAllOrder(subdomainuser.user_business, subdomainuser._id, limit, ((currentPage - 1) * limit)));
      }
    }, 500)
  }
  let type = "Cancel"
  useEffect(() => {
    if (statusUpdateSuccss) {
      dispatch(resetCancelUpdateStatus())
    }
  }, [dispatch, statusUpdateSuccss])
  useEffect(() => {
    if (statusUpdateSuccss) {
      // dispatch(getAllOrder(user.user_business, subdomainuser._id))
      setOpenDeletePop(-1)
    }
  }, [statusUpdateSuccss])
  useEffect(() => {
    if (customerOrderListSuccess && (customerOrderListData || customerOrderListData.count === 0)) {
      setOrdersCount(customerOrderListData.count)
    }
  }, [customerOrderListData]);
  // const handlePagination = (page) => {
  //   setCurrentPage(page)
  //   console.log(page, "pagee")
  //   console.log(currentPage, "cureent pa")
  //   if (AppLinkUrl.privateDomain()) {
  //     user && user._id && dispatch(getAllOrder(user.user_business, user._id, limit, page - 1 * limit))
  //   } else {
  //     subdomainuser && subdomainuser._id && dispatch(getAllOrder(user.user_business, subdomainuser._id, limit, page - 1 * limit));
  //   }
  // }
  // console.log(currentPage, "cureent page oiut")

  // console.log(customerOrderListData, "customerOrderListData")
  // console.log(customerOrderListData.count, "customerOrderListData.count")
  return (
    <React.Fragment>
      <div className='containerTrue pb-45 '>
        <div className='myOrders-container'>
          <h2 className='myOrders-heading'>My Orders</h2>
          {customerOrderListSuccess ?
            customerOrderListData && Object.entries(customerOrderListData.data).length ? Object.entries(customerOrderListData.data).map(([i, vl]) => {
              return (
                < div className='myOrders-list-wraper' >
                  {/* {console.log(vl, "vl")} */}
                  <div className='orderid-wrapper'>
                    <p ><span className='text-xxs w-500'>Order ID - </span> <span className='text-xxs w-700'>{vl[0]?.orderDetail?.order_id} </span>  </p>
                    <p ><span className='text-xxs w-500'>Order Date - </span> <span className='text-xxs w-700'>{moment(vl[0]?.orderDetail?.order_placing_date).format("ll")}  </span></p>
                  </div>
                  <div className='' key={i}>
                    <>
                      {vl &&
                        vl.length > 0 ? vl.map((item, key) => {
                          return (
                            <>
                              <div className='myOrder-orderList-main-wrap'>
                                <div className='myOrder-orderList-wrap  '>
                                  <div className='left-myOrder-orderList-item inline'>
                                    <div className='myOrder-orderList-leftsidebar'>
                                      <img src={item.orderProduct.productPicture && item.orderProduct.productPicture.length > 0 ? item.orderProduct.productPicture[0] : DefaultImage} alt="" />
                                    </div>
                                    <div className='right-myOrder-orderList-item'>
                                      <p className=' text-xs w-700'>{item.orderProduct.variationName} </p>
                                      <p className='mt-10 '> <span className='text-xxs w-400'>SKU :</span>  <span className='text-xxs w-600'> {item.orderProduct.SKU} </span> </p>
                                      {item.orderProduct.variant_scheme && item.orderProduct.variant_scheme.length ?
                                        item.orderProduct.variant_scheme.map((varItem, key) => {
                                          return (
                                            <React.Fragment key={key}>
                                              <p className='mt-10'><span className='text-xxs w-400'>{varItem?.title} : </span> <span className='text-xxs w-600'> {varItem?.value} </span>  </p>
                                            </React.Fragment>
                                          );
                                        }) : ""
                                      }
                                    </div>
                                  </div>
                                  <div className='right-myOrder-orderList-wrapper '>
                                    <div className='order-id-wrapper'>
                                      <p className='id-p mb-5'><span className='text-xxs w-400 bottom-id '>ORDER ID-&nbsp;</span> <span className=' bottom-id id-sapn w-700 text-xxs '>{`#${item?.orderDetail.order_id}`}</span></p>
                                      <hr />
                                      <p className='id-p mt-5'><span className='text-xxs w-400'>Order Date -&nbsp;</span> <span className='id-sapn w-700 text-xxs'>{moment(item?.orderDetail.order_placing_date).format("ll")}</span></p>
                                      <p className='mt-5'> <span className='text-xs w-400'>Status :</span>
                                        {/* <span className={`para mt-16
                                       ${item.status === "Placed" && !vl.Status === "Rejected" ? "color-processing"
                                          : item.status === "Placed" && vl.Status === "Rejected" ? "color-red" :
                                            item.status === "Placed" && vl.Status === "Placed" ? "color-processing" : item.status}`
                                      }>
                                        {item.status === "Placed" && !vl.Status === "Rejected" ? "Processing" :
                                          item.status === "Placed" && vl.Status === "Rejected" ? "Rejected" :
                                            item.status === "Placed" && vl.Status === "Placed" ? "Processing" :
                                              item.status}
                                      </span> */}
                                        {item.status === "Placed" && !item.orderDetail.Status === "Rejected" &&
                                          <span className="color-processing">
                                            Processing
                                          </span>
                                        }
                                        {item.status === "Placed" && item.orderDetail.Status === "Rejected" &&
                                          <span className="color-red">
                                            Rejected
                                          </span>
                                        }
                                        {item.status === "Placed" && item.orderDetail.Status === "Placed" &&
                                          <span className="color-processing">
                                            Processing
                                          </span>
                                        }
                                        {item.status === "Failed" && item.orderDetail.Status === "Failed" && item.isFailedByUser &&
                                          <span className="color-red">
                                            Cancelled
                                          </span>
                                        }
                                        {item.status === "Failed" && !item.isFailedByUser &&
                                          <span className="color-red">
                                            Failed
                                          </span>
                                        }
                                        {item.status === "Failed" && item.orderDetail.Status === "PartiallyFulfilled" && item.isFailedByUser === true &&
                                          <span className="color-red">
                                            Cancelled
                                          </span>
                                        }
                                        {item.status === "Cancelled" &&
                                          <span className="color-red">
                                            Cancelled
                                          </span>
                                        }
                                        {item.status === "Failed" && item.orderDetail.Status === "Placed" &&
                                          <span className="color-red">
                                            Cancelled
                                          </span>
                                        }
                                        {item.status === "Shipped" && item.orderDetail.Status === "Failed" &&
                                          <span className="color-shipped">
                                            Shipped
                                          </span>
                                        }
                                        {item.status === "Shipped" && item.orderDetail.Status === "Shipped" &&
                                          <span className="color-shipped">
                                            Shipped
                                          </span>
                                        }
                                        {item.status === "Shipped" && item.orderDetail.Status === "PartiallyFulfilled" &&
                                          <span className="color-shipped">
                                            Shipped
                                          </span>
                                        }
                                        {item.status === "Placed" && item.orderDetail.Status === "PartiallyFulfilled" &&
                                          <span className="color-processing">
                                            Processing
                                          </span>
                                        }
                                        {item.status === "Delivered" && !item.isFailedByUser &&
                                          <span className="color-green">
                                            Delivered
                                          </span>
                                        }
                                      </p>
                                    </div>
                                    <button className='btn-order-details ' onClick={() => { orderInfoHandler(item.orderId, item._id) }}>View Order Details</button>
                                    {item?.status === "Placed" && !item.orderDetail.Status === "Rejected" && item?.orderProduct.allowCancellation === true ?
                                      <button className='btn-order-details ' onClick={() => handleCancelProduct(item._id)}>Cancel Product</button>
                                      : item.status === "Placed" && item.orderDetail.Status === "Rejected" ? ""
                                        : item.status === "Placed" && item.orderDetail.Status === "PartiallyFulfilled" && item?.orderProduct.allowCancellation === true ?
                                          <button className='btn-order-details ' onClick={() => handleCancelProduct(item._id)}>Cancel Product</button>
                                          : item.status === "Placed" && item.orderDetail.Status === "Placed" && item?.orderProduct.allowCancellation === true ?
                                            <button className='btn-order-details ' onClick={() => handleCancelProduct(item._id)}>Cancel Product</button> :
                                            // <button className='btn-order-details' onClick={() => handleCancelProduct(item._id)}>Cancel Product</button>
                                            ""
                                    }
                                    {/* {item?.status === "Delivered" && <button className='btn-order-details '>Return Product</button>} */}


                                    <div className='edit-btn-wrap'>
                                      {
                                        openDeletePop === item._id && <DeleteConfirmPop index={i} type={type} handleAcceptPopup={handleAcceptPopupCancel} deleteVarHandler={SureCancelSubProduct} loading={statusUpdateLoading} />
                                      }
                                    </div>

                                  </div>
                                </div>

                              </div>
                            </>
                          )
                        }) : ("")

                      }
                    </>
                  </div>
                </div>
              )
            }) :
              <div className='loadingGridData'>No Orders Found. Shop Now.</div>
            : <ComponentLoader />
          }
          {customerOrderListSuccess &&
            customerOrderListData && Object.entries(customerOrderListData.data).length ? <div className='inline  align-center pagination-wrapper '>
            <div className='orderList-top-right'>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={ordersCount}
                pageSize={limit}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div> : ""}
        </div>
      </div>
    </React.Fragment >
  )
}

export default MyOrders 