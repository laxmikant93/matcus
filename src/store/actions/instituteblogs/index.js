import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { INS_BLOG_ACTION_TYPES } from "./actionTypes";
import InstituteBlogsRequest from "./blogsRequest";

//post Blog
export const postBlogDetail = (data, type) => {
  return (dispatch) => {
    if (type === "publish") {
      dispatch({
        type: INS_BLOG_ACTION_TYPES.POST_BLOG_LOADING,
        loading: true,
        payload: {}
      })
    }
    if (type === "save") {
      dispatch({
        type: INS_BLOG_ACTION_TYPES.POST_BLOG_SAVE_LOADING,
        saveLoading: true,
        payload: {}
      })
    }

    InstituteBlogsRequest.post(InstituteBlogsRequest.instituteBlogsEndpoint.postBlog,
      data,
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.POST_BLOG_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Blog posted successfully!"));
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.POST_BLOG_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const resetPostBlogDetail = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.POST_BLOG_RESET,
      payload: []
    })
  }
}

//get Blog list
export const getBlogList = (id, userID, authorID, limit, skip, query, value, query2, value2) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_BLOG_LIST_LOADING,
      loading: true,
    })
    InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getBlogList.replace("_Id_", id)
      .replace("_USERID_", userID).replace("_AUTHOR_", authorID)
      .replace("__LIMIT__", limit).replace("__SKIP__", skip)
      .replace("_QUERY_", query).replace("_VALUE_", value)
      .replace("_NEWQUERY_", query2).replace("_NEWVALUE_", value2),
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_BLOG_LIST_LOADED,
          // payload: success && success.data.length ? success.data.reverse() : ""
          payload: success.data
        })
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_BLOG_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const getBlogListReset = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_BLOG_LIST_RESET,
      payload: []
    })
  }
}

//get author description
export const getAuthorDescription = (id, insID) => {
  return (dispatch) => {
    InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getSingleAuthorDesc.replace("_Id_", id)
      .replace("_INSID_", insID),
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_AUTHOR_DESCRIPTION_LOADED,
          payload: success.data
        })
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.POST_BLOG_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

//delete Blog
export const deleteBlog = (_id) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.DELETE_BLOG_LOADING,
      loading: true,
    })
    InstituteBlogsRequest.patch(
      InstituteBlogsRequest.instituteBlogsEndpoint.deleteBlog.replace("__Id__", _id), { isDeleted: true },
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.DELETE_BLOG_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Blog deleted successfully!"));
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.DELETE_BLOG_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const deleteBlogReset = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.DELETE_BLOG_RESET,
      payload: []
    })
  }
}

//get single Blog
export const getSingleBlog = (id, user) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_LOADING,
      loading: true,
    })
    if (user) {
      InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getSingleBlog.replace("__Id__", id)
        .replace("__USER__", user),
        (success) => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_LOADED,
            payload: success.data
          })
        },
        error => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_ERROR,
            payload: []
          })
          dispatch(setCommonError(error.message))
        }
      );
    }
    else {
      InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getSingleBlogLogout.replace("__Id__", id),
        (success) => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_LOADED,
            payload: success.data
          })
        },
        error => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_ERROR,
            payload: []
          })
          dispatch(setCommonError(error.message))
        }
      );
    }
  }
}

export const getSingleBlogReset = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_SINGLE_BLOG_RESET,
      payload: []
    })
  }
}

//update blog
export const updateBlog = (_id, data, type) => {
  return (dispatch) => {
    if (type === "publish") {
      dispatch({
        type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_LOADING,
        loading: true,
        payload: {}
      })
    }
    if (type === "save") {
      dispatch({
        type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_SAVE_LOADING,
        saveLoading: true,
        payload: {}
      })
    }
    else {
      dispatch({
        type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_LOADING,
        loading: true,
        payload: {}
      })
    }
    InstituteBlogsRequest.patch(
      InstituteBlogsRequest.instituteBlogsEndpoint.patchBlog.replace("__Id__", _id), data,
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Blog updated successfully!"));
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const updateBlogReset = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_RESET,
      payload: []
    })
  }
}

