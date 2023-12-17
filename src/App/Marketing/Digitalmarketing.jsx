import React from 'react'
import './digitalmarketing.scss'
import Breadcrumb from '../../Common/Breadcrumb'
import BreadcrumbItem from '../../Common/Breadcrumb/BreadcrumbItem'
import Image2 from './assets/marketing2.png'
import AppLink from '../../Common/AppLink'
import ScrollPageTop from '../../Common/ScrollPageTop'
const Digitalmarketing = () => {
  return (
    <React.Fragment>
      <ScrollPageTop />
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/marketing" title="Marketing" />
        <BreadcrumbItem to="/digital-marketing" title="Digital marketing" />
      </Breadcrumb>

      <section>
        <article>
          <div className='inline items-center googlemarketing-heading-container '>
            <AppLink to={'/marketing'}>
              <i className='left-arrow'></i>
            </AppLink>

            <p className='text-lg w-600 '>Digital Marketing</p></div>
        </article>
      </section>
      <hr className='mt-15 heading-content-divider' />

      <section>
        <article>
          <div className='inline marketing-wrap between-lg between-sm'>
            <div className='info-container-google-marketing'>
              <h6>We provide <span className='googlemarketing-highlight-content w-400'>outstanding</span><br />
                <span className='googlemarketing-highlight-content w-400'>digital marketing</span><br />
                service to boost Your <br />social media presence</h6>
              <div className='info-wrapper-googlemarketing w-300 mt-15'>
                <p>Promote your business with eye-</p>
                <p>catching posts that you can share</p>
                <p>directly to Facebook and Instagram.</p>
                <AppLink className="button button-primary btn-sm mt-40" to={'/marketing-form'}>
                  Get Started
                </AppLink>
              </div>
            </div>

            <div className='google-marketing-image-container'>
              <img className='marketing-image' src={Image2} alt="" />

            </div>
          </div>


        </article>
      </section>

      <ScrollPageTop />
    </React.Fragment>

  )
}
export default Digitalmarketing;