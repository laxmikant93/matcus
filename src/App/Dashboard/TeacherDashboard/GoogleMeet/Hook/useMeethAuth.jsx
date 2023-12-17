import { useState } from "react";
import Request from "../../../../../Classes/Request";
const meetAuthRequest = new Request();
/**
 *
 * @description : Hook is used to fetch google auth URL
 * @returns : Hook return array of states in [methAuthUrl, methAuthUrlError, getMeetAuthUrl] the form
 * @author : Krishna Kumar
 * @date : 01/Jul/2021
 * @updated : 03/Jul/2021
 */
const useMeethAuth = () => {
  const [meetAuthUrl, setmethAuthUrl] = useState(undefined);
  const [methAuthUrlError, setmethAuthUrlError] = useState(null); // default start value null

  const getMeetAuthUrl = () => {
    setmethAuthUrlError(null); // Reset error state

    meetAuthRequest.get(
      meetAuthRequest.url("meet"),
      (success) => {
        setmethAuthUrl(success.data.authUrl);
      },
      (error) => {
        setmethAuthUrlError(error.message);
      }
    );
  };

  return [meetAuthUrl, getMeetAuthUrl, methAuthUrlError,];
};

export default useMeethAuth;
