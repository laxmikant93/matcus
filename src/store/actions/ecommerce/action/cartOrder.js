import Auth from "../../../../Classes/Auth";
import { setCommonError } from "../../commonerror";
import { showSuccessPopup } from "../../successmessagepopup";
import { userActionType } from "../../user/actionTypes";
import CartOrderRequest from "../request/cartOrder";
import ProductRequest from "../request/product";
import {
  ADMIN_ORDER_LIST_LOADING,
  CHANGE_ORDER_STATUS_LOADING,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAIL,
  CartActionTypes,
  UPDATE_ORDER_STATUS_LOADING,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_REJECT,
  subOrderActionType
} from "../type/cartOrder";

///////////////////////////////ADMIN OPERATIONS///////////////////

const getOrderList = (id, limit, page, userid) => async (dispatch) => {
  dispatch({ type: CartActionTypes.ADMIN_ORDER_LIST_LOADING });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.getOrderDetailForAdmin
      .replace("__ID__", id).replace("_LIMIT_", limit).replace("_PAGE_", page).replace("_USERID_", userid),
    {},
    (list) => {
      // console.log(list.data, "payylistt")
      dispatch({
        type: CartActionTypes.ADMIN_ORDER_LIST_SUCCESS,
        payload: list.data.data,
      });
    },
    (error) => {
      dispatch({ type: CartActionTypes.ADMIN_ORDER_LIST_FAIL, payload: error });
    }
  )
};

