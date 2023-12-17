import {INSTITUTE_WEBSITE_LIST_AT} from "./actionType";
import websiteRequest from "./websiteRequest";
import {setCommonError} from "../commonerror"

export const getInstituteWbsiteData = (subdomain) => {
    return dispatch => {
    
        websiteRequest.get(websiteRequest.WebsiteEndpoint.Institute.replace("__SUBDOMAIN__",subdomain), (success)=>{
            
            dispatch({ 
                type: INSTITUTE_WEBSITE_LIST_AT.INSTITUTE_WEBSITE_LIST_,
                payload:success.data
            })
        
        },
        error => {
            dispatch(setCommonError(error.message))
        }
        );
    }
}


// export const getInstituteDataSubdomain = (id) => {
//     return dispatch => {
    
//         websiteRequest.get(websiteRequest.WebsiteEndpoint.Institute.replace("__ID__",id), (success)=>{
            
//             dispatch({ 
//                 type: INSTITUTE_WEBSITE_LIST_AT.INSTITUTE_WEBSITE_LIST_,
//                 payload:success.data
//             })
        
//         },
//         error => {
//             dispatch(setCommonError(error.message))
//         }
//         );
//     }
// }

