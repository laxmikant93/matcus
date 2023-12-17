import React from 'react'
import AppLink from '../../Common/AppLink';
import Breadcrumb from '../../Common/Breadcrumb';
import BreadcrumbItem from '../../Common/Breadcrumb/BreadcrumbItem';
import Image4 from './assets/marketing4.png'
import './businesscardsmarketing.scss'
import ScrollPageTop from '../../Common/ScrollPageTop';

const Businesscardsmarketing = () => {
  return (
    <React.Fragment>
      <ScrollPageTop/>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/marketing" title="Marketing" />
        <BreadcrumbItem to="/business-card-marketing" title="Business Cards" />
      </Breadcrumb>

      <section>
        <article>
          <div className='inline items-center googlemarketing-heading-container '>
            <AppLink to={'/marketing'}>
              <i className='left-arrow'></i>
            </AppLink>

            <p className='text-lg w-600'> Business Cards </p>
          </div>
          <hr className='mt-15 heading-content-divider' />
        </article>
      </section>


      <section>
        <article>
          <div className='inline marketing-wrap between-lg between-sm '>
            <div className='info-container-google-marketing'>
              <h6>Promote your business<br />with your   <span className='googlemarketing-highlight-content w-400'>personalised </span><br />business cards</h6>

              <div className='info-wrapper-googlemarketing w-300 mt-15'>
                <p>Choose from business </p>
                <p>cards, T-shirts, mugs and </p>
                <p> more.</p>
                <AppLink className='button button-primary btn-sm mt-40' to={'/marketing-form'}>  Get Started</AppLink>
              </div>
            </div>

            <div className='google-marketing-image-container order-1'>
              <img className='img-fluid' src={Image4} alt="" />
            </div>
          </div>


        </article>
      </section>
      <ScrollPageTop />
    </React.Fragment>
  )
}
export default Businesscardsmarketing;