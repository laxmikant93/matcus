import React from 'react'
import './emailmarketing.scss'
import Breadcrumb from '../../Common/Breadcrumb'
import BreadcrumbItem from '../../Common/Breadcrumb/BreadcrumbItem'
import Image1 from './assets/emailimage1.png'
import AppLink from '../../Common/AppLink';
import ScrollPageTop from '../../Common/ScrollPageTop'
const Emailmarketing = () => {
  return (
    <React.Fragment>
      <ScrollPageTop />
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/marketing" title="Marketing" />
        <BreadcrumbItem to="/email-marketing" title="Email marketing" />
      </Breadcrumb>

      <section>
        <article>
          <div className='inline items-center googlemarketing-heading-container '>
            <AppLink to={'/marketing'}>
              <i className='left-arrow'></i>
            </AppLink>

            <p className='text-lg w-600 first-heading-google-marketing'> Email Marketing</p></div>
        </article>
      </section>
      <hr className='mt-15 heading-content-divider' />

      <section>
        <article>
          <div className=' marketing-wrap '>
            <div className='info-container-google-marketing'>
              <h6>Drive <span className='googlemarketing-highlight-content w-600' > traffic   </span> to your site <br /> with email campaigns</h6>
              <ul className='info-wrapper-googlemarketing w-300 mt-15'>
                <li className='wrapper-list'>Get Stunning email templates </li>
                <li className='wrapper-list'> Get personnalized emails </li>
                <li className='wrapper-list'> <p> Get your campaigns scheduled</p> for the best results.</li>
              </ul>


              <AppLink className="button button-primary btn-sm mt-40" to={'/marketing-form'}>
                Get Started
              </AppLink>
            </div>

            <div className='google-marketing-image-container'>
              <img className='marketing-image' src={Image1} alt="" />
            </div>
          </div>


        </article>
      </section>

      <ScrollPageTop />
    </React.Fragment>
  )
}

export default Emailmarketing;