export const getOrderListByStatus = (businessid, status, limit, page, userid) => {
  let data = {}
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.ADMIN_ORDER_LIST_LOADING,
      loading: true,
    });
    CartOrderRequest.post(CartOrderRequest.endpoint.getOrderListByStatus.replace("_BUSINESSID_", businessid).replace("_STATUS_", status).replace("_LIMIT_", limit).replace("_PAGE_", page).replace("_USERID_", userid), data,
      (success) => {
        dispatch({
          type: CartActionTypes.ADMIN_ORDER_LIST_SUCCESS,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getOrderListbySearch = (businessid, value, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.ADMIN_ORDER_LIST_LOADING,
      loading: true,
    });
    CartOrderRequest.get(
      CartOrderRequest.endpoint.getOrderListbySearch.replace("_BUSINESSID_", businessid).replace("_VALUE_", value).replace("_LIMIT_", limit).replace("_SKIP_", skip),
      (success) => {
        dispatch({
          type: CartActionTypes.SEARCH_ORDER_ADMINLIST,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getOrderListbyDate = (businessid, startDate, endDate, limit, page, userid) => {
  let data = {}
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.ADMIN_ORDER_LIST_LOADING,
      loading: true,
    });
    CartOrderRequest.post(
      CartOrderRequest.endpoint.getOrderListbyDate.replace("_BUSINESSID_", businessid).replace("_VALUE_", startDate).replace("_VALUE_", endDate).replace("_LIMIT_", limit).replace("_PAGE_", page).replace("_USERID_", userid), data,
      (success) => {
        dispatch({
          type: CartActionTypes.GET_ORDER_LIST_BY_DATE,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const resetAdminOrderList = () => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.ADMIN_ORDER_LIST_RESET,
      payload: {}
    });
  }
}
export const getOrderListSortBy = (businessid, sortValue, limit, page, userid) => (dispatch) => {
  dispatch({
    type: CartActionTypes.ADMIN_ORDER_LIST_LOADING,
    loading: true,
  });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.getOrderListSortBy
      .replace("_BUSINESSID_", businessid).replace("_VALUE_", sortValue).replace("_LIMIT_", limit).replace("_PAGE_", page).replace("_USERID_", userid), {},
    (success) => {
      dispatch({
        type: CartActionTypes.GET_ORDER_LIST_SORTBY,
        payload: success.data.data
      });
    },
    (error) => {
      dispatch({
        type: CartActionTypes.ADMIN_ORDER_LIST_FAIL,
        // payload: error.response.data.message 
        payload: error.message
      });
    }
  )
};
// const getOrderList = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.ADMIN_ORDER_LIST_LOADING });
//     const url = `${API_PRODUCT}/getOrderDetailForAdmin?businessid=${id}`;
//     const list = await postRequest(url);
//     if (list.status === 200) {
//       dispatch({
//         type: CartActionTypes.ADMIN_ORDER_LIST_SUCCESS,
//         payload: list.data.data.orderInfo,
//       });
//     }

//   } catch (error) {

//     dispatch({ type: CartActionTypes.ADMIN_ORDER_LIST_FAIL, payload: error });
//   }
// };

const changeOrderStatus = (body) => async (dispatch) => {
  dispatch({ type: CartActionTypes.CHANGE_ORDER_STATUS_LOADING });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.changeOrderStatus
      .replace("__ORDERID__", body.orderId)
      .replace("__STATUS__", body.Status),
    {},
    (list) => {
      dispatch({
        type: CartActionTypes.CHANGE_ORDER_STATUS_SUCCESS,
        payload: list.data.data,
      });
    },
    (error) => {
      dispatch({ type: CartActionTypes.CHANGE_ORDER_STATUS_FAIL, payload: error });
    }
  )
};


// const shippingDetails = (id, body) => async (dispatch) => {
//   try {
//     // dispatch({ type: CHANGE_ORDER_STATUS_LOADING });
//     const url = `${API_PRODUCT}/updateOrder/${id}`;
//     const list = await postRequest(url, body);
//     // if (list.status === 200) {
//     //   const url1 = `${API_PRODUCT}/getOrderDetailForAdmin`;
//     //   const list1 = await postRequest(url1);
//     if (list.status === 200) {
//       dispatch({
//         type: CartActionTypes.CHANGE_ORDER_STATUS_SUCCESS,
//         payload: list.data.data,
//       });
//     }
//     // }

//   } catch (error) {

//     dispatch({ type: CartActionTypes.CHANGE_ORDER_STATUS_FAIL, payload: error });
//   }
// };

export const shippingDetails = (id, body) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ORDER_STATUS_LOADING,
      loading: true,
      payload: {}
    })

    ProductRequest.post(ProductRequest.endpoint.shippingOrder.replace("_id_", id),
      body,
      (success) => {
        dispatch({
          type: CHANGE_ORDER_STATUS_SUCCESS,
          payload: success.data
        })
        // dispatch(customerOrderDetail())
        // dispatch(showSuccessPopup("Shipping details added successfully!"));
        // dispatch(setCommonError("Order Status : Delivered"))
        let body = { orderId: id, status: "detail" };
        CartOrderRequest.post(
          CartOrderRequest.endpoint.customerOrder,
          body,
          (resp) => {
            dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_SUCCESS, payload: resp.data.data });
          },
          (error) => {
            dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_FAIL, payload: error });
          }
        )
        dispatch({
          type: subOrderActionType.GET_SHIP_ITEM_LOADING,
          payload: success.data
        })
        CartOrderRequest.get(
          CartOrderRequest.endpoint.getShipItemList.replace("__ID__", id),
          (success) => {
            dispatch({
              type: subOrderActionType.GET_SHIP_ITEM_LOADED,
              payload: success.data
            })
          }
        )

        CartOrderRequest.get(
          CartOrderRequest.endpoint.getDeliFailList.replace("__ID__", id).replace("__STATUS__", "Failed"),
          (success) => {
            dispatch({
              type: subOrderActionType.GET_FAIL_ITEM_LOADED,
              payload: success.data
            })
          }
        )

        CartOrderRequest.get(
          CartOrderRequest.endpoint.getDeliFailList.replace("__ID__", id).replace("__STATUS__", "Delivered"),
          (success) => {
            dispatch({
              type: subOrderActionType.GET_DELIVER_ITEM_LOADED,
              payload: success.data
            })
          }
        )
      },
      error => {
        dispatch({
          type: CHANGE_ORDER_STATUS_FAIL,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

// shadabdev reject function
export const orderListReject = (id, body) => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.UPDATE_ORDER_STATUS_LOADING,
      loading: true,
      payload: {}
    })

    ProductRequest.post(ProductRequest.endpoint.RejectedOrder.replace("_id_", id),
      body,
      (success) => {
        // console.log("line no 210 ...", success)
        dispatch({
          type: CartActionTypes.UPDATE_ORDER_STATUS_SUCCESS,
          payload: success.data
        })
        // dispatch(showSuccessPopup("Order Reject successfully!"));
        // dispatch(setCommonError("Order Status : Rejected"))
        dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_LOADING });
        let body = { orderId: id, status: "detail" };
        CartOrderRequest.post(
          CartOrderRequest.endpoint.customerOrder,
          body,
          (resp) => {
            dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_SUCCESS, payload: resp.data.data });
          },
          (error) => {
            dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_FAIL, payload: error });
          }
        )


      },
      error => {
        dispatch({
          type: CartActionTypes.UPDATE_ORDER_STATUS_REJECT,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

//////////////////////////////////CUSTOMER OPERATIONS///////////////////////////////

export const resetCart = () => {
  return (dispatch) => {
    dispatch({ type: CartActionTypes.CUSTOMER_CART_RESET });
  }
}

const cartToWishlist = (body) => {
  return (dispatch) => {
    dispatch({ type: CartActionTypes.CUSTOMER_CART_LOADING });
    CartOrderRequest.get(
      CartOrderRequest.endpoint.cartToWishlist
        .replace('__VARIATION__', body.variation)
        .replace('__USER__', body.user)
        .replace('__BUSINESS__', body.business),
      (success) => {
        dispatch({ type: CartActionTypes.CUSTOMER_CART_SUCCESS, payload: success.data.data });
      },
      (error) => {
        dispatch({ type: CartActionTypes.CUSTOMER_CART_FAIL, payload: error });
      }
    )
  };
}

const cartOperations = (body) => {
  return (dispatch) => {
    // dispatch({ type: CartActionTypes.CUSTOMER_CART_LOADING });
    CartOrderRequest.post(
      CartOrderRequest.endpoint.addProduct,
      body,
      (list) => {
        // console.log(list)
      },
      (error) => {
        dispatch({ type: CartActionTypes.CUSTOMER_CART_FAIL, payload: error });
      }
    )
  };
}
const cartUpdate = (cart, vari, cond, userid, business) => {
  let body = {

  }
  return (dispatch) => {
    dispatch({ type: CartActionTypes.CART_QUANTITY_LOADING });
    CartOrderRequest.patch(

      CartOrderRequest.endpoint.quantityupdate.replace("__CARTID__", cart).replace("__VAR__", vari).replace("__CON__", cond).replace("__USERID__", userid).replace("__BUSI__", business),
      body,
      (list) => {
        dispatch({ type: CartActionTypes.CART_PATCH_LOADED, payload: list.data });
      },
      (error) => {
        dispatch({ type: CartActionTypes.CUSTOMER_CART_FAIL, payload: error });
      }
    )
  };
}



export const Postcart = (body) => {
  return (dispatch) => {
    dispatch({ type: CartActionTypes.ADD_TO_CART_POST_LOADING });
    CartOrderRequest.post(
      CartOrderRequest.endpoint.addtoCart,
      body, (success) => {
        dispatch({
          type: CartActionTypes.ADD_TO_CART_POST_LOADED,
          payload: success.data
        })
      },
      (error) => {
        dispatch({ type: CartActionTypes.ADD_TO_CART_POST_ERROR, payload: error });
      }
    )
  };
}
export const PostcartReset = (body) => {
  return (dispatch) => {
    dispatch({ type: CartActionTypes.ADD_TO_CART_POST_RESET });
  };
}
export const Getcart = (userId, business) => {
  return (dispatch) => {
    dispatch({ type: CartActionTypes.ADD_TO_CART_GET_LOADING });
    CartOrderRequest.get(
      CartOrderRequest.endpoint.getaddtoCart.replace("user", userId).replace("business", business),
      (success) => {
        dispatch({ type: CartActionTypes.ADD_TO_CART_GET_LOADED, payload: success.data });
      },
      (error) => {
        dispatch({ type: CartActionTypes.ADD_TO_CART_GET_ERROR, payload: error });
      }
    )
  };
}

const UpdateCart = (body) => {

}
// const cartOperations = (body) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.CUSTOMER_CART_LOADING });
//     const url = `${API_PRODUCT}/AddProduct`;
//     const list = await postRequest(url, body);
//     if (list.status === 200) {
//       body = { ...body, status: "readAddToCart" };
//       const url1 = `${API_PRODUCT}/AddProduct`;
//       const list1 = await postRequest(url1, body);
//       if (list1.status === 200) {
//         dispatch({ type: CartActionTypes.CUSTOMER_CART_SUCCESS, payload: list1.data.data });
//         return list1.data.data;
//       }
//     }

//   } catch (error) {

//     dispatch({ type: CartActionTypes.CUSTOMER_CART_FAIL, payload: error });
//   }
// };

const readCart = (body) => async (dispatch) => {
  dispatch({ type: CartActionTypes.READ_CART_LOADING });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.addProduct,
    body,
    (list) => {
      dispatch({ type: CartActionTypes.READ_CART_SUCCESS, payload: list.data.data });
    },
    (error) => {
      dispatch({ type: CartActionTypes.READ_CART_FAIL, payload: error });
    }
  )
};

// const readCart = (body) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.READ_CART_LOADING });
//     // let body = { userId: "626f74dd6da9d86db736178d", status: "readAddToCart" };
//     const url = `${API_PRODUCT}/AddProduct`;
//     const list = await postRequest(url, body);
//     if (list.status === 200) {
//       dispatch({ type: CartActionTypes.READ_CART_SUCCESS, payload: list.data.data });
//     }

//   } catch (error) {

//     dispatch({ type: CartActionTypes.READ_CART_FAIL, payload: error });
//   }
// };

const getAddressList = (id) => async (dispatch) => {
  dispatch({ type: CartActionTypes.ADDRESS_LIST_LOADING });
  CartOrderRequest.get(
    CartOrderRequest.endpoint.OrderaddressList
      .replace("__ID__", id),
    (list) => {
      dispatch({ type: CartActionTypes.ADDRESS_LIST_SUCCESS, payload: list.data.data });
    },
    (error) => {
      dispatch({ type: CartActionTypes.ADDRESS_LIST_FAIL, payload: error });
    }
  )
};

// const getAddressList = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.ADDRESS_LIST_LOADING });
//     const url = `${API_PRODUCT}/OrderaddressList/?userId=${id}`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({ type: CartActionTypes.ADDRESS_LIST_SUCCESS, payload: list.data.data });
//     }

//   } catch (error) {

//     dispatch({ type: CartActionTypes.ADDRESS_LIST_FAIL, payload: error });
//   }
// };

const addressListOperation = (body, status, id) => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.ADDRESS_OPERATIONS_LOADING
    });

    if (status === "create") {
      CartOrderRequest.post(
        CartOrderRequest.endpoint.createOrderaddress,
        {
          ...body,
          userId: id,
        },
        (resp) => {
          dispatch({ type: CartActionTypes.ADDRESS_LIST_OPERATIONS_CREATE, payload: resp.data.data });
        },
        (error) => {
          dispatch({ type: CartActionTypes.ADDRESS_OPERATIONS_FAIL, payload: error });
        }
      )
    }
    if (status === "delete") {
      CartOrderRequest.get(
        CartOrderRequest.endpoint.deleteOrderaddress
          .replace("__BODY__", body),
        (resp) => {
          dispatch({
            type: CartActionTypes.ADDRESS_LIST_OPERATIONS_DELETE,
            payload: body
          });
        },
        (error) => {
          dispatch({
            type: CartActionTypes.ADDRESS_OPERATIONS_FAIL,
            payload: error
          });
        }
      )
    }
    if (status === "update") {
      CartOrderRequest.patch(
        CartOrderRequest.endpoint.Orderaddress
          .replace("__ID__", body._id),
        body,
        (resp) => {
          dispatch({ type: CartActionTypes.ADDRESS_LIST_OPERATIONS_EDIT, payload: body });
        },
        (error) => {
          dispatch({ type: CartActionTypes.ADDRESS_OPERATIONS_FAIL, payload: error });
        }
      )
    }
  }
};

