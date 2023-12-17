import { INS_ANN_ACTION_TYPES } from "../actions/instituteannouncement/actionTypes";

const INS_ANN_INSTIAL_STATES = {
    loading:true,
    data:[],
    skip:0,
    more:false,
    moreloading:false,
    total:0,
    annpopup:{
        show:false,
        detail:{}
    }
}

const instituteannouncement = (state=INS_ANN_INSTIAL_STATES, {type, payload}) => {
    switch (type) {
        case INS_ANN_ACTION_TYPES.INS_ANN_LOADING:
            return({ 
                ...state,
                loading:true,
                data:[],
                skip:0,
                more:false,
                total:0,
            })

        
        case INS_ANN_ACTION_TYPES.INS_ANN_LOADED:
            return({
                ...state,
                loading:false,
                data:payload.data,
                skip:payload.limit,
                more:(payload.total>payload.data.length && payload.data.length===payload.limit),
                total:payload.total,
            })

        
        case INS_ANN_ACTION_TYPES.INS_ANN_MORE_LOADING:
            return({
                ...state,
                moreloading:true,
            })

        
        case INS_ANN_ACTION_TYPES.INS_ANN_MORE_LOADED:
            let updatedAnn = state.data.concat(payload.data);
            return({
                ...state,
                moreloading:false,
                data:updatedAnn,
                skip:state.skip+payload.limit,
                more:(payload.total>updatedAnn.length && payload.data.length===payload.limit),
                total:payload.total,
            })

        case INS_ANN_ACTION_TYPES.INS_ANN_POPUP_OPEN:
            return({
                ...state,
                annpopup:{
                    ...state.annpopup,
                    show:true,
                    detail:state.data.find(annItem=>annItem._id===payload)
                }
            })
        
        case INS_ANN_ACTION_TYPES.INS_ANN_POPUP_CLOSE:
            return({
                ...state,
                annpopup:{
                    ...state.annpopup,
                    show:false,
                    detail:{}
                }
            })
        
        default:
            return state;
    }
}

export default instituteannouncement