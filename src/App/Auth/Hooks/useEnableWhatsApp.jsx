import { useEffect } from 'react';
import { useState } from "react";
import Request from "../../../Classes/Request";
const EnableWhatsAppRequest = new Request();

/**
 *
 * @param {*} mobile : Mobile number
 * @param {*} start : Boolean : default false
 * @returns
 */
const useEnableWhatsApp = () => {
  const [isEnableLoading, setloading] = useState(false);
  const [isEnableError, seterror] = useState(false);
  const [isEnableSuccess, setsuccess] = useState(false);

  const resetEnableWhatsApp = () => {
    setloading(false);
    setsuccess(false);
    seterror(false);
  };

  const enableWhatsApp = (userId, mobile, countryCode) => {
    if (mobile.length <= 9) {
      seterror(true);
    } else {
      setloading(true);
      EnableWhatsAppRequest.post(
        EnableWhatsAppRequest.url("authService/whatsapp"),
        {
          userId,
          whatsapp_contact: mobile,
          whatsapp_country_code: countryCode,
        },
        (success) => {
          if (success.status === 200) {
            setsuccess(true);
            setloading(false);
          } else {
            seterror(true);
            setloading(false);
          }
        },
        (error) => {
          seterror(true);
          setloading(false);
        }
      );
    }
  };
  useEffect(() => {
    resetEnableWhatsApp()
  }, [])
  return [isEnableLoading, isEnableError, isEnableSuccess, enableWhatsApp, resetEnableWhatsApp];
};
export default useEnableWhatsApp;
