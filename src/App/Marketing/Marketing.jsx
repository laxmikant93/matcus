import React from 'react';
import './marketing.scss';
import Breadcrumb from '../../Common/Breadcrumb';
import BreadcrumbItem from '../../Common/Breadcrumb/BreadcrumbItem';
import Card from "../../Common/Card";
import CardBody from "../../Common/Card/CardBody";

////images
import Image1 from './assets/g-home1.png'
import arrowright from './assets/arrow.png'
import businesscard from './assets/businesscard.png'
import digitalmarketing from './assets/digitalmarketing.png'
import logosimage from './assets/logos.png'
import mailimage from './assets/mail.png'
import AppLink from '../../Common/AppLink';
import ScrollTOtop from '../../Common/ScrollPageTop'
const Marketing = () => {
  const cardData = [
    {
      id: 1,
      image: Image1,
      heading: 'Get found on Google',
      para: 'Follow your personal SEO plan and get indexed in google in seconds.',
      link: '/google-marketing'
    },
    {
      id: 2,
      image: mailimage,
      heading: 'Email marketing',
      para: 'Bring visitors to your site and engage your audience with email campaigns.',
      link: '/email-marketing'
    },
    {
      id: 3,
      image: digitalmarketing,
      heading: 'Digital Marketing',
      para: 'Create and share stunning social posts with your followers.',
      link: '/digital-marketing'
    },
    {
      id: 4,
      image: logosimage,
      heading: 'Logos',
      para: 'Get a Professional Logo designed by our expert logo designers for your brand in minutes.',
      link: '/logo-marketing'
    },
    {
      id: 5,
      image: businesscard,
      heading: 'Business Cards',
      para: 'Print Business cards, T-shirts, Mugs and more to promote your business.',
      link: '/business-card-marketing'
    },

  ]
  return (
    <React.Fragment>
      <ScrollTOtop />
      <section>
        <article>
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem to="/marketing" title="Marketing" />
          </Breadcrumb>
        </article>
      </section>

      <section>
        <article  >
          <p className='text-lg w-600'>Marketing</p>
          <p className='mt-5 text-xs w-300'>Use these tools to drive traffic to your site and reach a wider audience.</p>
          <hr className='cards-header-divider' />
        </article>
      </section>
      <section>
        <article >
          <div className='card-wrapper'>
            {
              cardData.map((step) => {
                return (
                  <React.Fragment key={step.id}>
                    <AppLink to={step.link}>
                      <div className="card-container" >
                        <Card className='marketing-card-container '>
                          <CardBody >
                            <div className='google-mareting-image-container mt-25 '>
                              <img className='google-mareting-image' src={step.image} alt="" />
                            </div>
                            <div className='inline between-lg between-xs card-header-container '>
                              <p className='card-heading base'>{step.heading}</p>

                              <img src={arrowright} alt="" />

                            </div>
                            <hr className='marketing-content-divider' />
                            <p className='text-xxs base w-300 google-marketing-content'>{step.para}</p>
                          </CardBody>
                        </Card>
                      </div>
                    </AppLink>
                  </React.Fragment>
                )
              })

            }


            {/* <div className='col-lg-4 col-md-6  col-sm-6  col-xs-12 '>
              <Card className="marketing-card-container">
                <CardBody>
                  <div className='google-mareting-image-container mt-25 '>
                    <img className='google-mareting-image' src={mailimage} alt="" />
                  </div>
                  <div className='inline between-lg between-xs card-header-container '>
                    <p className='card-heading'>Email marketing</p>
                    <AppLink to={'/email-marketing'}>
                      <img src={arrowright} alt="" />
                    </AppLink>


                  </div>
                  <hr className='marketing-content-divider' />
                  <p className='text-xxs w-300 google-marketing-content'>Bring visitors to your site and engage your audience with email
                    campaigns.</p>
                </CardBody>
              </Card>
            </div> */}

            {/* <div className='col-lg-4 col-md-6  col-sm-6  col-xs-12'>
              <Card className=" marketing-card-container">
                <CardBody>
                  <div className='google-mareting-image-container mt-25 '>
                    <img className='google-mareting-image' src={digitalmarketing} alt="" />
                  </div>
                  <div className='inline between-lg between-xs card-header-container'>
                    <p className='card-heading'>Digital Marketing</p>
                    <AppLink to={'/digital-marketing'}>
                      <img src={arrowright} alt="" />
                    </AppLink>


                  </div>
                  <hr className='marketing-content-divider' />
                  <p className='text-xxs w-300 google-marketing-content-3'>Create and share stunning
                    social posts with your followers.</p>
                </CardBody>
              </Card>
            </div> */}


            {/* <div className='col-lg-4 col-md-6  col-sm-6  col-xs-12 '>
              <Card className="marketing-card-container">
                <CardBody>
                  <div className='google-mareting-image-container mt-25 '>
                    <img className='google-mareting-image' src={logosimage} alt="" />
                  </div>
                  <div className='inline between-lg between-xs card-header-container '>
                    <p className='card-heading'>Logos</p>
                    <AppLink to='/logo-marketing'>
                      <img src={arrowright} alt="" />
                    </AppLink>

                  </div>
                  <hr className='marketing-content-divider' />
                  <p className='text-xxs w-300 google-marketing-content'>Get a Professional Logo designed by our expert logo designers for your brand in minutes</p>
                </CardBody>
              </Card>
            </div> */}

            {/* <div className='col-lg-4 col-md-6  col-sm-6  col-xs-12'>
              <Card className=" marketing-card-container">
                <CardBody>
                  <div className='google-mareting-image-container mt-25 '>
                    <img className='google-mareting-image' src={businesscard} alt="" />
                  </div>
                  <div className='inline between-lg between-xs card-header-container '>
                    <p className='card-heading'>Business Crads</p>
                    <AppLink to={'/business-card-marketing'}>
                      <img src={arrowright} alt="" />
                    </AppLink>


                  </div>
                  <hr className='marketing-content-divider' />
                  <p className='text-xxs w-300 google-marketing-content'>Print Business cards, T-shirts, Mugs and more to promote your business.</p>
                </CardBody>
              </Card>
            </div> */}
          </div>
        </article>
      </section>



    </React.Fragment>
  )
}

export default Marketing;