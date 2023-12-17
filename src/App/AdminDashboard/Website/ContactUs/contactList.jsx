import React from 'react';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import moment from 'moment';
import './contactlist.scss'
import { useSelector } from 'react-redux';

const ContactList = ({ contacts, contactLists }) => {

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })

  return (
    <React.Fragment>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3 heading-name-item">Requester Details</li>
          <li className="col col-3 heading-name-item ">Subject Title</li>
          <li className="col col-2 heading-name-item">Date & Time</li>
          <li className="col col-4 heading-name-item">Message</li>
          {/* <li className="col col-2">&nbsp;</li> */}
        </ul>
        <div className="gridBody">
          {contacts.success ?
            contactLists.length ?
              contactLists.map((item, key) => {
                return (
                  <div className="gridRow">
                    <ul className="topInfo">
                      <li className="col col-3" data-head="Title & Description">
                        <p className="text-xs   name-item w-500">{item.name}</p>
                        <p className='text-xxs base w-400'>{item.requester_email}</p>
                        <p className='text-xxs base w-400'>{item?.contact}</p>
                      </li>
                      <li className="col col-3" data-head="Status">
                        <div>
                          <p className="text-2xs base w-400">{item.title}</p>
                          {user.user_business_type === "Services" ?
                            <div className={`status-pill ${item.tileStatus === "booking_form" ? "BookingPill" : ""}`}>
                              {item.tileStatus === "booking_form" ? "Bookings" : "Enquiries"}
                            </div>
                            : ""
                          }
                        </div>
                      </li>
                      <li className="col col-2" data-head="Status">
                        <div>
                          <p className="text-2xs w-400">
                            {moment(item.createdAt).format("DD-MM-YYYY")}
                          </p>
                          <p className="text-2xs time-item w-400">
                            {moment(item.createdAt).format("hh:mm a")}
                          </p>
                        </div>
                      </li>
                      <li className="col col-4" data-head="Status">
                        <div>
                          <p className='text-2xs base w-400'>{item.message}</p>
                        </div>
                      </li>
                      {/* <li className="col col-2 actionCols">
                      </li> */}
                    </ul>
                  </div>
                );
              }) :
              <NoDataAvailable title="No Records Found." />
            :
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          }
        </div>
      </div>
    </React.Fragment >
  );
}

export default ContactList;
