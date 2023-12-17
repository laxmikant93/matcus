import React from 'react'
import styles from "../../Notification.module.scss";
import Card from '../../../../Common/Card';
import CardBody from '../../../../Common/Card/CardBody';
import DummyProfile from "../../DummyProfile.png";

const ServiceNotification = () => {
  return (
    <React.Fragment>
      <li className={styles.NotificationMessageListItem}>
        {/* NMLI = Notification Message List Item  */}
        <h6 className={`${styles.NMLI_Head} ${styles.Success}`}>You got a new booking</h6>
        <Card className="border-0">
          <CardBody>
            <div className={styles.NMLI_DetailsGrid}>
              <div className={`${styles.NMLI_DetailsGridItem} ${styles.NMLI_ProfileImage}`}>
                <img src={DummyProfile} alt="" />
              </div>
              <div className={styles.NMLI_DetailsGridItem}>
                <h4>Dermatologist</h4>
                <p>Booking ID : 2054687145</p>
              </div>
              <span className={styles.NMLI_GridDivider}></span>
              <div className={styles.NMLI_DetailsGridItem}>
                <p><i className={styles.CalenderIcon}></i>&nbsp;2054687145</p>
                <p><i className={styles.TimeIcon}></i>&nbsp;10:00 - 12:00</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className={styles.NMLI_Footer}>
          <span>a few seconds ago</span>
          <div className={styles.NMLI_Action}>
            <button type="button" className="linkBtn button-red btn-3xs">Reject</button>
            <button type="button" className="button button-primary btn-3xs">Accept</button>
          </div>
        </div>
      </li>
      <li className={styles.NotificationMessageListItem}>
        {/* NMLI = Notification Message List Item  */}
        <h6 className={`${styles.NMLI_Head} ${styles.Decline}`}>A booking was cancelled</h6>
        <Card className="border-0">
          <CardBody>
            <div className={styles.NMLI_DetailsGrid}>
              <div className={`${styles.NMLI_DetailsGridItem} ${styles.NMLI_ProfileImage}`}>
                <img src={DummyProfile} alt="" />
              </div>
              <div className={styles.NMLI_DetailsGridItem}>
                <h4>Dermatologist</h4>
                <p>Booking ID : 2054687145</p>
              </div>
              <span className={styles.NMLI_GridDivider}></span>
              <div className={styles.NMLI_DetailsGridItem}>
                <p><i className={styles.CalenderIcon}></i>&nbsp;2054687145</p>
                <p><i className={styles.TimeIcon}></i>&nbsp;10:00 - 12:00</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className={styles.NMLI_Footer}>
          <span>a few seconds ago</span>
          <div className={styles.NMLI_Action}>
            <button type="button" className={`button btn-o-red btn-oval btn-3xs ${styles.CancelledButton}`}><i className={styles.CircleIcon}></i>Cancelled</button>
          </div>
        </div>
      </li>
      <li className={styles.NotificationMessageListItem}>
        {/* NMLI = Notification Message List Item  */}
        <h6 className={`${styles.NMLI_Head} ${styles.Pending}`}>A booking was rescheduled</h6>
        <Card className="border-0">
          <CardBody>
            <div className={styles.NMLI_DetailsGrid}>
              <div className={`${styles.NMLI_DetailsGridItem} ${styles.NMLI_ProfileImage}`}>
                <img src={DummyProfile} alt="" />
              </div>
              <div className={styles.NMLI_DetailsGridItem}>
                <h4>Dermatologist</h4>
                <p>Booking ID : 2054687145</p>
              </div>
              <span className={styles.NMLI_GridDivider}></span>
              <div className={styles.NMLI_DetailsGridItem}>
                <p><i className={styles.CalenderIcon}></i>&nbsp;2054687145</p>
                <p><i className={styles.TimeIcon}></i>&nbsp;10:00 - 12:00</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className={styles.NMLI_Footer}>
          <span>a few seconds ago</span>
          <div className={styles.NMLI_Action}>
            <button type="button" className="linkBtn button-red btn-3xs">Reject</button>
            <button type="button" className="button button-primary btn-3xs">Accept</button>
          </div>
        </div>
      </li>
    </React.Fragment>
  )
}

export default ServiceNotification