// const addressListOperation = (body, status, id) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.ADDRESS_OPERATIONS_LOADING });
//     if (status === "create") {
//       const url = `${API_PRODUCT}/createOrderaddress`;
//       const resp = await postRequest(url, {
//         ...body,
//         userId: id,
//       });

//       if (resp.status === 200) {

//         dispatch({ type: CartActionTypes.ADDRESS_LIST_OPERATIONS_CREATE, payload: resp.data.data });
//       }
//     }
//     if (status === "delete") {
//       const url = `${API_PRODUCT}/deleteOrderaddress/${body}`;
//       const resp = await getRequest(url);

//       if (resp.status === 200) {
//         dispatch({ type: CartActionTypes.ADDRESS_LIST_OPERATIONS_DELETE, payload: body });
//         // const url1 = `${API_PRODUCT}/OrderaddressList/?userId=${id}`;
//         // const list = await getRequest(url1);
//         // dispatch({ type: ADDRESS_OPERATIONS_SUCCESS, payload: list.data.data });

//       }
//     }
//     if (status === "update") {
//       const url = `${API_PRODUCT}/Orderaddress/${body._id}`;
//       const resp = await patchRequest(url, body);

//       if (resp.status === 200) {
//         // const url1 = `${API_PRODUCT}/OrderaddressList/?userId=${id}`;
//         // const list = await getRequest(url1);
//         dispatch({ type: CartActionTypes.ADDRESS_LIST_OPERATIONS_EDIT, payload: body });

//       }
//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.ADDRESS_OPERATIONS_FAIL, payload: error });
//   }
// };

const addressListOperationReset = () => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.ADDRESS_OPERATIONS_RESET,
      payload: []
    })
  }
}

