import React, { useEffect } from 'react';
import './aboutUs.scss';
import ImageAbout from '../../assets/images/aboutUs.png';
import QuickFact from '../../assets/images/quickFact.png';
import Form from '../../CommonComponent/CommonJsx/Form/Form';
import { useSelector } from 'react-redux';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';

const AboutUS = () => {
  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite);

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <div className='containerTrue pb-45 '>
        <section className='hero-section'>
          <div className='hero-section-container'>
            <img src={success && data && data.business_about_upload ? data.business_about_upload : ImageAbout} alt="" />
          </div>
        </section>
        <section className='section-padding'>
          <div className='about-us-container'>
            <h3 className='about-heading'>About Us</h3>
            <p className='aboutus-para sun-editor-output'
              dangerouslySetInnerHTML={{
                __html:
                  success && data && data.business_about ? data.business_about : `I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add
                your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.`
              }}
            ></p>
          </div>
        </section>

        {/* <section className='section-padding'>
          <h3 className='about-heading'>Quick facts</h3>
          <div className='quickFact-container'>
            <div className='quick-container-leftside'>
              <img src={QuickFact} alt="" />
            </div>
            <div className='quick-container-leftside'>
              <p >I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add
                your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.</p>
            </div>
          </div>
        </section> */}

        <section className='section-padding'>
          <div className='getInTouch-container'>
            <div className='getInTouch-leftSidebar'>

              <div className='getInTouch-details'>
                <div className='left-sidebar'>
                  <h3 className='getInTouch-p'>Get in touch</h3>
                </div>
                <div className='right-sidebar'>
                  <p>For business inquires or press related inquires please use the form or email us on:</p>
                  <h3>{success && data ? data.business_email : ""}</h3>
                  <p>For support issues please use the support function
                    in your admin panel or the contact form in</p>
                </div>

              </div>

            </div>
            <div className='getInTouch-rightSidebar'>
              <Form data={data} success={success} />
            </div>
          </div>
        </section>

      </div >
    </React.Fragment >
  )
}

export default AboutUS