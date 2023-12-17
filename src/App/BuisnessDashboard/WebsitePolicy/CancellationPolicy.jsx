import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import "../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ReturnPolicy/returnPolicy.scss"
import MobileBar from '../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/CommonComponent/CommonJsx/MobileBar/MobileBar'

const CancellationPolicy = () => {

  const { privacypolicydata } = useSelector((state) => {
    return {
      privacypolicydata: state.websiteTemplate.getTemplate.policy_info,
    }
  })

  const DynamicData = privacypolicydata && privacypolicydata.cancellation[0].description;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className='return-section '>
      <div className='containerTrue mt-24  pb-45'>
        <div className='return-policy-wrapper'>
          <h3 className='return-heading text-underline'>{privacypolicydata && privacypolicydata.cancellation[0].title}</h3>
          <div className='retun-ul-wrapper faq-ul-wrapper'>
            <div className='sun-editor-output' dangerouslySetInnerHTML={{ __html: DynamicData }}></div>
          </div>
        </div>

      </div>
    </section>
  );
}
export default CancellationPolicy