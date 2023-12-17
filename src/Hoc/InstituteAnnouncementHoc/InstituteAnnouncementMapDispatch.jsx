import { findAnnouncement, findAnnouncementMore, openAnnPopup } from "../../store/actions/instituteannouncement";
export const INS_ANN_MAP_STATE_TO_PROPS = state => {
    return {
        user: state.user,
        instituteannouncement: state.instituteannouncement
    }
}


export const INS_ANN_MAP_DISPATCH_TO_PROPS = dispatch => {
    return {
        loadannouncement: instititeId => dispatch(findAnnouncement(instititeId)),
        loadannouncementmore: (instititeId, limit, skip) => dispatch(findAnnouncementMore(instititeId, limit, skip)),
        showAnnPopup: annId => dispatch(openAnnPopup(annId))
    }
}