const createOrderFromCart = (body, history) => async (dispatch) => {
  dispatch({ type: CartActionTypes.CREATE_CART_ORDER_LOADING });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.createOrderFromCart,
    body,
    (resp) => {
      const order = resp.data.data.data._id
      if (resp.data.data.data._id) {
        if (resp.data.data.data.order_payment_method === "cashOnDelivery") {
          history(`/ecom-orderConfirm/success`);
        } else {
          CartOrderRequest.post(
            CartOrderRequest.endpoint.createRazorPayOrder.replace("__ORDERID__", order),
            {},
            (resp1) => {
              CartOrderRequest.get(
                CartOrderRequest.endpoint.getRazorPayOrder
                  .replace("__ORDERID__", order),
                (resp2) => {
                  function loadScript(src) {
                    return new Promise((resolve) => {
                      const script = document.createElement("script");
                      script.src = src;
                      script.onload = () => {
                        resolve(true);
                      };
                      script.onerror = () => {
                        resolve(false);
                      };
                      document.body.appendChild(script);
                    });
                  }
                  const openRazorPay = async () => {
                    const response = await loadScript(
                      process.env.REACT_APP_RAZOR_PAY_LOAD_SCRIPT
                    );
                    if (!response) {
                      alert("Razorpay SDK failed to load. Are you online?");
                      return;
                    }
                    if (resp2.status === 200 && resp2.data) {
                      const options = {
                        key: process.env.REACT_APP_RAZOR_PAY_KEY,
                        amount: resp2.data.orderTotal,
                        // currency: "INR",
                        name: resp2.data.order_id,
                        description: "Brandneed Payment",
                        order_id: resp2.data.order_id,
                        handler: async function (response) {
                          const data = {
                            orderCreationId: resp2.data.order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                          };
                          // setPaymentLoading(true);
                          CartOrderRequest.post(
                            CartOrderRequest.endpoint.paymentcallback,
                            data,
                            (resp3) => {
                              if (
                                resp3.data.domainStatus == "Domain Bought" &&
                                resp3.data.paymentStatus == "Payment successfull"
                              ) {
                                history(`/ecom-orderConfirm/${resp3.data}`);
                              } else {
                                history({
                                  pathname: `/ecom-orderConfirm/${resp3.data}`,
                                  state: { detail: true },
                                });
                              }
                            }
                          )
                          // const url = `${API_PRODUCT}/paymentcallback`;
                          // const resp3 = await postRequest(url, data);

                          // if (
                          //   resp3.data.domainStatus == "Domain Bought" &&
                          //   resp3.data.paymentStatus == "Payment successfull"
                          // ) {
                          //   history(`/ecom-orderConfirm/${resp3.data}`);
                          // } else {
                          //   history({
                          //     pathname: `/ecom-orderConfirm/${resp3.data}`,
                          //     state: { detail: true },
                          //   });
                          // }
                          // RazorPayRequest.post(
                          //   razorPayUrl,
                          //   data,
                          //   (success) => {

                          //     if (success.data.domainStatus == "Domain Bought" && success.data.paymentStatus == "Payment successfull") {
                          //       history("/payment-invoice");
                          //     } else {
                          //       history({
                          //         pathname: "/payment-summary",
                          //         state: { detail: true },
                          //       });
                          //     }
                          //   },
                          // );
                        },
                      };
                      const paymentObject = new window.Razorpay(options);
                      paymentObject.open();
                    }
                  };
                  openRazorPay();
                }
              )
            }
          )
        }
        dispatch({ type: CartActionTypes.CREATE_CART_ORDER_SUCCESS, payload: resp.data.data });
      } else {
        // console.log(resp.data, "line 570")
      }

    },
    (error) => {
      dispatch({ type: CartActionTypes.CREATE_CART_ORDER_FAIL, payload: error });
    }
  )
};

// const createOrderFromCart = (body, history) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.CREATE_CART_ORDER_LOADING });
//     const url = `${API_PRODUCT}/orderProduct`;
//     const resp = await postRequest(url, body);
//     if (resp.status === 200) {
//       const order = resp.data.data._id;
//       if (resp.data.data.order_payment_method === "cashOnDelivery") {
//         history(`/ecom-orderConfirm/success`);
//       } else {
//         const url1 = `${API_PRODUCT}/createorder?order=${order}`;
//         const resp1 = await postRequest(url1);
//         if (resp1.status === 200) {
//           const url2 = `${API_PRODUCT}/getorder?order=${order}`;
//           const resp2 = await getRequest(url2);
//           if (resp2.status === 200) {
//             function loadScript(src) {
//               return new Promise((resolve) => {
//                 const script = document.createElement("script");
//                 script.src = src;
//                 script.onload = () => {
//                   resolve(true);
//                 };
//                 script.onerror = () => {
//                   resolve(false);
//                 };
//                 document.body.appendChild(script);
//               });
//             }
//             const openRazorPay = async () => {
//               const response = await loadScript(
//                 process.env.REACT_APP_RAZOR_PAY_LOAD_SCRIPT
//               );
//               if (!response) {
//                 alert("Razorpay SDK failed to load. Are you online?");
//                 return;
//               }
//               if (resp2.status === 200 && resp2.data) {
//                 const options = {
//                   key: process.env.REACT_APP_RAZOR_PAY_KEY,
//                   amount: resp2.data.orderTotal,
//                   // currency: "INR",
//                   name: resp2.data.order_id,
//                   description: "Brandneed Payment",
//                   order_id: resp2.data.order_id,
//                   handler: async function (response) {
//                     const data = {
//                       orderCreationId: resp2.data.order_id,
//                       razorpayPaymentId: response.razorpay_payment_id,
//                       razorpayOrderId: response.razorpay_order_id,
//                       razorpaySignature: response.razorpay_signature,
//                     };
//                     // setPaymentLoading(true);
//                     const url = `${API_PRODUCT}/paymentcallback`;
//                     const resp3 = await postRequest(url, data);

//                     if (
//                       resp3.data.domainStatus == "Domain Bought" &&
//                       resp3.data.paymentStatus == "Payment successfull"
//                     ) {
//                       history(`/ecom-orderConfirm/${resp3.data}`);
//                     } else {
//                       history({
//                         pathname: `/ecom-orderConfirm/${resp3.data}`,
//                         state: { detail: true },
//                       });
//                     }
//                     // RazorPayRequest.post(
//                     //   razorPayUrl,
//                     //   data,
//                     //   (success) => {

