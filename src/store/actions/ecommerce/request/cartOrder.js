import Request from "../../../../Classes/Request";

class CartOrderRequest extends Request {
  constructor() {
    super()
    this.endpoint = {
      addProduct: super.url("productService/AddProduct", "ecommerce"),
      paymentcallback: super.url("productService/paymentcallback", "ecommerce"),
      getRazorPayOrder: super.url("productService/getorder?order=__ORDERID__", "ecommerce"),
      createRazorPayOrder: super.url("productService/createorder?order=__ORDERID__", "ecommerce"),
      createRazorPayAccount: super.url("productService/createAccount?business=__SHOPID__", "ecommerce"),
      addBankAccountDetails: super.url("productService/addAccountDetails?business=__BUSINESSID__", "ecommerce"),
      customerCancelOrder: super.url("productService/orderCancel", "ecommerce"),
      customerSingleOrder: super.url("productService/getallorder/__ID__", "ecommerce"),
      customerOrder: super.url("productService/orderDetail", "ecommerce"),
      customerAllOrder: super.url("productService/getallorder?user=__USERID__&business=__BUIS__&condition=__TYPE__", "ecommerce", "ecommerce"),
      createOrderFromCart: super.url("productService/orderProduct", "ecommerce"),
      // paymentcallback: super.url("productService/paymentcallback", "ecommerce"),
      createOrderaddress: super.url("productService/createOrderaddress", "ecommerce"),
      deleteOrderaddress: super.url("productService/deleteOrderaddress/__BODY__", "ecommerce"),
      Orderaddress: super.url("productService/Orderaddress/__ID__", "ecommerce"),
      OrderaddressList: super.url("productService/OrderaddressList/?userId=__ID__", "ecommerce"),
      cartToWishlist: super.url("productService/cartToWishlist?variation=__VARIATION__&user=__USER__&business=__BUSINESS__", "ecommerce"),
      changeOrderStatus: super.url("productService/orderStatus?orderId=__ORDERID__&status=__STATUS__", "ecommerce"),
      addtoCart: super.url("productService/postcart", "ecommerce"),
      getaddtoCart: super.url("productService/getcart/user/business", "ecommerce"),
      quantityupdate: super.url("productService/quantityupdate?cart=__CARTID__&variation=__VAR__&condition=__CON__&user=__USERID__&business=__BUSI__", "ecommerce"),


      //Admin order list
      getOrderDetailForAdmin: super.url("productService/getOrderDetailForAdmin?businessid=__ID__&limit=_LIMIT_&page=_PAGE_&userid=_USERID_", "ecommerce"),
      getOrderListByStatus: super.url("productService/getOrderDetailForAdmin/?businessid=_BUSINESSID_&status=_STATUS_&limit=_LIMIT_&page=_PAGE_&userid=_USERID_", "ecommerce"),
      getOrderListbySearch: super.url("productService/getOrderDetailForAdminSearch/?businessid=_BUSINESSID_&search=_VALUE_&limit=_LIMIT_&skip=_SKIP_", "ecommerce"),
      getOrderListbyDate: super.url("productService/getOrderDetailForAdmin/?businessid=_BUSINESSID_&startDate=_VALUE_&endDate=_VALUE_&limit=_LIMIT_&page=_PAGE_&userid=_USERID_", "ecommerce"),
      getOrderListSortBy: super.url("productService/getOrderDetailForAdmin/?businessid=_BUSINESSID_&sortBy=_VALUE_&limit=_LIMIT_&page=_PAGE_&userid=_USERID_", "ecommerce"),

      // ADmin suborders
      getSubOrderDetail: super.url("/productService/getOrderListBasesOfQuantityForShipping/__ID__", "ecommerce"),
      getShipItemList: super.url("/productService/getShippedItemList/__ID__", "ecommerce"),

      getDeliFailList: super.url("/productService/getDeliveredFailListOfOrder/__ID__?status=__STATUS__", "ecommerce"),
      /* getSubOrderDetail: super.url("/productService/getOrderListBasesOfQuantityForShipping/__ID__", "ecommerce"),
      getShipItemList: super.url("/productService/getShippedItemList/__ID__", "ecommerce"), */

      //Client- Other items in this order
      getAllOrder: super.url("/productService/getAllSubordersClient/__BUIS__/__USERID__?limit=__LIMIT__&skip=__SKIP__", "ecommerce"),
      getSingleOrderOfOtheritems: super.url("/productService/getsuborderDetail/_ORDERID_/_SUBORDERID_", "ecommerce"),
      updateCustomerOrderStatus: super.url("/productService/updateOneSuborder/suborderId", "ecommerce"),
      postShippingPartner: super.url("/productService/updatebuisnessshippingpartner/__ID__", "ecommerce")

    }
  }
}
export default new CartOrderRequest();
