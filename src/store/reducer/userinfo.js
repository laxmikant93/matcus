import { USERINFOTYPES, USER_INFO_LIST_AT } from "../actions/userinfo/actionType";

const USER_INFO_LIST_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        error: false
    },
    edit: {
        data: [],
        loading: false,
        error: false
    }
}

const userinfo = (state = USER_INFO_LIST_INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case USER_INFO_LIST_AT.USER_INFO_LIST: {

            return {

                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    success: true,
                }
            }
        }

        case USERINFOTYPES.GET_USER_INFO: {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    success: true,
                },
            };
        }


        case USER_INFO_LIST_AT.USER_INFO_EDIT: {
            return {

                ...state,
                edit: {
                    ...state.edit,
                    data: payload,
                    success: true,
                },

                list: {
                    ...state.list,

                    data: state.list.data.map(
                        (content) => content.id === payload.id ?
                            {
                                ...content,
                                useremail: payload.useremail,
                                fullname: payload.fullname,
                                contact: payload.contact,
                                dob: payload.dob,
                                gender: payload.gender,
                                fulladdress: payload.fulladdress,
                                about: payload.about,
                                profile_picture: payload.profile_picture,

                            } :
                            content
                    ),
                    success: true,
                }
            }
        }

        default:
            return state

    }
}

export default userinfo