// restore trash blogs 
export const restoreTrashedBlogs = (_id, data) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_LOADING,
      loading: true,
    })

    InstituteBlogsRequest.post(
      InstituteBlogsRequest.instituteBlogsEndpoint.restoreTrashBlogs.replace("__Id__", _id), data,
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.RESTORE_TRASH_BLOGS,
          payload: success.data
        })
        dispatch(showSuccessPopup("Blog restored successfully!"));
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

// delete multiple blogs
export const deleteMultipleBlogs = (data) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.DELETE_BLOG_LOADING,
      loading: true,
    })
    InstituteBlogsRequest.post(
      InstituteBlogsRequest.instituteBlogsEndpoint.deleteMultipleBlogs, data,
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.MULTIPLE_DELETE_SUCCESS,
          payload: data
        })
        dispatch(showSuccessPopup("Blog deleted successfully!"));
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.DELETE_BLOG_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

// accept/reject blogs
export const acceptRejectBlogs = (_id, data, type, listType) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_LOADING,
      loading: true,
    })

    InstituteBlogsRequest.patch(
      InstituteBlogsRequest.instituteBlogsEndpoint.patchBlog.replace("__Id__", _id), data,
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.ACCEPT_REJECT_BLOGS,
          payload: { data: success.data, listType: listType }
        })
        if (type === "accept") {
          dispatch(showSuccessPopup("Blog accepted!"));
        } else {
          dispatch(showSuccessPopup("Blog rejected!"));
        }
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.PATCH_BLOG_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

//download excel
export const downloadExcelSheet = (data) => {
  return (dispatch) => {
    InstituteBlogsRequest.post(InstituteBlogsRequest.instituteBlogsEndpoint.downloadExcelSheet, data,
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.DOWNLOAD_EXCEL_SHEET,
          payload: success.data
        })
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

//post Category
export const postCategory = (data) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.POST_CATEGORY_LOADING,
      loading: true,
    })
    // dispatch({
    //   type: INS_BLOG_ACTION_TYPES.POST_CATEGORY_DUPLICATE_ERROR,
    //   error: false,
    // });

    InstituteBlogsRequest.post(InstituteBlogsRequest.instituteBlogsEndpoint.postCategory,
      data,
      (success) => {
        if (success.data === "Category Tiltle is already taken") {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.POST_CATEGORY_DUPLICATE_ERROR,
            error: true,
          })
        }
        else {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.POST_CATEGORY_LOADED,
            payload: success.data
          })
          dispatch(showSuccessPopup("Category added successfully!"));
        }
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.POST_CATEGORY_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const resetPostCategory = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.POST_CATEGORY_RESET,
      payload: []
    })
  }
}

//get Category list
export const getCategoryLists = (id, userId, status) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_LOADING,
      loading: true,
    })
    InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getCategoryLists.replace("_Id_", id)
      .replace("_USERID_", userId).replace("_Value_", status),
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_LOADED,
          payload: success.data
        })
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const getCategoryListReset = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_RESET,
      payload: []
    })
  }
}

//delete Category
export const deleteCategory = (_id) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.DELETE_CATEGORY_LOADING,
      loading: true,
    })
    InstituteBlogsRequest.patch(
      InstituteBlogsRequest.instituteBlogsEndpoint.deleteCategory.replace("__Id__", _id), { isDeleted: true },
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.DELETE_CATEGORY_LOADED,
          payload: _id
        })
        dispatch(showSuccessPopup("Category deleted successfully!"));
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.DELETE_CATEGORY_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const deleteCategoryReset = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.DELETE_CATEGORY_RESET,
      payload: []
    })
  }
}

//get single category
export const getSingleCategory = (id) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_SINGLE_CATEGORY_LOADING,
      loading: true,
    })
    InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getSingleCategory.replace("__Id__", id),
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_SINGLE_CATEGORY_LOADED,
          payload: success.data
        })
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_SINGLE_CATEGORY_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const getSingleCategoryReset = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_SINGLE_CATEGORY_RESET,
      payload: []
    })
  }
}

