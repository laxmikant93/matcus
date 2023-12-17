import React from 'react';
import './stepperMarketing.scss';
import './stepper.scss';
import { Route } from 'react-router-dom';
import AppLink from '../../Common/AppLink';

const StepperMarketing = () => {
  const stepperData = [
    {
      id: 1,
      icon: 'seoIcon',
      name: 'SEO',
      link: '/google-marketing'
    },
    {
      id: 2,
      icon: 'socialIcon',
      name: 'Social Marketing',
      link: '/digital-marketing'
    },
    {
      id: 3,
      icon: 'digitalIcon',
      name: 'Digital Marketing',
      link: '/digital-marketing'
    },
    {
      id: 4,
      icon: 'emailIcon',
      name: 'Email Markeitng',
      link: '/email-marketing'
    },
    {
      id: 5,
      icon: 'logoIcon',
      name: 'Logos',
      link: '/logo-marketing'
    },
    {
      id: 6,
      icon: 'businessIcon',
      name: 'Business Cards',
      link: '/business-card-marketing'
    }
  ]

  return (
    <React.Fragment>
      <div className='marketing-wrapper'>
        <div className='dashboard-top-form-wrapper'>
          <h3 className='text-s w-600'>Get the Marketing you need</h3>
          <hr className='mt-10 stepper-hr' />
          <div className='marketing-list-wrapper'>
            {
              stepperData.map((step) => {
                return (
                  <React.Fragment key={step.id}>
                    <AppLink to={step.link}>
                      <div className='marketing-list-list'>
                        <i className={`icons ${step.icon}`}></i>
                        <p className='text-xs w-400 base'>{step.name}</p>
                      </div>
                    </AppLink>
                  </React.Fragment>
                )
              })
            }
          </div>
        </div>
        <div className='hire-us-wrapper'>
          <p className='text-xs w-400'>Stuck somewhere? We’ve got you covered.</p>
          <AppLink to="/contact" className='button btn-xs w-500 btn-o-primary primary'>Hire Us</AppLink>
        </div>
      </div >

    </React.Fragment>
  )
}

export default StepperMarketing