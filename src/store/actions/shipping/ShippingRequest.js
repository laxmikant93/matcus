import Request from "../../../Classes/Request";

class ShippingRequest extends Request {
  constructor() {
    super()
    this.ShippingRequestEndpoint = {
      getshippinglist: super.url('/shipping-rate/getAllShippingList/__BUS__', "ecommerce"),
      getshippingsingle: super.url('/shipping-rate/getSingleShippingList/__ID__/__BUS__', "ecommerce"),
      editshipping: super.url('/shipping-rate/editRate/__ID__', "ecommerce"),
      createshipping: super.url('/shipping-rate/createRate/__BUS__', "ecommerce"),
      deleteShipping: super.url('/shipping-rate/removeShipingRate/__ID__', 'ecommerce'),
      getExistingState: super.url('/shipping-rate/checkExistingStates/__BUSID__/?id=__SHIPPINGID__', 'ecommerce')
    }
  }
}
export default new ShippingRequest();