//                     //     if (success.data.domainStatus == "Domain Bought" && success.data.paymentStatus == "Payment successfull") {
//                     //       history("/payment-invoice");
//                     //     } else {
//                     //       history({
//                     //         pathname: "/payment-summary",
//                     //         state: { detail: true },
//                     //       });
//                     //     }
//                     //   },
//                     // );
//                   },
//                 };
//                 const paymentObject = new window.Razorpay(options);
//                 paymentObject.open();
//               }
//             };
//             openRazorPay();
//           }
//         }
//       }


//       dispatch({ type: CartActionTypes.CREATE_CART_ORDER_SUCCESS, payload: resp.data.data });

//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.CREATE_CART_ORDER_FAIL, payload: error });
//   }
// };

const customerOrderDetail = (id) => async (dispatch) => {
  dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_LOADING });
  let body = { orderId: id, status: "detail" };
  CartOrderRequest.post(
    CartOrderRequest.endpoint.customerOrder,
    body,
    (resp) => {
      dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_SUCCESS, payload: resp.data.data });
    },
    (error) => {
      dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_FAIL, payload: error });
    }
  )
};
const customerOrderSingleDetail = (id) => async (dispatch) => {
  dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_LOADING });
  CartOrderRequest.get(
    CartOrderRequest.endpoint.customerSingleOrder.replace("__ID__", id),
    (resp) => {
      // console.log(resp.data, "line 719")
      dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_SUCCESS, payload: resp.data });
    },
    (error) => {
      dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_FAIL, payload: error });
    }
  )
};

// const customerOrderDetail = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_LOADING });
//     let body = { orderId: id, status: "detail" };
//     const url = `${API_PRODUCT}/orderDetail`;
//     const resp = await postRequest(url, body);
//     if (resp.status === 200) {
//       dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_SUCCESS, payload: resp.data.data });

//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_FAIL, payload: error });
//   }
// };

const customerOrderDetailReset = () => async (dispatch) => {
  try {
    dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_RESET });
  } catch (error) {
    // console.log(error);
  }
};

const customerOrderList = (userid, business, type) => async (dispatch) => {
  dispatch({ type: CartActionTypes.CUSTOMER_ORDER_LIST_LOADING });

  CartOrderRequest.get(
    CartOrderRequest.endpoint.customerAllOrder.replace("__USERID__", userid).replace("__BUIS__", business).replace("__TYPE__", type),
    (success) => {
      dispatch({ type: CartActionTypes.CUSTOMER_ORDER_LIST_SUCCESS, payload: success.data.orders ? success.data.orders : [] });
    },
    (error) => {
      dispatch({ type: CartActionTypes.CUSTOMER_ORDER_LIST_FAIL, payload: error });
    }
  )
};
const getAllOrder = (business, userid, limit, skip) => async (dispatch) => {
  dispatch({ type: CartActionTypes.GET_All_CUSTOMER_ORDER_LOADING });
  CartOrderRequest.get(
    CartOrderRequest.endpoint.getAllOrder.replace("__BUIS__", business).replace("__USERID__", userid).replace("__LIMIT__", limit).replace("__SKIP__", skip),
    (success) => {
      dispatch({
        type: CartActionTypes.GET_All_CUSTOMER_ORDER_SUCCESS,
        payload: success.data
      });
    },
    (error) => {
      dispatch({
        type: CartActionTypes.GET_All_CUSTOMER_ORDER_ERROR,
        payload: error
      });
    }
  )
};
const getSingleOrderOfOtheritems = (orderId, subOrderId) => async (dispatch) => {
  dispatch({ type: CartActionTypes.GET_SINGLE_ORDER_LOADING });
  CartOrderRequest.get(
    CartOrderRequest.endpoint.getSingleOrderOfOtheritems.replace("_ORDERID_", orderId).replace("_SUBORDERID_", subOrderId),
    (success) => {
      dispatch({
        type: CartActionTypes.GET_SINGLE_ORDER_SUCCESS,
        payload: success.data
      });
    },
    (error) => {
      dispatch({
        type: CartActionTypes.GET_SINGLE_ORDER_ERROR,
        payload: error
      });
    }
  )
};
const updateCustomerStatus = (SubOrderId, data) => async (dispatch) => {
  dispatch({ type: CartActionTypes.UPDATE_ORDER_STATUS_BY_CUSTOMER_LOADING });
  CartOrderRequest.patch(
    CartOrderRequest.endpoint.updateCustomerOrderStatus.replace("suborderId", SubOrderId), data,
    (success) => {
      // console.log("success", success)
      dispatch({
        type: CartActionTypes.UPDATE_ORDER_STATUS_BY_CUSTOMER_SUCCESS,
        payload: success.data
      });
    },
    (error) => {
      // dispatch({
      //   type: CartActionTypes.UPDATE_ORDER_STATUS_BY_CUSTOMER_ERROR,
      //   payload: error
      // });
    }
  )
};
export const resetCancelUpdateStatus = () => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.UPDATE_ORDER_STATUS_BY_CUSTOMER_RESET,
      payload: []
    })
  }
}
// const customerOrderList = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.CUSTOMER_ORDER_LIST_LOADING });
//     let body = { userId: id, status: "user" };
//     const url = `${API_PRODUCT}/orderDetail`;
//     const resp = await postRequest(url, body);
//     if (resp.status === 200) {
//       dispatch({ type: CartActionTypes.CUSTOMER_ORDER_LIST_SUCCESS, payload: resp.data.data });

//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.CUSTOMER_ORDER_LIST_FAIL, payload: error });
//   }
// };

const customerCancelOrder = (body, id) => async (dispatch) => {
  dispatch({ type: CartActionTypes.CUSTOMER_CANCEL_ORDER_LOADING });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.customerCancelOrder,
    body,
    (success) => {
      dispatch({
        type: CartActionTypes.CUSTOMER_CANCEL_ORDER_SUCCESS,
        payload: success.data.data,
      });
    },
    (error) => {
      dispatch({ type: CartActionTypes.CUSTOMER_CANCEL_ORDER_FAIL, payload: error });
    }
  )
};

