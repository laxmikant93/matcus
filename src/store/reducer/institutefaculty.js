import { INS_FACULTY_ACTION_TYPES } from "../actions/institutefaculty/actionTypes";
const INITIAL_INS_FACULTYLIST = {
  loading: false,
  data: [],
  total: 0,
  skip: 0,
  more: false,
  moreloading: false
}

function institutefaculty(state = INITIAL_INS_FACULTYLIST, { type, payload }) {
  switch (type) {
    case INS_FACULTY_ACTION_TYPES.INS_FAC_LIST_LOADING:
      return ({
        ...state,
        loading: true,
        data: [],
        more: false,
        total: 0,
        skip: 0,
        moreloading: false
      })

    case INS_FACULTY_ACTION_TYPES.INS_FAC_LIST_LOADED:
      return ({
        ...state,
        loading: false,
        data: payload,
        total: "",
        skip: "",
        more: ""
      })


    case INS_FACULTY_ACTION_TYPES.INS_FAC_MORELIST_LOADING:
      return ({
        ...state,
        moreloading: true,
      })

    case INS_FACULTY_ACTION_TYPES.INS_FAC_MORELIST_LOADED:
      let updatedFacList = state.data.concat(payload.data);
      return ({
        ...state,
        moreloading: false,
        data: updatedFacList,
        total: payload.total,
        skip: state.skip + payload.limit,
        more: (payload.total > updatedFacList.length && payload.data.length === payload.limit),
      })

    case INS_FACULTY_ACTION_TYPES.INS_FAC_LIST_RESET:
      return (INITIAL_INS_FACULTYLIST)

    default:
      return state
  }
}

export default institutefaculty