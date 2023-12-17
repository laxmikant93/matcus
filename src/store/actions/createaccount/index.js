import {THANKYOU_USER} from "./actionType";
import createaccountRequest from "./createaccountRequest";

export const getUserData = () => {
    return dispatch => {
        dispatch({ 
                type: THANKYOU_USER.THANKYOU_MESSAGE,
                payload:""
        })

        createaccountRequest.get(createaccountRequest.userEndpoint.endpoint,(success)=>{
        

            dispatch({ 
                type: THANKYOU_USER.THANKYOU_MESSAGE,
                payload:success.data.data
            })
        
        },
        error => {

        }
        );
    }
}