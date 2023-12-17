import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import firebase from 'firebase/app'/
import 'firebase/messaging'
import { messaging } from '../../firebase/messaginInit';
import { subscriberToTopic } from '../../firebase/subscribetopic';
import { CHangeBellType, getbellIconNotifications, updateBellIconNotification } from '../../store/actions/allnotification';
import { showNotificationMessage } from "../../store/actions/shownotificationpopup";
// import { useNavigate } from 'react-router';
// import { showSuccessPopup } from '../../store/actions/successmessagepopup';
export default function GetNotification(setIsActive) {

  const { users, bellIconType } = useSelector((state) => {
    return {
      users: state.user,
      bellIconType: state.allnotifications.belliconType
    }
  })
  const dispatch = useDispatch();
  const updatebell = (data) => {
    let update = {
      _id: data._id ? data._id : "",
      type: data.Ntype ? data.Ntype : "",
      ActionPerform: data.ActionPerform ? data.ActionPerform : "",
      sender_name: data.sender_name ? data.sender_name : "",
      sender_username: data.sender_username ? data.sender_username : "",
      sender_user: data._from ? data._from : "",
      sender_profile_picture: data.sender_profile_picture ? data.sender_profile_picture : "",
      receive_user: data.to ? data.to : "",
      title: data.Ntitle ? data.Ntitle : "",
      profileURL: data.profileURL ? data.profileURL : "",
      itemURL: data.itemURL ? data.itemURL : "",
      Status: data.Status ? data.Status : "Unseen",
      itemId: {
        id: data.itemId ? data.itemId : "",
        name: data.itemName ? data.itemName : ""
      },
      activeRole: data.activeRole ? data.activeRole : "",
      institute: data.institute ? data.institute : "",
      classname: data.className ? data.className : "",
      subject: data.subject ? data.subject : "",
      desc: data.desc ? data.desc : "",
      website: {
        title: data.websiteTitle ? data.websiteTitle : "",
        applicantName: data.applicantName ? data.applicantName : "",
        applicantEmail: data.applicantEmail ? data.applicantEmail : ""
      }
    }


    if (update.type === "Profile" || update.type === "Accounts") {
      dispatch(CHangeBellType("Other"));
      dispatch(updateBellIconNotification(update));
    dispatch(showNotificationMessage({type:update.type, title: update.title, time: new Date(), description: `${update.sender_name} ${update.desc}`, url: update.itemURL ? update.itemURL : update.profileURL }))
    } else if (update.type === "Institute" || update.type === "Website") {
      dispatch(CHangeBellType("Institute"));
      dispatch(updateBellIconNotification(update));
    dispatch(showNotificationMessage({ title: update.title, time: new Date(), description: update.desc, url: update.itemURL ? update.itemURL : update.profileURL }))

    }


    // setTimeout
  }

  async function firenotification() {
    if (messaging) {
      messaging.onMessage((payload) => {
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
    // setDispatchType("Institute")
    if (document.visibilityState === "visible") {
      bellIconType.type && dispatch(getbellIconNotifications(users._id, bellIconType.type, users.user_institute, users.user_activeRole));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bellIconType.type && dispatch(getbellIconNotifications(users._id, bellIconType.type, users.user_institute, users.user_activeRole));
    // if(firebase.messaging.isSupported()){
    // }else{
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bellIconType.type,users.user_activeRole]);

  useEffect(() => {
    window.addEventListener("visibilitychange", handleCHange)
  }, [handleCHange]);
  return (
    <div>

    </div>
  )
}