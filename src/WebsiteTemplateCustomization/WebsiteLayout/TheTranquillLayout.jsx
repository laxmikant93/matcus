import React from "react";
import SectionHeader from '../SectionImports/SectionHeader'
import SectionFooter from '../SectionImports/SectionFooter'
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../CommonComponent/global.styled";
import { useSelector } from "react-redux";
import ComponentLoader from "../../Common/Loader/ComponentLoader";
// import Error404 from "../../Common/Error404";
import styled from 'styled-components';
import Headroom from 'react-headroom';
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getWebsiteDomainTemplate } from "../../store/actions/serviceWebsiteTemplate";
// import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import ScrollToTop from "../../Common/ScrollPageTop";
import useTheme from "../../ServiceThemeEditor/useTheme";

const SectionBodyCustom = styled.div`
min-height: 576px;
`;

const TheTranquillLayout = ({ children }) => {
  // const dispatch = useDispatch()
  const [theme]=useTheme()
  
  const { themeSuccess, themeStatus, domainSuccess } = useSelector((state) => {
    return {

      themeSuccess: state.websiteTemplate.getTemplate.success,
      themeStatus: state.serviceTemplate.getTemplate.status,
      domainSuccess: state.serviceTemplate.getTemplate.domainSuccess,
      // themeGlobal: state.websiteTemplate.getTemplate.data.themeGlobal,
    }
  })
  const HeaderToRender = SectionHeader["TheTranquill_Header"];
  const FooterToRender = SectionFooter["TheTranquill_Footer"];
  // useEffect(() => {
  //   if (AppLinkUrl.privateDomain()) {
  //     dispatch(getWebsiteDomainTemplate("domain", AppLinkUrl.getHost()))
  //   } else {
  //     dispatch(getWebsiteDomainTemplate("subdomain", AppLinkUrl.subdomain()))
  //   }
  // }, [dispatch])
  return (
    <React.Fragment>

      {
        themeSuccess && domainSuccess && themeStatus === 201 ?
          <ThemeProvider theme={theme}>

            <Headroom style={{
              webkitTransition: 'all .5s ease-in-out',
              mozTransition: 'all .5s ease-in-out',
              oTransition: 'all .5s ease-in-out',
              transition: 'all .5s ease-in-out'
            }}>
              <HeaderToRender preview={false} />
            </Headroom>
            <SectionBodyCustom>
              {children}
            </SectionBodyCustom>
            <FooterToRender preview={false} />

            <ScrollToTop />

          </ThemeProvider>

          : <ComponentLoader />
      }

    </React.Fragment>
  )
}
export default TheTranquillLayout