import { INS_BLOG_ACTION_TYPES } from "../actions/instituteblogs/actionTypes"

const INS_BLOG_INITIAL_TYPES = {
  postCategory: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getCategoryLists: {
    data: [],
    loading: false,
    success: false,
    error: false,
    totalCount: "",
    mineCount: ""
  },
  deleteCategory: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleCategory: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  patchCategory: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  duplicateCategoryError: {
    error: false,
  },
  postBlog: {
    data: [],
    loading: false,
    saveLoading: false,
    success: false,
    error: false
  },
  authorData: {
    data: [],
    success: false,
  },
  getBlogList: {
    data: [],
    loading: false,
    success: false,
    error: false,
    publishlength: "",
    savelength: "",
    totalLength: "",
    trashlength: "",
    authorLength: ""
  },
  deleteBlog: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleBlog: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  patchBlog: {
    data: [],
    loading: false,
    saveLoading: false,
    success: false,
    error: false,
  },
  getWesbiteBlogList: {
    data: [],
    allCategories: "",
    featuredBlogs: "",
    publishBlogs: "",
    loading: false,
    success: false,
    error: false,
  },
  postBlogLike: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getWebsiteFeatureBlogs: {
    data: [],
    featuredBlogs: "",
    nonFeaturedBlogs: "",
    loading: false,
    success: false,
    error: false,
  },
  downloadExcelSheetData: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSubdomainCategoryBlogs: {
    data: [],
    loading: false,
    success: false,
    error: false,
  }
}

