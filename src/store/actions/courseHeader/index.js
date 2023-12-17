import { COURSEHEADERTYPES } from "./actionType";
import courseHeaderRequest from "./courseHeaderRequest";
import { setCommonError } from "../commonerror";
import Storage from "../../../Classes/Storage";
import { showSuccessPopup } from "../successmessagepopup";
export const readCoursesHeader = (_id) => {
  return (dispatch) => {
    dispatch({
      type: COURSEHEADERTYPES.COURSEHEADERLOADING,
      loading: true,
    });
    courseHeaderRequest.get(
      courseHeaderRequest.courseHeaderEndpoint.courseHeaderRead.replace("__ID__", _id),
      (success) => {
        dispatch({
          type: COURSEHEADERTYPES.COURSEHEADERREAD,
          payload: success.data,
        })
        if (success.data && success.data !== undefined) {
          Storage.setJson('heading', success.data)
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}


export const postCourseHeader = (data) => {
  return (dispatch) => {
    dispatch({
      type: COURSEHEADERTYPES.POSTCOURSELOADING,
      loading: true,
    });
    courseHeaderRequest.post(
      courseHeaderRequest.courseHeaderEndpoint.postCourseHeader,
      data,
      (success) => {
        dispatch({
          type: COURSEHEADERTYPES.COURSEHEADERPOST,
          payload: success.data
        })

      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}


export const updateCourseHeader = (_id, data) => {
  return (dispatch) => {
    courseHeaderRequest.patch(
      courseHeaderRequest.courseHeaderEndpoint.updateCourseHeader.replace("__Id__", _id),
      data,
      (success) => {
        dispatch({
          type: COURSEHEADERTYPES.COURSEHEADERUPDATE,
          payload: success.data
        })
        dispatch(showSuccessPopup(`"Classroom & Subject Heading Updated."`));
        if (success.data) {
          Storage.setJson('heading', success.data)
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}



export const resetCourseHeader = () => {
  return (dispatch) => {
    dispatch({
      type: COURSEHEADERTYPES.RESETCOURSEHEADER,
      payload: {}
    });
  }
}