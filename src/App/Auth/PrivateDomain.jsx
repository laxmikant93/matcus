import React from 'react'
import "./auth.scss"
import iconclose from "../../assets/Icons/icon-close.svg"
import AppLink from '../../Common/AppLink'


const PrivateDomain = () => {
  return (
    <div className='sign_sec_wrapper'>
      <div className="privatedomain-wrapper">
        <AppLink to="/getwebsiteV1" className="close-icon"><img src={iconclose} alt="" /></AppLink>
        <div className='mb-40'>
          <h2>What is <span className='w-400 primary'>Private Domain</span></h2>
          <p className='text-xxs'>Private domains or custom URLs are created from your own brand name that will help you increase your brand’s reach and credibility. Your domain is the face of your brand and by using a custom URL, visitors can easily find you over the internet. It is associated with more benefits that will help you establish your brand online. For example; www.yourxyzwebsite.com</p>
        </div>
        <h2>Benefits <span className='w-400 primary'>Private Domain</span></h2>
        <div className='list'>
          <ul>
            <li>Website URL of your own brand</li>
            <li>Promote your brand</li>
            <li>Growth opportunity</li>
            <li>Improve SEO rankings</li>
            <li>Build trust & credibility</li>
            <li>Appear more professional</li>
            <li>Boost your reputation</li>
          </ul>
        </div>
        {/* <h2>Plans of <span className='w-400 primary'>Private Domain</span></h2>
        <div className='privatedomain_card'>
          <div className="card">
            <div className="offer">
              <p>80 % OFF*</p>
            </div>
            <div className="card-body">
              <h3>Digital Marketing</h3>
            </div>
          </div>
          <div className="card">
            <div className="offer">
              <p>20 % OFF*</p>
            </div>
            <div className="card-body">
              <h3>Digital Marketing</h3>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default PrivateDomain