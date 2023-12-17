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
} from "../../actions/ecommerce/type/categories";

const CATEGORY_LIST_INITIAL_STATE = {
  CategoryList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  SubCategoryList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  SubSubCategoryList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
}

const categoryListReducer = (state = CATEGORY_LIST_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CategoriesActionTypes.GET_CATEGORY_LIST_LOADING:
      return ({
        ...state,
        CategoryList: {
          ...state.CategoryList,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      });
    case CategoriesActionTypes.GET_CATEGORY_LIST_SUCCESS:
      return ({
        ...state,
        CategoryList: {
          ...state.CategoryList,
          data: [...payload],
          loading: false,
          error: false,
          success: true,
        }
      });
    case CategoriesActionTypes.GET_CATEGORY_LIST_FAIL:
      return ({
        ...state,
        CategoryList: {
          ...state.CategoryList,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      });
    case CategoriesActionTypes.GET_SUB_CATEGORY_LIST_LOADING:
      return ({
        ...state,
        SubCategoryList: {
          ...state.SubCategoryList,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      });
    case CategoriesActionTypes.GET_SUB_CATEGORY_LIST_SUCCESS:
      return ({
        ...state,
        SubCategoryList: {
          ...state.SubCategoryList,
          data: [...payload],
          loading: false,
          error: false,
          success: true,
        }
      });
    case CategoriesActionTypes.GET_SUB_CATEGORY_LIST_FAIL:
      return ({
        ...state,
        SubCategoryList: {
          ...state.SubCategoryList,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      });
    case CategoriesActionTypes.GET_SUB_SUB_CATEGORY_LIST_LOADING:
      return ({
        ...state,
        SubSubCategoryList: {
          ...state.SubSubCategoryList,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      });
    case CategoriesActionTypes.GET_SUB_SUB_CATEGORY_LIST_SUCCESS:
      return ({
        ...state,
        SubSubCategoryList: {
          ...state.SubSubCategoryList,
          data: [...payload],
          loading: false,
          error: false,
          success: true,
        }
      });
    case CategoriesActionTypes.GET_SUB_SUB_CATEGORY_LIST_FAIL:
      return ({
        ...state,
        SubSubCategoryList: {
          ...state.SubSubCategoryList,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      });
    default:
      return state;
  }
}

export { categoryListReducer };
