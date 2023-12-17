import React from 'react'
import styles from "../../Notification.module.scss";
import IconNotificationBell from "../../notificationBell.svg";
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { useRef } from 'react';
import ServiceNotification from './ServiceNotification';
import GetBusinessNotification from '../GetNotificationsFirebase/GetBusinessNotification';

const NotificationLayout = () => {
  const dropRef = useRef();
  
  const [NotificationDropdown, setNotificationDropdown] = useDetectOutsideClick(dropRef, false)
  const handle = () => {
    setNotificationDropdown(!NotificationDropdown)
  }
  GetBusinessNotification(handle)
  return (
    <div className={styles.NotificationDropdownListWrapper}>
      <div className={styles.NotificationIcon} onClick={handle}>
        <img src={IconNotificationBell} alt="Notification" />
      </div>
      {NotificationDropdown && <div className={styles.NotificationDropdownContentWrap} ref={dropRef}>
        <div className={styles.NotificationDropdownHeader}>
          <p>Notifications</p>
        </div>
        <div className={styles.NotificationDropdownBody}>
          <ul className={styles.NotificationMessageList}>
            <ServiceNotification />
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default NotificationLayout