import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as errorAction from "../../store/actions/commonerror";
const CommonError = ({ graceReject }) => {
    const dispatch = useDispatch()

    const error = useSelector(state => state.commonerror)
    // const [isShowing, setIsShowing] = useState(false);

    const handleClose = () => {
        dispatch(errorAction.hideError())
    }

    useEffect(() => {
        if (error.show) {
            setTimeout(() => {
                dispatch(errorAction.hideError())
            }, 3000)
        }
    }, [dispatch, error])


    return error.show && <div className="alertPopupWrapper">
        <div className="alertPopupWrap">
            <div className="popupAlertBox error show">
                <div className="alertBody">
                    <div className="alertIcon"></div>
                    <div className="alertText">
                        <h4 className="text-sm w-300 red">{graceReject ? "Rejected" : "Error"}</h4>
                        <p className="text-xxs w-400 gray">{error.message}</p>
                    </div>
                </div>
                <span className="closeIconAlert text-xxs gray" onClick={handleClose}>Close</span>
            </div>
        </div>
    </div>
}

export default CommonError