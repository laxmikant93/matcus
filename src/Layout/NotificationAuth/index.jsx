import React from 'react'
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import NotificationHeader from './NotificationHeader';
import NotificationLayout from "./BusinessNotification/BusinessNotificationAuth/NotificationLayout";

const NotificationAuth = ({business}) => {
  return (
    <React.Fragment>
      {
        business!=="LMS"?(!AppLinkUrl.subdomain() && !AppLinkUrl.privateDomain() && <NotificationLayout business={business} />):
        (!AppLinkUrl.subdomain() && !AppLinkUrl.privateDomain() && <NotificationHeader/>)
      }
      {}
      {/* {!AppLinkUrl.subdomain() && !AppLinkUrl.privateDomain() && <NotificationHeader/>} */}
    </React.Fragment>
  )
}

export default NotificationAuth