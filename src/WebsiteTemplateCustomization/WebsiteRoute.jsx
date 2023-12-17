import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AppLinkUrl from '../Common/AppLink/AppLinkUrl';
import ComponentLoader from '../Common/Loader/ComponentLoader';
import InstituteWebsite from '../InstituteWebsite';
import { getWebsiteDomainTemplate } from '../store/actions/WebsiteTemplate';
import Header from '../Layout/SubdomainLayout/SubDomainHeader'

import Footer from '../Layout/SubdomainLayout/SubDomainFooter'
import Template from "../WebsiteTemplateCustomization"
import { useLocation } from 'react-router-dom';
const WebsiteRoute = () => {
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { success, isOld } = useSelector((state) => state.websiteTemplate.getTemplate)
  const dispatch = useDispatch()
  const redirectToSection = () => {
    return success && isOld === true ? (
      <React.Fragment>
        <Header />
        <InstituteWebsite />
        <Footer />
      </React.Fragment>
    ) : (
      <Template />
    );
  };
  const { pathname } = useLocation()
  useEffect(() => {
  
    success && isOld === true ? (
      <React.Fragment>
        <Header />
        <InstituteWebsite />
        <Footer />
      </React.Fragment>
    ) : (
      <Template />
    );
  }, [isOld, pathname, success])
  return (
    <React.Fragment>
      <div>
        {!success ? (
          <ComponentLoader />
        ) : (
          success && redirectToSection()
        )}
      </div>
    </React.Fragment>
  )
}
export default WebsiteRoute;