import { COUNTRY_STATE_ACTION_TYPES } from "./actionTypes";

export const findState = countryName => {
    
    return dispatch => {
       dispatch({
         type:COUNTRY_STATE_ACTION_TYPES.GET_STATES_BY_COUNTRY,
         payload:countryName
       })
    }
}
