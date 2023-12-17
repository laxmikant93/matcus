import Request from "../../../Classes/Request";

class EcomReviewsRequest extends Request {
  constructor() {
    super()
    this.EcomCurrencyEndpoint = {
      getReviews: super.url('/reviewService/review-list-admin?business=_BUSINESS_&sort=_SORT_&search=_SEARCH_&status=_STATUS_&limit=_LIMIT_&page=_PAGE_', "ecommerce"),
      postReview: super.url('/reviewService/create-review?business=_BUSINESS_', "ecommerce"),
      getReviewData: super.url('/reviewService/review-detail?review=_REVIEW_', "ecommerce"),
      patchReview: super.url('/reviewService/edit-review?business=_BUSINESS_', "ecommerce"),
      deleteReview: super.url('/reviewService/delete-review?business=_BUSINESS_&review=_REVIEW_', "ecommerce"),
      multipleDeleteReview: super.url('/reviewService/delete-review-multiple?business=_BUSINESS_', "ecommerce"),
      readUnReadReview: super.url('/reviewService/edit-reply-read?business=_BUSINESS_&review=_REVIEW_', "ecommerce"),
      patchReplyStatus: super.url('/reviewService/edit-reply-status?business=_BUSINESS_&review=_REVIEW_', "ecommerce"),
      postReply: super.url('/reviewService/add-reply?business=_BUSINESS_&review=_REVIEW_', "ecommerce"),
      deleteReply: super.url('/reviewService/delete-reply?business=_BUSINESS_&review=_REVIEW_&reply=_REPLY_', "ecommerce"),
      patchReviewStatus: super.url('/reviewService/edit-review-status?business=_BUSINESS_&review=_REVIEW_&status=_STATUS_', "ecommerce"),
      multiplePermanantDelete: super.url('/reviewService/delete-review-multiple-permanent?business=_BUSINESS_', "ecommerce"),
      multipleRestoreReview: super.url('/reviewService/restore-review-multiple?business=_BUSINESS_', "ecommerce"),
      getProductReviews: super.url('/reviewService/product-reviews?product=_PRODID_', "ecommerce"),
      getBuyerProductRelation: super.url('reviewService/verify-buyer-status?product=_PRODID_&user=_USER_&business=_BUSINESS_',"ecommerce")
    }
  }
}
export default new EcomReviewsRequest();
