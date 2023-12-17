import { Collection_Filter_ActionTypes } from "./ActionType";

export const CollectionPush = (data) => {
  return dispatch => {
    dispatch({
      type: Collection_Filter_ActionTypes.COLLECTION_FILTER,
      payload: data,
    })
  }
}
export const resetCollectionFilter = () => {
  return (dispatch) => {
    dispatch({
      type: Collection_Filter_ActionTypes.RESET_COLLECTION_FILTER
    })
  }
}
