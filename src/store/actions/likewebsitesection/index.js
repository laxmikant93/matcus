import {LIKE_INFO_LIST_AT} from "./actionType";
import likeRequest from "./likeRequest";
import {setCommonError} from "../commonerror"

export const getUserInfo = () => {
    return dispatch => {

        likeRequest.get(likeRequest.LikeEndpoint.LikeList, (success)=>{
            
            dispatch({ 
                type: LIKE_INFO_LIST_AT.LIKE_LIST,
                payload:success.data.data
            })
        },
        error => {
            dispatch(setCommonError(error.message))
        }
        );
    }
}

export const PostLike = () => {
    return dispatch => {

        likeRequest.get(likeRequest.LikeEndpoint.LikeList, (success)=>{
            
            dispatch({ 
                type: LIKE_INFO_LIST_AT.LIKE_LIST,
                payload:success.data.data
            })
        },
        error => {
            dispatch(setCommonError(error.message))
        }
        );
    }
}

