import { MULTI_SELECT_DROPDOWN_AT } from "../actions/MultiSelectDropDown/actionType";

const MULTI_SELECT_DROPDOWN_INITIAL_STATE = {
  selectedData: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  selectedDataSwitch: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  selectedDataStudents: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  selectedDataSwitchStudents: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
}

const multiselectdropdown = (state = MULTI_SELECT_DROPDOWN_INITIAL_STATE, { type, payload }) => {
  switch (type) {

    case MULTI_SELECT_DROPDOWN_AT.ADD_SELECTED_ENTRY: {

      return {
        ...state,
        selectedData: {
          ...state.selectedData,
          data: state.selectedData.data.concat(payload),
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.REMOVE_SELECTED_ENTRY: {
      return {
        ...state,
        selectedData: {
          ...state.selectedData,
          data: state.selectedData.data.filter(function (item) {
            return item !== payload
          }),
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.RESET_SELECTED_ENTRY: {

      return {
        ...state,
        selectedData: {
          ...state.selectedData,
          data: [],
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.ALL_ENTRY_SELECTED: {

      return {
        ...state,
        selectedData: {
          ...state.selectedData,
          data: payload,
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.ADD_SELECTED_ENTRY_SWITCH: {

      return {
        ...state,
        selectedDataSwitch: {
          ...state.selectedDataSwitch,
          data: state.selectedDataSwitch.data.concat(payload),
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.REMOVE_SELECTED_ENTRY_SWITCH: {
      return {
        ...state,
        selectedDataSwitch: {
          ...state.selectedDataSwitch,
          data: state.selectedDataSwitch.data.filter(function (item) {
            return item !== payload
          }),
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.RESET_SELECTED_ENTRY_SWITCH: {

      return {
        ...state,
        selectedDataSwitch: {
          ...state.selectedDataSwitch,
          data: [],
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.ALL_ENTRY_SELECTED_SWITCH: {

      return {
        ...state,
        selectedDataSwitch: {
          ...state.selectedDataSwitch,
          data: payload,
        }
      }
    }


    // assign to by ankii

    case MULTI_SELECT_DROPDOWN_AT.ADD_SELECTED_ENTRY_STUDENTS: {

      return {
        ...state,
        selectedDataStudents: {
          ...state.selectedDataStudents,
          data: state.selectedDataStudents.data.concat(payload),
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.REMOVE_SELECTED_ENTRY_STUDENTS: {
      return {
        ...state,
        selectedDataStudents: {
          ...state.selectedDataStudents,
          data: state.selectedDataStudents.data.filter(function (item) {
            return item !== payload
          }),
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.RESET_SELECTED_ENTRY_STUDENTS: {

      return {
        ...state,
        selectedDataStudents: {
          ...state.selectedDataStudents,
          data: [],
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.ALL_ENTRY_SELECTED_STUDENTS: {

      return {
        ...state,
        selectedDataStudents: {
          ...state.selectedDataStudents,
          data: payload,
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.ADD_SELECTED_ENTRY_SWITCH_STUDENTS: {

      return {
        ...state,
        selectedDataSwitchStudents: {
          ...state.selectedDataSwitchStudents,
          data: state.selectedDataSwitchStudents.data.concat(payload),
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.REMOVE_SELECTED_ENTRY_SWITCH_STUDENTS: {
      return {
        ...state,
        selectedDataSwitchStudents: {
          ...state.selectedDataSwitchStudents,
          data: state.selectedDataSwitchStudents.data.filter(function (item) {
            return item !== payload
          }),
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.RESET_SELECTED_ENTRY_SWITCH_STUDENTS: {

      return {
        ...state,
        selectedDataSwitchStudents: {
          ...state.selectedDataSwitchStudents,
          data: [],
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.ALL_ENTRY_SELECTED_SWITCH_STUDENTS: {

      return {
        ...state,
        selectedDataSwitchStudents: {
          ...state.selectedDataSwitchStudents,
          data: payload,
        }
      }
    }
    case MULTI_SELECT_DROPDOWN_AT.RESET_MULTI_SELECT:

      return MULTI_SELECT_DROPDOWN_INITIAL_STATE

    default:
      return state
  }
}

export default multiselectdropdown;