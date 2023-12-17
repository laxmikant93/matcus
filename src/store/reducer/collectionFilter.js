import { Collection_Filter_ActionTypes } from "../actions/collectionfilter/ActionType"

const COLLECTION_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
}

const collectionFilter = (state = COLLECTION_INITIAL_STATE, { type, payload }) => {
  let inputFields = state.list.data
  switch (type) {
    case Collection_Filter_ActionTypes.COLLECTION_FILTER:
      if (!state.list.data.includes(payload)) {
        inputFields = state.list.data
        inputFields.push(payload)
      } else {
        inputFields = state.list.data
        let index = inputFields.indexOf(payload)
        inputFields.splice(index, 1)
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
    case Collection_Filter_ActionTypes.RESET_COLLECTION_FILTER:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })



    default:
      return state
  }
}
export default collectionFilter;