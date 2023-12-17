import { MULTI_SELECT_DROPDOWN_AT } from "./actionType";

export const addSelectedEntry = (id) => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.ADD_SELECTED_ENTRY,
      payload: id
    })

  }
}
export const addSelectedEntrySwitch = (id) => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.ADD_SELECTED_ENTRY_SWITCH,
      payload: id
    })

  }
}
export const removeSelectedEntry = (id) => {
 
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.REMOVE_SELECTED_ENTRY,
      payload: id
    })

  }
}
export const removeSelectedEntrySwitch = (id) => {
 
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.REMOVE_SELECTED_ENTRY_SWITCH,
      payload: id
    })

  }
}
export const resetAllEntry = () => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.RESET_SELECTED_ENTRY,
      payload: []
    })

  }
}
export const resetAllEntrySwitch = () => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.RESET_SELECTED_ENTRY_SWITCH,
      payload: []
    })

  }
}
export const AllEntrySelected = (data) => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.ALL_ENTRY_SELECTED,
      payload: data
    })

  }
}
export const AllEntrySelectedSwitch = (data) => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.ALL_ENTRY_SELECTED_SWITCH,
      payload: data
    })

  }
}








export const addSelectedEntryStudents = (id) => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.ADD_SELECTED_ENTRY_STUDENTS,
      payload: id
    })

  }
}
export const addSelectedEntrySwitchStudents = (id) => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.ADD_SELECTED_ENTRY_SWITCH_STUDENTS,
      payload: id
    })

  }
}
export const removeSelectedEntryStudents = (id) => {
 
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.REMOVE_SELECTED_ENTRY_STUDENTS,
      payload: id
    })

  }
}
export const removeSelectedEntrySwitchStudents = (id) => {
  
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.REMOVE_SELECTED_ENTRY_SWITCH_STUDENTS,
      payload: id
    })

  }
}
export const resetAllEntryStudents = () => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.RESET_SELECTED_ENTRY_STUDENTS,
      payload: []
    })

  }
}
export const resetAllEntrySwitchStudents = () => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.RESET_SELECTED_ENTRY_SWITCH_STUDENTS,
      payload: []
    })

  }
}
export const AllEntrySelectedStudents = (data) => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.ALL_ENTRY_SELECTED_STUDENTS,
      payload: data
    })

  }
}
export const AllEntrySelectedSwitchStudents = (data) => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.ALL_ENTRY_SELECTED_SWITCH_STUDENTS,
      payload: data
    })

  }
}

export const resetMultiSelect = () => {
  return dispatch => {

    dispatch({
      type: MULTI_SELECT_DROPDOWN_AT.RESET_MULTI_SELECT,
      payload: []
    })

  }
}