import React from 'react'
import AppLink from '../../../Common/AppLink'
import "./bookappointmentUser.scss"

const Index = () => {
  return (
    <>
      <h2 className="mb-20 text-s w-600">My Account</h2>

      <div className="userbooking_wrap">
        <div className="userbook">
          <AppLink to="/My_Booking" className="user_button text-xs w-500 mb-10">My Booking <i className="icon-arrow text-s w-500">&#10095;</i></AppLink>
          <p className="text-2xs w-400">View, modify and track orders</p>
        </div>
        <div className="userbook">
          <AppLink to="/My_Profile" className="user_button text-xs w-500 mb-10">My Profile <i className="icon-arrow text-s w-500">&#10095;</i></AppLink>
          <p className="text-2xs w-400">View, modify and track orders</p>
        </div>
      </div>
    </>
  )
}

export default Index