import { InsActionTypes } from "./actionTypes";
import INS_Request from "./InstituteRegisterRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { updateCreateInstituteInfo, updateDashboardStepper, updateUpdatedInstituteInfo, updateUserInstituteInfo } from "../user";
import Auth from "../../../Classes/Auth";

export const createInstitute = (data) => {
  return (dispatch) => {
    dispatch({ type: InsActionTypes.INS_CREATING, payload: "" });

    INS_Request.post(
      INS_Request.endpoint.create,
      data,
      (success) => {
        dispatch({
          type: InsActionTypes.INS_CREATED,
          payload: success.data,
        });

        dispatch(
          updateCreateInstituteInfo(
            success.data._id,
            success.data.institute_name
          )
        );
        dispatch(updateUpdatedInstituteInfo(success.data));
      },
      (errors) => {
        if (
          errors.hasOwnProperty("response") &&
          errors.response !== undefined
        ) {
          dispatch({
            type: InsActionTypes.INS_CREATE_ERROR,
            payload: errors.response.data.message,
          });
          dispatch(setCommonError(errors.response.data.message));
        } else {
          dispatch({
            type: InsActionTypes.INS_CREATE_ERROR,
            payload: errors.response.data.message,
          });
          dispatch(setCommonError(errors.message));
        }
      }
    );
  };
};

export const changeInstituteState = (state, status) => {
  return (dispatch) => {
    dispatch({
      type: InsActionTypes.INS_CREATE_CHANGE_STATE,
      payload: { state, status },
    });
  };
};

export const resetInstituteStates = () => {
  return (dispatch) =>
    dispatch({ type: InsActionTypes.INS_CREATE_RESET, payload: "" });
};

export const findInstituteInformation = (instituteId, industry) => {
  return (dispatch) => {
    dispatch({
      type: InsActionTypes.INS_INFORMATION_LOADING,
      payload: {},
    });
    if (industry === "Ecommerce" || industry === "Services") {
      INS_Request.get(
        INS_Request.endpoint.getBusinessInfoForEcommerce.replace("__id__", instituteId).replace("__TYPE__", industry),
        (success) => {
          dispatch({
            type: InsActionTypes.INS_INFORMATION_LOADED,
            payload: success.data.data,
          });
        },
        (error) => {
          dispatch({
            type: InsActionTypes.INS_INFORMATION_ERROR,
            payload: error.message ? error.message : "Error occured!!",
          });
          setCommonError(error.message);
        }
      );
    } else {
      INS_Request.get(
        INS_Request.endpoint.getBusinessInfoForEcommerce.replace("__id__", instituteId).replace("__TYPE__", industry),
        (success) => {
          dispatch({
            type: InsActionTypes.INS_INFORMATION_LOADED,
            payload: success.data.data,
          });
        },
        (error) => {
          dispatch({
            type: InsActionTypes.INS_INFORMATION_ERROR,
            payload: error.message ? error.message : "Error occured!!",
          });
          setCommonError(error.message);
        }
      );
    }

  };
};

export const updateInstituteInformation = (instituteId, data, meta, industry, stepper, user) => {
  return (dispatch) => {
    dispatch({
      type: InsActionTypes.INS_UPDATING,
      payload: { instituteId, data },
    });
    if (industry === "Ecommerce" || industry === "Services") {
      INS_Request.patch(
        INS_Request.endpoint.patchBusinessInfo.replace("__id__", instituteId).replace("__TYPE__", industry),
        data,
        (success) => {
          let stepperData = {
            addBuisnessDetails: true,
            condition: "EditProfile",
            industry: industry,
            institute: instituteId,
            business: instituteId,
            owner: user
          }
          INS_Request.post(
            INS_Request.endpoint.DashboardStepperUpdate,
            stepperData, (success) => {
              let steup = {
                ...stepper, addBuisnessDetails: true,
              }
              Auth.updateUserDetail("user_dashboard_stepper", steup);
              // dispatch(
              //   updateCreateInstituteInfo(
              //     success.data.resp._id,
              //     success.data.resp.institute_name
              //   )
              // );
              dispatch(updateDashboardStepper(steup))
            }, (error) => {

            })
          if (meta === "meta") {
            dispatch(showSuccessPopup("Meta-data updated successfully."));
          } else if (meta === "social") {
            dispatch(showSuccessPopup("Social Links updated successfully."));
          } else if (meta === "support") {
            dispatch(showSuccessPopup("Support number updated successfully."));
          } else {

            dispatch(showSuccessPopup("Institue Information updated."));
          }
          let data = {
            institute_name:success.data.resp.business_name,
            institute_address:success.data.resp.business_address,
          }
          dispatch(updateUpdatedInstituteInfo(data));
          dispatch(updateUserInstituteInfo(success.data.resp.business_subdomain,success.data.resp.isOld));

          dispatch({
            type: InsActionTypes.INS_UPDATED,
            payload: success.data,
          });
        },
        (error) => {
          dispatch({
            type: InsActionTypes.INS_UPDATE_ERROR,
            payload: error.message ? error.message : "Error occured!!",
          });

          setCommonError(error.message);
        }
      );
    } else {
      INS_Request.patch(
        INS_Request.endpoint.patchInstituteInfo.replace("__id__", instituteId),
        data,
        (success) => {
          let stepperData = {
            addBuisnessDetails: true,
            condition: "EditProfile",
            industry: industry,
            institute: instituteId,
            business: instituteId,
            owner: user
          }
          INS_Request.post(
            INS_Request.endpoint.DashboardStepperUpdate,
            stepperData, (success) => {
              let steup = {
                ...stepper, addBuisnessDetails: true,
              }
              Auth.updateUserDetail("user_dashboard_stepper", steup);
              dispatch(updateDashboardStepper(steup))
              
            }, (error) => {

            })
          if (meta === "meta") {
            dispatch(showSuccessPopup("Meta-data updated successfully."));
          } else if (meta === "social") {
            dispatch(showSuccessPopup("Social Links updated successfully."));
          } else if (meta === "support") {
            dispatch(showSuccessPopup("Support number updated successfully."));
          } else {

            dispatch(showSuccessPopup("Institue Information updated."));
          }
          dispatch(updateUpdatedInstituteInfo(success.data.resp));
          dispatch({
            type: InsActionTypes.INS_UPDATED,
            payload: success.data,
          });
          dispatch(updateUpdatedInstituteInfo(success.data.resp));
          dispatch(updateUserInstituteInfo(success.data.resp.institute_subdomain,success.data.resp.isOld));
        },
        (error) => {
          dispatch({
            type: InsActionTypes.INS_UPDATE_ERROR,
            payload: error.message ? error.message : "Error occured!!",
          });

          setCommonError(error.message);
        }
      );
    }
  };
};


export const resetManageInstituteInfo = () => {
  return (dispatch) => dispatch({
    type: InsActionTypes.INS_RESET_INFORMATION,
    payload: {}
  })
}