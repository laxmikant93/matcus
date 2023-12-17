import React from 'react'
import Breadcrumb from '../../Common/Breadcrumb';
import BreadcrumbItem from '../../Common/Breadcrumb/BreadcrumbItem';
import './logomarketing.scss'
import Image3 from './assets/marketing3.png'
import AppLink from '../../Common/AppLink';
import ScrollPageTop from '../../Common/ScrollPageTop';

const Logomarketing = () => {
  return (

    <React.Fragment>
      <ScrollPageTop />
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/marketing" title="Marketing" />
        <BreadcrumbItem to="/logo-marketing" title="Logos  " />
      </Breadcrumb>

      <section>
        <article>
          <div className='inline items-center googlemarketing-heading-container '>
            <AppLink to={'/marketing'}>
              <i className='left-arrow'></i>
            </AppLink>

            <p className='text-lg w-600 '> Logos</p></div>
        </article>
      </section>
      <hr className='mt-15 heading-content-divider' />

      <section>
        <article>
          <div className='inline marketing-wrap between-lg between-sm'>
            <div className='info-container-google-marketing'>

              <h6>Get <span className='googlemarketing-highlight-content w-400'>Professional logo</span> <br />designed for your <br />brand  </h6>
              <div className='info-wrapper-googlemarketing w-300 mt-15'>
                <p>You’ll get a customized</p>
                <p> logo that’s perfect for your</p>
                <p>brand</p>
                <AppLink className="button button-primary btn-sm mt-40" to={'/marketing-form'}>
                  Get Started
                </AppLink>
              </div>
            </div>

            <div className='google-marketing-image-container'>
              <img className='img-fluid' src={Image3} alt="" />
            </div>
          </div>


        </article>
      </section>
      <ScrollPageTop />
    </React.Fragment>
  )
}
export default Logomarketing;