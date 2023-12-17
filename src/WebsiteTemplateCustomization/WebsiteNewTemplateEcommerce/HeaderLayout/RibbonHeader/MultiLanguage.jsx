import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import Cookies from '../../../../Classes/Cookies';
import { useCookies } from 'react-cookie';
// import Cookies from '../../../../Classes/Cookies';
import Api from '../../../../Classes/Api';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
const MultiLanguage = () => {

  const { businessInfoSuccess, businessInfoData } = useSelector((state) => {
    return {
      businessInfoSuccess: state.businessInfo.ecomWebsite.success,
      businessInfoData: state.businessInfo.ecomWebsite.data,
    }
  })

  function setCookies(key, value, domain) {
    document.cookie = key + '=' + value + `;domain=${domain};path=/`;
  }
  const [cookies, setCookie, removeCookie] = useCookies(["googtrans"]);

  const googleTranslateElementInit = () => {
    // console.log(businessInfoData.language.symbol, "line 19")

    // setCookie('googtrans', `/en/${businessInfoData && businessInfoData.language && businessInfoData.language.symbol ? businessInfoData.language.symbol : "en"}`, { path: '/' }, { domain: AppLinkUrl.getHost() });
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    if (businessInfoSuccess && businessInfoData) {
      if (AppLinkUrl.subdomain()) {
        removeCookie('googtrans', '', { path: '/' }, { domain: AppLinkUrl.subdomain() })
      } else {
        removeCookie('googtrans', '', { path: '/' }, { domain: AppLinkUrl.getHost() })
        removeCookie('googtrans', '', { path: '/' }, { domain: `.${AppLinkUrl.getHost()}` })
      }
      // console.log("line 34", AppLinkUrl.getHost(), businessInfoData.language.symbol, AppLinkUrl.urlWithoutSubdmain(), cookies.googtrans)
      setCookies('googtrans', `/en/${businessInfoData && businessInfoData.language && businessInfoData.language.symbol ? businessInfoData.language.symbol : "en"}`, AppLinkUrl.getHost());
      setCookies('googtrans', `/en/${businessInfoData && businessInfoData.language && businessInfoData.language.symbol ? businessInfoData.language.symbol : "en"}`, `{.${AppLinkUrl.getHost()}`);

      var addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }

  }, [businessInfoData, businessInfoData.language.symbol, businessInfoSuccess])


  return (
    <React.Fragment>
      <div id='google_translate_element'>
        <i className="icon-translate"></i>
      </div>
    </React.Fragment>
  )
}

export default MultiLanguage