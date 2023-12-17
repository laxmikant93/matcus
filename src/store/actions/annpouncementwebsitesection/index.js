import {ANNOUNCEMENT_WEBSITE_SECTION_LIST_AT} from "./actionType";
import AnnouncementWebsiteRequest from "./AnnouncementWebsiteRequest";
import {setCommonError} from "../commonerror"

export const getAnnouncementWebsiteData = (_id) => {
    return dispatch => {
        // dispatch({ 
        //         type: ANNOUNCEMENT_WEBSITE_SECTION_LIST_AT.ANNOUNCEMENT_WEBSITE_LIST,
        //         payload:{}
        // })

        AnnouncementWebsiteRequest.get(AnnouncementWebsiteRequest.AnnouncementWebsiteListEndpoint.AnnouncementWebsiteList.replace("__ID__",_id), (success)=>{
                                                                                                                                              
            dispatch({ 
                type: ANNOUNCEMENT_WEBSITE_SECTION_LIST_AT.ANNOUNCEMENT_WEBSITE_LIST,
                payload:success.data.data
            })
        },
        error => {
            dispatch(setCommonError(error.message))
        }
        );
    }
}