//update Category
export const updateCategory = (_id, data) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.PATCH_CATEGORY_LOADING,
      loading: true,
    })
    InstituteBlogsRequest.patch(
      InstituteBlogsRequest.instituteBlogsEndpoint.patchCategory.replace("__Id__", _id), data,
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.PATCH_CATEGORY_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Category updated successfully!"));
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.PATCH_CATEGORY_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const updateCategoryReset = () => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.PATCH_CATEGORY_RESET,
      payload: []
    })
  }
}

//search category
export const searchCategory = (id, value) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_LOADING,
      loading: true,
    })
    InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.searchCategory.replace("_Id_", id)
      .replace("_searchValue_", value),
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.SEARCH_CATEGORY,
          payload: success.data
        })
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_CATEGORY_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

// get subdomain blog list
export const getWebsiteBlogList = (name, user) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_LOADING,
      loading: true,
    })
    if (user) {
      InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getSubdomainBlogWithLikeList.replace("_DOMAIN_", name).replace("__USER__", user),
        (success) => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_LOADED,
            payload: success.data
          })
        },
        error => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_ERROR,
            payload: []
          })
          dispatch(setCommonError(error.message))
        }
      );
    } else {
      InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getSubdomainBlogList.replace("_DOMAIN_", name),
        (success) => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_LOADED,
            payload: success.data
          })
        },
        error => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_ERROR,
            payload: []
          })
          dispatch(setCommonError(error.message))
        }
      );
    }

  }
}

// like blog
export const likeBlog = (data) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.LIKE_BLOG_LOADING,
      loading: true,
    })
    InstituteBlogsRequest.post(InstituteBlogsRequest.instituteBlogsEndpoint.likeBlog, data,
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.LIKE_BLOG_LOADED,
          payload: { data: data, successData: success.data }
        })
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.LIKE_BLOG_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

// get featured blogs list
export const getFeaturedBlogsList = (name, domain) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_FEATURE_BLOG_LOADING,
      loading: true,
    })
    if (domain === "privateDomain") {
      InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getFeatureBlogsListPrivateDomain.replace("_DOMAIN_", name),
        (success) => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_FEATURE_BLOG_LOADED,
            payload: success.data
          })
        },
        error => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_FEATURE_BLOG_ERROR,
            payload: []
          })
          dispatch(setCommonError(error.message))
        }
      );
    }
    else {
      InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getFeatureBlogsList.replace("_DOMAIN_", name),
        (success) => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_FEATURE_BLOG_LOADED,
            payload: success.data
          })
        },
        error => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_FEATURE_BLOG_ERROR,
            payload: []
          })
          dispatch(setCommonError(error.message))
        }
      );
    }
  }
}

//get subdomain category wise blogs 
export const getCategoryWiseBlogs = (id, Category) => {
  return (dispatch) => {
    InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getSubdomainCategoryWiseBlogList.replace("_Id_", id)
      .replace("_CATEGORY_", Category),
      (success) => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_CATEGORY_WISE_BLOGS_LOADED,
          payload: success.data
        })
      },
      error => {
        dispatch({
          type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

// get private domain blog list
export const getDomainBlogList = (name, user) => {
  return (dispatch) => {
    dispatch({
      type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_LOADING,
      loading: true,
    })
    if (user) {
      InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getDomainBlogWithLikeList.replace("_DOMAIN_", name).replace("__USER__", user),
        (success) => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_LOADED,
            payload: success.data
          })
        },
        error => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_ERROR,
            payload: []
          })
          dispatch(setCommonError(error.message))
        }
      );
    } else {
      InstituteBlogsRequest.get(InstituteBlogsRequest.instituteBlogsEndpoint.getDomainBlogList.replace("_DOMAIN_", name),
        (success) => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_LOADED,
            payload: success.data
          })
        },
        error => {
          dispatch({
            type: INS_BLOG_ACTION_TYPES.GET_WEBSITE_BLOG_LIST_ERROR,
            payload: []
          })
          dispatch(setCommonError(error.message))
        }
      );
    }

  }
}

