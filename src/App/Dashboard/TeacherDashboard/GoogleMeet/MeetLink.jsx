import React, { useEffect } from "react";
import Storage from "../../../../Classes/Storage";
import useMeethAuth from "./Hook/useMeethAuth";
import AppLinkUrl from "../../../../Common/AppLink/AppLinkUrl";
const MeetLink = ({ Title }) => {
  // useMeethAuth is returning link and method. ex - [methAuthUrl, getMeetAuthUrl];
  // const [authLink, doAuth] = useMeethAuth();
  const [meetAuthUrl, getMeetAuthUrl] = useMeethAuth();


  useEffect(() => {
    if (meetAuthUrl) {
      let url = AppLinkUrl.mainBaseUrl("/") + "dashboard/teacher-online-class"
      Storage.setJson("RedirectUrlMeet", url)
      window.location.href = meetAuthUrl;
    }
  }, [meetAuthUrl]);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "3em" }}>
      <button className="button btn-md button-theme" onClick={() => getMeetAuthUrl()}>
        {Title ? Title : "Authenticate Now!"}
      </button>
    </div>
  );
};

export default MeetLink;
