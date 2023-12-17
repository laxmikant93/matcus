import React from 'react'
import { useSelector } from 'react-redux'
import AuthTimeLineLayout from "./AuthTimeLineLayout"
import CheckSubdomain from './CheckSubdomain'


const GetWebsite = () => {
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  return (
    <AuthTimeLineLayout>
      <div className="form-wrapper">
        <div className='mb-30'>
          <h1>Hi, <span className='w-400 primary'>{user.user_fullname}</span></h1>
          <p className='text-xxs'>Get a <span className='primary w-500 text-xs'>FREE</span> website for your Institute/School/Coaching</p>
        </div>
        <CheckSubdomain />
      </div>
    </AuthTimeLineLayout>
  )
}

export default GetWebsite