import SHOW_NOTIFICATION_POPUP from "../actions/shownotificationpopup/actionType"
const INITIAL_NOTIFICATION_STATES = {
    showMessage: false,
    message:{
        title:"",
        time:"",
        description:"",
        url:""
    }
}

const shownotificationpopup = (state = INITIAL_NOTIFICATION_STATES, { type, payload }) => {

    switch (type) {
        case SHOW_NOTIFICATION_POPUP.SET_MESSAGE:
            return {
                showMessage: true,
                message: {
                    type:payload.type,
                    title:payload.title,
                    time:payload.time,
                    description:payload.description,
                    url:payload.url
                }
            }

        case SHOW_NOTIFICATION_POPUP.HIDE_MESSAGE:
            return {
                showMessage: false,
                message:INITIAL_NOTIFICATION_STATES.message
            }
        default:
            return state;
    }
}

export default shownotificationpopup;