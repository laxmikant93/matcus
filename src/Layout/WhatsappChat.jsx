import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";
import { getWhatsAppPrivateDomain } from "../store/actions/whatsappSupport";
import IconWhatsappSupport from "./edneed-whatsapp-customer-support.png";
const WhatsappChat = () => {
  const dispatch = useDispatch()
  const { whatsAppSubdomain, whatsAppPrivateDomain, whatsAppPrivateDomainSuccess } = useSelector((state) => {
    return {
      whatsAppSubdomain: state.institutewebsite.data.contact_support,
      whatsAppPrivateDomain: state.whatsAppSupport.privateDomain.data.data,
      whatsAppPrivateDomainSuccess: state.whatsAppSupport.privateDomain.success
    }
  })
  const [dataFetched, setDataFetched] = useState(false)
  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      if (!dataFetched) {
        setDataFetched(true)
        dispatch(getWhatsAppPrivateDomain(AppLinkUrl.getHost()))
      }
    }
    if (AppLinkUrl.subdomain()) {
      if (!dataFetched) {
        setDataFetched(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const path = window.location.pathname

  return (
    <React.Fragment>
      {
        AppLinkUrl.privateDomain() && !path.includes("student-online-test") ? (
          <React.Fragment>
            {whatsAppPrivateDomainSuccess && whatsAppPrivateDomain.length > 0 && whatsAppPrivateDomain[0].contact_support &&
              < div className="whatsapp-chat" >
                <a
                  href={`https://api.whatsapp.com/send?phone=${whatsAppPrivateDomain[0].contact_support ? whatsAppPrivateDomain[0].contact_support : ''}&text=Hi, There!`}
                  target="Edneed Chat"
                >
                  <img src={IconWhatsappSupport} alt="Whatsapp Support" />
                </a>
              </div>
            }
          </React.Fragment>
        ) : AppLinkUrl.subdomain() ?
          <React.Fragment>
            {whatsAppSubdomain &&
              < div className="whatsapp-chat" >
                <a
                  href={`https://api.whatsapp.com/send?phone=${whatsAppSubdomain ? whatsAppSubdomain : ''}&text=Hi, There!`}
                  target="Edneed Chat"
                >
                  <img src={IconWhatsappSupport} alt="Whatsapp Support" />
                </a>
              </div>
            }
          </React.Fragment>
          : (
            <React.Fragment>
              {!path.includes("student-online-test") &&
                <div className="whatsapp-chat" >
                  <a
                    href="https://api.whatsapp.com/send?phone=918920512704&text=Hi, There!"
                    target="Edneed Chat"
                  >
                    <img src={IconWhatsappSupport} alt="Whatsapp Support" />
                  </a>
                </div>
              }
            </React.Fragment>
          )
      }
    </React.Fragment>
  );
};

export default WhatsappChat;
