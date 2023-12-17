import React from 'react'
import './marketingform.scss'
import Image1 from './assets/callicon.png'
import Commonform from './Commonform'
import ScrollPageTop from '../../Common/ScrollPageTop'

const Marketingform = () => {
  return (
    <React.Fragment>
      <ScrollPageTop />
      <section>
        <article className='inline  form-container-wraper' >
          <div className='left-container'>
            <div className=' w-600 marketing-form-info'>
              <p>Get <span className='marketingform-info-highlight'> Expert</span> Help</p>
              <p> with your website</p>
              <p>boosting</p>
            </div>
            <div className='marketing-info-wrapper'>
              <p>Fill out the form and our team of experts would be </p>
              <p>in touch with you shortly</p>
            </div>
            <hr className='form-info-dividor' />
            <div className='inline phone-no-wrapper'>
              <img src={Image1} alt="" />
              <p>Call or whatsapp us at </p>
            </div>
            <p className='highlited-phone-no'>+91- 8368214889</p>
          </div>
          <div className='container-divider'></div>
          <div className='right-container'>
            <Commonform></Commonform>
          </div>
        </article>
      </section>
      <ScrollPageTop />
    </React.Fragment >

  )
}

export default Marketingform;