import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { hideZoomPopup } from "../../../../store/actions/zoomApi";

function ZoomVerificationPopup() {
  const dispatch = useDispatch();
  const zoomApiState = useSelector((state) => state.zoomapi);

  return (
    <div
      className={`modal modalShowing-${zoomApiState.data?.zoomInfoAvailable === false
        }`}
    >
      <div className="modalwrapper">
        <div className="modalbody">
          <div className="row mt-20">
            <div className="col-xs-12 text-center">
              <h3 className="dgray text-xxs w-400">
                To enable online classes kindly approve the request sent by Zoom
                on your registered email and then try again after a few minutes.
              </h3>
              <p className="mt-15 gray">
                Don't worry, this is only a one time process.
              </p>
            </div>
          </div>
        </div>
        <div className="modalFooter">
          <div className="row">
            <div className="col-xs-12">
              <button
                to=""
                className="button btn-md button-theme"
                onClick={() => dispatch(hideZoomPopup())}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZoomVerificationPopup;