// const customerCancelOrder = (body, id) => async (dispatch) => {
//   try {
//     // dispatch({ type: CartActionTypes.CUSTOMER_CANCEL_ORDER_LOADING });
//     const url = `${API_PRODUCT}/orderCancel`;
//     const resp = await postRequest(url, body);
//     if (resp.status === 200) {
//       // const url1 = `${API_PRODUCT}/orderDetail`;
//       // let body1 = { userId: id, status: "user" };
//       // const resp1 = await postRequest(url1, body1);
//       // if (resp1.status === 200)
//       dispatch({
//         type: CartActionTypes.CUSTOMER_CANCEL_ORDER_SUCCESS,
//         payload: resp.data.data,
//       });

//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.CUSTOMER_CANCEL_ORDER_FAIL, payload: error });
//   }
// };

/////////////////////////////////////RAZOR PAY APIS/////////////////////////////

const addBankAccountDetails = (businessid, body) => async (dispatch) => {
  dispatch({ type: CartActionTypes.ADD_BANK_ACCOUNT_LOADING });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.addBankAccountDetails
      .replace("__BUSINESSID__", businessid),
    body,
    (success) => {
      dispatch({
        type: CartActionTypes.ADD_BANK_ACCOUNT_SUCCESS,
        payload: success.data.data,
      });
      Auth.updateUserDetail(
        "user_account_number",
        success.data.data.account_number
      );
      Auth.updateUserDetail(
        "user_account_type",
        success.data.data.account_type
      );
      Auth.updateUserDetail(
        "user_account_beneficiary_name",
        success.data.data.account_beneficiary_name
      );
      // Auth.updateUserDetail(
      //   "user_razorpay_id",
      //   success.data.data.razorpay_acount_id
      // );
      Auth.updateUserDetail(
        "user_account_ifsc_code",
        success.data.data.account_ifsc_code
      );
      Auth.updateUserDetail(
        "user_account_email",
        success.data.data.account_business_email
      );
      dispatch({
        type: userActionType.SET_INSTITUTE_INFORMATION,
        payload: {
          user_account_number: success.data.data.account_number,
          user_account_type: success.data.data.account_type,
          user_account_beneficiary_name: success.data.data.account_beneficiary_name,
          // user_razorpay_id: success.data.data.razorpay_acount_id,
          user_account_ifsc_code: success.data.data.account_ifsc_code,
          user_account_email: success.data.data.account_business_email
        },
      });
    },
    (error) => {
      dispatch({ type: CartActionTypes.ADD_BANK_ACCOUNT_FAIL, payload: error.response.data.message });
    }
  )
};

// const addBankAccountDetails = (businessid, body) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.ADD_BANK_ACCOUNT_LOADING });
//     const url = `${API_PRODUCT}/addAccountDetails?business=${businessid}`;
//     const resp = await postRequest(url, body);
//     if (resp.status === 200) {
//       dispatch({
//         type: CartActionTypes.ADD_BANK_ACCOUNT_SUCCESS,
//         payload: resp.data.data,
//       });
//       Auth.updateUserDetail(
//         "user_account_number",
//         resp.data.data.account_number
//       );
//       Auth.updateUserDetail(
//         "user_account_type",
//         resp.data.data.account_type
//       );
//       Auth.updateUserDetail(
//         "user_account_beneficiary_name",
//         resp.data.data.account_beneficiary_name
//       );
//       // Auth.updateUserDetail(
//       //   "user_razorpay_id",
//       //   resp.data.data.razorpay_acount_id
//       // );
//       Auth.updateUserDetail(
//         "user_account_ifsc_code",
//         resp.data.data.account_ifsc_code
//       );
//       Auth.updateUserDetail(
//         "user_account_email",
//         resp.data.data.account_business_email
//       );
//       dispatch({
//         type: userActionType.SET_INSTITUTE_INFORMATION,
//         payload: {
//           user_account_number: resp.data.data.account_number,
//           user_account_type: resp.data.data.account_type,
//           user_account_beneficiary_name: resp.data.data.account_beneficiary_name,
//           // user_razorpay_id: resp.data.data.razorpay_acount_id,
//           user_account_ifsc_code: resp.data.data.account_ifsc_code,
//           user_account_email: resp.data.data.account_business_email
//         },
//       });

//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.ADD_BANK_ACCOUNT_FAIL, payload: error });
//   }
// };

export const resetAddBankAccountDetails = () => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.ADD_BANK_ACCOUNT_RESET,
      payload: []
    })
  }
}

const createRazorPayAccount = (shopid) => async (dispatch) => {
  dispatch({ type: CartActionTypes.CREATE_RAZORPAY_ACCOUNT_LOADING });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.createRazorPayAccount
      .replace("__SHOPID__", shopid),
    {},
    (success) => {
      dispatch({
        type: CartActionTypes.CREATE_RAZORPAY_ACCOUNT_SUCCESS,
        payload: success.data.data,
      });
      Auth.updateUserDetail(
        "user_razorpay_id",
        success.data.data.id
      );
      dispatch({
        type: userActionType.SET_INSTITUTE_INFORMATION,
        payload: {
          user_razorpay_id: success.data.data.id,
        },
      });
      dispatch(showSuccessPopup("Account Created"));
    },
    (error) => {
      dispatch({ type: CartActionTypes.CREATE_RAZORPAY_ACCOUNT_FAIL, payload: error.response.data.message });
    }
  )
};

// const createRazorPayAccount = (shopid) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.CREATE_RAZORPAY_ACCOUNT_LOADING });
//     const url = `${API_PRODUCT}/createAccount?business=${shopid}`;
//     const resp = await postRequest(url);
//     if (resp.status === 200) {
//       dispatch({
//         type: CartActionTypes.CREATE_RAZORPAY_ACCOUNT_SUCCESS,
//         payload: resp.data.data,
//       });
//       Auth.updateUserDetail(
//         "user_razorpay_id",
//         resp.data.data.id
//       );
//       dispatch({
//         type: userActionType.SET_INSTITUTE_INFORMATION,
//         payload: {
//           user_razorpay_id: resp.data.data.id,
//         },
//       });
//       dispatch(showSuccessPopup("Account Created"));
//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.CREATE_RAZORPAY_ACCOUNT_FAIL, payload: error });
//   }
// };

