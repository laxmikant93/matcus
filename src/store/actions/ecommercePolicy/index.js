import { Ecommerce } from "./actionType";
import ecommerceRequest from "./EcommerceRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";


//ECOMMERCE policy POST 

// export const postEcommercePolicy = (industry, data) => {
//   return (dispatch) => {
//     dispatch({
//       type: Ecommerce.CREATE_PRIVACY_POLICY_LOADING,
//       loading: true
//     });
//     ecommerceRequest.post(ecommerceRequest.AppointmentEndpoint.posteommercepolicy.replace("_TYPE_", industry), data,
//       (success) => {
//         dispatch({
//           type: Ecommerce.CREATE_PRIVACY_POLICY_SUCCESS,
//           payload: success.data
//         });
//         dispatch(showSuccessPopup("Fields Successfully created !"))
//       },
//       (error) => {
//         dispatch({
//           type: Ecommerce.CREATE_PRIVACY_POLICY_ERROR,
//           payload: []
//         })
//         dispatch(setCommonError(error.message))
//       }
//     )
//   }
// }
//ECOMMERCE policy GET

export const getEcommercePolicy = (business, institute) => {
  return (dispatch) => {
    dispatch({
      type: Ecommerce.GET_PRIVACY_POLICY_LOADING,
      loading: true
    });
    ecommerceRequest.get(ecommerceRequest.AppointmentEndpoint.geteommercepolicy.replace("_TYPE_", business).replace("BUSINESSID", institute),
      (success) => {
        dispatch({
          type: Ecommerce.GET_PRIVACY_POLICY_SUCCESS,
          payload: success.data
        })
      },
      (error) => {
        dispatch({
          type: Ecommerce.GET_PRIVACY_POLICY_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}
//ECOMMERCE POLICY EDIT

export const EditEcommercePolicy = (institute, policy, data) => {
  return (dispatch) => {
    dispatch({
      type: Ecommerce.UPDATE_PRIVACY_POLICY_LOADING,
      loading: true
    });
    ecommerceRequest.patch(ecommerceRequest.AppointmentEndpoint.editeommercepolicy.replace("_TYPE_", institute).replace("POLICYID", policy), data,
      (success) => {
        dispatch({
          type: Ecommerce.UPDATE_PRIVACY_POLICY_SUCCESS,
          payload: success.data
        })
        dispatch(showSuccessPopup("Updated Successfully"));
      },
      (error) => {
        dispatch({
          type: Ecommerce.UPDATE_PRIVACY_POLICY_ERROR
        })
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const EditEcommercePolicyReset = () => {
  return (dispatch) => {
    dispatch({
      type: Ecommerce.UPDATE_PRIVACY_POLICY_RESET
    })
  }
}

//ECOMMERCE POLICY DELETE 


