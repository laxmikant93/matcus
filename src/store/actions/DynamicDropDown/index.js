import { Dynamic_Drop_Down_Types } from "./action"
export const addvalue = (value) => {
    return dispatch => {
  
      dispatch({
        type: Dynamic_Drop_Down_Types.OPEN_Dynamic_Drop_Down_Types,
        payload: value,
      })
    }
  }