
import Request from "../../../../Classes/Request";

class guestRequest extends Request {
  constructor() {
    super()
    this.guestEndpoint = {
      postCartGuest: super.url("guestService/postcartGuest", "ecommerce"),
      getCartGuest: super.url("/guestService/getcartGuest/_uuid_/_BUSINESSID_", "ecommerce"),
      updateCartGuest: super.url("/guestService/quantityupdateGuest/?cart=_CART_ID_&variation=_VARIATION_ID_&condition=_CONDATION_&user=_USER_&business=_BUSNIESS_", "ecommerce"),
      postOfflineGuestData: super.url("/guestService/createOfflineUser?__TYPE__=_DOMAIN_", "ecommerce"),
      getGuestOrderDetails: super.url("/productService/getAllSubordersClient/__BUIS__/__USERID__", "ecommerce"),
      clientGuestgetAllSubordersClient: super.url("/productService/clientGuestgetAllSubordersClient/__BUIS__/__USERID__", "ecommerce"),
      updateShippingPrice: super.url('/productService/updateshippingpricecart', 'ecommerce'),
      guestLoginCartUpdate: super.url("/guestService/getGuestOrders?uuid=_UuidD_&user=_USER_&business=_BUSNIESS_", "ecommerce")

    }
  }
}

export default new guestRequest();