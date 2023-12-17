import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import "../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ReturnPolicy/returnPolicy.scss"
import MobileBar from '../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/CommonComponent/CommonJsx/MobileBar/MobileBar';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import NotFound from '../../../ErrorPage/NotFound';

const TermsAndConditions = () => {

  const { privacypolicydata } = useSelector((state) => {
    return {
      privacypolicydata: state.websiteTemplate.getTemplate,
    }
  })

  const { slug } = useParams();

  const [dynamicData, setDynamicData] = useState("");
  const [errorpage, setErrorPage] = useState(false);

  // const dynamicDescription = privacypolicydata && privacypolicydata.policy_info && privacypolicydata.policy_info.terms_of_service && privacypolicydata.policy_info.terms_of_service.length ? privacypolicydata.policy_info.terms_of_service[0].description : ""

  useEffect(() => {
    let elementData;
    if (privacypolicydata && privacypolicydata.policy_info && slug) {
      // console.log(slug, "line no 21");
      if (privacypolicydata.policy_info.terms_of_service && privacypolicydata.policy_info.terms_of_service.length) {
        if (privacypolicydata.policy_info.terms_of_service[0].slug === slug) {
          setDynamicData(privacypolicydata.policy_info.terms_of_service[0]);
          elementData = privacypolicydata.policy_info.terms_of_service[0];
        }
      }
      if (privacypolicydata.policy_info.privacy_policy && privacypolicydata.policy_info.privacy_policy.length) {
        if (privacypolicydata.policy_info.privacy_policy[0].slug === slug) {
          setDynamicData(privacypolicydata.policy_info.privacy_policy[0]);
          elementData = privacypolicydata.policy_info.privacy_policy[0];
        }
      }
      if (privacypolicydata.policy_info.custom_policy && privacypolicydata.policy_info.custom_policy.length) {
        for (let index = 0; index < privacypolicydata.policy_info.custom_policy.length; index++) {
          const element = privacypolicydata.policy_info.custom_policy[index];
          if (element.slug === slug) {
            setDynamicData(element);
            elementData = element;
          }
        }
      }

    }
    if (!elementData) {
      setErrorPage(true);
    }
  }, [privacypolicydata, slug])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      {errorpage ?
        <NotFound showlogo={false} />
        :
        <section className='return-section '>
          <div className='containerTrue mt-24  pb-45'>
            <div className='return-policy-wrapper'>
              <h3 className='return-heading text-underline'>
                {dynamicData && dynamicData.title ? dynamicData.title : ""}
              </h3>
              <div className='retun-ul-wrapper faq-ul-wrapper'>
                <div className='sun-editor-output' dangerouslySetInnerHTML={{ __html: dynamicData && dynamicData.description ? dynamicData.description : "" }}></div>
              </div>
            </div>

          </div>
        </section>
      }
    </React.Fragment>


  );
}

export default TermsAndConditions
