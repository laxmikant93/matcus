import Request from "../../../Classes/Request";

class FaqRequest extends Request {
  constructor() {
    super();
    this.urlEndpoint = {
      FaqList: super.url("/faq?institute=__INSID__&isDeleted=false&industry=__TYPE__", "commonservices"),
      FeaturedMarked: super.url("/faq?institute=__INSID__&featured=Yes&industry=__TYPE__", "commonservices"),
      FeaturedNotMarked: super.url("/faq?institute=__INSID__&featured=No&industry=__TYPE__", "commonservices"),
      PostFaq: super.url("/faq/?industry=__TYPE__", "commonservices"),
      EditFaq: super.url("/faq/__Id__/?industry=__TYPE__", "commonservices"),
      DeleteFaq: super.url("/faq/__Id__?industry=__TYPE__", "commonservices"),
      StatusActive: super.url("/faq?institute=__INSID__&status=Active&industry=__TYPE__", "commonservices"),
      StatusInActive: super.url("/faq?institute=__INSID__&status=Inactive&industry=__TYPE__", "commonservices"),
      SearchFaq: super.url("/faq?institute=__INSID__&search=__TITLE__&industry=__TYPE__", "commonservices"),
    };
  }
}
export default new FaqRequest();