export const resetCreateRazorPayAccount = () => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.CREATE_RAZORPAY_ACCOUNT_RESET,
      payload: []
    })
  }
}

const createRazorPayOrder = (orderid) => async (dispatch) => {
  dispatch({ type: CartActionTypes.CREATE_RAZORPAY_ORDER_LOADING });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.createRazorPayOrder
      .replace("__ORDERID__", orderid),
    {},
    (success) => {
      dispatch({
        type: CartActionTypes.CREATE_RAZORPAY_ORDER_SUCCESS,
        payload: success.data.data,
      });
    },
    (error) => {
      dispatch({ type: CartActionTypes.CREATE_RAZORPAY_ORDER_FAIL, payload: error.response.data.message });
    }
  )
};

// const createRazorPayOrder = (orderid) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.CREATE_RAZORPAY_ORDER_LOADING });
//     const url = `${API_PRODUCT}/createorder?order=${orderid}`;
//     const resp = await postRequest(url);
//     if (resp.status === 200) {
//       dispatch({
//         type: CartActionTypes.CREATE_RAZORPAY_ORDER_SUCCESS,
//         payload: resp.data.data,
//       });

//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.CREATE_RAZORPAY_ORDER_FAIL, payload: error });
//   }
// };

const getRazorPayOrder = (orderid) => async (dispatch) => {
  dispatch({ type: CartActionTypes.GET_RAZORPAY_ORDER_LOADING });
  CartOrderRequest.post(
    CartOrderRequest.endpoint.getRazorPayOrder
      .replace("__ORDERID__", orderid),
    {},
    (success) => {
      dispatch({ type: CartActionTypes.GET_RAZORPAY_ORDER_SUCCESS, payload: success.data.data });
    },
    (error) => {
      dispatch({ type: CartActionTypes.GET_RAZORPAY_ORDER_FAIL, payload: error.response.data.message });
    }
  )
};

// const getRazorPayOrder = (orderid) => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.GET_RAZORPAY_ORDER_LOADING });
//     const url = `${API_PRODUCT}/getorder?order=${orderid}`;
//     const resp = await postRequest(url);
//     if (resp.status === 200) {
//       dispatch({ type: CartActionTypes.GET_RAZORPAY_ORDER_SUCCESS, payload: resp.data.data });

//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.GET_RAZORPAY_ORDER_FAIL, payload: error });
//   }
// };

const paymentCallbackRazorPay = () => async (dispatch) => {
  dispatch({ type: CartActionTypes.PAYMENT_CALLBACK_RAZORPAY_LOADING });
  const body = {
    razorpayOrderId: "",
    razorpaySignature: "",
    razorpayPaymentId: "",
  };
  CartOrderRequest.post(
    CartOrderRequest.endpoint.paymentcallback,
    body,
    (success) => {
      dispatch({
        type: CartActionTypes.PAYMENT_CALLBACK_RAZORPAY_SUCCESS,
        payload: success,
      });
    },
    (error) => {
      dispatch({ type: CartActionTypes.PAYMENT_CALLBACK_RAZORPAY_FAIL, payload: error.response.data.message });
    }
  )
};

// const paymentCallbackRazorPay = () => async (dispatch) => {
//   try {
//     dispatch({ type: CartActionTypes.PAYMENT_CALLBACK_RAZORPAY_LOADING });
//     const body = {
//       razorpayOrderId: "",
//       razorpaySignature: "",
//       razorpayPaymentId: "",
//     };
//     const url = `${API_PRODUCT}/paymentcallback`;
//     const resp = await postRequest(url, body);
//     if (resp) {
//       dispatch({
//         type: CartActionTypes.PAYMENT_CALLBACK_RAZORPAY_SUCCESS,
//         payload: resp,
//       });

//     }
//   } catch (error) {

//     dispatch({ type: CartActionTypes.PAYMENT_CALLBACK_RAZORPAY_FAIL, payload: error });
//   }
// };

const getItemSuborders = (orderId) => async (dispatch) => {
  dispatch({ type: subOrderActionType.GET_ITEM_SUBORDERD_LOADING })
  CartOrderRequest.get(
    CartOrderRequest.endpoint.getSubOrderDetail.replace("__ID__", orderId),
    (success) => {
      dispatch({ type: subOrderActionType.GET_ITEM_SUBORDERD_LOADED, payload: success.data })
    }
  )
}

const getShipItems = (orderId) => async (dispatch) => {
  dispatch({ type: subOrderActionType.GET_SHIP_ITEM_LOADING })
  CartOrderRequest.get(
    CartOrderRequest.endpoint.getShipItemList.replace("__ID__", orderId),
    (success) => {
      dispatch({
        type: subOrderActionType.GET_SHIP_ITEM_LOADED,
        payload: success.data
      })
    }
  )
}
export const updateSubOrderFailAndDelivered = (id, body, task) => {
  return (dispatch) => {
    dispatch({
      type: subOrderActionType.UPDATE_FAIL_DELIVR_SUBORDER_LOADING,
      loading: true,
      payload: {}
    })

    ProductRequest.patch(ProductRequest.endpoint.updateSubOrderFailDeli.replace("__ID__", id),
      body,
      (success) => {
        dispatch({
          type: subOrderActionType.UPDATE_FAIL_DELIVR_SUBORDER_LOADED,
          payload: success.data
        })
        if (task === "Failed") {
          dispatch(showSuccessPopup("Order failed successfully!"));
        }
        else if (task === "Delivered") {
          dispatch(showSuccessPopup("Order Delivered successfully!"));
        }
        // dispatch(showSuccessPopup("Shipping details added successfully!"));
        // dispatch(setCommonError("Order Status : Delivered"))
        let body = { orderId: id, status: "detail" };
        CartOrderRequest.post(
          CartOrderRequest.endpoint.customerOrder,
          body,
          (resp) => {
            dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_SUCCESS, payload: resp.data.data });
          },
          (error) => {
            dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_FAIL, payload: error });
          }
        )


        dispatch({
          type: subOrderActionType.GET_SHIP_ITEM_LOADING,
          payload: success.data
        })
        CartOrderRequest.get(
          CartOrderRequest.endpoint.getShipItemList.replace("__ID__", id),
          (success) => {
            dispatch({
              type: subOrderActionType.GET_SHIP_ITEM_LOADED,
              payload: success.data
            })
          }
        )

        CartOrderRequest.get(
          CartOrderRequest.endpoint.getDeliFailList.replace("__ID__", id).replace("__STATUS__", "Failed"),
          (success) => {
            dispatch({
              type: subOrderActionType.GET_FAIL_ITEM_LOADED,
              payload: success.data
            })
          }
        )

        CartOrderRequest.get(
          CartOrderRequest.endpoint.getDeliFailList.replace("__ID__", id).replace("__STATUS__", "Delivered"),
          (success) => {
            dispatch({
              type: subOrderActionType.GET_DELIVER_ITEM_LOADED,
              payload: success.data
            })
          }
        )

      },
      error => {
        /* dispatch({
          type: CHANGE_ORDER_STATUS_FAIL,
          payload: []
        })
        dispatch(setCommonError(error.message)) */
      }
    );
  }
}


