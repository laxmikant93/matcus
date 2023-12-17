import { INS_GAL_ACTION_TYPES } from "../actions/institutegallery/actionTypes";

const INS_GAL_INSTIAL_STATES = {
    loading:true,
    data:[],
    skip:0,
    more:false,
    moreloading:false,
    total:0,
}

const institutegallery = (state=INS_GAL_INSTIAL_STATES, {type, payload}) => {

    switch (type) {
        case INS_GAL_ACTION_TYPES.INS_GAL_LOADING:
            return({
                ...state,
                loading:true,
                data:[],
                skip:0,
                more:false,
                total:0,
            })

        
        case INS_GAL_ACTION_TYPES.INS_GAL_LOADED:
            return({
                ...state,
                loading:false,
                data:payload.gallery,
            })

        
        case INS_GAL_ACTION_TYPES.INS_GAL_MORE_LOADING:
            return({
                ...state,
                moreloading:true,
            })

        
        case INS_GAL_ACTION_TYPES.INS_GAL_MORE_LOADED:
            let updatedGal = state.data.concat(payload.data);
            return({
                ...state,
                moreloading:false,
                data:updatedGal,
                skip:state.skip+payload.limit,
                more:(payload.total>updatedGal.length && payload.data.length===payload.limit),
                total:payload.total,
            })

        default:
            return state;
    }
}

export default institutegallery