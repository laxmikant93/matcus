import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as successPopupAction from "../../store/actions/successmessagepopup";

function SuccessMessagePopup({ EcomSuccess }) {

    const dispatch = useDispatch();
    const success = useSelector(state => state.successmessagepopup)

    const handleClose = useCallback(() => {
        dispatch(successPopupAction.hideSuccessPopup())
    }, [dispatch])

    useEffect(() => {
        if (success.show) {
            setTimeout(handleClose, 3000)
        }
    }, [success, handleClose])

    return success.show && <div className="alertPopupWrapper">
        <div className={`alertPopupWrap ${EcomSuccess === "Ecommerce" ? "successPopup" : ""}`}>
            {
                EcomSuccess === "Ecommerce" ?
                    (
                        <div className="SuccessAlertBox show">
                            <div className="SuccessBody">
                                <div className="SuccessIcon"></div>
                                <div className="SuccessText">
                                    <p className="text-xxs w-400 base">{success.message}</p>
                                </div>
                            </div>
                            <span className="closeIconAlert text-xxs gray" onClick={handleClose}>Close</span>
                        </div>) :
                    (<div className="popupAlertBox success show">
                        <div className="alertBody">
                            <div className="alertIcon"></div>
                            <div className="alertText">
                                <h4 className="text-sm w-300">Success</h4>
                                <p className="text-xxs w-400 gray">{success.message}</p>
                            </div>
                        </div>
                        <span className="closeIconAlert text-xxs gray" onClick={handleClose}>Close</span>
                    </div>)
            }
        </div>
    </div>
}

export default SuccessMessagePopup;