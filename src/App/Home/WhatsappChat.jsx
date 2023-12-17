import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import IconWhatsappSupport from "./edneed-whatsapp-customer-support.png";
import ReactGA from "react-ga";
import { isWebView } from "../../CommonFunctions";
const WhatsappChat = () => {
  // const dispatch = useDispatch()
  const { success, contact_support } = useSelector((state) => state.websiteTemplate.getTemplate)

  // const [dataFetched, setDataFetched] = useState(false)
  // useEffect(() => {
  //   if (AppLinkUrl.privateDomain()) {
  //     if (!dataFetched) {
  //       setDataFetched(true)
  //       dispatch(getWhatsAppPrivateDomain(AppLinkUrl.getHost()))
  //     }
  //   }
  //   if (AppLinkUrl.subdomain()) {
  //     if (!dataFetched) {
  //       setDataFetched(true)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const path = window.location.pathname
  const whatsappClick = () => {
    ReactGA.event({
      category: "whatsapp_chat_support",
      action: "click",
      label: "Home_WhatsApp",
    })
  }
  useEffect(() => {

  }, [])
  return (
    <React.Fragment>
      {
        (AppLinkUrl.privateDomain() && !path.includes("student-online-test")) || AppLinkUrl.subdomain() ? (
          <React.Fragment>

            {success && contact_support && contact_support !== "" &&
              < div className="whatsapp-chat" >
                <a
                  href={`https://api.whatsapp.com/send?phone=${contact_support}&text=Hi, There!`}
                  target="Edneed Chat"
                >
                  <img src={IconWhatsappSupport} alt="Whatsapp Support" />
                </a>
              </div>
            }

          </React.Fragment>
        )
          : (
            <React.Fragment>
              {!path.includes("student-online-test") &&
                <div className="whatsapp-chat" >
                  {isWebView() ?
                    <a href="https://api.whatsapp.com/send?phone=918920512704&text=Hi, There!">
                      <img src={IconWhatsappSupport} alt="Whatsapp Support" onClick={() => whatsappClick()} />
                    </a> :
                    <a href="https://api.whatsapp.com/send?phone=918920512704&text=Hi, There!" target="Edneed Chat">
                      <img src={IconWhatsappSupport} alt="Whatsapp Support" onClick={() => whatsappClick()} />
                    </a>}
                </div>
              }
            </React.Fragment>
          )
      }
    </React.Fragment >
  );
};

export default WhatsappChat;
