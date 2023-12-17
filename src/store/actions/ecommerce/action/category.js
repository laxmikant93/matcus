import { API_CATEGORY } from "../config";
import CategoryRequest from "../request/category";
import {
  GET_CATEGORY_LIST_LOADING,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_FAIL,
  GET_SUB_CATEGORY_LIST_LOADING,
  GET_SUB_CATEGORY_LIST_SUCCESS,
  GET_SUB_CATEGORY_LIST_FAIL,
  GET_SUB_SUB_CATEGORY_LIST_LOADING,
  GET_SUB_SUB_CATEGORY_LIST_SUCCESS,
  GET_SUB_SUB_CATEGORY_LIST_FAIL,
  CategoriesActionTypes
} from "../type/categories";
import { getRequest } from "../utils/request";

const getCategoryList = (domain) => async (dispatch) => {
  dispatch({ type: CategoriesActionTypes.GET_CATEGORY_LIST_LOADING });
  CategoryRequest.get(
    CategoryRequest.endpoint.categoryList,
    (success) => {
      dispatch({ type: CategoriesActionTypes.GET_CATEGORY_LIST_SUCCESS, payload: success.data.data });
    },
    (error) => {
      dispatch({ type: CategoriesActionTypes.GET_CATEGORY_LIST_FAIL, payload: error.response.data.message });
    }
  )
};
// const getCategoryList = (domain) => async (dispatch) => {
//   try {
//     dispatch({ type: CategoriesActionTypes.GET_CATEGORY_LIST_LOADING });
//     const url = `${API_CATEGORY}/categoryListUser`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({ type: CategoriesActionTypes.GET_CATEGORY_LIST_SUCCESS, payload: list.data.data });
//     }

//   } catch (error) {

//     dispatch({ type: CategoriesActionTypes.GET_CATEGORY_LIST_FAIL, payload: error });
//   }
// };

const getSubCategoryList = (id) => async (dispatch) => {
  dispatch({ type: CategoriesActionTypes.GET_SUB_CATEGORY_LIST_LOADING });
  CategoryRequest.get(
    CategoryRequest.endpoint.subCategoryList
      .replace("__ID__", id),
    (success) => {
      dispatch({ type: CategoriesActionTypes.GET_SUB_CATEGORY_LIST_SUCCESS, payload: success.data.data });
    },
    (error) => {
      dispatch({ type: CategoriesActionTypes.GET_SUB_CATEGORY_LIST_FAIL, payload: error.response.data.message });
    }
  )
};

// const getSubCategoryList = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: CategoriesActionTypes.GET_SUB_CATEGORY_LIST_LOADING });
//     const url = `${API_CATEGORY}/subCategoryList/${id}`;
//     // const url = `${API_CATEGORY}/getAllSubCategory`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({ type: CategoriesActionTypes.GET_SUB_CATEGORY_LIST_SUCCESS, payload: list.data.data });
//     }

//   } catch (error) {

//     dispatch({ type: CategoriesActionTypes.GET_SUB_CATEGORY_LIST_FAIL, payload: error });
//   }
// };

const getSubSubCategoryList = (id) => async (dispatch) => {
  dispatch({ type: CategoriesActionTypes.GET_SUB_SUB_CATEGORY_LIST_LOADING });
  CategoryRequest.get(
    CategoryRequest.endpoint.subSubCategoryList
      .replace("__ID__", id),
    (success) => {
      dispatch({ type: CategoriesActionTypes.GET_SUB_SUB_CATEGORY_LIST_SUCCESS, payload: success.data.data });
    },
    (error) => {
      dispatch({ type: CategoriesActionTypes.GET_SUB_SUB_CATEGORY_LIST_FAIL, payload: error.response.data.message });
    }
  )
};

// const getSubSubCategoryList = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: CategoriesActionTypes.GET_SUB_SUB_CATEGORY_LIST_LOADING });
//     const url = `${API_CATEGORY}/subSubCategory/subSubCategoryList/${id}`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({ type: CategoriesActionTypes.GET_SUB_SUB_CATEGORY_LIST_SUCCESS, payload: list.data.data });
//     }

//   } catch (error) {

//     dispatch({ type: CategoriesActionTypes.GET_SUB_SUB_CATEGORY_LIST_FAIL, payload: error });
//   }
// };

export {
  getCategoryList,
  getSubCategoryList,
  getSubSubCategoryList
};