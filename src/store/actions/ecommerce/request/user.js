import Request from "../../../../Classes/Request";

class UserRequest extends Request {
  constructor() {
    super()
    this.endpoint = {
      orderDetailForAdmin: super.url("productService/getOrderDetailForAdmin?status=_STATUS_&businessid=_BUSINESS_", "ecommerce"),
    }
  }
}

export default new UserRequest();