import React, { useState, useEffect } from 'react'
// import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl'
import ComponentLoader from '../../../Common/Loader/ComponentLoader'
import { getEcomWebsite } from '../../../store/actions/businessInfo'
import MobileBar from '../CommonComponent/CommonJsx/MobileBar/MobileBar'
import Footer from '../FooterLayout/Footer'
import Header from '../HeaderLayout/Header'
import ThemeSelection from './themeSelection'

const EcomLayout = ({ children }) => {
  const { success } = useSelector((state) => state.businessInfo.ecomWebsite);
  // const { homePageproducts } = useSelector((state) => state.productList);
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (AppLinkUrl.privateDomain()) {
  //     dispatch(getEcomWebsite("domain", AppLinkUrl.getHost()))
  //   } else {
  //     dispatch(getEcomWebsite("subdomain", AppLinkUrl.subdomain()))
  //   }
  // }, [dispatch])


  return (
    <React.Fragment>
      <div className="ecom-layout">
        <Header />
        {
          success ? (
            <div className='sectionBodyContent'>
              {children}
            </div>
          ) : (
            <ComponentLoader />
          )
        }
        <Footer />
        <MobileBar />
      </div>
      <ThemeSelection />
    </React.Fragment>
  )
}
export default EcomLayout