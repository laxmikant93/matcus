import React from 'react'
import './googlemarketing.scss'
import Breadcrumb from '../../Common/Breadcrumb'
import BreadcrumbItem from '../../Common/Breadcrumb/BreadcrumbItem'
import Image1 from './assets/marketing1.png'
import AppLink from '../../Common/AppLink';
import ScrollPageTop from '../../Common/ScrollPageTop';
const Googlemarketing = () => {
  return (
    <React.Fragment>
      <ScrollPageTop />
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/marketing" title="Marketing" />
        <BreadcrumbItem to="/google-marketing" title="SEO" />
      </Breadcrumb>
      <section>
        <article>
          <div className='inline items-center googlemarketing-heading-container '>
            <AppLink to={'/marketing'}>
              <i className='left-arrow'></i>
            </AppLink>
            <p className='text-lg w-600 '> Get Found on Google</p>
          </div>
        </article>
      </section>
      <hr className='mt-15 heading-content-divider' />

      <section>
        <article>
          <div className='marketing-wrap '>
            <div className='info-container-google-marketing'>
              <h6>Start your <br />
                SEO Journey <br />
                to get found on <span className='googlemarketing-highlight-content w-600'>Google</span> </h6>
              <div className='info-wrapper-googlemarketing'>
                <p>We’ll help you get a head start with</p>
                <p>the your website’s SEO so you can get</p>
                <p>found online.</p>
                <AppLink className='button button-primary btn-sm mt-40' to={'/marketing-form'}>  Get Started</AppLink>
              </div>
            </div>
            <div className='google-marketing-image-container'>
              <img className='img-fluid' src={Image1} alt="" />
            </div>
          </div>
        </article>
      </section >

    </React.Fragment >
  )
}

export default Googlemarketing