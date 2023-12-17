import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/LayoutComponent/ReturnPolicy/returnPolicy.scss"
import MobileBar from '../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/CommonComponent/CommonJsx/MobileBar/MobileBar';

const CustomPolicy = () => {

  const { _id } = useParams();

  const [custompolicydata, setcustompolicydata] = useState({});

  const { privacypolicydata } = useSelector((state) => {
    return {
      privacypolicydata: state.websiteTemplate.getTemplate,
    }
  })

  // console.log(_id, "hvbxchsdc");

  useEffect(() => {
    if (privacypolicydata && privacypolicydata.policy_info && privacypolicydata.policy_info.custom_policy && privacypolicydata.policy_info.custom_policy.length > 0) {
      let data = privacypolicydata.policy_info.custom_policy.find((i) => i._id === _id)
      setcustompolicydata(data);
    }
  }, [_id, privacypolicydata])

  const dynamicData = custompolicydata?.description

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className='return-section '>
      <div className='containerTrue mt-24  pb-45'>
        <div className='return-policy-wrapper'>
          <h3 className='return-heading text-underline'>{custompolicydata?.title}</h3>
          <div className='retun-ul-wrapper faq-ul-wrapper'>
            <div className='sun-editor-output' dangerouslySetInnerHTML={{ __html: dynamicData }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CustomPolicy