// shipped suborder update
const updateSuorderId = (orderId, body) => {
  return (dispatch) => {
    dispatch({
      type: subOrderActionType.UPDATE_SUBORDERD_SHIP_LOADING,
      loading: true,
      payload: {}
    })

    ProductRequest.post(ProductRequest.endpoint.updateSubOrdershipping,
      body,
      (success) => {
        // console.log(success)
        dispatch({
          type: subOrderActionType.UPDATE_SUBORDERD_SHIP_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Shipping order successfully!"));
        // dispatch(setCommonError("Order Status : Delivered"))
        dispatch({ type: subOrderActionType.GET_ITEM_SUBORDERD_LOADING })
        CartOrderRequest.get(
          CartOrderRequest.endpoint.getSubOrderDetail.replace("__ID__", orderId),
          (success) => {
            dispatch({ type: subOrderActionType.GET_ITEM_SUBORDERD_LOADED, payload: success.data })
          }
        )

        CartOrderRequest.get(
          CartOrderRequest.endpoint.getShipItemList.replace("__ID__", orderId),
          (success) => {
            dispatch({
              type: subOrderActionType.GET_SHIP_ITEM_LOADED,
              payload: success.data
            })
          }
        )

        let body = { orderId: orderId, status: "detail" };
        CartOrderRequest.post(
          CartOrderRequest.endpoint.customerOrder,
          body,
          (resp) => {
            dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_SUCCESS, payload: resp.data.data });
          },
          (error) => {
            dispatch({ type: CartActionTypes.CUSTOMER_ORDER_DETAIL_FAIL, payload: error });
          }
        )
      },
      error => {
        /*  dispatch({
           type: CHANGE_ORDER_STATUS_FAIL,
           payload: []
         }) */
        dispatch(setCommonError(error.message))
      }
    );
  }
}

const getShippingDetails = (busId, pincode, country, state) => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.GET_SHIPPING_DETAILS_LOADING,
    })
    ProductRequest.get(ProductRequest.endpoint.getShippingDetails.replace("__BUSID__", busId).replace("__PINCODE__", pincode).replace("__COUNTRY__", country).replace("__STATE__", state),
      (success) => {
        // console.log(success)
        dispatch({
          type: CartActionTypes.GET_SHIPPING_DETAILS_LOADED,
          payload: JSON.stringify(success.data.data) !== '{}' ? success.data.data : []
        })
        // dispatch(showSuccessPopup("Shipping order successfully!"));
        // dispatch(setCommonError("Order Status : Delivered"))
      },
      error => {
        /*  dispatch({
           type: CHANGE_ORDER_STATUS_FAIL,
           payload: []
         }) */
        dispatch(setCommonError(error.message))
      }
    );
  }
}

const resetShippingDetails = () => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.GET_SHIPPING_DETAILS_RESET
    })
  }
}

const getFailItems = (orderId) => async (dispatch) => {
  dispatch({ type: subOrderActionType.GET_FAIL_ITEM_LOADING })
  CartOrderRequest.get(
    CartOrderRequest.endpoint.getDeliFailList.replace("__ID__", orderId).replace("__STATUS__", "Failed"),
    (success) => {
      dispatch({
        type: subOrderActionType.GET_FAIL_ITEM_LOADED,
        payload: success.data
      })
    }
  )
}
const getDeliverItems = (orderId) => async (dispatch) => {
  dispatch({ type: subOrderActionType.GET_DELIVER_ITEM_LOADING })
  CartOrderRequest.get(
    CartOrderRequest.endpoint.getDeliFailList.replace("__ID__", orderId).replace("__STATUS__", "Delivered"),
    (success) => {
      dispatch({
        type: subOrderActionType.GET_DELIVER_ITEM_LOADED,
        payload: success.data
      })
    }
  )
}

const postShippingPartner = (businessId, body) => async (dispatch) => {
  dispatch({ type: subOrderActionType.POST_SHIPPING_PARTNER_LOADING })
  CartOrderRequest.patch(
    CartOrderRequest.endpoint.postShippingPartner.replace("__ID__", businessId), body,
    (success) => {
      dispatch({
        type: subOrderActionType.POST_SHIPPING_PARTNER_LOADED,
        payload: success.data
      })
    }

  )
}

export {
  getOrderList,
  changeOrderStatus,
  cartOperations,
  cartToWishlist,
  readCart,
  getAddressList,
  addressListOperation,
  createOrderFromCart,
  customerOrderDetail,
  customerOrderDetailReset,
  customerOrderList,
  customerCancelOrder,
  addBankAccountDetails,
  createRazorPayAccount,
  createRazorPayOrder,
  getRazorPayOrder,
  paymentCallbackRazorPay,
  addressListOperationReset,
  cartUpdate,
  customerOrderSingleDetail,
  getItemSuborders,
  updateSuorderId,
  getShipItems,
  getFailItems,
  getDeliverItems,
  getAllOrder,
  getSingleOrderOfOtheritems,
  getShippingDetails,
  resetShippingDetails,
  updateCustomerStatus,
  postShippingPartner
};
