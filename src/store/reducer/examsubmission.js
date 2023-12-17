import {examSubmissionActionTypes} from "../actions/examsubmission/actionTypes"
const EXAM_SUBMISSION_INITIAL_STATE = {

}
function examsubmission(state=EXAM_SUBMISSION_INITIAL_STATE, {type, payload}) {
    switch (type) {
        case examSubmissionActionTypes.EXAM_SUB_LIST_LOADING:
            return state;
        
        case examSubmissionActionTypes.EXAM_SUB_LIST_LOADED:
            return state;

        case examSubmissionActionTypes.EXAM_SUB_LIST_LOADING_ERROR:
            return state;

        case examSubmissionActionTypes.EXAM_SUB_LIST_MORE_LOADING:
            return state;

        case examSubmissionActionTypes.EXAM_SUB_LIST_MORE_LOADED:
            return state;

        case examSubmissionActionTypes.EXAM_SUB_LIST_MORE_LOADING_ERROR:
            return state;
            
    
        default:
            return state;
    }
}

export default examsubmission