import {examSubmissionActionTypes} from "./actionTypes";

export const submissionList = (limit=1, skip=0) => {
    return dispatch =>{
        dispatch({
            type:examSubmissionActionTypes.EXAM_SUB_LIST_LOADING,
            payload:{}
        })

        dispatch({
            type:examSubmissionActionTypes.EXAM_SUB_LIST_LOADED,
            payload:{}
        })

        dispatch({
            type:examSubmissionActionTypes.EXAM_SUB_LIST_LOADING_ERROR,
            payload:{}
        })
    }
}

export const submissionListMore = (limit, skip) => {
    return dispatch =>{
        dispatch({
            type:examSubmissionActionTypes.EXAM_SUB_LIST_MORE_LOADING,
            payload:{}
        })
        
        dispatch({
            type:examSubmissionActionTypes.EXAM_SUB_LIST_MORE_LOADED,
            payload:{}
        })
        
        dispatch({
            type:examSubmissionActionTypes.EXAM_SUB_LIST_MORE_LOADING_ERROR,
            payload:{}
        })
        
    }
}

