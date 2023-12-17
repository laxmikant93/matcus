import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import firebase from 'firebase/app'/
import 'firebase/messaging'
import { messaging } from '../../../../firebase/messaginInit';
import { subscriberToTopic } from '../../../../firebase/subscribetopic';
import { getBusinessAllNotifications, UpdateBusinessNotification } from '../../../../store/actions/businessnotification';
// import { CHangeBellType, getbellIconNotifications, updateBellIconNotification } from '../../../../store/actions/businessnotification';
// import { showNotificationMessage } from "../../../../store/actions/shownotificationpopup";
// import { useNavigate } from 'react-router';
// import { showSuccessPopup } from '../../store/actions/successmessagepopup';
export default function GetBusinessNotification(setIsActive) {

  const { users } = useSelector((state) => {
    return {
      users: state.user
    }
  })
  const dispatch = useDispatch();
  const updatebell = (data) => {
    let update = {}
    if (data.action === "Ecommerce") {
      update = {
        '_id': data._id,
        'sender_name': data.sender_name,
        'sender_username': data.sender_username,
        'Status': data.Status,
        'receive_user': data.sender_user,
        'business': data.business,
        'activeRole': data.activeRole,
        'order_id': "",
        'action': data.action,
        'titlehead': data.titlehead,
        'createdAt': data.createdAt,
        'dotColor': data.dotColor,
        'order': {
          'order_id': data.order_id,
          'orderTotal': data.orderTotal,
          'orderProduct': data.orderProduct,
          'userData': {}
        }
      }
    } else {
      update = {
        '_id': data._id,
        'sender_name': data.sender_name,
        'sender_username': data.sender_username,
        'Status': data.Status,
        'receive_user': data.sender_user,
        'business': data.business,
        'activeRole': data.activeRole,
        'action': data.action,
        'titlehead': data.titlehead,
        'createdAt': data.createdAt,
        'dotColor': data.dotColor,
        'appointmentbooking': {
          'booking_date': data.booking_date,
          'booking_time': data.booking_time,
          'bookingId': data.bookingId,
          'service': {
            'title': data.servicetitle
          }
        }
      }
    }
    dispatch(UpdateBusinessNotification(update))
  }

  async function firenotification() {
    if (messaging) {
      messaging.onMessage((payload) => {
        // const fctStr1 = payload.data.titleNot;
        // const fct1 = eval(fctStr1)
        // console.log("line 6", fct1())
        // console.log("line 72", payload)
        let notify_to = payload && payload.data.to;

        if (users._id === notify_to) {
          updatebell(payload && payload.data);
          // const notificationOption={
          //   body:payload.notification.body,
          // }
          // if(Notification.permission==="granted"){
          //   var notification=new Notification(payload.notification.title,notificationOption);
          //   notification.onclick=function(ev){
          //     ev.preventDefault();
          //     window.open( `/${payload.data.click_action}`,'_blank');
          //     // notification.icon(payload.data.icon);
          //     notification.close();
          //   }
          // }
        }
      });
      if (users._id) {
        const firebaseToken = await messaging.getToken();
        subscriberToTopic(firebaseToken, users._id);
      }
    }
  }

  useEffect(() => {
    firenotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCHange = useCallback(() => {
    setIsActive(false);
    if (document.visibilityState === "visible") {
      dispatch(getBusinessAllNotifications(users.user_business, users.user_activeRole, users._id, users.user_business_type))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   bellIconType.type && dispatch(getbellIconNotifications(users._id, bellIconType.type, users.user_institute, users.user_activeRole));
  //   // if(firebase.messaging.isSupported()){
  //   // }else{
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [bellIconType.type, users.user_activeRole]);

  useEffect(() => {
    window.addEventListener("visibilitychange", handleCHange)
  }, [handleCHange]);
  return (
    <div>

    </div>
  )
}