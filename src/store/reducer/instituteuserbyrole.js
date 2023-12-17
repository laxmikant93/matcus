import { insUserByRoleActionType } from "../actions/instituteuserbyrole/actionTypes";

const INS_USER_BY_ROLE_INITIAL_STATES = {
    loading:true,
    data:[],
    skip:0,
    more:false,
    moreloading:false,
    total:0,
}

const instituteuserbyrole = (state=INS_USER_BY_ROLE_INITIAL_STATES, {type, payload}) => {
    switch (type) {
        case insUserByRoleActionType.INS_USER_BY_ROLE_LOADING:
            return({
                ...state,
                loading:true,
                data:[],
                skip:0,
                more:false,
                total:0,
            })
        
        case insUserByRoleActionType.INS_USER_BY_ROLE_LOADED:
            return({
                ...state,
                loading:false,
                data:payload.data,
                skip:payload.limit,
                more:(payload.total>payload.data.length && payload.data.length===payload.limit),
                total:payload.total,
            })
        
        case insUserByRoleActionType.INS_USER_BY_ROLE_MORE_LOADING:
            return({
                ...state,
                moreloading:true,
            })
        
        case insUserByRoleActionType.INS_USER_BY_ROLE_MORE_LOADED:
            let updatedusers = state.data.concat(payload.data);
            return({
                ...state,
                moreloading:false,
                data:updatedusers,
                skip:state.skip+payload.limit,
                more:(payload.total>updatedusers.length && payload.data.length===payload.limit),
                total:payload.total,
            })
        
        default:
            return state;
    }
}

export default instituteuserbyrole;