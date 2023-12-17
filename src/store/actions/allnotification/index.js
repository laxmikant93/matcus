import { NOTIFICATION_ACTION_TYPES } from "./actionType";
import notificationsRequest from "./notificationsRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";


export const getbellIconNotifications = (id, type, institute, role) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_BELL_ICON_LOADING,
        });

        notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.getnotificationbellicon.replace("id", id).replace('_allow_', "allow").replace("_institute_", institute).replace("_role_", role).replace("_type_", type),
            (success) => {
                dispatch({
                    type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_BELL_ICON_LOADED,
                    payload: success.data
                })
            }, (error) => {
                dispatch(setCommonError(error.message))
            })
    }
}

export const updateBellIconNotification = (data) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_BELL_ICON_UPDATE,
            payload: data
        });
    }
}

export const reduceBellIconCount = (data) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_BELL_ICON_REDUCE_COUNT,
            payload: data
        })
    }
}

export const seenNotificationBellIcon = (id) => {
    let data = []
    return (dispatch) => {
        notificationsRequest.patch(notificationsRequest.AllnotificationEndpoint.seenNotifications.replace("id", id),data,
            (success) => {

            }, (error) => {
                
            })
    }
}

export const readNotificationBellIcon = (id, data) => {
    return (dispatch) => {
        notificationsRequest.patch(notificationsRequest.AllnotificationEndpoint.readNotifications.replace("id", id),
            data,
            (success) => {
            }, (error) => {
            })
    }
}

export const NotificationSearchPage = (id, search, type, orderby, orderunread, skip, limit, institute, role) => {
    return (dispatch) => {
        // dispatch({
        //     type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_SHOWALL_PAGE_LOADING,
        //     payload: []
        // });
        if (type === "Institute" || type === "Website") {
            notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.getinstituteNotification.replace("id",
                id).replace("_search", search).replace("_type", type).replace("_orderby", orderby).replace("_orderunread",
                    orderunread).replace("_institute", institute).replace("_role", role).replace("_skip", skip).replace("_limit", limit),
                (success) => {
                    dispatch({
                        type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_SHOWALL_PAGE_LOADED,
                        payload: success.data
                    });
                    // dispatch(showSuccessPopup("done notification"))
                }, (error) => {
                    dispatch(setCommonError(error.message))
                })
        }else if(type && type==="Community"){
            notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.communityNotification.replace("id",id).replace("_search_",search).replace("_skip_",skip).replace("_limit_",limit).replace("_orderby_",orderby).replace("_orderunread_",orderunread),
            (success)=>{
                dispatch({
                    type: NOTIFICATION_ACTION_TYPES.GET_ALL_NOTIFICATIONS_LOADED,
                    payload: success.data
                });
            }, (error) => {
                dispatch(setCommonError(error.message))
            })
        } else if (type && type==="Profile") {
            notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.getnotificationsearch.replace("id",
                id).replace("_search", search).replace("_type", type).replace("_orderby", orderby).replace("_orderunread",
                    orderunread).replace("_institute", institute).replace("_role", role).replace("_skip", skip).replace("_limit", limit),
                (success) => {
                    dispatch({
                        type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_SHOWALL_PAGE_LOADED,
                        payload: success.data
                    });
                    // dispatch(showSuccessPopup("done notification"))
                }, (error) => {
                    dispatch(setCommonError(error.message))
                })
        } else {
            notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.getallNotification.replace("id",
                id).replace("_search", search).replace("_type", type).replace("_orderby", orderby).replace("_orderunread",
                    orderunread).replace("_institute", institute).replace("_role", role).replace("_skip", skip).replace("_limit", limit),
                (success) => {
                    dispatch({
                        type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_SHOWALL_PAGE_LOADED,
                        payload: success.data
                    });
                    // dispatch(showSuccessPopup("done notification"))
                }, (error) => {
                    dispatch(setCommonError(error.message))
                })
        }
    }

}

export const GetAllNotification = (id, search, type, orderby, orderunread, skip, limit, institute, role) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTION_TYPES.GET_ALL_NOTIFICATIONS_LOADING,
            payload: []
        });
        if (type === "Institute" || type==="Website") {
            notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.getinstituteNotification.replace("id",
                id).replace("_search", search).replace("_type", type).replace("_orderby", orderby).replace("_orderunread",
                    orderunread).replace("_institute", institute).replace("_role", role).replace("_skip", skip).replace("_limit", limit),
                (success) => {
                    dispatch({
                        type: NOTIFICATION_ACTION_TYPES.GET_ALL_NOTIFICATIONS_LOADED,
                        payload: success.data
                    });
                    // dispatch(showSuccessPopup("done notification"))
                }, (error) => {
                    dispatch(setCommonError(error.message))
                })
        }else if(type && type==="Community"){
            notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.communityNotification.replace("id",id).replace("_search_",search).replace("_skip_",skip).replace("_limit_",limit).replace("_orderby_",orderby).replace("_orderunread_",orderunread),
            (success)=>{
                dispatch({
                    type: NOTIFICATION_ACTION_TYPES.GET_ALL_NOTIFICATIONS_LOADED,
                    payload: success.data
                });
            }, (error) => {
                dispatch(setCommonError(error.message))
            })
        }
         else if (type && type ==="Profile") {
            notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.getnotificationsearch.replace("id",
                id).replace("_search", search).replace("_type", type).replace("_orderby", orderby).replace("_orderunread",
                    orderunread).replace("_institute", institute).replace("_role", role).replace("_skip", skip).replace("_limit", limit),
                (success) => {
                    dispatch({
                        type: NOTIFICATION_ACTION_TYPES.GET_ALL_NOTIFICATIONS_LOADED,
                        payload: success.data
                    });
                    // dispatch(showSuccessPopup("done notification"))
                }, (error) => {
                    dispatch(setCommonError(error.message))
                })
        }
        else {
            notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.getallNotification.replace("id",
                id).replace("_search", search).replace("_type", type).replace("_orderby", orderby).replace("_orderunread",
                    orderunread).replace("_institute", institute).replace("_role", role).replace("_skip", skip).replace("_limit", limit),
                (success) => {
                    dispatch({
                        type: NOTIFICATION_ACTION_TYPES.GET_ALL_NOTIFICATIONS_LOADED,
                        payload: success.data
                    });
                    // dispatch(showSuccessPopup("done notification"))
                }, (error) => {
                    dispatch(setCommonError(error.message))
                })
        }

    }

}


export const CHangeBellType = (data) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTION_TYPES.CHANGE_BELL_ICON_TYPE,
            payload: data
        })
    }

}
export const recentNotification = (id, type, institute, role) => {
    return (dispatch) => {
        notificationsRequest.get(notificationsRequest.AllnotificationEndpoint.recentNotification.replace("id", id).replace('__TYPE__', type).replace("__INS__", institute).replace("__ROLE__", role),
            (success) => {
                dispatch({
                    type: NOTIFICATION_ACTION_TYPES.RECENT_NOTIFICATION,
                    payload: success.data
                })
            }, (error) => {
            })

    }
}