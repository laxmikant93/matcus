import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AppLinkUrl from '../Common/AppLink/AppLinkUrl'
import ComponentLoader from '../Common/Loader/ComponentLoader'
import { getServicepreviewData, getSingleTemplateForServiceEdit } from '../store/actions/serviceWebsiteTemplate'
import { getpreviewData, getSingleTemplateForEdit, resetSingleTemplateForEdit } from '../store/actions/WebsiteTemplate'
import ServiceTemplatePreview from './ServiceTemplatePreview'
import WebsiteTemplatePreview from './WebsiteTemplatePreview'

const WebsitePreview = () => {
  const dispatch = useDispatch()
  const { user, themeSuccess,serviceThemeSuccess } = useSelector((state) => {
    return {
      user: state.user,
      theme: state.websiteTemplate.getTemplate.data,
      themeSuccess: state.websiteTemplate.getTemplate.success,
      serviceThemeSuccess:state.serviceTemplate.getTemplate.success,
      serviceTheme: state.serviceTemplate.getTemplate.data,
    }
  })
  const { _id, type } = useParams()
  useEffect(() => {
    if (user.user_business_type === "LMS") {
      if (type === "default") {
        dispatch(getpreviewData(user._id, user.user_institute, user.user_business_type, _id))
      } else {
        dispatch(getSingleTemplateForEdit(user._id, user.user_institute, user.user_business_type, _id))
      }
    } else {
      if (type === "default") {
        dispatch(getServicepreviewData(user._id, user.user_institute, user.user_business_type, _id))
      } else {
        dispatch(getSingleTemplateForServiceEdit(user._id, user.user_institute, user.user_business_type, _id,"subdomain",user.user_institute_institute_subdomain))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, user._id, user.user_business, user.user_business_type, user.user_institute])
  useEffect(() => {
    return () => {
      dispatch(resetSingleTemplateForEdit())
    }
  }, [dispatch])
  return (
    <React.Fragment>
      {
        user.user_business_type === "Services" ?
          <React.Fragment>
            {
              serviceThemeSuccess ? <ServiceTemplatePreview /> : <ComponentLoader />
            }
          </React.Fragment>

          : <React.Fragment>
            {
              themeSuccess ? <WebsiteTemplatePreview /> : <ComponentLoader />
            }
          </React.Fragment>
      }

    </React.Fragment>
  )
}
export default WebsitePreview