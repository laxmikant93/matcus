import Request from "../../../Classes/Request";

class instituteListingRequest extends Request {
  constructor() {
    super();
    this.InsituteListEndpoint = {
      instituteList: super.url("/institute/?$skip=__INC__&$limit=__LIMIT__"),
      featuredInstitute: super.url("/institute/?featured=true"),
      userLikeInfo: super.url("/like/?user=__UID__"),
      likedInstitute: super.url("/institute/?user=__UID__"),
      myInstituteList: super.url("/institute/?userId=__UID__&myInstitute=true"),
      scroolLikedInstitute: super.url("/institute/?user=__UID__$skip=__INC__&$limit=__LIMIT__"),
      singleInstituteInfo: super.url("/institute/__INSID__"),
      scrollInstituteData: super.url(
        "/institute/?$skip=__INC__&$limit=__LIMIT__"
      ),
      institute_like_post: super.url("like"),
      searchScrollInstituteData: super.url("/institute/?$or[0][institute_name][$search]=__VALUE__&$or[1][institute_country][$search]=__VALUE2__&$skip=__INC__&$or[2][institute_city][$search]=__VALUE3__&$or[3][institute_state][$search]=__VALUE4__$limit=__LIMIT__"),
      searchInstituteData: super.url("/institute/?$or[0][institute_name][$search]=__VALUE__&$or[1][institute_country][$search]=__VALUE2__&$or[2][institute_city][$search]=__VALUE3__&$or[3][institute_state][$search]=__VALUE4__")
    };
  }
}
export default new instituteListingRequest();
