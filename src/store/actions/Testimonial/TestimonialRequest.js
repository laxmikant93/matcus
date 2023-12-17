import Request from "../../../Classes/Request";

class TestimonialRequest extends Request {
  constructor() {
    super();
    this.urlEndpoint = {
      TestimonialList: super.url("/testimonials/testimonial?institute=__INSID__&industry=__type__", "commonservices"),
      FeaturedMarked: super.url(
        "/testimonials/testimonial?institute=__INSID__&isFeatureMarked=Yes&industry=__type__", "commonservices"
      ),
      FeaturedNotMarked: super.url(
        "/testimonials/testimonial?institute=__INSID__&isFeatureMarked=No&industry=__type__", "commonservices"
      ),
      sortByLTH: super.url("/testimonials/testimonial?institute=__INSID__&rating=lth&industry=__type__", "commonservices"),
      sortByHTL: super.url("/testimonials/testimonial?institute=__INSID__&rating=htl&industry=__type__", "commonservices"),
      Search: super.url("/testimonials/testimonial?institute=__INSID__&search=__NAME__&industry=__type__", "commonservices"),
      PostTestimonial: super.url("/testimonials/testimonial", "commonservices"),
      EditTestimonial: super.url("/testimonials/testimonial/__Id__?industry=__type__", "commonservices"),
      DeleteTestimonial: super.url("/testimonials/testimonial/__Id__?&industry=__type__", "commonservices"),
      getSingleEdneedRevTestimonial: super.url("/testimonials/testimonial/__Id__?&industry=__type__", "commonservices"),


      edneedReviewforUser: super.url("/testimonials/testimonial/getEdneed?user=__USERID__&industry=__type__"),
      searchForUserReview: super.url("/testimonials/testimonial/getEdneed?user=__USERID__&__QUERY__=__TERM__&industry=__type__"),
      edneedReview: super.url("/testimonials/testimonial/getEdneed?type=__type__", "commonservices"),
      searchForEdneedReview: super.url("/testimonials/testimonial/getEdneed?__QUERY__=__TERM__&industry=__type__"),
      postUserReview: super.url("/testimonials/testimonial/edneed"),
      getAllTestimonails: super.url("/testimonials/allTestimonails/edneed"),

    };
  }
}
export default new TestimonialRequest();
