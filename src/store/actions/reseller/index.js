import {Reseller} from "./actionType";
// import ResellerRed from "../../reducer/reseller";
import ResellerRequest from "./resellerRequest";
import {showSuccessPopup} from "../successmessagepopup";
import {setCommonError} from "../commonerror";


export const getReseller =(key,userid,Domain)=>{

    return dispatch => {    

        dispatch({ 
            type: Reseller.RESELLER_API_CALL_LOADING,
            payload:[]
        })

        ResellerRequest.get(ResellerRequest.Reseller.endpoint.replace("__KEY__",key).replace("__USER_ID__",userid).replace("__DOMAIN_NAME__",Domain), (success)=>{

            dispatch({ 
                type: Reseller.RESELLER_API_CALL_SUCCESS,
                payload:success.data
            })
            dispatch(showSuccessPopup("Read."));
        },
        error => {
            dispatch({ 
                type: Reseller.RESELLER_API_CALL_ERROR,
                payload:error.message
            })
            dispatch(setCommonError(error.message))
        }
        );
    }
}
export const getTestReseller =()=>{

    return dispatch => {    

        dispatch({ 
            type: Reseller.RESELLER_API_CALL_LOADING,
            payload:[]
        })

        ResellerRequest.get(ResellerRequest.Reseller.test, (success)=>{

            dispatch({ 
                type: Reseller.RESELLER_API_CALL_SUCCESS,
                payload:success.data
            })
            dispatch(showSuccessPopup("Read."));
        },
        error => {
            dispatch({ 
                type: Reseller.RESELLER_API_CALL_ERROR,
                payload:error.message
            })
            dispatch(setCommonError(error.message))
        }
        );
    }
}
