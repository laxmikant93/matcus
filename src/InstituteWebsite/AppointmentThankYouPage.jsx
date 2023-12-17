import React from 'react';
import { Link } from 'react-router-dom';
import done from "./../assets/images/img/success_gif.gif";

const AppointmentThankYouPage = () => {
  return (
    <div className="thankyou-wrapper">
      <div className="thankyou_wrapper">
        <h4 className="">Your Booking is confirmed!</h4>
        <div className="gif_frame">
          <img src={done} className="img-fluid" alt="" />
        </div>
        <h5 className="mb-20">Thank You for booking with us</h5>
        <div>
          <Link to="/my_booking" className="view_btn">View Bookings</Link>
        </div>
      </div>
    </div>
  )
}

export default AppointmentThankYouPage