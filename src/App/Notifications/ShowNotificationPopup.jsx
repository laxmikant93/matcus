import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideNotificationMessage } from "../../store/actions/shownotificationpopup";

function ShowNotificationPopup() {
  const dispatch = useDispatch();
  const { showNotification } = useSelector((state) => {
    return {
      showNotification: state.shownotificationpopup,
    };
  });
  const CloseNotification = () => {
    dispatch(hideNotificationMessage());
  };
  useEffect(() => {
    setTimeout(() => {
      showNotification.showMessage && dispatch(hideNotificationMessage());
    }, 3000);
  }, [showNotification, dispatch]);
  return (
    showNotification.showMessage &&
    showNotification.message && (
      <>
        <div className="NotifyPopUpShow">
          <div className="notificationpopupshowwrapper">
            <p className="uppercase text-xxs primary w-400 pointercours">
              {showNotification.message.title}
            </p>
            <p className="text-2xs mt-8 gray w-400">
              {moment(showNotification.message.createdAt).fromNow()}
            </p>
            <hr className="mt-10" />
            <h4 className="mt-15 text-x w-400">{showNotification.message.desc}</h4>
            <button className="button btn-o-primary  btn-xs text-xxs mt-15 primary">
              View Details
            </button>
            <div
              className="crossnotifyshowpopup"
              onClick={() => CloseNotification()}
            >
              &#x2715;
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ShowNotificationPopup;
