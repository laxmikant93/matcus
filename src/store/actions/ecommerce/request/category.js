import Request from "../../../../Classes/Request";

class CategoryRequest extends Request {
  constructor() {
    super()
    this.endpoint = {
      categoryList: super.url("categoryService/categoryListUser", "ecommerce", "commonservices"),
      subCategoryList: super.url("categoryService/subCategoryList/__ID__", "ecommerce"),
      subSubCategoryList: super.url("categoryService/subSubCategory/subSubCategoryList/__ID__", "ecommerce")
    }
  }
}

export default new CategoryRequest();