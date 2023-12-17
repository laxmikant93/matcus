import React from 'react'
import styles from "../../Notification.module.scss";
import IconNotificationBell from "../../notificationBell.svg";
import IconNotificationBell2 from "../../notificationBellActive.svg";

import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { useRef } from 'react';
import ServiceNotification from './ServiceNotification';
import GetBusinessNotification from '../GetNotificationsFirebase/GetBusinessNotification';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBusinessAllNotifications, resetUnseenNotification } from '../../../../store/actions/businessnotification';
import EcommerceNotification from './EcommerceNotification';

const NotificationLayout = ({ business }) => {
  const dropRef = useRef();
  const dispatch = useDispatch();
  const [NotificationDropdown, setNotificationDropdown] = useDetectOutsideClick(dropRef, false)
  const { user, businessnotification, unseen } = useSelector((state) => {
    return {
      user: state.user,
      businessnotification: state.businessnotification.list,
      unseen: state.businessnotification.list.unseen
    }
  });
  const handle = () => {
    setNotificationDropdown(!NotificationDropdown)
    if (unseen && unseen > 0) {
      dispatch(resetUnseenNotification(user.user_business, user.user_activeRole, user._id, user.user_business_type))
    }
  }
  GetBusinessNotification(setNotificationDropdown);

  useEffect(() => {
    dispatch(getBusinessAllNotifications(user.user_business, user.user_activeRole, user._id, user.user_business_type))
  }, [])
  return (
    <div className={styles.NotificationDropdownListWrapper}>
      {
        unseen && unseen > 0 ?
          <div className={styles.NotificationIcon2} onClick={handle}>
            <img src={IconNotificationBell2} alt="Notification" />
          </div>
          :
          <div className={styles.NotificationIcon} onClick={handle}>
            <img src={IconNotificationBell} alt="Notification" />
          </div>

      }
      {/* */}

      {NotificationDropdown && <div className={styles.NotificationDropdownContentWrap} ref={dropRef}>
        <div className={styles.NotificationDropdownHeader}>
          <p>Notifications</p>
        </div>
        <div className={styles.NotificationDropdownBody}>
          <ul className={styles.NotificationMessageList}>
            {business === "Ecommerce" ?
              <EcommerceNotification data={businessnotification} /> :
              <ServiceNotification data={businessnotification} close={() => setNotificationDropdown(!NotificationDropdown)} />}
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default NotificationLayout