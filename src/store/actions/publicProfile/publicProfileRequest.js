import Request from "../../../Classes/Request";

class publicProfileRequest extends Request {
  constructor() {
    super();
    this.publicProfileEndPoint = {
      createUserProfile: super.url("/publicprofile"),
      getprofile: super.url("/publicprofile/_id_"),
      getpublicprofiles: super.url("/publicprofiles?limit=_limit_&skip=_skip_"),
      searchpublicprofiles: super.url(
        "/publicprofiles/search?search=__SEARCH__&limit=_limit_&skip=_skip_"
      ),
      searchpublicprofilesTypes: super.url(
        "/publicprofiles/usertypesearch?search=__SEARCH__&userType=_type_&limit=_limit_&skip=_skip_"
      ),
      usernamesearchpublicprofiles: super.url(
        "/publicprofile/usernamecheck/_USERID_"
      ),
      sortpublicprofile: super.url(
        "/publicprofile?userType=__USERTYPE__&limit=_limit_&skip=_skip_"
      ),
      putlike: super.url("publicprofile/profilelike/_id_"),
      putunlike: super.url("publicprofile/profileunlike/_id_"),
      putfollow: super.url("/publicprofile/profilefollow/_id_"),
      getFollowerList: super.url("/publicprofile/followers/_id_"),
      getFollowingList: super.url("/publicprofile/following/_id_"),
      putunfollow: super.url("/publicprofile/profileunfollow/_id_"),
      editprofilelinks: super.url("/publicprofile/bannerupdate/_id_"),
      // postProfileBanner: super.url("/publicprofile/bannerupdate/__USERID__"),
      postProfileBanner: super.url("/publicprofile/bannerimage/__USERID__"),
      postProfileAbout: super.url("/publicprofileinfo/about/__USERID__"),
      postProfileHighlight: super.url(
        "/publicprofileinfo/highlight/__USERID__"
      ),
      getExperience: super.url("/publicprofileinfo/experience/_id_"),
      postExperience: super.url("/publicprofileinfo/experience/_id_"),
      editExperience: super.url("/publicprofileinfo/experience/_id_"),
      deleteExperience: super.url("/publicprofileinfo/experiencedelete/_id_"),

      updateLevel: super.url("/publicprofile/leveltaught/__USERID__"),
      updateTeachingMOde: super.url("/publicprofile/teachingmode/__USERID__"),
      updateTaughtSubject: super.url("/publicprofile/taughtsubject/__USERID__"),
      updateSkills: super.url("/publicprofile/skills/__USERID__"),
      // getAffiliate: super.url("/"),
      // getEducation: super.url("/"),
      // getExperience: super.url("/"),
      // getLanguage: super.url("/"),

      getAward: super.url("/publicprofileinfo/award/__USERID__"),
      postAward: super.url("/publicprofileinfo/award/__USERID__"),
      editAward: super.url("/publicprofileinfo/award/__USERID__"),
      deleteAward: super.url("/publicprofileinfo/awarddelete/__USERID__"),

      getEducation: super.url("/publicprofileinfo/education/__USERID__"),
      postEducation: super.url("/publicprofileinfo/education/__USERID__"),
      editEducation: super.url("/publicprofileinfo/education/__USERID__"),
      deleteEducation: super.url(
        "/publicprofileinfo/educationdelete/__USERID__"
      ),

      getCertificate: super.url("/publicprofileinfo/certificate/__USERID__"),
      postCertificate: super.url("/publicprofileinfo/certificate/__USERID__"),
      editCertificate: super.url("/publicprofileinfo/certificate/__USERID__"),
      deleteCertificate: super.url(
        "/publicprofileinfo/certificatedelete/__USERID__"
      ),

      getImages: super.url("/publicprofile/images/__USERID__"),
      postImages: super.url("/publicprofile/uploadimages/__USERID__"),
      addImages: super.url("/publicprofile/uploadmoreimages/__USERID__"),
      deleteImages: super.url("/publicprofile/deleteimage/__USERID__"),

      editImageAlbum: super.url("/publicprofile/updateimagealbum/__USERID__"),
      deleteImageAlbum: super.url("/publicprofile/deleteimagealbum/__USERID__"),

      getVideos: super.url("/publicprofile/videos/__USERID__"),
      postVideos: super.url("/publicprofile/uploadvideos/__USERID__"),
      addVideos: super.url("/publicprofile/uploadmorevideos/__USERID__"),
      deleteVideos: super.url("/publicprofile/deletevideo/__USERID__"),

      editVideoAlbum: super.url("/publicprofile/updatealbumvideo/__USERID__"),
      deleteVideoAlbum: super.url("/publicprofile/deletealbumvideo/__USERID__"),

      getReviews: super.url("/publicprofile/review/__USERID__"),
      deleteReview: super.url("/publicprofile/deletereview/__USERID__"),
      getContactAndAddress: super.url("/publicprofile/contact/_id_"),
      patchContact: super.url("/publicprofile/contact/_id_"),

      getPrimaryAddress: super.url("/publicprofile/contactaddress/_id_"),
      postPrimaryAddress: super.url("/publicprofile/contactaddress/_id_"),
      patchPrimaryaddress: super.url("/publicprofile/contactaddress/_id_"),
      deletePrimaryAddress: super.url(
        "/publicprofile/contactdeleteaddress/_id_"
      ),
      getWorkAddress: super.url("/publicprofile/contactworkaddress/_id_"),
      postWorkAddress: super.url("/publicprofile/contactworkaddress/_id_"),
      patchWorkAddress: super.url("/publicprofile/contactworkaddress/_id_"),
      deleteWorkAddress: super.url(
        "/publicprofile/contactdeleteworkaddress/_id_"
      ),

      getInterestHobbies: super.url("/publicprofileinfo/interest/_id_"),
      postInterestHobbies: super.url("/publicprofileinfo/interest/_id_"),
      deleteInteestHobbies: super.url("/publicprofileinfo/interestdelete/_id_"),

      getLanguages: super.url("/publicprofileinfo/language/_id_"),
      postLanguages: super.url("/publicprofileinfo/language/_id_"),
      patchLanguages: super.url("/publicprofileinfo/language/_id_"),
      deleteLanguages: super.url("/publicprofileinfo/languagedelete/_id_"),

      getProffessionalAffilates: super.url(
        "/publicprofileinfo/professional/_id_"
      ),
      postProffessionalAffilates: super.url(
        "/publicprofileinfo/professional/_id_"
      ),
      deleteProffessionalAffilates: super.url(
        "/publicprofileinfo/professionaldelete/_id_"
      ),
      patchProffessionalAffilates: super.url(
        "/publicprofileinfo/professional/_id_"
      ),
      removeFollower: super.url("/publicprofile/removefollower/_id_"),

      updateUsertype: super.url("/publicprofile/user/_id_"),
    };
  }
}

export default new publicProfileRequest();
