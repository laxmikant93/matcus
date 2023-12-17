import React from 'react'
import styles from "../../Notification.module.scss";
import Card from '../../../../Common/Card';
import CardBody from '../../../../Common/Card/CardBody';
import PendingProfile from "./pending-profile.png";
import RejectProfile from "./reject-profile.png";
import SuccessProfile from "./success-profile.png";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
// https://www.figma.com/proto/qp0lZIu9IhWjOt1b3LWKAg/Design-for-Developers?page-id=16383%3A3842&node-id=16397%3A8363&viewport=5359%2C-730%2C0.92&scaling=min-zoom&starting-point-node-id=16397%3A8449
const EcommerceNotification = ({ data }) => {

  const history = useNavigate();
  const redirectTOPage = (item) => {
    if (item.url) {
      history(`/${item.url}`)
    }
  }
  return (
    <React.Fragment>
      {data.data && !data.loading && data.data.map((item, i) => {
        return (
          <li className={styles.NotificationMessageListItem} key={i}>
            {/* NMLI = Notification Message List Item  */}
            <h6 className={`${styles.NMLI_Head} ${item.dotColor === "blue" ? styles.Success : item.dotColor === "red" ? styles.Decline : styles.Pending}`}>{item.titlehead}</h6>
            <Card className="border-0">
              <CardBody>
                <div className={styles.NMLI_DetailsGrid} onClick={() => redirectTOPage(item)}>
                  <div className={`${styles.NMLI_DetailsGridItem} ${styles.NMLI_ProfileImage} ${item.dotColor === "blue" ? styles.Success : item.dotColor === "red" ? styles.Reject : styles.Pending}`}>
                    <img src={item.dotColor === "blue" ? SuccessProfile : item.dotColor === "red" ? RejectProfile : PendingProfile} alt="" />
                  </div>
                  <div className={styles.NMLI_DetailsGridItem}>
                    <h4>{item.sender_name}</h4>
                    <p>Order ID : {item.order && item.order.order_id}</p>
                  </div>
                  <span className={styles.NMLI_GridDivider}></span>
                  <div className={styles.NMLI_DetailsGridItem}>
                    <p>No. Of Products :&nbsp; {item.order && item.order.orderProduct.length}</p>
                    <p>Order Amount : &nbsp; {item.order && item.order.orderTotal}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <div className={styles.NMLI_Footer}>
              <span>{moment(item.createdAt).fromNow()}</span>
              <div className={styles.NMLI_Action}>
                {/* <button type="button" className="linkBtn button-red btn-3xs">Reject</button>
            <button type="button" className="button button-primary btn-3xs">Accept</button> */}
              </div>
            </div>
          </li>
        )
      })}
    </React.Fragment>
  )
}

export default EcommerceNotification;