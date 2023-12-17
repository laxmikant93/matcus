import { setCommonError } from "../commonerror";
import { EDNEEDYOUTUBETYPES } from "./actionTypes";
import EdneedYoutubeRequest from "./EdneedYoutubeRequest";

export const readAllYoutubeVideos = () => {
  return (dispatch) => {
    dispatch({
      type: EDNEEDYOUTUBETYPES.GETALLYOUTUBEVIDEOSLOADING,
      loading: true,
    });
    EdneedYoutubeRequest.get(
      EdneedYoutubeRequest.edneedYoutubeEndpoint.getAllYoutubeVideos,
      (success) => {
        dispatch({
          type: EDNEEDYOUTUBETYPES.GETALLYOUTUBEVIDEOS,
          payload: success.data,
        })

      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const sortYoutubeVideos = (userType) => {
  return (dispatch) => {
    dispatch({
      type: EDNEEDYOUTUBETYPES.GETALLYOUTUBEVIDEOSLOADING,
      loading: true,
    });
    EdneedYoutubeRequest.get(
      EdneedYoutubeRequest.edneedYoutubeEndpoint.sortUserType.replace(
        "__USERTYPE__",
        userType
      ),
      (success) => {
        dispatch({
          type: EDNEEDYOUTUBETYPES.SORTYOUTUBEVIDEOS,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};


export const getAllVideos = (videoName) => {
  return (dispatch) => {
    dispatch({
      type: EDNEEDYOUTUBETYPES.GET_VIDEOS_LOADED,
      payload: [],
    });
    EdneedYoutubeRequest.get(
      EdneedYoutubeRequest.edneedYoutubeEndpoint.getStaticVideos.replace("__VIDEONAME__", videoName),
      (success) => {
        dispatch({
          type: EDNEEDYOUTUBETYPES.GET_VIDEOS_LOADED,
          payload: success.data,
        })

      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}