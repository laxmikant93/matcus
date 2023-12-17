import { useState, useEffect } from "react";
import Request from "../../../Classes/Request";
const OtpLoginRequest = new Request();

/**
 *
 * @param {*} mobile : Mobile number
 * @param {*} start : Boolean : default false
 * @returns
 */
const useOnChangeOtp = () => {
  const [isOnChangeError, seterror] = useState(false);
  const [isOnChangeLoading, setloading] = useState(false);
  const [isOnChangeSuccess, setsuccess] = useState(false);

  const resetOtpOnChange = () => {
    setloading(false);
    setsuccess(false);
    seterror(false);
  };

  const sendOnChangeOtp = (oldmobile, mobile, code) => {
    resetOtpOnChange();
    if (mobile) {
      setloading(true);
      OtpLoginRequest.post(
        OtpLoginRequest.url("authService/managephone"),
        { oldcontact: oldmobile, newcontact: mobile, country_code: code },
        (success) => {
          if (success.status === 200 && success.data.Status === "Success") {
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
    return resetOtpOnChange;
  }, []);

  return [isOnChangeLoading, isOnChangeError, isOnChangeSuccess, sendOnChangeOtp, resetOtpOnChange];
};
export default useOnChangeOtp;
