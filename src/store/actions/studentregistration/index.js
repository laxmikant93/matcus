import { studentRegActionType } from "./actionTypes";
import StudentRegistrationRequest from "./StudentRegistrationRequest";
export default verifytoken = vtoken => {

    return dispatch => {

        dispatch({
            type: studentRegActionType.STD_TOKEN_LOADING,
            payload: ""
        })

        StudentRegistrationRequest.get(
            StudentRegistrationRequest.studentReqEndpoint.verifytoken.replace('__invitation_id__', vtoken),
            success => {
                if (success.total === 1) {



                }
                else {

                }

            },
            error => {

            }
        )

    }
}