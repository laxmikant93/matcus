import { insUserByRoleActionType } from "./actionTypes";
import InstituteUserByRoleRequest from "./InstituteUserByRoleRequest";
import { setCommonError } from "../commonerror";
export const findUsers = (instituteId, userType, limit=12, skip=0) => {
    return dispatch => {
        dispatch({
            type:insUserByRoleActionType.INS_USER_BY_ROLE_LOADING,
            payload:{}
        })

        InstituteUserByRoleRequest.get(
            InstituteUserByRoleRequest.instituteUsersEndpoints.find.replace("__INSTITUTE__", instituteId).replace("__USERTYPE__", userType).concat(`&$limit=${limit}&$skip=${skip}`),
            (success)=>{
                dispatch({
                    type:insUserByRoleActionType.INS_USER_BY_ROLE_LOADED,
                    payload:success.data
                })
            },
            error=>{
                dispatch(setCommonError(error.message))
            }
        )
    }
}


export const findMoreUsers = (instituteId, userType, limit, skip) => {
    return dispatch => {
        dispatch({
            type:insUserByRoleActionType.INS_USER_BY_ROLE_MORE_LOADING,
            payload:{}
        })

        InstituteUserByRoleRequest.get(
            InstituteUserByRoleRequest.instituteUsersEndpoints.find.replace("__INSTITUTE__", instituteId).replace("__USERTYPE__", userType).concat(`&$limit=${limit}&$skip=${skip}`),
            (success)=>{
                dispatch({
                    type:insUserByRoleActionType.INS_USER_BY_ROLE_MORE_LOADED,
                    payload:success.data
                })
            },
            error=>{
                dispatch(setCommonError(error.message))
            }
        )
    }
}
