import { chooseOptionAT } from "../actions/chooseoption/actionTypes";

const chooseoption = (
    state = {
        option: ''
    },
    { type, payload }) => {

    switch (type) {
        case chooseOptionAT.SET_OPTION:
            return {
                option: payload.option
            }

        case chooseOptionAT.UNSET_OPTION:
            return {
                option: ''
            }

        default:
            return state
    }
}

export default chooseoption;