const instituteblogs = (state = INS_BLOG_INITIAL_TYPES, { type, payload }) => {

  switch (type) {
    case INS_BLOG_ACTION_TYPES.POST_CATEGORY_LOADING:
      return ({
        ...state,
        postCategory: {
          ...state.postCategory,
          data: [],
          loading: true,
          success: false,
          error: false

        }
      })

    case INS_BLOG_ACTION_TYPES.POST_CATEGORY_LOADED:
      return ({
        ...state,
        postCategory: {
          ...state.postCategory,
          loading: false,
          success: true,
          error: false,
          data: payload
        },
        duplicateCategoryError: {
          ...state.duplicateCategoryError,
          error: false
        },
        getCategoryLists: {
          ...state.getCategoryLists,
          success: true,
          data: [payload].concat(state.getCategoryLists.data),
          loading: false,
          totalCount: state.getCategoryLists.totalCount + 1,
          mineCount: state.getCategoryLists.mineCount + 1
        }
      })

    case INS_BLOG_ACTION_TYPES.POST_CATEGORY_RESET:
      return ({
        ...state,
        postCategory: {
          ...state.postCategory,
          data: [],
          loading: false,
          success: false,
          error: false
        },
        duplicateCategoryError: {
          ...state.duplicateCategoryError,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.POST_CATEGORY_ERROR:
      return ({
        ...state,
        postCategory: {
          ...state.postCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })


    case INS_BLOG_ACTION_TYPES.POST_CATEGORY_DUPLICATE_ERROR:
      return ({
        ...state,
        duplicateCategoryError: {
          ...state.duplicateCategoryError,
          error: true
        },
        postCategory: {
          ...state.postCategory,
          loading: false
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_LOADING:
      return ({
        ...state,
        getCategoryLists: {
          ...state.getCategoryLists,
          data: [],
          loading: true,
          success: false,
          error: false,
          totalCount: "",
          mineCount: ""
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_LOADED:
      return ({
        ...state,
        getCategoryLists: {
          ...state.getCategoryLists,
          data: payload.data.reverse(),
          loading: false,
          success: true,
          error: false,
          totalCount: payload.totalCount,
          mineCount: payload.mineCount
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_RESET:
      return ({
        ...state,
        getCategoryLists: {
          ...state.getCategoryLists,
          data: [],
          loading: false,
          success: false,
          error: false,
          totalCount: "",
          mineCount: ""
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_ERROR:
      return ({
        ...state,
        getCategoryLists: {
          ...state.getCategoryLists,
          data: [],
          loading: false,
          success: false,
          error: true,
          totalCount: "",
          mineCount: ""
        }
      })

    case INS_BLOG_ACTION_TYPES.SEARCH_CATEGORY:
      return ({
        ...state,
        getCategoryLists: {
          ...state.getCategoryLists,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.DELETE_CATEGORY_LOADING:
      return ({
        ...state,
        deleteCategory: {
          ...state.deleteCategory,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.DELETE_CATEGORY_LOADED:
      return {
        ...state,
        deleteCategory: {
          ...state.deleteCategory,
          data: payload,
          success: true,
          loading: false
        },
        getCategoryLists: {
          ...state.getCategoryLists,
          data: state.getCategoryLists.data.filter((item) => item._id !== payload),
          success: true,
        },
      };

    case INS_BLOG_ACTION_TYPES.DELETE_CATEGORY_RESET:
      return ({
        ...state,
        deleteCategory: {
          ...state.deleteCategory,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.DELETE_CATEGORY_ERROR:
      return ({
        ...state,
        deleteCategory: {
          ...state.deleteCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_SINGLE_CATEGORY_LOADING:
      return ({
        ...state,
        getSingleCategory: {
          ...state.getSingleCategory,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_SINGLE_CATEGORY_LOADED:
      return ({
        ...state,
        getSingleCategory: {
          ...state.getSingleCategory,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_SINGLE_CATEGORY_RESET:
      return ({
        ...state,
        getSingleCategory: {
          ...state.getSingleCategory,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_SINGLE_CATEGORY_ERROR:
      return ({
        ...state,
        getSingleCategory: {
          ...state.getSingleCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case INS_BLOG_ACTION_TYPES.PATCH_CATEGORY_LOADING:
      return ({
        ...state,
        patchCategory: {
          ...state.patchCategory,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.PATCH_CATEGORY_LOADED:
      return {
        ...state,
        patchCategory: {
          ...state.patchCategory,
          data: payload,
          success: true,
          loading: false
        },
        getCategoryLists: {
          ...state.getCategoryLists,
          data: state.getCategoryLists.data.map((content) => content._id === payload._id ?
            {
              ...content,
              category_title: payload.category_title,
              category_desc: payload.category_desc,
              category_cover_image: payload.category_cover_image,
              isHide: payload.isHide
            } : content),
          success: true,
        },
      };

    case INS_BLOG_ACTION_TYPES.PATCH_CATEGORY_RESET:
      return ({
        ...state,
        patchCategory: {
          ...state.patchCategory,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.PATCH_CATEGORY_ERROR:
      return ({
        ...state,
        patchCategory: {
          ...state.patchCategory,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case INS_BLOG_ACTION_TYPES.POST_BLOG_LOADING:
      return ({
        ...state,
        postBlog: {
          ...state.postBlog,
          data: [],
          loading: true,
          saveLoading: false,
          success: false,
          error: false

        }
      })

    case INS_BLOG_ACTION_TYPES.POST_BLOG_SAVE_LOADING:
      return ({
        ...state,
        postBlog: {
          ...state.postBlog,
          data: [],
          loading: false,
          saveLoading: true,
          success: false,
          error: false

        }
      })

    case INS_BLOG_ACTION_TYPES.POST_BLOG_LOADED:
      return ({
        ...state,
        postBlog: {
          ...state.postBlog,
          loading: false,
          saveLoading: false,
          success: true,
          error: false,
          data: payload
        }
      })

    case INS_BLOG_ACTION_TYPES.POST_BLOG_RESET:
      return ({
        ...state,
        postBlog: {
          ...state.postBlog,
          data: [],
          loading: false,
          saveLoading: false,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.POST_BLOG_ERROR:
      return ({
        ...state,
        postBlog: {
          ...state.postBlog,
          data: [],
          loading: false,
          saveLoading: false,
          success: false,
          error: true
        }
      })


    case INS_BLOG_ACTION_TYPES.GET_AUTHOR_DESCRIPTION_LOADED:
      return ({
        ...state,
        authorData: {
          ...state.authorData,
          data: payload,
          success: true
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_BLOG_LIST_LOADING:
      return ({
        ...state,
        getBlogList: {
          ...state.getBlogList,
          data: [],
          loading: true,
          success: false,
          error: false,
          publishlength: "",
          savelength: "",
          totalLength: "",
          trashlength: "",
          pendingApprovalLength: "",
          rejectedLength: "",
          authorLength: ""
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_BLOG_LIST_LOADED:
      return ({
        ...state,
        getBlogList: {
          ...state.getBlogList,
          data: payload.data,
          loading: false,
          success: true,
          error: false,
          publishlength: payload.publishlength,
          savelength: payload.savelength,
          totalLength: payload.totalLength,
          trashlength: payload.trashlength,
          pendingApprovalLength: payload.pendingApprovalLength,
          rejectedLength: payload.rejectedLength,
          authorLength: payload.mineLength,
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_BLOG_LIST_RESET:
      return ({
        ...state,
        getBlogList: {
          ...state.getBlogList,
          data: [],
          loading: false,
          success: false,
          error: false,
          publishlength: "",
          savelength: "",
          totalLength: "",
          trashlength: "",
          pendingApprovalLength: "",
          rejectedLength: ""
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_BLOG_LIST_ERROR:
      return ({
        ...state,
        getBlogList: {
          ...state.getBlogList,
          data: [],
          loading: false,
          success: false,
          error: true,
          publishlength: "",
          savelength: "",
          totalLength: "",
          trashlength: "",
          pendingApprovalLength: "",
          rejectedLength: ""
        }
      })

    case INS_BLOG_ACTION_TYPES.DELETE_BLOG_LOADING:
      return ({
        ...state,
        deleteBlog: {
          ...state.deleteBlog,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.DELETE_BLOG_LOADED:
      return {
        ...state,
        deleteBlog: {
          ...state.deleteBlog,
          data: payload,
          success: true,
          loading: false
        },
        getBlogList: {
          ...state.getBlogList,
          data: state.getBlogList.data.filter((item) => item._id !== payload._id),
          success: true,
          loading: false,
          publishlength: payload.status === "publish" ? state.getBlogList.publishlength - 1 : state.getBlogList.publishlength,
          savelength: payload.status === "save" ? state.getBlogList.savelength - 1 : state.getBlogList.savelength,
          trashlength: state.getBlogList.trashlength + 1,
          totalLength: state.getBlogList.totalLength - 1,
          pendingApprovalLength: payload.status === "pendingForApproval" ? state.getBlogList.pendingApprovalLength - 1 : state.getBlogList.pendingApprovalLength,
          rejectedLength: payload.status === "rejected" ? state.getBlogList.rejectedLength - 1 : state.getBlogList.rejectedLength,
        },
      };

    case INS_BLOG_ACTION_TYPES.DELETE_BLOG_RESET:
      return ({
        ...state,
        deleteBlog: {
          ...state.deleteBlog,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.DELETE_BLOG_ERROR:
      return ({
        ...state,
        deleteBlog: {
          ...state.deleteBlog,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_LOADING:
      return ({
        ...state,
        getSingleBlog: {
          ...state.getSingleBlog,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_LOADED:
      return ({
        ...state,
        getSingleBlog: {
          ...state.getSingleBlog,
          data: payload[0],
          loading: false,
          success: true,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_RESET:
      return ({
        ...state,
        getSingleBlog: {
          ...state.getSingleBlog,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_ERROR:
      return ({
        ...state,
        getSingleBlog: {
          ...state.getSingleBlog,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })


    case INS_BLOG_ACTION_TYPES.PATCH_BLOG_LOADING:
      return ({
        ...state,
        patchBlog: {
          ...state.patchBlog,
          data: [],
          loading: true,
          saveLoading: false,
          success: false,
          error: false
        }
      })


    case INS_BLOG_ACTION_TYPES.PATCH_BLOG_SAVE_LOADING:
      return ({
        ...state,
        patchBlog: {
          ...state.patchBlog,
          data: [],
          loading: false,
          saveLoading: true,
          success: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.PATCH_BLOG_LOADED:
      return {
        ...state,
        patchBlog: {
          ...state.patchBlog,
          data: payload,
          success: true,
          loading: false
        },
        getBlogList: {
          ...state.getBlogList,
          data: state.getBlogList.data.map((content) => content._id === payload._id ?
            payload : content
          ),
          success: true,
        },
      };

    case INS_BLOG_ACTION_TYPES.PATCH_BLOG_RESET:
      return ({
        ...state,
        patchBlog: {
          ...state.patchBlog,
          data: [],
          loading: false,
          success: false,
          saveLoading: false,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.PATCH_BLOG_ERROR:
      return ({
        ...state,
        patchBlog: {
          ...state.patchBlog,
          data: [],
          loading: false,
          saveLoading: false,
          success: false,
          error: true
        }
      })

    case INS_BLOG_ACTION_TYPES.RESTORE_TRASH_BLOGS:
      return {
        ...state,
        patchBlog: {
          ...state.patchBlog,
          data: payload,
          success: true,
          loading: false
        },
        getBlogList: {
          ...state.getBlogList,
          data: state.getBlogList.data.filter((item) => item._id !== payload._id),
          success: true,
          publishlength: payload.status === "publish" ? state.getBlogList.publishlength + 1 : state.getBlogList.publishlength,
          savelength: payload.status === "save" ? state.getBlogList.savelength + 1 : state.getBlogList.savelength,
          trashlength: state.getBlogList.trashlength - 1,
          totalLength: state.getBlogList.totalLength + 1,
          pendingApprovalLength: payload.status === "pendingForApproval" ? state.getBlogList.pendingApprovalLength + 1 : state.getBlogList.pendingApprovalLength,
          rejectedLength: payload.status === "rejected" ? state.getBlogList.rejectedLength + 1 : state.getBlogList.rejectedLength,
        },
      };

    case INS_BLOG_ACTION_TYPES.MULTIPLE_DELETE_SUCCESS:
      let data = state.getBlogList.data.filter((item) => !payload.instituteIds.includes(item._id))
      return {
        ...state,
        deleteBlog: {
          ...state.deleteBlog,
          data: payload,
          success: true,
          loading: false
        },
        getBlogList: {
          ...state.getBlogList,
          data: state.getBlogList.data.filter((item) => !payload.instituteIds.includes(item._id)),
          success: true,
          loading: false,
          publishlength: data.filter((item) => item.status === "publish").length,
          savelength: data.filter((item) => item.status === "save").length,
          trashlength: state.getBlogList.trashlength + payload.instituteIds.length,
          totalLength: state.getBlogList.totalLength - payload.instituteIds.length,
          pendingApprovalLength: data.filter((item) => item.status === "pendingForApproval").length,
          rejectedLength: data.filter((item) => item.status === "rejected").length,
        },
      };

    case INS_BLOG_ACTION_TYPES.ACCEPT_REJECT_BLOGS:
      return {
        ...state,
        patchBlog: {
          ...state.patchBlog,
          data: payload,
          success: true,
          loading: false
        },
        getBlogList: {
          ...state.getBlogList,
          data: state.getBlogList.data.filter((item) => item._id !== payload.data._id),
          publishlength: payload.data.status === "publish" ? state.getBlogList.publishlength + 1 : state.getBlogList.publishlength,
          rejectedLength: payload.listType === "Pending" ?
            payload.data.status === "rejected" ? state.getBlogList.rejectedLength + 1 : state.getBlogList.rejectedLength
            : state.getBlogList.rejectedLength - 1,
          pendingApprovalLength: payload.listType === "Pending" ? state.getBlogList.pendingApprovalLength - 1 : state.getBlogList.pendingApprovalLength,
          success: true,
        },
      };

    case INS_BLOG_ACTION_TYPES.DOWNLOAD_EXCEL_SHEET:
      return ({
        ...state,
        downloadExcelSheetData: {
          ...state.downloadExcelSheetData,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_LOADED:
      return ({
        ...state,
        getWesbiteBlogList: {
          ...state.getWesbiteBlogList,
          data: payload,
          allCategories: payload.allCategories.reverse(),
          featuredBlogs: payload.featuredBlogs.reverse(),
          publishBlogs: payload.publishBlogs.reverse(),
          loading: false,
          success: true,
          error: false,
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_LOADING:
      return ({
        ...state,
        getWesbiteBlogList: {
          ...state.getWesbiteBlogList,
          data: [],
          allCategories: "",
          featuredBlogs: "",
          publishBlogs: "",
          loading: true,
          success: false,
          error: false,
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_ERROR:
      return ({
        ...state,
        getWesbiteBlogList: {
          ...state.getWesbiteBlogList,
          data: [],
          allCategories: "",
          featuredBlogs: "",
          publishBlogs: "",
          loading: false,
          success: false,
          error: true,
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_RESET:
      return ({
        ...state,
        getWesbiteBlogList: {
          ...state.getWesbiteBlogList,
          data: [],
          allCategories: "",
          featuredBlogs: "",
          publishBlogs: "",
          loading: false,
          success: false,
          error: false,
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_CATEGORY_WISE_BLOGS_LOADED:
      return ({
        ...state,
        getSubdomainCategoryBlogs: {
          ...state.getSubdomainCategoryBlogs,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })

    case INS_BLOG_ACTION_TYPES.LIKE_BLOG_LOADING:
      return ({
        ...state,
        postBlogLike: {
          ...state.postBlogLike,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })

    case INS_BLOG_ACTION_TYPES.LIKE_BLOG_LOADED:
      if (payload.data.status === "mainPage") {
        return ({
          ...state,
          postBlogLike: {
            ...state.postBlogLike,
            data: payload,
            loading: false,
            success: true,
            error: false,
          },
          getWesbiteBlogList: {
            ...state.getWesbiteBlogList,
            featuredBlogs: state.getWesbiteBlogList.featuredBlogs.map((item, i) => {
              return (
                item._id === payload.data.blog ? payload.data.isLike === true ? {
                  ...item,
                  totalLike: item.totalLike + 1,
                  LikeStatus: true
                } : {
                  ...item,
                  totalLike: item.totalLike - 1,
                  LikeStatus: false
                } : item
              );
            })
          }
        })
      }
      else {
        return ({
          ...state,
          postBlogLike: {
            ...state.postBlogLike,
            data: payload,
            loading: false,
            success: true,
            error: false,
          },
          getSingleBlog: {
            ...state.getSingleBlog,
            data: payload.data.isLike === true ? {
              ...state.getSingleBlog.data,
              totalLike: state.getSingleBlog.data.totalLike + 1,
              LikeStatus: true
            } : {
              ...state.getSingleBlog.data,
              totalLike: state.getSingleBlog.data.totalLike - 1,
              LikeStatus: false
            }
          },
        })
      }

    case INS_BLOG_ACTION_TYPES.LIKE_BLOG_ERROR:
      return ({
        ...state,
        postBlogLike: {
          ...state.postBlogLike,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })

    case INS_BLOG_ACTION_TYPES.LIKE_BLOG_RESET:
      return ({
        ...state,
        postBlogLike: {
          ...state.postBlogLike,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_WEBSITE_FEATURE_BLOG_LOADING:
      return ({
        ...state,
        getWebsiteFeatureBlogs: {
          ...state.getWebsiteFeatureBlogs,
          data: [],
          featuredBlogs: "",
          nonFeaturedBlogs: "",
          loading: true,
          success: false,
          error: false,
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_WEBSITE_FEATURE_BLOG_LOADED:
      return ({
        ...state,
        getWebsiteFeatureBlogs: {
          ...state.getWebsiteFeatureBlogs,
          data: payload,
          featuredBlogs: payload.featuredBlogs,
          nonFeaturedBlogs: payload.nonFeaturedBlogs,
          loading: false,
          success: true,
          error: false,
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_WEBSITE_FEATURE_BLOG_ERROR:
      return ({
        ...state,
        getWebsiteFeatureBlogs: {
          ...state.getWebsiteFeatureBlogs,
          data: [],
          featuredBlogs: "",
          nonFeaturedBlogs: "",
          loading: false,
          success: false,
          error: true,
        }
      })

    case INS_BLOG_ACTION_TYPES.GET_WEBSITE_FEATURE_BLOG_RESET:
      return ({
        ...state,
        getWebsiteFeatureBlogs: {
          ...state.getWebsiteFeatureBlogs,
          data: [],
          featuredBlogs: "",
          nonFeaturedBlogs: "",
          loading: false,
          success: false,
          error: false,
        }
      })


    default:
      return state
  }
}

export default instituteblogs;