import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Form from '../../CommonComponent/CommonJsx/Form/Form';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import './contactus.scss';

const Contact = () => {

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite)
  return (
    <React.Fragment>
      <div className='containerTrue mt-64 pb-45 '>
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
      </div>
    </React.Fragment>
  )
}

export default Contact