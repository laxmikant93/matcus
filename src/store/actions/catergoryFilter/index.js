import { Catergory_Filter_ActionTypes } from "./ActionType";

export const CategoryPush = (data) => {
  return dispatch => {

    dispatch({
      type: Catergory_Filter_ActionTypes.CATEGORY_PUSH,
      payload: data,
    })
  }
}
export const SubCategoryPush = (data) => {
  return dispatch => {

    dispatch({
      type: Catergory_Filter_ActionTypes.SUB_CATEGORY_PUSH,
      payload: data,
    })
  }
}
export const AllSubCategoryPush = (data) => {
  return dispatch => {

    dispatch({
      type: Catergory_Filter_ActionTypes.ALL_SUB_CATEGORY_PUSH,
      payload: data,
    })
  }
}
export const SubSubCategoryPush = (data) => {
  return dispatch => {

    dispatch({
      type: Catergory_Filter_ActionTypes.SUB_SUB_CATEGORY_PUSH,
      payload: data,
    })
  }
}
export const AllSubSubCategoryPush = (data) => {
  return dispatch => {

    dispatch({
      type: Catergory_Filter_ActionTypes.ALL_SUB_SUB_CATEGORY_PUSH,
      payload: data,
    })
  }
}

export const SubCategoryPushIfParentSelected = (data) => {
  return dispatch => {

    dispatch({
      type: Catergory_Filter_ActionTypes.SUB_CATEGORY_PUSH_IF_PARENT_SELECTED,
      payload: data,
    })

  }

}




// showRemoveCat,showRemoveSubCat,showRemoveSubSubCat,showAddCat,showAddSubCat,showAddSubSubCat

// TODO SHOW 

export const showRemoveCat = (data) => {
  return dispatch => {
    dispatch({
      type: Catergory_Filter_ActionTypes.SHOW_REMOVE_CAT,
      payload: data,
    })
  }
}

export const showRemoveSubCat = (data) => {
  return dispatch => {
    dispatch({
      type: Catergory_Filter_ActionTypes.SHOW_REMOVE_SUB_CAT,
      payload: data,
    })
  }
}

export const showRemoveSubSubCat = (data) => {
  return dispatch => {
    dispatch({
      type: Catergory_Filter_ActionTypes.SHOW_REMOVE_SUB_SUB_CAT,
      payload: data,
    })
  }
}

export const showAddCat = (data) => {
  return dispatch => {
    dispatch({
      type: Catergory_Filter_ActionTypes.SHOW_ADD_CAT,
      payload: data,
    })
  }
}

export const showAddSubCat = (data) => {
  return dispatch => {
    dispatch({
      type: Catergory_Filter_ActionTypes.SHOW_ADD_SUB_CAT,
      payload: data,
    })
  }
}

export const showAddSubSubCat = (data) => {
  return dispatch => {
    dispatch({
      type: Catergory_Filter_ActionTypes.SHOW_ADD_SUB_SUB_CAT,
      payload: data,
    })
  }
}

export const clearAllCategory = () => {
  return dispatch => {
    dispatch({
      type: Catergory_Filter_ActionTypes.CLEAR_ALL_CATEGRY
    })
  }
}

export const clearSearchFilter = (data) => {
  return dispatch => {
    dispatch({
      type: Catergory_Filter_ActionTypes.CLEAR_SEARCH_FILTER,
      payload: data
    })
  }
}
