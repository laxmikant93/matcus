
import Request from "../../../Classes/Request";

class NotificationRequest extends Request {
    constructor() {
        super()
        this.AllnotificationEndpoint = {
            getNotification: super.url('/notifications/id'),
            getnotificationBytypes: super.url("/notifications/type/id","commonservices"),
            getnotificationsearch: super.url("/notifications/search/id?search=_search&type=_type&orderby=_orderby&orderunread=_orderunread&institute=_institute&role=_role&skip=_skip&limit=_limit","commonservices"),
            getnotificationbellicon: super.url("/notifications/bellicon/id?allow=_allow_&institute=_institute_&role=_role_&type=_type_", "commonservices"),
            seenNotifications: super.url("/notifications/seen/id","commonservices"),
            readNotifications: super.url("/notifications/read/id","commonservices"),
            getinstituteNotification: super.url("/notifications/institute/id?search=_search&type=_type&orderby=_orderby&orderunread=_orderunread&institute=_institute&role=_role&skip=_skip&limit=_limit","commonservices"),
            getallNotification: super.url("/notifications/All/id?search=_search&type=_type&orderby=_orderby&orderunread=_orderunread&institute=_institute&role=_role&skip=_skip&limit=_limit","commonservices"),
            recentNotification: super.url("/notifications/recentNotification/id?type=__TYPE__&insititute=__INS__&role=__ROLE__","commonservices"),
            communityNotification: super.url("/notifications/community/id?search=_search_&orderby=_orderby_&orderunread=_orderunread_&skip=_skip_&limit=_limit_","commonservices"),
        }
    }

}

export default new NotificationRequest();
