import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { activateWebsiteTemplate, resetActivateWebsiteTemplate } from '../store/actions/WebsiteTemplate'
// import Home from '../App/Home'
// import WebsiteTemplateCustomization from '../WebsiteTemplateCustomization/index'
import WebsiteTemplatePreview from '../WebsiteTemplateCustomization/WebsiteTemplatePreview'
// import Preview from '../WebsiteTemplatePreview/index';

const Main = () => {
  const { user, themeData, templateId, activateTemplateSuccess, activateTemplateLoading } = useSelector((state) => {
    return {
      user: state.user,
      themeData: state.websiteTemplate.getTemplate.data.themeData,
      templateId: state.websiteTemplate.getTemplate.data._id,

      activateTemplateSuccess: state.websiteTemplate.activateTemplate.success,
      activateTemplateLoading: state.websiteTemplate.activateTemplate.loading
    }
  })
  const dispatch = useDispatch()
  const history = useNavigate()
  const publishTemplate = () => {
    dispatch(activateWebsiteTemplate({
      owner: user._id,
      institute: user.user_institute,
      theme: themeData._id,
      template: templateId,
      industry: user.user_business_type,
      isDefaulttheme: themeData.isDefault
    }))
  }
  useEffect(() => {
    if (activateTemplateSuccess) {
      history(`/`)
    }
    // return () => {
    //   dispatch(resetActivateWebsiteTemplate())
    // }
  }, [activateTemplateSuccess])
  return (
    <>
      <div className="Maintheme-wrap">
        <WebsiteTemplatePreview />
      </div>
      <div className="group_button">
        {/* <button className="button btn-sm btn-o-primary">Save for later</button> */}
        {
          activateTemplateLoading ?

            <button className="button btn-sm button-primary">Activating...</button>
            :

            <button className="button btn-sm button-primary" onClick={publishTemplate}>Activate</button>
        }
      </div>
    </>
  )
}

export default Main