import { findUsers, findMoreUsers } from "../../store/actions/instituteuserbyrole";
export const instituteUserByRoleMapStateToProp = state => {
    return {
        user:state.user,
        instituteUsers:state.instituteuserbyrole
    }
}


export const instituteUserByRoleMapDispatchToProp = dispatch => {
    return {
        loadinstituteusers:(instituteId, userType, limit)=> dispatch(findUsers(instituteId, userType, limit)),
        loadmoreinstituteusers:(instituteId, userType, limit, skip)=> dispatch(findMoreUsers(instituteId, userType, limit, skip)),
    }
}