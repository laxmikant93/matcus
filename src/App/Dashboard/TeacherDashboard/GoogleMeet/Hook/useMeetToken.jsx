import { useState } from "react";
import Request from "../../../../../Classes/Request";
const meetTokenRequest = new Request();
/**
 *
 * @description : Hook is used to validate the oauth2callback detail and fetch the token
 * @returns : Hook return array of states in [token, tokenLoading, tokenError, getToken] the form
 * @author : Krishna Kumar
 * @date : 01/Jul/2021
 * @updated : 03/Jul/2021
 */
const useMeetToken = () => {
  const [token, setToken] = useState(undefined);
  const [tokenError, setTokenError] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  const getToken = () => {
    meetTokenRequest.get(
      `${meetTokenRequest.url("meet/oauth2callback")}${decodeURI(
        window.location.search
      )}`,
      (success) => {
        setTokenLoading(false);
        var hasScope = success.data.meetAuthDetail.scope.split(' ').includes('https://www.googleapis.com/auth/calendar.events') &&
          success.data.meetAuthDetail.scope.split(' ').includes('https://www.googleapis.com/auth/calendar')
          && success.data.meetAuthDetail.scope.split(' ').includes('https://www.googleapis.com/auth/userinfo.profile')
        if (!hasScope) {
          setTokenError("You haven't given the calender permissions.");
        }
        else {
          setToken(success.data.meetAuthDetail);
        }
      },
      (error) => {
        setTokenLoading(false);
        setTokenError(error.message);
      }
    );
  };

  return [token, tokenLoading, tokenError, getToken];
};

export default useMeetToken;
