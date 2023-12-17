import { Catergory_Filter_ActionTypes } from "../actions/catergoryFilter/ActionType"

const CATEGORY_INITIAL_STATE = {
  list: {
    data: [
      {
        category_level: 0,
        _id: []
      }, {
        category_level: 1,
        _id: []
      },
      {
        category_level: 2,
        _id: []
      }
    ],
    loading: false,
    success: false,
    error: false,
  },

  sendCategoryList: {
    /* data: [
      { */
    category_level_Zero: [],
    category_level_One: [],
    category_level_Two: [],
    loading: false,
    success: false,
    error: false,
  },

  clearStateSearch: {
    status: false
  }


}



const catergoryFilter = (state = CATEGORY_INITIAL_STATE, { type, payload }) => {
  let inputFields = state.list.data
  switch (type) {
    case Catergory_Filter_ActionTypes.CATEGORY_PUSH:
      if (!state.list.data[0]._id.includes(payload)) {
        inputFields = state.list.data
        inputFields[0]._id.push(payload)
      } else {
        inputFields = state.list.data
        let index = inputFields[0]._id.indexOf(payload)
        inputFields[0]._id.splice(index, 1)
      }
      return ({
        ...state,
        list: {
          ...state.list,
          data: inputFields,
          loading: false,
          error: false,
          success: false,
        }
      })

    case Catergory_Filter_ActionTypes.SUB_CATEGORY_PUSH:
      if (!state.list.data[1]._id.includes(payload)) {
        // console.log("payload",state.list.data[1],state.list.data[1]._id,payload)
        inputFields = state.list.data
        inputFields[1]._id.push(payload)
      } else {
        inputFields = state.list.data
        let index = inputFields[1]._id.indexOf(payload)
        inputFields[1]._id.splice(index, 1)
      }
      return ({
        ...state,
        list: {
          ...state.list,
          data: inputFields,
          loading: false,
          success: false,
          error: false,
        }
      })

    case Catergory_Filter_ActionTypes.SUB_SUB_CATEGORY_PUSH:
      if (!state.list.data[2]._id.includes(payload._id)) {
        inputFields = state.list.data
        inputFields[2]._id.push(payload._id)
      } else {
        inputFields = state.list.data
        let index = inputFields[2]._id.indexOf(payload._id)
        inputFields[2]._id.splice(index, 1)
      }
      return ({
        ...state,
        list: {
          ...state.list,
          data: inputFields,
          loading: false,
          success: false,
          error: false,
        }
      })
    case Catergory_Filter_ActionTypes.ALL_SUB_CATEGORY_PUSH:

      inputFields = state.list.data
      inputFields[1]._id = payload
      return ({
        ...state,
        list: {
          ...state.list,
          data: inputFields,
          loading: false,
          success: false,
          error: false,
        }
      })
    case Catergory_Filter_ActionTypes.ALL_SUB_SUB_CATEGORY_PUSH:
      inputFields = state.list.data
      inputFields[2]._id = payload
      return ({
        ...state,
        list: {
          ...state.list,
          data: inputFields,
          loading: false,
          success: false,
          error: false,
        }
      })

    case Catergory_Filter_ActionTypes.SUB_CATEGORY_PUSH_IF_PARENT_SELECTED:
      inputFields = state.list.data
      // inputFields[1]._id.filter((id) => { return id === payload })
      inputFields[1]._id = []
      inputFields[1]._id.push(payload)
      // arr.filter((item) => item.checked === true)
      return ({
        ...state,
        list: {
          ...state.list,
          data: inputFields,
          loading: false,
          success: false,
          error: false,
        }
      })










    // SHOW_ADD_CAT
    // TODO sendCategoryList DATA
    case Catergory_Filter_ActionTypes.SHOW_ADD_CAT:
      let catAdd = state.sendCategoryList.category_level_Zero
      // console.log("reached line no 166 ",catAdd)
      catAdd.push(payload)
      return ({
        ...state,
        sendCategoryList: {
          ...state.sendCategoryList,
          category_level_Zero: catAdd,
          loading: false,
          success: false,
          error: false,
        }
      })

    case Catergory_Filter_ActionTypes.SHOW_REMOVE_CAT:
      let catRemove = state.sendCategoryList.category_level_Zero.filter(item => item !== payload)
      return ({
        ...state,
        sendCategoryList: {
          ...state.sendCategoryList,
          category_level_Zero: catRemove,
          loading: false,
          success: false,
          error: false,
        }
      })


    // SHOW_ADD_SUB_SUB_CAT
    case Catergory_Filter_ActionTypes.SHOW_ADD_SUB_CAT:
      let subCatAdd = state.sendCategoryList.category_level_One.concat(payload)
      return ({
        ...state,
        sendCategoryList: {
          ...state.sendCategoryList,
          category_level_One: subCatAdd,
          loading: false,
          success: false,
          error: false,
        }
      })

    case Catergory_Filter_ActionTypes.SHOW_ADD_SUB_SUB_CAT:
      let subSubCatAdd = state.sendCategoryList.category_level_Two.concat(payload)
      return ({
        ...state,
        sendCategoryList: {
          ...state.sendCategoryList,
          category_level_Two: subSubCatAdd,
          loading: false,
          success: false,
          error: false,
        }
      })



    case Catergory_Filter_ActionTypes.SHOW_REMOVE_SUB_CAT:
      let subCatRemove = state.sendCategoryList.category_level_One.filter(item => !payload.includes(item))
      return ({
        ...state,
        sendCategoryList: {
          ...state.sendCategoryList,
          category_level_One: subCatRemove,
          loading: false,
          success: false,
          error: false,
        }
      })

    case Catergory_Filter_ActionTypes.SHOW_REMOVE_SUB_SUB_CAT:
      let subCatCatRemove = state.sendCategoryList.category_level_Two.filter(item => !payload.includes(item))
      return ({
        ...state,
        sendCategoryList: {
          ...state.sendCategoryList,
          category_level_Two: subCatCatRemove,
          loading: false,
          success: false,
          error: false,
        }
      })


    case Catergory_Filter_ActionTypes.CLEAR_ALL_CATEGRY:
      return ({
        ...state,
        list: {
          data: [
            {
              category_level: 0,
              _id: []
            }, {
              category_level: 1,
              _id: []
            },
            {
              category_level: 2,
              _id: []
            }
          ],
          loading: false,
          success: false,
          error: false,
        },

        sendCategoryList: {
          category_level_Zero: [],
          category_level_One: [],
          category_level_Two: [],
          loading: false,
          success: false,
          error: false,

        }
      })

    case Catergory_Filter_ActionTypes.CLEAR_SEARCH_FILTER:
      return ({
        ...state,
        clearStateSearch: {
          status: payload
        }
      })


    default:
      return state
  }
}
export default catergoryFilter;