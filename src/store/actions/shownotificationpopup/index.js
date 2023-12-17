import SHOW_NOTIFICATION_POPUP from "./actionType"

export const showNotificationMessage = (data) => {

  return (dispatch) => {
    dispatch({
      type: SHOW_NOTIFICATION_POPUP.SET_MESSAGE,
      payload: data
    })
  }
}

export const hideNotificationMessage = (data) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_NOTIFICATION_POPUP.HIDE_MESSAGE,
      payload: data
    })
  }
}