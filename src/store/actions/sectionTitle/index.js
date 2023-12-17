import { setCommonError } from "../commonerror";
import { SECTIONTITLETYPES } from "./actionType";
import sectionTitleRequest from "./sectionTitleRequest";
import { showSuccessPopup } from "../successmessagepopup";
export const readSectionTitle = (_id, industry) => {
  return (dispatch) => {
    dispatch({
      type: SECTIONTITLETYPES.SECTIONTITLELOADING,
      loading: true,
    });
    sectionTitleRequest.get(
      sectionTitleRequest.sectionTitleEndpoint.sectionTitleRead.replace("__ID__", _id).replace("__INDUSTRY__", industry),
      (success) => {
        dispatch({
          type: SECTIONTITLETYPES.SECTIONTITLEREAD,
          payload: success.data.allSubHeaderInfo[0],
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}


export const updateSectionTitle = (data) => {
  return (dispatch) => {
    sectionTitleRequest.post(
      sectionTitleRequest.sectionTitleEndpoint.sectionTitleUpdate,
      data,
      (success) => {
        dispatch({
          type: SECTIONTITLETYPES.SECTIONTITLEUPDATE,
          data: success.data
        })
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const resetSectionTitle = () => {
  return (dispatch) => {
    dispatch({
      type: SECTIONTITLETYPES.RESETSECTIONTITLE,
      payload: {}
    });
  }
}