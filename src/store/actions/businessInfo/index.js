import Auth from "../../../Classes/Auth";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { updateDashboardStepper, updateUpdatedInstituteInfo, updateUserInstituteInfo } from "../user";
import { userActionType } from "../user/actionTypes";
import { BUSINESS_INFO } from "./actionTypes";
import businessRequest from "./businessRequest";
import INS_Request from "../instituteregistration/InstituteRegisterRequest";
import { ProductActionTypes } from "../ecommerce/type/product";
import { WEBSITE_TEMPLATE_TYPES } from "../WebsiteTemplate/actionTypes";

export const getInstituteData = (_id, industry) => {
  return dispatch => {
    dispatch({
      type: BUSINESS_INFO.GET_INSTITUTE_DATA_LOADING,
      payload: []
    })
    businessRequest.get(businessRequest.business_endpoint.getInstituteData.replace("__BUSINESS_ID__", _id).replace("__TYPE__", industry), (success) => {
      dispatch({
        type: BUSINESS_INFO.GET_INSTITUTE_DATA_LOADED,
        payload: success.data.data
      })
      // dispatch(showSuccessPopup('Successfully..!!'));
    },
      error => {
        dispatch(setCommonError(error.message))
      }
    );
  }
}
export const getInstituteDataReset = () => {
  return dispatch => {

    dispatch({
      type: BUSINESS_INFO.GET_INSTITUTE_DATA_RESET,
    })
  }
}

export const getBusinessCategoryList = () => {
  return dispatch => {
    dispatch({
      type: BUSINESS_INFO.GET_BUSINESS_CATEGORY_LOADING,
      payload: []
    })
    businessRequest.get(businessRequest.business_endpoint.getBusinessCategory, (success) => {
      dispatch({
        type: BUSINESS_INFO.GET_BUSINESS_CATEGORY_LOADED,
        payload: success.data.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))
      }
    );
  }
}
export const getBusinessCategoryListReset = () => {
  return dispatch => {

    dispatch({
      type: BUSINESS_INFO.GET_BUSINESS_CATEGORY_RESET,
    })
  }
}

export const patchInstituteInfo = (id, data, industry, user, stepper, categoryCheck, paymentFlow, hidePopup) => {
  return dispatch => {
    dispatch({
      type: BUSINESS_INFO.PATCH_INSTITUTE_INFO_EDIT_LOADING,
      loading: true,
    })
    businessRequest.patch(businessRequest.business_endpoint.patchInstituteInfo.replace("__BUSINESS_ID__", id).replace("__TYPE__", industry), data,
      (success) => {
        dispatch({
          type: BUSINESS_INFO.PATCH_INSTITUTE_INFO_EDIT_LOADED,
          payload: success.data
        })
        if (paymentFlow) {
          Auth.updateUserDetail(
            "user_razorpay_id",
            success.data.resp.razorpay_acount_id
          );
          dispatch({
            type: userActionType.SET_INSTITUTE_INFORMATION,
            payload: {
              user_razorpay_id: success.data.resp.razorpay_acount_id,

            },
          });
        }

        Auth.updateUserDetail(
          "user_business_business_shop_category",
          success.data.resp.business_shop_category
        );
        dispatch({
          type: userActionType.SET_INSTITUTE_INFORMATION,
          payload: {
            user_business_business_shop_category: success.data.resp.business_shop_category,
          },
        });
        let data = {
          institute_name:success.data.resp.business_name,
          institute_address:success.data.resp.business_address,
        }
        dispatch(updateUpdatedInstituteInfo(data));
        dispatch(updateUserInstituteInfo(success.data.resp.business_subdomain,success.data.resp.isOld));
        if (categoryCheck) {
          dispatch(showSuccessPopup("Updated Successfully.."));
        }
        if (hidePopup) {
          // dispatch(showSuccessPopup("Business Information Updated"));
        }
        else {
          dispatch(showSuccessPopup("Business Information Updated"));
        }
        if (user) {
          let stepperData = {
            addBuisnessDetails: true,
            condition: "EditProfile",
            industry: industry,
            institute: id,
            business: id,
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
        }

      },
      error => {
        dispatch(setCommonError(error.message))
      }

    )
  }
}
export const patchInstituteDataReset = () => {
  return dispatch => {

    dispatch({
      type: BUSINESS_INFO.PATCH_INSTITUTE_INFO_EDIT_RESET,
    })
  }
}

export const getEcomWebsite = (type, domain) => {
  return dispatch => {
    dispatch({
      type: BUSINESS_INFO.GET_ECOM_WEBSITE_LOADING,
      payload: []
    })
    businessRequest.get(businessRequest.business_endpoint.ecomWebsite.replace("__TYPE__", type).replace("__VALUE__", domain), (success) => {
      dispatch({
        type: BUSINESS_INFO.GET_ECOM_WEBSITE_LOADED,
        payload: success.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))
      }
    );
  }
}
export const getEcomWebsiteTemplate = (data, type, query, domain) => {
  return dispatch => {
    dispatch({
      type: BUSINESS_INFO.GET_ECOM_WEBSITE_LOADED,
      payload: data
    })
    if (type === "noNeedHome") {
      businessRequest.post(
        businessRequest.business_endpoint.getShopProduct
          .replace("_ID_", data._id)
          .replace("_searchValue_", ""), { limit: 12, skip: (1 - 1) * 10 },
        (success) => {
          dispatch({
            type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_SUCCESS,
            payload: success.data.data,
          });
        },
        (error) => {
          dispatch({ type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_FAIL, payload: error.response.data.message });
        }
      )
    } else {
      businessRequest.post(
        businessRequest.business_endpoint.getShopProduct
          .replace("_ID_", data._id)
          .replace("_searchValue_", ""), { limit: 12, skip: (1 - 1) * 10 },
        (success) => {
          dispatch({
            type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_SUCCESS,
            payload: success.data.data,
          });
        },
        (error) => {
          dispatch({ type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_FAIL, payload: error.response.data.message });
        }
      )
      businessRequest.get(businessRequest.business_endpoint.homeProductData.replace("__QUERY__", query).replace("__DOMAIN__", domain),
        (success) => {
          dispatch({
            type: ProductActionTypes.HOME_PRODUCTS_SUCCESS,
            payload: success.data.data,
          });
          dispatch({
            type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_CHECK,
            payload: success.data,
          });
        }, (error) => {

        })

    }

  }
}

export const postSMTPTestMail = (data) => {
  return dispatch => {
    dispatch({
      type: BUSINESS_INFO.POST_SMTP_TEST_MAIL_LOADING,
      payload: []
    })
    businessRequest.post(businessRequest.business_endpoint.smtpTestMail, data,
      (success) => {
        dispatch({
          type: BUSINESS_INFO.POST_SMTP_TEST_MAIL_LOADED,
          payload: success.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const postSMTPTestMailReset = () => {
  return dispatch => {
    dispatch({
      type: BUSINESS_INFO.POST_SMTP_TEST_MAIL_RESET,
      payload: []
    })
  }
}