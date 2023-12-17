import { Reseller } from "../actions/reseller/actionType";
const INITIAL_STATE = {
    list: {
        data: [],
        success: false,
        loading: false,
        error: false,
    },

}

const reseller = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case Reseller.RESELLER_API_CALL_LOADING:
            return {
                ...state,
                list: {
                    data: [],
                    success: false,
                    loading: true,
                    error: false,

                }

            }

        case Reseller.RESELLER_API_CALL_SUCCESS:
            return {
                ...state,
                list: {
                    data: payload,
                    success: true,
                    loading: false,
                    error: false,

                }

            }

        case Reseller.RESELLER_API_CALL_ERROR:
            return {
                ...state,
                list: {
                    data: [],
                    success: false,
                    loading: false,
                    error: true,

                }

            }
        default:
            return state
    }


}
export default reseller