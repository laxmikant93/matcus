import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { activateWebsiteTemplate, resetActivateWebsiteTemplate } from '../store/actions/serviceWebsiteTemplate'
import ServiceTemplatePreview from '../WebsiteTemplateCustomization/ServiceTemplatePreview'
// import Home from '../App/Home'
// import WebsiteTemplateCustomization from '../WebsiteTemplateCustomization/index'
// import WebsiteTemplatePreview from '../WebsiteTemplateCustomization/WebsiteTemplatePreview'
// import Preview from '../WebsiteTemplatePreview/index';

const ServiceMain = () => {
  const {_id}=useParams()
  const { user, themeData, templateId, activateTemplateSuccess, activateTemplateLoading } = useSelector((state) => {
    return {
      user: state.user,
      themeData: state.serviceTemplate.getTemplate.data.themeData,
      // templateId: state.serviceTemplate.getTemplate.data._id,

      activateTemplateSuccess: state.serviceTemplate.activateTemplate.success,
      activateTemplateLoading: state.serviceTemplate.activateTemplate.loading
    }
  })
  const dispatch = useDispatch()
  const history = useNavigate()
  const publishTemplate = () => {
    dispatch(activateWebsiteTemplate({
      owner: user._id,
      business: user.user_institute,
      theme: themeData._id,
      template: _id,
      industry: user.user_business_type,
      isDefaulttheme: themeData.isDefault
    }))
  }
  useEffect(() => {
    if (activateTemplateSuccess) {
      history(`/`)
    }
    return () => {
      dispatch(resetActivateWebsiteTemplate())
    }
  }, [activateTemplateSuccess, dispatch, history])
  return (
    <>
      <div className="Maintheme-wrap">
        <ServiceTemplatePreview />
      </div>
      <div className="group_button">
        {/* <button className="button btn-sm btn-o-primary">Activate</button> */}
        {
          activateTemplateLoading ?

            <button className="button btn-sm btn-o-primary">Activating...</button>
            :

            <button className="button btn-sm btn-o-primary" onClick={publishTemplate}>Activate</button>
        }
      </div>
    </>
  )
}

export default ServiceMain