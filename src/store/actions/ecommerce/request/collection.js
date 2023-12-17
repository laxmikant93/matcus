import Request from "../../../../Classes/Request";

class CollectionRequest extends Request {
  constructor() {
    super()
    this.endpoint = {
      addProduct: super.url("productService/AddProduct", "ecommerce"),
      CollectionList: super.url("productService/CollectionList", "ecommerce"),
      CollectionDetail: super.url("productService/Collection/?id=__ID__&business=_BUSINESSID_", "ecommerce"), //sigle get
      CollectionListDomain: super.url("productService/CollectionList?__TYPE__=__VAL__", "ecommerce"),
      CollectionListBusiness: super.url("productService/CollectionList?businessid=__VAL__", "ecommerce"), //get collection list admin
      multiCollection: super.url("productService/multiCollection", "ecommerce"),
      wishlistToCart: super.url("productService/wishlistToCart?business=__B_ID__&userId=__U_ID__&variationId=__V_ID__", "ecommerce"),
      // createCollection: super.url("productService/createCollection", "ecommerce"),
      // new routes
      createCollection: super.url("productService/createCollection?business=_BUSINESSID_", "ecommerce"),
      deleteCollection: super.url("productService/deleteCollection/?business=_BUSINESSID_&id=__ID__", "ecommerce"),
      editCollection: super.url("productService/Collection/?business=_BUSINESSID_&id=__ID__", "ecommerce")

    }
  }
}

export default new CollectionRequest();