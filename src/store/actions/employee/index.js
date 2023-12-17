import { setCommonError } from "../commonerror";
import { EMPLOYEETYPES } from "./actionTypes";
import EmployeeRequest from "./EmployeeRequest";

export const getEmployeeList = (_id, kind) => {
  return (dispatch) => {
    dispatch({
      type: EMPLOYEETYPES.EMPLOYEE_LIST_LOADING,
      loading: true,
    });
    EmployeeRequest.get(
      EmployeeRequest.employeeEndpoint.employeeList.replace("__INSID__", _id).replace("__KIND__", kind),
      (success) => {
        dispatch({
          type: EMPLOYEETYPES.EMPLOYEE_LIST_SUCCESS,
          payload: success.data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}

export const resetEmployeeList = () => {
  return (dispatch) => {
    dispatch({
      type: EMPLOYEETYPES.EMPLOYEE_LIST_RESET
    })
  }
}

export const deleteEmployee = (_id) => {
  return (dispatch) => {
    dispatch({
      type: EMPLOYEETYPES.DELETE_EMPLOYEE_LOADING
    })
    EmployeeRequest.patch(EmployeeRequest.employeeEndpoint.deleteEmployee.replace('__ID__', _id), {},
      (success) => {
        dispatch({
          type: EMPLOYEETYPES.DELETE_EMPLOYEE_LOADED,
          payload: success.data.id
        })
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}