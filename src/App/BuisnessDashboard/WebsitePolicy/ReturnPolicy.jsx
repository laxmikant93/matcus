import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import "../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ReturnPolicy/returnPolicy.scss"
import MobileBar from '../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/CommonComponent/CommonJsx/MobileBar/MobileBar'

const ReturnPolicy = () => {

  const { privacypolicydata } = useSelector((state) => {
    return {
      privacypolicydata: state.websiteTemplate.getTemplate.policy_info,
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const dynamicData = privacypolicydata.returns_and_exchange[0].description

  return (
    <section className='return-section '>
      <div className='containerTrue mt-24  pb-45'>
        <div className='return-policy-wrapper'>
          <h3 className='return-heading text-underline'>{privacypolicydata.returns_and_exchange[0].title}</h3>
          <div className='retun-ul-wrapper faq-ul-wrapper'>
            <div className='sun-editor-output' dangerouslySetInnerHTML={{ __html: dynamicData }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReturnPolicy
