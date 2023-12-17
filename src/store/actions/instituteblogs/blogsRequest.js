import Request from "../../../Classes/Request";

class InstituteBlogsRequest extends Request {

  constructor() {
    super()
    this.instituteBlogsEndpoint = {
      getCategoryLists: super.url("/blog/getCategory/_Id_/?owner=_USERID_&mine=_Value_"),
      postCategory: super.url("/blog/createCategory"),
      deleteCategory: super.url("/blog/updateCategory/__Id__"),
      patchCategory: super.url("/blog/updateCategory/__Id__"),
      getSingleCategory: super.url("/blog/getCategoryById/__Id__"),
      searchCategory: super.url(""),
      getBlogList: super.url("/blog/getAllBlog?instituteId=_Id_&owner=_USERID_&author=_AUTHOR_&_QUERY_=_VALUE_&_NEWQUERY_=_NEWVALUE_&limit=__LIMIT__&skip=__SKIP__"),
      getSingleAuthorDesc: super.url("/blog/getAuthorpreviousDesc/_Id_/_INSID_"),
      postBlog: super.url("/blog/createBlog"),
      deleteBlog: super.url("/blog/trashdelete?blogId=__Id__"),
      patchBlog: super.url("/blog/updateBlog/__Id__"),
      getSingleBlog: super.url("/blog/getBlogById/__Id__/?user=__USER__"),
      getSingleBlogLogout: super.url("/blog/getBlogById/__Id__/"),
      restoreTrashBlogs: super.url("/blog/reversetrash?blogId=__Id__"),
      deleteMultipleBlogs: super.url("/blog/multipledelete"),
      getSubdomainBlogList: super.url("/blog/getWebsiteBlogs/?institute_subdomain=_DOMAIN_"),
      getSubdomainBlogWithLikeList: super.url("/blog/getWebsiteBlogs/?institute_subdomain=_DOMAIN_&user=__USER__"),
      getDomainBlogList: super.url("/blog/getWebsiteBlogs/?domain=_DOMAIN_"),
      getDomainBlogWithLikeList: super.url("/blog/getWebsiteBlogs/?domain=_DOMAIN_&user=__USER__"),
      getSubdomainCategoryWiseBlogList: super.url("/blog/categoryblogList/_CATEGORY_/_Id_"),
      likeBlog: super.url("/blog/like"),
      getFeatureBlogsList: super.url("/blog/getFeaturedBlogs/?institute_subdomain=_DOMAIN_"),
      getFeatureBlogsListPrivateDomain: super.url("/blog/getFeaturedBlogs/?domain=_DOMAIN_"),
      downloadExcelSheet: super.url("/blog/downloadexcel"),
    }
  }

}

export default new InstituteBlogsRequest()