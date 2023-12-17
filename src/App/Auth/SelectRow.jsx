import React, { useState } from 'react'
import "./auth.scss"
import school from "../../assets/Icons/emojione-monotone_school.svg"
import Admin from "../../assets/Icons/institute_admin.svg"
import AppLink from '../../Common/AppLink'
import { useNavigate } from 'react-router-dom'


const SelectRow = () => {
  const [card1, setCard1] = useState(true);
  const [card2, setCard2] = useState(false);
  const history = useNavigate()
  const cardHandle1 = () => {
    setCard1(true)
    setCard2(false)
  }
  const cardHandle2 = () => {
    setCard2(true)
    setCard1(false)
  }
  const handleClick = () => {
    if (card1) {
      history('/basicdetailV1')
    } else if (card2) {
      history("community")
    }
  }


  return (
    <div className='sign_sec_wrapper'>
      <div className="selectrow-wrapper">
        <div className='mb-20'>
          <h2>Welcome to Edneed!</h2>
          <p className='select-text primary'>Please select your role</p>
        </div>
        <div className='selectrow_card'>
          <div className={`card   ${card1 ? "active" : ""}`} onClick={cardHandle1}>
            <div className="icon">
              <img src={school} className="size-icon" alt="" />
            </div>
            <div className="card-body">
              <AppLink to="#" className="admin-text">Institute Admin</AppLink>
              <div className='list'>
                <ul>
                  <li>Manage all activities of your
                    institute.</li>
                  <li>Add faculty and students.</li>
                  <li>Create online classes and upload
                    study material.</li>
                  <li>Get free website for your coaching
                    center.</li>
                  <li>Build your institute’s website within
                    2 minutes.</li>
                </ul>
              </div>
            </div>
            <div className={`${card1 ? "check-icon" : ""}`}>
              <div className="check-size"></div>
            </div>
          </div>
          <div className={`card ${card2 ? "active2" : ""}`} onClick={cardHandle2}>
            <div className="icon">
              <img src={Admin} className="size-icon" alt="" />
            </div>
            <div className="card-body">
              <AppLink to="#" className="admin-text brown">Explore Edneed</AppLink>

              <div className='list list-disc'>
                <ul>
                  <li>Ask questions and/or share answers</li>
                  <li>Participate in forums & discussions</li>
                  <li>Share knowledge and insights</li>
                  <li>Connect with other learners</li>
                  <li>Grow your network</li>
                </ul>
              </div>
              <div className={`${card2 ? "check-icon2" : ""}`}>
                <div className="check-size"></div>
              </div>
            </div>
          </div>
        </div>
        <div className='btn-grid'>
          <button className='button button-primary conti-btn' type='button' onClick={handleClick}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default SelectRow;